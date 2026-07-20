#!/usr/bin/env node
/**
 * Export dashi-ppt to PDF v5: screenshot each slide while it's active
 */
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

const outputFile = process.argv[2] || path.join(__dirname, '数据驱动运营与人才分层辅导.pdf');
const url = `http://localhost:8765/index.html`;

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`  [ERR] ${msg.text()}`);
  });

  console.log(`Opening ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(5000);

  const slideCount = await page.evaluate(() =>
    document.querySelectorAll('#deck > section.slide').length
  );
  console.log(`Found ${slideCount} slides`);

  // Hide UI
  await page.evaluate(() => {
    ['slide-rail', 'preview-panel', 'deck-page-pager', 'nav', 'preview-panel-collapse'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    document.querySelectorAll('.pp-topbar').forEach(el => el.style.display = 'none');
    const vp = document.querySelector('#deck-viewport');
    if (vp) { vp.style.overflow = 'visible'; vp.style.position = 'static'; vp.style.height = 'auto'; }
    document.body.style.overflow = 'visible';
  });

  // First pass: navigate through all slides to trigger React rendering
  console.log('Pre-rendering all slides...');
  for (let i = 0; i < slideCount - 1; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);
  }
  // Go back to start
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);

  // Second pass: screenshot each slide while it's active
  const screenshots = [];
  const tmpDir = path.join(__dirname, '.pdf-tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  for (let i = 0; i < slideCount; i++) {
    // If not on first slide, navigate forward
    if (i > 0) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1200); // longer wait for React to render
    }

    // Verify this slide has content
    const hasContent = await page.evaluate(() => {
      const active = document.querySelector('#deck > section.slide.active');
      if (!active) return false;
      const root = active.querySelector('.imported-theme-root');
      return root && root.innerHTML.length > 100;
    });

    if (!hasContent) {
      console.log(`  Slide ${i+1}: waiting for render...`);
      await page.waitForTimeout(2000);
    }

    // Screenshot the active slide
    const slideEl = await page.$('#deck > section.slide.active');
    if (!slideEl) {
      console.log(`  WARN: No active slide ${i+1}`);
      continue;
    }

    const ssPath = path.join(tmpDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    await slideEl.screenshot({ path: ssPath, type: 'png' });
    const ssSize = fs.statSync(ssPath).size;
    console.log(`  Slide ${i+1}: ${(ssSize/1024).toFixed(0)} KB`);
    screenshots.push(ssPath);
  }

  // Build PDF
  console.log('Building PDF...');
  const pdfDoc = await PDFDocument.create();
  for (const ssPath of screenshots) {
    const img = await pdfDoc.embedPng(fs.readFileSync(ssPath));
    const pg = pdfDoc.addPage([1920, 1080]);
    pg.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
  }
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFile, pdfBytes);
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`Done! ${outputFile} (${(pdfBytes.length/1024/1024).toFixed(1)} MB, ${screenshots.length} pages)`);
  await browser.close();
})();
