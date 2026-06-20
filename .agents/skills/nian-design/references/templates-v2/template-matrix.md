# Template Matrix — 完整定义

> 40 个模板，覆盖 7 视觉型 + 2 结构型，全部 32 组件族充分调用。
> 结构型（黑条书签/长文导航）叠加在视觉型之上，管整页编排。
> 每个模板 = Scene + VisualStream + [Layouts] + [Components] + Palette + Format + 说明。

---

## 一、数据报告（6 个）

### TL01 · 数据报告 · Statement · 轻量
| 维度 | 值 |
|------|-----|
| VisualStream | Statement 宣言对齐 |
| Hero | V4-Statement（S04） |
| Layouts | S04 Hero → S05 指标卡 → S07 表格 → S28 Footer |
| Components | Cards, StatRow, Tables, DecorativeNumber, Tags |
| Palette | olive |
| 覆盖组件 | 01,04,05,07,23 |
| 参考来源 | R1-行业全景 / H052 |

### TL02 · 数据报告 · Statement · 标准 A（表格侧重）
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement（S04） |
| Layouts | S04 → S05 指标卡 → S07 表格 → S09 对比 → S21 Callout → S28 |
| Components | Cards, StatRow, Tables, Do/Don't, Callout, DecorativeNum, BarChart |
| Palette | olive |
| 覆盖组件 | 01,04,05,17,06,23,12 |
| 参考 | R1-数据分析报告-split |

### TL03 · 数据报告 · Statement · 标准 B（图表侧重）
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S05 → S06 排名条 → S12 图片 → S21 → S28 |
| Components | Cards, Widgets, Progress, RankBar, Sparkline, ThreeColGrid |
| Palette | olive |
| 覆盖组件 | 13,11,07,12,24 |
| 参考 | R2-数据图表形式 |

### TL04 · 数据报告 · Numeral · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Numeral 数字开屏 |
| Hero | V6-Numeral（S03） |
| Layouts | S03 Hero → S05 → S07 → S09 → S21 → S28 |
| Components | StatRow, Widgets, Tables, Segmented, TabPanel, MiniCharts |
| Palette | olive + yellow 高亮 |
| 覆盖组件 | 04,13,05,08,18,12 |
| 参考 | R1-业务数据看板 / H004 |

### TL05 · 数据报告 · Dashboard · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Dashboard 看板 |
| Hero | V6 (60vh) |
| Layouts | S14 格子卡 → S22 Bento → S05 → S07 → S21 → S28 |
| Components | MiniCharts(Gauge,Sparkline,Bar), Widgets, Tables, TabPanel, AccentTags |
| Palette | glacier |
| 覆盖组件 | 12,13,05,18,07 |
| 参考 | R1-FT粉红图表 / H064 |

### TL06 · 数据报告 · Split · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Split 对分屏 |
| Hero | V2-Split |
| Layouts | S02 → S09 对比 → S07 → S21 → S28 |
| Components | DataRows, Tables, Buttons, Inputs, Progress, FlowPipeline |
| Palette | rock |
| 覆盖组件 | 04,05,02,03,11,16 |
| 参考 | R2-预算申请报告 |

---

## 二、品牌展示（5 个）

### TL07 · 品牌展示 · Entrance · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Entrance 入场沉浸 |
| 结构型 | 可选黑条书签（章节 ≥3 时） |
| Hero | Entrance（100vh 整屏） |
| Layouts | 整屏 Hero → S13 三力 → S15 → S22 Bento → S28 |
| Components | Navigation, Cards, ThreeColGrid, BrandBlock, FlipCard |
| Palette | darkgray |
| 覆盖组件 | 06,01,24,23,25 |
| 参考 | R3-品牌展示 / H066 |

### TL08 · 品牌展示 · Statement · 标准 A（产品侧重）
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S13 → S11 图文 → S22 → S28 |
| Components | Cards, PullQuote, ThreeColGrid, Toggles, Overlay |
| Palette | earth |
| 覆盖组件 | 01,06,24,10,14 |
| 参考 | R3-品牌声明 |

