---
title: "FlashAttention"
date: 2022-05-27
category: architecture
tags: [flashattention, kernels, transformer, efficiency]
short: "FlashAttention is introduced as an IO-aware exact attention algorithm that improves speed and memory efficiency for Transformers."
links:
  - label: "Paper (arXiv)"
    url: "https://arxiv.org/abs/2205.14135"
  - label: "Official implementation"
    url: "https://github.com/Dao-AILab/flash-attention"
---

## What Happened

In May 2022, the FlashAttention paper presented an exact attention computation approach designed to reduce memory reads/writes between GPU memory hierarchies.

## Why It Matters

Efficiency techniques like FlashAttention helped make training and inference for large transformer models more practical, especially as context lengths and model sizes increased.

## Technical Details

FlashAttention uses tiling and IO-aware scheduling to reduce HBM traffic, improving throughput while preserving exact attention semantics.
