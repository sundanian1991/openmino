# Visual Storyboard — 视觉叙事设计

> 数据集 85：全球宽带网速排名 | 单图场景

---

## Phase 0：全局风格锁定（单图可选）

- **整体叙事弧线**：全景展示 → 关键发现
- **风格学派**：restrained-warm
- **全局色阶**：
  - 主 ramp：Warm（`#c26d3a` 主色 / `#6b3410` 标题）
  - 辅助 ramp：Stone（`#857d74` 基准 / `#ada599` 网格）
  - **色阶锁定**：后续不引入新 ramp
- **字体家族**：system-ui, -apple-system, sans-serif
- **字号层级**：标题 16/600、副标题 11/400、轴标签 11/400、标注 11/600、脚注 10/400
- **圆角/间距**：卡片圆角 10px、卡片间距 12px、卡片内边距 16px
- **高亮规则**：≤10%，即最多高亮 1-2 个数据点

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

---

## 单图场景设计

### Scene 1: 全球宽带网速 TOP 15

- **场景论文**：用横向柱状图揭示全球宽带基建的权力转移——亚洲城市经济体和东欧国家正在领跑
- **在叙事中的角色**：全景展示 + 关键发现
- **叙事节拍**：
  - 第一眼看到最长的柱子（新加坡 372 Mbps）→ 视觉锚点
  - 第二眼看到彩色柱子（新加坡 TOP 1 + 中国标注）与灰色柱子的对比 → 理解差距
  - 最终理解：宽带竞赛的赢家不是传统认知中的"发达国家" → 认知刷新
- **签名视觉元素**：新加坡柱子用 Warm 主色（#c26d3a），其余灰化；中国柱子右侧加标注"中国：230 Mbps"
- **克制声明**：不加图例、不加趋势线、不标注每个数据点的具体数值（只标注新加坡和中国）、不加装饰性元素

---

## 阅读路径设计

单图，阅读路径从上到下：标题 → 新加坡（最长柱子，最醒目）→ 逐条向下扫读 → 中国标注 → 脚注

## 版面规划

- **排列方式**：单图居中
- **尺寸分配**：800 × 550
- **间距规范**：四周 padding 20px，标题距内容 12px
