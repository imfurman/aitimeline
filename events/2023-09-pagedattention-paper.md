---
title: "PagedAttention Paper"
date: 2023-09-12
category: research
tags: [pagedattention, llm-serving, kv-cache, vllm]
short: "The PagedAttention paper formalizes a KV-cache memory management approach for higher-throughput LLM serving and introduces vLLM."
links:
  - label: "Paper (arXiv)"
    url: "https://arxiv.org/abs/2309.06180"
  - label: "vLLM blog post"
    url: "https://blog.vllm.ai/2023/06/20/vllm.html"
---

## What Happened

In September 2023, the PagedAttention paper was posted to arXiv, describing KV-cache memory issues in batched LLM serving and proposing paging-inspired management to reduce fragmentation and waste.

## Why It Matters

The work contributed to a wave of inference engineering research that treats LLM serving as a systems problem, not just a modeling problem—supporting broader adoption by lowering cost per token.

## Technical Details

PagedAttention draws inspiration from virtual memory: it organizes KV-cache storage into fixed-size “pages,” enabling more flexible allocation and less fragmentation under dynamic sequence lengths.
