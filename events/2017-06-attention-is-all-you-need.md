---
title: "Attention Is All You Need"
date: 2017-06-12
category: architecture
tags: [google, transformer, attention, deep-learning]
short: "Google researchers introduce the Transformer architecture, replacing recurrence with self-attention and revolutionizing NLP and beyond."
links:
  - label: "Original Paper (arXiv)"
    url: "https://arxiv.org/abs/1706.03762"
  - label: "Wikipedia"
    url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"
---

## What Happened

Ashish Vaswani and colleagues at Google Brain and the University of Toronto published "Attention Is All You Need," introducing the Transformer architecture. The paper proposed a novel neural network design that relied entirely on self-attention mechanisms, dispensing with the recurrent and convolutional layers that had dominated sequence modeling.

## Why It Matters

The Transformer became the foundational architecture behind virtually every major AI breakthrough that followed — from BERT and GPT to DALL·E and beyond. Its parallelizable design enabled training on vastly larger datasets and compute budgets than RNNs allowed. The paper has become one of the most cited in machine learning history, with its impact extending far beyond NLP into vision, audio, biology, and robotics.

## Technical Details

The Transformer uses multi-head self-attention to model relationships between all positions in a sequence simultaneously, rather than processing tokens sequentially. Key innovations included:

- **Scaled dot-product attention** for computing relevance scores between tokens
- **Multi-head attention** allowing the model to attend to different representation subspaces
- **Positional encoding** to inject sequence order information without recurrence
- **Encoder-decoder structure** with stacked layers of attention and feedforward networks

The original model achieved state-of-the-art results on English-to-German and English-to-French translation benchmarks while being significantly faster to train than prior approaches.
