#!/usr/bin/env node
// 渲染管线测试 — 20 个最小用例 + 批量验证
// 用法：node render-viz-design-spec.test.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT = path.join(__dirname, 'render-viz-design-spec.js');
const TMP = '/tmp/viz-render-test';

// 确保临时目录存在
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true });

// ─── 测试用例定义 ─────────────────────────────────────

const TESTS = [
  // === bar_chart (水平条形) ===
  {
    name: 'bar_chart 纯数值排名',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'bar_chart',
      title: 'TOP 5 测试', subtitle: '测试数据',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['国家', 'GDP(万亿美元)'],
        series: [
          { name: '美国', values: [27.36] },
          { name: '中国', values: [17.79] },
          { name: '德国', values: [4.43] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.yAxis.type === 'category', 'Y 轴应为 category');
      assert(opt.series[0].type === 'bar', '应为 bar 类型');
      assert(opt.series[0].data.length === 3, '应有 3 个数据点');
    }
  },

  {
    name: 'bar_chart 对象数组格式',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'bar_chart',
      title: '对象数组测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['公司', '营收'],
        series: [{
          name: '营收排名',
          values: [
            { company: '苹果', revenue: 383 },
            { company: '微软', revenue: 245 },
            { company: '谷歌', revenue: 307 }
          ]
        }]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.yAxis.type === 'category', 'Y 轴应为 category');
      assert(opt.series[0].data.length === 3, '应有 3 个数据');
      // 验证 labels 被提取为 Y 轴数据
      assert(opt.yAxis.data.length === 3, 'Y 轴应有 3 个标签');
    }
  },

  // === line_chart ===
  {
    name: 'line_chart 时间序列',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'line_chart',
      title: '月度测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['月份', '股价'],
        series: [
          { name: '月份标签', values: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'] },
          { name: '股价', values: [150, 155, 160, 165, 170], highlight: true }
        ]
      },
      visualEncoding: { highlight: [{ series: '股价', color: '#c26d3a' }] }
    },
    check: opt => {
      assert(opt.xAxis.type === 'category', 'X 轴应为 category');
      assert(opt.xAxis.data[0] === '2024-01', 'X 轴第一个标签应为 2024-01');
      assert(opt.xAxis.data.length === 5, '应有 5 个时间标签');
      assert(opt.series[0].type === 'line', '应为 line 类型');
      assert(opt.series[0].data[0] === 150, '第一个数据点应为 150');
    }
  },

  // === multi_line ===
  {
    name: 'multi_line 多线对比',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'multi_line',
      title: '三线对比', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['年份', '收入', '利润', '用户'],
        series: [
          { name: '年份', values: ['2020', '2021', '2022', '2023'] },
          { name: '收入', values: [100, 120, 150, 180] },
          { name: '利润', values: [20, 30, 40, 55] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series.length === 2, '应有 2 个数据系列（排除标签系列）');
      // 注意：第一个系列是标签，渲染时应排除
      assert(opt.xAxis.data.length === 4, 'X 轴应有 4 个年份');
    }
  },

  // === area_chart ===
  {
    name: 'area_chart 面积图',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'area_chart',
      title: '面积测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['月份', '线上零售', '线下零售'],
        series: [
          { name: '月份', values: ['1月', '2月', '3月'] },
          { name: '线上', values: [10, 12, 15], highlight: true },
          { name: '线下', values: [20, 18, 16] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].areaStyle !== undefined, '应有面积样式');
      assert(opt.series[0].type === 'line', '面积图本质是 line');
    }
  },

  // === stacked_area ===
  {
    name: 'stacked_area 堆叠面积',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'stacked_area',
      title: '堆叠面积测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['年份', '水电', '风电', '光伏'],
        series: [
          { name: '年份', values: ['2020', '2021', '2022'] },
          { name: '水电', values: [100, 110, 120] },
          { name: '风电', values: [50, 60, 70] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].stack === 'total', '应有 stack=total');
      assert(opt.series[0].areaStyle !== undefined, '应有面积样式');
    }
  },

  // === dual_axis ===
  {
    name: 'dual_axis 双轴图',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'dual_axis',
      title: 'GDP 与增速双轴', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['年份', 'GDP(万亿)', '增速(%)'],
        series: [
          { name: '年份', values: ['2020', '2021', '2022', '2023'] },
          { name: 'GDP总量', values: [101.4, 114.9, 121.0, 126.1] },
          { name: '增速', values: [2.3, 8.6, 3.1, 5.4], highlight: true }
        ]
      },
      visualEncoding: { highlight: [{ series: '增速', color: '#c26d3a' }] }
    },
    check: opt => {
      assert(Array.isArray(opt.yAxis), '双轴图 Y 轴应为数组');
      assert(opt.yAxis.length === 2, '应有 2 个 Y 轴');
      assert(opt.series.length === 2, '应有 2 个数据系列');
      assert(opt.series[0].yAxisIndex === 0, '第一个系列应使用左轴');
      assert(opt.series[1].yAxisIndex === 1, '第二个系列应使用右轴');
      assert(opt.series[0].type === 'bar', '第一个系列应为 bar');
      assert(opt.series[1].type === 'line', '第二个系列应为 line');
    }
  },

  {
    name: 'dual_axis 无字符串标签',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'dual_axis',
      title: '无标签双轴', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['序号', '值A', '值B'],
        series: [
          { name: '值A', values: [100, 200, 150] },
          { name: '值B', values: [10, 20, 15] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.xAxis.data.length === 3, '应生成 3 个数字索引标签');
      assert(opt.yAxis.length === 2, '仍应有 2 个 Y 轴');
    }
  },

  // === grouped_bar ===
  {
    name: 'grouped_bar 分组柱状',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'grouped_bar',
      title: '分组柱状测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['季度', '收入A', '收入B'],
        series: [
          { name: '季度', values: ['Q1', 'Q2', 'Q3', 'Q4'] },
          { name: '产品A', values: [100, 120, 130, 140] },
          { name: '产品B', values: [80, 90, 110, 100] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].stack === 'total', '分组柱状应有 stack');
      assert(opt.xAxis.data.length === 4, 'X 轴应有 4 个季度');
    }
  },

  // === stacked_bar ===
  {
    name: 'stacked_bar 堆叠条形',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'stacked_bar',
      title: '堆叠条形测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['能源类型', '中国', '美国'],
        series: [
          { name: '能源', values: ['水电', '风电', '光伏'] },
          { name: '中国', values: [422, 441, 609] },
          { name: '美国', values: [103, 150, 160] }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].stack === 'total', '应有 stack');
      assert(opt.series.length === 2, '应有 2 个数据系列');
    }
  },

  // === scatter_chart ===
  {
    name: 'scatter_chart 散点图+高亮',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'scatter_chart',
      title: '散点测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['疾病', '发病数', '死亡数'],
        series: [
          {
            name: '其他',
            points: [{ x: 100000, y: 500 }, { x: 50000, y: 200 }, { x: 10000, y: 50 }]
          },
          {
            name: '重点疾病',
            highlight: true,
            points: [{ x: 6895, y: 2201, label: '艾滋病' }]
          }
        ]
      },
      visualEncoding: { xAxisLog: true, xLabel: '发病数', yLabel: '死亡数' }
    },
    check: opt => {
      assert(opt.xAxis.logBase === 10, '应有对数刻度');
      assert(opt.series[0].label.show === false, '非高亮点不应显示标签');
      assert(opt.series[1].label.show === true, '高亮点应显示标签');
      assert(opt.series[1].symbolSize === 16, '高亮点应更大');
    }
  },

  {
    name: 'scatter_chart values 格式兼容',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'scatter_chart',
      title: '散点 values 格式', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['X', 'Y'],
        series: [{
          name: '数据',
          values: [[1, 2], [3, 4], [5, 6]]
        }]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].data[0][0] === 1, '第一个点 x 应为 1');
      assert(opt.series[0].data[0][1] === 2, '第一个点 y 应为 2');
    }
  },

  // === radar_chart ===
  {
    name: 'radar_chart 雷达图',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'radar_chart',
      title: '雷达测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['沟通', '执行', '创新', '协作'],
        series: [{ name: '员工A', values: [80, 90, 70, 85], highlight: true }]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.radar !== undefined, '应有 radar 配置');
      assert(opt.radar.indicator.length === 4, '应有 4 个指标');
    }
  },

  // === Schema 校验测试 ===
  {
    name: '校验失败：缺少 version',
    spec: { chartType: 'bar_chart', title: 'test', data: { series: [{ name: 'a', values: [1] }] } },
    shouldFail: true
  },

  {
    name: '校验失败：非法 chartType',
    spec: { version: 'viz-design-spec-v1', chartType: 'pie_chart', title: 'test', data: { series: [{ name: 'a', values: [1] }] } },
    shouldFail: true
  },

  {
    name: '校验失败：空 series',
    spec: { version: 'viz-design-spec-v1', chartType: 'bar_chart', title: 'test', data: { series: [] } },
    shouldFail: true
  },

  {
    name: '校验失败：series 缺少 name',
    spec: { version: 'viz-design-spec-v1', chartType: 'bar_chart', title: 'test', data: { series: [{ values: [1] }] } },
    shouldFail: true
  },

  {
    name: '校验失败：series 缺少 values',
    spec: { version: 'viz-design-spec-v1', chartType: 'bar_chart', title: 'test', data: { series: [{ name: 'a' }] } },
    shouldFail: true
  },

  // === 边界用例 ===
  {
    name: 'bar_chart value 兼容（schema deviation）',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'bar_chart',
      title: 'value 兼容测试', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['项目', '值'],
        series: [
          { name: 'A', value: 100 },
          { name: 'B', value: 200 }
        ]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.series[0].data.length === 2, '应有 2 个数据点');
    }
  },

  {
    name: 'line_chart 单系列无标签',
    spec: {
      version: 'viz-design-spec-v1', chartType: 'line_chart',
      title: '无标签线图', subtitle: '',
      canvas: { width: 800, height: 550 },
      data: {
        fields: ['序号', '值'],
        series: [{ name: '数据', values: [10, 20, 30, 40, 50] }]
      },
      visualEncoding: {}
    },
    check: opt => {
      assert(opt.xAxis.data.length === 5, '应生成 5 个数字索引');
      assert(opt.series.length === 1, '应有 1 个系列');
    }
  },

  // ========================================
  // === v2 ggplot2 分层格式测试 ===
  // ========================================

  {
    name: 'v2 geom_bar 柱状图',
    spec: {
      version: 'viz-design-spec-v2',
      title: 'GDP 对比', subtitle: '2020-2022',
      data: {
        type: 'rows',
        fields: ['国家', 'GDP_万亿'],
        rows: [
          { '国家': '美国', 'GDP_万亿': 27.36 },
          { '国家': '中国', 'GDP_万亿': 17.79 },
          { '国家': '德国', 'GDP_万亿': 4.43 }
        ]
      },
      mapping: { x: '国家', y: 'GDP_万亿', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_bar', aes: { y: 'GDP_万亿' }, params: {} }
      ],
      scales: [{ aesthetic: 'y', type: 'linear', name: 'GDP（万亿美元）' }],
      coord: { type: 'cartesian', flip: false },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(opt.xAxis.type === 'category', 'X 轴应为 category');
      assert(opt.xAxis.data.length === 3, 'X 轴应有 3 个标签');
      assert(opt.series[0].type === 'bar', '应为 bar 类型');
      assert(opt.series[0].data.length === 3, '应有 3 个数据点');
    }
  },

  {
    name: 'v2 geom_line 折线图',
    spec: {
      version: 'viz-design-spec-v2',
      title: '月度股价', subtitle: '2024',
      data: {
        type: 'rows',
        fields: ['月份', '收盘价'],
        rows: [
          { '月份': '2024-01', '收盘价': 150 },
          { '月份': '2024-02', '收盘价': 155 },
          { '月份': '2024-03', '收盘价': 160 },
          { '月份': '2024-04', '收盘价': 165 },
          { '月份': '2024-05', '收盘价': 170 }
        ]
      },
      mapping: { x: '月份', y: '收盘价', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_line', aes: { y: '收盘价' }, params: { color: '#c26d3a', size: 2 } }
      ],
      scales: [{ aesthetic: 'y', type: 'linear', name: '收盘价（USD）' }],
      coord: { type: 'cartesian', flip: false },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(opt.xAxis.type === 'category', 'X 轴应为 category');
      assert(opt.xAxis.data[0] === '2024-01', 'X 轴第一个标签应为 2024-01');
      assert(opt.series[0].type === 'line', '应为 line 类型');
      assert(opt.series[0].data.length === 5, '应有 5 个数据点');
    }
  },

  {
    name: 'v2 geom_bar + geom_line 双轴图',
    spec: {
      version: 'viz-design-spec-v2',
      title: 'GDP 与增速', subtitle: '2020-2023',
      data: {
        type: 'rows',
        fields: ['年份', 'GDP_万亿', '增速__pct'],
        rows: [
          { '年份': '2020', 'GDP_万亿': 101.4, '增速__pct': 2.3 },
          { '年份': '2021', 'GDP_万亿': 114.9, '增速__pct': 8.6 },
          { '年份': '2022', 'GDP_万亿': 121.0, '增速__pct': 3.1 },
          { '年份': '2023', 'GDP_万亿': 126.1, '增速__pct': 5.4 }
        ]
      },
      mapping: { x: '年份', y: 'GDP_万亿', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_bar', aes: { y: 'GDP_万亿' }, params: {} },
        { geom: 'geom_line', aes: { y: '增速__pct' }, params: { color: '#c26d3a', size: 2 } }
      ],
      scales: [
        { aesthetic: 'y', type: 'linear', name: 'GDP（万亿）' },
        { aesthetic: 'y', type: 'linear', name: '增速（%）', secondary: true }
      ],
      coord: { type: 'cartesian', flip: false },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(Array.isArray(opt.yAxis), '双轴图 Y 轴应为数组');
      assert(opt.yAxis.length === 2, '应有 2 个 Y 轴');
      assert(opt.series.length === 2, '应有 2 个数据系列');
      assert(opt.series[0].type === 'bar', '第一个系列应为 bar');
      assert(opt.series[1].type === 'line', '第二个系列应为 line');
      assert(opt.series[1].yAxisIndex === 1, '线系列应使用右轴');
    }
  },

  {
    name: 'v2 geom_label 标注',
    spec: {
      version: 'viz-design-spec-v2',
      title: '带标注的柱状图', subtitle: '测试',
      data: {
        type: 'rows',
        fields: ['年份', '值'],
        rows: [
          { '年份': '2020', '值': 100 },
          { '年份': '2021', '值': 150 },
          { '年份': '2022', '值': 200 }
        ]
      },
      mapping: { x: '年份', y: '值', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_bar', aes: { y: '值' }, params: {} },
        { geom: 'geom_label', aes: { x: '2022', y: 200, label: '新高' }, params: { color: '#c26d3a', fontSize: 11 } }
      ],
      scales: [{ aesthetic: 'y', type: 'linear', name: '值' }],
      coord: { type: 'cartesian', flip: false },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(opt.series.length >= 2, '应有至少 2 个系列（bar + label）');
      const labelSeries = opt.series.find(s => s.label && s.label.show);
      assert(labelSeries !== undefined, '应有带 label.show=true 的系列');
    }
  },

  {
    name: 'v2 geom_area 面积图',
    spec: {
      version: 'viz-design-spec-v2',
      title: '面积图测试', subtitle: '',
      data: {
        type: 'rows',
        fields: ['月份', '值'],
        rows: [
          { '月份': '1月', '值': 10 },
          { '月份': '2月', '值': 15 },
          { '月份': '3月', '值': 12 }
        ]
      },
      mapping: { x: '月份', y: '值', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_area', aes: { y: '值' }, params: {} }
      ],
      scales: [{ aesthetic: 'y', type: 'linear', name: '值' }],
      coord: { type: 'cartesian', flip: false },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(opt.series[0].type === 'line', '面积图应为 line 类型');
      assert(opt.series[0].areaStyle !== undefined, '应有 areaStyle');
    }
  },

  {
    name: 'v2 coord_flip 水平条形',
    spec: {
      version: 'viz-design-spec-v2',
      title: '水平条形', subtitle: '',
      data: {
        type: 'rows',
        fields: ['项目', '值'],
        rows: [
          { '项目': 'A', '值': 100 },
          { '项目': 'B', '值': 200 },
          { '项目': 'C', '值': 150 }
        ]
      },
      mapping: { x: '项目', y: '值', fill: null, color: null, size: null },
      layers: [
        { geom: 'geom_bar', aes: { y: '值' }, params: {} }
      ],
      scales: [{ aesthetic: 'y', type: 'linear', name: '值' }],
      coord: { type: 'cartesian', flip: true },
      theme: { palette: 'restrained-warm', canvas: { width: 800, height: 550 } }
    },
    check: opt => {
      assert(opt.xAxis.type === 'value', '翻转后 X 轴应为 value');
      assert(opt.yAxis.type === 'category', '翻转后 Y 轴应为 category');
      assert(opt.yAxis.data.length === 3, 'Y 轴应有 3 个标签');
    }
  },

  {
    name: 'v2 校验失败：缺少 layers',
    spec: {
      version: 'viz-design-spec-v2',
      title: 'test',
      data: { type: 'rows', fields: ['a'], rows: [{ a: 1 }] },
      mapping: { x: 'a', y: null },
      coord: { type: 'cartesian' }
    },
    shouldFail: true
  },

  {
    name: 'v2 校验失败：非法 geom',
    spec: {
      version: 'viz-design-spec-v2',
      title: 'test',
      data: { type: 'rows', fields: ['a'], rows: [{ a: 1 }] },
      mapping: { x: 'a', y: 'a' },
      layers: [{ geom: 'geom_pie', aes: {} }],
      coord: { type: 'cartesian' }
    },
    shouldFail: true
  }
];

