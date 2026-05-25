---
name: mck-chart-render
description: 麦肯锡图表渲染 — 三段式：维度枚举多选 → 设计稿确认 → 批量渲染。支持 18 种策略图表类型。
argument-hint: "[数据文件路径 或 粘贴数据]"
---

# mck-chart-render

读取数据文件（CSV/TSV），智能推荐图表类型，生成麦肯锡风格 HTML 图表文件，双击即可在浏览器中查看和导出。

## 触发场景

- "用这个数据做个图表"、"做个柱状图"、"生成图表"
- "麦肯锡图表"、"mck chart"
- 用户提供数据文件 + 想要可视化的意图
- viz-design 流程下游：收到 spec 后生成实际图表

## 执行流程

### 总览：三段式工作流

```
数据输入 → Step 1: 维度枚举+多选确认 → Step 2: 设计稿预览+调整 → Step 3: 批量渲染输出
```

两个确认点（选图 + 设计稿），渲染前锁死方向，避免返工。

### Step 1: 读取数据 + 维度枚举

**1a. 读取数据**
- 用户提供数据文件路径（CSV/TSV）或直接粘贴数据
- 解析数据：表头 + 数据行，识别列类型（文本列/数值列）
- Excel 数据提示用户先导出 CSV 或直接复制粘贴

**1b. 维度穷举**
- 基于规则表穷举该数据能做的所有图表维度
- 每个维度 = 图表类型 + 叙事角度（这个图回答什么问题）
- 从穷举结果中筛选 3-5 个最有价值的维度

**1c. AskUserQuestion 多选确认**
- 用 `AskUserQuestion` 工具展示维度选项
- 选项格式：`图表类型 — 一句话（这个图看什么）`
- `multiSelect: true`，用户可勾选 1-N 个
- 用户确认后进入 Step 2

**通道 A 快捷路径**：用户给数据时已明确指定图表类型（"做个柱状图"、"用瀑布图拆解成本"）→ 跳过枚举，直接进入 Step 2。

**维度枚举示例**：

数据 `供应商, 5月绩效, 4月绩效, 目标值, 同比变化%`，枚举出：
- bar — 5月绩效排名：谁领先谁落后
- grouped_bar — 5月 vs 4月环比：谁改善谁退步
- variance — 实际 vs 目标达成：差距一目了然
- line_bar — 绩效绝对值 + 同比增速双维对比
- radar — 多指标综合能力对比

**规则表（维度枚举依据）**：

| 数据特征 | 推荐图表 | 列要求 |
|---------|---------|--------|
| 1 文本 + 1 数值，≤10 行 | bar（柱状图） | 类别, 值 |
| 1 文本 + 1 数值，需要占比 | pie（饼图） | 类别, 值 |
| 1 文本 + 2 数值（量级差异大） | line_bar（组合图） | 类别, 柱形值, 折线值 |
| 1 文本 + 2+ 数值（同量级） | grouped_bar（分组柱形） | 类别, 系列1, 系列2... |
| 1 文本 + 2+ 数值（需要看构成） | stacked（堆叠柱状） | 类别, 系列1, 系列2... |
| 1 文本 + 2 数值（实际vs目标） | variance（差值箭头） | 类别, 实际, 预算 |
| 1 文本 + 2 数值（双群体对比） | butterfly（蝴蝶图） | 类别, 左, 右 |
| 1 文本 + 2+ 数值 + 时间趋势 | area_stacked（堆叠面积） | 时间, 系列1, 系列2... |
| 1 文本 + 2 数值（相关性） | scatter（散点图） | 名称, X值, Y值 |
| 1 文本 + 3 数值（气泡） | bubble_grouped（气泡图） | 名称, X, Y, 大小 |
| 1 文本 + 3 数值（定位矩阵） | portfolio（气泡矩阵） | 名称, 份额%, 增长%, 规模 |
| 3 列：来源, 去向, 值 | sankey（桑基图） | 来源, 去向, 值 |
| 表头含"指标" + 多列主体 | radar（雷达图） | 指标, 主体1, 主体2... |
| 3 列层级结构 | sunburst（旭日图） | 层级1, 层级2, 值 |
| 用户说"SWOT" | swot（SWOT矩阵） | 纯文本 S/W/O/T |
| 1 文本 + 1 数值（漏斗） | funnel（漏斗图） | 阶段, 值 |
| 层级结构 | tree（树图） | 父节点, 子节点, 值 |
| 1 文本 + 1 数值（金字塔） | pyramid（金字塔图） | 层级, 值 |
| 1 文本 + 2 数值（四象限） | quadrant（四象限图） | 名称, X值, Y值 |
| 1 文本 + 2 数值（子弹图） | bullet（子弹图） | 指标, 实际, 目标 |

