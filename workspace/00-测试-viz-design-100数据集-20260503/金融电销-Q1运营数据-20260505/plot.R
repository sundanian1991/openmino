library(ggplot2)
library(patchwork)
library(svglite)
library(ragg)

OUT_DIR <- "/tmp/viz-q1-financial"
dir.create(OUT_DIR, showWarnings = FALSE, recursive = TRUE)

# ============================================================
# Global theme - McKinsey style, white background
# ============================================================
BLUE   <- "#0066FF"
GRAY   <- "#999999"
RED    <- "#E74C3C"
DARK   <- "#2E2C2A"
MID    <- "#5F5A54"
LIGHT  <- "#ADA599"
BG     <- "#FFFFFF"

theme_set(
  theme_minimal(base_size = 11, base_family = "PingFang SC") +
    theme(
      plot.background = element_rect(fill = BG, color = NA),
      panel.background = element_rect(fill = BG, color = NA),
      panel.grid.major = element_line(color = "#F2F0EB", linewidth = 0.3),
      panel.grid.minor = element_blank(),
      axis.line = element_line(color = DARK, linewidth = 0.5),
      axis.ticks = element_line(color = DARK, linewidth = 0.3),
      axis.text = element_text(color = MID, size = 10),
      axis.title = element_text(color = DARK, size = 10),
      plot.title = element_text(color = DARK, size = 13, face = "bold", hjust = 0),
      plot.subtitle = element_text(color = MID, size = 10, hjust = 0),
      legend.background = element_rect(fill = BG, color = NA),
      legend.text = element_text(size = 9, color = MID),
      legend.title = element_text(size = 9, color = DARK, face = "bold"),
      legend.position = "bottom",
      plot.margin = margin(5, 10, 5, 5),
      strip.text = element_text(face = "bold", color = DARK)
    )
)

# ============================================================
# DATA
# ============================================================
df_monthly <- data.frame(
  month = factor(rep(c("1月", "2月", "3月"), each = 6), levels = c("1月", "2月", "3月")),
  team  = rep(c("A组", "B组", "C组", "D组", "E组", "F组"), 3),
  call_volume = c(186240,172800,191520,164160,179520,168480,
                  142560,138240,151200,134400,146880,136320,
                  194400,185760,201600,176640,190080,181440),
  connected = c(52147,51840,49995,49248,50266,47174,
                42768,44237,39312,42048,43479,37740,
                56572,59443,50400,56525,55123,47174),
  intent    = c(5214,5702,4500,5417,5027,4246,
                4704,5309,3931,5046,5217,3774,
                6223,7133,4536,6783,6064,4246),
  closed    = c(1042,1197,855,1083,1005,807,
                989,1220,747,1109,1095,717,
                1307,1568,862,1424,1273,807),
  revenue   = c(3126,3591,2565,3249,3015,2421,
                2967,3660,2241,3327,3285,2151,
                3921,4704,2586,4272,3819,2421),
  avg_call  = c(312,327,285,318,305,278,
                335,348,291,338,325,282,
                325,352,295,342,318,275),
  daily_call = c(298,288,318,274,299,281,
                 288,276,302,269,293,273,
                 311,302,330,288,308,298),
  conv_rate = c(2.0,2.3,1.7,2.2,2.0,1.7,
                2.3,2.8,1.9,2.6,2.5,1.9,
                2.3,2.6,1.7,2.5,2.3,1.7),
  stringsAsFactors = FALSE
)

# ============================================================
# FIGURE 1: Horizontal bar chart - Team Revenue Ranking
# ============================================================
df_team_rev <- aggregate(revenue ~ team, df_monthly, sum)
df_team_rev <- df_team_rev[order(df_team_rev$revenue, decreasing = TRUE), ]
df_team_rev$team <- factor(df_team_rev$team, levels = df_team_rev$team)
df_team_rev$mean_val <- mean(df_team_rev$revenue)
df_team_rev$status <- ifelse(df_team_rev$revenue >= df_team_rev$mean_val, "达标", "未达标")

