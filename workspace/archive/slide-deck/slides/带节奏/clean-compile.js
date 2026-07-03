// clean-compile.js - 编译脚本
// 极致简洁白风格

const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 极致简洁白配色
const theme = {
  bg: "FFFFFF",        // 纯白背景
  primary: "000000",   // 纯黑标题
  secondary: "666666", // 深灰副标题
  accent: "D70015",    // 正红强调
  light: "F5F5F5"      // 极浅灰分隔
};

console.log('🎨 使用配色方案：极致简洁白');
console.log('   Background: #' + theme.bg);
console.log('   Primary: #' + theme.primary);
console.log('   Accent: #' + theme.accent);
console.log('');

// 导入并创建所有幻灯片
const slides = [
  { file: 'clean-01-cover.js', num: 1, name: '封面' },
  { file: 'clean-02-toc.js', num: 2, name: '目录' },
  { file: 'clean-03-event-review.js', num: 3, name: '事件回顾' },
  { file: 'clean-04-behavior-patterns.js', num: 4, name: '行为模式' },
  { file: 'clean-05-motivation-analysis.js', num: 5, name: '动机分析' },
  { file: 'clean-06-response-strategy.js', num: 6, name: '应对策略' },
  { file: 'clean-07-summary.js', num: 7, name: '总结' }
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
pres.writeFile({ fileName: '../output/如何应对职场带节奏-v5-clean.pptx' })
  .then(() => {
    console.log('');
    console.log('✅ PPT 生成成功！');
    console.log('📄 文件路径：../output/如何应对职场带节奏-v5-clean.pptx');
  })
  .catch(err => {
    console.error('');
    console.error('❌ 生成失败:', err);
  });
