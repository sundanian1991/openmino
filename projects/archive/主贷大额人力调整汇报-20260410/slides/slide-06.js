// slide-06.js — 采购融资 detail
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 6,
  title: '采购融资采用"宽进严出"策略，3 家供应商 3 个月测试后淘汰至 3 家'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.8, y: 0.3, w: 8.5, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Strategy tag
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 0.85, w: 1.8, h: 0.3,
    fill: { color: theme.accent }, rectRadius: 0.05
  });
  slide.addText('宽进严出', {
    x: 0.8, y: 0.85, w: 1.8, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: 'FFFFFF', bold: true, align: "center", valign: "middle"
  });

  slide.addText('从金企融合渠道筛选供应商测试，5 家最终保留 3 家', {
    x: 2.8, y: 0.85, w: 5, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Table
  const headerY = 1.3;
  const headers = ['供应商', '当前人力', '新增', '类型', '调整后'];
  const colWidths = [2.5, 1.2, 1.0, 1.5, 1.2];
  const colX = [0.8];
  for (let i = 1; i < colWidths.length; i++) {
    colX.push(colX[i-1] + colWidths[i-1]);
  }

  // Header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: headerY, w: 7.4, h: 0.35,
    fill: { color: theme.primary }, rectRadius: 0.02
  });

  headers.forEach((h, i) => {
    slide.addText(h, {
      x: colX[i], y: headerY, w: colWidths[i], h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: 'FFFFFF', bold: true, align: "center", valign: "middle"
    });
  });

  // Data rows
  const vendors = [
    { name: '德辰职场', current: 5, newAdd: 5, type: '存量扩量' },
    { name: '速腾职场', current: 5, newAdd: 10, type: '存量扩量' },
    { name: '新增职场 1', current: 0, newAdd: 8, type: '新准入测试' },
    { name: '新增职场 2', current: 0, newAdd: 8, type: '新准入测试' },
    { name: '新增职场 3', current: 0, newAdd: 8, type: '新准入测试' }
  ];

  vendors.forEach((v, i) => {
    const rowY = headerY + 0.35 + i * 0.48;

    if (i % 2 === 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: rowY, w: 7.4, h: 0.48,
        fill: { color: theme.light }
      });
    }

    const isNew = v.type.includes('新准入');
    const nameColor = isNew ? theme.accent : theme.primary;

    slide.addText(v.name, {
      x: colX[0], y: rowY, w: colWidths[0], h: 0.48,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: nameColor, bold: isNew, valign: "middle"
    });

    slide.addText(v.current > 0 ? String(v.current) : '—', {
      x: colX[1], y: rowY, w: colWidths[1], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, align: "center", valign: "middle"
    });

    slide.addText('+' + v.newAdd, {
      x: colX[2], y: rowY, w: colWidths[2], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true, align: "center", valign: "middle"
    });

    // Type badge
    const badgeColor = isNew ? theme.accent : '8d99ae';
    slide.addShape(pres.shapes.RECTANGLE, {
      x: colX[3] + 0.15, y: rowY + 0.1, w: colWidths[3] - 0.3, h: 0.25,
      fill: { color: isNew ? 'B85450' : 'edf2f4' }, rectRadius: 0.05
    });
    slide.addText(v.type, {
      x: colX[3], y: rowY, w: colWidths[3], h: 0.48,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: isNew ? 'FFFFFF' : theme.secondary, align: "center", valign: "middle"
    });

    slide.addText(String(v.current + v.newAdd), {
      x: colX[4], y: rowY, w: colWidths[4], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true, align: "center", valign: "middle"
    });

    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: rowY + 0.48, w: 7.4, h: 0.01,
      fill: { color: theme.light }
    });
  });

  // Total
  const totalY = headerY + 0.35 + vendors.length * 0.48;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: totalY, w: 7.4, h: 0.45,
    fill: { color: 'edf2f4' }, rectRadius: 0.02
  });

  slide.addText('合计', {
    x: colX[0], y: totalY, w: colWidths[0], h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, valign: "middle"
  });
  slide.addText('10', {
    x: colX[1], y: totalY, w: colWidths[1], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('+30', {
    x: colX[2], y: totalY, w: colWidths[2], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('40', {
    x: colX[4], y: totalY, w: colWidths[4], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });

  // Timeline box
  const tlY = totalY + 0.55;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: tlY, w: 7.4, h: 1.3,
    fill: { color: 'FFFFFF' },
    rectRadius: 0.03,
    line: { color: theme.accent, width: 1.0 }
  });

  slide.addText('淘汰机制', {
    x: 1.0, y: tlY + 0.08, w: 2, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // Timeline steps
  const steps = [
    { phase: '4-6月', text: '3 家新准入供应商进入测试期，各配置 8 人', x: 1.0, y: tlY + 0.35 },
    { phase: '7月起', text: '启动末尾淘汰机制，5 家中保留 3 家', x: 1.0, y: tlY + 0.65 },
    { phase: '目标', text: '通过赛马筛选优质供应商，建立采购融资产能基础', x: 1.0, y: tlY + 0.95 }
  ];

  steps.forEach(s => {
    // Phase badge
    slide.addShape(pres.shapes.RECTANGLE, {
      x: s.x, y: s.y + 0.02, w: 0.75, h: 0.22,
      fill: { color: theme.primary }, rectRadius: 0.03
    });
    slide.addText(s.phase, {
      x: s.x, y: s.y, w: 0.75, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: 'FFFFFF', bold: true, align: "center", valign: "middle"
    });

    slide.addText(s.text, {
      x: s.x + 0.85, y: s.y, w: 6.0, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // Page badge
  slide.addText('6', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
