const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/pptx/scripts/html2pptx');
const path = require('path');

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Mino';
  pptx.title = '2026新客服节-服务营销最佳实践-申报PPT';

  const slideDir = path.join(__dirname, 'slides');
  for (let i = 1; i <= 12; i++) {
    const htmlFile = path.join(slideDir, `slide${i}.html`);
    console.log(`Processing slide ${i}...`);
    await html2pptx(htmlFile, pptx);
  }

  const outFile = path.join(__dirname, '2026新客服节-服务营销最佳实践-申报PPT-美化版.pptx');
  await pptx.writeFile({ fileName: outFile });
  console.log(`Done: ${outFile}`);
}

build().catch(e => { console.error(e); process.exit(1); });
