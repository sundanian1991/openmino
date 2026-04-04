#!/usr/bin/env python3
"""
带节奏事件分析 - Swiss System Professional Build
Uses morph-helpers.py for reliable workflow
"""
import subprocess, sys, os

def run(*args):
    result = subprocess.run(list(args))
    if result.returncode != 0:
        sys.exit(result.returncode)

# Load helper functions
SCRIPT_DIR = "/Users/sundanian/Library/Application Support/AionUi/config/builtin-skills/morph-ppt"
def helper(*args):
    run(sys.executable, os.path.join(SCRIPT_DIR, "reference", "morph-helpers.py"), *[str(a) for a in args])

OUTPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/gemini-temp-1775279740333/带节奏事件分析_专业版.pptx"

# Colors - Swiss System
BG = "FFFFFF"
INK = "000000"
FIRE = "CC0000"  # Slightly darker red for better contrast on white
GRAY = "666666"
LIGHT_GRAY = "CCCCCC"

print("=" * 50)
print("Building: Dai Jie Zou Event Analysis (Swiss System Pro)")
print("=" * 50)

# Clean build
import os
if os.path.exists(OUTPUT):
    os.remove(OUTPUT)
run("officecli", "create", OUTPUT)

# ============================================================================
# SLIDE 1 - HERO: Clean, bold statement
# ============================================================================
print("
[Slide 1] Hero...")
run("officecli", "add", OUTPUT, "/", "--type", "slide", "--prop", f"background={BG}")

# Scene Actor: Horizontal rule at 1/3 height
run("officecli", "add", OUTPUT, "/slide[1]", "--type", "shape",
    "--prop", "name=!!rule",
    "--prop", "fill", INK,
    "--prop", "x=0cm",
    "--prop", "y=6.35cm",  # 1/3 of 19.05cm
    "--prop", "width=33.87cm",
    "--prop", "height=0.08cm")

# Scene Actor: Accent line (vertical, left side)
run("officecli", "add", OUTPUT, "/slide[1]", "--type", "shape",
    "--prop", "name=!!accent-v",
    "--prop", "fill", FIRE,
    "--prop", "x=2cm",
    "--prop", "y=8cm",
    "--prop", "width=0.3cm",
    "--prop", "height=5cm")

# Main Title - Large, left aligned
run("officecli", "add", OUTPUT, "/slide[1]", "--type", "shape",
    "--prop", "name=#s1-title",
    "--prop", "text=带节奏事件分析",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=72",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=3cm",
    "--prop", "y=7cm",
    "--prop", "width=28cm",
    "--prop", "height=4cm",
    "--prop", "fill=none")

# Subtitle
run("officecli", "add", OUTPUT, "/slide[1]", "--type", "shape",
    "--prop", "name=#s1-subtitle",
    "--prop", "text=刘乾坤开门红激励预警行为拆解",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=24",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=11.5cm",
    "--prop", "width=28cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

# Date/context - bottom right
run("officecli", "add", OUTPUT, "/slide[1]", "--type", "shape",
    "--prop", "name=#s1-context",
    "--prop", "text=2026年3月29日",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", LIGHT_GRAY,
    "--prop", "x=25cm",
    "--prop", "y=17cm",
    "--prop", "width=8cm",
    "--prop", "height=1cm",
    "--prop", "fill=none")

# ============================================================================
# SLIDE 2 - STATEMENT: Core finding
# ============================================================================
print("[Slide 2] Statement...")
helper("clone", OUTPUT, 1, 2)
helper("ghost", OUTPUT, 2, 3, 4, 5)  # Ghost s1 content

# Move rule to middle
run("officecli", "set", OUTPUT, "/slide[2]/shape[1]", "--prop", "y=9.5cm")

# Shrink accent
run("officecli", "set", OUTPUT, "/slide[2]/shape[2]", "--prop", "height=3cm", "--prop", "y=7.5cm")

# New content
run("officecli", "add", OUTPUT, "/slide[2]", "--type", "shape",
    "--prop", "name=#s2-label",
    "--prop", "text=核心发现",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", FIRE,
    "--prop", "x=3cm",
    "--prop", "y=5cm",
    "--prop", "width=10cm",
    "--prop", "height=1cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[2]", "--type", "shape",
    "--prop", "name=#s2-main",
    "--prop", "text=这不是正常的工作方式",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=54",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=3cm",
    "--prop", "y=7cm",
    "--prop", "width=28cm",
    "--prop", "height=4cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[2]", "--type", "shape",
    "--prop", "name=#s2-detail",
    "--prop", "text=表演型预警 · 转移视线 · 保护关系网",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=20",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=12cm",
    "--prop", "width=28cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

helper("verify", OUTPUT, 2)

# ============================================================================
# SLIDE 3 - PATTERNS: Three cards
# ============================================================================
print("[Slide 3] Patterns...")
helper("clone", OUTPUT, 2, 3)
helper("ghost", OUTPUT, 3, 6, 7, 8)  # Ghost s2 content

# Move rule to top
run("officecli", "set", OUTPUT, "/slide[3]/shape[1]", "--prop", "y=4cm")

# Move accent to right side
run("officecli", "set", OUTPUT, "/slide[3]/shape[2]", "--prop", "x=30cm", "--prop", "y=6cm")

# Three column layout
# Card 1
run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c1-num",
    "--prop", "text=01",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", FIRE,
    "--prop", "x=3cm",
    "--prop", "y=6cm",
    "--prop", "width=8cm",
    "--prop", "height=2.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c1-title",
    "--prop", "text=选择性攻击",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=22",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=3cm",
    "--prop", "y=8.5cm",
    "--prop", "width=8cm",
    "--prop", "height=1.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c1-desc",
    "--prop", "text=只攻击服务组同事
从不质疑策略组",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=10.5cm",
    "--prop", "width=8cm",
    "--prop", "height=4cm",
    "--prop", "fill=none")

# Card 2
run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c2-num",
    "--prop", "text=02",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=13cm",
    "--prop", "y=6cm",
    "--prop", "width=8cm",
    "--prop", "height=2.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c2-title",
    "--prop", "text=转移视线",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=22",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=13cm",
    "--prop", "y=8.5cm",
    "--prop", "width=8cm",
    "--prop", "height=1.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c2-desc",
    "--prop", "text=把交接期信息真空
转移到激励问题",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", GRAY,
    "--prop", "x=13cm",
    "--prop", "y=10.5cm",
    "--prop", "width=8cm",
    "--prop", "height=4cm",
    "--prop", "fill=none")

# Card 3
run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c3-num",
    "--prop", "text=03",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=23cm",
    "--prop", "y=6cm",
    "--prop", "width=8cm",
    "--prop", "height=2.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c3-title",
    "--prop", "text=道德绑架",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=22",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=23cm",
    "--prop", "y=8.5cm",
    "--prop", "width=8cm",
    "--prop", "height=1.5cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[3]", "--type", "shape",
    "--prop", "name=#s3-c3-desc",
    "--prop", "text=用情绪化数字
制造道德压力",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", GRAY,
    "--prop", "x=23cm",
    "--prop", "y=10.5cm",
    "--prop", "width=8cm",
    "--prop", "height=4cm",
    "--prop", "fill=none")

