# DNA 速查手册 — 图表施工图模板

> 每个 DNA 场景的完整施工图。后续只需替换数据，框架不变。
> 格式：视觉意图 → 精确色值 → ECharts 完整配置 → 标注规则 → 避坑清单

---

## DNA 002 — 水平条形图（团队业绩排行）

### 视觉意图
- **想传达**：排行差距 + 达标线对比
- **结论性标题**："[头名] 领先 [尾名] X%，N 团队差距显著"
- **签名元素**：均值参考线 + 达标/未达标双色 + 头尾标注

### 精确色值
| 元素 | 色值 | 用途 |
|------|------|------|
| 达标组 | `#2e8b6e` | 条形 ≥ 均值 |
| 未达标组 | `#ada599` | 条形 < 均值 |
| 均值线 | `#c25030` | 虚线参考线 |
| 网格线 | `#f2f0eb` | dashed |
| 轴标签 | `#857D74` | X 轴数值 |
| Y 轴文字 | `#2E2C2A` | 团队名，500 weight |
| 头部标注 | `#2e8b6e` | B 组末端标注 |
| 尾部标注 | `#c25030` | F 组末端标注 |
| 均值标签 | `#c25030` | 顶部独立 graphic |

### ECharts 完整配置

```js
{
  title: {
    text: 'B 组成交额领先 F 组 62%，6 团队差距显著',
    left: 0, top: 0,
    textStyle: { fontSize: 14, fontWeight: 600, color: '#2E2C2A' }
  },
  grid: { left: 55, right: 120, top: 50, bottom: 30 },
  // right ≥ 120，给末端标注留空间
  xAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } },
    axisLabel: { color: '#857D74', fontSize: 11,
      formatter: function(v){ return v >= 10000 ? (v/10000).toFixed(1)+'万' : v; }
    }
  },
  yAxis: {
    type: 'category',
    data: names,  // 降序排列：['F组','C组','A组','E组','D组','B组']
    inverse: true,  // 第一名的条形在顶部
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#2E2C2A', fontSize: 12, fontWeight: 500 }
  },
  series: [{
    type: 'bar',
    data: values.map(function(v, i){
      var item = {
        value: v,
        itemStyle: {
          color: v >= meanVal ? '#2e8b6e' : '#ada599',
          borderRadius: [0, 3, 3, 0]
        }
      };
      // 头部标注：直接覆盖 label
      if (v === maxVal) {
        item.label = {
          show: true, position: 'right', fontSize: 11, fontWeight: 600,
          color: '#2e8b6e',
          formatter: maxVal.toLocaleString() + ' 万\n领先均值 25%'
        };
      }
      // 尾部标注
      if (v === minVal) {
        item.label = {
          show: true, position: 'right', fontSize: 11, fontWeight: 600,
          color: '#c25030',
          formatter: minVal.toLocaleString() + ' 万\n仅为头名 58.5%'
        };
      }
      return item;
    }),
    barWidth: 24,
    label: {
      show: true, position: 'right', fontSize: 11, color: '#5F5A54',
      formatter: function(p){
        // 头尾已标注，中间项显示数值
        if (p.value === maxVal || p.value === minVal) return '';
        return p.value.toLocaleString() + ' 万';
      }
    },
    markLine: {
      silent: true, symbol: 'none',
      data: [{ xAxis: meanVal }],
      lineStyle: { color: '#c25030', type: 'dashed', width: 1.5 },
      label: { show: false }  // 不在线上标注，用独立 graphic
    }
  }],
  // 均值标签放在顶部，不和任何条形重叠
  graphic: [
    { type: 'text', left: 200, top: 25,
      style: { text: '均值 9,554 万', fill: '#c25030', fontSize: 11, fontWeight: 600 } },
    { type: 'line', shape: { x1: 200, y1: 42, x2: 310, y2: 42 },
      style: { stroke: '#c25030', lineWidth: 1.5 } }
  ]
}
```

