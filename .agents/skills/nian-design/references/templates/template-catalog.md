# 36 模板矩阵速查表

> nian-design Step 2 必读。输入：场景+深度+气质 → 输出：模板ID + HTML文件。
>
> **主力模板库**：`nian-templates/`（30 个成品，9 种气质全覆盖）
> **统一索引**：`template-index.json`（55 个模板全量元数据）

---

## 速查矩阵

| 场景 | L2·气质A | L2·气质B | L3·气质A | L3·气质B | L4·气质A | L4·气质B |
|------|:--:|:--:|:--:|:--:|:--:|:--:|
| **感知** | P2-ST | P2-DB | **P3-ST** ✅ | P3-DB | P4-ST | P4-DB |
| **决策** | D2-ST | D2-DG | **D3-ST** ✅ | D3-DG | D4-ST | D4-DG |
| **计划** | N2-ST | N2-NU | **N3-ST** ✅ | N3-NU | N4-ST | N4-NU |
| **执行** | X2-ST | X2-DG | **X3-ST** ✅ | X3-DG | X4-ST | X4-DG |
| **沉淀** | C2-ST | C2-EN | **C3-ST** ✅ | C3-EN | C4-ST | C4-EN |
| **对外** | E2-ST | E2-DG | **E3-ST** ✅ | E3-DG | E4-ST | E4-DG |

✅ = Batch 1 已生成（6 个 L3 Statement 核心模板）

---

## 气质代码

| 代码 | 气质 | 说明 |
|------|------|------|
| ST | Statement | 宣言对齐 · 粗体断言+大字留白 |
| DG | Diagonal | 斜切入场 · clip-path深色斜块 |
| SP | Split | 对分屏 · 左右分割对比 |
| NU | Numeral | 数字开屏 · JetBrains Mono大数字 |
| EN | Entrance | 入场沉浸 · 100vh整屏+慢节奏 |
| PU | Pulse | 节奏脉动 · 时间线/飞轮 |
| DB | Dashboard | 看板 · 数据密集多指标 |

---

## 模板文件命名

`{模板ID}-{场景英文}-{气质英文}.html`

例：`D3-ST-decision-statement.html` = 决策·L3·Statement

---

## Batch 1 模板（已生成 · L3 Statement 全覆盖）

| 模板ID | 文件 | 场景 | 内容域 |
|--------|------|------|------|
| P3-ST | `scene/P3-ST-perception-statement.html` | 感知 | 消费金融行业全景 |
| D3-ST | `scene/D3-ST-decision-statement.html` | 决策 | 供应商管理系统方案选型 |
| N3-ST | `scene/N3-ST-planning-statement.html` | 计划 | 供应商准入标准操作流程 |
| X3-ST | `scene/X3-ST-execution-statement.html` | 执行 | 供应商周报进度同步 |
| C3-ST | `scene/C3-ST-precipitate-statement.html` | 沉淀 | Q2供应商管理复盘 |
| E3-ST | `scene/E3-ST-external-statement.html` | 对外 | nian-design品牌设计系统 |

---

## nian-templates 主力库（30 个，优先使用）

详见 `nian-templates/INDEX.md`。按气质检索：

| 气质 | 数量 | 编号 |
|------|:----:|------|
| Statement | 5 | S01-S05 |
| Diagonal | 4 | D01-D04 |
| Split | 4 | P01-P04 |
| Numeral | 4 | N01-N04 |
| Entrance | 3 | E01-E03 |
| Pulse | 3 | U01-U03 |
| Dashboard | 3 | B01-B03 |
| Democratic | 2 | M01-M02 |
| Structural | 2 | X01-X02 |

---

## 使用方式

### 1. 精确匹配
```
决策卡 → scene=decision, depth=L3, visualStream=Statement
       → 查表：D3-ST ✅
       → 取文件：scene/D3-ST-decision-statement.html
       → 替换内容 → 输出
```

### 2. 气质变体
```
决策卡 → scene=decision, depth=L3, visualStream=Diagonal
       → 查表：D3-DG（待生成）
       → 回退：取 nian-templates/S01（Statement 最接近）
       → 替换 Hero 段为 Diagonal 模式
       → 输出
```

### 3. 跨模板混搭
```
决策卡 → 数据报告(感知) + 品牌质感(对外)
       → Hero取P3-ST的S03 + Closing取E3-ST的S18 + 网格取E4模板的S12
       → 拼接 → 输出
```

---

## 场景色速查

| 场景 | primary | accent |
|------|---------|--------|
| 感知 | glacier(#2A4A5A) | orange(#E55B2B) |
| 决策 | earth(#8B7355) | orange(#E55B2B) |
| 计划 | olive(#4A5D3A) | yellow(#FFD100) |
| 执行 | earth(#8B7355) | orange(#E55B2B) |
| 沉淀 | earth(#8B7355) | yellow(#FFD100) |
| 对外 | olive(#4A5D3A) | yellow(#FFD100) |

---

*最后更新：2026-06-16 · 目录重组 + nian-templates 主力库 + template-index.json 统一索引*
