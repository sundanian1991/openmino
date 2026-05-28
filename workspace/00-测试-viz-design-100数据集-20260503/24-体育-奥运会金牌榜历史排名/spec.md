# spec.md — 奥运会金牌榜历史排名

## 叙事意图

**可视化目的**：让读者一眼看出奥运金牌榜的极端不均衡 -- 美国断层式领先

**想传达什么**：美国在奥运金牌榜上是一个没有对手的存在

**结论**：美国1,231枚金牌是第二名苏联(473)的2.6倍，断层式领先全球

**思路**：水平条形图按降序排列，第一条远超其余，视觉上形成"断层"

## 视觉执行

### 模式选择
- 模式：13-柱状图（水平条形图）
- 理由：20个国家的金牌数值对比，降序排列形成断层分布

### 标题
- 主标题：美国奥运金牌断层领先，是第二名的 2.6 倍
- 副标题：截至 2024 巴黎奥运会 · 历史金牌榜 TOP 20

### 视觉编码
- Y轴：国家/地区名称（分类）
- X轴：金牌数量（数值，从0开始）
- 颜色：美国 Warm500 高亮，苏联/中国 Stone300 引导，其余 Stone100 灰化
- 大小/形状：统一条形宽度

### 数据组织
- 字段：country（国家/地区）、gold（金牌数）
- 排序：按 gold 降序
- 无聚合

### 标注策略
- 高亮：美国（1/20 = 5%）
- 标注：条形末端直接标注金牌数字
- 无额外标注文字

### 图例/辅助
- 无图例（直接在条形旁标注国家名）
- 脚注：数据含夏季+冬季奥运会，苏联含1952-1988数据

### 布局
- 画布：800 × 600
- 标题位置：左上
- 留白：上20，右20，下20，左140（国家名较长）
- 配色：Warm + Stone，<=2 ramp

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "美国奥运金牌断层领先，是第二名的 2.6 倍",
  "subtitle": "截至 2024 巴黎奥运会 · 历史金牌榜 TOP 20",
  "canvas": {
    "width": 800,
    "height": 600
  },
  "data": {
    "fields": ["country", "gold"],
    "series": [
      {
        "name": "金牌数",
        "values": [
          {"country": "美国", "gold": 1231},
          {"country": "苏联", "gold": 473},
          {"country": "中国", "gold": 330},
          {"country": "英国", "gold": 313},
          {"country": "法国", "gold": 289},
          {"country": "意大利", "gold": 281},
          {"country": "德国", "gold": 275},
          {"country": "挪威", "gold": 231},
          {"country": "瑞典", "gold": 224},
          {"country": "日本", "gold": 211},
          {"country": "澳大利亚", "gold": 188},
          {"country": "匈牙利", "gold": 184},
          {"country": "东德", "gold": 153},
          {"country": "芬兰", "gold": 151},
          {"country": "韩国", "gold": 143},
          {"country": "荷兰", "gold": 138},
          {"country": "俄罗斯", "gold": 120},
          {"country": "加拿大", "gold": 119},
          {"country": "罗马尼亚", "gold": 108},
          {"country": "波兰", "gold": 86}
        ],
        "highlight": true
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"index": 0, "color": "#c26d3a", "label": "美国"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 20,
      "right": 20,
      "bottom": 20,
      "left": 140
    }
  }
}
```
