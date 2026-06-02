#!/usr/bin/env Rscript
# ============================================================
# 金融电销 Q1 运营数据 — 4 张管理层汇报图表
# R + ggplot2 + ggrepel + svglite
# ============================================================

library(ggplot2)
library(ggrepel)
library(svglite)
library(showtext)

# --- 中文字体 ---
font_add("STHeiti", "/System/Library/Fonts/STHeiti Medium.ttc")
showtext_auto()

# --- 输出目录（svglite 不支持中文路径，用 /tmp 再复制） ---
out_dir <- "/tmp/r-viz-output"
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)
final_dir <- "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/金融电销-Q1运营数据-20260505"

# --- 配色体系 ---
COL_TEAL    <- "#2e8b6e"
COL_STONE   <- "#ada599"
COL_CORAL   <- "#c25030"
COL_WARM    <- "#c26d3a"
COL_BG      <- "#FFFFFF"
COL_GRID    <- "#f2f0eb"
COL_AXIS    <- "#857d74"
COL_TITLE   <- "#6b3410"
COL_TEAL_D  <- "#0f5040"
COL_TEAL_L  <- "#5dbf9e"
CN_FONT     <- "STHeiti"

# --- 全局主题 ---
theme_report <- theme_classic(base_size = 11, base_family = CN_FONT) +
  theme(
    axis.line      = element_line(linewidth = 0.35, colour = COL_AXIS),
    axis.ticks     = element_line(linewidth = 0.35, colour = COL_AXIS),
    axis.text      = element_text(colour = COL_AXIS, size = 10, family = CN_FONT),
    axis.title     = element_text(colour = COL_TITLE, size = 11, family = CN_FONT),
    legend.title   = element_text(size = 10, colour = COL_TITLE, family = CN_FONT),
    legend.text    = element_text(size = 9, colour = COL_AXIS, family = CN_FONT),
    plot.title     = element_text(size = 14, face = "bold", colour = COL_TITLE, hjust = 0, family = CN_FONT),
    plot.subtitle  = element_text(size = 10, colour = COL_AXIS, hjust = 0, family = CN_FONT),
    plot.caption   = element_text(size = 8, colour = COL_STONE, hjust = 0, family = CN_FONT),
    panel.grid.major = element_line(colour = COL_GRID, linewidth = 0.3),
    panel.grid.minor = element_blank(),
    legend.position = "right",
    legend.key     = element_blank(),
    plot.margin    = margin(15, 15, 10, 10),
    text           = element_text(family = CN_FONT)
  )

# --- 保存函数 ---
save_svg <- function(plot, filename, w, h) {
  path <- file.path(out_dir, filename)
  svglite(path, width = w, height = h, system_fonts = list(sans = "STHeiti"))
  print(plot)
  dev.off()
  cat("  Saved:", path, "\n")
}

cat("=== 开始渲染 ===\n\n")

# ============================================================
# 图1：水平条形图 — 团队业绩总览
# ============================================================
cat("图1: 水平条形图...\n")

df1 <- data.frame(
  team = factor(c("B组", "D组", "E组", "A组", "C组", "F组"),
                levels = c("F组", "C组", "A组", "E组", "D组", "B组")),
  amount = c(11955, 10848, 10119, 10014, 7392, 6993),
  status = c("达标", "达标", "达标", "达标", "未达标", "未达标")
)

# 标注数据框
ann1 <- data.frame(
  team = factor(c("B组", "F组"), levels = levels(df1$team)),
  amount = c(11955, 6993),
  label = c("领先均值 25%", "仅为 B 组的 58.5%"),
  status = c("达标", "未达标")
)

