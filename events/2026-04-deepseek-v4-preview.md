---
title: "DeepSeek V4 Preview"
date: 2026-04-24
category: model-release
tags: [deepseek, open-weights, sparse-attention, long-context, agents]
short: "DeepSeek releases V4 Pro and Flash previews with downloadable weights and one-million-token context support."
links:
  - label: "Official announcement"
    url: "https://deepseek.com/en/news/v4-preview/"
---

## What Happened

DeepSeek released the V4 Preview family on April 24, 2026, making Pro and Flash available through its services and publishing weights. The official announcement explicitly identifies these as preview models. Later production updates should not be confused with this first public release.

## Why It Matters

V4 introduced a major new generation of DeepSeek’s architecture and extended its standard context capacity to one million tokens. Providing two model scales made the same architectural direction accessible across different capability and efficiency requirements, strengthening the ecosystem of self-hostable agent models.

## Technical Details

V4 Pro has 1.6 trillion total parameters with 49 billion active; Flash has 284 billion total with 13 billion active. The architecture combines token-wise compression with DeepSeek Sparse Attention to reduce long-context computation and memory costs. Both variants offer thinking and non-thinking modes, and the initial API supports OpenAI ChatCompletions and Anthropic-compatible interfaces.
