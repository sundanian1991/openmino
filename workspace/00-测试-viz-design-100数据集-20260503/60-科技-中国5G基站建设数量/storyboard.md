# Visual Storyboard — 中国5G基站建设数量

## Phase 0：全局风格锁定

- **整体叙事弧线**：07-趋势+拐点式
- **风格学派**：restrained-warm
- **全局色阶**：
  - 主 ramp：Warm（`#c26d3a` 主色 / `#6b3410` 标题）
  - 辅助 ramp：Stone（`#857d74` 基准 / `#ada599` 网格）
  - 语义色：Teal（正面增长）/ Coral（拐点/负面）
  - **色阶锁定**：后续所有图不得引入新 ramp
- **字体家族**：system-ui, -apple-system, sans-serif
- **字号层级**：标题 16/600、副标题 11/400、轴标签 11/400、标注 11/600、脚注 10/400
- **圆角/间距**：卡片圆角 10px、卡片间距 12px、卡片内边距 16px

### globalStyle JSON 块

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

### Scene 1: 5G基站建设双轴图

- **场景论文**："用双轴图揭示增长曲线背后的增速拐点——累计持续上升，但新建量已经开始下滑"
- **在叙事中的角色**：全景展示 + 证据支撑
- **叙事节拍**：
  - 第一眼看到什么 → 累计基站数的陡峭上升曲线（Warm 主色面积图）
  - 第二眼看到什么 → 当年新建量柱状图在 2023 年达峰后 2024 年明显下降（Coral 标注拐点）
  - 最终理解什么 → 5G 建设从爆发期转入平稳期，增速拐点已确认
- **签名视觉元素**：2024 年柱体用 Coral 色标注"当年新建首次转负（-18%）"，面积图用 Warm 半透明填充
- **克制声明**：不画用户数曲线（维度过多会混乱）、不加过多参考线、不标注每个数据点精确值

## 阅读路径设计

| 顺序 | 图名 | 功能 | 为什么在这个位置 |
|------|------|------|-----------------|
| 1 | 建设双轴图 | 全景+拐点 | 单图完整叙事 |

## 版面规划

- **排列方式**：单图垂直居中
- **尺寸分配**：800×550
- **间距规范**：四周留白 ≥20px
