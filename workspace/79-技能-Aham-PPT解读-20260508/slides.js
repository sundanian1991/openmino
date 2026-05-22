const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Aham PPT 解读：让 Claude 生成原生可编辑的咨询级 PPT";
pres.author = "Mino";
pres.subject = "Aham PPT 文章解读";

const F = "Microsoft YaHei";
const TOTAL = 14;

// Theme 铁青暖橙 (Steel Dark, Amber)
const C = {
  darkBg: "1A1F2E", sectionBg: "222840", cream: "F0EBE1",
  white: "FFFFFF", orange: "E8952A", blue: "4E8FCC",
  teal: "3AAFB8", green: "56B87A", red: "C84C4C",
  textDark: "1A1F2E", textLight: "F0EBE1",
  muted: "8898B8", divider: "2E3850", cardBorder: "DDD8CE",
};

// ===== Helpers =====

function pageNum(s, n) {
  s.addText(n + " / " + TOTAL, {
    x: 8.7, y: 5.2, w: 1.0, h: 0.25,
    fontSize: 9, color: C.muted, fontFace: F,
    align: "right", margin: 0,
  });
}

function addTitle(s, t, y) {
  y = y || 0.35;
  s.addText(t, {
    x: 0.65, y: y, w: 8.5, h: 0.6,
    fontSize: 26, bold: true, color: C.textDark, fontFace: F,
    align: "left", margin: 0,
  });
  s.addShape(pres.ShapeType.rect, {
    x: 0.65, y: y + 0.65, w: 0.7, h: 0.05,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
}

function tline(slide) {
  slide.addShape(pres.ShapeType.line, {
    x: 0.65, y: 1.15, w: 2.5, h: 0,
    line: { color: C.orange, width: 2 },
  });
}

function badgeNum(s, num, x, y) {
  s.addShape(pres.ShapeType.roundRect, {
    x: x, y: y, w: 0.45, h: 0.35,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText(String(num).padStart(2, "0"), {
    x: x, y: y, w: 0.45, h: 0.35,
    fontSize: 11, bold: true, color: C.white, fontFace: F,
    align: "center", valign: "middle", margin: 0,
  });
}

function contentSlide() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  return s;
}

// ===== SLIDE 1: COVER =====
(function () {
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Decorative circles
  s.addShape(pres.ShapeType.ellipse, {
    x: -1.5, y: -1.2, w: 5, h: 5,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 7.5, y: 3.5, w: 3.8, h: 3.8,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });

  // Left accent strip
  s.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 1.4, w: 0.07, h: 2.2,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  s.addText("CLAUDE SKILL · 文章解读", {
    x: 1.1, y: 1.5, w: 6, h: 0.35,
    fontSize: 11, color: C.orange, fontFace: F,
    align: "left", margin: 0, charSpacing: 2,
  });
  s.addText("Aham PPT", {
    x: 1.1, y: 1.9, w: 8.5, h: 1,
    fontSize: 60, bold: true, color: C.textLight, fontFace: F,
    align: "left", margin: 0,
  });
  s.addText("让 AI 生成原生可编辑的咨询级 PPT", {
    x: 1.1, y: 2.85, w: 8.5, h: 0.6,
    fontSize: 26, color: C.orange, fontFace: F,
    align: "left", margin: 0,
  });
  s.addShape(pres.ShapeType.line, {
    x: 1.1, y: 3.7, w: 2.2, h: 0,
    line: { color: C.divider, width: 1 },
  });
  s.addText("基于 Aham日记 公众号文章 · 2026-05-08", {
    x: 1.1, y: 3.9, w: 7, h: 0.3,
    fontSize: 10, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  s.addText("Mino 解读", {
    x: 1.1, y: 4.25, w: 4, h: 0.3,
    fontSize: 12, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  pageNum(s, 1);
})();

// ===== SLIDE 2: VALUE PROPOSITION =====
(function () {
  const s = contentSlide();
  addTitle(s, "「让知识工作者不再熬夜，早点回家」");

  s.addText("一句话价值主张 · 3 个核心数字速览", {
    x: 0.65, y: 1.05, w: 8.7, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  tline(s);

  const stats = [
    { num: "3", label: "个错误权衡", desc: "现有 AI PPT 工具在 3 个关键点上做了错误选择", color: C.red },
    { num: "8", label: "阶段方法论", desc: "从规范加载到质检交付的完整流水线", color: C.blue },
    { num: "1", label: "套规范硬约束", desc: "QC 清单逐项扫描，不合规自动修正", color: C.teal },
  ];
  stats.forEach((st, i) => {
    const cx = 0.65 + i * 3.1;
    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: 1.6, w: 2.85, h: 2.8,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 8, offset: 1, angle: 135, opacity: 0.06 },
    });
    // Top accent strip
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: 1.6, w: 2.85, h: 0.05,
      fill: { color: st.color }, line: { color: st.color, width: 0 },
    });
    s.addText(st.num, {
      x: cx, y: 1.9, w: 2.85, h: 0.8,
      fontSize: 48, bold: true, color: st.color, fontFace: F,
      align: "center", margin: 0,
    });
    s.addText(st.label, {
      x: cx + 0.2, y: 2.7, w: 2.45, h: 0.35,
      fontSize: 15, bold: true, color: C.textDark, fontFace: F,
      align: "center", margin: 0,
    });
    s.addText(st.desc, {
      x: cx + 0.2, y: 3.05, w: 2.45, h: 0.9,
      fontSize: 11, color: C.muted, fontFace: F,
      align: "center", valign: "top", margin: 0,
    });
  });

  s.addText("来源: Aham日记公众号文章 · 2026-05-08", {
    x: 0.65, y: 4.65, w: 5, h: 0.25,
    fontSize: 9, italic: true, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  pageNum(s, 2);
})();

// ===== SLIDE 3: 10 SLIDE VARIETIES =====
(function () {
  const s = contentSlide();
  addTitle(s, "10 种版式 · 同一套视觉语言");
  s.addText("每一页结构、版式都不同，但视觉语言高度一致", {
    x: 0.65, y: 1.05, w: 8.7, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  tline(s);

  const types = [
    ["封面", "Hero + Action Title + 元信息四列"],
    ["诊断", "高密度数据表 + 关键行高亮"],
    ["流程差异", "传统流程 vs Aham 八阶段"],
    ["路线图", "时间轴 + 里程碑 + 风险分级"],
    ["区域部署", "抽象地图 + 精细数据表"],
    ["财务测算", "三年 ROI + 待替换占位符"],
    ["建议结论", "三卡并列 + 四要素推荐"],
    ["技术架构", "四层分层 + 22 个组件"],
    ["端到端流程", "三泳道 + 决策菱形 + 回退"],
    ["产品路线图", "6 工作流 × 13 个月 × 13 里程碑"],
  ];
  const colors = [C.orange, C.blue, C.teal, C.green, C.orange, C.blue, C.teal, C.green, C.orange, C.blue];

  types.forEach((t, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const cx = 0.65 + col * 1.82;
    const cy = 1.5 + row * 1.75;

    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: cy, w: 1.67, h: 1.55,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 },
      shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.04 },
    });
    // Number circle
    s.addShape(pres.ShapeType.ellipse, {
      x: cx + 0.15, y: cy + 0.15, w: 0.4, h: 0.4,
      fill: { color: colors[i] }, line: { color: colors[i], width: 0 },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: cx + 0.15, y: cy + 0.15, w: 0.4, h: 0.4,
      fontSize: 11, bold: true, color: C.white, fontFace: F,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(t[0], {
      x: cx + 0.15, y: cy + 0.65, w: 1.37, h: 0.3,
      fontSize: 12, bold: true, color: C.textDark, fontFace: F,
      align: "left", margin: 0,
    });
    s.addText(t[1], {
      x: cx + 0.15, y: cy + 0.95, w: 1.37, h: 0.5,
      fontSize: 9, color: C.muted, fontFace: F,
      align: "left", valign: "top", margin: 0,
    });
  });

  pageNum(s, 3);
})();

// ===== SLIDE 4: SECTION DIVIDER - PART 1 =====
(function () {
  const slide = pres.addSlide();
  slide.background = { color: C.sectionBg };
  slide.addShape(pres.ShapeType.ellipse, {
    x: 6.5, y: -1.5, w: 5.0, h: 5.0,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });
  slide.addText("01", {
    x: -0.3, y: -0.6, w: 5.5, h: 4.5,
    fontSize: 280, bold: true, color: C.divider, fontFace: F,
    align: "left", margin: 0,
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0.9, y: 3.38, w: 1.5, h: 0.07,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  slide.addText("现有 AI PPT 工具的\n三大错误权衡", {
    x: 0.9, y: 3.5, w: 8.0, h: 0.85,
    fontSize: 42, bold: true, color: C.textLight, fontFace: F,
    align: "left", margin: 0,
  });
  slide.addText("市场上大部分产品在三个关键点上做了错误的权衡", {
    x: 0.9, y: 4.35, w: 8.5, h: 0.55,
    fontSize: 14, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  pageNum(slide, 4);
})();

// ===== SLIDE 5-7: THREE PROBLEMS =====
const problems = [
  {
    badge: "01",
    title: "图片导出，不可编辑",
    quote: "「生成的 PPT 打开后，每一页都是一张图片」",
    points: [
      "改个数字？只能把整张图替换掉",
      "调个布局？拆不开",
      "这是「演示」级 PPT，不是「交付」级 PPT",
    ],
    consequence: "展示可以，协作不行。任何修改都意味着重新生成整页。",
  },
  {
    badge: "02",
    title: "一键生成，改比重做累",
    quote: "「一键出来的东西，改起来比重写还累」",
    points: [
      "AI 没想明白，你就得替它擦屁股",
      "一口气做完 30 页，然后让你调整",
      "方向错了，30 页都要推倒",
    ],
    consequence: "看似省了开头的时间，但修改时间远超手动做一遍。",
  },
  {
    badge: "03",
    title: "AI 自由发挥，没有品牌底线",
    quote: "「AI 用它的审美给你一堆渐变、emoji、饼图、投影」",
    points: [
      "这些在咨询公司交付语境里都是「禁用」的",
      "每一页风格各异，整体缺乏统一性",
      "视觉自由 = 品牌失控",
    ],
    consequence: "做出来的 PPT 不像一个团队做的，更不像你们公司的。",
  },
];

problems.forEach((prob, i) => {
  const s = contentSlide();
  const slideIdx = 5 + i;

  badgeNum(s, prob.badge, 8.5, 0.35);
  addTitle(s, "权衡 " + prob.badge + "：「" + prob.title + "」");

  // Problem statement with left red accent bar
  s.addShape(pres.ShapeType.rect, {
    x: 0.65, y: 1.35, w: 0.07, h: 0.55,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText(prob.quote, {
    x: 0.9, y: 1.35, w: 8.0, h: 0.55,
    fontSize: 19, bold: true, color: C.textDark, fontFace: F,
    align: "left", valign: "middle", margin: 0,
  });

  // Bullet points with decorative dots
  prob.points.forEach((pt, j) => {
    const py = 2.15 + j * 0.55;
    s.addShape(pres.ShapeType.ellipse, {
      x: 0.75, y: py + 0.12, w: 0.1, h: 0.1,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(pt, {
      x: 1.05, y: py, w: 7.8, h: 0.35,
      fontSize: 13, color: C.textDark, fontFace: F,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // Consequence callout box
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.65, y: 3.9, w: 8.7, h: 0.7,
    fill: { color: "F5E6D0" }, line: { color: C.orange, width: 1 },
  });
  s.addText("后果：", {
    x: 0.85, y: 3.95, w: 0.9, h: 0.3,
    fontSize: 11, bold: true, color: C.orange, fontFace: F,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText(prob.consequence, {
    x: 1.65, y: 3.95, w: 7.5, h: 0.6,
    fontSize: 11, color: C.textDark, fontFace: F,
    align: "left", valign: "middle", margin: 0,
  });

  pageNum(s, slideIdx);
});

// ===== SLIDE 8: SECTION DIVIDER - PART 2 =====
(function () {
  const slide = pres.addSlide();
  slide.background = { color: C.sectionBg };
  slide.addShape(pres.ShapeType.ellipse, {
    x: 6.5, y: -1.5, w: 5.0, h: 5.0,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 },
  });
  slide.addText("02", {
    x: -0.3, y: -0.6, w: 5.5, h: 4.5,
    fontSize: 280, bold: true, color: C.divider, fontFace: F,
    align: "left", margin: 0,
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0.9, y: 3.38, w: 1.5, h: 0.07,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  slide.addText("Aham PPT 的三个\n反向抉择", {
    x: 0.9, y: 3.5, w: 8.0, h: 0.85,
    fontSize: 42, bold: true, color: C.textLight, fontFace: F,
    align: "left", margin: 0,
  });
  slide.addText("在每个关键点上，走了完全相反的路", {
    x: 0.9, y: 4.35, w: 8.5, h: 0.55,
    fontSize: 14, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  pageNum(slide, 8);
})();

// ===== SLIDE 9-11: THREE SOLUTIONS =====
const solutions = [
  {
    badge: "01",
    title: "原生可编辑",
    quote: "「每个形状都是原生的 shape，每段文字都是 textbox」",
    tech: "技术路径：每一页渲染为标准 SVG → 转换器将每个元素映射为 PPT 原生 DrawingML 对象",
    benefits: [
      "双击文字就能改",
      "右键形状就能换色",
      "选中对象就能挪位置",
      "整页复制到别人 PPT 里编辑",
    ],
  },
  {
    badge: "02",
    title: "八阶段方法论",
    quote: "「Ghost Deck 先行，样稿确认，再精修」",
    tech: "关键差异：第 6 阶段「样稿确认」——先做 3-5 页对齐方向，再展开剩余 25 页",
    benefits: [
      "传统 AI：一口气做 30 页 → 方向错了全推倒",
      "Aham：确认样稿再展开 → 避免方向性返工",
      "过程中顾问只需做 3 次关键决策",
      "其余 8 个步骤系统自动完成",
    ],
    footnote: "引自麦肯锡顶级合伙人的 PPT 方法论",
  },
  {
    badge: "03",
    title: "规范作为硬约束",
    quote: "「规范不是建议，是 AI 执行中反复检查的硬约束」",
    tech: "QC 清单逐项扫描，不合规的自动修正",
    columns: {
      left: {
        title: "绝对禁用",
        color: C.red,
        items: [
          "渐变 · 3D · 投影",
          "纯黑 #000",
          "第二装饰彩色",
          "饼图 · 独立图例",
          "emoji",
          "禁用词：赋能、颠覆、生态、闭环",
        ],
      },
      right: {
        title: "强制规则",
        color: C.green,
        items: [
          "状态 = 颜色 + 符号双通道",
          "所有数字用等宽字体",
          "标题层级用字重区分",
          "每页一个核心结论",
          "表格优于文字堆砌",
          "所有数字标注来源和时间",
        ],
      },
    },
  },
];

solutions.forEach((sol, i) => {
  const s = contentSlide();
  const slideIdx = 9 + i;

  badgeNum(s, sol.badge, 8.5, 0.35);
  addTitle(s, "抉择 " + sol.badge + "：" + sol.title);

  // Quote
  s.addShape(pres.ShapeType.rect, {
    x: 0.65, y: 1.28, w: 0.07, h: 0.5,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText(sol.quote, {
    x: 0.9, y: 1.28, w: 8.2, h: 0.5,
    fontSize: 18, bold: true, color: C.textDark, fontFace: F,
    align: "left", valign: "middle", margin: 0,
  });

  if (sol.columns) {
    // Two-column layout for solution 3
    [sol.columns.left, sol.columns.right].forEach((col, ci) => {
      const cx = 0.65 + ci * 4.45;
      s.addShape(pres.ShapeType.roundRect, {
        x: cx, y: 1.95, w: 4.2, h: 2.65,
        fill: { color: C.white }, line: { color: col.color, width: 1.5 },
        shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.05 },
      });
      s.addShape(pres.ShapeType.rect, {
        x: cx, y: 1.95, w: 4.2, h: 0.04,
        fill: { color: col.color }, line: { color: col.color, width: 0 },
      });
      s.addText(col.title, {
        x: cx + 0.2, y: 2.15, w: 3.8, h: 0.35,
        fontSize: 14, bold: true, color: col.color, fontFace: F,
        align: "left", margin: 0,
      });
      col.items.forEach((item, j) => {
        s.addText("•  " + item, {
          x: cx + 0.2, y: 2.55 + j * 0.32, w: 3.8, h: 0.28,
          fontSize: 11, color: C.textDark, fontFace: F,
          align: "left", margin: 0,
        });
      });
    });

    // Bottom principle line
    s.addText("效果：10 张图看起来像「一个人做的」——规范把 AI 的「审美自由」关进了笼子里", {
      x: 0.65, y: 4.75, w: 8.7, h: 0.3,
      fontSize: 11, italic: true, color: C.muted, fontFace: F,
      align: "left", margin: 0,
    });
  } else {
    // Tech highlight card
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.65, y: 1.95, w: 8.7, h: 0.65,
      fill: { color: "EDE8DD" }, line: { color: "D8D0C0", width: 0.5 },
    });
    s.addText("  " + sol.tech, {
      x: 0.85, y: 2.0, w: 8.3, h: 0.55,
      fontSize: 12, color: C.textDark, fontFace: F,
      align: "left", valign: "middle", margin: 0,
    });

    // Benefits
    sol.benefits.forEach((ben, j) => {
      const by = (i === 0 ? 2.9 : 2.85) + j * 0.5;
      s.addShape(pres.ShapeType.ellipse, {
        x: 0.75, y: by + 0.12, w: 0.1, h: 0.1,
        fill: { color: C.orange }, line: { color: C.orange, width: 0 },
      });
      s.addText(ben, {
        x: 1.05, y: by, w: 8.0, h: 0.35,
        fontSize: 13, color: C.textDark, fontFace: F,
        align: "left", valign: "middle", margin: 0,
      });
    });

    if (sol.footnote) {
      s.addText(sol.footnote, {
        x: 0.65, y: 4.8, w: 8.7, h: 0.3,
        fontSize: 10, italic: true, color: C.muted, fontFace: F,
        align: "left", margin: 0,
      });
    }
  }

  pageNum(s, slideIdx);
});

// ===== SLIDE 12: 8-STAGE PROCESS FLOW =====
(function () {
  const s = contentSlide();
  addTitle(s, "八阶段全流程");
  s.addText("传统 AI 工具「一口气做完让你改」vs Aham「先确认样稿再展开」", {
    x: 0.65, y: 1.05, w: 8.7, h: 0.35,
    fontSize: 12, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  tline(s);

  // Horizontal timeline — two rows of 4
  const stages = [
    { name: "规范加载", phase: "准备" },
    { name: "材料解析", phase: "分析" },
    { name: "论点提炼", phase: "策略" },
    { name: "叙事骨架", phase: "规划" },
    { name: "版式规划", phase: "执行" },
    { name: "样稿确认", phase: "确认" },
    { name: "逐页设计", phase: "输出" },
    { name: "质检交付", phase: "验收" },
  ];

  const boxW = 1.9, boxH = 0.65, gap = 0.3;
  const row1Y = 1.55, row2Y = 2.85;
  const totalW = 4 * boxW + 3 * gap;
  const startX = (10 - totalW) / 2;

  // Row 1: stages 0-3
  for (let i = 0; i < 4; i++) {
    const bx = startX + i * (boxW + gap);
    if (i > 0) {
      s.addShape(pres.ShapeType.line, {
        x: startX + i * (boxW + gap) - gap, y: row1Y + boxH / 2,
        w: gap, h: 0,
        line: { color: C.cardBorder, width: 1.5 },
      });
      // Simple arrow
      s.addShape(pres.ShapeType.line, {
        x: startX + i * (boxW + gap) - 0.15, y: row1Y + boxH / 2 - 0.1,
        w: 0, h: 0.2,
        line: { color: C.cardBorder, width: 1.5 },
      });
    }
    const hi = i === 3;
    s.addShape(pres.ShapeType.roundRect, {
      x: bx, y: row1Y, w: boxW, h: boxH,
      fill: { color: hi ? C.orange : C.white },
      line: { color: hi ? C.orange : C.cardBorder, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.04 },
    });
    s.addText(stages[i].name, {
      x: bx, y: row1Y, w: boxW, h: boxH,
      fontSize: 13, bold: hi, color: hi ? C.white : C.textDark, fontFace: F,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("阶段 " + (i + 1), {
      x: bx, y: row1Y + boxH + 0.05, w: boxW, h: 0.2,
      fontSize: 9, color: C.muted, fontFace: F,
      align: "center", margin: 0,
    });
  }

  // Vertical connector
  s.addText("▾", {
    x: startX + 3.5 * (boxW + gap) - 0.1, y: row1Y + boxH + 0.25,
    w: 0.3, h: 0.3,
    fontSize: 16, color: C.muted, fontFace: F,
    align: "center", valign: "middle", margin: 0,
  });

  // Row 2: stages 4-7
  for (let i = 0; i < 4; i++) {
    const bx = startX + i * (boxW + gap);
    if (i > 0) {
      s.addShape(pres.ShapeType.line, {
        x: startX + i * (boxW + gap) - gap, y: row2Y + boxH / 2,
        w: gap, h: 0,
        line: { color: C.cardBorder, width: 1.5 },
      });
      s.addShape(pres.ShapeType.line, {
        x: startX + i * (boxW + gap) - 0.15, y: row2Y + boxH / 2 - 0.1,
        w: 0, h: 0.2,
        line: { color: C.cardBorder, width: 1.5 },
      });
    }
    const idx = i + 4;
    const hi = idx === 5; // stage 6 — 样稿确认
    s.addShape(pres.ShapeType.roundRect, {
      x: bx, y: row2Y, w: boxW, h: boxH,
      fill: { color: hi ? C.orange : C.white },
      line: { color: hi ? C.orange : C.cardBorder, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.04 },
    });
    s.addText(stages[idx].name, {
      x: bx, y: row2Y, w: boxW, h: boxH,
      fontSize: 13, bold: hi, color: hi ? C.white : C.textDark, fontFace: F,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("阶段 " + (idx + 1), {
      x: bx, y: row2Y + boxH + 0.05, w: boxW, h: 0.2,
      fontSize: 9, color: C.muted, fontFace: F,
      align: "center", margin: 0,
    });
  }

  // Highlight callout
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.65, y: 3.95, w: 8.7, h: 0.9,
    fill: { color: C.white }, line: { color: C.orange, width: 1.5 },
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.05 },
  });
  // amber accent dot
  s.addShape(pres.ShapeType.ellipse, {
    x: 0.85, y: 4.1, w: 0.12, h: 0.12,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("关键差异点", {
    x: 1.1, y: 4.0, w: 2.5, h: 0.3,
    fontSize: 12, bold: true, color: C.orange, fontFace: F,
    align: "left", margin: 0,
  });
  s.addText("先做 3-5 页样稿对齐方向，再展开剩余页。整份 deck 过程中顾问只需做 3 次关键决策。", {
    x: 1.1, y: 4.3, w: 8.0, h: 0.4,
    fontSize: 11, color: C.textDark, fontFace: F,
    align: "left", margin: 0,
  });

  pageNum(s, 12);
})();

// ===== SLIDE 13: NO FABRICATED DATA =====
(function () {
  const s = contentSlide();
  addTitle(s, "不是 bug，是设计");

  s.addText("Aham 不会编数据 — 无来源的数字留 [待替换] 占位符", {
    x: 0.65, y: 1.05, w: 8.7, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  tline(s);

  // Quote card
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.65, y: 1.6, w: 8.7, h: 1.8,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 1, angle: 135, opacity: 0.05 },
  });

  // Large decorative opening quote mark (using escaped unicode)
  s.addText("“", {
    x: 0.75, y: 1.55, w: 0.6, h: 0.5,
    fontSize: 48, bold: true, color: C.orange, fontFace: F,
    align: "left", margin: 0,
  });

  s.addText([
    { text: "「每一个百分比、每一笔金额、每一条时间节点，", options: { fontSize: 16, color: C.textDark } },
    { text: "\n", options: {} },
    { text: "都应该能追溯到一个具体的、可查证的来源。」", options: { fontSize: 16, color: C.orange, bold: true } },
  ], {
    x: 1.2, y: 1.75, w: 7.8, h: 1.0,
    fontFace: F, align: "left", valign: "middle", margin: 0,
  });

  s.addText("— 咨询公司基本职业伦理", {
    x: 1.2, y: 2.7, w: 5, h: 0.35,
    fontSize: 12, italic: true, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });

  // Two info cards side by side
  const cards = [
    { title: "AI 替你编数据，不是在帮你，是在坑你", color: C.red, items: ["看起来合理的数字 → 可能是错的", "拿错的数字做决策 → 后果严重", "信任一旦打破 → 很难重建"] },
    { title: "Aham 的做法", color: C.green, items: ["源材料没有 → 留 [待替换] 占位符", "页面注明「需 XX 数据方提供」", "每个数字标注来源和时间节点"] },
  ];
  cards.forEach((card, i) => {
    const cx = 0.65 + i * 4.45;
    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: 3.65, w: 4.2, h: 1.35,
      fill: { color: C.white }, line: { color: card.color, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.04 },
    });
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: 3.65, w: 4.2, h: 0.04,
      fill: { color: card.color }, line: { color: card.color, width: 0 },
    });
    s.addText(card.title, {
      x: cx + 0.2, y: 3.8, w: 3.8, h: 0.3,
      fontSize: 12, bold: true, color: card.color, fontFace: F,
      align: "left", margin: 0,
    });
    card.items.forEach((item, j) => {
      s.addText("•  " + item, {
        x: cx + 0.2, y: 4.15 + j * 0.25, w: 3.8, h: 0.22,
        fontSize: 10, color: C.textDark, fontFace: F,
        align: "left", margin: 0,
      });
    });
  });

  pageNum(s, 13);
})();

// ===== SLIDE 14: THREE USAGE MODES + CLOSING =====
(function () {
  const s = contentSlide();
  addTitle(s, "三种使用姿势 · 同一质量底线");

  s.addText("根据素材深度自动调整执行深度，输出都是同一套方法论兜底", {
    x: 0.65, y: 1.05, w: 8.7, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
  tline(s);

  const modes = [
    {
      icon: "01",
      title: "全流程",
      desc: "完整八阶段",
      items: ["输入素材（报告/纪要/PDF）", "1-2 小时产出 30 页 deck", "主动问你 2-4 个关键问题"],
    },
    {
      icon: "02",
      title: "半程入场",
      desc: "从提纲开始",
      items: ["已有草稿提纲", "跳过素材解析阶段", "从论点提炼直接开始"],
    },
    {
      icon: "03",
      title: "轻量启动",
      desc: "一句话需求",
      items: ["「做个 Q3 业绩汇报，5 页」", "从结构规划开始", "同一条质量底线输出"],
    },
  ];

  modes.forEach((mode, i) => {
    const cx = 0.65 + i * 3.1;

    // Card
    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: 1.55, w: 2.85, h: 3.15,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 8, offset: 1, angle: 135, opacity: 0.06 },
    });

    // Top accent
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: 1.55, w: 2.85, h: 0.05,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    });

    // Numbered badge centered
    s.addShape(pres.ShapeType.ellipse, {
      x: cx + 1.0, y: 1.8, w: 0.85, h: 0.85,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    });
    s.addText(mode.icon, {
      x: cx + 1.0, y: 1.8, w: 0.85, h: 0.85,
      fontSize: 20, bold: true, color: C.white, fontFace: F,
      align: "center", valign: "middle", margin: 0,
    });

    // Title
    s.addText(mode.title, {
      x: cx + 0.2, y: 2.85, w: 2.45, h: 0.35,
      fontSize: 16, bold: true, color: C.textDark, fontFace: F,
      align: "center", margin: 0,
    });
    s.addText(mode.desc, {
      x: cx + 0.2, y: 3.15, w: 2.45, h: 0.25,
      fontSize: 11, color: C.muted, fontFace: F,
      align: "center", margin: 0,
    });

    // Items
    mode.items.forEach((item, j) => {
      s.addShape(pres.ShapeType.ellipse, {
        x: cx + 0.25, y: 3.6 + j * 0.3 + 0.08, w: 0.07, h: 0.07,
        fill: { color: C.muted }, line: { color: C.muted, width: 0 },
      });
      s.addText(item, {
        x: cx + 0.45, y: 3.6 + j * 0.3, w: 2.2, h: 0.25,
        fontSize: 10, color: C.textDark, fontFace: F,
        align: "left", valign: "middle", margin: 0,
      });
    });
  });

  // Bottom line
  s.addText("不管从哪里进入，输出都是同一套方法论兜底。执行深度随输入深度自动调整。", {
    x: 0.65, y: 4.85, w: 8.7, h: 0.3,
    fontSize: 11, italic: true, color: C.muted, fontFace: F,
    align: "center", margin: 0,
  });

  pageNum(s, 14);
})();

// ===== OUTPUT =====
const OUTPUT = __dirname + "/aham-ppt-deck.pptx";
pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log("Done:", OUTPUT))
  .catch(err => { console.error("Error:", err); process.exit(1); });
