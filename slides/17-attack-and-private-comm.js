/**
 * Slide 17 - Content (场景三&四：攻击方案与私下沟通)
 */

const slideConfig = {
  type: "content",
  index: 17,
  title: "场景三&四：攻击方案与私下沟通"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Background
  slide.background = { color: theme.bg };

  // Title
  slide.addText(slideConfig.title, {
    x: 0.6,
    y: 0.4,
    w: 8.8,
    h: 0.6,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // Left column - 场景三
  slide.addText("场景三：公开攻击式提问", {
    x: 0.6,
    y: 1.2,
    w: 4.2,
    h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: 1.65,
    w: 4.2,
    h: 1.9,
    fill: { color: theme.light, transparency: 60 },
    line: { color: theme.accent, width: 1 }
  });

  slide.addText([
    { text: "典型话术:", options: { bold: true, fontSize: 13, color: theme.secondary } },
    { text: "\n\"你这个方案做过市场调研吗？\"", options: { fontSize: 13, color: theme.secondary } },
    { text: "\n\"数据支撑在哪里？\"", options: { fontSize: 13, color: theme.secondary } },
    { text: "\n\"我觉得这个不太可行…\"", options: { fontSize: 13, color: theme.secondary } }
  ], {
    x: 0.7,
    y: 1.75,
    w: 4.0,
    h: 1.7,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    valign: "top"
  });

  // Right column - 场景四
  slide.addText("场景四：私下沟通试探", {
    x: 5.2,
    y: 1.2,
    w: 4.2,
    h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2,
    y: 1.65,
    w: 4.2,
    h: 1.9,
    fill: { color: theme.light, transparency: 60 },
    line: { color: theme.accent, width: 1 }
  });

  slide.addText([
    { text: "典型话术:", options: { bold: true, fontSize: 13, color: theme.secondary } },
    { text: "\n\"哥，我直说了你别介意…\"", options: { fontSize: 13, color: theme.secondary } },
    { text: "\n\"其实大家都是为你好…\"", options: { fontSize: 13, color: theme.secondary } },
    { text: "\n\"领导好像对这个有看法…\"", options: { fontSize: 13, color: theme.secondary } }
  ], {
    x: 5.3,
    y: 1.75,
    w: 4.0,
    h: 1.7,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    valign: "top"
  });

  // Bottom - 应对策略
  slide.addText("应对策略", {
    x: 0.6,
    y: 3.7,
    w: 4.2,
    h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 4.15,
    w: 8.8,
    h: 0.9,
    fill: { color: theme.accent, transparency: 20 },
    line: { color: theme.accent, width: 2 },
    rectRadius: 0.1
  });

  slide.addText([
    { text: "公开场景:", options: { bold: true, fontSize: 13, color: theme.primary } },
    { text: " 冷静拆解、就事论事、不陷入情绪对抗\n", options: { fontSize: 12, color: theme.secondary } },
    { text: "私下一对一:", options: { bold: true, fontSize: 13, color: theme.primary } },
    { text: " 识别情绪绑架、温和但坚定地要事实依据", options: { fontSize: 12, color: theme.secondary } }
  ], {
    x: 0.75,
    y: 4.25,
    w: 8.5,
    h: 0.7,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    valign: "top"
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("17", {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fontSize: 12,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  return slide;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig };
}
