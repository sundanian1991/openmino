#!/bin/bash
# ============================================
# course-startup: 人机协同课程开发启动流程 v2
# 
# 设计理念：多技能并行组合，而非串行流水线
# 每个里程碑同时激活 3 条工作流：
#   Stream A: 内容研究  ← 提取素材、挖掘洞察
#   Stream B: 设计构建  ← UI 构建 + 交互组件
#   Stream C: 验证对齐  ← 门禁检查 + 质量审查
#   主线程: 编排协调  ← 状态管理 + 合并产出
# ============================================

echo "=== 人机协同实战课 · 开发启动 ==="
echo ""
echo "技能激活映射："
echo ""

cat << 'SKILLMAP'

╔══════════════════════════════════════════════════════════════╗
║                   技能并行组合模型                           ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  阶段 1: 定义期 (串行，因为需要基线)                         ║
║  ┌──────────────────────────────────────────────────────┐    ║
║  │ orchestrate-projects → interview-me → spec-driven   │    ║
║  │ → planning-and-task-breakdown → ROADMAP + DOD       │    ║
║  └──────────────────────────────────────────────────────┘    ║
║                                                              ║
║  阶段 2: 构建期 (每个里程碑并行 3 条流)                      ║
║                                                              ║
║  ┌─ Stream A: 内容研究 ──────────────────────────────┐      ║
║  │  research-collector  ← 从指南提取该章节素材        │      ║
║  │  insight-miner       ← 挖掘关键洞察和数据          │      ║
║  │  takeaway-skill      ← 研究京东对应交互模式        │      ║
║  │  source-driven-dev   ← 对照源文档验证准确性        │      ║
║  └────────────────────────────────────────────────────┘      ║
║           ↓ 产出: 内容包 (素材 + 洞察 + 模式参考)           ║
║                                                              ║
║  ┌─ Stream B: 设计构建 ────────────────────────────┐        ║
║  │  frontend-ui-engineering  ← HTML/CSS/JS 构建    │        ║
║  │  html-interactive         ← 交互组件实现        │        ║
║  │  hallmarkskill            ← 反 AI 感设计审查    │        ║
║  └──────────────────────────────────────────────────┘        ║
║           ↓ 产出: 页面 + 交互组件                           ║
║                                                              ║
║  ┌─ Stream C: 验证对齐 ───────────────────────────┐         ║
║  │  verification-before-completion ← DOD 门禁     │         ║
║  │  code-review-and-quality        ← 代码审查     │         ║
║  │  check                         ← 通用检查      │         ║
║  └─────────────────────────────────────────────────┘         ║
║           ↓ 产出: 验证报告 + 修复项                         ║
║                                                              ║
║  ┌─ 主线程: 编排协调 ───────────────────────────┐          ║
║  │  orchestrate-projects     ← 更新 STATE/dashboard │        ║
║  │  dispatching-parallel-agents ← 管理 3 条流      │        ║
║  │  合并 A+B 产出 → 交给 C 验证 → 更新里程碑      │        ║
║  └──────────────────────────────────────────────────┘        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

SKILLMAP

echo ""
echo "每里程碑并行 3 条流的协作方式："
echo ""

cat << 'PARALLEL'
┌─────────────────────────────────────────────────────────────┐
│  示例：M2b Step 02 · 3A 分诊实战页                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Stream A (内容):                                            │
│  ├── research-collector  → guide 中提取 3A 分诊所有内容      │
│  ├── takeaway-skill      → 研究京东 Token 成本计算器交互    │
│  └── insight-miner       → 提取"确定性/可逆性/跨度"逻辑     │
│       ↓                                                    │
│  Stream B (UI):                                             │
│  ├── frontend-ui-engineering → 页面骨架 + 3 滑块组件        │
│  └── html-interactive        → 实时推荐 JS 逻辑             │
│       ↓                                                    │
│  合并 A+B: 内容填入 UI → 成品页面                           │
│       ↓                                                    │
│  Stream C (验证):                                           │
│  ├── verification-before-completion → DOD 逐条               │
│  ├── code-review-and-quality → HTML/CSS/JS 审查              │
│  └── check → 最终检查                                       │
│       ↓                                                    │
│  PASS → orchestrate-projects 更新状态 → 下一里程碑          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
PARALLEL

echo ""
echo "=== 启动方式 ==="
echo "在项目根目录执行:"
echo "  bash .codex/commands/course-startup.sh"
echo ""
echo "或者由 AI 根据当前里程碑自动激活对应技能组合"
echo ""

# 输出技能速查表
cat << 'SKILLTABLE'

技能速查表（本课程相关）
─────────────────────────────────────────────────────────────
 编排层
   orchestrate-projects        → 项目状态机/里程碑/仪表盘
   dispatching-parallel-agents → 并行分派子任务

 内容研究 (Stream A)
   research-collector          → 从指南提取课程素材
   insight-miner               → 挖掘关键洞察和数据
   takeaway-skill              → 研究参考案例交互模式
   source-driven-development   → 对照源文档验证准确性
   context-engineering         → 加载正确上下文
   vibe-idea (adapted)         → 把每节内容当产品思考

 设计构建 (Stream B)
   frontend-ui-engineering     → 页面构建 + 交互组件
   html-interactive            → 交互式 HTML 实现
   hallmark                    → 反 AI 感/设计质量审查
   frontend-design             → 视觉设计

 验证对齐 (Stream C)
   verification-before-completion → DOD 门禁验证
   code-review-and-quality        → 代码审查
   check                          → 通用检查
─────────────────────────────────────────────────────────────
SKILLTABLE
