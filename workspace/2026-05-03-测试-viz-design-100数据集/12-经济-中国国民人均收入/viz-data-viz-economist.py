"""
倍数在缩小，鸿沟在扩大：中国城乡收入十年
The Economist 风格 — 多折线图（时间序列）
2015-2024 城镇/农村人均可支配收入 + 人均消费支出
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.font_manager import FontProperties

font_path = '/System/Library/Fonts/STHeiti Light.ttc'
fp      = FontProperties(fname=font_path)
fp_bold = FontProperties(fname=font_path, weight='bold')

ECON_RED   = '#E3120B'
ECON_BLUE  = '#006BA2'
ECON_GREY  = '#758D99'
ECON_GRID  = '#A8BAC4'
TEXT_DARK  = '#121212'
TEXT_SUB   = '#555555'

LEFT_X     = 0.10
RED_LINE_Y = 0.975
TAG_W, TAG_H = 0.040, 0.022
TITLE_Y    = 0.940
SUBTITLE_Y = 0.885
SOURCE_Y   = 0.025

# ── 数据 ─────────────────────────────────────────────
years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
urban = [31195, 33616, 36396, 39251, 42359, 43834, 47412, 49283, 51821, 54388]
rural = [11422, 12363, 13432, 14617, 16021, 17131, 18931, 20133, 21691, 23119]
consumption = [15712, 17111, 18322, 19853, 21559, 21210, 24100, 24538, 26796, 28227]

series = [
    ('城镇人均可支配收入', urban,       ECON_BLUE),  # 重点
    ('农村人均可支配收入', rural,       ECON_GREY),   # 灰化对照
    ('人均消费支出',       consumption,  '#C43B30'),  # 红色强调消费
]

# ── 画布 ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(11, 7))
fig.patch.set_facecolor('white'); ax.set_facecolor('white')
fig.subplots_adjust(left=0.11, right=0.86, top=0.80, bottom=0.12)

# ── 折线 ─────────────────────────────────────────────
for name, vals, color in series:
    lw = 2.5 if name != '人均消费支出' else 1.5
    ms = 6 if name != '人均消费支出' else 4
    ax.plot(years, vals, color=color, linewidth=lw,
            marker='o', markersize=ms, markerfacecolor=color,
            markeredgecolor='white', markeredgewidth=1.5, zorder=3)

# 末端系列名（替代图例）
ax.text(years[-1] + 0.15, urban[-1], '城镇人均可支配收入',
        fontproperties=fp_bold, fontsize=10, color=ECON_BLUE,
        va='center', ha='left')
ax.text(years[-1] + 0.15, rural[-1], '农村人均可支配收入',
        fontproperties=fp, fontsize=9.5, color=ECON_GREY,
        va='center', ha='left')
ax.text(years[-1] + 0.15, consumption[-1], '人均消费支出',
        fontproperties=fp, fontsize=9, color='#C43B30',
        va='center', ha='left')

# 末端数值
for vals, color, dy in [(urban, ECON_BLUE, 1800),
                         (rural, ECON_GREY, -1500),
                         (consumption, '#C43B30', -1500)]:
    ax.text(years[-1], vals[-1] + dy, f'{vals[-1]:,}',
            fontproperties=fp, fontsize=10, color=color,
            va='center', ha='center', fontweight='bold' if color == ECON_BLUE else 'normal')

# 坐标轴
ax.set_xticks(years)
ax.set_xticklabels([str(y) for y in years], fontsize=11, color=TEXT_DARK)
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda v, _: f'{int(v):,}'))
ax.set_xlim(years[0] - 0.3, years[-1] + 1.8)
ax.set_ylim(10000, 60000)

# 边框 + 网格
for spine in ax.spines.values():
    spine.set_visible(False)
ax.spines['bottom'].set_visible(True)
ax.spines['bottom'].set_color('#444444')
ax.spines['bottom'].set_linewidth(1.2)
ax.yaxis.grid(True, color=ECON_GRID, linewidth=0.8, zorder=0, linestyle='--')
ax.xaxis.grid(False)
ax.set_axisbelow(True)
ax.tick_params(axis='both', length=0, labelsize=10, labelcolor=ECON_GREY)
ax.tick_params(axis='x', labelsize=11, labelcolor=TEXT_DARK)

# ── 红线 + 红色方块 tag ───────────────────────────────
ax.plot([LEFT_X, 1.0], [RED_LINE_Y, RED_LINE_Y],
        transform=fig.transFigure, clip_on=False,
        color=ECON_RED, linewidth=2.5, solid_capstyle='butt', zorder=20)
ax.add_patch(mpatches.Rectangle(
    xy=(LEFT_X, RED_LINE_Y - TAG_H), width=TAG_W, height=TAG_H,
    facecolor=ECON_RED, edgecolor='none',
    transform=fig.transFigure, clip_on=False, zorder=20))

# ── 标题 / 副标题 / 来源 ──────────────────────────────
fig.text(LEFT_X + TAG_W + 0.01, TITLE_Y, '倍数在缩小，鸿沟在扩大',
         fontproperties=fp_bold, fontsize=14, color=TEXT_DARK, va='top', ha='left')
fig.text(LEFT_X, SUBTITLE_Y, '2015-2024，城镇/农村人均可支配收入（元） | GNI 人均 $13,660（2024）',
         fontproperties=fp, fontsize=10, color=TEXT_SUB, va='top', ha='left')
fig.text(LEFT_X, SOURCE_Y, '来源：国家统计局，2015-2024；GNI 来源 World Bank',
         fontproperties=fp, fontsize=9, color=ECON_GREY, va='bottom', ha='left')

# ── 标注 ─────────────────────────────────────────────
# 2020 疫情冲击
ax.annotate('疫情冲击\n消费停滞', xy=(2020, consumption[5]),
            xytext=(2018.8, consumption[5] - 5000),
            fontproperties=fp, fontsize=9, color=TEXT_SUB,
            arrowprops=dict(arrowstyle='->', color=ECON_RED, lw=1.0),
            ha='center', va='top')

# 2015 城乡比
ax.annotate('城乡比 2.7x', xy=(2015, urban[0]),
            xytext=(2016.0, urban[0] + 2500),
            fontproperties=fp, fontsize=9, color=ECON_BLUE, fontweight='bold',
            arrowprops=dict(arrowstyle='-', color=ECON_BLUE, lw=1.0),
            ha='left', va='bottom')

# 2024 城乡比 + 差距
ax.annotate('城乡比 2.4x | 差距 31,269 元', xy=(2024, urban[-1]),
            xytext=(2022.0, urban[-1] + 2500),
            fontproperties=fp, fontsize=9, color=ECON_BLUE, fontweight='bold',
            arrowprops=dict(arrowstyle='-', color=ECON_BLUE, lw=1.0),
            ha='left', va='bottom')

plt.savefig('viz-data-viz-economist.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()
print("Saved: viz-data-viz-economist.png")
