#!/usr/bin/env python3
"""手绘 SVG 风格 PPT — viz-hand-drawn-icon DNA + 四色系统
风格: Organic Warmth — 贝塞尔曲线 + 陶土点缀 + 墨黑描边 + 米白背景
"""
import os
import random
import math

random.seed(42)

OUT_DIR = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-handdrawn-供应商分级盘点-20260510'
os.makedirs(OUT_DIR, exist_ok=True)

# === viz-hand-drawn-icon 四色系统 ===
TERRA = '#D6654B'    # 陶土色 — 生命与温度
INK = '#1A1612'      # 墨黑 — 唯一描边色
RICE = '#FEFFFE'     # 米白 — 背景/主体
DEEP_TERRA = '#B03A21'  # 深陶土 — 阴影/重量
BG = '#FBFAF5'       # 暖白纸张
UNDERLINE = '#7BB8D0'  # 淡蓝下划线（品牌）
PASTELS = ['#B8D8E8', '#C5E8D0', '#F5D5B5', '#DDD0F0', '#F5C5C5']

W, H = 1920, 1080
CW, CH = 2520, 1080

# === 手绘曲线工具 ===
def hd(x, y):
    """手绘抖动坐标 — 70%小偏差 + 30%大偏差"""
    if random.random() < 0.7:
        dx = random.uniform(-3, 3)
        dy = random.uniform(-3, 3)
    else:
        dx = random.uniform(-12, 12)
        dy = random.uniform(-12, 12)
    return f'{x+dx:.1f},{y+dy:.1f}'

def hd_rect(x, y, w, h):
    """手绘不规则矩形 path"""
    j = lambda: random.uniform(-4, 4)
    return (f'M{x+j()},{y+j()} '
            f'L{x+w+j()},{y+j()} '
            f'L{x+w+j()},{y+h+j()} '
            f'L{x+j()},{y+h+j()} Z')

def hd_circle(cx, cy, r):
    """手绘不规则圆 — 用贝塞尔曲线模拟"""
    pts = []
    n = 8
    for i in range(n):
        a = 2 * math.pi * i / n
        da = random.uniform(-0.15, 0.15)
        dr = random.uniform(-r*0.1, r*0.1)
        rr = r + dr
        px = cx + rr * math.cos(a + da)
        py = cy + rr * math.sin(a + da)
        pts.append((px, py))
    # 用 Q 曲线连接
    d = f'M{pts[0][0]:.1f},{pts[0][1]:.1f}'
    for i in range(1, n):
        cp = (pts[i][0], pts[i][1])
        d += f' Q{cp[0]:.1f},{cp[1]:.1f} {cp[0]:.1f},{cp[1]:.1f}'
    d += ' Z'
    return d

def hd_line(x1, y1, x2, y2):
    """手绘线条 — 用 Q 曲线"""
    mx = (x1+x2)/2 + random.uniform(-8, 8)
    my = (y1+y2)/2 + random.uniform(-8, 8)
    return f'M{x1:.1f},{y1:.1f} Q{mx:.1f},{my:.1f} {x2:.1f},{y2:.1f}'

def hd_arrow(x1, y1, x2, y2, lw=2):
    """手绘箭头"""
    angle = math.atan2(y2-y1, x2-x1)
    hl = 12  # arrowhead length
    h1x = x2 - hl * math.cos(angle - 0.5)
    h1y = y2 - hl * math.sin(angle - 0.5)
    h2x = x2 - hl * math.cos(angle + 0.5)
    h2y = y2 - hl * math.sin(angle + 0.5)
    body = hd_line(x1, y1, x2, y2)
    ah1 = hd_line(x2, y2, h1x, h1y)
    ah2 = hd_line(x2, y2, h2x, h2y)
    return f'<g stroke="{INK}" stroke-width="{lw}" fill="none" stroke-linecap="round" stroke-linejoin="round">' \
           f'<path d="{body}"/><path d="{ah1}"/><path d="{ah2}"/></g>'

def hd_text(x, y, text, size=18, color=INK, weight='normal', anchor='middle'):
    """中文文本"""
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" ' \
           f'text-anchor="{anchor}" font-weight="{weight}" ' \
           f'font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, sans-serif">{text}</text>'

