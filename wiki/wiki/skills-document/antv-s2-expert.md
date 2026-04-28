# AntV S2 多维交叉表格专家技能

> Sources: antv-s2-expert, 30+ files, 2026-04-28
> Created: 2026-04-27
> Raw: [SKILL](../../raw/skills/antv-s2-expert-SKILL.md); [overview](../../raw/skills/antv-s2-expert-00-overview.md); [sheet types](../../raw/skills/antv-s2-expert-01-sheet-types.md); [framework](../../raw/skills/antv-s2-expert-02-framework-bindings.md); [theme](../../raw/skills/antv-s2-expert-03-theme-style.md); [custom cell](../../raw/skills/antv-s2-expert-04-custom-cell.md); [events](../../raw/skills/antv-s2-expert-05-events-interaction.md); [data config](../../raw/skills/antv-s2-expert-06-data-config.md); [sort](../../raw/skills/antv-s2-expert-07-sort.md); [totals](../../raw/skills/antv-s2-expert-08-totals.md); [copy export](../../raw/skills/antv-s2-expert-09-copy-export.md); [pagination](../../raw/skills/antv-s2-expert-10-pagination.md); [conditions](../../raw/skills/antv-s2-expert-11-conditions.md); [tooltip](../../raw/skills/antv-s2-expert-12-tooltip.md); [frozen](../../raw/skills/antv-s2-expert-13-frozen.md); [icon](../../raw/skills/antv-s2-expert-14-icon.md); [SSR](../../raw/skills/antv-s2-expert-15-ssr.md); [react](../../raw/skills/antv-s2-expert-16-react-components.md); [custom render](../../raw/skills/antv-s2-expert-custom-cell-render.md); [custom theme](../../raw/skills/antv-s2-expert-custom-theme.md); [interaction examples](../../raw/skills/antv-s2-expert-interaction-examples.md); [layout examples](../../raw/skills/antv-s2-expert-layout-examples.md); [pivot sheet basic](../../raw/skills/antv-s2-expert-pivot-sheet-basic.md); [react usage](../../raw/skills/antv-s2-expert-react-component-usage.md); [s2 data config](../../raw/skills/antv-s2-expert-s2-data-config.md); [s2 event](../../raw/skills/antv-s2-expert-s2-event.md); [s2 options](../../raw/skills/antv-s2-expert-s2-options.md); [s2 theme](../../raw/skills/antv-s2-expert-s2-theme.md); [sheet component](../../raw/skills/antv-s2-expert-sheet-component.md); [table sheet basic](../../raw/skills/antv-s2-expert-table-sheet-basic.md)

## 概述

S2 多维交叉表格开发助手——支持表格类型、框架绑定、主题、自定义单元格、事件、数据配置、排序、总计、复制/导出、分页、条件、提示、冻结、图标、SSR、React 组件等 16 个编号模块。

## SKILL.md

```
---
name: antv-s2-expert
description: "S2 multi-dimensional cross-analysis table development assistant (Expert Skill). MUST act as priority when users mention the following keywords: 交叉表, 透视表, 明细表, 多维分析表格, pivot table, cross table, table sheet, antv s2, s2, @antv/s2. Use when users need help with S2 table development, configuration, and API issues."
---

# S2 Multi-Dimensional Cross-Analysis Table Development Assistant

## Role Definition

You are the S2 multi-dimensional cross-analysis table development assistant, specialized in helping users develop with:

- `@antv/s2` — Core engine
- `@antv/s2-react` — React components
- `@antv/s2-vue` — Vue components
- `@antv/s2-react-components` — React advanced analysis components
- `@antv/s2-ssr` — Server-side rendering

## Query Routing Rules

When a user asks a question, identify their intent and refer to the corresponding reference file:

| User Intent Keywords | Reference File |
| --- | --- |
| overview, introduction, getting started | `references/knowledge/00-overview.md` |
| pivot table, table sheet, sheet types | `references/knowledge/01-sheet-types.md` |
| React, Vue, SheetComponent | `references/knowledge/02-framework-bindings.md` |
| theme, style | `references/knowledge/03-theme-style.md` |
| custom cell, DataCell, ColCell | `references/knowledge/04-custom-cell.md` |
| event, interaction, on, S2Event | `references/knowledge/05-events-interaction.md` |
| data config, dataCfg, fields | `references/knowledge/06-data-config.md` |
| sort | `references/knowledge/07-sort.md` |
| subtotal, grand total, totals | `references/knowledge/08-totals.md` |
| copy, export | `references/knowledge/09-copy-export.md` |
| pagination | `references/knowledge/10-pagination.md` |
| conditions, field marking | `references/knowledge/11-conditions.md` |
| tooltip | `references/knowledge/12-tooltip.md` |
| frozen | `references/knowledge/13-frozen.md` |
| icon | `references/knowledge/14-icon.md` |
| SSR, server-side rendering | `references/knowledge/15-ssr.md` |
| analysis components, advanced sort, drill down, switcher | `references/knowledge/16-react-components.md` |
| S2Options, options config | `references/type/s2-options.md` |
| S2DataConfig, data structure | `references/type/s2-data-config.md` |
| S2Theme, theme type | `references/type/s2-theme.md` |
| S2Event, event type | `references/type/s2-event.md` |
| SheetComponent props | `references/type/sheet-component.md` |
| best practices, how to | `references/examples/` |

## Code Generation Guidelines

1. Prefer TypeScript
2. For React, use `<SheetComponent>` from `@antv/s2-react`
3. Data config uses `S2DataConfig` type with `fields` (rows/columns/values) and `data`
4. Table config uses `S2Options` type
5. Event listeners use `s2.on(S2Event.XXX, handler)` or React `onXXX` props
6. Custom cells via extending `DataCell`/`ColCell`/`RowCell`/`CornerCell`
7. Destroy table by calling `s2.destroy()`

## How to Use

When a user asks about S2 development:

1. Identify the user's intent from the query routing table above
2. Read the corresponding reference file(s) for context
3. Generate code or explanations based on the reference material and code generation guidelines
4. Always provide complete, runnable code examples when possible
```

## 参考资料（references/）


=== FILE: .claude/skills/antv-s2-expert/references/examples/custom-cell-render.md ===
# Custom Cell Rendering Examples

## Example 1: Custom DataCell with Background Image

Extend `DataCell` to override the `drawBackgroundShape` method and add a custom background image to data cells.

```typescript
import { PivotSheet, DataCell, S2DataConfig, S2Options } from '@antv/s2';
import { Image as GImage } from '@antv/g';

/**
 * Custom DataCell - adds a background image to data cells.
 * For TableSheet, extend TableDataCell instead.
 * See: https://github.com/antvis/S2/blob/next/packages/s2-core/src/cell/data-cell.ts
 */
class CustomDataCell extends DataCell {
  // Override the background drawing method to add a background image
  drawBackgroundShape() {
    const url =
      'https://gw.alipayobjects.com/zos/antfincdn/og1XQOMyyj/1e3a8de1-3b42-405d-9f82-f92cb1c10413.png';

    this.backgroundShape = this.appendChild(
      new GImage({
        style: {
          ...this.getBBoxByType(),
          src: url,
        },
      }),
    );
  }
}

const s2DataConfig: S2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type', 'sub_type'],
    values: ['number'],
  },
  meta: [/* ... */],
  data: [/* ... */],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
  interaction: {
    // Disable hover cross-highlight for visual clarity
    hoverHighlight: false,
  },
  // Register custom DataCell via the dataCell callback
  dataCell: (viewMeta, spreadsheet) => {
    return new CustomDataCell(viewMeta, spreadsheet);
  },
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

await s2.render();
```

## Example 2: Custom TableDataCell with Conditional Styling

Extend `TableDataCell` to override `getBackgroundColor` and `getTextStyle` for conditional formatting based on cell data.

```typescript
import {
  TableColCell,
  TableDataCell,
  TableSheet,
  type S2DataConfig,
  type S2Options,
} from '@antv/s2';

/**
 * Custom TableDataCell - conditional background color and text styling.
 * See: https://github.com/antvis/S2/blob/next/packages/s2-core/src/cell/table-data-cell.ts
 */
class CustomDataCell extends TableDataCell {
  getBackgroundColor() {
    // Highlight cells with value >= 6000
    if (this.meta.fieldValue >= 6000) {
      return {
        backgroundColor: 'red',
        backgroundColorOpacity: 0.2,
      };
    }

    return super.getBackgroundColor();
  }

  getTextStyle() {
    const defaultTextStyle = super.getTextStyle();

    // Bold centered text for the first column (series number)
    if (this.meta.colIndex === 0) {
      return {
        ...defaultTextStyle,
        fontWeight: 600,
        textAlign: 'center',
      };
    }

    // Alternating row style for specific columns
    if (this.meta.rowIndex % 2 === 0 && this.meta.colIndex > 0) {
      return {
        ...defaultTextStyle,
        fontSize: 16,
        fill: '#396',
        textAlign: 'left',
      };
    }

    // Highlight high-value data
    if (this.meta.fieldValue >= 600) {
      return {
        ...defaultTextStyle,
        fontSize: 14,
        fontWeight: 700,
        fill: '#f63',
        textAlign: 'center',
      };
    }

    return super.getTextStyle();
  }
}

/**
 * Custom TableColCell - conditional text styling for column headers.
 * See: https://github.com/antvis/S2/blob/next/packages/s2-core/src/cell/table-col-cell.ts
 */
class CustomColCell extends TableColCell {
  getTextStyle() {
    const defaultTextStyle = super.getTextStyle();

    // Style even-indexed columns
    if (this.meta.colIndex % 2 === 0) {
      return {
        ...defaultTextStyle,
        fontSize: 16,
        fill: '#396',
        textAlign: 'left',
      };
    }

    return super.getTextStyle();
  }
}

const s2Options: S2Options = {
  width: 600,
  height: 480,
  seriesNumber: {
    enable: true,
  },
  // Register custom cells via callbacks
  colCell: (node, spreadsheet, headerConfig) => {
    return new CustomColCell(node, spreadsheet, headerConfig);
  },
  dataCell: (viewMeta, spreadsheet) => {
    return new CustomDataCell(viewMeta, spreadsheet);
  },
};

const s2 = new TableSheet(container, s2DataConfig, s2Options);

await s2.render();
```

## Example 3: Custom ColCell with Background Image

Extend `ColCell` to add a background image to column header cells.

```typescript
import { PivotSheet, ColCell, S2Options, S2DataConfig } from '@antv/s2';
import { Image as GImage } from '@antv/g';

/**
 * Custom ColCell - adds a background image to column headers.
 * For TableSheet, extend TableColCell instead.
 * See: https://github.com/antvis/S2/blob/next/packages/s2-core/src/cell/col-cell.ts
 */
class CustomColCell extends ColCell {
  // Override the background drawing method
  drawBackgroundShape() {
    const url =
      'https://gw.alipayobjects.com/zos/antfincdn/og1XQOMyyj/1e3a8de1-3b42-405d-9f82-f92cb1c10413.png';

    this.backgroundShape = this.appendChild(
      new GImage({
        style: {
          ...this.getBBoxByType(),
          src: url,
        },
      }),
    );
  }
}

const s2Options: S2Options = {
  width: 600,
  height: 480,
  interaction: {
    hoverHighlight: false,
  },
  // Register custom ColCell via the colCell callback
  colCell: (node, s2, headConfig) => {
    return new CustomColCell(node, s2, headConfig);
  },
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/custom-theme.md ===
# Custom Theme Examples

## Example 1: Built-in Theme (Dark Mode)

Use a built-in theme by name via `setThemeCfg`.

```typescript
import { PivotSheet, S2DataConfig, S2Options } from '@antv/s2';

const s2DataConfig: S2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price', 'cost'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Category' },
    { field: 'price', name: 'Price' },
    { field: 'cost', name: 'Cost' },
  ],
  data: [/* ... */],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

// Available built-in themes: 'default', 'dark', 'gray', 'colorful'
s2.setThemeCfg({
  name: 'dark',
});

await s2.render();
```

## Example 2: Custom Palette

Create a custom color palette and apply it with `setThemeCfg`.

```typescript
import { PivotSheet, S2DataConfig, S2Options, ThemeCfg } from '@antv/s2';

const s2DataConfig: S2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price', 'cost'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Category' },
    { field: 'price', name: 'Price' },
    { field: 'cost', name: 'Cost' },
  ],
  data: [/* ... */],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
};

const s2Palette: ThemeCfg['palette'] = {
  basicColors: [
    '#FFFFFF',
    '#F8F5FE',
    '#EDE1FD',
    '#873BF4',
    '#7232CF',
    '#7232CF',
    '#7232CF',
    '#AB76F7',
    '#FFFFFF',
    '#DDC7FC',
    '#9858F5',
    '#B98EF8',
    '#873BF4',
    '#282B33',
    '#121826',
  ],
  // Semantic colors for conditional formatting
  semanticColors: {
    red: '#FF4D4F',
    green: '#29A294',
  },
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

s2.setThemeCfg({
  palette: s2Palette,
});

await s2.render();
```

## Example 3: Custom Theme Schema

Fully customize theme properties using `setTheme` for fine-grained control over every cell type, borders, colors, fonts, and interaction states.

```typescript
import {
  FONT_FAMILY,
  S2DataConfig,
  S2Options,
  S2Theme,
  TableSheet,
} from '@antv/s2';

const s2DataConfig: S2DataConfig = {
  fields: {
    columns: ['province', 'city', 'type', 'price', 'cost'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Category' },
    { field: 'price', name: 'Price' },
    { field: 'cost', name: 'Cost' },
  ],
  data: [/* ... */],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
};

const BORDER_COLOR = 'rgb(39, 44, 65)';
const BACK_COLOR = 'rgb(67, 72, 91)';
const HEADER_BACK_COLOR = '#353c59';
const CELL_ACTIVE_BACK_COLOR = '#434c6c';

const customTheme: S2Theme = {
  background: {
    color: HEADER_BACK_COLOR,
  },
  empty: {
    icon: {
      fill: '#fff',
      width: 64,
      height: 41,
      margin: { top: 0, right: 0, bottom: 24, left: 0 },
    },
    description: {
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      fontWeight: 'normal',
      fill: '#fff',
      opacity: 1,
    },
  },
  cornerCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      padding: { top: 12, right: 8, bottom: 12, left: 8 },
      backgroundColor: HEADER_BACK_COLOR,
    },
    text: { fill: '#fff' },
    bolderText: { fill: '#fff', opacity: 0.4 },
  },
  splitLine: {
    horizontalBorderColor: BORDER_COLOR,
    horizontalBorderColorOpacity: 1,
    horizontalBorderWidth: 2,
    verticalBorderColor: BORDER_COLOR,
    verticalBorderColorOpacity: 1,
    verticalBorderWidth: 2,
    showShadow: true,
    shadowWidth: 10,
    shadowColors: {
      left: 'rgba(0,0,0,0.1)',
      right: 'rgba(0,0,0,0)',
    },
  },
  colCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 2,
      horizontalBorderWidth: 2,
      padding: { top: 12, right: 8, bottom: 12, left: 8 },
      backgroundColor: HEADER_BACK_COLOR,
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        selected: {
          backgroundColor: 'rgb(63, 69, 97)',
        },
      },
    },
    text: { fill: '#fff' },
    bolderText: { fill: '#fff', opacity: 0.4 },
  },
  dataCell: {
    icon: {
      size: 14,
      margin: { left: 10 },
    },
    cell: {
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        hoverFocus: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
          borderColor: 'blue',
        },
        selected: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        unselected: {
          backgroundOpacity: 1,
          opacity: 1,
        },
        prepareSelect: {
          borderColor: CELL_ACTIVE_BACK_COLOR,
        },
      },
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 2,
      horizontalBorderWidth: 2,
      padding: { top: 0, right: 8, bottom: 2, left: 0 },
      backgroundColorOpacity: 0.9,
      backgroundColor: BACK_COLOR,
      crossBackgroundColor: BACK_COLOR,
    },
    text: { fill: '#fff' },
  },
};

const s2 = new TableSheet(container, s2DataConfig, s2Options);

// Apply fully custom theme via setTheme
s2.setTheme(customTheme);

await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/interaction-examples.md ===
# Interaction Examples

## Example 1: Cell Click Selection and Events

Configure cell selection behavior and listen to various interaction events using `S2Event`.

```typescript
import { PivotSheet, S2Event, S2Options } from '@antv/s2';

const container = document.getElementById('container');

const s2Options: S2Options = {
  width: 600,
  height: 480,
  interaction: {
    hoverHighlight: true,
    // Highlight selected cells
    selectedCellsSpotlight: true,
    // Multi-select (hold Ctrl/Command), enabled by default
    multiSelection: true,
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);

// Listen to data cell click
s2.on(S2Event.DATA_CELL_CLICK, (event) => {
  console.log('data cell click:', event);
});

// Listen to data cell selected (fires after selection is confirmed)
s2.on(S2Event.DATA_CELL_SELECTED, (cells, detail) => {
  console.log('data cell selected:', cells, detail);
});

// Listen to global selection changes (any cell type)
s2.on(S2Event.GLOBAL_SELECTED, (cells, detail) => {
  console.log('selected', cells, detail);
});

// Additional useful events:
// S2Event.ROW_CELL_CLICK
// S2Event.COL_CELL_CLICK
// S2Event.CORNER_CELL_CLICK
// S2Event.GLOBAL_SCROLL
// S2Event.LAYOUT_RESIZE
// S2Event.DATA_CELL_BRUSH_SELECTION

await s2.render();
```

## Example 2: Brush Selection and Interaction API

Enable brush (drag) selection and use the interaction API to programmatically select, highlight, and reset cells.

```typescript
import {
  InteractionStateName,
  PivotSheet,
  S2Event,
  S2Options,
  SpreadSheet,
} from '@antv/s2';

const s2Options: S2Options = {
  width: 600,
  height: 480,
  style: {
    rowCell: { width: 80 },
    dataCell: { width: 100, height: 100 },
  },
  interaction: {
    copy: { enable: true },
    hoverHighlight: true,
    brushSelection: true,
    multiSelection: true,
    selectedCellHighlight: false,
    selectedCellsSpotlight: true,
    selectedCellMove: true,
    overscrollBehavior: 'none',
    // Custom auto-reset logic
    autoResetSheetStyle: (event, spreadsheet) => {
      // Don't auto-reset when clicking specific buttons
      if (event?.target instanceof HTMLElement) {
        return !event.target.classList.contains('ant-btn');
      }
      return true; // Reset normally (e.g., clicking blank area, pressing ESC)
    },
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);

// Listen to multiple events
[
  S2Event.GLOBAL_SCROLL,
  S2Event.ROW_CELL_CLICK,
  S2Event.COL_CELL_CLICK,
  S2Event.DATA_CELL_CLICK,
  S2Event.DATA_CELL_SELECTED,
  S2Event.GLOBAL_SELECTED,
  S2Event.DATA_CELL_BRUSH_SELECTION,
  S2Event.LAYOUT_RESIZE,
].forEach((eventName) => {
  s2.on(eventName, (...args) => {
    console.log(eventName, ...args);
  });
});

await s2.render();

// --- Interaction API examples ---

// Select all cells
s2.interaction.selectAll();

// Select a specific data cell (with scroll animation)
const dataCell = s2.facet.getDataCells()[0];
s2.interaction.selectCell(dataCell, {
  animate: true,
  skipScrollEvent: false,
});

// Highlight a specific cell
const cell = s2.facet.getCells()[0];
s2.interaction.highlightCell(cell, {
  animate: true,
  skipScrollEvent: false,
});

// Highlight a data cell and its corresponding row/column headers
const dataCellViewMeta = s2.facet.getCellMeta(1, 1);
s2.interaction.updateDataCellRelevantHeaderCells(
  InteractionStateName.HOVER,
  dataCellViewMeta,
);

// Hide specific columns by node ID
s2.interaction.hideColumns([
  'root[&]Furniture[&]Table[&]number',
  'root[&]Stationery[&]Pen[&]number',
]);

// Reset all interaction states
s2.interaction.reset();
s2.interaction.hideColumns([]);
```

## Example 3: Custom Interaction - Row/Column Hover Tooltip

Create a custom interaction by extending `BaseEvent` and registering it via `customInteractions`.

```typescript
import { BaseEvent, PivotSheet, S2Event, S2Options } from '@antv/s2';

class RowColumnHoverTooltipInteraction extends BaseEvent {
  bindEvents() {
    // Row header hover
    this.spreadsheet.on(S2Event.ROW_CELL_HOVER, (event) => {
      this.showTooltip(event);
    });
    // Column header hover
    this.spreadsheet.on(S2Event.COL_CELL_HOVER, (event) => {
      this.showTooltip(event);
    });
  }

  showTooltip(event: any) {
    const cell = this.spreadsheet.getCell(event.target);
    const meta = cell?.getMeta();
    const content = meta?.value || 'custom';

    this.spreadsheet.showTooltip({
      position: {
        x: event.clientX,
        y: event.clientY,
      },
      content,
    });
  }
}

const s2Options: S2Options = {
  width: 600,
  height: 480,
  tooltip: {
    enable: true,
  },
  interaction: {
    customInteractions: [
      {
        key: 'RowColumnHoverTooltipInteraction',
        interaction: RowColumnHoverTooltipInteraction,
      },
    ],
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);

await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/layout-examples.md ===
# Layout Examples

## Example 1: Frozen Rows and Columns

### Table Sheet with Frozen Rows/Columns

Freeze leading and trailing rows/columns in a TableSheet.

```typescript
import { S2DataConfig, S2Options, TableSheet } from '@antv/s2';