// ─── 测试框架 ──────────────────────────────────────────

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function extractOption(html) {
  const m = html.match(/c\.setOption\((\{[\s\S]*?\})\);/);
  if (!m) throw new Error('HTML 中未找到 ECharts option');
  return JSON.parse(m[1]);
}

// 内联渲染（不走脚本，直接测试 renderChart 函数）
// 这里我们需要动态加载脚本中的函数
const scriptContent = fs.readFileSync(SCRIPT, 'utf-8');

// 提取 validateSpec 和 renderChart 函数
// 由于 Node.js 模块隔离，我们改用 eval 方式（仅测试环境）
const sandboxCode = scriptContent.replace('main();', '') + `
  // 暴露给测试
  globalThis._validateSpec = validateSpec;
  globalThis._renderChart = renderChart;
  globalThis._generateHTML = generateHTML;
`;

// 使用子进程方式执行单文件渲染测试
function renderSpecToFile(spec, outFile) {
  const jsonStr = JSON.stringify(spec);
  // 写临时 JSON 文件
  const jsonFile = TMP + '/_' + Date.now() + '.json';
  fs.writeFileSync(jsonFile, '```json\n' + jsonStr + '\n```', 'utf-8');
  try {
    execSync(`node "${SCRIPT}" "${jsonFile}" "${outFile}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    return true;
  } catch (e) {
    return false;
  }
}

function runTests() {
  let passed = 0, failed = 0;
  const failures = [];

  for (const t of TESTS) {
    const outFile = TMP + '/test_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.html';

    if (t.shouldFail) {
      // 应该失败的用例
      try {
        const result = renderSpecToFile(t.spec, outFile);
        if (!result) {
          passed++;
          console.log('PASS [校验拒绝] ' + t.name);
        } else {
          failed++;
          failures.push({ name: t.name, reason: '应该校验失败但通过了' });
          console.log('FAIL [校验拒绝] ' + t.name + ' — 应该失败但通过了');
        }
      } catch (e) {
        passed++;
        console.log('PASS [校验拒绝] ' + t.name);
      }
    } else {
      // 应该通过的用例
      try {
        const result = renderSpecToFile(t.spec, outFile);
        if (!result) {
          failed++;
          failures.push({ name: t.name, reason: '渲染失败' });
          console.log('FAIL [渲染] ' + t.name + ' — 渲染失败');
          continue;
        }

        const html = fs.readFileSync(outFile, 'utf-8');
        const opt = extractOption(html);
        t.check(opt);
        passed++;
        console.log('PASS ' + t.name);

        // 清理临时文件
        try { fs.unlinkSync(outFile); } catch(e) {}
      } catch (e) {
        failed++;
        failures.push({ name: t.name, reason: e.message });
        console.log('FAIL ' + t.name + ' — ' + e.message);
      }
    }
  }

  console.log('\n=== 测试摘要 ===');
  console.log('总计: ' + TESTS.length);
  console.log('通过: ' + passed);
  console.log('失败: ' + failed);

  if (failures.length > 0) {
    console.log('\n失败详情：');
    failures.forEach(f => console.log('  - ' + f.name + ': ' + f.reason));
    process.exit(1);
  } else {
    console.log('\n全部通过！');
  }
}

runTests();