helper("verify", OUTPUT, 3)

# ============================================================================
# SLIDE 4 - EVIDENCE: Data comparison
# ============================================================================
print("[Slide 4] Evidence...")
helper("clone", OUTPUT, 3, 4)
helper("ghost", OUTPUT, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14)  # Ghost s3 cards

# Move rule to middle, thicker
run("officecli", "set", OUTPUT, "/slide[4]/shape[1]", "--prop", "y=9.5cm", "--prop", "height=0.15cm")

# Move accent to center
run("officecli", "set", OUTPUT, "/slide[4]/shape[2]", "--prop", "x=16.5cm", "--prop", "y=8cm", "--prop", "height=2cm")

# Left side: Claims
run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-claim-label",
    "--prop", "text=刘乾坤说法",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=5cm",
    "--prop", "width=12cm",
    "--prop", "height=1cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-claim1",
    "--prop", "text=大量流失",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=28",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=6.5cm",
    "--prop", "width=12cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-claim2",
    "--prop", "text=拿不到钱",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=28",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=11cm",
    "--prop", "width=12cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

# Right side: Facts
run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-fact-label",
    "--prop", "text=实际情况",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=14",
    "--prop", "color", FIRE,
    "--prop", "x=19cm",
    "--prop", "y=5cm",
    "--prop", "width=12cm",
    "--prop", "height=1cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-fact1",
    "--prop", "text=头部个别问题",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=28",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=19cm",
    "--prop", "y=6.5cm",
    "--prop", "width=12cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-fact2",
    "--prop", "text="60-70%可以达成"",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=28",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=19cm",
    "--prop", "y=11cm",
    "--prop", "width=12cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

