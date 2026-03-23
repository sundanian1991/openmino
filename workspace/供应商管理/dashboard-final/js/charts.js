/**
 * 图表配置 - 所有图表的定义和配置
 */

const Charts = {
  // 存储图表实例
  instances: {},

  /**
   * 初始化图表
   */
  init(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`⚠️ 图表容器不存在: ${containerId}`);
      return null;
    }
    
    // 确保容器有尺寸
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn(`⚠️ 图表容器尺寸为0: ${containerId}`);
    }
    
    // 销毁已存在的实例
    if (this.instances[containerId]) {
      this.instances[containerId].dispose();
    }
    
    const chart = echarts.init(container);
    chart.setOption(options);
    this.instances[containerId] = chart;
    console.log(`✅ 图表初始化完成: ${containerId}`);
    return chart;
  },

  /**
   * 获取图表实例
   */
  get(id) {
    return this.instances[id];
  },

  /**
   * 销毁图表
   */
  dispose(id) {
    if (this.instances[id]) {
      this.instances[id].dispose();
      delete this.instances[id];
    }
  },

  /**
   * 调整所有图表大小
   */
  resizeAll() {
    Object.values(this.instances).forEach(chart => chart && chart.resize());
  },

  /**
   * 清空所有图表
   */
  clearAll() {
    Object.keys(this.instances).forEach(id => this.dispose(id));
  },

  // ==================== 具体图表配置 ====================

  /**
   * 月度趋势图（堆叠面积图）
   */
  trend(data, containerId = 'trend-chart') {
    const months = data.months || MONTHS;
    const monthlyData = months.map(m => data.monthly[m] || 0);
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        trigger: 'axis',
        formatter: params => {
          const val = params[0].value;
          return `${params[0].name}<br/>总人力: <b>${val.toLocaleString()}</b>人`;
        }
      },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLine: CHART_THEME.axisLine,
        axisLabel: CHART_THEME.axisLabel,
        axisTick: CHART_THEME.axisTick
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: CHART_THEME.splitLine,
        axisLabel: CHART_THEME.axisLabel
      },
      series: [{
        name: '总人力',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: THEME.primary },
        itemStyle: { color: THEME.primary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: THEME.gradientPrimary[0] },
            { offset: 1, color: THEME.gradientPrimary[1] }
          ])
        },
        data: monthlyData
      }]
    });
  },

  /**
   * 供应商分布（横向条形图）
   */
  supplierBar(data, containerId = 'supplier-chart') {
    const suppliers = Object.entries(data.suppliers || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: params => `${params[0].name}<br/>累计人力: <b>${params[0].value.toLocaleString()}</b>人`
      },
      grid: { left: 120, right: 24, top: 8, bottom: 8 },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: CHART_THEME.splitLine,
        axisLabel: CHART_THEME.axisLabel
      },
      yAxis: {
        type: 'category',
        data: suppliers.map(s => s[0].length > 12 ? s[0].slice(0, 12) + '...' : s[0]),
        axisLine: { show: false },
        axisLabel: { ...CHART_THEME.axisLabel, fontSize: 10 },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: suppliers.map(s => s[1]),
        barWidth: 14,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: THEME.primary },
            { offset: 1, color: THEME.primaryLight }
          ]),
          borderRadius: [0, 7, 7, 0]
        }
      }]
    });
  },

  /**
   * 职场分布（饼图）
   */
  workplacePie(data, containerId = 'workplace-chart') {
    const workplaces = Object.entries(data.workplaces || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        formatter: params => `${params.name}<br/>人力: <b>${params.value.toLocaleString()}</b>人 (${params.percent}%)`
      },
      legend: {
        ...CHART_THEME.legend,
        orient: 'vertical',
        right: 8,
        top: 'center',
        itemGap: 8,
        textStyle: { ...CHART_THEME.legend.textStyle, fontSize: 10 }
      },
      series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME.textPrimary
          }
        },
        data: workplaces.map((w, i) => ({
          name: w[0].length > 8 ? w[0].slice(0, 8) + '...' : w[0],
          value: w[1],
          itemStyle: { color: THEME.chartPalette[i % THEME.chartPalette.length] }
        }))
      }]
    });
  },

  /**
   * 省份地图
   */
  provinceMap(data, containerId = 'map-chart') {
    // 简化为条形图展示（地图需要 GeoJSON）
    const provinces = Object.entries(data.provinces || {})
      .sort((a, b) => b[1] - a[1]);
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        trigger: 'axis',
        formatter: params => `${params[0].name}<br/>总人力: <b>${params[0].value.toLocaleString()}</b>人`
      },
      grid: { left: 48, right: 16, top: 8, bottom: 8 },
      xAxis: {
        type: 'category',
        data: provinces.map(p => p[0]),
        axisLine: CHART_THEME.axisLine,
        axisLabel: { ...CHART_THEME.axisLabel, rotate: 30 },
        axisTick: CHART_THEME.axisTick
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: CHART_THEME.splitLine,
        axisLabel: CHART_THEME.axisLabel
      },
      series: [{
        type: 'bar',
        data: provinces.map(p => p[1]),
        barWidth: 20,
        itemStyle: {
          color: THEME.secondary,
          borderRadius: [4, 4, 0, 0]
        }
      }]
    });
  },

  /**
   * 产品线分布（环形图）
   */
  productPie(data, containerId = 'product-chart') {
    const products = Object.entries(data.products || {});
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        formatter: params => `${params.name}<br/>人力: <b>${params.value.toLocaleString()}</b>人 (${params.percent}%)`
      },
      legend: {
        ...CHART_THEME.legend,
        orient: 'horizontal',
        bottom: 0,
        itemGap: 16
      },
      series: [{
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 11,
          color: THEME.textSecondary
        },
        emphasis: {
          label: { fontSize: 12, fontWeight: 'bold' }
        },
        data: products.map((p, i) => ({
          name: p[0],
          value: p[1],
          itemStyle: { color: THEME.chartPalette[i % THEME.chartPalette.length] }
        }))
      }]
    });
  },

  /**
   * 月度对比（柱状图）
   */
  monthlyBar(data, containerId = 'monthly-chart') {
    const months = data.months || MONTHS;
    const values = months.map(m => data.monthly[m] || 0);
    
    return this.init(containerId, {
      tooltip: {
        ...CHART_THEME.tooltip,
        trigger: 'axis',
        formatter: params => `${params[0].name}<br/>人力: <b>${params[0].value.toLocaleString()}</b>人`
      },
      grid: { left: 16, right: 16, top: 16, bottom: 24, containLabel: true },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: CHART_THEME.axisLine,
        axisLabel: CHART_THEME.axisLabel,
        axisTick: CHART_THEME.axisTick
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: CHART_THEME.splitLine,
        axisLabel: CHART_THEME.axisLabel
      },
      series: [{
        type: 'bar',
        data: values,
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: THEME.primary },
            { offset: 1, color: THEME.primaryLight }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      }]
    });
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Charts };
}
