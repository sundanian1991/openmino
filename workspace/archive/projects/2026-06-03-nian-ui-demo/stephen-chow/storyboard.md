# Storyboard — 周星驰 / 草根逆袭品牌页

## Site Cinematic Grammar

- **Shell logic**: Vertical tower — 垂直堆叠 section，从底部向上"生长"
- **Navigation posture**: 无固定导航，scroll-driven 叙事
- **Framing rules**: 不对称偏左锚点，右侧用装饰元素平衡。关键 moment 打破网格
- **Density cadence**: 密集（Hero）→ 宽松（能力）→ 密集（起源故事）→ 呼吸（数据）→ 宽松（结尾）
- **Recurring materials**: olive 装饰线、点阵图案、ghost 大字
- **Composition family**: Vertical tower

## Director Brief（nian 颜色修订）

**Stephen Chow 周星驰**
- **Visual thesis**: "从地面长出来的东西最有力"——所有 section 从下到上，像草根从土地里崛起
- **3 signature techniques**:
  1. **Scale jump** — 相邻 section 的比例突变（巨大 Hero → 极小标签 → 中等内容）
  2. **Playful asymmetry** — 网格故意错位，一个元素占 2/3 另一个占 1/3
  3. **Unexpected reveal** — 入口方式每 section 不同，最佳 moment 放在中间而不是开头
- **Color tokens**（nian olive 体系）:
  ```
  --scene: #4A5D3A;  --scene-bg: rgba(74,93,58,0.06);  --scene-border: rgba(74,93,58,0.2);
  --bg: #FAFAF8;  --surface: #FFFFFF;  --surface-raised: #F5F5F0;
  --border: #E5E5E0;  --border-visible: #C0C0B8;
  --text-display: #2C2C2C;  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;  --text-disabled: #A0A0A0;
  ```
- **Typography**（nian 固定）:
  Display: Playfair Display 300/700 | Body: Inter 400/500 | Data: JetBrains Mono 500
- **Motion rules**:
  - 使用 transform + opacity + clip-path，最快 0.4s 最慢 1.8s
  - 无 bounce/spring/parallax（nian 红线）
  - 优先"弹出"类入口（scale-based），匹配星驰的夸张喜剧感

## Page Inventory

| # | Section | 叙事节拍 | 功能 | 入口 | 底色 |
|---|---------|----------|------|------|------|
| 1 | Hero | B1 Cold Open | 宣言+统计 | Snap Zoom In (#18) | bg |
| 2 | 能力 | B8 Evidence Wall | 卡片网格 | Jump Cut Stagger (#20) | surface |
| 3 | 故事 | B7 The Encounter | 时间线/起源 | Curtain Wipe (#10) | bg |
| 4 | 数据 | B14 The Pivot | 统计+引用 | Crane Down (#4) | olive-bg |
| 5 | 结尾 | B22 The Farewell | 极简 | Fade from Black (#2) | bg |

## Hero Archetype

- **Type**: Data Punch (#26) 变体 — 大字 + 指标矩阵
- **Pattern**: Centered with floating elements
- **Visual elements**: Ghost "拳"字（opacity 0.04）、olive 装饰线、浮动指标

**Hero Dominance Statement**:
大字 Playfair Display 120px 宣布"草根逆袭"，浮动的指标层像武林高手的内力波动围绕在周围。没有阴影，没有渐变——纯粹的比例冲击。

## Restraint Statement

不做星驰电影里的具体元素引用（不画足球、不画棒棒糖、不画如来神掌）。用结构语言翻译喜剧感——比例突变和错位网格替代搞笑图像。

## Entrance Map

| Section | Entrance | Duration |
|---------|----------|:--------:|
| Hero | Snap Zoom In (scale 0.1→1 + opacity) | 0.5s |
| Cards | Jump Cut Stagger (translateY 20px) | 0.3s per card |
| Story | Curtain Wipe (clip-path) | 1.0s |
| Data | Crane Down (translateY) | 1.8s |
| End | Fade from Black (opacity) | 2.0s |