p1 <- ggplot(df_team_rev, aes(x = revenue, y = team, fill = status)) +
  geom_col(width = 0.7) +
  geom_vline(xintercept = df_team_rev$mean_val[1],
             linetype = "dashed", color = RED, linewidth = 1) +
  scale_fill_manual(values = c("达标" = BLUE, "未达标" = GRAY), guide = "legend") +
  labs(
    title = "B 组成交额领先 F 组 62%，6 团队差距显著",
    subtitle = "2025年 Q1 累计成交金额（万元）",
    x = "Q1累计成交金额（万元）",
    y = "",
    fill = ""
  ) +
  geom_text(data = df_team_rev[df_team_rev$team == "B组", ],
            aes(x = revenue + 200, label = "领先均值 25%"),
            hjust = 0, size = 3.2, color = BLUE) +
  geom_text(data = df_team_rev[df_team_rev$team == "F组", ],
            aes(x = revenue + 200, label = "仅为 B 组的 62%"),
            hjust = 0, size = 3.2, color = RED) +
  annotate("text", x = df_team_rev$mean_val[1] + 50, y = nrow(df_team_rev) + 0.3,
           label = "均值 9,554", hjust = 0, size = 3, color = RED, fontface = "bold") +
  coord_cartesian(xlim = c(0, 14500), ylim = c(0.5, 6.5), expand = FALSE) +
  scale_x_continuous(labels = function(x) format(x, big.mark = ",")) +
  theme(
    legend.position = "bottom",
    axis.text.y = element_text(size = 11, face = "bold", color = DARK)
  )

ggsave(file.path(OUT_DIR, "fig1.svg"),
       p1, width = 8, height = 4, device = svglite::svglite)

cat("Figure 1 done\n")

# ============================================================
# FIGURE 2: Multi-line trend - Conversion Rate
# ============================================================
df_trend <- df_monthly[, c("month", "team", "conv_rate", "avg_call")]
df_trend$month_num <- as.numeric(df_trend$month)

# Define line styles by team performance
line_style <- data.frame(
  team = c("A组", "B组", "C组", "D组", "E组", "F组"),
  group = c("稳健", "上升", "停滞", "上升", "稳健", "停滞"),
  color = c(BLUE, BLUE, GRAY, BLUE, BLUE, GRAY),
  size  = c(1.2, 2, 0.8, 2, 1.2, 0.8),
  stringsAsFactors = FALSE
)
df_trend <- merge(df_trend, line_style, by = "team")

p2 <- ggplot(df_trend, aes(x = month_num, y = conv_rate, color = team, group = team)) +
  geom_line(aes(linewidth = I(size)), show.legend = FALSE) +
  geom_point(aes(size = I(size)), show.legend = FALSE) +
  scale_color_manual(values = setNames(line_style$color, line_style$team)) +
  labs(
    title = "B/D 转化率稳步上升，C/F 三月无进展",
    subtitle = "转化率 = 成交单数 / 外呼总量",
    x = "月份", y = "转化率（%）"
  ) +
  scale_x_continuous(breaks = c(1, 2, 3), labels = c("1月", "2月", "3月"), expand = c(0.1, 0.1)) +
  # B 组峰值标注
  annotate("text", x = 2, y = 2.8 + 0.15, label = "B 组 峰值 2.8%",
           hjust = 0.5, size = 3.2, color = BLUE, fontface = "bold") +
  # 差距标注
  annotate("segment", x = 1, xend = 3, y = 2.3 - 0.2, yend = 1.7 - 0.2,
           arrow = arrow(ends = "both", type = "closed", length = unit(0.15, "cm")),
           color = RED, linewidth = 0.8) +
  annotate("text", x = 2, y = 2.3 - 0.2 - 0.12, label = "0.9pp",
           hjust = 0.5, size = 3, color = RED, fontface = "bold") +
  # 图例
  scale_linewidth_identity() +
  scale_size_identity() +
  theme(
    legend.position = "bottom",
    panel.grid.major.x = element_blank()
  )

