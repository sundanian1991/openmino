// swim-05-training.js - 训练计划
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  title: '一天训练计划',
  insight: '分阶段推进：上午基础、下午配合、晚上巩固'
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

  // 上午训练（3 小时）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 9, h: 1.15,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  slide.addText('上午（3 小时）— 水感 + 漂浮 + 蹬腿', {
    x: 0.7, y: 1.3, w: 8.6, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const amItems = [
    { time: '第 1 小时', content: '下水适应水温、在浅水区走动、练习憋气、手扶池边漂浮' },
    { time: '第 2 小时', content: '蹬边滑行漂浮、俯卧/仰卧漂浮、站立恢复' },
    { time: '第 3 小时', content: '陆上模仿蹬腿动作、水中扶边蹬腿、蹬边漂浮 + 蹬腿' }
  ];

  amItems.forEach((item, i) => {
    slide.addText(item.time, {
      x: 0.7, y: 1.65 + i * 0.32, w: 1.2, h: 0.28,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.content, {
      x: 1.85, y: 1.65 + i * 0.32, w: 7.25, h: 0.28,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 下午训练（3 小时）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.45, w: 9, h: 1.15,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText('下午（3 小时）— 划水 + 换气 + 完整配合', {
    x: 0.7, y: 2.55, w: 8.6, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const pmItems = [
    { time: '第 4 小时', content: '陆上模仿划手动作、水中练习划手、划手 + 呼吸配合' },
    { time: '第 5 小时', content: '划手 + 蹬腿分解练习、加入换气、完整配合节奏' },
    { time: '第 6 小时', content: '扶边游出 2-3 米、尝试独立游 5-10 米、教练保护' }
  ];

  pmItems.forEach((item, i) => {
    slide.addText(item.time, {
      x: 0.7, y: 2.9 + i * 0.32, w: 1.2, h: 0.28,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.content, {
      x: 1.85, y: 2.9 + i * 0.32, w: 7.25, h: 0.28,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 晚上巩固（1 小时）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.0,
    fill: { color: "FAFAFA" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  slide.addText('晚上（1 小时）— 巩固练习', {
    x: 0.7, y: 3.8, w: 8.6, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const eveningItems = [
    '重复完整配合动作',
    '尝试连续游 10-15 米',
    '录像回看动作问题',
    '教练反馈纠正'
  ];

  eveningItems.forEach((item, i) => {
    slide.addText(`• ${item}`, {
      x: 0.7 + i * 2.2, y: 4.2, w: 2.1, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("5", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
