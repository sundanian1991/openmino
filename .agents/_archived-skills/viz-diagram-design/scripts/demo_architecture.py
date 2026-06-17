#!/usr/bin/env python3
"""Demo: 架构图 — 带正交路由、Legend、导出工具栏。"""

from diagram_renderer import Diagram, Node

d = Diagram(
    title="供应商结算系统架构",
    subtitle="金条业务线 · 数据流转与因子分解管线",
    width=1040, height=600,
)

# Row 0: 数据源
d.add_node(Node("excel",    "结算 Excel",     "input",   tag="SRC",    row=0, col=0, sublabel="26 职场 · 7 月"))
d.add_node(Node("ods",      "ODS 层",         "store",   tag="ODS",    row=0, col=1, sublabel="清洗 · 去重"))
d.add_node(Node("dw",       "DW 层",          "store",   tag="DW",     row=0, col=2, sublabel="维度建模"))

# Row 1: 因子计算
d.add_node(Node("factor",   "因子引擎",        "backend", tag="CALC",   row=1, col=0, sublabel="python · pandas"))
d.add_node(Node("dupont",   "杜邦分解",        "focal",   tag="L0",     row=1, col=1, sublabel="人均到手薪资"))
d.add_node(Node("ratio",    "比率计算",        "backend", tag="RATIO",  row=1, col=2, sublabel="转化·客单·净值"))

# Row 2: 输出
d.add_node(Node("html",     "HTML 看板",       "backend", tag="UI",    row=2, col=0, sublabel="内联 SVG · 交互"))
d.add_node(Node("report",   "分析报告",        "focal",   tag="PDF",   row=2, col=1, sublabel="6 章框架"))
d.add_node(Node("alert",    "异常预警",        "security",tag="MON",   row=2, col=2, sublabel="阈值 · 趋势"))

d.auto_layout(gap_x=60, gap_y=50, node_width=180, node_height=60)

# 连线
d.add_edge("excel",    "ods",     "ETL",        "default")
d.add_edge("ods",      "dw",      "CLEAN",      "default")
d.add_edge("dw",       "factor",  "EXTRACT",    "default")
d.add_edge("factor",   "dupont",  "DECOMPOSE",  "accent")
d.add_edge("factor",   "ratio",   "AGGREGATE",  "default")
d.add_edge("ratio",    "dupont",  "MERGE",      "default")
d.add_edge("dupont",   "html",    "RENDER",     "accent")
d.add_edge("dupont",   "report",  "EXPORT",     "default")
d.add_edge("ratio",    "alert",   "MONITOR",    "dashed")
d.add_edge("dw",       "alert",   "FEED",       "link")

out = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/viz-diagram-design/scripts/demo-architecture.html"
d.save(out)
print(f"✓ {out}")
