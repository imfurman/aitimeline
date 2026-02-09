---
title: "Claude Computer Use"
date: 2024-10-29
category: product-launch
tags: [anthropic, claude, computer-use, agentic, tool-use]
short: "Anthropic launches Claude computer use in public beta, enabling Claude to interact with desktop environments by viewing screens and controlling mouse and keyboard."
links:
  - label: "Anthropic Blog"
    url: "https://www.anthropic.com/news/3-5-sonnet-computer-use"
---

## What Happened

Anthropic launched computer use capabilities for Claude as a public beta, alongside Claude 3.5 Sonnet (upgraded). This feature enabled Claude to interact with computer interfaces by viewing screenshots, moving the mouse cursor, clicking buttons, and typing text — essentially operating a computer the way a human would. Developers could integrate this capability through the Anthropic API.

## Why It Matters

Computer use represented a paradigm shift in AI capabilities — from models that could only generate text and code to models that could directly interact with software interfaces. This opened the door to:

- **Agentic workflows** where AI could complete multi-step tasks across different applications
- **Legacy software automation** — interacting with applications that don't have APIs
- **Software testing** — AI that could click through and verify user interfaces
- **Accessibility** — assisting users who have difficulty operating traditional interfaces

It was one of the first production-grade implementations of an AI agent that could operate a general-purpose computer.

## Technical Details

- **Model:** Claude 3.5 Sonnet (upgraded) with specialized computer use training
- **Capabilities:** Screenshot viewing, mouse movement and clicks, keyboard input, scrolling
- **Integration:** Available via Anthropic API with a computer use tool specification
- **Approach:** The model receives screenshots of the desktop and outputs sequences of actions (click coordinates, keystrokes, etc.)
- **Limitations:** Initially slower than human operators, occasional coordinate accuracy issues, required visual verification loops