# Note at bottom
run("officecli", "add", OUTPUT, "/slide[4]", "--type", "shape",
    "--prop", "name=#s4-note",
    "--prop", "text=承认：激励目标确实偏高（基于3.1-3.10数据制定）",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=12",
    "--prop", "color", GRAY,
    "--prop", "x=3cm",
    "--prop", "y=15cm",
    "--prop", "width=28cm",
    "--prop", "height=1cm",
    "--prop", "fill=none")

helper("verify", OUTPUT, 4)

# ============================================================================
# SLIDE 5 - IMPACT: Assessment
# ============================================================================
print("[Slide 5] Impact...")
helper("clone", OUTPUT, 4, 5)
helper("ghost", OUTPUT, 5, 6, 7, 8, 9, 10, 11, 12)  # Ghost s4 content

# Move rule to bottom thin
run("officecli", "set", OUTPUT, "/slide[5]/shape[1]", "--prop", "y=17cm", "--prop", "height=0.08cm")

# Move accent to left
run("officecli", "set", OUTPUT, "/slide[5]/shape[2]", "--prop", "x=2cm", "--prop", "y=5cm")

# Section title
run("officecli", "add", OUTPUT, "/slide[5]", "--type", "shape",
    "--prop", "name=#s5-title",
    "--prop", "text=影响评估",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=3cm",
    "--prop", "y=4cm",
    "--prop", "width=20cm",
    "--prop", "height=3cm",
    "--prop", "fill=none")

# Impact items - vertical list
impacts = [
    ("团队安全感", "被破坏，影响长期协作氛围", "高影响", FIRE),
    ("李吉斌", "Q1责任在他，但公开攻击方式有问题", "高影响", FIRE),
    ("王易人", "团队管理被公开质疑", "中等影响", INK),
    ("刘伟佳/策略组", "无影响 — 被保护", "零影响", GRAY)
]

y_pos = 8
for idx, (name, desc, level, level_color) in enumerate(impacts, 1):
    # Name
    run("officecli", "add", OUTPUT, "/slide[5]", "--type", "shape",
        "--prop", f"name=#s5-i{idx}-name",
        "--prop", "text", name,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=20",
        "--prop", "bold=true",
        "--prop", "color", INK,
        "--prop", "x=3cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=10cm",
        "--prop", "height=1.2cm",
        "--prop", "fill=none")
    
    # Level
    run("officecli", "add", OUTPUT, "/slide[5]", "--type", "shape",
        "--prop", f"name=#s5-i{idx}-level",
        "--prop", "text", level,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=14",
        "--prop", "color", level_color,
        "--prop", "x=14cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=6cm",
        "--prop", "height=1.2cm",
        "--prop", "fill=none")
    
    # Desc
    run("officecli", "add", OUTPUT, "/slide[5]", "--type", "shape",
        "--prop", f"name=#s5-i{idx}-desc",
        "--prop", "text", desc,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=12",
        "--prop", "color", GRAY,
        "--prop", "x=20cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=12cm",
        "--prop", "height=1.2cm",
        "--prop", "fill=none")
    
    y_pos += 2.5

helper("verify", OUTPUT, 5)

# ============================================================================
# SLIDE 6 - STRATEGY: REACT Framework
# ============================================================================
print("[Slide 6] Strategy...")
helper("clone", OUTPUT, 5, 6)

# Ghost s5 content (dynamic indices)
for i in range(6, 19):  # title + 4 items × 3 shapes
    try:
        helper("ghost", OUTPUT, 6, i)
    except:
        break

# Move rule to top wide band
run("officecli", "set", OUTPUT, "/slide[6]/shape[1]", "--prop", "y=0cm", "--prop", "height=3cm")

# Move accent to right
run("officecli", "set", OUTPUT, "/slide[6]/shape[2]", "--prop", "x=30cm", "--prop", "y=5cm", "--prop", "height=8cm")

# Title (white on black band area, but keep black for now)
run("officecli", "add", OUTPUT, "/slide[6]", "--type", "shape",
    "--prop", "name=#s6-title",
    "--prop", "text=REACT 应对框架",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=36",
    "--prop", "bold=true",
    "--prop", "color", INK,
    "--prop", "x=3cm",
    "--prop", "y=0.8cm",
    "--prop", "width=25cm",
    "--prop", "height=2cm",
    "--prop", "fill=none")

