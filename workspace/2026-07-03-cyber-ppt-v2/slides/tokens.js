// ═══════════════════════════════════════════════════════════
//  DESIGN TOKENS — Swiss International × Editorial Magazine
//  瑞士国际主义 × 编辑杂志
// ═══════════════════════════════════════════════════════════
//
//  原则：
//  ┌─ 12列网格，5% 安全边距
//  ├─ 字号差异创造层级，颜色是辅助
//  ├─ 一种强调色，用得大胆
//  ├─ 无阴影、无圆角、无渐变
//  ├─ 左对齐，非对称平衡
//  └─ 留白是设计元素
//
// ═══════════════════════════════════════════════════════════

const MU = 0.0417;   // 1 unit = 0.0417 inches (≈ 8px at 1920px/13.333")

module.exports = {
  // ── Canvas ───────────────────────────────────────────
  CANVAS_W: 13.333,
  CANVAS_H: 7.5,
  GRID_COLS: 12,
  GUTTER: 0.125,
  SAFE_MARGIN: 0.5,
  COL_W: 1.0,  // ~ (13.333 - 2*0.5 - 11*0.125) / 12 ≈ 0.87 → 简算用 1.0

  // ── Color ────────────────────────────────────────────
  C: {
    paper:       'F7F5EE',  // 暖米白纸面（背景）
    ink:         '1A1A1A',  // 近黑文字
    inkSoft:     '3D3C39',  // 次级文字
    mute:        '7A7873',  // 三级/元数据
    rule:        'D6D2C8',  // 分割线
    accent:      'C83E2D',  // 朱砂红（唯一强调色）
    accentSoft:  'F9E8E6',  // 朱砂红带（荧光笔效果底）
    white:       'FFFFFF',
    black:       '000000',
    green:       '2E5C3F',  // 成功案例
    amber:       'A07828',  // 预警
    purple:      '6B3A8A',  // 中性框架色
  },

  // ── Typography Scale ─────────────────────────────────
  T: {
    coverTitle:  { size: 64, face: 'Georgia',      bold: true,  tracking: -0.02 },
    coverSub:    { size: 16, face: 'Georgia',      bold: false, tracking: 0.02, italic: true },

    pageTitle:   { size: 40, face: 'Helvetica Neue', bold: true,  tracking: -0.01 },
    pageTitleSm: { size: 28, face: 'Helvetica Neue', bold: true,  tracking: -0.01 },

    sectionLabel:{ size: 11, face: 'Helvetica Neue', bold: true,  tracking: 0.15, transform: 'uppercase' },

    subheading:  { size: 18, face: 'Helvetica Neue', bold: false, tracking: 0.01 },
    subheadingB: { size: 20, face: 'Helvetica Neue', bold: true,  tracking: 0 },

    body:        { size: 13, face: 'Helvetica Neue', bold: false, tracking: 0.01 },
    bodySm:      { size: 11, face: 'Helvetica Neue', bold: false, tracking: 0.02 },
    bodyXs:      { size: 9,  face: 'Helvetica Neue', bold: false, tracking: 0.04 },

    quoteEn:     { size: 13, face: 'Georgia',      bold: false, tracking: 0.01, italic: true },
    quoteCn:     { size: 12, face: 'Georgia',      bold: false, tracking: 0.02, italic: true },
    quoteAttribution: { size: 9, face: 'Helvetica Neue', bold: false, tracking: 0.06 },

    number:      { size: 56, face: 'Helvetica Neue', bold: true,  tracking: -0.03 },
    numberSm:    { size: 36, face: 'Helvetica Neue', bold: true,  tracking: -0.02 },

    stat:        { size: 36, face: 'Helvetica Neue', bold: true,  tracking: -0.02 },

    tag:         { size: 9,  face: 'Helvetica Neue', bold: true,  tracking: 0.12 },
    footer:      { size: 9, face: 'Helvetica Neue', bold: false, tracking: 0.06 },
  },

  // ── Layout Helpers ───────────────────────────────────
  SAFE_L: 0.5,
  SAFE_R: 12.833,
  LEFT_COL: 4,    // 主内容区跨 4 列
  RIGHT_COL: 7,   // 副内容区跨 7 列

  // ── Component Presets ────────────────────────────────
  PAGE_NUM: { x: 12.2, y: 7.0, w: 0.6, h: 0.4 },
};
