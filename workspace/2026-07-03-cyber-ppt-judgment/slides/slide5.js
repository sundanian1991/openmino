// Slide 5 — "奖赏-惩罚"机制在这里会断裂
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('"奖赏-惩罚"机制在这里会断裂', {
    x: 0.6, y: 0.4, w: 12, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });

  // 左侧：RLVR 成功模式（编程）
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.5, w: 5.5, h: 2.8,
    fill: { color: 'FFF8E1', transparency: 50 },
    line: { color: 'F9A825', width: 1 }, rectRadius: 0.08,
  });
  slide.addText('✅ 编程：即时验证', {
    x: 0.85, y: 1.65, w: 5, h: 0.5,
    fontSize: 16, fontFace: 'PingFang SC', bold: true, color: '2E7D32',
  });
  slide.addText('写代码 → 跑 → 看结果对错\n→ reward 信号即现\n→ 模型快速迭代优化', {
    x: 0.85, y: 2.15, w: 5, h: 1.5,
    fontSize: 12, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('本质：短周期 · 可量化 · source of truth 确定', {
    x: 0.85, y: 3.65, w: 5, h: 0.5,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: '558B2F',
  });

  // 右侧：数学洞见的验证断层
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 1.5, w: 5.5, h: 2.8,
    fill: { color: 'FFEBEE', transparency: 50 },
    line: { color: C.accent, width: 1 }, rectRadius: 0.08,
  });
  slide.addText('✗ 造山：百年验证', {
    x: 7.05, y: 1.65, w: 5, h: 0.5,
    fontSize: 16, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });
  slide.addText('直觉 → 论文 → 被拒\n→ 死后N年 → 读懂 → 再N年\n→ 验证要等物理学跟进', {
    x: 7.05, y: 2.15, w: 5, h: 1.5,
    fontSize: 12, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('本质：长周期 · 不可量化 · reward 信号是"No good"', {
    x: 7.05, y: 3.65, w: 5, h: 0.5,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });

  // 中央断裂箭头
  slide.addShape(pptx.ShapeType.line, {
    x: 5.6, y: 2.9, w: 1.2, h: 0,
    line: { color: C.accent, width: 3, endArrowType: 'triangle' },
  });
  slide.addText('验\n证\n断\n层', {
    x: 5.6, y: 3.4, w: 1.2, h: 1.0,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'center',
  });

  // 反例卡1：Mochizuki abc
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 4.7, w: 5.5, h: 2.2,
    fill: { color: C.accent, transparency: 90 },
    line: { color: C.accent, width: 0.75 }, rectRadius: 0.06,
  });
  slide.addText('反例：望月新一的 abc 猜想证明\n"Inter-universal geometry"', {
    x: 0.85, y: 4.85, w: 5, h: 0.6,
    fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.white,
  });
  slide.addText('一种"外星数学"\n数学界爬了多年的山，最后发现不对\n→ 同行评议也救不了：老师看不出价值', {
    x: 0.85, y: 5.45, w: 5, h: 1.25,
    fontSize: 11, fontFace: 'PingFang SC', color: C.white, transparency: 10,
    align: 'left', lineSpacingMultiple: 1.3,
  });

  // 反例卡2：Copernicus
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 4.7, w: 5.5, h: 2.2,
    fill: { color: C.white },
    line: { color: C.accent, width: 0.75 }, rectRadius: 0.06,
  });
  slide.addText('平行对照：Copernicus vs Ptolemy', {
    x: 7.05, y: 4.85, w: 5, h: 0.6,
    fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });
  slide.addText('初期日心说预测反而不准\n但它在认识论上更优越\n→ 这种"好但暂时不准"的东西\n   无法放进 RL reward 函数', {
    x: 7.05, y: 5.45, w: 5, h: 1.25,
    fontSize: 11, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.3,
  });
};
