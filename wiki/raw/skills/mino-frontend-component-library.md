# Component Library — mino-frontend 组件库

> 本文件为 mino-frontend 技能扩展，存放完整组件库定义。
>
> 使用方式：在 SKILL.md 确定 UI 类型和页面类型后，按需读取本文件获取具体组件参数。

---

## 通用原子组件（跨所有 UI 类型）

### 文字类

| 组件 | 用途 | 参数 |
|------|------|------|
| `title` | 主标题 | text, level(1-3), color? |
| `subtitle` | 副标题 | text, color? |
| `text` | 正文段落 | text, size(s/m/l), color? |
| `bullet-list` | 项目列表 | items[{text}], ordered? |
| `quote-block` | 引用块 | quote, source?, borderColor? |

### 标签类

| 组件 | 用途 | 参数 |
|------|------|------|
| `badge` | 序号/状态标签 | text, variant(number/status/dot), color? |
| `tag` | 关键词标签 | text, closable?, onClose? |

### 数据类

| 组件 | 用途 | 参数 |
|------|------|------|
| `stat-callout` | 大数字统计 | value, label, unit?, trend(up/down/flat)? |
| `progress-bar` | 进度条 | value(0-100), color?, showLabel? |

### 流程类

| 组件 | 用途 | 参数 |
|------|------|------|
| `step-flow` | 步骤流 | steps[{num, label, desc}], direction(horizontal/vertical), active? |
| `timeline` | 时间线 | events[{time, title, desc}], direction? |

### 对比类

| 组件 | 用途 | 参数 |
|------|------|------|
| `contrast-pair` | 对比双栏 | left{title, content}, right{title, content}, highlight? |

### 图文类

| 组件 | 用途 | 参数 |
|------|------|------|
| `icon-text` | 图标+文字 | icon, text, direction(left/right/top) |
| `image-text` | 图文混排 | image, title, desc, layout(left/right/top) |

### 高亮类

| 组件 | 用途 | 参数 |
|------|------|------|
| `callout-box` | 提示框 | title?, content, type(info/warning/success), icon? |
| `highlight-box` | 高亮块 | content, borderColor?, bgColor? |

### 布局类

| 组件 | 用途 | 参数 |
|------|------|------|
| `divider` | 分割线 | thickness(1/2/3), color?, margin? |
| `spacer` | 间距 | height(px/rem) |
| `image` | 图片 | src, alt, aspect?, fit(cover/contain) |
| `shape` | 形状 | type(rect/circle/roundedRect), size, color? |

---

## Presentation 组件（幻灯片演示）

### 页面类型（11 种 × 3 变体）

| 页面类型 | 变体 1 | 变体 2 | 变体 3 |
|----------|--------|--------|--------|
| `Cover` | hero-left | hero-right | editorial-cover |
| `Agenda` | agenda-columns | agenda-cards | story-map |
| `Section` | contrast-band | statement-break | chapter-break |
| `TitleBullets` | evidence-split | headline-plus-visual | portrait-notes |
| `TwoColumn` | narrative-split | spotlight-split | profile-split |
| `ImageText` | media-right-focus | immersive-figure | caption-photo |
| `Comparison` | card-contrast | statement-versus | before-after-cards |
| `Timeline` | milestone-ribbon | step-cards | career-strip |
| `Table` | executive-grid | minimal-grid | folio-grid |
| `Chart` | headline-data | spotlight-chart | narrative-chart |
| `Quote` | pull-quote | manifesto-quote | signature-quote |

### 特有组件

| 组件 | 用途 | 参数 |
|------|------|------|
| `SlideContainer` | 幻灯片容器 | children, bg?, transition? |
| `PageIndicator` | 页码指示器 | current, total, type(dots/progress) |
| `SpeakerNote` | 演讲者备注 | content, visible? |

---

## Dashboard 组件（数据仪表盘）

### 页面类型

| 类型 | 说明 |
|------|------|
| `Overview` | 总览页，多 KPI 概览 |
| `Detail` | 详情页，单指标深入分析 |
| `Report` | 报告页，多图表组合展示 |

### 图表类（14 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `TrendLine` | 折线图 | data[{time, value}], color, showArea?, smooth? |
| `BarChart` | 柱状图 | data[{label, value}], horizontal?, stacked? |
| `PieChart` | 饼图/环形图 | data[{label, value}], donut?, showLegend? |
| `RadarChart` | 雷达图 | data[{dim, value}], maxValue |
| `Heatmap` | 热力矩阵 | data[{x, y, value}], colors[] |
| `Funnel` | 漏斗图 | data[{stage, value}], showRate? |
| `TreeDiagram` | 树形图 | data[{id, label, children[]}], direction? |
| `Sankey` | 桑基图 | nodes[], links[{source, target, value}] |
| `WordCloud` | 词云 | data[{text, weight}], colors[] |
| `MapChart` | 着色地图 | geoJson, data[{region, value}], colors[] |
| `BubbleMap` | 气泡地图 | data[{lat, lng, size, color, label}] |
| `PathMap` | 路径/飞线地图 | paths[{from, to, value}], animation? |
| `HeatMapGeo` | 地理热力图 | geoJson, heatData[{lat, lng, intensity}] |
| `MigrationMap` | 迁移飞线图 | nodes[], flows[{from, to, value}], animation? |

