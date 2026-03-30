// slide-10.js - 边界识别（对策部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 10,
  section: '对策 · 怎么办',
  title: '可控边界识别'
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

  // Three columns with distinct visual treatment
  const cols = [
    {
      header: '不可控',
      subheader: '接受',
      items: ['组织架构', '权力分配', 'KPI 设定', '他人行为模式'],
      headerColor: theme.light,
      barColor: theme.light,
      x: 0.5,
      highlight: false
    },
    {
      header: '可影响',
      subheader: '争取',
      items: ['供应商关系', '数据呈现', '向上汇报', '跨组协作'],
      headerColor: theme.secondary,
      barColor: theme.secondary,
      x: 3.55,
      highlight: false
    },
    {
      header: '可控',
      subheader: '聚焦',
      items: ['自己的判断', '自己的表达', '数据记录', '响应策略'],
      headerColor: theme.accent,
      barColor: theme.accent,
      x: 6.6,
      highlight: true
    }
  ];

  const colW = 2.9;

  cols.forEach((col) => {
    // Header box
    slide.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.7, w: colW, h: 0.8,
      fill: { color: col.highlight ? "FFF5F2" : "FFFFFF" },
      line: { color: col.headerColor, width: col.highlight ? 2 : 1 }
    });

    // Left accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.7, w: 0.12, h: 0.8,
      fill: { color: col.barColor }
    });

    slide.addText(col.header, {
      x: col.x + 0.2, y: 1.75, w: colW - 0.4, h: 0.4,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: col.headerColor, bold: true
    });

    slide.addText(col.subheader, {
      x: col.x + 0.2, y: 2.15, w: colW - 0.4, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // Items
    col.items.forEach((item, i) => {
      const y = 2.6 + i * 0.45;

      // Dot
      slide.addShape(pres.shapes.OVAL, {
        x: col.x + 0.25, y: y + 0.15, w: 0.08, h: 0.08,
        fill: { color: col.highlight ? theme.accent : theme.secondary }
      });

      // Text
      slide.addText(item, {
        x: col.x + 0.4, y: y, w: colW - 0.6, h: 0.35,
        fontSize: 11, fontFace: "Microsoft YaHei",
        color: theme.primary
      });
    });
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("10", {
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
