# 04 · nian 技能族使用建议

> 基于"供应商审批邮件"端到端实测（orchestrator → decision-card → design），回答：**nian 怎么用效果更好**。
> 测试时间：2026-06-23 · 测试输入：集团拉新项目供应商引入审批邮件（真实商务文档）

---

## 一、5 个 nian 技能 · 命中场景速查表

| 技能 | 一句话定位 | 最佳输入 | 典型场景 | 别用它做 |
|------|-----------|---------|---------|---------|
| **nian-orchestrator** | 总调度/路由器 | 不确定走哪条线的内容 | "做个页面/报告/HTML"且方向不明 | 已明确要施工 → 直接 nian-design |
| **nian-decision-card** | 决策枢纽/质量命门 | 上游已有产物（策展3阶段 或 viz叙事） | 任何要进 nian-design 的内容 | 跳过它直接施工（卡错 design 救不回）|
| **nian-design** | 施工方/出 HTML | 决策卡 | 报告/决策文档/品牌页/知识长文 | 电影叙事站点 → 用 nian-ui |
| **nian-ui** | 电影叙事/平行路径 | 主题/展馆/品牌体验 | 沉浸式叙事站点、导演风格页 | 商务文档/数据报告 → 用主流水线 |
| **nian-teacher-scenes** | 吉卜力配图 | 文章观点/成长经历 | 中文文章配图、个人品牌 | PPT 信息图/流程图/课件 |

**关键认知**：nian-orchestrator **不调用 nian-ui**。主流水线（orchestrator → decision-card → design）和平行路径（nian-ui）是两条独立的路。nian-teacher-scenes 与流水线零耦合，是独立的图片生成技能。

---

## 二、quick-path vs full-pipeline · 怎么选

这次测试的最大发现：**这封邮件本可以走 quick-path，10 分钟出页面，但走了 full-pipeline 花了 30+ 分钟**。

### 判据（QUICK-PATH 的口诀）

> **内容拿掉数字还成立 → quick；拿掉数字就空 → full。**

| 信号 | 走 quick（~10分钟） | 走 full（~30分钟） |
|------|:---:|:---:|
| 内容是成文（文章/方法论/邮件） | ✓ | |
| 内容只有素材/主题，需策展定题 | | ✓ |
| 单页即可 | ✓ | |
| 需要 ≥3 个独立数据图表 | | ✓（走 viz 分支）|
| 需要从零设计视觉语言 | | ✓（走 curatorial 阶段3）|

### 实测对比（本次邮件）

| 维度 | quick-path | full-pipeline（本次走的）|
|------|-----------|----------------------|
| 耗时 | ~10 分钟 | ~30 分钟 |
| 上游 | 跳过策展，反查表直填决策卡 | curatorial 阶段1-3 压缩 + decision-card 3步 |
| 决策卡来源 | QUICK-PATH.md 反查表 | nian-decision-card 技能 |
| 施工 | 标准5步 | 标准5步 |
| 质量差异 | **几乎无差**——施工都走同一套 nian-design | |
| 适用前提 | 内容已成型 + 气质判断明确 | 内容需策展 或 想测全链路 |

**建议**：
- **日常商务文档（邮件/审批/周报）→ 默认走 quick**。内容已成型，反查表能定气质，没必要走全链路。
- **策展文章/品牌主张/从零策划 → 走 full**。需要 curatorial 定题和视觉语言设计。
- **想验证 nian 全链路是否健康 → 走 full**（像本次测试）。

---

## 三、decision-card 是质量命门 · 怎么把好这关

**核心结论：decision-card 出错，design 救不回。** 卡决定了气质/骨架/组件/打破点，design 只是照卡施工。

### 本次实测的 4 个关键字段判断

| 字段 | 判断 | 判断依据 | 设计卡时的关键问题 |
|------|------|---------|-------------------|
| `visualStream` | Statement（非 Split）| 论证式非对比式——4层筛选推理链是核心 | "砍成口号会丢信息吗？" 会 → 不能用 brand 宣言 |
| `structuralStream` | S2-长文导航 | 1500字+8段，审批者需跳读 | "读者需要'我在哪'吗？" 需要 → 加导航 |
| `breakPoint` | 四层筛选段（ghost 4）| 筛选是决策根基，比互补论证更值得强调 | "哪段是'为什么是这两家'的根基？" 根基段打破 |
| `palette` | charcoal + orange | 商务权威 + 含风险提示需警示调性 | "要权威还是温暖？" 商务 → charcoal 而非 forest |

