const pptxgen = require('pptxgenjs');
const path = require('path');

const OUT = path.resolve(__dirname, '../output', 'judgment-and-ai.pptx');
const SLIDES_DIR = path.resolve(__dirname, '../slides');
const ASSETS = path.resolve(__dirname, '../assets/images');

const COLOR = {
  bg:    'F4F1EA',
  title: '121212',
  body:  '2B2B2B',
  sub:   '77736C',
  line:  'D8D3CA',
  accent:'8A1538',
  white: 'FFFFFF',
};

async function main() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = '判断力与AI协作';
  pptx.author = 'Dwarkesh x Grant Sanderson';

  for (let i = 1; i <= 12; i++) {
    const slideFile = path.join(SLIDES_DIR, 'slide' + i + '.js');
    const mod = require(slideFile);
    const slide = pptx.addSlide();
    slide.background = { color: COLOR.bg };
    await mod.build(slide, pptx, COLOR, ASSETS);
    // 释放缓存
    delete require.cache[require.resolve(slideFile)];
  }

  await pptx.writeFile({ fileName: OUT });
  console.log('Saved:', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
