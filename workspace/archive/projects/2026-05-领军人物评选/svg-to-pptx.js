/**
 * Direct SVG to PPTX conversion using PptxGenJS (regex-based, no XML dependency)
 * SVG canvas: 1280x720 → PPTX: 10" x 5.625" (16:9)
 */

const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const SVG_W = 1280;
const PPT_W = 10;
const PPT_H = 5.625;

function svgToInches(val) {
  return parseFloat(val) * (PPT_W / SVG_W);
}
function svgFontSize(val) {
  return parseFloat(val) * 1.0;
}
function svgLineStroke(val) {
  // SVG stroke-width to PPTX points: 0.5→0.5pt, 1→0.75pt, 2→1.5pt, 3→2.25pt
  const pt = parseFloat(val);
  const pptPt = pt <= 0.5 ? 0.5 : pt * 0.75;
  return pptPt / 72; // convert pt to inches
}

function resolveColor(fill) {
  if (!fill) return '1A1A1A';
  fill = fill.trim();
  if (fill === 'var(--brand-primary)') return '1677FF';
  if (fill === 'var(--brand-near-black)') return '1A1A1A';
  if (fill === 'var(--brand-gray)') return '888888';
  if (fill === 'var(--brand-light-bg)') return 'F5F5F5';
  if (fill === 'var(--brand-border)') return 'E2E2E2';
  if (fill.startsWith('#')) return fill.slice(1);
  return fill;
}

