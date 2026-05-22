library(ggplot2)
library(patchwork)

# ── theme ──
theme_cycle <- theme_classic(base_size = 10, base_family = "STHeiti") +
  theme(
    axis.line = element_line(linewidth = 0.4, colour = "black"),
    axis.ticks = element_line(linewidth = 0.4, colour = "black"),
    legend.title = element_text(size = 8),
    legend.text = element_text(size = 7.5),
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5),
    plot.subtitle = element_text(size = 9, hjust = 0.5, colour = "grey40"),
    panel.grid = element_blank(),
    plot.margin = margin(10, 15, 5, 15),
  )

# ── 数据 ──
quarters <- seq(as.Date("2006-01-01"), as.Date("2018-10-01"), by = "3 months")
n <- length(quarters)

gdp <- c(10.4,11.4,12.2,11.6, 11.5,12.0,12.2,11.2,
         10.6,10.2,9.0,6.8,   6.4,7.5,8.2,9.2,
         10.6,10.3,9.6,9.8,   9.7,9.5,9.1,8.9,
         8.1,7.6,7.5,7.9,     7.8,7.6,7.8,7.7,
         7.4,7.5,7.3,7.3,     7.0,7.0,6.9,6.8,
         6.7,6.7,6.7,6.8,     6.9,6.9,6.8,6.8,
         6.8,6.7,6.5,6.5)

iva <- c(12.5,14.0,15.2,14.2, 14.0,15.5,16.0,14.0,
         13.0,12.0,8.2,5.0,   5.1,8.5,11.0,14.0,
         16.0,15.5,13.5,14.0, 14.2,13.8,13.0,12.5,
         11.5,10.5,10.0,10.5, 10.0,9.8,10.0,10.2,
         9.5,9.2,8.8,8.5,     7.5,7.0,6.5,6.2,
         6.0,6.2,6.5,6.8,     7.0,7.2,6.8,6.5,
         6.5,6.3,6.0,5.8)

pmi <- c(52.0,53.5,54.5,53.0, 54.0,55.0,55.5,52.0,
         51.0,50.0,45.0,41.0, 42.0,48.0,52.5,55.0,
         55.5,54.0,52.0,53.0, 53.5,53.0,51.5,50.5,
         50.0,49.0,49.5,50.5, 51.0,50.5,51.0,51.5,
         50.5,50.8,51.0,50.0, 49.5,49.0,48.5,48.0,
         49.0,50.0,50.5,51.0, 51.5,51.8,51.5,51.0,
         51.0,50.5,50.0,49.5)

df <- data.frame(date = quarters, gdp = gdp, iva = iva, pmi = pmi)

# ── 周期阶段区域 ──
phases <- data.frame(
  start = as.Date(c("2006-01-01","2007-09-01","2008-12-01",
                     "2009-06-01","2010-06-01","2012-03-01",
                     "2012-12-01","2013-06-01","2015-06-01",
                     "2016-06-01","2017-06-01")),
  end = as.Date(c("2007-09-01","2008-12-01","2009-06-01",
                   "2010-06-01","2012-03-01","2012-12-01",
                   "2013-06-01","2015-06-01","2016-06-01",
                   "2017-06-01","2018-10-01")),
  phase = c("繁荣","衰退","复苏",
            "繁荣","衰退","复苏",
            "繁荣","衰退","复苏",
            "繁荣","衰退")
)

phase_colors <- c("繁荣" = "#4CAF50", "衰退" = "#F44336", "复苏" = "#2196F3")
phase_alpha <- c("繁荣" = 0.18, "衰退" = 0.15, "复苏" = 0.15)

# ── 周期标注线 ──
cycle_lines <- data.frame(
  date = as.Date(c("2007-09-01","2008-12-01","2009-03-01",
                    "2010-06-01","2012-03-01","2012-09-01",
                    "2013-06-01","2015-03-01","2015-09-01",
                    "2017-06-01","2018-03-01")),
  label = c("周期顶点","政策底","周期底部",
            "周期顶点","政策底","周期底部",
            "周期顶点","政策底","周期底部",
            "周期顶点","政策底"),
  type = c("peak","bottom_policy","bottom_cycle",
           "peak","bottom_policy","bottom_cycle",
           "peak","bottom_policy","bottom_cycle",
           "peak","bottom_policy"),
  stringsAsFactors = FALSE
)

