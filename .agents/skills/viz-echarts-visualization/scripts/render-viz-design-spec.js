#!/usr/bin/env node
// viz-design-spec JSON → ECharts HTML 正式渲染管线
// 支持 v1（声明式 chartType）和 v2（ggplot2 分层）
// 放置位置：.claude/skills/viz-echarts/scripts/render-viz-design-spec.js
// 用法：node render-viz-design-spec.js [spec.json路径] 或 node render-viz-design-spec.js --batch [目录]
const fs = require('fs');
const path = require('path');

const ECHARTS_CDN = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';

// ─── 配色（对标 echarts-recipes.md + 13-VISUALIZATION.md）────────
const THEMES = {
  default: {
    bg: '#ffffff',
    title: '#374151', subtitle: '#9ca3af',
    axisLine: '#ada599', axisLabel: '#857d74', splitLine: '#f2f0eb',
    tooltipBg: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb',
    colors: ['#c26d3a', '#857d74', '#2e8b6e', '#c25030', '#7a8a6e', '#b08968'],
    fontFamily: 'system-ui, sans-serif',
    grid: { top: 70, right: 30, bottom: 50, left: 50 }
  }
};

// 合并 theme 覆盖：palette / grid / fontFamily
function resolveTheme(spec) {
  const base = THEMES.default;
  const t = spec.theme || {};
  return {
    ...base,
    palette: t.palette || null,
    gridShow: t.grid?.show !== false,
    gridColor: t.grid?.major || base.splitLine,
    fontFamily: t.fontFamily || base.fontFamily,
    axisLabelSize: t.axisLabelSize || 10,
    titleSize: t.titleSize || 16,
    axisLabel: t.axisLabel || base.axisLabel,
    title: t.title || base.title,
    subtitle: t.subtitle || base.subtitle
  };
}

// ─── 前注意觉 + 格式塔 后处理模块 ─────────────────────
const WARM = '#c26d3a';
const STONE = '#857d74';
const TEAL = '#2e8b6e';

/**
 * 自动高亮：≥5 个系列时，1 彩 + 其余灰
 * 查找 layers 中 highlight:true 的目标，分配 Warm 色，其余 Stone
 */
function autoHighlight(option, spec) {
  const series = option.series;
  if (!series || series.length < 5) return;

  // v2 有 readerWeight 时，尊重图层颜色，不做自动高亮
  if (spec.layers?.some(l => l.readerWeight)) return;

  // 查找 highlight 目标
  const layers = spec.layers || [];
  let highlightIdx = -1;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].params && layers[i].params.highlight) { highlightIdx = i; break; }
  }
  // 无声明时自动选最大值系列
  if (highlightIdx < 0) {
    let maxSum = -Infinity;
    for (let i = 0; i < series.length; i++) {
      const sum = (series[i].data || []).reduce((a, b) => a + (typeof b === 'object' ? (b.value || 0) : b), 0);
      if (sum > maxSum) { maxSum = sum; highlightIdx = i; }
    }
  }

  for (let i = 0; i < series.length; i++) {
    if (series[i].type === 'line' && series[i].markLine) continue; // 跳过参考线
    if (i === highlightIdx) {
      series[i].itemStyle = { ...(series[i].itemStyle || {}), color: WARM };
    } else {
      series[i].itemStyle = { ...(series[i].itemStyle || {}), color: STONE };
    }
  }
  // 更新全局色板
  option.color = series.map((_, i) => i === highlightIdx ? WARM : STONE);
}

/**
 * 色阶截断：≤2 ramp，超出截断 + 灰色填充
 */
function resolveRampColor(option) {
  const colors = option.color;
  if (!colors || colors.length <= 3) return;
  // 保留前 3 色（Warm/Stone/Teal），其余灰色填充
  const maxColors = [WARM, STONE, TEAL];
  option.color = colors.map((_, i) => i < 3 ? maxColors[i] : STONE);
}

/**
 * 去噪：强制极简坐标轴 + 紧凑间距
 * 始终执行，确保每张图符合 baseTheme 标准
 */
function deNoise(option) {
  // Y 轴轴线隐藏
  if (option.yAxis) {
    const ya = Array.isArray(option.yAxis) ? option.yAxis : [option.yAxis];
    ya.forEach(y => {
      y.axisLine = { show: false };
      y.splitLine = y.splitLine || {};
      y.splitLine.lineStyle = { color: '#f2f0eb', type: 'dashed' };
    });
  }
  // X 轴网格隐藏
  if (option.xAxis) {
    const xa = Array.isArray(option.xAxis) ? option.xAxis : [option.xAxis];
    xa.forEach(x => {
      x.splitLine = { show: false };
      if (!x.axisLine) x.axisLine = { lineStyle: { color: '#ada599' } };
    });
  }
  // 紧凑间距
  option.grid = { ...(option.grid || {}), top: 70, right: 30, bottom: 50, left: 50 };
  // 关闭动画
  option.animation = false;
}

// ─── JSON Schema 校验 ──────────────────────────────────
const V1_REQUIRED_FIELDS = ['version', 'chartType', 'title', 'data'];
const V1_CHART_TYPES = [
  'bar_chart', 'line_chart', 'multi_line', 'area_chart',
  'stacked_area', 'dual_axis', 'grouped_bar', 'stacked_bar',
  'scatter_chart', 'radar_chart'
];
const V2_REQUIRED_FIELDS = ['version', 'data', 'mapping', 'layers', 'title'];
const VALID_GEOMS = [
  'geom_bar', 'geom_point', 'geom_line', 'geom_smooth',
  'geom_area', 'geom_label', 'geom_hline', 'geom_vline',
  'geom_rect', 'geom_ribbon', 'geom_pie'
];

function validateSpec(json) {
  const errors = [];
  if (!json || typeof json !== 'object') return ['JSON 解析失败'];

  // v2 分支
  if (json.version === 'viz-design-spec-v2') {
    return validateV2(json);
  }

  // v1 分支
  for (const f of V1_REQUIRED_FIELDS) {
    if (!json[f]) errors.push(`缺少必填字段: ${f}`);
  }

  if (json.version && json.version !== 'viz-design-spec-v1') {
    errors.push(`版本不匹配: ${json.version}，期望 viz-design-spec-v1`);
  }

  if (json.chartType && !V1_CHART_TYPES.includes(json.chartType)) {
    errors.push(`非法 chartType: ${json.chartType}，允许: ${V1_CHART_TYPES.join(', ')}`);
  }

  // 兼容 data.rows 格式：将 rows 转换为 series
  if (json.data && json.data.rows && !json.data.series) {
    json.data.series = convertRowsToSeries(json.data);
  }

  if (json.data) {
    if (!json.data.series || !Array.isArray(json.data.series) || json.data.series.length === 0) {
      errors.push('data.series 必须是非空数组');
    }
    json.data.series.forEach((s, i) => {
      if (!s.name) errors.push(`series[${i}] 缺少 name`);
      if (s.values === undefined && s.points === undefined && s.value === undefined) {
        errors.push(`series[${i}] 缺少 values/points/value`);
      }
      if (s.values && !Array.isArray(s.values)) {
        errors.push(`series[${i}].values 必须是数组`);
      }
    });
  }

  if (json.visualEncoding && json.visualEncoding.highlight) {
    if (!Array.isArray(json.visualEncoding.highlight)) {
      errors.push('visualEncoding.highlight 必须是数组');
    }
  }

  return errors;
}

