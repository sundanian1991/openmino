// swim-03-safety.js - 安全注意事项
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 3,
  title: '安全注意事项',
  insight: '游泳有溺水风险，安全永远是第一位的'
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

  // 左侧：绝对禁止（红色警告）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.3, h: 2.5,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText('绝对禁止', {
    x: 0.7, y: 1.3, w: 3.9, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const prohibitions = [
    { icon: '❌', text: '不要独自下水' },
    { icon: '❌', text: '不要进入深水区' },
    { icon: '❌', text: '不要逞强' },
    { icon: '❌', text: '不要憋气过久' }
  ];

  prohibitions.forEach((item, i) => {
    slide.addText(item.icon, {
      x: 0.7, y: 1.75 + i * 0.45, w: 0.3, h: 0.35,
      fontSize: 14, fontFace: "Arial",
      color: theme.accent
    });
    slide.addText(item.text, {
      x: 1.0, y: 1.75 + i * 0.45, w: 3.5, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 右侧：必须准备
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.2, w: 4.3, h: 2.5,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1.5 }
  });

  slide.addText('必须准备', {
    x: 5.4, y: 1.3, w: 3.9, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const requirements = [
    { icon: '✓', text: '救生衣/浮板' },
    { icon: '✓', text: '熟悉安全员位置' },
    { icon: '✓', text: '了解泳池深度' },
    { icon: '✓', text: '热身运动' }
  ];

  requirements.forEach((item, i) => {
    slide.addText(item.icon, {
      x: 5.4, y: 1.75 + i * 0.45, w: 0.3, h: 0.35,
      fontSize: 14, fontFace: "Arial",
      color: theme.accent
    });
    slide.addText(item.text, {
      x: 5.7, y: 1.75 + i * 0.45, w: 3.5, h: 0.35,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 底部：放弃条件
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.9, w: 9, h: 1.0,
    fill: { color: "FAFAFA" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText('出现以下任一情况，立即停止', {
    x: 0.7, y: 4.0, w: 8.6, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const stopConditions = [
    '感到头晕、恶心、呼吸困难',
    '肌肉抽筋',
    '连续呛水 3 次以上',
    '学习时间超过 6 小时'
  ];

  stopConditions.forEach((item, i) => {
    slide.addText(`• ${item}`, {
      x: 0.7 + i * 2.25, y: 4.35, w: 2.1, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
