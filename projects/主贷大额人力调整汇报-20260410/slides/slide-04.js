// slide-04.js — 增信减量 detail
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '赛马排名靠前的供应商承担更多减量，排名 1-2 分别减 12/8 人'
};

const vendors = [
  { name: '新动力职场', before: 28, rank: 1, delta: -12, transfer: -12, after: 16 },
  { name: '汇讯职场', before: 17, rank: 2, delta: -8, transfer: -8, after: 9 },
  { name: '广达职场', before: 5, rank: 3, delta: 0, transfer: 0, after: 5 },
  { name: '中乾职场', before: 5, rank: null, delta: 0, transfer: 0, after: 5 },
  { name: '小蜜蜂职场', before: 5, rank: null, delta: 0, transfer: 0, after: 5 }
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

  // Subtitle note
  slide.addText('注：广达仅 5 人且拉新排名靠后，不做调整；中乾、小蜜蜂各 5 人，暂不调整', {
    x: 0.8, y: 0.75, w: 8, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Table header
  const headerY = 1.2;
  const headers = ['供应商', '调整前', '赛马排名', '减量', '转入拉新', '调整后'];
  const colWidths = [2.2, 1.0, 1.2, 1.0, 1.2, 1.2];
  const colX = [0.8];
  for (let i = 1; i < colWidths.length; i++) {
    colX.push(colX[i-1] + colWidths[i-1]);
  }

  // Header row background
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: headerY, w: 7.8, h: 0.35,
    fill: { color: theme.primary }, rectRadius: 0.02
  });

  headers.forEach((h, i) => {
    slide.addText(h, {
      x: colX[i], y: headerY, w: colWidths[i], h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: 'FFFFFF', bold: true, align: "center",
      valign: "middle"
    });
  });

  // Data rows
  vendors.forEach((v, i) => {
    const rowY = headerY + 0.35 + i * 0.55;
    const isTotal = false;

    // Alternate row background
    if (i % 2 === 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: rowY, w: 7.8, h: 0.55,
        fill: { color: theme.light }, rectRadius: 0
      });
    }

    // Vendor name
    slide.addText(v.name, {
      x: colX[0], y: rowY, w: colWidths[0], h: 0.55,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, valign: "middle"
    });

    // Before
    slide.addText(String(v.before), {
      x: colX[1], y: rowY, w: colWidths[1], h: 0.55,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, align: "center", valign: "middle"
    });

    // Rank
    const rankText = v.rank !== null ? String(v.rank) : '—';
    const rankColor = v.rank !== null && v.rank <= 2 ? theme.accent : theme.secondary;
    slide.addText(rankText, {
      x: colX[2], y: rowY, w: colWidths[2], h: 0.55,
      fontSize: 12, fontFace: "Arial",
      color: rankColor, bold: v.rank !== null, align: "center", valign: "middle"
    });

    // Delta
    const deltaText = v.delta < 0 ? String(v.delta) : '0';
    const deltaColor = v.delta < 0 ? 'B85450' : theme.secondary;
    slide.addText(deltaText, {
      x: colX[3], y: rowY, w: colWidths[3], h: 0.55,
      fontSize: 12, fontFace: "Arial",
      color: deltaColor, bold: v.delta < 0, align: "center", valign: "middle"
    });

    // Transfer
    const transText = v.transfer < 0 ? String(v.transfer) : '0';
    const transColor = v.transfer < 0 ? 'B85450' : theme.secondary;
    slide.addText(transText, {
      x: colX[4], y: rowY, w: colWidths[4], h: 0.55,
      fontSize: 12, fontFace: "Arial",
      color: transColor, bold: v.transfer < 0, align: "center", valign: "middle"
    });

    // After
    slide.addText(String(v.after), {
      x: colX[5], y: rowY, w: colWidths[5], h: 0.55,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true, align: "center", valign: "middle"
    });

    // Row divider
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: rowY + 0.55, w: 7.8, h: 0.01,
      fill: { color: theme.light }
    });
  });

  // Total row
  const totalY = headerY + 0.35 + vendors.length * 0.55;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: totalY, w: 7.8, h: 0.45,
    fill: { color: 'edf2f4' }, rectRadius: 0.02
  });

  slide.addText('合计', {
    x: colX[0], y: totalY, w: colWidths[0], h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, valign: "middle"
  });
  slide.addText('60', {
    x: colX[1], y: totalY, w: colWidths[1], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });
  slide.addText('-20', {
    x: colX[3], y: totalY, w: colWidths[3], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: 'B85450', bold: true, align: "center", valign: "middle"
  });
  slide.addText('-20', {
    x: colX[4], y: totalY, w: colWidths[4], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: 'B85450', bold: true, align: "center", valign: "middle"
  });
  slide.addText('40', {
    x: colX[5], y: totalY, w: colWidths[5], h: 0.45,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });

  // Key insight box
  const insightY = totalY + 0.55;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: insightY, w: 7.8, h: 0.9,
    fill: { color: 'FFFFFF' },
    rectRadius: 0.03,
    line: { color: theme.accent, width: 1.0 }
  });

  slide.addText('关键逻辑', {
    x: 1.0, y: insightY + 0.08, w: 2, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText('赛马排名 1-2 的供应商承担 100% 减量（新动力 -12、汇讯 -8），减下的人员全部转入拉新板块，保留团队编制但转换业务方向。排名 3 及以后的供应商因基数小（5人）不做调整。', {
    x: 1.0, y: insightY + 0.33, w: 7.4, h: 0.5,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Page badge
  slide.addText('4', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
