// swim-compile.js - 编译游泳主题幻灯片
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();

// 设置 16:9 布局
pres.layout = 'LAYOUT_16x9';

// 克制专业主义主题 - 黑白灰基色 + 陶土色点缀
const theme = {
  primary: "1A1A1A",    // 主文字/标题
  secondary: "666666",  // 辅助文字
  accent: "E2725B",     // 陶土色强调
  light: "999999",      // 浅灰/边框
  bg: "FAFAFA"          // 背景
};

// 导入所有幻灯片模块
const slide01 = require('./swim-01-cover.js');
const slide02 = require('./swim-02-goals.js');
const slide03 = require('./swim-03-safety.js');
const slide04 = require('./swim-04-equipment.js');
const slide05 = require('./swim-05-training.js');
const slide06 = require('./swim-06-mistakes.js');
const slide07 = require('./swim-07-summary.js');

// 依次创建幻灯片
slide01.createSlide(pres, theme);
slide02.createSlide(pres, theme);
slide03.createSlide(pres, theme);
slide04.createSlide(pres, theme);
slide05.createSlide(pres, theme);
slide06.createSlide(pres, theme);
slide07.createSlide(pres, theme);

// 输出文件
pres.writeFile({ fileName: '../output/一天学会游泳 - 蛙泳速成训练.pptx' })
  .then(() => console.log('PPTX 文件生成成功！'))
  .catch(err => console.error('生成失败:', err));