const s2DataConfig: S2DataConfig = {
  fields: {
    columns: ['province', 'city', 'type', 'price'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Category' },
    { field: 'price', name: 'Price' },
  ],
  data: [/* ... */],
};

const s2Options: S2Options = {
  width: 450,
  height: 480,
  seriesNumber: { enable: true },
  frozen: {
    // Number of frozen leading rows
    rowCount: 1,
    // Number of frozen leading columns
    colCount: 1,
    // Number of frozen trailing rows
    trailingRowCount: 1,
    // Number of frozen trailing columns
    trailingColCount: 1,
  },
};

const s2 = new TableSheet(container, s2DataConfig, s2Options);
await s2.render();
```

### PivotSheet with Frozen Rows/Columns and Totals

Freeze rows and columns in a PivotSheet with grand totals.

```typescript
import { PivotSheet, S2Options } from '@antv/s2';

const s2Options: S2Options = {
  width: 600,
  height: 300,
  frozen: {
    rowCount: 1,
    trailingRowCount: 1,
    colCount: 1,
    trailingColCount: 1,
  },
  totals: {
    row: {
      showGrandTotals: true,
      reverseGrandTotalsLayout: true,
    },
  },
  style: {
    colCell: {
      // Set specific column widths by field path
      widthByField: {
        'root[&]Furniture[&]Sofa[&]number': 200,
        'root[&]Stationery[&]Pen[&]number': 200,
      },
    },
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);
await s2.render();
```

## Example 2: Custom Cell Sizing

Fine-grained control of row and column dimensions using `style` configuration.

```typescript
import { PivotSheet, S2Options, EXTRA_FIELD } from '@antv/s2';

const s2Options: S2Options = {
  width: 600,
  height: 480,
  hierarchyType: 'grid',
  style: {
    // Data cell size (lower priority than row/col cell width/height)
    dataCell: {
      // Ignored if colCell width is configured
      width: 100,
      // Ignored if rowCell height is configured
      height: 90,
    },
    // Row cell sizing (priority: heightByField > height > dataCell.height)
    rowCell: {
      width: 100,
      // width: (rowNode) => 100,
      // height: (rowNode) => 100,
      heightByField: {
        // By dimension (e.g., city)
        city: 50,
        // By specific node ID
        'root[&]Zhejiang[&]Hangzhou': 30,
        'root[&]Zhejiang[&]Ningbo': 100,
      },
    },
    // Column cell sizing (priority: widthByField > width > dataCell.width)
    colCell: {
      // width: (colNode) => 100,
      // height: (colNode) => 100,
      widthByField: {
        // EXTRA_FIELD is the internal virtual value column (when values are on columns)
        [EXTRA_FIELD]: 60,
        // Specific column node
        'root[&]Furniture[&]Sofa[&]number': 120,
      },
      heightByField: {
        // By dimension
        type: 50,
        [EXTRA_FIELD]: 80,
      },
    },
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);
await s2.render();
```

## Example 3: Tree Mode Collapse Configuration

Control expand/collapse behavior in tree hierarchy mode.

```typescript
import { PivotSheet, S2Options } from '@antv/s2';

const s2Options: S2Options = {
  width: 600,
  height: 480,
  hierarchyType: 'tree',
  style: {
    rowCell: {
      // Method 1: Collapse specific nodes by node ID
      collapseFields: { 'root[&]Zhejiang': true },

      // Method 2: Collapse all nodes of a specific dimension
      // collapseFields: { city: true },

      // Method 3: Set expand depth (lower priority than collapseFields;
      //           only effective when collapseFields is not configured or null)
      // expandDepth: 0,

      // Method 4: Collapse all (lowest priority; only effective when
      //           collapseFields and expandDepth are not configured or null)
      // collapseAll: true,
    },
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);
await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/pivot-sheet-basic.md ===
# PivotSheet Basic Examples

## Example 1: Grid Mode PivotSheet

A basic pivot table with grid layout, rows/columns/values configuration, and meta field aliases.

```typescript
import { PivotSheet, S2DataConfig, S2Options } from '@antv/s2';

const container = document.getElementById('container');

const s2DataConfig: S2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type', 'sub_type'],
    values: ['number'],
  },
  meta: [
    // Supports batch setting or regex matching:
    // field: ['province', 'city'],
    // field: /type/,
    {
      field: 'province',
      name: 'Province',
    },
    {
      field: 'city',
      name: 'City',
    },
    {
      field: 'type',
      name: 'Category',
    },
    {
      field: 'sub_type',
      name: 'Sub Category',
    },
    {
      field: 'number',
      name: 'Quantity',
      // Custom formatter:
      // formatter: (value, record, meta) => {
      //   return `${value / 100} %`;
      // },
    },
  ],
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', sub_type: 'Table', number: 7789 },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', sub_type: 'Sofa', number: 2367 },
    // ... more data
  ],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
  hierarchyType: 'grid',
  // Custom corner extra field text when values are on row header (default: "Values")
  cornerExtraFieldText: 'Metrics',
  interaction: {
    copy: {
      enable: true,
      withFormat: true,
      withHeader: true,
    },
  },
  // Show series number column:
  // seriesNumber: {
  //   enable: true,
  //   text: 'No.',
  // },
  frozen: {
    // Row header is frozen by default; both row header and data area show scrollbars
    // rowHeader: false,
    // When row header is frozen, row header width is 1/2 of table, supports dynamic adjustment (0 - 1)
    // rowHeader: 0.2,
  },
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

await s2.render();
```

## Example 2: Tree Mode PivotSheet

A pivot table with tree hierarchy layout, supporting expand/collapse of row dimensions.

```typescript
import { PivotSheet, S2Options } from '@antv/s2';

const container = document.getElementById('container');

const s2Options: S2Options = {
  width: 600,
  height: 480,
  hierarchyType: 'tree',

  // Custom corner text (default: "Dimension1/Dimension2")
  // cornerText: 'Metrics',

  // Show series number:
  // seriesNumber: {
  //   enable: true,
  //   text: 'No.',
  // },
  style: {
    rowCell: {
      // Custom tree mode row header width:
      // width: 80,

      // Collapse all:
      // collapseAll: true,

      // Collapse all cities under Zhejiang province
      collapseFields: {
        'root[&]Zhejiang': true,
      },
    },
  },
  frozen: {
    // Row header is frozen by default
    // rowHeader: false,
    // When frozen, row header width ratio (0 - 1)
    // rowHeader: 0.2,
  },
};

const s2 = new PivotSheet(container, dataCfg, s2Options);

await s2.render();
```

## Example 3: Grid-Tree Mode with Totals

Grid-tree mode combines flat layout with expand/collapse. Each dimension level has its own column while supporting expand/collapse of child nodes.

```typescript
import { PivotSheet, S2Options, setLang } from '@antv/s2';

const container = document.getElementById('container');

const s2Options: S2Options = {
  width: 1200,
  height: 800,
  // Grid-tree mode: flat layout + expand/collapse
  hierarchyType: 'grid-tree',
  style: {
    rowCell: {
      // Default expand to level 1 (starting from 0)
      expandDepth: 1,
    },
  },
  // Configure grand totals and subtotals
  totals: {
    row: {
      showGrandTotals: true,
      showSubTotals: true,
      subTotalsDimensions: ['province'],
      grandTotalsLabel: 'Grand Total',
      subTotalsLabel: 'Subtotal',
      // Auto-calculate subtotals and grand totals
      calcSubTotals: {
        aggregation: 'SUM',
      },
      calcGrandTotals: {
        aggregation: 'SUM',
      },
      reverseSubTotalsLayout: true,
    },
  },
};

setLang('en_US');

const s2 = new PivotSheet(container, dataCfg, s2Options);

await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/react-component-usage.md ===
# React SheetComponent Usage Examples

## Example 1: React PivotSheet

Use `SheetComponent` from `@antv/s2-react` to render a pivot table in React. The default `sheetType` is `"pivot"`.

```tsx
import React from 'react';
import type { S2RenderOptions, SpreadSheet } from '@antv/s2';
import { SheetComponent, SheetComponentOptions } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App: React.FC = () => {
  const s2Options: SheetComponentOptions = {
    width: 600,
    height: 480,
  };

  const dataCfg = {
    fields: {
      rows: ['province', 'city'],
      columns: ['type'],
      values: ['price', 'cost'],
    },
    meta: [
      { field: 'province', name: 'Province' },
      { field: 'city', name: 'City' },
      { field: 'type', name: 'Category' },
      { field: 'price', name: 'Price' },
      { field: 'cost', name: 'Cost' },
    ],
    data: [
      // ... your data
    ],
  };

  const onMounted = (spreadsheet: SpreadSheet) => {
    console.log('onMounted:', spreadsheet);
  };

  const onUpdate = (renderOptions: S2RenderOptions) => {
    console.log('onUpdate:', renderOptions);
    return renderOptions;
  };

  const onUpdateAfterRender = (renderOptions: S2RenderOptions) => {
    console.log('onUpdateAfterRender:', renderOptions);
  };

  return (
    <SheetComponent
      dataCfg={dataCfg}
      options={s2Options}
      onMounted={onMounted}
      onUpdate={onUpdate}
      onUpdateAfterRender={onUpdateAfterRender}
    />
  );
};
```

## Example 2: React TableSheet

Set `sheetType="table"` to render a flat table layout.

```tsx
import React from 'react';
import { S2DataConfig, type S2RenderOptions, type SpreadSheet } from '@antv/s2';
import { SheetComponent, SheetComponentOptions } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App: React.FC = () => {
  const s2DataConfig: S2DataConfig = {
    fields: {
      columns: ['province', 'city', 'type', 'price', 'cost'],
    },
    meta: [
      { field: 'province', name: 'Province' },
      { field: 'city', name: 'City' },
      { field: 'type', name: 'Category' },
      { field: 'price', name: 'Price' },
      { field: 'cost', name: 'Cost' },
    ],
    data: [
      // ... your data
    ],
  };

  const s2Options: SheetComponentOptions = {
    width: 600,
    height: 480,
  };

  const onMounted = (spreadsheet: SpreadSheet) => {
    console.log('onMounted:', spreadsheet);
  };

  return (
    <SheetComponent
      dataCfg={s2DataConfig}
      options={s2Options}
      sheetType="table"
      onMounted={onMounted}
    />
  );
};
```

## Example 3: React Editable TableSheet

Set `sheetType="editable"` to enable inline cell editing with frozen rows/columns support.

```tsx
import React from 'react';
import { S2DataConfig } from '@antv/s2';
import {
  SheetComponent,
  SheetComponentOptions,
  type SheetComponentsProps,
} from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App: React.FC = () => {
  const s2DataConfig: S2DataConfig = {
    fields: {
      columns: ['province', 'city', 'type', 'price', 'cost'],
    },
    meta: [
      { field: 'province', name: 'Province' },
      { field: 'city', name: 'City' },
      { field: 'type', name: 'Category' },
      { field: 'price', name: 'Price' },
      { field: 'cost', name: 'Cost' },
    ],
    data: [
      // ... your data
    ],
  };

  const s2Options: SheetComponentOptions = {
    width: 480,
    height: 480,
    seriesNumber: {
      enable: true,
    },
    frozen: {
      rowCount: 1,
      colCount: 1,
      trailingRowCount: 1,
      trailingColCount: 1,
    },
  };

  const onDataCellEditStart: SheetComponentsProps['onDataCellEditStart'] = (
    meta,
    cell,
  ) => {
    console.log('onDataCellEditStart:', meta, cell);
  };

  const onDataCellEditEnd: SheetComponentsProps['onDataCellEditEnd'] = (
    meta,
    cell,
  ) => {
    console.log('onDataCellEditEnd:', meta, cell);
  };

  return (
    <SheetComponent
      dataCfg={s2DataConfig}
      options={s2Options}
      sheetType="editable"
      onDataCellEditStart={onDataCellEditStart}
      onDataCellEditEnd={onDataCellEditEnd}
    />
  );
};
```

=== FILE: .claude/skills/antv-s2-expert/references/examples/table-sheet-basic.md ===
# TableSheet Basic Examples

## Example 1: Basic Table Sheet

A flat table with column-based layout, series numbers, and custom empty data placeholders.

```typescript
import { S2DataConfig, S2Options, TableSheet } from '@antv/s2';

const container = document.getElementById('container');

const s2DataConfig: S2DataConfig = {
  fields: {
    columns: ['province', 'city', 'type', 'price', 'cost'],
  },
  meta: [
    {
      field: 'province',
      name: 'Province',
    },
    {
      field: 'city',
      name: 'City',
    },
    {
      field: 'type',
      name: 'Category',
    },
    {
      field: 'price',
      name: 'Price',
    },
    {
      field: 'cost',
      name: 'Cost',
    },
  ],
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', price: 100, cost: 60 },
    { province: 'Zhejiang', city: 'Ningbo', type: 'Stationery', price: 50, cost: 30 },
    // ... more data
  ],
};

const s2Options: S2Options = {
  width: 600,
  height: 480,
  seriesNumber: {
    enable: true,
    text: 'No.',
  },
  placeholder: {
    // Custom empty data cell placeholder
    cell: '-',
    // cell: (meta) => '-',
    // Custom empty placeholder: icon and text sizes can be customized via theme
    // See: https://s2.antv.antgroup.com/api/general/s2-theme#empty
    empty: {
      /**
       * Custom icon, supports customSVGIcons registration and built-in icons
       * @see https://s2.antv.antgroup.com/manual/advanced/custom/custom-icon
       */
      icon: 'Empty',
      description: 'No data available',
    },
  },
};

const s2 = new TableSheet(container, s2DataConfig, s2Options);

await s2.render();
```

## Example 2: Table Sheet with Frozen Rows and Columns

A table with frozen header rows, leading/trailing frozen columns and rows.

```typescript
import { S2DataConfig, S2Options, TableSheet } from '@antv/s2';

const container = document.getElementById('container');

const s2DataConfig: S2DataConfig = {
  fields: {
    columns: ['province', 'city', 'type', 'price'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Category' },
    { field: 'price', name: 'Price' },
  ],
  data: [
    // ... your data array
  ],
};

const s2Options: S2Options = {
  width: 450,
  height: 480,
  seriesNumber: {
    enable: true,
  },
  frozen: {
    // Number of frozen leading rows
    rowCount: 1,
    // Number of frozen leading columns
    colCount: 1,
    // Number of frozen trailing rows
    trailingRowCount: 1,
    // Number of frozen trailing columns
    trailingColCount: 1,
  },
};

const s2 = new TableSheet(container, s2DataConfig, s2Options);

await s2.render();
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/00-overview.md ===
# S2 Overview

## What is S2

[S2](https://github.com/antvis/s2) is a data-driven table visualization engine for visual analysis. The name "S2" comes from the two "S"s in "SpreadSheet", and "2" represents the two dimensions (rows and columns) in pivot tables. It provides beautiful, easy-to-use, high-performance, and extensible multi-dimensional tables.

### Key Features

1. **Out-of-the-box**: Provides ready-to-use `React` and `Vue3` table components with companion analysis components.
2. **Multi-dimensional cross-analysis**: Supports free combination of any dimensions for analysis.
3. **High performance**: Renders full million-row datasets in under 4 seconds; supports sub-second rendering via partial drill-down.
4. **Highly extensible**: Supports arbitrary customization (layout, styles, interactions, data flow, etc.).
5. **Rich interactions**: Single select, range select, row/column select, frozen row headers, drag-to-resize, custom interactions, and more.

## Packages

| Package | Description |
|---------|-------------|
| `@antv/s2` | Core library (framework-agnostic), based on Canvas rendering |
| `@antv/s2-react` | React component wrapper around `@antv/s2` |
| `@antv/s2-vue` | Vue 3.0 component wrapper around `@antv/s2` |

## Core Concepts

### Sheet Types

- **PivotSheet**: Cross-tab / pivot table for multi-dimensional analysis. Data is organized by `rows`, `columns`, and `values`.
- **TableSheet**: Flat detail table (like a traditional data grid). Data rows are displayed directly under column headers.

### Table Structure

A pivot table is composed of five regions:

| Region | Description |
|--------|-------------|
| **Row Header** (`rowHeader`) | Displays row dimension hierarchy. Structure determined by `s2DataConfig.fields.rows`. Supports grid (flat) and tree display modes. |
| **Column Header** (`colHeader`) | Displays column dimension hierarchy. Structure determined by `s2DataConfig.fields.columns`. |
| **Corner Header** (`cornerHeader`) | Top-left area. Used as the layout anchor for calculating row/column sizes and coordinates. Displays row/column field names. |
| **Data Cell** (`dataCell`) | The cross-intersection area of row and column dimensions. Displays measure values — the core data presentation area. |
| **Frame** (`frame`) | Overlay layer above all other regions. Handles separators, scrollbars, and shadow effects between regions. |

### Key Terminology

- **Measure (Indicator)**: Numeric values, e.g., `price`, `quantity`.
- **Dimension**: Analysis perspective, e.g., `province`, `type`.
- **Dimension Value**: Concrete values of a dimension, e.g., `Hangzhou`, `Beijing`.

### Internal Architecture

- **Cell**: A visual unit in the table. Corner, row, column headers are composed of multiple cells. Each supports custom rendering.
- **Node**: Metadata for a cell (including cells outside the visible viewport). One cell corresponds to one node.
- **Facet**: The current visible rendering area. Manages layout and cell rendering.
- **DataSet**: Internal representation of `s2DataConfig`, transformed for efficient processing and rendering.

### Data Flow

```
S2DataConfig → DataSet → Facet (layout) → Nodes → Cells (rendering)
```

1. User provides `S2DataConfig` (fields, data, meta).
2. S2 converts it to an internal `DataSet`.
3. The `Facet` calculates layout based on the dataset.
4. `Node` metadata is generated for each header and data position.
5. Visible `Cell` instances are created and rendered on the Canvas.

## Basic Usage

```ts
import { PivotSheet } from '@antv/s2';

const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
  },
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Pen', price: '1' },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Paper', price: '2' },
  ],
  meta: [
    { field: 'price', name: 'Price' },
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Type' },
  ],
};

const s2Options = {
  width: 600,
  height: 600,
};

async function bootstrap() {
  const container = document.getElementById('container');
  const s2 = new PivotSheet(container, s2DataConfig, s2Options);
  await s2.render();
}

bootstrap();
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/01-sheet-types.md ===
# S2 Sheet Types

## PivotSheet (Pivot Table)

A pivot table (also called a cross table or multi-dimensional table) displays relationships between multiple variables, helping users discover interactions between data dimensions. It is one of the most commonly used chart types in business BI analysis.

### Data Configuration

The pivot table organizes data using `rows`, `columns`, and `values`:

```ts
const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type', 'sub_type'],
    values: ['price'],
  },
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', sub_type: 'Table', price: '1' },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', sub_type: 'Sofa', price: '2' },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Office', sub_type: 'Pen', price: '3' },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Office', sub_type: 'Paper', price: '4' },
  ],
};
```

### Basic Usage

```ts
import { PivotSheet } from '@antv/s2';

const s2Options = {
  width: 600,
  height: 600,
};

async function bootstrap() {
  const container = document.getElementById('container');
  const s2 = new PivotSheet(container, s2DataConfig, s2Options);
  await s2.render();
}

bootstrap();
```

### React Usage

```tsx
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App = () => (
  <SheetComponent
    sheetType="pivot"
    dataCfg={s2DataConfig}
    options={{ width: 400, height: 200 }}
  />
);
```

### Display Modes (hierarchyType)

#### Grid Mode (flat)

Each dimension level has an independent column. No expand/collapse support.

```ts
const s2Options = { hierarchyType: 'grid' };
```

#### Tree Mode

All dimension levels share one column, with indentation to distinguish levels. Supports expand/collapse.

```ts
const s2Options = { hierarchyType: 'tree' };
```

#### Grid-Tree Mode

Combines grid and tree: each dimension level has an independent column, with expand/collapse support.

```ts
const s2Options = {
  hierarchyType: 'grid-tree',
  style: {
    rowCell: {
      expandDepth: 1, // default expand level (starts from 0)
    },
  },
};
```

### Series Number (Row Index)

```ts
const s2Options = {
  seriesNumber: {
    enable: true,
    text: 'No.' // custom header text
  },
};
```

### Frozen Row Header

By default, the row header area is frozen (has its own scrollable area). Disable with:

```ts
const s2Options = {
  frozen: {
    rowHeader: false, // default: true
  },
};
```

Control the max frozen width ratio (default `0.5`, range `0-1`):

```ts
const s2Options = {
  frozen: {
    rowHeader: 0.2,
  },
};
```

### Frozen Rows and Columns

```ts
const s2Options = {
  frozen: {
    rowCount: 1,          // freeze N leaf rows from top
    trailingRowCount: 1,  // freeze N leaf rows from bottom
    colCount: 1,          // freeze N leaf columns from left
    trailingColCount: 1,  // freeze N leaf columns from right
  },
};
```

---

## TableSheet (Detail Table)

The detail table (TableSheet) is a flat table that displays raw data rows directly under column headers. It's ideal for high-volume detail data scenarios and can replace DOM-based table components for better performance.

TableSheet shares many capabilities with PivotSheet: basic interactions, theming, copy/export, and custom cells. It additionally supports row/column freezing.

### Data Configuration

For TableSheet, only `columns` is needed in `fields` (no `rows` or `values`):

```ts
const s2DataConfig = {
  fields: {
    columns: ['province', 'city', 'type', 'price'],
  },
  meta: [
    { field: 'province', name: 'Province' },
    { field: 'city', name: 'City' },
    { field: 'type', name: 'Type' },
    { field: 'price', name: 'Price' },
  ],
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Pen', price: '1' },
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Paper', price: '2' },
  ],
};
```

### Basic Usage

```ts
import { TableSheet } from '@antv/s2';

async function bootstrap() {
  const container = document.getElementById('container');
  const s2 = new TableSheet(container, s2DataConfig, s2Options);
  await s2.render();
}

bootstrap();
```

### React Usage

```tsx
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App = () => (
  <SheetComponent
    sheetType="table"
    dataCfg={s2DataConfig}
    options={{ width: 400, height: 200 }}
  />
);
```

### Row/Column Freezing

```ts
const s2Options = {
  frozen: {
    rowCount: 2,           // freeze rows from top
    trailingRowCount: 1,   // freeze rows from bottom
    colCount: 1,           // freeze columns from left
    trailingColCount: 1,   // freeze columns from right
  },
};
```

### Series Number

```ts
const s2Options = {
  seriesNumber: {
    enable: true,
    text: 'No.'
  },
};
```

---

## When to Use Each Type

| Scenario | Sheet Type |
|----------|-----------|
| Multi-dimensional aggregation/cross-analysis | **PivotSheet** |
| Exploring relationships between multiple dimensions | **PivotSheet** |
| Displaying raw detail/record data | **TableSheet** |
| Large-volume flat data with column-based layout | **TableSheet** |
| Need subtotals/grand totals | **PivotSheet** |
| Simple list with sorting and filtering | **TableSheet** |

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/02-framework-bindings.md ===
# Framework Bindings (React & Vue)

## React: @antv/s2-react

The `@antv/s2-react` package provides `<SheetComponent />`, a ready-to-use React wrapper around `@antv/s2`.

### Installation

```bash
npm install @antv/s2 @antv/s2-react
```

### Basic Usage

```tsx
import React from 'react';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

const App = () => (
  <SheetComponent
    sheetType="pivot"
    dataCfg={s2DataConfig}
    options={{ width: 600, height: 400 }}
  />
);
```

### SheetComponent Props (SpreadsheetProps)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `sheetType` | `'pivot' \| 'table' \| 'gridAnalysis' \| 'strategy' \| 'editable'` | `'pivot'` | | Sheet type |
| `dataCfg` | `S2DataConfig` | | ✓ | Data configuration |
| `options` | `SheetComponentOptions` | | ✓ | Table options (extends `S2Options`, tooltip content accepts `ReactNode`) |
| `themeCfg` | `ThemeCfg` | | | Custom theme configuration |
| `adaptive` | `boolean \| { width?: boolean, height?: boolean, getContainer: () => HTMLElement }` | `false` | | Auto-resize with window |
| `loading` | `boolean` | | | Loading state |
| `partDrillDown` | `PartDrillDown` | | | Drill-down configuration |

### Key Event Props

Events are passed as `onXxx` props on `<SheetComponent />`:

| Prop | Description |
|------|-------------|
| `onRowCellClick` | Row header cell click |
| `onColCellClick` | Column header cell click |
| `onDataCellClick` | Data cell click |
| `onCornerCellClick` | Corner header cell click |
| `onDataCellHover` | Data cell hover |
| `onRowCellCollapsed` | Row expand/collapse callback |
| `onDataCellBrushSelection` | Data cell brush selection |
| `onMounted` | Table instance mounted (receives `SpreadSheet` instance) |
| `onDestroy` | Table destroyed |
| `onScroll` | Cell scroll event |
| `onCopied` | Copy event |
| `onAfterRender` | Render complete |
| `onLayoutResizeColWidth` | Column width resize |
| `onLayoutResizeRowHeight` | Row height resize |

### Getting the S2 Instance in React

Use the `onMounted` callback to access the underlying `SpreadSheet` instance:

```tsx
const App = () => {
  const s2Ref = React.useRef<SpreadSheet>();

  return (
    <SheetComponent
      sheetType="pivot"
      dataCfg={s2DataConfig}
      options={s2Options}
      onMounted={(instance) => {
        s2Ref.current = instance;
      }}
    />
  );
};
```

### Using @antv/s2 Directly in React

If you need more control, use the core library directly:

```tsx
import React from 'react';
import { PivotSheet } from '@antv/s2';

const App = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const s2 = new PivotSheet(containerRef.current, dataCfg, options);
    s2.render();

    return () => {
      s2.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
};
```

---

## Vue 3: @antv/s2-vue

The `@antv/s2-vue` package provides a `<SheetComponent />` for Vue 3.0.

### Installation

```bash
npm install @antv/s2 @antv/s2-vue
```

### Basic Usage (Pivot Table)

```vue
<template>
  <SheetComponent
    :sheetType="'pivot'"
    :dataCfg="s2DataConfig"
    :options="s2Options"
    @rowCellClick="handleRowCellClick"
  />
</template>

<script setup>
import { SheetComponent } from '@antv/s2-vue';
import '@antv/s2-vue/dist/s2-vue.min.css';

const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
  },
  data: [/* ... */],
};

const s2Options = { width: 600, height: 400 };

const handleRowCellClick = (data) => {
  console.log('Row clicked:', data);
};
</script>
```

### Basic Usage (Detail Table)

```vue
<template>
  <SheetComponent
    :sheetType="'table'"
    :dataCfg="s2DataConfig"
    :options="s2Options"
  />
</template>
```

### Vue Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `sheetType` | `'pivot' \| 'table' \| 'editable'` | `'pivot'` | | Sheet type |
| `dataCfg` | `S2DataConfig` | | ✓ | Data configuration |
| `options` | `SheetComponentOptions` | | ✓ | Table options |
| `themeCfg` | `ThemeCfg` | | | Custom theme configuration |
| `adaptive` | `boolean \| { width?: boolean, height?: boolean, getContainer: () => HTMLElement }` | `false` | | Auto-resize with window |
| `loading` | `boolean` | | | Loading state |
| `showPagination` | `boolean \| { onShowSizeChange?, onChange? }` | `false` | | Show default pagination (requires `pagination` in options) |

### Vue Events

Events use camelCase names (without `on` prefix), e.g., `@rowCellClick`:

| Event | Description |
|-------|-------------|
| `rowCellClick` | Row header cell click |
| `colCellClick` | Column header cell click |
| `dataCellClick` | Data cell click |
| `cornerCellClick` | Corner header cell click |
| `dataCellHover` | Data cell hover |
| `rowCellCollapsed` | Row expand/collapse |
| `colCellExpanded` | Column expand (hidden columns) |
| `colCellHidden` | Column hidden |
| `rowCellRender` | Row cell render |
| `colCellRender` | Column cell render |
| `dataCellRender` | Data cell render |
| `scroll` | Cell scroll event |

### Vue Custom Table Instance

Pass a `spreadsheet` factory function via event:

```vue
<template>
  <SheetComponent
    :dataCfg="dataCfg"
    :options="options"
    @spreadsheet="createSpreadSheet"
  />
