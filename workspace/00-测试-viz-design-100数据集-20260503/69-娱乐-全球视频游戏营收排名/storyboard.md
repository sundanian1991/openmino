# Visual Storyboard — 全球视频游戏公司营收排名（2024）

## Phase 0：全局风格锁定

- **整体叙事弧线**：01-开场即结论式 — 一眼看出谁在统治
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

### Scene 1: 游戏公司营收排名

- **场景论文**：三巨头统治全球游戏产业，Top 3 合计 818 亿美元
- **在叙事中的角色**：开场即结论
- **叙事节拍**：
  - 第一眼看到什么 → Sony/Tencent/Microsoft 三根长柱远超其他，因为 Warm 高亮
  - 第二眼看到什么 → 排名 4-15 的公司灰化为同一视觉层级，因为 Stone 基准色
  - 最终理解什么 → 游戏产业是"三巨头 + 长尾"格局，因为阶梯式断层
- **签名视觉元素**：Top 3 Warm 色高亮 + 第 4 名起灰化断层线
- **克制声明**：不画趋势线、不加图例、不标注每个数据点的具体数值