### Step 2: 设计稿预览

用户确认图表选择后，**一次性输出所有图的设计稿**。用户扫一遍，标记要改的，批量调整。

**设计稿格式**（每张图一个块）：

```
---

### 图 N：{图表类型} — {一句话主题}

**标题**：{结论性标题}
**副标题**：{时间范围 + 数据对象}
**图表类型**：{chart_type}
**颜色主题**：mckinsey

**核心判断（takeaway）**：{一句话，图表要传递的核心结论}

**标注**：
- markLine: 目标值 XX，颜色 #C62828（有明确参照标准时才列出）
- markPoint: 最大值 XX（需强调特定数据点时才列出）

**CSV 数据**（可复制粘贴到原版工具）：
\`\`\`
{列1},{列2}
{值1},{值2}
\`\`\`

**参数建议**：
- 画布：1200×700
- Y轴起始：{0 / 自动}
- 柱体宽度：{按行数自动}
- 数值标签：{显示 / 关闭}
---
```

**设计稿规则**：
- CSV 只包含目标图表需要的列（已做数据转换：去千分位、百分号、单位换算）
- takeaway 必须是结论性判断，不是数据描述
- 标注只列实际会用到的，无可参照标准则不列出
- 参数根据数据特征自动配置

**数据转换规则**：
- 保留原始列名（或用户指定的列名）
- 只提取目标图表需要的列（丢弃无关列）
- 数值列确保为数字（去除千分位逗号、百分号等）
- 大数字可做单位转换（如 702511.5 亿元 → 70.3 万亿元）

**参数自动配置规则**：
| 参数 | 自动配置逻辑 |
|------|-------------|
| 画布尺寸 | 默认 1200×700；PPT 用 1920×1080 |
| 标题 | 从用户描述或数据文件名生成（结论性标题） |
| 副标题 | 自动生成：时间范围 + 数据对象 |
| Y 轴起始 | 柱状图类 → 0；折线/散点 → 自动 |
| 柱体宽度 | 数据行数 ≤5 → 50%；6-10 → 40%；>10 → 30% |
| 数值标签 | 数据行数 ≤8 → 显示；>8 → 关闭 |
| 图例位置 | 系列数 ≤2 → 右上；>2 → 底部居中 |
| X 轴旋转 | 标签最大长度 >5 字 → 45° |

**用户反馈处理**：
- 用户可能调整标题、takeaway、标注、CSV 数据等
- 只修改被标记的图，其他图保持原样
- 调整后重新输出该图设计稿确认，或确认无误后进入 Step 3

### Step 3: 批量渲染输出

所有设计稿确认后，逐图注入原版工具生成 HTML。

**渲染流程**：
1. 复制原版工具 `projects/麦肯锡图表/麦肯锡图表.html`
2. 按设计稿确认的参数生成注入脚本
3. 保存到 `workspace/图表-{描述}.html`
4. 用 `open` 命令在浏览器中打开

**多图处理**：并行生成所有 HTML，一次性 `open` 全部打开。

#### 注入脚本模板

**不自己写 HTML**。复制原版工具，在 `</body>` 前注入 `<script>` 块，用 `window.addEventListener('load', ...)` 执行。

