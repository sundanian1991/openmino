// geist-10.js — Content: 线条特征 + 可接受/不可接受
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 10,
  title: '线条特征与手绘规则'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 30, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // === 左栏：线条特征 ===
  slide.addText('线条特征', {
    x: 0.5, y: 1.2, w: 4, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addShape('rect', {
    x: 0.5, y: 1.6, w: 4.1, h: 0.02,
    fill: { color: theme.light }
  });

  const features = [
    { label: '风格', value: '手绘感、微瑕 — 非机械完美' },
    { label: '粗细', value: '2-3px — 保持一致性' },
    { label: '端点', value: '圆角 (Round cap) — 柔和亲和' },
    { label: '转角', value: '圆滑过渡 (Round join) — 避免锐角' },
    { label: '颜色', value: 'Charcoal #3D2C29 或 Terracotta Deep' }
  ];

  features.forEach((f, i) => {
    const y = 1.8 + i * 0.5;
    slide.addShape('ellipse', {
      x: 0.55, y: y + 0.08, w: 0.1, h: 0.1,
      fill: { color: theme.accent }
    });
    slide.addText(f.label, {
      x: 0.75, y: y, w: 0.7, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });
    slide.addText(f.value, {
      x: 1.5, y: y, w: 3, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // === 右栏：可接受 vs 不可接受 ===
  // 可接受卡片
  slide.addShape('roundRect', {
    x: 5.2, y: 1.2, w: 4.3, h: 1.5,
    fill: { color: "F0F5EE" },
    line: { color: "D4E8D0", width: 0.5 },
    rectRadius: 0.05
  });
  slide.addText('可接受', {
    x: 5.35, y: 1.3, w: 3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });
  ['插画线条', '装饰元素', '背景图案', '头像框架'].forEach((item, i) => {
    slide.addText(item, {
      x: 5.5, y: 1.75 + i * 0.22, w: 3.8, h: 0.22,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 不可接受卡片
  slide.addShape('roundRect', {
    x: 5.2, y: 2.9, w: 4.3, h: 1.5,
    fill: { color: "FBF0EE" },
    line: { color: "E8D5D0", width: 0.5 },
    rectRadius: 0.05
  });
  slide.addText('不可接受', {
    x: 5.35, y: 3.0, w: 3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });
  ['核心 UI 图标（需严格测试）', '小尺寸图标（<16px）', '导航图标（除非全套手绘）', '需要精确传达的符号'].forEach((item, i) => {
    slide.addText(item, {
      x: 5.5, y: 3.45 + i * 0.22, w: 3.8, h: 0.22,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 底部：线条应用层级
  slide.addShape('roundRect', {
    x: 0.5, y: 4.5, w: 9, h: 0.8,
    fill: { color: theme.primary }, rectRadius: 0.04
  });
  slide.addText('装饰层（背景纹理）  →  表达层（手势、自然元素）  →  结构层（几何形状，谨慎手绘）', {
    x: 0.7, y: 4.6, w: 8.6, h: 0.6,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: "FFFFFF", align: "center", valign: "middle"
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('10', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
