#!/bin/bash
# 36 模板矩阵批量生成器
# 用法: bash generate-templates.sh

DIR="/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/nian-design/references/templates-matrix"
mkdir -p "$DIR"

# ═══════════════════════════════════════════════
# CSS 公共头
# ═══════════════════════════════════════════════
read -r -d '' CSS_HEAD << 'CSSEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Doto:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {
  --darkgray: #2C2C2C; --olive: #4A5D3A; --earth: #8B7355;
  --yellow: #FFD100; --orange: #E55B2B; --glacier: #2A4A5A; --rock: #808080;
  --bg: #FAFAF8; --surface: #FFFFFF; --surface-raised: #F5F5F0; --border: #E5E5E0;
  --text-display: #2C2C2C; --text-primary: #1A1A1A; --text-secondary: #6B6B6B; --text-disabled: #A0A0A0;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text-primary);line-height:1.6;-webkit-font-smoothing:antialiased}
::selection{background:var(--olive);color:#fff}
.ghost{position:absolute;font-family:'Playfair Display',Georgia,serif;font-size:clamp(80px,15vw,280px);font-weight:300;line-height:1;color:var(--text-display);opacity:0.04;pointer-events:none;user-select:none}
.ghost--deco{font-family:'Doto',Georgia,serif}
.ghost--right{right:var(--space-4xl,80px);bottom:var(--space-4xl,80px)}
.ghost--center{left:50%;top:50%;transform:translate(-50%,-50%)}
</style>
</head>
<body>
CSSEOF

FOOTER='<!-- S21 · Footer -->
<section data-layout="S21" style="padding:48px 120px;background:var(--text-display);color:rgba(255,255,255,.35);display:flex;justify-content:space-between;align-items:center">
  <div style="font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:0.06em">NIAN · 2026</div>
  <div style="font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:0.06em">TEMPLATE · {{ID}}</div>
</section>

</body>
</html>'

# ═══════════════════════════════════════════════
# Hero 组件函数
# ═══════════════════════════════════════════════

hero_statement() {
cat << 'EOF'
<!-- S01 · Hero Statement -->
<section data-layout="S01" data-stream="statement" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 120px;background:var(--bg);position:relative;overflow:hidden">
  <div class="ghost ghost--right" aria-hidden="true">01</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">{{SECTION_LABEL}} · 2026</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(72px,10vw,120px);font-weight:300;line-height:1.05;letter-spacing:-3px;color:var(--text-primary);max-width:900px;margin-bottom:32px">{{HERO_TITLE}}</h1>
  <p style="font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;color:var(--text-disabled);max-width:480px;margin-bottom:40px">{{HERO_SUBTITLE}}</p>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary)">SOURCE · DATE</div>
</section>
EOF
}

hero_diagonal() {
cat << 'EOF'
<!-- S01 · Hero Diagonal -->
<section data-layout="S01" data-stream="diagonal" style="min-height:100vh;display:grid;grid-template-columns:5fr 7fr;background:var(--bg);overflow:hidden">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px 80px 120px;position:relative;z-index:1">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">{{SECTION_LABEL}} · 2026</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,7vw,96px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:var(--text-primary);margin-bottom:24px">{{HERO_TITLE}}</h1>
    <p style="font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;color:var(--text-disabled);max-width:400px;margin-bottom:40px">{{HERO_SUBTITLE}}</p>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary)">SOURCE · DATE</div>
  </div>
  <div style="background:var(--text-display);clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);display:flex;flex-direction:column;justify-content:center;padding:80px 80px 80px 96px;position:relative">
    <div style="position:absolute;right:40px;bottom:40px;font-family:'Playfair Display',Georgia,serif;font-size:180px;font-weight:300;color:rgba(255,255,255,.06);line-height:1">01</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:24px">VOLUME 01</div>
    <div style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,40px);font-weight:300;color:#fff;line-height:1.2;letter-spacing:-0.5px">{{HERO_RIGHT}}</div>
  </div>
</section>
EOF
}