p1 <- ggplot(df1, aes(x = amount, y = team, fill = status)) +
  geom_bar(stat = "identity", orientation = "y", width = 0.65, show.legend = FALSE) +
  geom_vline(xintercept = 9554, linetype = "dashed", colour = COL_CORAL, linewidth = 0.5) +
  annotate("text", x = 9554, y = 0.4, label = "均值 9,554", hjust = -0.05,
           size = 3, colour = COL_CORAL, family = CN_FONT, fontface = "italic") +
  geom_text_repel(
    data = ann1,
    aes(x = amount, y = team, label = label),
    direction = "both",
    nudge_x = 800,
    hjust = 0,
    size = 3.2,
    colour = COL_CORAL,
    family = CN_FONT,
    fontface = "bold",
    segment.colour = COL_STONE,
    segment.size = 0.3,
    min.segment.length = 0,
    box.padding = 0.3,
    point.padding = 0.2,
    seed = 42,
    max.overlaps = 20
  ) +
  # 条内数值
  geom_text(aes(label = scales::comma(amount)), hjust = 1.1, size = 3.2,
            colour = "white", family = CN_FONT, fontface = "bold") +
  scale_fill_manual(values = c("达标" = COL_TEAL, "未达标" = COL_STONE)) +
  scale_x_continuous(labels = scales::comma, expand = expansion(mult = c(0, 0.25))) +
  labs(
    title = "B 组成交额领先 F 组 62%，6 团队差距显著",
    subtitle = "2025年 Q1 电销中心运营数据",
    x = "成交金额（万元）",
    y = NULL
  ) +
  theme_report +
  theme(
    panel.grid.major.y = element_blank(),
    axis.text.y = element_text(face = "bold", size = 11, colour = COL_TITLE)
  )

save_svg(p1, "r-fig1-bar.svg", 8, 4)

# ============================================================
# 图2：多折线图 — 月度转化率趋势
# ============================================================
cat("图2: 多折线图...\n")

df2 <- data.frame(
  month = factor(rep(c("1月", "2月", "3月"), each = 6), levels = c("1月", "2月", "3月")),
  team = rep(c("A组", "B组", "C组", "D组", "E组", "F组"), 3),
  rate = c(2.0, 2.3, 1.7, 2.2, 2.0, 1.7,
           2.3, 2.8, 1.9, 2.6, 2.5, 1.9,
           2.3, 2.6, 1.7, 2.5, 2.3, 1.7),
  group = rep(c("稳步", "上升", "停滞", "上升", "稳步", "停滞"), 3)
)

# 线条样式映射
line_styles <- c("上升" = "solid", "稳步" = "solid", "停滞" = "dashed")
line_widths <- c("上升" = 1.2, "稳步" = 0.8, "停滞" = 0.5)
line_colors <- c("A组" = COL_WARM, "B组" = COL_TEAL, "C组" = COL_STONE,
                 "D组" = COL_TEAL, "E组" = COL_WARM, "F组" = COL_STONE)

# 峰值标注数据
ann_peak <- data.frame(
  month = factor("2月", levels = c("1月", "2月", "3月")),
  team = "B组",
  rate = 2.8,
  label = "峰值 2.8%"
)

# 3月端点数据（用于右端标注差距）
endpoints <- subset(df2, month == "3月")

# 线宽和线型映射到 group 列
df2$line_w <- as.numeric(line_widths[df2$group])
df2$line_lt <- line_styles[df2$group]

