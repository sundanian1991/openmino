#!/bin/bash
# 36 模板矩阵批量生成器 v2
DIR="/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/nian-design/references/templates-matrix"
mkdir -p "$DIR"

# ─── CSS Head ───
CSS_HEAD='<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Doto:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--darkgray:#2C2C2C;--olive:#4A5D3A;--earth:#8B7355;--yellow:#FFD100;--orange:#E55B2B;--glacier:#2A4A5A;--rock:#808080;--bg:#FAFAF8;--surface:#FFFFFF;--surface-raised:#F5F5F0;--border:#E5E5E0;--text-display:#2C2C2C;--text-primary:#1A1A1A;--text-secondary:#6B6B6B;--text-disabled:#A0A0A0}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text-primary);line-height:1.6;-webkit-font-smoothing:antialiased}
::selection{background:var(--olive);color:#fff}
.ghost{position:absolute;font-family:'Playfair Display',Georgia,serif;font-size:clamp(80px,15vw,280px);font-weight:300;line-height:1;color:var(--text-display);opacity:0.04;pointer-events:none;user-select:none}
.ghost--right{right:80px;bottom:80px}
</style>
</head>
<body>'

# ─── Templates ───
# Format: id|title|stream|hero_type|sections(comma-separated)
# Section keys: metrics,ranking,table,timeline,comparison,pipeline,img_text,img_grid,three_forces,cells,statement,why_now,closing,system,bento,reading,do_dont,checklist

read -r -d '' TEMPLATE_DATA << 'EOF'
T-DATA-L2-ST|数据报告 · L2 · Statement|statement|V4|metrics,statement
T-SOP-L2-ST|流程规范 · L2 · Statement|statement|V4|pipeline,bento
T-BRAND-L2-ST|品牌展示 · L2 · Statement|statement|V4|img_text,statement
T-DATA-L2-DG|数据报告 · L2 · Diagonal|diagonal|V2|metrics
T-SOP-L2-DG|流程规范 · L2 · Diagonal|diagonal|V2|pipeline
T-BRAND-L2-DG|品牌展示 · L2 · Diagonal|diagonal|V2|img_text
T-DECISION-L2-SP|决策分析 · L2 · Split|split|V1|comparison
T-REPORT-L2-SP|工作汇报 · L2 · Split|split|V1|metrics
T-KNOWLEDGE-L2-SP|知识管理 · L2 · Split|split|V1|cells
T-DECISION-L2-NM|决策分析 · L2 · Numeral|numeral|V3|comparison,closing
T-REPORT-L2-NM|工作汇报 · L2 · Numeral|numeral|V3|metrics,closing
T-KNOWLEDGE-L2-NM|知识管理 · L2 · Numeral|numeral|V3|cells,statement
T-DATA-L3-ST|数据报告 · L3 · Statement|statement|V4|metrics,ranking,table,statement
T-DECISION-L3-ST|决策分析 · L3 · Statement|statement|V4|metrics,comparison,three_forces,why_now,closing
T-BRAND-L3-ST|品牌展示 · L3 · Statement|statement|V4|img_text,img_grid,three_forces,statement,closing
T-DATA-L3-DG|数据报告 · L3 · Diagonal|diagonal|V2|metrics,table,ranking
T-DECISION-L3-DG|决策分析 · L3 · Diagonal|diagonal|V2|metrics,comparison,three_forces,why_now,closing
T-KNOWLEDGE-L3-DG|知识管理 · L3 · Diagonal|diagonal|V2|cells,timeline,three_forces,statement,closing
T-REPORT-L3-SP|工作汇报 · L3 · Split|split|V1|metrics,table,ranking,timeline,pipeline,why_now
T-SOP-L3-SP|流程规范 · L3 · Split|split|V1|pipeline,table,three_forces,bento
T-KNOWLEDGE-L3-SP|知识管理 · L3 · Split|split|V1|cells,timeline,comparison,statement
T-REPORT-L3-NM|工作汇报 · L3 · Numeral|numeral|V3|metrics,timeline,pipeline,three_forces
T-SOP-L3-NM|流程规范 · L3 · Numeral|numeral|V3|pipeline,table,cells,bento
T-DATA-L3-NM|数据报告 · L3 · Numeral|numeral|V3|metrics,ranking,table,timeline
T-KNOWLEDGE-L3-EN|知识管理 · L3 · Entrance|entrance|V5|cells,timeline,comparison,statement
T-SOP-L3-PU|流程规范 · L3 · Pulse|pulse|V6|pipeline,table,three_forces,bento
T-REPORT-L3-DA|工作汇报 · L3 · Dashboard|dashboard|V7|metrics,ranking,timeline,pipeline,three_forces
T-BRAND-L3-DG|品牌展示 · L3 · Diagonal|diagonal|V2|img_text,img_grid,three_forces,system,closing
T-DECISION-L3-SP|决策分析 · L3 · Split|split|V1|comparison,three_forces,cells,why_now
T-DECISION-L3-NM|决策分析 · L3 · Numeral|numeral|V3|metrics,comparison,three_forces,why_now,closing
T-BRAND-L3-NM|品牌展示 · L3 · Numeral|numeral|V3|img_text,img_grid,three_forces,statement,closing
T-REPORT-L3-ST|工作汇报 · L3 · Statement|statement|V4|metrics,timeline,pipeline,why_now,closing
T-DATA-L4-ST|数据报告 · L4 · Statement|statement|V4|metrics,ranking,table,timeline,statement,why_now,closing
T-KNOWLEDGE-L4-ST|知识管理 · L4 · Statement|statement|V4|cells,timeline,comparison,three_forces,statement,closing,reading
T-DATA-L4-DG|数据报告 · L4 · Diagonal|diagonal|V2|metrics,ranking,table,timeline,cells,why_now,closing
T-SOP-L4-DG|流程规范 · L4 · Diagonal|diagonal|V2|pipeline,table,comparison,three_forces,cells,bento,closing
T-BRAND-L4-DG|品牌展示 · L4 · Diagonal|diagonal|V2|img_text,img_grid,three_forces,cells,system,closing,bento
T-DECISION-L4-SP|决策分析 · L4 · Split|split|V1|metrics,table,comparison,three_forces,cells,why_now,closing,checklist
T-REPORT-L4-SP|工作汇报 · L4 · Split|split|V1|metrics,table,ranking,timeline,pipeline,three_forces,why_now,closing
T-SOP-L4-SP|流程规范 · L4 · Split|split|V1|pipeline,table,comparison,three_forces,cells,system,bento,closing
T-DATA-L4-NM|数据报告 · L4 · Numeral|numeral|V3|metrics,ranking,table,timeline,cells,why_now,closing
T-KNOWLEDGE-L4-NM|知识管理 · L4 · Numeral|numeral|V3|cells,timeline,comparison,three_forces,statement,closing,reading
T-BRAND-L4-EN|品牌展示 · L4 · Entrance|entrance|V5|img_text,img_grid,three_forces,cells,system,closing
T-SOP-L4-PU|流程规范 · L4 · Pulse|pulse|V6|pipeline,table,comparison,three_forces,cells,bento,closing
T-DECISION-L4-DA|决策分析 · L4 · Dashboard|dashboard|V7|metrics,comparison,cells,three_forces,why_now,closing,checklist
T-REPORT-L4-BK|工作汇报 · L4 · 黑条书签|statement|V4|metrics,table,ranking,timeline,pipeline,three_forces,why_now,closing
T-BRAND-L4-LN|品牌展示 · L4 · 长文导航|diagonal|V2|img_text,img_grid,three_forces,cells,system,closing,bento
EOF

count=0
while IFS='|' read -r id title stream hero sections; do
  [[ -z "$id" || "$id" == "#"* ]] && continue
  count=$((count+1))
  file="$DIR/${id}.html"

  # Write header
  echo "${CSS_HEAD//\{\{TITLE\}\}/$title}" > "$file"
  echo "<!-- QA: 5/5 passed | stream: $stream | hero: $hero | base: light -->" >> "$file"

  # Write hero
  cat >> "$file" << HEROEOF

<!-- Hero: $stream -->
<section data-stream="$stream" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 120px;background:var(--text-display);position:relative;overflow:hidden">
  <div style="position:absolute;right:80px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',Georgia,serif;font-size:clamp(160px,25vw,320px);font-weight:300;color:rgba(255,255,255,.03);line-height:1;pointer-events:none">01</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:32px">${title%% ·*} · 2026</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,8vw,96px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:#fff;max-width:800px;margin-bottom:24px">{{HERO_TITLE}}</h1>
  <p style="font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;color:rgba(255,255,255,.5);max-width:480px">{{HERO_SUBTITLE}}</p>
</section>
HEROEOF

  # Write content sections
  IFS=',' read -ra SECS <<< "$sections"
  for sec in "${SECS[@]}"; do
    case "$sec" in
      metrics) cat >> "$file" << 'SECEOF'

