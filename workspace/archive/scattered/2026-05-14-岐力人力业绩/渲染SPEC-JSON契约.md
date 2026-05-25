# 岐力职场 — 渲染 SPEC + JSON 契约

> 7 张 ECharts 图，统一暖色克制风格，暖色系，禁用暗色。

---

## Global Style

```json
{
  "globalStyle": {
    "colorRamps": ["Warm", "Stone", "Coral"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#2e8b6e",
      "title": "#6b3410",
      "subtitle": "#857d74",
      "axis": "#ada599",
      "grid": "#f2f0eb",
      "bg": "#ffffff",
      "highlight": "#c25030",
      "hero": "#c26d3a",
      "medium": "#d4a574",
      "light": "#ada599"
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
}
```

---

## 图 1：118人的去向 — 瀑布图

**叙事功能**：一张图说清118人到底怎么了
**标题**："118人中，仅63人确认在岗——18人已流失，35人状态不明"
**类型**：瀑布图（waterfall / bar with helper）

```json
{
  "chartId": "chart-01",
  "chartType": "bar",
  "title": "118人中，仅63人确认在岗——18人已流失，35人状态不明",
  "subtitle": "数据来源：岐力职场坐席数据，截至2026-05-12",
  "layout": {
    "canvas": { "width": 800, "height": 400 },
    "grid": { "top": 60, "right": 40, "bottom": 80, "left": 60 },
    "legend": { "show": true, "position": "bottom" },
    "tooltip": { "enabled": true }
  },
  "data": {
    "categories": ["历史总计", "无外呼记录", "确认流失", "待确认", "确认在职"],
    "values": [118, -2, -18, -35, 63],
    "colorMap": {
      "历史总计": "#c26d3a",
      "无外呼记录": "#ada599",
      "确认流失": "#c25030",
      "待确认": "#d4a574",
      "确认在职": "#c26d3a"
    },
    "visualWeight": {
      "hero": { "target": "确认流失", "style": { "color": "#c25030" } },
      "medium": { "target": "确认在职", "style": { "color": "#c26d3a" } },
      "light": { "target": "其他", "style": { "color": "#ada599" } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "dataIndex": 2 },
      "text": "18人已流失（最后外呼<5月5日）",
      "position": "top",
      "offset": { "x": 0, "y": -15 },
      "style": { "fontSize": 12, "fontWeight": 600, "fill": "#c25030" }
    }
  ],
  "footnote": "在职口径：5月12日当天有外呼记录 | 待确认：5月5~11日有外呼但12日无"
}
```

---

## 图 2：月度人力流入流出 — 分组柱状+折线

**叙事功能**：3月扩招47人，4月即流失18人
**标题**："3月扩招47人，4月即流失18人——净增仅3人"
**类型**：分组柱状图（入职/流失）+ 折线（净增）

```json
{
  "chartId": "chart-02",
  "chartType": "bar+line",
  "title": "3月扩招47人，4月即流失18人——净增仅3人",
  "subtitle": "数据来源：岐力职场入职/流失月度统计",
  "layout": {
    "canvas": { "width": 900, "height": 420 },
    "grid": { "top": 60, "right": 60, "bottom": 60, "left": 50 },
    "legend": { "show": true, "position": "top" },
    "tooltip": { "enabled": true }
  },
  "data": {
    "months": ["25-06","25-07","25-09","25-10","25-11","25-12","26-01","26-02","26-03","26-04","26-05"],
    "hired":    [7, 3, 2, 3, 3, 2, 5, 2, 47, 21, 23],
    "lost":     [0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0],
    "net":      [7, 3, 2, 3, 3, 2, 5, 2, 47, 3, 23],
    "colorMap": {
      "入职": "#c26d3a",
      "流失": "#c25030",
      "净增": "#2e8b6e"
    },
    "visualWeight": {
      "hero": { "target": "流失", "style": { "color": "#c25030" } },
      "medium": { "target": "入职", "style": { "color": "#c26d3a" } },
      "light": { "target": "净增", "style": { "color": "#5dbf9e", "lineWidth": 2 } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "series": "流失", "dataIndex": 9 },
      "text": "流失18人（3月入职新人为主）",
      "position": "top",
      "offset": { "x": 0, "y": -10 },
      "style": { "fontSize": 12, "fontWeight": 600, "fill": "#c25030" }
    },
    {
      "type": "text",
      "target": { "series": "入职", "dataIndex": 8 },
      "text": "扩招47人",
      "position": "top",
      "offset": { "x": 0, "y": -10 },
      "style": { "fontSize": 12, "fontWeight": 600, "fill": "#c26d3a" }
    }
  ],
  "footnote": "流失口径：最后有效外呼在5月5日之前 | 数据源：工作簿-岐力职场.xlsx"
}
```