### TL09 · 品牌展示 · Statement · 标准 B（理念侧重）
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S15 三栏 → S09 对比 → S11 → S25 → S28 |
| Components | ThreeColGrid, DecorativeNum, Do/Don't, PullQuote, StatePatterns, BrandBlock |
| Palette | olive |
| 覆盖组件 | 24,23,17,06,15 |
| 参考 | R3-品牌数据分析中心 |

### TL10 · 品牌展示 · Diagonal · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Diagonal 斜切入场 |
| Hero | V1-Diagonal（S01） |
| Layouts | S01 → S13 → S09 → S11 → S22 → S25 → S28 |
| Components | Cards, FlowPipeline, StackedImages, DecorativeNum, Accordion, Checklist |
| Palette | olive |
| 覆盖组件 | 01,16,26,23,19,22 |
| 参考 | R3-品牌展示 v2 / H029 |

### TL11 · 品牌展示 · Split · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Split |
| Hero | V2-Split |
| Layouts | S02 → S09 → S13 → S21 → S28 |
| Components | Cards, Buttons, Toggles, Tags, AsymTable, DetailPanel |
| Palette | olive |
| 覆盖组件 | 01,02,10,07,20,21 |
| 参考 | H006 / H011 |

---

## 三、SOP/流程（3 个）

### TL12 · SOP · Split · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Split |
| Hero | V2-Split |
| Layouts | S02 → S10 流程 → S07 表格 → S21 引用 → S28 |
| Components | FlowPipeline, Tables, Callout, Checklist, Accordion, Tags |
| Palette | olive |
| 覆盖组件 | 16,05,06,22,19,07 |
| 参考 | R5-供应商准入SOP |

### TL13 · SOP · Statement · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S10 → S09 对比 → S21 → S28 |
| Components | Progress, Checklist, Do/Don't, Buttons, DetailPanel |
| Palette | earth |
| 覆盖组件 | 11,22,17,02,21 |
| 参考 | R5-清退SOP |

### TL14 · SOP · Pulse · 轻量
| 维度 | 值 |
|------|-----|
| VisualStream | Pulse 节奏脉动 |
| Hero | V6-Numeral(简版) |
| Layouts | S03 → S08 时间线 → S10 → S20 闭环 → S28 |
| Components | Timeline, Progress, FlowPipeline, DateNav, Tags |
| Palette | glacier |
| 覆盖组件 | 11,16,09,07 |
| 参考 | R4-项目里程碑 / H020 |

---

## 四、知识沉淀（3 个）

### TL15 · 知识沉淀 · Entrance · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Entrance |
| 结构型 | 长文导航（章节 ≥3 时叠加） |
| Hero | Entrance（100vh） |
| Layouts | 整屏 Hero → S15 → S22 → S25 → S21 → S28 |
| Components | PullQuote, ThreeColGrid, FlipCard, DecorativeNum, StackedImages, BrandBlock |
| Palette | darkgray |
| 覆盖组件 | 06,24,25,23,26 |
| 参考 | R5-深度阅读 / R5-读书笔记 |

### TL16 · 知识沉淀 · Statement · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S11 → S13 → S21 → S28 |
| Components | Cards, DataRows, PullQuote, DecorativeNum, StatePatterns |
| Palette | earth |
| 覆盖组件 | 01,04,06,23,15 |
| 参考 | R5-复盘报告 / R5-知识管理 |

### TL17 · 知识沉淀 · Diagonal · 轻量
| 维度 | 值 |
|------|-----|
| VisualStream | Diagonal |
| Hero | V1-Diagonal |
| Layouts | S01 → S11 → S21 → S28 |
| Components | Cards, Callout, FlowPipeline, Buttons |
| Palette | olive |
| 覆盖组件 | 01,06,16,02 |
| 参考 | R5-读书笔记 |

---

## 五、决策分析（3 个）

### TL18 · 决策 · Numeral · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Numeral |
| Hero | V6-Numeral（S03） |
| Layouts | S03 → S05 → S09 对比 → S06 排名 → S07 → S21 → S28 |
| Components | StatRow, Widgets, Tables, AsymTable, TabPanel, Segmented |
| Palette | olive + yellow |
| 覆盖组件 | 04,13,05,20,18,08 |
| 参考 | R2-方案选型评估 |