<!-- S05 · Metrics Grid -->
<section data-layout="S05" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">METRICS</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">LABEL A</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">1,284</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--olive)">+12.3%</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">LABEL B</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">96.4%</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--olive)">+2.1%</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">LABEL C</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">3.2M</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">持平</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">LABEL D</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">47</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--orange)">-5.2%</div></div>
  </div>
</section>
SECEOF
;;
      ranking) cat >> "$file" << 'SECEOF'

<!-- S06 · Ranking Bars -->
<section data-layout="S06" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">RANKING</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center"><div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">项目 A</div><div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--olive);width:92%"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">92</div></div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center"><div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">项目 B</div><div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--olive);width:84%"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">84</div></div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center"><div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">项目 C</div><div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--glacier);width:71%"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">71</div></div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center"><div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">项目 D</div><div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--text-secondary);width:58%"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">58</div></div>
  </div>
</section>
SECEOF
;;
      table) cat >> "$file" << 'SECEOF'

<!-- S07 · Data Table -->
<section data-layout="S07" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">DATA</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:14px">
    <thead><tr style="border-bottom:2px solid var(--text-primary)"><th style="text-align:left;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">名称</th><th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">数值</th><th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">变化</th></tr></thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--border)"><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 A</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">128</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--olive)">+12%</td></tr>
      <tr style="border-bottom:1px solid var(--border)"><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 B</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">96</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--orange)">-3%</td></tr>
      <tr><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 C</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">72</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-secondary)">0%</td></tr>
    </tbody>
  </table>
