# Contributing to AI Timeline

Thank you for your interest in contributing to AI Timeline! This project is community-driven, and every contribution helps build a more complete picture of AI history.

## How to add an event

### Step 1: Fork the repository

Click the **Fork** button at the top of the [GitHub repository](https://github.com/imfurman/aitimeline) to create your own copy.

### Step 2: Create a new event file

Create a new Markdown file in the `/events/` directory.

**File naming convention:**
```
YYYY-MM-slug.md
```

Examples:
- `2024-05-new-model-release.md`
- `2023-11-major-breakthrough.md`
- `2025-01-open-source-tool.md`

The slug should be a short, lowercase, hyphenated description. Use the month the event occurred, not the current date.

### Step 3: Fill in the frontmatter

Every event file must start with YAML frontmatter between `---` delimiters:

```yaml
---
title: "Event Title Here"
date: 2024-05-15
category: model-release
tags: [tag1, tag2, tag3]
short: "A concise one-sentence summary of the event."
links:
  - label: "Official Announcement"
    url: "https://example.com/announcement"
  - label: "Research Paper"
    url: "https://arxiv.org/abs/..."
---
```

#### Required fields

| Field      | Type   | Description                                                |
|------------|--------|------------------------------------------------------------|
| `title`    | string | Event title, in double quotes                              |
| `date`     | date   | Event date in `YYYY-MM-DD` format                          |
| `category` | string | One of the predefined categories (see below)               |
| `short`    | string | One-sentence summary, in double quotes (max ~150 chars)    |

#### Optional fields

| Field   | Type         | Description                                            |
|---------|--------------|--------------------------------------------------------|
| `tags`  | string array | Relevant tags in brackets: `[openai, gpt-4, language-model]` |
| `links` | object array | External links with `label` and `url` fields           |

### Step 4: Write the body content

After the frontmatter, write the event description in Markdown. We recommend these sections:

```markdown
## What Happened

A factual description of the event. What was released, announced, or published?
Who was involved? When exactly did it happen?

## Why It Matters

Why is this event significant? What impact did it have on the AI field,
industry, or society? What did it enable or change?

## Technical Details

(Optional) Architecture details, model specifications, benchmark results,
training data, or other technical information.
```

### Step 5: Open a Pull Request

Commit your file and open a PR against the `main` branch. In the PR description, briefly explain the event and why it should be included.

## Categories

Choose one of these categories for your event:

| Category         | Use for                                           |
|------------------|---------------------------------------------------|
| `model-release`  | New model launched (GPT-4, Llama 2, Claude 3)     |
| `architecture`   | New architecture or technique (Transformer, MoE)   |
| `product-launch` | Product or tool launched (ChatGPT, Copilot)        |
| `research`       | Influential paper or scientific breakthrough       |
| `open-source`    | Notable open-source release or open-weight model   |
| `regulation`     | Policy, law, executive order, or governance event  |
| `milestone`      | Benchmark record, adoption milestone, funding round|
| `tool`           | Developer tool, framework, or infrastructure       |

If an event fits multiple categories, choose the most prominent one.

## Content guidelines

- **Neutral tone:** Write factually and objectively. Avoid promotional language.
- **Accuracy:** Verify dates, numbers, and claims. Cite sources via the `links` field.
- **Conciseness:** The `short` field should be one clear sentence. Body content should be informative but not exhaustive.
- **Relevance:** Events should be significant to the AI field — major model releases, influential papers, widely-used tools, or notable industry events. Not every minor update warrants an entry.
- **No duplicates:** Check existing events before adding a new one. If an event exists but is incomplete, consider improving it instead.

## Improving existing events

You can also contribute by improving existing event files:

- Fix factual errors or typos
- Add missing links or references
- Expand thin descriptions with more detail
- Update categories or tags for better accuracy

## PR review process

1. A maintainer will review your PR for accuracy, formatting, and relevance
2. Minor formatting issues will be fixed during review
3. Factual claims may be verified against the provided links
4. Once approved, the PR will be merged and the site will auto-deploy

## File checklist

Before opening your PR, verify:

- [ ] File is in `/events/` directory
- [ ] Filename follows `YYYY-MM-slug.md` convention
- [ ] Frontmatter includes all required fields (`title`, `date`, `category`, `short`)
- [ ] `date` is in `YYYY-MM-DD` format
- [ ] `category` is one of the predefined values
- [ ] `short` is a single, concise sentence
- [ ] Links are valid and accessible
- [ ] Content is factual and neutrally written

## Running locally

To preview your changes:

```bash
git clone https://github.com/YOUR-USERNAME/aitimeline.git
cd aitimeline
node scripts/build-index.js
open index.html
```

Or use any local server:

```bash
npx serve .
```

## Code of conduct

Be respectful, constructive, and collaborative. We're all here to build something useful for the AI community.

---

Questions? Open an [issue](https://github.com/imfurman/aitimeline/issues) and we'll help you out.