</template>

<script setup>
import { PivotSheet } from '@antv/s2';

const createSpreadSheet = (container, dataCfg, options) => {
  return new PivotSheet(container, dataCfg, options);
};
</script>
```

---

## Comparison

| Feature | React (`@antv/s2-react`) | Vue (`@antv/s2-vue`) |
|---------|--------------------------|----------------------|
| Component | `<SheetComponent />` | `<SheetComponent />` |
| Sheet types | pivot, table, gridAnalysis, strategy, editable | pivot, table, editable |
| Events | `onXxxClick` props | `@xxxClick` events |
| Tooltip content | `ReactNode` (JSX) | Vue slots / render |
| Instance access | `onMounted` prop | `spreadsheet` event |
| CSS import | `@antv/s2-react/dist/s2-react.min.css` | `@antv/s2-vue/dist/s2-vue.min.css` |

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/03-theme-style.md ===
# Theme & Style Configuration

## Built-in Themes

S2 provides 4 built-in themes:

| Theme Name | Description |
|-----------|-------------|
| `default` | Default theme |
| `colorful` | Colorful blue theme |
| `gray` | Minimalist gray theme |
| `dark` | Dark theme |

### Selecting a Built-in Theme

```ts
const s2 = new PivotSheet(container, s2DataConfig, s2Options);

s2.setThemeCfg({ name: 'colorful' });
await s2.render(false);
```

## Theme Architecture

### Palette

A palette defines the color source for theme generation:

- `basicColors`: 15 color slots that determine the table's color scheme. Theme generation pulls colors from fixed indices (e.g., row header background always uses `basicColors[1]`).
- `basicColorRelations`: Maps `basicColors` indices to the standard 11-color palette derived from a theme color.
- `semanticColors`: Semantic colors like `red`, `green`.
- `others`: Special fixed colors (e.g., search highlight).

### Theme Schema (S2Theme)

The full theme schema (`S2Theme`) describes all visual properties: colors, line widths, font sizes, text alignment, etc. All colors in the schema are derived from the palette.

## Custom Theme Methods

### Method 1: Custom Schema

Override specific theme properties using `setTheme()` or `setThemeCfg({ theme })`:

```ts
const s2 = new PivotSheet(container, s2DataConfig, s2Options);

s2.setTheme({
  background: {
    color: '#353c59',
  },
});
await s2.render(false);
```

### Customize Cell Background Color

```ts
s2.setTheme({
  rowCell: {
    cell: {
      backgroundColor: '#dcdcdc',
    },
  },
});
```

### Customize Cell Text Alignment

Cell text types: `text` (normal), `bolderText` (bold), `seriesText` (series number), `measureText` (measure values).

```ts
s2.setTheme({
  rowCell: {
    text: { textAlign: 'left' },
    bolderText: { textAlign: 'left' },
    seriesText: { textAlign: 'left' },
    measureText: { textAlign: 'left' },
  },
});
```

### Customize Scrollbar

```ts
s2.setTheme({
  scrollBar: {
    thumbColor: '#666',
    thumbHorizontalMinSize: 20,
    thumbVerticalMinSize: 20,
  },
});
```

### Method 2: Custom Palette

Provide your own `basicColors` and `semanticColors`:

```ts
const customPalette = {
  basicColors: [
    '#FFFFFF', '#F8F5FE', '#EDE1FD', '#873BF4', '#7232CF',
    '#AB76F7', '#FFFFFF', '#DDC7FC', '#9858F5', '#B98EF8',
    '#873BF4', '#282B33', '#121826',
  ],
  semanticColors: {
    red: '#FF4D4F',
    green: '#29A294',
  },
};

s2.setThemeCfg({ palette: customPalette });
await s2.render(false);
```

### Method 3: Auto-generate Palette from Theme Color

```ts
import { getPalette, generatePalette, PivotSheet } from '@antv/s2';

const themeColor = '#EA1720';
const palette = getPalette('colorful'); // use built-in as reference
const newPalette = generatePalette({ ...palette, brandColor: themeColor });

s2.setThemeCfg({ palette: newPalette });
await s2.render(false);
```

---

## Style Configuration (s2Options.style)

The `style` property in `S2Options` controls cell dimensions and layout.

### Top-level Style Properties

| Property | Type | Description |
|----------|------|-------------|
| `layoutWidthType` | `'adaptive' \| 'colAdaptive' \| 'compact'` | Cell width layout mode |
| `compactExtraWidth` | `number` | Extra width added in compact mode (default: 0) |
| `compactMinWidth` | `number` | Minimum cell width in compact mode (default: 0) |
| `dataCell` | `DataCell` | Data cell configuration |
| `rowCell` | `RowCell` | Row header cell configuration |
| `colCell` | `ColCell` | Column header cell configuration |
| `cornerCell` | `CornerCell` | Corner header cell configuration |

### layoutWidthType Options

- **`adaptive`**: Rows and columns share equal width, evenly dividing the entire canvas width.
- **`colAdaptive`**: Row headers use compact width; columns evenly divide remaining canvas width.
- **`compact`**: Both row and column headers use compact width based on content (samples the first 50 rows per column).

```ts
const s2Options = {
  style: {
    layoutWidthType: 'compact',
    compactExtraWidth: 12,
    compactMinWidth: 60,
  },
};
```

### DataCell Style

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number` | 96 | Cell width (priority: `colCell.widthByField > colCell.width > dataCell.width`) |
| `height` | `number` | 30 | Cell height (priority: `rowCell.heightByField > rowCell.height > dataCell.height`) |

### ColCell Style

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number \| (colNode) => number` | 96 | Leaf node width |
| `height` | `number \| (colNode) => number` | 30 | Cell height |
| `widthByField` | `Record<string, number>` | | Width per specific field or node ID |
| `heightByField` | `Record<string, number>` | | Height per specific field or node ID |
| `hideValue` | `boolean` | false | Hide value row in column header (single value only) |

### RowCell Style

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number \| (rowNode) => number` | | Row cell width |
| `treeWidth` | `number` | | Width in tree mode (overrides `width`) |
| `height` | `number \| (rowNode) => number` | 30 | Row cell height |
| `widthByField` | `Record<string, number>` | | Width per specific field |
| `heightByField` | `Record<string, number>` | | Height per specific field or row index (TableSheet) |
| `collapseAll` | `boolean` | false | Collapse all rows in tree mode |
| `expandDepth` | `number` | | Default expand depth in tree mode (0-based) |
| `collapseFields` | `Record<string, boolean>` | | Custom collapse state per node ID or field |

### Text Word Wrap Configuration

Applies to all cell types:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `wordWrap` | `boolean` | `true` | Enable text auto-wrap |
| `maxLines` | `number` | `1` | Max text lines before truncation |
| `textOverflow` | `string` | `'ellipsis'` | Overflow indicator text |

### Example: Custom Cell Sizes

```ts
const s2Options = {
  style: {
    dataCell: {
      width: 100,
      height: 40,
    },
    rowCell: {
      width: 80,
      heightByField: {
        'root[&]Zhejiang[&]Hangzhou': 60,
      },
    },
    colCell: {
      width: 120,
      height: 50,
    },
  },
};
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/04-custom-cell.md ===
# Custom Cell Rendering

## 概述

S2 allows full customization of cell rendering through two main approaches:

1. **Cell class hooks** in `S2Options`: Replace cell classes via `dataCell`, `colCell`, `rowCell`, `cornerCell`.
2. **Drawing custom shapes**: Use `@antv/g` graphics API to add arbitrary shapes to cells or the canvas.

Each S2 cell is a [Group](https://g.antv.antgroup.com/api/basic/group) from the `@antv/g` graphics library. You can add any G shape (Rect, Image, Text, etc.) or even embed charts from `@antv/g2`.

## Custom Cell via S2Options Hooks

The `S2Options` object accepts factory functions that return custom cell instances:

```ts
const s2Options = {
  dataCell: (viewMeta, spreadsheet) => {
    return new CustomDataCell(viewMeta, spreadsheet);
  },
  colCell: (node, spreadsheet, headerConfig) => {
    return new CustomColCell(node, spreadsheet, headerConfig);
  },
  rowCell: (node, spreadsheet, headerConfig) => {
    return new CustomRowCell(node, spreadsheet, headerConfig);
  },
  cornerCell: (node, spreadsheet, headerConfig) => {
    return new CustomCornerCell(node, spreadsheet, headerConfig);
  },
};
```

## Extending Base Cell Classes

S2 provides base classes to extend: `DataCell`, `ColCell`, `RowCell`, `CornerCell`.

### Example: Custom Corner Cell with Background Image

```ts
import { Image as GImage } from '@antv/g';
import { CornerCell } from '@antv/s2';

class CustomCornerCell extends CornerCell {
  drawBackgroundShape() {
    const url = 'https://example.com/bg.png';
    this.backgroundShape = this.appendChild(
      new GImage({
        style: {
          ...this.getBBoxByType(),
          src: url,
        },
      }),
    );
    this.drawTextShape();
  }
}

const s2Options = {
  cornerCell: (node, spreadsheet, headerConfig) => {
    return new CustomCornerCell(node, spreadsheet, headerConfig);
  },
};
```

### Example: Custom Data Cell with Extra Shapes

```ts
import { Rect } from '@antv/g';
import { DataCell } from '@antv/s2';

class CustomDataCell extends DataCell {
  initCell() {
    super.initCell();
    // Add a custom colored indicator
    this.appendChild(
      new Rect({
        style: {
          x: 0,
          y: 0,
          width: 4,
          height: this.getMeta().height,
          fill: '#1890FF',
        },
      }),
    );
  }
}

const s2Options = {
  dataCell: (viewMeta, spreadsheet) => {
    return new CustomDataCell(viewMeta, spreadsheet);
  },
};
```

## Drawing Shapes Directly on Canvas

After rendering, you can add shapes directly to the canvas:

```ts
import { Rect } from '@antv/g';

await s2.render();

s2.getCanvas().appendChild(
  new Rect({
    style: {
      x: 300,
      y: 200,
      width: 100,
      height: 100,
      fill: '#1890FF',
      fillOpacity: 0.8,
      stroke: '#F04864',
      lineWidth: 4,
      radius: 100,
      zIndex: 999,
    },
  }),
);
```

## Drawing Shapes on Specific Cells

Get a cell instance and append shapes to it:

```ts
import { Rect } from '@antv/g';

await s2.render();

const targetCell = s2.facet.getDataCells()[0];
targetCell?.appendChild(
  new Rect({
    style: {
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: '#396',
      fillOpacity: 0.8,
      radius: 10,
      zIndex: 999,
    },
  }),
);
```

## Adding Custom Icons to Cells

```ts
import { GuiIcon } from '@antv/s2';

await s2.render();

const targetCell = s2.facet.getDataCells()[0];
const meta = targetCell.getMeta();
const size = 12;

const icon = new GuiIcon({
  x: meta.x + meta.width - size,
  y: meta.y + meta.height - size,
  name: 'Trend',
  width: size,
  height: size,
  fill: 'red',
});

icon.addEventListener('click', (e) => {
  console.log('icon clicked:', e);
});

targetCell.appendChild(icon);
```

---

## Custom Cell Size Configuration

Cell sizes are controlled via `s2Options.style`. See the Theme & Style reference for full details.

### Quick Reference: Size Priority

**Data cell width**: `colCell.widthByField > colCell.width > dataCell.width`
**Data cell height**: `rowCell.heightByField > rowCell.height > dataCell.height`

### Setting Data Cell Size

```ts
const s2Options = {
  style: {
    dataCell: { width: 100, height: 90 },
  },
};
```

### Dynamic Row Header Size

```ts
const s2Options = {
  style: {
    rowCell: {
      width: (rowNode) => (rowNode.isLeaf ? 300 : 200),
      height: (rowNode) => (rowNode.level % 2 === 0 ? 300 : null), // null = default
    },
  },
};
```

### Per-field Width/Height

```ts
import { EXTRA_FIELD } from '@antv/s2';

const s2Options = {
  style: {
    rowCell: {
      widthByField: {
        city: 100,
        'root[&]Zhejiang[&]Hangzhou': 60,
        [EXTRA_FIELD]: 20,
      },
      heightByField: {
        'root[&]Zhejiang[&]Hangzhou': 60,
      },
    },
  },
};
```

### Dynamic Column Header Size

```ts
const s2Options = {
  style: {
    colCell: {
      width: (colNode) => (colNode.colIndex <= 2 ? 100 : 50),
      height: (colNode) => (colNode.colIndex <= 2 ? 100 : null),
    },
  },
};
```

### Hiding Column Headers

Set height to `0` to hide column headers:

```ts
const s2Options = {
  style: {
    colCell: { height: 0 },
  },
};
```

Optionally hide the split line:

```ts
s2.setTheme({
  splitLine: {
    horizontalBorderColorOpacity: 0,
  },
});
```

### TableSheet Row Height

For TableSheet, use `rowCell.heightByField` with **row indices** (0-based):

```ts
const s2Options = {
  style: {
    rowCell: {
      height: 40,
      heightByField: {
        '0': 130,  // first row
        '2': 60,   // third row
      },
    },
  },
};
```

---

## Custom Row/Column Header Grouping

By default, header grouping is generated from the data. You can provide a custom tree structure:

```ts
const customTree = [
  {
    field: 'a-1',
    title: 'Custom Node A-1',
    children: [
      {
        field: 'a-1-1',
        title: 'Custom Node A-1-1',
        children: [
          { field: 'measure-1', title: 'Measure 1', children: [] },
          { field: 'measure-2', title: 'Measure 2', children: [] },
        ],
      },
    ],
  },
];

// Use as row header (pivot table)
const s2DataConfig = {
  fields: {
    rows: customTree,
    columns: ['type', 'sub_type'],
    values: ['measure-1', 'measure-2'],
    valueInCols: false, // values must be in rows when custom row headers
  },
  data: [/* ... */],
};

// Use as column header (pivot or table)
const s2DataConfig = {
  fields: {
    columns: customTree,
    rows: ['type'],
    values: ['measure-1'],
    valueInCols: true,
  },
  data: [/* ... */],
};
```

> **Note**: When using custom headers, default sort icons and subtotal/grand total configurations for the customized axis are not supported.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/05-events-interaction.md ===
# Events & Interaction

## 概述

S2 provides a rich interaction system built on mouse and keyboard events. Common interactions (click, hover, brush selection, multi-select, resize) are built-in. All interactions emit events via `S2Event`, and you can create custom interactions by extending `BaseEvent`.

## Listening to Events

Events are namespaced by category:
- `global:xx` — Global chart events
- `layout:xx` — Layout change events
- `cell:xx` — Cell-level events (data cell, row cell, col cell, corner cell, etc.)

```ts
import { PivotSheet, S2Event, DataCell, RowCell, ColCell } from '@antv/s2';

const s2 = new PivotSheet(container, s2DataConfig, s2Options);

// Data cell click
s2.on(S2Event.DATA_CELL_CLICK, (event) => {
  console.log('data cell clicked', event);
});

// Column header hover
s2.on(S2Event.COL_CELL_HOVER, (event) => { /* ... */ });

// Brush selection on data cells
s2.on(S2Event.DATA_CELL_BRUSH_SELECTION, (cells: DataCell[]) => {
  console.log('brush selected cells:', cells);
});

// Global keyboard events
s2.on(S2Event.GLOBAL_KEYBOARD_DOWN, (event) => { /* ... */ });

// Global selected (fires on single-select, multi-select, brush, range selection)
s2.on(S2Event.GLOBAL_SELECTED, (cells) => { /* ... */ });

// Reset interaction (click outside, press Esc, re-click selected cell)
s2.on(S2Event.GLOBAL_RESET, () => { /* ... */ });
```

### React / Vue Usage

```tsx
// React — using SheetComponent ref
import { S2Event, SpreadSheet } from '@antv/s2';
import { SheetComponent } from '@antv/s2-react';

function App() {
  const s2Ref = React.useRef<SpreadSheet>();
  const onSheetMounted = () => {
    s2Ref.current?.on(S2Event.DATA_CELL_CLICK, (event) => {
      console.log('data cell click:', event);
    });
  };
  return <SheetComponent ref={s2Ref} onMounted={onSheetMounted} />;
}

// React — using event props (recommended)
<SheetComponent onDataCellClick={handler} />

// Vue
<SheetComponent @dataCellClick="handler" />
```

## Built-in Interactions

| Interaction | Event | Description |
|---|---|---|
| Single Select | `GLOBAL_SELECTED` | Click a cell to select it, show tooltip. Click again to deselect. |
| Multi Select | `GLOBAL_SELECTED` | Hold `Cmd/Ctrl` and click additional cells. |
| Row/Col Header Quick Select | `GLOBAL_SELECTED` | Click row/col header to select all cells in that row/col (including off-screen). |
| Brush Selection | `DATA_CELL_BRUSH_SELECTION`, `GLOBAL_SELECTED` | Drag to batch-select data cells. Shows overlay during selection. |
| Row Header Brush | `ROW_CELL_BRUSH_SELECTION`, `GLOBAL_SELECTED` | Drag to batch-select row header cells (pivot table only). |
| Col Header Brush | `COL_CELL_BRUSH_SELECTION`, `GLOBAL_SELECTED` | Drag to batch-select column header cells. |
| Range Selection | `GLOBAL_SELECTED` | Click start cell, then `Shift+click` end cell to select range. |
| Hover | `GLOBAL_HOVER` | Highlight current cell on hover. Cross-highlight (row+col) for data cells by default. |
| Resize | `LAYOUT_RESIZE` | Drag row/col header edges to adjust dimensions. |
| Copy | `GLOBAL_COPIED` | Copy selected cell data. |
| Hide Columns | `COL_CELL_HIDDEN`, `COL_CELL_EXPANDED` | Hide/expand column headers. |
| Link Jump | `GLOBAL_LINK_FIELD_JUMP` | Click link-style fields for navigation. |
| Reset | `GLOBAL_RESET` | Click outside, press `Esc`, or re-click to reset selection. |
| Move Highlight | `GLOBAL_SELECTED` | After selecting a data cell, use arrow keys to move highlight. |

## Interaction Configuration

All interaction settings are under `s2Options.interaction`:

```ts
const s2Options = {
  interaction: {
    // Spotlight effect: dim unselected cells when a cell is selected
    selectedCellsSpotlight: false,

    // Cross-highlight on hover (row+col headers and cells)
    hoverHighlight: true,
    // Can also be an object: { rowHeader: true, colHeader: true, currentRow: true, currentCol: true }

    // Hover focus: show tooltip after hovering 800ms (configurable)
    hoverFocus: true, // or { duration: 800 } or false

    // Highlight row/col headers when a data cell is selected
    selectedCellHighlight: false,
    // Or: { rowHeader: true, colHeader: true, currentRow: true, currentCol: true }

    // Brush selection (drag to select)
    brushSelection: true,
    // Or: { dataCell: true, rowCell: false, colCell: false }

    // Cmd/Ctrl+click multi-select
    multiSelection: true,

    // Shift+click range selection
    rangeSelection: true,

    // Arrow key cell movement after selection
    selectedCellMove: true,

    // Mark fields as link style for navigation
    linkFields: [], // string[] or (meta) => boolean

    // Default hidden columns (use column unique IDs for pivot tables)
    hiddenColumnFields: [],

    // Copy settings
    copy: {
      enable: true,
      withFormat: true,
      withHeader: false,
    },

    // Custom interactions
    customInteractions: [],

    // Scroll speed ratio
    scrollSpeedRatio: { horizontal: 1, vertical: 1 },

    // Reset interaction when clicking outside or pressing Esc
    autoResetSheetStyle: true,
    // Or a function: (event, spreadsheet) => boolean

    // Resize configuration
    resize: true,
    // Or: { rowCellVertical: true, cornerCellHorizontal: true, colCellHorizontal: true, colCellVertical: true, rowResizeType: 'current', colResizeType: 'current', minCellWidth: 40, minCellHeight: 20 }

    // Scrollbar position: 'content' | 'canvas'
    scrollbarPosition: 'content',

    // Overscroll behavior: 'auto' | 'contain' | 'none' | null
    overscrollBehavior: 'auto',
  },
};
```

## Interaction Intercepts

Block specific interaction events using intercepts:

```ts
import { InterceptType } from '@antv/s2';

// Add intercepts (prevent hover and click)
s2.interaction.addIntercepts([InterceptType.HOVER, InterceptType.CLICK]);

// Remove intercepts
s2.interaction.removeIntercepts([InterceptType.HOVER, InterceptType.CLICK]);
```

Available `InterceptType` values: `HOVER`, `CLICK`, `DATA_CELL_BRUSH_SELECTION`, `ROW_CELL_BRUSH_SELECTION`, `COL_CELL_BRUSH_SELECTION`, `MULTI_SELECTION`, `RESIZE`.

## Interaction API

The `s2.interaction` namespace provides methods for programmatic interaction:

```ts
s2.interaction.selectAll();
s2.interaction.selectCell(cell);
s2.interaction.highlightCell(cell);
s2.interaction.changeCell(cell);
```

## Custom Interactions

Create custom interactions by extending `BaseEvent`:

```ts
import { BaseEvent, S2Event } from '@antv/s2';

class MyInteraction extends BaseEvent {
  bindEvents() {
    this.spreadsheet.on(S2Event.COL_CELL_DOUBLE_CLICK, (event) => {
      const cell = this.spreadsheet.getCell(event.target);
      const meta = cell.getMeta();
      // Custom logic: e.g., hide the column on double-click
      this.spreadsheet.interaction.hideColumns([meta.field]);
    });
  }
}
```

Register custom interactions:

```ts
const s2Options = {
  interaction: {
    customInteractions: [
      {
        key: 'MyInteraction', // unique identifier
        interaction: MyInteraction,
      },
    ],
  },
};
```

## Key Enums

### InteractionName

```ts
enum InteractionName {
  CORNER_CELL_CLICK = 'cornerCellClick',
  DATA_CELL_CLICK = 'dataCellClick',
  ROW_CELL_CLICK = 'rowCellClick',
  COL_CELL_CLICK = 'colCellClick',
  MERGED_CELLS_CLICK = 'mergedCellsClick',
  HOVER = 'hover',
  DATA_CELL_BRUSH_SELECTION = 'dataCellBrushSelection',
  ROW_CELL_BRUSH_SELECTION = 'rowCellBrushSelection',
  COL_CELL_BRUSH_SELECTION = 'colCellBrushSelection',
  COL_ROW_RESIZE = 'rowColResize',
  DATA_CELL_MULTI_SELECTION = 'dataCellMultiSelection',
  RANGE_SELECTION = 'rangeSelection',
  SELECTED_CELL_MOVE = 'selectedCellMove',
  GLOBAL_RESET = 'globalReset',
}
```

### InteractionStateName

```ts
enum InteractionStateName {
  ALL_SELECTED = 'allSelected',
  SELECTED = 'selected',
  ROW_CELL_BRUSH_SELECTED = 'rowCellBrushSelected',
  COL_CELL_BRUSH_SELECTED = 'colCellBrushSelected',
  DATA_CELL_BRUSH_SELECTED = 'dataCellBrushSelected',
  UNSELECTED = 'unselected',
  HOVER = 'hover',
  HOVER_FOCUS = 'hoverFocus',
  HIGHLIGHT = 'highlight',
  SEARCH_RESULT = 'searchResult',
  PREPARE_SELECT = 'prepareSelect',
}
```

### CellType

```ts
enum CellType {
  DATA_CELL = 'dataCell',
  ROW_CELL = 'rowCell',
  COL_CELL = 'colCell',
  SERIES_NUMBER_CELL = 'seriesNumberCell',
  CORNER_CELL = 'cornerCell',
  MERGED_CELL = 'mergedCell',
}
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/06-data-config.md ===
# S2DataConfig — Data Configuration

## 概述

`S2DataConfig` defines the data source and field mappings for S2 tables. It includes raw data, field dimensions, metadata for formatting/naming, sort parameters, and filter parameters.

```ts
const s2DataConfig = {
  data: [],
  fields: {
    rows: [],
    columns: [],
    values: [],
  },
  meta: [],
  sortParams: [],
  filterParams: [],
};
```

## Top-Level Properties

| Property | Description | Type | Required |
|---|---|---|---|
| `data` | Raw data array | `RawData[]` | ✓ |
| `fields` | Dimension/measure field mapping | `Fields` | ✓ |
| `meta` | Field metadata (aliases, formatting) | `Meta[]` | |
| `sortParams` | Sort configuration | `SortParam[]` | |
| `filterParams` | Filter configuration (detail table only) | `FilterParam[]` | |

## Fields

Configures which data fields map to rows, columns, and values (measures).