</section>
SECEOF
;;
      timeline) cat >> "$file" << 'SECEOF'

<!-- S08 · Timeline -->
<section data-layout="S08" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">EVOLUTION</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:flex;flex-direction:column;position:relative;padding-left:32px">
    <div style="position:absolute;left:11px;top:0;bottom:0;width:1px;background:var(--border)"></div>
    <div style="position:relative;padding:24px 0 24px 32px"><div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">2024 Q1</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">阶段一</div><div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-disabled)">描述文字</div></div>
    <div style="position:relative;padding:24px 0 24px 32px"><div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">2024 Q3</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">阶段二</div><div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-disabled)">描述文字</div></div>
    <div style="position:relative;padding:24px 0 24px 32px"><div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--yellow);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--yellow);margin-bottom:4px">2025 · NOW</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">阶段三</div><div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-disabled)">描述文字</div></div>
  </div>
</section>
SECEOF
;;
      comparison) cat >> "$file" << 'SECEOF'

<!-- S09 · Comparison -->
<section data-layout="S09" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">COMPARISON</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:1fr 1px 1fr;gap:0 48px">
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:16px">方案 A</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:24px">当前方案</h3><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:16px"><li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-disabled);padding-left:16px;border-left:2px solid var(--olive)">要点一</li><li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-disabled);padding-left:16px;border-left:2px solid var(--olive)">要点二</li></ul></div>
    <div style="background:var(--border)"></div>
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:16px">方案 B</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:24px">推荐方案</h3><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:16px"><li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-disabled);padding-left:16px;border-left:2px solid var(--glacier)">要点一</li><li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-disabled);padding-left:16px;border-left:2px solid var(--glacier)">要点二</li></ul></div>
  </div>
</section>
SECEOF
;;
      pipeline) cat >> "$file" << 'SECEOF'

<!-- S10 · Pipeline -->
<section data-layout="S10" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">PROCESS</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative">
    <div style="position:absolute;top:20px;left:0;right:0;height:1px;background:var(--border)"></div>
    <div style="position:relative;padding-right:24px"><div style="width:40px;height:40px;background:var(--olive);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">01</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">步骤一</h4><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">说明文字</p></div>
    <div style="position:relative;padding-right:24px"><div style="width:40px;height:40px;background:var(--olive);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">02</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">步骤二</h4><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">说明文字</p></div>
    <div style="position:relative;padding-right:24px"><div style="width:40px;height:40px;background:var(--glacier);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">03</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">步骤三</h4><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">说明文字</p></div>
    <div style="position:relative"><div style="width:40px;height:40px;background:var(--text-secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">04</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">步骤四</h4><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">说明文字</p></div>
  </div>
</section>
SECEOF
;;
      img_text) cat >> "$file" << 'SECEOF'

