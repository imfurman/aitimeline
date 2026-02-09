---
title: "Mistral 7B"
date: 2023-09-27
category: open-source
tags: [mistral, open-source, language-model, efficient]
short: "French startup Mistral AI releases Mistral 7B, an efficient open-source model that outperforms Llama 2 13B on all benchmarks."
links:
  - label: "Mistral AI Blog"
    url: "https://mistral.ai/news/announcing-mistral-7b/"
  - label: "Original Paper (arXiv)"
    url: "https://arxiv.org/abs/2310.06825"
  - label: "GitHub Repository"
    url: "https://github.com/mistralai/mistral-src"
---

## What Happened

French AI startup Mistral AI released Mistral 7B, a 7.3-billion parameter language model distributed via a direct torrent link — an unconventional release method that made headlines. Despite its small size, Mistral 7B outperformed Llama 2 13B on all evaluated benchmarks and approached the performance of Llama 2 34B on many tasks.

## Why It Matters

Mistral 7B demonstrated that smart architectural choices could make smaller models punch well above their weight class. Released under the Apache 2.0 license with no restrictions, it became one of the most popular foundation models for fine-tuning and deployment. Mistral AI's emergence also established Europe as a serious player in the AI foundation model race, backed by a rapid rise to multi-billion dollar valuation.

## Technical Details

- **Architecture:** Transformer decoder with two key innovations:
  - **Sliding Window Attention (SWA):** Limits attention to a local window of 4,096 tokens while enabling information flow across the full sequence through stacked layers
  - **Grouped-Query Attention (GQA):** Reduces memory bandwidth requirements during inference
- **Parameters:** 7.3 billion
- **Context window:** 8,192 tokens (with effective context via SWA)
- **Training data:** Not disclosed
- **Performance:** Outperformed Llama 2 13B on all benchmarks; competitive with Llama 2 34B on code and math
- **License:** Apache 2.0 (fully permissive)