function mapFontFamily(family) {
  if (!family) return 'Arial';
  const f = family.split(',')[0].trim().replace(/['"]/g, '');
  if (f.includes('YaHei') || f.includes('Microsoft')) return 'Arial';
  if (f.includes('Songti') || f.includes('SimSun') || f.includes('SimHei')) return 'Georgia';
  return 'Arial';
}

function getAttr(str, attr) {
  const regex = new RegExp(attr + '="([^"]*)"');
  const match = regex.exec(str);
  return match ? match[1] : null;
}

function parseSVG(svgContent) {
  const texts = [];
  const rects = [];
  const lines = [];

  // Parse text elements
  const textRegex = /<text\s+([^>]*)>([\s\S]*?)<\/text>/g;
  let match;
  while ((match = textRegex.exec(svgContent)) !== null) {
    const attrs = match[1];
    let text = match[2].trim();

    const x = getAttr(attrs, 'x');
    const y = getAttr(attrs, 'y');
    if (!x || !y || !text) continue;

    const anchor = getAttr(attrs, 'text-anchor');
    const family = getAttr(attrs, 'font-family');
    const size = getAttr(attrs, 'font-size');
    const weight = getAttr(attrs, 'font-weight');
    const fillAttr = getAttr(attrs, 'fill');

    texts.push({
      x: svgToInches(x),
      y: svgToInches(y),
      anchor,
      family: mapFontFamily(family),
      size: svgFontSize(size || '14'),
      bold: weight === 'bold',
      fill: resolveColor(fillAttr || '#1A1A1A'),
      text,
    });
  }

  // Parse rect elements
  const rectRegex = /<rect\s+([^>]*)\/?>/g;
  while ((match = rectRegex.exec(svgContent)) !== null) {
    const attrs = match[1];
    const x = getAttr(attrs, 'x');
    const y = getAttr(attrs, 'y');
    const w = getAttr(attrs, 'width');
    const h = getAttr(attrs, 'height');
    const fill = getAttr(attrs, 'fill');
    const rx = getAttr(attrs, 'rx');

    if (!x || !y || !w || !h) continue;

    rects.push({
      x: svgToInches(x),
      y: svgToInches(y),
      w: svgToInches(w),
      h: svgToInches(h),
      fill: resolveColor(fill || '#FFFFFF'),
      rx: rx ? svgToInches(rx) : 0,
    });
  }

  // Parse line elements
  const lineRegex = /<line\s+([^>]*)\/?>/g;
  while ((match = lineRegex.exec(svgContent)) !== null) {
    const attrs = match[1];
    const x1 = getAttr(attrs, 'x1');
    const y1 = getAttr(attrs, 'y1');
    const x2 = getAttr(attrs, 'x2');
    const y2 = getAttr(attrs, 'y2');
    const stroke = getAttr(attrs, 'stroke');
    const strokeWidth = getAttr(attrs, 'stroke-width');

    if (!x1 || !y1 || !x2 || !y2) continue;

    lines.push({
      x1: svgToInches(x1),
      y1: svgToInches(y1),
      x2: svgToInches(x2),
      y2: svgToInches(y2),
      stroke: resolveColor(stroke || '#E2E2E2'),
      swIn: svgLineStroke(strokeWidth || '1'),
    });
  }

  return { texts, rects, lines };
}

async function createPPTX() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title = '2026年度新客服最佳实践奖评选申报';
  pres.author = '京东科技';

  for (let i = 1; i <= 12; i++) {
    const svgFile = path.join(SLIDES_DIR, `slide_${String(i).padStart(2, '0')}.svg`);
    if (!fs.existsSync(svgFile)) {
      console.log(`Skipping ${svgFile} - not found`);
      continue;
    }

    const svgContent = fs.readFileSync(svgFile, 'utf-8');
    const { texts, rects, lines } = parseSVG(svgContent);

    const slide = pres.addSlide();

    // Find and set background
    const bgRect = rects.find(r => r.w >= 9.9 && r.h >= 5.5);
    if (bgRect) {
      slide.background = { color: bgRect.fill };
    }

    // Add shapes
    for (const r of rects) {
      if (r.w >= 9.9 && r.h >= 5.5) continue; // skip background
      if (r.w >= 9.9 && r.h < 0.05) continue; // skip chrome brand line

      const shapeType = r.rx > 0 ? pres.ShapeType.roundRect : pres.ShapeType.rect;
      const shapeOpts = {
        x: r.x, y: r.y, w: r.w, h: r.h,
        fill: { color: r.fill },
      };
      if (r.rx > 0) {
        shapeOpts.rectRadius = Math.min(1, r.rx / Math.min(r.w, r.h));
      }
      slide.addShape(shapeType, shapeOpts);
    }

    // Add lines
    for (const l of lines) {
      const dx = l.x2 - l.x1;
      const dy = l.y2 - l.y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length < 0.05) continue;

      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      if (Math.abs(angle) < 1 || Math.abs(angle) > 179) {
        slide.addShape(pres.ShapeType.rect, {
          x: l.x1, y: l.y1 - l.swIn / 2,
          w: length, h: l.swIn,
          fill: { color: l.stroke },
        });
      } else if (Math.abs(Math.abs(angle) - 90) < 1) {
        slide.addShape(pres.ShapeType.rect, {
          x: l.x1 - l.swIn / 2, y: l.y1,
          w: l.swIn, h: length,
          fill: { color: l.stroke },
        });
      } else {
        slide.addShape(pres.ShapeType.line, {
          x: l.x1, y: l.y1, w: dx, h: dy,
          line: { color: l.stroke, width: l.swIn * 72 },
        });
      }
    }

    // Add text
    for (const t of texts) {
      let xPos = t.x;
      let align = 'left';
      let textW = PPT_W - xPos - 0.2; // generous width: from x position to right margin

      if (t.anchor === 'middle') {
        align = 'center';
        textW = Math.min(PPT_W - 0.4, Math.max(2, t.text.length * (t.size / 72) * 1.0));
        xPos = t.x - textW / 2;
      } else if (t.anchor === 'end') {
        align = 'right';
        textW = Math.min(PPT_W - 0.4, Math.max(2, t.text.length * (t.size / 72) * 1.0));
        xPos = t.x - textW;
      }

      xPos = Math.max(0, xPos);
      const yPos = t.y - t.size / 72;

      // Allow generous height for text wrapping (multi-line body text)
      const boxHeight = Math.min(t.size / 72 * 3.5, PPT_H - yPos - 0.05);
      const isShortLabel = t.text.length <= 15;

      slide.addText(t.text, {
        x: xPos, y: yPos, w: textW, h: isShortLabel ? t.size / 72 * 1.3 : boxHeight,
        fontSize: t.size, fontFace: t.family,
        color: t.fill, bold: t.bold,
        align, valign: 'top', margin: 0,
      });
    }

    console.log(`Slide ${i}: ${texts.length} text, ${rects.length} rects, ${lines.length} lines`);
  }

  const outputFile = path.join(__dirname, '2026年度新客服最佳实践奖评选申报.pptx');
  await pres.writeFile({ fileName: outputFile });
  console.log(`\nPPTX saved: ${outputFile}`);
}

createPPTX().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
