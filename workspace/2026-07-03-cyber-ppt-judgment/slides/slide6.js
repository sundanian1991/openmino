// Slide 6 — 大多数人在纠偏，不是在判断
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('大多数人在纠偏，不是在判断', {
    x: 0.5, y: 0.25, w: 12, h: 0.65,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });

  // 左侧：偏好
  slide.addText('偏好', {
    x: 0.5, y: 1.1, w: 5.5, h: 0.4,
    fontSize: 15, fontFace: 'PingFang SC', bold: true, color: '2E7D32',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.55, w: 5.5, h: 1.5,
    fill: { color: 'FFF8E1', transparency: 60 },
    line: { color: '558B2F', width: 1 }, rectRadius: 0.06,
  });
  slide.addText('显性的主观倾向\n\n我喜欢什么风格\n不喜欢什么语气\n倾向什么表达形式', {
    x: 0.7, y: 1.65, w: 5.1, h: 1.3,
    fontSize: 11.5, fontFace: 'PingFang SC', color: C.body, align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('极易被 AI 捕捉学习', {
    x: 0.7, y: 2.75, w: 5, h: 0.25,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: '2E7D32',
  });

  // 右侧：直觉
  slide.addText('直觉', {
    x: 6.5, y: 1.1, w: 5.5, h: 0.4,
    fontSize: 15, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 1.55, w: 5.5, h: 1.5,
    fill: { color: 'FFEBEE', transparency: 60 },
    line: { color: C.accent, width: 1 }, rectRadius: 0.06,
  });
  slide.addText('高压缩的隐性判断\n\n"感觉不对"\n无法直接陈述\n大量关键决策的起点', {
    x: 6.7, y: 1.65, w: 5.1, h: 1.3,
    fontSize: 11.5, fontFace: 'PingFang SC', color: C.body, align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('无法直接被 AI 理解', {
    x: 6.7, y: 2.75, w: 5, h: 0.25,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });

  // 底部循环：错误循环
  slide.addText('错误循环：把直觉当偏好', {
    x: 0.5, y: 3.2, w: 12, h: 0.4,
    fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.title,
  });

  const loopItems = [
    { text: 'AI 输出', x: 0.5, isGreen: true },
    { text: '"感觉不对"', x: 2.35, isGreen: false },
    { text: '纠偏', x: 4.15, isGreen: true },
    { text: '新输出', x: 5.75, isGreen: false },
    { text: '"还是不对"', x: 7.3, isGreen: true },
    { text: '再纠偏', x: 8.95, isGreen: false },
  ];

  const loopY = 3.75;
  loopItems.forEach((item, i) => {
    const w = 1.6, h = 0.45;
    slide.addShape(pptx.ShapeType.rect, {
      x: item.x, y: loopY, w, h,
      fill: { color: item.isGreen ? 'FFF8E1' : 'FFEBEE', transparency: 70 },
      line: { color: item.isGreen ? '558B2F' : C.accent, width: 0.75 },
      rectRadius: item.isGreen ? 0.2 : 0.04,
    });
    slide.addText(item.text, {
      x: item.x, y: loopY, w, h,
      fontSize: 9, fontFace: 'PingFang SC', bold: true,
      color: item.isGreen ? '2E7D32' : C.accent,
      align: 'center', valign: 'middle',
    });
    if (i < loopItems.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: item.x + w + 0.02, y: loopY + 0.21, w: 0.32, h: 0,
        line: { color: C.sub, width: 1, endArrowType: 'triangle' },
      });
    }
  });

  slide.addText('循环无沉淀', {
    x: 10.75, y: loopY - 0.05, w: 2.0, h: 0.55,
    fontSize: 9, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'center',
  });

  // Agnes 脑图：右侧配图
  slide.addImage({
    path: ASSETS + '/slide06_intuition.png',
    x: 0.5, y: 4.55, w: 4.5, h: 2.5,
    transparency: 25,
  });

  // 右侧结论大文字
  slide.addText('只有把模糊感受"向下深挖"\n为什么不对 -> 背后逻辑 -> 下次怎么避免\n才能把单次纠偏变成可复用的判断样本', {
    x: 5.4, y: 4.6, w: 7.4, h: 1.8,
    fontSize: 14, fontFace: 'PingFang SC', color: C.body, bold: true,
    align: 'left', lineSpacingMultiple: 1.5,
  });
};
