"""
金融电销 Q1 运营数据 — 4 张管理层汇报图表
matplotlib + seaborn 渲染，输出 SVG
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import seaborn as sns
import numpy as np
import os

# ── 全局样式 ──
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'Helvetica', 'Noto Sans'],
    'axes.unicode_minus': False,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
    'axes.edgecolor': '#ada599',
    'axes.labelcolor': '#857d74',
    'xtick.color': '#857d74',
    'ytick.color': '#857d74',
    'grid.color': '#f2f0eb',
    'grid.linestyle': '--',
    'font.size': 11,
})

# 中文字体 — 直接用 STHeiti 字体文件，绕过 fallback 链避免缺字
_STHEITI_PATH = '/System/Library/AssetsV2/com_apple_MobileAsset_Font7/eb257c12d1a51c8c661b89f30eec56cacf9b8987.asset/AssetData/STHEITI.ttf'
fm.fontManager.addfont(_STHEITI_PATH)
plt.rcParams['font.sans-serif'] = ['STHeiti'] + plt.rcParams['font.sans-serif']

# 配色
TEAL   = '#2e8b6e'
STONE  = '#ada599'
CORAL  = '#c25030'
WARM   = '#c26d3a'
LABEL  = '#857d74'
GRID   = '#f2f0eb'

OUT = os.path.dirname(os.path.abspath(__file__))

# ════════════════════════════════════════════════
# 图 1：水平条形图 — 团队业绩总览
# ════════════════════════════════════════════════
def fig1():
    teams = ['B组', 'D组', 'E组', 'A组', 'C组', 'F组']
    vals  = [11955, 10848, 10119, 10014, 7392, 6993]
    mean_val = 9554
    colors = [TEAL, TEAL, TEAL, TEAL, STONE, STONE]

    fig, ax = plt.subplots(figsize=(8, 4), dpi=150)

    bars = ax.barh(teams[::-1], vals[::-1], color=colors[::-1], height=0.6, edgecolor='none')

    # 均值参考线
    ax.axvline(mean_val, color=CORAL, linestyle='--', linewidth=1.2, zorder=3)
    ax.text(mean_val + 80, 5.45, f'均值 {mean_val:,}', color=CORAL, fontsize=9, va='bottom')

    # 数值标签
    for bar, v in zip(bars, vals[::-1]):
        ax.text(v + 120, bar.get_y() + bar.get_height() / 2,
                f'{v:,}', va='center', ha='left', fontsize=10, color='#5a5349')

    # B 组标注
    pct_b = (11955 - mean_val) / mean_val * 100
    ax.annotate(f'领先均值 {pct_b:.0f}%',
                xy=(11955, 0), xytext=(11955 + 800, -0.35),
                fontsize=9, color=TEAL, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=TEAL, lw=0.8))

    # F 组标注
    ratio_f = 6993 / 11955 * 100
    ax.annotate(f'仅为 B 组的 {ratio_f:.1f}%',
                xy=(6993, 5), xytext=(6993 + 1200, 5.5),
                fontsize=9, color=CORAL, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=CORAL, lw=0.8))

    ax.set_xlabel('成交金额（万元）', fontsize=11)
    ax.set_xlim(0, 14500)
    ax.xaxis.grid(True, linestyle='--', color=GRID)
    ax.yaxis.grid(False)
    ax.set_title('B 组成交额领先 F 组 62%，6 团队差距显著',
                 fontsize=16, fontweight='600', color='#6b3410', pad=18, loc='left')
    ax.text(0, 1.02, '2025年 Q1 电销中心运营数据',
            transform=ax.transAxes, fontsize=11, color=LABEL)
    ax.tick_params(axis='y', length=0)
    ax.tick_params(axis='x', length=0)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    fig.tight_layout()
    fig.savefig(os.path.join(OUT, 'fig1-bar.svg'), format='svg', bbox_inches='tight')
    plt.close(fig)
    print('fig1-bar.svg done')


# ════════════════════════════════════════════════
# 图 2：多折线图 — 月度转化率趋势
# ════════════════════════════════════════════════
def fig2():
    months = ['1月', '2月', '3月']
    x = np.arange(len(months))

    data = {
        'A组': [2.0, 2.3, 2.3],
        'B组': [2.3, 2.8, 2.6],
        'C组': [1.7, 1.9, 1.7],
        'D组': [2.2, 2.6, 2.5],
        'E组': [2.0, 2.5, 2.3],
        'F组': [1.7, 1.9, 1.7],
    }

    # 分组样式
    style = {
        'B组': dict(color=TEAL,  linewidth=2.5, linestyle='-',  marker='o', markersize=6, zorder=4),
        'D组': dict(color=TEAL,  linewidth=2.5, linestyle='-',  marker='o', markersize=6, zorder=4),
        'A组': dict(color=WARM,  linewidth=1.5, linestyle='-',  marker='s', markersize=4, zorder=3),
        'E组': dict(color=WARM,  linewidth=1.5, linestyle='-',  marker='s', markersize=4, zorder=3),
        'C组': dict(color=STONE, linewidth=1.0, linestyle='--', marker='^', markersize=4, zorder=2),
        'F组': dict(color=STONE, linewidth=1.0, linestyle='--', marker='^', markersize=4, zorder=2),
    }

    fig, ax = plt.subplots(figsize=(8, 4), dpi=150)

    for team, rates in data.items():
        s = style[team]
        ax.plot(x, rates, label=team, **s)

    # B 组峰值标注
    ax.annotate('峰值 2.8%',
                xy=(1, 2.8), xytext=(1.35, 2.92),
                fontsize=9, color=TEAL, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=TEAL, lw=0.8))

    # 右侧双箭头：头尾差距
    ax.annotate('', xy=(2.08, 2.6), xytext=(2.08, 1.7),
                arrowprops=dict(arrowstyle='<->', color=CORAL, lw=1.2))
    ax.text(2.14, 2.15, '0.9pp', fontsize=9, color=CORAL, fontweight='600', va='center')

    ax.set_xticks(x)
    ax.set_xticklabels(months)
    ax.set_ylabel('转化率（%）')
    ax.set_ylim(1.5, 3.0)
    ax.yaxis.grid(True, linestyle='--', color=GRID)
    ax.xaxis.grid(False)
    ax.set_title('B/D 转化率稳步上升，C/F 三月无进展',
                 fontsize=16, fontweight='600', color='#6b3410', pad=18, loc='left')
    ax.text(0, 1.02, '2025年 Q1 月度转化率变化',
            transform=ax.transAxes, fontsize=11, color=LABEL)
    ax.legend(loc='upper left', bbox_to_anchor=(0.82, 0.98), frameon=False,
              fontsize=9, labelcolor=LABEL)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    fig.tight_layout()
    fig.savefig(os.path.join(OUT, 'fig2-line.svg'), format='svg', bbox_inches='tight')
    plt.close(fig)
    print('fig2-line.svg done')


# ════════════════════════════════════════════════
# 图 3：漏斗图 — 转化漏斗
# ════════════════════════════════════════════════
def fig3():
    # 精确计算
    outbound = {
        'A': [186240, 142560, 194400],
        'B': [172800, 138240, 185760],
        'C': [191520, 151200, 201600],
        'D': [164160, 134400, 176640],
        'E': [179520, 146880, 190080],
        'F': [168480, 136320, 181440],
    }
    connected = {
        'A': [52147, 42768, 56572],
        'B': [51840, 44237, 59443],
        'C': [49995, 39312, 50400],
        'D': [49248, 42048, 56525],
        'E': [50266, 43479, 55123],
        'F': [47174, 37740, 47174],
    }
    intent = {
        'A': [5214, 4704, 6223],
        'B': [5702, 5309, 7133],
        'C': [4500, 3931, 4536],
        'D': [5417, 5046, 6783],
        'E': [5027, 5217, 6064],
        'F': [4246, 3774, 4246],
    }
    deals = {
        'A': [1042, 989, 1307],
        'B': [1197, 1220, 1568],
        'C': [855, 747, 862],
        'D': [1083, 1109, 1424],
        'E': [1005, 1095, 1273],
        'F': [807, 717, 807],
    }

    total_outbound = sum(sum(v) for v in outbound.values())
    total_connected = sum(sum(v) for v in connected.values())
    total_intent = sum(sum(v) for v in intent.values())
    total_deals = sum(sum(v) for v in deals.values())

    stages = [
        ('外呼总量', total_outbound, ''),
        ('接通量',   total_connected, f'{total_connected/total_outbound*100:.1f}%'),
        ('意向客户', total_intent,    f'{total_intent/total_connected*100:.1f}%'),
        ('成交单数', total_deals,     f'{total_deals/total_intent*100:.1f}%'),
    ]

    max_val = stages[0][1]
    n = len(stages)

    fig, ax = plt.subplots(figsize=(6, 5), dpi=150)
    ax.set_xlim(-0.55, 0.55)
    ax.set_ylim(-0.8, n + 0.2)
    ax.axis('off')

    # 漏斗颜色
    funnel_colors = [
        TEAL,        # 外呼
        CORAL,       # 接通（瓶颈）
        '#3a9e7e',   # 意向（浅 teal）
        TEAL,        # 成交
    ]

    for i, (label, val, rate) in enumerate(stages):
        half_w = 0.5 * (val / max_val)
        y = n - 1 - i
        next_half_w = 0.5 * (stages[i + 1][1] / max_val) if i < n - 1 else half_w * 0.3

        # 梯形
        trap_x = [-half_w, half_w, next_half_w, -next_half_w]
        trap_y = [y, y, y - 0.85, y - 0.85]
        ax.fill(trap_x, trap_y, color=funnel_colors[i], alpha=0.85, edgecolor='white', linewidth=2)

        # 阶段名 + 数量（居中）
        ax.text(0, y - 0.35, f'{label}\n{val:,}',
                ha='center', va='center', fontsize=11, fontweight='600', color='white')

        # 右侧环节转化率
        if rate:
            ax.text(0.53, y - 0.35, f'→ {rate}',
                    ha='left', va='center', fontsize=9, color=LABEL)

    # 接通步骤瓶颈标注
    conn_rate = (1 - total_connected / total_outbound) * 100
    ax.annotate(f'{conn_rate:.1f}% 未接通 = 最大浪费点',
                xy=(0.35, n - 1 - 0.85), xytext=(0.35, n - 1 - 1.5),
                fontsize=9, color=CORAL, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=CORAL, lw=0.8))

    ax.set_title('71% 外呼未接通，接通率是最大瓶颈',
                 fontsize=16, fontweight='600', color='#6b3410', pad=15, loc='center')

    fig.tight_layout()
    fig.savefig(os.path.join(OUT, 'fig3-funnel.svg'), format='svg', bbox_inches='tight')
    plt.close(fig)
    print('fig3-funnel.svg done')


# ════════════════════════════════════════════════
# 图 4：散点图+象限 — 通话时长 vs 转化率
# ════════════════════════════════════════════════
def fig4():
    data = {
        'A': [(312, 2.0), (335, 2.3), (325, 2.3)],
        'B': [(327, 2.3), (348, 2.8), (352, 2.6)],
        'C': [(285, 1.7), (291, 1.9), (295, 1.7)],
        'D': [(318, 2.2), (338, 2.6), (342, 2.5)],
        'E': [(305, 2.0), (325, 2.5), (318, 2.3)],
        'F': [(278, 1.7), (282, 1.9), (275, 1.7)],
    }

    mean_x, mean_y = 314, 2.2

    group_style = {
        'B': dict(color=TEAL,  s=120, marker='o', label='B/D 高效组'),
        'D': dict(color=TEAL,  s=120, marker='o', label='_nolegend_'),
        'C': dict(color=STONE, s=60,  marker='o', label='C/F 低效组'),
        'F': dict(color=STONE, s=60,  marker='o', label='_nolegend_'),
        'A': dict(color=WARM,  s=80,  marker='o', label='A/E 稳步组'),
        'E': dict(color=WARM,  s=80,  marker='o', label='_nolegend_'),
    }

    fig, ax = plt.subplots(figsize=(8, 5), dpi=150)

    # 象限背景
    ax.axhspan(mean_y, 3.0, xmin=0, xmax=0.5, facecolor='#e8f0f5', alpha=0.5)  # 左上 潜力
    ax.axhspan(mean_y, 3.0, xmin=0.5, xmax=1, facecolor='#e8f5f0', alpha=0.5)  # 右上 高价值
    ax.axhspan(1.4, mean_y, xmin=0, xmax=0.5, facecolor='#f5f3f0', alpha=0.5)  # 左下 低效
    ax.axhspan(1.4, mean_y, xmin=0.5, xmax=1, facecolor='#f5e8e4', alpha=0.5)  # 右下 过度投入

    # 象限标签
    label_kw = dict(fontsize=10, color='#a09890', fontstyle='italic', ha='center', va='center', alpha=0.7)
    ax.text(295, 2.85, '潜力', **label_kw)
    ax.text(340, 2.85, '高价值', **label_kw)
    ax.text(295, 1.55, '低效', **label_kw)
    ax.text(340, 1.55, '过度投入', **label_kw)

    # 散点
    for team, points in data.items():
        s = group_style[team]
        xs = [p[0] for p in points]
        ys = [p[1] for p in points]
        ax.scatter(xs, ys, c=s['color'], s=s['s'], marker=s['marker'],
                   label=s['label'], edgecolors='white', linewidths=0.5, zorder=5)

    # 均值十字线
    ax.axvline(mean_x, color=CORAL, linestyle='--', linewidth=1.0, alpha=0.7, zorder=3)
    ax.axhline(mean_y, color=CORAL, linestyle='--', linewidth=1.0, alpha=0.7, zorder=3)

    # C 组 3 月标注
    ax.annotate('无效忙碌',
                xy=(295, 1.7), xytext=(270, 1.48),
                fontsize=9, color=STONE, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=STONE, lw=0.8))

    # B 组 2 月标注
    ax.annotate('标杆',
                xy=(348, 2.8), xytext=(355, 2.9),
                fontsize=9, color=TEAL, fontweight='600',
                arrowprops=dict(arrowstyle='->', color=TEAL, lw=0.8))

    ax.set_xlabel('平均通话时长（秒）', fontsize=11)
    ax.set_ylabel('转化率（%）', fontsize=11)
    ax.set_xlim(265, 365)
    ax.set_ylim(1.4, 3.0)
    ax.yaxis.grid(True, linestyle='--', color=GRID)
    ax.xaxis.grid(True, linestyle='--', color=GRID)
    ax.set_title('通话时长是转化率核心杠杆',
                 fontsize=16, fontweight='600', color='#6b3410', pad=18, loc='left')
    ax.legend(loc='lower right', frameon=False, fontsize=9, labelcolor=LABEL)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    fig.tight_layout()
    fig.savefig(os.path.join(OUT, 'fig4-scatter.svg'), format='svg', bbox_inches='tight')
    plt.close(fig)
    print('fig4-scatter.svg done')


# ── 执行 ──
if __name__ == '__main__':
    fig1()
    fig2()
    fig3()
    fig4()
    print('All 4 figures rendered.')