| Property | Description | Type | Default |
|---|---|---|---|
| `rows` | Row dimensions (can use custom tree nodes) | `string[]` \| `CustomTreeNode[]` | `[]` |
| `columns` | Column dimensions (can use custom tree nodes) | `string[]` \| `CustomTreeNode[]` | `[]` |
| `values` | Measure/value fields | `string[]` | `[]` |
| `valueInCols` | Whether values appear in column headers | `boolean` | `true` |
| `customValueOrder` | Custom order of values in row/column hierarchy (0-based index) | `number` | - |

### Example

```ts
const s2DataConfig = {
  data: [
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Furniture', price: 100 },
    { province: 'Zhejiang', city: 'Ningbo', type: 'Furniture', price: 200 },
  ],
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
    valueInCols: true, // values displayed in column headers (default)
  },
};
```

## Meta

Field metadata for configuring display names and value formatting. Applies to row headers, column headers, and data cells (corner cells do not support formatting).

| Property | Description | Type | Required |
|---|---|---|---|
| `field` | Field ID (matches fields in `Fields`). Supports string, string array, or RegExp. | `string \| string[] \| RegExp` | |
| `name` | Display name (alias) for the field | `string` | |
| `description` | Field description, shown in tooltips for row/col headers and cells | `string` | |
| `formatter` | Formatting function. For text fields: used for enum aliases. For numeric fields: used for unit formatting. Second parameter (`data`) exists only for data cells. | `(value, data?, meta?) => string` | |
| `renderer` | Cell render type (image, video, etc.) | `Renderer` | |

### Formatter Function Signature

```ts
formatter: (
  value: unknown,
  data?: Data | Data[],   // only for data cells; array when multiple cells selected in tooltip
  meta?: Node | ViewMeta
) => string
```

### Example

```ts
const s2DataConfig = {
  data: [...],
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
  },
  meta: [
    {
      field: 'province',
      name: 'Province',  // display alias
    },
    {
      field: 'city',
      name: 'City',
    },
    {
      field: 'price',
      name: 'Price',
      description: 'Total sales price',
      formatter: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      // Match multiple fields with array
      field: ['type'],
      name: 'Category',
    },
  ],
};
```

### Renderer

For rendering images or videos in cells:

| Property | Description | Type | Default |
|---|---|---|---|
| `type` | Render type | `'IMAGE' \| 'VIDEO'` | (required) |
| `clickToPreview` | Enable click-to-preview for images/videos | `boolean` | `true` |
| `fallback` | Fallback text if image/video fails to load | `string` | |
| `timeout` | Load timeout in milliseconds | `number` | `10000` |

## FilterParam (Detail Table Only)

| Property | Description | Type | Required |
|---|---|---|---|
| `filterKey` | Field ID to filter on | `string` | ✓ |
| `filteredValues` | Values to exclude | `unknown[]` | |
| `customFilter` | Custom filter function. Final result: passes `customFilter` AND not in `filteredValues`. | `(raw: Record<string, string>) => boolean` | |

### Example

```ts
const s2DataConfig = {
  data: [...],
  fields: { columns: ['province', 'city', 'price'] },
  filterParams: [
    {
      filterKey: 'province',
      filteredValues: ['Zhejiang'],
    },
    {
      filterKey: 'city',
      customFilter: (row) => row.city !== 'Hangzhou',
    },
  ],
};
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/07-sort.md ===
# Sorting

## 概述

S2 supports multiple sorting methods for table data: ascending/descending by field value, sorting by a custom list, sorting by measure values, and fully custom sort functions. Sorting is configured via `sortParams` in `S2DataConfig`.

## SortParam Configuration

| Property | Description | Type | Default | Required |
|---|---|---|---|---|
| `sortFieldId` | Field ID to sort by | `string` | - | ✓ |
| `sortMethod` | Sort direction | `'ASC' \| 'DESC' \| 'asc' \| 'desc'` | - | |
| `sortBy` | Custom ordered list of dimension values | `string[]` | - | |
| `sortByMeasure` | Sort by a measure value (pivot table) | `string` | - | |
| `query` | Filter condition to narrow sort scope, e.g. `{ city: 'Beijing' }` | `Record<string, string>` | - | |
| `type` | Group sort — used to display sort icon (pivot table) | `string` | - | |
| `sortFunc` | Custom sort function | `(params: SortFuncParam) => string[]` | - | |
| `nullsPlacement` | Position of null values in sort | `'first' \| 'last' \| 'auto'` | `'last'` | |

### nullsPlacement

Controls where empty values (`null`, `undefined`, `'-'`, empty string) appear:

| Value | Behavior |
|---|---|
| `'first'` | Nulls always appear first |
| `'last'` | Nulls always appear last (default, matches Excel/Google Sheets behavior) |
| `'auto'` | Ascending: nulls first; Descending: nulls last |

Use `sortFieldId: '*'` as a wildcard for global default null placement. Specific field configs take priority over the wildcard.

> When `sortFunc` is defined, it takes full control — `nullsPlacement` is ignored.

## Sort Methods

### 1. Ascending/Descending (`sortMethod`)

Sort row/column header values. Supports numbers, numeric strings, and general strings (falls back to `localeCompare`).

```ts
const s2DataConfig = {
  sortParams: [
    { sortFieldId: 'province', sortMethod: 'DESC' },
    { sortFieldId: 'type', sortMethod: 'ASC' },
  ],
};
```

### 2. Custom Value List (`sortBy`)

Sort by an explicit ordered list. Multi-level headers perform group-internal sorting.

```ts
const s2DataConfig = {
  sortParams: [
    { sortFieldId: 'province', sortBy: ['Zhejiang', 'Jilin'] },
    { sortFieldId: 'city', sortBy: ['Zhoushan', 'Hangzhou', 'Baishan', 'Changchun'] },
  ],
};
```

### 3. Sort by Measure Value (`sortByMeasure`)

Sort row/col header dimensions by their corresponding numeric (cross-tab) values. Must use `query` to specify which measure column to sort by.

#### Sort by Detail Data

```ts
import { EXTRA_FIELD } from '@antv/s2';

const s2DataConfig = {
  sortParams: [
    {
      sortFieldId: 'city',
      sortByMeasure: 'number',
      sortMethod: 'ASC',
      query: {
        type: 'Office Supplies',
        sub_type: 'Paper',
        [EXTRA_FIELD]: 'number',
      },
    },
  ],
};
```

#### Sort by Aggregated (Total) Data

Use `TOTAL_VALUE` as `sortByMeasure` to sort by subtotal/grand total values:

```ts
import { EXTRA_FIELD, TOTAL_VALUE } from '@antv/s2';

const s2DataConfig = {
  sortParams: [
    {
      sortFieldId: 'province',
      sortByMeasure: TOTAL_VALUE,
      sortMethod: 'ASC',
      query: {
        type: 'Furniture',
        [EXTRA_FIELD]: 'number',
      },
    },
  ],
};
```

### 4. Custom Sort Function (`sortFunc`)

Full control over sorting logic. The function receives a `SortFuncParam` object:

| Property | Description | Type |
|---|---|---|
| `sortFieldId` | Field being sorted | `string` |
| `sortMethod` | Sort direction | `'ASC' \| 'DESC'` |
| `sortBy` | Custom sort list (if provided) | `string[]` |
| `sortByMeasure` | Measure to sort by (if provided) | `string` |
| `query` | Filter conditions | `Record<string, string>` |
| `data` | Current data list to sort | `Array<string \| CellData>` |

#### Sort by Dimension Values

```ts
const s2DataConfig = {
  sortParams: [
    {
      sortFieldId: 'province',
      sortFunc: (params) => {
        const { data } = params;
        return data.sort((a, b) => a.localeCompare(b));
      },
    },
  ],
};
```

#### Sort by Measure Values

```ts
const s2DataConfig = {
  sortParams: [
    {
      sortFieldId: 'city',
      sortByMeasure: 'price',
      query: { type: 'Paper', [EXTRA_FIELD]: 'price' },
      sortFunc: (params) => {
        const { data, sortByMeasure, sortFieldId } = params;
        return data
          .map((item) => item.raw)
          .sort((a, b) => b[sortByMeasure] - a[sortByMeasure])
          .map((item) => item[sortFieldId]);
      },
    },
  ],
};
```

### 5. Null Value Placement (`nullsPlacement`)

```ts
const s2DataConfig = {
  sortParams: [
    // Global: all fields default nulls first
    { sortFieldId: '*', nullsPlacement: 'first' },
    // Override: 'city' field nulls last
    { sortFieldId: 'city', nullsPlacement: 'last' },
  ],
};
```

## Group Sort

Group sort only affects ordering within a group — parent dimension order is preserved. For example, sorting cities within each province by a measure value won't change the province order.

> Only one sort state can exist per row/column header at a time. A new sort replaces the previous one on that axis.

### Using Group Sort API

```ts
const meta = cell.getMeta();

s2.groupSortByMethod('asc', meta);   // ascending
s2.groupSortByMethod('desc', meta);  // descending
s2.groupSortByMethod('none', meta);  // no sort
```

### Listening to Sort Events

```ts
s2.on(S2Event.RANGE_SORT, (sortParams) => {
  console.log('sort params:', sortParams);
});
```

### React Group Sort with Tooltip Menu

```ts
import { Menu } from 'antd';

const s2Options = {
  showDefaultHeaderActionIcon: true,
  tooltip: {
    operation: {
      sort: true,
      menu: {
        render: (props) => <Menu {...props} />,
      },
    },
  },
};
```

## Priority Rules

1. `sortParams` overrides the original data order.
2. Among multiple items in `sortParams`, later items have higher priority.
3. Within a single item: `sortFunc` > `sortBy` > `sortByMeasure` > `sortMethod`.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/08-totals.md ===
# Subtotals & Grand Totals

## 概述

S2 supports subtotals and grand totals for pivot tables. Row and column headers can each have independent aggregation configuration. Grand totals summarize all dimensions; subtotals summarize a specific dimension. Totals are **not available** when using custom row/column headers.

## Configuration

Configure via `s2Options.totals`:

```ts
const s2Options = {
  totals: {
    row: { /* Total config for rows */ },
    col: { /* Total config for columns */ },
  },
};
```

## Totals Type

| Property | Description | Type | Default |
|---|---|---|---|
| `row` | Row totals configuration (disabled when using custom row headers) | `Total` | - |
| `col` | Column totals configuration (disabled when using custom column headers) | `Total` | - |

## Total

| Property | Description | Type | Default |
|---|---|---|---|
| `showGrandTotals` | Whether to show grand totals | `boolean` | `false` |
| `showSubTotals` | Whether to show subtotals. Object form: `{ always: boolean }` controls display when sub-dimensions < 2. | `boolean \| { always: boolean }` | `false` |
| `subTotalsDimensions` | Dimensions to aggregate for subtotals | `string[]` | `[]` |
| `reverseGrandTotalsLayout` | Grand total position — `true` places it at top/left instead of default bottom/right | `boolean` | `false` |
| `reverseSubTotalsLayout` | Subtotal position — `true` places it at top/left instead of default bottom/right | `boolean` | `false` |
| `grandTotalsLabel` | Display label for grand totals | `string` | `'Grand Total'` |
| `subTotalsLabel` | Display label for subtotals | `string` | `'Subtotal'` |
| `calcGrandTotals` | Custom grand total calculation | `CalcTotals` | - |
| `calcSubTotals` | Custom subtotal calculation | `CalcTotals` | - |
| `grandTotalsGroupDimensions` | Dimensions for grouped grand totals | `string[]` | - |
| `subTotalsGroupDimensions` | Dimensions for grouped subtotals | `string[]` | - |

## CalcTotals

| Property | Description | Type |
|---|---|---|
| `aggregation` | Built-in aggregation method | `'SUM' \| 'MIN' \| 'MAX' \| 'AVG' \| 'COUNT'` |
| `calcFunc` | Custom calculation function | `(query: Record<string, any>, data: Record<string, any>[], spreadsheet: SpreadSheet) => number` |

## Basic Example

```ts
const s2Options = {
  totals: {
    row: {
      showGrandTotals: true,
      showSubTotals: true,
      reverseGrandTotalsLayout: true,   // grand total at top
      reverseSubTotalsLayout: true,     // subtotals at top
      subTotalsDimensions: ['province'], // subtotal by province
      calcGrandTotals: {
        aggregation: 'SUM',
      },
      calcSubTotals: {
        aggregation: 'SUM',
      },
    },
    col: {
      showGrandTotals: true,
      showSubTotals: true,
      reverseGrandTotalsLayout: true,
      reverseSubTotalsLayout: true,
      subTotalsDimensions: ['type'],
      calcGrandTotals: {
        aggregation: 'SUM',
      },
      calcSubTotals: {
        aggregation: 'SUM',
      },
    },
  },
};
```

## Custom Calculation Function

Use `calcFunc` for custom aggregation logic:

```ts
const s2Options = {
  totals: {
    row: {
      showGrandTotals: true,
      showSubTotals: true,
      subTotalsDimensions: ['province'],
      calcGrandTotals: {
        calcFunc: (query, data, spreadsheet) => {
          // `data` is detail-level data matching the query
          // Return the computed total value
          return data.reduce((sum, item) => sum + (item.price || 0), 0);
        },
      },
      calcSubTotals: {
        calcFunc: (query, data, spreadsheet) => {
          return data.reduce((sum, item) => sum + (item.price || 0), 0);
        },
      },
    },
  },
};
```

To access data that includes other aggregated totals (not just detail data):

```ts
import { QueryDataType } from '@antv/s2';

const calcFunc = (query, data, spreadsheet) => {
  const allData = spreadsheet.dataSet.getCellMultiData({
    query,
    queryType: QueryDataType.All, // includes totals
  });
  // Use allData for computation
};
```

## Providing Totals Data Directly

Instead of computing totals, you can include pre-calculated total/subtotal rows in the `data` array. Totals rows omit the dimension keys they aggregate over:

```ts
const s2DataConfig = {
  data: [
    // Regular data
    { province: 'Zhejiang', city: 'Hangzhou', type: 'Pen', price: 1 },
    // Grand total (no dimension keys)
    { price: 15.5 },
    // Row subtotal for Zhejiang (omits city)
    { province: 'Zhejiang', price: 5.5 },
    // Cross subtotal: Zhejiang × Pen
    { province: 'Zhejiang', type: 'Pen', price: 3 },
    // Column subtotal for Pen (omits row dimensions)
    { type: 'Pen', price: 10 },
  ],
};
```

## Priority Rules

1. **Data-provided totals** take priority over calculated totals.
2. `calcFunc` takes priority over `aggregation` (i.e., `calcFunc > aggregation`).
3. When a cell is at the intersection of both row and column totals, **column totals take priority** over row totals.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/09-copy-export.md ===
# Copy & Export

## 概述

S2 provides built-in copy and export functionality. Copy writes both `text/html` and `text/plain` to the clipboard. Export supports CSV format by default. For XLSX export, use external libraries like `exceljs` or `sheetjs`.

## Copy Configuration

Configure copy behavior in `s2Options.interaction.copy`:

```ts
const s2Options = {
  interaction: {
    copy: {
      enable: true,       // enable copy (default: true)
      withFormat: true,    // use Meta formatter when copying (default: true)
      withHeader: false,   // include row/col headers in copied data (default: false)
      customTransformer: undefined, // custom data transformer
    },
  },
};
```

| Property | Description | Type | Default |
|---|---|---|---|
| `enable` | Enable copy | `boolean` | `true` |
| `withFormat` | Apply `S2DataConfig.meta` formatter when copying | `boolean` | `true` |
| `withHeader` | Include header rows/columns in copied data | `boolean` | `false` |
| `customTransformer` | Custom data format transformer | `(transformer: Transformer) => Partial<Transformer>` | - |

## Partial Copy (Keyboard Shortcut)

With copy enabled, use `Cmd/Ctrl + C` to copy selected cells. Supports single-select, multi-select, brush selection, and range selection.

```ts
const s2Options = {
  interaction: {
    copy: {
      enable: true,
      withHeader: true,
      withFormat: true,
    },
    brushSelection: { dataCell: true, rowCell: true, colCell: true },
    multiSelection: true,
  },
};
```

## Full Copy (Programmatic)

Three async API methods for getting all table data:

### asyncGetAllData

Returns both `text/plain` and `text/html` data (for clipboard):

```ts
import { asyncGetAllData, copyToClipboard } from '@antv/s2';

const data = await asyncGetAllData({
  sheetInstance: s2,
  split: '\t',
  formatOptions: true,
  // Or: formatOptions: { formatHeader: true, formatData: true }
});

// Write to clipboard
copyToClipboard(data)
  .then(() => console.log('Copy succeeded'))
  .catch(() => console.log('Copy failed'));
```

### asyncGetAllPlainData

Returns `text/plain` data only (for export):

```ts
import { asyncGetAllPlainData } from '@antv/s2';

const data = await asyncGetAllPlainData({
  sheetInstance: s2,
  split: '\t',
  formatOptions: true,
});
```

### asyncGetAllHtmlData

Returns `text/html` data only.

## API Parameters

All three methods accept `CopyAllDataParams`:

| Property | Description | Type | Default | Required |
|---|---|---|---|---|
| `sheetInstance` | S2 table instance | `SpreadSheet` | - | ✓ |
| `split` | Column separator | `string` | - | ✓ |
| `formatOptions` | Apply Meta formatting. Boolean applies to both headers and data. Object allows separate control. | `boolean \| { formatHeader?: boolean, formatData?: boolean }` | `true` | |
| `customTransformer` | Custom data format transformer | `(transformer: Transformer) => Partial<Transformer>` | - | |
| `async` | Async mode (falls back to sync if `requestIdleCallback` unsupported) | `boolean` | `true` | |

## Custom Data Transformer

Override the default `text/plain` and `text/html` output format:

```ts
import { asyncGetAllData } from '@antv/s2';

const data = await asyncGetAllData({
  sheetInstance: s2,
  split: '\t',
  formatOptions: true,
  customTransformer: () => ({
    'text/plain': (data) => ({
      type: 'text/plain',
      content: 'custom plain text',
    }),
    'text/html': (data) => ({
      type: 'text/html',
      content: '<table><tr><td>custom</td></tr></table>',
    }),
  }),
});
```

## Export to CSV

```ts
import { asyncGetAllPlainData, download } from '@antv/s2';

// Get data with comma separator for CSV
const data = await asyncGetAllPlainData({
  sheetInstance: s2,
  split: ',',
  formatOptions: true,
});

// Download as CSV file
download(data, 'filename'); // downloads filename.csv
```

## Clipboard API

### copyToClipboard

| Parameter | Description | Type | Default |
|---|---|---|---|
| `data` | Data to copy | `string` | (required) |
| `async` | Async copy | `boolean` | `true` |

### download

| Parameter | Description | Type |
|---|---|---|
| `data` | Data content | `string` (required) |
| `filename` | File name (without extension) | `string` (required) |

## Key Types

```ts
enum CopyMIMEType {
  PLAIN = 'text/plain',
  HTML = 'text/html',
}

type FormatOptions = boolean | {
  formatHeader?: boolean;
  formatData?: boolean;
};

interface Transformer {
  [CopyMIMEType.PLAIN]: (data: DataItem[][], separator?: string) => CopyablePlain;
  [CopyMIMEType.HTML]: (data: DataItem[][]) => CopyableHTML;
}
```

## Special Character Handling

Per CSV spec and Excel rules:
1. **Field wrapping**: Fields containing `,`, `"`, `\r`, `\n`, or `\t` are wrapped in double quotes.
2. **Quote escaping**: Double quotes `"` inside fields become `""`.
3. **Newlines**: Standalone `\n` is replaced with `\r\n` for Excel compatibility.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/10-pagination.md ===
# Pagination

## 概述

S2 has built-in frontend pagination rendering. It handles data slicing internally but does **not** provide a pagination UI component — you need to implement or integrate one yourself (e.g., Ant Design's `Pagination` component).

## Configuration

Set the `pagination` property in `s2Options`:

```ts
const s2Options = {
  width: 600,
  height: 480,
  pagination: {
    pageSize: 4,   // rows per page
    current: 1,    // current page (1-based)
  },
};
```

## Pagination Type

| Property | Description | Type | Default | Required |
|---|---|---|---|---|
| `pageSize` | Number of rows per page | `number` | - | ✓ |
| `current` | Current page number (starts from 1) | `number` | `1` | ✓ |
| `total` | Total number of data items (read-only, set by S2 internally) | `number` | - | |

## React Integration Example

Combine S2's pagination config with a UI pagination component:

```tsx
import React, { useState } from 'react';
import { SheetComponent } from '@antv/s2-react';
import { Pagination } from 'antd';

function PaginatedTable({ dataCfg }) {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const s2Options = {
    width: 600,
    height: 480,
    pagination: {
      pageSize,
      current,
    },
  };

  return (
    <div>
      <SheetComponent
        dataCfg={dataCfg}
        options={s2Options}
        onMounted={(instance) => {
          setTotal(instance.facet.viewCellHeights.getTotalLength());
        }}
      />
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    </div>
  );
}
```

## Vanilla JS Example

```ts
import { PivotSheet } from '@antv/s2';

const s2Options = {
  width: 600,
  height: 480,
  pagination: {
    pageSize: 5,
    current: 1,
  },
};

const s2 = new PivotSheet(container, s2DataConfig, s2Options);
await s2.render();

// Change page
function goToPage(page) {
  s2.updatePagination({
    current: page,
    pageSize: 5,
  });
  s2.render(false); // re-render without reinitializing
}
```

## Notes

- Pagination is **frontend-only** — all data is loaded upfront; S2 just renders the current page slice.
- For server-side pagination, manage `data` externally and update `s2DataConfig.data` when the page changes.
- The `total` field in pagination is typically read from the rendered result rather than set manually.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/11-conditions.md ===
# Field Marking (Conditions)

Field marking (conditions) allows users to visually emphasize key information in data cells through four types of markers:

- **Text** (`text`) — Change text color, font size, opacity, alignment
- **Background** (`background`) — Change cell background color
- **Interval** (`interval`) — Display bar charts within cells
- **Icon** (`icon`) — Display icons next to cell text

Data cells support all 4 condition types. Header cells (corner, row, column headers) only support text, background, and icon conditions (interval is not applicable to headers).

## Configuration

Conditions are configured via `s2Options.conditions`:

```ts
const s2Options = {
  conditions: {
    text: [],       // TextCondition[]
    background: [], // BackgroundCondition[]
    interval: [],   // IntervalCondition[]
    icon: [],       // IconCondition[]
  },
};
```

## Conditions Type

```ts
interface Conditions {
  text?: TextCondition[];
  background?: BackgroundCondition[];
  interval?: IntervalCondition[];
  icon?: IconCondition[];
}
```

### Condition (Base)

All condition types inherit from `Condition`:

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| field | Field ID or regex to match field IDs | `string \| RegExp` | ✓ |
| mapping | Callback function for condition rendering | `ConditionMapping` | ✓ |

### field

- **Pivot table**: `field` matches against `rows`, `columns`, and `values` — applies to row headers, column headers, corner headers, and data cells.
- **Table (detail) sheet**: `field` matches against `columns` — applies to data cells.

A field ID matching multiple rules of the same condition type uses the **last matched rule**.

### mapping

```ts
type ConditionMapping<T = unknown> = (
  fieldValue: number | string,
  data: RawData,
  cell?: S2CellType,
) => ConditionMappingResult<T>;
```

Parameters:
- `fieldValue`: Current cell value
- `data`: For data cells, the cell's raw data; for header cells, the cell's `Node` information
- `cell`: The cell instance (for accessing any additional data)

If `mapping` returns `null`/`undefined`, no condition marking is rendered for that cell.

## Condition Types

### TextCondition

The mapping result follows `TextTheme` — controls text color, opacity, alignment, font, etc.

```ts
type TextConditionMappingResult = TextTheme;
```

```ts
const s2Options = {
  conditions: {
    text: [
      {
        field: 'price',
        mapping(fieldValue, data) {
          return {
            fill: '#5B8FF9',
            fontSize: 16,
            opacity: 0.8,
            textAlign: 'right',
          };
        },
      },
    ],
  },
};
```

### BackgroundCondition

```ts
type BackgroundConditionMappingResult = {
  fill: string;                        // Background color (required)
  intelligentReverseTextColor?: boolean; // Auto-reverse text color for readability
};
```

When `intelligentReverseTextColor` is `true`, text automatically turns white on dark backgrounds to meet WCAG 2.0 AA contrast standards. Priority: `background condition`'s `intelligentReverseTextColor` < `text condition`'s `fill`.

```ts
const s2Options = {
  conditions: {
    background: [
      {
        field: 'number',
        mapping() {
          return {
            fill: '#000',
            intelligentReverseTextColor: true,
          };
        },
      },
    ],
  },
};
```

### IntervalCondition

Renders bar charts inside cells.

```ts
type IntervalConditionMappingResult = {
  fill?: string;       // Bar color (supports gradients)
  isCompare?: boolean; // Enable custom range
  minValue?: number;   // Custom minimum value
  maxValue?: number;   // Custom maximum value
  fieldValue?: number; // Override the cell value used for bar rendering
};
```

By default, the bar range is determined by the min/max values of all data for that field. Set `isCompare: true` to define a custom range. Use `cell.getValueRange()` to get the default range.

```ts
const s2Options = {
  conditions: {
    interval: [
      {
        field: 'number',
        mapping(value, data, cell) {
          return {
            fill: '#80BFFF',
            isCompare: true,
            maxValue: 8000,
            minValue: 300,
          };
        },
      },
    ],
  },
};
```

**Bidirectional bar chart** — use different colors for positive/negative values:

```ts
mapping(value) {
  return {
    fill: value >= 0 ? '#80BFFF' : '#F4664A',
  };
}
```

**Gradient bar chart** — use AntV/G gradient syntax in `fill`:

```ts
mapping(fieldValue) {
  return {
    fill: `l(0) 0:#95F0FF 1:${computedColor}`,
    isCompare: true,
    maxValue: 7789,
  };
}
```

### IconCondition

Has an additional `position` property compared to other conditions:

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| position | Icon position relative to text | `'left' \| 'right'` | `'right'` |

```ts
type IconConditionMappingResult = {
  fill: string;  // Icon color
  icon: string;  // Icon name (registered or built-in)
};
```

```ts
const s2Options = {
  conditions: {
    icon: [
      {
        field: 'number',
        position: 'left',
        mapping() {
          return {
            icon: 'CellUp',
            fill: '#2498D1',
          };
        },
      },
    ],
  },
};
```

When both condition icons and header action icons exist, the layout is:
- `[header action icons] [condition icon] [text]` (position: left)
- `[text] [condition icon] [header action icons]` (position: right)

## Distinguishing Header Cells

In pivot tables, when a condition's `field` matches a row/column dimension, the corresponding corner header cell is also marked. Use the `mapping` parameters to distinguish between cell types:

```ts
mapping(fieldValue, data, cell) {
  if (cell?.cellType === 'cornerCell') {
    return { fill: 'red' };
  }
  return { fill: 'blue' };
}
```

## Complete Example

```ts
const s2Options = {
  conditions: {
    text: [
      {
        field: 'province',
        mapping: (fieldValue, data, cell) => ({
          fill: 'green',
          fontSize: 16,
        }),
      },
    ],
    background: [
      {
        field: 'count',
        mapping: (fieldValue, data, cell) => ({
          fill: 'green',
          intelligentReverseTextColor: true,
        }),
      },
    ],
    interval: [
      {
        field: 'sub_type',
        mapping: (fieldValue, data, cell) => ({
          fill: 'green',
          isCompare: true,
          maxValue: 8000,
          minValue: 300,
        }),
      },
    ],
    icon: [
      {
        field: 'number',
        position: 'left',
        mapping: (fieldValue, data, cell) => ({
          icon: 'InfoCircle',
          fill: 'green',
        }),
      },
    ],
  },
};
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/12-tooltip.md ===
# Tooltip

