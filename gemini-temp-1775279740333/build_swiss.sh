#!/bin/bash
set -e

OUTPUT="/Users/sundanian/Documents/projects/ai-agents/my-agent/gemini-temp-1775279740333/带节奏事件分析_Swiss.pptx"

echo "Building: 带节奏事件分析 (Swiss System - Pure White)"
rm -f "$OUTPUT"
officecli create "$OUTPUT"

# Colors - Swiss System: White, Black, Red
BG=FFFFFF
INK=000000
FIRE=FF0000
GRAY=666666

OFFSCREEN=36cm

# ============================================
# SLIDE 1 - HERO
# ============================================
echo "Building Slide 1: Hero..."

officecli add "$OUTPUT" '/' --type slide --prop layout=blank --prop background=$BG

# Scene actor: rule line (thin, mid) - using rect for full width
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!rule" --prop fill=$INK --prop x=0cm --prop y=9.5cm --prop width=33.87cm --prop height=0.15cm

# Main title
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!title-main" --prop text="带节奏事件分析" --prop font="Helvetica" --prop size=72 --prop bold=true --prop color=$INK --prop fill=none --prop x=3cm --prop y=4cm --prop width=28cm --prop height=4cm

# Subtitle
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!title-sub" --prop text="刘乾坤开门红激励预警行为拆解" --prop font="Helvetica" --prop size=20 --prop color=$GRAY --prop fill=none --prop x=3cm --prop y=8.5cm --prop width=28cm --prop height=1.5cm

# Event context
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!hero-context" --prop text="2026年3月29日 | 群聊密集同步金条 | 预警激励问题" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop fill=none --prop x=3cm --prop y=14cm --prop width=28cm --prop height=1cm

# Core contradiction
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!hero-contradiction" --prop text="核心矛盾：激励是策略组定的，但只攻击服务组同事" --prop font="Helvetica" --prop size=16 --prop color=$FIRE --prop fill=none --prop x=3cm --prop y=15.5cm --prop width=28cm --prop height=1.5cm

# Pre-create Slide 2 elements (hidden off-canvas)
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-label" --prop text="核心发现" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=0cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-main" --prop text="这不是正常的工作方式" --prop font="Helvetica" --prop size=48 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=1cm --prop width=28cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-pattern1" --prop text="表演型预警" --prop font="Helvetica" --prop size=24 --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=5cm --prop width=10cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-pattern2" --prop text="转移视线" --prop font="Helvetica" --prop size=24 --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=7cm --prop width=10cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-pattern3" --prop text="保护关系网" --prop font="Helvetica" --prop size=24 --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=9cm --prop width=10cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s2-principles" --prop text="应对原则：不接靶子 | 回归根本原因 | 保护安全感 | 用数据说话" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=12cm --prop width=28cm --prop height=1cm

# Pre-create Slide 3 elements - Pillar 1
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-title" --prop text="行为模式拆解" --prop font="Helvetica" --prop size=36 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=0cm --prop width=20cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p1-num" --prop text="01" --prop font="Helvetica" --prop size=64 --prop bold=true --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=2cm --prop width=5cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p1-title" --prop text="选择性攻击" --prop font="Helvetica" --prop size=22 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p1-desc" --prop text="只攻击服务组同事，不攻击策略组（刘伟佳）" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop lineSpacing=1.5 --prop fill=none --prop x="${OFFSCREEN}" --prop y=4.5cm --prop width=8cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p1-evidence" --prop text="证据：密集同步金条时只@服务组，从不质疑策略制定方" --prop font="Helvetica" --prop size=11 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=7cm --prop width=8cm --prop height=2cm

# Pillar 2
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p2-num" --prop text="02" --prop font="Helvetica" --prop size=64 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=2cm --prop width=5cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p2-title" --prop text="转移视线" --prop font="Helvetica" --prop size=22 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p2-desc" --prop text="把交接期信息真空，转移到激励方案问题" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop lineSpacing=1.5 --prop fill=none --prop x="${OFFSCREEN}" --prop y=4.5cm --prop width=8cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p2-evidence" --prop text="真相：3.11-3.28交接期无数据支撑，3.29突然发现问题" --prop font="Helvetica" --prop size=11 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=7cm --prop width=8cm --prop height=2cm