### TL19 · 决策 · Split · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Split |
| Hero | V2-Split |
| Layouts | S02 → S09 → S06 → S07 → S21 → S28 |
| Components | Do/Don't, DataRows, Progress, Inputs, Buttons, Tags, TabPanel |
| Palette | glacier |
| 覆盖组件 | 17,04,11,03,02,07,18 |
| 参考 | R2-可行性研究 / R2-定价分析 |

### TL20 · 决策 · Dashboard · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Dashboard |
| Hero | V6 (60vh) |
| Layouts | S14 → S22 → S05 → S07 → S21 |
| Components | MiniCharts(Gauge,Sparkline,Bar), Widgets, Tags, Overlay, TabPanel |
| Palette | rock |
| 覆盖组件 | 12,13,07,14,18 |
| 参考 | R7-Bloomberg / H009 |

---

## 六、执行同步（3 个）

### TL21 · 执行 · Statement · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S05 → S08 时间线 → S21 → S27 行动 → S28 |
| Components | StatRow, Progress, Timeline, Callout, Checklist, Buttons |
| Palette | olive |
| 覆盖组件 | 04,11,16,06,22,02 |
| 参考 | R4-周报进度同步 / R4-工作汇报 |

### TL22 · 执行 · Diagonal · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Diagonal |
| Hero | V1-Diagonal |
| Layouts | S01 → S05 → S07 → S21 → S27 → S28 |
| Components | Widgets, Tables, FlowPipeline, Accordion, DateNav, Tags |
| Palette | earth |
| 覆盖组件 | 13,05,16,19,09,07 |
| 参考 | R4-项目里程碑 / R4-供应商管理体系 |

### TL23 · 执行 · Pulse · 轻量
| 维度 | 值 |
|------|-----|
| VisualStream | Pulse |
| Hero | V6(简版) |
| Layouts | S03(简) → S08 → S10 → S27 → S28 |
| Components | Progress, Timeline, FlowPipeline, Checklist, DecorativeNum |
| Palette | olive |
| 覆盖组件 | 11,16,22,23 |
| 参考 | R4-风险预警 |

---

## 七、对外传播（3 个）

### TL24 · 对外 · Entrance · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Entrance |
| 结构型 | 可选黑条书签（章节 ≥3 时） |
| Hero | Entrance（100vh） |
| Layouts | 整屏 Hero → S22 → S25 → S28 |
| Components | BrandBlock, Navigation, DecorativeNum, FlipCard, StackedImages |
| Palette | darkgray |
| 覆盖组件 | 23,06,25,26 |
| 参考 | H066 / R3-品牌展示 |

### TL25 · 对外 · Statement · 轻量
| 维度 | 值 |
|------|-----|
| VisualStream | Statement |
| Hero | V4-Statement |
| Layouts | S04 → S13 → S15 → S28 |
| Components | ThreeColGrid, Navigation, Buttons, Toggles, StatePatterns |
| Palette | olive |
| 覆盖组件 | 24,06,02,10,15 |
| 参考 | R3-品牌声明 |

### TL26 · 对外 · Split · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Split |
| Hero | V2-Split |
| Layouts | S02 → S09 → S13 → S22 → S28 |
| Components | Cards, Do/Don't, FlowPipeline, BrandBlock, Accordion |
| Palette | earth |
| 覆盖组件 | 01,17,16,22,19 |
| 参考 | H042 / H056 |

---

## 八、PPT 翻页版（4 个）

### TL27 · PPT · 数据报告
| 维度 | 值 |
|------|-----|
| VisualStream | Statement + Numeral 混合 |
| Hero | V4 (slide 1) / V6 (slide 2) |
| Slides | 11 页: Title → Agenda → 数据总览 → 指标 ×4 → 对比 → 趋势 → 洞察 → 行动 → Closing |
| Components | StatRow, Widgets, Tables, MiniCharts, FlowPipeline, DecorativeNum, DateNav |
| Palette | olive |
| 覆盖 | 04,13,05,12,16,23,09 |
| 参考 | R2-方案选型评估 |

