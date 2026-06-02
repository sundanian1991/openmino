# Typography as Voice

> Typeface selection isn't decoration — it's the brand's voice made visible.

---

## Core Idea

Typography is the most direct expression of brand personality. A typeface carries emotional weight before a single word is read. The right pairing creates a voice; the right hierarchy creates a conversation.

**Haglöfs example:** A bespoke 5-font family — Headline, Text, Text Italic, Mono, Numeral — each with a specific role. The serif tradition honors heritage; the monospace companion signals technical precision.

---

## The 2+1 Rule

Every design system needs at minimum:

1. **Display face** — For headlines, hero moments, brand statements. This is the voice at volume.
2. **Body face** — For paragraphs, descriptions, long-form reading. This is the voice in conversation.
3. **Technical companion** (optional but powerful) — Mono or condensed face for specs, data, technical expression.

**The rule:** Never use more than 2 typeface families in a single view. The third is a specialist tool, not a daily driver.

---

## Role Hierarchy

| Role | Purpose | Example |
|------|---------|---------|
| **Display** | Hero headlines, brand moments | Georgia, Playfair Display, custom serif |
| **Text** | Body copy, descriptions | Inter, Helvetica Neue, system sans |
| **Technical** | Specs, data, mono-spaced | SF Mono, JetBrains Mono |
| **Numeral** | Numbers as graphic elements | Custom numeral face |

---

## Weight as Rhythm

Font weight creates visual rhythm:

- **Light/Thin** — Elegant, spacious, premium
- **Regular** — Neutral, readable, workhorse
- **Medium** — Slight emphasis, still readable
- **Semibold** — Section headings, clear hierarchy
- **Bold** — Statements, CTAs, important moments
- **Black/Heavy** — Display only, maximum impact

**The mistake:** Using bold for everything. Bold loses its power when it's everywhere.

---

## How to Apply

### 1. Start with the Brief's Tone

| Tone | Display | Body | Technical |
|------|---------|------|-----------|
| **Editorial** | Serif italic | Serif roman | — |
| **Modern-minimal** | Geometric sans | Geometric sans | Mono |
| **Atmospheric** | Display serif | System sans | — |
| **Playful** | Rounded sans | Humanist sans | — |

### 2. Pair by Contrast, Not Match

**Good contrast:**
- Serif display + Sans body (editorial)
- Condensed display + Wide body (sport)
- Geometric display + Humanist body (modern)

**Bad contrast:**
- Two serifs (fight for attention)
- Two geometric sans (indistinguishable)
- Script + anything (reads as decorative)

### 3. Scale with Purpose

Use a modular scale for hierarchy:

```
--text-xs:   0.75rem   (12px)
--text-sm:   0.875rem  (14px)
--text-base: 1rem      (16px)
--text-lg:   1.125rem  (18px)
--text-xl:   1.25rem   (20px)
--text-2xl:  1.5rem    (24px)
--text-3xl:  1.875rem  (30px)
--text-4xl:  2.25rem   (36px)
--text-5xl:  3rem      (48px)
--text-6xl:  3.75rem   (60px)
```

---

## Case Study: Haglöfs

**Display:** Haglöfs Headline — Serif, 20th-century tradition, honors 110-year heritage
**Body:** Haglöfs Text — Same serif family, optimized for reading
**Technical:** Haglöfs Mono — Monospaced, all-caps, for specs and data
**Numeral:** Haglöfs Numeral — Linked to the symbol, technical expression

**Why it works:** Every font has a clear role. The serif tradition says "heritage"; the mono says "precision." The tension between them IS the brand.

---

## Anti-Patterns

1. **Too many fonts** — More than 3 families in a view = visual chaos
2. **No hierarchy** — Same weight/size everywhere = flat, unreadable
3. **Decorative fonts** — Script, display, novelty = reads as unprofessional
4. **Mismatched pairing** — Two fonts that fight instead of complement
5. **Ignoring weight** — Using only regular = no rhythm, no emphasis

---

*Source: Haglöfs Brand Design System by Stockholm Design Lab + Letters from Sweden, 2024*
