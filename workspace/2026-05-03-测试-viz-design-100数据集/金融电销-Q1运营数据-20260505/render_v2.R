#!/usr/bin/env Rscript
# 金融电销 Q1 — R + ggplot2 重渲染
# 修复：不用 showtext，用 svglite system_fonts 直接指定中文字体

library(ggplot2)
library(ggrepel)
library(svglite)

# --- 中文字体（不使用 showtext，直接让 svglite 处理）---
CN_FONT <- "PingFang SC"

# --- 输出目录 ---
out_dir <- "/tmp/r-viz-output-v2"
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)
final_dir <- "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/金融电销-Q1运营数据-20260505"

# --- 配色体系 ---
COL_TEAL  <- "#2e8b6e"; COL_STONE <- "#ada599"; COL_CORAL <- "#c25030"
COL_WARM  <- "#c26d3a"; COL_TITLE <- "#6b3410"; COL_AXIS  <- "#857d74"
COL_GRID  <- "#f2f0eb"; COL_TEAL_D <- "#0f5040"; COL_TEAL_L <- "#5dbf9e"

# --- 保存函数 ---
save_svg <- function(plot, name, w = 8, h = 4) {
  tmp <- file.path(out_dir, paste0(name, ".svg"))
  svglite(tmp, width = w, height = h,
          system_fonts = list(sans = CN_FONT, serif = CN_FONT, mono = CN_FONT))
  print(plot)
  dev.off()
  file.copy(tmp, file.path(final_dir, paste0(name, ".svg")), overwrite = TRUE)
  cat("OK:", name, "\n")
}

# --- 全局主题 ---
theme_report <- theme_classic(base_size = 11, base_family = CN_FONT) +
  theme(
    axis.line   = element_line(linewidth = 0.35, colour = COL_AXIS),
    axis.ticks  = element_line(linewidth = 0.35, colour = COL_AXIS),
    axis.text   = element_text(colour = COL_AXIS, size = 10, family = CN_FONT),
    axis.title  = element_text(colour = COL_TITLE, size = 11, family = CN_FONT),
    legend.title = element_text(size = 10, colour = COL_TITLE, family = CN_FONT),
    legend.text  = element_text(size = 9, colour = COL_AXIS, family = CN_FONT),
    plot.title   = element_text(size = 14, face = "bold", colour = COL_TITLE, family = CN_FONT),
    plot.subtitle = element_text(size = 10, colour = COL_AXIS, family = CN_FONT),
    plot.caption  = element_text(size = 8, colour = COL_STONE, family = CN_FONT),
    panel.grid.major = element_line(colour = COL_GRID, linewidth = 0.3),
    panel.grid.minor = element_blank(),
    legend.position = "right",
    legend.key = element_blank(),
    plot.margin = margin(15, 20, 10, 10)
  )

# ============================================================
# 图1：水平条形图 — 团队业绩总览
# ============================================================
df1 <- data.frame(
  team = c("B组", "D组", "E组", "A组", "C组", "F组"),
  amount = c(11955, 10848, 10119, 10014, 7392, 6993),
  status = c("达标", "达标", "达标", "达标",
             "未达标", "未达标"),
  stringsAsFactors = FALSE
)
df1$team <- factor(df1$team, levels = rev(c("B组", "D组", "E组",
                                             "A组", "C组", "F组")))

# 标注数据
lab1 <- data.frame(
  team = factor(c("B组", "F组"),
                levels = rev(c("B组", "D组", "E组", "A组",
                               "C组", "F组"))),
  amount = c(11955, 6993),
  status = c("达标", "未达标"),
  label = c("领先均值 25%", "仅为 B组的 58.5%"),
  hjust = c(-0.1, -0.1)
)

