library(ggplot2)
library(dplyr)

# 1. Data
data <- data.frame(
  region = rep(c("Greater\nChina", "India", "Europe", "North\nAmerica",
                 "Latin\nAmerica", "Developing\nmarkets", "Asia-\nPacific"), each = 2),
  period = rep(c("June 2021", "Sept 2021"), 7),
  value = c(88, 92,
            33, 92,
            74, 85,
            83, 81,
            61, 66,
            40, 52,
            67, 51),
  color = rep(c("#00558C", "#00A9E0"), 7)
)

data$region <- factor(data$region, levels = c("Greater\nChina", "India", "Europe",
                                               "North\nAmerica", "Latin\nAmerica",
                                               "Developing\nmarkets", "Asia-\nPacific"))

# X positions: each region gets two bars side by side
data$x_pos <- as.numeric(data$region) + ifelse(data$period == "June 2021", -0.2, 0.2)

# Line connection data
lines <- data %>%
  group_by(region) %>%
  summarise(
    x_start = x_pos[period == "June 2021"],
    x_end   = x_pos[period == "Sept 2021"],
    y_start = value[period == "June 2021"],
    y_end   = value[period == "Sept 2021"],
    .groups = "drop"
  )

# 2. Plot
ggplot() +
  # Bars
  geom_col(data = data,
           aes(x = x_pos, y = value, fill = period),
           width = 0.35, show.legend = FALSE) +
  # Connecting lines
  geom_segment(data = lines,
               aes(x = x_start, xend = x_end, y = y_start, yend = y_end),
               color = "#666666", linewidth = 0.4) +
  # Value labels on bar tops
  geom_text(data = data,
            aes(x = x_pos, y = value + 2, label = value),
            size = 3.2, fontface = "bold", color = "#333333") +
  # Fill colors: McKinsey blue palette
  scale_fill_manual(values = c("June 2021" = "#00558C", "Sept 2021" = "#00A9E0")) +
  # Y axis
  scale_y_continuous(limits = c(0, 105), expand = c(0, 0)) +
  # X axis
  scale_x_continuous(
    breaks = 1:7,
    labels = levels(data$region),
    expand = expansion(add = 0.6)
  ) +
  # Theme
  theme_minimal() +
  theme(
    axis.title   = element_blank(),
    axis.text.y  = element_text(size = 9, color = "#555555"),
    axis.text.x  = element_text(size = 9.5, color = "#333333"),
    axis.ticks   = element_blank(),
    panel.grid.major.x = element_blank(),
    panel.grid.minor   = element_blank(),
    panel.grid.major.y = element_line(color = "#E0E0E0", linewidth = 0.3),
    plot.margin  = margin(t = 30, r = 20, b = 20, l = 20)
  ) -> p

# Title + subtitle
p <- p +
  labs(
    title = "In nearly every region, most respondents say their home economies are better now than six months ago—with a dramatic upturn in India.",
    subtitle = "Respondents who say economic conditions in their home countries are better than 6 months ago, %"
  ) +
  theme(
    plot.title    = element_text(size = 12, face = "bold", lineheight = 1.15),
    plot.subtitle = element_text(size = 9, color = "#555555", lineheight = 1.1)
  )

# Legend (manual, bottom-left style matching McKinsey)
# Build a small legend annotation
legend_data <- data.frame(
  x = c(0.3, 0.3),
  y = c(0.96, 0.92),
  label = c("June 2021", "Sept 2021"),
  color = c("#00558C", "#00A9E0")
)

p <- p +
  annotate("rect", xmin = -6.4, xmax = -5.0, ymin = 96, ymax = 102,
           fill = "#00558C", color = NA) +
  annotate("text", x = -4.8, y = 99, label = "June 2021",
           hjust = 0, size = 3.5, color = "#333333") +
  annotate("rect", xmin = -6.4, xmax = -5.0, ymin = 88, ymax = 94,
           fill = "#00A9E0", color = NA) +
  annotate("text", x = -4.8, y = 91, label = "Sept 2021",
           hjust = 0, size = 3.5, color = "#333333")

# Source note
caption <- paste0(
  "Source: McKinsey Global Survey on the economy, Sept 8–Sept 20, 2021 (n=1,624).\n",
  "1 Respondents who answered the same or worse are not shown.\n",
  "2 Includes Hong Kong and Taiwan.\n",
  "3 Includes Middle East, North Africa, South Asia, and sub-Saharan Africa."
)
p <- p + labs(caption = caption) +
  theme(plot.caption = element_text(size = 7, hjust = 0, color = "#888888", lineheight = 1.2))

# 3. Export
base <- "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/02-图表-麦肯锡经济信心-20260507/mckinsey_economic_sentiment"
ggsave(paste0(base, ".pdf"), p, width = 12, height = 7, bg = "white")

grDevices::png(paste0(base, ".png"), width = 7200, height = 4200, res = 600, bg = "white")
print(p)
grDevices::dev.off()

cat("Done.\n")
