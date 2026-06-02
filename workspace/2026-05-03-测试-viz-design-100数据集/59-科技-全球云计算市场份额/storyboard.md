# Visual Storyboard — 全球云计算市场份额

## Phase 0：全局风格锁定

- **整体叙事弧线**：01-单图证据式
- **风格学派**：restrained-warm
- **全局色阶**：
  - 主 ramp：Warm（`#c26d3a` 主色 / `#6b3410` 标题）
  - 辅助 ramp：Stone（`#857d74` 基准 / `#ada599` 网格）
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

### Scene 1: 全球云计算市场份额柱状图

- **场景论文**："用柱状高度差揭示云计算市场的三巨头垄断格局"
- **在叙事中的角色**：全景展示
- **叙事节拍**：
  - 第一眼看到什么 → AWS 柱体遥遥领先（Warm 主色高亮）
  - 第二眼看到什么 → Azure 第二、Google 第三，与后面厂商形成明显断层
  - 最终理解什么 → 三巨头合计 67%，市场高度集中
- **签名视觉元素**：AWS 柱体 Warm 主色高亮 + 右侧标注"市场第一，份额超 30%"；Azure 和 Google 用 Stone 深色；其余厂商 Stone 浅色灰化
- **克制声明**：不画趋势线、不加 3D 效果、不标注每个柱体的精确数值（仅标注高亮点）

## 阅读路径设计

| 顺序 | 图名 | 功能 | 为什么在这个位置 |
|------|------|------|-----------------|
| 1 | 市场份额柱状图 | 全景展示 | 单图即完整叙事 |

## 版面规划

- **排列方式**：单图垂直居中
- **尺寸分配**：800×550
- **间距规范**：四周留白 ≥20px
