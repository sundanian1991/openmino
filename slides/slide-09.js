// slide-09.js - 业务风险（影响部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 9,
  section: '影响 · 会怎样',
  title: '业务风险'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 0.5, y: 0.5, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Three risk cards
  const risks = [
    {
      level: '高',
      levelColor: 'D63333',
      levelBg: 'FFE5E5',
      title: '供应商流失风险',
      desc: '头部供应商因 ROI 不匹配而流失，中腰部供应商不愿投入',
      impact: '产能下降、交付不稳定',
      x: 0.5,
      y: 1.7
    },
    {
      level: '中',
      levelColor: 'F59E0B',
      levelBg: 'FEF3C7',
      title: '团队内耗风险',
      desc: '策略组 vs 服务组博弈，供应商夹在中间接收矛盾信号',
      impact: '协作效率下降、决策延迟',
      x: 3.5,
      y: 1.7
    },
    {
      level: '高',
      levelColor: 'D63333',
      levelBg: 'FFE5E5',
      title: '管理失效风险',
      desc: '表演型管理成为常态，问题被掩盖而非解决',
      impact: '组织信任受损、安全感缺失',
      x: 6.5,
      y: 1.7
    }
  ];

  risks.forEach((r) => {
    // Card background
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: r.x, y: r.y, w: 2.8, h: 2.5,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08,
      line: { color: theme.light, width: 1 }
    });

    // Risk level badge
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: r.x + 0.2, y: r.y + 0.2, w: 0.6, h: 0.3,
      fill: { color: r.levelBg },
      rectRadius: 0.05
    });

    slide.addText(r.level, {
      x: r.x + 0.2, y: r.y + 0.2, w: 0.6, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: r.levelColor, bold: true,
      align: "center", valign: "middle"
    });

    // Title
    slide.addText(r.title, {
      x: r.x + 0.9, y: r.y + 0.2, w: 1.8, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      valign: "middle"
    });

    // Description
    slide.addText(r.desc, {
      x: r.x + 0.2, y: r.y + 0.65, w: 2.4, h: 0.8,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary
    });

    // Impact separator
    slide.addShape(pres.shapes.LINE, {
      x: r.x + 0.2, y: r.y + 1.5, w: 2.4, h: 0,
      line: { color: theme.light, width: 1 }
    });

    // Impact
    slide.addText('影响', {
      x: r.x + 0.2, y: r.y + 1.6, w: 2.4, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.light, bold: true
    });

    slide.addText(r.impact, {
      x: r.x + 0.2, y: r.y + 1.85, w: 2.4, h: 0.5,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("9", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Footer
  slide.addText('权责不对等分析', {
    x: 0.5, y: 5.1, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
