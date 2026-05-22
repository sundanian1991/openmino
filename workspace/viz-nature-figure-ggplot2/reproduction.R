library(ggplot2)
library(svglite)
library(ragg)

# ── Data ─────────────────────────────────────────────────────────
df <- data.frame(
  region = c("Greater China", "India", "Europe", "North America",
             "Latin America", "Developing markets", "Asia-Pacific"),
  jun_2021 = c(88, 33, 74, 83, 61, 40, 67),
  sep_2021 = c(92, 92, 85, 81, 66, 52, 51)
)
df$max_val <- pmax(df$jun_2021, df$sep_2021)
df$x_pos <- seq_along(df$region)

bar_w  <- 0.30
x_min  <- min(df$x_pos) - 0.5
x_max  <- max(df$x_pos) + 0.5
x_left <- x_min + 0.15

# ─ Theme ────────────────────────────────────────────────────────
theme_set(
  theme_void(base_size = 10) +
    theme(
      plot.background = element_rect(fill = "white", color = NA),
      plot.margin     = margin(t = 5, r = 1.5, b = 3.5, l = 2, unit = "lines")
    )
)

# Build title as 2 explicit separate text objects to guarantee 2 lines
title_line1 <- "In nearly every region, most respondents say their home"
title_line2 <- "economies are better now than six months ago -- with a dramatic upturn in India."

p <- ggplot(df) +

  geom_text(
    data = data.frame(x = x_left, y = 106, label = title_line1),
    aes(x, y, label = label),
    size = 3.6, fontface = "bold", color = "#1a1a1a",
    hjust = 0, vjust = 1, family = "Arial"
  ) +
  geom_text(
    data = data.frame(x = x_left, y = 101, label = title_line2),
    aes(x, y, label = label),
    size = 3.6, fontface = "bold", color = "#1a1a1a",
    hjust = 0, vjust = 1, family = "Arial"
  ) +

  # ── Subtitle (left-aligned) ──
  geom_text(
    data = data.frame(
      x = x_left, y = 94,
      label = "Respondents who say economic conditions in their home countries are better than 6 months ago,* %"
    ),
    aes(x, y, label = label),
    size = 2.8, color = "#1a1a1a",
    hjust = 0, vjust = 1, family = "Arial"
  ) +

  # ── Bars ──
  geom_col(aes(x_pos, max_val), width = bar_w,
           fill = "#D0D3D8", color = NA) +

  # ── Dots + lines ──
  geom_point(aes(x = x_pos - bar_w * 0.35, y = jun_2021),
             size = 2, color = "#1a1a1a") +
  geom_point(aes(x = x_pos + bar_w * 0.35, y = sep_2021),
             size = 2, color = "#1a1a1a") +
  geom_segment(aes(x = x_pos - bar_w * 0.35, xend = x_pos + bar_w * 0.35,
                   y = jun_2021, yend = sep_2021),
               color = "#1a1a1a", linewidth = 1) +

  # ── Value labels ──
  geom_text(aes(x = x_pos - bar_w * 0.35, y = jun_2021 + 2, label = jun_2021),
            size = 2.8, fontface = "bold", color = "#1a1a1a",
            hjust = 0.5, vjust = 0, family = "Arial") +
  geom_text(aes(x = x_pos + bar_w * 0.35, y = sep_2021 + 2, label = sep_2021),
            size = 2.8, fontface = "bold", color = "#1a1a1a",
            hjust = 0.5, vjust = 0, family = "Arial") +

  # ── Region names ──
  geom_text(aes(x_pos, y = max_val + 5.5, label = region),
            size = 2.5, color = "#1a1a1a", fontface = "bold",
            hjust = 0.5, vjust = 0, family = "Arial") +

  # ── Bottom labels ──
  geom_text(
    data = data.frame(x = c(x_left, x_max - 0.15), y = c(4, 4),
                      label = c("June 2021", "Sept 2021")),
    aes(x, y, label = label),
    size = 2.2, color = "#aaaaaa",
    hjust = 0, vjust = 1, family = "Arial"
  ) +

  # ── Footnotes ──
  geom_text(
    data = data.frame(
      x = x_left, y = c(2.8, 2, 1.2),
      label = c(
        "* Respondents who answered the same or worse are not shown.",
        "  Includes Hong Kong and Tai.",
        "  Includes Middle East, North Africa, South Asia, and sub-Saharan Africa"
      )
    ),
    aes(x, y, label = label),
    size = 2, color = "#888888",
    hjust = 0, vjust = 1, family = "Arial"
  ) +

  scale_y_continuous(limits = c(0, 108), expand = c(0, 0)) +
  scale_x_continuous(limits = c(x_min, x_max), breaks = NULL, expand = c(0, 0))

ggsave(
  "workspace/viz-nature-figure-ggplot2/reproduction.svg",
  p, width = 11, height = 5.5, dpi = 300
)

cat("Done.\n")
