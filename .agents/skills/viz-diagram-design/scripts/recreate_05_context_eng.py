#!/usr/bin/env python3
"""复刻 #5: 上下文工程流程 — 从用户查询到上下文构建的 pipeline。"""

from diagram_renderer import Diagram, Node

d = Diagram("Context Engineering 管线", "从原始查询到结构化的上下文构建", width=960, height=420)

# Row 0: 输入
d.add_node(Node("query",   "用户查询",       "input",   tag="Q",    row=0, col=1, sublabel="自然语言"))

# Row 1: 分析
d.add_node(Node("parse",   "意图解析",        "backend", tag="PARSE",row=1, col=0, sublabel="识别意图"))
d.add_node(Node("expand",  "上下文展开",      "backend", tag="CTX",  row=1, col=1, sublabel="补充背景"))
d.add_node(Node("struct",  "结构化映射",      "focal",   tag="MAP",  row=1, col=2, sublabel="工具 ↔ 资源"))

# Row 2: 检索与组合
d.add_node(Node("search",  "检索外部数据",    "external",tag="SRCH", row=2, col=0, sublabel="Web/DB/API"))
d.add_node(Node("mem",     "记忆 / 历史",     "store",   tag="MEM",  row=2, col=1, sublabel="会话记忆"))
d.add_node(Node("fuse",    "融合排序",        "backend", tag="FUSE", row=2, col=2, sublabel="重排 · 截断"))

# Row 3: 输出
d.add_node(Node("prompt",  "构建 Prompt",    "backend", tag="PROMPT",row=3, col=1, sublabel="系统提示 + 上下文"))

d.auto_layout(gap_x=50, gap_y=30, node_width=140, node_height=48)

d.add_edge("query",  "parse",  "输入",    "default")
d.add_edge("parse",  "expand", "分析",    "default")
d.add_edge("expand", "struct", "映射",    "accent")
d.add_edge("struct", "search", "触发检索","link")
d.add_edge("struct", "mem",    "关联记忆","dashed")
d.add_edge("search", "fuse",   "源数据",  "default")
d.add_edge("mem",    "fuse",   "历史",    "dashed")
d.add_edge("struct", "fuse",   "指令",    "default")
d.add_edge("fuse",   "prompt", "拼接",    "accent")

d.save("recreate-context-engineering.html")
print("✓ recreate-context-engineering.html")
