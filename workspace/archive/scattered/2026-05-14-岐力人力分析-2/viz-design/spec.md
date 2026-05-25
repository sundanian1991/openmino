# 技术规范 — 岐力职场人力诊断

## Chart 1: 在职 vs 流失 对比

```json
{
  "tool": "generate_bar_chart",
  "args": {
    "data": [
      {"category": "在职(5/12有外呼)", "value": 63},
      {"category": "已流失(5/12无外呼)", "value": 54}
    ],
    "title": "岐力职场117人仅63人在岗，流失率46.2%",
    "theme": "default",
    "style": {
      "colors": ["#788C5D", "#B04A4A"],
      "backgroundColor": "#ffffff"
    }
  }
}
```

## Chart 2: 入职月留存率 双轴图

```json
{
  "tool": "generate_dual_axes_chart",
  "args": {
    "title": "3月招聘47人流失23人，留存率仅51%",
    "theme": "default",
    "categories": ["25-06","25-07","25-09","25-10","25-11","25-12","26-01","26-02","26-03","26-04","26-05"],
    "series": [
      {"name": "入职人数", "type": "column", "axisYTitle": "人数", "data": [6,3,2,3,3,2,5,2,47,21,23]},
      {"name": "留存率(%)", "type": "line", "axisYTitle": "留存率%", "data": [50,33,100,0,67,50,40,50,51,38,83]}
    ],
    "style": {
      "palette": ["#D97757", "#B04A4A"],
      "backgroundColor": "#ffffff"
    }
  }
}
```

## Chart 3: 在职人员司龄结构

```json
{
  "tool": "generate_bar_chart",
  "args": {
    "data": [
      {"category": "MOB6-12", "value": 6},
      {"category": "MOB3-6", "value": 5},
      {"category": "MOB1-3", "value": 29},
      {"category": "MOB1-", "value": 23}
    ],
    "title": "在职63人中78.7%入职不满3个月",
    "theme": "default",
    "style": {
      "colors": ["#ACA9A2", "#ACA9A2", "#D97757", "#D97757"],
      "backgroundColor": "#ffffff"
    }
  }
}
```

## Chart 4: 在职人员人均GMV

```json
{
  "tool": "generate_bar_chart",
  "args": {
    "data": [
      {"category": "MOB6-12", "value": 629.4},
      {"category": "MOB3-6", "value": 546.4},
      {"category": "MOB1-3", "value": 590.7},
      {"category": "MOB1-", "value": 73.8}
    ],
    "title": "MOB1-人均产出73.8万，仅为成熟期1/8",
    "theme": "default",
    "style": {
      "colors": ["#D97757", "#D97757", "#D97757", "#B04A4A"],
      "backgroundColor": "#ffffff"
    }
  }
}
```

## Chart 5: 流失人员司龄分布

```json
{
  "tool": "generate_bar_chart",
  "args": {
    "data": [
      {"category": "MOB6-12", "value": 8},
      {"category": "MOB3-6", "value": 5},
      {"category": "MOB1-3", "value": 28},
      {"category": "MOB1-", "value": 13}
    ],
    "title": "流失54人中MOB1-3段占52%（28人）",
    "theme": "default",
    "style": {
      "colors": ["#ACA9A2", "#C78E3F", "#B04A4A", "#D19393"],
      "backgroundColor": "#ffffff"
    }
  }
}
```

## Chart 6: 留存率对比

```json
{
  "tool": "generate_bar_chart",
  "args": {
    "data": [
      {"category": "MOB6-12", "value": 42.9},
      {"category": "MOB3-6", "value": 50.0},
      {"category": "MOB1-3", "value": 50.9},
      {"category": "MOB1-", "value": 63.9}
    ],
    "title": "司龄越长留存率越低，打破3个月安全期假设",
    "theme": "default",
    "style": {
      "colors": ["#B04A4A", "#C78E3F", "#D97757", "#D97757"],
      "backgroundColor": "#ffffff"
    }
  }
}
```
