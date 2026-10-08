---
title: "MiniMax H3 Open-Weight Release"
date: 2026-08-03
category: model-release
tags: [minimax, video-generation, audio-generation, multimodal, open-weights]
short: "MiniMax publishes H3-Base checkpoints for multimodal-conditioned video and stereo-audio generation."
links:
  - label: "Official announcement"
    url: "https://www.minimax.io/news/minimax-h3-open-source"
---

## What Happened

On August 3, 2026, MiniMax announced the public weight release of H3-Base, following the broader H3 product announcement. Two checkpoints support text and first/last-frame generation, or generation from multimodal references. The release uses the MiniMax H3 Community License.

## Why It Matters

H3 broadened access to models that jointly generate video and sound from richer context than a text prompt alone. The available checkpoints allow local deployment and adaptation, while the release also illustrates why an open-weight component should not be mistaken for an entirely open production system.

## Technical Details

A 33-billion-parameter dense Omni-Transformer jointly predicts video and audio latents. Local H3-Base output is 768p. The complete service can produce up to 15 seconds with stereo audio and 2K output, but the Context-IR preprocessing system and Regenerate-2K module were not included in this release. The initial downloadable inference implementation uses full attention.
