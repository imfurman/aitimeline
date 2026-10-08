---
title: "Voxtral TTS"
date: 2026-03-23
category: model-release
tags: [mistral, voxtral, speech-generation, open-weights]
short: "Mistral launches Voxtral TTS and publishes a reference-voice model under the noncommercial CC BY-NC 4.0 license."
links:
  - label: "Official announcement"
    url: "https://mistral.ai/news/voxtral-tts/"
---

## What Happened

Mistral launched its first text-to-speech model, Voxtral TTS, on March 23, 2026. It became available through the company’s API and Studio, while a model with reference voices was published as downloadable weights. Those weights use CC BY-NC 4.0, which restricts commercial use.

## Why It Matters

The release added a speech-output component to Mistral’s existing audio-understanding stack. It provided another route to building customizable voice systems and studying multilingual speech generation outside an exclusively hosted product. The licensing distinction matters: downloadable weights do not make this a permissively licensed open-source model.

## Technical Details

Voxtral TTS has roughly four billion parameters and supports nine languages. Its architecture combines an autoregressive Transformer backbone, a flow-matching acoustic Transformer and a neural audio codec. It supports streaming and reference-voice adaptation. Mistral also reports cross-lingual voice transfer, allowing speech content and the reference speaker’s language to differ.
