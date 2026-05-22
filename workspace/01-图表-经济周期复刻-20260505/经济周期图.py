import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.dates as mdates
import numpy as np
import pandas as pd
from datetime import datetime

# ── 字体 ──
plt.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["STHeiti", "Arial", "DejaVu Sans"],
    "axes.unicode_minus": False,
    "svg.fonttype": "none",
    "pdf.fonttype": 42,
})

# ── 模拟数据 ──
quarters = pd.date_range("2006-01-01", "2018-10-01", freq="QS")
n = len(quarters)

# GDP 同比增速（模拟真实走势）
gdp = [10.4, 11.4, 12.2, 11.6,  # 2006
       11.5, 12.0, 12.2, 11.2,  # 2007
       10.6, 10.2, 9.0, 6.8,   # 2008 危机
       6.4, 7.5, 8.2, 9.2,     # 2009 刺激
       10.6, 10.3, 9.6, 9.8,   # 2010
       9.7, 9.5, 9.1, 8.9,     # 2011
       8.1, 7.6, 7.5, 7.9,     # 2012
       7.8, 7.6, 7.8, 7.7,     # 2013
       7.4, 7.5, 7.3, 7.3,     # 2014
       7.0, 7.0, 6.9, 6.8,     # 2015
       6.7, 6.7, 6.7, 6.8,     # 2016
       6.9, 6.9, 6.8, 6.8,     # 2017
       6.8, 6.7, 6.5, 6.5]     # 2018

# 工业增加值（比GDP波动更大）
iva = [12.5, 14.0, 15.2, 14.2,
       14.0, 15.5, 16.0, 14.0,
       13.0, 12.0, 8.2, 5.0,
       5.1, 8.5, 11.0, 14.0,
       16.0, 15.5, 13.5, 14.0,
       14.2, 13.8, 13.0, 12.5,
       11.5, 10.5, 10.0, 10.5,
       10.0, 9.8, 10.0, 10.2,
       9.5, 9.2, 8.8, 8.5,
       7.5, 7.0, 6.5, 6.2,
       6.0, 6.2, 6.5, 6.8,
       7.0, 7.2, 6.8, 6.5,
       6.5, 6.3, 6.0, 5.8]

# PMI（50为荣枯线）
pmi = [52.0, 53.5, 54.5, 53.0,
       54.0, 55.0, 55.5, 52.0,
       51.0, 50.0, 45.0, 41.0,
       42.0, 48.0, 52.5, 55.0,
       55.5, 54.0, 52.0, 53.0,
       53.5, 53.0, 51.5, 50.5,
       50.0, 49.0, 49.5, 50.5,
       51.0, 50.5, 51.0, 51.5,
       50.5, 50.8, 51.0, 50.0,
       49.5, 49.0, 48.5, 48.0,
       49.0, 50.0, 50.5, 51.0,
       51.5, 51.8, 51.5, 51.0,
       51.0, 50.5, 50.0, 49.5]

# ── 周期阶段区域 ──
# (start, end, color, alpha)
spans = [
    # 繁荣期（绿色）
    ("2006-01-01", "2007-09-01", "#8BC34A", 0.15),
    ("2009-06-01", "2010-06-01", "#8BC34A", 0.15),
    ("2012-12-01", "2013-06-01", "#8BC34A", 0.15),
    ("2016-06-01", "2017-06-01", "#8BC34A", 0.15),
    # 衰退期（红色）
    ("2007-09-01", "2008-12-01", "#F44336", 0.12),
    ("2010-06-01", "2012-03-01", "#F44336", 0.12),
    ("2013-06-01", "2015-06-01", "#F44336", 0.12),
    ("2017-06-01", "2018-10-01", "#F44336", 0.12),
    # 复苏期（蓝色）
    ("2008-12-01", "2009-06-01", "#2196F3", 0.12),
    ("2012-03-01", "2012-12-01", "#2196F3", 0.12),
    ("2015-06-01", "2016-06-01", "#2196F3", 0.12),
]

# ── 关键事件标注 ──
events = [
    ("2008-06-01", "美国次贷危机\n深化"),
    ("2008-12-01", "中国四万亿\n刺激计划"),
    ("2010-06-01", "产能过剩\n加剧"),
    ("2012-03-01", "稳增长\n发力"),
    ("2013-06-01", "钱荒"),
    ("2015-03-01", "中美贸易\n战升级"),
    ("2015-09-01", "汇率改革\n811汇改"),
    ("2016-06-01", "供给侧结构性改革\n三去一降一补"),
    ("2017-06-01", "棚改货币化"),
    ("2018-06-01", "中美贸易战\n升级"),
    ("2018-09-01", "稳增长"),
]

