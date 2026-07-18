# anthropic-deck — Anthropic 风格对外产出编排器

> 设计日期：2026-07-18
> 状态：设计已批准，待写实现计划

---

## 背景

Anthropic 官方开源了 `brand-guidelines`（公司品牌规范）和 `pptx`（PowerPoint 创建）两个技能，分属不同插件包——前者是**风格轴**（作用于任何 artifact），后者是**能力轴**（读写 .pptx）。

视频观察到 Anthropic 对外的图片和 PPT 呈现统一的公司风格。本技能的诉求是：**一键产出同一种 Anthropic 风格的 PPT + 海报**，不用每次手动记着调两个底层技能。

## 决策记录

### 关键决策

1. **不合并底层技能**——官方刻意将风格轴与能力轴分离。合并会牺牲 pptx 的通用性，也把 brand-guidelines 绑死在 PPT 上。
2. **采用编排技能方案（B）**——保留两个底层技能不动，建一个薄薄的编排层专门产出 Anthropic 风格 PPT + 海报。
3. **纯 Markdown 指令编排（方案 A）**——不自带任何色值/字体 token，运行时读底层技能。零冗余，跟项目内 `content-viz-orchestrator` 同范式。
4. **两套视觉语言按场景路由**——橙调（brand-guidelines）默认，蓝调（viz-anthropic / Skilljar）培训专用。
5. **配套产出强制同风格**——同一次请求里 PPT + 海报必须用同一套视觉语言，不允许混用。这是编排技能的核心价值。

### 已否决方案

| 方案 | 否决理由 |
|------|---------|
| 合并 brand-guidelines 进 pptx | 牺牲通用性，违背官方架构 |
| 编排技能自带 token 摘要（方案 B） | 数据双份，迟早漂移 |
| 脚本化编排（方案 C） | 过度工程，编排本质是给代理读的指令 |

---

## §1 定位与边界

**一句话定位**：Anthropic 对外产出的编排器——输入大纲/草稿，输出同一种公司风格的 .pptx 和 HTML 海报。不施工，只做场景判断、风格路由、施工委托。

### 做的事（3 件）

1. **场景判别**——读用户请求，判定"品牌/对外"还是"培训/课程"，路由到对应视觉语言
2. **风格注入**——读取底层风格技能（brand-guidelines 或 viz-anthropic）的色值/字体
3. **施工委托**——PPT 交 `pptx`（html2pptx 工作流），海报交 HTML 生成（参照 nothing-design / frontend-style 范式）

### 不做的事（硬边界）

- ❌ 不自带任何色值/字体 token（只在 brand-guidelines / viz-anthropic 读取）
- ❌ 不替代 pptx 的 XML/html2pptx 细节
- ❌ 不做 PDF/培训页/整页 slide deck（YAGNI，第一版只 .pptx + HTML 海报）
- ❌ 不复述底层技能的规则，只引用

### 与现有技能的关系

```
anthropic-deck（编排，新建）
   ├─ 读 → brand-guidelines（橙调，已有）
   ├─ 读 → viz-anthropic（蓝调，已有）
   ├─ 调 → pptx（施工 .pptx，已有）
   └─ 调 → HTML 生成（施工海报，已有范式）
```

---

## §2 触发与场景路由

### 触发条件

满足任一即触发——
- 用户说"Anthropic 风格 / Anthropic 风" + 产出词（PPT / 幻灯 / 演讲 / 海报 / deck / slides）
- 用户提供大纲/草稿，明确要求"做成 Anthropic 公司风格的演示"
- 用户说"给这次培训/演讲做配套图 + 幻灯"（且明确 Anthropic 语境）

### 不触发

- 用户只说"做个 PPT"——无 Anthropic 语境，走通用 pptx
- 用户要做非 Anthropic 品牌的产出

### 场景路由规则（写死，可覆盖）

