---
title: "Meta Muse Glimmer"
date: 2026-08-10
category: model-release
tags: [meta, muse, local-ai, agents, open-weights]
short: "Meta releases Muse Glimmer, a 30-billion-parameter multimodal model for local agents, under Apache 2.0."
links:
  - label: "Official announcement"
    url: "https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model"
---

## What Happened

Meta released Muse Glimmer on August 10, 2026, publishing its weights under Apache 2.0. The 30-billion-parameter model was designed for local agent workflows on personal computers, with downloadable quantized variants and a companion model for faster generation.

## Why It Matters

Glimmer brought downloadable weights to Meta’s Muse generation and emphasized a different deployment goal from increasingly large cloud models. Running an agent locally can give users more control over private context, connectivity and inference infrastructure. The permissive license also widened opportunities to adapt and redistribute the model.

## Technical Details

The model was distilled from Muse Spark through pretraining, longer-context mid-training, supervised fine-tuning, on-policy distillation and reinforcement learning. It accepts text and images and supports configurable reasoning effort. Quantization reduces memory requirements, while a DFlash drafter enables speculative decoding. Practical deployment depends on the chosen quantization and available memory, rather than parameter count alone.
