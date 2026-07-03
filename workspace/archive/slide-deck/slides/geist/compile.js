// compile.js - 编译 PPTX
const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Mino';
pres.title = 'Geist × Anthropic 设计风格完全指南';

// Anthropic Geist 陶土色主题
const theme = {
  primary: "3D2C29",    // Charcoal - 标题
  secondary: "CA6641",  // Terracotta Deep - 深强调
  accent: "E2725B",     // Terracotta Base - 主强调
  light: "C5C1BE",      // Warm Grey Mid - 浅色
  bg: "F5F1EE"          // Cream/Ivory - 背景
};

// 加载所有幻灯片
for (let i = 1; i <= 17; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
  console.log(`Slide ${num} created`);
}

// 保存文件
pres.writeFile({ fileName: '../output/Geist-Anthropic-设计风格指南.pptx' })
  .then(() => console.log('PPTX created successfully!'))
  .catch(err => console.error('Error:', err));