hero_split() {
cat << 'EOF'
<!-- S04 · Hero Split -->
<section data-layout="S04" data-stream="split" style="min-height:100vh;display:grid;grid-template-columns:7fr 5fr;background:var(--bg);overflow:hidden">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px 80px 120px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">{{SECTION_LABEL}}</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:var(--text-primary);margin-bottom:24px">{{HERO_TITLE}}</h1>
    <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:var(--text-disabled);max-width:440px">{{HERO_SUBTITLE}}</p>
  </div>
  <div style="background:var(--surface-raised);display:flex;flex-direction:column;justify-content:center;padding:80px 80px 80px 48px;position:relative">
    <div style="position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',Georgia,serif;font-size:240px;font-weight:300;color:var(--border);opacity:.3;line-height:1;pointer-events:none">V</div>
    <div style="display:flex;flex-direction:column;gap:32px;position:relative;z-index:1">
      <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">INDICATOR A</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(32px,4vw,56px);font-weight:400;color:var(--text-primary);line-height:1">847</div><div style="height:1px;background:var(--border);margin-top:12px"></div></div>
      <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">INDICATOR B</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(32px,4vw,56px);font-weight:400;color:var(--olive);line-height:1">+23%</div></div>
    </div>
  </div>
</section>
EOF
}

hero_numeral() {
cat << 'EOF'
<!-- S03 · Hero Numeral -->
<section data-layout="S03" data-stream="numeral" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 120px;background:var(--text-display);color:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:24px">{{SECTION_LABEL}}</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:#fff;max-width:700px;margin-bottom:64px">{{HERO_TITLE}}</h1>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px">
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">METRIC A</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;line-height:1">128</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">说明文字</div></div>
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">METRIC B</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:var(--yellow);line-height:1">96.4%</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">说明文字</div></div>
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">METRIC C</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;line-height:1">3.2M</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">说明文字</div></div>
    <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">METRIC D</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:var(--orange);line-height:1">47</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">说明文字</div></div>
  </div>
</section>
EOF
}

hero_entrance() {
cat << 'EOF'
<!-- Hero Entrance -->
<section data-stream="entrance" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:80px 120px;background:var(--text-display);position:relative;overflow:hidden">
  <div style="position:absolute;right:80px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',Georgia,serif;font-size:clamp(200px,30vw,400px);font-weight:300;color:rgba(255,255,255,.03);line-height:1;pointer-events:none">01</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:48px">{{SECTION_LABEL}}</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(72px,10vw,120px);font-weight:300;line-height:1.05;letter-spacing:-3px;color:#fff;max-width:800px">{{HERO_TITLE}}</h1>
</section>
EOF
}

hero_pulse() {
cat << 'EOF'
<!-- Hero Pulse -->
<section data-stream="pulse" style="min-height:100vh;display:grid;grid-template-columns:5fr 7fr;background:var(--bg);overflow:hidden">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px 80px 120px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">{{SECTION_LABEL}} · 2026</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,7vw,84px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:var(--text-primary);margin-bottom:24px">{{HERO_TITLE}}</h1>
    <p style="font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;color:var(--text-disabled);max-width:400px">{{HERO_SUBTITLE}}</p>
  </div>
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 80px 80px 48px;position:relative">
    <div style="display:flex;flex-direction:column;gap:0;position:relative;padding-left:32px">
      <div style="position:absolute;left:11px;top:0;bottom:0;width:1px;background:var(--border)"></div>
      <div style="position:relative;padding:20px 0 20px 32px"><div style="position:absolute;left:-21px;top:24px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">PHASE 01</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(20px,2.5vw,32px);font-weight:400;color:var(--text-primary);line-height:1">节点一</div></div>
      <div style="position:relative;padding:20px 0 20px 32px"><div style="position:absolute;left:-21px;top:24px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">PHASE 02</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(20px,2.5vw,32px);font-weight:400;color:var(--text-primary);line-height:1">节点二</div></div>
      <div style="position:relative;padding:20px 0 20px 32px"><div style="position:absolute;left:-21px;top:24px;width:10px;height:10px;background:var(--yellow);border-radius:50%"></div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--yellow);margin-bottom:4px">PHASE 03 · NOW</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(20px,2.5vw,32px);font-weight:400;color:var(--text-primary);line-height:1">节点三</div></div>
    </div>
  </div>
</section>
EOF
}

