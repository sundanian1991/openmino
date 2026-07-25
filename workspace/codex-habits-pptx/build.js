const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require('/Users/sundanian/.agents/skills/pptx/scripts/html2pptx');

const slidesDir = path.join(__dirname, 'slides');
const slideFiles = [
  'slide01-title.html',
  'slide02-background.html',
  'slide03-architecture.html',
  'slide04-habit1.html',
  'slide05-habit2.html',
  'slide06-habit3.html',
  'slide07-habit4.html',
  'slide08-habit5.html',
  'slide09-usecases.html',
  'slide10-insights.html',
  'slide11-closing.html'
];

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'DimCode';
  pptx.title = '让Codex长周期大项目不跑偏 — 5个AI协作习惯深度解析';

  for (const file of slideFiles) {
    const htmlPath = path.join(slidesDir, file);
    try {
      await html2pptx(htmlPath, pptx);
      console.log(`✓ ${file}`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  const outPath = path.join(__dirname, 'Codex长周期项目协作5个习惯.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log(`\nDone → ${outPath}`);
}

createPresentation().catch(console.error);
