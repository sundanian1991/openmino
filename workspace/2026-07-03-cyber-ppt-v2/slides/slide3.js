// ═══════════════════════════════════════════════════════════
//  Slide 03 — 三种突破形态
//  三栏并排，用图标+色块而非卡片区分（要极简）
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('三种数学突破的形态', {
    x: 0.5, y: 0.65, w: 12.0, h: 0.6,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('AI 只能加速其中一种', {
    x: 0.5, y: 1.2, w: 12.0, h: 0.5,
    fontSize: 28, fontFace: 'Helvetica Neue', bold: true, color: C.accent, align: 'left',
  });

  // 三栏
  const cols = [
    {
      symbol: '⚡',
      name: 'Lightning Bolt\n闪电连接',
      def: '两个已知域之间的"巧合相似性"',
      example: '例：Montgomery 的 z 函数零点公式\n在 Dyson 眼中正是\nHermitian 矩阵特征值\n的统计规律（随机矩阵理论）\n\n一顿午餐催生深远猜想',
      verdict: 'AI 天然擅长\nLLM 本来就是\n"知道所有领域的专家"',
      color: C.green,
    },
    {
      symbol: '⛰',
      name: 'Mountain Building\n造山',
      def: '必须构建一套全新的理论框架\n才能表达问题本身',
      example: '例：Lagrange → Abel → Galois\n"再看抽象一层\n不是公式本身\n是公式背后的对称性"\n\n论文被拒5次\n死后20年才被读懂',
      verdict: 'AI 需要"百年验证循环"\nRL 奖励信号\n无法穿越这个时间尺度',
      color: C.accent,
    },
    {
      symbol: '⛓',
      name: 'Raw Hustle\n蛮力',
      def: '千页级机器可读\n但人难理解的证明链',
      example: '例：费马大定理\n不存在初等证明的道路\n如果真有 short proof\n早被人类发现了\n\n"没消化的正确"\n也是一种风险',
      verdict: '结果可能正确\n但人类的"理解"过程\n可能会断裂',
      color: C.purple,
    },
  ];

  const colW = 3.95, startX = 0.5, gap = 0.25;
  const colY = 2.0, colH = 5.2;

  cols.forEach((col, i) => {
    const x = startX + i * (colW + gap);

    // 顶部色块（3px 高全宽）
    slide.addShape(pptx.ShapeType.rect, {
      x, y: colY, w: colW, h: 0.08,
      fill: { color: col.color }, line: { type: 'none' },
    });

    // 符号
    slide.addText(col.symbol, {
      x, y: colY + 0.2, w: colW, h: 0.6,
      fontSize: 32, fontFace: 'Helvetica Neue', bold: true, color: col.color,
      align: 'center',
    });

    // 名称
    slide.addText(col.name, {
      x: x + 0.15, y: colY + 0.85, w: colW - 0.3, h: 0.85,
      fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true,
      color: C.ink, align: 'left',
    });

    // 细线
    slide.addShape(pptx.ShapeType.line, {
      x: x + 0.15, y: colY + 1.75, w: 0.6, h: 0,
      line: { color: col.color, width: 1 },
    });

    // 定义
    slide.addText(col.def, {
      x: x + 0.15, y: colY + 1.9, w: colW - 0.3, h: 1.0,
      fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
      align: 'left', lineSpacingMultiple: 1.35,
    });

    // 案例
    slide.addText(col.example, {
      x: x + 0.15, y: colY + 3.0, w: colW - 0.3, h: 1.6,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.mute,
      align: 'left', lineSpacingMultiple: 1.3,
    });

    // 底部 verdict
    slide.addText(col.verdict, {
      x: x + 0.15, y: colY + colH - 0.6, w: colW - 0.3, h: 0.5,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: col.color,
      align: 'left', lineSpacingMultiple: 1.3,
    });
  });
};
