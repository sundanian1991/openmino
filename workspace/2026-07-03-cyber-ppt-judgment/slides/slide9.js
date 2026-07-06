// Slide 9 — 你的策展密度 = AI 可能性空间的乘数
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('你的策展密度', {
    x: 0.5, y: 0.3, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('= AI 可能性空间的乘数', {
    x: 0.5, y: 0.95, w: 12, h: 0.5,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'left',
  });

  // 公式
  slide.addText('最终价值 = AI 可能性空间 x 人类策展+判断', {
    x: 0.7, y: 1.8, w: 12, h: 0.6,
    fontSize: 22, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });

  // AI 侧
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 2.7, w: 5.8, h: 2.2,
    fill: { color: 'F1F8E9', transparency: 50 },
    line: { color: '558B2F', width: 1 }, rectRadius: 0.08,
  });
  slide.addText('AI 端', {
    x: 0.75, y: 2.85, w: 5.3, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: '2E7D32',
  });
  slide.addText('并行生成大量不同路径\n不同结构 / 不同切口\n不同表达的方案', {
    x: 0.75, y: 3.3, w: 5.3, h: 1.0,
    fontSize: 12, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('× 可能性本身不直接产生价值', {
    x: 0.75, y: 4.15, w: 5.3, h: 0.4,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: '558B2F',
  });

  // 人类侧
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 2.7, w: 5.8, h: 2.2,
    fill: { color: 'FFEBEE', transparency: 50 },
    line: { color: C.accent, width: 1 }, rectRadius: 0.08,
  });
  slide.addText('人类端', {
    x: 7.05, y: 2.85, w: 5.3, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });
  slide.addText('从平行方案中筛选\n砍掉不合适的方向\n保留真正重要的表达', {
    x: 7.05, y: 3.3, w: 5.3, h: 1.0,
    fontSize: 12, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('× 价值跃迁完全依赖这一步', {
    x: 7.05, y: 4.15, w: 5.3, h: 0.4,
    fontSize: 10, fontFace: 'PingFang SC', bold: true, color: C.accent,
  });

  // 认知鸿沟三阶梯
  slide.addText('认知鸿沟三阶梯', {
    x: 0.5, y: 5.2, w: 12, h: 0.4,
    fontSize: 14, fontFace: 'PingFang SC', bold: true, color: C.title,
  });

  const steps = [
    { label: '听懂', sub: '基础理解', color: '6D7175' },
    { label: '说明白', sub: '清晰表达', color: 'F9A825' },
    { label: '让别人听懂', sub: '找到受众真正的认知入口', color: C.accent },
  ];

  steps.forEach((s, i) => {
    const sx = 0.5 + i * 4.2;
    slide.addShape(pptx.ShapeType.rect, {
      x: sx, y: 5.8, w: 3.8, h: 1.0,
      fill: { color: s.color },
      line: { color: s.color, width: 1 },
      rectRadius: 0.05,
    });
    slide.addText(s.label, {
      x: sx, y: 5.8, w: 3.8, h: 0.55,
      fontSize: 17, fontFace: 'PingFang SC', bold: true, color: C.white,
      align: 'center', valign: 'middle',
    });
    slide.addText(s.sub, {
      x: sx, y: 6.2, w: 3.8, h: 0.5,
      fontSize: 10, fontFace: 'PingFang SC', color: s.color,
      align: 'center',
    });
    if (i < steps.length - 1) {
      slide.addText('→', {
        x: sx + 3.8, y: 5.9, w: 0.4, h: 0.8,
        fontSize: 24, fontFace: 'PingFang SC', bold: true, color: C.sub,
        align: 'center', valign: 'middle',
      });
    }
  });
};
