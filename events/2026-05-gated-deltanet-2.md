---
title: "Gated DeltaNet-2 Decouples Memory Erasing and Writing"
date: 2026-05-21
category: architecture
tags: [nvidia, linear-attention, recurrent-models, memory]
short: "Gated DeltaNet-2 introduces separate channel-wise erase and write gates for more expressive recurrent memory updates."
links:
  - label: "Research paper"
    url: "https://arxiv.org/abs/2605.22791"
  - label: "Official repository"
    url: "https://github.com/NVlabs/GatedDeltaNet-2"
---

## What Happened

Researchers published Gated DeltaNet-2 on May 21, 2026, alongside its official implementation. The architecture separates decisions about erasing existing associations and writing new information into recurrent memory.

## Why It Matters

Linear-attention models compress history into a fixed-size state, making selective memory updates especially important. Gated DeltaNet-2 develops this alternative to a growing transformer KV cache while retaining efficient parallel training methods.

## Technical Details

The update combines channel-wise decay with independent channel-wise erase and write gates, generalizing earlier Gated DeltaNet and Kimi Delta Attention formulations. The authors compare recurrent and hybrid models at 1.3 billion parameters, trained on 100 billion FineWeb-Edu tokens with matched state sizes. They report improvements in language modeling and retrieval within that experimental setting. The implementation uses NVIDIA's noncommercial source-code license, so public availability should not be confused with unrestricted open-source licensing or permission for commercial use.
