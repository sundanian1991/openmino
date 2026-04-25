# 13-VISUALIZATION — 可视化默认规范

> 年老师认可的克制风格 | 2026-04-25 确立

---

## 核心原则

**说清楚 > 做漂亮**。骨架够了，不要加肉。

## 颜色约束

- **工具优先级**：ECharts > SVG 手写 > Chart.js
- **默认 3 色**：主题红 `#C13531`（主色/高值）、主题深蓝 `#293C54`（辅色/中值）、纯灰 `#CDCECD`（中性/低值）
- **禁止**：ECharts 默认 9 色轮播（`#5070dd, #b6d634...`）
- 禁止：渐变、阴影、发光、多色循环、3D 效果

### ECharts 主题配置模板

```js
{
  color: ['#C13531', '#293C54', '#CDCECD'],
  backgroundColor: 'transparent',
  animation: false,
  xAxis: {
    axisLine: { lineStyle: { color: '#98a0ab' } },
    splitLine: { lineStyle: { color: '#e8ecf1', type: 'dashed' } },
    axisLabel: { color: '#98a0ab', fontSize: 11 }
  },
  yAxis: {
    axisLine: { show: false },
    splitLine: { lineStyle: { color: '#e8ecf1', type: 'dashed' } },
    axisLabel: { color: '#98a0ab', fontSize: 11 }
  }
}
```

## 优秀配方（年老师认可版）

### 结构
1. **标题**：什么指标
2. **副标题**：时间范围 + 对象
3. **图例**：≤2 行，说明线条/颜色含义
4. **图表（ECharts）**：
   - 全局 color: `['#C13531', '#293C54', '#CDCECD']`，禁用默认 9 色轮播
   - animation: false，关掉默认动画
   - 网格线 `#e8ecf1` dashed，轴标签 `#98a0ab`
   - 主线 `#C13531`（红），对比线 `#293C54`（深蓝），参考线 `#CDCECD`（灰）
   - 关键数据点用实心圆标注，差距用 markLine + 标签
5. **图表（SVG 手写）**：
   - 网格线 `#e8ecf1`，透明度 0.3-0.5
   - 主线 `#C13531`，1.5px，stroke-linecap="round"
   - 对比线 `#293C54` 50% 透明度，1px
   - 锚点：关键数据点用实心圆（主线 3px，对比线 2px）
   - 标注：差距用虚线连接 + 圆角标签（数值/百分比）
5. **底部总结**：一段话，含起点值、终点值、关键拐点原因

### 对比要求
- 必须有参照系（基准线/目标线/竞品线），否则不做趋势图
- 差距必须有标注（数值 + 视觉连接）
- 没有对比的图表 = 半成品

### 描述要求
- 底部一段话解释"为什么会这样"
- 标注关键拐点及原因
- 数据不够时，不硬做，先列缺什么

## SVG 图标

- 手绘风格：几根线 + 几何形状
- 不用图标库
- 不用 emoji

## 自检

生成后问：去掉任何一个元素，信息还在吗？在就删掉。