p1 <- ggplot(df1, aes(x = amount, y = team, fill = status)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  scale_fill_manual(values = c("达标" = COL_TEAL,
                               "未达标" = COL_STONE)) +
  geom_vline(xintercept = 9554, linetype = "dashed", colour = COL_CORAL,
             linewidth = 0.6) +
  annotate("text", x = 9554, y = 6.5, label = "均值 9,554万",
           colour = COL_CORAL, size = 3.2, hjust = -0.05, family = CN_FONT) +
  geom_text_repel(
    data = lab1,
    aes(x = amount, y = team, label = label),
    direction = "both", nudge_x = 400,
    segment.colour = COL_AXIS, segment.size = 0.3,
    colour = COL_TITLE, size = 3.5, family = CN_FONT,
    hjust = 0, box.padding = 0.4, point.padding = 0.3
  ) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.25)),
                     labels = scales::comma_format(big.mark = ",")) +
  labs(
    title = "B组成交额领先 F组 62%，6 团队差距显著",
    subtitle = "2025年 Q1 电销中心运营数据",
    x = "成交金额（万元）", y = NULL,
    caption = "数据来源：2025年 Q1 电销中心运营数据"
  ) +
  theme_report +
  theme(panel.grid.major.y = element_blank())

save_svg(p1, "r-fig1-bar", w = 8, h = 4.5)

# ============================================================
# 图2：多折线图 — 月度转化率趋势
# ============================================================
df2 <- data.frame(
  month = factor(rep(c("1月", "2月", "3月"), each = 6),
                 levels = c("1月", "2月", "3月")),
  team = rep(c("A组", "B组", "C组", "D组", "E组", "F组"), 3),
  rate = c(2.0, 2.3, 1.7, 2.2, 2.0, 1.7,
           2.3, 2.8, 1.9, 2.6, 2.5, 1.9,
           2.3, 2.6, 1.7, 2.5, 2.3, 1.7),
  group = rep(c("稳步", "上升", "停滞",
                "上升", "稳步", "停滞"), 3),
  stringsAsFactors = FALSE
)

# 线宽和样式映射
df2$linewidth <- ifelse(df2$group == "上升", 1.3,
                        ifelse(df2$group == "稳步", 0.8, 0.5))
df2$linetype <- ifelse(df2$group == "停滞", "dashed", "solid")
df2$colour <- ifelse(df2$group == "上升", COL_TEAL,
                     ifelse(df2$group == "稳步", COL_WARM, COL_STONE))

# 峰值标注点
peak2 <- subset(df2, team == "B组" & month == "2月")

p2 <- ggplot(df2, aes(x = month, y = rate, group = team, colour = team)) +
  geom_line(aes(linewidth = group, linetype = group), show.legend = FALSE) +
  geom_point(aes(size = group), show.legend = FALSE) +
  # 手动配色
  scale_colour_manual(values = c(
    "A组" = COL_WARM, "B组" = COL_TEAL, "C组" = COL_STONE,
    "D组" = COL_TEAL, "E组" = COL_WARM, "F组" = COL_STONE
  )) +
  scale_linewidth_manual(values = c(
    "上升" = 1.3, "稳步" = 0.8, "停滞" = 0.5
  )) +
  scale_linetype_manual(values = c(
    "上升" = "solid", "稳步" = "solid", "停滞" = "dashed"
  )) +
  scale_size_manual(values = c(
    "上升" = 3, "稳步" = 2, "停滞" = 1.5
  )) +
  # 峰值标注
  geom_text_repel(
    data = peak2,
    aes(label = "峰值 2.8%"),
    nudge_y = 0.15, nudge_x = -0.1,
    segment.colour = COL_AXIS, segment.size = 0.3,
    colour = COL_TEAL, size = 3.5, family = CN_FONT,
    box.padding = 0.4, point.padding = 0.3
  ) +
  # 头尾差距标注
  annotate("segment", x = 3.15, xend = 3.15, y = 1.7, yend = 2.6,
           arrow = arrow(ends = "both", length = unit(0.12, "cm")),
           colour = COL_CORAL, linewidth = 0.5) +
  annotate("text", x = 3.25, y = 2.15, label = "0.9pp",
           colour = COL_CORAL, size = 3.5, family = CN_FONT) +
  coord_cartesian(clip = "off", xlim = c(0.8, 3.5)) +
  scale_y_continuous(limits = c(1.5, 3.0), breaks = seq(1.5, 3.0, 0.5)) +
  labs(
    title = "B/D 转化率稳步上升，C/F 三月无进展",
    subtitle = "2025年 Q1 月度转化率变化",
    x = NULL, y = "转化率（%）",
    caption = "转化率 = 成交单数 / 外呼总量"
  ) +
  theme_report +
  theme(legend.position = c(0.85, 0.85),
        legend.background = element_rect(fill = "white", colour = COL_GRID))

