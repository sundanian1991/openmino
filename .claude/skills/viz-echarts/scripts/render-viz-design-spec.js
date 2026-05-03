#!/usr/bin/env node
// viz-design-spec-v1 JSON → ECharts HTML 正式渲染管线
// 放置位置：.claude/skills/viz-echarts/scripts/render-viz-design-spec.js
// 用法：node render-viz-design-spec.js [spec.json路径] 或 node render-viz-design-spec.js --batch [目录]
const fs = require('fs');
const path = require('path');

const ECHARTS_CDN = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';

// ─── 配色 ──────────────────────────────────────────────
const THEMES = {
  default: {
    bg: '#ffffff', title: '#374151', subtitle: '#9ca3af',
    axisLine: '#e5e7eb', axisLabel: '#6b7280', splitLine: '#f3f4f6',
    tooltipBg: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb',
    colors: ['#c26d3a', '#6b7280', '#8b95a5', '#a8b5c1', '#c4d0db', '#dce3e9']
  }
};

// ─── JSON Schema 校验 ──────────────────────────────────
const REQUIRED_FIELDS = ['version', 'chartType', 'title', 'data'];
const VALID_CHART_TYPES = [
  'bar_chart', 'line_chart', 'multi_line', 'area_chart',
  'stacked_area', 'dual_axis', 'grouped_bar', 'stacked_bar',
  'scatter_chart', 'radar_chart'
];

function validateSpec(json) {
  const errors = [];
  if (!json || typeof json !== 'object') return ['JSON 解析失败'];

  for (const f of REQUIRED_FIELDS) {
    if (!json[f]) errors.push(`缺少必填字段: ${f}`);
  }

  if (json.version && json.version !== 'viz-design-spec-v1') {
    errors.push(`版本不匹配: ${json.version}，期望 viz-design-spec-v1`);
  }

  if (json.chartType && !VALID_CHART_TYPES.includes(json.chartType)) {
    errors.push(`非法 chartType: ${json.chartType}，允许: ${VALID_CHART_TYPES.join(', ')}`);
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

// ─── 核心渲染引擎 ──────────────────────────────────────

/**
 * 将 viz-design spec JSON 转换为 ECharts option
 * 每种 chartType 有独立的渲染分支，不做隐式猜测
 */
function renderChart(spec) {
  const theme = THEMES.default;
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

  return { option, canvas };
}

// ─── HTML 生成 ─────────────────────────────────────────

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

    const { option, canvas } = renderChart(chart);
    const html = generateHTML(option, chart.title, canvas);
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log('OK: ' + outputPath + ' (' + chart.chartType + ')');
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
        if (!chart?.chartType) { skipped++; continue; }

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
        const { option, canvas } = renderChart(chart);
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
