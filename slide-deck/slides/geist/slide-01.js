// slide-01.js - 封面页
// 设计：Anthropic-Geist 风格 — 非对称布局，右侧陶土色块 + 左侧标题留白

const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: 'Geist × Anthropic 设计风格完全指南'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // ── 右侧陶土色块（35% 宽度）─────────────────────────
  const blockX = 6.5;
  const blockW = 3.5;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: blockX, y: 0, w: blockW, h: 5.625,
    fill: { color: theme.accent }
  });

  // ── 色块内手绘装饰元素（手掌轮廓用基础图形拼合）─────
  // 手掌主体 — 圆角矩形作为掌心
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.65, y: 1.9, w: 0.95, h: 1.1,
    fill: { color: "D4866E" },
    rectRadius: 0.15,
    line: { color: "B85A44", width: 1.5 }
  });

  // 手指 — 5 个细长圆角矩形
  const fingerBase = {
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08
  };
  // 大拇指（向左偏）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.35, y: 2.0, w: 0.32, h: 0.75,
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08,
    rotate: -25
  });
  // 食指
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.72, y: 1.2, w: 0.28, h: 0.85,
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08,
    rotate: 5
  });
  // 中指
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.05, y: 1.1, w: 0.28, h: 0.92,
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08,
    rotate: -2
  });
  // 无名指
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.38, y: 1.18, w: 0.28, h: 0.82,
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08,
    rotate: -5
  });
  // 小指
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.68, y: 1.35, w: 0.25, h: 0.7,
    fill: { color: "D4866E" },
    line: { color: "B85A44", width: 1.2 },
    rectRadius: 0.08,
    rotate: -10
  });

  // 色块内底部装饰文字
  slide.addText('Geist × Anthropic', {
    x: blockX, y: 4.5, w: blockW, h: 0.35,
    fontSize: 11, fontFace: "Georgia",
    color: "F5F1EE", align: "center",
    italic: true, transparency: 40
  });

  // ── 左侧标题区 ─────────────────────────────────────
  // 顶部装饰短线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.2, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 主标题
  slide.addText('Geist × Anthropic\n设计风格完全指南', {
    x: 0.7, y: 1.6, w: 5.4, h: 1.5,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left", valign: "top",
    lineSpacingMultiple: 1.15
  });

  // 副标题
  slide.addText('色彩系统 · 线条规则 · 构图法则 · 元素库', {
    x: 0.7, y: 3.3, w: 5.4, h: 0.45,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // Tag line
  slide.addText('用温暖的手绘语言，讲述严谨的技术故事', {
    x: 0.7, y: 3.9, w: 5.4, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "left",
    italic: true
  });

  // ── 底部信息条 ─────────────────────────────────────
  // 左侧浅灰分割线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.85, w: 5.4, h: 0.015,
    fill: { color: theme.light }
  });

  // 底部信息文字
  slide.addText('设计风格培训  |  2026', {
    x: 0.7, y: 5.0, w: 5.4, h: 0.3,
    fontSize: 12, fontFace: "Georgia",
    color: theme.light, align: "left"
  });

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "3D2C29",
    secondary: "CA6641",
    accent: "E2725B",
    light: "C5C1BE",
    bg: "F5F1EE"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