---

## 图 3：流失特征 — 横向堆叠条形

**叙事功能**：流失集中在入职1~3个月新人
**标题**："流失18人中12人在入职1~3个月内离开——中位在职仅42天"
**类型**：横向堆叠条形图

```json
{
  "chartId": "chart-03",
  "chartType": "bar",
  "title": "流失18人中12人在入职1~3个月内离开——中位在职仅42天",
  "subtitle": "数据来源：确认流失18人司龄分布",
  "layout": {
    "canvas": { "width": 700, "height": 350 },
    "grid": { "top": 50, "right": 40, "bottom": 50, "left": 120 },
    "legend": { "show": true, "position": "bottom" },
    "tooltip": { "enabled": true }
  },
  "data": {
    "type": "horizontal_stacked",
    "category": "流失18人",
    "segments": [
      { "name": "MOB1-（不到1月）", "value": 3, "color": "#d4a574" },
      { "name": "MOB1-3（1~3月）", "value": 12, "color": "#c26d3a" },
      { "name": "MOB3-6（3~6月）", "value": 2, "color": "#ada599" },
      { "name": "MOB6-12（6月+）", "value": 1, "color": "#ada599" }
    ],
    "visualWeight": {
      "hero": { "target": "MOB1-3（1~3月）", "style": { "color": "#c26d3a" } },
      "light": { "target": "其他", "style": { "color": "#ada599" } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "series": "MOB1-3（1~3月）" },
      "text": "12人占67% — 中位在职42天",
      "position": "inside",
      "offset": { "x": 5, "y": 0 },
      "style": { "fontSize": 12, "fontWeight": 600, "fill": "#ffffff" }
    }
  ],
  "footnote": "流失人员中有产值：龚盼星561万、张悦379万、杨云鹏378万，非零产出离职"
}
```

---

## 图 4：在职63人结构 — 树形图

**叙事功能**：63人中仅31人参评，48%为C级
**标题**："63人在职，仅31人参评——其中48%为C级"
**类型**：树形图（treemap）

```json
{
  "chartId": "chart-04",
  "chartType": "treemap",
  "title": "63人在职，仅31人参评——其中48%为C级",
  "subtitle": "数据来源：在职63人参评状态与等级分布",
  "layout": {
    "canvas": { "width": 700, "height": 420 },
    "grid": { "top": 50, "right": 20, "bottom": 50, "left": 20 },
    "legend": { "show": true, "position": "bottom" },
    "tooltip": { "enabled": true }
  },
  "data": {
    "type": "treemap",
    "levels": [
      {
        "name": "在职63人",
        "children": [
          {
            "name": "参评31人",
            "children": [
              { "name": "S级", "value": 1, "color": "#c26d3a" },
              { "name": "A级", "value": 6, "color": "#d4a574" },
              { "name": "B级", "value": 9, "color": "#857d74" },
              { "name": "C级", "value": 15, "color": "#c25030" }
            ]
          },
          {
            "name": "非参评32人",
            "children": [
              { "name": "MOB1- 23人", "value": 23, "color": "#e8ddd0" },
              { "name": "MOB1-3 8人", "value": 8, "color": "#d4c5b5" },
              { "name": "MOB6-12 1人", "value": 1, "color": "#c5b8a8" }
            ]
          }
        ]
      }
    ],
    "visualWeight": {
      "hero": { "target": "C级", "style": { "color": "#c25030" } },
      "light": { "target": "非参评", "style": { "color": "#ada599", "opacity": 0.6 } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "series": "C级" },
      "text": "48%参评为C级",
      "position": "inside",
      "style": { "fontSize": 13, "fontWeight": 600, "fill": "#ffffff" }
    }
  ],
  "footnote": "参评31人GMV 19956万(79%) | 非参评32人GMV 5380万(21%)"
}
```

---

## 图 5：参评31人通时-GMV散点

**叙事功能**：C级集中在低通时低GMV区域
**标题**："A/S级通时144分、GMV 901万；C级仅106分、GMV 489万——C级集中低产出区"
**类型**：散点图

