---
name: viz:handler-icon
description: "统一图标处理中心 — 搜索、本地调用、生成三条流水线。覆盖 Lucide/MingCute/Carbon/Phosphor/Iconify全库等10万+图标，+本地100预置资产，+手绘AI生成。触发：搜个XX图标、找图标、用本地XX图标、生成手绘图标"
---

# Handler Icon — 统一图标处理中心

> 一个入口，三条流水线。搜索覆盖 Iconify 150+集合，本地零延迟读取预置资产，生成走手绘AI或代码直出。

---

## 架构总览

```
viz-handler-icon
├── 搜索流水线 (Search) ──→ Iconify / WeaveFox
├── 本地流水线 (Local) ──→ 预置SVG资产
└── 生成流水线 (Generate) ──→ Quiver API / Claude Artifact
```

**自动路由**：用户只需说需求，技能内部按场景匹配最优源。

---

## 流水线一：搜索 (Search Pipeline)

### 数据源

| 源 | 集合名 | 规模 | 风格 | 用途 |
|----|--------|------|------|------|
| **Iconify主入口** | 150+集合 | 20万+ | 全风格 | 通用搜索 |
| `lucide` | lucide | 1711 | 2px描边、圆角、极简 | PPT/UI/报告 |
| `mingcute` | mingcute | 3324 | 精确几何、有Padding | 与Lucide风格接近 |
| `ph` (Phosphor) | ph | 9072 | 多粗细(Thin~Fill~Duotone) | 需要变体时 |
| `carbon` | carbon | 2526 | IBM企业风、16/32px | 企业/数据报表 |
| `mdi` | mdi | 7447 | Material Design | Android/通用UI |
| `material-symbols` | material-symbols | 15388 | Google官方 | 全平台覆盖 |
| **WeaveFox备入口** | weavefox | 未公开 | 通用 | Iconify失败时fallback |

### 使用方式

```bash
# 通用搜索（所有集合）
node ./scripts/search.js "warning"

# 限定风格搜索
node ./scripts/search.js "search" --style lucide
node ./scripts/search.js "bell" --style ph              # Phosphor
node ./scripts/search.js "chart" --style carbon         # Carbon
node ./scripts/search.js "user" --style mingcute

# 指定返回数量
node ./scripts/search.js "document" --topK 10

# 组合
node ./scripts/search.js "security" --style lucide --topK 3
```

**`--style` 可选值**：`lucide` `mingcute` `ph` `carbon` `mdi` `material-symbols` `all`（默认）

### 输出格式

```json
{
  "mode": "search",
  "query": "warning",
  "style": "lucide",
  "count": 5,
  "results": [
    {
      "source": "iconify:lucide:triangle-alert",
      "collection": "lucide",
      "name": "triangle-alert",
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\"...",
      "styleTags": ["outline","2px-stroke","round"],
      "url": "https://api.iconify.design/lucide:triangle-alert.svg"
    }
  ]
}
```

---

## 流水线二：本地 (Local Pipeline)

### 预置资产

路径：`../../fe-mino-frontend/assets/anthropic-icons/`

| 库 | 数量 | 用途 |
|----|------|------|
| `lucide/` | 50 | 技术文档场景（文件类型、操作、导航、状态、代码元素） |
| `hand-drawn/` | 50 | 装饰元素（分隔符、装饰插图、概念图标、空状态） |

### 使用方式

```bash
# 按ID读取
node ./scripts/local.js "file-py"           # 自动匹配 lucide 变体
node ./scripts/local.js "wave" --style hand-drawn

# 列表全部可用
node ./scripts/local.js --list
```

### 输出格式

```json
{
  "mode": "local",
  "id": "file-py",
  "variant": "lucide",
  "svg": "<svg...",
  "path": "../../fe-mino-frontend/assets/anthropic-icons/lucide/file-py.svg"
}
```

**零延迟** — 不联网，直接文件读取。

---

## 流水线三：生成 (Generate Pipeline)

### 两种生成方式

