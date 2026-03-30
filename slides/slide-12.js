// slide-12.js - 触发条件 + 行动（对策部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 12,
  section: '对策 · 怎么办',
  title: '触发条件与行动'
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

  // Trigger conditions table (top half)
  const triggers = [
    { prob: '高', probColor: 'D63333', probBg: 'FFE5E5', conditions: '重大业务事故 / VP 关注', action: '提供数据、准备汇报' },
    { prob: '中', probColor: 'F59E0B', probBg: 'FEF3C7', conditions: '跨部门冲突 / 供应商反弹', action: '记录冲突、推动试点' },
    { prob: '低', probColor: '2563EB', probBg: 'DBEAFE', conditions: '完美论证 / 策略组让权', action: '不要期待' }
  ];

  triggers.forEach((t, i) => {
    const y = 1.7 + i * 0.8;

    // Probability badge
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y + 0.1, w: 0.7, h: 0.28,
      fill: { color: t.probBg },
      rectRadius: 0.05
    });
    slide.addText(t.prob, {
      x: 0.5, y: y + 0.1, w: 0.7, h: 0.28,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: t.probColor, bold: true,
      align: "center", valign: "middle"
    });

    // Conditions
    slide.addText(t.conditions, {
      x: 1.35, y: y, w: 5, h: 0.7,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: 'middle'
    });

    // Action
    slide.addText(t.action, {
      x: 6.2, y: y, w: 3.3, h: 0.7,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: 'middle'
    });

    // Separator
    if (i < triggers.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + 0.75, w: 9, h: 0,
        line: { color: theme.light, width: 1 }
      });
    }
  });

  // Time-based actions (bottom half)
  const periods = [
    { title: '短期 1-2 周', actions: ['边界识别', '保护机制', '观察王易人'], x: 0.5, y: 3.8, color: theme.light },
    { title: '中期 1-2 月', actions: ['信息同步联盟', '收集反馈案例', '推动 BPO 试点'], x: 3.5, y: 3.8, color: theme.secondary },
    { title: '长期 3-6 月', actions: ['等待触发条件', '准备汇报材料', '抓住机会窗口'], x: 6.5, y: 3.8, color: theme.accent }
  ];

  periods.forEach((p) => {
    // Card
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: p.y, w: 2.8, h: 1.2,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08,
      line: { color: p.color, width: 1 }
    });

    // Period title
    slide.addText(p.title, {
      x: p.x + 0.2, y: p.y + 0.15, w: 2.4, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: p.color, bold: true
    });

    // Actions
    p.actions.forEach((a, i) => {
      slide.addText(a, {
        x: p.x + 0.35, y: p.y + 0.45 + i * 0.25, w: 2.3, h: 0.22,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.primary
      });
    });
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("12", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 11, fontFace: "Arial",
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
