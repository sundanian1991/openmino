# spec.md — 比特币历史价格可视化规格

## 叙事意图

**可视化目的**：展现比特币在2024-2025年间经历的完整牛熊周期，让受众理解"翻倍只用4个月，腰斩也只需3个月"的市场节奏。

**想传达什么**：比特币从4.9万闪崩低点到10.75万历史新高仅用5个月，但随后3个月回吐近半涨幅。

**结论**：加密市场的暴涨暴跌在一年内完整上演，波动性是比特币最核心的特征。

**思路**：价格是主角，用折线图的视觉起伏直接映射市场情绪；3个拐点用标注写明原因和幅度；交易量在底部辅助印证拐点的可信度。

---

## 视觉执行

### 模式选择
- 模式：C07 趋势+拐点叙事
- 图表类型：line_chart（viz-echarts）
- 选择理由：时间序列数据有3个清晰拐点，需要标注原因+幅度

### 标题
- 主标题："4个月翻倍、3个月回吐：比特币一年内的完整牛熊周期"
- 副标题："2024.05 - 2025.05 · 比特币美元价格（半月光测）"

### 视觉编码
- X轴：时间（date字段）
- Y轴（上区）：价格 USD（price_usd）
- Y轴（下区）：交易量十亿美元（volume_billion_usd）
- 颜色：Warm 500 (#c26d3a) 主线，Stone 300 (#ada599) 灰化段，Stone 100 (#d6d2c9) 交易量柱
- 高亮：拐点段用 Warm 500，其余用 Stone 300

### 数据组织
- 字段：date, price_usd, volume_billion_usd
- 排序：按 date 升序（已排序）
- 无聚合

### 标注策略
- 拐点1（2024-08-05）："8月闪崩 -23%，交易量暴增64%"
- 拐点2（2024-12-05 / 2025-01-20）："首破10万 → 冲顶10.75万"
- 拐点3（2025-03-15 / 2025-04-01）："3个月回吐43%涨幅"
- 高亮比例：3/30 ≈ 10%

### 图例/辅助
- 无图例（直接标注代替）
- 脚注："数据来源：CoinGecko/CoinMarketCap · 半月光键时间点采样"

### 布局
- 画布：800 x 550
- 上区（价格折线）：高度70%，padding top 60
- 下区（交易量柱状）：高度30%
- 共享X轴
- 配色：Warm + Stone，<=2 ramp

---

## 渲染契约（机器可读 JSON）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "line_chart",
  "title": "4个月翻倍、3个月回吐：比特币一年内的完整牛熊周期",
  "subtitle": "2024.05 - 2025.05 · 比特币美元价格（半月光测）",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["date", "price_usd", "volume_billion_usd"],
    "series": [
      {
        "name": "比特币价格",
        "xField": "date",
        "yField": "price_usd",
        "values": [
          { "date": "2024-05-01", "price_usd": 63652 },
          { "date": "2024-05-15", "price_usd": 66150 },
          { "date": "2024-06-01", "price_usd": 67420 },
          { "date": "2024-06-15", "price_usd": 65280 },
          { "date": "2024-07-01", "price_usd": 62850 },
          { "date": "2024-07-15", "price_usd": 64200 },
          { "date": "2024-08-01", "price_usd": 64600 },
          { "date": "2024-08-05", "price_usd": 49000, "highlight": true },
          { "date": "2024-08-15", "price_usd": 59500 },
          { "date": "2024-09-01", "price_usd": 59100 },
          { "date": "2024-09-15", "price_usd": 60200 },
          { "date": "2024-10-01", "price_usd": 63300 },
          { "date": "2024-10-15", "price_usd": 67500 },
          { "date": "2024-11-01", "price_usd": 69400 },
          { "date": "2024-11-06", "price_usd": 75800 },
          { "date": "2024-11-15", "price_usd": 90500 },
          { "date": "2024-12-01", "price_usd": 96800 },
          { "date": "2024-12-05", "price_usd": 100500, "highlight": true },
          { "date": "2024-12-15", "price_usd": 102100 },
          { "date": "2025-01-01", "price_usd": 93500 },
          { "date": "2025-01-15", "price_usd": 102800 },
          { "date": "2025-01-20", "price_usd": 107500, "highlight": true },
          { "date": "2025-02-01", "price_usd": 100200 },
          { "date": "2025-02-15", "price_usd": 96800 },
          { "date": "2025-03-01", "price_usd": 88500 },
          { "date": "2025-03-15", "price_usd": 84200 },
          { "date": "2025-04-01", "price_usd": 83100, "highlight": true },
          { "date": "2025-04-15", "price_usd": 85600 },
          { "date": "2025-05-01", "price_usd": 94200 }
        ]
      },
      {
        "name": "交易量",
        "xField": "date",
        "yField": "volume_billion_usd",
        "type": "bar",
        "values": [
          { "date": "2024-05-01", "volume_billion_usd": 35.2 },
          { "date": "2024-05-15", "volume_billion_usd": 38.5 },
          { "date": "2024-06-01", "volume_billion_usd": 29.8 },
          { "date": "2024-06-15", "volume_billion_usd": 31.2 },
          { "date": "2024-07-01", "volume_billion_usd": 28.6 },
          { "date": "2024-07-15", "volume_billion_usd": 30.1 },
          { "date": "2024-08-01", "volume_billion_usd": 33.5 },
          { "date": "2024-08-05", "volume_billion_usd": 45.2 },
          { "date": "2024-08-15", "volume_billion_usd": 38.7 },
          { "date": "2024-09-01", "volume_billion_usd": 32.4 },
          { "date": "2024-09-15", "volume_billion_usd": 29.8 },
          { "date": "2024-10-01", "volume_billion_usd": 31.5 },
          { "date": "2024-10-15", "volume_billion_usd": 36.2 },
          { "date": "2024-11-01", "volume_billion_usd": 42.8 },
          { "date": "2024-11-06", "volume_billion_usd": 52.3 },
          { "date": "2024-11-15", "volume_billion_usd": 68.5 },
          { "date": "2024-12-01", "volume_billion_usd": 72.1 },
          { "date": "2024-12-05", "volume_billion_usd": 85.3 },
          { "date": "2024-12-15", "volume_billion_usd": 78.6 },
          { "date": "2025-01-01", "volume_billion_usd": 65.2 },
          { "date": "2025-01-15", "volume_billion_usd": 82.5 },
          { "date": "2025-01-20", "volume_billion_usd": 95.8 },
          { "date": "2025-02-01", "volume_billion_usd": 68.3 },
          { "date": "2025-02-15", "volume_billion_usd": 55.2 },
          { "date": "2025-03-01", "volume_billion_usd": 52.8 },
          { "date": "2025-03-15", "volume_billion_usd": 48.6 },
          { "date": "2025-04-01", "volume_billion_usd": 45.2 },
          { "date": "2025-04-15", "volume_billion_usd": 42.8 },
          { "date": "2025-05-01", "volume_billion_usd": 48.5 }
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "index": 7, "label": "8月闪崩 -23%", "color": "#c25030" },
      { "index": 17, "label": "首破10万", "color": "#c26d3a" },
      { "index": 21, "label": "冲顶10.75万", "color": "#c26d3a" },
      { "index": 26, "label": "回调至8.3万", "color": "#857d74" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "lineStyle": {
      "default": { "color": "#ada599", "width": 1.5 },
      "highlight": { "color": "#c26d3a", "width": 3 }
    },
    "barStyle": {
      "color": "#d6d2c9",
      "opacity": 0.6
    }
  },
  "annotations": [
    {
      "text": "8月闪崩 -23%",
      "subtext": "交易量暴增至452亿",
      "position": "2024-08-05",
      "type": "markPoint",
      "symbol": "pin",
      "color": "#c25030"
    },
    {
      "text": "首破10万",
      "subtext": "5个月翻倍",
      "position": "2024-12-05",
      "type": "markPoint",
      "symbol": "pin",
      "color": "#c26d3a"
    },
    {
      "text": "回吐43%",
      "subtext": "3个月从10.75万跌至8.3万",
      "position": "2025-04-01",
      "type": "markPoint",
      "symbol": "pin",
      "color": "#857d74"
    }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 60, "right": 30, "bottom": 30, "left": 60 },
    "grid": [
      { "top": "12%", "bottom": "38%", "left": "10%", "right": "5%" },
      { "top": "68%", "bottom": "8%", "left": "10%", "right": "5%" }
    ],
    "xAxis": { "type": "time", "axisLabel": { "rotate": 30, "fontSize": 10, "color": "#857d74" } },
    "yAxis": [
      { "type": "value", "name": "USD", "axisLabel": { "fontSize": 11, "color": "#857d74" } },
      { "type": "value", "name": "十亿美元", "gridIndex": 1, "axisLabel": { "fontSize": 11, "color": "#857d74" } }
    ]
  },
  "source": "CoinGecko/CoinMarketCap · 半月光键时间点采样"
}
```

## Source ID 追溯

| 决策 | 出处 |
|------|------|
| C07 模式选择 | viz-design SKILL.md 分类E |
| 上下分图替代双Y轴 | 13-VISUALIZATION.md 硬规则 |
| Warm + Stone 色系 | 13-VISUALIZATION.md 色阶体系 |
| 拐点标注写原因+幅度 | 13-VISUALIZATION.md P4 手法 |
| 标题结论性 | 13-VISUALIZATION.md 硬规则1 |
