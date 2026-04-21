# 05-self-review.md — 自审与错题本

> 每次生成 diagram 前必读，生成后逐项对照
> 目标：A 级交付（用户只看内容，无需提布局 bug）

---

## 一、通用问题分类（5 大类）

### 1. 遮罩逻辑不完整（Masking Integrity）🔴 P0

**现象**：半透明元素后方有箭头穿过时，未添加 opaque paper mask，导致箭头视觉穿透。

**根本原因**：对"哪些元素需要遮罩"判断失误，或忘记绘制遮罩层。

**通用规则**：
> 任何 `fill` 含 `rgba(...,0.xx)` 或 `opacity < 1` 或 `fill="var(--accent-tint)"` 的元素，**如果其后方（垂直或水平方向）有箭头穿过**，必须在不透明层添加 `<rect fill="#faf7f2">` 遮罩，再叠样式层。

**检查方法**：
- 逐个扫描半透明元素
- 想象箭头从该元素"后方"穿过（无论实际 SVG 渲染顺序如何）
- 有箭头 → 必须有 mask

**修复模板**：
```svg
<!-- 1. Opaque mask (always first) -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="#faf7f2"/>
<!-- 2. Styled box -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="FILL" stroke="STROKE"/>
```

**历史案例**：
- 30 个旧文件：进度条、badge、highlight box 普遍缺失 mask
- 4 个新文件：所有 focal highlight 均缺失 mask

---

### 2. 4px 网格约束（4px Grid）🟡 P2

**现象**：坐标非 4 的倍数，导致元素边界模糊、对齐偏差。

**根本原因**：计算坐标时取整不当，或相对位置推导未模 4 校准。

**通用规则**：
> 所有 `x`、`y`、`width`、`height`、`gap`、`padding` 必须被 4 整除。
> **例外**：`stroke-width`（0.8/1/1.2）、`opacity`、pattern 尺寸、font-size（按设计系统取值）。

**检查方法**：
```javascript
value % 4 === 0  // 快速心算
```

**修正策略**：
- x=410 → 调整为 408 或 412
- 相对位置：`x2 = x1 + width1 + gap`，计算后取整到最近 4 倍数

**历史案例**：
- 360 流量变现：高亮框 `x=410`（非 4 倍数）
- 30 个旧文件：多处坐标以奇数结尾（1/2/3/5/6/7/9）

---

### 3. 布局边界判断失误（Layout Boundaries）🟠 P1

**现象**：
- 文字基线超出容器底部
- 两个 badge 水平重叠
- 进度条宽度超出父容器
- Legend 与上一个元素间距过小（≤20px）

**根本原因**：未建立"容器底线 = y + height - padding"的心算模型，或未预留 descender 空间。

**通用规则**：

**A. 文字边界**：
> 容器内任意文字的 `y` 坐标必须满足：
> ```
> text_y ≥ container_y + container_height - 24px
> ```
> （保证 baseline 与框底有至少 16px 安全距离，避免 descender 溢出）

**B. 元素间距**：
> - 同类型元素水平间距 ≥ 16px
> - 不同类型元素水平间距 ≥ 24px
> - 垂直层级间距 ≥ 20px

**C. Legend 位置**：
> - Legend 条带起始 y ≥ 最后一个可见元素 y + 40px
> - viewBox 高度 ≥ Legend 底部 + 40px

**检查方法**：
- 画完容器 → 标记 `container_bottom = y + height`
- 放文字 → 计算 `text_y ≤ container_bottom - 24`？
- 放相邻元素 → 测量 `next.x - (current.x + current.width) ≥ min_gap`

**历史案例**：
- 业务全景 Block 1：文字基线 y=452/472/496/516，容器底 y=428 → 溢出 24-88px
- 业务全景 Block 3：数值 y=792，框底 y=796 → 溢出 4px
- 业务全景 Legend y=1136，上一元素 y=1132 → 间距仅 4px（应 ≥40）

---

### 4. 语义系统未应用（Semantic Consistency）🟠 P1

**现象**：
- 颜色硬编码：`fill="#57534e"`、`#0f172a`、`#2563eb`（数据条除外）
- 字体用错：节点名用 Mono、标题用 sans
- 字号错误：eyebrow 0.625rem（≈10px）而非 8px
- 标签内容与业务事实不符

