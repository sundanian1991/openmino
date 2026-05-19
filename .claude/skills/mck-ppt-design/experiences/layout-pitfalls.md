# Layout Pitfalls — Layout-Specific Trap Experience

> Self-Refinement 经验沉淀。AI 在 S3 内容填充前必须读取。

## Experience 001: two_column_text Overuse

**Date**: 2026-05-02
**Problem**: 多张幻灯片使用 `two_column_text`，视觉单调。
**Fix**: 全局不超过1张 `two_column_text`。用 `table_insight`、`side_by_side` 替代。

## Experience 002: Cover Subtitle Position After Long Title

**Date**: 2026-05-02
**Problem**: Cover 多行标题后副标题位置固定，导致文字重叠。
**Root Cause**: 早期版本中 subtitle_y 写死为 Inches(3.5)，不跟随标题高度变化。
**Fix**: 引擎 v1.10.4 已修复，subtitle_y = title_y + title_h + Inches(0.3)。
**Rule**: 使用 `eng.cover()` 即可自动处理，不要手写 cover 布局代码。

## Experience 003: Content Starts at Wrong Y After Action Title

**Date**: 2026-05-02
**Problem**: 内容区从 Inches(1.0) 开始，与 action title 分隔线（Inches(1.05)）重叠。
**Root Cause**: 历史代码使用 Inches(1.0) 作为内容起始，但 action title 占到 Inches(1.05)+分隔线。
**Fix**: 使用 `add_action_title()` 后，内容从 **Inches(1.25)** 开始。
**Rule**: S3 → S4 模板中始终使用 `CONTENT_TOP = Inches(1.3)` 常量。

## Experience 004: Bottom Bar Cuts Off Last Table Row

**Date**: 2026-05-02
**Problem**: 底部摘要栏与表格最后一行重叠。
**Root Cause**: 没有计算动态 bottom bar y，直接写死为 Inches(6.2)，行数增加后表格超出。
**Fix**: `bar_y = max(last_row_bottom + Inches(0.2), Inches(6.1))`，并限制 `min(bar_y, Inches(6.4))`。

## Experience 005: timeline 最后标签定位是 engine bug

**Date**: 2026-05-03
**Problem**: `timeline` 最后一个里程碑标签始终报 `chart_legend_overflow`，即使改为 2 字符标签（如 "36月"）也不消失。
**Root Cause**: timeline engine 最后一个节点标签使用固定右对齐定位，与文字长度无关，是 engine.py 内置 bug。
**Fix**: 已加入 `gate_check.py` 的 `ENGINE_BUG_WHITELIST`，附文字证据。
**Rule**: 此错误不需要用户代码修复；但修改 whitelist 时必须附文字证据，不允许口头声明豁免。

## Experience 006: table_insight insights 必须传 list[str]

**Date**: 2026-05-18
**Problem**: `table_insight` 的 `insights` 参数传入单个字符串，导致 62 个 text_overflow 错误（2010%溢出）。
**Root Cause**: engine 期望 `insights` 为 `list[str]`（每个元素一个 bullet）。传入字符串时，Python 遍历字符串的每个字符，每个字符被当作一个 bullet 创建到独立文本框，导致大量溢出。
**Fix**: 始终传 `insights=['单条洞见']` 或 `insights=['第一条', '第二条']`。
**Rule**: S4 渲染前确认 `isinstance(insights, list)`。

## Experience 007: matrix_2x2 参数格式要求

**Date**: 2026-05-18
**Problem**: `matrix_2x2` 的 `axis_labels` 传 dict 报 KeyError，`quadrants` 的 bg_color 传 hex 字符串报 ValueError。
**Root Cause**: `axis_labels` 期望 `tuple(x_label, y_label)` 而非 `dict`。`bg_color` 期望 `RGBColor` 对象而非 hex 字符串（如 `'#E3F2FD'`）。
**Fix**: `axis_labels=('X轴', 'Y轴')`，`bg_color=RGBColor(0xE3, 0xF2, 0xFD)`。
**Rule**: S4 渲染前确认 axis_labels 是 tuple/list，bg_color 是 RGBColor 实例。
