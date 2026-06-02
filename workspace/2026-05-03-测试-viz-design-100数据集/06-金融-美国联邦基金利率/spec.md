# SPEC — 美国联邦基金利率

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "dual_axis",
  "title": "迟到的大锤：美联储利率如何追逐通胀",
  "subtitle": "2015-2025 联邦基金利率 vs CPI同比变化率（%）",
  "canvas": {
    "width": 960,
    "height": 580
  },
  "data": {
    "fields": ["date", "联邦基金利率", "CPI同比"],
    "series": [
      {
        "name": "联邦基金利率",
        "values": [0.11, 0.13, 0.27, 0.39, 0.51, 1.01, 1.41, 1.82, 2.40, 2.38, 1.55, 0.65, 0.08, 0.09, 0.08, 0.08, 0.33, 1.44, 2.56, 4.10, 4.65, 5.08, 5.33, 5.33, 5.33, 5.33, 5.08, 4.33, 4.33],
        "axis": "left",
        "highlight": false
      },
      {
        "name": "CPI同比",
        "values": [-0.1, 0.2, 1.4, 0.8, 2.1, 1.6, 2.1, 2.8, 1.9, 1.6, 2.3, 1.5, 0.6, 1.4, 5.4, 7.0, 8.5, 9.1, 8.2, 6.5, 5.0, 3.0, 3.7, 3.4, 3.5, 3.3, 2.4, 2.9, 2.4],
        "axis": "right",
        "highlight": true
      }
    ],
    "xLabels": ["2015-01", "2015-07", "2016-01", "2016-07", "2016-12", "2017-06", "2017-12", "2018-06", "2018-12", "2019-06", "2019-12", "2020-03", "2020-06", "2020-12", "2021-06", "2021-12", "2022-03", "2022-06", "2022-09", "2022-12", "2023-03", "2023-06", "2023-09", "2023-12", "2024-03", "2024-06", "2024-09", "2024-12", "2025-03"]
  },
  "visualEncoding": {
    "colors": {
      "联邦基金利率": "#2C5F8A",
      "CPI同比": "#E8733A"
    },
    "lineStyle": {
      "联邦基金利率": { "width": 3, "type": "solid" },
      "CPI同比": { "width": 2.5, "type": "solid" }
    },
    "grayscale": false,
    "maxHighlightRatio": 0.15,
    "leftAxis": { "name": "联邦基金利率（%）", "min": 0, "max": 6 },
    "rightAxis": { "name": "CPI同比（%）", "min": -1, "max": 10 }
  },
  "annotations": [
    {
      "type": "markPoint",
      "series": "联邦基金利率",
      "index": 8,
      "label": "渐进加息顶 2.40%"
    },
    {
      "type": "markPoint",
      "series": "联邦基金利率",
      "index": 12,
      "label": "零利率 0.08%"
    },
    {
      "type": "markArea",
      "xRange": ["2021-06", "2022-03"],
      "color": "rgba(232, 115, 58, 0.1)",
      "label": "政策滞后区"
    },
    {
      "type": "markPoint",
      "series": "CPI同比",
      "index": 17,
      "label": "CPI峰值 9.1%"
    },
    {
      "type": "markPoint",
      "series": "联邦基金利率",
      "index": 22,
      "label": "利率峰值 5.33%"
    }
  ],
  "referenceLines": [
    {
      "yAxis": "left",
      "value": 0,
      "label": "",
      "color": "#cccccc",
      "type": "dashed"
    },
    {
      "yAxis": "right",
      "value": 2,
      "label": "美联储目标 2%",
      "color": "#999999",
      "type": "dashed"
    }
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 80,
      "bottom": 40,
      "left": 60
    },
    "legend": {
      "position": "top",
      "align": "center"
    },
    "tooltip": {
      "enabled": true,
      "extraFields": ["unemployment_pct", "gdp_growth_pct"]
    },
    "grid": {
      "backgroundColor": "#fafafa",
      "borderColor": "#e8e8e8"
    }
  }
}
```

## 设计说明

### 模式选择

C07 趋势+拐点叙事，dual_axis 实现。左轴利率（0-6%），右轴CPI（-1-10%），双线呈现"追赶"动态。

### 拐点标注

1. 2018-12 加息周期顶部 2.40%
2. 2020-06 零利率 0.08%（疫情）
3. 2021-06 至 2022-03 橙色区域（政策滞后区——CPI已爆发但利率不动）
4. 2022-06 CPI 峰值 9.1%
5. 2023-09 利率峰值 5.33%

### 参考线

- 零利率线（左轴 0）
- 美联储通胀目标 2%（右轴），方便判断通胀何时"达标"

### 预期效果

蓝色利率线和橙色CPI线的此起彼伏构成"追赶"叙事。2021-2022 橙色区域是视觉高潮——CPI飙升但利率趴在底部。之后蓝线陡然上升，两条线在 2023 年交叉，利率终于"追上"通胀。