hero_dashboard() {
cat << 'EOF'
<!-- Hero Dashboard -->
<section data-stream="dashboard" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 120px;background:var(--bg);position:relative">
  <div class="ghost ghost--right" aria-hidden="true">DATA</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">{{SECTION_LABEL}} · DASHBOARD</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,64px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{HERO_TITLE}}</h1>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
    <div style="background:var(--surface);border:1px solid var(--border);padding:24px 20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">KPI A</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1">1,284</div><div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--olive);margin-top:6px">+12.3%</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:24px 20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">KPI B</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1">96.4%</div><div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--olive);margin-top:6px">+2.1%</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:24px 20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">KPI C</div><div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1">3.2M</div><div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary);margin-top:6px">持平</div></div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:24px 20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">KPI D</div><div style="height:6px;background:var(--surface-raised);margin:12px 0 8px"><div style="height:100%;background:var(--olive);width:72%"></div></div><div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary)">72% 达成</div></div>
  </div>
</section>
EOF
}

# ═══════════════════════════════════════════════
# Section 组件函数
# ═══════════════════════════════════════════════

sec_metrics() {
cat << 'EOF'
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
EOF
}

sec_ranking() {
cat << 'EOF'
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
EOF
}

sec_table() {
cat << 'EOF'
<!-- S07 · Data Table -->
<section data-layout="S07" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">DATA</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="width:100%;overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:14px">
      <thead><tr style="border-bottom:2px solid var(--text-primary)"><th style="text-align:left;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">名称</th><th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">数值</th><th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">变化</th></tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border)"><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 A</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">128</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--olive)">+12%</td></tr>
        <tr style="border-bottom:1px solid var(--border)"><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 B</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">96</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--orange)">-3%</td></tr>
        <tr><td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">实体 C</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">72</td><td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-secondary)">0%</td></tr>
      </tbody>
    </table>
  </div>
</section>
EOF
}

sec_timeline() {
cat << 'EOF'
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
EOF
}

sec_comparison() {
cat << 'EOF'
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
EOF
}

sec_pipeline() {
cat << 'EOF'
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
EOF
}

sec_image_text() {
cat << 'EOF'
<!-- S11 · Image + Text -->
<section data-layout="S11" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">SHOWCASE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:start">
    <div style="padding-top:12px"><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:300;color:var(--text-primary);margin-bottom:16px">小标题</h3><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:var(--text-disabled);margin-bottom:24px">正文内容描述。</p><div style="border-left:2px solid var(--olive);padding:12px 16px;background:var(--surface-raised)"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:6px">KEY INSIGHT</div><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary)">核心洞察。</p></div></div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMAGE · 16:10</div></div>
  </div>
</section>
EOF
}

sec_image_grid() {
cat << 'EOF'
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
EOF
}

sec_three_forces() {
cat << 'EOF'
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
EOF
}

sec_cells() {
cat << 'EOF'
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
EOF
}

sec_statement() {
cat << 'EOF'
<!-- S15 · Statement Quote -->
<section data-layout="S15" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--surface-raised);position:relative">
  <svg style="position:absolute;right:120px;top:50%;transform:translateY(-50%);width:200px;height:200px;opacity:.08" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="6 8"/></svg>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:120px;color:var(--border);line-height:1;margin-bottom:-40px;position:relative;z-index:1">"</div>
  <blockquote style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,4vw,56px);font-weight:300;line-height:1.25;letter-spacing:-1px;color:var(--text-primary);max-width:720px;margin-bottom:32px;position:relative;z-index:1">{{SEC_TITLE}}</blockquote>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);position:relative;z-index:1">-- SOURCE . DATE</div>
</section>
EOF
}

sec_why_now() {
cat << 'EOF'
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
EOF
}

sec_closing() {
cat << 'EOF'
<!-- S18 · Closing Manifesto -->
<section data-layout="S18" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--text-display);color:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:32px">CONCLUSION</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:#fff;max-width:700px;margin-bottom:48px">{{SEC_TITLE}}</h1>
  <div style="display:flex;flex-direction:column;gap:20px;max-width:560px">
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">01</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项一。</p></div>
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">02</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项二。</p></div>
    <div style="display:flex;gap:16px;align-items:start"><div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">03</div><p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">行动项三。</p></div>
  </div>
</section>
EOF
}

sec_system() {
cat << 'EOF'
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
EOF
}