```html
<script>
// 不能用 window.onload 链式模式 —— 原模板的 loadTemplate() 绑在 window.onload 上，
// 链式执行 _origOnload() 时会触发 loadTemplate()，把 dataInput 覆盖回模板默认数据并立即渲染
window.addEventListener('load', function() {

  // 1. 填充数据（逗号分隔或 Tab 分隔均可）
  var dataBox = document.getElementById('dataInput');
  if (dataBox) {
    dataBox.value = '年份,GDP(万亿元),增长率(%)\n2015,70.3,7.0\n2016,76.1,6.8';
  }

  // 2. 选择图表类型（下拉框 value 值）
  var typeSelect = document.getElementById('chartType');
  if (typeSelect) {
    typeSelect.value = 'line_bar';
  }

  // 3. 填充叙事层参数
  var titleInput = document.getElementById('chartTitle');
  if (titleInput) titleInput.value = '2015-2024 中国 GDP 总量与增速';

  var subtitleInput = document.getElementById('chartSubtitle');
  if (subtitleInput) subtitleInput.value = '数据来源：国家统计局';

  var footnoteInput = document.getElementById('chartFootnote');
  if (footnoteInput) footnoteInput.value = '注：GDP 按当年价格计算';

  var sourceInput = document.getElementById('dataSource');
  if (sourceInput) sourceInput.value = '国家统计局';

  // 4. 颜色主题
  var themeSelect = document.getElementById('colorTheme');
  if (themeSelect) themeSelect.value = 'mckinsey';

  // 5. 风格学派
  var styleSelect = document.getElementById('styleSchool');
  if (styleSelect) styleSelect.value = 'mckinsey';

  // 6. 标注 JSON
  var annotInput = document.getElementById('annotations');
  if (annotInput) annotInput.value = '[{"type":"markLine","value":100,"label":"100万亿","color":"#C62828"}]';

  // 7. 参考线（每行：值,标签,线型,颜色）
  var refInput = document.getElementById('refLines');
  if (refInput) refInput.value = '100,目标值,dashed,#C62828';

  // 8. 解读文字（留空：由 ECharts graphic 在底部渲染）
  var takeawayInput = document.getElementById('chartTakeaway');
  if (takeawayInput) takeawayInput.value = '';
  var TAKEAWAY_TEXT = '核心判断：GDP 增速放缓但总量持续扩大';

  // 8b. 数据来源（留空：由 ECharts graphic 在底部与 takeaway 并排渲染）
  var SOURCE_TEXT = sourceInput.value;
  sourceInput.value = '';

  // 9. 背景色
  var bgSelect = document.getElementById('bgColor');
  if (bgSelect) bgSelect.value = '#FFFFFF';

  // 10. 显示原始数据表
  var tableCheck = document.getElementById('showDataTable');
  if (tableCheck) tableCheck.checked = true;

  // 11. 标题对齐默认居中（防止与轴标题/数据来源冲突）
  var alignSelect = document.getElementById('titleAlign');
  if (alignSelect) alignSelect.value = 'center';

  // 12. 触发渲染（原版工具无刷新按钮 ID，直接调用 renderChart）
  if (typeof renderChart === 'function') {
    renderChart(true);
  }

  // 13. 全量间距规划（自上而下标准化）
  // 清除模板渲染的 DOM 脚注（改用 ECharts graphic）
  var _chartCard = document.getElementById('chartCard');
  if (_chartCard) {
    var _fn = _chartCard.querySelector('.chart-footnote-area');
    if (_fn) _fn.remove();
  }

  // 渲染为 ECharts graphic 文本 + 网格间距调整
  if (typeof chartInstance !== 'undefined' && chartInstance !== null) {
    var _graphics = [];
    // Source: 左下（X 轴上方，与轴标签之间留空隙）
    _graphics.push({
      type: 'text', z: 100,
      left: 80, bottom: 115,
      style: {
        text: SOURCE_TEXT,
        fontSize: 11, fill: '#A3A29B',
        textAlign: 'left'
      }
    });
    // Takeaway: 右下
    if (TAKEAWAY_TEXT) {
      _graphics.push({
        type: 'text', z: 100,
        left: 80, bottom: 97,
        style: {
          text: TAKEAWAY_TEXT,
          fontSize: 10, fill: '#C5C4BE',
          textAlign: 'left'
        }
      });
    }
    chartInstance.setOption({
      xAxis: { axisLabel: { margin: 32 } },
      graphic: _graphics,
      grid: { top: 88, bottom: 130, left: 80, right: 80 }
    });
  }

  // 14. 数据表间距标准化
  var _dt = document.querySelector('.chart-data-table-area');
  if (_dt) _dt.style.cssText = 'padding: 4px 60px 16px; font-family: Inter, "PingFang SC", sans-serif;';
};
});
</script>
```

#### DOM ID 映射

| 参数 | DOM ID | 类型 |
|------|--------|------|
| 数据 | `dataInput` | textarea |
| 图表类型 | `chartType` | select |
| 标题 | `chartTitle` | input |
| 副标题 | `chartSubtitle` | input |
| 解读文字 | `chartTakeaway` | textarea |
| 脚注 | `chartFootnote` | textarea |
| 数据来源 | `dataSource` | input |
| 颜色主题 | `colorTheme` | select |
| 风格学派 | `styleSchool` | select |
| 标注 | `annotations` | textarea |
| 参考线 | `refLines` | textarea |
| Y轴标题 | `yAxisName` | input |
| X轴标题 | `xAxisName` | input |
| 正面色 | `semanticPositive` | color |
| 负面色 | `semanticNegative` | color |
| 基准色 | `semanticNeutral` | color |
| 背景色 | `bgColor` | select |
| 显示数据表 | `showDataTable` | checkbox |
| 刷新触发 | `renderChart(true)` | JS 函数调用 |

