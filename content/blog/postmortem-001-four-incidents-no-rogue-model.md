---
title: "One Week, Four Incidents, No Rogue Model: A Postmortem"
slug: postmortem-001-four-incidents-no-rogue-model
series: "The Postmortem"
seriesNumber: 1
excerpt: "A tampered extension, a hijacked script, a $6.3B theft, and a kernel bug an AI turned into root. Three were old failures. One shows what AI changes. Here is what went wrong, why, and what to check on Monday."
seoKeywords: "AI engineering security, supply chain attack AI tools, Cursor extension backdoor, Polymarket DebugBear, Binance hack 2026, Linux kernel TCP vulnerability Anthropic, agent guardrails, least privilege for AI agents"
author: Rashad Salaam
publishedAt: 2026-11-09
readMinutes: 6
status: published
linkedinPostId: rashad-li-sec-week-001
featuredImage: /blog/postmortem-001-newspaper.webp
socialImage: /blog/postmortem-001-social.jpg
---

Four security incidents landed in the same week at the end of October 2026, and not one of them was an AI model going rogue.

That's the headline, and it's the whole argument of this piece. If you build with AI, the week was a to-do list, not a scare story. Here is what happened, what the failures have in common, and what I'd check on Monday morning.

## What happened

**A tampered extension (Cursor, October 29).** A modified copy of the Claude Code extension was published through Cursor's marketplace and stayed live for about 11 hours, reaching up to 5,000 developers. It planted a persistent SSH backdoor. Cursor says Anthropic did not build the malicious version, and Anthropic says an attacker used marketplace access to publish a tampered copy. The backdoor step needed administrator rights, which most people don't give their editor, and that limited the damage.

**A hijacked script (Polymarket, October 29).** A script from DebugBear, a performance-monitoring vendor, was compromised. Polymarket loaded it on its own site, so it ran with the full trust of the site itself. Reports put losses between roughly $2.5M and $2.7M across about 700 wallets. Polymarket paused trading, shipped a build that removed the dependency, and said it would reimburse affected users.

**A $6.3 billion theft (Binance, October 29-30).** Roughly $6.3B (TRM Labs says $6.36B) left Binance across ten blockchains in about 20 minutes. TRM attributes it with high confidence to North Korea's TraderTraitor group, and Chainalysis says it was likely the same group. Binance says it froze about $3B and will cover losses. The exact mechanics are still reported, not confirmed: one account describes a compromised developer machine used to submit withdrawals that Binance's own systems then signed, while TRM describes pre-signed authorizations on Ethereum.

**A kernel bug, and a model that exploited it (October 27).** A race condition in how Linux handles new TCP connections got a 9.8 severity score from the kernel's CVE team. Red Hat's own page scored it 5.9, Moderate, because winning the race is hard. Then Anthropic's red team reported that an unreleased Claude model wrote a working exploit for it: about 53 minutes to root in their proof of concept, on a server with a multipath TCP listener exposed. Anthropic hasn't published the exploit code, and that listener condition matters. This is not "every Linux server."

## The pattern

| Incident          | Failure class                                               | Old or new?             |
| ----------------- | ----------------------------------------------------------- | ----------------------- |
| Cursor extension  | Supply chain: a publish path into a marketplace             | Old                     |
| Polymarket script | Third-party code trusted like first-party code              | Old                     |
| Binance           | One compromised machine with a route to production approval | Old                     |
| Linux kernel      | A race-condition bug, with a lower cost to exploit          | Old bug, new cost curve |

Three of the four are failure classes we've been writing postmortems about for years. The fourth is where AI actually changes something, and it changes the economics, not the vulnerability.

"Hard to exploit" has always been a cost estimate. A severity score bakes in an assumption about what an attacker has to spend: patience, skill, money, time. When a model can find the timing and reach root in under an hour, that assumption moves. It doesn't make every bug a 9.8. It means "it needs precise timing" is a weaker reason to wait on a patch than it used to be.