p2 <- ggplot(df2, aes(x = month, y = rate, group = team, colour = team)) +
  geom_line(aes(linewidth = line_w, linetype = line_lt)) +
  geom_point(size = 2) +
  scale_linewidth_identity() +
  scale_linetype_identity() +
  # 峰值标注
  geom_text_repel(
    data = ann_peak,
    aes(label = label),
    nudge_y = 0.15,
    nudge_x = -0.1,
    size = 3.2,
    colour = COL_TEAL,
    family = CN_FONT,
    fontface = "bold",
    segment.colour = COL_TEAL,
    segment.size = 0.4,
    point.padding = 0.2,
    box.padding = 0.3,
    seed = 42,
    max.overlaps = 20
  ) +
  # 右端差距标注（双箭头）
  annotate("segment",
    x = 3.25, xend = 3.25,
    y = min(subset(df2, month == "3月")$rate),
    yend = max(subset(df2, month == "3月")$rate),
    arrow = arrow(ends = "both", length = unit(0.08, "inches")),
    colour = COL_CORAL, linewidth = 0.5
  ) +
  annotate("text",
    x = 3.38, y = mean(subset(df2, month == "3月")$rate),
    label = "0.9pp",
    size = 3.2, colour = COL_CORAL, family = CN_FONT, fontface = "bold", hjust = 0
  ) +
  scale_colour_manual(values = line_colors) +
  scale_y_continuous(limits = c(1.5, 3.2), breaks = seq(1.5, 3.0, 0.5)) +
  guides(colour = guide_legend(override.aes = list(
    linewidth = c(0.8, 1.2, 0.5, 1.2, 0.8, 0.5),
    linetype = c("solid", "solid", "dashed", "solid", "solid", "dashed"),
    size = c(2, 2.5, 1.5, 2.5, 2, 1.5)
  ))) +
  labs(
    title = "B/D 转化率稳步上升，C/F 三月无进展",
    subtitle = "2025年 Q1 月度转化率变化",
    x = NULL,
    y = "转化率（%）",
    colour = "团队"
  ) +
  theme_report +
  theme(
    panel.grid.major.x = element_blank()
  )

save_svg(p2, "r-fig2-line.svg", 8, 4)

# ============================================================
# 图3：漏斗图 — 转化漏斗（精心设计版）
# ============================================================
cat("图3: 漏斗图...\n")

# 计算汇总数据
total_calls <- 186240+172800+191520+164160+179520+168480 +
               142560+138240+151200+134400+146880+136320 +
               194400+185760+201600+176640+190080+181440

total_connected <- 52147+51840+49995+49248+50266+47174 +
                   42768+44237+39312+42048+43479+37740 +
                   56572+59443+50400+56525+55123+47174

total_intent <- 5214+5702+4500+5417+5027+4246 +
                4704+5309+3931+5046+5217+3774 +
                6223+7133+4536+6783+6064+4246

total_deals <- 1042+1197+855+1083+1005+807 +
               989+1220+747+1109+1095+717 +
               1307+1568+862+1424+1273+807

df3 <- data.frame(
  stage = c("外呼总量", "接通量", "意向客户", "成交单数"),
  value = c(total_calls, total_connected, total_intent, total_deals)
)

# 转化率计算
conv_rates <- c(
  NA,
  total_connected / total_calls * 100,
  total_intent / total_connected * 100,
  total_deals / total_intent * 100
)
conv_labels <- c(
  "",
  paste0(round(conv_rates[2], 1), "%"),
  paste0(round(conv_rates[3], 1), "%"),
  paste0(round(conv_rates[4], 1), "%")
)

# 构建矩形数据
n <- nrow(df3)
max_val <- max(df3$value)
bar_height <- 0.8
gap <- 0.2

# 用幂次缩放（sqrt）让底部步骤可见，同时保持从宽到窄的视觉递减
scaled <- sqrt(df3$value / max_val)  # 0-1 范围，但底部的值被放大

df3_rect <- data.frame(
  xmin = -scaled / 2,
  xmax =  scaled / 2,
  ymin = seq(0, by = -(bar_height + gap), length.out = n),
  ymax = seq(0, by = -(bar_height + gap), length.out = n) - bar_height,
  stage = df3$stage,
  value = df3$value,
  fill_color = c(COL_TEAL_D, COL_CORAL, COL_TEAL, COL_TEAL_L),
  conv_label = conv_labels
)

# y 中心
df3_rect$ycenter <- (df3_rect$ymin + df3_rect$ymax) / 2

# 环节转化率标注位置（在两个步骤之间）
conv_ann <- data.frame(
  x = 0.55,
  y = (df3_rect$ymax[-n] + df3_rect$ymin[-1]) / 2,
  label = conv_labels[-1]
)

# 瓶颈标注
bottleneck_ann <- data.frame(
  x = max(df3_rect$xmax) + 0.08,
  y = df3_rect$ycenter[2],
  label = paste0(round((1 - total_connected / total_calls) * 100, 1), "% 未接通\n= 最大浪费点")
)

