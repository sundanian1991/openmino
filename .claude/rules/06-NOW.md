---
input: 需求
output: 06-NOW.md
pos: .claude/rules/06-NOW.md
---

# 06-NOW.md — 当前状态

> 会话启动时读取，了解当前进度和下一步

---

## 会话启动

1. 读本文件 + MEMORY-L1.md + `memory/state.json`
2. 读 `memory/events/` 最近 3 天事件（快速恢复上下文）
3. **上下文恢复**（如有截断信号）：读 `workspace/*/对话总结-*.md` → "年老师，醒了。上次我们在[任务描述]。"
4. 检查当前待办：`memory/context/todo.md`

**截断信号**：`<context_truncated>`、"truncated"、"继续"、"我们刚才到哪了"

---

## 任务地图

> 每次新对话启动读取，用于优先级对齐。年老师决策时我会追问匹配度。
> 更新规则：新增内容追加到表底，过期项打删除线，每季度清理空项。

### 核心项目（最高优先级）
- 灵魂文件迭代 — 2026-05-06 完成

### 快速增长业务
- [空]

### 核心目标
- [空]

### 当前推进中
- [空]

### 该放弃的
- [空]

---

## 活跃项目

**每日书信（04-12）**：数据源 `~/.myagents/sessions/*.jsonl`，归档 `memory/daily-letter/`

**memory 重构（04-22）**：待办独立到 `memory/context/todo.md`，夜间 Cron 自动维护

**事件化压缩（05-04）**：buffer → `memory/events/` + `memory/state.json`，对标 OpenClaw 做梦机制。触发：每次新对话启动时检查 buffer 是否有未处理内容

**MemOS 迁移（04-24）**：~90 条记忆已上传，供应商管理规范待集中上传

---

## 最近讨论

### 2026-05-02 viz-design 多图+多技能委派质量优化
- 三层收口消除 SPEC → JSON → 渲染链路中的信息衰减
- 第一层：spec.md 模板追加渲染契约 JSON（globalStyle + charts 数组），下游技能直接消费
- 第二层：storyboard.md 强化 Phase 0 全局风格锁定，多图共享色系/字体/风格学派
- 第三层：SKILL.md 追加委派收口铁律 4 条 + 反模式列表，禁止 viz-design 自行写渲染代码
- 委派路径唯一：viz-design → JSON → viz-echarts / viz-svg-flow，不存在第二条路径

### 2026-05-09 自我认知建设 + 基础设施清算 + Cron 大瘦身
- OPINIONS.md 个人信念地图完成：1717 会话 → 35 条精选信念，周度 Cron 自动增量更新
- Cron 大瘦身：晨间思考砍掉（产出为零），所有 Cron 统一模型
- 任务验收标准强制化：59 个任务逐条补写，不再接受"大概内容"
- 判断力与审美训练技能升级：融合元认知+张力设计原则
- PPT 技能合并（presentation→html-ppt）+ 主动推送四层架构落地
- ppt-pptx-deck-builder 质量反馈：克制设计 > 装饰过度，颜色系统压缩到 3 角色

### 2026-05-08 ppt-master 首用 + Cron 空跑根因定位
- Aham PPT 介绍项目完成（公众号→11 页咨询级 PPT，Anthropic 暖色调）
- ppt-master 端到端跑通：source→strategist→executor→quality→PPTX export
- **Cron 空跑根因锁定**：默认模型太弱（5-10s + null content），加 --model opus 后正常
- 推送机制从"心跳扫描"转向"实时写入 + 心跳兜底"

### 2026-05-07 13-VISUALIZATION.md 精简 + Cron 空跑排查
- 13-VISUALIZATION 删除理论层，只保留核心规则让所有技能通用
- Cron 空跑问题排查（每日回顾/晨间思考/晚间复盘长期无输出）

### 2026-05-06 灵魂文件重构 + 技能命名规范化
- 01-SOUL.md 灵魂文件重构完成：基于年老师新材料重建，引入反对规则+责任督促+自我进化
- 领军人物 PPT 制作完成
- 技能命名规范化：91 个技能文件夹统一命名格式

### 2026-05-03 viz-design 百组数据端到端测试 + SKILL.md 优化
- **100 数据集四阶段测试**：98% 通过率（98 全通过，2 组 JSON 字段偏差），0 失败
- 测试报告：`workspace/00-测试-viz-design-100数据集-20260503/测试报告/`
- **SKILL.md 优化（Task 3）**：Phase 3 新增 JSON Schema 自检门禁、铁律 5（字段零偏差）、反模式追加测试偏差、spec.md 模板追加硬约束对照表

