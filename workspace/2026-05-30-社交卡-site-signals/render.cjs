const { chromium } = require('playwright');
const { resolve } = require('path');

(async () => {
  const htmlPath = resolve(__dirname, 'index.html');
  const outDir = resolve(__dirname, 'output');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1500 } });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle', timeout: 30000 });

  const posters = await page.$$('.poster.xhs');
  console.log('Found ' + posters.length + ' XHS posters');

  for (let i = 0; i < posters.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const filename = 'xhs-' + num + '.png';
    await posters[i].screenshot({ path: resolve(outDir, filename), type: 'png' });
    console.log('Saved ' + filename);
  }

  await browser.close();
  console.log('Done');
})();
