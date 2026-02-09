---
title: "Neural Machine Translation with Attention"
date: 2014-09-01
category: architecture
tags: [attention, neural-machine-translation, nlp, deep-learning]
short: "Bahdanau, Cho, and Bengio propose an attention mechanism for neural machine translation, improving sequence-to-sequence modeling."
links:
  - label: "Original paper (arXiv)"
    url: "https://arxiv.org/abs/1409.0473"
  - label: "PDF"
    url: "https://arxiv.org/pdf/1409.0473"
---

## What Happened

In 2014, the “align and translate” approach introduced attention into neural machine translation, allowing the model to dynamically focus on different parts of the source sentence while generating output.

## Why It Matters

Attention became a key ingredient for handling long-range dependencies and interpretability in sequence modeling, and it directly influenced later architectures that scaled to large pretrained models.

## Technical Details

The model learns soft alignments between input and output tokens, typically implemented via learned scoring functions and normalized weights over encoder states.
