---
name: frontend-slides
description: Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Use when the user wants to build a presentation, convert a PPT/PPTX to web, or create slides for a talk/pitch.
---

# Frontend Slides Skill

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser.

## Core Philosophy

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Show, Don't Tell** — Generate visual previews, not abstract choices.
3. **Distinctive Design** — Avoid generic "AI slop" aesthetics.
4. **Production Quality** — Code should be well-commented, accessible, and performant.
5. **Viewport Fitting (CRITICAL)** — Every slide MUST fit exactly within the viewport. No scrolling within slides, ever.

> **详细参考**:
> - 视口适配完整指南：`references/viewport-guide.md`
> - 动画模式参考：`references/animation-guide.md`

---

## Phase 0: Detect Mode

Determine what the user wants:

**Mode A: New Presentation** — User wants to create slides from scratch → Proceed to Phase 1

**Mode B: PPT Conversion** — User has a PowerPoint file (.pptx) to convert → Proceed to Phase 4

**Mode C: Enhancement** — User has an HTML presentation and wants to improve it → Read existing file, then enhance

---

## Phase 1: Content Discovery (New Presentations)

Ask via AskUserQuestion:

**Question 1: Purpose**
- "Pitch deck" — Selling an idea/product/company
- "Teaching/Tutorial" — Explaining concepts, how-to
- "Conference talk" — Speaking at an event
- "Internal presentation" — Team updates, strategy

**Question 2: Slide Count**
- "Short (5-10)" — Quick pitch, lightning talk
- "Medium (10-20)" — Standard presentation
- "Long (20+)" — Deep dive, comprehensive

**Question 3: Content**
- "I have all content ready" — Just need design
- "I have rough notes" — Need help organizing
- "I have a topic only" — Need full outline

---

## Phase 2: Style Discovery (Visual Exploration)

**CRITICAL**: This is "show, don't tell" phase. Generate mini-previews and let user react.

### Step 2.0: Style Path Selection

**Question: Style Selection Method**
- "Show me options" — Generate 3 previews (recommended)
- "I know what I want" — Pick from preset list

### Available Presets

| Preset | Vibe | Best For |
|--------|------|----------|
| Bold Signal | Confident, high-impact | Pitch decks, keynotes |
| Electric Studio | Clean, professional | Agency presentations |
| Creative Voltage | Energetic, retro-modern | Creative pitches |
| Dark Botanical | Elegant, sophisticated | Premium brands |
| Notebook Tabs | Editorial, organized | Reports, reviews |
| Pastel Geometry | Friendly, approachable | Product overviews |
| Neon Cyber | Futuristic, techy | Tech startups |
| Swiss Modern | Minimal, precise | Corporate, data |

### Step 2.1: Generate Style Previews

Generate **3 distinct style previews** as mini HTML files:

```
claude-design/slide-previews/
├── style-a.html
├── style-b.html
├── style-c.html
```

Each preview shows:
- Typography (font choices, hierarchy)
- Color palette (background, accent, text)
- Animation style (how elements enter)
- Overall aesthetic feel

### Step 2.2: Present Previews

```
I've created 3 style previews for you to compare:

**Style A: [Name]** — [1 sentence description]
**Style B: [Name]** — [1 sentence description]
**Style C: [Name]** — [1 sentence description]

Open each file to see them in action.
Which style resonates most?
```

---

## Phase 3: Generate Presentation

Generate the full presentation based on:
- Content from Phase 1
- Style from Phase 2

### File Structure

For single presentations:
```
presentation.html
assets/  (if any images)
```

### Required CSS Architecture

Every presentation MUST include:

1. **Viewport fitting CSS** — See `references/viewport-guide.md` for complete styles
2. **CSS Custom Properties** — Easy theme modification
3. **Responsive breakpoints** — Heights: 700px, 600px, 500px
4. **Reduced motion support** — Respect user preferences

### Required JavaScript Features

1. **SlidePresentation Class** — Keyboard/touch navigation
2. **Intersection Observer** — Scroll-triggered animations
3. **Progress bar** — Visual feedback
4. **Navigation dots** — Jump to specific slides

### Animation Patterns

See `references/animation-guide.md` for:
- Entrance animations (fade, scale, slide, blur)
- Background effects (gradient, noise, grid)
- Interactive effects (3D tilt, parallax)
- Easing functions and timing

### Code Quality Requirements

**Comments**: Every section should have clear comments explaining what it does and how to modify.

**Accessibility**:
- Semantic HTML
- Keyboard navigation
- ARIA labels
- Reduced motion support

**Viewport Fitting (CRITICAL)**:
- Every `.slide` has `height: 100vh; height: 100dvh; overflow: hidden;`
- All typography uses `clamp()`
- Respect content density limits (max 4-6 bullets per slide)
- When content doesn't fit → split into multiple slides

---

## Phase 4: PPT Conversion

### Step 4.1: Extract Content

Use Python with `python-pptx`:

```python
from pptx import Presentation

def extract_pptx(file_path, output_dir):
    prs = Presentation(file_path)
    slides_data = []

    for slide_num, slide in enumerate(prs.slides):
        slide_data = {
            'number': slide_num + 1,
            'title': '',
            'content': [],
            'images': [],
            'notes': ''
        }
        # Extract text and images...

    return slides_data
```

### Step 4.2: Confirm Content Structure

Present extracted content to user:
```
I've extracted the following from your PowerPoint:

**Slide 1: [Title]**
- [Content summary]
- Images: [count]

...

All images saved to assets folder. Proceed with style selection?
```

### Step 4.3: Style Selection

Proceed to Phase 2 with extracted content in mind.

### Step 4.4: Generate HTML

Convert extracted content into chosen style, preserving:
- All text content
- All images (from assets folder)
- Slide order
- Speaker notes (as HTML comments or separate file)

---

## Phase 5: Delivery

### Final Output

1. **Clean up temporary files** — Delete `claude-design/slide-previews/`

2. **Open the presentation**
   ```bash
   open presentation.html
   ```

3. **Provide summary**
   ```
   Your presentation is ready!

   📁 File: presentation.html
   🎨 Style: [Style Name]
   📊 Slides: [count]

   Navigation: Arrow keys or Space to navigate

   To customize:
   - Colors: Look for `:root` CSS variables
   - Fonts: Change Fontshare/Google Fonts link
   - Animations: Modify `.reveal` class timings
   ```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check Fontshare URL, ensure names match |
| Animations not triggering | Verify Intersection Observer is running |
| Scroll snap not working | Ensure `scroll-snap-type` on html |
| Mobile issues | Disable heavy effects at 768px |
| Content overflows | Split slide, reduce content, check clamp() values |

---

## Related Skills

- **learn** — Generate FORZARA.md documentation
- **frontend-design** — For more complex interactive pages
- **markdown-slides** — For simpler Markdown-based presentations

---

*完整参考文档: `references/` 目录*
