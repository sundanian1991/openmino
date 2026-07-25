#!/usr/bin/env python3
"""Apply user feedback to P3/P5/P7-P11/P10/P14/P16."""
import json
from pathlib import Path

DECK = Path(__file__).parent / "deck"
content_path = DECK / "_internal/01_content/page_content.json"
layout_path = DECK / "_internal/01_layout_plan/layout_plan.json"

content = json.loads(content_path.read_text(encoding="utf-8"))
layout = json.loads(layout_path.read_text(encoding="utf-8"))

def find_page(doc, pk):
    for i, p in enumerate(doc["pages"]):
        if p["page_key"] == pk:
            return i
    return -1

# ============ P3：换成语音教练 ============
new_p3_content = {
    "page_key": "page_03",
    "source_page_id": "S1-features",
    "source_title": "真实案例：语音工作站",
    "action_title": "真实案例：用这套方法论构建出「语音工作站」",
    "core_message": "桌面端语音工具，围绕「练 / 写 / 记」三大能力，包含 8 种训练场景、5 种成文类型、会议纪要三大模块。",
    "body_blocks": [
        {"type": "paragraph", "text": "练 / 写 / 记 三大能力模块："},
        {"type": "bullet_list", "items": [
            "练·8 种场景训练：自由训练 / 材料讲解 / 汇报演练 / 话题展开 / 会议发言 / 沟通说服 / 面试模拟 / 即兴表达",
            "写·5 种成文类型：报告 / 方案 / 邮件 / 汇报稿 / 日志",
            "记·会议纪要：议题拆分 / 讨论要点 / 决议 / 待办事项 / 未决问题",
            "训练后产出：词库分析（填充词/犹豫词/笼统词/情绪词）+ 表达力报告 + 逐句改写建议 + 教练观察"
        ]}
    ],
    "tables": [],
    "speaker_notes": "用我自己的语音工作站项目作为真实落地案例，比设计工具更有说服力。",
    "source_excerpt": "语音工作站：练（8 场景）/ 写（5 类型）/ 记（会议纪要）；训练后获得词库分析+表达力报告+改写建议+教练观察。"
}
idx = find_page(content, "page_03")
content["pages"][idx] = new_p3_content

