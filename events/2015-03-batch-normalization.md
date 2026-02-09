---
title: "Batch Normalization"
date: 2015-03-02
category: architecture
tags: [batchnorm, optimization, training-stability, deep-learning]
short: "Ioffe and Szegedy introduce Batch Normalization, improving training stability and speed for deep networks."
links:
  - label: "Original paper (arXiv PDF)"
    url: "https://arxiv.org/pdf/1502.03167"
  - label: "arXiv abstract"
    url: "https://arxiv.org/abs/1502.03167"
---

## What Happened

In 2015, Batch Normalization was proposed as a method to normalize intermediate activations during training, reducing sensitivity to initialization and learning-rate choices.

## Why It Matters

BatchNorm became a standard component in many deep learning pipelines, enabling deeper networks and faster convergence, and helping make training large models more practical across tasks.

## Technical Details

BatchNorm normalizes layer inputs using batch statistics and learns scale/shift parameters, typically improving gradient flow and allowing more aggressive optimization settings.
