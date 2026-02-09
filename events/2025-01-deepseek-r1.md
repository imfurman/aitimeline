---
title: "DeepSeek R1"
date: 2025-01-20
category: open-source
tags: [deepseek, r1, reasoning, open-source, china]
short: "DeepSeek releases R1, an open-weight reasoning model rivaling OpenAI's o1 at a fraction of the training cost, shaking up the AI industry."
links:
  - label: "DeepSeek R1 Paper (arXiv)"
    url: "https://arxiv.org/abs/2501.12948"
  - label: "DeepSeek R1 on Hugging Face"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-R1"
---

## What Happened

Chinese AI lab DeepSeek released R1, an open-weight reasoning model that matched or exceeded OpenAI's o1 on major reasoning benchmarks. Built on the DeepSeek-V3 base model and trained using reinforcement learning to develop chain-of-thought reasoning, R1 was released with full model weights. Most strikingly, DeepSeek reported a training cost of approximately $5.6 million — a fraction of what comparable Western models were estimated to cost.

## Why It Matters

DeepSeek R1 sent shockwaves through the AI industry and financial markets:

- **Cost efficiency:** Demonstrated that frontier-class reasoning models could be trained for far less than assumed, challenging the narrative that AI progress required billions in compute investment
- **Geopolitical impact:** Showed that Chinese AI labs could produce competitive models despite US chip export restrictions
- **Market reaction:** Triggered a significant sell-off in AI-related stocks, with Nvidia losing hundreds of billions in market cap in a single day
- **Open-source boost:** Released with MIT license, enabling unrestricted use and modification
- **Paradigm challenge:** Raised questions about whether the massive compute investments planned by Western tech companies were necessary

## Technical Details

- **Architecture:** Based on DeepSeek-V3 (Mixture-of-Experts, 671B total parameters, ~37B active)
- **Training approach:** Pure reinforcement learning (RL) to develop reasoning chains, without supervised fine-tuning on reasoning examples
- **Key innovation:** R1-Zero variant showed that RL alone (without human-provided reasoning examples) could teach models to reason step-by-step
- **Distillation:** Released smaller distilled versions (1.5B to 70B) that transferred reasoning capabilities to smaller models
- **Benchmark results:** Competitive with OpenAI o1 on AIME, Codeforces, GPQA, and MATH
- **Training cost:** ~$5.6M (compared to estimated $100M+ for comparable Western models)