### 标注规则
| 标注 | 位置 | 实现方式 | 字号 | 字重 |
|------|------|---------|------|------|
| 头部数值+差距 | 条形末端 right | 数据项 label 覆盖 | 11px | 600 |
| 尾部数值+差距 | 条形末端 right | 数据项 label 覆盖 | 11px | 600 |
| 均值标签 | 顶部独立 graphic | graphic text + line | 11px | 600 |
| 中间数值 | 条形末端 right | series label | 11px | 400 |

### 数据格式
```
输入：[{team, value}, ...] 降序排列
处理：计算均值 meanVal = sum / n
     maxVal = data[0].value, minVal = data[n-1].value
```

### 避坑清单
| 坑 | 症状 | 解法 |
|----|------|------|
| markPoint 水平条形图不可靠 | 坐标映射错乱 | 用数据项 label 覆盖 |
| markLine label 放在线上 | 和 X 轴数值重叠 | label: {show:false}，用独立 graphic |
| 标注和条形末端重叠 | right 空间不够 | grid.right ≥ 120 |
| 均值线和条形重合看不清 | 线太细或同色 | CORAL #c25030，width 1.5，dashed |

---

## DNA 10985 — 多折线趋势图（团队月度指标对比）

### 视觉意图
- **想传达**：进步组 vs 停滞组的分化
- **结论性标题**："[B/D] 稳步上升，[C/F] 三月无进展"
- **签名元素**：粗线/细线分层 + 端点峰值标注 + 差距箭头

### 精确色值
| 元素 | 色值 | 用途 |
|------|------|------|
| 上升组主色 | `#2e8b6e` | B 组，3px 粗线 |
| 上升组副色 | `#4aad8d` | D 组，3px 粗线 |
| 稳健组 | `#5ba3c9` | E 组，2px 中线 |
| 稳健组副色 | `#7bb8d0` | A 组，2px 中线 |
| 停滞组 | `#ada599` | C 组，1.5px 虚线 |
| 停滞组副色 | `#8a8278` | F 组，1.5px 虚线 |
| 网格线 | `#f2f0eb` | dashed |
| 差距标注 | `#c25030` | CORAL |

### ECharts 完整配置

```js
{
  title: {
    text: 'B/D 转化率稳步上升，C/F 三月无进展',
    left: 0, top: 0,
    textStyle: { fontSize: 14, fontWeight: 600, color: '#2E2C2A' }
  },
  grid: { left: 50, right: 30, top: 50, bottom: 45 },
  xAxis: {
    type: 'category', data: months,
    axisLine: { lineStyle: { color: '#857D74' } },
    axisTick: { show: false },
    axisLabel: { color: '#5F5A54', fontSize: 12 }
  },
  yAxis: {
    type: 'value', min: minY, max: maxY,
    axisLine: { show: false }, axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } },
    axisLabel: { color: '#857D74', fontSize: 11, formatter: '{value}%' }
  },
  series: [
    // 上升组：粗线 + 端点标注
    { type:'line', name:'B组', data:[2.3,2.8,2.6],
      lineStyle:{width:3,color:'#2e8b6e'}, itemStyle:{color:'#2e8b6e'},
      symbol:'circle', symbolSize:10, smooth:0.3,
      label:{show:true, position:'top', fontSize:11, fontWeight:600, color:'#2e8b6e',
        formatter:function(p){return p.value+'%';}} },
    { type:'line', name:'D组', data:[2.2,2.6,2.5],
      lineStyle:{width:3,color:'#4aad8d'}, itemStyle:{color:'#4aad8d'},
      symbol:'circle', symbolSize:10, smooth:0.3,
      label:{show:true, position:'top', fontSize:11, fontWeight:600, color:'#4aad8d',
        formatter:function(p){return p.value+'%';}} },
    // 稳健组：中线 + 无标注
    { type:'line', name:'E组', data:[2.0,2.5,2.3],
      lineStyle:{width:2,color:'#5ba3c9'}, itemStyle:{color:'#5ba3c9'},
      symbol:'circle', symbolSize:7, smooth:0.3, label:{show:false} },
    { type:'line', name:'A组', data:[2.0,2.3,2.3],
      lineStyle:{width:2,color:'#7bb8d0'}, itemStyle:{color:'#7bb8d0'},
      symbol:'circle', symbolSize:7, smooth:0.3, label:{show:false} },
    // 停滞组：细虚线 + 无标注
    { type:'line', name:'C组', data:[1.7,1.9,1.7],
      lineStyle:{width:1.5,color:'#ada599',type:'dashed'}, itemStyle:{color:'#ada599'},
      symbol:'circle', symbolSize:6, smooth:0.3, label:{show:false} },
    { type:'line', name:'F组', data:[1.7,1.9,1.7],
      lineStyle:{width:1.5,color:'#8a8278',type:'dashed'}, itemStyle:{color:'#8a8278'},
      symbol:'circle', symbolSize:6, smooth:0.3, label:{show:false} }
  ],
  legend: { bottom:0, left:'center', itemWidth:20, itemHeight:3,
    textStyle:{fontSize:11, color:'#5F5A54'} }
}
```

