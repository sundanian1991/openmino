const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();

// 设置页面尺寸 16:9
pptx.defineLayout({ name: "CYBER_16x9", width: 13.333, height: 7.5 });
pptx.layout = "CYBER_16x9";

// 颜色系统 - 风格4：象牙白 + 深蓝强调
const COLORS = {
  background: "F7F6F0",
  title: "101820",
  body: "303030",
  secondary: "6F7275",
  line: "C9CDD1",
  accent: "12355B",
  white: "FFFFFF",
  cardBg: "FFFFFF",
};

// ==================== 第1页：封面 ====================
function addSlide1() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 顶部装饰线
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0.3, w: 13.333, h: 0.02,
    fill: { color: COLORS.accent }
  });
  
  // 主标题
  slide.addText("引领AI团队", {
    x: 1.5, y: 2.0, w: 10.333, h: 0.8,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true, align: "center"
  });
  
  // 副标题
  slide.addText("长任务协作的五大习惯", {
    x: 1.5, y: 2.8, w: 10.333, h: 0.6,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: COLORS.accent, align: "center"
  });
  
  // 分隔线
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.5, y: 3.6, w: 4.333, h: 0.01,
    fill: { color: COLORS.accent }
  });
  
  // 作者信息
  slide.addText("基于 Gabriel Chua 协作方法论", {
    x: 1.5, y: 3.8, w: 10.333, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "center"
  });
  
  slide.addText("OpenAI Codex DX Engineer", {
    x: 1.5, y: 4.2, w: 10.333, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "center"
  });
  
  // 底部装饰线
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.0, w: 13.333, h: 0.01,
    fill: { color: COLORS.line }
  });
  
  // 页码
  slide.addText("1", {
    x: 12.5, y: 7.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
}

// ==================== 第2页：问题框定 ====================
function addSlide2() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("2", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 页面标题
  slide.addText("AI编码工具已能连续运行数天\n但目标漂移仍是核心难点", {
    x: 0.5, y: 0.8, w: 12.333, h: 0.9,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true, lineSpacingMultiple: 1.2
  });
  
  // 左卡片 - 能力
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 2.0, w: 5.8, h: 2.8,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("能力已具备", {
    x: 0.8, y: 2.2, w: 5.2, h: 0.4,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  slide.addText("▪ 连续运行数小时至数天\n▪ 长任务执行能力已落地\n▪ 支持持续发现新信息", {
    x: 0.8, y: 2.7, w: 5.2, h: 1.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.5
  });
  
  // 右卡片 - 痛点
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.0, y: 2.0, w: 5.8, h: 2.8,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("核心挑战", {
    x: 7.3, y: 2.2, w: 5.2, h: 0.4,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  slide.addText("▪ 多日迭代中频繁偏离目标\n▪ 缺乏系统性协作方法论\n▪ 从\"启动AI\"到\"管理AI\"的转型", {
    x: 7.3, y: 2.7, w: 5.2, h: 1.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.5
  });
  
  // 数字高亮条
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 5.2, w: 12.333, h: 1.2,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("89万", {
    x: 0.8, y: 5.3, w: 2.5, h: 1.0,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: COLORS.white, bold: true, valign: "middle"
  });
  slide.addText("Gabriel Chua 文章全网浏览量，验证方法论行业需求", {
    x: 3.3, y: 5.3, w: 9.333, h: 1.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
  
  // 来源说明
  slide.addText("来源: 《Collaborating with Codex on Long-Running Tasks》", {
    x: 0.5, y: 6.8, w: 12.333, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
}

// ==================== 第3页：适用场景 ====================
function addSlide3() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("3", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 页面标题
  slide.addText("这套方法适用于复杂项目", {
    x: 0.5, y: 0.8, w: 12.333, h: 0.7,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 三卡片
  const cards = [
    { title: "持续涌现新信息", desc: "项目推进中不断有新发现，需要调整方向" },
    { title: "多块并行工作", desc: "涉及多个独立模块，可并行推进" },
    { title: "多环境验证", desc: "需要从不同环境获取验证证据" }
  ];
  
  cards.forEach((card, i) => {
    const x = 0.5 + i * 4.1;
    
    // 卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: x, y: 1.8, w: 3.8, h: 3.2,
      fill: { color: COLORS.cardBg },
      rectRadius: 0.1,
      line: { color: COLORS.line, width: 1 }
    });
    
    // 图标区域（简化为圆形）
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 1.4, y: 2.1, w: 1.0, h: 1.0,
      fill: { color: COLORS.accent }
    });
    slide.addText(["◆", "◇", "●"][i], {
      x: x + 1.4, y: 2.1, w: 1.0, h: 1.0,
      fontSize: 28, fontFace: "Arial",
      color: COLORS.white, align: "center", valign: "middle"
    });
    
    // 卡片标题
    slide.addText(card.title, {
      x: x + 0.3, y: 3.3, w: 3.2, h: 0.4,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: COLORS.accent, bold: true, align: "center"
    });
    
    // 卡片描述
    slide.addText(card.desc, {
      x: x + 0.3, y: 3.8, w: 3.2, h: 0.8,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: COLORS.body, align: "center", lineSpacingMultiple: 1.3
    });
  });
  
  // 注意事项框
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 5.3, w: 12.333, h: 0.8,
    fill: { color: "F4F1EA" },
    rectRadius: 0.05
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 5.3, w: 0.05, h: 0.8,
    fill: { color: COLORS.accent }
  });
  slide.addText("⚠ 不适用于：简单、一次性的编码任务", {
    x: 0.8, y: 5.3, w: 11.833, h: 0.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, valign: "middle"
  });
}

// ==================== 第4页：三锚点框架 ====================
function addSlide4() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("4", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 页面标题
  slide.addText("三锚点闭环", {
    x: 0.5, y: 0.8, w: 12.333, h: 0.7,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true, align: "center"
  });
  
  // 顶部节点 - 目标锚定
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.666, y: 1.8, w: 4.0, h: 1.2,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("目标锚定", {
    x: 4.666, y: 1.8, w: 4.0, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.white, bold: true, align: "center", valign: "middle"
  });
  slide.addText("持久Goal + GOALS.md", {
    x: 4.666, y: 2.4, w: 4.0, h: 0.6,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle"
  });
  
  // 连接线
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.616, y: 3.0, w: 0.1, h: 0.8,
    fill: { color: COLORS.accent }
  });
  
  // 左下节点 - 证据验收
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 3.8, w: 4.5, h: 1.4,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("证据验收", {
    x: 1.5, y: 3.8, w: 4.5, h: 0.7,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.white, bold: true, align: "center", valign: "middle"
  });
  slide.addText("完成所需证据 + 里程碑审计", {
    x: 1.5, y: 4.5, w: 4.5, h: 0.7,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle"
  });
  
  // 右下节点 - 状态外置
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.333, y: 3.8, w: 4.5, h: 1.4,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("状态外置", {
    x: 7.333, y: 3.8, w: 4.5, h: 0.7,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.white, bold: true, align: "center", valign: "middle"
  });
  slide.addText("简报 + 仪表盘", {
    x: 7.333, y: 4.5, w: 4.5, h: 0.7,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle"
  });
  
  // 底部说明框
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 5.8, w: 12.333, h: 0.8,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("闭环逻辑：目标锚定 → 委派执行 → 证据验收 → 状态外置 → 循环", {
    x: 0.5, y: 5.8, w: 12.333, h: 0.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle"
  });
}

// ==================== 第5页：习惯一 ====================
function addSlide5() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("5", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 习惯编号
  slide.addText("习惯一", {
    x: 0.5, y: 0.7, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  // 页面标题
  slide.addText("让AI自主规划并维护路线图", {
    x: 0.5, y: 1.0, w: 12.333, h: 0.6,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 左侧流程图
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 7.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  const steps = [
    "① 对话口述需求",
    "② 引导AI持续提问",
    "③ 生成初版计划",
    "④ 设定持久Goal",
    "⑤ 写入GOALS.md",
    "⑥ 随项目推进动态更新"
  ];
  
  steps.forEach((step, i) => {
    const y = 2.0 + i * 0.6;
    
    // 步骤框
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.0, y: y, w: 6.0, h: 0.45,
      fill: { color: i === 5 ? COLORS.accent : COLORS.background },
      rectRadius: 0.05,
      line: { color: COLORS.line, width: 0.5 }
    });
    
    slide.addText(step, {
      x: 1.2, y: y, w: 5.6, h: 0.45,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: i === 5 ? COLORS.white : COLORS.body,
      valign: "middle"
    });
    
    // 箭头（非最后一个）
    if (i < 5) {
      slide.addText("↓", {
        x: 3.8, y: y + 0.4, w: 0.5, h: 0.25,
        fontSize: 12, fontFace: "Arial",
        color: COLORS.accent, align: "center"
      });
    }
  });
  
  // 右侧关键机制
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.8, y: 1.8, w: 5.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("关键机制", {
    x: 8.1, y: 2.0, w: 4.4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("▪ GOALS.md 动态更新\n▪ 按里程碑组织内容\n▪ 同一时刻仅一个活跃Goal\n▪ 记录目标产出\n▪ 记录当前工作范围\n▪ 记录重要决策\n▪ 记录已知阻塞\n▪ 记录完成所需证据", {
    x: 8.1, y: 2.5, w: 4.4, h: 3.2,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.4
  });
  
  // SO WHAT
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 6.2, w: 12.333, h: 0.6,
    fill: { color: COLORS.accent },
    rectRadius: 0.05
  });
  slide.addText("SO WHAT：早期需求高度灵活，无需提前撰写正式规格文档", {
    x: 0.7, y: 6.2, w: 11.933, h: 0.6,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
}

// ==================== 第6页：习惯二 ====================
function addSlide6() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("6", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 习惯编号
  slide.addText("习惯二", {
    x: 0.5, y: 0.7, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  // 页面标题
  slide.addText("主线程仅负责全局协调，不陷入实现细节", {
    x: 0.5, y: 1.0, w: 12.333, h: 0.6,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 层级架构图
  // 主线程
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.166, y: 1.9, w: 5.0, h: 1.0,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("主线程", {
    x: 4.166, y: 1.9, w: 5.0, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.white, bold: true, align: "center", valign: "middle"
  });
  slide.addText("目标 / 约束 / 决策 / 状态", {
    x: 4.166, y: 2.4, w: 5.0, h: 0.5,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle"
  });
  
  // 连接线
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.616, y: 2.9, w: 0.1, h: 0.6,
    fill: { color: COLORS.accent }
  });
  
  // 水平分隔线
  slide.addShape(pptx.ShapeType.rect, {
    x: 3.0, y: 3.5, w: 7.333, h: 0.05,
    fill: { color: COLORS.accent }
  });
  
  // 子agent A
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 4.2, w: 3.5, h: 0.9,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.08,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("子agent A", {
    x: 1.0, y: 4.2, w: 3.5, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true, align: "center", valign: "middle"
  });
  slide.addText("任务1执行", {
    x: 1.0, y: 4.65, w: 3.5, h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.body, align: "center", valign: "middle"
  });
  
  // 子agent B
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.0, y: 4.2, w: 3.5, h: 0.9,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.08,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("子agent B", {
    x: 5.0, y: 4.2, w: 3.5, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true, align: "center", valign: "middle"
  });
  slide.addText("任务2执行", {
    x: 5.0, y: 4.65, w: 3.5, h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.body, align: "center", valign: "middle"
  });
  
  // 独立thread
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.0, y: 4.2, w: 3.5, h: 0.9,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.08,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("独立thread", {
    x: 9.0, y: 4.2, w: 3.5, h: 0.45,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true, align: "center", valign: "middle"
  });
  slide.addText("完整历史留存", {
    x: 9.0, y: 4.65, w: 3.5, h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.body, align: "center", valign: "middle"
  });
  
  // SO WHAT
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 6.2, w: 12.333, h: 0.6,
    fill: { color: COLORS.accent },
    rectRadius: 0.05
  });
  slide.addText("SO WHAT：协调者不被细碎逻辑占用，并行工作可独立追溯", {
    x: 0.7, y: 6.2, w: 11.933, h: 0.6,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
}

// ==================== 第7页：习惯三 ====================
function addSlide7() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("7", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 习惯编号
  slide.addText("习惯三", {
    x: 0.5, y: 0.7, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  // 页面标题
  slide.addText("每个里程碑完成后先审计路线图，再review代码", {
    x: 0.5, y: 1.0, w: 12.333, h: 0.6,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 左侧 - 审计清单
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 6.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("路线图审计5项检查", {
    x: 0.8, y: 2.0, w: 5.4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("□ 里程碑是否真的完成\n□ 下一个目标是否合理\n□ 是否遗漏里程碑\n□ 新证据是否需要调整工作顺序\n□ \"完成定义\"是否仍然成立", {
    x: 0.8, y: 2.5, w: 5.4, h: 3.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.6
  });
  
  // 右侧 - 代码review
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 1.8, w: 6.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("代码review要点", {
    x: 7.1, y: 2.0, w: 5.4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("▪ 登录流程实现后\n   发现token存储错误\n▪ 浏览器端验证缺失\n▪ 远程测试无法覆盖\n   的隐藏问题\n▪ 两项审计完成后再\n   激活下一里程碑", {
    x: 7.1, y: 2.5, w: 5.4, h: 3.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.4
  });
  
  // SO WHAT
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 6.2, w: 12.333, h: 0.6,
    fill: { color: COLORS.accent },
    rectRadius: 0.05
  });
  slide.addText("SO WHAT：修正路线偏差 + 发现隐藏缺陷，两项完成后再推进", {
    x: 0.7, y: 6.2, w: 11.933, h: 0.6,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
}

// ==================== 第8页：习惯四 ====================
function addSlide8() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("8", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 习惯编号
  slide.addText("习惯四", {
    x: 0.5, y: 0.7, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  // 页面标题
  slide.addText("本机专属测试交由\"本地线程\"执行", {
    x: 0.5, y: 1.0, w: 12.333, h: 0.6,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 远程线程
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 1.9, w: 5.0, h: 3.5,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("远程线程", {
    x: 1.0, y: 1.9, w: 5.0, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true, align: "center", valign: "middle"
  });
  
  slide.addText("协调全局\n委派任务\n验收结果", {
    x: 1.3, y: 2.6, w: 4.4, h: 2.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.5
  });
  
  // 同步箭头
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.2, y: 3.3, w: 0.933, h: 0.05,
    fill: { color: COLORS.accent }
  });
  slide.addText("同步", {
    x: 6.2, y: 3.0, w: 0.933, h: 0.4,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.accent, align: "center"
  });
  
  // 本地线程
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.333, y: 1.9, w: 5.0, h: 3.5,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("本地线程", {
    x: 7.333, y: 1.9, w: 5.0, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true, align: "center", valign: "middle"
  });
  
  slide.addText("登录态测试\n本地凭据验证\nXcode / iOS测试", {
    x: 7.633, y: 2.6, w: 4.4, h: 2.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.5
  });
  
  // 说明文字
  slide.addText("远程任务可等待本地设备就绪后继续执行", {
    x: 1.0, y: 5.6, w: 11.333, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, align: "center"
  });
  
  // SO WHAT
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 6.2, w: 12.333, h: 0.6,
    fill: { color: COLORS.accent },
    rectRadius: 0.05
  });
  slide.addText("SO WHAT：远程/本地能力解耦，仅必要时调用本地资源", {
    x: 0.7, y: 6.2, w: 11.933, h: 0.6,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
}

// ==================== 第9页：习惯五 ====================
function addSlide9() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("9", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 习惯编号
  slide.addText("习惯五", {
    x: 0.5, y: 0.7, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  // 页面标题
  slide.addText("通过简报和仪表盘同步全局进度", {
    x: 0.5, y: 1.0, w: 12.333, h: 0.6,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 左侧 - 简报模板
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 6.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("极简三段式汇报", {
    x: 0.8, y: 2.0, w: 5.4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("▪ What's done\n   (已完成)\n\n▪ What's next\n   (下一步)\n\n▪ Any blockers\n   (有无阻塞)", {
    x: 0.8, y: 2.5, w: 5.4, h: 3.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.3
  });
  
  slide.addText("可推送至Slack", {
    x: 0.8, y: 5.2, w: 5.4, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, italic: true
  });
  
  // 右侧 - 仪表盘示意
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 1.8, w: 6.0, h: 4.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("progress-dashboard", {
    x: 7.1, y: 2.0, w: 5.4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("仪表盘展示：\n▪ 活跃目标\n▪ 已完成里程碑\n▪ 证据清单\n▪ 阻塞项\n▪ 决策记录", {
    x: 7.1, y: 2.5, w: 5.4, h: 2.0,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.4
  });
  
  slide.addText("可部署为公开站点\n随时远程查看", {
    x: 7.1, y: 4.6, w: 5.4, h: 0.8,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, italic: true
  });
  
  // SO WHAT
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 6.2, w: 12.333, h: 0.6,
    fill: { color: COLORS.accent },
    rectRadius: 0.05
  });
  slide.addText("SO WHAT：随时掌握全局状态，降低长周期项目上下文重建成本", {
    x: 0.7, y: 6.2, w: 11.933, h: 0.6,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.white, valign: "middle"
  });
}

// ==================== 第10页：核心结论 ====================
function addSlide10() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("10", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 页面标题
  slide.addText("核心结论", {
    x: 0.5, y: 0.8, w: 12.333, h: 0.7,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true, align: "center"
  });
  
  // 结论框
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 1.8, w: 10.333, h: 2.0,
    fill: { color: COLORS.accent },
    rectRadius: 0.1
  });
  slide.addText("AI模型负责产出智能能力\n人类开发者的核心价值\n是引导这份智能始终锚定统一目标，\n沿着验证过的证据稳步推进。", {
    x: 1.5, y: 1.8, w: 10.333, h: 2.0,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: COLORS.white, align: "center", valign: "middle",
    lineSpacingMultiple: 1.3
  });
  
  // 边界说明框
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 4.2, w: 10.333, h: 2.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  
  slide.addText("三点边界", {
    x: 1.8, y: 4.3, w: 9.733, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  
  slide.addText("1. 非官方定论 — OpenAI工程师个人实践总结\n2. 需适配 — 其他工具需找对应替代功能\n3. 自定义约定 — GOALS.md等需用户与AI共同建立", {
    x: 1.8, y: 4.8, w: 9.733, h: 1.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: COLORS.body, lineSpacingMultiple: 1.6
  });
}

// ==================== 第11页：参考链接 ====================
function addSlide11() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.background };
  
  // 页眉
  slide.addText("AI编码协作方法论", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  slide.addText("11", {
    x: 12.5, y: 0.3, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: COLORS.secondary, align: "right"
  });
  
  // 页面标题
  slide.addText("参考资源", {
    x: 0.5, y: 0.8, w: 12.333, h: 0.7,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: COLORS.title, bold: true
  });
  
  // 链接卡片1
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 12.333, h: 1.4,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("▪ 原文推文", {
    x: 0.8, y: 1.9, w: 11.733, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  slide.addText("Gabriel Chua《Collaborating with Codex on Long-Running Tasks》", {
    x: 0.8, y: 2.3, w: 11.733, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: COLORS.body
  });
  slide.addText("x.com/gabrielchua/status/2074505300766568563", {
    x: 0.8, y: 2.6, w: 11.733, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  
  // 链接卡片2
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 3.4, w: 12.333, h: 1.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("▪ 作者主页", {
    x: 0.8, y: 3.5, w: 11.733, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  slide.addText("Gabriel Chua — OpenAI Codex DX Engineer", {
    x: 0.8, y: 3.9, w: 11.733, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: COLORS.body
  });
  slide.addText("x.com/gabrielchua", {
    x: 0.8, y: 4.2, w: 11.733, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: COLORS.secondary
  });
  
  // 链接卡片3
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.8, w: 12.333, h: 1.2,
    fill: { color: COLORS.cardBg },
    rectRadius: 0.1,
    line: { color: COLORS.line, width: 1 }
  });
  slide.addText("▪ Codex开源仓库", {
    x: 0.8, y: 4.9, w: 11.733, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: COLORS.accent, bold: true
  });
  slide.addText("github.com/openai/codex", {
    x: 0.8, y: 5.3, w: 11.733, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: COLORS.body
  });
}

// ==================== 生成PPTX ====================
async function generate() {
  addSlide1();
  addSlide2();
  addSlide3();
  addSlide4();
  addSlide5();
  addSlide6();
  addSlide7();
  addSlide8();
  addSlide9();
  addSlide10();
  addSlide11();
  
  const outputPath = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/cyberppt-ai-collab/AI编码协作方法论-五大习惯.pptx";
  await pptx.writeFile({ fileName: outputPath });
  console.log(`PPTX generated: ${outputPath}`);
}

generate().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
