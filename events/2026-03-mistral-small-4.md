---
title: "Mistral Small 4"
date: 2026-03-16
category: model-release
tags: [mistral, multimodal, reasoning, open-weights, mixture-of-experts]
short: "Mistral releases Small 4, unifying instruction following, reasoning, visual input and agentic coding under Apache 2.0."
links:
  - label: "Official announcement"
    url: "https://mistral.ai/news/mistral-small-4/"
---

## What Happened

Mistral announced and released Small 4 on March 16, 2026. The model combined capabilities previously associated with its separate instruction, reasoning, vision and coding families. The release included Apache 2.0 licensing and support for deployment through widely used inference frameworks.

## Why It Matters

Small 4 simplified an important deployment choice: developers could use one model for fast answers, deeper reasoning, visual understanding and software-agent tasks. The release reflects the consolidation of specialized model families into more general systems that remain available for self-hosting and adaptation.

## Technical Details

The mixture-of-experts architecture has 119 billion total parameters and 128 experts, with four selected per token. Mistral reports six billion active parameters excluding embedding and output layers, or eight billion including them. The model accepts text and images, supports a 256,000-token context window, and exposes configurable reasoning effort to trade latency against extended reasoning.
