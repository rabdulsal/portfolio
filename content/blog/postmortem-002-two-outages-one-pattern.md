---
title: "Two outages, one pattern: what the FAA ground stop and the Outlook outage have in common"
slug: postmortem-002-two-outages-one-pattern
series: "The Postmortem"
seriesNumber: 2
excerpt: "In 48 hours, America lost planes and email. Neither was a cyberattack. Both were architecture failures at a shared front door, and the same five principles would have helped."
seoKeywords: "FAA ground stop November 2026, Microsoft Outlook outage November 2026, systems architecture resilience, single point of failure, failover cascading failure, bulkheads, lock contention, FTI, Exchange Online"
author: Rashad Salaam
publishedAt: 2026-11-17
readMinutes: 9
status: published
linkedinPostId: ""
featuredImage: /blog/postmortem-002-hero.webp
socialImage: /blog/postmortem-002-social.jpg
---

In 48 hours, America lost two things it assumes will always work: planes and email.

On Thursday, November 12, 2026, Microsoft 365 went down worldwide. Outlook stopped opening mailboxes, and Teams, SharePoint, OneDrive and Copilot degraded with it. On Friday, November 13, the FAA stopped every departure in the United States for four hours and 21 minutes.

Neither was a cyberattack. Officials in both cases said so explicitly, and there is no evidence otherwise. That is exactly why they belong in the same post. These were not attacks. They were architecture failures, the kind that happen when a shared front door, a latent defect and a routine change line up on the same day.

## What happened on Thursday: Outlook

Microsoft's incident, tracked as EX1550543 / MO1550821, ran from 4:20 p.m. UTC on Thursday, November 12, to 4:10 p.m. UTC on Friday, November 13, just under 24 hours. Downdetector logged about 140,000 Outlook reports in the US at the peak on Thursday afternoon, across 74 countries.

Microsoft's preliminary report, published November 15, names three factors that combined.

First, a latent defect. In July, Microsoft rolled out a fix prepared specifically for its Microsoft 365 networking gateway servers, the front door that connections to Exchange Online and many other Microsoft 365 services pass through. Under certain load conditions, lock contention inside an internal Windows process exhausted CPU and memory until the machine stopped responding. The change had been deployed worldwide for more than three months with no visible problem.

Second, a load surge. About 15 hours before the outage, at 1:07 a.m. UTC on Thursday, Teams automatically failed over from an alternative gateway onto the primary gateway that also supports Exchange Online. That is routine, and it is meant to be a resilience feature. It raised the load on the primary gateway and changed its traffic pattern.

Third, reduced capacity. Nearly 14 percent of the gateway's server capacity was already out of service because of an unrelated issue from the previous day. On its own, Microsoft says, that reduction had no impact. It had enough headroom. Together with the extra load, it was enough to trip the latent bug.

Then the safety net made it worse. When servers lost connectivity, Microsoft's traffic management automatically routed users to other healthy endpoints. That is normally what makes the service resilient. Here the redirected traffic hit the same defect on the remaining servers. In less than two hours, more than 80 percent of the gateway's servers were unresponsive.

The bulkheads did not hold either. Microsoft organises the gateway into thousands of capacity units, grouped into regions, precisely so a failure in one partition does not spread. In this case, the report says, a separate issue meant the normal bulkheads between partitions did not stop the cascading failure. It does not yet explain why.

Recovery was slow for a structural reason. As servers returned to service, they were immediately overwhelmed by waiting traffic and became unresponsive again. The usual rollback, flighting and feature flags could not quickly revert the change, because the defect was months old. Engineers eventually built an update that returned the code path to its previously known good state, and brought servers back in batches, starting with Asia Pacific and then Europe. Webmail was back to normal worldwide by 2:17 p.m. UTC on Friday.

There is one asymmetry worth naming. Teams, OneDrive, SharePoint and Office apps could fail out of the faulty gateway infrastructure, so they recovered sooner. Exchange Online could not, for scale reasons. When the one front door that email cannot leave jams, email stops for nearly everyone. Email was not lost, it was delayed, but for a day, that distinction did not help much.

## What happened on Friday: the FAA

At about 3:36 p.m. Eastern on Friday, November 13, air traffic control centres started losing pieces of their radar picture and radio links. At 3:54 p.m., the FAA issued a nationwide ground stop. It lifted at 8:15 p.m., after four hours and 21 minutes. It was only the second nationwide stop since September 11, 2001, the first since the NOTAM outage in January 2023. More than 3,500 aircraft were airborne when the stop went out. They were allowed to land. Every flight was accounted for.

The preliminary account, again not a final root cause, centres on a router. During work to replace old copper telecom lines with fibre, a router at a radio communications site in El Dorado, Arkansas, and a radar site in Amarillo, Texas, began flooding the network with over 1,000 connection attempts every four to five seconds, about 200 a second. That destabilised 17 of the FAA's 22 en-route centres. Blocking those sites stabilised the network. Whether the router was faulty or installed wrong is still under investigation.

The network in question is FTI, the FAA Telecommunications Infrastructure, run by L3Harris since 2002. It links more than 4,400 FAA facilities. A Government Accountability Office report from September 2026 found that only 2,560 of 5,170 copper lines had been replaced with fibre by May 2026, about half, under the Brand New Air Traffic Control System programme. The same report found the programme had no comprehensive lifecycle cost estimate and no integrated master schedule. In 2024, the GAO found 51 of the FAA's 138 air traffic control systems unsustainable, and 54 more potentially unsustainable.

