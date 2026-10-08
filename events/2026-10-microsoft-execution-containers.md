---
title: "Microsoft Execution Containers Becomes Generally Available"
date: 2026-10-07
category: tool
tags: [microsoft, agents, sandboxing, security]
short: "Microsoft makes Execution Containers generally available to enforce policy boundaries around AI agent workloads."
links:
  - label: "Official announcement"
    url: "https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/"
---

## What Happened

On October 7, 2026, Microsoft announced general availability of Microsoft Execution Containers (MXC), including Windows 365 support. The release provides an execution boundary for agent-generated code, tools, plugins, or entire agents.

## Why It Matters

Agents with access to real files and services need enforceable limits. MXC treats those limits as platform policy outside the agent's control, making containment part of deployment infrastructure rather than relying entirely on prompting or model behavior.

## Technical Details

Developers declare required resources through a unified JSON schema and SDK. MXC maps policies to backends across Windows, macOS, and Linux. Process containment uses platform sandboxes; Windows additionally supports isolated sessions and WSL containers. MicroVM support was experimental. Policies can constrain files, network destinations, and UI access. Windows learning modes record blocked access to aid policy design. Announced Entra attribution and Intune management integrations were still forthcoming.
