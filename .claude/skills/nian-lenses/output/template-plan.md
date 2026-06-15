# 模板库建设方案 — nian-design

> 基于 R 系列 + H 系列 showcase，按场景×风格矩阵构建模板库。
> 目标：覆盖全部工作场景，组件使用充分均衡，质感对标品牌系列 showcase。

---

## 现状

| 数据源 | 文件数 | 说明 |
|--------|:------:|------|
| R 系列精选 | 36（reasonix）/ 41（archive） | 按 6 层场景分类，有 Hero/级别/组件序列/底色交替标注 |
| H 系列素材 | 73（reasonix）/ 66（archive） | 补充素材，行数 83~8885 不等 |
| 质量不一致 | — | R 系列有 A/B/C 质量分级，H 系列有碎片（<200 行的低质文件） |
| 组件体系 | 26 族 | 新 `components.md` 已对齐 Nothing Design 标准 |

**缺口：**
1. R 系列只有 36 个文件，但覆盖 6 场景×多格式时不够用
2. H 系列有大量高质量素材未升精选
3. 没有"模板"概念——当前是"从 showcase 复制"，不是"从模板库选"
4. 组件使用不均——高频组件（C01/C40）用了 50+ 次，低频组件（C27-C36）用了 0~2 次
5. 部分 R 系列不带深色模式，需要补齐

---

## 模板矩阵设计

### 场景 × 格式 = 24 个模板

| 场景 | 数据报告 | 品牌展示 | SOP/流程 | 知识沉淀 | 决策分析 | 对外传播 |
|------|----------|----------|----------|----------|----------|----------|
| **轻量版** | TL1 | TL6 | TL11 | TL16 | TL19 | TL22 |
| **标准版** | TL2 | TL7 | TL12 | TL17 | TL20 | TL23 |
| **丰富版** | TL3 | TL8 | TL13 | TL18 | TL21 | TL24 |
| **PPT 版** | TL4 | TL9 | TL14 | — | — | — |

- **轻量版**：3-4 个 section，Hero + 主体 + 收尾，适合快速同步
- **标准版**：5-7 个 section，完整叙事弧，适合正式发布
- **丰富版**：7-10 个 section，含多个数据模块 + 装饰，适合 showcase 级
- **PPT 版**：1920×1080 slide，8-12 页，适合投屏

### 每个模板的定义

| 字段 | 说明 | 来源 |
|------|------|------|
| `id` | TL-序号 | 新定义 |
| `scenario` | 6 场景之一 | SCENE-INDEX.md |
| `format` | 轻量/标准/丰富/PPT | 新定义 |
| `heroType` | Entrance/Statement/Numeral/Pulse/Split/Diagonal | R 系列 Hero 字段 |
| `visualStream` | 9 种气质之一 | VISUAL-STREAMS.md |
| `componentSet` | 从 26 族中选 5-10 个 | components.md |
| `sectionSequence` | 每个 section 的类型和组件 | 从 R 系列提炼 |
| `colorTone` | olive/earth/glacier 基调 | 7 色体系 |
| `hasDarkMode` | true/false | 双模式 |
| `sourceR` | 参考的 R 系列文件 | — |
| `sourceH` | 补充的 H 系列文件 | — |

---

## 组件分布目标

26 组件族的调用次数目标：

| 族 | 目标调用数 | 当前状态 |
|:--:|:---------:|:--------:|
| 01 Cards | 12+ | ✅ 高频 |
| 02 Buttons | 6+ | ✅ 高频 |
| 03 Inputs | 4+ | ⚠️ 中 |
| 04 Data Rows | 10+ | ✅ 高频 |
| 05 Tables | 8+ | ✅ 高频 |
| 06 Navigation | 12+ | ✅ 高频 |
| 07 Tags | 6+ | ⚠️ 中 |
| 08 Segmented | 4+ | ⚠️ 中 |
| 09 Date Nav | 3+ | ❌ 缺 |
| 10 Toggles | 3+ | ❌ 缺 |
| 11 Progress | 6+ | ✅ 高频 |
| 12 Mini Charts | 6+ | ✅ 高频 |
| 13 Widgets | 6+ | ⚠️ 中 |
| 14 Overlays | 3+ | ❌ 缺 |
| 15 State Patterns | 3+ | ❌ 缺 |
| 16 Flow Pipeline | 6+ | ✅ 高频 |
| 17 Do/Don't | 3+ | ❌ 缺 |
| 18 Tab Panel | 3+ | ❌ 缺 |
| 19 Accordion | 3+ | ❌ 缺 |
| 20 Asymmetric Table | 2+ | ❌ 缺 |
| 21 Detail Panel | 2+ | ❌ 缺 |
| 22 Checklist | 3+ | ❌ 缺 |
| 23 Decorative Number | 6+ | ⚠️ 中 |
| 24 Three-Col Grid | 6+ | ⚠️ 中 |
| 25 Flip Card | 2+ | ❌ 缺 |
| 26 Stacked Images | 2+ | ❌ 缺 |

**策略：**
- 高频族（01-07 基建类）→ 每个模板都出现，自然覆盖
- 中频族（08-13 数据类）→ 数据场景使用，确保每类数据模板至少出现 1 次
- 低频族（14-26 特殊类）→ 每 2-3 个模板出现 1 次，定向分配

---

## 执行计划

### 阶段 1：模板定义（先完成，你来 review）

产出 1 份 Markdown：`template-matrix.md`，包含：
- 24 个模板的完整定义表
- 每个模板的 section 序列 + 组件分配
- 组件使用 check：确认 26 族全部覆盖

### 阶段 2：模板产出（24 个 HTML）

| 批次 | 模板 | 数量 | 来源 | 说明 |
|:----:|------|:----:|------|------|
| 1 | TL1-TL6 | 6 | R1/R3 改进 + 对齐新组件 | 数据报告+品牌展示，优先 |
| 2 | TL7-TL12 | 6 | R4/R5 改进 | SOP+执行，使用低频组件 |
| 3 | TL13-TL18 | 6 | H 升精选 + R5/R6 扩充 | 知识沉淀+决策，用深色模式 |
| 4 | TL19-TL24 | 6 | 混合 + 新造 | 对外+PPT，用全组件族 |

### 阶段 3：质量验证

- [ ] 每个模板通过 5 条硬规则（CRAFT-RULES.md）
- [ ] 每个模板有亮色/深色双版本
- [ ] 26 组件族每个至少出现在 2 个模板中
- [ ] 组件使用次数方差 < 3（相对均衡）
- [ ] 每个模板附带使用场景说明

---

## 产出文件

```
references/templates-v2/
├── template-matrix.md          ← 先出，你 review
├── TL01-数据报告-轻量.html
├── TL02-数据报告-标准.html
├── TL03-数据报告-丰富.html
├── TL04-数据报告-PPT.html
├── TL05-品牌展示-轻量.html
├── TL06-品牌展示-标准.html
├── TL07-品牌展示-丰富.html
...
```

---

这个方案你先看方向对不对，我再写具体的 `template-matrix.md`。
