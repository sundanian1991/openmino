---
name: viz:editorial-card-generator
description: 将文字内容转为杂志风 HTML5 信息海报（多卡片，支持导出 PNG）。适用于信息图、知识卡片、社交媒体海报等需求。
allowed-tools: Read, Write
---

# Editorial Style Informational Poster Generator

## Task

Transform user-provided text content into a set of 3-6 high-aesthetic, magazine-style HTML5 informational posters (adaptively based on content).

## Design Specifications

### Core Style
- **Style**: Modern Editorial + Swiss Style (Swiss Internationalism)
- **Visual**: Order, high contrast, large typography, print media texture
- **Size**: Strictly locked to width: 600px, height: 800px (3:4 ratio)

### Color Scheme

**Default Theme — Hermès Orange:**
- **Bg (Paper)**: #f2efe9 (off-white/warm gray)
- **Text (Ink)**: #1a1a1a (dark gray)
- **Accent (Emphasis)**: #d95e00 (Hermès orange)

**Variant Theme — 合欢红 (Silk Tree Red):**
- **Bg (Paper)**: #F1F0EC (silver white,严禁纯白)
- **Text (Ink)**: #1a1a1a (dark gray)
- **Accent (Emphasis)**: #E07563 (合欢红 — warm, slightly muted red)

**Visual Rhythm**: Cards should have "light-light-dark-light" or "light-dark-light" rhythmic variation.
通过色彩饱和度差异营造高级感，而非色相堆砌。

### Font Stack (CDN)
Include Google Fonts in HTML Head:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Oswald:wght@500;700&display=swap" rel="stylesheet">
```

### Texture Requirements
- **SVG Noise**: Global overlay of feTurbulence noise with opacity 0.05~0.08, blend mode using multiply
- **Shadow**: Cards need unified deep shadow (0 25px 80px rgba(0, 0, 0, 0.4)), creating floating effect

## Pagination Logic

Analyze the word count and logical structure of the [Input Content] to automatically determine the number of cards (usually 3-6):

### Card 1: The Cover
- **Content**: Extracted main title + very short subtitle/tagline
- **Design**: Huge font size, minimalist, visual impact first. Use "破格" elements (text skew, color block切割)
- **Key Elements**: Extra-large numbers/percentages, short powerful titles
- **Required Elements**: Main title, subtitle, core symbol (FontAwesome decoration), author tag `作者：AI 启蒙小伙伴`（右下角小标签）

### Card 2 ~ N-1: The Content
- **Splitting Principle**: Don't crowd! One core point/one chapter = one card
- **List Content**: Use "list layout" (01/02/03)
- **Deep Analysis**: Use "image-text mixed layout" (left text right decoration, or top text bottom summary)
- **Key Emphasis**: Must include a **Dark Mode card** to showcase core data, quotes, or most important concepts

### Card N: The Outro
- **Content**: Concluding statement, CTA (Call to Action) or simple closing
- **Design**: More whitespace, steady ending
- **Required Elements**: Bottom bar with 小红书 + 微信 Logo placeholders (FontAwesome icons),署名 `AI 启蒙小伙伴`

## Output Requirements

### HTML Structure
1. Output a single HTML file containing all CSS/JS
2. Use Tailwind CSS + FontAwesome (CDN)
3. Layout: Use flex-wrap to arrange all cards horizontally
4. **CSS must add `flex-shrink: 0` to cards to prevent compression deformation**

### Required Features
- Integrate html2canvas library (CDN: `https://html2canvas.hertzen.com/dist/html2canvas.min.js`)
- Provide "Export All Cards" button:
  - Position: Fixed positioning in top-right corner
  - Style: Orange button with download icon
  - Click to export each card as high-definition PNG (2x resolution)
  - Show export progress indicator
  - File naming format: `{topic}-card-{number}.png`

## Implementation Steps

1. **Analyze Content**: Extract key information, data points, core arguments
2. **Determine Card Count**: Decide 3-6 cards based on content length and structure
3. **Design Each Card**:
   - Card 1: Cover, highlight most shocking numbers/titles
   - Card 2-N-1: Content expansion, at least one dark card for data
   - Card N: Summary or question
4. **Write HTML**:
   - Import Google Fonts, Tailwind CSS, FontAwesome, html2canvas
   - Write complete CSS (including SVG noise, card styles, export button)
   - Implement all card HTML structures
   - Add JavaScript code for export functionality
5. **Output File**: Save as `index.html` or specified path

## Technical Reference

### SVG Noise Implementation
```html
<svg style="position: absolute; width: 0; height: 0">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
  </filter>
</svg>
<!-- Apply in card -->
<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; filter: url(#noise); opacity: 0.06;"></svg>
```

### Export Button Style
```css
.export-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  background: #d95e00;
  color: #f2efe9;
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(217, 94, 0, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}
```

## Notes

- Maintain visual simplicity and elegance, avoid over-decoration
- Ensure text is clear and readable, with obvious font size contrast
- Control opacity and contrast for dark cards
- Export functionality must be stable and reliable, avoid memory leaks
- Code should be standardized and clean, easy to modify later
- Card content should not be crowded; whitespace is the source of elegance