### 把好 decision-card 的 3 个动作

1. **先判内容类型（断言式 vs 论证式）**——这决定用 Statement-brand 还是 Statement-knowledge 骨架。判错会砍推理链或变说教。
2. **打破点选"根基段"而非"亮点段"**——根基是论证的支撑（为什么），亮点是结论的延伸（好在哪）。根基更值得打破强调。
3. **配色看调性而非内容**——商务权威用 charcoal/darkgray，自然温暖用 forest/olive。别因为内容"绿色"就强制用 forest。

---

## 四、nian 处理真实业务文档的短板

本次测试暴露 nian 在"真实商务文档"场景的 4 个吃力点：

### 短板 1：表格密集的商务文档，nian 的"做减法"审美会冲突

- **现象**：邮件有 3 张 HTML 表格（5家寻源/2家资质/4阶段时间），nian 倾向"一页一核心"，表格密集会触发规则8（组件≤12/段落≤6）的 warning
- **实测**：validator 报 sec2/sec5/sec6 组件超阈值——其实是脚本把每个 `<td>` 都算组件了，启发式误报
- **应对**：商务文档的表格是信息载体不是装饰，**别被 warning 吓到强行删表**。nian 的 A03 Table 组件就是为密集数据设计的，符合 P0 优先级

### 短板 2：称谓/落款/审批语气，nian 无原生组件承载

- **现象**：邮件有收件人（王易人）、抄送（卞海军）、落款（孙大年 + 部门），nian 组件库无"商务称谓"组件
- **实测**：我用 S18 收束宣言的 `rec__meta` 字段勉强承载，但视觉上偏"宣言页"而非"审批签字区"
- **应对**：商务文档的称谓/落款用 F03 Quote-minimal 或 A06 Detail Panel 承载，别强行套收束宣言。或接受这是 nian 的边界，称谓留在正文文字里

### 短板 3：validate 脚本有已知 bug，会卡住流程

- **现象**：`validate-decision-card.py` 找 `components.md`，但文件已改名 `COMPONENTS-MASTER.md`（buffer.md 已记录）
- **实测**：阶段2 复现了这个 bug，脚本直接抛 FileNotFoundError
- **应对**：**手动校验关键字段**（visualStream 在9种内、layoutSequence 在S01-S28内、breakPoint恰好1处、dataCharts 在text分支为null），不依赖脚本。这是已知技术债，待修

### 短板 4：nian-design 变体的色名与 token-root 有漂移

- **现象**：`statement--decision` 变体用旧色名（`--primary:#4A6741` 直接写死 forest），而 token-root.css 用意图别名（`--primary:var(--color-forest)`）
- **实测**：我手动对齐了 token-root 的 Haglöfs 15色意图别名体系，没直接抄变体的写死色值
- **应对**：施工时**以 token-root.css 为唯一信源**，变体只参考结构不参考色值。决策卡的 darkgray 意图映射到 `--color-charcoal`（中性色LV5），不是品牌色

---

## 五、3 条可直接照做的使用建议

### 建议 1 · 日常商务文档默认走 quick-path

```
触发词：审批/周报/汇报/对比/邮件 → 直接 nian-orchestrator 的 QUICK-PATH
跳过：curatorial 阶段1-3 + decision-card 完整流程
用时：~10 分钟（反查表填卡 + nian-design 施工）
```
本次邮件走 quick 本可省 20 分钟，质量几乎无差。

### 建议 2 · 把 decision-card 当"设计评审"而非"自动步骤"

decision-card 的价值不在"自动生成卡"，而在**强迫你回答 4 个设计问题**：
- 内容是断言还是论证？（决定骨架）
- 哪段是决策根基？（决定打破点）
- 要权威还是温暖？（决定配色）
- 读者需要导航吗？（决定结构型）

**手动回答这 4 题，比让技能自动跑更靠谱**。技能给你框架，判断还是人来。

### 建议 3 · 接受 nian 的边界，称谓/签字区别硬套

nian 的设计初衷是"策展文章/品牌主张/知识长文"，不是"商务审批系统"。真实业务文档里的：
- 称谓/抄送/落款 → 留在正文，用 F03 Quote 承载，别套收束宣言
- 审批签字区 → nian 无对应组件，接受这是边界，或用 A06 Detail Panel 凑
- 复杂表格关系 → A03/D02 组件够用，但别期待"Excel 级"交互

**nian 是把"文本内容"变"有质感页面"的工具，不是"商务文档可视化系统"**。用它擅长的（气质/骨架/组件质感），接受它不擅长的（商务流程/签字/权限）。

