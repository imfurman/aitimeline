---
title: "Claude Managed Agents Enters Public Beta"
date: 2026-04-08
category: tool
tags: [anthropic, claude, agents, managed-runtime]
short: "Anthropic releases Claude Managed Agents in public beta, providing hosted infrastructure for long-running agents."
links:
  - label: "Official announcement"
    url: "https://claude.com/resources/articles/claude-managed-agents"
  - label: "Technical details and date verification"
    url: "https://www.anthropic.com/engineering/managed-agents"
---

## What Happened

On April 8, 2026, Anthropic opened Claude Managed Agents in public beta on the Claude Platform. Developers could define tasks, tools, and guardrails while Anthropic operated the agent infrastructure. Multi-agent coordination and outcome-driven self-evaluation were separately gated research previews.

## Why It Matters

The service moved agent deployment beyond access to a model API. It packaged execution, durable state, permissions, and observability, lowering the infrastructure burden of building applications that work autonomously for extended periods.

## Technical Details

Its architecture separates the session log, agent harness, and execution sandbox. A failed harness can resume from stored events, and sandboxes can be replaced independently. The durable session history exists outside the model context window. MCP authentication uses a proxy and credential vault, keeping external credentials outside generated-code sandboxes. The public launch included sandboxed execution, persistent sessions, scoped access, and tracing.