new_p3_layout = {
    "page_key": "page_03",
    "layout_id": "L12",
    "layout_usage": "adapted",
    "page_mode": "rational",
    "visual_density": "balanced",
    "grid": "3-col",
    "design_judgment": {
        "persuasion_action": "prove",
        "content_relation": "parallel_set",
        "information_anchor": "练/写/记 三大能力",
        "reader_takeaway": "真实案例证明方法论可行。"
    },
    "why_this_layout": "练/写/记是三个同级核心能力，参考 L12 三支柱。",
    "why_not_other_layouts": "不用 10 卡网格（已改为 3 大模块）；不用对照表（无对照关系）。",
    "adaptation_note": "3 卡并列（练/写/记）+ 底部训练产出条。",
    "anti_laziness_check": "三卡不是泛泛标签，每卡承载具体子能力。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "练/写/记 三大能力卡", "x": 140, "y": 280, "w": 1640, "h": 500, "zone": "main_center"},
        {"label": "训练产出条", "x": 140, "y": 820, "w": 1640, "h": 140, "zone": "footer"}
    ],
    "copy_handling": {
        "final_on_slide": {
            "title": "真实案例：用这套方法论构建出「语音工作站」",
            "subtitle": "桌面端语音工具 · 围绕练/写/记三大能力",
            "body": [
                "练·8 种场景：自由训练 / 材料讲解 / 汇报演练 / 话题展开 / 会议发言 / 沟通说服 / 面试模拟 / 即兴表达",
                "写·5 种成文：报告 / 方案 / 邮件 / 汇报稿 / 日志",
                "记·会议纪要：议题拆分 / 讨论要点 / 决议 / 待办 / 未决问题"
            ],
            "footer_takeaway": "训练产出：词库分析 + 表达力报告 + 逐句改写 + 教练观察"
        },
        "kept_on_slide": ["action_title", "3 modules", "训练产出"],
        "compression_rationale": ["练/写/记三模块并列；训练产出作为底部条收束。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "三卡并列本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: prove\nInformationAnchor: 练/写/记 三大能力\nReason: 3 个同级能力用三支柱呈现。"
}
idx = find_page(layout, "page_03")
layout["pages"][idx] = new_p3_layout

# ============ P5：三大收益加具体例子（只改 copy_handling 和 content）============
idx = find_page(content, "page_05")
content["pages"][idx]["body_blocks"] = [
    {"type": "bullet_list", "items": [
        "真实反馈：跑测试后看到 traceback、diff、错误日志——不是猜哪里错了，是看到实际结果",
        "外部化状态：repo、文件、GOALS.md、worktrees——不依赖 context window，关掉笔记本状态还在",
        "可转向性：基于结果调整方向，比如发现某模块实现错了，回滚不丢失其他模块进度"
    ]}
]
idx = find_page(layout, "page_05")
layout["pages"][idx]["copy_handling"]["final_on_slide"]["body"] = [
    "真实反馈：跑测试看到 traceback、diff、日志——不是猜，是实际结果",
    "外部化状态：repo / 文件 / GOALS.md——不依赖 context window，状态持久",
    "可转向性：基于结果调整方向，回滚不丢失进度"
]

# ============ P10：UU 远程替代 Codex 远程 ============
idx = find_page(content, "page_10")
content["pages"][idx]["action_title"] = "远程（UU）跑绝大多数，本机只做环境依赖的专属校验"
content["pages"][idx]["core_message"] = "大部分 session 跑在 UU 远程实例上，笔记本关了也能继续。但有些检查依赖本机环境。"
content["pages"][idx]["body_blocks"] = [
    {"type": "paragraph", "text": "需要本机的场景："},
    {"type": "bullet_list", "items": [
        "登录态浏览器",
        "本地凭据",
        "Xcode",
        "macOS 权限",
        "iOS 模拟器"
    ]},
    {"type": "paragraph", "text": "典型闭环流程：UU 远程 Worker 实现功能 → 远程测试通过 → 本地线程环境校验 → 发现 Bug 回传远程 → 远程修复。"},
    {"type": "paragraph", "text": "项目保持远程优先（UU）。你的电脑只在需要时加入。"}
]
content["pages"][idx]["source_excerpt"] = "习惯 4：UU 远程优先，本机只做环境依赖校验。"

idx = find_page(layout, "page_10")
layout["pages"][idx]["copy_handling"]["final_on_slide"]["title"] = "远程（UU）跑绝大多数，本机只做环境依赖的专属校验"
layout["pages"][idx]["copy_handling"]["final_on_slide"]["body"] = [
    "UU 远程跑大部分 session，笔记本关了也能继续",
    "本机场景：登录态浏览器 / 本地凭据 / Xcode / macOS 权限 / iOS 模拟器",
    "闭环：UU 远程实现 → 远程测试 → 本地校验 → 发现 Bug → 远程修复",
    "项目保持远程优先（UU），电脑只在需要时加入"
]
layout["pages"][idx]["layout_reason"] = layout["pages"][idx]["layout_reason"].replace("远程优先 + 本地校验", "UU 远程优先 + 本地校验")

# ============ P14：左 prompt 原文 + 右中文解读 ============
idx = find_page(content, "page_14")
content["pages"][idx]["body_blocks"] = [
    {"type": "paragraph", "text": "启动 Prompt 7 段指令（左原文 / 右解读）："},
    {"type": "bullet_list", "items": [
        "Coordinate this as a long-running project → 声明这是长周期项目",
        "Begin by interviewing me → 先采访我，不要直接动手",
        "Create GOALS.md as the shared roadmap → 创建共享路线图",
        "Set and maintain one objective at a time → 单目标同时激活",
        "Delegate implementation to subagents → 委派给 subagent，主线程不实现",
        "After each milestone, audit GOALS.md → 每里程碑后审计 + review",
        "Report only: done / next / blockers → 只汇报三段式",
        "Do not declare completion until evidence exists → 没证据不宣布完成"
    ]}
]

idx = find_page(layout, "page_14")
layout["pages"][idx]["grid"] = "6-6"
layout["pages"][idx]["wireframe"] = [
    {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
    {"label": "左栏：Prompt 原文（英文代码块）", "x": 140, "y": 260, "w": 800, "h": 700, "zone": "main_left"},
    {"label": "右栏：7 段中文解读", "x": 980, "y": 260, "w": 800, "h": 700, "zone": "main_right"}
]
layout["pages"][idx]["copy_handling"]["final_on_slide"]["body"] = [
    "Coordinate this as a long-running project → 声明长周期项目",
    "Begin by interviewing me → 先采访后计划",
    "Create GOALS.md → 创建共享路线图",
    "One objective at a time → 单目标激活",
    "Delegate to subagents → 委派不亲为",
    "After each milestone, audit → 里程碑后审计",
    "Report done/next/blockers → 三段式汇报",
    "No completion without evidence → 没证据不宣布完成"
]
layout["pages"][idx]["adaptation_note"] = "左侧 prompt 原文代码块 + 右侧 7 段中文解读，便于理解每段意图。"
layout["pages"][idx]["anti_laziness_check"] = "不是贴一段代码，而是左右对照让每段都可理解。"

# ============ P16：加"不懂带团队"梗 ============
idx = find_page(content, "page_16")
content["pages"][idx]["action_title"] = "不会带团队，你就自己干到死 —— AI 时代同样成立"
content["pages"][idx]["core_message"] = "管理者不懂授权只能累死。AI 时代的开发者同理：不懂带 AI 团队，只能自己写代码到死。"
content["pages"][idx]["body_blocks"] = [
    {"type": "paragraph", "text": "管理学金句：不会带团队，你就自己干到死（赵伟同名管理书）。"},
    {"type": "paragraph", "text": "AI 时代同样成立：开发者如果不学会委派给 AI、设计验证流程，就会陷入事必躬亲的累死循环。"},
    {"type": "paragraph", "text": "角色转变："}
]
content["pages"][idx]["source_excerpt"] = "管理学金句「不会带团队，你就自己干到死」应用到 AI 时代：不懂带 AI 团队，只能自己写代码到死。"

idx = find_page(layout, "page_16")
layout["pages"][idx]["page_mode"] = "emotional"
layout["pages"][idx]["visual_density"] = "airy"
layout["pages"][idx]["layout_id"] = "L08"
layout["pages"][idx]["grid"] = "full-width"
layout["pages"][idx]["why_this_layout"] = "金句页：用「不会带团队，你就自己干到死」作为情感锚点。"
layout["pages"][idx]["wireframe"] = [
    {"label": "顶部铺垫：管理学金句", "x": 140, "y": 200, "w": 1640, "h": 100, "zone": "header"},
    {"label": "金句主体：AI 时代同样成立", "x": 140, "y": 340, "w": 1640, "h": 280, "zone": "main_center"},
    {"label": "底部角色转变表", "x": 140, "y": 660, "w": 1640, "h": 320, "zone": "footer"}
]
layout["pages"][idx]["copy_handling"]["final_on_slide"] = {
    "title": "不会带团队，你就自己干到死 —— AI 时代同样成立",
    "subtitle": "管理学金句（赵伟同名管理书）",
    "body": [
        "金句：不会带团队，你就自己干到死",
        "AI 时代：不懂带 AI 团队，只能自己写代码到死",
        "执行者 → 技术负责人 · 实现细节 → 目标/验收 · 手动测试 → 设计验证流程 · 单线程 → 多 worker 并行"
    ],
    "footer_takeaway": ""
}
layout["pages"][idx]["layout_reason"] = "PageMode: emotional\nPurpose: emotionalize\nInformationAnchor: 金句\nReason: 用管理学金句做情感切入，比纯对比表更有冲击。"

# ============ P7-P11：每页不同版式家族 ============
# 习惯1：L10（保留）—— 路线图维护
# 习惯2：L13 Hierarchy（主线程-Worker 层级）
idx = find_page(layout, "page_08")
layout["pages"][idx]["layout_id"] = "L13"
layout["pages"][idx]["grid"] = "hierarchy"
layout["pages"][idx]["why_this_layout"] = "主线程-Worker 是层级关系，参考 L13 Hierarchy。"
layout["pages"][idx]["adaptation_note"] = "顶层主线程 → 中层 Worker A/B/C → 底层 GOALS.md + Documentation.md。"
layout["pages"][idx]["wireframe"] = [
    {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
    {"label": "顶层：主线程（协调者）", "x": 700, "y": 280, "w": 520, "h": 120, "zone": "main_center"},
    {"label": "中层：Worker A/B/C", "x": 200, "y": 460, "w": 1520, "h": 200, "zone": "main_center"},
    {"label": "底层：GOALS.md + Documentation.md", "x": 200, "y": 720, "w": 1520, "h": 160, "zone": "footer"}
]
layout["pages"][idx]["layout_reason"] = layout["pages"][idx]["layout_reason"].replace("Purpose: structure", "Purpose: structure (hierarchy)")

# 习惯3：L06 Process（审计 5 问流程）
idx = find_page(layout, "page_09")
layout["pages"][idx]["layout_id"] = "L06"
layout["pages"][idx]["grid"] = "full-width"
layout["pages"][idx]["why_this_layout"] = "5 问审计 + 同步 review 是流程，参考 L06 Process。"
layout["pages"][idx]["adaptation_note"] = "顶部主张 + 5 问水平流程 + 底部 review 收束。"
layout["pages"][idx]["wireframe"] = [
    {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
    {"label": "5 问水平流程", "x": 140, "y": 300, "w": 1640, "h": 360, "zone": "main_center"},
    {"label": "底部 /review 收束", "x": 140, "y": 720, "w": 1640, "h": 160, "zone": "footer"}
]

# 习惯4：L06 Process（远程→本地→远程 闭环）
idx = find_page(layout, "page_10")
layout["pages"][idx]["layout_id"] = "L06"
layout["pages"][idx]["grid"] = "full-width"
layout["pages"][idx]["why_this_layout"] = "UU 远程→本地→远程是闭环流程，参考 L06 Process。"
layout["pages"][idx]["adaptation_note"] = "顶部主张 + 5 步闭环流程 + 底部远程优先结论。"
layout["pages"][idx]["wireframe"] = [
    {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
    {"label": "5 步闭环流程", "x": 140, "y": 300, "w": 1640, "h": 400, "zone": "main_center"},
    {"label": "底部结论：UU 远程优先", "x": 140, "y": 760, "w": 1640, "h": 120, "zone": "footer"}
]
layout["pages"][idx]["layout_reason"] = "PageMode: rational\nPurpose: sequence\nInformationAnchor: 5 步闭环\nReason: 远程→本地→远程是流程关系。"

# 习惯5：L03 KPI（三段式 + 仪表盘 6 模块）
idx = find_page(layout, "page_11")
layout["pages"][idx]["layout_id"] = "L03"
layout["pages"][idx]["grid"] = "3-3"
layout["pages"][idx]["why_this_layout"] = "三段式汇报 + 仪表盘 6 模块用 KPI 网格呈现，参考 L03。"
layout["pages"][idx]["adaptation_note"] = "顶部主张 + 三段式 3 卡 + 仪表盘 6 模块网格。"
layout["pages"][idx]["wireframe"] = [
    {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
    {"label": "三段式汇报 3 卡", "x": 140, "y": 260, "w": 1640, "h": 200, "zone": "main_center"},
    {"label": "仪表盘 6 模块网格", "x": 140, "y": 500, "w": 1640, "h": 380, "zone": "main_center"}
]

# 保存
content_path.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")
layout_path.write_text(json.dumps(layout, ensure_ascii=False, indent=2), encoding="utf-8")

print("Applied feedback:")
print("  P3  - 语音工作站三大能力（练/写/记）")
print("  P5  - 三大收益加具体例子")
print("  P7  - 保留 L10（路线图）")
print("  P8  - L13 Hierarchy（主线程-Worker 层级）")
print("  P9  - L06 Process（5 问流程）")
print("  P10 - L06 Process + UU 远程替代 Codex")
print("  P11 - L03 KPI（三段式 + 仪表盘）")
print("  P14 - 左 prompt 原文 + 右中文解读")
print("  P16 - L08 金句「不会带团队你就自己干到死」")
