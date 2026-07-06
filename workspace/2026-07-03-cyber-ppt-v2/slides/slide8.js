// ═══════════════════════════════════════════════════════════
//  Slide 08 — 5问判断档案
//  横向五格，每格顶部色块+编号，底部用不用卡片而是留白+间隔
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('个人判断档案', {
    x: 0.5, y: 0.55, w: 8, h: 0.55,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('5 问解压缩你的直觉', {
    x: 0.5, y: 1.1, w: 12, h: 0.5,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.accent, align: 'left',
  });

  const Q = [
    { q: '我否定了什么？', a: '被排除的方案\n方向、表达\n\n→ 沉淀时机', num: '01', color: C.green },
    { q: '为什么否定？',   a: '定位偏差\n表达不适配\n受众不匹配\n\n→ 深挖原因', num: '02', color: C.amber },
    { q: '我保留了什么？', a: '优质内容\n的核心特征\n\n→ 变成正样本', num: '03', color: '1565C0' },
    { q: '真正关心的本质？', a: '穿透表层需求\n锚定核心诉求\n\n→ 回到起点',   num: '04', color: C.purple },
    { q: '下次避免什么？', a: '收敛成可复用\n的避坑经验\n\n→ 形成闭环', num: '05', color: C.accent },
  ];

  const cellW = 2.3, startX = 0.7, gap = 0.3;
  const cellY = 2.0, cellH = 4.6;

  Q.forEach((item, i) => {
    const x = startX + i * (cellW + gap);

    // 顶部色块（标题区）
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cellY, w: cellW, h: 1.5,
      fill: { color: item.color }, line: { type: 'none' },
    });
    // 编号
    slide.addText(item.num, {
      x, y: cellY + 0.08, w: cellW, h: 0.7,
      fontSize: 36, fontFace: 'Helvetica Neue', bold: true,
      color: C.white, transparency: 30, align: 'left',
    });
    // 问题
    slide.addText(item.q, {
      x: x + 0.15, y: cellY + 0.78, w: cellW - 0.3, h: 0.6,
      fontSize: 12, fontFace: 'Helvetica Neue', bold: true,
      color: C.white, align: 'left',
    });

    // 细线分割
    slide.addShape(pptx.ShapeType.line, {
      x: x + 0.15, y: cellY + 1.65, w: 0.4, h: 0,
      line: { color: item.color, width: 1 },
    });

    // 答案
    slide.addText(item.a, {
      x: x + 0.15, y: cellY + 1.75, w: cellW - 0.3, h: 1.6,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
      align: 'left', lineSpacingMultiple: 1.3,
    });

    // 底部小箭头
    if (i < Q.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: x + cellW + 0.02, y: cellY + cellH / 2 - 0.1, w: 0.26, h: 0,
        line: { color: C.rule, width: 0.75, endArrowType: 'triangle' },
      });
    }
  });

  // 底部一行区别
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7, y: 6.85, w: 12, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  slide.addText('关键区别', {
    x: 0.7, y: 6.95, w: 3, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.mute,
  });
  slide.addText('内容总结 = 压缩归档', {
    x: 2.1, y: 6.95, w: 5, h: 0.35,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.mute, valign: 'middle',
  });
  slide.addText('判断样本 = 保留决策方式本身 → 让 AI 学会你怎么想', {
    x: 5.2, y: 6.95, w: 7.5, h: 0.35,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent, valign: 'middle',
  });
};
