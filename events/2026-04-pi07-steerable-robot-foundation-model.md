---
title: "Physical Intelligence presents pi0.7, a steerable robot foundation model"
date: 2026-04-16
category: research
tags: [robotics, physical-intelligence, vla, generalization]
short: "Physical Intelligence presents pi0.7, using richer context to steer robot behavior and transfer skills across embodiments."
links:
  - label: "Author paper and submission history"
    url: "https://arxiv.org/abs/2604.15483"
  - label: "Original technical report"
    url: "https://arxiv.org/html/2604.15483v1"
---

## What Happened

Physical Intelligence presented pi0.7, a vision-language-action model evaluated across robot platforms and manipulation tasks. The date records the initial arXiv submission, not its April 24 revision. This was a research disclosure; the checked sources do not establish a public release of pi0.7 weights.

## Why It Matters

The work investigates whether a generalist robot can recombine learned skills and transfer dexterous behavior between embodiments. The authors report cross-robot laundry folding and performance approaching specialized policies on selected tasks. These are author-run experiments, not evidence of universal robot competence.

## Technical Details

The approximately five-billion-parameter system combines a Gemma 3 vision-language backbone, video memory and a flow-matching action expert. Training prompts contain subtask instructions, episode-quality metadata and visual subgoals, helping contextualize mixed-quality robot and non-robot data. Some novel tasks use human language coaching; autonomous execution can require subsequent high-level-policy fine-tuning.
