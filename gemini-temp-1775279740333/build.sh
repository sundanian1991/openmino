#!/bin/bash
set -e

OUTPUT="刘乾坤带节奏事件分析.pptx"

echo "Building PPT: $OUTPUT"

# ==================== SLIDE 1: HERO ====================
echo "[S1] Hero Slide"
officecli create "$OUTPUT"
officecli add "$OUTPUT" "/" --type slide
officecli set "$OUTPUT" "/slide[1]" --prop background=1a1f2e

# Scene actors - all on one line
officecli add "$OUTPUT" "/slide[1]" --type shape --prop name=!!ring-accent --prop preset=ellipse --prop fill=3b82f6 --prop opacity=0.15 --prop x=2cm --prop y=2cm --prop width=12cm --prop height=12cm
officecli add "$OUTPUT" "/slide[1]" --type shape --prop name=!!dot-main --prop preset=ellipse --prop fill=60a5fa --prop opacity=0.8 --prop x=28cm --prop y=4cm --prop width=1.5cm --prop height=1.5cm
officecli add "$OUTPUT" "/slide[1]" --type shape --prop name=!!line-top --prop preset=rect --prop fill=60a5fa --prop opacity=0.6 --prop x=25cm --prop y=2cm --prop width=6cm --prop height=0.3cm

# Content
officecli add "$OUTPUT" "/slide[1]" --type shape --prop name=#s1-title --prop text="带节奏事件分析" --prop font="Microsoft YaHei" --prop size=72 --prop bold=true --prop color=ffffff --prop x=8cm --prop y=6cm --prop width=26cm --prop height=4cm --prop fill=none
officecli add "$OUTPUT" "/slide[1]" --type shape --prop name=#s1-subtitle --prop text="刘乾坤开门红激励预警行为深度拆解" --prop font="Microsoft YaHei" --prop size=32 --prop color=94a3b8 --prop x=8cm --prop y=10.5cm --prop width=26cm --prop height=2cm --prop fill=none

echo "  Slide 1 complete"

# ==================== SLIDE 2: STATEMENT ====================
echo "[S2] Statement Slide"
officecli add "$OUTPUT" "/" --from "/slide[1]"
officecli set "$OUTPUT" "/slide[2]" --prop transition=morph

# Ghost content
officecli set "$OUTPUT" "/slide[2]/shape[4]" --prop x=36cm
officecli set "$OUTPUT" "/slide[2]/shape[5]" --prop x=36cm

# Move actors
officecli set "$OUTPUT" "/slide[2]/shape[1]" --prop x=24cm --prop y=1cm
officecli set "$OUTPUT" "/slide[2]/shape[2]" --prop x=4cm --prop y=15cm
officecli set "$OUTPUT" "/slide[2]/shape[3]" --prop x=2cm --prop y=8cm

# New content
officecli add "$OUTPUT" "/slide[2]" --type shape --prop name=#s2-title --prop text="核心发现：这不是正常的预警方式" --prop font="Microsoft YaHei" --prop size=54 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=3cm --prop width=30cm --prop height=3cm --prop fill=none
officecli add "$OUTPUT" "/slide[2]" --type shape --prop name=#s2-judgment --prop text="表演型预警 + 转移视线 + 保护关系网" --prop font="Microsoft YaHei" --prop size=40 --prop bold=true --prop color=60a5fa --prop x=6cm --prop y=6.5cm --prop width=30cm --prop height=2.5cm --prop fill=none
officecli add "$OUTPUT" "/slide[2]" --type shape --prop name=#s2-principles --prop text="不接靶子  回归根本原因  保护安全感  用数据说话" --prop font="Microsoft YaHei" --prop size=28 --prop color=94a3b8 --prop x=6cm --prop y=10cm --prop width=30cm --prop height=2cm --prop fill=none

echo "  Slide 2 complete"

# ==================== SLIDE 3: PILLARS ====================
echo "[S3] Pillars Slide"
officecli add "$OUTPUT" "/" --from "/slide[2]"
officecli set "$OUTPUT" "/slide[3]" --prop transition=morph

# Ghost content
officecli set "$OUTPUT" "/slide[3]/shape[4]" --prop x=36cm
officecli set "$OUTPUT" "/slide[3]/shape[5]" --prop x=36cm
officecli set "$OUTPUT" "/slide[3]/shape[6]" --prop x=36cm

# Move actors
officecli set "$OUTPUT" "/slide[3]/shape[1]" --prop x=1cm --prop y=14cm
officecli set "$OUTPUT" "/slide[3]/shape[2]" --prop x=30cm --prop y=2cm
officecli set "$OUTPUT" "/slide[3]/shape[3]" --prop x=28cm --prop y=16cm

