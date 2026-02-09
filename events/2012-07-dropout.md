---
title: "Dropout"
date: 2012-07-03
category: research
tags: [dropout, regularization, deep-learning]
short: "Dropout is introduced as a simple stochastic regularization technique that improves generalization in neural networks."
links:
  - label: "Original paper (arXiv)"
    url: "https://arxiv.org/abs/1207.0580"
  - label: "PDF"
    url: "https://arxiv.org/pdf/1207.0580"
---

## What Happened

In July 2012, researchers proposed “dropout,” a training-time technique where units are randomly omitted, reducing co-adaptation and overfitting in neural networks.

## Why It Matters

Dropout became a widely adopted regularization method and a canonical example of “cheap, effective” training tricks that improved reliability—especially important as models grew larger and more expressive.

## Technical Details

Dropout can be interpreted as training an ensemble of subnetworks and approximating model averaging at inference time through weight scaling.