save_svg(p2, "r-fig2-line", w = 8, h = 4.5)

# ============================================================
# 图3：漏斗图 — 转化漏斗
# ============================================================
# 精确计算
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

vals <- c(total_calls, total_connected, total_intent, total_deals)
labels_stage <- c("外呼总量", "接通量",
                  "意向客户", "成交单数")
colors_stage <- c(COL_TEAL_D, COL_CORAL, COL_TEAL, COL_TEAL_L)
rate_labels <- c(
  "100%",
  paste0(round(total_connected/total_calls*100, 1), "%"),
  paste0(round(total_intent/total_connected*100, 1), "%"),
  paste0(round(total_deals/total_intent*100, 1), "%")
)

# 用 sqrt 缩放让漏斗宽度合理
vals_scaled <- sqrt(vals)
max_scaled <- max(vals_scaled)

# 构建 rect 数据
n_stages <- 4
bar_h <- 1.0
gap_h <- 0.35
df3 <- data.frame(
  stage = labels_stage,
  value = vals,
  value_fmt = scales::comma(vals, big.mark = ","),
  rate = rate_labels,
  width = vals_scaled / max_scaled,
  fill = colors_stage,
  y_center = seq((n_stages - 1) * (bar_h + gap_h) / 2,
                 by = -(bar_h + gap_h), length.out = n_stages),
  stringsAsFactors = FALSE
)
df3$y_min <- df3$y_center - bar_h / 2
df3$y_max <- df3$y_center + bar_h / 2
df3$x_min <- -df3$width / 2
df3$x_max <- df3$width / 2

# 转化率标注位置（步骤之间）
rate_pos <- data.frame(
  y = (df3$y_min[-1] + df3$y_max[-n_stages]) / 2,
  label = paste0("↓ ", rate_labels[-1])
)

# 瓶颈标注
bottleneck <- paste0(
  round((1 - total_connected/total_calls)*100, 1),
  "% 未接通 = 最大浪费点"
)

p3 <- ggplot(df3) +
  # 漏斗条
  geom_rect(aes(xmin = x_min, xmax = x_max, ymin = y_min, ymax = y_max),
            fill = df3$fill, colour = "white", linewidth = 0.8) +
  # 步骤名称（居中）
  geom_text(aes(x = 0, y = y_center, label = stage),
            colour = "white", size = 4.5, fontface = "bold", family = CN_FONT) +
  # 数值（右侧）
  geom_text(aes(x = x_max + 0.05, y = y_center, label = value_fmt),
            colour = COL_AXIS, size = 3.5, hjust = 0, family = CN_FONT) +
  # 转化率标注
  geom_text(data = rate_pos, aes(x = 0.55, y = y, label = label),
            colour = COL_CORAL, size = 3.5, fontface = "bold", family = CN_FONT) +
  # 瓶颈标注
  annotate("text", x = 0, y = df3$y_center[2] - bar_h/2 - 0.05,
           label = bottleneck,
           colour = COL_CORAL, size = 3.8, fontface = "bold",
           family = CN_FONT, vjust = 1.2) +
  coord_fixed(ratio = 0.6, xlim = c(-0.7, 1.0),
              ylim = c(min(df3$y_min) - 0.8, max(df3$y_max) + 0.5)) +
  labs(
    title = "71% 外呼未接通，接通率是最大瓶颈",
    subtitle = "2025年 Q1 六组合计转化漏斗",
    caption = "数据来源：2025年 Q1 电销中心运营数据"
  ) +
  theme_void(base_family = CN_FONT) +
  theme(
    plot.title = element_text(size = 14, face = "bold", colour = COL_TITLE,
                              family = CN_FONT, hjust = 0.5),
    plot.subtitle = element_text(size = 10, colour = COL_AXIS,
                                 family = CN_FONT, hjust = 0.5),
    plot.caption = element_text(size = 8, colour = COL_STONE,
                                family = CN_FONT, hjust = 0.5),
    plot.margin = margin(15, 20, 10, 20)
  )

save_svg(p3, "r-fig3-funnel", w = 7, h = 6)