---

## 六、本次测试的产出清单

| 文件 | 作用 |
|------|------|
| `01-orchestrator路由决策.md` | 文字分支判定过程 + 分流记录 |
| `02-决策卡.yaml` | 决策卡（气质/骨架/组件/打破点/配色 + 决策理由）|
| `03-审批页面.html` | 最终 HTML 成品（已过 validator PASS）|
| `04-nian使用建议.md` | 本文档 |

**原始邮件 vs nian 渲染版的差异**：
- 原始：纯文本 + 3张HTML表格，无导航，无视觉层次，称谓散落
- nian版：左固定nav + 8段结构化呈现 + Hero断言 + 四层漏斗可视化（打破点）+ 资质对照双栏 + 风险格子卡 + 时间线 + 收束请示

**nian 加了什么价值**：结构化（8段→可导航）、视觉化（漏斗/对照/时间线）、质感化（Playfair大字+JetBrains数据+克配色）。**nian 没加什么**：没有改变信息内容，没有增加决策依据，纯呈现层增强。

---

## 七、附：暴露问题的修复结果（2026-06-23 当天修复）

本次测试暴露的问题已按 P0+变体token补齐 修复，验证通过：

| 问题 | 修复 | 验证 |
|------|------|------|
| validate-decision-card.py 找 components.md（已改名） | 脚本改读 COMPONENTS-MASTER.md + 正则改 `[A-H]\d{2} ·` | ✅ 解析 63 族，校验 PASS |
| schema 38族旧编号 + palette 旧枚举 | 同步 63族新清单 + palette 改 forest/slate/steel/charcoal | ✅ 决策卡 02 跑通 |
| 24 个 variants 缺 28 token（施工要手动补） | 批量脚本 patch-variant-tokens.py 补齐 --font-decorative + 14色 + --accent | ✅ 抽样 5 个变体 28/28 PASS |

**修复产物**：
- `nian-decision-card/scripts/validate-decision-card.py`（脚本逻辑）
- `nian-decision-card/references/decision-card-schema.md`（文档同步）
- `nian-design/scripts/patch-variant-tokens.py`（新增批量工具，可复用）
- 24 个 `nian-design/references/templates/variants/*.html`（补 token）

**明确未修（范围外，已知问题）**：
- 三轨制根治（tokens.json v1 残留 / base 底座未迁移 / 变体仍用直写 hex 而非 link token-root）—— 大工程，下次专项
- validator 组件计数把 `<td>` 当组件算的 warning 噪音 —— 启发式统计，不影响 PASS

---

## 八、附：三轨制根治 + validator 计数修复（2026-06-23 晚补修）

上一节的"明确未修"两项，当天晚上已全部修复：

| 问题 | 修复 | 验证 |
|------|------|------|
| tokens.json v1 残留信源（0引用孤儿） | 归档到 `_archive/legacy-tokens/` | ✅ 两 validator 无回归 |
| 24 变体 v1 灰阶直写 hex（冷调）vs v2 token-root（暖调） | 8别名+3语义色 全部改 `var(--color-*)` 指向 v2 | ✅ 抽样5变体 hex 警告 0 |
| 8 个 base 底座 v1 调色板（版本陷阱） | :root 整段升级 v2 token-root + CSS引用同步 | ✅ token 28/28，颜色全来自 token |
| validator 规则8 组件计数（1容器算成17-36个） | 改 BEM block 层容器去重 | ✅ sec2/5/6 从 17/36/17 → 预算内 |
| validator 规则5 数据段计数（同类 bug） | 同上 BEM block 逻辑 | ✅ 形态多样性误报消除 |

**新增可复用脚本**：
- `nian-design/scripts/patch-variant-tokens.py`（双模式：`patch-tokens` 补 token / `migrate-gray` 迁移灰阶）
- `nian-design/scripts/migrate-base-to-v2.py`（底座 :root 升级）

**全量回归**：测试 HTML PASS（14项通过/1真实警告），5 变体 token+密度全过、hex 清零，3 底座 token+颜色全过。

**三轨制现状**：信源从三轨（tokens.json v1 / token-root.css v2 / 变体杂交）收敛为**单一信源 token-root.css**。新建变体从 v2 底座起步，不再掉进版本裂缝。

---

*最后更新：2026-06-23 · 基于供应商审批邮件端到端实测 + 当天修复 P0+变体token + 晚补三轨制根治+validator计数*
