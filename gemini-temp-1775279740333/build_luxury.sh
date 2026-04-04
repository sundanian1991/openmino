#!/bin/bash
set -e

OUTPUT="/Users/sundanian/Documents/projects/ai-agents/my-agent/gemini-temp-1775279740333/带节奏事件分析.pptx"

echo "Building: 带节奏事件分析 (Dark Luxury Minimal)"
rm -f "$OUTPUT"
officecli create "$OUTPUT"

# Colors - Black & Gold luxury palette
BG=111111
GOLD=D4AF37
WHITE=FFFFFF
GRAY1=888888
GRAY2=555555
GRAY3=333333
GRAY4=CCCCCC

# Off-canvas position
OFFSCREEN=36cm

# ============================================
# SLIDE 1 - HERO
# ============================================
echo "Building Slide 1: Hero..."

officecli add "$OUTPUT" '/' --type slide --prop layout=blank --prop background=$BG

# Scene actors: golden line + title
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!deco-line" \
  --prop fill=$GOLD \
  --prop x=4cm \
  --prop y=8.5cm \
  --prop width=3cm \
  --prop height=0.08cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!main-title" \
  --prop text="带节奏事件分析" \
  --prop font="Helvetica" \
  --prop size=56 \
  --prop bold=true \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x=4cm \
  --prop y=9cm \
  --prop width=25cm \
  --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!sub-title" \
  --prop text="刘乾坤开门红激励预警行为拆解" \
  --prop font="Helvetica" \
  --prop size=18 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x=4cm \
  --prop y=12.5cm \
  --prop width=25cm \
  --prop height=1cm

# Pre-create all other actors (hidden off-canvas)

# Slide 2 actors - Statement
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!statement-label" \
  --prop text="核心发现" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=0cm \
  --prop width=10cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!statement-main" \
  --prop text="这不是正常的工作方式" \
  --prop font="Helvetica" \
  --prop size=42 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=1cm \
  --prop width=25cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!statement-sub" \
  --prop text="表演型预警 + 转移视线 + 保护关系网" \
  --prop font="Helvetica" \
  --prop size=20 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=2cm \
  --prop width=25cm \
  --prop height=1.5cm

# Slide 3 actors - Pillars (4 pillars)
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!pillar-title" \
  --prop text="行为模式拆解" \
  --prop font="Helvetica" \
  --prop size=28 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=3cm \
  --prop width=25cm \
  --prop height=1.5cm

# Pillar 1: 选择性攻击
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p1-num" \
  --prop text="01" \
  --prop font="Helvetica" \
  --prop size=48 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=4cm \
  --prop width=4cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p1-title" \
  --prop text="选择性攻击" \
  --prop font="Helvetica" \
  --prop size=18 \
  --prop bold=true \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=5cm \
  --prop width=8cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p1-desc" \
  --prop text="只攻击服务组，不攻击策略组" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY1 \
  --prop lineSpacing=1.6 \
  --prop valign=top \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=6cm \
  --prop width=7cm \
  --prop height=3cm

# Pillar 2: 转移视线
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p2-num" \
  --prop text="02" \
  --prop font="Helvetica" \
  --prop size=48 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=7cm \
  --prop width=4cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p2-title" \
  --prop text="转移视线" \
  --prop font="Helvetica" \
  --prop size=18 \
  --prop bold=true \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=8cm \
  --prop width=8cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p2-desc" \
  --prop text="把交接期信息真空转移到激励问题" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY1 \
  --prop lineSpacing=1.6 \
  --prop valign=top \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=9cm \
  --prop width=7cm \
  --prop height=3cm

# Pillar 3: 道德绑架
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p3-num" \
  --prop text="03" \
  --prop font="Helvetica" \
  --prop size=48 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=10cm \
  --prop width=4cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p3-title" \
  --prop text="道德绑架" \
  --prop font="Helvetica" \
  --prop size=18 \
  --prop bold=true \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=11cm \
  --prop width=8cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p3-desc" \
  --prop text="1400工人、5000家庭制造道德压力" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY1 \
  --prop lineSpacing=1.6 \
  --prop valign=top \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=12cm \
  --prop width=7cm \
  --prop height=3cm

# Pillar 4: 群里放炮
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p4-num" \
  --prop text="04" \
  --prop font="Helvetica" \
  --prop size=48 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=13cm \
  --prop width=4cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p4-title" \
  --prop text="群里放炮" \
  --prop font="Helvetica" \
  --prop size=18 \
  --prop bold=true \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=14cm \
  --prop width=8cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!p4-desc" \
  --prop text="不私下沟通，直接群聊表演" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY1 \
  --prop lineSpacing=1.6 \
  --prop valign=top \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=15cm \
  --prop width=7cm \
  --prop height=3cm

