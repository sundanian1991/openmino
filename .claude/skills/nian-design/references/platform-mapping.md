# Haglöfs Platform Mapping

> Output conventions for HTML/CSS, SwiftUI, and React/Tailwind.

---

## 1. HTML / CSS / Web

**Unit system:** CSS custom properties for all tokens. `rem` for type scale, `px` for spacing.

**Font loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```
Georgia is a system font — no loading required.

**CSS variables block:**
```css
:root {
  /* Brand Palette */
  --brand-primary: #4A6741;
  --brand-secondary: #7A9B6D;
  --brand-tertiary: #5B6B7A;
  --brand-quaternary: #8A7D6E;

  /* Signal */
  --signal-warning: #E87A3C;
  --signal-caution: #E8B83C;

  /* Status */
  --success: #4A6741;
  --warning: #E87A3C;
  --error: #E8453C;

  /* Surfaces */
  --bg: #F5F3EF;
  --surface: #FFFFFF;
  --surface-alt: #F5F3EF;
  --border: #C4B8A8;
  --border-strong: #8A7D6E;

  /* Text */
  --text-display: #2D2A26;
  --text-primary: #1A1816;
  --text-secondary: #8A7D6E;
  --text-disabled: #C4B8A8;

  /* Type Scale */
  --display-xl: 72px;
  --display-lg: 48px;
  --display-md: 36px;
  --heading-lg: 24px;
  --heading-md: 20px;
  --body-lg: 18px;
  --body: 16px;
  --body-sm: 14px;
  --label: 12px;

  /* Spacing */
  --space-2xs: 2px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}
```

**No dark mode.** Fixed light palette only. Scene variation via color emphasis, not surface inversion.

---

## 2. SwiftUI / iOS

**Color extensions** with prefix `hdf` (Haglöfs Design Framework):

```swift
import SwiftUI

extension Color {
    // Brand
    static let hdfDisplay = Color(red: 45/255, green: 42/255, blue: 38/255)
    static let hdfPrimary = Color(red: 74/255, green: 103/255, blue: 65/255)
    static let hdfSecondary = Color(red: 122/255, green: 155/255, blue: 109/255)

    // Signal
    static let hdfCaution = Color(red: 232/255, green: 184/255, blue: 60/255)
    static let hdfWarning = Color(red: 232/255, green: 122/255, blue: 60/255)

    // Brand Tertiary
    static let hdfTertiary = Color(red: 91/255, green: 107/255, blue: 122/255)
    static let hdfQuaternary = Color(red: 138/255, green: 125/255, blue: 110/255)

    // Surfaces (light mode only)
    static let hdfBg = Color(red: 245/255, green: 243/255, blue: 239/255)
    static let hdfSurface = Color(red: 255/255, green: 255/255, blue: 255/255)
    static let hdfBorder = Color(red: 196/255, green: 184/255, blue: 168/255)
}
```

**Font extensions:**
```swift
extension Font {
    static let hdfDisplay = Font.custom("Georgia", size: 48).bold()
    static let hdfBody = Font.custom("Inter", size: 16)
    static let hdfMono = Font.custom("JetBrainsMono", size: 12)
}
```

**Mode:** Light only. No adaptive colors.

---

## 3. React / Tailwind

**Tailwind config extension:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        hdf: {
          display: '#2D2A26',
          primary: '#4A6741',
          secondary: '#7A9B6D',
          tertiary: '#5B6B7A',
          quaternary: '#8A7D6E',
          caution: '#E8B83C',
          warning: '#E87A3C',
          surface: 'var(--surface)',
          'surface-alt': 'var(--surface-alt)',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '2xs': '2px',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
}
```

**Dark mode:** None. Light mode only.

---

## 4. Paper / Design Tool

For Figma, Sketch, or print design — use direct HEX values from `tokens.md`. No variable abstraction needed.

**Print notes:**
- Convert to CMYK before sending to print
- `--signal-caution` (#E8B83C) may need special attention for CMYK conversion
- Dot-matrix motif: use 300dpi minimum for print
- Minimum font size for print: Georgia 10pt, Inter 8pt, JetBrains Mono 7pt