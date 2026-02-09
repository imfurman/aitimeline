---
title: "AlphaFold 2"
date: 2020-11-30
category: research
tags: [deepmind, alphafold, protein-folding, biology, casp]
short: "DeepMind's AlphaFold 2 solves the protein structure prediction problem at CASP14, achieving accuracy comparable to experimental methods."
links:
  - label: "Nature Paper"
    url: "https://www.nature.com/articles/s41586-021-03819-2"
  - label: "DeepMind Blog"
    url: "https://deepmind.google/discover/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/"
---

## What Happened

At the CASP14 (Critical Assessment of protein Structure Prediction) competition in November 2020, DeepMind's AlphaFold 2 achieved a median GDT score of 92.4 out of 100 — a level of accuracy comparable to experimental methods like X-ray crystallography. This effectively solved the protein structure prediction problem, a grand challenge in biology that had remained unsolved for 50 years.

## Why It Matters

Protein structure prediction was considered one of the most important open problems in biology. Understanding how proteins fold determines their function, which is fundamental to drug discovery, disease understanding, and biotechnology. AlphaFold 2's breakthrough:

- **Accelerated biological research** — DeepMind later released predicted structures for nearly all known proteins (~200 million)
- **Won the 2024 Nobel Prize in Chemistry** for Demis Hassabis and John Jumper
- **Demonstrated AI's potential** to solve fundamental scientific problems, not just commercial applications
- **Inspired AI-for-science** initiatives across chemistry, materials science, and climate research

## Technical Details

- **Architecture:** Novel attention-based architecture incorporating:
  - "Evoformer" blocks that reason about spatial and evolutionary relationships
  - Structure module that directly predicts 3D atomic coordinates
  - Iterative recycling mechanism for self-refinement
- **Input:** Multiple sequence alignment (MSA) and template structures
- **Output:** All-atom 3D protein structure with per-residue confidence scores
- **CASP14 results:** Median GDT of 92.4 (next best: ~70), with many predictions accurate to ~1 Ångström