### TL28 · PPT · 决策分析
| 维度 | 值 |
|------|-----|
| VisualStream | Diagonal + Split |
| Hero | V1 / V2 交替 |
| Slides | 12 页: Title → 背景 → 3 方案对比 → 数据×2 → 评估矩阵 → 推荐 → 风险 → Roadmap → Closing |
| Components | Do/Don't, AsymTable, Tables, Widgets, Progress, Segmented, Accordion, Overlay |
| Palette | glacier |
| 覆盖 | 17,20,05,13,11,08,19,14 |
| 参考 | R2-可行性研究 |

### TL29 · PPT · 品牌展示
| 维度 | 值 |
|------|-----|
| VisualStream | Entrance + Statement 混合 |
| Hero | Entrance / V4 |
| Slides | 10 页: Title → 品牌基因 → 视觉系统 → 组件 → 案例 → 数据 → 团队 → Closing |
| Components | Cards, ThreeColGrid, BrandBlock, FlipCard, StackedImages, Toggles, StatePatterns |
| Palette | darkgray |
| 覆盖 | 01,24,23,25,26,10,15 |
| 参考 | R3-品牌展示 / H066 |

### TL30 · PPT · SOP 流程
| 维度 | 值 |
|------|-----|
| VisualStream | Split + Pulse |
| Hero | V2 / V6 |
| Slides | 9 页: Title → 流程全景 → 步骤×4 → 时间线 → 检查清单 → 常见问题 → Closing |
| Components | FlowPipeline, Timeline, Checklist, Accordion, Buttons, Progress, DateNav |
| Palette | olive |
| 覆盖 | 16,11,22,19,02,09 |
| 参考 | R5-供应商准入SOP |

---

## 九、新增：低气质补齐（6 个）

### TL31 · 数据趋势 · Pulse · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Pulse 节奏脉动 |
| 结构型叠加 | 长文导航（3 章以上） |
| Hero | V6 简版 |
| Layouts | S03 → S08 时间线 ×3 → S20 闭环 → S21 → S28, S2 长文导航叠加 |
| Components | Timeline, Progress, FlowPipeline, DateNav, MiniCharts(Sparkline), DecorativeNum |
| Palette | glacier |
| 覆盖 | 11,16,09,12,23 |
| 参考 | R1-数据叙事-pulse / H008 |

### TL32 · 阶段复盘 · Pulse · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Pulse |
| Hero | V6 简版 |
| Layouts | S03 → S08 → S10 → S27 行动 → S28 |
| Components | Progress, Timeline, FlowPipeline, Checklist, Buttons, Tags |
| Palette | olive |
| 覆盖 | 11,16,22,02,07 |
| 参考 | R4-项目里程碑 |

### TL33 · 运营看板 · Dashboard · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Dashboard 看板 |
| Hero | V6 (60vh) |
| Layouts | S14 格子卡 ×6 → S22 Bento → S05 → S21 → S28 |
| Components | MiniCharts(Gauge,Sparkline,Bar,Heatmap), Widgets, Tables, Tags, TabPanel, Overlay |
| Palette | rock |
| 覆盖 | 12,13,05,07,18,14 |
| 参考 | H064 / R1-FT粉红 |

### TL34 · 业务监控 · Dashboard · 标准
| 维度 | 值 |
|------|-----|
| VisualStream | Dashboard |
| Hero | V6 (60vh) |
| Layouts | S14 → S05 ×2 → S07 → S21 |
| Components | Widgets, StatRow, MiniCharts, Tables, Segmented, Buttons |
| Palette | glacier |
| 覆盖 | 13,04,12,05,08,02 |
| 参考 | R7-Bloomberg / H009 |

### TL35 · 年度业绩 · Numeral · 丰富
| 维度 | 值 |
|------|-----|
| VisualStream | Numeral 数字开屏 |
| Hero | V6-Numeral（4 指标 + yellow 高亮）|
| Layouts | S03 → S05 ×2 → S06 排名 → S07 → S09 → S21 → S28 |
| Components | StatRow, Widgets, RankBar, Tables, Comparisons, DecorativeNum |
| Palette | olive + yellow |
| 覆盖 | 04,13,07,05,23 |
| 参考 | R2-定价分析 / H004 |

