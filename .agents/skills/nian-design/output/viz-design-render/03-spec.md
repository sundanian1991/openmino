# Phase 3 · 技术规范（spec.md）

> viz-design 4 阶段工作流 · Phase 3 产出

---

## 全局色板（Stone 系）

| Token | 色值 | 用途 |
|---|---|---|
| stone-50 | #FAFAF8 | 背景 |
| stone-100 | #F5F5F0 | 表面 raised |
| stone-200 | #E5E5E0 | 边框 |
| stone-400 | #A0A0A0 | 弱化文字 |
| stone-600 | #6B6B6B | 次要文字 |
| stone-900 | #2C2C2C | 深色背景/正文 |
| olive-500 | #4A5D3A | 强调/可行动 |
| earth-500 | #8B7355 | 暖色填充 |
| coral-500 | #E55B2B | 警示/红框 |
| yellow-500 | #FFD100 | 数据高亮 |

## ECharts 全局配置

```js
{
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, sans-serif', color: '#1A1A1A' },
  title: { textStyle: { fontFamily: 'Playfair Display, serif', fontWeight: 300 } }
}
```

## 图 1 · KPI 仪表盘

- 不用 ECharts，用纯 HTML 4 列网格
- 字体 JetBrains Mono（数字）+ Inter（标签）
- 颜色状态：红(--coral-500) / 橙(--earth-500) / 橄榄(--olive-500)
- 4 列：2fr 2fr 1fr 1fr 非对称

## 图 2 · 水平条形（S/A/B/C）

- ECharts horizontal bar
- 4 条数据：[2.2, 23.9, 34.8, 39.1]
- 零基线 ✓
- C 高亮珊瑚橙，S/A/B 灰阶

## 图 3 · 热力图（司龄×等级）

- ECharts heatmap
- 4×4 矩阵
- 单调渐变（浅橄榄→深橄榄）
- MOB1-3×C 高亮最深

## 图 4 · 对比表

- 不用 ECharts，用纯 HTML table
- 4 行（外呼天数/GMV/MOB 中位/上线率）
- 外呼天数红框高亮
- monospace 数字

## 图 5 · 水平条形（GMV 深色段）

- ECharts horizontal bar，深色背景
- 4 条：[24, 38, 26, 12]
- S 高亮 --yellow
- 深色主题反转

## 图 6 · 12 人预警名单

- 纯 HTML table
- 12 行
- 7+ 天行 2px 橙左边线
- monospace 数字

## 图 7 · 行动卡片

- 纯 HTML 3 列
- 编号 01/02/03（Playfair Display 48px 橄榄色）
- Inter 文字 + JetBrains Mono 元信息

## 拒绝记录（为什么不是别的）

- 图 2 不用饼图：4 类别饼图角度比较不准确（4 条绝对禁忌）
- 图 3 不用分组条形：4×4 是矩阵关系，不是单维度
- 图 5 不用堆叠条：4 个等级是离散类别，不构成堆叠语义
- 图 6 不用日历热力图：12 人是名单不是时序
