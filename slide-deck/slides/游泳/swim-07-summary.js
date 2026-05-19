// swim-07-summary.js - 成功标准与后续计划
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 7,
  title: '成功标准与后续计划',
  insight: '学会游泳是开始，不是终点'
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

  // 左侧：成功标准
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.3, h: 2.5,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText('成功标准', {
    x: 0.7, y: 1.3, w: 3.9, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const successCriteria = [
    { icon: '✓', text: '能独立漂浮 10 秒以上' },
    { icon: '✓', text: '能完成蛙泳完整配合动作' },
    { icon: '✓', text: '能独立游 10-15 米' },
    { icon: '✓', text: '没有严重的恐惧感' }
  ];

  successCriteria.forEach((item, i) => {
    slide.addText('🏊', {
      x: 0.7, y: 1.75 + i * 0.5, w: 0.4, h: 0.4,
      fontSize: 16, fontFace: "Arial"
    });
    slide.addText(item.text, {
      x: 1.1, y: 1.75 + i * 0.5, w: 3.5, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // 右侧：后续计划
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.2, w: 4.3, h: 2.5,
    fill: { color: "FAFAFA" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  slide.addText('后续计划', {
    x: 5.4, y: 1.3, w: 3.9, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const followUp = [
    { time: '一周后', goal: '连续游 25 米不停歇' },
    { time: '一月后', goal: '学习自由泳' },
    { time: '三月后', goal: '开始游泳健身计划' }
  ];

  followUp.forEach((item, i) => {
    slide.addText(item.time, {
      x: 5.4, y: 1.75 + i * 0.7, w: 1.5, h: 0.6,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.goal, {
      x: 6.8, y: 1.75 + i * 0.7, w: 2.5, h: 0.6,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // 底部：核心洞察
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.9, w: 9, h: 1.0,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText('核心洞察', {
    x: 0.7, y: 4.05, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText(slideConfig.insight, {
    x: 0.7, y: 4.3, w: 8.6, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("7", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
