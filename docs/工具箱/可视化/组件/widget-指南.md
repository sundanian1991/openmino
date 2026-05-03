# Widget 设计指南 — 完整参考

> 来源：generative-ui-widget 系统内置设计指南（chart / diagram / interactive / dashboard / art 五模块）
> 整理时间：2026-04-27
> 用途：AI 读此文档即可稳定出图，无需再查原始 widget design system

---

## 一、总览

Widget 是在对话消息流中内嵌渲染的 HTML 片段。它运行在沙箱 iframe 中，由 `<generative-ui-widget>` 标签包裹。

**核心定位**：视觉在 widget 标签内，解释文字在标签外。

**唯一风格：Flat**。无渐变、无阴影、无模糊、无发光、无 3D。原因是流式渲染时这些效果会闪烁崩坏。但 Flat 内通过色阶选择和留白量可以做出从"极简数据"到"温暖叙事"的不同调性。

---

## 二、输出格式

```
解释文字写在标签外面...

<generative-ui-widget>
<style>
  /* 短、≤15 行，元素出现即有样式 */
</style>
<div class="widget">
  <!-- SVG、canvas、HTML 内容 -->
</div>
<script>
  // 交互逻辑，流式完成后执行
</script>
</generative-ui-widget>

更多解释文字...
```

**流式渲染顺序**：style 先 → HTML 中间 → script 最后。

**约束**：
- 不允许 `<!DOCTYPE>`、`<html>`、`<head>`、`<body>`
- 单个 widget ≤ 4000 字符，超过拆多个
- 可在一次回复中输出多个 widget，与文字穿插
- **回答文字和大型 widget 不要混在同一条回复**，会导致渲染截断乱码。先出图，文字放后面简短补充

---

## 三、硬约束（不可违反）

| 约束 | 原因 |
|------|------|
| 禁止渐变、阴影、模糊、发光 | 流式渲染闪烁 |
| 禁止动画 | Chart.js 设 `animation: false` |
| 禁止 fetch / ajax / WebSocket | CSP 禁止网络请求 |
| 禁止 position:fixed | iframe 高度自适应 |
| 禁止 display:none / tab / carousel | 流式渲染崩溃 |
| 禁止 700+ 字重 | 只有 400（常规）和 600（半粗） |
| 禁止 emoji | 用 SVG 或 CSS 替代 |
| 禁止 HTML/CSS 注释 | 浪费 token、破坏流式 |
| 最小字号 11px | 可读性 |
| 响应式 | 百分比宽度，SVG 用 viewBox，最小 300px |
| 数据必须内联 | 网络被 CSP 阻断 |

---

## 四、色彩体系

### 4.1 七组色阶（7 Ramps × 7 Stops）

| Ramp | 50 | 100 | 300 | 500 | 700 | 800 | 900 |
|------|------|------|------|------|------|------|------|
| **Warm** 暖橙 | #faf0e6 | #f0d9bf | #d4a574 | #c26d3a | #8b4513 | #6b3410 | #4a2409 |
| **Teal** 青碧 | #e6f5f0 | #b3e0cf | #5dbf9e | #2e8b6e | #1a6b50 | #0f5040 | #04342c |
| **Coral** 珊瑚 | #faeae5 | #f0bfad | #e08060 | #c25030 | #8b3018 | #6b2010 | #4a150a |
| **Sage** 鼠尾草 | #f0f2ec | #d4dbc8 | #a3b08a | #6f8660 | #4a6040 | #3a4a30 | #2a3520 |
| **Stone** 石灰 | #f2f0eb | #d6d2c9 | #ada599 | #857d74 | #5f5a54 | #454240 | #2e2c2a |
| **Sky** 天蓝 | #e8f1fa | #b8d4f0 | #70a8d8 | #3a7ab8 | #1a5a90 | #0e4070 | #052a4a |
| **Amber** 琥珀 | #faf0dc | #f0d68a | #daa830 | #b88018 | #8a5a0a | #6a4005 | #4a2a02 |

### 4.2 色阶用途

| Stop | 用途 | 说明 |
|------|------|------|
| 50 | 大面积底色 | 卡片背景、区块底色、微妙底色（60% 透明度更柔和） |
| 100 | 浅色填充 | 次要柱形、辅助色块、浅色标签 |
| 300 | 中间色 | 连线、次要节点描边、分段条 |
| 500 | 点缀/描边 | 核心元素描边、按钮、标签、强调色 |
| 700 | 深色文字 | 色块上的标题、节点标题 |
| 800 | 深色文字（备选） | 同上，更深的选项 |
| 900 | 极少使用 | 仅用于深色主题或极端对比 |

