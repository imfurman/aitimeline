---
title: "Whisper"
date: 2022-09-21
category: model-release
tags: [whisper, speech-recognition, openai, open-source]
short: "OpenAI releases Whisper, an open-source multilingual speech recognition system trained for robust transcription and translation."
links:
  - label: "OpenAI announcement"
    url: "https://openai.com/index/whisper/"
  - label: "Code (GitHub)"
    url: "https://github.com/openai/whisper"
---

## What Happened

In September 2022, OpenAI published Whisper and open-sourced models and inference code, describing a transformer-based ASR system trained on large-scale web data.

## Why It Matters

Whisper became a widely used building block for voice interfaces, transcription tools, and local speech pipelines—especially valuable for developers seeking strong baseline ASR without paid APIs.

## Technical Details

Whisper is implemented as an encoder–decoder Transformer operating on audio features (e.g., log-Mel spectrograms), supporting transcription and translation tasks within a unified model.
