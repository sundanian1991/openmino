# Spec — 全球机场客运量排名（2024）

## 可视化目的
让读者 3 秒内掌握全球航空枢纽 Top 20 格局，注意到亚洲机场疫后复苏势头。

## 想传达什么
亚特兰大以 1.08 亿人次稳居全球第一，但亚洲机场同比增速远超欧美。

## 结论
全球航空客运全面恢复，亚洲枢纽正加速追赶。

## 思路
水平柱状图 + 降序排列 + TOP 3 暖色高亮 + 异常增速标注。

---

## 视觉执行

### 模式选择
- 模式 13：柱状图（水平）
- 匹配理由：20 项长名称分类对比，水平排列最佳可读性

### 标题
- 主标题：亚特兰大领跑全球机场，亚洲枢纽疫后强势回归
- 副标题：2024 年全球机场客运量 TOP 20

### 视觉编码
- Y 轴：机场名称（20 项，从上到下按排名排列）
- X 轴：客运量（百万人次），0-120 范围
- 颜色：TOP 3 暖色 #E8875F，其余灰阶 #9CA3AF

### 数据组织
- 字段：airport_name, city_country, passengers_m, yoy_change
- 排序：客运量降序
- 聚合：无

### 标注策略
- 高亮：TOP 3 机场
- 标注：上海浦东（+85%）、北京首都（+120%）异常增速

### 布局
- 画布：800 x 550
- 间距：上 60 / 右 120 / 下 40 / 左 220
- 标题位置：顶部居中
- 数据标签：柱形右侧外置

---

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "亚特兰大领跑全球机场，亚洲枢纽疫后强势回归",
  "subtitle": "2024 年全球机场客运量 TOP 20（百万人次）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["airport_name", "city_country", "passengers_m", "yoy_change"],
    "series": [
      {
        "name": "客运量（百万人次）",
        "values": [108.1, 92.0, 87.8, 83.9, 78.5, 77.8, 76.0, 75.4, 72.5, 70.2, 68.5, 66.2, 65.0, 63.0, 62.7, 60.2, 58.5, 55.8, 52.3, 52.0],
        "highlight": true
      }
    ],
    "categories": [
      "亚特兰大(ATL)", "迪拜(DXB)", "达拉斯-沃斯堡(DFW)", "伦敦希思罗(LHR)",
      "东京羽田(HND)", "伊斯坦布尔(IST)", "丹佛(DEN)", "芝加哥奥黑尔(ORD)",
      "洛杉矶(LAX)", "德里(DEL)", "巴黎戴高乐(CDG)", "达拉斯沃斯堡",
      "上海浦东(PVG)", "广州白云(CAN)", "新加坡樟宜(SIN)", "阿姆斯特丹(AMS)",
      "首尔仁川(ICN)", "马德里(MAD)", "曼谷素万那普(BKK)", "北京首都(PEK)"
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "客运量", "index": 0, "color": "#E8875F", "reason": "全球第一"},
      {"series": "客运量", "index": 1, "color": "#E8875F", "reason": "全球第二"},
      {"series": "客运量", "index": 2, "color": "#E8875F", "reason": "全球第三"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.15
  },
  "annotations": [
    {"text": "+85% 疫后强劲复苏", "target": "上海浦东(PVG)"},
    {"text": "+120% 全面恢复", "target": "北京首都(PEK)"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {"top": 60, "right": 120, "bottom": 40, "left": 220}
  }
}
```
