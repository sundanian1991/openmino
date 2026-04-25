#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SCRIPT_DIR = __dirname;
const SKILL_DIR = path.join(SCRIPT_DIR, '..');
const ASSETS_DIR = path.join(SKILL_DIR, 'assets');
const ECHARTS_FILE = path.join(ASSETS_DIR, 'echarts.min.js');
const CHINA_GEO_FILE = path.join(ASSETS_DIR, 'china-geo.json');

// Default output: workspace/ at project root
const WORKSPACE_DIR = path.join(SKILL_DIR, '..', '..', '..', '..', 'workspace');

const TOOL_TO_TYPE = {
  generate_sankey_chart: 'sankey',
  generate_candlestick_chart: 'candlestick',
  generate_map_chart: 'map',
  generate_heatmap_chart: 'heatmap',
  generate_treemap_chart: 'treemap',
  generate_graph_chart: 'graph',
  generate_line_chart: 'line',
  generate_bar_chart: 'bar',
  generate_column_chart: 'column',
  generate_pie_chart: 'pie',
  generate_scatter_chart: 'scatter',
  generate_radar_chart: 'radar',
  generate_funnel_chart: 'funnel',
  generate_gauge_chart: 'gauge',
  generate_effect_scatter_chart: 'effectScatter',
  generate_tree_chart: 'tree',
  generate_sunburst_chart: 'sunburst',
  generate_lines_chart: 'lines',
  generate_pictorial_bar_chart: 'pictorialBar',
  generate_parallel_chart: 'parallel',
  generate_theme_river_chart: 'themeRiver',
  generate_calendar_chart: 'calendar',
  generate_boxplot_chart: 'boxplot',
  generate_polar_chart: 'polar',
  generate_area_chart: 'area',
  generate_dual_axes_chart: 'dualAxes',
  generate_histogram_chart: 'histogram',
};

// ── Theme & Color System ─────────────────────────────────────────
// 配色体系：
//   #c13531 — 主题红（主色/图标/标题/高值）
//   #293c54 — 主题深蓝（辅色/对比/中值）
//   #cdcecd — 纯灰（中性/参考/低值）

const THEMES = {
  default: {
    backgroundColor: '#ffffff',
    textColor: '#98a0ab',
    axisColor: '#98a0ab',
    splitLineColor: '#e8ecf1',
    iconColor: '#c13531',
    primaryColor: '#c13531',
    secondaryColor: '#293c54',
    neutralColor: '#cdcecd',
    accentColor: '#c13531',
    seriesPalette: ['#c13531', '#293c54', '#cdcecd', '#c13531', '#293c54', '#cdcecd', '#c13531', '#293c54'],
  },
  dark: {
    backgroundColor: '#1a1a2e',
    textColor: '#98a0ab',
    axisColor: '#98a0ab',
    splitLineColor: '#2a2a4a',
    iconColor: '#e54d42',
    primaryColor: '#e54d42',
    secondaryColor: '#3f6184',
    neutralColor: '#857d74',
    accentColor: '#ff6b6b',
    seriesPalette: ['#e54d42', '#3f6184', '#6b8dd6', '#a3dd85', '#fcd568', '#ff7777', '#83cff0', '#aa70c4'],
  },
  academy: {
    backgroundColor: '#fafafa',
    textColor: '#555',
    axisColor: '#999',
    splitLineColor: '#e0e0e0',
    iconColor: '#c13531',
    primaryColor: '#c13531',
    secondaryColor: '#293c54',
    neutralColor: '#cdcecd',
    accentColor: '#c13531',
    seriesPalette: ['#c13531', '#293c54', '#cdcecd', '#c13531', '#293c54', '#cdcecd', '#c13531', '#293c54'],
  },
  restraint: {
    backgroundColor: '#ffffff',
    textColor: '#98a0ab',
    axisColor: '#98a0ab',
    splitLineColor: '#e8ecf1',
    iconColor: '#C13531',
    primaryColor: '#C13531',
    secondaryColor: '#293C54',
    neutralColor: '#CDCECD',
    accentColor: '#C13531',
    seriesPalette: ['#C13531', '#293C54', '#CDCECD', '#C13531', '#293C54', '#CDCECD', '#C13531', '#293C54'],
  },
};

/**
 * 值驱动颜色映射：根据数值在数据集里的相对位置返回颜色。
 * 单系列用主题色深浅，多系列用系列调色板。
 *
 * @param {number} value - 当前数据点的值
 * @param {number[]} allValues - 同系列所有值
 * @param {Object} theme - 主题对象
 * @param {string} [entityName] - 数据点名称（用于多系列区分）
 * @returns {string} hex 颜色值
 */
function valueColor(value, allValues, theme, entityName) {
  if (!allValues || allValues.length === 0) return theme.primaryColor;
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues);
  const range = maxVal - minVal || 1;
  const ratio = (value - minVal) / range;

  // 最大值点用强调色突出
  if (ratio >= 0.95) return theme.accentColor;
  // 高值区用主色
  if (ratio >= 0.6) return theme.primaryColor;
  // 中值区用辅色深浅
  if (ratio >= 0.3) return theme.secondaryColor;
  // 低值区用中性色
  return theme.neutralColor;
}

// ── Axis Style Helpers ─────────────────────────────────────────────

function baseXAxis(t, extra = {}) {
  return {
    axisLine: { lineStyle: { color: t.axisColor || t.textColor } },
    splitLine: { lineStyle: { color: t.splitLineColor || '#e8ecf1', type: 'dashed' } },
    axisLabel: { color: t.textColor, fontSize: 11 },
    nameTextStyle: { color: t.textColor, fontSize: 11 },
    ...extra,
  };
}