### 标注规则
| 标注 | 位置 | 实现方式 | 字号 | 字重 |
|------|------|---------|------|------|
| 上升组端点值 | 每个数据点 top | series label | 11px | 600 |
| 差距标注 | 图表右侧顶部 | graphic text | 12px | 600 |
| 差距连线 | 右侧垂直 | graphic line | 1px dashed | — |

### 数据格式
```
输入：{team: [val1, val2, val3], ...} × 6 组
分组：上升组（持续增长）、稳健组（小幅波动）、停滞组（持平或下降）
```

### 避坑清单
| 坑 | 症状 | 解法 |
|----|------|------|
| smooth: false | 3 个点连线生硬 | smooth: 0.3 |
| symbolSize 太小 | 点看不清 | 上升组 ≥ 10，停滞组 ≥ 6 |
| 6 条线一样粗 | 分不清主次 | 3 层线宽：3px / 2px / 1.5px |
| 停滞组用实线 | 没有"停滞"暗示 | type: 'dashed' |

---

## DNA 041 — 转化衰减图（漏斗/瓶颈分析）

### 视觉意图
- **想传达**：最大浪费点在哪里
- **结论性标题**："X% 未转化 = 最大浪费点"
- **签名元素**：瓶颈步骤红色 + 水平条形替代漏斗 + 衰减标注

### 精确色值
| 元素 | 色值 | 用途 |
|------|------|------|
| 正常步骤 | `#2e8b6e` | TEAL |
| 瓶颈步骤 | `#c25030` | CORAL |
| 次要步骤 | `#4aad8d` | TEAL_L |
| 辅助色 | `#5ba3c9` | SKY |
| 衰减标注 | `#c25030` | 瓶颈环节 CORAL |
| 其他衰减 | `#857D74` | TXT_MD |

### ECharts 完整配置

```js
{
  title: {
    text: '71% 外呼未接通，接通率是最大瓶颈',
    left: 0, top: 0,
    textStyle: { fontSize: 14, fontWeight: 600, color: '#2E2C2A' }
  },
  grid: { left: 80, right: 30, top: 60, bottom: 10 },
  xAxis: {
    type: 'value', min: 0,
    axisLine: { show: false }, axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } },
    axisLabel: { show: false }  // 数值用 label 显示
  },
  yAxis: {
    type: 'category',
    data: ['外呼总量','接通量','意向客户','成交单数'],
    inverse: true,
    axisLine: { show: false }, axisTick: { show: false },
    axisLabel: { color: '#2E2C2A', fontSize: 12, fontWeight: 500 }
  },
  series: [{
    type: 'bar', barWidth: 28,
    data: [
      { value:3042240, itemStyle:{color:'#2e8b6e',borderRadius:[0,4,4,0]} },
      { value:875491,  itemStyle:{color:'#c25030',borderRadius:[0,4,4,0]} },
      { value:93072,   itemStyle:{color:'#4aad8d',borderRadius:[0,4,4,0]} },
      { value:19107,   itemStyle:{color:'#5ba3c9',borderRadius:[0,4,4,0]} }
    ],
    label: {
      show: true, position: 'right', fontSize: 12, color: '#5F5A54',
      formatter: function(p){
        return p.value.toLocaleString() + '（' + rates[p.dataIndex] + '）';
      }
    }
  }],
  // 衰减标注：每个步骤右侧
  graphic: [
    { type:'text', left:'75%', top:'22%',
      style:{ text:'71.2% 未接通 = 最大浪费点', fill:'#c25030', fontSize:12, fontWeight:600 } },
    { type:'text', left:'75%', top:'42%',
      style:{ text:'89.4% 未转化', fill:'#857D74', fontSize:11 } },
    { type:'text', left:'75%', top:'62%',
      style:{ text:'79.4% 未成交', fill:'#857D74', fontSize:11 } }
  ]
}
```

