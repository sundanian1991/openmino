#!/usr/bin/env python3
"""Demo: 流程图 — 决策菱形 + 条件分支。"""

from diagram_renderer import Diagram, Node

d = Diagram(title="供应商准入决策", subtitle="资质评分自动路由", width=960, height=480)

d.add_node(Node("start",  "提交申请",     "input",   tag="IN",  row=0, col=1))
d.add_node(Node("score",  "资质评分",     "backend", tag="CORE",row=1, col=1, sublabel="自动评分系统"))
d.add_node(Node("check",  "评分 ≥ 60?",  "focal",   tag="?",   row=2, col=1, shape="diamond"))
d.add_node(Node("pass",   "通过 → 准入",  "backend", tag="OK",  row=3, col=2))
d.add_node(Node("review", "人工复核",     "security",tag="REV", row=3, col=1))
d.add_node(Node("reject", "拒绝 → 驳回",  "optional",tag="NO",  row=3, col=0))

d.auto_layout(gap_x=40, gap_y=36, node_width=140, node_height=52)
d.height = 520

d.add_edge("start",  "score", "提交",    "default")
d.add_edge("score",  "check", "反馈",    "accent")
d.add_edge("check",  "pass",  "是 ≥60",  "accent")
d.add_edge("check",  "review","否 <60",  "default")
d.add_edge("review", "reject","驳回",    "dashed")
d.add_edge("review", "pass",  "人工通过", "link")

out = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/viz-diagram-design/scripts/demo-flowchart.html"
d.save(out)
print(f"✓ {out}")