# Pillar 3
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p3-num" --prop text="03" --prop font="Helvetica" --prop size=64 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=2cm --prop width=5cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p3-title" --prop text="道德绑架" --prop font="Helvetica" --prop size=22 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p3-desc" --prop text="用情绪数字制造压力：1400工人、5000家庭" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop lineSpacing=1.5 --prop fill=none --prop x="${OFFSCREEN}" --prop y=4.5cm --prop width=8cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p3-evidence" --prop text="问题：情绪化数字无法核实，制造紧迫感和道德压力" --prop font="Helvetica" --prop size=11 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=7cm --prop width=8cm --prop height=2cm

# Pillar 4
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p4-num" --prop text="04" --prop font="Helvetica" --prop size=64 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=2cm --prop width=5cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p4-title" --prop text="群里放炮" --prop font="Helvetica" --prop size=22 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p4-desc" --prop text="不私下沟通，直接在群聊公开表演" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop lineSpacing=1.5 --prop fill=none --prop x="${OFFSCREEN}" --prop y=4.5cm --prop width=8cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s3-p4-evidence" --prop text="反常：正常工作方式应先私下对齐，而非群聊施压" --prop font="Helvetica" --prop size=11 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=7cm --prop width=8cm --prop height=2cm

# Pre-create Slide 4 elements - Evidence
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-title" --prop text="数据对比：真实 vs 夸张" --prop font="Helvetica" --prop size=36 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=0cm --prop width=25cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-claim1" --prop text="刘乾坤：大量流失" --prop font="Helvetica" --prop size=16 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-fact1" --prop text="实际：头部个别问题" --prop font="Helvetica" --prop size=16 --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=4.5cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-claim2" --prop text="刘乾坤：拿不到钱" --prop font="Helvetica" --prop size=16 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=6.5cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-fact2" --prop text="实际：60-70%可以达成" --prop font="Helvetica" --prop size=16 --prop bold=true --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=8cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s4-note" --prop text="承认：激励目标确实偏高（3.1-3.10数据制定）" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=11cm --prop width=25cm --prop height=1cm

# Pre-create Slide 5 elements - Impact
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-title" --prop text="影响评估" --prop font="Helvetica" --prop size=36 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=0cm --prop width=20cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i1-name" --prop text="团队安全感" --prop font="Helvetica" --prop size=20 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i1-level" --prop text="高影响" --prop font="Helvetica" --prop size=16 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=4cm --prop width=6cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i1-desc" --prop text="被破坏，大家紧绷，影响长期协作氛围" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=5cm --prop width=15cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i2-name" --prop text="李吉斌" --prop font="Helvetica" --prop size=20 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=6.5cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i2-level" --prop text="高影响" --prop font="Helvetica" --prop size=16 --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=7.5cm --prop width=6cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i2-desc" --prop text="Q1责任确实在他，但公开攻击方式有问题" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=8.5cm --prop width=15cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i3-name" --prop text="王易人" --prop font="Helvetica" --prop size=20 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=10cm --prop width=10cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i3-level" --prop text="中等影响" --prop font="Helvetica" --prop size=16 --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=11cm --prop width=8cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i3-desc" --prop text="团队管理被公开质疑" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=12cm --prop width=15cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i4-name" --prop text="刘伟佳/策略组" --prop font="Helvetica" --prop size=20 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=13.5cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s5-i4-level" --prop text="无影响（被保护）" --prop font="Helvetica" --prop size=16 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=14.5cm --prop width=12cm --prop height=1cm