**为什么用注入法而非独立 HTML**：
- 保持与原版工具完全一致的渲染逻辑和交互能力
- 用户生成的文件可以继续在原版工具中手动调整
- 18 种图表类型的 build 函数无需重新实现
- 叙事层（副标题/脚注/标注/主题）由原版工具统一处理

#### 输出格式

```
图表已生成：workspace/图表-{描述}.html

CSV 数据（可粘贴到原版工具）：
--- 分隔线 ---
年份,GDP(万亿元),增长率(%)
2015,70.3,7.0
...
--- 分隔线 ---

推荐参数：
- 图表类型：折线+柱形组合图
- 画布：1200×700
- 标题：2015-2024 中国 GDP 总量与增速
- Y轴起始：0（柱形）/ 自动（折线）
- 柱体宽度：40%
```

## 麦肯锡图表模板参考

完整模板见 `projects/麦肯锡图表/麦肯锡图表.html`。关键代码段：

**ECharts CDN**：`https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js`

**字体**：Inter（Google Fonts）

**导出 4K PNG**：
```javascript
chartInstance.getDataURL({ type: 'png', pixelRatio: 4, backgroundColor: '#fff' })
```

**导出 SVG**：
```javascript
// 使用隐藏容器 + SVG 渲染器
const svgChart = echarts.init(container, null, { renderer: 'svg' });
svgChart.setOption(option);
const svgData = svgChart.getDataURL({ type: 'svg' });
```

## 重要规则

- **三段式流程 — 渲染前必须经过两个确认点** — Step 1 维度多选（AskUserQuestion）+ Step 2 设计稿确认，两个确认点都通过后才进入 Step 3 渲染。禁止跳过设计稿直接渲染
- **设计稿批量输出，逐条确认** — Step 2 一次性输出所有图的设计稿，用户扫一遍标记要改的，批量调整后进入 Step 3
- **通道 A 快捷路径** — 用户明确指定图表类型时跳过 Step 1 枚举，直接出设计稿
- **用原版工具注入，不自己写 HTML** — 复制 `projects/麦肯锡图表/麦肯锡图表.html` + JS 注入，保持渲染一致性
- **数据硬编码** — 不做 fetch，所有数据内联在注入脚本中
- **画布尺寸必须可配置** — 汇报用大尺寸，邮件用小尺寸
- **双 Y 轴时右侧轴不显示网格线** — 避免干扰
- **柱状图 Y 轴起始必须为 0** — 汇报铁律
- **瀑布图末行值填 0** — 工具自动计算总量
- **参考线格式** — 每行 `值,标签,线型,颜色`，自动跳过不支持 markLine 的图表类型（pie/radar/treemap/funnel/gauge/sunburst/tree/pyramid/sankey）
- **语义色在 build 之前覆盖** — semanticPositive/Negative/Neutral 必须在图表构建函数调用前生效
- **数据表默认显示** — 注入脚本中建议 `showDataTable.checked = true`，图表下方自动展示原始数据
- **注入时序强制 — 用 addEventListener 而非链式调用** — 使用 `window.addEventListener('load', function() { ... })`，不要用 `var _origOnload = window.onload; window.onload = function() { ... }` 链式模式。原模板的 `loadTemplate()` 绑在 `window.onload` 上，链式执行 _origOnload() 会触发 loadTemplate() 把 dataInput 覆盖回模板默认数据并立即渲染，导致注入的数据失效
- **标题对齐默认居中** — `titleAlign` select 默认值设为 `center`，防止左对齐时图表标题与轴标题/数据来源文字重叠。除非汇报场景明确需要左对齐，否则用居中

## 叙事层布局标准

图表卡片（chartCard）内按 5 层布局，自上而下。间距用 `grid.{top|bottom}` + `graphic{left|right|bottom}` 统一控制。

```
┌─ chartCard ────────────────────────────────────┐
│                                                  │
│  [ECharts Canvas]                                │
│    L1 Title (20px bold, center, top=20)          │
│        间距 6px                                  │
│    L1 Subtitle (12px gray, center)               │
│        间距 ~30px（含缓冲）                       │
│    ┌─ 图表绘制区域 grid ─────────────────────┐   │
│    │  grid: top=88, bottom=130,              │   │
│    │        left=80, right=80                │   │
│    └─────────────────────────────────────────┘   │
│        间距 15px（buffer）                       │
│    L4 数据来源 (11px, gray, left)                │  ← graphic bottom:115
│        间距 8px                                  │
│    L2 解读文字 (10px, lighter, left)             │  ← graphic bottom:97（注脚风格）
│    X 轴标签 (axisLabel.margin: 32, 11px)         │
│        间距（含 nameGap）                         │
│    X 轴名称 (12px)                                │
│                                                  │
│  [DOM 元素，共享 80px 左右 padding]                │
│    L5 原始数据表 (optional)                       │
│        4px top / 16px bottom                     │
│                                                  │
│  Watermark                                       │
└──────────────────────────────────────────────────┘
```

