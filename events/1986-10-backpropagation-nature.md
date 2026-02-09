---
title: "Learning representations by back-propagating errors"
date: 1986-10-09
category: architecture
tags: [backpropagation, geoffrey-hinton, neural-networks, optimization]
short: "Rumelhart, Hinton, and Williams publish a widely influential account of backpropagation, accelerating practical training of neural networks."
links:
  - label: "Nature article page"
    url: "https://www.nature.com/articles/323533a0"
  - label: "PDF copy"
    url: "https://www.iro.umontreal.ca/~vincentp/ift3395/lectures/backprop_old.pdf"
---

## What Happened

In October 1986, David Rumelhart, Geoffrey Hinton, and Ronald Williams published “Learning representations by back-propagating errors” in *Nature*. The work described how error signals can be propagated backward through layers to adjust weights and learn internal representations.

## Why It Matters

Backpropagation became a core method enabling training of multi-layer neural networks, and it underpins much of the practical deep learning stack that later scaled with larger datasets, better hardware, and improved architectures.

## Technical Details

Backpropagation efficiently computes gradients of a loss function with respect to parameters through layered computation, making gradient-based optimization feasible for complex networks.