## 概述

Tooltips display table information and analysis features through interactive overlays on cells.

**Important**: The base `@antv/s2` package only provides tooltip show/hide logic and data — it does **not** render content. The `@antv/s2-react` and `@antv/s2-vue` packages render tooltip content (sort menus, cell selection summaries, column hide buttons, etc.) via custom tooltip classes.

Remember to import styles:

```ts
import '@antv/s2/dist/s2.min.css';
// For React:
import '@antv/s2-react/dist/s2-react.min.css';
// For Vue:
import '@antv/s2-vue/dist/s2-vue.min.css';
```

## Configuration

### Tooltip Type

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| enable | Whether to show tooltip | `boolean` | `true` |
| operation | Tooltip operation options | `TooltipOperation` | - |
| rowCell | Row header cell config | `BaseTooltipConfig` | - |
| colCell | Column header cell config | `BaseTooltipConfig` | - |
| dataCell | Data cell config | `BaseTooltipConfig` | - |
| cornerCell | Corner cell config | `BaseTooltipConfig` | - |
| render | Custom tooltip class factory | `(spreadsheet) => BaseTooltip` | - |
| content | Custom tooltip content | `ReactNode \| Element \| string` or `(cell, defaultTooltipShowOptions) => ReactNode \| Element \| string` | - |
| autoAdjustBoundary | Auto-adjust position when overflowing | `'container' \| 'body' \| null` | `'body'` |
| adjustPosition | Custom position function | `(positionInfo) => {x, y}` | - |
| getContainer | Custom mount container | `() => HTMLElement` | `document.body` |
| className | Extra container class name | `string` | - |
| style | Extra container styles | `CSSProperties` | - |

### BaseTooltipConfig

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| enable | Whether to show tooltip | `boolean` | `true` |
| operation | Operation options | `TooltipOperation` | - |
| content | Custom content | `ReactNode \| Element \| string` or callback | - |

## Basic Usage

```ts
const s2Options = {
  tooltip: {
    enable: true,
  },
};
```

### Per-Cell Configuration

```ts
const s2Options = {
  tooltip: {
    enable: true,
    rowCell: {
      enable: false, // Disable tooltip for row headers
    },
    dataCell: {
      content: 'Custom data cell tooltip',
    },
  },
};
```

## Show/Hide

Default behavior:
- Row/column headers: tooltip shows on **click**; shows on hover only when text is truncated
- Data cells: tooltip shows after **800ms** hover

### Programmatic Control

```ts
// Show tooltip
s2.showTooltip({
  position: { x: 100, y: 200 },
  content: 'Hello',
});

// Or via tooltip instance
s2.tooltip.show({
  position: { x: 100, y: 200 },
  content: 'Hello',
});

// Hide tooltip
s2.tooltip.hide();
```

## Custom Content

### In @antv/s2 (Vanilla JS)

Content can be any DOM node or HTML string:

```ts
const content = document.createElement('div');
content.innerHTML = 'Custom content';

const s2Options = {
  tooltip: {
    content,
    // or: content: '<div>Custom string content</div>'
  },
};
```

### In @antv/s2-react

Content can be any JSX element:

```tsx
const s2Options = {
  tooltip: {
    content: <div>Custom React content</div>,
  },
};
```

Content also supports a callback for dynamic rendering:

```tsx
const s2Options = {
  tooltip: {
    content: (cell, defaultTooltipShowOptions) => {
      console.log('Current cell:', cell);
      return <CustomTooltipContent cell={cell} />;
    },
  },
};
```

Return `null` from the callback to use the default tooltip.

### Content Priority

`Method call` > `Cell-specific config` > `Base config`

```tsx
const s2Options = {
  tooltip: {
    content: DefaultContent,           // lowest priority
    rowCell: {
      content: RowCellContent,         // medium priority
    },
  },
};

// Highest priority:
s2.showTooltip({ content: <MethodContent /> });
```

## Tooltip Operations

### TooltipOperation

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| hiddenColumns | Enable hide column (leaf nodes only) | `boolean` | `true` |
| sort | Enable group sort | `boolean` | `false` |
| tableSort | Enable table column header sort | `boolean` | `false` |
| menu | Custom operation menu config | `TooltipOperatorMenuOptions` | - |

### Custom Menu Items (React/Vue)

```tsx
import { Menu } from 'antd';

const s2Options = {
  tooltip: {
    operation: {
      menu: {
        render: (props) => <Menu {...props} />,
        onClick: (info, cell) => {
          console.log('Menu item clicked:', info, cell);
        },
        items: [
          {
            key: 'custom-a',
            label: 'Action 1',
            icon: 'Trend',
            onClick: (info, cell) => {
              console.log('Action 1 clicked:', info, cell);
            },
            children: [
              {
                key: 'custom-a-a',
                label: 'Action 1-1',
              },
            ],
          },
          {
            key: 'custom-b',
            label: 'Action 2',
            icon: 'EyeOutlined',
            visible: (cell) => {
              // Dynamically show/hide based on cell info
              return cell.getMeta().isLeaf;
            },
          },
        ],
      },
    },
  },
};
```

## Position Configuration

### Auto-adjust Boundary

```ts
const s2Options = {
  tooltip: {
    autoAdjustBoundary: 'container', // Stay within table container
    // 'body' (default) — stay within browser viewport
    // null — disable auto-adjustment
  },
};
```

### Custom Mount Container

```ts
const s2Options = {
  tooltip: {
    getContainer: () => document.querySelector('.my-container'),
  },
};
```

### Custom Styles

```ts
const s2Options = {
  tooltip: {
    style: { fontSize: '20px' },
    className: 'my-tooltip',
  },
};
```

## Custom Tooltip Class

Extend `BaseTooltip` to integrate with any framework (React, Vue, Angular):

```ts
import { BaseTooltip, SpreadSheet } from '@antv/s2';

class CustomTooltip extends BaseTooltip {
  constructor(spreadsheet: SpreadSheet) {
    super(spreadsheet);
  }

  renderContent() {
    // Render your custom component into this.container
  }

  show(showOptions) {
    // Custom show logic
    console.log(this.spreadsheet);
  }

  hide() {}
  destroy() {}
  clearContent() {}
}

const s2Options = {
  tooltip: {
    enable: true,
    render: (spreadsheet) => new CustomTooltip(spreadsheet),
  },
};
```

## Custom Show Timing

Use custom interactions to change when tooltips appear:

```ts
import { BaseEvent, S2Event } from '@antv/s2';

class RowHoverInteraction extends BaseEvent {
  bindEvents() {
    this.spreadsheet.on(S2Event.ROW_CELL_HOVER, (event) => {
      this.spreadsheet.tooltip.show({
        position: { x: event.clientX, y: event.clientY },
        content: 'Custom hover tooltip',
      });
    });
  }
}

const s2Options = {
  tooltip: { enable: true },
  interaction: {
    customInteractions: [
      {
        key: 'RowHoverInteraction',
        interaction: RowHoverInteraction,
      },
    ],
  },
};
```

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/13-frozen.md ===
# Frozen Rows and Columns

## 概述

The frozen (freeze) feature pins specific rows and columns so they remain visible while scrolling. This is configured via the `s2Options.frozen` property.

## Frozen Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| rowHeader | `boolean \| number` | `true` | Freeze row header. When `number`, sets the max frozen area ratio (0, 1) — 0 means no freeze. When `boolean`, `true` = 0.5, `false` = 0. **Pivot table only.** |
| rowCount | `number` | `0` | Number of frozen rows from the **top**, counted by leaf nodes. (Not effective in pivot tables with row serial number enabled and custom serial number cells.) |
| colCount | `number` | `0` | Number of frozen columns from the **left**, counted by leaf nodes. |
| trailingRowCount | `number` | `0` | Number of frozen rows from the **bottom**, counted by leaf nodes. (Not effective in pivot tables with row serial number enabled and custom serial number cells.) |
| trailingColCount | `number` | `0` | Number of frozen columns from the **right**, counted by leaf nodes. |

## Usage

### Freeze Row Header (Pivot Table)

```ts
const s2Options = {
  frozen: {
    rowHeader: true,   // Freeze row header with default 0.5 ratio
  },
};

// Or set a custom ratio
const s2Options = {
  frozen: {
    rowHeader: 0.3,    // Row header takes at most 30% of table width
  },
};
```

### Freeze Rows and Columns (Table Sheet)

```ts
const s2Options = {
  frozen: {
    colCount: 2,            // Freeze first 2 columns
    trailingColCount: 1,    // Freeze last 1 column
    rowCount: 3,            // Freeze first 3 rows
    trailingRowCount: 2,    // Freeze last 2 rows
  },
};
```

### Freeze Only Columns

```ts
const s2Options = {
  frozen: {
    colCount: 1,            // Freeze first column
    trailingColCount: 1,    // Freeze last column
  },
};
```

## Notes

- Row/column counts are based on **leaf nodes** in the hierarchy.
- For pivot tables, `rowHeader` controls the row header area freeze. Use `rowCount`/`trailingRowCount` for data row freezing.
- Setting `rowHeader: false` or `rowHeader: 0` disables row header freezing in pivot tables.

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/14-icon.md ===
# Custom Icons

## Built-in Icons

S2 provides built-in icons. Icon colors default to match text color and follow the theme configuration.

| Icon Name | Description | Icon Name | Description |
|-----------|-------------|-----------|-------------|
| CellDown | Decrease indicator | ExpandColIcon | Expand column header |
| CellUp | Increase indicator | Plus | Tree table expand |
| GlobalAsc | Global ascending | Minus | Tree table collapse |
| GlobalDesc | Global descending | SortDown | Sort descending |
| GroupAsc | Group ascending | SortDownSelected | Sort descending (selected) |
| GroupDesc | Group descending | SortUp | Sort ascending |
| Trend | Trend chart | SortUpSelected | Sort ascending (selected) |
| ArrowUp | Value increase | ArrowDown | Value decrease |
| DrillDownIcon | Drill down | | |

## Registering Custom Icons (CustomSVGIcon)

