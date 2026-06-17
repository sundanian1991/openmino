#!/usr/bin/env python3
"""复刻 #1: MCP 架构图 — modelcontextprotocol.io 上的 Host/Client/Server 架构。"""

from diagram_renderer import Diagram, Node

d = Diagram("Model Context Protocol 架构", "Host · Client · Server 三层协议", width=1000, height=520)

# Row 0: Host 层
d.add_node(Node("host",     "MCP Host",           "focal",   tag="HOST", row=0, col=0, sublabel="Claude Desktop / Code"))
d.add_node(Node("client",   "MCP Client",         "backend", tag="CLI",  row=0, col=1, sublabel="JSON-RPC 2.0"))
d.add_node(Node("server",   "MCP Server",         "backend", tag="SRV",  row=0, col=2, sublabel="工具 · 资源 · 提示"))

# Row 1: 协议层
d.add_node(Node("data",     "数据层",              "store",   tag="DATA", row=1, col=1, sublabel="生命周期 · 原语 · 通知"))
d.add_node(Node("transport","传输层",              "store",   tag="TRAN",row=1, col=2, sublabel="STDIO · Streamable HTTP"))

# Row 2: 外部系统
d.add_node(Node("stdin",    "STDIO 传输",          "external",tag="LOCAL",row=2, col=0, sublabel="本地进程 IPC"))
d.add_node(Node("http",     "HTTP 传输",           "external",tag="HTTP", row=2, col=1, sublabel="远程 · OAuth 2.1"))
d.add_node(Node("external", "外部数据源",          "input",   tag="SRC", row=2, col=2, sublabel="DB/API/文件系统"))

d.auto_layout(gap_x=60, gap_y=36, node_width=160, node_height=52)

# 连线
d.add_edge("host",     "client",   "初始化",  "accent")
d.add_edge("client",   "server",   "连接",   "default")
d.add_edge("server",   "data",     "协商",   "default")
d.add_edge("data",     "transport","封装",   "default")
d.add_edge("transport","stdin",    "本地",   "default")
d.add_edge("transport","http",     "远程",   "link")
d.add_edge("http",     "external", "访问",   "dashed")
d.add_edge("stdin",    "external", "访问",   "dashed")

d.save("recreate-mcp-architecture.html")
print("✓ recreate-mcp-architecture.html")