p3 <- ggplot(df3_rect) +
  # 漏斗矩形
  geom_rect(aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax),
            fill = df3_rect$fill_color, colour = NA, alpha = 0.92) +
  # 步骤名称（白色，居中）
  geom_text(aes(x = 0, y = ycenter, label = stage),
            colour = "white", size = 3.8, fontface = "bold", family = CN_FONT) +
  # 数值标注（右侧）
  geom_text(aes(x = xmax + 0.02, y = ycenter, label = scales::comma(value)),
            colour = COL_AXIS, size = 3, hjust = 0, family = CN_FONT) +
  # 环节转化率（步骤之间）
  geom_text_repel(
    data = conv_ann,
    aes(x = x, y = y, label = label),
    direction = "y",
    nudge_x = 0.0,
    hjust = 0.5,
    size = 3,
    colour = COL_TITLE,
    family = CN_FONT,
    fontface = "bold",
    segment.colour = COL_STONE,
    segment.size = 0.3,
    min.segment.length = 0,
    box.padding = 0.15,
    point.padding = 0,
    seed = 42,
    max.overlaps = 20
  ) +
  # 步骤之间的小箭头
  lapply(1:(n-1), function(i) {
    annotate("segment",
      x = 0, xend = 0,
      y = df3_rect$ymax[i] - 0.02, yend = df3_rect$ymin[i+1] + 0.02,
      arrow = arrow(length = unit(0.06, "inches")),
      colour = COL_STONE, linewidth = 0.3
    )
  }) +
  # 瓶颈标注
  geom_text_repel(
    data = bottleneck_ann,
    aes(x = x, y = y, label = label),
    direction = "both",
    nudge_x = 0.08,
    hjust = 0,
    size = 3.2,
    colour = COL_CORAL,
    family = CN_FONT,
    fontface = "bold",
    segment.colour = COL_CORAL,
    segment.size = 0.4,
    min.segment.length = 0,
    box.padding = 0.3,
    point.padding = 0.2,
    seed = 42,
    max.overlaps = 20
  ) +
  labs(
    title = paste0(round((1 - total_connected / total_calls) * 100, 0), "% 外呼未接通，接通率是最大瓶颈"),
    subtitle = "2025年 Q1 电销中心六组合计转化漏斗",
    caption = "数据来源：电销中心 Q1 运营报表"
  ) +
  coord_cartesian(xlim = c(-0.65, 1.05), ylim = c(min(df3_rect$ymax) - 0.4, 0.5)) +
  theme_void(base_family = CN_FONT) +
  theme(
    plot.title    = element_text(size = 14, face = "bold", colour = COL_TITLE, hjust = 0, family = CN_FONT),
    plot.subtitle = element_text(size = 10, colour = COL_AXIS, hjust = 0, family = CN_FONT),
    plot.caption  = element_text(size = 8, colour = COL_STONE, hjust = 0, family = CN_FONT),
    plot.margin   = margin(15, 20, 10, 10)
  )

save_svg(p3, "r-fig3-funnel.svg", 7, 6)

# ============================================================
# 图4：散点图+象限 — 通话时长 vs 转化率
# ============================================================
cat("图4: 散点图+象限...\n")

df4 <- data.frame(
  duration = c(312,335,325, 327,348,352, 285,291,295, 318,338,342, 305,325,318, 278,282,275),
  rate = c(2.0,2.3,2.3, 2.3,2.8,2.6, 1.7,1.9,1.7, 2.2,2.6,2.5, 2.0,2.5,2.3, 1.7,1.9,1.7),
  team = rep(c("A组","B组","C组","D组","E组","F组"), each = 3),
  month = rep(c("1月","2月","3月"), 6),
  group = rep(c("稳步","上升","停滞","上升","稳步","停滞"), each = 3)
)

mean_x <- mean(df4$duration)  # ~314
mean_y <- mean(df4$rate)      # ~2.2

