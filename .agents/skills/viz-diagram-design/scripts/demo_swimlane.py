#!/usr/bin/env python3
"""Demo: 泳道图 — 供应商准入流程，跨部门协作。"""

from diagram_renderer import Diagram, Node, Lane

d = Diagram(
    title="供应商准入流程",
    subtitle="跨部门协作 · 金条业务线",
    width=1000,
    height=520,
)

# 定义泳道
lanes = [
    Lane("biz",  "业务组"),
    Lane("ops",  "运营组"),
    Lane("legal","法务组"),
    Lane("tech", "技术组"),
]
for lane in lanes:
    d.add_lane(lane)

# 定义节点（按泳道分组）
nodes_data = [
    # (id, label, type, tag, sublabel, lane_id)
    ("apply",    "供应商申请",  "input",   "REQ",  "资质材料",  "biz"),
    ("review",   "初审",       "backend", "CHK",  "资质核验",  "biz"),
    ("audit",    "运营审核",   "backend", "OPS",  "产能评估",  "ops"),
    ("legal_r",  "法务审查",   "security","LEGAL","合同条款",  "legal"),
    ("contract", "合同签署",   "focal",   "SIGN", "电子签章",  "legal"),
    ("onboard",  "系统接入",   "backend", "TECH", "API · 测试","tech"),
    ("go_live",  "正式上线",   "focal",   "LIVE", "生产环境",  "tech"),
]
for nid, label, ntype, tag, sublabel, lane_id in nodes_data:
    d.add_node(Node(nid, label, ntype, tag=tag, sublabel=sublabel))
    d.assign_to_lane(nid, lane_id)

d.swimlane_layout(gap_x=40, node_width=145, node_height=56)

# 连线
d.add_edge("apply",    "review",   "提交",    "default")
d.add_edge("review",   "audit",    "通过",    "accent")
d.add_edge("audit",    "legal_r",  "合规",    "default")
d.add_edge("legal_r",  "contract", "审核",    "accent")
d.add_edge("contract", "onboard",  "签署",    "default")
d.add_edge("onboard",  "go_live",  "验收",    "accent")
d.add_edge("review",   "go_live",  "加急",    "dashed")
d.add_edge("apply",    "go_live",  "异常",    "link")

out = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/viz-diagram-design/scripts/demo-swimlane.html"
d.save(out)
print(f"✓ {out}")
