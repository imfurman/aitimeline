---
title: "GLM-5"
date: 2026-02-11
category: model-release
tags: [z-ai, glm, open-weights, agents, sparse-attention]
short: "Z.ai releases GLM-5, an open-weight model built for complex software engineering and long-horizon agent tasks."
links:
  - label: "Official model repository"
    url: "https://huggingface.co/zai-org/GLM-5"
  - label: "Official model repository"
    url: "https://huggingface.co/zai-org/GLM-5/commits/main"
  - label: "Official repository"
    url: "https://github.com/zai-org/GLM-5"
---

## What Happened

Z.ai released GLM-5 in February 2026. Its official weight repository records uploads and initial deployment instructions on February 11; the API changelog records the platform update on February 12. The technical report followed on February 17. This entry uses the model-release date rather than the later report date.

## Why It Matters

GLM-5 expanded the set of downloadable models aimed at sustained software engineering. Its combination of model scaling, sparse attention and agent-oriented post-training made complex development workflows a central design goal, rather than treating coding as isolated text completion.

## Technical Details

The developers describe a mixture-of-experts architecture with 744 billion total parameters and 40 billion activated per token. DeepSeek Sparse Attention reduces attention costs, while the slime asynchronous reinforcement-learning infrastructure supports post-training. The downloadable weights use the MIT license. This is distinct from the Apache 2.0 license displayed by the accompanying code repository.
