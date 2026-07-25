#!/usr/bin/env python3
"""Generate page_content.json for the AI协作方法论 PPT (18 pages)."""
import json
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SRC = (Path(__file__).parent / "source.md").read_text(encoding="utf-8")

pages = [
    # ===== P1 封面 =====
    {
        "page_key": "page_01",
        "source_page_id": "Hero",
        "source_title": "封面",
        "action_title": "AI 长周期任务协作方法论",
        "core_message": "当 AI 能连续运行 25 小时，真正的问题不是「它能跑多久」，而是「怎么让它不跑偏」。两篇 OpenAI 内部实践，合成一套完整方法论。",
        "body_blocks": [
            {"type": "paragraph", "text": "AI 长周期任务协作方法论：从实验验证到实操框架。"},
            {"type": "paragraph", "text": "核心命题：真正的问题不是「能跑多久」，而是「怎么让它不跑偏」。"}
        ],
        "tables": [],
        "speaker_notes": "开场页。传达核心命题——能力已验证，关键在协作流程。",
        "source_excerpt": "当 AI 能连续运行 25 小时，真正的问题不是「它能跑多久」，而是「怎么让它不跑偏」。"
    },

    # ===== P2 Ch1 实验数据 =====
    {
        "page_key": "page_02",
        "source_page_id": "S1-data",
        "source_title": "实验验证：25h 实验",
        "action_title": "25 小时连续运行，从空仓库构建真实可测试的设计工具",
        "core_message": "Derrick Choi 让 GPT-5.3-Codex 在空仓库上以 Extra High 推理级别从零构建设计工具。25h / 13M tokens / 30k 行代码 / 10 个核心功能。",
        "body_blocks": [
            {"type": "kpi_set", "items": ["25h 连续运行", "13M 消耗 tokens", "30k 生成代码行数", "10 核心功能模块"]},
            {"type": "paragraph", "text": "这不是「模型变聪明了」的简单升级。真正的变化是：Agent 能保持更长时间的连贯性，端到端完成更大的工作块，并且在出错时能恢复而不丢失主线。"}
        ],
        "tables": [],
        "speaker_notes": "核心数据冲击 + 核心发现定位。",
        "source_excerpt": "Derrick Choi 给了 GPT-5.3-Codex 一个空仓库、完全权限、一个任务：从零构建一个设计工具。25h / 13M / 30k / 10。"
    },

    # ===== P3 Ch1 10大功能 =====
    {
        "page_key": "page_03",
        "source_page_id": "S1-features",
        "source_title": "10 个核心功能",
        "action_title": "结果不完美，但是真实可测试的 —— 10 个核心功能",
        "core_message": "构建出一个真实可测试的设计工具，覆盖画布、协作、检查器、图层、辅助线、历史、回放、原型、评论、导出 10 大功能模块。",
        "body_blocks": [
            {"type": "bullet_list", "items": [
                "画布编辑：框架、分组、形状、文本、图片/图标、按钮、图表",
                "实时协作：在线状态、光标、选择、跨标签同步编辑",
                "检查器控件：几何、样式、文本",
                "图层管理：搜索、重命名、锁定/隐藏、排序",
                "辅助线 / 对齐 / 吸附",
                "历史快照 + 恢复",
                "回放时间线 + 从任意点分支",
                "原型模式：热点 + 流程导航",
                "评论：固定线程，可解决 / 重新打开",
                "导出：保存/导入/导出 + CLI 导出为 JSON 和 React+Tailwind"
            ]}
        ],
        "tables": [],
        "speaker_notes": "展示构建产物的广度，证明端到端能力。",
        "source_excerpt": "10 个核心功能：画布编辑 / 实时协作 / 检查器控件 / 图层管理 / 辅助线 / 历史 / 回放 / 原型 / 评论 / 导出。"
    },

    # ===== P4 Ch2 Agent Loop 六步 =====
    {
        "page_key": "page_04",
        "source_page_id": "S2-loop",
        "source_title": "Agent Loop：六步循环",
        "action_title": "长时间运行的关键不是巨大的 prompt，而是循环结构",
        "core_message": "Agent 运行的循环结构：Plan → Edit → Run Tools → Observe → Repair → Update。这个循环给 Agent 提供真实反馈、外部化状态、可转向性。",
        "body_blocks": [
            {"type": "numbered_list", "items": [
                "Plan 规划",
                "Edit 编辑代码",
                "Run Tools 运行测试 / 构建",
                "Observe 观察结果",
                "Repair 修复失败",
                "Update 更新文档"
            ]}
        ],
        "tables": [],
        "speaker_notes": "核心机制页。强调这是循环结构而非一次性 prompt。",
        "source_excerpt": "六步循环：Plan → Edit → Run Tools → Observe → Repair → Update。"
    },

    # ===== P5 Ch2 三大收益 =====
    {
        "page_key": "page_05",
        "source_page_id": "S2-benefits",
        "source_title": "循环三大收益",
        "action_title": "循环结构为 Agent 提供三种关键能力",
        "core_message": "真实反馈（错误/diff/日志）+ 外部化状态（不依赖 context window）+ 可转向性（基于结果调整方向不丢失进度）。",
        "body_blocks": [
            {"type": "bullet_list", "items": [
                "真实反馈：错误、diff、日志——不是猜测，是实际结果",
                "外部化状态：repo、文件、文档、worktrees、输出——不依赖 context window",
                "可转向性：基于结果调整方向，中途修正不会丢失进度"
            ]},
            {"type": "paragraph", "text": "这也是为什么 Codex 模型在 Codex 表面上比通用聊天窗口表现更好：harness 提供了结构化上下文（repo 元数据、文件树、diffs、命令输出），并强制执行严格的「完成条件」流程。"}
        ],
        "tables": [],
        "speaker_notes": "解释循环为什么有效的三个底层原因。",
        "source_excerpt": "真实反馈 / 外部化状态 / 可转向性。"
    },

    # ===== P6 Ch3 习惯总览 =====
    {
        "page_key": "page_06",
        "source_page_id": "S3-overview",
        "source_title": "5 个协作习惯总览",
        "action_title": "Gabriel Chua 的 5 个习惯，构成长周期协作的完整框架",
        "core_message": "5 个习惯覆盖：路线图维护 / 主线程协调 / 里程碑审计 / 本机分工 / 进度同步。",
        "body_blocks": [
            {"type": "numbered_list", "items": [
                "让 Codex 自主规划并维护路线图 —— 用对话启动，用 GOALS.md 锚定",
                "主线程只做全局协调 —— 目标、约束、决策、状态，不陷入实现细节",
                "里程碑后先审计路线图，再 review 代码 —— 双重验证",
                "本机测试交给「本地线程」—— 远程跑绝大多数，本机只做专属校验",
                "用简报和仪表盘同步全局进度 —— 三段式汇报 + 可视化仪表盘"
            ]}
        ],
        "tables": [],
        "speaker_notes": "章节总览页。下面 5 页每页展开一个习惯。",
        "source_excerpt": "5 个协作习惯：路线图 / 主线程协调 / 里程碑审计 / 本机分工 / 进度同步。"
    },

    # ===== P7 习惯1 =====
    {
        "page_key": "page_07",
        "source_page_id": "S3-h1",
        "source_title": "习惯 1：让 Codex 自主规划并维护路线图",
        "action_title": "跳过 /plan 模式，先对话；用 GOALS.md 锚定持久目标",
        "core_message": "用对话启动，让 Codex 采访你补全上下文，生成初版计划。大项目写入 GOALS.md 按里程碑结构化记录。",
        "body_blocks": [
            {"type": "bullet_list", "items": [
                "保持灵活性：早期不需要把半成型想法写成正式规格文档",
                "让它采访你：Codex 反思理解、识别缺口、转化为可执行计划",
                "设置 Goal：让 Codex 综合上下文设定持久目标，自动定义完成证据",
                "GOALS.md：按里程碑结构化记录产出、范围、决策、阻塞、下一步证据",
                "持续迭代：新发现可能改变里程碑范围或完成标准"
            ]},
            {"type": "paragraph", "text": "关键：只有一个 Goal-mode 目标同时激活。里程碑完成后，Codex 更新 GOALS.md，激活下一个目标，继续工作。"}
        ],
        "tables": [],
        "speaker_notes": "强调「先对话后规格」「一个 Goal 同时激活」两个关键约束。",
        "source_excerpt": "习惯 1：跳过 /plan 模式先对话；GOALS.md 按里程碑结构化；一个 Goal 同时激活。"
    },

    # ===== P8 习惯2 =====
    {
        "page_key": "page_08",
        "source_page_id": "S3-h2",
        "source_title": "习惯 2：主线程只做全局协调",
        "action_title": "目标、约束、决策、状态 —— 主线程不陷入实现细节",
        "core_message": "主线程决定下一步做什么、委派任务、评估结果。Worker 做实现，主线程做协调。",
        "body_blocks": [
            {"type": "bullet_list", "items": [
                "Worker 可能花一小时读不熟悉的代码、尝试多种方法、追踪失败的测试",
                "协调者只需要：worker 学到了什么、什么变了、支持证据是什么、下一步该做什么",
                "委派方式：subagent 或独立 thread；独立 thread 有完整历史可回溯",
                "并行推进：多个工作并行时，主线程继续协调，每个调查/实现/审查都保持可检查"
            ]}
        ],
        "tables": [],
        "speaker_notes": "架构示意：主线程（协调者）→ Worker A/B/C → GOALS.md + Documentation.md。",
        "source_excerpt": "主线程做协调，Worker 做实现；委派方式可用 subagent 或独立 thread。"
    },

    # ===== P9 习惯3 =====
    {
        "page_key": "page_09",
        "source_page_id": "S3-h3",
        "source_title": "习惯 3：里程碑后先审计路线图，再 review 代码",
        "action_title": "双重验证：计划还对吗？代码质量够吗？",
        "core_message": "每个里程碑结束后，用独立线程做两件事：审计路线图 + 审查代码。",
        "body_blocks": [
            {"type": "paragraph", "text": "路线图审计 5 问："},
            {"type": "numbered_list", "items": [
                "里程碑真的完成了吗？",
                "下一个目标还是对的吗？",
                "有遗漏的里程碑吗？",
                "新证据是否调整了工作顺序？",
                "「完成定义」还成立吗？"
            ]},
            {"type": "paragraph", "text": "同步运行 /review：路线图审计可能发现缺失的浏览器测试；同时 /review 可能发现 token 存储方式不对，即使远程测试通过了。"},
            {"type": "paragraph", "text": "协调者更新 GOALS.md，委派 token 修复，添加缺失的浏览器验证，然后才激活下一个里程碑。"}
        ],
        "tables": [],
        "speaker_notes": "强调双重验证：路线图审计（计划维度）+ /review（代码维度）。",
        "source_excerpt": "习惯 3：5 问审计路线图 + 同步 /review；更新 GOALS.md 后才激活下一里程碑。"
    },

    # ===== P10 习惯4 =====
    {
        "page_key": "page_10",
        "source_page_id": "S3-h4",
        "source_title": "习惯 4：本机测试交给「本地线程」",
        "action_title": "远程跑绝大多数，本机只做环境依赖的专属校验",
        "core_message": "大部分 Codex session 跑在远程实例上，笔记本关了也能继续。但有些检查依赖本机环境。",
        "body_blocks": [
            {"type": "paragraph", "text": "需要本机的场景："},
            {"type": "bullet_list", "items": [
                "登录态浏览器",
                "本地凭据",
                "Xcode",
                "macOS 权限",
                "iOS 模拟器"
            ]},
            {"type": "paragraph", "text": "典型闭环流程：远程 Worker 实现功能 → 远程测试通过 → 本地线程环境校验 → 发现 Bug 回传远程 → 远程修复。"},
            {"type": "paragraph", "text": "项目保持远程优先。你的电脑只在需要时加入。"}
        ],
        "tables": [],
        "speaker_notes": "强调远程优先 + 本机只做必要校验。",
        "source_excerpt": "习惯 4：远程优先，本机只做环境依赖校验（登录态/凭据/Xcode/macOS权限/iOS模拟器）。"
    },

    # ===== P11 习惯5 =====
    {
        "page_key": "page_11",
        "source_page_id": "S3-h5",
        "source_title": "习惯 5：用简报和仪表盘同步全局进度",
        "action_title": "三段式汇报 + 可视化仪表盘",
        "core_message": "Worker thread 只报告单个任务。回到项目时，需要全局视图：三段式汇报 + 仪表盘。",
        "body_blocks": [
            {"type": "paragraph", "text": "三段式汇报（每次状态变化时输出）："},
            {"type": "bullet_list", "items": [
                "What's done：已完成什么",
                "What's next：下一步是什么",
                "Any blockers：有无阻塞"
            ]},
            {"type": "paragraph", "text": "就像和 Codex 做每日站会，只不过是每小时一次。"},
            {"type": "paragraph", "text": "可视化仪表盘（progress-dashboard.html）包含：当前活跃目标 / 已完成里程碑 / 证据状态 / 阻塞项 / 决策记录 / 最近更新。"},
            {"type": "paragraph", "text": "Codex 可将仪表盘部署为 Site，保持远程可访问。"}
        ],
        "tables": [],
        "speaker_notes": "强调「每小时一次站会」+ 「仪表盘外置状态」。",
        "source_excerpt": "习惯 5：三段式汇报（done/next/blockers）+ progress-dashboard.html。"
    },

    # ===== P12 Ch4 对比分析 =====
    {
        "page_key": "page_12",
        "source_page_id": "S4",
        "source_title": "对比分析：两篇文章的互补",
        "action_title": "Derrick 证明「能跑 25 小时」，Gabriel 解决「怎么不翻车」",
        "core_message": "前者是地基（能力边界），后者是建筑（协作流程）。合在一起才是完整方法论。",
        "body_blocks": [
            {"type": "paragraph", "text": "核心共识："},
            {"type": "bullet_list", "items": [
                "持久 Goal 为 AI 提供不会漂移的锚点",
                "里程碑审计为项目设置多层验收关卡",
                "状态外置（文件/仪表盘）避免信息仅存在于线程上下文",
                "持续验证（tests/review）每个里程碑都检查，不是最后才检查"
            ]}
        ],
        "tables": [
            {
                "caption": "两篇文章的互补对比",
                "headers": ["维度", "Derrick Choi（产品经理）", "Gabriel Chua（DX 工程师）"],
                "rows": [
                    ["核心问题", "模型能跑多久？边界在哪？", "怎么让它不跑偏？"],
                    ["回答方式", "压力测试实验（25 小时）", "数周实践总结（5 个习惯）"],
                    ["侧重", "模型能力验证", "人机协作流程"],
                    ["核心贡献", "四文件架构", "五习惯框架 + GOALS.md + 仪表盘"],
                    ["验证方式", "代码质量（tests/lint/typecheck）", "路线图审计 + /review 双重验证"],
                    ["环境", "单机运行", "远程 + 本地线程分工"],
                    ["角色定位", "实验设计者", "技术负责人（带领 AI 团队）"]
                ]
            }
        ],
        "speaker_notes": "对比表 + 共识 4 条。",
        "source_excerpt": "Derrick 是地基（能力边界），Gabriel 是建筑（协作流程）。"
    },

    # ===== P13 Ch5 可迁移框架 =====
    {
        "page_key": "page_13",
        "source_page_id": "S5",
        "source_title": "可迁移框架：跨工具适用",
        "action_title": "核心骨架不依赖特定工具，是 AI 时代的新型项目管理模式",
        "core_message": "4 个核心骨架：路线图锚定 / 里程碑验收 / 远程本地分工 / 状态外置。任何支持多 session 的工具都适用。",
        "body_blocks": [
            {"type": "bullet_list", "items": [
                "路线图锚定：GOALS.md 记录里程碑、范围、决策、证据",
                "里程碑验收：审计 + review，可用独立对话或 subagent",
                "远程本地分工：远程跑大部分，本机只做环境依赖校验",
                "状态外置：进度汇报 + 仪表盘，可用 markdown 或 HTML"
            ]}
        ],
        "tables": [
            {
                "caption": "工具对应关系",
                "headers": ["Codex 能力", "Claude Code 对应", "Cursor 对应"],
                "rows": [
                    ["/goal（持久目标）", "CLAUDE.md + memory 文件", ".cursorrules + 项目上下文"],
                    ["GOALS.md（路线图）", "任何 markdown 文件", "任何 markdown 文件"],
                    ["Subagent（委派）", "Agent tool（/agent）", "多文件编辑 + terminal"],
                    ["/review（代码审查）", "独立对话 + review 指令", "独立对话 + 代码审查"],
                    ["Computer Use（本机测试）", "本地 terminal 执行", "本地 terminal 执行"]
                ]
            }
        ],
        "speaker_notes": "强调跨工具通用性。",
        "source_excerpt": "4 个核心骨架 + Codex/Claude/Cursor 工具对应表。"
    },

    # ===== P14 Ch6 启动 Prompt =====
    {
        "page_key": "page_14",
        "source_page_id": "S6-prompt",
        "source_title": "实操工具箱：启动 Prompt",
        "action_title": "可复制的长周期项目启动 Prompt",
        "core_message": "用一段 prompt 让 AI 进入「协调者」模式：采访 → 计划 → GOALS.md → 单目标 → 委派 → 审计 → 三段式汇报。",
        "body_blocks": [
            {"type": "quote", "text": "Coordinate this as a long-running project. Begin by interviewing me about what I am trying to build... Create GOALS.md as the shared roadmap... Set and maintain one objective at a time... Delegate implementation to subagents or new threads... After each milestone, audit GOALS.md... When the project state changes, report only: What's done / What's next / Any blockers. Do not declare completion until the agreed evidence exists."}
        ],
        "tables": [],
        "speaker_notes": "Prompt 关键指令拆解。",
        "source_excerpt": "启动 Prompt：Coordinate / Interview / GOALS.md / one objective / delegate / audit / three-segment report."
    },

    # ===== P15 Ch6 模板 =====
    {
        "page_key": "page_15",
        "source_page_id": "S6-templates",
        "source_title": "实操工具箱：GOALS.md + 进度模板",
        "action_title": "GOALS.md 路线图模板 + 三段式进度汇报模板",
        "core_message": "GOALS.md 按里程碑结构化记录（状态/产出/范围/决策/阻塞/证据）；进度汇报固定四段（done/next/blockers/证据）。",
        "body_blocks": [
            {"type": "paragraph", "text": "GOALS.md 每个里程碑需记录："},
            {"type": "bullet_list", "items": [
                "状态（进行中 / 待开始 / 已完成）",
                "目标产出（具体交付物）",
                "工作范围（任务清单）",
                "重要决策（描述 + 原因）",
                "已知阻塞",
                "完成证据（测试 / 审查 / 演示）"
            ]},
            {"type": "paragraph", "text": "进度汇报模板四段：What's done / What's next / Any blockers / 证据。"}
        ],
        "tables": [],
        "speaker_notes": "提供可直接复制的模板结构。",
        "source_excerpt": "GOALS.md 模板：项目目标 / 当前状态 / 里程碑（状态/产出/范围/决策/阻塞/证据）/ 决策日志。"
    },

    # ===== P16 Ch7 范式升级 =====
    {
        "page_key": "page_16",
        "source_page_id": "S7-role",
        "source_title": "范式升级：开发者角色转变",
        "action_title": "从亲自写代码的执行者，到带领 AI 团队的技术负责人",
        "core_message": "开发者关注点从实现细节转移到目标、里程碑、验收标准；从手动测试转移到设计验证流程。",
        "body_blocks": [
            {"type": "paragraph", "text": "角色转变："}
        ],
        "tables": [
            {
                "caption": "角色转变",
                "headers": ["过去", "现在"],
                "rows": [
                    ["亲自写代码的执行者", "带领 AI 团队的技术负责人"],
                    ["关注实现细节", "关注目标、里程碑、验收标准"],
                    ["手动测试验证", "设计验证流程让 AI 自动执行"],
                    ["单线程工作", "多 worker 并行协调"]
                ]
            }
        ],
        "speaker_notes": "强调开发者角色升级，不是被替代。",
        "source_excerpt": "角色转变：执行者 → 技术负责人；实现细节 → 目标/验收；手动测试 → 设计验证流程。"
    },

    # ===== P17 Ch7 底层三要素 =====
    {
        "page_key": "page_17",
        "source_page_id": "S3-elements",
        "source_title": "底层三要素 + 适用边界",
        "action_title": "持久锚点 + 验收关卡 + 状态外置 = AI 长周期协作的底层三要素",
        "core_message": "三要素：Goal + GOALS.md（锚点）/ 里程碑审计 + review（关卡）/ 简报 + 仪表盘（外置）。",
        "body_blocks": [
            {"type": "numbered_list", "items": [
                "持久锚点：Goal + GOALS.md，为 AI 提供不会漂移的目标",
                "验收关卡：里程碑审计 + review，多层验证防止偏差累积",
                "状态外置：简报 + 仪表盘，项目状态不依赖线程上下文"
            ]},
            {"type": "paragraph", "text": "适用边界（仅当满足以下特征时投入产出比最高）："},
            {"type": "bullet_list", "items": [
                "项目推进过程中会持续涌现新信息",
                "涉及多块独立并行工作",
                "需要多个不同环境的验证证据"
            ]}
        ],
        "tables": [],
        "speaker_notes": "核心方法论收敛到三要素，加适用边界防止滥用。",
        "source_excerpt": "底层三要素：持久锚点 / 验收关卡 / 状态外置。适用边界：新信息/并行/多环境。"
    },

    # ===== P18 结语 =====
    {
        "page_key": "page_18",
        "source_page_id": "Closing",
        "source_title": "结语",
        "action_title": "模型负责智能，开发者负责引导智能锚定目标",
        "core_message": "这套方法的本质不是工具使用技巧，而是 AI 时代的新型项目管理模式。",
        "body_blocks": [
            {"type": "paragraph", "text": "模型负责发挥智能能力，而开发者的核心作用是引导这份智能始终锚定同一目标，沿着验证证据的路径稳步推进。"},
            {"type": "paragraph", "text": "起点：下次启动长周期任务时，先写一份 GOALS.md，再让 AI 采访你。"}
        ],
        "tables": [],
        "speaker_notes": "行动召唤。",
        "source_excerpt": "模型负责智能，开发者负责引导。起点：写 GOALS.md，让 AI 采访你。"
    },
]

