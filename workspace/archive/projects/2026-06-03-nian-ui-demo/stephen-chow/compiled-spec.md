# Compiled Spec — 周星驰 / 草根逆袭

## Tokens
```css
--scene: #4A5D3A; --scene-bg: rgba(74,93,58,0.06); --scene-border: rgba(74,93,58,0.2);
--bg: #FAFAF8; --surface: #FFFFFF; --surface-raised: #F5F5F0;
--border: #E5E5E0; --border-visible: #C0C0B8;
--text-display: #2C2C2C; --text-primary: #1A1A1A; --text-secondary: #6B6B6B; --text-disabled: #A0A0A0;
```

## Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

## Pages — Single Page

| # | 名称 | 功能 | 构图源 | 入场源 | 背景 |
|---|------|------|--------|--------|------|
| 1 | Hero | 宣言+指标 | #26 Data Punch | #18 Snap Zoom In | bg |
| 2 | 技法 | 卡片网格 | #5 Triptych 变体 | #20 Jump Cut Stagger | surface |
| 3 | 叙事 | 垂直时间线 | #1 Center monument | #10 Curtain Wipe | bg |
| 4 | 精神 | 引用+数据 | #7 Cross axis | #4 Crane Down | scene-bg |
| 5 | 结尾 | 极简 | — | #2 Fade from Black | bg |

## Entrance Specifications

Section 1: Snap Zoom In — scale(0.1) → scale(1), 0.5s
Section 2: Jump Cut Stagger — translateY(20px), 0.3s per card, delay 0.08s
Section 3: Curtain Wipe — clip-path inset(0 100% → 0 0%), 1.0s
Section 4: Crane Down — translateY(60px) → translateY(0), 1.8s
Section 5: Fade from Black — opacity 0→1, 2.0s
