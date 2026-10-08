---
title: "Meta Launches Muse Personal AI Agent"
date: 2026-09-08
category: product-launch
tags: [meta, muse, agents, security]
short: "Meta launches Muse, a personal agent with a dedicated cloud VM, persistent work, and an independent permission system."
links:
  - label: "Official announcement"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - label: "Technical details and date verification"
    url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse"
---

## What Happened

Meta launched Muse on September 8, 2026, beginning a U.S. rollout on iOS, Android, and the web. Its September 8 engineering account independently confirms the launch; the newsroom article also displays a later September 30 update.

## Why It Matters

Muse combined a consumer personal assistant with persistent execution across services. Its significance lies in packaging both autonomous work and explicit security boundaries for ordinary users, rather than relying only on a model's willingness to follow instructions.

## Technical Details

Each user receives a dedicated cloud VM. The agent operates in an isolated runtime, while credentials and security-sensitive services remain outside it. A separate Sentinel controls connector permissions and network egress. Muse can continue work after the app closes and request approval for sensitive actions. Meta's planned Confidential VM, intended to prevent even Meta from accessing VM data, was not the architecture generally released at launch.