# ── 周期标注线 ──
cycle_lines = [
    ("2007-09-01", "#4CAF50", "周期顶点", "-"),    # 绿色实线
    ("2008-12-01", "#FF9800", "政策底", "--"),       # 橙色虚线
    ("2009-03-01", "#9C27B0", "周期底部", ":"),      # 紫色虚线
    ("2010-06-01", "#4CAF50", "周期顶点", "-"),
    ("2012-03-01", "#FF9800", "政策底", "--"),
    ("2012-09-01", "#9C27B0", "周期底部", ":"),
    ("2013-06-01", "#4CAF50", "周期顶点", "-"),
    ("2015-03-01", "#FF9800", "政策底", "--"),
    ("2015-09-01", "#9C27B0", "周期底部", ":"),
    ("2017-06-01", "#4CAF50", "周期顶点", "-"),
    ("2018-03-01", "#FF9800", "政策底", "--"),
]

# ── 绘图 ──
fig, ax = plt.subplots(figsize=(16, 8))

# 背景区域
for start, end, color, alpha in spans:
    ax.axvspan(datetime.strptime(start, "%Y-%m-%d"),
               datetime.strptime(end, "%Y-%m-%d"),
               color=color, alpha=alpha, zorder=0)

# 周期标注线
plotted_labels = set()
for date_str, color, label, ls in cycle_lines:
    lbl = label if label not in plotted_labels else None
    ax.axvline(datetime.strptime(date_str, "%Y-%m-%d"),
               color=color, linewidth=1.2, linestyle=ls,
               alpha=0.7, zorder=1, label=lbl)
    plotted_labels.add(label)

# 三条线
ax.plot(quarters, gdp, color="#1A237E", linewidth=2.0, label="GDP 同比（%）", zorder=3)
ax.plot(quarters, iva, color="#42A5F5", linewidth=1.5, alpha=0.8, label="工业增加值（%）", zorder=3)
ax.plot(quarters, pmi, color="#E53935", linewidth=1.5, alpha=0.8, label="PMI", zorder=3)

# PMI 荣枯线
ax.axhline(50, color="#9E9E9E", linewidth=0.8, linestyle="-.", alpha=0.5, zorder=1)
ax.text(datetime(2006, 1, 15), 50.8, "荣枯线", fontsize=8, color="#757575")

# 事件标注（交替上下）
y_positions = [62, 58, 62, 58, 62, 58, 62, 58, 62, 58, 62]
for i, (date_str, text) in enumerate(events):
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    y = y_positions[i % len(y_positions)]
    ax.annotate(text, xy=(dt, 35), xytext=(dt, y),
                fontsize=7.5, ha="center", va="bottom",
                color="#333333",
                arrowprops=dict(arrowstyle="-", color="#BDBDBD", lw=0.8),
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                          edgecolor="#E0E0E0", alpha=0.9),
                zorder=5)

# 坐标轴
ax.set_xlim(datetime(2005, 10, 1), datetime(2019, 3, 1))
ax.set_ylim(35, 65)
ax.xaxis.set_major_locator(mdates.YearLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter("%Y"))
ax.set_ylabel("增速（%）", fontsize=11)
ax.set_xlabel("")
ax.tick_params(axis="both", labelsize=9)

# 标题
ax.set_title("中国经济周期（2006-2018）", fontsize=16, fontweight="bold", pad=20)
fig.text(0.5, 0.92, "注：周期复苏从政策底开始，经历上行、顶点、衰退，到底部再进入下一个周期",
         ha="center", fontsize=10, color="#666666")

# 图例
ax.legend(loc="upper right", fontsize=9, frameon=True,
          facecolor="white", edgecolor="#E0E0E0", framealpha=0.9)

# 去掉上右边框
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_linewidth(0.8)
ax.spines["bottom"].set_linewidth(0.8)

plt.tight_layout()
plt.subplots_adjust(top=0.88)
plt.savefig("/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/01-图表-经济周期复刻-20260505/经济周期图.svg",
            bbox_inches="tight")
plt.savefig("/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/01-图表-经济周期复刻-20260505/经济周期图.png",
            dpi=300, bbox_inches="tight")
print("Done")
