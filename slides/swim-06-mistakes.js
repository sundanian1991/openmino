// swim-06-mistakes.js - 常见错误与纠正
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'table',
  index: 6,
  title: '常见错误与纠正'
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

  // 动作错误表
  slide.addText('动作错误', {
    x: 0.5, y: 1.2, w: 9, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 9, h: 2.4,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  // 表头
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 9, h: 0.35,
    fill: { color: "FAFAFA" }
  });

  const headers = ['问题', '纠正方法', '口诀'];
  headers.forEach((item, i) => {
    slide.addText(item, {
      x: 0.5 + i * 3, y: 1.55, w: 3, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center", valign: "middle"
    });
  });

  // 表格内容
  const mistakes = [
    {
      problem: '抬头过高',
      fix: '只要嘴巴露出水面即可，眼睛看池底或前方',
      tip: '下巴贴水面'
    },
    {
      problem: '蹬腿不翻脚',
      fix: '脚掌外翻，脚心朝后蹬水',
      tip: '脚掌像青蛙'
    },
    {
      problem: '划手不划水',
      fix: '手掌向后推水，感受到水的阻力',
      tip: '手心向后推'
    },
    {
      problem: '配合不协调',
      fix: '记住节奏：划手→吸气→收手→蹬腿→滑行',
      tip: '划蹬漂'
    }
  ];

  mistakes.forEach((row, i) => {
    const y = 1.9 + i * 0.5;
    slide.addText(row.problem, {
      x: 0.5, y: y, w: 3, h: 0.45,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "center", valign: "middle"
    });
    slide.addText(row.fix, {
      x: 3.5, y: y, w: 3, h: 0.45,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });
    slide.addText(row.tip, {
      x: 6.5, y: y, w: 3, h: 0.45,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "center", valign: "middle"
    });
    // 分割线
    if (i < mistakes.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + 0.45, w: 9, h: 0,
        line: { color: theme.light, width: 0.5 }
      });
    }
  });

  // 底部：学习曲线
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.0, w: 9, h: 0.9,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1 }
  });

  slide.addText('学习曲线', {
    x: 0.7, y: 4.1, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const curveItems = [
    { stage: '第 1 小时', desc: '最困难，克服恐惧' },
    { stage: '第 2-3 小时', desc: '开始找到感觉' },
    { stage: '第 4-5 小时', desc: '动作逐渐协调' },
    { stage: '第 6-7 小时', desc: '能游进了！' }
  ];

  curveItems.forEach((item, i) => {
    slide.addText(item.stage, {
      x: 0.7 + i * 2.25, y: 4.4, w: 2, h: 0.2,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.desc, {
      x: 0.7 + i * 2.25, y: 4.6, w: 2, h: 0.2,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("6", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
