---
title: "Google DeepMind introduces Gemini Robotics 2"
date: 2026-07-30
category: model-release
tags: [google-deepmind, robotics, vla, embodied-ai]
short: "Gemini Robotics 2 adds whole-body humanoid control, dexterous manipulation and multi-robot coordination."
links:
  - label: "Official announcement"
    url: "https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/"
  - label: "Embodied reasoning model card"
    url: "https://deepmind.google/models/model-cards/gemini-robotics-er-2/"
  - label: "On-device model card"
    url: "https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/"
---

## What Happened

Google DeepMind announced the Gemini Robotics 2 family on July 30. Gemini Robotics ER 2 became available through Google AI Studio, with an enterprise private preview. The action and on-device models were offered to early-access partners.

## Why It Matters

The family extends DeepMind's earlier upper-body manipulation systems toward coordinated humanoid movement, fine manipulation and collaboration between robots. It connects physical reasoning with action across multiple embodiments. The demonstrations remain bounded: DeepMind explicitly reports continuing difficulties with multifinger dexterity and movement speed.

## Technical Details

Gemini Robotics 2 converts vision and language into motor actions. ER 2, based on Gemini 3.5 Flash, supplies planning, progress tracking and tool orchestration. The separate On-Device 2 model runs locally; DeepMind reports adaptation to new bi-arm platforms using typically fewer than 200 examples. Its model card limits the evaluation scope primarily to standing bi-arm manipulation, rather than whole-body mobility.
