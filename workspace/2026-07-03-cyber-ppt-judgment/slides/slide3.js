// Slide 3 — 三种突破形态，AI 只能加速其中一种 — FIXED
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('三种数学突破的形态', {
    x: 0.5, y: 0.3, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('AI 只能加速其中一种', {
    x: 0.5, y: 0.95, w: 12, h: 0.5,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'left',
  });

  const items = [
    {
      title: '闪电连接 Lightning Bolt',
      desc: '两个已知域之间的"巧合相似性"\n\n例：Montgomery 的 z 函数零点公式\n在 Dyson 眼中正是 Hermitian 矩阵\n特征值的统计规律\n\n一顿午餐催生深远猜想',
      aiFit: 'AI 天然擅长\nLLM 本来就是"知道所有领域的专家"',
      bg: 'FFF8E1', line: 'F9A825',
    },
    {
      title: '造山 Mountain Building',
      desc: '必须构建一套全新的理论框架\n\n例：Lagrange -> Abel -> Galois\n"再看抽象一层——不是公式本身\n是公式背后的对称性"\n\n论文被拒5次，死后20年才被读懂',
      aiFit: 'AI 需要"百年验证循环"\nRL 奖励信号无法穿越这个时间尺度',
      bg: 'FFEBEE', line: C.accent,
    },
    {
      title: '蛮力推导 Raw Hustle',
      desc: '千页级、机器可读\n但人难以理解的证明链\n\n例：费马大定理\n不存在初等证明的道路\n\n"没消化的正确"也是一种风险',
      aiFit: '结果对\n但人类的"理解"过程可能断裂',
      bg: 'F3E5F5', line: '7B1FA2',
    },
  ];

  const cardW = 3.95, startX = 0.5, gap = 0.22;
  const cardY = 1.8, cardH = 5.2;

  items.forEach((item, i) => {
    const x = startX + i * (cardW + gap);
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: item.bg, transparency: 60 },
      line: { color: item.line, width: 1.2 },
      rectRadius: 0.08,
    });
    slide.addText(item.title, {
      x: x + 0.2, y: cardY + 0.2, w: cardW - 0.4, h: 0.6,
      fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.title,
      align: 'left',
    });
    slide.addText(item.desc, {
      x: x + 0.2, y: cardY + 0.85, w: cardW - 0.4, h: 2.7,
      fontSize: 10.5, fontFace: 'PingFang SC', color: C.body,
      align: 'left', lineSpacingMultiple: 1.25,
    });
    slide.addText(item.aiFit, {
      x: x + 0.15, y: cardY + cardH - 1.0, w: cardW - 0.3, h: 0.8,
      fontSize: 10, fontFace: 'PingFang SC', bold: true, color: item.line,
      align: 'left', lineSpacingMultiple: 1.3,
    });
  });
};