# 颜色/大小映射
team_colors <- c("A组" = COL_WARM, "B组" = COL_TEAL, "C组" = COL_STONE,
                 "D组" = COL_TEAL, "E组" = COL_WARM, "F组" = COL_STONE)
group_sizes <- c("上升" = 3.5, "稳步" = 2.5, "停滞" = 2)

# 标注数据
ann4 <- data.frame(
  duration = c(295, 348),
  rate = c(1.7, 2.8),
  team = c("C组", "B组"),
  month = c("3月", "2月"),
  group = c("停滞", "上升"),
  label = c("无效忙碌", "标杆"),
  label_colour = c(COL_CORAL, COL_TEAL)
)

p4 <- ggplot(df4, aes(x = duration, y = rate)) +
  # 四象限背景
  annotate("rect", xmin = mean_x, xmax = Inf,  ymin = mean_y, ymax = Inf,  fill = "#e8f5f0", alpha = 0.5) +  # 右上：高价值
  annotate("rect", xmin = -Inf, xmax = mean_x, ymin = -Inf,  ymax = mean_y, fill = "#f5f3f0", alpha = 0.5) +  # 左下：低效
  annotate("rect", xmin = -Inf, xmax = mean_x, ymin = mean_y, ymax = Inf,  fill = "#e8f0f5", alpha = 0.5) +  # 左上：潜力
  annotate("rect", xmin = mean_x, xmax = Inf,  ymin = -Inf,  ymax = mean_y, fill = "#f5e8e4", alpha = 0.5) +  # 右下：过度投入
  # 均值十字线
  geom_vline(xintercept = mean_x, linetype = "dashed", colour = COL_CORAL, linewidth = 0.4) +
  geom_hline(yintercept = mean_y, linetype = "dashed", colour = COL_CORAL, linewidth = 0.4) +
  # 四角象限标签
  annotate("text", x = max(df4$duration) - 3, y = max(df4$rate) - 0.05,
           label = "高价值", size = 2.8, colour = COL_STONE, family = CN_FONT, fontface = "italic", hjust = 1) +
  annotate("text", x = min(df4$duration) + 3, y = min(df4$rate) + 0.05,
           label = "低效", size = 2.8, colour = COL_STONE, family = CN_FONT, fontface = "italic", hjust = 0) +
  annotate("text", x = min(df4$duration) + 3, y = max(df4$rate) - 0.05,
           label = "潜力", size = 2.8, colour = COL_STONE, family = CN_FONT, fontface = "italic", hjust = 0) +
  annotate("text", x = max(df4$duration) - 3, y = min(df4$rate) + 0.05,
           label = "过度投入", size = 2.8, colour = COL_STONE, family = CN_FONT, fontface = "italic", hjust = 1) +
  # 散点
  geom_point(aes(colour = team, size = group), alpha = 0.85) +
  scale_colour_manual(values = team_colors) +
  scale_size_manual(values = group_sizes) +
  guides(size = "none") +
  # 关键点标注
  geom_text_repel(
    data = ann4,
    aes(label = label),
    nudge_x = c(-15, 10),
    nudge_y = c(-0.08, 0.08),
    size = 3.2,
    colour = ann4$label_colour,
    family = CN_FONT,
    fontface = "bold",
    segment.colour = COL_STONE,
    segment.size = 0.3,
    min.segment.length = 0,
    box.padding = 0.3,
    point.padding = 0.3,
    seed = 42,
    max.overlaps = 20
  ) +
  labs(
    title = "通话时长是转化率核心杠杆",
    subtitle = "每个点 = 1 个团队 1 个月的数据",
    x = "平均通话时长（秒）",
    y = "转化率（%）",
    colour = "团队"
  ) +
  theme_report

save_svg(p4, "r-fig4-scatter.svg", 8, 5)

cat("\n=== 全部完成 ===\n")

# --- 复制到最终目录 ---
files <- list.files(out_dir, pattern = "\\.svg$", full.names = TRUE)
file.copy(files, final_dir, overwrite = TRUE)
cat("Copied", length(files), "SVG files to final directory.\n")
