const pptxgen = require('pptxgenjs');
const path = require('path');
const { C, T, CANVAS_W, CANVAS_H } = require('../slides/tokens');

const OUT = path.resolve(__dirname, '../output', 'judgment-and-ai-v2.pptx');
const SLIDES_DIR = path.resolve(__dirname, '../slides');

async function main() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = '判断力与AI协作 v2';
  pptx.author = 'From Dwarkesh × Grant Sanderson';

  for (let i = 1; i <= 12; i++) {
    const mod = require(path.join(SLIDES_DIR, 'slide' + i + '.js'));
    const slide = pptx.addSlide();
    slide.background = { color: C.paper };

    // — 全局 chrome：顶部细线 + 页码 —
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: 0.35, w: 0.6, h: 0.04,
      fill: { color: C.accent },
    });
    slide.addText(String(i).padStart(2, '0'), {
      x: 12.2, y: 7.0, w: 0.6, h: 0.4,
      fontSize: T.footer.size, fontFace: 'Helvetica Neue',
      color: C.mute, align: 'right',
    });

    await mod.build(slide, pptx, { C, T, CANVAS_W, CANVAS_H });
    delete require.cache[require.resolve(path.join(SLIDES_DIR, 'slide' + i + '.js'))];
  }

  await pptx.writeFile({ fileName: OUT });
  console.log('Saved:', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
