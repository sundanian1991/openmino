// compile.js - 编译所有幻灯片
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
const slide01 = require('./slide-01.js');
const slide02 = require('./slide-02.js');
const slide03 = require('./slide-03.js');
const slide04 = require('./slide-04.js');
const slide05 = require('./slide-05.js');
const slide06 = require('./slide-06.js');
const slide07 = require('./slide-07.js');
const slide08 = require('./slide-08.js');
const slide09 = require('./slide-09.js');
const slide10 = require('./slide-10.js');
const slide11 = require('./slide-11.js');
const slide12 = require('./slide-12.js');

// 依次创建幻灯片
slide01.createSlide(pres, theme);
slide02.createSlide(pres, theme);
slide03.createSlide(pres, theme);
slide04.createSlide(pres, theme);
slide05.createSlide(pres, theme);
slide06.createSlide(pres, theme);
slide07.createSlide(pres, theme);
slide08.createSlide(pres, theme);
slide09.createSlide(pres, theme);
slide10.createSlide(pres, theme);
slide11.createSlide(pres, theme);
slide12.createSlide(pres, theme);

// 输出文件
pres.writeFile({ fileName: './output/权责不对等 - 叙事结构.pptx' })
  .then(() => console.log('PPTX 文件生成成功！'))
  .catch(err => console.error('生成失败:', err));
