// Slide 2 — AI 不是"会"或"不会"——而是锯齿状的前沿
module.exports.build = async function(slide, pptx, C, ASSETS) {
  // 页面标题
  slide.addText('AI 不是"会"或"不会"', {
    x: 0.6, y: 0.4, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true,
    color: C.title, align: 'left',
  });
  slide.addText('——而是锯齿状的前沿', {
    x: 0.6, y: 1.0, w: 8, h: 0.6,
    fontSize: 32, fontFace: 'PingFang SC', bold: true,
    color: C.accent, align: 'left',
  });

  // IMO 19分 可视化横条
  slide.addText('IMO 成绩单（2024-2026）', {
    x: 0.6, y: 1.9, w: 6, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: C.sub,
  });

  const results = [
    { label: '几何', score: 7, max: 7, solved: '19秒解出 (2024)', color: '2E7D32' },
    { label: '数论', score: 5, max: 7, solved: '已解', color: '558B2F' },
    { label: '代数', score: 4, max: 7, solved: '部分', color: 'F9A825' },
    { label: '组合', score: 1, max: 7, solved: 'Wild card ✗', color: C.accent },
  ];

  let y = 2.4;
  results.forEach(r => {
    // 标签
    slide.addText(r.label, { x: 0.6, y, w: 0.8, h: 0.4, fontSize: 13, fontFace: 'PingFang SC', color: C.body, align: 'left' });

    // 总槽
    const barX = 1.5, barW = 5.5, barH = 0.3;
    slide.addShape(pptx.ShapeType.rect, {
      x: barX, y: y + 0.05, w: barW, h: barH,
      fill: { color: C.line }, line: { color: C.line }, rectRadius: 0.02,
    });
    // 得分槽
    slide.addShape(pptx.ShapeType.rect, {
      x: barX, y: y + 0.05, w: barW * (r.score / r.max), h: barH,
      fill: { color: r.color }, line: { color: r.color }, rectRadius: 0.02,
    });
    // 得分文本
    slide.addText(`${r.score}/${r.max}`, { x: barX + barW + 0.15, y, w: 0.7, h: 0.4, fontSize: 13, fontFace: 'PingFang SC', bold: true, color: r.color });
    // 说明
    slide.addText(r.solved, { x: barX + barW + 1.0, y, w: 3.0, h: 0.4, fontSize: 11, fontFace: 'PingFang SC', color: C.sub });
    y += 0.55;
  });

  // 核心判断
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 5.1, w: 12.0, h: 1.8,
    fill: { color: C.accent, transparency: 85 },
    line: { color: C.accent, width: 1 },
  });
  slide.addText('"The dirty secret with the IMO is that you really can train for a lot of them. Geometry, it just solves it in nineteen seconds since 2024 because it\'s a brute force solver."', {
    x: 0.85, y: 5.2, w: 11.5, h: 1.0,
    fontSize: 13, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('— Grant Sanderson, Dwarkesh Podcast, 00:00:00', {
    x: 0.85, y: 6.15, w: 11.5, h: 0.35,
    fontSize: 11, fontFace: 'PingFang SC', color: C.sub, align: 'left',
  });

  // Fractal note
  slide.addText('这种"锯齿"在放大后依然存在——数学内部也没有被均匀攻破。\n这意味着：AI 的能力边界不是阶跃的，而是分形的。', {
    x: 0.6, y: 4.55, w: 6, h: 0.55,
    fontSize: 10, fontFace: 'PingFang SC', color: C.sub,
    align: 'left', lineSpacingMultiple: 1.3,
  });
};