### 控制类（7 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `DateRangePicker` | 日期范围选择 | start, end, presets[] |
| `DimensionTabs` | 维度切换标签 | dimensions[], active |
| `RefreshButton` | 刷新按钮 | interval?, loading?, onRefresh |
| `ExportMenu` | 导出菜单 | formats[csv/pdf/png], onExport |
| `DrillDownLink` | 下钻链接 | text, target, params? |
| `FilterPanel` | 筛选面板 | filters[], activeFilters[], onChange |
| `AlertBadge` | 预警徽章 | level(warning/error/info), message, count? |

### 数据展示类（4 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `DataCard` | 数据卡片 | title, value, unit?, trend?, chart? |
| `KPIGrid` | KPI 网格 | kpis[{value, label, trend, icon}] |
| `TrendIndicator` | 趋势指示 | trend(up/down/flat), value?, color? |
| `ComparePeriod` | 环比/同比 | current, previous, type(mom/yoy), format? |

---

## Poster 组件（通报海报）

### 页面类型

| 类型 | 说明 |
|------|------|
| `Notice` | 通知通报，信息传达 |
| `Competition` | 竞赛激励，排名展示 |
| `Policy` | 政策公告，规则说明 |
| `Report` | 汇报材料，总结展示 |

### 特有组件（6 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `HeaderStrip` | 顶部装饰条 | bgColor(#111), accentColor(#E2725B), height(2.4px) |
| `SectionBlock` | 章节块 | num, title, desc?, line?(boolean) |
| `BottomStrip` | 底部信息条 | left, center?, right, bgColor?(#111) |
| `TagList` | 标签组 | tags[{text, type?}], direction? |
| `CheckList` | 检查清单 | items[{text, checked?}], interactive?(boolean) |
| `FlowSteps` | 流程步骤 | steps[{num, label, desc}], highlightActive? |

---

## Web Page 组件（网页文档）

### 页面类型

| 类型 | 说明 |
|------|------|
| `Article` | 文章，长文阅读 |
| `Doc` | 文档，规范手册 |
| `Guide` | 指南，教程说明 |
| `FAQ` | 问答，常见问题 |

### 特有组件（8 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `StickyNav` | 粘性导航 | items[{label, href, active?}], position(top/left) |
| `TOC` | 目录锚点 | items[{id, label, level}], activeId? |
| `ArticleHeader` | 文章头 | title, subtitle?, author?, date?, tags[]? |
| `ArticleFooter` | 文章尾 | tags[], share?, prev?, next? |
| `CodeBlock` | 代码块 | code, language, lineNumbers?, copyable? |
| `QuoteBlock` | 引用块 | quote, source?, borderColor? |
| `RelatedLinks` | 相关链接 | links[{title, href, desc?}] |
| `Breadcrumb` | 面包屑 | items[{label, href}], separator? |

---

## Landing Page 组件（产品落地页）

### 页面类型

| 类型 | 说明 |
|------|------|
| `Product` | 产品页，功能展示 |
| `Service` | 服务页，服务说明 |
| `Event` | 活动页，活动报名 |
| `Download` | 下载页，软件下载 |

### 特有组件（10 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `Hero` | 英雄区 | title, subtitle, cta{text, href}, bgImage?, align(left/center) |
| `FeatureGrid` | 特性网格 | features[{icon, title, desc}], columns(2/3/4) |
| `PricingTable` | 定价表 | plans[{name, price, features[], cta, highlight?}] |
| `Testimonial` | 客户证言 | quote, author, role, avatar?, rating? |
| `CTABanner` | CTA 横幅 | title, desc?, cta{text, href}, bgColor? |
| `SocialProof` | 社交证明 | logos[{src, name}], text?, layout(grid/row) |
| `StatsSection` | 数据统计 | stats[{value, label, icon?}], layout? |
| `TeamSection` | 团队介绍 | members[{name, role, avatar, bio?}], columns? |
| `FAQSection` | 常见问题 | faqs[{question, answer}], collapsible? |
| `Footer` | 页脚导航 | columns[{title, links[]}], social?, copyright |

---

## App UI 组件（管理后台/工具）

### 页面类型

| 类型 | 说明 |
|------|------|
| `List` | 列表页，数据展示 |
| `Form` | 表单页，信息录入 |
| `Detail` | 详情页，单条详情 |
| `Settings` | 设置页，配置管理 |

### 基础输入（14 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `InputText` | 文本输入 | label, value, placeholder?, error?, required? |
| `InputNumber` | 数字输入 | label, value, min?, max?, step?, error? |
| `InputSelect` | 下拉选择 | label, value, options[{label, value}], searchable? |
| `InputDate` | 日期选择 | label, value, format?, range?(boolean) |
| `InputFile` | 文件上传 | label, accept?, multiple?, onUpload |
| `Switch` | 开关 | label, checked, onChange |
| `RadioGroup` | 单选组 | label, options[], value, onChange |
| `CheckboxGroup` | 多选组 | label, options[], values[], onChange |
| `Slider` | 滑块 | label, value, min, max, step, marks? |
| `TreeSelect` | 树形选择 | label, value, treeData, multiple?, onChange |
| `Cascader` | 级联选择 | label, value, options[], onChange |
| `Transfer` | 穿梭框 | dataSource[], targetKeys[], onChange |
| `ColorPicker` | 颜色选择 | label, value, presets?, onChange |
| `RichEditor` | 富文本 | label, value, toolbar?, onChange |
| `ImageUploader` | 图片上传 | label, files[], maxCount?, onUpload, onRemove |

### 控制类（7 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `SearchBox` | 搜索框 | value, placeholder, loading?, onSearch |
| `FilterPanel` | 筛选面板 | filters[], activeFilters[], onChange, onReset |
| `ActionMenu` | 操作菜单 | actions[{label, icon, danger?}], onAction |
| `BulkActions` | 批量操作 | actions[], selectedCount, onAction |
| `Pagination` | 分页 | current, total, pageSize, onChange |
| `SortButton` | 排序按钮 | field, order(asc/desc), onSort |
| `ViewToggle` | 视图切换 | views[list/grid/card], active, onChange |

### 状态类（5 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `EmptyState` | 空状态 | icon, title, desc?, action?{text, onClick} |
| `LoadingState` | 加载骨架 | rows?, cols?, type(card/list/table) |
| `LoadingMore` | 加载更多 | loading?, hasMore?, onLoad |
| `ErrorState` | 错误状态 | message, code?, retry?{text, onClick} |
| `SuccessState` | 成功状态 | message, icon?, autoClose? |

### 反馈类（6 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `ConfirmDialog` | 确认对话框 | title, message, confirmText?, cancelText?, onConfirm, onCancel |
| `Drawer` | 侧滑抽屉 | title, width?, position(left/right), open, onClose, children |
| `Notification` | 通知消息 | type, title, message, duration?, onClose |
| `Toast` | 轻提示 | message, type?, duration?, position? |
| `Tooltip` | 文字提示 | content, children, placement? |
| `Popover` | 气泡卡片 | title?, content, children, placement? |

### 导航类（5 个）

| 组件 | 用途 | 关键参数 |
|------|------|----------|
| `Sidebar` | 侧边栏 | items[{icon, label, href, active?}], collapsed?, onToggle |
| `TopNav` | 顶部导航 | logo, items[{label, href, active?}], rightActions? |
| `TabBar` | 标签栏 | tabs[{label, key, count?}], activeKey, onChange |
| `Breadcrumb` | 面包屑 | items[{label, href}] |
| `BackButton` | 返回按钮 | onClick, text? |

---

## 组件组合示例

### 示例 1：Dashboard 总览页

```yaml
ui_type: Dashboard
page_type: Overview
components:
  - DateRangePicker: {start: "2024-01-01", end: "2024-01-31"}
  - KPIGrid:
      kpis:
        - {value: "1,234", label: "总人数", trend: "up"}
        - {value: "98.5%", label: "完成率", trend: "flat"}
  - BarChart:
      data: [{label: "A", value: 100}, {label: "B", value: 80}]
  - TrendLine:
      data: [{time: "01-01", value: 100}, {time: "01-02", value: 120}]
```

### 示例 2：Poster 通报

```yaml
ui_type: Poster
page_type: Notice
components:
  - HeaderStrip: {bgColor: "#111", accentColor: "#E2725B"}
  - title: {text: "4月业绩通报", level: 1}
  - SectionBlock: {num: 1, title: "核心数据", desc: "本月关键指标"}
  - StatCallout: {value: "3,000万", label: "GMV", trend: "up"}
  - BottomStrip: {left: "运营部", right: "2024-04-30"}
```

### 示例 3：App UI 列表页

```yaml
ui_type: AppUI
page_type: List
components:
  - Sidebar:
      items: [{icon: "home", label: "首页"}, {icon: "users", label: "用户"}]
  - SearchBox: {placeholder: "搜索用户..."}
  - FilterPanel:
      filters: [{field: "status", options: ["全部", "启用", "禁用"]}]
  - DataTable:
      columns: ["姓名", "状态", "操作"]
      rows: [...]
  - Pagination: {current: 1, total: 100, pageSize: 20}
```

---

## 版本

- v6.1, 2026-04-04
- 新增：完整组件库，6 种 UI 类型，100+ 组件
