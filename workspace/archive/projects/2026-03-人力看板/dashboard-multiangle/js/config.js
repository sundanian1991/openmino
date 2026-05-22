/**
 * 人力看板 - 全局配置
 * 包含配色、常量、图表主题等
 */

// 配色系统 - 低饱和暖色调
const THEME = {
  // 主色调
  primary: '#5b7fa8',
  primaryLight: '#8a9eb8',
  primaryDark: '#4a6a8f',
  secondary: '#6d9e84',
  accent: '#c4a96a',
  danger: '#b87e7e',
  warning: '#c4a96a',
  success: '#6d9e84',
  info: '#8a96ad',

  // 中性色
  bg: '#f5f3ef',
  surface: '#ffffff',
  textPrimary: '#2d2a26',
  textSecondary: '#6b6560',
  textTertiary: '#9a948d',
  border: '#e8e4df',
  borderLight: '#f0eeeb',
  grid: '#f0eeeb',

  // 图表配色序列
  chartPalette: ['#5b7fa8', '#6d9e84', '#c4a96a', '#b87e7e', '#8a96ad', '#a8b595', '#9a8b7a', '#7a8a9a'],

  // 渐变
  gradientPrimary: ['rgba(91,127,168,0.35)', 'rgba(91,127,168,0.05)'],
  gradientSecondary: ['rgba(109,158,132,0.35)', 'rgba(109,158,132,0.05)'],
  gradientDanger: ['rgba(184,126,126,0.3)', 'rgba(184,126,126,0.05)']
};

// 图表主题配置
const CHART_THEME = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: '#e8e4df',
    borderWidth: 1,
    textStyle: {
      color: '#2d2a26',
      fontSize: 12,
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'
    },
    extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-radius: 8px; padding: 10px 14px;'
  },
  axisLine: {
    lineStyle: { color: '#e8e4df' }
  },
  splitLine: {
    lineStyle: { color: '#f0eeeb', type: 'dashed' }
  },
  axisLabel: {
    color: '#9a948d',
    fontSize: 11
  },
  axisTick: {
    show: false
  },
  legend: {
    itemGap: 20,
    itemWidth: 16,
    itemHeight: 3,
    textStyle: { color: '#6b6560', fontSize: 11 }
  }
};

// 月份配置
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 产品线配置
const PRODUCT_LINES = ['金条', '企业金融', '信用卡', '财富'];

// 数据列名映射（支持自适应识别）
const COLUMN_MAPPING = {
  // 供应商相关
  supplier: ['供应商', '供应商名称', '公司名称', '合作方', '外包商', 'vendor', 'supplier'],
  
  // 站点/职场相关
  workplace: ['站点', '职场', '办公地点', '工作地', 'site', 'workplace', 'location'],
  
  // 省份相关
  province: ['省份', '省', '所在省份', '地区', 'province', 'region'],
  
  // 人数相关（支持多个月份）
  headcount: ['人数', '人力', '员工数', '坐席数', 'headcount', 'staff', 'employees'],
  
  // 产品线
  productLine: ['产品线', '业务线', '产品', '业务类型', 'product', 'business'],
  
  // 月份模式（用于识别 1月、2月 等列）
  monthPattern: /^(\d{1,2})月?$|^month[_\s]?(\d{1,2})$/i
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { THEME, CHART_THEME, MONTHS, PRODUCT_LINES, COLUMN_MAPPING };
}
