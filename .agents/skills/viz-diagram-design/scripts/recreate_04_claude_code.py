#!/usr/bin/env python3
"""复刻 #4: Claude Code 内部架构 — CLI 工具 → Agent Loop 分层。"""

from diagram_renderer import Diagram

d = Diagram("Claude Code 内部架构", "CLI → Bootstrap → UI → Agent Loop 四层", width=900, height=520)

d.layer_stack([
    {"label": "CLI 入口层",      "sublabel": "cli.tsx · mcp.ts · server.ts · sdk types",                  "type": "security"},
    {"label": "Bootstrap 层",    "sublabel": "init · config · hooks · plugins · skills · telemetry",        "type": "backend"},
    {"label": "UI 层 (Ink/React)","sublabel": "REPL · Messages · PromptInput · StatusLine · Spinner",      "type": "focal"},
    {"label": "Agent 循环层",    "sublabel": "Agent · Tools · Bash · File · Grep · Edit · Loop",           "type": "backend"},
    {"label": "存储/上下文层",   "sublabel": "Memory · CLAUDE.md · Sessions · Workspace",                   "type": "store"},
    {"label": "安全权限层",      "sublabel": "Permissions · Sandbox · Hooks · Approval Gates",              "type": "external"},
])

d.save("recreate-claude-code-arch.html")
print("✓ recreate-claude-code-arch.html")
