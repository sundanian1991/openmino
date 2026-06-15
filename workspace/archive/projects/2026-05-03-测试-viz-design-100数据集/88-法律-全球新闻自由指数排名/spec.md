# spec.md — 全球新闻自由指数排名可视化规格

## 可视化目的

**认知缺口**：读者知道"有新闻自由排名"，但不清楚北欧的绝对领先优势、区域聚集效应，以及"红色警戒区"覆盖过半人口的历史性拐点
**想传达什么**：北欧三国包揽新闻自由前三，而全球超半数人口生活在红色警戒区
**结论**：新闻自由与区域发展高度相关，北欧/西欧持续领跑，东亚/中东深陷困境
**思路**：横向柱状图直观展示得分差距，用颜色编码区域和关键锚点

## 视觉执行

### 模式选择
- **模式**：13-柱状图 → bar_chart
- **匹配理由**：一维排名对比，横向布局适配长文本，柱长直观表达数值差距

### 标题
- **主标题**：新闻自由指数：北欧霸榜前三，中国位列第175位
- **副标题**：2025年 · 180个国家 RSF排名（得分越高越自由）

### 视觉编码
- **Y轴**：国家名称（按得分降序排列）
- **X轴**：2025得分值（0 ~ 100）
- **颜色**：挪威/丹麦/瑞典=#2563EB（深蓝，北欧霸榜），其他西欧=#60A5FA（浅蓝），其余=#94A3B8（灰色），中国=#F59E0B（橙色，参照），朝鲜=#DC2626（红色，末位）
- **大小**：柱子宽度统一 18px

### 数据组织
- **字段**：国家名称、2025得分、排名、区域、变化趋势
- **排序**：得分降序
- **聚合**：无

### 标注策略
- **高亮**：挪威（最高分）、中国（参照锚点）、朝鲜（末位）
- **标注**：写原因+幅度，不写数字
- **高亮比例**：3/17 ≈ 18%

### 参考线
- 得分=90处画虚线，标记"高度自由"门槛

### 布局
- **画布**：800 x 550
- **Padding**：top 60, right 40, bottom 50, left 120
- **标题位置**：顶部居中
- **配色**：深蓝→浅蓝→灰→橙→红，按区域分组

## Source ID 追溯

- 模式选择：viz-design SKILL.md §五 模式13
- 色彩方案：13-VISUALIZATION.md Warm色系 + 冷色区域编码
- 高亮约束：13-VISUALIZATION.md "高亮≤10%"，区域分组着色适度放宽

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "新闻自由指数：北欧霸榜前三，中国位列第175位",
  "subtitle": "2025年 · 180个国家 RSF排名（得分越高越自由）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "score", "rank", "region", "trend"],
    "series": [
      {
        "name": "新闻自由得分",
        "values": [
          {"country": "挪威", "score": 95.38, "rank": 1, "region": "北欧", "trend": "稳定", "highlight": true},
          {"country": "丹麦", "score": 93.38, "rank": 2, "region": "北欧", "trend": "稳定", "highlight": false},
          {"country": "瑞典", "score": 91.41, "rank": 3, "region": "北欧", "trend": "稳定", "highlight": false},
          {"country": "芬兰", "score": 90.93, "rank": 4, "region": "北欧", "trend": "上升", "highlight": false},
          {"country": "荷兰", "score": 89.02, "rank": 5, "region": "西欧", "trend": "上升", "highlight": false},
          {"country": "新西兰", "score": 88.76, "rank": 6, "region": "大洋洲", "trend": "上升", "highlight": false},
          {"country": "哥斯达黎加", "score": 87.21, "rank": 7, "region": "中美洲", "trend": "上升", "highlight": false},
          {"country": "瑞士", "score": 86.89, "rank": 8, "region": "西欧", "trend": "下降", "highlight": false},
          {"country": "爱尔兰", "score": 86.54, "rank": 9, "region": "西欧", "trend": "稳定", "highlight": false},
          {"country": "葡萄牙", "score": 86.12, "rank": 10, "region": "南欧", "trend": "下降", "highlight": false},
          {"country": "立陶宛", "score": 85.78, "rank": 11, "region": "东欧", "trend": "上升", "highlight": false},
          {"country": "爱沙尼亚", "score": 85.41, "rank": 12, "region": "东欧", "trend": "稳定", "highlight": false},
          {"country": "德国", "score": 84.89, "rank": 13, "region": "西欧", "trend": "下降", "highlight": false},
          {"country": "比利时", "score": 84.23, "rank": 14, "region": "西欧", "trend": "稳定", "highlight": false},
          {"country": "新加坡", "score": 83.91, "rank": 15, "region": "东南亚", "trend": "上升", "highlight": false},
          {"country": "中国", "score": null, "rank": 175, "region": "东亚", "trend": "停滞", "highlight": true, "note": "约180国中第175位"},
          {"country": "朝鲜", "score": null, "rank": 180, "region": "东亚", "trend": "末位", "highlight": true, "note": "第180位(末位)"}
        ],
        "highlight": true
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"item": "挪威", "reason": "全球新闻最自由，95.38分", "color": "#2563EB"},
      {"item": "中国", "reason": "第175位，红色警戒区", "color": "#F59E0B"},
      {"item": "朝鲜", "reason": "第180位，全球末位", "color": "#DC2626"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.18
  },
  "annotations": [
    {"text": "全球新闻最自由", "target": "挪威", "position": "right"},
    {"text": "第175位 · 红色警戒区", "target": "中国", "position": "right"},
    {"text": "第180位 · 全球末位", "target": "朝鲜", "position": "right"},
    {"text": "北欧包揽前三", "target": "丹麦", "position": "left"}
  ],
  "referenceLines": [
    {"value": 90, "label": "高度自由门槛", "style": "dashed"}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 40,
      "bottom": 50,
      "left": 120
    }
  }
}
```