def hd_underline(x, y, w):
    """淡蓝手绘下划线"""
    d = hd_line(x, y, x+w, y)
    return f'<path d="{d}" stroke="{UNDERLINE}" stroke-width="3" fill="none" stroke-linecap="round"/>'

def corner_marks(w, h):
    """角落构造标记"""
    s = '<g stroke="#D5D2CA" stroke-width="0.8" fill="none" opacity="0.5">'
    for cx, cy in [(40, h-40), (w-40, h-40), (40, 40), (w-40, 40)]:
        s += f'<path d="M{cx},{cy} L{cx+20},{cy} M{cx},{cy} L{cx},{cy-20}"/>'
        s += f'<circle cx="{cx}" cy="{cy}" r="2" fill="#D5D2CA" stroke="none" opacity="0.4"/>'
    s += '</g>'
    return s

def page_start(w, h):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">' \
           f'<rect width="{w}" height="{h}" fill="{BG}"/>' \
           f'{corner_marks(w, h)}'

def page_end():
    return '</svg>'

def page_num(n, total):
    return hd_text(60, H-60, f'{n:02d} / {total:02d}', 14, '#AAAAAA', 'normal', 'start')

# === ICONS — viz-hand-drawn-icon 风格 ===

def icon_grid(cx, cy, size=80):
    """九宫格 icon — 手绘网格"""
    s = 20
    ox, oy = cx - s*1.5, cy - s*1.5
    fill = f'<g id="fill-layer">'
    for r in range(3):
        for c in range(3):
            x, y = ox + c*s + 2, oy + r*s + 2
            fill += f'<rect x="{x}" y="{y}" width="{s-4}" height="{s-4}" rx="2" fill="{PASTELS[(r+c)%5]}" opacity="0.3"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    stroke += hd_rect(ox, oy, s*3, s*3)
    for r in range(3):
        stroke += f'<path d="{hd_line(ox, oy+r*s, ox+s*3, oy+r*s)}"/>'
    for c in range(3):
        stroke += f'<path d="{hd_line(ox+c*s, oy, ox+c*s, oy+s*3)}"/>'
    stroke += '</g>'
    return fill + stroke

def icon_target(cx, cy, size=60):
    """业绩/目标 — 靶心"""
    fill = f'<g id="fill-layer">'
    fill += f'<circle cx="{cx}" cy="{cy}" r="25" fill="{RICE}" opacity="0.6"/>'
    fill += f'<circle cx="{cx}" cy="{cy}" r="15" fill="{TERRA}" opacity="0.2"/>'
    fill += f'<circle cx="{cx}" cy="{cy}" r="5" fill="{TERRA}" opacity="0.5"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += f'<circle cx="{cx}" cy="{cy}" r="25" stroke-width="2.5"/>'
    stroke += f'<circle cx="{cx}" cy="{cy}" r="15"/>'
    stroke += f'<circle cx="{cx}" cy="{cy}" r="5" stroke-width="1.5"/>'
    # 箭头
    stroke += hd_line(cx-30, cy, cx+5, cy)
    stroke += hd_line(cx+5, cy, cx-3, cy-8)
    stroke += hd_line(cx+5, cy, cx-3, cy+8)
    stroke += '</g>'
    return fill + stroke

def icon_shield(cx, cy, size=60):
    """合规 — 盾牌"""
    fill = f'<g id="fill-layer">'
    shield = f'M{cx},{cy-28} L{cx+22},{cy-18} L{cx+22},{cy+2} L{cx},{cy+28} L{cx-22},{cy+2} L{cx-22},{cy-18} Z'
    fill += f'<path d="{shield}" fill="{TERRA}" opacity="0.15"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += f'<path d="{shield}" stroke-width="2.5"/>'
    # checkmark
    stroke += hd_line(cx-8, cy, cx-2, cy+8)
    stroke += hd_line(cx-2, cy+8, cx+10, cy-8)
    stroke += '</g>'
    return fill + stroke