```json
{
  "chartId": "chart-05",
  "chartType": "scatter",
  "title": "A/S级通时144分、GMV 901万；C级仅106分、GMV 489万——C级集中低产出区",
  "subtitle": "数据来源：参评31人近30天业绩 | 通时-GMV相关系数r=0.46",
  "layout": {
    "canvas": { "width": 800, "height": 500 },
    "grid": { "top": 60, "right": 40, "bottom": 60, "left": 70 },
    "legend": { "show": true, "position": "top" },
    "tooltip": { "enabled": true }
  },
  "data": {
    "type": "scatter",
    "xAxis": { "name": "日均有效通时（分钟）", "min": 30, "max": 200 },
    "yAxis": { "name": "近30天GMV（万）", "min": 0, "max": 1200 },
    "series": [
      {
        "name": "S/A级",
        "color": "#c26d3a",
        "symbolSize": 12,
        "data": [
          { "name": "言莹", "value": [167.2, 1110.0] },
          { "name": "彭科", "value": [104.0, 1030.0] },
          { "name": "徐锦", "value": [147.9, 971.6] },
          { "name": "蔡子虎", "value": [134.3, 886.7] },
          { "name": "黎鑫", "value": [141.8, 855.8] },
          { "name": "邓清清", "value": [159.8, 814.2] },
          { "name": "刘强", "value": [125.5, 815.0] }
        ]
      },
      {
        "name": "B级",
        "color": "#d4a574",
        "symbolSize": 10,
        "data": [
          { "name": "罗豪", "value": [77.4, 871.0] },
          { "name": "熊晨", "value": [126.7, 849.1] },
          { "name": "陈家伟", "value": [99.2, 729.2] },
          { "name": "龚洋洋", "value": [109.2, 709.0] },
          { "name": "杨文婷", "value": [128.8, 623.8] },
          { "name": "余学伟", "value": [118.3, 653.4] },
          { "name": "刘波波", "value": [121.9, 768.9] },
          { "name": "胡帅", "value": [174.1, 597.3] },
          { "name": "徐鸿宇", "value": [122.0, 561.9] }
        ]
      },
      {
        "name": "C级",
        "color": "#c25030",
        "symbolSize": 8,
        "data": [
          { "name": "徐乐富", "value": [48.1, 271.1] },
          { "name": "邹泽勇", "value": [89.0, 344.8] },
          { "name": "程芬芬", "value": [106.6, 409.0] },
          { "name": "齐梦华", "value": [68.9, 419.4] },
          { "name": "王诗琦", "value": [141.9, 421.9] },
          { "name": "熊智", "value": [110.2, 601.7] },
          { "name": "徐志雄", "value": [95.0, 530.1] },
          { "name": "吴文豪", "value": [108.8, 549.0] },
          { "name": "熊仕铭", "value": [127.2, 486.8] },
          { "name": "张波", "value": [135.9, 443.9] },
          { "name": "罗来江", "value": [87.5, 594.7] },
          { "name": "冯子豪", "value": [105.8, 335.5] },
          { "name": "易慕康", "value": [120.7, 594.5] },
          { "name": "张爱飞", "value": [84.6, 466.6] },
          { "name": "刘莉莉", "value": [151.2, 639.7] }
        ]
      }
    ],
    "visualWeight": {
      "hero": { "target": "C级", "style": { "color": "#c25030", "symbolSize": 10 } },
      "medium": { "target": "S/A级", "style": { "color": "#c26d3a", "symbolSize": 14 } },
      "light": { "target": "B级", "style": { "color": "#ada599", "symbolSize": 8 } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "series": "C级", "dataIndex": 0 },
      "text": "C级集中在106分/489万",
      "position": "right",
      "offset": { "x": 10, "y": 0 },
      "style": { "fontSize": 11, "fontWeight": 600, "fill": "#c25030" }
    }
  ],
  "footnote": "通时与GMV相关系数r=0.46，中等相关，通时为产出因素之一但非唯一"
}
```

---

## 图 6：三个改善抓手 — 对比卡片

**叙事功能**：三个可立即行动的改善方向
**标题**："三个抓手：确认待确认人员→加速新人参评→提升C级通时"
**类型**：三列对比信息图（HTML卡片，非ECharts图表）

