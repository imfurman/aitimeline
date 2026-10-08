---
title: "Qwen3.8 Max-Class Open Weights"
date: 2026-08-12
category: model-release
tags: [alibaba, qwen, open-weights, mixture-of-experts, reasoning]
short: "Alibaba publishes Qwen3.8-2.4T-A95B, bringing its Max-class model line to downloadable weights."
links:
  - label: "Official repository"
    url: "https://github.com/QwenLM/Qwen3.8"
  - label: "Official model repository"
    url: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
---

## What Happened

Alibaba published Qwen3.8-2.4T-A95B on August 12, 2026, according to the official repository’s release log. This date records the downloadable large checkpoint, rather than the earlier hosted-model announcement. A smaller 27-billion-parameter member followed separately.

## Why It Matters

The release made a Qwen Max-class model available for deployment outside Alibaba’s services. It expanded the upper end of the downloadable-model ecosystem, while demonstrating the importance of distinguishing an API product from the checkpoint that underlies it.

## Technical Details

The model contains 2.4 trillion parameters and activates 95 billion. Its architecture combines Gated DeltaNet, gated attention and mixture-of-experts layers. The native context is 262,144 tokens, with extension supported beyond one million. Crucially, this checkpoint is text-only and requires thinking mode; hosted Qwen3.8-Max adds features such as visual input and non-thinking operation. The weights use a custom Qwen3.8-Max license, not the repository’s Apache 2.0 code license.