**根本原因**：未将 style-guide.md 的语义 token 映射到实际使用，或对"技术内容 vs 人名"的字体规则不清晰。

**通用规则**：

| 用途 | 颜色 | 字体 | 字号 |
|------|------|------|------|
| 页面标题 | `var(--ink)` | `'Instrument Serif', serif` | 14px（非 16/18） |
| 节点名（人/系统名） | `var(--ink)` | `'Geist', sans-serif` | 12-13px 600 |
| 技术标签/数值 | `var(--muted)` | `'Geist Mono', monospace` | 9-11px |
| Eyebrow | `var(--muted)` | `'Geist Mono', monospace` | **8px** |
| 箭头/规则线 | `var(--muted)` | - | stroke-width 1.5 |
| Focal 元素 | `var(--accent)` | - | stroke 1.5 |
| 数据条品牌色 | **可例外**（蚂蚁蓝、字节紫等） | - | - |

**检查方法**：
- 全局搜索 `fill="#` → 问：这是数据条吗？否 → 改为 `var(--*)`
- 搜索 `font-family="'Geist Mono'` → 确认是技术内容（端口、数值、命令）
- 搜索 `font-family="'Geist'`（无 Mono）→ 确认是人名/系统名
- 搜索 `font-family` 未指定 → 默认应为 `'Geist'`
- 搜索 `Instrument Serif` → 确认仅用于页面标题（h1）和 editorial aside

**历史案例**：
- 全部 4 个文件：箭头 `fill="#57534e"` 未用变量
- 业务全景：标题 `font-family="'Geist'"` + `font-size="16"` → 双重错误
- 业务全景：趋势卡片 `fill="#0f172a"` → 应 `fill="var(--ink)"` 或 `var(--ink@0.90)`
- 360 流量变现：L3 数值 `font-family="'Geist'"` → 应 Mono

---

### 5. 复杂度超标未拆分（Complexity Budget）🔴 P0

**现象**：
- 业务全景一页通：12 个节点（5 卡片 + 3 京东区块 + 4 趋势）
- 字节联合贷：2 个 focal 节点（卡在边界，但风险高）

**根本原因**：生成前未草图计数，或对"节点"定义不清（把多个信息点塞进一个框）。

**通用规则**：

| 类型 | 上限 | 超过后动作 |
|------|------|-----------|
| 节点数 | 9 | **强制拆分**为概览+详情 |
| 箭头/连线 | 12 | 简化流程或拆图 |
| Focal 元素 | 2 | 只留 1 个核心，次要降级为 ink |
| 信息密度 | 3 条/节点 | 合并信息或拆分 |

**节点计数原则**：
- 一个 `rect` + 标题 + 子标签 = 1 节点（即使包含多条信息）
- 独立容器（panel）内的多个 badge = 按实际信息点计数
- 外部 info panel（如左侧融资结构）计入总数

**拆分策略**：
1. **同主题聚合** → 拆成主图 + 详图（如：全景 + 趋势细节）
2. **多层级信息** → 用 layer stack 分层展示（Layer 1、Layer 2...）
3. **时序/分支** → 拆成多个 flowchart（流程 A、流程 B）

**历史案例**：
- 业务全景：12 节点 → 应拆为【5 平台 + 京东合作】和【四大趋势】两图

---

## 二、生成后自检清单（必做 5 分钟）

按顺序执行，每项打 √ 或 ✗：

### □ 遮罩完整性
- [ ] 所有 `fill` 含 `rgba(` 或 `opacity` < 1 的元素，后方有箭头吗？
- [ ] 有箭头 → 已添加 `<rect fill="#faf7f2" .../>` 遮罩（在样式层之前）
- [ ] mask 的 `x/y/width/height/rx` 与样式层**完全一致**

### □ 4px 网格
- [ ] 所有 `x`、`y`、`width`、`height` 被 4 整除（心算 `value % 4 === 0`）
- [ ] 相对位置推导：`x2 = x1 + w1 + gap` 后取整到 4 倍数
- [ ] 例外项：stroke-width（0.8/1/1.2）、opacity、font-size（按设计系统）

