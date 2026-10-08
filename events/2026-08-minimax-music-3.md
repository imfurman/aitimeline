---
title: "MiniMax Music 3.0"
date: 2026-08-13
category: model-release
tags: [minimax, music-generation, audio, generative-ai]
short: "MiniMax introduces Music 3.0 for generating complete songs of up to five minutes from concepts and optional lyrics."
links:
  - label: "Official announcement"
    url: "https://www.minimax.io/blog/minimax-music-3-0-next-generation-open-weights-production-ready-versatile-music-model"
---

## What Happened

MiniMax introduced Music 3.0 on August 13, 2026. The model generates complete songs from a creative description and optional lyrics, with support for pieces up to five minutes long. This entry dates the model announcement; it does not independently establish the first public download date of every associated checkpoint.

## Why It Matters

The release reflects progress from short audio samples toward generation that maintains a musical idea across a complete composition. Its technical design explicitly separates song-scale organization from fine acoustic detail, making it relevant to the history of long-form generative media.

## Technical Details

Music 3.0 combines a global-local Hybrid-LM with an eight-layer residual-vector-quantization representation. The global component models musical structure, while the local component predicts frame-level acoustics. Their hidden states condition flow matching and a Flow-VAE synthesis stage. MiniMax presents the release as open weights; specific licensing and deployment conditions require the associated checkpoint documentation.