# Slide 4 actors - Evidence
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!ev-title" \
  --prop text="数据对比" \
  --prop font="Helvetica" \
  --prop size=28 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=16cm \
  --prop width=25cm \
  --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!ev-subtitle" \
  --prop text="真实 vs 夸张" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=17cm \
  --prop width=25cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!ev-claim1" \
  --prop text="刘乾坤：大量流失、拿不到钱" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=18cm \
  --prop width=12cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!ev-fact1" \
  --prop text="实际：头部个别问题，60-70%可达" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=19cm \
  --prop width=15cm \
  --prop height=1cm

# Slide 5 actors - Impact
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!impact-title" \
  --prop text="影响评估" \
  --prop font="Helvetica" \
  --prop size=28 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=20cm \
  --prop width=25cm \
  --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!impact-item1" \
  --prop text="团队安全感 — 高影响" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=21cm \
  --prop width=15cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!impact-item2" \
  --prop text="李吉斌 — 高影响" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=22cm \
  --prop width=15cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!impact-item3" \
  --prop text="王易人 — 中等影响" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=23cm \
  --prop width=15cm \
  --prop height=1cm

# Slide 6 actors - Strategy
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-title" \
  --prop text="应对策略" \
  --prop font="Helvetica" \
  --prop size=28 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=24cm \
  --prop width=25cm \
  --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-subtitle" \
  --prop text="REACT 框架" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GOLD \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=25cm \
  --prop width=25cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-r" \
  --prop text="R — 承认情绪" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=26cm \
  --prop width=10cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-e" \
  --prop text="E — 回归根本原因" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=27cm \
  --prop width=15cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-a" \
  --prop text="A — 展示行动" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=28cm \
  --prop width=10cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-c" \
  --prop text="C — 明确边界" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=29cm \
  --prop width=10cm \
  --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!strategy-t" \
  --prop text="T — 建议私下对齐" \
  --prop font="Helvetica" \
  --prop size=16 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=30cm \
  --prop width=15cm \
  --prop height=1cm

# Slide 7 actors - CTA
officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!cta-title" \
  --prop text="核心结论" \
  --prop font="Helvetica" \
  --prop size=36 \
  --prop color=$WHITE \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=31cm \
  --prop width=25cm \
  --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!cta-line1" \
  --prop text="不接靶子，回归根本原因" \
  --prop font="Helvetica" \
  --prop size=20 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=32cm \
  --prop width=25cm \
  --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!cta-line2" \
  --prop text="拒绝道德绑架，保护安全感" \
  --prop font="Helvetica" \
  --prop size=20 \
  --prop color=$GRAY1 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=33cm \
  --prop width=25cm \
  --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape \
  --prop "name=!!cta-date" \
  --prop text="2026年4月" \
  --prop font="Helvetica" \
  --prop size=14 \
  --prop color=$GRAY2 \
  --prop fill=none \
  --prop x="${OFFSCREEN}" \
  --prop y=34cm \
  --prop width=10cm \
  --prop height=1cm

# ============================================
# SLIDE 2 - STATEMENT
# ============================================
echo "Building Slide 2: Statement..."

officecli add "$OUTPUT" '/' --from '/slide[1]'
officecli set "$OUTPUT" '/slide[2]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[2]/shape[1]' --prop x=4cm --prop y=6cm --prop width=1.5cm

# Hide hero elements
officecli set "$OUTPUT" '/slide[2]/shape[2]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[2]/shape[3]' --prop x="${OFFSCREEN}"

# Show statement elements
officecli set "$OUTPUT" '/slide[2]/shape[4]' --prop x=4cm --prop y=4cm
officecli set "$OUTPUT" '/slide[2]/shape[5]' --prop x=4cm --prop y=6cm
officecli set "$OUTPUT" '/slide[2]/shape[6]' --prop x=4cm --prop y=9cm

# ============================================
# SLIDE 3 - PILLARS
# ============================================
echo "Building Slide 3: Pillars..."

officecli add "$OUTPUT" '/' --from '/slide[2]'
officecli set "$OUTPUT" '/slide[3]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[3]/shape[1]' --prop x=4cm --prop y=3.5cm --prop width=4cm

# Hide statement elements
officecli set "$OUTPUT" '/slide[3]/shape[4]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[5]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[6]' --prop x="${OFFSCREEN}"

# Show pillar title
officecli set "$OUTPUT" '/slide[3]/shape[7]' --prop x=4cm --prop y=2cm

# Show 4 pillars in a row
officecli set "$OUTPUT" '/slide[3]/shape[8]' --prop x=4cm --prop y=5cm
officecli set "$OUTPUT" '/slide[3]/shape[9]' --prop x=4cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[10]' --prop x=4cm --prop y=7.5cm

officecli set "$OUTPUT" '/slide[3]/shape[11]' --prop x=11cm --prop y=5cm
officecli set "$OUTPUT" '/slide[3]/shape[12]' --prop x=11cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[13]' --prop x=11cm --prop y=7.5cm

officecli set "$OUTPUT" '/slide[3]/shape[14]' --prop x=18cm --prop y=5cm
officecli set "$OUTPUT" '/slide[3]/shape[15]' --prop x=18cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[16]' --prop x=18cm --prop y=7.5cm

