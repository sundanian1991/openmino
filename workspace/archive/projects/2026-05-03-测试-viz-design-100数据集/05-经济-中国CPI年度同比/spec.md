# SPEC — 中国CPI年度同比

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "dual_axis",
  "title": "通缩逼近：中国物价十年三幕剧",
  "subtitle": "2015-2024 CPI / PPI / 食品CPI / GDP平减指数同比变化率（%）",
  "canvas": {
    "width": 900,
    "height": 560
  },
  "data": {
    "fields": ["year", "CPI同比", "PPI同比", "食品CPI同比", "GDP平减指数"],
    "series": [
      {
        "name": "CPI同比",
        "values": [1.4, 2.0, 1.6, 2.1, 2.9, 2.5, 0.9, 2.0, 0.2, 0.2],
        "axis": "left",
        "highlight": false
      },
      {
        "name": "PPI同比",
        "values": [-5.2, -1.4, 6.3, 3.5, -0.3, -1.8, 8.1, 4.1, -3.0, -2.2],
        "axis": "right",
        "highlight": false
      },
      {
        "name": "食品CPI同比",
        "values": [2.3, 4.6, -1.4, 1.8, 7.4, 10.6, -1.4, 2.4, -0.3, -0.2],
        "axis": "left",
        "highlight": true
      },
      {
        "name": "GDP平减指数",
        "values": [0.6, 1.4, 3.8, 3.1, 1.7, 2.1, 4.1, 3.0, 0.4, 0.5],
        "axis": "left",
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "colors": {
      "CPI同比": "#4A90D9",
      "PPI同比": "#D94A4A",
      "食品CPI同比": "#D9A84A",
      "GDP平减指数": "#4AD97A"
    },
    "lineStyle": {
      "CPI同比": { "width": 2.5, "type": "solid" },
      "PPI同比": { "width": 2.5, "type": "solid" },
      "食品CPI同比": { "width": 1.5, "type": "dashed" },
      "GDP平减指数": { "width": 1.5, "type": "dotted" }
    },
    "grayscale": false,
    "maxHighlightRatio": 0.15,
    "xAxis": "year",
    "leftAxis": { "name": "变化率（%）", "min": -2, "max": 12 },
    "rightAxis": { "name": "PPI变化率（%）", "min": -7, "max": 10 }
  },
  "annotations": [
    {
      "type": "markPoint",
      "series": "食品CPI同比",
      "index": 5,
      "label": "猪周期峰值 10.6%"
    },
    {
      "type": "markLine",
      "xValue": 2021,
      "label": "PPI急弹至8.1%"
    },
    {
      "type": "markArea",
      "xRange": [2023, 2024],
      "color": "rgba(217, 74, 74, 0.08)",
      "label": "通缩信号"
    },
    {
      "type": "markPoint",
      "series": "CPI同比",
      "index": 8,
      "label": "CPI降至0.2%"
    }
  ],
  "referenceLines": [
    {
      "yAxis": "left",
      "value": 0,
      "label": "零线",
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
    "tooltip": true,
    "grid": {
      "backgroundColor": "#f5f5f5",
      "borderColor": "#e0e0e0"
    }
  }
}
```

## 设计说明

### 模式选择

C07 趋势+拐点叙事，以 dual_axis 实现。左轴承载 CPI/食品CPI/GDP平减指数（窄范围），右轴承载 PPI（宽范围），避免单轴下 PPI 剧烈波动压缩其他系列的视觉差异。

### 拐点标注

1. 2020 食品CPI 峰值 10.6%（猪周期）
2. 2021 PPI 急弹至 8.1%（全球供应链）
3. 2023-2024 红色区域标记（通缩信号）
4. 2023 CPI 降至 0.2%

### 预期效果

四条线在 2015-2018 窄幅共行 → 2019-2022 剧烈分化（食品CPI尖峰、PPIV型反弹）→ 2023-2024 趋同于零（通缩收敛）。红色区域标记制造视觉警示。
