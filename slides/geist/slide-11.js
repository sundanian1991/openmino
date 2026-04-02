// slide-11.js - Content (Mixed Media): 构图与网格系统
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  subtype: 'mixed-media',
  index: 11,
  title: '构图与网格系统'
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
    x: 0.5, y: 0.4, w: 9, h: 0.65,
    fontSize: 30, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // ==========================================
  // LEFT SIDE: 5x5 Grid Illustration
  // ==========================================

  // 网格标签
  slide.addText('5\u00D75 方格矩阵系统', {
    x: 0.5, y: 1.2, w: 4.2, h: 0.4,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center"
  });

  // 5x5 Grid - outer border
  const gridX = 0.7;
  const gridY = 1.75;
  const gridW = 3.8;
  const gridH = 2.5;
  const cellW = gridW / 5;
  const cellH = gridH / 5;

  // Grid background
  slide.addShape('rect', {
    x: gridX, y: gridY, w: gridW, h: gridH,
    fill: { color: theme.bg },
    line: { color: theme.light, width: 1 }
  });

  // Draw 5x5 grid cells
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cx = gridX + col * cellW;
      const cy = gridY + row * cellH;
      slide.addShape('rect', {
        x: cx, y: cy, w: cellW, h: cellH,
        fill: { color: theme.bg },
        line: { color: theme.light, width: 0.5 }
      });
    }
  }

  // Highlight center cell to show focal point
  slide.addShape('rect', {
    x: gridX + 2 * cellW, y: gridY + 2 * cellH, w: cellW, h: cellH,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 },
    transparency: 75
  });

  // Grid annotation
  slide.addText('每格 = 1 个视觉单元，中心格为焦点位', {
    x: 0.5, y: 4.4, w: 4.2, h: 0.35,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // ==========================================
  // RIGHT SIDE: 网格规格表 + 间距 Tokens
  // ==========================================

  // 网格规格表标题
  slide.addText('网格规格', {
    x: 5.2, y: 1.2, w: 4.3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Table header row
  const tableTop = 1.65;
  const colWidths = [1.0, 0.6, 0.65, 0.65, 1.0];
  const colX = [5.2, 6.2, 6.8, 7.45, 8.1];
  const headers = ['设备', '列数', '间距', '边距', '最大宽度'];

  // Header background
  slide.addShape('rect', {
    x: 5.2, y: tableTop, w: 3.9, h: 0.35,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  headers.forEach((h, i) => {
    slide.addText(h, {
      x: colX[i], y: tableTop, w: colWidths[i], h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center"
    });
  });

  // Table data rows with alternating backgrounds
  const rows = [
    { device: 'Desktop', cols: '12列', gap: '24px', margin: '24px', max: '1440px' },
    { device: 'Tablet', cols: '8列', gap: '16px', margin: '16px', max: '768px' },
    { device: 'Mobile', cols: '4列', gap: '12px', margin: '16px', max: '390px' }
  ];

  rows.forEach((r, i) => {
    const ry = tableTop + 0.35 + i * 0.35;
    const bgColor = i % 2 === 0 ? "FFFFFF" : "F7F5F3";

    slide.addShape('rect', {
      x: 5.2, y: ry, w: 3.9, h: 0.35,
      fill: { color: bgColor },
      line: { width: 0 }
    });

    const vals = [r.device, r.cols, r.gap, r.margin, r.max];
    vals.forEach((v, j) => {
      slide.addText(v, {
        x: colX[j], y: ry, w: colWidths[j], h: 0.35,
        fontSize: 10, fontFace: j === 0 ? "Microsoft YaHei" : "Arial",
        color: j === 0 ? theme.primary : theme.secondary,
        bold: j === 0, align: "center"
      });
    });
  });

  // Key Spacing Tokens section
  slide.addText('关键间距 Token', {
    x: 5.2, y: 3.15, w: 4.3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Divider line
  slide.addShape('rect', {
    x: 5.2, y: 3.52, w: 3.9, h: 0.015,
    fill: { color: theme.light },
    line: { width: 0 }
  });

  const tokens = [
    { name: 'space.4', val: '16px', desc: '默认' },
    { name: 'space.6', val: '24px', desc: '中等' },
    { name: 'space.8', val: '32px', desc: '大间距' }
  ];

  tokens.forEach((t, i) => {
    const ty = 3.6 + i * 0.35;

    // Token name with accent color
    slide.addText(t.name, {
      x: 5.3, y: ty, w: 1.2, h: 0.3,
      fontSize: 12, fontFace: "Arial",
      color: theme.accent, bold: true, align: "left"
    });

    // Token value
    slide.addText(t.val, {
      x: 6.6, y: ty, w: 0.8, h: 0.3,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true, align: "left"
    });

    // Description
    slide.addText(t.desc, {
      x: 7.4, y: ty, w: 1.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // 留白强调
  slide.addShape('rect', {
    x: 5.2, y: 4.7, w: 3.9, h: 0.35,
    fill: { color: theme.primary },
    line: { width: 0 }
  });
  slide.addText('留白 > 40%', {
    x: 5.3, y: 4.73, w: 3.7, h: 0.28,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center"
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('11', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