def icon_sprout(cx, cy, size=60):
    """潜力 — 萌芽"""
    fill = f'<g id="fill-layer">'
    fill += f'<ellipse cx="{cx}" cy="{cy+10}" rx="18" ry="12" fill="{PASTELS[1]}" opacity="0.3"/>'
    fill += f'<ellipse cx="{cx-10}" cy="{cy-8}" rx="8" ry="12" fill="{TERRA}" opacity="0.2"/>'
    fill += f'<ellipse cx="{cx+10}" cy="{cy-5}" rx="7" ry="10" fill="{TERRA}" opacity="0.15"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += hd_line(cx, cy+10, cx, cy-15)  # stem
    stroke += hd_line(cx, cy-15, cx-10, cy-8)  # left leaf
    stroke += hd_line(cx, cy-12, cx+10, cy-5)  # right leaf
    # roots
    stroke += hd_line(cx, cy+10, cx-6, cy+20)
    stroke += hd_line(cx, cy+10, cx+6, cy+20)
    stroke += '</g>'
    return fill + stroke

def icon_checklist(cx, cy, size=60):
    """清单 — 剪贴板"""
    fill = f'<g id="fill-layer">'
    fill += f'<rect x="{cx-18}" y="{cy-25}" width="36" height="45" rx="3" fill="{RICE}" opacity="0.5"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += f'<path d="{hd_rect(cx-18, cy-25, 36, 45)}" stroke-width="2.5"/>'
    # lines
    for i in range(4):
        stroke += hd_line(cx-10, cy-15+i*10, cx+12, cy-15+i*10)
    # clip
    stroke += hd_line(cx-5, cy-25, cx+5, cy-25)
    # checkmarks
    stroke += hd_line(cx-14, cy-13, cx-12, cy-9)
    stroke += hd_line(cx-12, cy-9, cx-8, cy-15)
    stroke += '</g>'
    return fill + stroke

def icon_roadmap(cx, cy, size=80):
    """实施路径 — 路线图"""
    fill = f'<g id="fill-layer">'
    for i, color in enumerate([PASTELS[0], PASTELS[1], PASTELS[2], PASTELS[3]]):
        fill += f'<circle cx="{cx-36+i*24}" cy="{cy}" r="10" fill="{color}" opacity="0.3"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += hd_line(cx-48, cy, cx+48, cy)
    for i in range(4):
        x = cx - 36 + i*24
        stroke += f'<circle cx="{x}" cy="{cy}" r="10" stroke-width="2"/>'
        stroke += hd_text(x, cy+4, str(i+1), 12, INK, 'bold', 'middle')
    stroke += '</g>'
    return fill + stroke

def icon_star(cx, cy, size=60):
    """明星/结论 — 星"""
    fill = f'<g id="fill-layer">'
    # star fill
    star_pts = []
    for i in range(5):
        a = 2*math.pi*i/5 - math.pi/2
        star_pts.append((cx + 25*math.cos(a), cy + 25*math.sin(a)))
        a2 = a + math.pi/5
        star_pts.append((cx + 10*math.cos(a2), cy + 10*math.sin(a2)))
    d = f'M{star_pts[0][0]:.1f},{star_pts[0][1]:.1f}'
    for p in star_pts[1:]:
        d += f' L{p[0]:.1f},{p[1]:.1f}'
    d += ' Z'
    fill += f'<path d="{d}" fill="{TERRA}" opacity="0.25"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += f'<path d="{d}" stroke-width="2.5"/>'
    stroke += '</g>'
    return fill + stroke

def icon_building(cx, cy, size=60):
    """供应商 — 建筑"""
    fill = f'<g id="fill-layer">'
    fill += f'<rect x="{cx-20}" y="{cy-25}" width="40" height="50" rx="2" fill="{RICE}" opacity="0.5"/>'
    for r in range(3):
        for c in range(2):
            fill += f'<rect x="{cx-14+c*16}" y="{cy-18+r*14}" width="10" height="8" rx="1" fill="{TERRA}" opacity="0.15"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    stroke += f'<path d="{hd_rect(cx-20, cy-25, 40, 50)}" stroke-width="2.5"/>'
    # roof
    stroke += hd_line(cx-22, cy-25, cx, cy-35)
    stroke += hd_line(cx, cy-35, cx+22, cy-25)
    # door
    stroke += f'<path d="{hd_rect(cx-5, cy+5, 10, 20)}"/>'
    stroke += '</g>'
    return fill + stroke

