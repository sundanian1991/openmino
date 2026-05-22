const sharp = require('sharp');
const path = require('path');
const dir = path.join(__dirname, 'assets');

async function createGradient(filename, c1, c2, angle = '135') {
  const w = 1440, h = 810;
  let gradDef;
  if (angle === '135') {
    gradDef = `<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">`;
  } else if (angle === '0') {
    gradDef = `<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">`;
  } else {
    gradDef = `<linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>${gradDef}<stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

async function createCircle(filename, color, size = 200) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" opacity="0.15"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

async function createDecoLine(filename, w, h, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${color}" rx="2"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

async function createDiamond(filename, color, size = 20) {
  const half = size / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <polygon points="${half},0 ${size},${half} ${half},${size} 0,${half}" fill="${color}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

async function createArrow(filename, color, w = 60, h = 30) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <polygon points="0,0 ${w-15},${h/2} 0,${h}" fill="${color}" opacity="0.8"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

async function createNumberCircle(filename, num, bgColor, textColor = '#FFFFFF') {
  const size = 64;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="${bgColor}" />
    <text x="${size/2}" y="${size/2+7}" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold" fill="${textColor}">${num}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, filename));
}

(async () => {
  // Backgrounds
  await createGradient('bg-title.png', '#0B1929', '#152842', '135');
  await createGradient('bg-content.png', '#0D1B2E', '#162640', '90');
  await createGradient('bg-toc.png', '#0B1929', '#142238', '135');
  await createGradient('bg-end.png', '#0A1628', '#1A2942', '135');

  // Accent line
  await createDecoLine('gold-line.png', 80, 4, '#C9A96E');
  await createDecoLine('blue-line.png', 80, 4, '#3B82F6');
  await createDecoLine('gold-line-long.png', 600, 3, '#C9A96E');
  await createDecoLine('blue-line-short.png', 40, 3, '#3B82F6');

  // Decorative circles
  await createCircle('circle-gold.png', '#C9A96E', 300);
  await createCircle('circle-blue.png', '#3B82F6', 400);

  // Diamonds
  await createDiamond('diamond-gold.png', '#C9A96E', 16);
  await createDiamond('diamond-blue.png', '#3B82F6', 12);

  // Number circles for slides 1-8
  for (let i = 1; i <= 8; i++) {
    await createNumberCircle(`num-${i}.png`, i, '#C9A96E');
  }

  // Arrows for flow
  await createArrow('arrow-right.png', '#C9A96E', 40, 20);
  await createArrow('arrow-down.png', '#3B82F6', 20, 40);

  console.log('All assets generated.');
})();
