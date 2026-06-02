# Color as System

> A palette isn't a collection of swatches — it's a system with roles, hierarchies, and relationships.

---

## Core Idea

Most designers pick colors. The best design systems build color systems. A swatch is a color with a hex value. A system is a color with a job — foundation, signal, neutral, accent, error, success. The job determines where it lives, how it scales, and what it communicates.

**Haglöfs example:** The palette isn't random nature tones — it's structured in three tiers: Core (off-white → charcoal, the foundation), Extended (forest, moss, slate, steel — landscape colors), Signal (red, orange, yellow, blue — technical indicators). Each tier has a job. The tiers create hierarchy.

---

## The Three Roles

Every color in a system plays one of three roles:

### 1. Foundation

The paper, the background, the ground everything sits on. Foundation colors are quiet — they don't ask for attention. They create space for content to breathe.

**Characteristics:**
- High lightness (85%+ for light themes, <15% for dark)
- Low chroma — near-neutral, not pure grey
- Multiple values for layering (paper, paper-2, paper-3)

**Haglöfs:** Off-white (#F5F3EF) → Cream (#E8E4DD) → Charcoal (#2D2A26)

### 2. Signal

The accent, the indicator, the voice at volume. Signals create hierarchy — they say "look here" or "this matters." Every system needs at least one; most need 2-3.

**Characteristics:**
- Medium to high chroma — clearly saturated
- Distinct hue from foundation
- Used sparingly — 5-15% of surface area

**Haglöfs:** Signal Red (#E8453C), Signal Orange (#E87A3C), Signal Yellow (#E8B83C), Signal Blue (#3C7AE8)

### 3. Neutral

The text, the borders, the supporting cast. Neutrals are the unsung heroes — they carry 80% of the information density without calling attention to themselves.

**Characteristics:**
- Low chroma — near-grey but not pure
- Multiple values for hierarchy (primary text, secondary text, tertiary text)
- Consistent warmth or coolness across the scale

**Haglöfs:** Stone (#8A7D6E) — warm grey that bridges nature and tech

---

## The Relationship Rule

Colors don't exist in isolation — they exist in relationship. The relationship between foundation, signal, and neutral determines the system's character.

| Relationship | Character | Example |
|--------------|-----------|---------|
| **High contrast** | Bold, confident, assertive | Black + Signal Red |
| **Low contrast** | Soft, subtle, sophisticated | Warm grey + Muted sage |
| **Warm foundation + Cool signal** | Dynamic, tension | Off-white + Electric blue |
| **Cool foundation + Warm signal** | Inviting, energetic | Slate + Orange |

**Haglöfs tension:** Warm nature foundation (off-white, cream, sand) + Cool tech signals (blue, steel). The temperature contrast IS the brand.

---

## How to Apply

### 1. Start with Roles, Not Colors

Before picking hex values, define the jobs:

```
--color-paper:      [foundation]
--color-paper-2:    [foundation, raised]
--color-paper-3:    [foundation, deepest]
--color-text:       [neutral, primary]
--color-text-2:     [neutral, secondary]
--color-text-3:     [neutral, tertiary]
--color-accent:     [signal, primary]
--color-accent-2:   [signal, secondary]
--color-border:     [neutral, structural]
```

### 2. Build Scales, Not Single Values

Every role needs a scale — a progression from light to dark, or muted to saturated. The scale creates hierarchy within the role.

**Foundation scale:** paper → paper-2 → paper-3 (light → dark layers)
**Signal scale:** accent → accent-2 → accent-3 (saturated → muted)
**Neutral scale:** text → text-2 → text-3 (primary → tertiary)

### 3. Test with Content, Not Swatches

A palette looks good in swatches. It works or fails with content. Test every color against:
- Body text (readability)
- Headlines (hierarchy)
- Buttons (affordance)
- Borders (structure)
- Empty states (mood)

---

## The OKLCH Advantage

OKLCH (Lightness, Chroma, Hue) is perceptually uniform — a 10% lightness change looks like a 10% lightness change, regardless of hue. This makes building scales predictable:

```css
--color-paper:   oklch(96% 0.01 80);   /* warm off-white */
--color-paper-2: oklch(93% 0.01 80);   /* 3% darker */
--color-paper-3: oklch(90% 0.01 80);   /* 6% darker */
```

Same hue, same chroma, predictable lightness steps. No surprises.

---

## Anti-Patterns

1. **Rainbow palettes** — Every hue represented = no hierarchy, no system
2. **Single accent** — One signal color = no nuance, no mood variation
3. **Pure greys** — `#888888` reads as dead; add warmth or coolness
4. **Too many signals** — More than 4-5 accents = visual chaos
5. **Ignoring context** — Colors that work on white may fail on dark backgrounds

---

## Case Study: Haglöfs

**Foundation:** Off-white → Cream → Sand → Charcoal (warm, nature-derived)
**Extended:** Forest, Moss, Slate, Steel (landscape colors, mid-chroma)
**Signal:** Red, Orange, Yellow, Blue (technical indicators, high-chroma)

**Why it works:** The three tiers create clear hierarchy. Foundation is the ground. Extended adds landscape mood. Signal provides technical expression. The temperature contrast (warm foundation + cool signals) creates tension.

---

*Source: Haglöfs Brand Design System by Stockholm Design Lab, 2024*
