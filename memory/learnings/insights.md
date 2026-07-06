# insights.md — 已归档洞察

> 来源：memory/thinking/buffer.md（06-01 ~ 07-03，132条）
> 归档日期：2026-07-06
> 由「每日对话结构化」cron 的 buffer 清理流程产出

---

## nian-design 技能系统

### 组件体系
- 4级结构：Hero(Full-width Statement/Split View/Numeral Grid/Dark Statement) → Section(Tension Grid/Pipeline-Timeline Track/Bento Grid等8种) → Detail(13种) → Decorative(3种)
- 组件按视觉形式组织，不按功能类型
- 质量标杆锚定：haglofs-component-showcase.html（"让我欲罢不能的，眼前一亮"）
- 展示型showcase排列节奏：不连续两个section用同一种形式
- 每个组件标注：匹配锚点、信息密度、典型场景、实现要点；末尾附选择指引表

### Token体系
- 三轨制(v1 tokens.json / v2 token-root.css / 变体杂交)根治完成
- v1 tokens.json 已归档到 _archive/legacy-tokens/（0引用孤儿）
- 24个变体中性灰阶+语义色 v1 hex → var(--color-*) 指向v2（消除全部hex硬编码警告）
- 8个 base 底座 :root 整段升级到v2 token-root体系
- 校验脚本修复：从宽泛关键词匹配改为BEM block层容器去重

### 设计哲学
- 只用浅色模式(#FAFAF8)，不要深色
- "可视化+克制表达，信息密度大，视觉效果好"
- "不需要分割线，间距本身就是结构"
- "阅读友好型"设计风格
- 设计参考源：SDL(Stockholm Design Lab)，案例覆盖Haglofs/Sigma/Polestar/Nobel Prize等13个品牌
- 视觉语言：工业极简(黑白灰+红色强调)、点阵标题(5x7网格)、SVG仪表盘(stroke-dasharray弧线)、分段块条、Sparkline、非对称布局
- "数据可视化即品牌识别" + "Progressive Disclosure"分层渐进披露数据

### 定题流程
- 定题产出改为四个必须回答的问题，用户确认"方向对"后才动手
- 场景选择和Hero样式是视觉基调的两个最大决定因素，必须在定题阶段暴露
- 锚点+视觉节奏规划必须在定题阶段完成，不能留到后续

---

## 供应商管理

### 岗位定位
- 一个核心（供应商管理数字化全做）+ 两个参与（职场监控指标口径定义、坐席评估ABCD分级标准制定）
- 类似HRBP角色：联系供应商+对接业务，选用育留汰全链条
- 核心叙事：供应商联盟是"合适故事或愿景"，但还需补充其他可讲的"故事"

### 电销AI转型方案
- 实现顺序四阶段：能看见（数据采集/SPC）→ 能判断（复盘SOP/考核规则）→ 能行动（整改闭环/双档案）→ 自动化（Agent），6月只做前三阶段
- 数字人三层架构：感知层（三源输入+人工校验）→ 判断层（硬/软规则+生长机制）→ 行动层（被动咨询+主动推送）
- Agent需支持被动调用（你问它答）和主动发现（它发现问题推给你）两种模式
- 规则分硬规则（红线不可调）和软规则（可新增/可调整/带置信度）

### 供应商联盟
- 6家重点：毅航/毛毛虫/伽玛/赛维斯/岐力/翰锐
- 联盟覆盖2条产线、13家供应商
- 沉淀组织流程+汇讯/毅航培训核心内容
- 30/90双节点跟踪效果闭环
- 新增候选供应商12家，名产提高15%

### 数据平台
- dataAgent（da-api-99.jd.com）与 DP平台（dp.jd.com）是两个独立平台，权限和API体系不互通
- JD DP平台API认证持续失败，sundanian账号无jdt/idm/dmc集市权限
- 数据库表名1：dmc_jdt_dmcdim_zd_wrkplc_cost_jk_s_sum_d（职场成本）
- 数据库表名2：idm.idm_f05_fin_telp_call_info_i_d（电话呼叫信息明细）
- 数据来源三合一：数据表填写+群聊抓取+人工反馈，非单一自动化管道

---

## 工具与技术

### Tool Call Repair Layer
- 采纳Ahmad Awais方案，认定"开源模型工具调用失败90%是Harness层Schema太严格"
- 4类高频错误：可选字段传null / 数组序列化为JSON字符串 / {}占位 / 裸字符串替代数组
- 代码落地：`lib/tool-input-repair.ts`（30-100行级修复层）
- 使用三层：①写Skill时在SKILL.md注入5条格式约束 ②派发子代理时注入System Prompt ③自己写工具代码时import repairToolInput/withRepair

### Claude Code版本
- 从2.1.156升级到2.1.160，统一npm全局安装
- 删除了~/.local/bin/claude旧版

### 动态工作流
- Claude Code 2.1.160已支持Dynamic Workflow，6种模式9类场景
- 当前子代理机制已覆盖主要场景，workflow增量价值在流水线并行和结构化输出

---

## 技能开发

### 金融电销话术
- 四段话术结构：开场-产介-异议处理-结尾促单
- 合规红线：不承诺收益率、不泄露信息
- 质量要求"自然感、活人感、真人对话效果"
- 输出格式：Word；高频需求；可用likecode agent框架

### nian-decision-card
- 校验脚本修复：编号从"01-38"迁移到"A01-H11"(63族)
- palette枚举更新：darkgray/olive→forest/slate/steel/charcoal，yellow/orange→signal-orange/signal-yellow
- 24个variants补齐28 token

### ian-xiaohei-scenes
- 2.0实物小现场，非1.0手绘线稿
- 技能名偏好"ian-xiaohei-scenes"非"illustrations"

---

## 系统维护

### 文件夹体系重构（07-03完成）
- Root 20项 / Workspace 20项
- 5大改动：MCP统一→settings.local.json、hooks symlink、workspace合并归档、根目录清废、skills清断链
- 56个旧项目归档到archive/projects/

### git清理
- mino-design-system存在嵌套git仓库，移除.git后作为普通目录提交
- Claude Code版本统一后清理旧CLI

### 记忆迁移（06-08）
- 从joyclaw迁移17家供应商画像到memory/projects/关键人画像/供应商/
- 迁移年老师深度观察(user-deep-observations.md)，含15+条心理洞察

---

## 觅游社区

- 06-10 第1次心跳执行完成
- 互动：评论+点赞playwright-mcp测评帖/Agent调试SOP帖/数据可视化指南帖

---

*归档完成：2026-07-06 22:30，由 buffer 清理流程产出*
