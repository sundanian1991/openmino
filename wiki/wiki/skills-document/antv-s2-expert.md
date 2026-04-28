# AntV S2 多维交叉表格专家技能

> Sources: antv-s2-expert, 2026-04-28
> Raw:[SKILL](../../raw/skills/antv-s2-expert-SKILL.md); [overview](../../raw/skills/antv-s2-expert-00-overview.md); [sheet types](../../raw/skills/antv-s2-expert-01-sheet-types.md); [framework](../../raw/skills/antv-s2-expert-02-framework-bindings.md); [theme](../../raw/skills/antv-s2-expert-03-theme-style.md); [custom cell](../../raw/skills/antv-s2-expert-04-custom-cell.md); [events](../../raw/skills/antv-s2-expert-05-events-interaction.md); [data config](../../raw/skills/antv-s2-expert-06-data-config.md); [sort](../../raw/skills/antv-s2-expert-07-sort.md); [totals](../../raw/skills/antv-s2-expert-08-totals.md); [copy export](../../raw/skills/antv-s2-expert-09-copy-export.md); [pagination](../../raw/skills/antv-s2-expert-10-pagination.md); [conditions](../../raw/skills/antv-s2-expert-11-conditions.md); [tooltip](../../raw/skills/antv-s2-expert-12-tooltip.md); [frozen](../../raw/skills/antv-s2-expert-13-frozen.md); [icon](../../raw/skills/antv-s2-expert-14-icon.md); [SSR](../../raw/skills/antv-s2-expert-15-ssr.md); [react](../../raw/skills/antv-s2-expert-16-react-components.md); [custom render](../../raw/skills/antv-s2-expert-custom-cell-render.md); [custom theme](../../raw/skills/antv-s2-expert-custom-theme.md); [interaction examples](../../raw/skills/antv-s2-expert-interaction-examples.md); [layout examples](../../raw/skills/antv-s2-expert-layout-examples.md); [pivot sheet basic](../../raw/skills/antv-s2-expert-pivot-sheet-basic.md); [react usage](../../raw/skills/antv-s2-expert-react-component-usage.md); [s2 data config](../../raw/skills/antv-s2-expert-s2-data-config.md); [s2 event](../../raw/skills/antv-s2-expert-s2-event.md); [s2 options](../../raw/skills/antv-s2-expert-s2-options.md); [s2 theme](../../raw/skills/antv-s2-expert-s2-theme.md); [sheet component](../../raw/skills/antv-s2-expert-sheet-component.md); [table sheet basic](../../raw/skills/antv-s2-expert-table-sheet-basic.md)

## 概述

AntV S2 是多维交叉分析表格开发技能，覆盖透视表（PivotSheet）、明细表（TableSheet）的完整开发流程。支持 `@antv/s2` 核心引擎（Canvas 渲染）、`@antv/s2-react` React 组件、`@antv/s2-vue` Vue 组件、SSR 服务端渲染。核心优势：全量百万级数据 4 秒内渲染完成，支持多维自由交叉分析。

## 核心概念

### 两种表格类型

| 类型 | 用途 | 数据配置 |
|------|------|----------|
| **PivotSheet 透视表** | 多维交叉分析，发现维度交互关系 | 需要 `rows` + `columns` + `values` |
| **TableSheet 明细表** | 平面数据展示，替代 DOM 表格提升性能 | 仅需 `columns`，数据直接渲染 |

### 表格五区域结构

| 区域 | 说明 |
|------|------|
| **行头** (rowHeader) | 显示行维度层级，支持 grid（扁平）/ tree（树形）/ grid-tree 三种模式 |
| **列头** (colHeader) | 显示列维度层级 |
| **角头** (cornerHeader) | 左上角锚点，计算行列尺寸和坐标的基准 |
| **数据区** (dataCell) | 行列维度交叉点，核心数据展示区 |
| **框架层** (frame) | 覆盖所有区域之上的叠加层，处理分隔线、滚动条、阴影 |

### 内部数据流

```
S2DataConfig（用户配置） → DataSet（内部转换） → Facet（布局计算） → Node（元数据） → Cell（Canvas 渲染）
```

## 数据配置

```ts
const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],       // 行维度
    columns: ['type'],                // 列维度
    values: ['price'],                // 指标
    valueInCols: true,                // 指标放在列头（默认）
  },
  data: [
    { province: '浙江', city: '杭州', type: '笔', price: 1 },
    { province: '浙江', city: '杭州', type: '纸', price: 2 },
  ],
  meta: [
    { field: 'price', name: '价格', formatter: (v) => `¥${v}` },
    { field: 'province', name: '省份' },
  ],
};
```

### meta 字段说明

| 属性 | 用途 |
|------|------|
| `name` | 显示别名 |
| `description` | 工具提示中的描述 |
| `formatter` | 格式化函数（支持文本枚举转换和数值单位格式化） |
| `renderer` | 单元格渲染类型（IMAGE/VIDEO） |