### 2026-04-30 丁梓萌观察建档 + 知识库大清理
- 丁梓萌（综合运营部结算岗）首次观察：与刘乾坤预提数据对话，展现"不接球+最短路径+先例锚定"
- 刘乾坤新案例40：免责型防御（模式2+7变种），被丁梓萌完全化解
- 丁梓萌建档：`memory/projects/关键人画像/同事/综合运营部/丁梓萌/`
- **知识库大清理**：workspace 65→11 文件夹；docs 去重170+文件、命名规范化、版本收敛
- **workspace 命名规范**写入 CLAUDE.md（序号-分类-主题-YYYYMMDD）
- **workspace→docs 流转规则**写入 CLAUDE.md（触发条件+分类标准+执行流程）
- Claude Code 源码移至 `/claude-code-source/`
- docs/ 目录重命名：knowledge→知识库、SOP→SOP模板、plan-templates→计划模板

### 2026-05-03 Proactive Agent 架构落地
- **主动思考搭档**：从"定时检查文件"升级为"主动消化工作、推送思考和建议"
- 晨间思考（9:00）+ 晚间复盘（21:00）Cron 任务创建，微信推送
- HEARTBEAT.md 升级为主动思考指令
- **Proactive Agent 三支柱落地**：
  - Proactive：Reverse Prompting（01-SOUL.md）+ 深度版 Cron
  - Persistent：Working Buffer（buffer.md）+ Compaction Recovery（结构化检查清单）
  - Self-improving：待后续迭代
- **思考日志** `memory/thinking/journal.md`：追踪线索、假设、关键句
- **workspace 整理**：25→21 文件夹，3 个不规范文件夹处理，散落文件归位
- 年老师原话："你这个回顾有足够的深度吗？还是每次都是固化的？"

### 2026-04-29 思考策略框架 + thinking-strategy skill + 认识论硬约束
- 梳理26字母思考策略框架，拆解每个字母的实际应用场景
- 设计策略组合逻辑：预设模板（80%）+ 动态组合（20%）
- 创建 thinking-strategy skill，支持决策/分析/计划/表达/澄清/复盘/创新 7类问题
- 首次测试：表达类问题（汇报供应商情况）引导流程跑通
- 消化 Agent 行为宪章，整合入规则体系：00-IDENTITY 升级（克制+预判+认识论纪律），新建 EPISTEMIC.md（反幻觉协议+审计+失效判定）

### 2026-04-24 AI 定价案例 + 设计技能对比 + Skills 清理
- kw-workflow 跑通 AI 定价从 coding plan 到 token plan 研究，文字版完成
- PPT 呈现三次不满意（pptx-dark-cream/huashu-design/magazine）— 视觉标准未对齐
- 设计技能大比武：同素材同场景对比，标准化评估流程
- 24 个全局技能清理，卸载 6 个冗余

### 2026-04-23 上下文管理规则落地
- AGENT-FIRST：上下文隔离三原则（探索归子代理、决策归主代理、宁派不读）
- 00-IDENTITY：对话总结保留异常/线索，回退策略（≥2 步错误触发回退）

### 2026-04-21 可视化 5 合 1 Demo + workspace 规范
- chart-visualization 25/26 跑通，5 合 1 总览页交付
- workspace 命名统一为 `序号-分类-主题-YYYYMMDD`，已写入 CLAUDE.md 强制规范

---

## 近期事件

> 技能同步检查每日自动执行，结果见 cron 历史。06-NOW 只保留实质性对话/决策/变化。

- 05-18：技能同步检查（2 个 git 技能：takeaway-skill 本地有修改跳过，compound-knowledge-plugin 无更新）
- 05-09：OPINIONS.md 个人信念地图 + Cron 大瘦身 + 任务验收标准强制化
- 05-08：ppt-master 首用（Aham PPT）+ Cron 空跑根因定位
- 05-07：13-VISUALIZATION.md 精简 + PPT 多技能对比测试
- 05-06：01-SOUL.md 灵魂文件重构 + 领军人物 PPT + 技能命名规范化
- 05-05：viz-design 渲染路由确定 + chart DNA 清洗 + 四层推送架构
- 05-04：记忆系统升级 — 事件化压缩（buffer → 结构化 events.json）+ state.json L1 状态快照
- 05-03：Proactive Agent 架构落地（三支柱 + 主动思考 Cron + workspace 整理）
- 05-02：viz-design 多图+多技能委派质量优化（三层收口）
- 04-30：丁梓萌观察建档 + 知识库大清理（workspace 65→11）
- 04-29：思考策略框架 + thinking-strategy skill + 认识论硬约束

更早事件见 `memory/insights.md`

---

## 新对话启动检查

> 年老师习惯直接开新对话，没有明确的"结束"动作。所以触发时机改为"启动时"。

- [ ] buffer 有未处理内容？→ 结构化写入 `memory/events/YYYY-MM/YYYY-MM-DD.json`，更新 `memory/state.json`，然后清空 buffer
- [ ] 学到什么？→ `memory/insights.md`
- [ ] 重要事件？→ 更新本文件
- [ ] git commit && push

---

## 定期提醒

- **周一 8:00**：技能上游同步检查（9 个 git 技能）
- **周一**：5311 周度评估
- **周末**：32 个问题深度对话
- **每月 20 日**：职业资产清算

---

*最后更新：2026-05-09 — 追记 05-06~05-09 讨论（灵魂文件重构/Cron 空跑/OPINIONS/Cron 大瘦身），近期事件补全*
