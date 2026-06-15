const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2400, height: 1600 } });

  const htmlPath = path.resolve(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.waitForTimeout(2000);

  const targets = [
    ['#xhs-01', 'xhs-01-cover.png'],
    ['#xhs-02', 'xhs-02-overview.png'],
    ['#xhs-03', 'xhs-03-top3.png'],
    ['#xhs-04', 'xhs-04-ranking.png'],
    ['#xhs-05', 'xhs-05-pulse.png'],
    ['#xhs-06', 'xhs-06-insight.png'],
    ['#xhs-07', 'xhs-07-closing.png'],
    ['#wechat-21x9', 'wechat-21x9-cover.png'],
    ['#wechat-1x1', 'wechat-1x1-cover.png'],
    ['#wechat-pair-preview', 'wechat-cover-pair-preview.png'],
  ];

  const outputDir = path.resolve(__dirname, 'output');

  for (const [selector, filename] of targets) {
    const el = await page.$(selector);
    if (!el) {
      console.error(`Selector not found: ${selector}`);
      continue;
    }
    await el.screenshot({ path: path.join(outputDir, filename), type: 'png' });
    console.log(`Rendered: ${filename}`);
  }

  await browser.close();
  console.log('All done.');
})();