# Pre-create Slide 6 elements - Strategy
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-title" --prop text="应对策略：REACT 框架" --prop font="Helvetica" --prop size=32 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=0cm --prop width=25cm --prop height=2cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-r-title" --prop text="R — 承认情绪" --prop font="Helvetica" --prop size=18 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=3cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-r-desc" --prop text="先认可担忧，再理性回应" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=4cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-e-title" --prop text="E — 回归根本原因" --prop font="Helvetica" --prop size=18 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=5.5cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-e-desc" --prop text="指出交接期信息真空是真正问题" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=6.5cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-a-title" --prop text="A — 展示行动" --prop font="Helvetica" --prop size=18 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=8cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-a-desc" --prop text="说明正在做的改进措施" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=9cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-c-title" --prop text="C — 明确边界" --prop font="Helvetica" --prop size=18 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=10.5cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-c-desc" --prop text="拒绝道德绑架，要求具体数据" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=11.5cm --prop width=12cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-t-title" --prop text="T — 建议私下对齐" --prop font="Helvetica" --prop size=18 --prop bold=true --prop color=$FIRE --prop fill=none --prop x="${OFFSCREEN}" --prop y=13cm --prop width=15cm --prop height=1cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s6-t-desc" --prop text="引导回归正常工作方式" --prop font="Helvetica" --prop size=12 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=14cm --prop width=15cm --prop height=1cm

# Pre-create Slide 7 elements - CTA
officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s7-title" --prop text="核心结论" --prop font="Helvetica" --prop size=48 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=2cm --prop width=20cm --prop height=3cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s7-line1" --prop text="表演型预警 + 转移视线 + 保护关系网 的三重组合" --prop font="Helvetica" --prop size=20 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=6cm --prop width=28cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s7-line2" --prop text="不接靶子，回归根本原因" --prop font="Helvetica" --prop size=24 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=8.5cm --prop width=25cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s7-line3" --prop text="拒绝道德绑架，保护团队安全感" --prop font="Helvetica" --prop size=24 --prop bold=true --prop color=$INK --prop fill=none --prop x="${OFFSCREEN}" --prop y=10.5cm --prop width=25cm --prop height=1.5cm

officecli add "$OUTPUT" '/slide[1]' --type shape --prop "name=!!s7-date" --prop text="2026年4月" --prop font="Helvetica" --prop size=14 --prop color=$GRAY --prop fill=none --prop x="${OFFSCREEN}" --prop y=14cm --prop width=10cm --prop height=1cm

# ============================================
# SLIDE 2 - STATEMENT
# ============================================
echo "Building Slide 2: Statement..."

officecli add "$OUTPUT" '/' --from '/slide[1]'
officecli set "$OUTPUT" '/slide[2]' --prop transition=morph

# Move rule to top thick
officecli set "$OUTPUT" '/slide[2]/shape[1]' --prop y=0cm --prop height=2cm

# Hide hero elements
officecli set "$OUTPUT" '/slide[2]/shape[2]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[2]/shape[3]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[2]/shape[4]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[2]/shape[5]' --prop x="${OFFSCREEN}"

# Show statement elements
officecli set "$OUTPUT" '/slide[2]/shape[6]' --prop x=3cm --prop y=3cm
officecli set "$OUTPUT" '/slide[2]/shape[7]' --prop x=3cm --prop y=5cm
officecli set "$OUTPUT" '/slide[2]/shape[8]' --prop x=3cm --prop y=9cm
officecli set "$OUTPUT" '/slide[2]/shape[9]' --prop x=3cm --prop y=11cm
officecli set "$OUTPUT" '/slide[2]/shape[10]' --prop x=3cm --prop y=13cm
officecli set "$OUTPUT" '/slide[2]/shape[11]' --prop x=3cm --prop y=16cm

# ============================================
# SLIDE 3 - PILLARS (4 columns)
# ============================================
echo "Building Slide 3: Pillars..."

officecli add "$OUTPUT" '/' --from '/slide[2]'
officecli set "$OUTPUT" '/slide[3]' --prop transition=morph

# Move rule to bottom thick
officecli set "$OUTPUT" '/slide[3]/shape[1]' --prop y=17cm --prop height=2cm

# Hide statement elements
officecli set "$OUTPUT" '/slide[3]/shape[6]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[7]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[8]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[9]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[10]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[3]/shape[11]' --prop x="${OFFSCREEN}"

# Show pillar title
officecli set "$OUTPUT" '/slide[3]/shape[12]' --prop x=3cm --prop y=1.5cm