### □ 布局边界
- [ ] 容器内文字 `text_y ≥ container_y + container_height - 24px`
- [ ] 相邻 fill 元素间距 ≥ 16px（同类型）/ 24px（不同类型）
- [ ] 进度条 `width ≤ parent_width - 2*padding`
- [ ] Legend 起始 `y ≥ last_element_y + 40px`
- [ ] viewBox 底部 ≥ Legend 底部 + 40px

### □ 语义一致性
- [ ] 所有 `fill="#xxxxxx"` → 是数据条品牌色吗？否 → 改为 `var(--muted/accent/ink)`
- [ ] 箭头 `fill` → `var(--muted)`（或 `arrow-accent` 用 `var(--accent)`）
- [ ] 页面标题：`font-family="'Instrument Serif', serif"` + `font-size="14"` + `font-style="italic"`
- [ ] 节点名：`font-family="'Geist', sans-serif"` + `font-weight="600"` + `12-13px`
- [ ] 技术标签/数值：`font-family="'Geist Mono', monospace"`
- [ ] eyebrow：`font-size="8"`（非 0.625rem）

### □ 复杂度合规
- [ ] 节点计数 ≤ 9（数 `rect` 为主框的数量）
- [ ] focal 元素 ≤ 2（`fill="var(--accent-tint)"` 或 `stroke="var(--accent)"`）
- [ ] 箭头总数 ≤ 12

### □ 渲染顺序
- [ ] 所有 `<line>`（箭头）在 `<rect>`（节点）之前绘制
- [ ] 无文字被遮挡（脑内渲染：箭头在底层，节点上层）

### □ 业务事实
- [ ] 所有人名、机构名、数据值与 project memory 一致
- [ ] 关键数字（余额、日均、比例）交叉核对

---

## 三、历史错误记录（按文件）

### 30 个旧文件（infographic-svg → diagram-design 重写）

| # | 文件 | 问题类型 | 具体现象 | 修正方式 |
|---|------|---------|---------|---------|
| 18 | 危机处理流程 | 业务事实错误 | "军哥" → 应为"王易人" | 改文本 |
| 21 | 整改验证清单 | 遮罩缺失 | 进度条无 mask，箭头穿透标题栏 | 加 opaque rect |
| 22 | 准入评估框架 | 布局边界 | 合格 badge 与准入 badge 重叠 | 调整 x/width |
| 23 | 清退决策树 | 箭头对齐 + 重叠 | D3→启动清退箭头未居中；正式清退与图例重叠 | 改坐标、下移节点 |
| 28 | 健康度仪表盘 | 图形完整性 | 半圆弧由 4 段 disconnected path，端点不连续 | 重绘连续弧 |
| ... | ... | ... | ... | ... |

**模式**：遮罩缺失（普遍）、坐标非 4 倍数（多处）、文字溢出（Block 类元素）、legend 拥挤。

---

### 4 个新文件（首次交付 diagram-design）

| # | 文件 | 问题类型 | 具体现象 | 修正方式 |
|---|------|---------|---------|---------|
| 1 | 业务全景一页通 | 🔴 复杂度超标 | 12 节点（5+3+4）>9 | 拆分为两图 |
| 2 | 业务全景一页通 | 🟠 遮罩缺失 | 蚂蚁卡片（accent-tint 0.06）、Block 3（0.08）无 mask | 加 opaque rect |
| 3 | 业务全景一页通 | 🟠 布局边界 | Block 1 文字溢出容器 24-88px；Block 3 数值溢出 4px | 调高度/调 y |
| 4 | 业务全景一页通 | 🟠 Legend 重叠 | Legend y=1136，上一元素 y=1132，间距 4px | 下移内容或上移 Legend |
| 5 | 业务全景一页通 | 🟡 语义错误 | 标题用 Geist 16px（非 Serif 14px）；箭头硬编码 | 改字体/改变量 |
| 6 | 业务全景一页通 | 🟡  Eyebrow 字号 | 0.625rem（≈10px）而非 8px | 改 8px |
| 7 | 360 流量变现 | 🟡 网格未对齐 | 右分支高亮框 x=410（非 4 倍数） | 改 408 或 412 |
| 8 | 字节联合贷 | 🟠 遮罩缺失 | NODE 1、NODE 4 focal 无 mask | 加 opaque rect |
| 9 | 蚂蚁分发链路 | 🟠 遮罩缺失 | NODE 1 focal 无 mask | 加 opaque rect |
| 10 | 全部 | 🟡 箭头颜色 | `fill="#57534e"` 未用 `var(--muted)` | 改变量 |

