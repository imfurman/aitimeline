---
title: "Generative Adversarial Networks"
date: 2014-06-10
category: architecture
tags: [gans, ian-goodfellow, generative-models, deep-learning]
short: "Goodfellow and colleagues introduce GANs, framing generative modeling as a game between a generator and a discriminator."
links:
  - label: "Original paper (arXiv)"
    url: "https://arxiv.org/abs/1406.2661"
  - label: "PDF"
    url: "https://arxiv.org/pdf/1406.2661"
---

## What Happened

In June 2014, the GAN framework was proposed: a generator network learns to produce samples, while a discriminator learns to distinguish generated samples from real data.

## Why It Matters

GANs became one of the most influential families of generative models, shaping research on image synthesis, representation learning, and later—competitive, high-fidelity generation methods used in creative tooling.

## Technical Details

GAN training is posed as a minimax objective between two models. Practical success depends on stabilizing training dynamics, architecture choices, and loss design.
