---
title: "One bank, everybody's payments: the Chase outage and the hub problem"
slug: postmortem-003-chase-outage-hub-problem
series: "The Postmortem"
seriesNumber: 3
excerpt: "On Monday, the largest bank in the country slowed down, and everybody's payments felt it. Not a cyberattack. A hub problem — and the one bulkhead that held."
seoKeywords: "Chase outage November 2026, JPMorgan Chase software bug, Zelle payments delay, banking outage, concentration risk, bulkheads, payment rails, systems resilience"
author: Rashad Salaam
publishedAt: 2026-11-16
readMinutes: 5
status: draft
linkedinPostId: ""
featuredImage: ""
socialImage: ""
---

On Monday, November 16, 2026, the largest bank in the United States slowed down, and everybody's payments felt it.

Customers started reporting problems with Chase at about 9:53 a.m. Eastern. Zelle reports began even earlier, around 9:30. By about 2 p.m., Downdetector had logged nearly 4,800 Chase reports, its second-highest 15-minute count in at least a year. Bank of America, Wells Fargo, U.S. Bank, Truist, Capital One and Zelle all saw spikes of their own. Wells Fargo posted that its online banking was temporarily unavailable. By early evening it was over: Chase said transactions were posting normally again by about 7 p.m. Eastern, after fixing the issue around 6:30 p.m. Central.

It was the third major American technology disruption in five days, after Outlook and the FAA ground stop. But it was a different shape of failure, and that difference is the interesting part.

## What Chase says happened

Chase's explanation, posted on X at 3:57 p.m. Eastern and given to reporters through the day, is short: "a temporary issue related to a software bug in on-premise hardware systems." No evidence it is cyber-related. Not a systemic issue. Customers still had access to their accounts and funds; some transactions simply took longer than usual. Other banks, Chase said, were slowed only on transactions that involved Chase.

A Justice Department official with direct knowledge told reporters there was no evidence of an attack. Reuters reported no indication that one software bug was affecting multiple banks at once.

What Chase has not said: which hardware carried the bug, why it surfaced on Monday, or whether any transactions failed outright instead of completing late. There is no detailed post-incident account yet. Treat anything beyond the bank's own sentences as inference, including this post.

## The same lens, a different result

Run the five principles from the FAA and Outlook post-mortems over this one, and they do not all land the same way. That is the point.

**1. The front door is the system — here, the hub is the system.**

Chase is the largest bank in the country. Zelle, the payment network inside the banks' own apps, is co-owned by several of the banks that reported trouble. When the hub slows, every payment that touches the hub slows with it, including payments between two banks that did nothing wrong. The other banks' own systems were not down. Their customers still felt it, because the shared rail carried the delay to them. Concentration is the risk, whether the hub is a gateway, a telecom network, or a bank.

**2. Latent defects need a trigger — here, we do not know.**

Microsoft's defect sat live since July. The FAA's router failed during a maintenance swap. For Chase, we have a bug in on-premise hardware and a Monday morning. That is not enough to claim a latent defect, and this post will not invent one. The honest version: a routine business day was enough to surface it. If your post-mortem needs a trigger story, wait for the bank's account.

**3. Propagation, not failover.**

Nothing failed over and spread the Chase bug. The payment network itself carried it, by design. A transaction between a Chase account and another bank has to pass through Chase. When Chase is slow, the transaction is slow. That is not a failover gone wrong. It is the ordinary cost of a shared rail: the rail does not know which of its members is having a bad day, and it cannot route around the member the payment is addressed to.

**4. Bulkheads — the one that held.**

This is the part worth sitting with, because it is the opposite of the Outlook story. The Federal Reserve's payment systems, Fedwire, FedACH and FedNow, operated normally. The other banks' core systems were not directly impacted. Customers kept access to their accounts and funds throughout. Chase degraded. It did not stop. The system bent instead of breaking, which is what bulkheads are for. Exchange Online had no equivalent exit. Chase's customers did, because money, unlike email, has more than one rail, and because the failure was slowness rather than a jammed front door.

**5. Recovery is a design problem — here, it worked.**

Chase fixed the issue the same business day, within hours, and said so in plain language through the afternoon. Compare that with a months-old defect that could not be rolled back, or an airline schedule that took days to unwind. Recovery was fast here because the failure mode was bounded: slow transactions, not a corrupted system. The lesson is not that Chase is better at recovery. It is that the recovery you get is the one your failure mode allows.

## The security angle is second-order, and it is real

There is no evidence of a cyberattack, and this post will not manufacture one. The cybersecurity story is what happens around an outage like this.

First, the rumor. Within hours, a viral claim was circulating that bank balances would be wiped and the internet shut down for three months on November 17. Fact-checkers debunked it the same day. The only thing scheduled for November 17 is a one-minute test of the Emergency Alert System. An outage is a rumor accelerant: when people cannot see their balances, they will believe almost any explanation for why.

Second, the scams. Every bank outage is followed by a wave of texts, emails and calls pretending to be the bank, aimed at people who are already anxious about their money. The security work on a day like Monday is not only the bug. It is clear communication, in plain language, early and often, so customers have a true story to hold onto instead of a viral one. Chase did that part reasonably well: a short, specific statement, repeated consistently, saying what was wrong, what was not wrong, and that funds were accessible.

That is the shared thread with the other two outages, and it is a security principle. When the data goes inconsistent, people fill the gap. Fail safe is not only a technical posture. It is a communications posture too.

## What I would check in my own systems

Who is your Chase? Which single counterparty, vendor or shared rail can slow you down without anything of yours breaking? Name it, and know what happens to your customers when it has a bad day.

Do your bulkheads degrade or stop? When a dependency slows, do your users get a slower service or no service? The difference between those two is the whole game.

Can you say what is wrong, in plain language, within hours? Chase's statement was three sentences and it worked. If your incident comms need a committee, that is a design problem too.

And do you have a plan for outage day's second failure, the rumor and the scam wave? The bug is the first incident. The phishing texts are the second. Plan for both.

Three outages in five days, and the pattern is not that everything is broken. It is that shared doors and shared rails decide the blast radius, and that the recovery you get depends on the failure you designed for. Chase's bulkheads held. That is worth noticing, because it is the one thing this week that worked the way the diagram said it would.

## Sources

Chase statements to AP, USA Today, NBC News, WIRED and on X, November 16, 2026. Downdetector counts via USA Today / Ookla. Wells Fargo online banking notice, November 16, 2026. U.S. Bank and Zelle statements, November 16, 2026. Federal Reserve payment systems operating normally. November 17 rumor debunked by fact-checkers. Chase has published no detailed post-incident account as of November 16, 2026.