# Show 4 pillars in a row (x positions: 3, 10, 17, 24)
# Pillar 1
officecli set "$OUTPUT" '/slide[3]/shape[13]' --prop x=3cm --prop y=4cm
officecli set "$OUTPUT" '/slide[3]/shape[14]' --prop x=3cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[15]' --prop x=3cm --prop y=7.5cm
officecli set "$OUTPUT" '/slide[3]/shape[16]' --prop x=3cm --prop y=10cm

# Pillar 2
officecli set "$OUTPUT" '/slide[3]/shape[17]' --prop x=10cm --prop y=4cm
officecli set "$OUTPUT" '/slide[3]/shape[18]' --prop x=10cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[19]' --prop x=10cm --prop y=7.5cm
officecli set "$OUTPUT" '/slide[3]/shape[20]' --prop x=10cm --prop y=10cm

# Pillar 3
officecli set "$OUTPUT" '/slide[3]/shape[21]' --prop x=17cm --prop y=4cm
officecli set "$OUTPUT" '/slide[3]/shape[22]' --prop x=17cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[23]' --prop x=17cm --prop y=7.5cm
officecli set "$OUTPUT" '/slide[3]/shape[24]' --prop x=17cm --prop y=10cm

# Pillar 4
officecli set "$OUTPUT" '/slide[3]/shape[25]' --prop x=24cm --prop y=4cm
officecli set "$OUTPUT" '/slide[3]/shape[26]' --prop x=24cm --prop y=6cm
officecli set "$OUTPUT" '/slide[3]/shape[27]' --prop x=24cm --prop y=7.5cm
officecli set "$OUTPUT" '/slide[3]/shape[28]' --prop x=24cm --prop y=10cm

# ============================================
# SLIDE 4 - EVIDENCE
# ============================================
echo "Building Slide 4: Evidence..."

officecli add "$OUTPUT" '/' --from '/slide[3]'
officecli set "$OUTPUT" '/slide[4]' --prop transition=morph

# Move rule to thin center
officecli set "$OUTPUT" '/slide[4]/shape[1]' --prop y=9.5cm --prop height=0.1cm

# Hide pillars
for i in 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28; do
  officecli set "$OUTPUT" "/slide[4]/shape[$i]" --prop x="${OFFSCREEN}"
done

# Show evidence title
officecli set "$OUTPUT" '/slide[4]/shape[29]' --prop x=3cm --prop y=2cm

# Show comparison items
officecli set "$OUTPUT" '/slide[4]/shape[30]' --prop x=3cm --prop y=5cm
officecli set "$OUTPUT" '/slide[4]/shape[31]' --prop x=18cm --prop y=5cm
officecli set "$OUTPUT" '/slide[4]/shape[32]' --prop x=3cm --prop y=8cm
officecli set "$OUTPUT" '/slide[4]/shape[33]' --prop x=18cm --prop y=8cm
officecli set "$OUTPUT" '/slide[4]/shape[34]' --prop x=3cm --prop y=12cm

# ============================================
# SLIDE 5 - IMPACT
# ============================================
echo "Building Slide 5: Impact..."

officecli add "$OUTPUT" '/' --from '/slide[4]'
officecli set "$OUTPUT" '/slide[5]' --prop transition=morph

# Move rule to wide top-third
officecli set "$OUTPUT" '/slide[5]/shape[1]' --prop y=6cm --prop height=4cm

# Hide evidence
officecli set "$OUTPUT" '/slide[5]/shape[29]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[30]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[31]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[32]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[33]' --prop x="${OFFSCREEN}"
officecli set "$OUTPUT" '/slide[5]/shape[34]' --prop x="${OFFSCREEN}"

# Show impact title
officecli set "$OUTPUT" '/slide[5]/shape[35]' --prop x=3cm --prop y=1.5cm

# Show impact items (2 columns)
officecli set "$OUTPUT" '/slide[5]/shape[36]' --prop x=3cm --prop y=11cm
officecli set "$OUTPUT" '/slide[5]/shape[37]' --prop x=3cm --prop y=12.5cm
officecli set "$OUTPUT" '/slide[5]/shape[38]' --prop x=3cm --prop y=14cm