**关键规则**：
- **副标题不含"数据来源："** — 数据来源信息归到底部 L4，不在 L1 重复
- **数据来源与解读文字底部并排** — L4 数据来源（左）+ L2 解读文字（右）渲染为 ECharts graphic 文本，`bottom: 115`。不走 renderChart 的 DOM 输入框（输入框均留空，通过变量传递文本）
- **取齐边距** — graphic text 的 left/right 与 grid 一致（60px）
- **间距冗余原则** — grid 边距 > 内容实际所需，预留 15-30px 缓冲。避免元素紧贴 grid 边界
- **清除模板 DOM 脚注** — renderChart 默认的 `chart-footnote-area` 被清除，改为 ECharts graphic 渲染
- **轴标签间距** — `axisLabel.margin: 32` 将 X 轴标签推后，为 graphic 文本留出空间
- **注入脚本后覆盖** — renderChart 以 inline style 创建 DOM 元素，需要在 `renderChart()` 之后用 `style.cssText` 覆盖为标准值

**间距规划要点**（自上而下以 canvas 顶部为基准）：

| 区域 | 位置 | 说明 |
|------|------|------|
| Title | `top: 20` (ECharts title) | 20px 留白后开始标题 |
| Subtitle | title 下方 6px | 12px 灰色 |
| Grid top | `grid.top: 88` | subtitle 底部约在 56px，缓冲 32px |
| Grid left/right | `grid.left: 80, right: 80` | 左右对称，为轴名称和数据标签留空间 |
| Grid bottom | `grid.bottom: 130` | 留出约 70px 给底部叙事+轴标签+轴名称 |
| 数据来源 | `graphic.bottom: 115` | X 轴上方，与 grid 底线间隔 15px |
| 解读文字 | `graphic.bottom: 97` | 在 source 下方 8px，10px 浅灰注脚 |
| X 轴标签 | `axisLabel.margin: 32` | 在文本下方 8px 处开始 |
| X 轴名称 | name 默认位置 | 标签下方，自动排布 |

图表叙事层由 4 组元素构成，按优先级分层：

| 层级 | 元素 | 始终使用 | 用途 |
|------|------|---------|------|
| **L1 — 必填** | 标题、副标题、数据来源 | 是 | 基本信息，每张图表必填 |
| **L2 — 核心判断** | 解读文字（takeaway） | 是 | 图表要传递的核心结论，1 句话 |
| **L3 — 参考线（markLine）** | 阈值/标杆/目标线 | 仅数据有明确参照标准时 | 如：国家二级标准 35、目标值 100、行业平均 |
| **L4 — 高亮标注（markPoint）** | 最大值/最小值/异常点 | 仅需强调特定数据点时 | 如：峰值、谷值、超出阈值点 |

**何时用参考线**：
- 数据存在外部可验证的阈值（法规标准、行业基准、年度目标）
- 数据存在内部的锚点值（预算、预测、历史均值）
- 当阈值只有一个时：注入 `refLines` 文本框
- 当阈值有多个或涉及 X 轴时：用 `annotations` JSON 数组

**何时不用参考线**：
- 数据本身就是最终形态（如排名、分类对比），无需外部参照
- 解读文字已明确表达判断，再加线是视觉冗余

**何时用高亮标注**：
- 需要突出最佳/最差/异常值
- 数据点超出参考线范围
- 单个数据点有特别故事

**何时不用高亮标注**：
- 所有数据点同等重要
- 解读文字已概括整体趋势，无需个体聚焦

## 供应商管理常用场景

| 场景 | 图表 | 数据列 |
|------|------|--------|
| 绩效排名 | bar（降序） | 供应商, 得分 |
| YoY 对比 | grouped_bar | 供应商, 2024, 2025 |
| 成本拆解 | waterfall | 项目, 金额 |
| 预算达成 | variance | 供应商, 实际, 预算 |
| 能力对比 | radar | 维度, A, B |
| 市场定位 | portfolio | 供应商, 份额%, 增长%, 规模 |
| 漏斗转化 | funnel | 阶段, 数量 |
| 目标达成 | bullet | 指标, 实际, 目标 |
| 四象限分析 | quadrant | 供应商, X值, Y值 |
| 组织结构 | tree | 父节点, 子节点, 值 |
