const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/sundanian/.agents/skills/pptx/scripts/html2pptx');

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'ZCode';
  pptx.title = '让 Codex 长周期大项目不跑偏';
  pptx.subject = 'OpenAI 工程师分享的 5 个 AI 协作习惯深度解析';

  const slideDir = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-18-codex-long-running-tasks/slides';
  const outFile = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-18-codex-long-running-tasks/codex-long-running-tasks.pptx';

  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const htmlFile = `${slideDir}/slide${num}.html`;
    console.log(`Processing slide ${num}...`);
    await html2pptx(htmlFile, pptx);
  }

  await pptx.writeFile({ fileName: outFile });
  console.log(`Done: ${outFile}`);
}

build().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