doc = {
    "project": "AI长周期任务协作方法论",
    "source_path": "source.md",
    "generated_at": "2026-07-21T00:00:00Z",
    "pages": pages,
}

(DECK / "_internal/01_content/page_content.json").write_text(
    json.dumps(doc, ensure_ascii=False, indent=2), encoding="utf-8"
)

# manifest
batch_size = 3
batches = {}
for i in range(0, len(pages), batch_size):
    batch_id = f"batch_{i // batch_size + 1:02d}"
    batches[batch_id] = {
        "status": "planned",
        "pages": [p["page_key"] for p in pages[i:i+batch_size]]
    }

manifest = {
    "project": "AI长周期任务协作方法论",
    "version": "2.0",
    "batch_size": batch_size,
    "batch_config": batches,
    "pages": [
        {
            "page_key": p["page_key"],
            "svg_path": f"_internal/02_svg_source/{p['page_key']}.svg",
            "png_path": f"_internal/03_png_preview/{p['page_key']}.png",
            "validation_status": "not_validated",
            "layout_approved": False,
            "visual_approved": False,
            "export_allowed": False,
        }
        for p in pages
    ],
}
(DECK / "_internal/00_project/page_manifest.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
)

print(f"Generated {len(pages)} pages across {len(batches)} batches")
for bid, b in batches.items():
    print(f"  {bid}: {len(b['pages'])} pages")