Register custom SVG icons via `s2Options.customSVGIcons`:

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| name | Icon name (built-in or custom) | `string` | ✓ |
| src | SVG string in one of 3 formats: base64, local SVG file, or online image URL (online URLs don't support color replacement) | `string` | ✓ |

```ts
const s2Options = {
  customSVGIcons: [
    {
      name: 'MyCustomIcon',
      src: 'data:image/svg+xml;base64,...', // or SVG string or URL
    },
  ],
};
```

## Header Action Icons (HeaderActionIcon)

Register custom action icons for row, column, and corner header cells via `s2Options.headerActionIcons`:

| Property | Description | Type | Default | Required |
|----------|-------------|------|---------|----------|
| icons | Registered icon names. String form defaults position to `'right'`. Object form allows specifying position. | `string[]` \| `{name: string, position: 'right' \| 'left'}[]` | | ✓ |
| belongsCell | Cell types to attach icons to | `string[]` | | ✓ |
| defaultHide | Show icon only on hover | `boolean \| (meta: Node, iconName: string) => boolean` | `false` | |
| displayCondition | Filter which cells show the icon. Return `true` to show. | `(meta: Node, iconName: string) => boolean` | | |
| onClick | Click handler | `(headerIconClickParams: HeaderIconClickParams) => void` | | |
| onHover | Hover start/end handler | `(headerIconHoverParams: HeaderIconHoverParams) => void` | | |

### belongsCell Values

- `'cornerCell'` — Corner header
- `'colCell'` — Column header
- `'rowCell'` — Row header

### HeaderIconClickParams

| Property | Description | Type |
|----------|-------------|------|
| iconName | Current icon name | `string` |
| meta | Cell meta (Node) | `Node` |
| event | Click event | `Event` |

## Usage Examples

### Basic Header Action Icon

```ts
const s2Options = {
  headerActionIcons: [
    {
      icons: ['SortDown'],
      belongsCell: ['colCell'],
      defaultHide: true,
      onClick: ({ iconName, meta, event }) => {
        console.log('Clicked icon:', iconName, 'on cell:', meta);
      },
    },
  ],
};
```

### Icons with Position Control

```ts
const s2Options = {
  headerActionIcons: [
    {
      icons: [
        { name: 'SortUp', position: 'left' },
        { name: 'SortDown', position: 'right' },
      ],
      belongsCell: ['colCell'],
    },
  ],
};
```

### Conditional Icon Display

```ts
const s2Options = {
  headerActionIcons: [
    {
      icons: ['Trend'],
      belongsCell: ['rowCell'],
      displayCondition: (meta, iconName) => {
        // Only show on leaf nodes
        return meta.isLeaf;
      },
      defaultHide: (meta, iconName) => {
        // Show on hover only for non-leaf nodes
        return !meta.isLeaf;
      },
    },
  ],
};
```

### Custom Icon Registration + Header Action

```ts
const s2Options = {
  customSVGIcons: [
    {
      name: 'Filter',
      src: '<svg>...</svg>',
    },
  ],
  headerActionIcons: [
    {
      icons: ['Filter'],
      belongsCell: ['colCell'],
      onClick: ({ meta }) => {
        console.log('Filter clicked for:', meta.field);
      },
    },
  ],
};
```

## Icon in Conditions

Icons can also be displayed via field marking conditions (see conditions documentation):

```ts
const s2Options = {
  conditions: {
    icon: [
      {
        field: 'price',
        position: 'left',
        mapping(fieldValue) {
          return {
            icon: 'CellUp',
            fill: '#30BF78',
          };
        },
      },
    ],
  },
};
```

When both condition icons and header action icons exist, the layout order is:
- `[header action icons] [condition icon] [text]` (condition icon position: left)
- `[text] [condition icon] [header action icons]` (condition icon position: right)

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/15-ssr.md ===
# Server-Side Rendering (SSR)

## 概述

`@antv/s2-ssr` enables rendering S2 tables in Node.js environments and exporting them as PNG, JPEG, SVG, or PDF. Common use cases:

- 📧 **Email reports** — Embed table images in emails
- 🤖 **Chat bots** — Push table screenshots to DingTalk, WeCom, Lark, etc.
- 📊 **Scheduled reports** — Auto-generate data reports as images
- 🖨️ **Print services** — Generate high-resolution table images for printing

## Installation

```bash
npm install @antv/s2-ssr
```

### System Dependencies

`@antv/s2-ssr` depends on [node-canvas](https://github.com/Automattic/node-canvas), which requires Cairo and Pango:

**macOS:**
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

## Environment Setup

Before importing `@antv/s2-ssr`, set CSS module loaders (Node.js cannot natively handle CSS imports):

```javascript
require.extensions['.css'] = () => {};
require.extensions['.less'] = () => {};
require.extensions['.svg'] = () => {};
```

## Basic Usage

### Pivot Table

```javascript
require.extensions['.css'] = () => {};
require.extensions['.less'] = () => {};
require.extensions['.svg'] = () => {};

const { createSpreadsheet } = require('@antv/s2-ssr');

async function main() {
  const spreadsheet = await createSpreadsheet({
    sheetType: 'pivot',
    width: 600,
    height: 400,
    dataCfg: {
      fields: {
        rows: ['province', 'city'],
        columns: ['type'],
        values: ['price'],
      },
      data: [
        { province: 'Zhejiang', city: 'Hangzhou', type: 'Pen', price: 10 },
        { province: 'Zhejiang', city: 'Hangzhou', type: 'Paper', price: 20 },
      ],
    },
  });

  spreadsheet.exportToFile('./pivot-table.png');
  spreadsheet.destroy();
}

main();
```

### Table Sheet

```javascript
const { createSpreadsheet } = require('@antv/s2-ssr');

async function main() {
  const spreadsheet = await createSpreadsheet({
    sheetType: 'table',
    width: 500,
    height: 300,
    dataCfg: {
      fields: {
        columns: ['province', 'city', 'type', 'price'],
      },
      data: [
        { province: 'Zhejiang', city: 'Hangzhou', type: 'Pen', price: 10 },
      ],
    },
  });

  spreadsheet.exportToFile('./table-sheet.png');
  spreadsheet.destroy();
}

main();
```

## Export Formats

### PNG / JPEG

```javascript
const spreadsheet = await createSpreadsheet({
  ...options,
  imageType: 'png',  // or 'jpeg'
});
spreadsheet.exportToFile('./output.png');
```

### SVG

```javascript
const spreadsheet = await createSpreadsheet({
  ...options,
  outputType: 'svg',
});
spreadsheet.exportToFile('./output.svg');
```

### PDF

```javascript
const spreadsheet = await createSpreadsheet({
  ...options,
  outputType: 'pdf',
});
spreadsheet.exportToFile('./output.pdf');
```

## Other Export Methods

```javascript
const spreadsheet = await createSpreadsheet(options);

// Get Buffer (for uploading to OSS, sending emails, etc.)
const buffer = spreadsheet.toBuffer();

// Get Base64 DataURL (for embedding in HTML)
const dataURL = spreadsheet.toDataURL();

spreadsheet.destroy();
```

## Theme Support

SSR fully supports S2's theme system:

```javascript
// Built-in themes: 'default' | 'dark' | 'colorful' | 'gray'
const spreadsheet = await createSpreadsheet({
  ...options,
  themeCfg: {
    name: 'dark',
  },
});

// Custom theme
const spreadsheet = await createSpreadsheet({
  ...options,
  themeCfg: {
    theme: {
      cornerCell: { cell: { backgroundColor: '#1a1a2e' } },
      colCell: { cell: { backgroundColor: '#16213e' } },
    },
  },
});
```

## Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| sheetType | `'pivot' \| 'table'` | `'pivot'` | Table type |
| width | `number` | - | Canvas width (pixels) |
| height | `number` | - | Canvas height (pixels) |
| autoFit | `boolean` | `true` | Auto-crop canvas to actual table size |
| dataCfg | `S2DataConfig` | - | Data configuration (same as browser) |
| options | `S2Options` | `{}` | Table options (same as browser) |
| themeCfg | `ThemeCfg` | - | Theme configuration |
| devicePixelRatio | `number` | `2` | Device pixel ratio (affects image clarity) |
| outputType | `'image' \| 'svg' \| 'pdf'` | `'image'` | Output type |
| imageType | `'png' \| 'jpeg'` | `'png'` | Image format |
| waitForRender | `number` | `100` | Wait time for render completion (ms) |

## CLI Tool

```bash
npx s2-ssr export -i data.json -o output.png
```

Where `data.json` contains the configuration:

```json
{
  "sheetType": "pivot",
  "width": 600,
  "height": 400,
  "dataCfg": {
    "fields": {
      "rows": ["province", "city"],
      "columns": ["type"],
      "values": ["price"]
    },
    "data": [
      { "province": "Zhejiang", "city": "Hangzhou", "type": "Pen", "price": 10 }
    ]
  }
}
```

## Troubleshooting

- **Blank image**: Ensure data is not empty, fields are correctly configured, and try increasing `waitForRender`.
- **Font issues**: SSR uses system fonts by default. For custom fonts, use [node-canvas registerFont](https://github.com/Automattic/node-canvas#registerFont).
- **Image clarity**: Increase `devicePixelRatio` (e.g., `3` instead of default `2`).

=== FILE: .claude/skills/antv-s2-expert/references/knowledge/16-react-components.md ===
# React Advanced Analysis Components

These components are from `@antv/s2-react-components` and provide advanced analysis features for S2 tables.

```ts
import '@antv/s2-react-components/dist/s2-react-components.min.css';
```

## AdvancedSort

A sort dialog component that provides multi-rule sorting capabilities.

```tsx
import { AdvancedSort } from '@antv/s2-react-components';

<AdvancedSort sheetInstance={s2} />
```

### AdvancedSortProps

| Property | Description | Type | Required | Default |
|----------|-------------|------|----------|---------|
| sheetInstance | Table instance | `SpreadSheet` | ✓ | |
| className | CSS class name | `string` | | |
| icon | Sort button icon | `ReactNode` | | |
| text | Sort button text | `string` | | |
| ruleText | Rule description text | `string` | | |
| dimensions | Available field list | `Dimension[]` | | Defaults to rows + columns + values |
| ruleOptions | Rule configuration list | `RuleOption[]` | | Defaults to alphabetical, manual sort, other fields |
| sortParams | Default existing sort rules | `SortParams` | | |
| onSortOpen | Callback when sort dialog opens | `() => void` | | |
| onSortConfirm | Callback after closing dialog with sort result | `(ruleValues: RuleValue[], sortParams: SortParams) => void` | | |

### Dimension

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| field | Dimension ID | `string` | ✓ |
| name | Dimension display name | `string` | ✓ |
| list | Dimension value list | `string[]` | ✓ |

### RuleValue

Sort result info returned in `onSortConfirm`:

| Property | Description | Type |
|----------|-------------|------|
| field | Dimension ID | `string` |
| name | Dimension name | `string` |
| sortMethod | Sort direction | `'ASC' \| 'DESC'` |
| sortBy | Custom sort list | `string[]` |
| sortByMeasure | Sort by measure field | `string` |

---

## DrillDown

Dimension drill-down component for pivot tables in tree mode.

**Prerequisites**: Pivot table (`sheetType="pivot"`) with tree hierarchy (`hierarchyType="tree"`).

```tsx
import { DrillDown } from '@antv/s2-react-components';

const s2Options = {
  width: 600,
  height: 480,
  hierarchyType: 'tree',
};

<SheetComponent
  sheetType="pivot"
  options={s2Options}
  partDrillDown={{
    render: (props) => <DrillDown {...props} />,
    drillConfig: { dataSet: [...] },
    fetchData: async (meta, drillFields) => {
      const data = await fetchDrillData(meta, drillFields);
      return { drillData: data, drillField: drillFields[0] };
    },
  }}
/>
```

### PartDrillDown

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| drillConfig | Drill-down menu config | `DrillDownProps` | ✓ |
| drillItemsNum | Number of items to display after drill-down (-1 = all) | `number` | |
| fetchData | Callback after clicking drill-down | `(meta: Node, drillFields: string[]) => Promise<PartDrillDownInfo>` | ✓ |
| clearDrillDown | Clear drill-down info for specific rowId (or `{}` to clear all) | `{rowId: string}` | |
| displayCondition | Condition for showing drill-down icon | `(meta: Node, iconName: string) => boolean` | |

### DrillDownProps

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| dataSet | Drill-down data source config | `DataSet[]` | ✓ |
| className | CSS class name | `string` | |
| title | Title | `ReactNode` | |
| searchText | Search box placeholder | `string` | |
| clearText | Reset button text | `ReactNode` | |
| disabledFields | Dimensions not allowed for drilling | `string[]` | |
| drillFields | Allowed drill dimensions | `string[]` | |
| extra | Custom node inserted between search box and menu | `ReactNode` | |

### DataSet

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| name | Display name | `string` | ✓ |
| value | Value | `string` | ✓ |
| type | Dimension type (affects icon) | `'text' \| 'location' \| 'date'` | |
| disabled | Whether selection is disabled | `boolean` | |
| icon | List item icon | `ReactNode` | |

### PartDrillDownInfo (fetchData return)

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| drillData | Drill-down data | `Record<string, string \| number>[]` | ✓ |
| drillField | Drill dimension value | `string` | ✓ |

---

## Export

Export component for copying and downloading table data.

```tsx
import { Export } from '@antv/s2-react-components';

<Export sheetInstance={s2} />
```

### ExportCfgProps

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| sheetInstance | Table instance | `SpreadSheet` | |
| className | CSS class name | `string` | |
| icon | Display icon | `ReactNode` | |
| copyOriginalText | Copy original data button text | `string` | |
| copyFormatText | Copy formatted data button text | `string` | |
| downloadOriginalText | Download original data button text | `string` | |
| downloadFormatText | Download formatted data button text | `string` | |
| fileName | Custom download file name (CSV) | `string` | `'sheet'` |
| async | Async copy/export (default async) | `boolean` | `true` |
| dropdown | Dropdown config, passed to antd `Dropdown` | `DropdownProps` | |
| customCopyMethod | Custom copy processing logic | `(params: CopyAllDataParams) => Promise<string> \| string` | |
| onCopySuccess | Copy success callback | `(data) => void` | |
| onCopyError | Copy error callback | `(error) => void` | |
| onDownloadSuccess | Download success callback | `(data: string) => void` | |
| onDownloadError | Download error callback | `(error) => void` | |

---

## Switcher

Dimension switcher component for rearranging rows, columns, and values via drag-and-drop.

```tsx
import { Switcher } from '@antv/s2-react-components';

<Switcher
  rows={{ items: [{ id: 'province', displayName: 'Province' }] }}
  columns={{ items: [{ id: 'type', displayName: 'Type' }] }}
  values={{ items: [{ id: 'price', displayName: 'Price' }] }}
  onSubmit={(result) => {
    console.log('Switcher result:', result);
  }}
/>
```

### Switcher Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| rows | Row header config | `SwitcherField` | |
| columns | Column header config | `SwitcherField` | |
| values | Values config | `SwitcherField` | |
| disabled | Whether disabled | `boolean` | `false` |
| title | Custom title | `ReactNode` | `'Row/Column Switch'` |
| icon | Custom icon | `ReactNode` | `<SwapOutlined />` |
| children | Custom trigger node | `ReactNode` | `<Button />` |
| contentTitleText | Popover title text | `string` | `'Row/Column Switch'` |
| resetText | Reset button text | `string` | `'Reset'` |
| allowExchangeHeader | Allow values to switch between row and column dimensions | `boolean` | `true` |
| onSubmit | Callback after closing with result | `(result: SwitcherResult) => void` | |
| popover | Popover config, passed to antd `Popover` | `PopoverProps` | |

### SwitcherField

| Property | Description | Type | Default | Required |
|----------|-------------|------|---------|----------|
| items | Field configuration objects | `SwitcherItem[]` | - | ✓ |
| expandable | Show expand/collapse checkbox for child items | `boolean` | `false` | |
| expandText | Expand checkbox text | `string` | `'Expand Children'` | |
| selectable | Show visibility checkbox for fields | `boolean` | `false` | |
| allowEmpty | Allow all items to be dragged out of this dimension | `boolean` | `true` | |

### SwitcherItem

| Property | Description | Type | Required |
|----------|-------------|------|----------|
| id | Field ID | `string` | ✓ |
| displayName | Display name (falls back to id) | `string` | |
| checked | Whether field is visible | `boolean` | |
| children | Child items (e.g., YoY/MoM) | `SwitcherItem[]` | |

### SwitcherResult

| Property | Description | Type |
|----------|-------------|------|
| rows | All row field operation results | `SwitcherResultItem` |
| columns | All column field operation results | `SwitcherResultItem` |
| values | All value field operation results | `SwitcherResultItem` |

### SwitcherResultItem

| Property | Description | Type |
|----------|-------------|------|
| items | All fields flattened, ordered by drag result | `SwitcherItem[]` |
| hideItems | All hidden fields flattened, ordered by drag result | `SwitcherItem[]` |

=== FILE: .claude/skills/antv-s2-expert/references/type/s2-data-config.md ===
# S2DataConfig

Table data configuration.

```ts
const s2DataConfig = {
  data: [],
  meta: [],
  sortParams: [],
  fields: {
    rows: [],
    columns: [],
    values: []
  }
}
```

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| data | [RawData](#rawdata)[] | ✓ | | Raw data |
| fields | [Fields](#fields) | ✓ | | Dimension and measure field configuration |
| meta | [Meta](#meta)[] | | | Field metadata, configures field aliases and value formatting |
| sortParams | [SortParam](#sortparam)[] | | | Sort parameter configuration |
| filterParams | [FilterParam](#filterparam)[] | | | Filter parameter configuration |

## Fields

Configure the dimension fields of the table, corresponding to row and column dimensions.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| rows | `string[] \| CustomTreeNode[]` | | `[]` | Row dimensions (supports custom row headers) |
| columns | `string[] \| CustomTreeNode[]` | | `[]` | Column dimensions (supports custom column headers) |
| values | `string[]` | | `[]` | Measure/value dimensions |
| valueInCols | `boolean` | | | Whether measure dimensions are placed in column headers |
| customValueOrder | `number` | | - | Custom order of measure dimensions in row/column headers (i.e., order of `values`, starting from `0`) |

## Meta

Field metadata. Configures field aliases and value formatting.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| field | `string \| string[] \| RegExp` | | | Field ID (the field configured in [Fields](#fields)) |
| name | `string` | | | Field display name |
| description | `string` | | | Field description, displayed in the tooltip for row headers, column headers, and cells |
| formatter | `(value: unknown, data?: Data \| Data[], meta?: Node \| ViewMeta) => string` | | | Formatter. Cells, row headers and column headers support formatting (corner headers do not). Only cells have the second parameter. Numeric fields: typically used for formatting number units. Text fields: typically used for field enum value aliases |
| renderer | [Renderer](#renderer) | | | Cell rendering type (image, video, etc.) |

### Renderer

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| type | `"IMAGE" \| "VIDEO"` | ✓ | | Rendering type |
| clickToPreview | `boolean` | | `true` | Whether to enable click-to-preview. Effective for image and video types |
| prepareText | `(value: SimpleData) => Promise<string>` | | | Asynchronous text preprocessing before rendering |
| fallback | `string` | | | Fallback display when image/video fails to load |
| timeout | `number` | | `10000` | Image/video loading timeout in ms |
| config | `Partial<ImageStyleProps> \| Partial<HTMLVideoElement> \| HTMLStyleProps` | | | Image/video configuration |

## CustomTreeNode

Custom tree structure configuration, applicable to custom row/column headers for both pivot and detail tables.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| field | `string` | ✓ | | Unique identifier for the current node |
| title | `string` | ✓ | | Display name of the current node |
| collapsed | `boolean` | | `false` | Whether the node is collapsed (effective for non-leaf row header nodes in tree mode) |
| description | `string` | | | Extra description info for the node, displayed in the corresponding row header tooltip |
| children | [CustomTreeNode[]](#customtreenode) | | | Child nodes |

## FilterParam

Used for data filtering in **detail tables**.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| filterKey | `string` | ✓ | | Field ID to filter |
| filteredValues | `unknown[]` | | | Dimension values to exclude |
| customFilter | `(raw: Record<string, string>) => boolean` | | | Custom filter function. Final result must satisfy both customFilter AND not be in filteredValues |

## SortParam

Sort configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| sortFieldId | `string` | ✓ | - | Measure ID, the field to be sorted |
| sortMethod | `"ASC" \| "DESC" \| "asc" \| "desc"` | | - | Sort method |
| sortBy | `string[]` | | - | Custom sort list |
| sortByMeasure | `string` | | - | Sort by measure value (numeric) (pivot table only) |
| query | `Record<string, string>` | | - | Filter condition to narrow sorting scope, e.g., `{ city: 'Baishan' }` |
| type | `string` | | - | Group sort type for displaying icon (pivot table only) |
| sortFunc | `(params: SortFuncParam) => string[]` | | - | Custom sort function |
| nullsPlacement | `"first" \| "last" \| "auto"` | | `"last"` | Null value sort position |

### nullsPlacement

Null value (`null`, `undefined`, `'-'`, empty string) sort position configuration:

| Value | Description |
| --- | --- |
| `'first'` | Nulls always at the beginning |
| `'last'` | Nulls always at the end (**default**, industry best practice) |
| `'auto'` | Nulls at beginning for ascending, at end for descending |

> When a custom `sortFunc` is provided, sorting logic is fully managed by `sortFunc` and `nullsPlacement` is ignored.

### SortFuncParam

Custom sort function parameters.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| sortFieldId | `string` | ✓ | - | Measure ID, the field to be sorted |
| sortMethod | `"ASC" \| "DESC" \| "asc" \| "desc"` | | - | Sort method |
| sortBy | `string[]` | | - | Custom sort list |
| sortByMeasure | `string` | | - | Sort by measure value (pivot table only) |
| query | `Record<string, string>` | | - | Filter condition to narrow sorting scope |
| type | `string` | | - | Group sort type for displaying icon (pivot table only) |
| data | `Array<string \| Record<string, any>>` | | - | Current sorting data list |

## ViewMeta

Data cell data and position information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| spreadsheet | `SpreadSheet` | | | Table instance |
| id | `string` | | | Cell unique identifier |
| x | `number` | | | Cell x coordinate |
| y | `number` | | | Cell y coordinate |
| width | `number` | | | Cell width |
| height | `number` | | | Cell height |
| data | [ViewMetaData](#viewmetadata) | | | Cell data |
| rowIndex | `number` | | | Cell index in row leaf nodes |
| colIndex | `number` | | | Cell index in column leaf nodes |
| valueField | `string` | | | Measure ID |
| fieldValue | [DataItem](#dataitem) | | | Actual displayed measure value |
| isTotals | `boolean` | | | Whether it is a total: true for grand total, false for subtotal |
| query | `Record<string, any>` | | | Row and column query conditions |
| rowQuery | `Record<string, any>` | | | Row query conditions |
| colQuery | `Record<string, any>` | | | Column query conditions |
| rowId | `string` | | | Cell row ID |
| colId | `string` | | | Cell column ID |

## Data Types

### RawData

```ts
type RawData = Record<string, DataItem>;
```

### SimpleData

```ts
type SimpleData = string | number | null | undefined;
```

### MultiData

Used to support multi-measure custom data cell rendering, e.g., strategy/trend analysis tables.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| values | [SimpleData](#simpledata)[][] | ✓ | | Formatted data, displayed directly in dataCfg |
| originalValues | [SimpleData](#simpledata)[][] | | | Original data, used for raw data export |
| label | `string` | | | Cell subtitle, displayed on a separate line |
| [key: string] | `unknown` | | | Other pass-through fields for custom cell rendering |

### DataItem

```ts
type DataItem = SimpleData | MultiData | MiniChartData | Record<string, unknown>;
```

### ExtraData

```ts
import type { EXTRA_FIELD, VALUE_FIELD } from '@antv/s2';

type ExtraData = {
  [EXTRA_FIELD]: string;
  [VALUE_FIELD]: string | DataItem;
};
```

### Data

```ts
type Data = RawData & ExtraData;
```

### ViewMetaData

```ts
type ViewMetaData = Data | CellData;
```

=== FILE: .claude/skills/antv-s2-expert/references/type/s2-event.md ===
# S2Event

Table event list. Listen to the events you need to implement custom business logic.

```ts
import { S2Event } from '@antv/s2'

s2.on(S2Event.ROW_CELL_CLICK, (event) => {
  console.log('rowCellClick', event)
});
```

> If using `@antv/s2-react` or `@antv/s2-vue` components, events are already wrapped — use the callback props directly instead of manually listening.
>
> ```tsx
> <SheetComponent onRowCellClick={...} />
> ```

## Row Header Cell (RowCell)

| Name | Event | Description |
| --- | --- | --- |
| Collapse/Expand | `S2Event.ROW_CELL_COLLAPSED` | Row header cell expand/collapse in tree mode |
| Collapse/Expand All | `S2Event.ROW_CELL_ALL_COLLAPSED` | Row header cell expand/collapse all in tree mode |
| Click | `S2Event.ROW_CELL_CLICK` | Row header cell click |
| Double Click | `S2Event.ROW_CELL_DOUBLE_CLICK` | Row header cell double click |
| Context Menu | `S2Event.ROW_CELL_CONTEXT_MENU` | Row header cell right-click |
| Hover | `S2Event.ROW_CELL_HOVER` | Row header cell hover |
| Mouse Down | `S2Event.ROW_CELL_MOUSE_DOWN` | Row header cell mouse down |
| Mouse Move | `S2Event.ROW_CELL_MOUSE_MOVE` | Row header cell mouse move |
| Mouse Up | `S2Event.ROW_CELL_MOUSE_UP` | Row header cell mouse up |
| Scroll | `S2Event.ROW_CELL_SCROLL` | Row header cell scroll |
| Brush Selection | `S2Event.ROW_CELL_BRUSH_SELECTION` | Batch select row header cells within brush range. Shows brush range mask during selection, shows tooltip with selected cell info after completion (pivot table only) |
| Cell Render | `S2Event.ROW_CELL_RENDER` | Row header cell layout render complete |
| Cell Selected | `S2Event.ROW_CELL_SELECTED` | Row header cell selected. Provides selected cells, interaction name, and trigger cell info |

## Column Header Cell (ColCell)

| Name | Event | Description |
| --- | --- | --- |
| Click | `S2Event.COL_CELL_CLICK` | Column header cell click |
| Double Click | `S2Event.COL_CELL_DOUBLE_CLICK` | Column header cell double click |
| Context Menu | `S2Event.COL_CELL_CONTEXT_MENU` | Column header cell right-click |
| Hover | `S2Event.COL_CELL_HOVER` | Column header cell hover |
| Mouse Down | `S2Event.COL_CELL_MOUSE_DOWN` | Column header cell mouse down |
| Mouse Move | `S2Event.COL_CELL_MOUSE_MOVE` | Column header cell mouse move |
| Mouse Up | `S2Event.COL_CELL_MOUSE_UP` | Column header cell mouse up |
| Brush Selection | `S2Event.COL_CELL_BRUSH_SELECTION` | Batch select column header cells within brush range. Shows brush range mask during selection, shows tooltip with selected cell info after completion (pivot table only) |
| Cell Render | `S2Event.COL_CELL_RENDER` | Column header cell layout render complete |
| Cell Selected | `S2Event.COL_CELL_SELECTED` | Column header cell selected. Provides selected cells, interaction name, and trigger cell info |

## Data Cell (DataCell)

| Name | Event | Description |
| --- | --- | --- |
| Click | `S2Event.DATA_CELL_CLICK` | Data cell click |
| Double Click | `S2Event.DATA_CELL_DOUBLE_CLICK` | Data cell double click |
| Context Menu | `S2Event.DATA_CELL_CONTEXT_MENU` | Data cell right-click |
| Hover | `S2Event.DATA_CELL_HOVER` | Data cell hover |
| Mouse Down | `S2Event.DATA_CELL_MOUSE_DOWN` | Data cell mouse down |
| Mouse Move | `S2Event.DATA_CELL_MOUSE_MOVE` | Data cell mouse move |
| Mouse Up | `S2Event.DATA_CELL_MOUSE_UP` | Data cell mouse up |
| Brush Selection | `S2Event.DATA_CELL_BRUSH_SELECTION` | Data cell brush selection |
| Arrow Key Move | `S2Event.DATA_CELL_SELECT_MOVE` | Data cell keyboard arrow key move |
| Cell Render | `S2Event.DATA_CELL_RENDER` | Data cell layout render complete |
| Cell Selected | `S2Event.DATA_CELL_SELECTED` | Data cell selected. Provides selected cells, interaction name, and trigger cell info |

## Corner Header Cell (CornerCell)

| Name | Event | Description |
| --- | --- | --- |
| Click | `S2Event.CORNER_CELL_CLICK` | Corner cell click |
| Double Click | `S2Event.CORNER_CELL_DOUBLE_CLICK` | Corner cell double click |
| Context Menu | `S2Event.CORNER_CELL_CONTEXT_MENU` | Corner cell right-click |
| Hover | `S2Event.CORNER_CELL_HOVER` | Corner cell hover |
| Mouse Down | `S2Event.CORNER_CELL_MOUSE_DOWN` | Corner cell mouse down |
| Mouse Move | `S2Event.CORNER_CELL_MOUSE_MOVE` | Corner cell mouse move |
| Mouse Up | `S2Event.CORNER_CELL_MOUSE_UP` | Corner cell mouse up |
| Cell Render | `S2Event.CORNER_CELL_RENDER` | Corner cell layout render complete |
| Cell Selected | `S2Event.CORNER_CELL_SELECTED` | Corner cell selected. Provides selected cells, interaction name, and trigger cell info |

## Merged Cells (MergedCells)

| Name | Event | Description |
| --- | --- | --- |
| Click | `S2Event.MERGED_CELLS_CLICK` | Merged cell click |
| Double Click | `S2Event.MERGED_CELLS_DOUBLE_CLICK` | Merged cell double click |
| Context Menu | `S2Event.MERGED_CELLS_CONTEXT_MENU` | Merged cell right-click |
| Hover | `S2Event.MERGED_CELLS_HOVER` | Merged cell hover |
| Mouse Down | `S2Event.MERGED_CELLS_MOUSE_DOWN` | Merged cell mouse down |
| Mouse Move | `S2Event.MERGED_CELLS_MOUSE_MOVE` | Merged cell mouse move |
| Mouse Up | `S2Event.MERGED_CELLS_MOUSE_UP` | Merged cell mouse up |
| Cell Render | `S2Event.MERGED_CELLS_RENDER` | Merged cell layout render complete |

## Series Number Cell (SeriesNumberCell)

| Name | Event | Description |
| --- | --- | --- |
| Cell Render | `S2Event.SERIES_NUMBER_CELL_RENDER` | Series number cell layout render complete |

## Resize (Width/Height Drag Adjustment)

| Name | Event | Description |
| --- | --- | --- |
| Cell Resize | `S2Event.LAYOUT_RESIZE` | Cell width/height changed |
| Series Column Width Change | `S2Event.LAYOUT_RESIZE_SERIES_WIDTH` | Series number column width changed |
| Resize Mouse Down | `S2Event.LAYOUT_RESIZE_MOUSE_DOWN` | Mouse down during cell resize (row/column headers only) |
| Resize Mouse Move | `S2Event.LAYOUT_RESIZE_MOUSE_MOVE` | Mouse move during cell resize (row/column headers only) |
| Resize Mouse Up | `S2Event.LAYOUT_RESIZE_MOUSE_UP` | Mouse up during cell resize (row/column headers only) |
| Row Width Change | `S2Event.LAYOUT_RESIZE_ROW_WIDTH` | Row header width changed |
| Row Height Change | `S2Event.LAYOUT_RESIZE_ROW_HEIGHT` | Row header height changed |
| Col Width Change | `S2Event.LAYOUT_RESIZE_COL_WIDTH` | Column header width changed |
| Col Height Change | `S2Event.LAYOUT_RESIZE_COL_HEIGHT` | Column header height changed |
| Tree Width Change | `S2Event.LAYOUT_RESIZE_TREE_WIDTH` | Cell width changed in tree mode |

## Layout

| Name | Event | Description |
| --- | --- | --- |
| Header Layout Complete | `S2Event.LAYOUT_AFTER_HEADER_LAYOUT` | Triggered after row and column header layout is complete |
| Data Cell Render Complete | `S2Event.LAYOUT_AFTER_REAL_DATA_CELL_RENDER` | Triggered after data cells in the current visible range are rendered |
| Pagination | `S2Event.LAYOUT_PAGINATION` | Pagination event |
| Col Expanded | `S2Event.COL_CELL_EXPANDED` | Triggered when column header is expanded |
| Col Hidden | `S2Event.COL_CELL_HIDDEN` | Triggered when column header is hidden |
| Col Expand Icon Hover | `S2Event.COL_CELL_EXPAND_ICON_HOVER` | Triggered when hovering over the expand icon of a hidden column header |
| Before Render | `S2Event.LAYOUT_BEFORE_RENDER` | Event before render starts, i.e., before `s2.render()` |
| After Render | `S2Event.LAYOUT_AFTER_RENDER` | Event after render completes, i.e., after `s2.render()` |
| Destroy | `S2Event.LAYOUT_DESTROY` | Triggered after table is destroyed or `s2.destroy()` is called |
| Cell Render | `S2Event.LAYOUT_CELL_RENDER` | Individual cell layout render complete |

## Global

| Name | Event | Description |
| --- | --- | --- |
| Keyboard Down | `S2Event.GLOBAL_KEYBOARD_DOWN` | Keyboard key down |
| Keyboard Up | `S2Event.GLOBAL_KEYBOARD_UP` | Keyboard key up |
| Copied | `S2Event.GLOBAL_COPIED` | Copy selected cells |
| Mouse Up | `S2Event.GLOBAL_MOUSE_UP` | Mouse up in chart area |
| Click | `S2Event.GLOBAL_CLICK` | Click in chart area |
| Preview Click | `S2Event.GLOBAL_PREVIEW_CLICK` | Image/video preview click |
| Context Menu | `S2Event.GLOBAL_CONTEXT_MENU` | Right-click in chart area |
| Selected | `S2Event.GLOBAL_SELECTED` | Cell selected (brush selection, multi-select, single select). Provides selected cells, interaction name, and trigger cell info |
| Hover | `S2Event.GLOBAL_HOVER` | Mouse hover over a cell |
| Reset | `S2Event.GLOBAL_RESET` | Reset interaction styles when clicking blank area or pressing Esc |
| Link Field Jump | `S2Event.GLOBAL_LINK_FIELD_JUMP` | Click on link field text in row/column header or data cell |
| Action Icon Click | `S2Event.GLOBAL_ACTION_ICON_CLICK` | Click on action icon on the right side of a cell (e.g., sort icon) |
| Action Icon Hover | `S2Event.GLOBAL_ACTION_ICON_HOVER` | Hover on action icon on the right side of a cell (e.g., sort icon) |
| Scroll | `S2Event.GLOBAL_SCROLL` | Table scroll (includes data cells and row header cells) |

## Enums

### InterceptType

Interaction intercept types.

```ts
enum InterceptType {
  HOVER = 'hover',
  CLICK = 'click',
  DATA_CELL_BRUSH_SELECTION = 'dataCellBrushSelection',
  ROW_CELL_BRUSH_SELECTION = 'rowCellBrushSelection',
  COL_CELL_BRUSH_SELECTION = 'colCellBrushSelection',
  MULTI_SELECTION = 'multiSelection',
  RESIZE = 'resize',
}
```

### InteractionName

Interaction names.

```ts
enum InteractionName {
  CORNER_CELL_CLICK = 'cornerCellClick',
  DATA_CELL_CLICK = 'dataCellClick',
  ROW_CELL_CLICK = 'rowCellClick',
  COL_CELL_CLICK = 'colCellClick',
  MERGED_CELLS_CLICK = 'mergedCellsClick',
  ROW_COLUMN_CLICK = 'rowColumnClick',
  HEADER_CELL_LINK_CLICK = 'headerCellLinkClick',
  HOVER = 'hover',
  DATA_CELL_BRUSH_SELECTION = 'dataCellBrushSelection',
  ROW_CELL_BRUSH_SELECTION = 'rowCellBrushSelection',
  COL_CELL_BRUSH_SELECTION = 'colCellBrushSelection',
  COL_ROW_RESIZE = 'rowColResize',
  DATA_CELL_MULTI_SELECTION = 'dataCellMultiSelection',
  ROW_CELL_MULTI_SELECTION = 'rowCellMultiSelection',
  COL_CELL_MULTI_SELECTION = 'colCellMultiSelection',
  RANGE_SELECTION = 'rangeSelection',
  SELECTED_CELL_MOVE = 'selectedCellMove',
  GLOBAL_RESET = 'globalReset',
}
```

### InteractionStateName

Interaction state names.

```ts
enum InteractionStateName {
  ALL_SELECTED = 'allSelected',
  SELECTED = 'selected',
  ROW_CELL_BRUSH_SELECTED = 'rowCellBrushSelected',
  COL_CELL_BRUSH_SELECTED = 'colCellBrushSelected',
  DATA_CELL_BRUSH_SELECTED = 'dataCellBrushSelected',
  UNSELECTED = 'unselected',
  HOVER = 'hover',
  HOVER_FOCUS = 'hoverFocus',
  HIGHLIGHT = 'highlight',
  SEARCH_RESULT = 'searchResult',
  PREPARE_SELECT = 'prepareSelect',
}
```

### CellType

Cell types.

```ts
enum CellType {
  DATA_CELL = 'dataCell',
  ROW_CELL = 'rowCell',
  COL_CELL = 'colCell',
  SERIES_NUMBER_CELL = 'seriesNumberCell',
  CORNER_CELL = 'cornerCell',
  MERGED_CELL = 'mergedCell',
}
```

=== FILE: .claude/skills/antv-s2-expert/references/type/s2-options.md ===
# S2Options

Spreadsheet configuration options.

```ts
const s2Options = {
  width: 600,
  height: 400,
  hierarchyType: 'grid'
}
```

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| width | `number` | | `600` | Table width |
| height | `number` | | `480` | Table height |
| debug | `boolean` | | `false` | Whether to enable debug mode |
| hierarchyType | `"grid" \| "tree" \| "grid-tree"` | | `grid` | Row header display mode. `grid`: flat grid layout, `tree`: tree structure, `grid-tree`: tree + flat layout (flat layout with expand/collapse) |
| conditions | [Conditions](#conditions) | | | Field marking / conditional formatting configuration |
| totals | [Totals](#totals) | | | Subtotal and grand total configuration |
| tooltip | [Tooltip](#tooltip) | | | Tooltip configuration |
| interaction | [Interaction](#interaction) | | | Table interaction configuration |
| pagination | [Pagination](#pagination) | | | Pagination configuration |
| frozen | [Frozen](#frozen) | | | Row/column header freeze configuration |
| seriesNumber | [SeriesNumber](#seriesnumber) | | | Series number column display and custom text configuration |
| showDefaultHeaderActionIcon | `boolean` | | `true` | Whether to show default row/column header action icons |
| headerActionIcons | [HeaderActionIcon](#headeractionicon)[] | | `false` | Custom row/column header action icons (requires `showDefaultHeaderActionIcon` set to `false`) |
| customSVGIcons | [CustomSVGIcon](#customsvgicon)[] | | `false` | Custom SVG icons |
| style | [Style](#style) | | | Cell style settings, such as layout type, width/height, margins, whether to hide value column headers, etc. |
| hd | `boolean` | | `true` | Whether to enable HD screen adaptation, resolves blurry font rendering on multi-screen switching and retina displays |
| mergedCellsInfo | [MergedCellInfo](#mergedcellinfo)[][] | | | Merged cell information |
| placeholder | [Placeholder](#placeholder) | | | Custom empty data placeholder configuration |
| cornerText | `string` | | | Custom corner header text (only effective in tree mode) |
| cornerExtraFieldText | `string` | | `"Values"` | Custom corner header virtual value field text (effective when "values on row header") |
| dataCell | [DataCellCallback](#datacellcallback) | | | Custom data cell |
| cornerCell | [CellCallback](#cellcallback) | | | Custom corner cell |
| seriesNumberCell | [CellCallback](#cellcallback) | | | Custom series number cell |
| rowCell | [CellCallback](#cellcallback) | | | Custom row header cell |
| colCell | [CellCallback](#cellcallback) | | | Custom column header cell |
| mergedCell | [MergedCellCallback](#mergedcellcallback) | | | Custom merged cell |
| frame | [FrameCallback](#framecallback) | | | Custom table frame/border |
| cornerHeader | [CornerHeaderCallback](#cornerheadercallback) | | | Custom corner header |
| layoutHierarchy | [LayoutHierarchy](#layouthierarchy) | | | Custom hierarchy structure |
| layoutArrange | [LayoutArrange](#layoutarrange) | | | Custom arrangement order (effective in tree mode) |
| layoutCoordinate | [layoutCoordinate](#layoutcoordinate) | | | Custom cell node coordinates |
| layoutCellMeta | [layoutCellMeta](#layoutcellmeta) | | | Custom cell metadata |
| layoutSeriesNumberNodes | [LayoutSeriesNumberNodes](#layoutseriesnumbernodes) | | | Custom series number nodes |
| dataSet | [DataSet](#dataset) | | | Custom dataset |
| facet | `(spreadsheet: SpreadSheet) => BaseFacet` | | | Custom facet |
| device | `"pc" \| "mobile"` | | | Device type |
| transformCanvasConfig | `(renderer: Renderer, spreadsheet: SpreadSheet) => Partial<CanvasConfig> \| void` | | | Custom AntV/G rendering engine configuration and plugin registration |
| rendererConfig | `Partial<RendererConfig>` | | | Custom AntV/G rendering engine configuration |
| future | [Future](#future) | | | Enable experimental features (currently unstable, may change in future) |

## Conditions

Configure field marking. Supports text, background, interval (bar chart), and icon types.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| text | [TextCondition](#textcondition)[] | | - | Text field marking |
| background | [BackgroundCondition](#backgroundcondition)[] | | - | Background field marking |
| interval | [IntervalCondition](#intervalcondition)[] | | - | Bar chart field marking |
| icon | [IconCondition](#iconcondition)[] | | - | Icon field marking |

### Condition

Base condition format. TextCondition, BackgroundCondition, IntervalCondition, IconCondition all inherit from Condition.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| field | `string \| RegExp` | ✓ | | Field ID, or a regex to match field IDs |
| mapping | [ConditionMapping](#conditionmapping) | ✓ | | Mapping function |

#### ConditionMapping

Field marking processing function.

```ts
type ConditionMapping<T = unknown> = (
  fieldValue: number | string,
  data: RawData,
  cell: S2CellType,
) => ConditionMappingResult<T>;
```

### TextCondition

Same as [Condition](#condition). `ConditionMappingResult` is consistent with TextTheme, meaning you can control text color, opacity, alignment, font, etc.

```ts
type TextConditionMappingResult = TextTheme;
```

### BackgroundCondition

Same as [Condition](#condition). `ConditionMappingResult`:

```ts
type BackgroundConditionMappingResult = {
  fill: string;
  intelligentReverseTextColor?: boolean;
};
```

### IntervalCondition

Same as [Condition](#condition). `ConditionMappingResult`:

```ts
type IntervalConditionMappingResult = {
  fill?: string;
  isCompare?: boolean;
  minValue?: number;
  maxValue?: number;
};
```

### IconCondition

Icon condition format. The only difference from other [Condition](#condition) types is the additional `position` parameter for customizing icon position relative to text.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| position | `"left" \| "right"` | | `right` | Icon position relative to text |

```ts
type IconConditionMappingResult = {
  fill: string;
  icon: string;
};
```

## SeriesNumber

Series number column configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| enable | `boolean` | | `false` | Whether to show row series numbers |
| text | `string` | | - | Custom row header series number column title |

## Frozen

Row/column header freeze configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| rowHeader | `boolean \| number` | | `true` | Freeze row header. When number, indicates the max frozen area ratio (0, 1), 0 = no freeze. When boolean, true = 0.5, false = 0. (Pivot table only) |
| rowCount | `number` | | `0` | Number of frozen rows from top, counted by leaf nodes |
| colCount | `number` | | `0` | Number of frozen columns from left, counted by leaf nodes |
| trailingRowCount | `number` | | `0` | Number of frozen rows from bottom, counted by leaf nodes |
| trailingColCount | `number` | | `0` | Number of frozen columns from right, counted by leaf nodes |

## Interaction

Interaction configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| linkFields | `string[] \| (meta: Node \| ViewMeta) => boolean` | | | Mark fields as link style for external link navigation |
| selectedCellsSpotlight | `boolean` | | `false` | Whether to enable selected cell spotlight highlight effect |
| hoverHighlight | `boolean` | | `true` | Highlight current cell and its corresponding row/column headers on hover |
| hoverFocus | `boolean \| {duration: number}` | | `true` | After hovering on a cell for 800ms (default), keep highlight and show tooltip. Control hover duration via `duration` |
| hiddenColumnFields | `string[]` | | | Configure default hidden columns. For pivot tables and multi-column detail tables, use column header unique id; for single-column detail tables, use field name |
| copy | [Copy](#copy) | | | Cell copy configuration |
| customInteractions | [CustomInteraction[]](#custominteraction) | | | Custom interactions |
| scrollSpeedRatio | [ScrollSpeedRatio](#scrollspeedratio) | | | Scroll speed ratio for horizontal and vertical directions, default is 1 |
| autoResetSheetStyle | `boolean \| (event: Event \| FederatedPointerEvent, spreadsheet: SpreadSheet) => boolean` | | `true` | Whether to reset interaction state and close Tooltip when clicking outside the table or pressing `ESC` |
| resize | `boolean \| ResizeInteractionOptions` | | `true` | Control whether resize hot areas are displayed |
| brushSelection | `boolean \| BrushSelection` | | `true` | Whether to allow cell brush selection (including row header, column header, data cells). Row/column header brush selection only supports pivot tables |
| multiSelection | `boolean` | | `true` | Whether to allow multi-selection (including row header, column header, data cells) |
| rangeSelection | `boolean` | | `true` | Whether to allow range shortcut multi-selection |
| scrollbarPosition | `"content" \| "canvas"` | | `content` | Control whether scrollbar displays at content edge or canvas edge |
| eventListenerOptions | `false` | | | Options for `addEventListener`, can control whether events trigger during bubble or capture phase |
| selectedCellHighlight | `boolean \| { rowHeader?: boolean, colHeader?: boolean, currentRow?: boolean, currentCol?: boolean }` | | `false` | Row/column highlight linkage after selecting data cells |
| overscrollBehavior | `"auto" \| "contain" \| "none" \| null` | | `auto` | Control behavior when scrolling to boundary, can disable browser default scroll behavior |

### Copy

Cell copy configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| enable | `boolean` | | `true` | Whether to allow copying |
| withFormat | `boolean` | | `true` | Whether to use `formatter` from s2DataConfig Meta when copying data |
| withHeader | `boolean` | | `false` | Whether to include header information when copying data |
| customTransformer | `(transformer: Transformer) => Partial<Transformer>` | | | Custom data format transformer for copying |

### CustomInteraction

Custom interaction, inherits BaseEvent.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| key | `string` | ✓ | | Unique identifier for the interaction |
| interaction | `InteractionConstructor` | ✓ | | Interaction instance |

### ScrollSpeedRatio

```ts
interface ScrollSpeedRatio {
  horizontal?: number; // Horizontal scroll speed ratio, default 1
  vertical?: number;   // Vertical scroll speed ratio, default 1
}
```

### ResizeInteractionOptions

Width/height adjustment configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| rowCellVertical | `boolean` | | `true` | Enable row header vertical resize hot area |
| cornerCellHorizontal | `boolean` | | `true` | Enable corner header horizontal resize hot area |
| colCellHorizontal | `boolean` | | `true` | Enable column header horizontal resize hot area |
| colCellVertical | `boolean` | | `true` | Enable column header vertical resize hot area (ineffective when column header is hidden) |
| rowResizeType | `"all" \| "current" \| "selected"` | | `current` | Row height resize scope. `all`: apply to all cells, `current`: apply to current cell, `selected`: apply to all selected cells |
| colResizeType | `"all" \| "current" \| "selected"` | | `current` | Column width resize scope. `all`: apply to all cells, `current`: apply to current cell, `selected`: apply to all selected cells |
| disable | `(resizeInfo: S2CellType) => boolean` | | | Control whether row height resize takes effect |
| visible | `(cell: S2CellType) => boolean` | | | Custom control whether current cell shows resize hot area |
| minCellWidth | `number` | | `40` | Minimum cell width when dragging |
| minCellHeight | `number` | | `20` | Minimum cell height when dragging |

### BrushSelection

Cell brush selection configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| dataCell | `boolean` | | `true` | Whether to allow data cell brush selection |
| rowCell | `boolean` | | `false` | Whether to allow row header cell brush selection (pivot table only) |
| colCell | `boolean` | | `false` | Whether to allow column header cell brush selection |

## Totals

Row/column subtotal and grand total configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| row | [Total](#total) | | | Row total configuration (ineffective with custom row headers) |
| col | [Total](#total) | | | Column total configuration (ineffective with custom column headers) |

### Total

Subtotal and grand total configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| showGrandTotals | `boolean` | | `false` | Whether to show grand totals |
| showSubTotals | `boolean \| { always: boolean }` | | `false` | Whether to show subtotals. As object, `always` controls whether subtotals display when child dimensions < 2 |
| subTotalsDimensions | `string[]` | | `[]` | Subtotal aggregation dimensions |
| reverseGrandTotalsLayout | `boolean` | | `false` | Grand total layout position, default bottom or right |
| reverseSubTotalsLayout | `boolean` | | `false` | Subtotal layout position, default bottom or right |
| grandTotalsLabel | `string` | | `"Grand Total"` | Grand total alias |
| subTotalsLabel | `string` | | `"Subtotal"` | Subtotal alias |
| calcGrandTotals | [CalcTotals](#calctotals) | | | Custom grand total calculation |
| calcSubTotals | [CalcTotals](#calctotals) | | | Custom subtotal calculation |
| grandTotalsGroupDimensions | `string[]` | | | Grand total group dimensions |
| subTotalsGroupDimensions | `string[]` | | | Subtotal group dimensions |

### CalcTotals

Subtotal/grand total calculation method configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| aggregation | `SUM \| MIN \| MAX \| AVG \| COUNT` | | | Aggregation method |
| calcFunc | `(query: Record<string, any>, data: Record<string, any>[], spreadsheet: SpreadSheet) => number` | | | Custom calculation function |

## Tooltip

Tooltip configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| enable | `boolean` | | `true` | Whether to show tooltip |
| operation | [TooltipOperation](#tooltipoperation) | | | Tooltip operation configuration |
| rowCell | [BaseTooltipConfig](#basetooltipconfig) | | | Row header cell tooltip configuration |
| colCell | [BaseTooltipConfig](#basetooltipconfig) | | | Column header cell tooltip configuration |
| dataCell | [BaseTooltipConfig](#basetooltipconfig) | | | Data cell tooltip configuration |
| cornerCell | [BaseTooltipConfig](#basetooltipconfig) | | | Corner cell tooltip configuration |
| render | [RenderTooltip](#rendertooltip) | | | Custom entire tooltip, can inherit BaseTooltip and override methods |
| content | `ReactNode \| Element \| string` or `(cell, defaultTooltipShowOptions) => ReactNode \| Element \| string` | | | Custom tooltip content |
| autoAdjustBoundary | `"container" \| "body"` | | `body` | Auto adjust tooltip position when exceeding boundary. `container`: chart area, `body`: browser window. Set `null` to disable |
| adjustPosition | `(positionInfo: TooltipPositionInfo) => {x: number, y: number}` | | | Custom tooltip position |
| getContainer | `() => HTMLElement` | | `document.body` | Custom tooltip mount container |
| className | `string` | | | Additional container class name |
| style | `CSSProperties` | | | Additional container style |

### BaseTooltipConfig

Tooltip basic common configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| enable | `boolean` | | `true` | Whether to show tooltip |
| operation | [TooltipOperation](#tooltipoperation) | | | Tooltip operation configuration |
| content | `ReactNode \| Element \| string` or `(cell, defaultTooltipShowOptions) => ReactNode \| Element \| string` | | | Custom tooltip content |

### TooltipOperation

Tooltip operation configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| hiddenColumns | `boolean` | | `true` | Whether to enable hide columns (effective for leaf nodes) |
| sort | `boolean` | | `false` | Whether to enable group sorting |
| tableSort | `boolean` | | `false` | Whether to enable detail table column header sorting |
| menu | [TooltipOperatorMenuOptions](#tooltipoperatormenuoptions) | | | Custom operation menu configuration |

### TooltipOperatorMenuOptions

Tooltip operation menu configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| items | [TooltipOperatorMenuItem[]](#tooltipoperatormenuitem) | | | Operation item list |
| onClick | `(info: TooltipOperatorMenuInfo, cell: S2CellType) => void` | | | Click event |
| selectedKeys | `string[]` | | | Initially selected menu item keys |

### TooltipOperatorMenuItem

Tooltip operation item.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| key | `string` | ✓ | | Unique identifier |
| label | `ReactNode \| string` | | | Name |
| icon | `ReactNode \| Element \| string` | | | Custom icon |
| visible | `boolean \| (cell: S2CellType) => boolean` | | `true` | Whether the item is visible, can pass a function for dynamic control |
| onClick | `(info: { key: string, [key: string]: unknown }, cell: S2CellType) => void` | | | Click event callback |
| children | [TooltipOperatorMenuItem[]](#tooltipoperatormenuitem) | | | Sub-menu items |

## Pagination

Pagination configuration. S2 provides built-in frontend pagination rendering but does not include a pagination component — you need to implement that yourself.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| pageSize | `number` | ✓ | | Number of items per page |
| current | `number` | ✓ | `1` | Current page (starts from 1) |
| total | `number` | | | Total number of data items |

## Style

Style settings.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| layoutWidthType | `"adaptive" \| "colAdaptive" \| "compact"` | | | Cell width layout type. `adaptive`: rows and columns share equal width across the canvas. `colAdaptive`: columns share equal width of remaining space after row headers. `compact`: compact layout, column width equals actual content width (samples first 50 rows per column) |
| compactExtraWidth | `number` | | `0` | Extra width in compact mode, added on top of the calculated compact width |
| compactMinWidth | `number` | | `0` | Minimum cell width in compact mode |
| dataCell | [DataCellStyle](#datacellstyle) | | | Data cell style configuration |
| rowCell | [RowCellStyle](#rowcellstyle) | | | Row header cell style configuration |
| colCell | [ColCellStyle](#colcellstyle) | | | Column header cell style configuration |
| cornerCell | [CornerCellStyle](#cornercellstyle) | | | Corner cell style configuration |
| mergedCell | [MergedCellStyle](#mergedcellstyle) | | | Merged cell style configuration |
| seriesNumberCell | [SeriesNumberCellStyle](#seriesnumbercellstyle) | | | Series number cell style configuration |

### DataCellStyle

Data cell configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| width | `number` | | `96` | Cell width (priority: `colCell.widthByField > colCell.width > dataCell.width`) |
| height | `number` | | `30` | Cell height (priority: `rowCell.heightByField > rowCell.height > dataCell.height`) |
| valuesCfg | `{ originalValueField?: string, widthPercent?: number[], showOriginalValue?: boolean }` | | | Cell value configuration |

Also supports [CellTextWordWrapStyle](#celltextwordwrapstyle).

### ColCellStyle

Column header cell configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| width | `number \| (colNode: Node) => number` | | `96` | Cell width, can be set dynamically based on current column header node (effective for leaf nodes) |
| height | `number \| (colNode: Node) => number` | | `30` | Cell height, can be set dynamically based on current column header node (effective for leaf nodes) |
| widthByField | `Record<string, number>` | | | Set width by field (for drag or preset width scenarios). Priority is higher than `width` |
| heightByField | `Record<string, number>` | | | Set height by field (for drag or preset height scenarios). Priority is higher than `height` |
| hideValue | `boolean` | | `false` | When values are on column headers, hide the value row to make it cleaner (effective only with single value) |

### RowCellStyle

Row header cell configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| width | `number \| (rowNode: Node) => number` | | | Row cell width, can be set dynamically per row node. Also applies to tree mode |
| treeWidth | `number` | | | Row cell width in tree mode. Higher priority than `width`; falls back to `width` when empty |
| height | `number \| (rowNode: Node) => number` | | `30` | Row cell height, can be set dynamically per row node |
| collapseFields | `Record<string, boolean>` | | | Custom collapse nodes in tree mode. Supports id (`'root[&] rowDimensionValue'`) and dimension field (`'city'`) formats. Priority higher than `collapseAll` and `expandDepth` |
| collapseAll | `boolean` | | `false` | Whether to collapse all row headers by default in tree mode |
| expandDepth | `number` | | | Default expand depth in tree mode (depth starts from 0). Set to `null` for lowest priority |
| showTreeLeafNodeAlignDot | `boolean` | | `false` | Whether to show level alignment dots for leaf nodes in tree mode |
| widthByField | `Record<string, number>` | | | Set width by field. Priority higher than `width` |
| heightByField | `Record<string, number>` | | | Set height by field. For pivot tables: field corresponds to `s2DataConfig.fields.rows`. For detail tables: field corresponds to row number (starting from 1). Priority higher than `height` |

### CellTextWordWrapStyle

Cell text word wrap configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| wordWrap | `boolean` | | `true` | Whether text wraps automatically (not recommended for data cells) |
| maxLines | `number` | | `1` | Maximum number of lines. Text beyond this is truncated. When manually dragging to resize or using custom cell height, max lines is recalculated based on line height. Supports `Infinity`. Must be used with `wordWrap` and `textOverflow` |
| textOverflow | `string` | | `ellipsis` | Custom overflow content display (e.g., ellipsis or custom string). Must be used with `wordWrap` and `maxLines` |

## DataCellCallback

```ts
DataCellCallback = (viewMeta: ViewMeta, s2: Spreadsheet) => G.Group;
```

Custom data cell.

## CellCallback

```ts
CellCallback = (node: Node, spreadsheet: SpreadSheet, ...restOptions: unknown[]) => G.Group;
```

Custom cell.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| node | Node | ✓ | - | Current rendering node |
| spreadsheet | SpreadSheet | ✓ | - | Table instance |
| restOptions | `unknown[]` | | - | Additional parameters |

## MergedCellCallback

```ts
MergedCellCallback = (s2: Spreadsheet, cells: S2CellType[], viewMeta: ViewMeta) => MergedCell;
```

Custom merged cell.

## CornerHeaderCallback

```ts
CornerHeaderCallback = (parent: S2CellType, spreadsheet: SpreadSheet, ...restOptions: unknown[]) => void;
```

Custom corner header.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| parent | S2CellType | ✓ | - | Parent cell |
| spreadsheet | SpreadSheet | ✓ | - | Table instance |
| restOptions | `unknown[]` | | - | Additional parameters |

## HeaderActionIconProps

Information returned when clicking a custom action icon.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| iconName | `string` | ✓ | - | Name of the currently clicked icon |
| meta | `Node` | ✓ | - | Meta information of the current cell |
| event | `Event` | ✓ | - | Current click event |

## LayoutResult

Basic data format for layout results.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| colNodes | `Node[]` | | | Column header nodes, corresponding to ColCell (including those outside visible range) |
| colLeafNodes | `Node[]` | | | Column header leaf nodes (including those outside visible range) |
| colsHierarchy | `Hierarchy` | | | Column header node hierarchy structure (including those outside visible range) |
| rowNodes | `Node[]` | | | Row header nodes, corresponding to RowCell (including those outside visible range) |
| rowLeafNodes | `Node[]` | | | Row header leaf nodes (including those outside visible range) |
| rowsHierarchy | `Hierarchy` | ✓ | | Row header node hierarchy structure (including those outside visible range) |
| seriesNumberNodes | `Node[]` | | | Series number nodes, corresponding to SeriesNumberCell (including those outside visible range) |
| cornerNodes | `Node[]` | | | Corner header nodes, corresponding to CornerCell (including those outside visible range) |

## DataSet

Custom dataset.

```ts
DataSet = (spreadsheet: SpreadSheet) => BaseDataSet;
```

## Placeholder

Custom empty data placeholder configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| cell | `((meta: Record<string, any>) => string \| undefined \| null) \| string \| null` | | `'-'` | Empty value cell placeholder |
| empty | [EmptyPlaceholder](#emptyplaceholder) | | | Empty data placeholder (detail table only) |

### EmptyPlaceholder

Empty data placeholder configuration (detail table only).

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| icon | `string` | | `"Empty"` | Custom icon, supports customSVGIcons registered and built-in icons |
| description | `string` | | `"No data"` | Custom description content |

## Future

Enable experimental features.

> **Warning:** These features are currently unstable and may change in the future.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| experimentalReuseCell | `boolean` | | `false` | Whether to reuse cells for performance improvement |

## MergedCellInfo

Set default merged cell information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| colIndex | `number` | | - | Column index of the cell |
| rowIndex | `number` | | - | Row index of the cell |
| showText | `boolean` | | - | When set to `true`, displays current cell's meta as the merged cell's meta. Defaults to the first selected/clicked cell |

=== FILE: .claude/skills/antv-s2-expert/references/type/s2-theme.md ===
# S2Theme

Theme configuration.

```ts
// Set theme schema, palette, and name together
s2.setThemeCfg({
  theme: {},
  palette: {},
  name: "default"
});

// Set theme schema individually, configure cell background, font size, font color
s2.setTheme({
  rowCell: {
    cell: {
      backgroundColor: "#fff"
    }
  }
});
```

## ThemeCfg

Table theme configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| theme | [S2Theme](#s2theme) | | - | Theme schema |
| palette | [Palette](#palette) | | - | Color palette |
| name | [ThemeName](#themename) | | `default` | Theme name |

### ThemeName

Table theme name.

| Value | Description |
| --- | --- |
| `default` | Default |
| `colorful` | Colorful Blue |
| `gray` | Simple Gray |
| `dark` | Dark |

### Palette

Theme color palette.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| brandColor | `string` | ✓ | - | Palette brand/primary color |
| basicColors | `string[]` | ✓ | - | Basic colors |
| basicColorRelations | `Array<{ basicColorIndex: number; standardColorIndex: number }>` | ✓ | - | Mapping relationship between basicColors and standard palette array indices |
| semanticColors | `Record<string, string>` | ✓ | - | Colors representing actual business semantics, e.g., built-in "red down green up" |
| others | `Record<string, string>` | | - | Additional business semantic colors |

## S2Theme

Table theme schema.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| cornerCell | [DefaultCellTheme](#defaultcelltheme) | | | Corner header cell theme |
| rowCell | [DefaultCellTheme](#defaultcelltheme) | | | Row header cell theme |
| colCell | [DefaultCellTheme](#defaultcelltheme) | | | Column header cell theme |
| dataCell | [DefaultCellTheme](#defaultcelltheme) | | | Data cell theme |
| resizeArea | [ResizeArea](#resizearea) | | | Column width / row height resize hot area |
| scrollBar | [ScrollBarTheme](#scrollbartheme) | | | Scrollbar style |
| splitLine | [SplitLine](#splitline) | | | Cell split line style |
| prepareSelectMask | [InteractionStateTheme](#interactionstatetheme) | | | Brush selection mask style |
| background | [Background](#background) | | | Background style |
| preview | [PreviewTheme](#previewtheme) | | | Image/video preview style |
| empty | [Empty](#empty) | | | Empty data placeholder style (detail table only) |
| [key: string] | `unknown` | | | Extra property fields for custom theme parameters |

### DefaultCellTheme

Default cell theme.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| bolderText | [TextTheme](#texttheme) | | - | Bold text style (e.g., grand total, subtotal, non-leaf row/column header text) |
| text | [TextTheme](#texttheme) | | - | Text style (e.g., data values, leaf row/column header text) |
| seriesText | [TextTheme](#texttheme) | | - | Series number text style |
| measureText | [TextTheme](#texttheme) | | - | Measure value text style (e.g., virtual value cell text for row/column/corner headers when values are on row/column) |
| cell | [CellTheme](#celltheme) | | - | Cell style |
| icon | [IconTheme](#icontheme) | | - | Icon style |
| seriesNumberWidth | `number` | | `80` | Series number column width |
| miniChart | [MiniChartTheme](#minicharttheme) | | | Mini chart style |

### ResizeArea

Column width / row height drag resize hot area style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| size | `number` | | `3` | Hot area size |
| background | `string` | | - | Hot area background color |
| backgroundOpacity | `number` | | - | Hot area background opacity |
| guideLineColor | `string` | | - | Guide line color |
| guideLineDash | `number[]` | | `[3, 3]` | Hot area guide line dash pattern |
| interactionState | [InteractionStateTheme](#interactionstatetheme) | | - | Hot area interaction state style |

### ScrollBarTheme

Scrollbar style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| trackColor | `string` | | `rgba(0,0,0,0)` | Scrollbar track color |
| thumbHoverColor | `string` | | `rgba(0,0,0,0.4)` | Scrollbar thumb hover color |
| thumbColor | `string` | | `rgba(0,0,0,0.15)` | Scrollbar thumb color |
| thumbHorizontalMinSize | `number` | | `32` | Scrollbar horizontal minimum size (useful for large datasets) |
| thumbVerticalMinSize | `number` | | `32` | Scrollbar vertical minimum size (useful for large datasets) |
| size | `number` | | Mobile: `3`, PC: `6` | Scrollbar size |
| hoverSize | `number` | | `16` | Scrollbar size on hover |
| lineCap | `"butt" \| "round" \| "square"` | | `round` | Specifies how line segment ends are drawn |

### SplitLine

Split line style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| horizontalBorderColor | `string` | | `basicColors[12]` | Horizontal split line color |
| horizontalBorderColorOpacity | `number` | | `0.2` | Horizontal split line color opacity |
| horizontalBorderWidth | `number` | | `2` | Horizontal split line width |
| verticalBorderColor | `string` | | `basicColors[11]` | Vertical split line color |
| verticalBorderColorOpacity | `number` | | `0.25` | Vertical split line color opacity |
| verticalBorderWidth | `number` | | `2` | Vertical split line width |
| showShadow | `boolean` | | `true` | Whether to show outer shadow on split line (for frozen row/column scenarios) |
| shadowWidth | `number` | | `8` | Shadow width |
| shadowColors | `{ left: string, right: string }` | | `{ left: 'rgba(0,0,0,0.1)', right: 'rgba(0,0,0,0)' }` | Linear gradient shadow colors |
| borderDash | `number \| string \| (string \| number)[]` | | `[]` | Split line dash pattern |

### TextTheme

Text theme.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| textAlign | `"left" \| "center" \| "right"` | | - | Text content alignment |
| textBaseline | `"top" \| "middle" \| "bottom"` | | - | Text drawing baseline |
| fontFamily | `string` | | `Roboto, PingFangSC, Microsoft YaHei, Arial, sans-serif` | Font family. **Use monospace fonts if each character needs equal width.** Avoid `-apple-system` or `BlinkMacSystemFont` on Mac/iOS (may cause browser freeze) |
| fontSize | `number` | | - | Font size |
| fontWeight | `number \| string` | | Bold: Mobile `520` / PC `bold`; Normal: `normal` | Font weight. String options: `normal`, `bold`, `bolder`, `lighter` |
| fontStyle | `"normal" \| "italic" \| "oblique"` | | `normal` | Font style |
| fontVariant | `"normal" \| "small-caps" \| string` | | `normal` | Font variant |
| fill | `string` | | - | Font color |
| linkTextFill | `string` | | - | Link text color |
| opacity | `number` | | `1` | Font opacity |

### CellTheme

Cell common theme.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| crossBackgroundColor | `string` | | - | Odd-row cell background color |
| backgroundColor | `string` | | - | Cell background color (default zebra stripe effect; set `crossBackgroundColor` and `backgroundColor` to the same color to disable) |
| backgroundColorOpacity | `number` | | `1` | Cell background color opacity |
| horizontalBorderColor | `string` | | - | Cell horizontal border color |
| horizontalBorderColorOpacity | `number` | | `1` | Cell horizontal border color opacity |
| horizontalBorderWidth | `number` | | - | Cell horizontal border width |
| verticalBorderColor | `string` | | - | Cell vertical border color |
| verticalBorderColorOpacity | `number` | | `1` | Cell vertical border color opacity |
| verticalBorderWidth | `number` | | - | Cell vertical border width |
| padding | [Padding](#margin--padding) | | - | Cell padding |
| interactionState | `Record<InteractionStateName, InteractionStateTheme>` | | - | Cell interaction states |
| borderDash | `number \| string \| (string \| number)[]` | | `[]` | Cell border dash pattern |

### IconTheme

Icon common theme.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| fill | `string` | | - | Icon fill color |
| size | `number` | | - | Icon size |
| margin | [Margin](#margin--padding) | | - | Icon margin |

### InteractionStateName

Interaction state names for theme configuration.

```ts
s2.setTheme({
  dataCell: {
    cell: {
      interactionState: {
        hoverFocus: {},
        selected: {},
        prepareSelect: {}
      }
    }
  }
})
```

| State | Description |
| --- | --- |
| hover | Hover |
| hoverFocus | Hover focus |
| selected | Selected |
| unselected | Unselected |
| searchResult | Search result |
| highlight | Highlight |
| prepareSelect | Prepare select |

### InteractionStateTheme

Interaction state theme styling applied to each state above.

### Margin | Padding

Icon margin, cell padding.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| top | `number` | | | Top |
| right | `number` | | | Right |
| bottom | `number` | | | Bottom |
| left | `number` | | | Left |

### Background

Background configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| color | `string` | | - | Color |
| opacity | `number` | | `1` | Opacity |

### Empty

Empty data placeholder style configuration (detail table only).

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| icon | `Omit<IconTheme, 'size'> & { width: number, height: number }` | | `{ fill: '', width: 64, height: 41, margin: { top: 0, right: 0, bottom: 24, left: 0 } }` | Icon style |
| text | [TextTheme](#texttheme) | | `{ fontSize: 12, fontWeight: 'normal', opacity: 1 }` | Text style |

### MiniChartTheme

Mini chart configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| line | [LineTheme](#linetheme) | | | Line chart style |
| bar | [BarTheme](#bartheme) | | | Bar chart style |
| bullet | [BulletTheme](#bullettheme) | | | Bullet chart style |
| interval | [IntervalTheme](#intervaltheme) | | | Interval chart style |

#### LineTheme

Mini line chart style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| point | `{ size: number; fill?: number; opacity?: number }` | | | Line chart point configuration |
| linkLine | `{ size: number; fill: number; opacity: number }` | | | Line chart line configuration |

#### BarTheme

Mini bar chart style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| intervalPadding | `number` | | | Spacing between bars |
| fill | `string` | | | Fill color |
| opacity | `number` | | | Opacity |

#### BulletTheme

Mini bullet chart style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| progressBar | [ProgressBar](#progressbar) | | | Progress bar style |
| comparativeMeasure | [ComparativeMeasure](#comparativemeasure) | | | Comparative measure marker line |
| rangeColors | [RangeColors](#rangecolors) | | | Bullet chart state colors |
| backgroundColor | `string` | | | Bullet chart background color |

##### ProgressBar

Mini bullet chart progress bar style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| widthPercent | `number` | | | Bullet chart width as a decimal percentage relative to cell content |
| height | `number` | | | Height |
| innerHeight | `number` | | | Inner height |

##### ComparativeMeasure

Mini bullet chart comparative measure marker line style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| width | `number` | | | Width |
| height | `number` | | | Height |
| fill | `string` | | | Fill color |
| opacity | `number` | | | Opacity |

##### RangeColors

Mini bullet chart state color configuration.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| good | `string` | | | Good / Satisfactory |
| satisfactory | `string` | | | Moderate / Acceptable |
| bad | `string` | | | Bad / Below expectations |

#### IntervalTheme

Mini interval bar style (for conditional formatting).

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| height | `number` | | | Bar height |
| fill | `string` | | | Fill color |

### PreviewTheme

Image/video preview style.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| overlay | `CSSProperties` | | | Preview overlay mask style |
| mediaContainer | `CSSProperties` | | | Preview image/video container style |

=== FILE: .claude/skills/antv-s2-expert/references/type/sheet-component.md ===
# SheetComponent

## React SheetComponent (`@antv/s2-react`)

Out-of-the-box React component `<SheetComponent />` based on `@antv/s2`.

```tsx
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

<SheetComponent sheetType="pivot" />
```

### SpreadsheetProps

React SheetComponent props.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| sheetType | `"pivot" \| "table" \| "gridAnalysis" \| "strategy" \| "editable"` | | `pivot` | Table type: 1. `pivot`: Pivot table 2. `table`: Detail table 3. `gridAnalysis`: Grid analysis table 4. `strategy`: Trend analysis table 5. `editable`: Editable table |
| spreadsheet | `(container: HTMLElement \| string, dataCfg: S2DataConfig, options: SheetComponentOptions) => SpreadSheet` | | | Custom spreadsheet constructor |
| dataCfg | S2DataConfig | ✓ | | Data configuration |
| options | [SheetComponentOptions](#sheetcomponentoptions) | ✓ | | Table options configuration |
| partDrillDown | PartDrillDown | | | Dimension drill-down properties |
| adaptive | `boolean \| { width?: boolean, height?: boolean, getContainer: () => HTMLElement }` | | `false` | Whether to auto-adapt to window size |
| themeCfg | ThemeCfg | | | Custom table theme style |
| loading | `boolean` | | | Control table loading state |
| onMounted | `(spreadsheet: SpreadSheet) => void` | | | Table mounted event, provides the table instance |
| onUpdate | `(renderOptions: S2RenderOptions) => S2RenderOptions \| void` | | | Table update event when data or options change. Allows manual control of render mode |
| onUpdateAfterRender | `(renderOptions: S2RenderOptions) => void` | | | Table update event triggered after re-render (`s2.render()`) completes |
| onLoading | `(loading: boolean) => void` | | | Loading state change event |
| onDestroy | `() => void` | | | Table destroy event |
| onBeforeRender | `() => void` | | | Event before render starts |
| onAfterRender | `() => void` | | | Event after render completes |

#### Row Header Cell Events

| Property | Type | Description |
| --- | --- | --- |
| onRowCellHover | `(data: TargetCellInfo) => void` | Row header mouse hover |
| onRowCellClick | `(data: TargetCellInfo) => void` | Row header mouse click |
| onRowCellDoubleClick | `(data: TargetCellInfo) => void` | Row header mouse double click |
| onRowCellContextMenu | `(data: TargetCellInfo) => void` | Row header right-click menu |
| onRowCellMouseDown | `(data: TargetCellInfo) => void` | Row header mouse down |
| onRowCellMouseUp | `(data: TargetCellInfo) => void` | Row header mouse up |
| onRowCellMouseMove | `(data: TargetCellInfo) => void` | Row header mouse move |
| onRowCellCollapsed | `({ isCollapsed: boolean, collapseFields: Record<string, boolean>, node: Node }) => void` | Node expand/collapse callback |
| onRowCellAllCollapsed | `(isCollapsed: boolean) => void` | All nodes expand/collapse callback |
| onRowCellScroll | `({ position: CellScrollPosition }) => void` | Row header cell scroll |
| onRowCellRender | `(cell: Cell) => void` | Row header cell render complete |
| onRowCellSelected | `(cells: Cell[], detail: CellSelectedDetail) => void` | Row header cell selected |
| onRowCellBrushSelection | `(cells: RowCell[]) => void` | Row header brush selection (pivot table only) |

#### Column Header Cell Events

| Property | Type | Description |
| --- | --- | --- |
| onColCellHover | `(data: TargetCellInfo) => void` | Column header mouse hover |
| onColCellClick | `(data: TargetCellInfo) => void` | Column header mouse click |
| onColCellDoubleClick | `(data: TargetCellInfo) => void` | Column header mouse double click |
| onColCellContextMenu | `(data: TargetCellInfo) => void` | Column header right-click menu |
| onColCellMouseDown | `(data: TargetCellInfo) => void` | Column header mouse down |
| onColCellMouseUp | `(data: TargetCellInfo) => void` | Column header mouse up |
| onColCellMouseMove | `(data: TargetCellInfo) => void` | Column header mouse move |
| onColCellExpanded | `(expandedNode: Node) => void` | Column header expanded callback (when `tooltip.operation.hiddenColumns = true`) |
| onColCellHidden | `(data: { currentHiddenColumnsInfo: HiddenColumnsInfo, hiddenColumnsDetail: HiddenColumnsInfo[] }) => void` | Column header hidden callback |
| onColCellRender | `(cell: Cell) => void` | Column header cell render complete |
| onColCellSelected | `(cells: Cell[], detail: CellSelectedDetail) => void` | Column header cell selected |
| onColCellBrushSelection | `(cells: ColCell[]) => void` | Column header brush selection |

#### Data Cell Events

| Property | Type | Description |
| --- | --- | --- |
| onDataCellHover | `(data: TargetCellInfo) => void` | Data cell mouse hover |
| onDataCellClick | `(data: TargetCellInfo) => void` | Data cell mouse click |
| onDataCellDoubleClick | `(data: TargetCellInfo) => void` | Data cell double click |
| onDataCellContextMenu | `(data: TargetCellInfo) => void` | Data cell right-click menu |
| onDataCellMouseDown | `(data: TargetCellInfo) => void` | Data cell mouse down |
| onDataCellMouseUp | `(data: TargetCellInfo) => void` | Data cell mouse up |
| onDataCellMouseMove | `(data: TargetCellInfo) => void` | Data cell mouse move |
| onDataCellBrushSelection | `(dataCells: DataCell[]) => void` | Data cell brush selection |
| onDataCellSelectMove | `(metas: CellMeta[]) => void` | Data cell keyboard arrow key move |
| onDataCellEditStart | `(meta: ViewMeta, cell: S2CellType) => void` | Data cell edit start (editable table only) |
| onDataCellEditEnd | `(meta: ViewMeta, cell: S2CellType) => void` | Data cell edit end (editable table only) |
| onDataCellRender | `(cell: Cell) => void` | Data cell render complete |
| onDataCellSelected | `(cells: Cell[], detail: CellSelectedDetail) => void` | Data cell selected |

#### Corner Header Cell Events

| Property | Type | Description |
| --- | --- | --- |
| onCornerCellHover | `(data: TargetCellInfo) => void` | Corner cell mouse hover |
| onCornerCellClick | `(data: TargetCellInfo) => void` | Corner cell mouse click |
| onCornerCellDoubleClick | `(data: TargetCellInfo) => void` | Corner cell mouse double click |
| onCornerCellContextMenu | `(data: TargetCellInfo) => void` | Corner cell right-click menu |
| onCornerCellMouseUp | `(data: TargetCellInfo) => void` | Corner cell mouse up |
| onCornerCellMouseMove | `(data: TargetCellInfo) => void` | Corner cell mouse move |
| onCornerCellRender | `(cell: Cell) => void` | Corner cell render complete |
| onCornerCellSelected | `(cells: Cell[], detail: CellSelectedDetail) => void` | Corner cell selected |

#### Merged Cell Events

| Property | Type | Description |
| --- | --- | --- |
| onMergedCellsHover | `(data: TargetCellInfo) => void` | Merged cell mouse hover |
| onMergedCellsClick | `(data: TargetCellInfo) => void` | Merged cell mouse click |
| onMergedCellsDoubleClick | `(data: TargetCellInfo) => void` | Merged cell mouse double click |
| onMergedCellsContextMenu | `(data: TargetCellInfo) => void` | Merged cell right-click menu |
| onMergedCellsMouseDown | `(data: TargetCellInfo) => void` | Merged cell mouse down |
| onMergedCellsMouseUp | `(data: TargetCellInfo) => void` | Merged cell mouse up |
| onMergedCellsMouseMove | `(data: TargetCellInfo) => void` | Merged cell mouse move |
| onMergedCellsRender | `(cell: Cell) => void` | Merged cell render complete |
| onSeriesNumberCellRender | `(cell: Cell) => void` | Series number cell render complete |

#### Layout Events

| Property | Type | Description |
| --- | --- | --- |
| onLayoutCellRender | `(cell: S2CellType) => void` | Individual cell layout render complete |
| onLayoutAfterHeaderLayout | `(layoutResult: LayoutResult) => void` | Header layout structure ready |
| onLayoutPagination | `({ pageSize: number, pageCount: number, total: number, current: number }) => void` | Pagination event |
| onLayoutAfterCollapseRows | `({ collapseFields: Record<string, boolean>, meta: Node }) => void` | Callback after collapsing rows in tree mode |

#### Resize Events

| Property | Type | Description |
| --- | --- | --- |
| onLayoutResize | `(params: ResizeParams) => void` | Table overall resize event |
| onLayoutResizeSeriesWidth | `(params: ResizeParams) => void` | Series number column width event |
| onLayoutResizeRowWidth | `(params: ResizeParams) => void` | Row header cell width change |
| onLayoutResizeRowHeight | `(params: ResizeParams) => void` | Row header cell height change |
| onLayoutResizeColWidth | `(params: ResizeParams) => void` | Column header cell width change |
| onLayoutResizeColHeight | `(params: ResizeParams) => void` | Column header cell height change |
| onLayoutResizeTreeWidth | `(params: ResizeParams) => void` | Tree row header overall width change |
| onLayoutResizeMouseDown | `(event: MouseEvent, resizeInfo?: ResizeInfo) => void` | Resize hot area mouse down |
| onLayoutResizeMouseUp | `(event: MouseEvent, resizeInfo?: ResizeInfo) => void` | Resize hot area mouse up |
| onLayoutResizeMouseMove | `(event: MouseEvent, resizeInfo?: ResizeInfo) => void` | Resize hot area mouse move |

#### Global Events

| Property | Type | Description |
| --- | --- | --- |
| onKeyBoardDown | `(event: KeyboardEvent) => void` | Keyboard down event |
| onKeyBoardUp | `(event: KeyboardEvent) => void` | Keyboard up event |
| onCopied | `(data: CopyableList) => void` | Copy event |
| onActionIconHover | `(event: FederatedPointerEvent) => void` | Action icon hover event |
| onActionIconClick | `(event: FederatedPointerEvent) => void` | Action icon click event |
| onContextMenu | `(event: FederatedPointerEvent) => void` | Right-click cell event |
| onMouseHover | `(event: FederatedPointerEvent) => void` | Table mouse hover event |
| onMouseUp | `(event: FederatedPointerEvent) => void` | Table mouse up event |
| onSelected | `(cells: Cell[], detail: CellSelectedDetail) => void` | Cell selected event |
| onReset | `(event: KeyboardEvent) => void` | Interaction state reset event |
| onLinkFieldJump | `(data: { field: string, meta: Node \| ViewMeta, record: Data }) => void` | Link field jump event |
| onScroll | `({ position: CellScrollPosition }) => void` | Cell scroll event (includes row header and data cells) |

#### Sort & Filter Events

| Property | Type | Description |
| --- | --- | --- |
| onRangeSort | `(params: SortParam[]) => void` | Group sort trigger callback (pivot table only) |
| onRangeSorted | `(event: FederatedPointerEvent) => void` | Group sort completed callback (pivot table only) |
| onRangeFilter | `(data: { filterKey: string, filteredValues: string[] }) => void` | Filter trigger callback |
| onRangeFiltered | `(data: DataType[]) => void` | Filter completed callback |

### SheetComponentOptions

> `@antv/s2-react` component `options` inherits from S2Options with two differences:
> - Type changed from `S2Options` to `SheetComponentOptions`
> - Tooltip `content` changed from `Element | string` to `ReactNode` (any JSX element)

```ts
import type { S2Options } from '@antv/s2';

type SheetComponentOptions = S2Options<React.ReactNode>
```

## Common Types

### FederatedPointerEvent

> Alias: GEvent

[AntV/G Event Object](https://g.antv.antgroup.com/api/event/event-object)

### TargetCellInfo

Interaction callback return information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| target | `S2CellType` | | | Interaction target object |
| event | `FederatedPointerEvent` | | | AntV/G event |
| viewMeta | `Node` | | | Current node information |

### CellScrollPosition

Cell scroll position information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| scrollX | `number` | | | Horizontal scroll offset (relative to scrollbar track length) |
| scrollY | `number` | | | Vertical scroll offset (relative to scrollbar track length) |

### HiddenColumnsInfo

Hidden column header node information (when column hiding is enabled).

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| hideColumnNodes | `Node[]` | | | Currently hidden node info |
| displaySiblingNode | `{ prev: Node, next: Node }` | | | Displayed sibling node info |

### ResizeParams

Table resize and cell style information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| info | [ResizeInfo](#resizeinfo) | | | Resize configuration info |
| style | `Style` | | | Style-related configuration from options |

### ResizeInfo

Table resize (cell width/height drag) configuration information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| theme | `ResizeArea` | | | Resize hot area configuration |
| type | `"Horizontal" \| "Vertical"` | | | Resize direction |
| offsetX | `number` | | | Horizontal offset |
| offsetY | `number` | | | Vertical offset |
| width | `number` | | | Dragged width |
| height | `number` | | | Dragged height |
| size | `number` | | | Hot area size |
| effect | `"Field" \| "Cell" \| "Tree" \| "Series"` | | | Area affected by drag |
| isResizeArea | `boolean` | | | Whether it belongs to a resize hot area |
| id | `string` | | | Field ID |
| cell | `S2CellType` | | | Cell info for the resize hot area |
| meta | `Node` | | | Cell metadata for the resize hot area |
| resizedWidth | `number` | | | Width after drag |
| resizedHeight | `number` | | | Height after drag |

### CellSelectedDetail

Cell selected detail information.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| interactionName | `InteractionName` | | | Interaction name that triggered the selection |
| targetCell | `S2CellType` | | | Cell that triggered the selection |
| event | `FederatedPointerEvent \| Event \| KeyboardEvent` | | | Event object that triggered the selection |

### S2RenderOptions

Custom render mode.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| reloadData | `boolean` | | | Whether to reload data |
| rebuildDataSet | `boolean` | | | Whether to rebuild dataset |
| rebuildHiddenColumnsDetail | `boolean` | | | Whether to rebuild hidden columns detail |