line_styles <- list(
  "peak"          = c(color = "#2E7D32", lty = "solid", linewidth = 0.8),
  "bottom_policy" = c(color = "#F57C00", lty = "dashed", linewidth = 0.8),
  "bottom_cycle"  = c(color = "#7B1FA2", lty = "dotted", linewidth = 0.8)
)

# ── 事件标注 ──
events <- data.frame(
  date = as.Date(c("2008-06-01","2008-12-01","2010-06-01",
                    "2012-03-01","2013-06-01","2015-03-01",
                    "2015-09-01","2016-06-01","2017-06-01",
                    "2018-06-01","2018-09-01")),
  label = c("美国次贷危机深化","中国四万亿刺激计划","产能过剩加剧",
            "稳增长发力","钱荒","中美贸易战升级",
            "汇率改革811汇改","供给侧结构性改革\n三去一降一补","棚改货币化",
            "中美贸易战升级","稳增长"),
  y_label = c(63, 59, 63, 59, 63, 59, 63, 59, 63, 59, 63),
  stringsAsFactors = FALSE
)

# ── 绘图 ──
p <- ggplot(df, aes(x = date)) +
  # 阶段背景
  geom_rect(data = phases,
            aes(xmin = start, xmax = end, ymin = -Inf, ymax = Inf, fill = phase),
            alpha = 0.15, inherit.aes = FALSE) +
  scale_fill_manual(values = phase_colors, name = "周期阶段") +

  # 周期标注线（分颜色+线型）
  geom_vline(data = cycle_lines, aes(xintercept = date),
             color = "grey50", linetype = "dashed", linewidth = 0.35, inherit.aes = FALSE) +

  # 三条数据线
  geom_line(aes(y = gdp, color = "GDP同比"), linewidth = 0.9) +
  geom_line(aes(y = iva, color = "工业增加值"), linewidth = 0.7) +
  geom_line(aes(y = pmi, color = "PMI"), linewidth = 0.7) +
  scale_color_manual(values = c("GDP同比" = "#1A237E", "工业增加值" = "#42A5F5", "PMI" = "#E53935"),
                     name = NULL, breaks = c("GDP同比","工业增加值","PMI")) +

  # PMI 荣枯线
  geom_hline(yintercept = 50, linetype = "dashed", color = "grey50", linewidth = 0.4) +
  annotate("text", x = as.Date("2006-03-01"), y = 51, label = "荣枯线",
           size = 2.8, color = "grey40", hjust = 0) +

  # 事件标注
  geom_segment(data = events,
               aes(x = date, xend = date, y = 35, yend = y_label - 1.5),
               color = "grey60", linewidth = 0.35, inherit.aes = FALSE) +
  geom_label(data = events,
             aes(x = date, y = y_label, label = label),
             size = 2.3, fill = "white", color = "grey20",
             linewidth = 0.3, label.padding = unit(0.15, "lines"),
             inherit.aes = FALSE, lineheight = 1.1) +

  # 标题
  labs(title = "中国经济周期（2006-2018）",
       subtitle = "注：周期复苏从政策底开始，经历上行、顶点、衰退，到底部再进入下一个周期",
       x = NULL, y = "增速（%）") +
  scale_x_date(date_breaks = "1 year", date_labels = "%Y",
               limits = as.Date(c("2005-10-01","2019-03-01"))) +
  scale_y_continuous(limits = c(35, 65)) +
  theme_cycle +
  theme(
    legend.position = c(0.88, 0.92),
    legend.background = element_rect(fill = "white", color = "grey80", linewidth = 0.3),
    legend.key.size = unit(0.4, "cm"),
  )

# ── 导出 ──
out_dir <- "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/01-图表-经济周期复刻-20260505"
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

# Set locale to handle UTF-8 paths on macOS
Sys.setlocale("LC_ALL", "en_US.UTF-8")

svglite::svglite(file.path(out_dir, "economic-cycle_R.svg"), width = 16, height = 8)
print(p)
dev.off()

grDevices::cairo_pdf(file.path(out_dir, "economic-cycle_R.pdf"), width = 16, height = 8, family = "STHeiti")
print(p)
dev.off()

ragg::agg_tiff(file.path(out_dir, "economic-cycle_R.tiff"), width = 16, height = 8, units = "in", res = 300)
print(p)
dev.off()

cat("Done!\n")
