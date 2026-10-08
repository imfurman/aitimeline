---
title: "Decoupled DiLoCo for Resilient Distributed Pre-training"
date: 2026-04-23
category: architecture
tags: [google-deepmind, distributed-training, diloco, fault-tolerance]
short: "Google DeepMind introduces asynchronous training across independent compute groups to isolate failures and reduce synchronization stalls."
links:
  - label: "Official announcement"
    url: "https://deepmind.google/blog/decoupled-diloco/"
  - label: "Research paper"
    url: "https://arxiv.org/abs/2604.21428"
---

## What Happened

Google DeepMind published Decoupled DiLoCo and its paper on April 23, 2026. The framework divides large training jobs into independent learner groups that communicate asynchronously, allowing unaffected groups to continue when others fail or slow down.

## Why It Matters

Global synchronization becomes increasingly expensive and fragile as training infrastructure grows. Decoupled DiLoCo offers a route toward more resilient training across distant data centers and heterogeneous operating conditions, without requiring every accelerator to progress in lockstep.

## Technical Details

Building on Pathways and DiLoCo, learners perform local optimization and send parameter fragments to a synchronizer. A minimum quorum, adaptive grace window and token-weighted merging accommodate stragglers. The authors evaluate dense and mixture-of-experts models across text and vision tasks. Their million-chip results come from failure simulations, which reported no global downtime; they should not be interpreted as a production training run on a million physical chips.