```json
{
  "chartId": "chart-06",
  "chartType": "info-card",
  "title": "三个抓手：确认待确认人员→加速新人参评→提升C级通时",
  "subtitle": "数据来源：在职63人+待确认35人业绩分析",
  "layout": {
    "canvas": { "width": 900, "height": 380 },
    "grid": { "top": 50, "right": 30, "bottom": 40, "left": 30 },
    "columns": 3
  },
  "data": {
    "cards": [
      {
        "title": "抓手1：确认35人待确认状态",
        "icon": "📋",
        "current": "35人状态不明，合计GMV 18054万",
        "target": "若全部在岗：63→98人，总产能25336→43390万",
        "action": "3天内确认35人在岗状态",
        "keyData": "19人GMV>500万，吴才亮单人1430万",
        "color": "#c26d3a"
      },
      {
        "title": "抓手2：加速MOB1-3非参评冲刺",
        "icon": "🎯",
        "current": "MOB1-3非参评8人，合计GMV约3436万",
        "target": "升级参评，拉升职场整体评分",
        "action": "2周带教冲刺计划",
        "keyData": "重点：胡丽梅641万、刘颖732万、康俊582万",
        "color": "#2e8b6e"
      },
      {
        "title": "抓手3：提升C级通时投入",
        "icon": "⏱",
        "current": "C级15人，均值通时106分/天",
        "target": "通时提升至120分/天（B级水平）",
        "action": "2周内验收通时达标率",
        "keyData": "通时-GMV中等相关r=0.46，提升通时有望正向拉动产出",
        "color": "#c25030"
      }
    ]
  },
  "footnote": "抓手3提升幅度基于中等相关估算，实际效果需验证"
}
```

---

## 图 7：待确认高价值人员 — 水平条形

**叙事功能**：35人待确认中19人GMV>500万
**标题**："35人待确认中19人GMV超500万——吴才亮单人产出1430万"
**类型**：水平条形图（Top 19）

```json
{
  "chartId": "chart-07",
  "chartType": "bar",
  "title": "35人待确认中19人GMV超500万——吴才亮单人产出1430万",
  "subtitle": "数据来源：待确认35人中GMV>500万人员",
  "layout": {
    "canvas": { "width": 800, "height": 600 },
    "grid": { "top": 50, "right": 80, "bottom": 40, "left": 100 },
    "legend": { "show": false },
    "tooltip": { "enabled": true }
  },
  "data": {
    "type": "horizontal_bar",
    "names": ["吴才亮","万泽珊","詹焱","刘玉立","吴珍珍","洪诚","郑民","颜樱","李文超","杨丹丹","李佳","黄素云","周建兰","李勋凯","钱凯平","胡小康","龚梅","熊港忠","吴泽昊"],
    "values": [1430, 939, 871, 845, 841, 824, 812, 782, 758, 757, 753, 744, 743, 701, 691, 671, 614, 583, 557],
    "unit": "万",
    "colorMap": {
      "吴才亮": "#c25030",
      "default": "#d4a574"
    },
    "visualWeight": {
      "hero": { "target": "吴才亮", "style": { "color": "#c25030" } },
      "light": { "target": "其他", "style": { "color": "#d4a574" } }
    }
  },
  "annotations": [
    {
      "type": "text",
      "target": { "dataIndex": 0 },
      "text": "吴才亮：GMV 1430万 | MOB1-3 | 外呼21天",
      "position": "right",
      "offset": { "x": 10, "y": 0 },
      "style": { "fontSize": 11, "fontWeight": 600, "fill": "#c25030" }
    }
  ],
  "footnote": "19人合计GMV约14160万 | 需在岗状态确认 | 数据源：工作簿-岐力职场.xlsx"
}
```

---

## 反对证据与局限性

> 渲染时需保留此段在底部

- 在职口径保守：仅以5月12日当天有外呼为在职标准，可能低估实际在岗
- 35人待确认：无法判断是离职还是轮休/请假
- 业绩数据仅30天：无法看到更长期趋势
- 流失原因未知：数据只有行为指标，不含离职原因
- 通时与GMV的因果推断局限：相关系数0.46（R²≈0.21），不能简单归因于通时

## 底部总结

> 渲染时需保留此段在底部

岐力职场从2025年6月至今累计招聘118人，截至5月12日确认在职63人、确认流失18人、35人状态待确认。核心矛盾不是"没人"——3月单月就招了47人——而是"人留不住"：流失人员中位在职仅42天，67%在入职1~3个月内离开。在职63人中83%为入职不到3个月的新人，31人参评中48%为C级，A/S级仅7人。建议三个抓手并行。
