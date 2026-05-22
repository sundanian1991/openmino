# Visual Storyboard — 中国短视频平台用户数（2024）

## Phase 0：全局风格锁定

- **整体叙事弧线**：01-开场即结论式 — 抖快双极统治一目了然
- **风格学派**：restrained-warm
- **全局色阶**：
  - 主 ramp：Warm（`#c26d3a` 主色 / `#6b3410` 标题）
  - 辅助 ramp：Stone（`#857d74` 基准 / `#ada599` 网格）
  - **色阶锁定**：后续不引入新 ramp
- **字体家族**：system-ui, -apple-system, sans-serif
- **字号层级**：标题 16/600、副标题 11/400、轴标签 11/400、标注 11/600、脚注 10/400
- **圆角/间距**：卡片圆角 10px、间距 12px、内边距 16px

### globalStyle JSON

```json
{
  "colorRamps": ["Warm", "Stone"],
  "palette": {
    "primary": "#c26d3a",
    "secondary": "#857d74",
    "accent": "#2e8b6e",
    "title": "#6b3410",
    "subtitle": "#857d74",
    "axis": "#ada599",
    "grid": "#f2f0eb",
    "bg": "#faf9f7"
  },
  "typography": {
    "title": { "size": 16, "weight": 600 },
    "subtitle": { "size": 11, "weight": 400 },
    "axisLabel": { "size": 11, "weight": 400 },
    "annotation": { "size": 11, "weight": 600 },
    "footnote": { "size": 10, "weight": 400 }
  },
  "spacing": { "cardPadding": 16, "titleToContent": 12, "cardGap": 12 },
  "cornerRadius": 10,
  "styleSchool": "restrained-warm"
}
```

## 单图场景设计

### Scene 1: 短视频平台用户对比

- **场景论文**：抖音快手双极统治，MAU 合计超 13 亿，其余平台差距悬殊
- **在叙事中的角色**：开场即结论
- **叙事节拍**：
  - 第一眼看到什么 → 抖音 6.75 亿 MAU + 快手 6.85 亿 MAU 两根最长柱，因为 Warm 高亮
  - 第二眼看到什么 → 视频号 5.5 亿居中，小红书/B站 2.6/2.4 亿第二梯队，因为 Stone 色阶区分
  - 最终理解什么 → 短视频是"双极+中坚+长尾"三层格局，因为阶梯式差距
- **签名视觉元素**：抖快双柱 Warm 高亮 + DAU/MAU 比值揭示用户粘性差异
- **克制声明**：不画趋势线、不标注每个数据点数值、不用多色系