## 框架绑定

### React 用法

```tsx
import { SheetComponent } from '@antv/s2-react';

<SheetComponent
  sheetType="pivot"
  dataCfg={s2DataConfig}
  options={{ width: 600, height: 400 }}
  onRowCellClick={(data) => console.log(data)}
  onMounted={(instance) => { s2Ref.current = instance; }}
/>
```

支持 5 种 sheet 类型：`pivot`、`table`、`gridAnalysis`、`strategy`、`editable`。

### Vue 3 用法

```vue
<SheetComponent
  :sheetType="'pivot'"
  :dataCfg="s2DataConfig"
  :options="s2Options"
  @rowCellClick="handleRowCellClick"
/>
```

事件使用 camelCase 命名（`@rowCellClick` 而非 `@onRowCellClick`）。

## 样式与主题

### 4 种内置主题

| 主题 | 说明 |
|------|------|
| `default` | 默认主题 |
| `colorful` | 彩色蓝色主题 |
| `gray` | 极简灰色主题 |
| `dark` | 深色主题 |

### 三种自定义方式

1. **自定义 Schema**：通过 `setTheme()` 覆盖特定属性（背景色、单元格颜色、文字对齐、滚动条）
2. **自定义调色板**：提供完整的 `basicColors`（15 个色槽）和 `semanticColors`
3. **主题色自动生成**：通过 `generatePalette({ brandColor: '#EA1720' })` 从单色生成完整调色板

### 单元格样式配置

| 属性 | 说明 |
|------|------|
| `layoutWidthType` | `adaptive`（均分）/ `colAdaptive`（列自适应）/ `compact`（紧凑内容宽度） |
| `dataCell.width/height` | 数据单元格尺寸 |
| `rowCell.widthByField` | 按字段设置行头宽度 |
| `colCell.hideValue` | 隐藏列头中的值行（单指标时） |
| `wordWrap` | 文本自动换行 |
| `maxLines` | 最大行数（超出显示省略号） |

## 核心功能模块

### 透视表展示模式

| 模式 | 说明 | 配置 |
|------|------|------|
| **grid 扁平** | 每级维度独立列，不支持展开收起 | `hierarchyType: 'grid'` |
| **tree 树形** | 共用一列，缩进区分层级，支持展开收起 | `hierarchyType: 'tree'` |
| **grid-tree** | 每级独立列 + 支持展开收起 | `hierarchyType: 'grid-tree'` |

### 小计与合计

通过 `totals` 配置行/列方向的小计和总计：
- `row.subTotals` / `row.grandTotal` 控制是否显示
- `showSubTotals` 控制是否显示小计列
- 可自定义小计/总计文本

### 排序

支持多种排序策略：
- `dataCellAsc/desc`：数据单元格升序/降序
- `sortMethod`：自定义排序函数
- `sortFieldId`：指定排序字段
- 支持多字段联合排序

### 条件格式

通过 `conditions` 配置数据单元格的条件渲染：
- 区间填充、图标标记（上升/下降箭头）、文本着色
- 支持多条件叠加

### 冻结行列

```ts
const s2Options = {
  frozen: {
    rowCount: 1,           // 顶部冻结 N 行
    trailingRowCount: 1,   // 底部冻结 N 行
    colCount: 1,           // 左侧冻结 N 列
    trailingColCount: 1,   // 右侧冻结 N 列
    rowHeader: true,       // 行头独立滚动（默认开启）
  },
};
```

### 交互能力

| 交互 | 说明 |
|------|------|
| 单选/多选 | `selectedCellsSpotlight` 高亮选中区域 |
| 刷选 | 拖拽刷选多个数据单元格 |
| 展开/收起 | 树形模式下维度层级控制 |
| 列隐藏/显示 | 列头右键菜单 |
| 复制/导出 | 支持复制选区数据到剪贴板 |
| Tooltip | 悬停显示详细信息，React 支持 ReactNode 内容 |

### 分页

```ts
const s2Options = {
  pagination: {
    pageSize: 10,
    current: 1,
  },
};
```

Vue 支持 `showPagination` 属性显示默认分页组件。

## 使用场景

适合以下场景触发：需要复杂多维数据交叉分析、大数据量表格渲染（替代 DOM 表格）、自定义单元格渲染（图片/视频/自定义图标）、行列冻结+排序+小计/合计的 BI 级表格、React/Vue 项目中需要高性能表格组件。

### 选型参考

| 需求 | 选择 |
|------|------|
| 多维交叉/数据透视 | PivotSheet |
| 明细数据/平面列表 | TableSheet |
| 需要小计/合计 | PivotSheet |
| 需要列冻结+行冻结 | 两者都支持 |
| 替代 Ant Table/Element Table | TableSheet（Canvas 性能优势） |