function baseYAxis(t, extra = {}) {
  return {
    axisLine: { show: false },
    splitLine: { lineStyle: { color: t.splitLineColor || '#e8ecf1', type: 'dashed' } },
    axisLabel: { color: t.textColor, fontSize: 11 },
    nameTextStyle: { color: t.textColor, fontSize: 11 },
    ...extra,
  };
}

// ── Unified Component Style Factory ────────────────────────────────
// 统一所有 ECharts 组件（title/legend/tooltip/toolbox/dataZoom/timeline/mark*）
// 的颜色、字体、间距，确保与官方图标配色体系一致。

function baseLegend(t) {
  return { textStyle: { color: t.textColor }, pageTextStyle: { color: t.textColor } };
}

function baseTooltip(t) {
  return {
    backgroundColor: t.backgroundColor === '#1a1a2e' ? '#2a2a4a' : 'rgba(255,255,255,0.95)',
    borderColor: t.splitLineColor,
    textStyle: { color: t.textColor },
  };
}

function baseTitle(t) {
  return { textStyle: { color: t.textColor } };
}

// ── Option Builders ──────────────────────────────────────────────

function buildSankeyOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;
  const nodeNames = new Set();
  data.forEach(d => { nodeNames.add(d.source); nodeNames.add(d.target); });
  const nodes = Array.from(nodeNames).map(name => ({ name }));
  const links = data.map(d => ({ source: d.source, target: d.target, value: d.value }));

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'sankey',
      data: nodes,
      links,
      emphasis: { focus: 'adjacency' },
      nodeGap: style.nodeGap || 12,
      nodeAlign: style.nodeAlign || 'justify',
      layoutIterations: style.layoutIterations ?? 32,
      lineStyle: { color: 'gradient', curveness: style.curveness ?? 0.5 },
      itemStyle: { color: undefined },
    }],
    color: style.palette || t.palette,
  };
}

function buildCandlestickOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const dates = data.map(d => d.date || d.time);
  const ohlc = data.map(d => [d.open, d.close, d.low, d.high]);

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: t.textColor } },
      name: xAxisTitle,
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: { lineStyle: { color: t.textColor } },
      name: yAxisTitle,
    },
    series: [{
      type: 'candlestick',
      data: ohlc,
      barMaxWidth: style.barMaxWidth || 30,
      itemStyle: {
        color: style.upColor || '#ef5350',
        color0: style.downColor || '#26a69a',
        borderColor: style.upBorderColor || '#ef5350',
        borderColor0: style.downBorderColor || '#26a69a',
      },
    }],
    color: t.palette,
  };
}

function buildMapOption(args) {
  const { data, title = '', style = {}, theme = 'default', mapName = 'china' } = args;
  const t = THEMES[theme] || THEMES.default;
  const values = data.map(d => d.value).filter(v => v != null);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 100;

  return {
    needsGeoJson: true,
    mapName,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    visualMap: {
      min: style.visualMin ?? minVal,
      max: style.visualMax ?? maxVal,
      text: [style.visualMaxText || '高', style.visualMinText || '低'],
      calculable: true,
      inRange: { color: style.colorRange || ['#e0f3f8', '#ffffbf', '#fee090', '#fdae74', '#f46d43', '#d73027'] },
      left: 'left',
      bottom: '30',
    },
    series: [{
      type: 'map',
      map: mapName,
      roam: style.roam ?? true,
      zoom: style.zoom || 1,
      data,
      label: { show: style.showLabel ?? false },
      itemStyle: {
        areaColor: style.areaColor || '#eee',
        borderColor: style.borderColor || '#999',
      },
    }],
    color: t.palette,
  };
}

function buildHeatmapOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisData, yAxisData, xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const values = data.map(d => d.value ?? d[2]);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 100;
  const hmData = data.map(d => [d.x ?? d[0], d.y ?? d[1], d.value ?? d[2]]);

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { position: 'top' },
    grid: { height: style.gridHeight || '60%', top: style.gridTop || '15%' },
    xAxis: {
      type: 'category',
      data: xAxisData || [],
      splitArea: { show: true },
      axisLine: { lineStyle: { color: t.textColor } },
      name: xAxisTitle,
    },
    yAxis: {
      type: 'category',
      data: yAxisData || [],
      splitArea: { show: true },
      axisLine: { lineStyle: { color: t.textColor } },
      name: yAxisTitle,
    },
    visualMap: {
      min: style.visualMin ?? minVal,
      max: style.visualMax ?? maxVal,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: { color: style.colorRange || ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'] },
    },
    series: [{
      type: 'heatmap',
      data: hmData,
      label: { show: style.showLabel ?? false },
      itemStyle: {
        borderColor: style.borderColor || '#fff',
        borderWidth: style.borderWidth || 2,
      },
    }],
    color: t.palette,
  };
}

function buildTreemapOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'treemap',
      data,
      roam: style.roam !== false,
      breadcrumb: { show: style.breadcrumb !== false },
      levels: [
        { itemStyle: { borderWidth: 1, borderColor: '#fff', gap: 2 } },
        { itemStyle: { borderWidth: 1, borderColor: '#fff', gap: 2 } },
      ],
      label: { show: style.showLabel !== false, color: '#fff' },
    }],
    color: style.palette || t.palette,
  };
}

function buildGraphOption(args) {
  const { data, title = '', style = {}, theme = 'default', nodes = [], categories = [] } = args;
  const t = THEMES[theme] || THEMES.default;

  let graphNodes, graphLinks;
  if (nodes.length > 0) {
    graphNodes = nodes;
    graphLinks = data;
  } else {
    const nodeSet = new Set();
    data.forEach(d => { nodeSet.add(d.source); nodeSet.add(d.target); });
    graphNodes = Array.from(nodeSet).map(name => ({ name }));
    graphLinks = data.map(d => ({ source: d.source, target: d.target, value: d.value }));
  }

  const layout = style.layout || 'force';

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: {},
    legend: { data: categories.map(c => c.name), textStyle: { color: t.textColor } },
    series: [{
      type: 'graph',
      layout,
      data: graphNodes,
      links: graphLinks,
      categories,
      roam: style.roam !== false,
      label: { show: true, position: style.labelPosition || 'right', color: t.textColor },
      lineStyle: { color: 'source', curveness: style.curveness ?? 0 },
      emphasis: { focus: 'adjacency' },
      force: layout === 'force' ? {
        repulsion: style.repulsion || 150,
        edgeLength: style.edgeLength || [80, 200],
        gravity: style.gravity ?? 0.1,
      } : undefined,
    }],
    color: style.palette || t.palette,
  };
}

function buildLineOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];
  const times = [...new Set(data.map(d => d.time || d.category))];

  let series;
  if (groups.length > 0) {
    series = groups.map(g => ({
      name: g,
      type: 'line',
      data: times.map(time => {
        const found = data.find(d => (d.time || d.category) === time && d.group === g);
        return found ? found.value : null;
      }),
      smooth: style.smooth !== false,
      lineStyle: { width: style.lineWidth || 2 },
      stack: args.stack ? 'total' : undefined,
      areaStyle: args.stack || style.showArea ? { opacity: style.areaOpacity ?? 0.5 } : undefined,
    }));
  } else {
    series = [{
      type: 'line',
      data: data.map(d => ({ name: d.time || d.category, value: d.value })),
      smooth: style.smooth !== false,
      lineStyle: { width: style.lineWidth || 2 },
      areaStyle: style.showArea ? { opacity: style.areaOpacity ?? 0.5 } : undefined,
    }];
  }

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    xAxis: baseXAxis(t, { type: 'category', data: times, name: xAxisTitle }),
    yAxis: baseYAxis(t, { type: 'value', name: yAxisTitle }),
    series,
    color: style.palette || t.palette,
  };
}

function buildBarOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];
  const cats = [...new Set(data.map(d => d.category))];

  const diverging = style.diverging || style.divergingColor;
  const posColor = style.positiveColor || '#3ba272';
  const negColor = style.negativeColor || '#d5474a';

  let series;
  if (groups.length > 0) {
    series = groups.map(g => {
      const groupValues = data.filter(d => d.group === g).map(d => d.value || 0);
      const barData = cats.map(c => {
        const found = data.find(d => d.category === c && d.group === g);
        const val = found ? found.value : 0;
        if (diverging) {
          return { value: val, itemStyle: { color: val >= 0 ? posColor : negColor } };
        }
        return { value: val, itemStyle: { color: valueColor(val, groupValues, t, c) } };
      });
      return { name: g, type: 'bar', data: barData };
    });
  } else {
    const allValues = data.map(d => d.value);
    const barData = data.map(d => {
      if (diverging) {
        return { value: d.value, itemStyle: { color: d.value >= 0 ? posColor : negColor } };
      }
      return {
        name: d.category,
        value: d.value,
        itemStyle: { color: valueColor(d.value, allValues, t, d.category) },
      };
    });
    series = [{ type: 'bar', data: barData }];
  }

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    yAxis: baseYAxis(t, { type: 'category', data: cats, name: yAxisTitle }),
    xAxis: baseXAxis(t, { type: 'value', name: xAxisTitle }),
    series,
    color: t.seriesPalette,
  };
}

function buildColumnOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];
  const cats = [...new Set(data.map(d => d.category))];

  const diverging = style.diverging || style.divergingColor;
  const posColor = style.positiveColor || '#3ba272';
  const negColor = style.negativeColor || '#d5474a';

  let series;
  if (groups.length > 0) {
    series = groups.map(g => {
      const groupValues = data.filter(d => d.group === g).map(d => d.value || 0);
      const barData = cats.map(c => {
        const found = data.find(d => d.category === c && d.group === g);
        const val = found ? found.value : 0;
        if (diverging) {
          return { value: val, itemStyle: { color: val >= 0 ? posColor : negColor } };
        }
        return { value: val, itemStyle: { color: valueColor(val, groupValues, t, c) } };
      });
      return { name: g, type: 'bar', data: barData };
    });
  } else {
    const allValues = data.map(d => d.value);
    const barData = data.map(d => {
      if (diverging) {
        return { value: d.value, itemStyle: { color: d.value >= 0 ? posColor : negColor } };
      }
      return {
        name: d.category,
        value: d.value,
        itemStyle: { color: valueColor(d.value, allValues, t, d.category) },
      };
    });
    series = [{ type: 'bar', data: barData }];
  }

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    xAxis: baseXAxis(t, { type: 'category', data: cats, name: xAxisTitle }),
    yAxis: baseYAxis(t, { type: 'value', name: yAxisTitle }),
    series,
    color: t.seriesPalette,
  };
}

function buildPieOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;
  const allValues = data.map(d => d.value);

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: { textStyle: { color: t.textColor } },
    series: [{
      type: 'pie',
      radius: [`${(style.innerRadius || 0) * 100}%`, '70%'],
      data: data.map(d => ({
        name: d.category,
        value: d.value,
        itemStyle: { color: valueColor(d.value, allValues, t, d.category) },
      })),
      label: { show: style.showLabel !== false, formatter: '{b}: {d}%' },
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } },
    }],
    color: t.seriesPalette,
  };
}

function buildScatterOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];

  // Categorical X axis: when x values are strings (e.g., supplier names)
  const hasCategoricalX = style.categoricalX || data.some(d => typeof d.x === 'string');
  let xCategories = [];
  if (hasCategoricalX) {
    xCategories = [...new Set(data.map(d => String(d.x)))];
  }

  let series;
  if (groups.length > 0) {
    series = groups.map(g => {
      const groupData = data.filter(d => d.group === g);
      const scatterData = hasCategoricalX
        ? groupData.map(d => [d.x, d.y ?? d.value])
        : groupData.map(d => [d.x, d.y ?? d.value]);
      return {
        name: g,
        type: 'scatter',
        data: scatterData,
        symbolSize: style.symbolSize || 10,
        markLine: args.components?.marks?.markLine ? undefined : undefined,
      };
    });
  } else {
    const scatterData = hasCategoricalX
      ? data.map(d => [d.x, d.y ?? d.value])
      : data.map(d => [d.x ?? d[0], d.y ?? d[1]]);
    series = [{
      type: 'scatter',
      data: scatterData,
      symbolSize: style.symbolSize || 10,
    }];
  }

  const xAxisConfig = hasCategoricalX
    ? { type: 'category', data: xCategories, axisLabel: { color: t.textColor, fontSize: 10, rotate: style.xLabelRotate ?? 30 } }
    : { type: 'value' };

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    xAxis: baseXAxis(t, { ...xAxisConfig, name: xAxisTitle }),
    yAxis: baseYAxis(t, { type: 'value', name: yAxisTitle }),
    series,
    color: style.palette || t.palette,
  };
}

function buildRadarOption(args) {
  const { data, title = '', style = {}, theme = 'default', indicators = [] } = args;
  const t = THEMES[theme] || THEMES.default;

  const series = data.map(d => ({
    name: d.name || d.group,
    type: 'radar',
    data: [{
      value: d.values || d.data,
      name: d.name || d.group,
    }],
    areaStyle: { opacity: style.areaOpacity ?? 0.2 },
    lineStyle: { width: style.lineWidth || 2 },
  }));

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: { textStyle: { color: t.textColor } },
    radar: {
      indicator: indicators.map(ind => typeof ind === 'string' ? { name: ind } : ind),
      radius: style.radius || '65%',
      axisName: { color: t.textColor, fontSize: style.labelFontSize || 12 },
      splitNumber: style.splitNumber || 5,
    },
    series,
    color: style.palette || t.palette,
  };
}

function buildFunnelOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: { textStyle: { color: t.textColor } },
    series: [{
      type: 'funnel',
      data: data.map(d => ({ name: d.category || d.name, value: d.value })),
      sort: style.sort || 'descending',
      width: style.width || '80%',
      height: style.height || '80%',
      gap: style.gap ?? 2,
      label: { show: style.showLabel !== false, formatter: '{b}: {c}' },
      funnelAlign: style.align || 'center',
    }],
    color: style.palette || t.palette,
  };
}

function buildGaugeOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;

  const gauges = Array.isArray(data) ? data : [data];
  const isMulti = gauges.length > 1;

  // Auto-layout for multi-gauge: grid of 2 columns
  const autoLayout = isMulti && !gauges.some(g => g.center);
  if (autoLayout) {
    const cols = 2;
    const rows = Math.ceil(gauges.length / cols);
    const spacingX = 50;
    const spacingY = 100 / rows;
    gauges.forEach((g, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      g.center = [`${spacingX + col * spacingX}%`, `${spacingY * (row + 0.5)}%`];
      g.radius = `${Math.min(35, 80 / cols)}%`;
    });
  }

  const series = gauges.map((g, i) => ({
    type: 'gauge',
    name: g.name || (isMulti ? `仪表${i + 1}` : title),
    radius: g.radius || style.radius || (isMulti ? '30%' : '75%'),
    center: g.center || ['50%', '50%'],
    min: g.min ?? style.min ?? 0,
    max: g.max ?? style.max ?? 100,
    progress: { show: g.showProgress ?? style.showProgress ?? true, width: g.progressWidth ?? style.progressWidth ?? 15 },
    axisLine: { lineStyle: { width: g.axisWidth ?? style.axisWidth ?? 15 } },
    axisTick: { show: g.showTick ?? style.showTick ?? true },
    axisLabel: { color: t.textColor, distance: g.labelDistance ?? style.labelDistance ?? 20, fontSize: isMulti ? 10 : 12 },
    splitLine: { show: g.showSplit ?? style.showSplit ?? true, length: isMulti ? 10 : 20, lineStyle: { width: 2, color: t.textColor } },
    pointer: { show: g.showPointer ?? style.showPointer ?? true, itemStyle: { color: style.pointerColor || 'auto' }, width: g.pointerWidth ?? style.pointerWidth ?? 6 },
    title: { offsetCenter: isMulti ? '0% 50%' : '0% -20%', color: t.textColor, fontSize: isMulti ? 12 : undefined },
    detail: {
      offsetCenter: isMulti ? '0% 30%' : (style.detailOffset || '0% 40%'),
      fontSize: isMulti ? (style.detailFontSize || 16) : (style.detailFontSize || 24),
      color: t.textColor,
      formatter: g.detailFormatter ?? style.detailFormatter ?? '{value}%',
    },
    data: g.items || [{ name: g.name || title, value: g.value }],
  }));

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    series,
    color: style.palette || t.palette,
  };
}

function buildEffectScatterOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisTitle, yAxisTitle } = args;
  const t = THEMES[theme] || THEMES.default;
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];

  let series;
  if (groups.length > 0) {
    series = groups.map(g => ({
      name: g,
      type: 'effectScatter',
      data: data.filter(d => d.group === g).map(d => [d.x, d.y]),
      symbolSize: style.symbolSize || 12,
      rippleEffect: { brushType: style.rippleBrush || 'fill', scale: style.rippleScale || 3 },
    }));
  } else {
    series = [{
      type: 'effectScatter',
      data: data.map(d => [d.x ?? d[0], d.y ?? d[1]]),
      symbolSize: style.symbolSize || 12,
      rippleEffect: { brushType: style.rippleBrush || 'fill', scale: style.rippleScale || 3 },
    }];
  }

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: t.textColor } },
      name: xAxisTitle,
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: t.textColor } },
      name: yAxisTitle,
    },
    series,
    color: style.palette || t.palette,
  };
}

function buildTreeOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'tree',
      data: [data],
      top: style.top || '10%',
      left: style.left || '10%',
      bottom: style.bottom || '10%',
      right: style.right || '10%',
      layout: style.layout || 'orthogonal',
      orient: style.orient || 'LR',
      roam: style.roam !== false,
      expandAndCollapse: style.expandAndCollapse !== false,
      animationDuration: 550,
      animationDurationUpdate: 750,
      label: { show: true, position: style.labelPosition || 'left', verticalAlign: 'middle', color: t.textColor },
      leaves: { label: { position: 'right', verticalAlign: 'middle' } },
      itemStyle: { color: style.nodeColor || '#5470c6' },
    }],
    color: style.palette || t.palette,
  };
}

function buildSunburstOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'sunburst',
      data,
      radius: style.radius || ['15%', '80%'],
      label: { show: style.showLabel !== false, rotate: style.labelRotate || 'radial', color: t.textColor },
      itemStyle: { borderWidth: style.borderWidth || 2, borderColor: t.backgroundColor },
      levels: [
        {},
        { radius: ['15%', '50%'], label: { rotate: 'tangential' } },
        { radius: ['50%', '75%'] },
        { radius: ['75%', '80%'] },
      ],
    }],
    color: style.palette || t.palette,
  };
}

function buildLinesOption(args) {
  const { data, title = '', style = {}, theme = 'default', mapName = 'china' } = args;
  const t = THEMES[theme] || THEMES.default;

  // lines 通常配合地图使用，自动注入 map series
  const coordinateSystem = style.coordinateSystem || 'geo';
  const effectConfig = {
    show: style.showEffect !== false,
    trailLength: style.trailLength ?? 0.4,
    constantSpeed: style.effectSpeed || 3,
    symbol: style.effectSymbol || 'triangle',
    symbolSize: style.effectSymbolSize || 6,
  };

  let seriesList = [];
  if (coordinateSystem === 'geo') {
    seriesList.push({
      type: 'map',
      map: mapName,
      roam: style.roam ?? true,
      zoom: style.zoom || 1,
      silent: true,
      label: { show: style.showMapLabel ?? false },
      itemStyle: {
        areaColor: style.mapAreaColor || '#e8e8e8',
        borderColor: style.mapBorderColor || '#999',
      },
    });
  }

  seriesList.push({
    type: 'lines',
    coordinateSystem,
    data: data.map(d => ({
      coords: d.coords || d.path,
      lineStyle: { color: d.lineColor || style.lineColor || '#5470c6', width: d.lineWidth || style.lineWidth || 2, curveness: d.curveness ?? style.curveness ?? 0.3 },
    })),
    effect: effectConfig,
    polyline: style.polyline ?? false,
    lineStyle: {
      color: style.lineColor || '#5470c6',
      width: style.lineWidth || 2,
      curveness: style.curveness ?? 0.3,
      opacity: style.lineOpacity ?? 0.5,
    },
  });

  return {
    needsGeoJson: coordinateSystem === 'geo',
    mapName,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    geo: coordinateSystem === 'geo' ? {
      map: mapName,
      roam: style.roam ?? true,
      zoom: style.zoom || 1,
      itemStyle: { areaColor: style.mapAreaColor || '#e8e8e8', borderColor: style.mapBorderColor || '#999' },
      silent: true,
    } : undefined,
    series: seriesList,
    color: style.palette || t.palette,
  };
}

function buildPictorialBarOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;
  const symbol = style.symbol || 'roundRect';

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(d => d.category) },
    yAxis: { type: 'value', max: style.maxY },
    series: [{
      type: 'pictorialBar',
      data: data.map(d => ({ name: d.category, value: d.value })),
      symbol,
      symbolSize: style.symbolSize || ['100%', '100%'],
      symbolRepeat: style.symbolRepeat === true ? 'fixed' : undefined,
      symbolSizeValue: style.symbolSizeValue,
      itemStyle: { color: undefined },
      label: { show: style.showLabel !== false, position: 'top' },
    }],
    color: style.palette || t.palette,
  };
}

function buildParallelOption(args) {
  const { data, title = '', style = {}, theme = 'default', dimensions = [] } = args;
  const t = THEMES[theme] || THEMES.default;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: {},
    parallelAxis: dimensions.map((dim, i) => ({
      dim: i,
      name: dim.name || dim,
      type: dim.type || 'value',
      max: dim.max,
      min: dim.min,
    })),
    parallel: {
      left: style.parallelLeft || '5%',
      right: style.parallelRight || '13%',
      bottom: style.parallelBottom || '10%',
      top: style.parallelTop || '20%',
    },
    series: [{
      type: 'parallel',
      data: data.map(d => d.values || d.data),
      lineStyle: { width: style.lineWidth || 2, opacity: style.lineOpacity ?? 0.5 },
    }],
    color: style.palette || t.palette,
  };
}

function buildThemeRiverOption(args) {
  const { data, title = '', style = {}, theme = 'default', categories = [] } = args;
  const t = THEMES[theme] || THEMES.default;
  const singleData = data.map(d => ({
    name: d.name || d.category,
    value: [d.date || d.time, d.value, d.group || d.category],
  }));

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    legend: { data: [...new Set(data.map(d => d.group || d.category))], bottom: 10, textStyle: { color: t.textColor } },
    singleAxis: {
      top: style.singleTop || '15%',
      bottom: style.singleBottom || '15%',
    },
    series: [{
      type: 'themeRiver',
      data: singleData,
      label: { show: style.showLabel ?? false },
      itemStyle: { borderWidth: 1, borderColor: style.backgroundColor || t.backgroundColor },
    }],
    color: style.palette || t.palette,
  };
}

function buildCalendarOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;
  const values = data.map(d => d.value ?? d[1]);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 100;
  const cellSize = style.cellSize || 20;

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { position: 'cell' },
    visualMap: {
      min: style.visualMin ?? minVal,
      max: style.visualMax ?? maxVal,
      type: style.visualType || 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: style.visualTop || 65,
      inRange: { color: style.colorRange || ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'] },
    },
    calendar: {
      range: style.range || '2026',
      left: style.calLeft || 40,
      right: style.calRight || 40,
      cellSize,
      itemStyle: { borderWidth: 3, borderColor: style.backgroundColor || t.backgroundColor },
      yearLabel: { show: style.showYear !== false, color: t.textColor },
      dayLabel: { firstDay: style.firstDay ?? 0, nameMap: style.dayNames || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
      monthLabel: { nameMap: style.monthNames || 'en', color: t.textColor },
    },
    series: [{
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: data.map(d => [d.date || d[0], d.value ?? d[1]]),
    }],
    color: t.palette,
  };
}

function buildBoxplotOption(args) {
  const { data, title = '', style = {}, theme = 'default', xAxisData, boxplotData } = args;
  const t = THEMES[theme] || THEMES.default;

  // data can be: [{min, Q1, median, Q3, max}] or raw values [[...], [...]]
  let seriesData;
  if (data.length > 0 && data[0].min !== undefined) {
    seriesData = data.map(d => [d.min, d.Q1, d.median, d.Q3, d.max]);
  } else {
    // raw values: [[group1_values], [group2_values], ...]
    seriesData = data;
  }

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: xAxisData || (data.length > 0 && data[0].name ? data.map(d => d.name) : []),
      axisLine: { lineStyle: { color: t.textColor } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: t.textColor } },
    },
    series: [{
      type: 'boxplot',
      data: seriesData,
      boxWidth: style.boxWidth || [7, 50],
      itemStyle: { borderColor: undefined, borderWidth: style.borderWidth || 1 },
    }],
    color: style.palette || t.palette,
  };
}

function buildPolarOption(args) {
  const { data, title = '', style = {}, theme = 'default', chartType = 'bar' } = args;
  const t = THEMES[theme] || THEMES.default;
  const seriesType = style.polarType || chartType;

  // data: [{category, value, group?}]
  const categories = [...new Set(data.map(d => d.category))];
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))];

  let series;
  if (groups.length > 0) {
    series = groups.map(g => ({
      name: g,
      type: seriesType,
      data: categories.map(c => {
        const found = data.find(d => d.category === c && d.group === g);
        return found ? found.value : 0;
      }),
    }));
  } else {
    series = [{
      type: seriesType,
      data: data.map(d => d.value),
    }];
  }

  return {
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    legend: groups.length > 0 ? { textStyle: { color: t.textColor } } : undefined,
    angleAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: t.textColor } },
      startAngle: style.startAngle || 90,
    },
    radiusAxis: { type: 'value' },
    polar: {},
    series,
    color: style.palette || t.palette,
  };
}

function buildDualAxesOption(args) {
  const { data, title = '', style = {}, theme = 'default', categories, series } = args;
  const t = THEMES[theme] || THEMES.default;

  // Build series: column → bar type, line → line type
  const seriesList = (series || []).map(s => {
    const base = { name: s.name, data: s.data };
    if (s.type === 'line' || s.type === 'curve') {
      return {
        ...base,
        type: 'line',
        yAxisIndex: s.yAxisIndex ?? 1,
        smooth: s.smooth !== false,
        lineStyle: { width: style.lineWidth || 2 },
        areaStyle: s.area ? { opacity: 0.2 } : undefined,
      };
    }
    return {
      ...base,
      type: 'bar',
      yAxisIndex: s.yAxisIndex ?? 0,
    };
  });

  const leftYAxisLabel = style.axisYTitle || (series && series[0] && series[0].axisYTitle) || '';
  const rightYAxisLabel = series && series[1] ? (series[1].axisYTitle || '') : '';

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    legend: { textStyle: { color: t.textColor } },
    xAxis: baseXAxis(t, { type: 'category', data: categories || [], name: style.axisXTitle || undefined }),
    yAxis: [
      baseYAxis(t, { position: 'left', name: leftYAxisLabel || undefined }),
      { type: 'value', position: 'right', name: rightYAxisLabel || undefined, splitLine: { show: false }, axisLine: { show: false }, axisLabel: { color: t.textColor, fontSize: 11 } },
    ],
    series: seriesList,
    color: style.palette || t.palette,
  };
}

function buildHistogramOption(args) {
  const { data, title = '', style = {}, theme = 'default' } = args;
  const t = THEMES[theme] || THEMES.default;
  const values = data.map(d => d.value);
  const min = style.binMin ?? Math.min(...values);
  const max = style.binMax ?? Math.max(...values);
  const binCount = style.binCount || Math.ceil(Math.sqrt(values.length));
  const binWidth = (max - min) / binCount || 1;

  const bins = Array(binCount).fill(0);
  values.forEach(v => {
    let idx = Math.floor((v - min) / binWidth);
    if (idx >= binCount) idx = binCount - 1;
    bins[idx]++;
  });

  const labels = Array.from({ length: binCount }, (_, i) => (min + i * binWidth).toFixed(1));

  return {
    animation: false,
    title: { text: title || undefined, textStyle: { color: t.textColor } },
    backgroundColor: style.backgroundColor || t.backgroundColor,
    tooltip: { trigger: 'axis' },
    xAxis: baseXAxis(t, { type: 'category', data: labels, name: style.axisXTitle || undefined }),
    yAxis: baseYAxis(t, { type: 'value', name: style.axisYTitle || '频数' }),
    series: [{
      type: 'bar',
      data: bins,
      barCategoryGap: style.barGap || '10%',
    }],
    color: style.palette || t.palette,
  };
}