---

### 2026-04-21：ljg-cards / rainman-card 技能安装失败

| # | 文件/技能 | 问题类型 | 具体现象 | 修正方式 |
|---|----------|---------|---------|---------|
| 1 | ljg-cards SKILL.md | 🔴 路径硬编码 | 所有资源路径写死为 `~/.claude/skills/ljg-cards/...`，但实际安装在项目目录 `.claude/skills/` | 删除技能（未修复 SKILL） |
| 2 | rainman-card SKILL.md | 🔴 路径硬编码 | 同上，依赖路径不匹配 | 删除技能 |
| 3 | 安装过程 | 🟠 依赖混乱 | 先全局安装 → 技能目录无 node_modules → 又本地安装，路径不一致 | 完全清理 |
| 4 | Skill 调用 | 🔴 静默失败 | 两次 Skill 调用只返回 SKILL.md 说明，无任何执行日志或错误 | 放弃使用 |
| 5 | 实际生成 | ⚠️ 绕道而行 | 手动写 Node.js 脚本绕过 Skill 机制才生成 PNG | 不应成为常规方案 |

**根本原因**：
1. **技能设计缺陷**：SKILL.md 假设 `~/.claude/skills` 全局路径，未使用相对路径或 base directory
2. **环境不匹配**：本项目的技能安装在项目内 `.claude/skills/`，非 `~/.claude`
3. **错误处理缺失**：资源读取失败后无错误提示，子代理直接结束，无交付物
4. **验证滞后**：未在调用前验证路径一致性，浪费 30+ 分钟和大量 token

**教训**：
- 安装第三方技能前，先检查 SKILL.md 中的路径假设
- 若路径硬编码且与环境不匹配，立即放弃或建立符号链接
- Skill 调用后必须验证交付物产生，否则视为失败
- 依赖必须在技能目录内本地安装，不可依赖全局

---

## 四、自检流程（生成后立即执行）

**时间**：5 分钟/图

**步骤**：

1. **脑内渲染扫描**（1 分钟）
   - 闭眼想象 SVG 绘制顺序
   - 问：哪些箭头会穿过半透明元素？→ 记下

2. **逐项打勾**（3 分钟）
   - 按上文"自检清单"逐条核对
   - 任一 ✗ → 立即修正

3. **业务事实核对**（1 分钟）
   - 扫描所有文字标签
   - 对照 `memory/projects/互金平台/` 中的数据验证

4. **复杂度终审**（30 秒）
   - 节点数 > 8？→ 标记"需拆分"
   - focal 元素 > 1？→ 考虑降级

**输出**：自检通过 → 交付；否则 → 修正 → 重新自检。

---

## 五、质量标准与交付决策

| 等级 | 标准 | 交付动作 |
|------|------|---------|
| **A** | 自检 7 项全 √ + 脑内渲染无异常 | 直接交付 |
| **B** | 自检 6-7 项 √，存在 1 项 minor（如字体 11px→12px） | 交付时注明"已知优化点" |
| **C** | 自检 <6 项 √ 或存在 P0/P1 问题 | **禁止交付**，重写 |

**目标**：100% A 级交付，用户无需提布局 bug。

---

## 六、快速参考卡（生成时贴屏幕上）

```
MASK  → rgba/accent-tint + 后方有箭头？→ 加 #faf7f2 mask
GRID  → 所有 x/y/w/h % 4 === 0？
BOUND → 文字 y ≤ container.bottom - 24？
SEM   → 颜色用变量、标题 Serif 14px、 eyebrow 8px
COMP  → 节点 ≤9、focal ≤2、箭头 ≤12？
ORDER → 箭头在节点之前绘制？
FACT  → 人名/数据与 memory 一致？
```

---

*最后更新：2026-04-21 — 基于 30 旧文件 + 4 新文件的审查结果提炼*
*下次生成前必读，生成后必做自检*
