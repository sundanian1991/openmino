// compile-geist.js — 编译 Anthropic-Geist 设计风格指南
const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Mino';
pres.title = 'Anthropic × Geist 设计风格完全指南';

// Anthropic 品牌模式配色
const theme = {
  primary: "141413",    // 深灰 - 标题
  secondary: "b0aea5",  // 中灰 - 正文
  accent: "d97757",     // 陶土橙 - 强调
  light: "e8e6dc",      // 浅灰 - 边框/页码背景
  bg: "faf9f5"          // 暖白 - 背景
};

const slideFiles = [
  'geist-01.js',   // 封面
  'geist-02.js',   // 目录
  'geist-03.js',   // Section: 01 风格 DNA
  'geist-04.js',   // 三大核心支柱
  'geist-05.js',   // Section: 02 色彩系统
  'geist-06.js',   // 陶土色家族
  'geist-07.js',   // 辅助色/中性色/点缀色
  'geist-08.js',   // 色彩金字塔
  'geist-09.js',   // Section: 03 线条与构图
  'geist-10.js',   // 线条特征与手绘规则
  'geist-11-divider.js', // Section: 04 标志性元素
  'geist-12.js',   // 标志性元素库
  'geist-13.js',   // Section: 05 情感与语义
  'geist-14.js',   // 色彩心理学与竞品差异化
  'geist-15.js',   // Prompt 模板库
  'geist-16.js'    // 总结 + 检查清单
];

slideFiles.forEach(file => {
  const mod = require(`./${file}`);
  mod.createSlide(pres, theme);
  console.log(`✓ ${file}`);
});

pres.writeFile({ fileName: '../output/Anthropic-Geist-设计风格指南.pptx' })
  .then(() => console.log('\n✅ PPTX created: output/Anthropic-Geist-设计风格指南.pptx'))
  .catch(err => console.error('❌ Error:', err));
