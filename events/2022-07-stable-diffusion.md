---
title: "Stable Diffusion"
date: 2022-08-22
category: open-source
tags: [stability-ai, stable-diffusion, image-generation, diffusion, open-source]
short: "Stability AI releases Stable Diffusion as open source, democratizing high-quality text-to-image generation and igniting the open generative AI movement."
links:
  - label: "Stability AI Announcement"
    url: "https://stability.ai/blog/stable-diffusion-public-release"
  - label: "Original Paper (arXiv)"
    url: "https://arxiv.org/abs/2112.10752"
  - label: "GitHub Repository"
    url: "https://github.com/CompVis/stable-diffusion"
---

## What Happened

Stability AI, in collaboration with researchers from LMU Munich (CompVis group) and Runway, publicly released Stable Diffusion — a latent diffusion model for text-to-image generation — as open-source software. Unlike DALL·E 2 and Midjourney, which were accessible only through APIs or closed platforms, Stable Diffusion could be downloaded and run locally on consumer GPUs.

## Why It Matters

Stable Diffusion's open release was a watershed moment for generative AI. By making a high-quality image generation model freely available, it:

- **Democratized access** — anyone with a decent GPU could generate images locally
- **Spawned an ecosystem** — thousands of fine-tuned variants, tools, and UIs (Automatic1111, ComfyUI) emerged within weeks
- **Challenged closed AI models** — demonstrated that open-source could compete with proprietary systems
- **Accelerated the debate** around AI art, copyright, consent, and creative labor

## Technical Details

- **Architecture:** Latent Diffusion Model (LDM) — performs the diffusion process in a compressed latent space rather than pixel space, dramatically reducing compute requirements
- **Components:** CLIP text encoder, U-Net denoiser, VAE encoder/decoder
- **Training data:** LAION-5B dataset (5 billion image-text pairs)
- **Key advantage:** Could run on consumer GPUs with 8GB+ VRAM (vs. hundreds of GPU-hours for comparable models)
- **Resolution:** 512×512 (v1), later 768×768 and higher in subsequent versions