def icon_people(cx, cy, size=60):
    """群体 — 人群"""
    fill = f'<g id="fill-layer">'
    fill += f'<circle cx="{cx-15}" cy="{cy-10}" r="8" fill="{TERRA}" opacity="0.15"/>'
    fill += f'<circle cx="{cx+5}" cy="{cy-15}" r="8" fill="{TERRA}" opacity="0.1"/>'
    fill += f'<circle cx="{cx+20}" cy="{cy-10}" r="8" fill="{TERRA}" opacity="0.15"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    for dx, dy in [(-15,-10), (5,-15), (20,-10)]:
        stroke += f'<circle cx="{cx+dx}" cy="{cy+dy}" r="8" stroke-width="2"/>'
        stroke += f'<path d="M{cx+dx-10},{cy+dy+18} Q{cx+dx},{cy+dy+10} {cx+dx+10},{cy+dy+18}"/>'
    stroke += '</g>'
    return fill + stroke

def icon_trophy(cx, cy, size=60):
    """结论/奖杯"""
    fill = f'<g id="fill-layer">'
    fill += f'<rect x="{cx-8}" y="{cy-25}" width="16" height="30" rx="2" fill="{TERRA}" opacity="0.15"/>'
    fill += '</g>'
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    # cup
    stroke += f'<path d="M{cx-12},{cy-25} L{cx-8},{cy+5} L{cx+8},{cy+5} L{cx+12},{cy-25}" stroke-width="2.5"/>'
    stroke += hd_line(cx-12, cy-25, cx+12, cy-25)
    # handles
    stroke += f'<path d="M{cx-12},{cy-18} Q{cx-22},{cy-15} {cx-12},{cy-5}" stroke-width="1.5"/>'
    stroke += f'<path d="M{cx+12},{cy-18} Q{cx+22},{cy-15} {cx+12},{cy-5}" stroke-width="1.5"/>'
    # base
    stroke += hd_line(cx-15, cy+5, cx+15, cy+5)
    stroke += hd_line(cx-10, cy+10, cx+10, cy+10)
    stroke += hd_line(cx-12, cy+5, cx-10, cy+10)
    stroke += hd_line(cx+12, cy+5, cx+10, cy+10)
    # star on top
    stroke += hd_line(cx, cy-28, cx, cy-35)
    stroke += '</g>'
    return fill + stroke

def icon_arrow_right(cx, cy, size=60):
    """转变箭头"""
    return hd_arrow(cx-30, cy, cx+30, cy, lw=3)

def icon_refresh(cx, cy, size=60):
    """动态管理 — 循环刷新"""
    stroke = f'<g id="stroke-layer" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    r = 18
    stroke += f'<path d="M{cx},{cy-r} A{r},{r} 0 1,1 {cx-15},{cy-12}" stroke-width="2.5"/>'
    stroke += hd_line(cx-15, cy-12, cx-18, cy-2)
    stroke += hd_line(cx-15, cy-12, cx-25, cy-15)
    stroke += '</g>'
    fill = f'<g id="fill-layer"><circle cx="{cx}" cy="{cy}" r="5" fill="{TERRA}" opacity="0.2"/></g>'
    return fill + stroke

# === SLIDES ===