# Title
officecli add "$OUTPUT" "/slide[3]" --type shape --prop name=#s3-title --prop text="行为模式拆解：四重组合拳" --prop font="Microsoft YaHei" --prop size=44 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=1.5cm --prop width=28cm --prop height=2.5cm --prop fill=none

echo "  Slide 3 complete"

# ==================== SLIDE 4: EVIDENCE ====================
echo "[S4] Evidence Slide"
officecli add "$OUTPUT" "/" --from "/slide[3]"
officecli set "$OUTPUT" "/slide[4]" --prop transition=morph

# Move actors
officecli set "$OUTPUT" "/slide[4]/shape[1]" --prop x=26cm --prop y=12cm
officecli set "$OUTPUT" "/slide[4]/shape[2]" --prop x=3cm --prop y=3cm
officecli set "$OUTPUT" "/slide[4]/shape[3]" --prop x=1cm --prop y=16cm

# Title
officecli add "$OUTPUT" "/slide[4]" --type shape --prop name=#s4-title --prop text="数据对比：真实 vs 夸张" --prop font="Microsoft YaHei" --prop size=44 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=1.5cm --prop width=28cm --prop height=2.5cm --prop fill=none

echo "  Slide 4 complete"

# ==================== SLIDE 5: IMPACT ====================
echo "[S5] Impact Slide"
officecli add "$OUTPUT" "/" --from "/slide[4]"
officecli set "$OUTPUT" "/slide[5]" --prop transition=morph

# Move actors
officecli set "$OUTPUT" "/slide[5]/shape[1]" --prop x=4cm --prop y=1cm
officecli set "$OUTPUT" "/slide[5]/shape[2]" --prop x=29cm --prop y=14cm
officecli set "$OUTPUT" "/slide[5]/shape[3]" --prop x=26cm --prop y=3cm

# Title
officecli add "$OUTPUT" "/slide[5]" --type shape --prop name=#s5-title --prop text="影响评估：各方受影响程度" --prop font="Microsoft YaHei" --prop size=44 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=1.5cm --prop width=28cm --prop height=2.5cm --prop fill=none

echo "  Slide 5 complete"

# ==================== SLIDE 6: STRATEGY ====================
echo "[S6] Strategy Slide"
officecli add "$OUTPUT" "/" --from "/slide[5]"
officecli set "$OUTPUT" "/slide[6]" --prop transition=morph

# Move actors
officecli set "$OUTPUT" "/slide[6]/shape[1]" --prop x=20cm --prop y=14cm
officecli set "$OUTPUT" "/slide[6]/shape[2]" --prop x=2cm --prop y=2cm
officecli set "$OUTPUT" "/slide[6]/shape[3]" --prop x=28cm --prop y=8cm

# Title
officecli add "$OUTPUT" "/slide[6]" --type shape --prop name=#s6-title --prop text="应对策略：REACT 框架" --prop font="Microsoft YaHei" --prop size=44 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=1.5cm --prop width=28cm --prop height=2.5cm --prop fill=none

echo "  Slide 6 complete"

# ==================== SLIDE 7: CTA ====================
echo "[S7] CTA Slide"
officecli add "$OUTPUT" "/" --from "/slide[6]"
officecli set "$OUTPUT" "/slide[7]" --prop transition=morph

# Move actors
officecli set "$OUTPUT" "/slide[7]/shape[1]" --prop x=15cm --prop y=7cm
officecli set "$OUTPUT" "/slide[7]/shape[2]" --prop x=3cm --prop y=15cm
officecli set "$OUTPUT" "/slide[7]/shape[3]" --prop x=28cm --prop y=2cm

# Content
officecli add "$OUTPUT" "/slide[7]" --type shape --prop name=#s7-conclusion --prop text="核心结论" --prop font="Microsoft YaHei" --prop size=36 --prop bold=true --prop color=60a5fa --prop x=6cm --prop y=2.5cm --prop width=28cm --prop height=2cm --prop fill=none
officecli add "$OUTPUT" "/slide[7]" --type shape --prop name=#s7-statement --prop text="表演型预警 + 转移视线 + 保护关系网" --prop font="Microsoft YaHei" --prop size=40 --prop bold=true --prop color=ffffff --prop x=6cm --prop y=5cm --prop width=28cm --prop height=2.5cm --prop fill=none

echo "  Slide 7 complete"

echo ""
echo "========================================="
echo "Build complete!"
echo "File: $OUTPUT"
echo "========================================="
