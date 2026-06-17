# Taste Gate — Pre-Output Checklist

Run before producing any diagram. If any item fails, fix it before outputting the HTML.

---

## Type fit

- [ ] Right type for what I'm showing? (see SKILL.md §3 selection guide)
- [ ] Would a table / paragraph do the same job? (If yes — don't draw.)
- [ ] Loaded the matching `references/type-*.md`?

## Remove test

- [ ] Can I remove any node? (Would a reader still understand?)
- [ ] Can I merge any two nodes? (Do they always travel together?)
- [ ] Can I remove any arrow? (Is the relationship obvious from layout?)
- [ ] Can I remove any label? (Does color or shape already signal it?)

## Signal

- [ ] Accent used on ≤2 elements? If more, which actually deserve focal status?
- [ ] Legend covers every type used — and nothing extra?
- [ ] Within the type's complexity budget? (see SKILL.md §7)

## Spatial (§7 Budget Gate passed)

- [ ] Spatial budget table produced: all elements listed with x/y/w/h
- [ ] Minimum node-to-node spacing ≥ 20px (proximity matrix verified)
- [ ] No node rectangle overlaps another (both x and y intervals checked)
- [ ] Every text label fits within its container width
- [ ] No arrow passes through a non-target node
- [ ] viewBox covers all elements + 40px safety margin
- [ ] Legend is a horizontal bottom strip, not floating?

## Technical

- [ ] Arrows drawn before boxes?
- [ ] Every arrow label has an opaque `fill="#f5f4ed"` rect behind it?
- [ ] No vertical `writing-mode` text?
- [ ] `viewBox` expanded for the legend strip (~60px)?
- [ ] Every font size, coord, width, height, gap divisible by 4?
- [ ] No emoji characters in the diagram?
- [ ] All colors come from style-guide.md tokens (no hardcoded non-standard colors)?

## Typography

- [ ] Human-readable names in Geist sans, not Geist Mono?
- [ ] Technical sublabels (ports, commands, URLs) in Geist Mono?
- [ ] Page title in Instrument Serif?
- [ ] Annotation callouts (if any) in *italic* Instrument Serif? (see [primitive-annotation.md](primitive-annotation.md))
- [ ] No JetBrains Mono anywhere?

---

## Fail conditions

If **any** of these are true, do not output:

1. Any node rectangle overlaps another
2. Accent color used on >2 elements
3. Font size not divisible by 4
4. Arrow label without opaque mask rect
5. Color not in style-guide.md tokens
6. Emoji in diagram
7. Legend floating inside diagram area

Fix, then re-run this checklist.