The impact numbers depend on the counting window, so treat any single figure with care. The first FlightAware count on Friday was over 1,000 flights cancelled and nearly 10,000 delayed. By later counts, roughly 9,000 to 10,000 flights were cancelled that day, with total disruption across the weekend past 20,000. The ground stop lasted four hours. The schedule took days to unwind, because crews ran out of legal duty hours and aircraft were parked in the wrong cities.

![Grounded planes on the tarmac, red arrows pointing down, and air traffic control radar screens flashing red](/blog/postmortem-002-tarmac.webp)

## The shared pattern

Put the two incidents side by side and five principles fall out. None of them is new. All of them were violated in the same week.

**1. The front door is the system.**

Both failures were at a shared gateway, not at the service behind it. Microsoft's networking gateway fronts Exchange Online and much of Microsoft 365. FTI carries radar and radio data between FAA facilities. When the front door fails, every service behind it fails together, no matter how well those services are built. If you cannot name your front door, and you cannot say what happens when it jams, you do not have a resilience plan. You have a hope.

**2. Latent defects need a trigger, and triggers are ordinary.**

Neither defect was new. Microsoft's had been live since July. The FAA's copper-to-fibre work had been going on for years, and a similar router failure at the seam between an old network and a new one had happened in 2009. In both cases, the trigger was routine: a failover, a maintenance swap, a busy afternoon. This is the Swiss cheese model in practice. No single hole causes the outage. Three holes line up, and the system falls through. The fix is not to ban routine changes. It is to assume they will line up, and to design so that any two of them together cannot take the system down.

**3. Failover can be the failure.**

This is the hardest lesson in both reports, because failover is supposed to be the answer. Microsoft's automatic rerouting spread the defect from server to server until more than 80 percent were down. The FAA's flood spread from two remote sites to 17 centres. Automatic recovery that does not understand the failure mode is just a faster way to propagate it. Failover needs a circuit breaker: a limit on how much traffic can move, a check that the destination is actually healthy under the same conditions, and a way to stop and hold rather than keep retrying. Restarting a server into a wall of waiting traffic, as Microsoft found, is not recovery. It is a thundering herd with a fresh coat of paint.

**4. Bulkheads only work if they are tested, and tested under load.**

Microsoft had bulkheads. They did not stop the cascade, for a reason the preliminary report does not yet explain. The FAA's network had no effective isolation between a remote maintenance site and the national system. A bulkhead that has never been exercised under realistic failure conditions is a diagram, not a control. The same applies to load testing. Microsoft says its lab tests missed the lock contention because they used weaker hardware with fewer cores and a different traffic mix, while the defect is worse on newer machines with more cores. Test on production-like hardware, with production-like traffic, or do not claim the test covers the failure.

**5. Recovery is a design problem, not an afterthought.**

Microsoft could not roll back a months-old change with feature flags. The FAA could stabilise its network by blocking two sites, but it could not unscramble the airline schedule. Both recoveries were slow because recovery had not been designed for the failure that actually happened. A good recovery plan answers three questions in advance: how do we stop the bleeding without making it worse, how do we bring the system back in stages without overwhelming it, and what do we do when the service that cannot fail over is the one that fails? Exchange Online had no answer to the third question. That is worth sitting with.

## The security angle, without the cyberattack

It is tempting to file both incidents under reliability and move on. That would miss the point. The principles that would have helped are security principles.

Segmentation is a security control and a reliability control. So is least privilege: a maintenance operation at one remote site should not have the reach to destabilise a national network. So is supply chain discipline: a single contractor running a national network since 2002, and a single gateway that one service cannot leave, are both concentration risks, whether the threat is an attacker or a bad router.

The FAA's ground stop is also the one thing both incidents got right, and it is a security principle too: fail safe. When the data became inconsistent and the pattern could not be explained fast enough, the FAA stopped launching planes. It did not keep flying on data it could not trust. Microsoft had no equivalent fail-safe for Exchange. Its choice was between a degraded service and no service, and it got no service for a day.

## What I would check in my own systems

If you run anything with a shared gateway, a failover, or a maintenance window, this week is a good week to ask five questions.

Can one site, one router, or one gateway take down the whole system? If so, where is the isolation, and when was it last tested?

What latent change is sitting in production right now, months old, that your load tests would not catch because they do not match production hardware or traffic?

When your failover fires, does it check that the destination can actually handle the load, or does it just move the problem?

Can you roll back the change that broke you, and how long would it take if the change is three months old, not three hours?

And when the data goes inconsistent, do you fail safe, or do you keep serving?

Two outages in two days, in two very different systems, with the same answers. That is not a coincidence. It is a pattern, and patterns are what post-mortems are for.

![Commanders and staff at work, green arrows pointing up and blue radar screens showing recovery, and jets ready to launch from an aircraft carrier at dawn](/blog/postmortem-002-hope.webp)

## Sources

Microsoft preliminary Post-Incident Report, November 15, 2026, incidents EX1550543 / MO1550821. Final report due November 20, 2026. GAO, Air Traffic Control Systems, GAO-26-107992, September 2026. FAA ground stop reporting, November 13-15, 2026. Numbers that vary by source and counting window are stated as ranges in this post. The FAA router cause is preliminary and under investigation.
