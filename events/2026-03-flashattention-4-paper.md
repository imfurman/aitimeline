---
title: "FlashAttention-4 Paper and FlexAttention Integration"
date: 2026-03-05
category: tool
tags: [flashattention, gpu-kernels, pytorch, blackwell, efficiency]
short: "FlashAttention-4's technical paper and PyTorch integration describe attention kernels optimized for modern GPU bottlenecks."
links:
  - label: "Research paper"
    url: "https://arxiv.org/abs/2603.05451"
  - label: "Author announcement"
    url: "https://www.together.ai/blog/flashattention-4"
  - label: "PyTorch integration"
    url: "https://pytorch.org/blog/flexattention-flashattention-4-fast-and-flexible/"
---

## What Happened

Researchers published the FlashAttention-4 paper on March 5, 2026. PyTorch announced a corresponding FlexAttention backend that day. This entry dates the technical publication and framework integration; earlier code and previews preceded them.

## Why It Matters

Attention is a central cost in transformer training and inference. Optimizing it for changing GPU bottlenecks extends the practical value of newer hardware. FlexAttention integration also makes these techniques available for customized attention patterns.

## Technical Details

FlashAttention-4 uses asynchronous matrix operations, larger tiles, conditional softmax rescaling, software-emulated exponentials and Blackwell tensor-memory features. Its implementation uses Python-embedded CuTe DSL. The authors report maximum BF16 kernel speedups of 1.3 times over cuDNN 9.13 and 2.7 times over Triton on B200 GPUs. These are configuration-specific attention measurements, not equivalent whole-model speedups. PyTorch generates score and mask modifications and instantiates compatible kernels through its compiler.
