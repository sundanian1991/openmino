// slide-10.js - Content (Comparison): 线条特征与手绘规则
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  subtype: 'comparison',
  index: 10,
  title: '线条特征与手绘规则'
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
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 30, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // ==========================================
  // LEFT COLUMN: 线条特征 (table-like layout)
  // ==========================================
  slide.addText('线条特征', {
    x: 0.5, y: 1.25, w: 4, h: 0.45,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // 分割线
  slide.addShape('rect', {
    x: 0.5, y: 1.72, w: 4.1, h: 0.02,
    fill: { color: theme.light },
    line: { width: 0 }
  });

  const features = [
    { label: '风格', value: '手绘感、微瑕 — 非机械完美' },
    { label: '粗细', value: '2-3px — 保持一致性' },
    { label: '端点', value: '圆角 (Round cap) — 柔和亲和' },
    { label: '转角', value: '圆滑过渡 (Round join) — 避免锐角' },
    { label: '颜色', value: 'Charcoal #3D2C29 或 Terracotta Deep' }
  ];

  features.forEach((f, i) => {
    const y = 1.9 + i * 0.5;

    // 彩色圆点
    slide.addShape('ellipse', {
      x: 0.55, y: y + 0.08, w: 0.12, h: 0.12,
      fill: { color: theme.accent },
      line: { width: 0 }
    });

    // 属性名
    slide.addText(f.label, {
      x: 0.8, y: y, w: 0.7, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true, align: "left"
    });

    // 属性值
    slide.addText(f.value, {
      x: 1.55, y: y, w: 3, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // ==========================================
  // RIGHT COLUMN: 可接受 vs 不可接受 (two cards)
  // ==========================================

  // --- 可接受 Card (green-tinted) ---
  slide.addShape('rect', {
    x: 5.2, y: 1.25, w: 4.3, h: 1.65,
    fill: { color: "EFF5EE" },
    line: { color: "D4E4D0", width: 0.5 },
    rectRadius: 0.05
  });

  // 可接受 header
  slide.addText([
    { text: "  \u2713  ", options: { fontSize: 14, color: theme.accent, bold: true } },
    { text: "可接受", options: { fontSize: 15, color: theme.primary, bold: true, fontFace: "Microsoft YaHei" } }
  ], {
    x: 5.3, y: 1.35, w: 4, h: 0.4,
    align: "left"
  });

  const acceptItems = ['插画线条', '装饰元素', '背景图案', '头像框架'];
  acceptItems.forEach((item, i) => {
    const y = 1.85 + i * 0.24;
    slide.addText([
      { text: "  \u2713  ", options: { fontSize: 10, color: theme.accent } },
      { text: item, options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } }
    ], {
      x: 5.5, y: y, w: 3.8, h: 0.22,
      align: "left"
    });
  });

  // --- 不可接受 Card (red-tinted) ---
  slide.addShape('rect', {
    x: 5.2, y: 3.15, w: 4.3, h: 1.65,
    fill: { color: "F8EFED" },
    line: { color: "E8D5D0", width: 0.5 },
    rectRadius: 0.05
  });

  // 不可接受 header
  slide.addText([
    { text: "  \u2717  ", options: { fontSize: 14, color: "B85143", bold: true } },
    { text: "不可接受", options: { fontSize: 15, color: theme.primary, bold: true, fontFace: "Microsoft YaHei" } }
  ], {
    x: 5.3, y: 3.25, w: 4, h: 0.4,
    align: "left"
  });

  const rejectItems = ['核心 UI 图标', '小尺寸图标(<16px)', '导航图标', '精确传达符号'];
  rejectItems.forEach((item, i) => {
    const y = 3.75 + i * 0.24;
    slide.addText([
      { text: "  \u2717  ", options: { fontSize: 10, color: "B85143" } },
      { text: item, options: { fontSize: 11, color: theme.secondary, fontFace: "Microsoft YaHei" } }
    ], {
      x: 5.5, y: y, w: 3.8, h: 0.22,
      align: "left"
    });
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('10', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