ggsave(file.path(OUT_DIR, "fig2.svg"),
       p2, width = 8, height = 4, device = svglite::svglite)

cat("Figure 2 done\n")

# ============================================================
# FIGURE 3: Funnel chart - Conversion funnel
# ============================================================
total_call  <- sum(df_monthly$call_volume)
total_conn  <- sum(df_monthly$connected)
total_intent <- sum(df_monthly$intent)
total_closed <- sum(df_monthly$closed)

df_funnel <- data.frame(
  stage = c("外呼总量", "接通量", "意向客户", "成交单数"),
  value = c(total_call, total_conn, total_intent, total_closed),
  pct   = c(100, total_conn/total_call*100, total_intent/total_call*100, total_closed/total_call*100),
  step_pct = c(NA, total_conn/total_call*100, total_intent/total_conn*100, total_closed/total_intent*100),
  color = c(BLUE, RED, BLUE, BLUE),
  y_top = c(4.4, 3.5, 2.5, 1.5),
  y_bot = c(3.6, 2.6, 1.6, 0.6),
  stringsAsFactors = FALSE
)

max_val <- df_funnel$value[1]
df_funnel$w <- df_funnel$value / max_val * 4

# Build polygons for each funnel segment
poly_list <- list()
for (i in 1:4) {
  if (i < 4) {
    w_top <- df_funnel$w[i]
    w_bot <- df_funnel$w[i + 1]
  } else {
    w_top <- df_funnel$w[i]
    w_bot <- df_funnel$w[i]
  }
  poly_list[[i]] <- data.frame(
    x = c(-w_top/2, w_top/2, w_bot/2, -w_bot/2),
    y = c(df_funnel$y_top[i], df_funnel$y_top[i], df_funnel$y_bot[i], df_funnel$y_bot[i]),
    fill = df_funnel$color[i],
    stage = df_funnel$stage[i]
  )
}
poly_df <- do.call(rbind, poly_list)

# Step conversion rate labels (between segments)
step_labels <- data.frame(
  x = c(df_funnel$w[1], df_funnel$w[2], df_funnel$w[3]) + 0.5,
  y = c((df_funnel$y_bot[1] + df_funnel$y_top[2]) / 2,
        (df_funnel$y_bot[2] + df_funnel$y_top[3]) / 2,
        (df_funnel$y_bot[3] + df_funnel$y_top[4]) / 2),
  label = c(paste0(round(df_funnel$step_pct[2], 1), "%"),
            paste0(round(df_funnel$step_pct[3], 1), "%"),
            paste0(round(df_funnel$step_pct[4], 1), "%")),
  stringsAsFactors = FALSE
)

p3 <- ggplot() +
  geom_polygon(data = poly_df, aes(x, y, fill = I(fill))) +
  geom_text(data = df_funnel, aes(x = 0, y = (y_top + y_bot) / 2,
                                   label = paste0(format(value, big.mark = ","), "\n(", round(pct, 1), "%)")),
            size = 3.2, color = "white", fontface = "bold") +
  geom_text(data = step_labels, aes(x = x, y = y, label = label),
            size = 2.8, color = MID, hjust = 0) +
  annotate("text", x = df_funnel$w[2] + 0.3, y = 3.8,
           label = "71.4% 未接通\n= 最大浪费点",
           hjust = 0, size = 3.2, color = RED, fontface = "bold") +
  scale_fill_identity() +
  labs(
    title = "71% 外呼未接通，接通率是最大瓶颈",
    subtitle = "Q1 六组合计数据"
  ) +
  coord_cartesian(xlim = c(-3, 6), ylim = c(0, 5), expand = FALSE) +
  theme_void() +
  theme(
    plot.title = element_text(color = DARK, size = 13, face = "bold", hjust = 0, margin = margin(0, 0, 4, 0)),
    plot.subtitle = element_text(color = MID, size = 10, hjust = 0),
    plot.background = element_rect(fill = BG, color = NA)
  )

ggsave(file.path(OUT_DIR, "fig3.svg"),
       p3, width = 6, height = 5, device = svglite::svglite)

