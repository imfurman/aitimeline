---
title: "DeepSeek V4.1 Flash"
date: 2026-09-10
category: model-release
tags: [deepseek, encoder-decoder, multimodal, kv-cache, open-weights]
short: "DeepSeek launches V4.1 Flash with native vision and an asymmetric architecture designed to reduce long-context serving costs."
links:
  - label: "Official announcement"
    url: "https://deepseek.com/en/news/deepseek-v4-1-flash/"
  - label: "Official model repository"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"
---

## What Happened

DeepSeek launched V4.1 Flash through its API on September 10, 2026. The technical report followed later. The official model repository confirms downloadable weights under MIT; this entry uses the API launch date without assuming that every research artifact appeared simultaneously.

## Why It Matters

V4.1 Flash introduced a notable departure from uniform decoder-only processing. Separating the computation used to ingest context from the computation used to generate output targets input-heavy agents, whose growing histories can make memory and prefill costs dominant.

## Technical Details

The model has a 552-billion-parameter backbone, native image and text input, and context support up to one million tokens. Its Causal Encoder-Decoder uses 20 encoder and 20 decoder layers, activating eight billion parameters during prefill and 16 billion during decoding. Shared and compressed key-value state reduces cache requirements. Additional conditional-memory components mean the backbone count should not be mistaken for the entire stored checkpoint.
