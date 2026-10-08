---
title: "TwELL: Hardware-Efficient Sparse Transformer Computation"
date: 2026-03-24
category: architecture
tags: [sakana-ai, nvidia, sparsity, transformer, gpu-kernels]
short: "Sakana AI and NVIDIA introduce TwELL storage and CUDA kernels that turn sparse transformer activations into practical efficiency gains."
links:
  - label: "Research paper"
    url: "https://arxiv.org/abs/2603.23198"
  - label: "Author technical blog"
    url: "https://pub.sakana.ai/sparser-faster-llms/"
  - label: "Official announcement"
    url: "https://sakana.ai/twell/"
---

## What Happened

Sakana AI and NVIDIA researchers submitted their sparse-transformer paper on March 24, 2026. A later Sakana announcement appeared on May 9. The work introduces Tile-wise ELLPACK, or TwELL, and specialized CUDA kernels for exploiting sparse feed-forward activations.

## Why It Matters

Removing arithmetic does not automatically make GPU execution faster: irregular memory access can erase the benefit. TwELL addresses this hardware mismatch, making activation sparsity a more practical option for reducing transformer computation and training memory.

## Technical Details

TwELL packs nonzero activations within tiles suited to GPU execution. A hybrid representation handles sparse rows compactly while preserving a dense fallback for unusually active rows. The authors evaluate billion-parameter models trained with ReLU-based activations and sparsity regularization, reporting throughput and memory improvements. These findings concern their training recipe and kernels; they do not establish a drop-in speedup for every existing language model.
