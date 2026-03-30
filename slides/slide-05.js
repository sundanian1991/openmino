// slide-05.js - 组织结构（重构版）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  section: '根因 · 为什么',
  title: '组织结构现状',
  insight: '定价权在策略组，流失风险由服务组承担'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧大色块 - 与封面页呼应
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.8, h: 5.625,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 1.3, y: 0.7, w: 7, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 1.3, y: 1, w: 7, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 左右两列对比布局 - 更清晰的视觉分离
  // 左侧：服务组
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.3, y: 1.7, w: 3.8, h: 1.8,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 2 }
  });

  // 左侧顶部色条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.3, y: 1.7, w: 3.8, h: 0.12,
    fill: { color: theme.light },
    rectRadius: 0.08
  });

  slide.addText('服务组', {
    x: 1.5, y: 1.75, w: 3.4, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.light, bold: true
  });

  // 服务组内容
  const serviceItems = [
    { label: '职责', value: '供应商管理\n执行交付' },
    { label: '权力', value: '建议权' },
    { label: 'KPI', value: '生态健康\n交付质量' }
  ];

  serviceItems.forEach((item, i) => {
    const y = 2.2 + i * 0.42;
    slide.addText(item.label, {
      x: 1.5, y: y, w: 0.7, h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.light, bold: true
    });
    slide.addText(item.value, {
      x: 2.2, y: y, w: 2.7, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 右侧：策略组
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.5, y: 1.7, w: 3.8, h: 1.8,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 2 }
  });

  // 右侧顶部色条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 1.7, w: 3.8, h: 0.12,
    fill: { color: theme.accent },
    rectRadius: 0.08
  });

  slide.addText('策略组', {
    x: 5.7, y: 1.75, w: 3.4, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // 策略组内容
  const strategyItems = [
    { label: '职责', value: '名单 + 定价\n产品 + 数据' },
    { label: '权力', value: '决策权' },
    { label: 'KPI', value: '预算目标\n费效比' }
  ];

  strategyItems.forEach((item, i) => {
    const y = 2.2 + i * 0.42;
    slide.addText(item.label, {
      x: 5.7, y: y, w: 0.7, h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.value, {
      x: 6.4, y: y, w: 2.7, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 中间对比箭头
  slide.addText('↔', {
    x: 5.15, y: 2.5, w: 0.3, h: 0.5,
    fontSize: 24, fontFace: "Arial",
    color: theme.light
  });

  // 底部洞察 - 横跨整页
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.3, y: 3.7, w: 8, h: 0.9,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.3, y: 3.7, w: 0.12, h: 0.9,
    fill: { color: theme.accent },
    rectRadius: 0.08
  });

  slide.addText('核心洞察', {
    x: 1.6, y: 3.85, w: 7.5, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText(slideConfig.insight, {
    x: 1.6, y: 4.1, w: 7.5, h: 0.4,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 右下角装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.5, y: 5, w: 1, h: 0.1,
    fill: { color: theme.accent }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
