// Slide 7 — AI 复刻了结果，但丢失了取舍
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('AI 复刻了结果，但丢失了取舍', {
    x: 0.6, y: 0.4, w: 12, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });

  // 双轨图
  slide.addText('显性输出（AI 可见）', {
    x: 0.6, y: 1.4, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: '2E7D32',
  });
  const aiVisible = [
    '最终的表达',
    '被保留的段落',
    '表格里的数据',
    '定稿的标题',
    '图形的构图',
  ];
  let y = 1.9;
  aiVisible.forEach(item => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y, w: 5.5, h: 0.55,
      fill: { color: 'FFF8E1', transparency: 70 },
      line: { color: '558B2F', width: 0.6 },
      rectRadius: 0.05,
    });
    slide.addText(`✓  ${item}`, {
      x: 0.8, y, w: 5.1, h: 0.55,
      fontSize: 12, fontFace: 'PingFang SC', color: C.body, valign: 'middle',
    });
    y += 0.7;
  });

  slide.addText('隐性裁决（AI 不可见）', {
    x: 6.8, y: 1.4, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });
  const aiHidden = [
    '为什么砍掉另一个方向',
    '为什么保留这段表达',
    '为什么这个完整答案是错的',
    '为什么标题应改成这样',
    '...这些才是核心资产',
  ];
  y = 1.9;
  aiHidden.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.8, y, w: 5.5, h: 0.55,
      fill: { color: 'FFEBEE', transparency: 70 },
      line: { color: C.accent, width: 0.6 },
      rectRadius: 0.05,
    });
    slide.addText(`✗  ${item}`, {
      x: 7.0, y, w: 5.1, h: 0.55,
      fontSize: 12, fontFace: 'PingFang SC', color: C.body, valign: 'middle',
    });
    y += 0.7;
  });

  // 中间连接符号
  slide.addShape(pptx.ShapeType.line, {
    x: 6.2, y: 3.0, w: 0.5, h: 0,
    line: { color: C.sub, width: 2 },
  });
  slide.addText('AI\n看到\n', {
    x: 6.15, y: 3.5, w: 0.7, h: 0.7,
    fontSize: 10, fontFace: 'PingFang SC', color: C.sub, align: 'center',
  });
  slide.addText('\nAI\n丢失', {
    x: 6.15, y: 4.5, w: 0.7, h: 0.7,
    fontSize: 10, fontFace: 'PingFang SC', color: C.accent, align: 'center',
  });

  // 结论卡
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 5.6, w: 12, h: 1.2,
    fill: { color: C.accent, transparency: 88 },
    line: { color: C.accent, width: 0.75 },
  });
  slide.addText('被遗漏的隐性判断，是创作者最应沉淀的核心资产。\n这些判断恰好也是人机协作中最值得"开采"的部分。', {
    x: 0.85, y: 5.7, w: 11.5, h: 1.0,
    fontSize: 14, fontFace: 'PingFang SC', color: C.white,
    align: 'left', lineSpacingMultiple: 1.35,
  });
};