const BUILDERS = {
  sankey: buildSankeyOption,
  candlestick: buildCandlestickOption,
  map: buildMapOption,
  heatmap: buildHeatmapOption,
  treemap: buildTreemapOption,
  graph: buildGraphOption,
  line: buildLineOption,
  area: buildLineOption,
  bar: buildBarOption,
  column: buildColumnOption,
  pie: buildPieOption,
  scatter: buildScatterOption,
  radar: buildRadarOption,
  funnel: buildFunnelOption,
  gauge: buildGaugeOption,
  effectScatter: buildEffectScatterOption,
  tree: buildTreeOption,
  sunburst: buildSunburstOption,
  lines: buildLinesOption,
  pictorialBar: buildPictorialBarOption,
  parallel: buildParallelOption,
  themeRiver: buildThemeRiverOption,
  calendar: buildCalendarOption,
  boxplot: buildBoxplotOption,
  polar: buildPolarOption,
  dualAxes: buildDualAxesOption,
  histogram: buildHistogramOption,
};

// ── Universal Component Layer ──────────────────────────────────────
// Post-processor that injects Toolbox, DataZoom, Mark components into any chart option.
// Only applied to charts that have compatible coordinate systems.

const CARTESIAN_CHART_TYPES = ['line', 'bar', 'column', 'scatter', 'effectScatter', 'candlestick', 'heatmap'];

function buildComponents(option, args) {
  const { toolbox, dataZoom, marks, timeline, scrollableLegend } = args.components || {};
  const chartType = args._chartType;
  const isCartesian = CARTESIAN_CHART_TYPES.includes(chartType);
  const t = THEMES[args.theme] || THEMES.default;

  // ScrollableLegend: when legend has many items
  if (scrollableLegend && option.legend) {
    const legendBase = Array.isArray(option.legend) ? option.legend[0] : option.legend;
    legendBase.type = 'scroll';
    legendBase.orient = scrollableLegend.orient || 'horizontal';
    legendBase.pageButtonItemGap = scrollableLegend.pageItemGap ?? 5;
    legendBase.pageButtonGap = scrollableLegend.pageGap ?? 10;
    legendBase.pageIcons = scrollableLegend.pageIcons || {
      horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
    };
    legendBase.pageTextStyle = { color: t.textColor };
    legendBase.pageIconColor = t.iconColor;
    legendBase.activeIconColor = t.primaryColor;
    if (scrollableLegend.maxWidth) legendBase.maxWidth = scrollableLegend.maxWidth;
  }

  // Timeline: time-axis carousel for multi-snapshot data
  if (timeline) {
    option.timeline = {
      axisType: timeline.axisType || 'category',
      autoPlay: timeline.autoPlay ?? false,
      playInterval: timeline.playInterval || 2000,
      rewind: timeline.rewind ?? false,
      loop: timeline.loop !== false,
      left: timeline.left || 'center',
      bottom: timeline.bottom || 0,
      lineStyle: { color: t.textColor },
      checkpointStyle: { color: t.primaryColor },
      controlStyle: { color: t.iconColor, borderColor: t.iconColor },
      label: { color: t.textColor },
      itemStyle: { color: t.iconColor },
    };
  }

  // Toolbox: saveAsImage + dataView + restore + magicType (cartesian only)
  if (toolbox !== false) {
    const toolboxConfig = {
      feature: {
        saveAsImage: { title: '导出图片', pixelRatio: 2, type: 'png' },
        dataView: { title: '数据视图', readOnly: false },
        restore: { title: '还原' },
      },
      iconStyle: { borderColor: t.iconColor, borderWidth: 1 },
      emphasis: { iconStyle: { borderColor: t.primaryColor } },
      tooltip: { show: true },
    };

    if (toolbox && toolbox.showToolbox) {
      // If explicitly enabled, add magicType for cartesian charts
      if (isCartesian) {
        toolboxConfig.feature.magicType = {
          title: { line: '折线', bar: '柱状', stack: '堆叠', tiled: '平铺' },
          type: ['line', 'bar', 'stack', 'tiled'],
        };
      }
    }

    option.toolbox = toolboxConfig;
  }

  // DataZoom: slider + inside zoom (cartesian charts only, with enough data)
  if (dataZoom && isCartesian) {
    option.dataZoom = [
      {
        type: 'slider',
        show: dataZoom.showSlider !== false,
        xAxisIndex: 0,
        start: dataZoom.start || 0,
        end: dataZoom.end || 100,
        bottom: '30',
        textStyle: { color: t.textColor },
        borderColor: t.splitLineColor,
        fillerColor: t.iconColor + '33',
        handleStyle: { color: t.iconColor },
        dataBackground: {
          lineStyle: { color: t.splitLineColor },
          areaStyle: { color: t.splitLineColor + '44' },
        },
        selectedDataBackground: {
          lineStyle: { color: t.primaryColor },
          areaStyle: { color: t.primaryColor + '22' },
        },
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        start: dataZoom.start || 0,
        end: dataZoom.end || 100,
      },
    ];
  }

  // Mark annotations on the first series (cartesian only)
  if (marks && isCartesian && option.series && option.series.length > 0) {
    const series = option.series[0];
    if (marks.markPoint) {
      series.markPoint = {
        data: marks.markPoint.map(mp => ({
          name: mp.name || '标注',
          coord: mp.coord || [mp.x, mp.y],
          value: mp.value,
          itemStyle: { color: mp.color || t.primaryColor },
          label: { formatter: mp.label || `{b}: {c}`, color: t.textColor },
        })),
      };
    }
    if (marks.markLine) {
      series.markLine = {
        data: marks.markLine.map(ml => ({
          type: ml.type || undefined,
          name: ml.name || undefined,
          yAxis: ml.value !== undefined ? { yAxis: ml.value } : undefined,
          lineStyle: { color: ml.color || t.secondaryColor, type: ml.lineType || 'dashed' },
          label: { formatter: ml.label || '{b}: {c}', color: t.textColor },
        })).filter(ml => ml.type || (ml.yAxis !== undefined)),
      };
    }
    if (marks.markArea) {
      series.markArea = {
        data: marks.markArea.map(ma => ({
          name: ma.name,
          xAxis: ma.xRange,
          itemStyle: { color: ma.color || t.iconColor + '22' },
          label: { color: t.textColor },
        })),
      };
    }
  }

  return option;
}

