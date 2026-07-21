---
input: 需求
output: 06-NOW.md
pos: .claude/rules/06-NOW.md
---

# 06-NOW.md — 当前状态

> 会话启动时读取，了解当前进度和下一步

---

## 活跃项目

- **voice-workstation 稳定性修复（07-21）**：Electron语音工作站，7个问题已定位(P0:ASR状态/sox竞态/云端丢弃)，Phase0观测点已加，待基线测试后修P0
- **guizang 深图多轮计划（07-13）**：AGNES 3D建模感风格适配，按归藏 9-10 个模式分批调优，遵守速率限制
- **nian-design 技能系统（06-01）**：4级组件体系+token三轨制+showcase质量标准，持续迭代
- **电销AI转型方案（06-05）**：四阶段推进（能看见→能判断→能行动→自动化），数字人三层架构
- **供应商联盟机制（06-08）**：线上月度+线下季度，已办金条两期，朱晓明7月接手
- **kaas-kb 知识库技能（06-16）**：封装 KaaS 知识库 MCP 工具

---

## Session Log 规则

长时间任务结束前或 context window 即将压缩时，必须写 Session Log 到 `workspace/YYYY-MM-DD-对话摘要/对话总结-YYYY-MM-DD.md`（按 AGENTS.md 对话摘要规范，memory/sessions/ 已在 5区模型重构中删除）。

格式：
```markdown
# YYYY-MM-DD <主题>
## goal
这轮要做什么
## decisions
做了哪些决策，为什么
## alternatives
否决了哪些选项
## artifacts
改了哪些文件、跑了什么命令
## blockers
什么坏了
## next actions
- [x] 已完成
- [ ] 确定的下一步
- [ ] 推断的（标注）
## open questions
未解决的问题
```

**不写 transcript dump**。只记脉络：发生了什么、为什么、还剩什么。

---

## 最近事件

详见 `memory/events/` | 任务地图和定期提醒见 `memory/context/`

**07-21 重要事件**：
- voice-workstation 代码审查完成（7问题定位），Phase0观测点已加，待基线测试
- 思维透镜分析：测试视角的系统性检验方法论（先观测再修再验）

**07-13 重要事件**：
- guizang 技能更新 + AGNES 深图多轮生成计划制定
- Codex 用例库 HTML 生成（nothing-design 浅色风格）

**07-10 重要事件**：
- AI 编码工具长任务能力 PPT（CyberPPT 流程，11页）
- OfficeCLI 工具调研

**07-09 重要事件**：
- guizang-material-illustration 技能安装+能力边界分析
- 电视机海报项目（J-Space 8张概念插图+HTML）
- CloudBase MCP 配置完成

---

*最后更新：2026-07-13 — 每周记忆维护，更新活跃项目+最近事件*
