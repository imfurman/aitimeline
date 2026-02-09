---
title: "InstructGPT and RLHF"
date: 2022-03-04
category: research
tags: [rlhf, alignment, instructgpt, openai]
short: "OpenAI publishes InstructGPT, showing that fine-tuning with human feedback can make models more helpful even at smaller sizes."
links:
  - label: "Paper (arXiv)"
    url: "https://arxiv.org/abs/2203.02155"
  - label: "OpenAI (historical context)"
    url: "https://openai.com/"
---

## What Happened

In March 2022, OpenAI published research describing “Training language models to follow instructions with human feedback,” outlining a practical pipeline combining supervised demonstrations and reinforcement learning from human preferences (RLHF).

## Why It Matters

RLHF-style alignment became a standard approach for making large language models more usable in products, influencing instruction tuning, preference optimization, and evaluation practices across the industry.

## Technical Details

The pipeline typically includes supervised fine-tuning on human demonstrations, training a reward model from preference data, and optimizing the policy to maximize that reward signal.
