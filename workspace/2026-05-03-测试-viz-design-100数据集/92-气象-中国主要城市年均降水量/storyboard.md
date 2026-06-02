# Visual Storyboard — 视觉叙事设计

> 数据集 92：中国主要城市年均降水量

---

## Phase 0：全局风格锁定（单图场景，跟随默认）

- **整体叙事弧线**：01-单图洞察
- **风格学派**：restrained-warm
- **全局色阶**：
  - 主 ramp：Warm（`#c26d3a` 高亮 / `#6b3410` 标题）
  - 辅助 ramp：Stone（`#857d74` 基准 / `#ada599` 网格）
- **字体家族**：system-ui, -apple-system, sans-serif
- **字号层级**：标题 16/600、副标题 11/400、轴标签 11/400、标注 11/600、脚注 10/400

### globalStyle JSON 块

```json
{
  "colorRamps": ["Warm", "Stone"],
  "palette": {
    "primary": "#c26d3a",
    "secondary": "#857d74",
    "accent": "#e8a87c",
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

## Scene 1: 中国主要城市年降水量排名

- **场景论文**：用横条排名揭示中国城市降水量的南北悬殊差异
- **在叙事中的角色**：唯一场景 — 一图讲清格局
- **叙事节拍**：
  - 第一眼：深圳条最长，乌鲁木齐最短 — 极值对比
  - 第二眼：南方城市普遍 1000mm+，北方多在 500-600mm — 阶梯式分布
  - 最终理解：中国降水量分布 = 纬度 + 距海距离
- **签名视觉元素**：深圳 Warm 高亮（最高值）+ 乌鲁木齐标注最低值 + 均值参考线
- **克制声明**：不标注每个城市数值、不叠加地图、不用颜色编码气候类型

## 阅读路径设计

| 顺序 | 图名 | 功能 | 为什么在这个位置 |
|------|------|------|-----------------|
| 1 | 城市年降水量排名 | 全景+洞察 | 单图场景，一图完成 |

## 版面规划

- **排列方式**：单图居中
- **尺寸分配**：800×550
- **间距规范**：四周 ≥20px
