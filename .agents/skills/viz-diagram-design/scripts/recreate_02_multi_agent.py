#!/usr/bin/env python3
"""复刻 #2: Multi-Agent 研究系统 — anthropic.com/engineering 编排模式。"""

from diagram_renderer import Diagram, Node, Lane

d = Diagram("Multi-Agent Research 系统", "Orchestrator-Worker 编排模式", width=1000, height=480)

# 定义泳道
lanes = [
    Lane("user",  "用户层"),
    Lane("lead",  "编排层 (Lead Researcher)"),
    Lane("agent", "执行层 (SubAgents)"),
    Lane("data",  "数据层"),
]
for lane in lanes:
    d.add_lane(lane)

nodes_data = [
    ("query",   "用户查询",     "input",   "Q",   "",                  "user"),
    ("plan",    "制定策略",     "focal",   "PLAN","分解 · 规划",        "lead"),
    ("decide",  "分配子任务",   "backend", "DIST","3-5 并行 SubAgent",  "lead"),
    ("sa1",     "SubAgent A",   "backend", "S.A", "方向 1",             "agent"),
    ("sa2",     "SubAgent B",   "backend", "S.B", "方向 2",             "agent"),
    ("sa3",     "SubAgent C",   "backend", "S.A", "方向 3",             "agent"),
    ("web",     "Web Search",   "external","WEB", "",                   "data"),
    ("memory",  "Memory",       "store",   "MEM", "",                   "data"),
]
for nid, label, ntype, tag, sublabel, lane_id in nodes_data:
    d.add_node(Node(nid, label, ntype, tag=tag, sublabel=sublabel))
    d.assign_to_lane(nid, lane_id)

d.swimlane_layout(gap_x=40, lane_height=90, node_width=130, node_height=48)

# 连线
d.add_edge("query", "plan",    "触发",  "accent")
d.add_edge("plan",  "decide",  "分析",  "accent")
d.add_edge("decide","sa1",     "委派",  "default")
d.add_edge("decide","sa2",     "委派",  "default")
d.add_edge("decide","sa3",     "委派",  "default")
d.add_edge("sa1",   "web",     "搜索",  "link")
d.add_edge("sa2",   "web",     "搜索",  "link")
d.add_edge("sa3",   "memory",  "存储",  "dashed")
d.add_edge("sa1",   "decide",  "回传",  "dashed")
d.add_edge("sa2",   "decide",  "回传",  "dashed")
d.add_edge("sa3",   "decide",  "回传",  "dashed")

d.save("recreate-multi-agent-research.html")
print("✓ recreate-multi-agent-research.html")
