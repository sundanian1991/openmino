// Slide 1 — 封面 with full-bleed Agnes cover image
module.exports.build = async function(slide, pptx, C, ASSETS) {
  // Full-bleed background image
  slide.addImage({
    path: ASSETS + '/slide01_cover.png',
    x: 0, y: 0, w: 13.333, h: 7.5,
    transparency: 35,
  });

  // 暗色蒙版底部 2/3（让文字可读）
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 2.8, w: 13.333, h: 4.7,
    fill: { color: '000000', transparency: 55 },
    line: { color: '000000', transparency: 100 },
  });

  // 主标题
  slide.addText('当你感觉"不对"的时候', {
    x: 0.8, y: 3.1, w: 11.5, h: 1.4,
    fontSize: 48, fontFace: 'PingFang SC', bold: true,
    color: C.white, align: 'left',
  });
  slide.addText('AI 听不见', {
    x: 0.8, y: 4.3, w: 11.5, h: 1.2,
    fontSize: 48, fontFace: 'PingFang SC', bold: true,
    color: C.accent, align: 'left',
  });

  // 副标题
  slide.addText('从 Dwarkesh x Grant Sanderson 的对话出发\n重新理解人机协作中"判断力"的稀缺性', {
    x: 0.8, y: 5.6, w: 11.0, h: 0.8,
    fontSize: 17, fontFace: 'PingFang SC',
    color: C.white, transparency: 20, align: 'left', lineSpacingMultiple: 1.35,
  });

  // 装饰线
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 6.5, w: 3.0, h: 0.04,
    fill: { color: C.accent }, line: { color: C.accent },
  });

  slide.addText('灵感来源：Dwarkesh Podcast x Grant Sanderson (3Blue1Brown) | "AI and the Future of Math" . 2026.06.30', {
    x: 0.8, y: 6.7, w: 11.5, h: 0.4,
    fontSize: 10, fontFace: 'PingFang SC',
    color: C.white, transparency: 35, align: 'left',
  });
};