officecli set "$OUTPUT" '/slide[5]/shape[39]' --prop x=18cm --prop y=11cm
officecli set "$OUTPUT" '/slide[5]/shape[40]' --prop x=18cm --prop y=12.5cm
officecli set "$OUTPUT" '/slide[5]/shape[41]' --prop x=18cm --prop y=14cm

officecli set "$OUTPUT" '/slide[5]/shape[42]' --prop x=3cm --prop y=16cm
officecli set "$OUTPUT" '/slide[5]/shape[43]' --prop x=3cm --prop y=17cm
officecli set "$OUTPUT" '/slide[5]/shape[44]' --prop x=18cm --prop y=16cm

# ============================================
# SLIDE 6 - STRATEGY
# ============================================
echo "Building Slide 6: Strategy..."

officecli add "$OUTPUT" '/' --from '/slide[5]'
officecli set "$OUTPUT" '/slide[6]' --prop transition=morph

# Move rule to bottom thick
officecli set "$OUTPUT" '/slide[6]/shape[1]' --prop y=17cm --prop height=2cm

# Hide impact
for i in 35 36 37 38 39 40 41 42 43 44; do
  officecli set "$OUTPUT" "/slide[6]/shape[$i]" --prop x="${OFFSCREEN}"
done

# Show strategy title
officecli set "$OUTPUT" '/slide[6]/shape[45]' --prop x=3cm --prop y=1.5cm

# Show REACT items (2 columns layout)
officecli set "$OUTPUT" '/slide[6]/shape[46]' --prop x=3cm --prop y=4.5cm
officecli set "$OUTPUT" '/slide[6]/shape[47]' --prop x=3cm --prop y=6cm
officecli set "$OUTPUT" '/slide[6]/shape[48]' --prop x=18cm --prop y=4.5cm
officecli set "$OUTPUT" '/slide[6]/shape[49]' --prop x=18cm --prop y=6cm
officecli set "$OUTPUT" '/slide[6]/shape[50]' --prop x=3cm --prop y=8.5cm
officecli set "$OUTPUT" '/slide[6]/shape[51]' --prop x=3cm --prop y=10cm
officecli set "$OUTPUT" '/slide[6]/shape[52]' --prop x=18cm --prop y=8.5cm
officecli set "$OUTPUT" '/slide[6]/shape[53]' --prop x=18cm --prop y=10cm
officecli set "$OUTPUT" '/slide[6]/shape[54]' --prop x=3cm --prop y=12.5cm
officecli set "$OUTPUT" '/slide[6]/shape[55]' --prop x=3cm --prop y=14cm

# ============================================
# SLIDE 7 - CTA (Full INK inversion)
# ============================================
echo "Building Slide 7: CTA..."

officecli add "$OUTPUT" '/' --from '/slide[6]'
officecli set "$OUTPUT" '/slide[7]' --prop transition=morph --prop background=$INK

# Expand rule to full slide
officecli set "$OUTPUT" '/slide[7]/shape[1]' --prop y=0cm --prop height=19.05cm --prop fill=$INK

# Hide strategy
for i in 45 46 47 48 49 50 51 52 53 54 55; do
  officecli set "$OUTPUT" "/slide[7]/shape[$i]" --prop x="${OFFSCREEN}"
done

# Show CTA elements (white text on black)
officecli set "$OUTPUT" '/slide[7]/shape[56]' --prop x=3cm --prop y=3cm --prop color=$BG
officecli set "$OUTPUT" '/slide[7]/shape[57]' --prop x=3cm --prop y=7cm --prop color=$GRAY
officecli set "$OUTPUT" '/slide[7]/shape[58]' --prop x=3cm --prop y=10cm --prop color=$BG
officecli set "$OUTPUT" '/slide[7]/shape[59]' --prop x=3cm --prop y=12.5cm --prop color=$BG
officecli set "$OUTPUT" '/slide[7]/shape[60]' --prop x=3cm --prop y=16cm --prop color=$GRAY

# ============================================
# FINAL VALIDATION
# ============================================
echo "Validating..."
officecli validate "$OUTPUT"
echo ""
echo "=== PPT Summary ==="
officecli view "$OUTPUT" outline

echo ""
echo "✅ Build complete: $OUTPUT"