| 方式 | 触发条件 | 工具 | 限制 |
|------|----------|------|------|
| **手绘风格** | 有机曲线、复杂生物/器物、需独特视觉 | Quiver API (`api.quiver.ai`) | 周20次额度 |
| **代码直出** | 几何精确、简单形状、可描述为Path | Claude Artifact / 直接写SVG | 无限制 |

### 手绘风格规范（Quiver）

色彩系统（四色）：
- `--terra-cotta: #D6654B` — 陶土色，焦点强调
- `--ink-black: #1A1612` — 墨黑，描边
- `--rice-white: #FEFFFE` — 米白，主体填充
- `--deep-terra: #B03A21` — 深陶土，阴影

线条系统：
- 主轮廓：4.0–5.5px | 结构线：2.5–3.5px | 细节线：1.5–2.0px
- 必须：`stroke-linecap="round"` `stroke-linejoin="round"`

**快速决策**：
1. 物体是活的？→ 是=陶土色主体，否=米白主体
2. 需要强调？→ 那部分用陶土色点缀（≤2处）
3. 底部要重量感？→ 深陶土阴影
4. 所有线条墨黑描边

### 使用方式

```bash
# 手绘生成（消耗Quiver额度）
node ./scripts/generate.js "一只陶土色的茶杯" --style hand-drawn

# 代码直出（不消耗额度）
node ./scripts/generate.js "一个24x24的搜索图标，2px描边，圆角" --style code
```

### 输出格式

```json
{
  "mode": "generate",
  "method": "hand-drawn|code",
  "description": "一只陶土色的茶杯",
  "svg": "<svg...",
  "style": "hand-drawn",
  "credits": "quiver.ai|claude"
}
```

---

## 风格自动路由

用户不需要知道底层集合名，按场景自然表达即可：

| 用户说 | 自动路由 | 原因 |
|--------|----------|------|
| "搜个warning图标" / "找个图标" | Iconify搜索 → all集合 | 通用，返回多候选 |
| "PPT里用的图标" / "报告用的" | Iconify搜索 → lucide/mingcute | 2px描边，专业克制 |
| "瑞士风/极简/数据" | Iconify搜索 → carbon/ph | 企业几何 |
| "手绘/虾/李诞风格" | Quiver API生成 | 有机曲线，无标准库匹配 |
| "技术文档/代码文件图标" | 本地 lucide/ | 零延迟，精确匹配 |
| "装饰/分隔线" | 本地 hand-drawn/ | 零延迟，预置分隔符 |
| "想要多粗细变体" | Iconify搜索 → ph (Phosphor) | Thin/Light/Regular/Bold/Fill/Duotone |

---

## 一句话触发

- "搜个 warning 图标" → 搜索流水线
- "找 lucide 风格的搜索图标" → 搜索流水线 + style过滤
- "用本地 file-py 图标" → 本地流水线
- "生成手绘风格的茶杯" → 生成流水线（手绘）
- "画一个24x24的刷新图标" → 生成流水线（代码直出）

---

## 错误处理

| 场景 | 行为 |
|------|------|
| Iconify 搜索无结果 | fallback到WeaveFox，仍无则返回空数组+提示 |
| Iconify 服务不可用 | 自动切换WeaveFox |
| 本地图标不存在 | 提示可用列表，建议搜索 |
| Quiver API 额度耗尽 | 自动降级为代码直出，并提示用户 |
| 无效的 `--style` | 返回可用风格列表 |

---

## 文件结构

```
viz-handler-icon/
├── SKILL.md                  ← 本文件
├── scripts/
│   ├── search.js             ← Iconify/WeaveFox搜索
│   ├── local.js              ← 本地资产读取
│   └── generate.js           ← Quiver API + 代码直出
└── references/
    ├── style-router.md       ← 场景→源完整映射
    └── api-resources.md      ← Iconify/Quiver API参考
```

---

## 来源与整合

本技能合并以下历史能力：
- `tool-icon-retrieval` — WeaveFox搜索逻辑
- `viz-hand-drawn-icon` — Quiver API手绘生成 + 四色风格体系
- `fe-mino-frontend/anthropic-icons` — 本地100预置资产

---

*创建：2026-05-20 | 版本：v1.0*