def s00_cover():
    """封面"""
    svg = page_start(CW, CH)
    # 标题
    svg += hd_text(CW/2, 580, '供应商分级盘点', 72, INK, 'normal', 'middle')
    svg += hd_underline(CW/2 - 200, 620, 400)
    svg += hd_text(CW/2, 680, '九宫格评估 · 三张清单 · 动态管理', 28, '#888888', 'normal', 'middle')
    svg += hd_text(CW/2, 730, 'Q2 供应商管理 BP · 十大项目', 20, '#BBBBBB', 'normal', 'middle')
    # 中央大九宫格
    svg += icon_grid(CW/2, 380, 100)
    # 底部标注
    svg += hd_text(CW/2, 850, '业绩 × 合规 × 潜力 → 三维评估', 18, '#999999', 'normal', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/00-cover.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  00-cover.svg OK')

def s01_why():
    """为什么需要"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '为什么需要分级盘点', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-180, 155, 360)
    svg += hd_text(W/2, 190, '从经验驱动到数据驱动', 20, '#999999', 'normal', 'middle')
    svg += page_num(1, 8)
    # 左侧 — 现状
    svg += f'<path d="{hd_rect(180, 300, 620, 480)}" fill="#FFF8F0" stroke="#CC8866" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    svg += hd_text(490, 340, '现状', 26, TERRA, 'bold', 'middle')
    items = ['30+ 供应商凭经验分级', '只有业绩一个维度', '无系统性评估机制', '缺"三张清单"']
    for i, item in enumerate(items):
        svg += hd_text(230, 400 + i*70, '• ' + item, 18, '#555555', 'normal', 'start')
    # 箭头
    svg += icon_arrow_right(950, 540)
    svg += hd_text(950, 520, '转变', 16, UNDERLINE, 'normal', 'middle')
    # 右侧 — 目标
    svg += f'<path d="{hd_rect(1120, 300, 620, 480)}" fill="#F0FFF5" stroke="#66AA77" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    svg += hd_text(1430, 340, '目标', 26, '#44AA55', 'bold', 'middle')
    items2 = ['三维评估：业绩+合规+潜力', '九宫格可视化定位', '三张清单管理', '季度动态调整']
    for i, item in enumerate(items2):
        svg += hd_text(1170, 400 + i*70, '• ' + item, 18, '#555555', 'normal', 'start')
    svg += page_end()
    with open(f'{OUT_DIR}/01-why.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  01-why.svg OK')

def s02_current():
    """当前格局"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '30+ 供应商格局', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-160, 155, 320)
    svg += hd_text(W/2, 190, '覆盖四条产线 · 头部贡献主力', 20, '#999999', 'normal', 'middle')
    svg += page_num(2, 8)
    # 四条产线
    lines = ['金条', '企金', '信用卡', '财富']
    for i, line in enumerate(lines):
        x = 200 + i * 400
        svg += f'<path d="{hd_rect(x, 350, 320, 200)}" fill="{PASTELS[i]}" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>'
        svg += hd_text(x+160, 430, line, 26, INK, 'normal', 'middle')
        svg += hd_text(x+160, 470, f'产线 {i+1}', 14, '#999999', 'normal', 'middle')
    # 供应商群体 icon
    svg += icon_people(W/2, 680, 50)
    svg += hd_text(W/2, 730, '头部 6 家贡献绝大部分产能', 20, TERRA, 'normal', 'middle')
    heads = ['毅航', '毛毛虫', '伽玛', '赛维斯', '岐力', '翰锐']
    for i, name in enumerate(heads):
        x = 170 + i * 270
        svg += hd_text(x+100, 810, name, 16, INK, 'normal', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/02-current.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  02-current.svg OK')

def s03_framework():
    """三维评估"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '三维评估体系', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-140, 155, 280)
    svg += hd_text(W/2, 190, '业绩 40% + 合规 30% + 潜力 30%', 20, '#999999', 'normal', 'middle')
    svg += page_num(3, 8)
    # 三个维度
    dims = [
        ('业绩 40%', ['目标达成率', '产能规模', '转化率'], PASTELS[0], icon_target),
        ('合规 30%', ['质检合格率', '投诉率', '违规次数'], PASTELS[1], icon_shield),
        ('潜力 30%', ['规模扩张', '技术能力', '配合度'], PASTELS[2], icon_sprout),
    ]
    for i, (lbl, items, color, icon_fn) in enumerate(dims):
        x = 160 + i * 540
        svg += f'<path d="{hd_rect(x, 350, 440, 400)}" fill="{color}" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.2"/>'
        svg += icon_fn(x+220, 430, 40)
        svg += hd_text(x+220, 510, lbl, 24, INK, 'bold', 'middle')
        for j, item in enumerate(items):
            svg += hd_text(x+220, 560 + j*50, item, 16, '#555555', 'normal', 'middle')
        if i < 2:
            svg += hd_arrow(x+450, 550, x+530, 550, lw=2)
    svg += hd_text(W/2, 810, '数据来源：业务系统 / 质检培训 / 评估访谈', 14, '#AAAAAA', 'normal', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/03-framework.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  03-framework.svg OK')

def s04_matrix():
    """九宫格"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '九宫格定义', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-120, 155, 240)
    svg += hd_text(W/2, 190, '业绩 × 潜力 → 9 个定位格', 20, '#999999', 'normal', 'middle')
    svg += page_num(4, 8)
    # 九宫格
    cw, ch = 280, 160
    gx0, gy0 = 340, 300
    matrix = [
        ['现金牛', '成长星', '明星'],
        ['观察区', '中坚', '潜力股'],
        ['淘汰区', '待改进', '问题星'],
    ]
    strategies = [
        ['维持', '投入', '重点投入'],
        ['关注', '培养', '倾斜资源'],
        ['优化', '辅导', '诊断'],
    ]
    # Y 轴
    for i, lbl in enumerate(['高潜力', '中', '低']):
        y = gy0 + (2-i)*ch + ch/2
        svg += hd_text(280, y+5, lbl, 18, '#999999', 'normal', 'end')
    # X 轴
    svg += hd_text(gx0 + cw*1.5, gy0 + 3*ch + 40, '← 低业绩 · 业绩 · 高业绩 →', 18, '#999999', 'normal', 'middle')
    for r in range(3):
        for c in range(3):
            x = gx0 + c * cw
            y = gy0 + (2-r) * ch
            svg += f'<path d="{hd_rect(x, y, cw, ch)}" fill="{PASTELS[(r+c)%5]}" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.25"/>'
            svg += hd_text(x+cw/2, y+ch/2+10, matrix[r][c], 22, INK, 'bold', 'middle')
            svg += hd_text(x+cw/2, y+ch/2+40, strategies[r][c], 14, '#999999', 'normal', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/04-matrix.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  04-matrix.svg OK')

def s05_lists():
    """三张清单"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '三张清单', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-100, 155, 200)
    svg += hd_text(W/2, 190, '保留 · 培养 · 优化', 20, '#999999', 'normal', 'middle')
    svg += page_num(5, 8)
    lists = [
        ('保留清单', '头部', '明星+成长星+现金牛', '资源倾斜 · 优先分配', '6-10家', PASTELS[1], icon_star),
        ('培养清单', '腰部', '中坚+潜力股+观察区', '针对性辅导 · 季度跟踪', '12-15家', PASTELS[0], icon_checklist),
        ('优化清单', '尾部', '淘汰区+待改进+问题星', '限期整改 · 减少份额', '5-8家', PASTELS[4], icon_target),
    ]
    for i, (name, pos, content, strategy, count, color, icon_fn) in enumerate(lists):
        x = 160 + i * 540
        svg += f'<path d="{hd_rect(x, 320, 450, 420)}" fill="{color}" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.2"/>'
        svg += icon_fn(x+225, 400, 35)
        svg += hd_text(x+225, 470, name, 24, INK, 'bold', 'middle')
        svg += hd_text(x+225, 500, pos, 16, '#999999', 'normal', 'middle')
        svg += hd_text(x+225, 540, content, 14, '#555555', 'normal', 'middle')
        svg += hd_text(x+225, 575, strategy, 13, '#AAAAAA', 'normal', 'middle')
        svg += hd_text(x+225, 660, count, 36, INK, 'bold', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/05-lists.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  05-lists.svg OK')

def s06_roadmap():
    """实施路径"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '实施路径', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-100, 155, 200)
    svg += hd_text(W/2, 190, '四步走 · 三周完成', 20, '#999999', 'normal', 'middle')
    svg += page_num(6, 8)
    steps = [
        ('1', '数据收集', '1 周', '统一模板 · 每家一行', icon_checklist),
        ('2', '九宫格映射', '3 天', '高中低三分位切分', icon_grid),
        ('3', '输出三清单', '2 天', '保留/培养/优化确认', icon_checklist),
        ('4', '汇报共识', '2 天', '向易人汇报确认', icon_building),
    ]
    for i, (num, title, dur, desc, icon_fn) in enumerate(steps):
        x = 150 + i * 430
        svg += icon_fn(x+215, 400, 30)
        svg += f'<path d="{hd_rect(x+140, 480, 150, 120)}" fill="{PASTELS[i]}" stroke="{INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.2"/>'
        svg += hd_text(x+215, 520, title, 20, INK, 'bold', 'middle')
        svg += hd_text(x+215, 555, dur, 14, '#999999', 'normal', 'middle')
        svg += hd_text(x+215, 590, desc, 13, '#666666', 'normal', 'middle')
        svg += hd_text(x+215, 350, num, 22, TERRA, 'bold', 'middle')
        if i < 3:
            svg += hd_arrow(x+380, 540, x+420, 540, lw=2)
    svg += page_end()
    with open(f'{OUT_DIR}/06-roadmap.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  06-roadmap.svg OK')

def s07_takeaway():
    """关键结论"""
    svg = page_start(W, H)
    svg += hd_text(W/2, 120, '关键结论', 38, INK, 'normal', 'middle')
    svg += hd_underline(W/2-100, 155, 200)
    svg += page_num(7, 8)
    # 主结论
    svg += hd_text(W/2, 320, '分级是起点，不是终点', 34, INK, 'normal', 'middle')
    svg += hd_underline(W/2-250, 360, 500)
    takeaways = [
        ('1', '三维评估取代单一业绩维度', '业绩40% + 合规30% + 潜力30%'),
        ('2', '三张清单驱动差异化管理', '保留头部 · 培养腰部 · 优化尾部'),
        ('3', '动态调整保持供应商活力', '季度更新 · 公布进步榜'),
    ]
    for i, (num, claim, detail) in enumerate(takeaways):
        y = 460 + i * 110
        svg += hd_text(380, y, num, 22, TERRA, 'bold', 'middle')
        svg += hd_text(440, y-5, claim, 20, INK, 'normal', 'start')
        svg += hd_text(440, y+25, detail, 14, '#AAAAAA', 'normal', 'start')
    # 风险提醒
    svg += f'<path d="{hd_rect(280, 800, 1360, 70)}" fill="#FFF8E1" stroke="#CC9933" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>'
    svg += hd_text(W/2, 838, '分级不能变成"贴标签" → 强调动态性，每次公布"进步榜"', 16, '#AA8822', 'normal', 'middle')
    svg += page_end()
    with open(f'{OUT_DIR}/07-takeaway.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  07-takeaway.svg OK')

def make_contact_sheet_svg():
    """SVG 联络表"""
    files = ['00-cover.svg'] + [f'0{i+1}-{n}.svg' for i, n in enumerate(
        ['why', 'current', 'framework', 'matrix', 'lists', 'roadmap', 'takeaway'])]
    files = [f'{OUT_DIR}/{f}' for f in files]
    labels = ['封面', '为什么需要', '当前格局', '三维评估', '九宫格', '三张清单', '实施路径', '关键结论']
    cols = 4
    rows = 2
    tw, th = 440, 260
    sw = cols * (tw + 30) + 60
    sh = rows * (th + 80) + 80
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{sw}" height="{sh}" viewBox="0 0 {sw} {sh}">'
    svg += f'<rect width="{sw}" height="{sh}" fill="{BG}"/>'
    for i, (fp, label) in enumerate(zip(files, labels)):
        if not os.path.exists(fp):
            continue
        r, c = divmod(i, cols)
        ox = 45 + c * (tw + 30)
        oy = 45 + r * (th + 80)
        # Read and embed SVG
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
        # Extract inner content
        import re
        m = re.search(r'<svg[^>]*>(.*)</svg>', content, re.DOTALL)
        if m:
            inner = m.group(1)
            # Scale to thumbnail
            svg += f'<g transform="translate({ox},{oy}) scale({tw/W if i>0 else tw/CW},{th/H if i>0 else th/CH})">'
            svg += inner
            svg += '</g>'
        svg += hd_text(ox + (tw if i>0 else CW/2)/2, oy + th + 35, f'{i+1}. {label}', 16, '#666666', 'normal', 'middle')
    svg += '</svg>'
    with open(f'{OUT_DIR}/contact-sheet.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  contact-sheet.svg OK')

if __name__ == '__main__':
    print('Generating hand-drawn SVG PPT (viz-hand-drawn-icon DNA)...')
    s00_cover()
    s01_why()
    s02_current()
    s03_framework()
    s04_matrix()
    s05_lists()
    s06_roadmap()
    s07_takeaway()
    make_contact_sheet_svg()
    print(f'Done! {OUT_DIR}')
    print(f'Files: {sorted(os.listdir(OUT_DIR))}')