# REACT items
react_items = [
    ("R", "承认情绪", "先认可担忧，再理性回应"),
    ("E", "回归根本", "指出交接期信息真空是真正问题"),
    ("A", "展示行动", "说明正在做的改进措施"),
    ("C", "明确边界", "拒绝道德绑架，要求具体数据"),
    ("T", "私下对齐", "引导回归正常工作方式")
]

y_pos = 4.5
for idx, (letter, title, desc) in enumerate(react_items, 1):
    # Letter
    run("officecli", "add", OUTPUT, "/slide[6]", "--type", "shape",
        "--prop", f"name=#s6-r{idx}-letter",
        "--prop", "text", letter,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=32",
        "--prop", "bold=true",
        "--prop", "color", FIRE if idx == 5 else INK,
        "--prop", "x=3cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=3cm",
        "--prop", "height=1.5cm",
        "--prop", "fill=none")
    
    # Title
    run("officecli", "add", OUTPUT, "/slide[6]", "--type", "shape",
        "--prop", f"name=#s6-r{idx}-title",
        "--prop", "text", title,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=20",
        "--prop", "bold=true",
        "--prop", "color", INK,
        "--prop", "x=6cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=8cm",
        "--prop", "height=1.5cm",
        "--prop", "fill=none")
    
    # Desc
    run("officecli", "add", OUTPUT, "/slide[6]", "--type", "shape",
        "--prop", f"name=#s6-r{idx}-desc",
        "--prop", "text", desc,
        "--prop", "font=Helvetica Neue",
        "--prop", "size=14",
        "--prop", "color", GRAY,
        "--prop", "x=15cm",
        "--prop", f"y={y_pos}cm",
        "--prop", "width=16cm",
        "--prop", "height=1.5cm",
        "--prop", "fill=none")
    
    y_pos += 2.8

helper("verify", OUTPUT, 6)

# ============================================================================
# SLIDE 7 - CTA: Final statement
# ============================================================================
print("[Slide 7] Conclusion...")
helper("clone", OUTPUT, 6, 7)

# Ghost all content
for i in range(6, 22):
    try:
        helper("ghost", OUTPUT, 7, i)
    except:
        break

# INVERSION: Full black background
run("officecli", "set", OUTPUT, "/slide[7]", "--prop", f"background={INK}")

# Expand rule to full slide
run("officecli", "set", OUTPUT, "/slide[7]/shape[1]", "--prop", "y=0cm", "--prop", "height=19.05cm", "--prop", "fill", INK)

# Hide accent (move off screen)
run("officecli", "set", OUTPUT, "/slide[7]/shape[2]", "--prop", "x=36cm")

# White text on black
run("officecli", "add", OUTPUT, "/slide[7]", "--type", "shape",
    "--prop", "name=#s7-line1",
    "--prop", "text=不接靶子",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", BG,
    "--prop", "x=3cm",
    "--prop", "y=5cm",
    "--prop", "width=28cm",
    "--prop", "height=3cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[7]", "--type", "shape",
    "--prop", "name=#s7-line2",
    "--prop", "text=回归根本原因",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", BG,
    "--prop", "x=3cm",
    "--prop", "y=9cm",
    "--prop", "width=28cm",
    "--prop", "height=3cm",
    "--prop", "fill=none")

run("officecli", "add", OUTPUT, "/slide[7]", "--type", "shape",
    "--prop", "name=#s7-line3",
    "--prop", "text="保护团队安全感"",
    "--prop", "font=Helvetica Neue",
    "--prop", "size=48",
    "--prop", "bold=true",
    "--prop", "color", BG,
    "--prop", "x=3cm",
    "--prop", "y=13cm",
    "--prop", "width=28cm",
    "--prop", "height=3cm",
    "--prop", "fill=none")

helper("verify", OUTPUT, 7)

# ============================================================================
# FINAL CHECK
# ============================================================================
print("
" + "=" * 50)
print("Final verification...")
helper("final-check", OUTPUT)

print("
" + "=" * 50)
print(f"✅ Build complete: {OUTPUT}")
print("=" * 50)
print("
Open in PowerPoint to see Morph animations.")
