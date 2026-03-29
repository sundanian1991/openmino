const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 咨询模式主题 - 极度克制，结论先行
const theme = {
  primary: "333333",    // 深炭灰 - 标题
  secondary: "555555",  // 中灰 - 正文
  accent: "B85450",     // 低饱和红 - 强调（咨询模式核心色）
  light: "D0D0D0",      // 浅灰 - 分割线
  bg: "F9F9F9"          // 非纯白背景
};

// 导入并创建所有幻灯片（1-9）
for (let i = 1; i <= 9; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${i} created (咨询模式)`);
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
  console.log(`✓ Slide ${slide.num} created (咨询模式)`);
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
  console.log(`✓ Slide ${slide.num} created (咨询模式)`);
}

// 输出文件
pres.writeFile({ fileName: './output/咨询模式 - 应对策略.pptx' })
  .then(() => {
    console.log('\n✅ 咨询模式 PPT 生成成功！');
    console.log('📄 文件路径：./output/咨询模式 - 应对策略.pptx');
  })
  .catch(err => {
    console.error('❌ 生成失败:', err);
  });