### 4.3 色块内文字规则

| 底色 | 文字颜色 |
|------|----------|
| 50 / 100 浅色底 | 同 ramp 的 700 或 800 |
| 300 中间底 | 白色 `#fff` |
| 500 及以上深色底 | 白色 `#fff` |
| 纯黑 | 禁止，永远不要在色块上用纯黑文字 |

### 4.4 组合规则

| 规则 | 说明 |
|------|------|
| 单图最多 3 个 ramp | 超过 3 种色系失去风格 |
| 默认 2 个 ramp | 年老师偏好：主色 + Stone 灰 |
| 先用单 ramp 深浅 | 同一 ramp 的 50→300→500→800 已够表达主次 |
| 跨 ramp 需语义理由 | 无语义理由不跨色 |
| 先灰后彩 | 所有元素先灰（Stone），再用主色突出 1-2 个核心元素 |
| 颜色编码意义 | 不按彩虹轮播，每种颜色有语义指派 |

### 4.5 语义指派

| Ramp | 语义 | 典型场景 |
|------|------|----------|
| Warm | 主色 / 高值 / 默认 | 大部分可视化 |
| Stone | 中性 / 参考 / 基准线 | 背景数据、对比基线 |
| Teal | 正面 / 增长 / 目标 | 达成率、同比增长 |
| Coral | 负面 / 下降 / 预警 | 未达标、投诉率 |
| Sage | 稳定 / 持平 | 无显著变化的数据 |
| Sky | 信息 / 通知 | 备注说明、信息标注 |
| Amber | 警示 / 注意 | 需关注但未恶化 |

### 4.6 Chart.js 颜色 hex 值

Canvas 不支持 CSS 变量，必须用 hex：

| Ramp | borderColor | backgroundColor |
|------|-------------|-----------------|
| Warm | `#c26d3a` | `rgba(194,109,58,0.1)` |
| Teal | `#2e8b6e` | `rgba(46,139,110,0.1)` |
| Coral | `#c25030` | `rgba(194,80,48,0.1)` |
| Sky | `#3a7ab8` | `rgba(58,122,184,0.1)` |
| Amber | `#b88018` | `rgba(184,128,24,0.1)` |
| Stone | `#857d74` | `rgba(133,125,116,0.1)` |

---

## 五、CSS 变量

Widget 沙箱提供自动 light/dark 适配的 CSS 变量。非 canvas 场景优先用变量，不硬编码颜色。

### 布局变量

| 变量 | 用途 |
|------|------|
| `--widget-text` | 主文字 |
| `--widget-text-secondary` | 次要/弱化文字 |
| `--widget-text-muted` | 提示/最弱文字 |
| `--widget-bg` | 主背景（widget 内透明） |
| `--widget-bg-elevated` | 卡片/凸起表面背景 |
| `--widget-bg-inset` | 凹陷/输入框背景 |
| `--widget-border` | 默认边框（10% 透明度） |
| `--widget-border-strong` | 悬停/强调边框（18% 透明度） |
| `--widget-accent` | 强调色（按钮、链接、高亮） |
| `--widget-accent-subtle` | 8% 强调色背景 |
| `--widget-radius` | 默认圆角（10px） |

### 语义变量

| 变量 | 用途 |
|------|------|
| `--widget-success` / `--widget-success-bg` | 成功 |
| `--widget-error` / `--widget-error-bg` | 错误 |
| `--widget-warning` / `--widget-warning-bg` | 警告 |
| `--widget-info` / `--widget-info-bg` | 信息 |

---

## 六、字体与排版

| 规则 | 说明 |
|------|------|
| 字体栈 | `system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif` |
| 只用两个字重 | 400（常规）和 600（半粗） |
| 标题 | 600，13-15px |
| 正文/副标题 | 400，11px |
| 指标数字 | 600，16-22px |
| 脚注/辅助 | 400，11px |
| 最小字号 | 11px |

---

## 七、布局工具类

Widget 沙箱预置的 CSS 类，直接使用：

| 类名 | 作用 |
|------|------|
| `.flex` / `.flex-col` | 弹性布局 |
| `.grid` / `.grid-2` / `.grid-3` / `.grid-4` | 网格布局 |
| `.gap-2` / `.gap-3` / `.gap-4` / `.gap-6` | 间距 |
| `.p-2` / `.p-3` / `.p-4` | 内边距 |
| `.w-full` | 宽度 100% |
| `.text-center` | 文字居中 |
| `.rounded` / `.rounded-lg` | 圆角 |
| `.border` | 边框 |
| `.bg-elevated` / `.bg-inset` | 背景层级 |
| `.text-muted` / `.text-secondary` / `.text-accent` | 文字颜色 |

