// slide-12.js - Content (Text + Icon Rows): 标志性元素库
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  subtype: 'text-icon-rows',
  index: 12,
  title: '标志性元素库'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧色块
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // ==========================================
  // ROW 1: 手形符号系统
  // ==========================================
  const row1Y = 1.1;
  const row1H = 1.2;

  // Row 1 background (bg)
  slide.addShape('rect', {
    x: 0.3, y: row1Y, w: 9.2, h: row1H,
    fill: { color: theme.bg },
    line: { width: 0 }
  });

  // Left accent bar
  slide.addShape('rect', {
    x: 0.3, y: row1Y, w: 0.05, h: row1H,
    fill: { color: theme.accent },
    line: { width: 0 }
  });

  // Row 1 header
  slide.addText('手形符号系统', {
    x: 0.6, y: row1Y + 0.08, w: 8.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Row 1 core statement
  slide.addText('手形是 Anthropic 设计的灵魂，象征连接、传递、协作、引导', {
    x: 0.6, y: row1Y + 0.42, w: 8.5, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // Row 1 key gestures
  slide.addText([
    { text: "\u270B", options: { fontSize: 11, color: theme.accent } },
    { text: " \u5F20\u5F00(\u6B22\u8FCE)  \u00B7  ", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } },
    { text: "\u261D", options: { fontSize: 11, color: theme.accent } },
    { text: " \u6307\u5411(\u5F15\u5BFC)  \u00B7  ", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } },
    { text: "\u270A", options: { fontSize: 11, color: theme.accent } },
    { text: " \u63E1\u62F3(\u529B\u91CF)  \u00B7  ", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } },
    { text: "\uD83E\uDD32", options: { fontSize: 11, color: theme.accent } },
    { text: " \u6258\u4E3E(\u652F\u6301)", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.6, y: row1Y + 0.78, w: 8.5, h: 0.3,
    align: "left"
  });

  // ==========================================
  // ROW 2: 手 x 物品组合
  // ==========================================
  const row2Y = row1Y + row1H + 0.12;
  const row2H = 1.2;

  // Row 2 background (white)
  slide.addShape('rect', {
    x: 0.3, y: row2Y, w: 9.2, h: row2H,
    fill: { color: "FFFFFF" },
    line: { width: 0 }
  });

  // Left accent bar
  slide.addShape('rect', {
    x: 0.3, y: row2Y, w: 0.05, h: row2H,
    fill: { color: theme.accent },
    line: { width: 0 }
  });

  // Row 2 header
  slide.addText('\u624B \u00D7 \u7269\u54C1\u7EC4\u5408', {
    x: 0.6, y: row2Y + 0.08, w: 8.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Row 2 combinations - first line
  slide.addText([
    { text: "\u624B + \u4E66\u7C4D = \u77E5\u8BC6\u4F20\u9012", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } },
    { text: "    \u00B7    ", options: { fontSize: 11, color: theme.light } },
    { text: "\u624B + \u5730\u7403 = \u5168\u7403\u534F\u4F5C", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.6, y: row2Y + 0.48, w: 8.5, h: 0.3,
    align: "left"
  });

  // Row 2 combinations - second line
  slide.addText([
    { text: "\u624B + \u4EE3\u7801 = \u6280\u672F\u521B\u4F5C", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } },
    { text: "    \u00B7    ", options: { fontSize: 11, color: theme.light } },
    { text: "\u624B + \u690D\u7269 = \u6210\u957F\u57F9\u80B2", options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.6, y: row2Y + 0.82, w: 8.5, h: 0.3,
    align: "left"
  });

  // ==========================================
  // ROW 3: 自然意象
  // ==========================================
  const row3Y = row2Y + row2H + 0.12;
  const row3H = 1.2;

  // Row 3 background (bg)
  slide.addShape('rect', {
    x: 0.3, y: row3Y, w: 9.2, h: row3H,
    fill: { color: theme.bg },
    line: { width: 0 }
  });

  // Left accent bar
  slide.addShape('rect', {
    x: 0.3, y: row3Y, w: 0.05, h: row3H,
    fill: { color: theme.accent },
    line: { width: 0 }
  });

  // Row 3 header
  slide.addText('\u81EA\u7136\u610F\u8C61', {
    x: 0.6, y: row3Y + 0.08, w: 8.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Natural imagery items - line 1
  slide.addText([
    { text: "\u8776(\u8715\u53D8)", options: { fontSize: 12, color: theme.accent, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "  \u00B7  ", options: { fontSize: 12, color: theme.light } },
    { text: "\u5C71\u8109(\u7A33\u5B9A)", options: { fontSize: 12, color: theme.accent, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "  \u00B7  ", options: { fontSize: 12, color: theme.light } },
    { text: "\u8702\u5DE2(\u534F\u4F5C)", options: { fontSize: 12, color: theme.accent, bold: true, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.6, y: row3Y + 0.48, w: 8.5, h: 0.3,
    align: "left"
  });

  // Natural imagery items - line 2
  slide.addText([
    { text: "\u6C34\u6D41(\u6D41\u52A8)", options: { fontSize: 12, color: theme.accent, bold: true, fontFace: "Microsoft YaHei" } },
    { text: "  \u00B7  ", options: { fontSize: 12, color: theme.light } },
    { text: "\u6811\u6728(\u751F\u957F)", options: { fontSize: 12, color: theme.accent, bold: true, fontFace: "Microsoft YaHei" } }
  ], {
    x: 0.6, y: row3Y + 0.82, w: 8.5, h: 0.3,
    align: "left"
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('12', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
