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
  --primary-darkgray: #2C2C2C;
  --primary-olive: #4A5D3A;
  --primary-earth: #8B7355;
  --accent-yellow: #FFD100;
  --accent-orange: #E55B2B;
  --scene-glacier: #2A4A5A;
  --scene-rock: #808080;

  /* Status */
  --success: #2E7D32;
  --warning: #F9A825;
  --error: #C62828;

  /* Surfaces */
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;

  /* Text */
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;

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
    static let hdfDarkgray = Color(red: 44/255, green: 44/255, blue: 44/255)
    static let hdfOlive = Color(red: 74/255, green: 93/255, blue: 58/255)
    static let hdfEarth = Color(red: 139/255, green: 115/255, blue: 85/255)

    // Accent
    static let hdfYellow = Color(red: 255/255, green: 209/255, blue: 0/255)
    static let hdfOrange = Color(red: 229/255, green: 91/255, blue: 43/255)

    // Scene
    static let hdfGlacier = Color(red: 42/255, green: 74/255, blue: 90/255)
    static let hdfRock = Color(red: 128/255, green: 128/255, blue: 128/255)

    // Surfaces (light mode only)
    static let hdfBg = Color(red: 250/255, green: 250/255, blue: 248/255)
    static let hdfSurface = Color(red: 255/255, green: 255/255, blue: 255/255)
    static let hdfBorder = Color(red: 229/255, green: 229/255, blue: 224/255)
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
          darkgray: '#2C2C2C',
          olive: '#4A5D3A',
          earth: '#8B7355',
          yellow: '#FFD100',
          orange: '#E55B2B',
          glacier: '#2A4A5A',
          rock: '#808080',
          surface: 'var(--surface)',
          'surface-raised': 'var(--surface-raised)',
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
- `--accent-yellow` (#FFD100) may need special attention for CMYK conversion
- Dot-matrix motif: use 300dpi minimum for print
- Minimum font size for print: Georgia 10pt, Inter 8pt, JetBrains Mono 7pt