// slide-11.js - 保护策略（对策部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 11,
  section: '对策 · 怎么办',
  title: '自我保护策略',
  principle: '不揽责 · 留证据 · 明边界'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 0.5, y: 0.5, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Three horizontal layers
  const layers = [
    {
      num: '01',
      title: '预防层',
      actions: ['明确责任边界', '建立记录习惯', '向供应商说明情况'],
      y: 1.65
    },
    {
      num: '02',
      title: '应对层',
      actions: ['REACT 回应框架', '被指责时摆事实明边界', '周报中管理责任归属'],
      y: 2.95
    },
    {
      num: '03',
      title: '记录层',
      actions: ['决策追溯文档', '重要邮件 CC 策略'],
      y: 4.25
    }
  ];

  layers.forEach((layer) => {
    // Layer box
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: layer.y, w: 9, h: 1.15,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08,
      line: { color: theme.light, width: 1 }
    });

    // Number badge
    slide.addShape(pres.shapes.OVAL, {
      x: 0.75, y: layer.y + 0.15, w: 0.45, h: 0.45,
      fill: { color: "FFF5F2" },
      line: { color: theme.accent, width: 1.5 }
    });

    slide.addText(layer.num, {
      x: 0.75, y: layer.y + 0.15, w: 0.45, h: 0.45,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "center", valign: "middle"
    });

    // Title
    slide.addText(layer.title, {
      x: 1.35, y: layer.y + 0.15, w: 2, h: 0.45,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      valign: "middle"
    });

    // Actions as pills
    layer.actions.forEach((action, i) => {
      const actionX = 3.2 + i * 2;
      const pillW = 1.85;

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: actionX, y: layer.y + 0.25, w: pillW, h: 0.3,
        fill: { color: "FAFAFA" },
        rectRadius: 0.05,
        line: { color: theme.light, width: 1 }
      });

      slide.addText(action, {
        x: actionX, y: layer.y + 0.25, w: pillW, h: 0.3,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.primary,
        align: "center", valign: "middle"
      });
    });
  });

  // Principle at bottom - centered, prominent
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 5.12, w: 3, h: 0.38,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText(slideConfig.principle, {
    x: 3.5, y: 5.12, w: 3, h: 0.38,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle"
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("11", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Footer
  slide.addText('权责不对等分析', {
    x: 0.5, y: 5.1, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