### 标注规则
| 标注 | 位置 | 实现方式 | 字号 | 字重 |
|------|------|---------|------|------|
| 数量+占比 | 条形末端 right | series label | 12px | 400 |
| 瓶颈衰减 | 右侧顶部 | graphic text | 12px | 600 |
| 其他衰减 | 右侧依次排列 | graphic text | 11px | 400 |

### 数据格式
```
输入：[{name, value, rate, loss}, ...] 按流程顺序
计算：rate = value / 总流量
     loss = 1 - rate（上一步→本步的衰减率）
```

### 避坑清单
| 坑 | 症状 | 解法 |
|----|------|------|
| 用 funnel 图表 | 底部步骤文字被压缩到看不清 | 改用水平条形图 |
| 所有步骤同色 | 看不出瓶颈 | 瓶颈步骤 CORAL #c25030 |
| 衰减标注放图例里 | legend 空间不够 | 用 graphic 绝对定位 |
| X 轴显示数值 | 占用空间且不需要 | axisLabel: {show:false} |

---

## DNA 042 — 散点象限图（双变量关联+策略分区）

### 视觉意图
- **想传达**：X-Y 相关性 + 象限策略定位
- **结论性标题**："[X] 是 [Y] 核心杠杆，[C] 陷入无效忙碌"
- **签名元素**：均值十字线 + 四象限标签 + 标杆/问题点高亮

### 精确色值
| 元素 | 色值 | 用途 |
|------|------|------|
| 标杆组 | `#2e8b6e` | B 组散点 |
| 标杆副组 | `#4aad8d` | D 组散点 |
| 中坚组 | `#5ba3c9` | E 组散点 |
| 中坚副组 | `#7bb8d0` | A 组散点 |
| 问题组 | `#ada599` | C 组散点 |
| 问题副组 | `#8a8278` | F 组散点 |
| 均值十字线 | `#c25030` | dashed 0.5 opacity |
| 象限标签背景 | `#2e8b6e15` | TEAL 15% 透明度 |
| 问题象限背景 | `#c2503015` | CORAL 15% 透明度 |
| 网格线 | `#f2f0eb` | dashed |

### ECharts 完整配置