---

## 八、组件规格

### 8.1 预置表单元素

原生 `<input>`、`<button>`、`<select>`、`<textarea>`、`<input type="range">` 自动美化，无需额外样式。

- 按钮加 `class="primary"` 获得强调色
- 滑块用 `accent-color: var(--widget-accent)` 控制颜色

### 8.2 卡片

| 属性 | 值 |
|------|------|
| 背景 | `var(--widget-bg-elevated)` |
| 边框 | `1px solid var(--widget-border)` |
| 圆角 | `var(--widget-radius)`（10px） |
| 内边距 | 14-16px |

### 8.3 按钮

| 类型 | 背景 | 文字 | 圆角 | 内边距 | 字号/字重 |
|------|------|------|------|--------|-----------|
| Primary | `var(--widget-accent)` | 白色 | 8px | 8px 16px | 13px / 600 |
| Secondary | `var(--widget-bg-inset)` | `var(--widget-text)` | 8px | 8px 16px | 13px / 400 |

### 8.4 输入框

| 属性 | 值 |
|------|------|
| 背景 | `var(--widget-bg)` |
| 边框 | `1px solid var(--widget-border)` |
| 聚焦边框 | `var(--widget-accent)` |
| 圆角 | 8px |
| 内边距 | 8px 12px |
| 字号 | 13px |

### 8.5 标签 Badge

| 属性 | 值 |
|------|------|
| 背景 | `var(--widget-bg-inset)` |
| 文字 | `var(--widget-text-secondary)` |
| 内边距 | 4px 10px |
| 圆角 | 9999px |
| 字号 | 11px |

### 8.6 指标卡

| 属性 | 值 |
|------|------|
| 类名 | `.stat-card` + `.stat-value` + `.stat-label` |
| 数字 | 16-22px，字重 600 |
| 标签 | 11px，字重 400 |

### 8.7 开关 Toggle

| 属性 | 值 |
|------|------|
| 尺寸 | 40 × 22px |
| 关闭 | `var(--widget-border)` 底色 |
| 开启 | `var(--widget-accent)` 底色 |
| 旋钮 | 白色圆形 |

---

## 九、图表（Chart.js）

### 9.1 完整工作模板

```
<div style="position:relative;width:100%;height:300px"><canvas id="c"></canvas></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" onload="init()"></script>
<script>
var chart;
function init(){
  chart=new Chart(document.getElementById('c'),{
    type:'line',
    data:{labels:['Jan','Feb','Mar','Apr','May'],datasets:[{
      data:[30,45,28,50,42],
      borderColor:'#c26d3a',
      backgroundColor:'rgba(194,109,58,0.1)',
      fill:true,tension:0.3
    }]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{y:{grid:{color:'rgba(0,0,0,0.06)'}},x:{grid:{display:false}}}}
  });
}
if(window.Chart)init();
</script>
```

### 9.2 规则

- 高度写在 wrapper div 上，设 `responsive:true`、`maintainAspectRatio:false`
- 柱状图 `borderRadius:6`，折线图 `tension:0.3`
- CDN 加载模式：`onload="init()"` + `if(window.Lib)init();` 回退
- 多图用唯一 canvas ID（c1、c2...）
- 所有显示数字四舍五入

### 9.2.1 出图审美方法（年老师验证）

> 不是固定风格，是视觉叙事逻辑。

1. **先灰后彩** — 所有数据先画灰色(Stone)，只给 1-2 个关键点/段加颜色
2. **标注讲故事** — 标原因不标数字："04/15 新系统上线 → 效率↑37%"
3. **彩色 ≤10%** — 大面积灰色 + 小面积彩色，让关键信息自己跳出来
4. **实线 vs 虚线** — 实线=实际/已发生，虚线=预测/目标/基准
5. **数字要大** — 核心 18-22px/600，其他 11-13px/400
6. **按内容选形式** — 折线图、柱状图、指标卡各有适合的叙事方式，不固定一种

### 9.3 交互控件必须更新图表

控件修改数据后必须调用 `chart.update()`。

### 9.4 指标仪表盘模式

指标卡在上，图表在下。用 `.stat-card` / `.stat-value` / `.stat-label` 预置类。

### 9.5 数字格式

- 用 `Intl.NumberFormat` 做本地化
- 大数缩写：1,234,567 → 1.2M

---

## 十、图形（SVG）

### 10.1 SVG 设置

