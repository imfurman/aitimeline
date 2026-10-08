---
title: "GPT-5.3-Codex-Spark Research Preview"
date: 2026-02-12
category: model-release
tags: [openai, codex, cerebras, low-latency]
short: "OpenAI previews Codex-Spark, a text-only coding model served on Cerebras hardware for low-latency interaction."
links:
  - label: "Official announcement"
    url: "https://openai.com/index/introducing-gpt-5-3-codex-spark/"
---

## What Happened

On 2026-02-12, OpenAI released GPT-5.3-Codex-Spark in research preview for ChatGPT Pro users, with limited API access for design partners.

## Why It Matters

The release made inference latency a distinct design target for coding agents, pairing a smaller model with specialized hardware for interactive development. Its historical interest is the combination of model design and serving hardware: faster interaction can change how developers steer an agent, even when the model is smaller than the strongest reasoning system.

## Technical Details

At launch the model was text-only with a 128,000-token context window. OpenAI reported output above 1,000 tokens per second on Cerebras Wafer Scale Engine 3 hardware. Access had separate preview limits.
