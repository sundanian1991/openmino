#!/usr/bin/env python3
"""Generate layout_plan.json for 18-page AI协作方法论 PPT."""
import json
from pathlib import Path

DECK = Path(__file__).parent / "deck"

def L01_cover(pk):
    return {
        "page_key": pk, "layout_id": "L01", "layout_usage": "adapted",
        "page_mode": "emotional", "visual_density": "airy", "grid": "full-width",
        "design_judgment": {"persuasion_action": "emotionalize", "content_relation": "single_claim",
            "information_anchor": "核心命题：怎么不跑偏", "reader_takeaway": "能力已验证，关键在协作流程。"},
        "why_this_layout": "封面单一命题，参考 L01 开启式命题。",
        "why_not_other_layouts": "不用对比表（无对照关系）；不用 KPI（不是数字主导）。",
        "adaptation_note": "左对齐主标题 + 副标题命题 + 底部署名条。",
        "anti_laziness_check": "用「能跑多久 vs 怎么不跑偏」的对照句式建立张力。",
        "wireframe": [
            {"label": "主标题", "x": 140, "y": 400, "w": 1640, "h": 200, "zone": "header"},
            {"label": "副标题命题", "x": 140, "y": 640, "w": 1400, "h": 120, "zone": "main_center"},
            {"label": "底部来源条", "x": 140, "y": 960, "w": 1640, "h": 60, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {
                "title": "AI 长周期任务协作方法论",
                "subtitle": "从实验验证到实操框架",
                "body": ["真正的问题不是「能跑多久」，而是「怎么让它不跑偏」。"],
                "footer_takeaway": "Derrick Choi × Gabriel Chua · OpenAI 内部实践"
            },
            "kept_on_slide": ["action_title", "core_message"],
            "compression_rationale": ["只保留命题一句；两篇来源合并为底部条。"],
            "compressed": ["完整背景移入 notes"],
            "moved_to_notes": ["完整方法论背景"]
        },
        "visual_asset_strategy": {"asset_need": "optional", "asset_type": "svg_background",
            "placement": "background", "reason": "极简背景几何呼应「长周期」节奏。"},
        "layout_reason": "PageMode: emotional\nPurpose: emotionalize\nInformationAnchor: 主标题命题\nReadingPath: 主标题 → 副标题 → 底部来源\nSpatialPlan: 全幅留白营造定调张力。"
    }

def L03_kpi(pk, title, subtitle, kpis, anchor_text, why="KPI 是主角", adaptation="4 KPI 横排 + 主张 + 锚点结论"):
    return {
        "page_key": pk, "layout_id": "L03", "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": "4-col",
        "design_judgment": {"persuasion_action": "prove", "content_relation": "evidence_chain",
            "information_anchor": anchor_text, "reader_takeaway": "数字证明主张。"},
        "why_this_layout": why, "why_not_other_layouts": "不用纯 bullet（数字会被埋没）。",
        "adaptation_note": adaptation, "anti_laziness_check": "数字成为视觉主角，不是 bullet 中的普通项。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": "KPI 行", "x": 140, "y": 280, "w": 1640, "h": 280, "zone": "main_center"},
            {"label": "锚点结论", "x": 140, "y": 620, "w": 1640, "h": 200, "zone": "main_center"},
            {"label": "副标题", "x": 140, "y": 880, "w": 1640, "h": 80, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": kpis, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "kpis", "anchor"],
            "compression_rationale": ["KPI 原样保留为视觉主角；锚点结论独立强调。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "数字本身是视觉。"},
        "layout_reason": f"PageMode: rational\nPurpose: prove\nInformationAnchor: {anchor_text}\nReadingPath: 主张 → KPI → 锚点结论\nSpatialPlan: 4 列 KPI 横排。\nReason: {why}"
    }

def L10_explain(pk, title, subtitle, body_bullets, anchor, why="复杂解释 + 辅助结构"):
    return {
        "page_key": pk, "layout_id": "L10", "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": "5-7",
        "design_judgment": {"persuasion_action": "structure", "content_relation": "evidence_chain",
            "information_anchor": anchor, "reader_takeaway": "结构 + 解释互相支撑。"},
        "why_this_layout": why, "why_not_other_layouts": "不用纯 bullet（结构感丢）。",
        "adaptation_note": "左栏解释 + 右栏结构化清单/示意。",
        "anti_laziness_check": "不是 bullet 罗列，而是结构化拆解。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": "左栏：核心逻辑", "x": 140, "y": 260, "w": 800, "h": 700, "zone": "main_left"},
            {"label": "右栏：结构化清单/示意", "x": 980, "y": 260, "w": 800, "h": 700, "zone": "main_right"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": body_bullets, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "body_bullets"],
            "compression_rationale": ["保留每条核心动作；背景细节移 notes。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "结构本身是视觉。"},
        "layout_reason": f"PageMode: rational\nPurpose: structure\nInformationAnchor: {anchor}\nReadingPath: 标题 → 左解释 → 右结构\nReason: {why}"
    }

def L06_process(pk, title, subtitle, steps, anchor, why="流程结构"):
    return {
        "page_key": pk, "layout_id": "L06", "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": "full-width",
        "design_judgment": {"persuasion_action": "sequence", "content_relation": "sequence",
            "information_anchor": anchor, "reader_takeaway": "步骤顺序就是核心信息。"},
        "why_this_layout": why, "why_not_other_layouts": "不用 bullet（流程感丢）。",
        "adaptation_note": "顶部主张 + 水平/网格流程 + 底部结论。",
        "anti_laziness_check": "不是普通 bullet，用编号 + 箭头强化顺序。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": "流程区", "x": 140, "y": 300, "w": 1640, "h": 500, "zone": "main_center"},
            {"label": "结论", "x": 140, "y": 850, "w": 1640, "h": 100, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": steps, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "steps"],
            "compression_rationale": ["步骤原样保留；辅助说明移 notes。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "流程本身是视觉。"},
        "layout_reason": f"PageMode: rational\nPurpose: sequence\nInformationAnchor: {anchor}\nReadingPath: 主张 → 流程 → 结论\nReason: {why}"
    }

def L12_three_pillars(pk, title, subtitle, pillars, anchor, why="三个或以上同级要点", n=3):
    layout_id = "L12" if n == 3 else "L05"
    return {
        "page_key": pk, "layout_id": layout_id, "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": f"{n}-col",
        "design_judgment": {"persuasion_action": "structure", "content_relation": "parallel_set",
            "information_anchor": anchor, "reader_takeaway": "并列结构清晰。"},
        "why_this_layout": why, "why_not_other_layouts": "不用纯 bullet（并列感丢）。",
        "adaptation_note": f"{n} 卡并列 + 顶部主张。",
        "anti_laziness_check": "每卡有独立信息，不是泛泛标签。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": f"{n} 卡并列区", "x": 140, "y": 280, "w": 1640, "h": 680, "zone": "main_center"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": pillars, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "pillars"],
            "compression_rationale": ["每卡保留核心动作。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "并列卡本身是视觉。"},
        "layout_reason": f"PageMode: rational\nPurpose: structure\nInformationAnchor: {anchor}\nReadingPath: 主张 → 并列卡\nReason: {why}"
    }

def L11_conclusion(pk, title, body, anchor, why="结论收束"):
    return {
        "page_key": pk, "layout_id": "L11", "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": "full-width",
        "design_judgment": {"persuasion_action": "summarize", "content_relation": "summary",
            "information_anchor": anchor, "reader_takeaway": "收束主张。"},
        "why_this_layout": why, "why_not_other_layouts": "不用 bullet（弱化结论感）。",
        "adaptation_note": "主张 + 支撑结论 + 底部共识条。",
        "anti_laziness_check": "不是复述，是真正的收束。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": "核心论述", "x": 140, "y": 280, "w": 1640, "h": 500, "zone": "main_center"},
            {"label": "底部共识条", "x": 140, "y": 830, "w": 1640, "h": 120, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "body": body, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "body"],
            "compression_rationale": ["只保留结论。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "结论页用文字张力。"},
        "layout_reason": f"PageMode: rational\nPurpose: summarize\nInformationAnchor: {anchor}\nReason: {why}"
    }

def L09_compare(pk, title, subtitle, headers, rows, anchor, consensus=None, why="对照表是主角"):
    return {
        "page_key": pk, "layout_id": "L09", "layout_usage": "adapted",
        "page_mode": "rational", "visual_density": "balanced", "grid": "full-width",
        "design_judgment": {"persuasion_action": "compare", "content_relation": "matrix",
            "information_anchor": anchor, "reader_takeaway": "对照清晰。"},
        "why_this_layout": why, "why_not_other_layouts": "不用并列卡（维度多）。",
        "adaptation_note": "顶部主张 + 中间对照表 + 底部共识（可选）。",
        "anti_laziness_check": "对照维度对称，非泛泛罗列。",
        "wireframe": [
            {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
            {"label": "对照表", "x": 140, "y": 260, "w": 1640, "h": 560, "zone": "main_center"},
            {"label": "共识/结论", "x": 140, "y": 860, "w": 1640, "h": 120, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": [], "footer_takeaway": consensus or ""},
            "kept_on_slide": ["action_title", "headers", "rows"],
            "compression_rationale": ["对照表原样保留；多余说明移 notes。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "对照表本身是视觉。"},
        "layout_reason": f"PageMode: rational\nPurpose: compare\nInformationAnchor: {anchor}\nReason: {why}"
    }

def L08_quote(pk, title, body, anchor, why="金句页"):
    return {
        "page_key": pk, "layout_id": "L08", "layout_usage": "adapted",
        "page_mode": "emotional", "visual_density": "airy", "grid": "full-width",
        "design_judgment": {"persuasion_action": "emotionalize", "content_relation": "single_claim",
            "information_anchor": anchor, "reader_takeaway": "一句记忆点。"},
        "why_this_layout": why, "why_not_other_layouts": "不用 bullet（弱化金句张力）。",
        "adaptation_note": "中央大字 + 上下铺垫呼应。",
        "anti_laziness_check": "金句本身承载核心主张，不是普通总结。",
        "wireframe": [
            {"label": "铺垫句", "x": 140, "y": 280, "w": 1640, "h": 80, "zone": "header"},
            {"label": "金句主体", "x": 140, "y": 400, "w": 1640, "h": 320, "zone": "main_center"},
            {"label": "呼应句", "x": 140, "y": 760, "w": 1640, "h": 100, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "body": body, "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "body"],
            "compression_rationale": ["只保留金句 + 呼应。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "optional", "asset_type": "svg_background",
            "placement": "background", "reason": "极简背景制造停顿。"},
        "layout_reason": f"PageMode: emotional\nPurpose: emotionalize\nInformationAnchor: {anchor}\nReason: {why}"
    }

def L15_closing(pk, title, subtitle, call_to_action, why="收束 + 行动召唤"):
    return {
        "page_key": pk, "layout_id": "L15", "layout_usage": "adapted",
        "page_mode": "emotional", "visual_density": "airy", "grid": "full-width",
        "design_judgment": {"persuasion_action": "summarize", "content_relation": "summary",
            "information_anchor": "行动召唤", "reader_takeaway": "下一步动作。"},
        "why_this_layout": why, "why_not_other_layouts": "不用感谢页（泛泛无特异性）。",
        "adaptation_note": "主张 + 行动召唤 + 留白结束。",
        "anti_laziness_check": "落到具体动作，不是泛泛 Thank you。",
        "wireframe": [
            {"label": "资产转型主张", "x": 140, "y": 320, "w": 1640, "h": 160, "zone": "header"},
            {"label": "行动召唤", "x": 140, "y": 520, "w": 1640, "h": 240, "zone": "main_center"},
            {"label": "结束留白", "x": 140, "y": 800, "w": 1640, "h": 200, "zone": "footer"}
        ],
        "copy_handling": {
            "final_on_slide": {"title": title, "subtitle": subtitle, "body": [call_to_action], "footer_takeaway": ""},
            "kept_on_slide": ["action_title", "call_to_action"],
            "compression_rationale": ["收束到单一动作。"],
            "compressed": [], "moved_to_notes": []
        },
        "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
            "reason": "收束页用文字张力。"},
        "layout_reason": f"PageMode: emotional\nPurpose: summarize\nInformationAnchor: 行动召唤\nReason: {why}"
    }

# 构造 18 页
pages = []

# P1 封面
pages.append(L01_cover("page_01"))

# P2 Ch1 实验数据
pages.append(L03_kpi("page_02",
    "25 小时连续运行，从空仓库构建真实可测试的设计工具",
    "Derrick Choi · GPT-5.3-Codex · Extra High 推理级别",
    ["25h 连续运行", "13M 消耗 tokens", "30k 生成代码行数", "10 核心功能模块"],
    "Agent 能保持更长时间的连贯性，端到端完成更大的工作块，并且在出错时能恢复而不丢失主线。",
    why="4 个关键数字是核心证据",
    adaptation="4 KPI 横排 + 主张 + 锚点结论"))

# P3 Ch1 10大功能 - 用 L05 Evidence Grid
pages.append({
    "page_key": "page_03", "layout_id": "L05", "layout_usage": "adapted",
    "page_mode": "rational", "visual_density": "balanced", "grid": "5-2",
    "design_judgment": {"persuasion_action": "prove", "content_relation": "parallel_set",
        "information_anchor": "10 个功能模块的广度", "reader_takeaway": "端到端真实可测试。"},
    "why_this_layout": "10 个功能是证据阵列，参考 L05 Evidence Grid。",
    "why_not_other_layouts": "不用纯 bullet（10 项会失去视觉冲击）。",
    "adaptation_note": "5×2 网格，每卡一个功能模块简述。",
    "anti_laziness_check": "不是 bullet 罗列，而是功能阵列。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "10 功能网格（5×2）", "x": 140, "y": 260, "w": 1640, "h": 700, "zone": "main_center"}
    ],
    "copy_handling": {
        "final_on_slide": {"title": "结果不完美，但是真实可测试的 —— 10 个核心功能",
            "body": ["画布编辑 / 实时协作 / 检查器控件 / 图层管理 / 辅助线对齐吸附",
                     "历史快照恢复 / 回放时间线分支 / 原型模式 / 评论 / 导出"],
            "footer_takeaway": ""},
        "kept_on_slide": ["action_title", "10 features"],
        "compression_rationale": ["每个功能压缩到名称，细节移 notes。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "网格本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: prove\nInformationAnchor: 10 功能网格\nReason: 10 项证据用网格阵列呈现。"
})

# P4 Ch2 Agent Loop
pages.append(L06_process("page_04",
    "长时间运行的关键不是巨大的 prompt，而是循环结构",
    "Agent Loop 六步循环",
    ["① Plan 规划", "② Edit 编辑代码", "③ Run Tools 运行测试", "④ Observe 观察结果", "⑤ Repair 修复失败", "⑥ Update 更新文档"],
    "六步循环",
    why="流程结构是本页核心"))

# P5 Ch2 三大收益 - 用 L12 三支柱
pages.append(L12_three_pillars("page_05",
    "循环结构为 Agent 提供三种关键能力",
    "Plan-Edit-Run-Observe-Repair-Update 的底层收益",
    ["真实反馈：错误、diff、日志——不是猜测，是实际结果",
     "外部化状态：repo、文件、文档、worktrees——不依赖 context window",
     "可转向性：基于结果调整方向，中途修正不会丢失进度"],
    "三大收益",
    why="三个同级收益",
    n=3))

# P6 Ch3 5习惯总览 - L05 Grid (5 卡)
pages.append({
    "page_key": "page_06", "layout_id": "L05", "layout_usage": "adapted",
    "page_mode": "rational", "visual_density": "balanced", "grid": "5-col",
    "design_judgment": {"persuasion_action": "structure", "content_relation": "parallel_set",
        "information_anchor": "5 个习惯并列", "reader_takeaway": "完整框架总览。"},
    "why_this_layout": "5 个习惯是同级要点，参考 L05 Evidence Grid 5 卡横排。",
    "why_not_other_layouts": "不用 L12 三支柱（不是 3 个）。",
    "adaptation_note": "5 卡横排，每卡一个习惯名 + 一句话核心动作。",
    "anti_laziness_check": "不是泛泛编号列表，每卡有独立核心动作。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "5 卡横排", "x": 140, "y": 300, "w": 1640, "h": 600, "zone": "main_center"},
        {"label": "底部章节预告", "x": 140, "y": 920, "w": 1640, "h": 80, "zone": "footer"}
    ],
    "copy_handling": {
        "final_on_slide": {"title": "Gabriel Chua 的 5 个习惯，构成长周期协作的完整框架",
            "body": ["① 自主规划 + GOALS.md", "② 主线程只做协调", "③ 里程碑审计 + review", "④ 本机测试分工", "⑤ 简报 + 仪表盘"],
            "footer_takeaway": "下面 5 页展开每个习惯"},
        "kept_on_slide": ["action_title", "5 habits"],
        "compression_rationale": ["每习惯压缩到一句话核心动作。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "5 卡本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: structure\nInformationAnchor: 5 习惯并列\nReason: 5 个同级要点用并列网格。"
})

# P7-P11 习惯 1-5 - 都用 L10 Deep Explanation
habit_layouts = [
    ("page_07", "跳过 /plan 模式，先对话；用 GOALS.md 锚定持久目标",
     "习惯 1：让 Codex 自主规划并维护路线图",
     ["保持灵活性：早期不需要把半成型想法写成正式规格文档",
      "让它采访你：Codex 反思理解、识别缺口、转化为可执行计划",
      "设置 Goal：综合上下文设定持久目标，自动定义完成证据",
      "GOALS.md：按里程碑结构化记录产出、范围、决策、阻塞、证据",
      "持续迭代：新发现可能改变里程碑范围或完成标准",
      "关键：只有一个 Goal-mode 目标同时激活"],
     "一个 Goal 同时激活"),
    ("page_08", "目标、约束、决策、状态 —— 主线程不陷入实现细节",
     "习惯 2：主线程只做全局协调",
     ["Worker 可能花一小时读不熟悉的代码、尝试多种方法",
      "协调者只需要：worker 学到了什么、什么变了、证据是什么",
      "委派方式：subagent 或独立 thread；独立 thread 有完整历史",
      "并行推进：多工作并行时，每个调查/实现/审查都保持可检查",
      "主线程架构：协调者 → Worker A/B/C → GOALS.md + Documentation.md"],
     "主线程 vs Worker 分工"),
    ("page_09", "双重验证：计划还对吗？代码质量够吗？",
     "习惯 3：里程碑后先审计路线图，再 review 代码",
     ["路线图审计 5 问：里程碑真完成了吗？下一个目标还对吗？",
      "有遗漏里程碑吗？新证据调整顺序吗？完成定义还成立吗？",
      "同步 /review：可能发现 token 存储问题，即使远程测试通过",
      "协调者更新 GOALS.md，委派修复，添加缺失验证",
      "更新完成才激活下一个里程碑"],
     "路线图审计 5 问 + /review"),
    ("page_10", "远程跑绝大多数，本机只做环境依赖的专属校验",
     "习惯 4：本机测试交给「本地线程」",
     ["远程跑大部分 session，笔记本关了也能继续",
      "本机场景：登录态浏览器 / 本地凭据 / Xcode / macOS 权限 / iOS 模拟器",
      "闭环：远程 Worker 实现 → 远程测试 → 本地校验 → 发现 Bug → 远程修复",
      "项目保持远程优先，电脑只在需要时加入"],
     "远程优先 + 本地校验"),
    ("page_11", "三段式汇报 + 可视化仪表盘",
     "习惯 5：用简报和仪表盘同步全局进度",
     ["三段式汇报：What's done / What's next / Any blockers",
      "像每小时一次的站会",
      "progress-dashboard.html：活跃目标 / 已完成里程碑 / 证据状态",
      "阻塞项 / 决策记录 / 最近更新",
      "Codex 可部署为 Site，保持远程可访问"],
     "三段式汇报 + 仪表盘"),
]
for pk, title, subtitle, body, anchor in habit_layouts:
    pages.append(L10_explain(pk, title, subtitle, body, anchor, why=f"{subtitle} 需要解释 + 结构"))

# P12 Ch4 对比 - L09 Compare Table
pages.append(L09_compare("page_12",
    "Derrick 证明「能跑 25 小时」，Gabriel 解决「怎么不翻车」",
    "两篇文章的互补对比",
    ["维度", "Derrick Choi（产品经理）", "Gabriel Chua（DX 工程师）"],
    [
        ["核心问题", "模型能跑多久？边界在哪？", "怎么让它不跑偏？"],
        ["回答方式", "压力测试实验（25 小时）", "数周实践总结（5 个习惯）"],
        ["侧重", "模型能力验证", "人机协作流程"],
        ["核心贡献", "四文件架构", "五习惯 + GOALS.md + 仪表盘"],
        ["验证方式", "代码质量（tests/lint）", "路线图审计 + /review"],
        ["环境", "单机运行", "远程 + 本地线程分工"],
        ["角色定位", "实验设计者", "技术负责人"]
    ],
    "对比表",
    consensus="地基（能力边界）+ 建筑（协作流程）= 完整方法论",
    why="7 维度对照需表格"))

# P13 Ch5 可迁移框架 - L09 双表（骨架 + 工具对应）
pages.append({
    "page_key": "page_13", "layout_id": "L09", "layout_usage": "adapted",
    "page_mode": "rational", "visual_density": "balanced", "grid": "full-width",
    "design_judgment": {"persuasion_action": "structure", "content_relation": "matrix",
        "information_anchor": "4 骨架 + 工具对应表", "reader_takeaway": "跨工具通用。"},
    "why_this_layout": "两表并列（骨架 + 工具对应）。",
    "why_not_other_layouts": "不用 bullet（结构感丢）。",
    "adaptation_note": "顶部主张 + 4 骨架速览 + 工具对应表。",
    "anti_laziness_check": "两表都承载独立信息。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "4 骨架速览", "x": 140, "y": 260, "w": 1640, "h": 200, "zone": "main_center"},
        {"label": "工具对应表", "x": 140, "y": 500, "w": 1640, "h": 480, "zone": "main_center"}
    ],
    "copy_handling": {
        "final_on_slide": {"title": "核心骨架不依赖特定工具，是 AI 时代的新型项目管理模式",
            "body": ["4 骨架：路线图锚定 / 里程碑验收 / 远程本地分工 / 状态外置"],
            "footer_takeaway": ""},
        "kept_on_slide": ["action_title", "4 骨架", "工具对应表"],
        "compression_rationale": ["两表原样保留。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "两表本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: structure\nInformationAnchor: 4 骨架 + 工具对应表\nReason: 两表并列呈现跨工具通用性。"
})

# P14 Ch6 启动 Prompt - L08 金句感（代码为中心）
pages.append({
    "page_key": "page_14", "layout_id": "L10", "layout_usage": "adapted",
    "page_mode": "rational", "visual_density": "balanced", "grid": "full-width",
    "design_judgment": {"persuasion_action": "structure", "content_relation": "evidence_chain",
        "information_anchor": "启动 Prompt 6 段指令", "reader_takeaway": "可复制 prompt。"},
    "why_this_layout": "Prompt 是核心产出，需要结构化拆解 + 代码区。",
    "why_not_other_layouts": "不用纯代码（失去结构解读）。",
    "adaptation_note": "顶部主张 + 6 段指令拆解 + 底部使用建议。",
    "anti_laziness_check": "不是贴一段代码，而是拆解为可理解的结构。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "6 段指令拆解", "x": 140, "y": 260, "w": 1640, "h": 650, "zone": "main_center"}
    ],
    "copy_handling": {
        "final_on_slide": {"title": "可复制的长周期项目启动 Prompt",
            "body": ["① Coordinate（声明长周期项目）",
                     "② Interview（先采访后计划）",
                     "③ GOALS.md（创建共享路线图）",
                     "④ One objective（单目标同时激活）",
                     "⑤ Delegate（委派给 subagent / 新 thread）",
                     "⑥ Audit + 三段式汇报（done/next/blockers）",
                     "⑦ Do not declare completion until evidence exists"],
            "footer_takeaway": ""},
        "kept_on_slide": ["action_title", "prompt segments"],
        "compression_rationale": ["Prompt 拆解为 7 段核心指令。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "Prompt 结构本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: structure\nInformationAnchor: 7 段指令拆解\nReason: 把 prompt 拆解为可理解结构。"
})

# P15 Ch6 模板 - L10 双栏（GOALS.md 模板 + 进度模板）
pages.append(L10_explain("page_15",
    "GOALS.md 路线图模板 + 三段式进度汇报模板",
    "两个可直接复制的结构化模板",
    ["GOALS.md 每个里程碑记录：",
     "  状态 / 目标产出 / 工作范围 / 重要决策 / 已知阻塞 / 完成证据",
     "决策日志：日期 / 决策 / 原因 / 影响",
     "进度汇报模板四段：",
     "  What's done / What's next / Any blockers / 证据"],
    "两模板结构",
    why="两模板并列"))

# P16 Ch7 角色转变 - L09 对比表
pages.append(L09_compare("page_16",
    "从亲自写代码的执行者，到带领 AI 团队的技术负责人",
    "开发者角色转变",
    ["过去", "现在"],
    [
        ["亲自写代码的执行者", "带领 AI 团队的技术负责人"],
        ["关注实现细节", "关注目标、里程碑、验收标准"],
        ["手动测试验证", "设计验证流程让 AI 自动执行"],
        ["单线程工作", "多 worker 并行协调"]
    ],
    "角色转变表",
    consensus="角色升级，不是被替代",
    why="4 维度对照"))

# P17 Ch7 底层三要素 - L12 三支柱 + 适用边界
pages.append({
    "page_key": "page_17", "layout_id": "L12", "layout_usage": "adapted",
    "page_mode": "rational", "visual_density": "balanced", "grid": "3-col",
    "design_judgment": {"persuasion_action": "structure", "content_relation": "parallel_set",
        "information_anchor": "三要素", "reader_takeaway": "方法论收敛到 3 点。"},
    "why_this_layout": "3 个同级要素是真正的三支柱。",
    "why_not_other_layouts": "不用 bullet（弱化支柱感）。",
    "adaptation_note": "3 支柱 + 底部适用边界。",
    "anti_laziness_check": "三支柱不是任意 3 条 bullet。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "三支柱区", "x": 140, "y": 280, "w": 1640, "h": 480, "zone": "main_center"},
        {"label": "适用边界", "x": 140, "y": 800, "w": 1640, "h": 140, "zone": "footer"}
    ],
    "copy_handling": {
        "final_on_slide": {"title": "持久锚点 + 验收关卡 + 状态外置 = 长周期协作底层三要素",
            "body": ["① 持久锚点：Goal + GOALS.md，为 AI 提供不会漂移的目标",
                     "② 验收关卡：里程碑审计 + review，多层验证防止偏差累积",
                     "③ 状态外置：简报 + 仪表盘，项目状态不依赖线程上下文",
                     "适用边界：仅当涌现新信息 / 多块并行 / 多环境验证时投入产出比最高"],
            "footer_takeaway": ""},
        "kept_on_slide": ["action_title", "3 elements", "适用边界"],
        "compression_rationale": ["三要素原样保留；适用边界独立强调。"],
        "compressed": [], "moved_to_notes": []
    },
    "visual_asset_strategy": {"asset_need": "none", "asset_type": "none", "placement": "none",
        "reason": "三支柱本身是视觉。"},
    "layout_reason": "PageMode: rational\nPurpose: structure\nInformationAnchor: 三要素\nReason: 3 个同级要素用三支柱。"
})

# P18 结语 - L15 行动召唤
pages.append(L15_closing("page_18",
    "模型负责智能，开发者负责引导智能锚定目标",
    "AI 时代的新型项目管理模式",
    "起点：下次启动长周期任务时，先写一份 GOALS.md，再让 AI 采访你。"))

doc = {
    "project": "AI长周期任务协作方法论",
    "generated_at": "2026-07-21T00:00:00Z",
    "layout_version": 1,
    "pages": pages,
}

(DECK / "_internal/01_layout_plan/layout_plan.json").write_text(
    json.dumps(doc, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(f"Generated layout_plan.json with {len(pages)} pages")
