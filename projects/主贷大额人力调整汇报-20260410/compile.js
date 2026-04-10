// compile.js — 编译最终 PPTX
const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 咨询模式主题色 (Business & Authority 色彩方案)
const theme = {
  primary: "2b2d42",     // 深蓝 - 标题
  secondary: "8d99ae",   // 灰 - 正文
  accent: "B85450",      // 陶土红 - 强调
  light: "edf2f4",       // 浅灰 - 边框/背景
  bg: "FFFFFF"           // 白 - 背景
};

const slideDir = path.join(__dirname, 'slides');

async function build() {
  const N = 7;

  for (let i = 1; i <= N; i++) {
    const num = String(i).padStart(2, '0');
    const slideModule = require(`${slideDir}/slide-${num}.js`);
    slideModule.createSlide(pres, theme);
    console.log(`Slide ${num} created — ${slideModule.slideConfig.type}: ${slideModule.slideConfig.title.substring(0, 40)}...`);
  }

  const outputPath = path.join(__dirname, 'output', '主贷大额人力调整汇报.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`\nPPTX generated: ${outputPath}`);
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
