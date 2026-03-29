const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 数据模式主题 - 低饱和暖色 4 色体系
const theme = {
  primary: "2d2a26",    // 深灰 - 标题
  secondary: "6b6560",  // 中灰 - 正文
  accent: "5b7fa8",     // 低饱和蓝 - 主色（数据模式核心）
  light: "c9ada7",      // 浅暖灰 - 背景点缀
  bg: "f5f3ef"          // 暖灰背景
};

// 导入并创建所有幻灯片（1-9）
for (let i = 1; i <= 9; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${i} created (数据模式)`);
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
  console.log(`✓ Slide ${slide.num} created (数据模式)`);
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
  console.log(`✓ Slide ${slide.num} created (数据模式)`);
}

// 输出文件
pres.writeFile({ fileName: './output/数据模式 - 应对策略.pptx' })
  .then(() => {
    console.log('\n✅ 数据模式 PPT 生成成功！');
    console.log('📄 文件路径：./output/数据模式 - 应对策略.pptx');
  })
  .catch(err => {
    console.error('❌ 生成失败:', err);
  });
