// swim-02-goals.js - 学习目标与时间分配
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 2,
  title: '学习目标与时间分配',
  insight: '一天内掌握蛙泳基础，能独立游 10-15 米'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }
  });

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 左侧：学习目标卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.3, h: 2.2,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1.5 }
  });

  slide.addText('学习目标', {
    x: 0.7, y: 1.3, w: 3.9, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const goals = [
    '能独立漂浮 10 秒以上',
    '能完成蛙泳完整配合动作',
    '能独立游 10-15 米',
    '没有严重的恐惧感'
  ];

  goals.forEach((item, i) => {
    slide.addText(`• ${item}`, {
      x: 0.7, y: 1.7 + i * 0.4, w: 3.9, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 右侧：时间分配卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.2, w: 4.3, h: 2.2,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText('时间分配', {
    x: 5.4, y: 1.3, w: 3.9, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const schedule = [
    { time: '上午 (3h)', content: '水感 + 漂浮 + 蹬腿' },
    { time: '下午 (3h)', content: '划水 + 换气 + 配合' },
    { time: '晚上 (1h)', content: '巩固练习' }
  ];

  schedule.forEach((item, i) => {
    slide.addText(item.time, {
      x: 5.4, y: 1.7 + i * 0.55, w: 1.5, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.content, {
      x: 6.7, y: 1.7 + i * 0.55, w: 2.6, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 底部洞察卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.6, w: 9, h: 1.2,
    fill: { color: "FAFAFA" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  slide.addText('核心原则', {
    x: 0.7, y: 3.75, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const principles = [
    { label: '安全第一', value: '所有训练以不溺水为底线' },
    { label: '蛙泳优先', value: '最容易入门的泳姿' },
    { label: '专业指导', value: '强烈建议请教练，至少前 2 小时' },
    { label: '分阶段推进', value: '上午基础、下午配合、晚上巩固' }
  ];

  principles.forEach((item, i) => {
    slide.addText(item.label, {
      x: 0.7 + i * 2.25, y: 4.05, w: 2, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.value, {
      x: 0.7 + i * 2.25, y: 4.3, w: 2, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("2", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
