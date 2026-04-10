// slide-05.js — 拉新增量 detail
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  title: '拉新按赛马排名分配新增，排名 1 汇讯获 8 个新增名额'
};

const vendors = [
  { name: '汇讯职场', current: 64, rank: 1, transfer: 8, newAdd: 8, after: 76 },
  { name: '新动力职场', current: 50, rank: 4, transfer: 12, newAdd: 2, after: 63 },
  { name: '锦瑞职场', current: 24, rank: 2, transfer: 0, newAdd: 6, after: 27 },
  { name: '德辰职场', current: 27, rank: 3, transfer: 0, newAdd: 4, after: 29 },
  { name: '广达职场', current: 32, rank: null, transfer: 0, newAdd: 0, after: 32 },
  { name: '中乾职场', current: 31, rank: null, transfer: 0, newAdd: 0, after: 31 },
  { name: '速腾职场', current: 7, rank: null, transfer: 0, newAdd: 0, after: 7 }
];

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

  // Subtitle
  slide.addText('增信转入 20 人 + 新增需求 20 人 = 总计新增 40 人', {
    x: 0.8, y: 0.75, w: 8, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Table
  const headerY = 1.15;
  const headers = ['供应商', '当前人力', '赛马排名', '增信转入', '新增需求', '调整后'];
  const colWidths = [2.2, 1.0, 1.0, 1.0, 1.0, 1.2];
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
  vendors.forEach((v, i) => {
    const rowY = headerY + 0.35 + i * 0.48;

    if (i % 2 === 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: rowY, w: 7.4, h: 0.48,
        fill: { color: theme.light }
      });
    }

    slide.addText(v.name, {
      x: colX[0], y: rowY, w: colWidths[0], h: 0.48,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, valign: "middle"
    });

    slide.addText(String(v.current), {
      x: colX[1], y: rowY, w: colWidths[1], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, align: "center", valign: "middle"
    });

    const rankText = v.rank !== null ? String(v.rank) : '—';
    const rankColor = v.rank !== null && v.rank <= 2 ? theme.accent : theme.secondary;
    slide.addText(rankText, {
      x: colX[2], y: rowY, w: colWidths[2], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: rankColor, bold: v.rank !== null, align: "center", valign: "middle"
    });

    const transText = v.transfer > 0 ? '+' + v.transfer : '0';
    const transColor = v.transfer > 0 ? theme.primary : theme.secondary;
    slide.addText(transText, {
      x: colX[3], y: rowY, w: colWidths[3], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: transColor, bold: v.transfer > 0, align: "center", valign: "middle"
    });

    const newText = v.newAdd > 0 ? '+' + v.newAdd : '0';
    const newColor = v.newAdd > 0 ? theme.primary : theme.secondary;
    slide.addText(newText, {
      x: colX[4], y: rowY, w: colWidths[4], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: newColor, bold: v.newAdd > 0, align: "center", valign: "middle"
    });

    slide.addText(String(v.after), {
      x: colX[5], y: rowY, w: colWidths[5], h: 0.48,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true, align: "center", valign: "middle"
    });

    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: rowY + 0.48, w: 7.4, h: 0.01,
      fill: { color: theme.light }
    });
  });

  // Total row
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
  slide.addText('235', {
    x: colX[1], y: totalY, w: colWidths[1], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('+20', {
    x: colX[3], y: totalY, w: colWidths[3], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('+20', {
    x: colX[4], y: totalY, w: colWidths[4], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('275', {
    x: colX[5], y: totalY, w: colWidths[5], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });

  // Insight box
  const insightY = totalY + 0.55;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: insightY, w: 7.4, h: 0.9,
    fill: { color: 'FFFFFF' },
    rectRadius: 0.03,
    line: { color: theme.accent, width: 1.0 }
  });

  slide.addText('关键逻辑', {
    x: 1.0, y: insightY + 0.08, w: 2, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText('新增 20 人严格按赛马排名分配：排名 1 汇讯 +8、排名 2 锦瑞 +6、排名 3 德辰 +4、排名 4 新动力 +2。新动力虽排名靠后但承接了 12 名增信转入人员，实际净增 14 人，为拉新板块最大接收方。', {
    x: 1.0, y: insightY + 0.33, w: 7.0, h: 0.5,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Page badge
  slide.addText('5', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
