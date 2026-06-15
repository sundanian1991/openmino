# Decisions — 吴宇森 John Woo（周润发）

## Start Questionnaire

1. **How to start**: Step-by-step
2. **Image placeholders**: No
3. **Site niche**: 单页英雄史诗 — "英雄本色"主题的虚构品牌展示页
4. **Page list**: 单页

## 场景色（nian token 映射）

| 电影 UI 原有 | nian 映射 |
|-------------|----------|
| John Woo 调色板（深色/暖金色/教堂白鸽） | **Earth** `#8B7355` — 温暖、质感、英雄的牺牲与情义 |

**正当性**: John Woo 的美学核心是"暴力中的温情"——兄弟情、救赎、牺牲。不是冷的（冰川），不是生机的（橄榄），是有温度的沙土色——像陈旧的教堂木头、旧照片的黄、兄弟握手的温度。

```css
--scene: #8B7355;
--scene-bg: rgba(139, 115, 85, 0.06);
--scene-border: rgba(139, 115, 85, 0.2);
```

## 字体（nian 固定）
Playfair Display / Inter / JetBrains Mono

## 深度系统
Border-only，无阴影

## Shell-ban list
- 无喜剧比例跳跃（与 周星驰 区分）
- 无产品展示式 Hero
- 无数据面板

## Primary composition family
- **Panoramic slab** + **Symmetrical dual** — 宽幅横贯构图，对称双栏是对吴宇森标志性"双枪对称"的视觉翻译