// ─── v2 校验 ───────────────────────────────────────────

function validateV2(json) {
  const errors = [];

  for (const f of V2_REQUIRED_FIELDS) {
    if (json[f] === undefined || json[f] === null) {
      errors.push(`v2 缺少必填字段: ${f}`);
    }
  }

  // mapping.x 必须存在（可以是 null）
  if (json.mapping === undefined) {
    errors.push('v2 缺少 mapping 字段');
  }

  // layers 校验
  if (!json.layers || !Array.isArray(json.layers) || json.layers.length === 0) {
    errors.push('v2 layers 必须是非空数组');
  } else {
    json.layers.forEach((l, i) => {
      if (!l.geom) errors.push(`v2 layers[${i}] 缺少 geom`);
      if (l.geom && !VALID_GEOMS.includes(l.geom)) {
        errors.push(`v2 layers[${i}] 非法 geom: ${l.geom}，允许: ${VALID_GEOMS.join(', ')}`);
      }
    });
  }

  // scales 校验（如果有）
  if (json.scales && Array.isArray(json.scales)) {
    json.scales.forEach((s, i) => {
      if (!s.aesthetic) errors.push(`v2 scales[${i}] 缺少 aesthetic`);
      if (!s.type) errors.push(`v2 scales[${i}] 缺少 type`);
    });
  }

  // coord 必须有（可以是 null，表示饼图等不需要坐标系）
  if (json.coord === undefined) {
    errors.push('v2 缺少 coord 字段');
  }

  // 兼容：如果 data 是 rows 格式，转为 series 供 v1 渲染引擎使用
  if (json.data && json.data.rows && !json.data.series) {
    json.data.series = convertRowsToSeries(json.data);
  }

  return errors;
}

/** 将 data.rows + fields 转换为 data.series */
function convertRowsToSeries(data) {
  const { fields, rows } = data;
  if (!rows || rows.length === 0) return [];
  // 第一个 field 通常是 X 轴标签
  const labelField = fields[0];
  const labels = rows.map(r => r[labelField]);
  const series = [{ name: labelField, values: labels }];
  // 其余 fields 各成一个 series
  for (let i = 1; i < fields.length; i++) {
    series.push({
      name: fields[i],
      values: rows.map(r => r[fields[i]])
    });
  }
  return series;
}

// ─── 数据提取 ──────────────────────────────────────────

/**
 * 从 series.values 提取数值。支持三种格式：
 * 1. 纯数值数组 [1, 2, 3] → { numbers: [1,2,3] }
 * 2. 字符串数组 ["2015", "2016"] → { labels: ["2015","2016"] }
 * 3. 对象数组 [{year: 2015, value: 100}] → { labels: [...], numbers: [...], objects: [...] }
 */
function extractValues(values) {
  if (!Array.isArray(values)) {
    if (typeof values === 'number') return { numbers: [values] };
    return { numbers: [] };
  }
  if (values.length === 0) return { numbers: [] };
  if (typeof values[0] === 'number') return { numbers: values };
  if (typeof values[0] === 'string') return { labels: values };
  if (typeof values[0] === 'object' && values[0] !== null) {
    const keys = Object.keys(values[0]);
    const strKey = keys.find(k => typeof values[0][k] === 'string');
    const numKey = keys.find(k => typeof values[0][k] === 'number');
    if (strKey && numKey) {
      return {
        labels: values.map(v => v[strKey]),
        numbers: values.map(v => v[numKey]),
        objects: values
      };
    }
    if (numKey) return { numbers: values.map(v => v[numKey]) };
    return { numbers: values };
  }
  return { numbers: values };
}

/** 统一入口：处理 values / value 两种字段名 */
function extractSeries(s) {
  if (s.values !== undefined) return extractValues(s.values);
  if (s.value !== undefined) return extractValues([s.value]); // schema deviation 兼容
  if (s.points && Array.isArray(s.points)) return { points: s.points };
  return { numbers: [] };
}

// ─── 数字格式化 ────────────────────────────────────────