```
判断信号 → 视觉语言

【橙调 brand-guidelines】默认
  · 关键词：对外、演讲、品牌、发言、访谈、博客、press、对外 deck
  · 产出：HTML 海报（默认走这套）
  · 产出：通用 PPT（非培训类）

【蓝调 viz-anthropic】培训专用
  · 关键词：培训、课程、教学、学习、lesson、course、training、LMS
  · 产出：培训幻灯、课程配套图

【覆盖规则】
  · 用户明说"用蓝调/橙调" → 听用户的
  · 用户明说"两件套用同一风格" → 以 PPT 场景为准
  · 信号模糊（既像培训又像对外）→ 默认橙调 + 问一句确认
```

### 配套产出的风格一致性约束

> 同一次请求里若同时产出 PPT + 海报，**两件强制走同一套视觉语言**，不允许混用。这是编排技能的核心价值。
>
> 明确：若 PPT 判定为培训类（蓝调），配套海报也必须用蓝调——即使海报本身默认走橙调。判别以 PPT 场景为准。

---

## §3 工作流（三步）

```
用户请求进入
  ↓
Step 1：场景判别（编排技能自己做）
  · 扫关键词 → 路由到橙调 / 蓝调
  · 信号模糊 → 问一句确认
  · 用户已明说 → 直接采用，跳过判别
  输出：视觉语言标签（orange | blue）+ 产出清单（pptx | poster | both）
  ↓
Step 2：风格注入（读底层，不复述）
  · orange → 读 brand-guidelines/SKILL.md 拿色值+字体
  · blue → 读 viz-anthropic/SKILL.md + design-model.yaml 拿 token
  输出：一份"风格决策卡"（Markdown，不写死在编排技能里）
  ↓
Step 3：施工委托（调底层技能）
  · .pptx → 交 pptx skill 的 html2pptx 工作流
            输入：风格决策卡 + 用户大纲
            输出：.pptx 文件
  · HTML 海报 → 交 HTML 生成（参照 frontend-style 范式）
            输入：风格决策卡 + 海报内容
            输出：单文件 HTML
  · 配套产出（both）→ 风格决策卡强制同一份，先做 PPT 再做海报
```

### 风格决策卡模板

Step 2 产出，编排技能生成，不预填色值：

```markdown
## 风格决策卡

### 场景
- 类型：[对外演讲 / 培训课程 / 品牌]
- 视觉语言：[brand-guidelines(橙) | viz-anthropic(蓝)]
- 来源：[读取自 <底层技能路径>]

### 配色（来自 <来源>）
- 主色：[从来源读取]
- 背景：[从来源读取]
- 强调色：[从来源读取]

### 字体（来自 <来源>）
- 标题：[从来源读取]
- 正文：[从来源读取]

### 产出清单
- [ ] .pptx：[文件名]
- [ ] HTML 海报：[文件名]
```

### 完成检查

- [ ] 场景判别完成（橙/蓝 + 理由）？
- [ ] 读了对应底层风格技能（不是凭记忆）？
- [ ] 风格决策卡已生成？
- [ ] PPT 走了 pptx skill 的 html2pptx？
- [ ] 配套产出强制同风格？
- [ ] 没有在编排技能里复述色值/字体（只引用）？

---

## 文件结构（实现时创建）

```
.agents/skills/anthropic-deck/
└── SKILL.md    # 唯一文件，纯 Markdown 指令
```

不创建：
- ❌ design-model.yaml（不存 token，避免漂移）
- ❌ references/ 目录（不存参考资料，全引用底层）
- ❌ 脚本文件（纯指令编排）

---

## 依赖

| 依赖 | 类型 | 路径 |
|------|------|------|
| brand-guidelines | 读 | `.agents/skills/brand-guidelines/SKILL.md` |
| viz-anthropic | 读 | `~/.agents/skills/viz-anthropic/SKILL.md` + `design-model.yaml` |
| pptx | 调 | `~/.agents/skills/pptx/SKILL.md`（html2pptx 工作流） |
| HTML 生成 | 调 | 参照 frontend-style / nothing-design 范式 |

---

## 非目标（YAGNI）

明确不在第一版范围内：
- PDF 讲义（pdf skill + brand-guidelines 即可，不需编排）
- 培训页/整页 slide deck（独立产物，各自能撑一个编排技能）
- 多公司品牌支持（本技能只管 Anthropic）
- 自动化脚本流水线（过度工程）
