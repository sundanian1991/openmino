# Haglöfs 范式品牌页技能 · 设计 Spec

> 目标：把 22 个品牌案例吃透，封装成可交付的 skill「haglofs-paradigm」
> 路径：5 阶段内化法
> 创建：2026-07-02

---

## 一、技能定位

| 技能 | 管什么 | 一句话定位 |
|---|---|---|
| nian-brand | 品牌叙事 · "说什么" | 品牌调性、宣言文案、5 种叙事结构、2 红线自检 |
| nian-design | 通用设计系统 · 工具箱 | token-root、组件库、showcase-archive 的宿主 |
| **haglofs-paradigm（新）** | **品牌页施工工艺 · "怎么做出 H061 质感"** | 以 Haglöfs 体系为唯一范式，输出同级品牌页的母版+规则+检查清单 |

**分工边界**：
- nian-brand 决定页面"说什么"（叙事/文案/调性）
- nian-design 提供"原子组件"（token/组件/素材库）
- **haglofs-paradigm 负责"施工组装"**——把它们拼成 H061/R3 那种质感的完整页面
- 不重复前两者的内容，而是消费它们

## 二、安装位置

- **路径**：`~/.agents/skills/haglofs-paradigm/`
- **范围**：用户全局，所有项目可调用
- **不进 git**（全局技能目录），但 spec 和工作过程产物留在项目 workspace（进 git）

## 三、5 阶段内化法

### 阶段 1｜骨架测绘（主代理串行深读）

**输入**：3 个核心样本
- `H061-品牌系统-Haglofs早期-statement.html`（851 行）
- `H062-品牌系统-Haglofs早期v2-statement.html`（577 行）
- `R3-品牌数据分析中心.html`（673 行）

**动作**：每个文件拆成 4 张剖面图——
1. HTML 结构树（section 组织、语义层级）
2. CSS 分层（哪些样式是 :root 体系、哪些是组件局部、哪些是一次性装饰）
3. Hero 变体识别（属于 6 种里的哪种 + 关键决策）
4. Section 组织模式（信息密度梯度、留白节奏）

**产出**：`references/skeleton-map.md`——3 样本剖析 + 共性提取（Haglöfs 范式"标配"结构）

### 阶段 2｜规则提取（派 5 个子代理并行）

**为什么是 5 个不是 15 个**：按功能层切，每个子代理吃透一层、产出一张可验证的规则卡。15 个散维度会产生大量重复读取和不可合并碎片。5 个功能层覆盖全部决策点：

| 子代理 | 负责层 | 扫描范围 | 产出 |
|---|---|---|---|
| A · 色彩体系 | token-root 20 色 + 配色决策 | token-root.css + R3/H 样本配色使用 | `rules/rules-color.md` |
| B · Hero 变体 | 6 种 Hero 特征+适用+代码骨架 | H042(6变体) + H061/H062/R3 + H029-H037 | `rules/rules-hero.md` |
| C · 组件库 API | 组件用法+禁忌 | R3-品牌展示(全组件) + H031(组件库) | `rules/rules-components.md` |
| D · 排版字体 | 字体配方+字号阶梯+行高 | H061/H062(4字体) + 全样本排版 | `rules/rules-typography.md` |
| E · 叙事节奏 | Section 组织+密度梯度+留白 | H042(Volvo 6段) + R3(数据叙事) + 全样本 | `rules/rules-narrative.md` |

**子代理约束**：
- prompt 自包含（目标+上下文+文件路径+产出格式）
- 只读不改
- 产出统一格式：规则卡（决策点 → 规则 → 示例出处 → 反例/禁忌）
- 返回摘要：文件路径 + 规则条数 + 是否覆盖指定范围

### 阶段 3｜对比与校准（主代理串行）

**输入**：H 系列其余案例（H042 Volvo、H044-H051 设计案例、H029-H037 品牌系统）

**动作**：横向对比，区分——
- **范式共性**（Haglöfs DNA，必须遵守，动了就不是这个范式）
- **案例个性**（可变，不同品牌/场景的合理调整）

**产出**：`references/paradigm-boundary.md`——红线（不可动）+ 弹性区（可调）+ 判断依据

### 阶段 4｜资产固化（主代理 + 1 子代理整理）

**产出文件结构**：
```
~/.agents/skills/haglofs-paradigm/
├── SKILL.md                    # 入口：3秒判断 + 工作流 + 检查清单
├── references/
│   ├── rules/
│   │   ├── rules-color.md      # 阶段2-A产出
│   │   ├── rules-hero.md       # 阶段2-B
│   │   ├── rules-components.md # 阶段2-C
│   │   ├── rules-typography.md # 阶段2-D
│   │   └── rules-narrative.md  # 阶段2-E
│   ├── master-templates/       # 从 H061/H062/R3 提炼的可复用母版
│   │   ├── hero-statement.html
│   │   ├── hero-split.html
│   │   └── hero-pulse.html
│   ├── skeleton-map.md         # 阶段1产出
│   └── paradigm-boundary.md    # 阶段3产出
└── checklists/
    └── craft-checklist.md      # 施工检查清单（从规则卡提炼的 yes/no 项）
```

**SKILL.md 核心内容**：
1. **3 秒判断**：什么时候用这个技能（vs nian-brand / nian-design）
2. **工作流**：选 Hero → 取品牌 DNA → 叙事施工 → 红线自检 → 输出
3. **检查清单**：从 5 张规则卡提炼的 20-30 条 yes/no 项
4. **母版索引**：3 个 Hero 母版 + 适用场景

### 阶段 5｜迁移验证（主代理）

**动作**：用一个**非 Haglöfs 的真实品牌**（待定，候选：Patagonia / Arc'teryx / 北面）跑一遍新技能。

**流程**：
1. 选品牌 → 读品牌调性
2. 走 SKILL.md 工作流，产出一个完整品牌页
3. 对照 H061 水准自检（用 craft-checklist）
4. 记录卡壳点、规则缺失、母版缺陷

**产出**：
- `validation-page.html`（验证产出页）
- `validation-report.md`（卡壳点 + 规则缺失 + v1.1 迭代清单）

---

## 四、与全景表描述的偏差（已核查）

| 全景表声称 | 实际 | 影响 |
|---|---|---|
| H061/H062 各约 1565 行 | 851 / 577 行 | SCENE-INDEX 误标，阶段1需以实际为准 |
| _archive 约 388 个 | 220 个 | 不影响核心样本学习 |
| 资产在 workspace/ 下 | 在 `.agents/skills/nian-design/references/` | **未进 git**，需注意备份 |

## 五、不做的事（YAGNI）

- 不重新扫描全部 220 个归档文件（核心样本 + 代表性案例已足够）
- 不新建设计系统/配色体系（消费 token-root.css，不另起炉灶）
- 不做交互/动效规则（Haglöfs 范式以静态质感为主，动效是 nian-design 的范畴）
- 不覆盖 15 个维度（5 个功能层已覆盖全部决策点）
- 不重复 nian-brand 的叙事内容（新技能消费它的产出，不复制）

## 六、成功标准

阶段 5 结束时：
1. `~/.agents/skills/haglofs-paradigm/` 完整可用（SKILL.md + 5 规则卡 + 3 母版 + 检查清单）
2. 拿一个陌生品牌，能走完整工作流产出 H061 同级页面
3. craft-checklist 能拦住至少 80% 的"质感滑坡"问题
4. 技能入口有清晰的 3 秒判断，不会跟 nian-brand/nian-design 混淆