function fmtNum(v) {
  if (typeof v !== 'number') return v;
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
  if (Math.abs(v) >= 1e4) return (v / 1e3).toFixed(0) + 'k';
  if (Math.abs(v) >= 1e3 && Number.isInteger(v)) return (v / 1e3).toFixed(1) + 'k';
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// ─── 标注格式化 ────────────────────────────────────────

function buildAnnotationMap(annotations, seriesName) {
  const map = {};
  if (!annotations) return map;
  annotations.forEach(a => {
    if (a.target === seriesName || a.series === seriesName) {
      map[a.target] = a.text;
    }
  });
  return map;
}

// ─── v2 渲染引擎（ggplot2 分层）────────────────────────

/**
 * 将 v2 spec（layers + mapping + scales + coord + theme）转换为 ECharts option
 * 每种 geom 独立转为 ECharts series，零猜测
 */
function renderV2Chart(spec) {
  const theme = resolveTheme(spec);
  const { data, mapping, layers, scales = [], coord, facet, title, subtitle } = spec;
  const canvas = spec.theme?.canvas || { width: 800, height: 550 };

  if (!data.rows || data.rows.length === 0) {
    throw new Error('v2 渲染需要 data.rows，当前为空');
  }

  const { fields, rows } = data;
  const xField = mapping.x; // X 轴映射的列名
  const yField = mapping.y; // Y 轴主映射（可选）
  const fillField = mapping.fill; // 填充色/分组列（可选）

  // ─── 提取 X 轴数据 ──────────────────────────────────
  let xLabels = xField ? rows.map(r => r[xField]) : rows.map((_, i) => String(i + 1));

  // ─── 从 scales 构建轴配置 ────────────────────────────
  let xAxisType = 'category';
  let xAxisLog = false;
  let yAxisConfigs = [];
  let colorPalette = null;

  for (const sc of scales) {
    if (sc.aesthetic === 'x') {
      xAxisType = sc.type === 'log' ? 'value' : 'category';
      if (sc.type === 'log') xAxisLog = true;
    }
    if (sc.aesthetic === 'y') {
      const axisCfg = {
        type: sc.type === 'log' ? 'value' : 'value',
        name: sc.name || '',
        splitLine: { show: !sc.secondary }
      };
      if (sc.type === 'log') axisCfg.logBase = sc.base || 10;
      if (sc.secondary) axisCfg.secondary = true;
      yAxisConfigs.push(axisCfg);
    }
    if (sc.aesthetic === 'fill' && sc.type === 'manual') {
      colorPalette = sc.values;
    }
    if (sc.aesthetic === 'color' && sc.type === 'manual') {
      colorPalette = sc.values;
    }
  }

  // 默认 Y 轴
  if (yAxisConfigs.length === 0) {
    yAxisConfigs.push({ type: 'value', name: '', splitLine: { show: true } });
  }

  // ─── 通用 option 骨架 ───────────────────────────────
  const colorList = theme.palette ? (Array.isArray(theme.palette) ? theme.palette : theme.colors) : theme.colors;
  const option = {
    backgroundColor: theme.bg,
    color: colorList,
    title: {
      text: title || '', subtext: subtitle || '', left: 'center', top: 10,
      textStyle: { fontSize: 16, fontWeight: 600, color: theme.title, fontFamily: theme.fontFamily },
      subtextStyle: { fontSize: 11, color: theme.subtitle, fontFamily: theme.fontFamily }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.tooltipBg, borderColor: theme.borderColor,
      textStyle: { color: '#374151', fontFamily: theme.fontFamily }
    },
    grid: { ...(theme.grid || { top: 70, right: 30, bottom: 50, left: 50 }) },
    animation: false
  };

  // ─── coord 处理 ────────────────────────────────────
  const isFlip = coord && coord.flip;
  const isPolar = coord && coord.type === 'polar';

  // 鲁棒性：flip 模式下如果 xLabels 全是数值，说明 mapping.x/y 可能写反了
  // 自动寻找第一个字符串字段作为类别标签
  if (isFlip && xLabels.length > 0 && xLabels.every(v => typeof v === 'number')) {
    const strField = fields.find(f => rows.length > 0 && typeof rows[0][f] === 'string');
    if (strField) {
      const corrected = rows.map(r => r[strField]);
      Object.assign(xLabels, corrected); // reassign contents of const
      xLabels.length = corrected.length;
    }
  }

  // ─── 按 geom 类型分组处理 layers ────────────────────
  const echartsSeries = [];
  let colorIdx = 0;

  for (const layer of layers) {
    const { geom, aes = {}, params = {} } = layer;

    // 根据 geom 决定 ECharts type
    let ecType = null;
    let ecExtra = {};

    switch (geom) {
      case 'geom_bar':
        ecType = 'bar';
        if (params.position === 'stack') ecExtra.stack = 'total';
        if (params.position === 'dodge') ecExtra.barGap = '20%';
        break;
      case 'geom_point':
        ecType = 'scatter';
        ecExtra.symbolSize = params.size || 8;
        break;
      case 'geom_line':
        ecType = 'line';
        ecExtra.smooth = params.smooth === true;
        ecExtra.showSymbol = true;
        ecExtra.symbolSize = params.size ? params.size * 4 : 4;
        break;
      case 'geom_smooth':
        ecType = 'line';
        ecExtra.smooth = true;
        ecExtra.showSymbol = false;
        break;
      case 'geom_area':
        ecType = 'line';
        ecExtra.smooth = params.smooth !== false;
        ecExtra.showSymbol = false;
        ecExtra.areaStyle = { opacity: params.opacity || 0.3 };
        if (params.position === 'stack') ecExtra.stack = 'total';
        break;
      case 'geom_label':
        ecType = 'scatter';
        ecExtra.symbolSize = 0;
        // 同坐标标签堆叠：自动错位
        {
          const labelX = aes.x;
          const labelY = aes.y;
          let pos = params.position || (isFlip ? 'right' : 'top');
          if (typeof labelX === 'number' && typeof labelY === 'number') {
            const key = `${labelX},${labelY}`;
            if (!globalThis.__labelStack) globalThis.__labelStack = {};
            const stackIdx = (globalThis.__labelStack[key] = (globalThis.__labelStack[key] || 0) + 1);
            if (stackIdx === 2) pos = 'right';
            else if (stackIdx > 2) pos = 'bottom';
          }
          ecExtra.label = {
          show: true,
          formatter: aes.label || '{b}',
          position: pos,
          fontSize: params.fontSize || 11,
          fontWeight: params.fontWeight || 600,
          color: params.color || theme.title,
          backgroundColor: params.bgColor || 'rgba(255,255,255,0.9)',
          padding: params.padding || [5, 8],
          borderRadius: 4,
          borderColor: params.borderColor,
          borderWidth: params.borderWidth || 0
        };
        }
        break;
      case 'geom_hline':
        // 水平参考线 → 放到后续 markLine 处理
        echartsSeries.push({ _markLine: { yAxis: aes.yValue, label: aes.label, color: params.color || '#ada599', dash: params.dash } });
        continue;
      case 'geom_vline':
        echartsSeries.push({ _markLine: { xAxis: aes.xValue, label: aes.label, color: params.color || '#ada599', dash: params.dash } });
        continue;
      case 'geom_rect':
        echartsSeries.push({
          _markArea: {
            xStart: aes.xStart,
            xEnd: aes.xEnd,
            yStart: aes.yStart,
            yEnd: aes.yEnd,
            label: aes.label,
            color: params.color || 'rgba(194,109,58,0.1)',
            borderColor: params.borderColor || null,
            dash: params.dash
          }
        });
        continue;
      case 'geom_ribbon':
        ecType = 'line';
        ecExtra.smooth = true;
        ecExtra.showSymbol = false;
        ecExtra.areaStyle = { opacity: params.opacity || 0.15 };
        break;
      case 'geom_pie':
        // 饼图不走通用数据提取，直接构建 series 并跳过
        {
          // mapping.x 为 null 时，用 rows 中第一个字符串字段作为 name
          const nameField = mapping.x || fields.find(f => rows.length > 0 && typeof rows[0][f] === 'string');
          const pieData = rows.map(r => ({ name: String(r[nameField] || r.name || r.label || r.category || '未知'), value: r[yField] || r.value || 0 }));
          const pieColor = params.color || (colorPalette ? colorPalette[colorIdx % colorPalette.length] : theme.colors[colorIdx % theme.colors.length]);
          echartsSeries.push({
            type: 'pie',
            name: aes.label || '饼图',
            radius: params.radius || ['40%', '65%'],
            center: params.center || ['50%', '55%'],
            avoidLabelOverlap: true,
            data: pieData,
            itemStyle: { color: pieColor, borderRadius: params.borderRadius || 4, borderColor: '#fff', borderWidth: 2 },
            label: { show: true, formatter: params.labelFormat || '{d}%', fontSize: 12, fontWeight: 600 },
            labelLine: { show: true }
          });
          if (layer.readerWeight) echartsSeries[echartsSeries.length - 1]._readerWeight = layer.readerWeight;
          colorIdx++;
        }
        continue;
      default:
        throw new Error(`不支持的 geom: ${geom}`);
    }

    // ─── 从 rows 中提取该 layer 的数据 ─────────────────
    let seriesData = [];
    // aes.x/y 可能是标注位置（字面量数值），不是列名
    // 只有字符串才当作列引用，否则回退到 mapping 的主映射
    const yCol = (typeof aes.y === 'string') ? aes.y : yField;
    const xCol = (typeof aes.x === 'string') ? aes.x : xField;

    // layer 级别的 data 覆盖（用于高亮点等独立数据源）
    const layerRows = layer.data?.rows || null;
    const layerData = layerRows ? layerRows : rows;

    if (geom === 'geom_label') {
      // 标注：使用 aes 中指定的 x/y 位置
      const labelX = aes.x;
      const labelY = aes.y;
      // 如果 x/y 是显式数值，直接用
      if (typeof labelX === 'number' && typeof labelY === 'number') {
        seriesData = isFlip ? [[labelY, labelX]] : [[labelX, labelY]];
      } else if (typeof labelX === 'number' && typeof labelY === 'string') {
        // coord_flip 场景：x 是数值（value 轴），y 是类别字符串
        const catIdx = xLabels.indexOf(labelY);
        if (catIdx >= 0) {
          // flip 后：xAxis=value, yAxis=category(index)，所以数据应为 [value, catIdx]
          seriesData = isFlip ? [[labelX, catIdx]] : [[labelX, catIdx]];
        }
      } else {
        // 否则尝试从 rows 匹配
        const rowIdx = rows.findIndex(r => String(r[xField]) === String(labelX) || r[xField] === labelX);
        if (rowIdx >= 0 && labelY !== undefined) {
          seriesData = [[labelX !== undefined ? labelX : rows[rowIdx][xField], labelY]];
        }
      }
    } else if (geom === 'geom_point' && fillField) {
      // 散点按 fill 分组：需要按 fillField 拆分
      const uniqueFillValues = [...new Set(layerData.map(r => r[fillField]).filter(v => v !== null && v !== undefined))];
      for (const fillVal of uniqueFillValues) {
        const filteredRows = layerData.filter(r => r[fillField] === fillVal);
        // 这里假设 fillField 是分组字段
        const pts = filteredRows.map(r => {
          const xv = xCol ? (typeof r[xCol] === 'number' ? r[xCol] : xLabels.indexOf(r[xCol])) : 0;
          const yv = yCol ? r[yCol] : 0;
          return [xv, yv];
        });
        const color = colorPalette ? colorPalette[colorIdx % colorPalette.length] : theme.colors[colorIdx % theme.colors.length];
        echartsSeries.push({
          type: ecType,
          name: String(fillVal),
          data: pts,
          itemStyle: { color },
          ...ecExtra
        });
        colorIdx++;
      }
      continue; // 已处理，跳过下面的通用逻辑
    } else if (geom === 'geom_point') {
      // 散点图需要 [x, y] 坐标对
      seriesData = layerData.map(r => {
        const xv = xCol ? r[xCol] : null;
        const yv = yCol ? r[yCol] : 0;
        return [xv !== null ? xv : 0, yv];
      });
    } else {
      // 通用数据提取（柱状/折线/面积用简单数值）
      seriesData = layerData.map(r => {
        const xv = xCol ? r[xCol] : null;
        let yv = yCol ? r[yCol] : 0;
        // flip 模式鲁棒性：如果 yCol 是字符串而 xCol 是数值，说明 mapping 反了
        if (isFlip && typeof yv === 'string' && typeof xv === 'number') return xv;
        return yv;
      });
    }

    // 颜色
    const color = params.color || (colorPalette ? colorPalette[colorIdx % colorPalette.length] : theme.colors[colorIdx % theme.colors.length]);

    // 光晕效果：color="none" + border → 空心圈
    const itemStyle = {};
    if (params.color === 'none' && params.border) {
      itemStyle.color = 'transparent';
      itemStyle.borderColor = params.border;
      itemStyle.borderWidth = params.borderWidth || 2;
    } else {
      itemStyle.color = color;
    }

    const seriesObj = {
      type: ecType,
      name: layer.label || aes.label || yCol || layer.geom.replace('geom_', ''),
      data: seriesData,
      itemStyle,
      lineStyle: { color, width: params.size || 2 },
      ...ecExtra
    };

    // 传递 readerWeight 给自检用
    if (layer.readerWeight) seriesObj._readerWeight = layer.readerWeight;

    // 双轴处理：根据 scales 中 secondary 的位置判断
    // 第二个 y-scale 如果有 secondary: true，则第二个使用 y 映射的 layer 用右轴
    const secondaryScale = scales.find(s => s.secondary && s.aesthetic === 'y');
    if (secondaryScale && aes.y && aes.y !== yField) {
      // 如果此 layer 的 y 映射不是主映射字段，说明是次要轴
      seriesObj.yAxisIndex = 1;
    } else if (secondaryScale && colorIdx === 1) {
      // 简化：第二个数据系列使用右轴
      seriesObj.yAxisIndex = 1;
    }

    echartsSeries.push(seriesObj);
    colorIdx++;
  }

  // ─── X 轴配置 ──────────────────────────────────────
  if (isFlip) {
    // coord_flip: 水平条形
    option.xAxis = {
      type: 'value',
      scale: xAxisType === 'value',
      splitLine: { show: true, lineStyle: { color: theme.splitLine } }
    };
    option.yAxis = {
      type: 'category',
      data: xLabels,
      axisLine: { lineStyle: { color: theme.axisLine } },
      axisLabel: { color: theme.axisLabel, fontSize: theme.axisLabelSize || 10 },
      inverse: true
    };
    option.grid.left = 80;
  } else if (isPolar) {
    // 极坐标：雷达图用 radar 组件，饼图保持 pie 类型不转换
    // 从 scales 读取 max，若未声明则自动计算
    const scaleMax = scales.find(s => s.aesthetic === 'y' && s.max)?.max;
    const autoMax = Math.max(...rows.map(r => {
      const rc = yField || (layers[0]?.aes?.y);
      return r[rc] || 0;
    }), 1);
    const radarMax = scaleMax || Math.ceil(autoMax * 1.1);

    option.radar = {
      indicator: xLabels.map(l => ({ name: l, max: radarMax }))
    };
    // 仅将 line/smooth 类型转为 radar，pie 类型保持不变
    for (const s of echartsSeries) {
      if (s.type === 'line' && !s._markLine && !s._markArea) {
        s.type = 'radar';
        s.data = [{ value: s.data, name: s.name }];
      }
    }
  } else {
    // 默认直角坐标
    const xIsValue = xAxisType === 'value' || xLabels.every(v => typeof v === 'number');
    option.xAxis = {
      type: xIsValue ? 'value' : 'category',
      axisLine: { lineStyle: { color: theme.axisLine } },
      axisLabel: { color: theme.axisLabel, fontSize: theme.axisLabelSize || 10, rotate: !xIsValue && xLabels.length > 12 ? 30 : 0 },
      scale: xIsValue
    };
    if (!xIsValue) option.xAxis.data = xLabels;
    if (xAxisLog) option.xAxis.logBase = 10;
    if (xAxisType === 'log') {
      option.xAxis.logBase = 10;
    }

    // Y 轴
    if (yAxisConfigs.length === 1) {
      option.yAxis = {
        ...yAxisConfigs[0],
        axisLabel: { color: theme.axisLabel, fontSize: theme.axisLabelSize || 10, formatter: fmtNum },
        splitLine: { show: true, lineStyle: { color: theme.splitLine } }
      };
    } else {
      // 双轴
      option.yAxis = yAxisConfigs.map((cfg, i) => ({
        ...cfg,
        axisLabel: { color: theme.axisLabel, fontSize: theme.axisLabelSize || 10, formatter: i === 1 ? v => v.toFixed(1) + '%' : fmtNum },
        splitLine: { show: i === 0 }
      }));
    }
  }

  // 过滤掉 _markLine/_markArea 占位符，把它们附加到第一个真实 series 上
  const realSeries = echartsSeries.filter(s => !s._markLine && !s._markArea);
  const markLines = echartsSeries.filter(s => s._markLine).map(s => s._markLine);
  const markAreas = echartsSeries.filter(s => s._markArea).map(s => s._markArea);

  if (markLines.length > 0 && realSeries.length > 0) {
    realSeries[0].markLine = {
      data: markLines.map(ml => {
        const entry = {};
        if (ml.yAxis !== undefined) { entry.yAxis = ml.yAxis; }
        if (ml.xAxis !== undefined) { entry.xAxis = ml.xAxis; }
        entry.name = ml.label || '';
        return {
          ...entry,
          lineStyle: { color: ml.color || '#ada599', type: ml.dash ? 'dashed' : 'solid' }
        };
      }),
      label: { show: true, fontSize: 10, color: theme.axisLabel }
    };
  }

  if (markAreas.length > 0 && realSeries.length > 0) {
    realSeries[0].markArea = {
      silent: true,
      itemStyle: { borderWidth: 0 },
      label: { show: false },
      data: markAreas.flatMap(ma => {
        // coord_flip：x 轴是数值轴，y 轴是分类索引
        const areaData = [
          {
            xAxis: ma.xStart,
            yAxis: isFlip ? (ma.yStart < 0 ? xLabels[0] : xLabels[Math.max(0, Math.round(ma.yStart))]) : ma.xStart,
            name: ma.label,
            itemStyle: {
              color: ma.color || 'rgba(194,109,58,0.1)',
              borderColor: ma.borderColor || 'transparent',
              borderWidth: ma.borderColor ? 1 : 0,
              borderType: ma.dash ? 'dashed' : 'solid',
              opacity: ma.color ? 1 : 0.1
            }
          },
          {
            xAxis: ma.xEnd,
            yAxis: isFlip ? (ma.yEnd < 0 ? xLabels[0] : xLabels[Math.min(xLabels.length - 1, Math.round(ma.yEnd))]) : ma.xEnd
          }
        ];
        return areaData;
      })
    };
  }

  option.series = realSeries;

  // ─── 前注意觉 + 格式塔 后处理 ────────────────────────
  deNoise(option);
  autoHighlight(option, spec);
  resolveRampColor(option);

  // ─── geom_rect 背景区标注（图例+标签）──────────────
  if (markAreas.length > 0) {
    // 先提取 heroLayers（后续自检也需要）
    const heroLayersForRect = echartsSeries.filter(s => s._readerWeight === 'hero' && !s._markLine && !s._markArea);
    const heroColors = heroLayersForRect.map(s => s.itemStyle?.color).filter(Boolean);
    const primaryColor = heroColors[0] || '#c26d3a';

    const rectLabels = markAreas.filter(ma => ma.label);
    if (rectLabels.length > 0) {
      const firstLabel = rectLabels[0];
      // 横向条形图 flip 模式：scatter data 是 [xValue, categoryIndex]
      // 标注放在背景区右上方：x 靠近 xEnd，y 为覆盖区域的类别中心
      let labelData;
      if (isFlip) {
        const midCatIdx = Math.round((firstLabel.yStart + firstLabel.yEnd) / 2);
        labelData = [[firstLabel.xEnd * 0.95, midCatIdx]];
      } else {
        labelData = [[firstLabel.xStart, firstLabel.yEnd]];
      }
      const labelSeries = {
        type: 'scatter',
        name: '_area_label',
        data: labelData,
        symbolSize: 0,
        silent: true,
        label: {
          show: true,
          formatter: firstLabel.label,
          position: isFlip ? 'right' : 'top',
          fontSize: 11,
          fontWeight: 700,
          color: primaryColor,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: [4, 10],
          borderRadius: 4
        },
        _readerWeight: 'hero'
      };
      realSeries.push(labelSeries);
    }

    // 图例：用 hero 真实颜色 + 有意义的名称
    const uniqueLegendColors = [...new Set(heroColors)];
    if (uniqueLegendColors.length > 0) {
      // 从 hero 层提取有意义的名称
      const heroNames = heroLayersForRect
        .filter(s => s.name && !s.name.startsWith('geom_') && s.name !== '_area_label')
        .map(s => s.name);
      // 如果有 geom_rect 标注，也加入图例
      const rectNames = rectLabels.map(rl => rl.label).filter(Boolean);
      // 合并并去重：hero 名称 + rect 标注
      const seen = new Set();
      const legendNames = [...heroNames, ...rectNames].filter(n => {
        if (seen.has(n) || !n || n.length === 0) return false;
        seen.add(n);
        return true;
      });
      // 如果去重后为空，至少保留 rect 标注
      const finalNames = legendNames.length > 0 ? legendNames : rectNames;
      option.legend = {
        show: true,
        data: finalNames,
        orient: 'horizontal',
        left: 'center',
        bottom: 5,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { fontSize: 10, color: '#6b7280', fontWeight: 600 },
        icon: 'roundRect',
        selectedMode: false
      };
      // 确保 legend 项颜色与 hero 一致
      option.color = [uniqueLegendColors[0], ...uniqueLegendColors.slice(1), STONE];
    }
  }

  // ─── facet 处理（多子图）─────────────────────────────
  if (facet && facet.type && realSeries.length > 0) {
    // 简化实现：单 grid 内按 facet 分组，标注 facet 名
    // 完整实现需要多 grid 布局，此处做最小可用
    const facetCol = facet.by;
    if (facetCol && rows[0] && rows[0][facetCol] !== undefined) {
      const facetValues = [...new Set(rows.map(r => r[facetCol]))];
      // 将数据按 facet 分组，每组一个 series
      // 这里保持简单，仅标注
      option.title.subtext = (subtitle || '') + ` | 分面: ${facetValues.join(', ')}`;
    }
  }

  // ─── 读者视角自检（渲染管线内置）─────────────────────
  // 规则来源：checklist.md 读者体验验收（#16-20）
  {
    const heroLayers = echartsSeries.filter(s => s._readerWeight === 'hero' && !s._markLine && !s._markArea);
    const bgLayers = echartsSeries.filter(s => s._readerWeight === 'light' && !s._markLine && !s._markArea);
    const warnings = [];

    // #17 hero 可见性：必须有 label，不依赖 hover
    // 可以是自身的 label，也可以是独立的标注层（如 geom_label）
    const hasVisibleLabel = echartsSeries.some(s => s.label && s.label.show);
    heroLayers.forEach(s => {
      if (!s.label || !s.label.show) {
        // 如果有独立的标注层，也算 hero 有标注
        if (!hasVisibleLabel) {
          warnings.push('WARN [读者视角] hero 元素 "' + s.name + '" 缺少 label，读者不 hover 看不见');
        }
      }
    });

    // #18 视觉重量差：hero symbolSize ≥ light × 3
    const heroSize = heroLayers.find(s => s.symbolSize);
    const bgSize = bgLayers.find(s => s.symbolSize);
    if (heroSize && bgSize && typeof heroSize.symbolSize === 'number' && typeof bgSize.symbolSize === 'number') {
      if (heroSize.symbolSize < bgSize.symbolSize * 3) {
        warnings.push('WARN [读者视角] hero symbolSize(' + heroSize.symbolSize + ') < background × 3(' + bgSize.symbolSize * 3 + ')，视觉重量不足');
      }
    }

    // #20 上下文完整：有 spatial narrative 必须有参考线/背景区
    const hasRectLayers = echartsSeries.some(s => s._markArea);
    const hasLineLayers = echartsSeries.some(s => s._markLine);
    // 只检查真正的散点（symbolSize > 0），排除 geom_label（symbolSize=0）
    const hasScatter = echartsSeries.some(s => s.type === 'scatter' && (s.symbolSize || 0) > 0);
    if (hasScatter && !hasRectLayers && !hasLineLayers) {
      warnings.push('WARN [读者视角] 散点图缺少参考线或背景区，四象限叙事缺少空间锚点');
    }

    if (warnings.length > 0) {
      console.warn(warnings.join('\n'));
    }
  }

  return { option, canvas };
}

/**
 * 将 viz-design spec JSON 转换为 ECharts option
 * 每种 chartType 有独立的渲染分支，不做隐式猜测
 */
function renderChart(spec, globalStyle) {
  // v2 分支：ggplot2 分层渲染
  if (spec.version === 'viz-design-spec-v2') {
    // 合并 globalStyle 到 spec（如果 v2 没有 theme，用 globalStyle 兜底）
    if (globalStyle && !spec.theme) spec.theme = globalStyle;
    return renderV2Chart(spec);
  }

  // v1 分支：声明式 chartType
  const theme = globalStyle ? { ...THEMES.default, ...globalStyle, colors: globalStyle.palette || THEMES.default.colors } : THEMES.default;
  const { chartType, data, visualEncoding: ve = {}, annotations = [], title, subtitle, canvas = { width: 800, height: 550 } } = spec;
  const fields = data.fields || [];
  const series = data.series || [];

  // 处理色系：highlight 优先使用指定色，其余按顺序取
  const colors = theme.colors.slice();
  if (ve.highlight && Array.isArray(ve.highlight)) {
    ve.highlight.forEach(h => {
      const idx = series.findIndex(s => s.name === h.series);
      if (idx >= 0) colors[idx] = h.color;
    });
  }
  // 兼容 dual_axis 的 rightAxis 格式
  if (ve.rightAxis && Array.isArray(ve.rightAxis)) {
    ve.rightAxis.forEach((ra, i) => {
      if (ra.color && i + 1 < colors.length) {
        colors[i + 1] = ra.color; // 跳过标签系列
      }
    });
  }

  // 提取所有系列数据
  const extracted = series.map(s => ({ ...s, ex: extractSeries(s) }));

  // ─── 通用 option 骨架 ───────────────────────────────
  const option = {
    backgroundColor: theme.bg,
    title: {
      text: title || '', subtext: subtitle || '', left: 'center', top: 10,
      textStyle: { fontSize: 16, fontWeight: 600, color: theme.title },
      subtextStyle: { fontSize: 11, color: theme.subtitle }
    },
    tooltip: {
      trigger: chartType === 'scatter_chart' ? 'item' : 'axis',
      backgroundColor: theme.tooltipBg, borderColor: theme.borderColor,
      textStyle: { color: '#374151' }
    },
    grid: { top: 70, right: 30, bottom: 50, left: 50 }
  };

  // ─── 散点图独立分支 ────────────────────────────────
  if (chartType === 'scatter_chart') {
    const useLog = ve.xAxisLog === true;
    const xLabel = ve.xLabel || fields[1] || 'X';
    const yLabel = ve.yLabel || fields[2] || 'Y';

    option.xAxis = {
      type: 'value', name: xLabel, scale: true,
      axisLabel: { fontSize: 10, color: theme.axisLabel, formatter: fmtNum },
      splitLine: { show: true, lineStyle: { color: theme.splitLine } }
    };
    if (useLog) option.xAxis.logBase = 10;

    option.yAxis = {
      type: 'value', name: yLabel, scale: true,
      axisLabel: { fontSize: 10, color: theme.axisLabel, formatter: fmtNum },
      splitLine: { show: true, lineStyle: { color: theme.splitLine } }
    };

    option.series = series.map((s, si) => {
      const pts = s.points ? s.points.map(p => [p.x, p.y]) : (s.values || []).map(v => Array.isArray(v) ? v : [v, v]);
      const isHighlight = s.highlight === true;

      return {
        type: 'scatter', name: s.name, data: pts,
        itemStyle: { color: isHighlight ? colors[0] : '#b0b0b0' },
        symbolSize: isHighlight ? 16 : 8,
        label: {
          show: isHighlight, // 只有高亮点才显示标签，避免重叠
          formatter: p => {
            if (!s.points || !s.points[p.dataIndex]) return '';
            const ann = annotations?.find(a => a.target === s.name);
            return ann ? ann.text : (s.points[p.dataIndex].label || '');
          },
          position: 'top', fontSize: 11, fontWeight: 600, color: colors[0],
          backgroundColor: 'rgba(255,255,255,0.85)',
          padding: [3, 6], borderRadius: 3
        }
      };
    });

    return { option, canvas };
  }

  // ─── 雷达图独立分支 ────────────────────────────────
  if (chartType === 'radar_chart') {
    const allNums = extracted.flatMap(s => s.ex.numbers || []);
    const maxVal = Math.max(...allNums, 1) * 1.1;
    option.radar = { indicator: fields.map(f => ({ name: f, max: maxVal })) };
    option.series = extracted.map((s, i) => ({
      type: 'radar', name: s.name,
      data: [{ value: s.ex.numbers, name: s.name }],
      lineStyle: { color: s.highlight ? colors[0] : '#9ca3af', width: s.highlight ? 2 : 1 },
      areaStyle: { color: s.highlight ? 'rgba(194,109,58,0.2)' : 'rgba(156,163,175,0.1)' },
      itemStyle: { color: s.highlight ? colors[0] : '#9ca3af' }
    }));
    return { option, canvas };
  }

  // ─── 双轴图独立分支 ────────────────────────────────
  if (chartType === 'dual_axis') {
    // 双轴图：左轴 category bar，右轴 value line
    // 第一个 series 提供 X 轴标签（字符串），其余为数据
    let xAxisData = [];
    const dataSeries = [];

    if (extracted.length >= 2 && extracted[0].ex.labels) {
      // 第一个系列提供 X 轴标签
      xAxisData = extracted[0].ex.labels;
      dataSeries.push(...extracted.slice(1));
    } else {
      // 没有字符串标签，生成数字索引
      const maxLen = Math.max(...extracted.map(s => (s.ex.numbers || []).length));
      xAxisData = Array.from({ length: maxLen }, (_, i) => String(i + 1));
      dataSeries.push(...extracted);
    }

    option.xAxis = {
      type: 'category', data: xAxisData,
      axisLine: { lineStyle: { color: theme.axisLine } },
      axisLabel: { color: theme.axisLabel, fontSize: 10, rotate: xAxisData.length > 12 ? 30 : 0 }
    };

    // 左 Y 轴（柱状图）
    option.yAxis = [
      {
        type: 'value', name: fields[1] || '',
        splitLine: { show: true, lineStyle: { color: theme.splitLine } },
        axisLabel: { color: theme.axisLabel, fontSize: 10, formatter: fmtNum }
      },
      {
        type: 'value', name: fields[2] || '',
        splitLine: { show: false },
        axisLabel: { color: theme.axisLabel, fontSize: 10, formatter: v => v.toFixed(1) + '%' }
      }
    ];

    option.series = dataSeries.map((s, i) => {
      const isBar = i === 0; // 第一个数据系列用柱状图
      const color = colors[i % colors.length];
      return {
        type: isBar ? 'bar' : 'line',
        name: s.name,
        data: s.ex.numbers || [],
        itemStyle: { color },
        yAxisIndex: isBar ? 0 : 1,
        smooth: !isBar,
        lineStyle: { width: !isBar ? (s.highlight ? 3 : 2) : undefined },
        symbolSize: !isBar ? (s.highlight ? 8 : 4) : undefined,
        label: { show: xAxisData.length <= 15, position: isBar ? 'top' : 'top', fontSize: 10, color: theme.axisLabel, formatter: p => fmtNum(p.value) }
      };
    });

    return { option, canvas };
  }

  // ─── 笛卡尔坐标系通用分支 ──────────────────────────
  // 包含：bar_chart, line_chart, multi_line, area_chart,
  //        stacked_area, grouped_bar, stacked_bar

  let xAxisData = [];
  const renderSeries = [];

  // 判断第一个系列是否提供 X 轴标签
  const firstHasLabels = extracted.length > 0 && extracted[0].ex.labels;

  if (firstHasLabels && ['line_chart', 'multi_line', 'area_chart', 'stacked_area'].includes(chartType)) {
    // 时序数据：第一个系列提供时间标签，不参与渲染
    xAxisData = extracted[0].ex.labels;
    extracted.slice(1).forEach(s => {
      renderSeries.push({ name: s.name, data: s.ex.numbers || [], highlight: s.highlight });
    });
  } else if (chartType === 'bar_chart') {
    // 水平条形图：系列名作为 Y 轴标签
    if (extracted[0].ex.labels && extracted[0].ex.numbers) {
      // 对象数组格式：{labels, numbers}
      xAxisData = extracted[0].ex.labels;
      extracted.forEach(s => {
        renderSeries.push({ name: s.name, data: s.ex.numbers || [], highlight: s.highlight });
      });
    } else {
      // 每个 series 是一个独立条形
      xAxisData = extracted.map(s => s.name);
      renderSeries.push({
        name: fields[1] || '值',
        data: extracted.map(s => {
          const nums = s.ex.numbers;
          return (nums && nums.length > 0) ? nums[0] : 0;
        }),
        highlightMap: Object.fromEntries(extracted.map(s => [s.name, s.highlight]))
      });
    }
  } else if (['grouped_bar', 'stacked_bar'].includes(chartType)) {
    if (firstHasLabels) {
      xAxisData = extracted[0].ex.labels;
      extracted.slice(1).forEach(s => {
        renderSeries.push({ name: s.name, data: s.ex.numbers || [], highlight: s.highlight });
      });
    } else {
      const maxLen = Math.max(...extracted.map(s => (s.ex.numbers || []).length));
      xAxisData = Array.from({ length: maxLen }, (_, i) => String(i + 1));
      extracted.forEach(s => {
        renderSeries.push({ name: s.name, data: s.ex.numbers || [], highlight: s.highlight });
      });
    }
  } else {
    // 默认：生成数字索引
    const maxLen = Math.max(...extracted.map(s => (s.ex.numbers || []).length));
    xAxisData = Array.from({ length: maxLen }, (_, i) => String(i + 1));
    extracted.forEach(s => {
      renderSeries.push({ name: s.name, data: s.ex.numbers || [], highlight: s.highlight });
    });
  }

  // 判断是否水平条形
  const isHoriz = chartType === 'bar_chart' && xAxisData.length <= 30;
  // 判断是否线图
  const isLine = ['line_chart', 'multi_line'].includes(chartType);
  // 判断是否面积图
  const isArea = ['area_chart', 'stacked_area'].includes(chartType);
  // 判断是否堆叠
  const needsStack = ['stacked_area', 'stacked_bar', 'grouped_bar'].includes(chartType);

  // X/Y 轴配置
  if (isHoriz) {
    option.xAxis = { type: 'value', splitLine: { show: true, lineStyle: { color: theme.splitLine } } };
    option.yAxis = {
      type: 'category', data: xAxisData,
      axisLine: { lineStyle: { color: theme.axisLine } },
      axisLabel: { color: theme.axisLabel, fontSize: 10 },
      inverse: true
    };
    option.grid.left = 80;
  } else {
    option.xAxis = {
      type: 'category', data: xAxisData,
      axisLine: { lineStyle: { color: theme.axisLine } },
      axisLabel: { color: theme.axisLabel, fontSize: 10, rotate: xAxisData.length > 12 ? 30 : 0, interval: xAxisData.length > 20 ? 'auto' : 0 }
    };
    option.yAxis = {
      type: 'value', splitLine: { show: true, lineStyle: { color: theme.splitLine } },
      axisLabel: { color: theme.axisLabel, fontSize: 10, formatter: fmtNum }
    };
  }

  // 生成 series
  option.series = renderSeries.map((s, idx) => {
    const color = colors[idx % colors.length];
    const base = { name: s.name, itemStyle: { color } };

    if (isLine || isArea) {
      return {
        ...base,
        type: 'line',
        data: s.data,
        smooth: true,
        lineStyle: { width: s.highlight ? 3 : 1.5, color },
        showSymbol: true,
        symbolSize: s.highlight ? 8 : 4,
        areaStyle: isArea ? { color, opacity: 0.3 } : undefined,
        stack: chartType === 'stacked_area' ? 'total' : undefined
      };
    }

    return {
      ...base,
      type: 'bar',
      data: s.data,
      stack: needsStack ? 'total' : undefined,
      label: {
        show: xAxisData.length <= 15,
        position: isHoriz ? 'right' : 'top',
        fontSize: 10,
        color: theme.axisLabel,
        formatter: p => fmtNum(p.value)
      }
    };
  });

  // v1 后处理：去噪 + 高亮 + 色阶
  deNoise(option);
  if (renderSeries.length >= 5) autoHighlight(option, { layers: [] });
  resolveRampColor(option);

  return { option, canvas };
}

function generateHTML(option, title, canvas) {
  const json = JSON.stringify(option);
  return `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#f5f5f5;font-family:system-ui,-apple-system,sans-serif;display:flex;justify-content:center;padding:20px}#chart{width:${canvas.width}px;max-width:100%;height:${canvas.height}px;background:${option.backgroundColor};border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1)}</style>
</head><body><div id="chart"></div>
<script src="${ECHARTS_CDN}"><\/script><script>var c=echarts.init(document.getElementById("chart"));c.setOption(${json});window.addEventListener("resize",()=>c.resize());<\/script></body></html>`;
}

// ─── 入口 ──────────────────────────────────────────────

function extractJSON(content) {
  const matches = [...content.matchAll(/```json\n([\s\S]*?)\n```/g)];
  if (matches.length === 0) return null;
  return JSON.parse(matches[matches.length - 1][1]);
}

function main() {
  const args = process.argv.slice(2);

  // 模式 1：单文件渲染
  if (args[0] && !args[0].startsWith('--')) {
    const specPath = args[0];
    const outputPath = args[1] || specPath.replace(/spec\.md$/, 'chart.html');

    if (!fs.existsSync(specPath)) { console.error('文件不存在: ' + specPath); process.exit(1); }

    const content = fs.readFileSync(specPath, 'utf-8');
    const json = extractJSON(content);
    if (!json) { console.error('未找到 JSON'); process.exit(1); }

    const errs = validateSpec(json);
    if (errs.length > 0) {
      console.error('Schema 校验失败：');
      errs.forEach(e => console.error('  - ' + e));
      process.exit(1);
    }

    const charts = json.charts || [json];
    const chart = charts[0];

    const { option, canvas } = renderChart(chart, json.globalStyle);
    const html = generateHTML(option, chart.title, canvas);
    fs.writeFileSync(outputPath, html, 'utf-8');
    const chartLabel = chart.chartType || 'v2:' + (chart.layers?.map(l => l.geom).join('+') || 'unknown');
    console.log('OK: ' + outputPath + ' (' + chartLabel + ')');
    return;
  }

  // 模式 2：批量渲染
  if (args[0] === '--batch') {
    const baseDir = args[1] || '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503';

    const dirs = fs.readdirSync(baseDir).filter(d => {
      const stat = fs.statSync(path.join(baseDir, d));
      return stat.isDirectory() && /^\d+-/.test(d);
    }).sort((a, b) => {
      const na = parseInt(a), nb = parseInt(b);
      return isNaN(na) ? 1 : isNaN(nb) ? -1 : na - nb;
    });

    console.log('找到 ' + dirs.length + ' 个数据集目录');

    let rendered = 0, skipped = 0, errors = 0;
    const errorList = [];

    for (const dir of dirs) {
      const dirPath = path.join(baseDir, dir);
      const specPath = path.join(dirPath, 'spec.md');
      const outputPath = path.join(dirPath, 'chart.html');

      if (!fs.existsSync(specPath)) { skipped++; continue; }

      try {
        const content = fs.readFileSync(specPath, 'utf-8');
        const json = extractJSON(content);
        if (!json) { skipped++; continue; }

        const errs = validateSpec(json);
        if (errs.length > 0) {
          console.log('SKIP ' + dir + ': ' + errs.join('; '));
          errors++;
          errorList.push({ dir, errors: errs });
          continue;
        }

        const charts = json.charts || [json];
        const chart = charts[0];
        // v2 用 version 判断，v1 需要 chartType
        if (!chart?.chartType && chart.version !== 'viz-design-spec-v2') { skipped++; continue; }

        const { option, canvas } = renderChart(chart, json.globalStyle);
        const html = generateHTML(option, chart.title, canvas);
        fs.writeFileSync(outputPath, html, 'utf-8');
        rendered++;
        console.log('OK ' + dir + ': ' + chart.chartType);
      } catch (e) {
        console.log('ERROR ' + dir + ': ' + e.message);
        errors++;
        errorList.push({ dir, error: e.message });
      }
    }

    console.log('\n=== 摘要 ===');
    console.log('渲染成功: ' + rendered);
    console.log('跳过: ' + skipped);
    console.log('错误: ' + errors);

    if (errorList.length > 0) {
      console.log('\n错误详情：');
      errorList.forEach(e => {
        console.log('  ' + e.dir + ': ' + (e.error || e.errors?.join('; ')));
      });
    }
    return;
  }

  // 默认：从 stdin 读取 JSON
  if (args.includes('--stdin')) {
    let data = '';
    process.stdin.on('data', chunk => data += chunk);
    process.stdin.on('end', () => {
      try {
        const json = JSON.parse(data);
        const errs = validateSpec(json);
        if (errs.length > 0) {
          console.error('Schema 校验失败：' + errs.join('; '));
          process.exit(1);
        }
        const charts = json.charts || [json];
        const chart = charts[0];
        const { option, canvas } = renderChart(chart, json.globalStyle);
        const html = generateHTML(option, chart.title, canvas);
        const outPath = args[args.indexOf('--stdin') + 1] || 'chart.html';
        fs.writeFileSync(outPath, html, 'utf-8');
        console.log('OK: ' + outPath);
      } catch (e) {
        console.error('解析失败: ' + e.message);
        process.exit(1);
      }
    });
    return;
  }

  console.log('用法：');
  console.log('  node render-viz-design-spec.js <spec.md> [output.html]  # 单文件');
  console.log('  node render-viz-design-spec.js --batch [目录]            # 批量渲染');
  console.log('  echo "<JSON>" | node render-viz-design-spec.js --stdin    # 从 stdin');
}

main();