cat("Figure 3 done\n")

# ============================================================
# FIGURE 4: Scatter + Quadrant - Call Duration vs Conversion
# ============================================================
df_scatter <- df_monthly[, c("team", "month", "avg_call", "conv_rate")]
df_scatter$month_num <- as.numeric(df_scatter$month)

mean_x <- mean(df_scatter$avg_call)
mean_y <- mean(df_scatter$conv_rate)

# Team categories
team_cat <- data.frame(
  team = c("A组", "B组", "C组", "D组", "E组", "F组"),
  cat = c("稳健", "标杆", "低效", "标杆", "稳健", "低效"),
  color = c(BLUE, BLUE, GRAY, BLUE, BLUE, GRAY),
  pch = c(16, 16, 16, 16, 16, 16),
  size = c(3, 4, 2, 4, 3, 2),
  stringsAsFactors = FALSE
)
df_scatter <- merge(df_scatter, team_cat, by = "team")

p4 <- ggplot(df_scatter, aes(x = avg_call, y = conv_rate, color = team)) +
  # Quadrant background
  annotate("rect", xmin = -Inf, xmax = mean_x, ymin = -Inf, ymax = mean_y,
           alpha = 0.02, fill = GRAY) +
  annotate("rect", xmin = mean_x, xmax = Inf, ymin = mean_y, ymax = Inf,
           alpha = 0.02, fill = BLUE) +
  # Mean cross lines
  geom_vline(xintercept = mean_x, linetype = "dashed", color = RED, linewidth = 0.7, alpha = 0.6) +
  geom_hline(yintercept = mean_y, linetype = "dashed", color = RED, linewidth = 0.7, alpha = 0.6) +
  # Points
  geom_point(aes(size = I(size), alpha = I(ifelse(cat == "标杆", 1, ifelse(cat == "低效", 0.5, 0.7)))),
             show.legend = FALSE) +
  scale_color_manual(values = setNames(team_cat$color, team_cat$team)) +
  # Quadrant labels
  annotate("text", x = min(df_scatter$avg_call) + 5, y = max(df_scatter$conv_rate) - 0.1,
           label = "潜力", size = 3.5, color = LIGHT, fontface = "bold") +
  annotate("text", x = max(df_scatter$avg_call) - 5, y = max(df_scatter$conv_rate) - 0.1,
           label = "高价值", size = 3.5, color = LIGHT, fontface = "bold") +
  annotate("text", x = min(df_scatter$avg_call) + 5, y = min(df_scatter$conv_rate) + 0.1,
           label = "低效", size = 3.5, color = LIGHT, fontface = "bold") +
  annotate("text", x = max(df_scatter$avg_call) - 5, y = min(df_scatter$conv_rate) + 0.1,
           label = "过度投入", size = 3.5, color = LIGHT, fontface = "bold") +
  # B group labels
  geom_text(data = df_scatter[df_scatter$team == "B组" & df_scatter$month == "3月", ],
            aes(x = avg_call, y = conv_rate + 0.15, label = "B"),
            size = 3.5, color = BLUE, fontface = "bold") +
  # C group "无效忙碌" annotation
  geom_text(data = df_scatter[df_scatter$team == "C组" & df_scatter$month == "3月", ],
            aes(x = avg_call, y = conv_rate - 0.25, label = "C 无效忙碌"),
            size = 3, color = RED, fontface = "bold") +
  labs(
    title = "通话时长是转化率核心杠杆，C 组陷入无效忙碌",
    subtitle = "每个点 = 1 个团队 1 个月的数据",
    x = "平均通话时长（秒）",
    y = "转化率（%）"
  ) +
  scale_size_identity() +
  scale_alpha_identity() +
  theme(
    legend.position = "bottom",
    panel.grid.major = element_line(color = "#F2F0EB", linewidth = 0.3)
  )

ggsave(file.path(OUT_DIR, "fig4.svg"),
       p4, width = 8, height = 5, device = svglite::svglite)

cat("Figure 4 done\n")
cat("All figures generated.\n")