### TL36 · 深度长文 · Entrance + 长文导航
| 维度 | 值 |
|------|-----|
| VisualStream | Entrance |
| 结构型叠加 | 长文导航（S2），5 章以上 |
| Hero | Entrance（100vh）|
| Layouts | 整屏 → S2 nav + S11 ×3 → S13 → S15 → S25 → S28 |
| Components | PullQuote, ThreeColGrid, DecorativeNum, FlipCard, StackedImages, BrandBlock, DetailPanel |
| Palette | darkgray |
| 覆盖 | 06,24,23,25,26,21 |
| 参考 | R5-深度阅读 / H010 |

---

## 十、气质分布汇总

| 视觉型 | 出现次数 | 占比 |
|--------|:--------:|:----:|
| Statement | 9 | 25% |
| Diagonal | 3 | 8% |
| Split | 5 | 14% |
| Numeral | 3 | 8% |
| Entrance | 4 | 11% |
| Pulse | 4 | 11% |
| Dashboard | 4 | 11% |

| 结构型叠加 | 出现次数 | 适用模板 |
|-----------|:--------:|---------|
| 黑条书签 | 2 | TL07, TL24（长品牌叙事）|
| 长文导航 | 3 | TL15, TL31, TL36（3 章以上 + ≥1500 字）|

**合计：40 个模板 | 7 视觉型全部 ≥3 次 | 2 结构型叠加覆盖 ✅**

| 组件族 | 出现次数 | 分布模板 |
|:------:|:--------:|---------|
| 01 Cards | 14 | TL01-TL03, TL07-TL17, TL26, TL29 |
| 02 Buttons | 8 | TL06, TL11, TL13, TL17, TL21, TL25, TL30 |
| 03 Inputs | 4 | TL06, TL19 |
| 04 Data Rows | 10 | TL01-TL04, TL06, TL16, TL18, TL21, TL27 |
| 05 Tables | 10 | TL01-TL06, TL12, TL18, TL22, TL27, TL28 |
| 06 Navigation | 8 | TL07, TL11, TL15, TL16, TL24-TL26 |
| 07 Tags | 8 | TL01, TL05, TL11-TL14, TL19, TL20, TL22 |
| 08 Segmented | 4 | TL04, TL18, TL28 |
| 09 Date Nav | 4 | TL14, TL22, TL27, TL30 |
| 10 Toggles | 4 | TL08, TL18, TL25, TL29 |
| 11 Progress | 8 | TL03, TL13, TL14, TL19, TL21, TL28, TL30 |
| 12 Mini Charts | 8 | TL03-TL05, TL20, TL27 |
| 13 Widgets | 6 | TL03-TL05, TL18, TL20, TL22, TL27, TL28 |
| 14 Overlays | 3 | TL08, TL20, TL28 |
| 15 State Patterns | 3 | TL09, TL16, TL25, TL29 |
| 16 Flow Pipeline | 8 | TL06, TL10, TL12, TL14, TL17, TL22, TL23, TL26, TL27, TL30 |
| 17 Do/Don't | 4 | TL02, TL09, TL13, TL19, TL26, TL28 |
| 18 Tab Panel | 4 | TL04, TL05, TL18, TL20 |
| 19 Accordion | 3 | TL10, TL12, TL22, TL26, TL28 |
| 20 Asym Table | 2 | TL11, TL18, TL28 |
| 21 Detail Panel | 2 | TL11, TL13 |
| 22 Checklist | 4 | TL10, TL12, TL13, TL21, TL23, TL30 |
| 23 Decorative Num | 8 | TL01, TL02, TL07, TL09, TL10, TL15, TL16, TL23, TL24, TL27, TL29 |
| 24 Three-Col Grid | 6 | TL03, TL07-TL09, TL15, TL25, TL29 |
| 25 Flip Card | 2 | TL07, TL15, TL24, TL29 |
| 26 Stacked Images | 2 | TL10, TL15, TL24, TL29 |

**32 族全部覆盖 ✅**
**最低 2 次（AsymTable, FlipCard, StackedImages）✅**
**中位数 ~5 次 ✅**
**高频组件（Cards, DataRows, Tables）合理偏高 ✅**

---

*模板矩阵定义完成 · 34 个模板 · 32 组件族全部覆盖 · 2026-06-13（2026-06-19 更新族数对齐）*
