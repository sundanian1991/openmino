#!/usr/bin/env python3
"""Demo: 层叠图 — 技术架构分层。"""

from diagram_renderer import Diagram

d = Diagram(title="系统技术架构", subtitle="金条结算平台 · 六层架构", width=800, height=480)

d.layer_stack([
    {"label": "接入层",     "sublabel": "API Gateway · 负载均衡",  "type": "security"},
    {"label": "应用层",     "sublabel": "结算引擎 · 因子计算",     "type": "focal"},
    {"label": "服务层",     "sublabel": "供应商 · 合同 · 对账",    "type": "backend"},
    {"label": "数据层",     "sublabel": "MySQL · ClickHouse",      "type": "store"},
    {"label": "基础设施",   "sublabel": "K8s · Docker · 监控",     "type": "external"},
])

out = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/viz-diagram-design/scripts/demo-layers.html"
d.save(out)
print(f"✓ {out}")