officecli set "$OUTPUT" '/slide[3]/shape[17]' --prop x=25cm --prop y=5cm
officecli set "$OUTPUT" '/slide[3]/shape[18]' --prop x=25cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[19]' --prop x=25cm --prop y=7.5cm

# ============================================
# SLIDE 4 - EVIDENCE
# ============================================
echo "Building Slide 4: Evidence..."

officecli add "$OUTPUT" '/' --from '/slide[3]'
officecli set "$OUTPUT" '/slide[4]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[4]/shape[1]' --prop x=4cm --prop y=10cm --prop width=2cm

# Hide pillars
for i in 7 8 9 10 11 12 13 14 15 16 17 18 19; do
  officecli set "$OUTPUT" "/slide[4]/shape[$i]" --prop x="${OFFSCREEN}"
done

# Show evidence title
officecli set "$OUTPUT" '/slide[4]/shape[20]' --prop x=4cm --prop y=2cm
officecli set "$OUTPUT" '/slide[4]/shape[21]' --prop x=4cm --prop y=3.5cm

# Show evidence items
officecli set "$OUTPUT" '/slide[4]/shape[22]' --prop x=4cm --prop y=5.5cm
officecli set "$OUTPUT" '/slide[4]/shape[23]' --prop x=4cm --prop y=7cm

# ============================================
# SLIDE 5 - IMPACT
# ============================================
echo "Building Slide 5: Impact..."

officecli add "$OUTPUT" '/' --from '/slide[4]'
officecli set "$OUTPUT" '/slide[5]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[5]/shape[1]' --prop x=4cm --prop y=5cm --prop width=1.5cm

# Hide evidence
officecli set "$OUTPUT" '/slide[5]/shape[20]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[21]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[22]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[23]' --prop x="${OFFSCREEN}"

# Show impact title
officecli set "$OUTPUT" '/slide[5]/shape[24]' --prop x=4cm --prop y=2cm

# Show impact items
officecli set "$OUTPUT" '/slide[5]/shape[25]' --prop x=4cm --prop y=5cm
officecli set "$OUTPUT" '/slide[5]/shape[26]' --prop x=4cm --prop y=7cm
officecli set "$OUTPUT" '/slide[5]/shape[27]' --prop x=4cm --prop y=9cm

# ============================================
# SLIDE 6 - STRATEGY
# ============================================
echo "Building Slide 6: Strategy..."

officecli add "$OUTPUT" '/' --from '/slide[5]'
officecli set "$OUTPUT" '/slide[6]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[6]/shape[1]' --prop x=4cm --prop y=12cm --prop width=2.5cm

# Hide impact
officecli set "$OUTPUT" '/slide[6]/shape[24]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[6]/shape[25]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[6]/shape[26]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[6]/shape[27]' --prop x="${OFFSCREEN}"

# Show strategy title
officecli set "$OUTPUT" '/slide[6]/shape[28]' --prop x=4cm --prop y=2cm
officecli set "$OUTPUT" '/slide[6]/shape[29]' --prop x=4cm --prop y=3.5cm

# Show REACT items
officecli set "$OUTPUT" '/slide[6]/shape[30]' --prop x=4cm --prop y=5.5cm
officecli set "$OUTPUT" '/slide[6]/shape[31]' --prop x=4cm --prop y=7cm
officecli set "$OUTPUT" '/slide[6]/shape[32]' --prop x=4cm --prop y=8.5cm
officecli set "$OUTPUT" '/slide[6]/shape[33]' --prop x=4cm --prop y=10cm
officecli set "$OUTPUT" '/slide[6]/shape[34]' --prop x=4cm --prop y=11.5cm

# ============================================
# SLIDE 7 - CTA
# ============================================
echo "Building Slide 7: CTA..."

officecli add "$OUTPUT" '/' --from '/slide[6]'
officecli set "$OUTPUT" '/slide[7]' --prop transition=morph

# Move decoration line
officecli set "$OUTPUT" '/slide[7]/shape[1]' --prop x=4cm --prop y=8cm --prop width=2cm

# Hide strategy
officecli set "$OUTPUT" '/slide[7]/shape[28]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[29]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[30]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[31]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[32]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[33]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[7]/shape[34]' --prop x="${OFFSCREEN}"

# Show CTA elements
officecli set "$OUTPUT" '/slide[7]/shape[35]' --prop x=4cm --prop y=6cm
officecli set "$OUTPUT" '/slide[7]/shape[36]' --prop x=4cm --prop y=9cm
officecli set "$OUTPUT" '/slide[7]/shape[37]' --prop x=4cm --prop y=11cm
officecli set "$OUTPUT" '/slide[7]/shape[38]' --prop x=4cm --prop y=14cm

# ============================================
# FINAL VALIDATION
# ============================================
officecli validate "$OUTPUT"
officecli view "$OUTPUT" outline

echo "Build complete: $OUTPUT"