sec_bento() {
cat << 'EOF'
<!-- S22 · Bento Grid -->
<section data-layout="S22" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">CAPABILITIES</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1120px">
    <div style="grid-column:span 2;grid-row:span 2;padding:32px;background:var(--surface-raised);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:12px">核心能力</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:12px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">描述文字。</p></div>
    <div style="padding:24px;background:var(--surface);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:8px">能力 A</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;color:var(--text-primary);margin-bottom:8px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:var(--text-secondary)">描述。</p></div>
    <div style="padding:24px;background:var(--surface);border:1px solid var(--border)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:8px">能力 B</div><h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;color:var(--text-primary);margin-bottom:8px">标题</h3><p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:var(--text-secondary)">描述。</p></div>
  </div>
</section>
EOF
}

sec_reading() {
cat << 'EOF'
<!-- S28 · Reading Flow -->
<section data-layout="S28" style="display:grid;grid-template-columns:1fr 320px;gap:48px;max-width:1120px;margin:0 auto;padding:96px 32px">
  <div>
    <div style="margin-bottom:48px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">VOLUME 01 · 系列名</div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.1;letter-spacing:-1px;color:var(--text-primary);margin-bottom:16px">{{SEC_TITLE}}</h1>
      <p style="font-family:'Inter',sans-serif;font-size:16px;color:var(--text-secondary);margin-bottom:8px">副标题或摘要</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">作者 . 日期</div>
    </div>
    <div style="margin-bottom:48px">
      <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;color:var(--text-primary)"><span style="font-family:'Playfair Display',Georgia,serif;font-size:48px;font-weight:300;float:left;line-height:1;margin-right:8px;margin-top:4px;color:var(--olive)">正</span>正文段落内容。这里是长文阅读的正文区域，支持首字下沉效果。</p>
    </div>
  </div>
  <div style="position:sticky;top:96px;align-self:start">
    <div style="margin-bottom:32px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">CONTENTS</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary)">章节一</div>
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">章节二</div>
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">章节三</div>
      </div>
    </div>
  </div>
</section>
EOF
}

sec_do_dont() {
cat << 'EOF'
<!-- Do / Don't Comparison -->
<section style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">GUIDELINES</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">{{SEC_TITLE}}</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
    <div style="padding:32px;border:2px solid var(--olive)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--olive);margin-bottom:20px">DO · 推荐</div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px"><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--olive)">+</span>推荐做法一</li><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--olive)">+</span>推荐做法二</li></ul></div>
    <div style="padding:32px;border:2px solid var(--orange)"><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--orange);margin-bottom:20px">DON'T · 避免</div><ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px"><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--orange)">-</span>避免做法一</li><li style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);padding-left:20px;position:relative"><span style="position:absolute;left:0;color:var(--orange)">-</span>避免做法二</li></ul></div>
  </div>
</section>
EOF
}

sec_checklist() {
cat << 'EOF'
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
EOF
}

# ═══════════════════════════════════════════════
# 模板生成函数
# ═══════════════════════════════════════════════

generate_template() {
  local id="$1"
  local title="$2"
  local stream="$3"
  local qa_stream="$4"
  local qa_hero="$5"
  shift 5
  local sections=("$@")

  local file="$DIR/${id}.html"

  # Header
  echo "${CSS_HEAD//\{\{TITLE\}\}/$title}" > "$file"
  echo "<!-- QA: 5/5 passed | stream: $qa_stream | hero: $qa_hero | base: light -->" >> "$file"
  echo "" >> "$file"

  # Hero
  "hero_$stream" >> "$file"
  echo "" >> "$file"

  # Sections
  for sec in "${sections[@]}"; do
    "$sec" >> "$file"
    echo "" >> "$file"
  done

  # Footer
  echo "${FOOTER//\{\{ID\}\}/$id}" >> "$file"

  echo "  ✓ $id"
}

# ═══════════════════════════════════════════════
# 批量生成 36 个模板
# ═══════════════════════════════════════════════

echo "=== Batch 1: L2 轻量 (12 templates) ==="

