const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 演示模式主题 - 驼色优雅
const theme = {
  primary: "2D2D2D",    // 深灰 - 标题
  secondary: "444444",  // 中灰 - 正文
  accent: "C4B5A3",     // 驼色 - 强调
  light: "E5E5E5",      // 浅灰 - 背景点缀
  bg: "FAF9F6"          // 米白 - 背景
};

// 导入并创建所有幻灯片（11-19）
const pptxGenSlides = [
  { file: '11-cover.js', num: 11 },
  { file: '12-toc.js', num: 12 },
  { file: '13-section-01.js', num: 13 },
  { file: '14-core-principles.js', num: 14 },
  { file: '15-scene-one.js', num: 15 },
  { file: '16-scene-two.js', num: 16 },
  { file: '17-attack-and-private-comm.js', num: 17 },
  { file: '18-judgment-criteria.js', num: 18 },
  { file: '19-summary.js', num: 19 }
];

for (const slide of pptxGenSlides) {
  const slideModule = require(`./${slide.file}`);
  slideModule.createSlide(pres, theme);
  console.log(`✓ Slide ${slide.num} created (pptx-generator)`);
}

// 输出文件
pres.writeFile({ fileName: '../output/pptx-generator-version.pptx' })
  .then(() => {
    console.log('\n✅ pptx-generator 版本 PPT 生成成功！');
    console.log('📄 文件路径：../output/pptx-generator-version.pptx');
  })
  .catch(err => {
    console.error('❌ 生成失败:', err);
  });
