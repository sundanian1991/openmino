library(ggplot2)
library(dplyr)

# 1. Data
data <- data.frame(
  group = rep(c("Top performers", "Others"), each = 5),
  category = factor(
    rep(c("Almost all", "Most", "Half", "Few", "Not at all"), 2),
    levels = rev(c("Almost all", "Most", "Half", "Few", "Not at all"))
  ),
  value = c(12, 37, 10, 25, 14,
            8,  20, 11, 33, 25),
  color = rep(c("#00558C", "#00A9E0", "#94D6F1", "#C1E9FB", "#F0F0F0"), 2)
)

lines_data <- data %>%
  group_by(group) %>%
  mutate(cum_value = cumsum(value)) %>%
  ungroup()

tp_heights <- filter(lines_data, group == "Top performers")$cum_value
ot_heights <- filter(lines_data, group == "Others")$cum_value

# Split labels into colored segments (white text) and white segment (dark text)
colored_labels <- filter(lines_data, category != "Not at all")
white_labels   <- filter(lines_data, category == "Not at all")

# 2. Plot
ggplot() +
  # Stacked bars
  geom_col(
    data = filter(data, group == "Top performers"),
    aes(x = 4, y = value, fill = category),
    width = 1.2, color = "#bcbcbc", linewidth = 0.2, show.legend = FALSE
  ) +
  geom_col(
    data = filter(data, group == "Others"),
    aes(x = 7, y = value, fill = category),
    width = 1.2, color = "#bcbcbc", linewidth = 0.2, show.legend = FALSE
  ) +
  # Slope lines
  annotate(
    "segment",
    x = 4.6, xend = 6.4,
    y = tp_heights, yend = ot_heights,
    color = "#bcbcbc", linewidth = 0.3
  ) +
  # Labels on colored segments: white text
  geom_text(
    data = colored_labels,
    aes(
      x = ifelse(group == "Top performers", 4, 7),
      y = cum_value - value / 2,
      label = paste0(value, "%")
    ),
    color = "#FFFFFF", size = 4.5, fontface = "bold", show.legend = FALSE
  ) +
  # Labels on white segment: dark text
  geom_text(
    data = white_labels,
    aes(
      x = ifelse(group == "Top performers", 4, 7),
      y = cum_value - value / 2,
      label = paste0(value, "%")
    ),
    color = "#333333", size = 4.5, fontface = "bold", show.legend = FALSE
  ) +
  # Fill colors
  scale_fill_manual(values = setNames(data$color, data$category)) +
  # Theme
  theme_minimal() +
  theme(
    axis.title   = element_blank(),
    axis.text.y  = element_blank(),
    axis.text.x  = element_text(size = 14),
    axis.ticks   = element_blank(),
    panel.grid   = element_blank(),
    plot.margin  = margin(t = 20, r = 30, b = 30, l = 30)
  ) +
  scale_x_continuous(
    limits = c(2, 9),
    breaks = c(4, 7),
    labels = c("Top performers²", "Others")
  ) -> p

# Title + subtitle
p <- p +
  labs(
    title = "Top economic performers use external data to validate assumptions on competitive advantage at the market level.",
    subtitle = "Extent to which respondents' organizations use external data to validate why customers choose their offerings, % of respondents"
  ) +
  theme(
    plot.title    = element_text(size = 12, face = "bold", lineheight = 1.1),
    plot.subtitle = element_text(size = 9, color = "#555555", lineheight = 1.1)
  )

# Source note
caption <- paste0(
  "Source: McKinsey 2025 Global Survey on Competitive Advantage, Oct 27 - Nov 17, 2025 (n=1,257).\n",
  "Top performers: 3-year organic revenue CAGR ≥ 15% and EBIT CAGR ≥ 15% (n=101); Others (n=851)."
)
p <- p + labs(caption = caption) +
  theme(plot.caption = element_text(size = 7, hjust = 0, color = "#888888", lineheight = 1.2))

# 3. Export
base <- "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/01-图表-麦肯锡堆叠柱状图-20260507/mckinsey_stacked_bar"
ggsave(paste0(base, ".pdf"), p, width = 9, height = 7, bg = "white")

grDevices::png(paste0(base, ".png"), width = 5400, height = 4200, res = 600, bg = "white")
print(p)
grDevices::dev.off()

cat("Done.\n")
