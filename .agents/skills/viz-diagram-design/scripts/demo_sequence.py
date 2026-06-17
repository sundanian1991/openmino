#!/usr/bin/env python3
"""Demo: 时序图 — 供应商结算月度流程。"""

from diagram_renderer import Diagram

d = Diagram(title="月度结算时序", subtitle="供应商结算系统 · 自动对账流程", width=800, height=620)

d.sequence_layout(
    lifelines=[
        {"id": "biz",  "label": "业务系统",  "type": "backend"},
        {"id": "calc", "label": "结算引擎",  "type": "focal"},
        {"id": "sap",  "label": "SAP",       "type": "store"},
        {"id": "bank", "label": "银行接口",   "type": "external"},
    ],
    messages=[
        {"src": "biz",  "dst": "calc", "label": "触发月度结算", "style": "default"},
        {"src": "calc", "dst": "calc", "label": "计算因子分解", "style": "default"},
        {"src": "calc", "dst": "sap",  "label": "同步科目余额", "style": "accent"},
        {"src": "sap",  "dst": "calc", "label": "返回余额数据", "style": "default"},
        {"src": "calc", "dst": "bank", "label": "发起付款指令", "style": "accent"},
        {"src": "bank", "dst": "calc", "label": "回执确认",     "style": "dashed"},
        {"src": "calc", "dst": "biz",  "label": "结算完成通知",  "style": "link"},
    ],
)

out = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/viz-diagram-design/scripts/demo-sequence.html"
d.save(out)
print(f"✓ {out}")