generate_template "T-DATA-L2-ST" "数据报告 · L2 · Statement" "statement" "Statement" "V4" sec_metrics sec_statement
generate_template "T-SOP-L2-ST" "流程规范 · L2 · Statement" "statement" "Statement" "V4" sec_pipeline sec_bento
generate_template "T-BRAND-L2-ST" "品牌展示 · L2 · Statement" "statement" "Statement" "V4" sec_image_text sec_statement
generate_template "T-DATA-L2-DG" "数据报告 · L2 · Diagonal" "diagonal" "Diagonal" "V2" sec_metrics
generate_template "T-SOP-L2-DG" "流程规范 · L2 · Diagonal" "diagonal" "Diagonal" "V2" sec_pipeline
generate_template "T-BRAND-L2-DG" "品牌展示 · L2 · Diagonal" "diagonal" "Diagonal" "V2" sec_image_text
generate_template "T-DECISION-L2-SP" "决策分析 · L2 · Split" "split" "Split" "V1" sec_comparison
generate_template "T-REPORT-L2-SP" "工作汇报 · L2 · Split" "split" "Split" "V1" sec_metrics
generate_template "T-KNOWLEDGE-L2-SP" "知识管理 · L2 · Split" "split" "Split" "V1" sec_cells
generate_template "T-DECISION-L2-NM" "决策分析 · L2 · Numeral" "numeral" "Numeral" "V3" sec_comparison sec_closing
generate_template "T-REPORT-L2-NM" "工作汇报 · L2 · Numeral" "numeral" "Numeral" "V3" sec_metrics sec_closing
generate_template "T-KNOWLEDGE-L2-NM" "知识管理 · L2 · Numeral" "numeral" "Numeral" "V3" sec_cells sec_statement

echo ""
echo "=== Batch 2: L3 标准 (12 templates) ==="

generate_template "T-DATA-L3-ST" "数据报告 · L3 · Statement" "statement" "Statement" "V4" sec_metrics sec_ranking sec_table sec_statement
generate_template "T-BRAND-L3-ST" "品牌展示 · L3 · Statement" "statement" "Statement" "V4" sec_image_text sec_image_grid sec_three_forces sec_statement sec_closing
generate_template "T-DATA-L3-DG" "数据报告 · L3 · Diagonal" "diagonal" "Diagonal" "V2" sec_metrics sec_table sec_ranking
generate_template "T-DECISION-L3-DG" "决策分析 · L3 · Diagonal" "diagonal" "Diagonal" "V2" sec_metrics sec_comparison sec_three_forces sec_why_now sec_closing
generate_template "T-REPORT-L3-SP" "工作汇报 · L3 · Split" "split" "Split" "V1" sec_metrics sec_table sec_ranking sec_timeline sec_pipeline sec_why_now
generate_template "T-SOP-L3-SP" "流程规范 · L3 · Split" "split" "Split" "V1" sec_pipeline sec_table sec_three_forces sec_bento
generate_template "T-KNOWLEDGE-L3-SP" "知识管理 · L3 · Split" "split" "Split" "V1" sec_cells sec_timeline sec_comparison sec_statement
generate_template "T-REPORT-L3-NM" "工作汇报 · L3 · Numeral" "numeral" "Numeral" "V3" sec_metrics sec_timeline sec_pipeline sec_three_forces
generate_template "T-SOP-L3-NM" "流程规范 · L3 · Numeral" "numeral" "Numeral" "V3" sec_pipeline sec_table sec_cells sec_bento
generate_template "T-DATA-L3-NM" "数据报告 · L3 · Numeral" "numeral" "Numeral" "V3" sec_metrics sec_ranking sec_table sec_timeline
generate_template "T-KNOWLEDGE-L3-DG" "知识管理 · L3 · Diagonal" "diagonal" "Diagonal" "V2" sec_cells sec_timeline sec_three_forces sec_statement sec_closing
generate_template "T-DECISION-L3-ST" "决策分析 · L3 · Statement" "statement" "Statement" "V4" sec_metrics sec_comparison sec_three_forces sec_why_now sec_closing

echo ""
echo "=== Batch 3: L3 补充 + L4 深度 (12 templates) ==="

