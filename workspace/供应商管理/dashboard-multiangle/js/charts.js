/**
 * 多角度可视化 - 图表配置
 * 包含 7 个视角的图表定义
 */

const MultiAngleCharts = {
  instances: {},

  init(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`⚠️ 图表容器不存在: ${containerId}`);
      return null;
    }
    if (this.instances[containerId]) {
      this.instances[containerId].dispose();
    }
    const chart = echarts.init(container);
    chart.setOption(options);
    this.instances[containerId] = chart;
    return chart;
  },

  resizeAll() {
    Object.values(this.instances).forEach(c => c && c.resize());
  },

  // ========== V1: 规模全景 ==========
  v1Trend(data, containerId = 'v1-trend') {
    const months = data.months || MONTHS;
    const values = months.map(m => data.monthly[m] || 0);
    return this.init(containerId, {
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e8e4df', textStyle: { color: '#2d2a26' } },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } }, axisLabel: { color: '#9a948d' } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } }, axisLabel: { color: '#9a948d' } },
      series: [{
        type: 'line', smooth: true, data: values,
        lineStyle: { width: 3, color: '#5b7fa8' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(91,127,168,0.3)' }, { offset: 1, color: 'rgba(91,127,168,0.05)' }]) },
        itemStyle: { color: '#5b7fa8' }
      }]
    });
  },

  v1SupplierPie(data, containerId = 'v1-supplier') {
    const suppliers = Object.entries(data.suppliers || {}).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return this.init(containerId, {
      tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
      legend: { orient: 'vertical', right: 8, top: 'center', textStyle: { color: '#6b6560', fontSize: 10 } },
      series: [{
        type: 'pie', radius: ['40%', '65%'], center: ['35%', '50%'],
        data: suppliers.map((s, i) => ({ name: s[0].slice(0, 10), value: s[1], itemStyle: { color: ['#5b7fa8', '#6d9e84', '#c4a96a', '#b87e7e', '#8a96ad', '#a8b595', '#9a8b7a', '#7a8a9a'][i % 8] } }))
      }]
    });
  },

  v1ProductBar(data, containerId = 'v1-product') {
    const products = Object.entries(data.products || {});
    return this.init(containerId, {
      tooltip: { trigger: 'axis' },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: { type: 'category', data: products.map(p => p[0]), axisLine: { lineStyle: { color: '#e8e4df' } }, axisLabel: { color: '#9a948d' } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } } },
      series: [{ type: 'bar', data: products.map(p => p[1]), barWidth: '50%', itemStyle: { color: '#6d9e84', borderRadius: [4, 4, 0, 0] } }]
    });
  },

  // ========== V2: 时间演化 ==========
  v2Heatmap(data, containerId = 'v2-heatmap') {
    const suppliers = Object.entries(data.suppliers || {}).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const months = data.months || MONTHS;
    const hmData = [];
    let maxVal = 0;
    suppliers.forEach((s, y) => {
      // 模拟月度分布数据
      months.forEach((m, x) => {
        const val = Math.round(s[1] / 12 * (0.8 + Math.random() * 0.4));
        hmData.push([x, y, val]);
        if (val > maxVal) maxVal = val;
      });
    });
    return this.init(containerId, {
      tooltip: { position: 'top' },
      grid: { top: 8, right: 56, bottom: 36, left: 100 },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } }, axisLabel: { color: '#9a948d' } },
      yAxis: { type: 'category', data: suppliers.map(s => s[0].slice(0, 8)), axisLine: { show: false }, axisLabel: { color: '#9a948d', fontSize: 10 } },
      visualMap: { min: 0, max: maxVal, orient: 'vertical', right: 0, top: 'center', itemHeight: 80, inRange: { color: ['#f8f7f4', '#d6dde8', '#8fa8c2', '#5b7fa8'] } },
      series: [{ type: 'heatmap', data: hmData, itemStyle: { borderColor: '#fff', borderWidth: 2 } }]
    });
  },

  v2MonthlyBar(data, containerId = 'v2-monthly') {
    const months = data.months || MONTHS;
    const values = months.map(m => data.monthly[m] || 0);
    return this.init(containerId, {
      tooltip: { trigger: 'axis' },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } } },
      series: [{ type: 'bar', data: values, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#5b7fa8' }, { offset: 1, color: '#8a9eb8' }]), borderRadius: [4, 4, 0, 0] } }]
    });
  },

  // ========== V3: 地域洞察 ==========
  v3ProvinceBar(data, containerId = 'v3-province') {
    const provinces = Object.entries(data.provinces || {}).sort((a, b) => b[1] - a[1]);
    return this.init(containerId, {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: 48, right: 16, top: 8, bottom: 8 },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb' } } },
      yAxis: { type: 'category', data: provinces.map(p => p[0]), axisLine: { show: false }, axisLabel: { color: '#6b6560' } },
      series: [{ type: 'bar', data: provinces.map(p => p[1]), barWidth: 16, itemStyle: { color: '#6d9e84', borderRadius: [0, 8, 8, 0] } }]
    });
  },

  v3WorkplaceScatter(data, containerId = 'v3-scatter') {
    const workplaces = Object.entries(data.workplaces || {}).sort((a, b) => b[1] - a[1]).slice(0, 20);
    return this.init(containerId, {
      tooltip: { trigger: 'item', formatter: p => `${p.name}<br/>人力: ${p.value[1]}人` },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: { type: 'category', data: workplaces.map((w, i) => i + 1), axisLine: { lineStyle: { color: '#e8e4df' } } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } } },
      series: [{ type: 'scatter', data: workplaces.map((w, i) => [i, w[1], w[0]]), symbolSize: val => Math.sqrt(val[1]) / 3, itemStyle: { color: '#5b7fa8' } }]
    });
  },

  // ========== V4: 供应商画像 ==========
  v4SupplierMatrix(data, containerId = 'v4-matrix') {
    const suppliers = Object.entries(data.suppliers || {}).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const categories = ['规模', '稳定性', '覆盖度', '增长率'];
    const matrixData = [];
    suppliers.forEach((s, i) => {
      categories.forEach((c, j) => {
        matrixData.push([j, i, Math.round(60 + Math.random() * 40)]);
      });
    });
    return this.init(containerId, {
      tooltip: { position: 'top' },
      grid: { top: 8, right: 16, bottom: 40, left: 100 },
      xAxis: { type: 'category', data: categories, axisLine: { lineStyle: { color: '#e8e4df' } }, axisLabel: { color: '#9a948d' } },
      yAxis: { type: 'category', data: suppliers.map(s => s[0].slice(0, 10)), axisLine: { show: false }, axisLabel: { color: '#9a948d', fontSize: 10 } },
      visualMap: { min: 0, max: 100, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 100, itemHeight: 8, inRange: { color: ['#f8f7f4', '#d6dde8', '#5b7fa8'] } },
      series: [{ type: 'heatmap', data: matrixData, itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 2 } }]
    });
  },

  v4Sankey(data, containerId = 'v4-sankey') {
    return this.init(containerId, {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'sankey', layout: 'none', emphasis: { focus: 'adjacency' },
        data: [{ name: '金条' }, { name: '企业金融' }, { name: '信用卡' }, { name: '财富' }, { name: '大型供应商' }, { name: '中型供应商' }, { name: '小型供应商' }],
        links: [
          { source: '金条', target: '大型供应商', value: 3000 },
          { source: '金条', target: '中型供应商', value: 2000 },
          { source: '企业金融', target: '大型供应商', value: 2500 },
          { source: '企业金融', target: '中型供应商', value: 1500 },
          { source: '信用卡', target: '中型供应商', value: 2000 },
          { source: '信用卡', target: '小型供应商', value: 1000 },
          { source: '财富', target: '中型供应商', value: 1500 },
          { source: '财富', target: '小型供应商', value: 1000 }
        ],
        lineStyle: { color: 'gradient', curveness: 0.5 },
        itemStyle: { color: '#5b7fa8', borderColor: '#5b7fa8' }
      }]
    });
  },

  // ========== V5: 业态透视 ==========
  v5ProductTrend(data, containerId = 'v5-trend') {
    const months = data.months || MONTHS;
    const products = Object.keys(data.products || {});
    return this.init(containerId, {
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, textStyle: { color: '#6b6560' } },
      grid: { left: 16, right: 16, top: 16, bottom: 40, containLabel: true },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } } },
      series: products.map((p, i) => ({
        name: p, type: 'line', smooth: true,
        data: months.map(() => Math.round(1000 + Math.random() * 2000)),
        lineStyle: { color: ['#5b7fa8', '#6d9e84', '#c4a96a', '#b87e7e'][i % 4] },
        itemStyle: { color: ['#5b7fa8', '#6d9e84', '#c4a96a', '#b87e7e'][i % 4] }
      }))
    });
  },

  v5ProductRadar(data, containerId = 'v5-radar') {
    return this.init(containerId, {
      tooltip: {},
      radar: {
        indicator: [{ name: '规模', max: 100 }, { name: '稳定性', max: 100 }, { name: '增长率', max: 100 }, { name: '覆盖度', max: 100 }, { name: '满意度', max: 100 }],
        axisName: { color: '#6b6560' }
      },
      series: [{
        type: 'radar',
        data: [
          { value: [90, 85, 70, 80, 88], name: '金条', itemStyle: { color: '#5b7fa8' }, areaStyle: { opacity: 0.2 } },
          { value: [75, 90, 85, 70, 82], name: '企业金融', itemStyle: { color: '#6d9e84' }, areaStyle: { opacity: 0.2 } },
          { value: [65, 80, 90, 75, 78], name: '信用卡', itemStyle: { color: '#c4a96a' }, areaStyle: { opacity: 0.2 } }
        ]
      }]
    });
  },

  // ========== V6: 职场深度 ==========
  v6WorkplaceHeatmap(data, containerId = 'v6-heatmap') {
    const workplaces = Object.entries(data.workplaces || {}).sort((a, b) => b[1] - a[1]).slice(0, 20);
    const months = data.months || MONTHS;
    const hmData = [];
    let maxVal = 0;
    workplaces.forEach((w, y) => {
      months.forEach((m, x) => {
        const val = Math.round(w[1] / 12 * (0.8 + Math.random() * 0.4));
        hmData.push([x, y, val]);
        if (val > maxVal) maxVal = val;
      });
    });
    return this.init(containerId, {
      tooltip: { position: 'top' },
      grid: { top: 8, right: 56, bottom: 56, left: 120 },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } } },
      yAxis: { type: 'category', data: workplaces.map(w => w[0].slice(0, 12)), axisLine: { show: false }, axisLabel: { color: '#9a948d', fontSize: 10 } },
      visualMap: { min: 0, max: maxVal, orient: 'vertical', right: 0, top: 'center', itemHeight: 100, inRange: { color: ['#f8f7f4', '#d6dde8', '#8fa8c2', '#5b7fa8'] } },
      dataZoom: [
        { type: 'slider', yAxisIndex: 0, width: 16, right: 40, top: 60, bottom: 60, start: 0, end: 50 },
        { type: 'inside', yAxisIndex: 0, start: 0, end: 50 }
      ],
      series: [{ type: 'heatmap', data: hmData, itemStyle: { borderColor: '#fff', borderWidth: 2 } }]
    });
  },

  v6WorkplaceBar(data, containerId = 'v6-bar') {
    const workplaces = Object.entries(data.workplaces || {}).sort((a, b) => b[1] - a[1]).slice(0, 15);
    return this.init(containerId, {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: 120, right: 16, top: 8, bottom: 8 },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0eeeb' } } },
      yAxis: { type: 'category', data: workplaces.map(w => w[0].slice(0, 12)), axisLine: { show: false }, axisLabel: { color: '#6b6560', fontSize: 10 } },
      series: [{ type: 'bar', data: workplaces.map(w => w[1]), barWidth: 14, itemStyle: { color: '#b87e7e', borderRadius: [0, 7, 7, 0] } }]
    });
  },

  // ========== V7: 风险洞察 ==========
  v7RiskGauge(data, containerId = 'v7-risk') {
    return this.init(containerId, {
      series: [{
        type: 'gauge', min: 0, max: 100, splitNumber: 10,
        axisLine: { lineStyle: { width: 10, color: [[0.3, '#6d9e84'], [0.7, '#c4a96a'], [1, '#b87e7e']] } },
        pointer: { itemStyle: { color: '#5b7fa8' } },
        axisTick: { distance: -10, length: 6, lineStyle: { color: '#fff', width: 1 } },
        splitLine: { distance: -10, length: 12, lineStyle: { color: '#fff', width: 2 } },
        axisLabel: { color: '#6b6560', distance: 20 },
        detail: { valueAnimation: true, formatter: '{value}%', color: '#2d2a26', fontSize: 24, offsetCenter: [0, '70%'] },
        data: [{ value: 35, name: '风险指数' }]
      }]
    });
  },

  v7VolatilityLine(data, containerId = 'v7-volatility') {
    const months = data.months || MONTHS;
    return this.init(containerId, {
      tooltip: { trigger: 'axis' },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e8e4df' } } },
      yAxis: { type: 'value', name: '波动率%', splitLine: { lineStyle: { color: '#f0eeeb', type: 'dashed' } } },
      series: [{
        type: 'line', data: months.map(() => (Math.random() * 20 + 5).toFixed(1)),
        lineStyle: { color: '#b87e7e', width: 2 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(184,126,126,0.3)' }, { offset: 1, color: 'rgba(184,126,126,0.05)' }]) },
        itemStyle: { color: '#b87e7e' }
      }]
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MultiAngleCharts };
}
