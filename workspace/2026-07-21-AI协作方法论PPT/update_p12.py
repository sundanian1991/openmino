#!/usr/bin/env python3
"""Update page_12: drop two-article framing, present complete methodology directly."""
import json
from pathlib import Path

DECK = Path(__file__).parent / "deck"

# === 1. Update page_content.json ===
content_path = DECK / "_internal/01_content/page_content.json"
content = json.loads(content_path.read_text(encoding="utf-8"))

new_p12 = {
    "page_key": "page_12",
    "source_page_id": "S4",
    "source_title": "完整方法论的核心共识",
    "action_title": "完整方法论的四个核心共识",
    "core_message": "能力基础（能跑 25 小时）+ 协作流程（怎么不翻车）= 完整方法论。四个核心共识贯穿其中。",
    "body_blocks": [
        {"type": "paragraph", "text": "能力已验证，关键在协作流程。完整方法论建立在四个核心共识之上："},
        {"type": "bullet_list", "items": [
            "持久 Goal：为 AI 提供不会漂移的锚点",
            "里程碑审计：为项目设置多层验收关卡",
            "状态外置：文件/仪表盘避免信息仅存在于线程上下文",
            "持续验证：每个里程碑都检查，不是最后才检查"
        ]}
    ],
    "tables": [],
    "speaker_notes": "收敛方法论到四个核心共识。能力是地基，协作流程是建筑，二者合一才是完整方法论。",
    "source_excerpt": "核心共识：持久 Goal / 里程碑审计 / 状态外置 / 持续验证。"
}
for i, p in enumerate(content["pages"]):
    if p["page_key"] == "page_12":
        content["pages"][i] = new_p12
        break
content_path.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")

# === 2. Update layout_plan.json ===
layout_path = DECK / "_internal/01_layout_plan/layout_plan.json"
layout = json.loads(layout_path.read_text(encoding="utf-8"))

new_layout_p12 = {
    "page_key": "page_12",
    "layout_id": "L12",
    "layout_usage": "adapted",
    "page_mode": "rational",
    "visual_density": "balanced",
    "grid": "2-2",
    "design_judgment": {
        "persuasion_action": "structure",
        "content_relation": "parallel_set",
        "information_anchor": "四个核心共识",
        "reader_takeaway": "方法论收敛到四点。"
    },
    "why_this_layout": "四个核心共识是同级要点，参考 L12 多支柱（4 卡 2×2 网格）。",
    "why_not_other_layouts": "不用对照表（不再比较两篇文章）；不用纯 bullet（弱化支柱感）。",
    "adaptation_note": "2×2 网格四卡 + 顶部主张 + 底部一句话总结。",
    "anti_laziness_check": "四卡不是任意 4 条 bullet，是完整方法论的四个支柱。",
    "wireframe": [
        {"label": "主张标题", "x": 140, "y": 120, "w": 1640, "h": 100, "zone": "header"},
        {"label": "四共识 2×2 网格", "x": 140, "y": 280, "w": 1640, "h": 560, "zone": "main_center"},
        {"label": "底部一句话总结", "x": 140, "y": 880, "w": 1640, "h": 100, "zone": "footer"}
    ],
    "copy_handling": {
        "final_on_slide": {
            "title": "完整方法论的四个核心共识",
            "subtitle": "能力基础 + 协作流程 = 完整方法论",
            "body": [
                "① 持久 Goal：为 AI 提供不会漂移的锚点",
                "② 里程碑审计：为项目设置多层验收关卡",
                "③ 状态外置：避免信息仅存在于线程上下文",
                "④ 持续验证：每个里程碑都检查，不是最后才检查"
            ],
            "footer_takeaway": "能力是地基，协作流程是建筑。"
        },
        "kept_on_slide": ["action_title", "4 共识"],
        "compression_rationale": ["四共识原样保留；去掉两篇文章作者归因。"],
        "compressed": ["原 7 行对比表删除"],
        "moved_to_notes": []
    },
    "visual_asset_strategy": {
        "asset_need": "none",
        "asset_type": "none",
        "placement": "none",
        "reason": "2×2 网格本身是视觉。"
    },
    "layout_reason": "PageMode: rational\nPurpose: structure\nInformationAnchor: 四个核心共识\nReadingPath: 主张 → 2×2 网格 → 底部总结\nReason: 4 个同级共识用 2×2 网格呈现。",
    "design_risks": [],
    "review_suggestions": []
}
for i, p in enumerate(layout["pages"]):
    if p["page_key"] == "page_12":
        layout["pages"][i] = new_layout_p12
        break
layout_path.write_text(json.dumps(layout, ensure_ascii=False, indent=2), encoding="utf-8")

print("Updated page_12:")
print("  content: 4 共识 (no article comparison)")
print("  layout: L12 2×2 grid (no compare table)")