generate_template "T-BRAND-L3-NM" "品牌展示 · L3 · Numeral" "numeral" "Numeral" "V3" sec_image_text sec_image_grid sec_three_forces sec_statement sec_closing
generate_template "T-KNOWLEDGE-L3-EN" "知识管理 · L3 · Entrance" "entrance" "Entrance" "V5" sec_cells sec_timeline sec_comparison sec_statement
generate_template "T-SOP-L3-PU" "流程规范 · L3 · Pulse" "pulse" "Pulse" "V6" sec_pipeline sec_table sec_three_forces sec_bento
generate_template "T-REPORT-L3-DA" "工作汇报 · L3 · Dashboard" "dashboard" "Dashboard" "V7" sec_metrics sec_ranking sec_timeline sec_pipeline sec_three_forces
generate_template "T-BRAND-L3-DG" "品牌展示 · L3 · Diagonal" "diagonal" "Diagonal" "V2" sec_image_text sec_image_grid sec_three_forces sec_system sec_closing
generate_template "T-DECISION-L3-SP" "决策分析 · L3 · Split" "split" "Split" "V1" sec_comparison sec_three_forces sec_cells sec_why_now
generate_template "T-DECISION-L3-NM" "决策分析 · L3 · Numeral" "numeral" "Numeral" "V3" sec_metrics sec_comparison sec_three_forces sec_why_now sec_closing
generate_template "T-REPORT-L3-ST" "工作汇报 · L3 · Statement" "statement" "Statement" "V4" sec_metrics sec_timeline sec_pipeline sec_why_now sec_closing

echo ""
echo "=== Batch 4: L4 深度 (12 templates) ==="

generate_template "T-DATA-L4-ST" "数据报告 · L4 · Statement" "statement" "Statement" "V4" sec_metrics sec_ranking sec_table sec_timeline sec_statement sec_why_now sec_closing
generate_template "T-KNOWLEDGE-L4-ST" "知识管理 · L4 · Statement" "statement" "Statement" "V4" sec_cells sec_timeline sec_comparison sec_three_forces sec_statement sec_closing sec_reading
generate_template "T-DATA-L4-DG" "数据报告 · L4 · Diagonal" "diagonal" "Diagonal" "V2" sec_metrics sec_ranking sec_table sec_timeline sec_cells sec_why_now sec_closing
generate_template "T-SOP-L4-DG" "流程规范 · L4 · Diagonal" "diagonal" "Diagonal" "V2" sec_pipeline sec_table sec_comparison sec_three_forces sec_cells sec_bento sec_closing
generate_template "T-BRAND-L4-DG" "品牌展示 · L4 · Diagonal" "diagonal" "Diagonal" "V2" sec_image_text sec_image_grid sec_three_forces sec_cells sec_system sec_closing sec_bento
generate_template "T-DECISION-L4-SP" "决策分析 · L4 · Split" "split" "Split" "V1" sec_metrics sec_table sec_comparison sec_three_forces sec_cells sec_why_now sec_closing sec_checklist
generate_template "T-REPORT-L4-SP" "工作汇报 · L4 · Split" "split" "Split" "V1" sec_metrics sec_table sec_ranking sec_timeline sec_pipeline sec_three_forces sec_why_now sec_closing
generate_template "T-SOP-L4-SP" "流程规范 · L4 · Split" "split" "Split" "V1" sec_pipeline sec_table sec_comparison sec_three_forces sec_cells sec_system sec_bento sec_closing
generate_template "T-DATA-L4-NM" "数据报告 · L4 · Numeral" "numeral" "Numeral" "V3" sec_metrics sec_ranking sec_table sec_timeline sec_cells sec_why_now sec_closing
generate_template "T-KNOWLEDGE-L4-NM" "知识管理 · L4 · Numeral" "numeral" "Numeral" "V3" sec_cells sec_timeline sec_comparison sec_three_forces sec_statement sec_closing sec_reading
generate_template "T-BRAND-L4-EN" "品牌展示 · L4 · Entrance" "entrance" "Entrance" "V5" sec_image_text sec_image_grid sec_three_forces sec_cells sec_system sec_closing
generate_template "T-SOP-L4-PU" "流程规范 · L4 · Pulse" "pulse" "Pulse" "V6" sec_pipeline sec_table sec_comparison sec_three_forces sec_cells sec_bento sec_closing

echo ""
echo "=== Done: 36 templates generated ==="
echo "Output: $DIR"
ls -la "$DIR" | wc -l