# ============================================================
# 图4：散点图+象限 — 通话时长 vs 转化率
# ============================================================
df4 <- data.frame(
  duration = c(312,335,325, 327,348,352, 285,291,295,
               318,338,342, 305,325,318, 278,282,275),
  rate = c(2.0,2.3,2.3, 2.3,2.8,2.6, 1.7,1.9,1.7,
           2.2,2.6,2.5, 2.0,2.5,2.3, 1.7,1.9,1.7),
  team = rep(c("A组","B组","C组",
               "D组","E组","F组"), each = 3),
  month = rep(c("1月","2月","3月"), 6),
  group = rep(c("稳步","上升","停滞",
                "上升","稳步","停滞"), each = 3),
  stringsAsFactors = FALSE
)
mean_x <- mean(df4$duration)
mean_y <- mean(df4$rate)

# 标注点
label4 <- data.frame(
  duration = c(348, 295),
  rate = c(2.8, 1.7),
  label = c("标杆", "无效忙碌"),
  colour = c(COL_TEAL, COL_CORAL),
  stringsAsFactors = FALSE
)

p4 <- ggplot(df4, aes(x = duration, y = rate)) +
  # 四象限背景
  annotate("rect", xmin = mean_x, xmax = 365, ymin = mean_y, ymax = 3.1,
           fill = "#e8f5f0", alpha = 0.5) +  # 高价值
  annotate("rect", xmin = 260, xmax = mean_x, ymin = 1.4, ymax = mean_y,
           fill = "#f5f3f0", alpha = 0.5) +  # 低效
  annotate("rect", xmin = 260, xmax = mean_x, ymin = mean_y, ymax = 3.1,
           fill = "#e8f0f5", alpha = 0.5) +  # 潜力
  annotate("rect", xmin = mean_x, xmax = 365, ymin = 1.4, ymax = mean_y,
           fill = "#f5e8e4", alpha = 0.5) +  # 过度投入
  # 象限标签
  annotate("text", x = 358, y = 3.02, label = "高价值",
           colour = COL_TEAL, size = 3, family = CN_FONT, fontface = "bold") +
  annotate("text", x = 268, y = 1.48, label = "低效",
           colour = COL_STONE, size = 3, family = CN_FONT, fontface = "bold") +
  annotate("text", x = 268, y = 3.02, label = "潜力",
           colour = "#3a7ab8", size = 3, family = CN_FONT, fontface = "bold") +
  annotate("text", x = 358, y = 1.48, label = "过度投入",
           colour = COL_CORAL, size = 3, family = CN_FONT, fontface = "bold") +
  # 均值十字线
  geom_vline(xintercept = mean_x, linetype = "dashed", colour = COL_CORAL,
             linewidth = 0.5, alpha = 0.6) +
  geom_hline(yintercept = mean_y, linetype = "dashed", colour = COL_CORAL,
             linewidth = 0.5, alpha = 0.6) +
  # 散点
  geom_point(aes(colour = team, size = group), alpha = 0.85) +
  scale_colour_manual(values = c(
    "A组" = COL_WARM, "B组" = COL_TEAL, "C组" = COL_STONE,
    "D组" = COL_TEAL, "E组" = COL_WARM, "F组" = COL_STONE
  )) +
  scale_size_manual(values = c(
    "上升" = 4, "稳步" = 3, "停滞" = 2
  )) +
  # 标注
  geom_text_repel(
    data = label4,
    aes(x = duration, y = rate, label = label, colour = colour),
    nudge_x = c(5, -8), nudge_y = c(0.1, -0.1),
    segment.colour = COL_AXIS, segment.size = 0.3,
    size = 3.5, family = CN_FONT, fontface = "bold",
    show.legend = FALSE,
    box.padding = 0.4, point.padding = 0.3
  ) +
  scale_x_continuous(limits = c(260, 365), breaks = seq(270, 360, 20)) +
  scale_y_continuous(limits = c(1.4, 3.1), breaks = seq(1.5, 3.0, 0.5)) +
  labs(
    title = "通话时长是转化率核心杠杆",
    subtitle = "每个点 = 1 个团队 1 个月的数据",
    x = "平均通话时长（秒）", y = "转化率（%）",
    caption = "数据来源：2025年 Q1 电销中心运营数据"
  ) +
  theme_report +
  theme(legend.position = c(0.85, 0.2),
        legend.background = element_rect(fill = "white", colour = COL_GRID))

save_svg(p4, "r-fig4-scatter", w = 8, h = 5)

cat("\n=== All 4 figures rendered ===\n")
