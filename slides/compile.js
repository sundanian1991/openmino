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

// 导入并创建所有幻灯片（1-9）
for (let i = 1; i <= 9; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${i} created`);
}

// 导入并创建新增幻灯片（11-13）
const slides11to13 = [
  { file: '11-cover.js', num: 11 },
  { file: '12-toc.js', num: 12 },
  { file: '13-section-01.js', num: 13 }
];
for (const slide of slides11to13) {
  const slideModule = require(`./${slide.file}`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${slide.num} created`);
}

// 导入并创建新增幻灯片（17-19）
const slides17to19 = [
  { file: '17-attack-and-private-comm.js', num: 17 },
  { file: '18-judgment-criteria.js', num: 18 },
  { file: '19-summary.js', num: 19 }
];
for (const slide of slides17to19) {
  const slideModule = require(`./${slide.file}`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${slide.num} created`);
}

// 输出文件
pres.writeFile({ fileName: './output/应对刘乾坤带节奏策略.pptx' })
  .then(() => {
    console.log('\n✅ PPT 生成成功！');
    console.log('📄 文件路径: ./output/应对刘乾坤带节奏策略.pptx');
  })
  .catch(err => {
    console.error('❌ 生成失败:', err);
  });