// ── HTML Template ──────────────────────────────────────────────────

function generateHtml(option, spec, format) {
  const needsGeoJson = option.needsGeoJson;
  const mapName = option.mapName || 'china';

  // Remove internal flags before embedding
  const cleanOption = { ...option };
  delete cleanOption.needsGeoJson;
  delete cleanOption.mapName;

  const optionJson = JSON.stringify(cleanOption, null, 2);
  const specJson = JSON.stringify(spec, null, 2);

  let echartsSource;
  try {
    echartsSource = fs.readFileSync(ECHARTS_FILE, 'utf-8');
  } catch (e) {
    console.error(`Error: Cannot read echarts.min.js at ${ECHARTS_FILE}`);
    process.exit(1);
  }

  const geoJsonLoad = needsGeoJson ? `
  let chinaGeoData;
  try {
    chinaGeoData = ${(() => {
      try {
        return fs.readFileSync(CHINA_GEO_FILE, 'utf-8');
      } catch { return 'null'; }
    })()};
    if (chinaGeoData) {
      echarts.registerMap('${mapName}', chinaGeoData);
    }
  } catch(e) { console.error('GeoJSON load error:', e); }` : '';

  // Format-specific renderer and export config
  const renderer = format === 'svg' ? 'svg' : 'canvas';
  const exportType = format === 'png' ? 'png' : (format === 'svg' ? 'svg' : 'png');
  const pixelRatio = format === 'png' ? 2 : 1;

  // SVG export: inject a download button that extracts the SVG DOM element
  const svgExportScript = format === 'svg' ? `
  // Add SVG download button
  var svgBtn = document.createElement('button');
  svgBtn.textContent = 'Download SVG';
  svgBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:999;padding:8px 16px;background:#5470c6;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;';
  svgBtn.onclick = function() {
    var svgEl = document.querySelector('#chart svg');
    if (!svgEl) { alert('No SVG found'); return; }
    var svgData = new XMLSerializer().serializeToString(svgEl);
    var blob = new Blob([svgData], {type: 'image/svg+xml'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '${option.title?.text || 'chart'}.svg';
    a.click();
    URL.revokeObjectURL(url);
  };
  document.body.appendChild(svgBtn);` : '';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${option.title?.text || 'ECharts Chart'}</title>
<!-- echarts-visualization skill | spec embedded below -->
<!-- SPEC_START
${specJson}
SPEC_END -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  #chart { width: 100%; height: 100%; }
</style>
</head>
<body>
<div id="chart"></div>
<script>${echartsSource}</script>
<script>
(function() {
  ${geoJsonLoad}
  var chart = echarts.init(document.getElementById('chart'), null, { renderer: '${renderer}' });
  var option = ${optionJson};
  // Ensure toolbox saveAsImage uses the correct format
  if (option.toolbox && option.toolbox.feature && option.toolbox.feature.saveAsImage) {
    option.toolbox.feature.saveAsImage.type = '${exportType}';
    option.toolbox.feature.saveAsImage.pixelRatio = ${pixelRatio};
  }
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
  ${svgExportScript}
})();
</script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────

function main() {
  if (process.argv.length < 3) {
    console.error('Usage: node generate-echarts.js <spec_json_or_file>');
    console.error('Example: node generate-echarts.js \'{"tool":"generate_sankey_chart","args":{"data":[{"source":"A","target":"B","value":5}],"title":"测试"}}\'');
    process.exit(1);
  }

  const specArg = process.argv[2];
  let spec;

  try {
    if (fs.existsSync(specArg)) {
      spec = JSON.parse(fs.readFileSync(specArg, 'utf-8'));
    } else {
      spec = JSON.parse(specArg);
    }
  } catch (e) {
    console.error(`Error parsing spec: ${e.message}`);
    process.exit(1);
  }

  const specs = Array.isArray(spec) ? spec : [spec];
  const results = [];

  for (const item of specs) {
    const tool = item.tool;
    const args = item.args || {};

    if (!tool) {
      console.error(`Error: 'tool' field missing in spec: ${JSON.stringify(item)}`);
      continue;
    }

    const chartType = TOOL_TO_TYPE[tool];
    if (!chartType) {
      console.error(`Error: Unknown tool '${tool}'. Supported: ${Object.keys(TOOL_TO_TYPE).join(', ')}`);
      continue;
    }

    const builder = BUILDERS[chartType];
    if (!builder) {
      console.error(`Error: No builder for chart type '${chartType}'`);
      continue;
    }

    try {
      const option = builder(args);
      // Disable animations globally
      option.animation = false;
      // Apply universal component layer (Toolbox, DataZoom, Marks)
      buildComponents(option, { ...args, _chartType: chartType });
      const html = generateHtml(option, item, args.format || 'html');

      const hash = crypto.randomBytes(4).toString('hex');
      const ext = args.format === 'svg' ? '.svg.html' : (args.format === 'png' ? '.png.html' : '.html');
      const fileName = `${tool.replace('generate_', '').replace('_chart', '')}-${hash}${ext}`;

      fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
      const outPath = path.join(WORKSPACE_DIR, fileName);
      fs.writeFileSync(outPath, html, 'utf-8');

      results.push(outPath);
      console.log(outPath);
    } catch (e) {
      console.error(`Error generating chart for ${tool}: ${e.message}`);
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { BUILDERS, TOOL_TO_TYPE, generateHtml };
