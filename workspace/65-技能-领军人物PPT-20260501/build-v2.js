const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function build() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = '京东科技';
    pptx.title = '2026年度新客服节 新客服最佳实践奖';

    const slidesDir = path.join(__dirname, 'new-slides');

    for (let i = 1; i <= 11; i++) {
        const slideFile = `slide-${String(i).padStart(2, '0')}.html`;
        console.log(`Converting ${slideFile}...`);
        await html2pptx(path.join(slidesDir, slideFile), pptx);
    }

    const outputFile = path.join(__dirname, '京东科技-新客服节申报材料-v2.pptx');
    await pptx.writeFile({ fileName: outputFile });
    console.log(`Done! ${outputFile}`);
}

build().catch(console.error);