- `<svg width="100%" viewBox="0 0 680 H">` — 680px 固定宽度，H 按内容调整 +40px 缓冲
- 字体：system-ui
- 用 `<defs>` 定义 marker，一个 SVG 一个 `<defs>`
- 每个 widget 一个 SVG

### 10.2 箭头 Marker

```
<defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5"
  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
  <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</marker></defs>
```

### 10.3 节点样式

| 属性 | 值 |
|------|------|
| 填充 | 色阶 50 |
| 描边 | 色阶 500，1.5px |
| 圆角 | rx=12 |
| 标题 | 13px，字重 600，色阶 800 |
| 副标题 | 11px，色阶 700 |
| 节点宽度 | ≥ 字符数 × 8 + 40px |
| 副标题字数 | ≤ 5 词 |

### 10.4 连线

| 属性 | 值 |
|------|------|
| 描边 | 1.5px，色阶 300 |
| 路径 | 曲线（cubic bezier）优先 |
| 箭头 | `marker-end="url(#a)"` |
| 标签 | 10px，色阶 600 |

### 10.5 图形类型

| 类型 | 何时用 | 关键模式 |
|------|--------|----------|
| 流程图 | "流程"、"步骤"、"过程" | 节点左→右或上→下，直箭头 |
| 时间线 | "历史"、"演变"、"阶段" | 水平轴 + 事件标记，标注交错上下 |
| 层次图 | "架构"、"树"、"组织" | 根在上，子节点在下，垂直箭头 |
| 分层堆叠 | "层次"、"栈"、"架构" | 全宽水平带，每带内放元素 |
| 循环图 | "循环"、"反馈"、"生命周期" | 3-5 节点圆形排列，曲线箭头 |
| 对比图 | "对比"、"vs"、"并排" | 两组平行排列，行对齐 |
| 四象限 | "矩阵"、"2×2"、"分类" | 两轴 + 四色块 |

### 10.6 复杂度预算

- 每行 ≤4 节点，≤5 层
- ≤3 色 ramp
- 箭头不得穿过无关节点

---

## 十一、交互模式

### 11.1 交互解释器

用于："解释 X 怎么工作"、"展示 Y 的原理"

结构：控件（滑块/输入/开关）在上或左 → 可视化（图表/SVG）实时响应 → 关键指标大数字显示 → 用普通对象 + render() 函数管理状态。

### 11.2 对比布局

用于："对比 X 和 Y"、"帮我选"

- 并排卡片网格：`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`
- 每张卡片：`var(--widget-bg-elevated)`，等高，16px 内边距
- 推荐项：2px solid `var(--widget-accent)` 边框
- 特征行：交替 `var(--widget-bg)` / 透明

### 11.3 数据记录

用于："展示联系卡"、"收据"、"记录卡"

- 单卡片，居中，max-width 400px
- 头部：色阶 500 彩条 + 白色文字，12px 16px 内边距
- 字段行：标签（11px，muted）+ 值（13px，普通），8px 行间距

---

## 十二、艺术插图

- 纯 SVG，不用外部图片
- 用色阶颜色，不用随意 hex
- 最小可行细节——暗示而非描绘
- 确保所有形状与背景有足够对比度
- 不放重文字（文字放标签外）

---

## 十三、多 Widget 叙事

复杂主题输出多个 widget，与文字穿插：

1. 概览图（层次/流程图）
2. 文字解释一个方面
3. 细节 widget（循环/图表）
4. 文字 + 定量洞察
5. 交互 Chart.js + 控件

---

## 十四、可用 CDN 库

| 库 | CDN |
|------|------|
| Chart.js | `https://cdn.jsdelivr.net/npm/chart.js` |
| D3.js v7 | `https://cdn.jsdelivr.net/npm/d3@7` |
| Mermaid | `https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js` |
| Lucide | `https://unpkg.com/lucide@latest` |
| 其他 | 任意 `cdn.jsdelivr.net` / `cdnjs.cloudflare.com` / `unpkg.com` / `esm.sh` 包 |

---

## 十五、年老师偏好（已固化）

| 偏好 | 规则 |
|------|------|
| 默认色调 | Warm ramp 暖橙 |
| 默认组合 | Warm + Stone（暖灰） |
| 单图上限 | ≤2 ramp，语义需要时可 3 |
| 先深浅后跨色 | 同 ramp 50→300→500→800 四层先够用 |
| 先灰后彩 | Stone 灰底 → Warm 突出 1-2 个核心 |
| 多色失风格 | 3 个以上 ramp 在同一图内失去审美价值 |
