---
title: "NVIDIA Nemotron 3 Super"
date: 2026-03-11
category: model-release
tags: [nvidia, nemotron, mamba, mixture-of-experts, open-weights]
short: "NVIDIA releases Nemotron 3 Super with hybrid Mamba-attention architecture, open weights and training resources."
links:
  - label: "Official announcement"
    url: "https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/"
  - label: "Official model repository"
    url: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8"
---

## What Happened

NVIDIA released Nemotron 3 Super on March 11, 2026. Although the Nemotron 3 family had been announced earlier, the March post explicitly marks this model’s availability. NVIDIA provided downloadable weights alongside training resources and deployment integrations for agent systems.

## Why It Matters

The release expanded access beyond a finished model checkpoint. Publishing datasets, reinforcement-learning environments and evaluation recipes gave researchers more material for understanding and reproducing model development. It also made hybrid sequence architectures a practical option for long-running agents.

## Technical Details

Nemotron 3 Super has 120 billion total parameters, with 12 billion activated, and supports a one-million-token context window. Its architecture combines Mamba components, attention and mixture-of-experts layers. LatentMoE improves expert utilization, while multi-token prediction supports faster decoding. NVIDIA also optimized the model for NVFP4 operation on Blackwell hardware. Vendor-reported speedups depend on the specified hardware and workload.
