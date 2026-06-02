```json
{
  "version": "viz-design-spec-v2",
  "title": "艾滋病发病仅排第 10，死亡数却占近半",
  "subtitle": "2023 年全年 · 中国甲乙类法定传染病 | 15 种疾病，发病总计 361 万，死亡总计 5,186",
  "data": {
    "type": "rows",
    "fields": ["疾病名称", "发病数", "死亡数"],
    "rows": [
      { "疾病名称": "病毒性肝炎", "发病数": 1185648, "死亡数": 468 },
      { "疾病名称": "肺结核", "发病数": 614164, "死亡数": 2415 },
      { "疾病名称": "梅毒", "发病数": 579443, "死亡数": 44 },
      { "疾病名称": "淋病", "发病数": 105673, "死亡数": 0 },
      { "疾病名称": "百日咳", "发病数": 38395, "死亡数": 2 },
      { "疾病名称": "猩红热", "发病数": 34217, "死亡数": 0 },
      { "疾病名称": "布鲁氏菌病", "发病数": 29054, "死亡数": 1 },
      { "疾病名称": "新型冠状病毒感染", "发病数": 23087, "死亡数": 12 },
      { "疾病名称": "伤寒和副伤寒", "发病数": 8427, "死亡数": 1 },
      { "疾病名称": "流行性感冒", "发病数": 6414, "死亡数": 3 },
      { "疾病名称": "麻疹", "发病数": 598, "死亡数": 0 },
      { "疾病名称": "流行性出血热", "发病数": 546, "死亡数": 3 },
      { "疾病名称": "流行性乙型脑炎", "发病数": 389, "死亡数": 29 },
      { "疾病名称": "疟疾", "发病数": 327, "死亡数": 3 }
    ]
  },
  "mapping": { "x": "发病数", "y": "死亡数", "fill": null, "color": null, "size": null },
  "layers": [
    {
      "geom": "geom_rect",
      "aes": { "xStart": 5000, "xEnd": 2000000, "yStart": 500, "yEnd": 3000, "label": "高死亡区" },
      "params": { "color": "rgba(216,90,48,0.06)" },
      "comment": "暗示右上角是'危险区'"
    },
    {
      "geom": "geom_rect",
      "aes": { "xStart": 100000, "xEnd": 2000000, "yStart": 0, "yEnd": 300, "label": "高发病低死亡区" },
      "params": { "color": "rgba(173,165,153,0.06)" },
      "comment": "右下角是'安全区'——发病多但死亡少"
    },
    {
      "geom": "geom_hline",
      "aes": { "yValue": 346, "label": "平均死亡数 346" },
      "params": { "color": "#ada599", "dash": [4, 4] },
      "comment": "死亡数均值参考线"
    },
    {
      "geom": "geom_vline",
      "aes": { "xValue": 240000, "label": "中位发病数" },
      "params": { "color": "#ada599", "dash": [4, 4] },
      "comment": "发病数中位线"
    },
    {
      "geom": "geom_point",
      "aes": { "x": "发病数", "y": "死亡数" },
      "params": { "color": "#ada599", "size": 8 }
    },
    {
      "geom": "geom_point",
      "aes": { "x": "发病数", "y": "死亡数" },
      "params": { "color": "#D85A30", "size": 24 },
      "data": {
        "rows": [
          { "疾病名称": "艾滋病", "发病数": 6895, "死亡数": 2201 }
        ]
      },
      "comment": "高亮点 size 24，远大于默认点"
    },
    {
      "geom": "geom_point",
      "aes": { "x": "发病数", "y": "死亡数" },
      "params": { "color": "none", "size": 36, "border": "#D85A30", "borderWidth": 2 },
      "data": {
        "rows": [
          { "疾病名称": "艾滋病", "发病数": 6895, "死亡数": 2201 }
        ]
      },
      "comment": "外圈光晕效果"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 6895, "y": 2201, "label": "艾滋病" },
      "params": { "color": "#D85A30", "fontSize": 14, "fontWeight": 700 },
      "comment": "疾病名大字标注"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 6895, "y": 2201, "label": "发病 6,895 → 死亡 2,201\n致死率 32%，占全部死亡 42%" },
      "params": { "color": "#6b7280", "fontSize": 11 },
      "comment": "数据说明"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "log", "name": "发病数（例，对数刻度）" },
    { "aesthetic": "y", "type": "linear", "name": "死亡数（例）" }
  ],
  "coord": { "type": "cartesian", "flip": false },
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui, -apple-system, sans-serif",
    "titleSize": 16,
    "axisLabelSize": 10,
    "canvas": { "width": 800, "height": 550 }
  }
}
```