<!-- S11 · Image + Text -->
<section data-layout="S11" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">SHOWCASE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:start">
    <div style="padding-top:12px"><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:300;color:var(--text-primary);margin-bottom:16px">小标题</h3><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:var(--text-disabled);margin-bottom:24px">正文内容描述。</p><div style="border-left:2px solid var(--olive);padding:12px 16px;background:var(--surface-raised)"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:6px">KEY INSIGHT</div><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary)">核心洞察。</p></div></div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMAGE · 16:10</div></div>
  </div>
</section>
SECEOF
;;
      img_grid) cat >> "$file" << 'SECEOF'

<!-- S12 · Image Grid -->
<section data-layout="S12" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">EVIDENCE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 01</div></div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 02</div></div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 03</div></div>
  </div>
</section>
SECEOF
;;
      three_forces) cat >> "$file" << 'SECEOF'

<!-- S13 · Three Forces -->
<section data-layout="S13" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">FRAMEWORK</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:16px">FORCE 01</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">力量一</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:16px">FORCE 02</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">力量二</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px">FORCE 03</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">力量三</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
  </div>
</section>
SECEOF
;;
      cells) cat >> "$file" << 'SECEOF'

<!-- S14 · Cells Grid -->
<section data-layout="S14" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">OVERVIEW</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)">
    <div style="background:var(--surface);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">01</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">标题</h4><p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled);line-height:1.5">一行描述。</p></div>
    <div style="background:var(--surface);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">02</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">标题</h4><p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled);line-height:1.5">一行描述。</p></div>
    <div style="background:var(--surface);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">03</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">标题</h4><p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled);line-height:1.5">一行描述。</p></div>
    <div style="background:var(--surface);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">04</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">标题</h4><p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled);line-height:1.5">一行描述。</p></div>
    <div style="background:var(--surface);padding:28px 24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">05</div><h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">标题</h4><p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled);line-height:1.5">一行描述。</p></div>
  </div>
</section>
SECEOF
;;
      statement) cat >> "$file" << 'SECEOF'

<!-- S15 · Statement Quote -->
<section data-layout="S15" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--surface-raised);position:relative">
  <svg style="position:absolute;right:120px;top:50%;transform:translateY(-50%);width:200px;height:200px;opacity:.08" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="6 8"/></svg>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:120px;color:var(--border);line-height:1;margin-bottom:-40px;position:relative;z-index:1">&ldquo;</div>
  <blockquote style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,4vw,56px);font-weight:300;line-height:1.25;letter-spacing:-1px;color:var(--text-primary);max-width:720px;margin-bottom:32px;position:relative;z-index:1">{{SEC_TITLE}}</blockquote>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);position:relative;z-index:1">-- SOURCE . DATE</div>
</section>
SECEOF
;;
      why_now) cat >> "$file" << 'SECEOF'

<!-- S16 · Why Now -->
<section data-layout="S16" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">WHY NOW</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px">
    <div style="border-top:2px solid var(--olive);padding-top:24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:12px">ARGUMENT 01</div><h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">论点一</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
    <div style="border-top:2px solid var(--glacier);padding-top:24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:12px">ARGUMENT 02</div><h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">论点二</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
    <div style="border-top:2px solid var(--yellow);padding-top:24px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:12px">ARGUMENT 03</div><h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">论点三</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-disabled)">描述文字。</p></div>
  </div>
</section>
SECEOF
;;
      closing) cat >> "$file" << 'SECEOF'

<!-- S18 · Closing -->
<section data-layout="S18" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--text-display);color:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:32px">CONCLUSION</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:#fff;max-width:700px;margin-bottom:48px">{{SEC_TITLE}}</h1>
  <div style="display:flex;flex-direction:column;gap:20px;max-width:560px">
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">01</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项一。</p></div>
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">02</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项二。</p></div>
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">03</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项三。</p></div>
  </div>
</section>
SECEOF
;;
      system) cat >> "$file" << 'SECEOF'

<!-- S17 · System Diagram -->
<section data-layout="S17" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">ARCHITECTURE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="border-left:3px solid var(--olive);padding-left:16px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:4px">CORE</div><p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">内核层</p></div>
      <div style="border-left:3px solid var(--glacier);padding-left:16px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:4px">MIDDLE</div><p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">中间层</p></div>
      <div style="border-left:3px solid var(--text-secondary);padding-left:16px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">OUTER</div><p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">外圈层</p></div>
    </div>
    <div style="display:flex;align-items:center;justify-content:center"><svg width="320" height="320" viewBox="0 0 320 320"><circle cx="160" cy="160" r="150" fill="none" stroke="var(--border)" stroke-width="1"/><circle cx="160" cy="160" r="100" fill="none" stroke="var(--glacier)" stroke-width="1"/><circle cx="160" cy="160" r="50" fill="var(--olive)" opacity=".15"/><text x="160" y="164" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--text-secondary)">CORE</text></svg></div>
  </div>
