// dark-compile.js - 编译脚本
// 深色高端咨询风格

const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 深色高端咨询配色
const theme = {
  bg: "1a1a2e",        // 深蓝黑背景
  surface: "16213e",   // 深蓝表面
  primary: "eaeaea",   // 亮白文字
  secondary: "a0a0a0", // 灰白副标题
  accent: "c9a962",    // 青铜金强调
  accentLight: "e8d8a8" // 浅金
};

console.log('🎨 使用配色方案：Dark Premium Consulting（深色高端咨询风）');
console.log('   Background: #' + theme.bg);
console.log('   Surface: #' + theme.surface);
console.log('   Primary: #' + theme.primary);
console.log('   Accent: #' + theme.accent);
console.log('');

// 导入并创建所有幻灯片
const slides = [
  { file: 'dark-01-cover.js', num: 1, name: '封面' },
  { file: 'dark-02-toc.js', num: 2, name: '目录' },
  { file: 'dark-03-event-review.js', num: 3, name: '事件回顾' },
  { file: 'dark-04-behavior-patterns.js', num: 4, name: '行为模式' },
  { file: 'dark-05-motivation-analysis.js', num: 5, name: '动机分析' },
  { file: 'dark-06-response-strategy.js', num: 6, name: '应对策略' },
  { file: 'dark-07-summary.js', num: 7, name: '总结' }
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
pres.writeFile({ fileName: './output/如何应对职场带节奏-v4-dark.pptx' })
  .then(() => {
    console.log('');
    console.log('✅ PPT 生成成功！');
    console.log('📄 文件路径：./output/如何应对职场带节奏-v4-dark.pptx');
  })
  .catch(err => {
    console.error('');
    console.error('❌ 生成失败:', err);
  });
