// new-compile.js - 编译脚本
// 基于新设计系统重新生成 PPT

const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Luxury & Mysterious 主题 - 冷紫调高端咨询感
const theme = {
  primary: "22223b",    // 深蓝灰 - 标题
  secondary: "4a4e69",  // 冷灰 - 正文
  accent: "c9ada7",     // 暖灰粉 - 强调
  light: "9a8c98",      // 冷紫灰 - 装饰
  bg: "f2e9e4"          // 暖米白 - 背景
};

console.log('🎨 使用配色方案：Luxury & Mysterious（冷紫调高端咨询感）');
console.log('   Primary:', '#' + theme.primary);
console.log('   Secondary:', '#' + theme.secondary);
console.log('   Accent:', '#' + theme.accent);
console.log('   Light:', '#' + theme.light);
console.log('   Background:', '#' + theme.bg);
console.log('');

// 导入并创建所有幻灯片
const slides = [
  { file: 'new-01-cover.js', num: 1, name: '封面' },
  { file: 'new-02-toc.js', num: 2, name: '目录' },
  { file: 'new-03-event-review.js', num: 3, name: '事件回顾' },
  { file: 'new-04-behavior-patterns.js', num: 4, name: '行为模式' },
  { file: 'new-05-motivation-analysis.js', num: 5, name: '动机分析' },
  { file: 'new-06-response-strategy.js', num: 6, name: '应对策略' },
  { file: 'new-07-summary.js', num: 7, name: '总结' }
];

for (const slide of slides) {
  try {
    const slideModule = require(`./${slide.file}`);
    slideModule.createSlide(pres, theme);
    console.log(`✓ Slide ${slide.num} ${slide.name} created`);
  } catch (err) {
    console.error(`✗ Slide ${slide.num} ${slide.name} failed:`, err.message);
  }
}

// 输出文件
pres.writeFile({ fileName: './output/如何应对职场带节奏-v3.pptx' })
  .then(() => {
    console.log('');
    console.log('✅ PPT 生成成功！');
    console.log('📄 文件路径：./output/如何应对职场带节奏-v3.pptx');
  })
  .catch(err => {
    console.error('');
    console.error('❌ 生成失败:', err);
  });
