const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa');
const fs = require('fs');

const OUT = 'assets';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

async function icon(Comp, color, size, file) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: '#' + color, size })
  );
  await sharp(Buffer.from(svg)).png().toFile(OUT + '/' + file);
}

async function gradient(file, c1, c2, w = 1440, h = 810, angle = '100%') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="${angle}" y2="100%">
      <stop offset="0%" style="stop-color:#${c1}"/>
      <stop offset="100%" style="stop-color:#${c2}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OUT + '/' + file);
}

(async () => {
  const W = 'FFFFFF';
  const list = {
    'ic-data.png': Fa.FaChartLine,
    'ic-insight.png': Fa.FaLightbulb,
    'ic-strategy.png': Fa.FaChessKnight,
    'ic-action.png': Fa.FaBolt,
    'ic-feedback.png': Fa.FaSyncAlt,
    'ic-users.png': Fa.FaUsers,
    'ic-coach.png': Fa.FaChalkboardTeacher,
    'ic-compass.png': Fa.FaCompass,
    'ic-target.png': Fa.FaBullseye,
    'ic-layers.png': Fa.FaLayerGroup,
    'ic-warn.png': Fa.FaExclamationTriangle,
    'ic-check.png': Fa.FaCheckCircle,
    'ic-route.png': Fa.FaRoute,
    'ic-talk.png': Fa.FaComments,
    'ic-trophy.png': Fa.FaTrophy,
    'ic-flag.png': Fa.FaFlag,
    'ic-rocket.png': Fa.FaRocket,
    'ic-q.png': Fa.FaQuestionCircle,
    'ic-star.png': Fa.FaStar,
    'ic-hand.png': Fa.FaHandshake,
  };
  for (const [f, C] of Object.entries(list)) {
    await icon(C, W, 256, f);
  }
  await gradient('cover-bg.png', '1A2B47', '0C1424', 1440, 810, '120%');
  await gradient('end-bg.png', '15243D', '0C1424', 1440, 810, '100%');
  await gradient('band-gold.png', 'D4A24C', 'B57F28', 1440, 40, '100%');
  console.log('rasterized', Object.keys(list).length + 1, 'assets');
})();