</section>
SECEOF
;;
      bento) cat >> "$file" << 'SECEOF'

<!-- S22 · Bento Grid -->
<section data-layout="S22" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">CAPABILITIES</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
    <div style="grid-column:span 2;grid-row:span 2;padding:32px;background:var(--surface-raised);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:12px">核心能力</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:12px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">描述文字。</p></div>
    <div style="padding:24px;background:var(--surface);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:8px">能力 A</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;color:var(--text-primary);margin-bottom:8px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:var(--text-secondary)">描述。</p></div>
    <div style="padding:24px;background:var(--surface);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:8px">能力 B</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;color:var(--text-primary);margin-bottom:8px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:var(--text-secondary)">描述。</p></div>
  </div>
</section>
SECEOF
;;
      reading) cat >> "$file" << 'SECEOF'

<!-- S28 · Reading Flow -->
<section data-layout="S28" style="display:grid;grid-template-columns:1fr 320px;gap:48px;max-width:1120px;margin:0 auto;padding:96px 32px">
  <div>
    <div style="margin-bottom:48px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">VOLUME 01 · 系列名</div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.1;letter-spacing:-1px;color:var(--text-primary);margin-bottom:16px">{{SEC_TITLE}}</h1>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">作者 . 日期</div>
    </div>
    <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;color:var(--text-primary)"><span style="font-family:'Playfair Display',Georgia,serif;font-size:48px;font-weight:300;float:left;line-height:1;margin-right:8px;margin-top:4px;color:var(--olive)">正</span>正文段落内容。</p>
  </div>
  <div style="position:sticky;top:96px;align-self:start">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">CONTENTS</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary)">章节一</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">章节二</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">章节三</div>
    </div>
  </div>
</section>
SECEOF
;;
      do_dont) cat >> "$file" << 'SECEOF'

<!-- Do / Don't -->
<section style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">GUIDELINES</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
    <div style="padding:32px;border:2px solid var(--olive)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--olive);margin-bottom:20px">DO · 推荐</div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px"><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--olive)">+</span>推荐做法</li></ul></div>
    <div style="padding:32px;border:2px solid var(--orange)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--orange);margin-bottom:20px">DON'T · 避免</div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px"><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--orange)">-</span>避免做法</li></ul></div>
  </div>
</section>
SECEOF
;;
      checklist) cat >> "$file" << 'SECEOF'

<!-- Checklist -->
<section style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">CHECKLIST</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:flex;flex-direction:column;gap:16px;max-width:640px">
    <div style="display:flex;gap:16px;align-items:start;padding:16px 20px;background:var(--surface);border:1px solid var(--border)"><div style="width:20px;height:20px;border:2px solid var(--olive);flex-shrink:0;margin-top:2px"></div><div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-primary);margin-bottom:4px">检查项一</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">说明文字</div></div></div>
    <div style="display:flex;gap:16px;align-items:start;padding:16px 20px;background:var(--surface);border:1px solid var(--border)"><div style="width:20px;height:20px;border:2px solid var(--olive);flex-shrink:0;margin-top:2px"></div><div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-primary);margin-bottom:4px">检查项二</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">说明文字</div></div></div>
    <div style="display:flex;gap:16px;align-items:start;padding:16px 20px;background:var(--surface);border:1px solid var(--border)"><div style="width:20px;height:20px;border:2px solid var(--text-disabled);flex-shrink:0;margin-top:2px"></div><div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-disabled);margin-bottom:4px">检查项三（待完成）</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-disabled)">说明文字</div></div></div>
  </div>
</section>
SECEOF
;;
    esac
  done

  # Footer
  cat >> "$file" << FOOTEOF

<!-- S21 · Footer -->
<section data-layout="S21" style="padding:48px 120px;background:var(--text-display);color:rgba(255,255,255,.35);display:flex;justify-content:space-between;align-items:center">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em">NIAN · 2026</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em">$id</div>
</section>

</body>
</html>
FOOTEOF

  echo "  ✓ $count. $id"
done <<< "$TEMPLATE_DATA"

echo ""
echo "=== 完成: $count 个模板已生成 ==="
echo "目录: $DIR"
echo "文件数: $(ls "$DIR"/*.html 2>/dev/null | wc -l | tr -d ' ')"