## Why I read this as good news

It's easy to read a week like this and just feel tired. I'd rather read it as a to-do list, because none of it is exotic.

Least privilege, separation of duties, logging, patching, hardening: the same housekeeping that was always on the list and always lost to the roadmap. AI agents change the math in two ways. They hold real credentials, so the cost of skipping this work goes up. And they are good at the tedious parts (auditing what's installed, summarizing logs, scanning code), so the cost of doing it goes down.

The docs become the agent's context. The tests become the evals. The logs become the traces. The boring work finally has a reason to exist.

## What I'd check on Monday

1. **Inventory what you've installed.** Editor extensions, MCP servers, agent plugins, browser extensions. Pin versions, and read the changelog on anything that touches your machine.
2. **Shrink what each one can reach.** Don't run your editor as admin. Keep long-lived credentials out of the places an extension can read.
3. **Know your third-party scripts.** List what loads on any page that handles money or sessions, and constrain it (Content Security Policy, Subresource Integrity).
4. **Separate who can request from who can approve.** For any action that moves money or deletes data, no single machine or person should be able to do both.
5. **Cap and log.** Per-request limits, rate limits, and an audit trail you can reconstruct from.
6. **Shorten your patch clock** for anything network-facing.

## Can your team answer these?

**If an extension or MCP server you installed were compromised today, what could it reach?**
A good answer starts with an inventory and ends with scope: which credentials, SSH keys, and tokens live on that machine, and which of them the tool can read. The Cursor backdoor needed admin rights; that single boundary decided the blast radius. If you can't list what's reachable, assume everything is.

**Who can approve your most dangerous action, and can the same machine also request it?**
This is separation of duties. The requester and the approver should be different identities on different paths, with caps per request and extra approval above a threshold. If one compromised laptop can do both, you have a single point of failure with a signature on it.

**What's your patch window for a critical, network-facing bug, and does "hard to exploit" change it?**
Set windows by exposure and impact, not by how hard the exploit looks today. Difficulty is a cost estimate that is eroding. For unpatched cases, reduce exposure: turn off unused network features and restrict who can reach the service.

**Could you reconstruct what an automated approver or an agent did last Tuesday?**
That takes a trace: what it saw, what it called, with which arguments, what came back, and who or what approved it. Without that, an incident review is guesswork.

## What I'd take from the week

An AI engineer is a software engineer first. If I were designing the degree, it would be a double major in AI and software, with a minor in cybersecurity. Models are the new part. The failure modes are mostly the old ones, with a faster attacker and an agent holding credentials in the middle.

I'm a native iOS engineer by background, and these days I build MCP servers that let agents operate real systems. The work changed less than people think. A program with credentials is a program with credentials.

## Work with me

I help teams ship AI agents and mobile apps with the production hygiene this week was missing: guardrails, observability, and security hardening built in from the start. If you're putting agents near real credentials or real money and want a second set of eyes, [get in touch](/#contact).

## Sources

Checked November 3, 2026.

- Cursor / Claude Code extension: [BleepingComputer](https://www.bleepingcomputer.com/news/security/malicious-claude-code-extension-on-cursor-planted-ssh-backdoors/), [DevOps.com](https://devops.com/malicious-claude-code-extension-affects-up-to-5000-cursor-users)
- Polymarket: [SecurityWeek](https://securityweek.com/2-million-drained-from-polymarket-traders-in-new-supply-chain-attack), [BleepingComputer](https://bleepingcomputer.com/news/security/polymarket-halts-trading-after-crypto-draining-script-breach-25m-traced)
- Binance: [TRM Labs](https://trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)
- Linux kernel and Anthropic: [The Hacker News](https://thehackernews.com/2026/10/linux-kernel-tcp-flaw-with-98-cvss.html), [CSO Online](https://www.csoonline.com/article/4242724/anthropic-ai-model-finds-linux-kernel-bug-that-leads-to-remote-root-access.html)