```js
{
  title: {
    text: '通话时长是转化率核心杠杆，C 组陷入无效忙碌',
    left: 0, top: 0,
    textStyle: { fontSize: 14, fontWeight: 600, color: '#2E2C2A' }
  },
  // bottom ≥ 50，给 legend 留空间
  grid: { left:50, right:30, top:50, bottom:50 },
  xAxis: {
    type:'value', name:'平均通话时长（秒）', nameLocation:'center', nameGap:30,
    min:260, max:370,
    axisLine:{lineStyle:{color:'#857D74'}}, axisTick:{show:false},
    splitLine:{lineStyle:{color:'#f2f0eb',type:'dashed'}},
    axisLabel:{color:'#857D74', fontSize:11}
  },
  yAxis: {
    type:'value', name:'转化率（%）', nameLocation:'center', nameGap:40,
    min:1.4, max:3.0,
    axisLine:{lineStyle:{color:'#857D74'}}, axisTick:{show:false},
    splitLine:{lineStyle:{color:'#f2f0eb',type:'dashed'}},
    axisLabel:{color:'#857D74', fontSize:11, formatter:'{value}%'}
  },
  series: [
    // 均值十字线
    { type:'scatter', data:[],
      markLine:{
        silent:true, symbol:'none',
        lineStyle:{color:'#c25030', type:'dashed', width:1.2, opacity:0.5},
        data:[
          { xAxis:310, label:{formatter:'均值 310s', position:'insideStartTop', fontSize:10, color:'#c25030'} },
          { yAxis:2.2, label:{formatter:'均值 2.2%', position:'insideEndTop', fontSize:10, color:'#c25030'} }
        ]
      }
    },
    // 标杆组：大点 + 标签
    { type:'scatter', name:'B组', data:[...],
      itemStyle:{color:'#2e8b6e'}, symbolSize:16,
      label:{show:true, position:'top', fontSize:10, fontWeight:600, color:'#2e8b6e',
        formatter:function(p){return p.data.team+' '+p.data.month;}} },
    { type:'scatter', name:'D组', data:[...],
      itemStyle:{color:'#4aad8d'}, symbolSize:16,
      label:{show:false} },
    // 中坚组：中点 + 无标签
    { type:'scatter', name:'E组', data:[...],
      itemStyle:{color:'#5ba3c9'}, symbolSize:13, label:{show:false} },
    { type:'scatter', name:'A组', data:[...],
      itemStyle:{color:'#7bb8d0'}, symbolSize:13, label:{show:false} },
    // 问题组：小点 + 标注
    { type:'scatter', name:'C组', data:[...],
      itemStyle:{color:'#ada599'}, symbolSize:11,
      label:{show:true, position:'bottom', fontSize:10, fontWeight:600, color:'#ada599',
        formatter:function(p){return p.data.team+' '+p.data.month;}} },
    { type:'scatter', name:'F组', data:[...],
      itemStyle:{color:'#8a8278'}, symbolSize:11, label:{show:false} }
  ],
  // 象限标签：左侧上下排列，不和 legend 冲突
  graphic: [
    { type:'rect', left:'8%', top:'18%',
      style:{ fill:'#2e8b6e15', width:110, height:24, radius:3 } },
    { type:'text', left:'9%', top:'19%',
      style:{ text:'标杆区（高通话 高转化）', fill:'#2e8b6e', fontSize:11, fontWeight:600 } },
    { type:'rect', left:'8%', bottom:'22%',
      style:{ fill:'#c2503015', width:110, height:24, radius:3 } },
    { type:'text', left:'9%', bottom:'23%',
      style:{ text:'无效忙碌（低通话 低转化）', fill:'#c25030', fontSize:11, fontWeight:600 } }
  ],
  legend: { bottom:0, left:'center', itemWidth:10, itemHeight:10,
    textStyle:{fontSize:11, color:'#5F5A54'} }
}
```

### 标注规则
| 标注 | 位置 | 实现方式 | 字号 | 字重 |
|------|------|---------|------|------|
| 标杆组标签 | 散点 top | 数据项 label | 10px | 600 |
| 问题组标签 | 散点 bottom | 数据项 label | 10px | 600 |
| 均值线 | 线端 inside | markLine label | 10px | 400 |
| 象限标签 | 左侧上下 | graphic rect + text | 11px | 600 |

### 数据格式
```
输入：[{x, y, team, month}, ...]
计算：meanX = avg(x), meanY = avg(y)
分组：标杆组（右上象限）、问题组（左下象限）
```

### 避坑清单
| 坑 | 症状 | 解法 |
|----|------|------|
| 象限标签和 legend 重叠 | 底部空间不够 | grid.bottom ≥ 50，象限标签放左侧 |
| scatter label position function | ECharts 不支持 | 用固定 position: 'top' 或 'bottom' |
| 散点大小无差异 | 看不出分组 | 标杆 16px，中坚 13px，问题 11px |
| 象限标签纯文字 | 不醒目 | 加背景色块（fill: 'color15' 透明度） |
