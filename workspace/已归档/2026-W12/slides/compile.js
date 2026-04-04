// compile.js - 李诞的AI养虾指南
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// 演示模式主题
const theme = {
  primary: "2D2D2D",    // 深灰文字
  secondary: "666666",  // 次要文字
  accent: "C4B5A3",     // 驼色强调
  light: "E5E5E5",      // 浅灰
  bg: "FAF9F6"          // 米白背景
};

// 导入所有幻灯片
const slideFiles = [
  './slide-01.js', // 封面
  './slide-02.js', // 目录
  './slide-03.js', // 养虾三要素
  './slide-04.js', // 写脚本技巧
  './slide-05.js', // 做判断与学习
  './slide-06.js', // 飞书妙搭实操
  './slide-07.js', // 产出案例
  './slide-08.js', // 行动清单
  './slide-09.js', // 核心洞察
];

slideFiles.forEach((file) => {
  const slideModule = require(file);
  slideModule.createSlide(pres, theme);
});

pres.writeFile({ fileName: './output/李诞的AI养虾指南.pptx' })
  .then(() => console.log('PPTX created: ./output/李诞的AI养虾指南.pptx'))
  .catch(err => console.error('Error:', err));
