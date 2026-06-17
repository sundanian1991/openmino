// Auto-generated component data for review page
// Total: 298 components
// Generated: 2026-06-02

const COMPONENTS = [
  {
    id: 1,
    name: "Reveal Hero",
    source: "volvo-heritage.html",
    category: "hero",
    css: ".hero-reveal{min-height:100vh;background:#2C2C2C;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:120px;position:relative;overflow:hidden}\n.hero-reveal__bars{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}\n.hero-reveal__bars span{display:block;height:1px;background:rgba(255,255,255,0.02);margin-bottom:40px}\n.hero-reveal__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.15);margin-bottom:16px;position:relative;z-index:2}\n.hero-reveal__title{font-family:Georgia,'Times New Roman',serif;font-size:clamp(3rem,7vw,6rem);line-height:0.93;letter-spacing:-3px;font-weight:300;color:#fff;max-width:700px;position:relative;z-index:2}\n.hero-reveal__title strong{font-weight:700;color:rgba(74,93,58,0.6)}\n.hero-reveal__sub{font-size:15px;color:rgba(255,255,255,0.3);max-width:480px;margin-top:24px;line-height:1.7;position:relative;z-index:2}\n.hero-reveal__badge{position:absolute;right:120px;bottom:120px;z-index:2;font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.08);text-align:right;line-height:1.6}\n.hero-reveal__badge strong{display:block;font-size:14px;color:rgba(255,255,255,0.15);letter-spacing:3px}",
    html: "<section class=\"hero-reveal\">\n  <div class=\"hero-reveal__bars\">\n    <span></span><span></span><span></span><span></span><span></span>\n    <span></span><span></span><span></span><span></span><span></span>\n  </div>\n  <div class=\"hero-reveal__tag\">Stockholm Design Lab · Volvo Cars</div>\n  <h1 class=\"hero-reveal__title\">\n    Designed around<br><strong>you.</strong> Since 1927.\n  </h1>\n  <p class=\"hero-reveal__sub\">Scandinavian engineering. Uncompromising safety. A commitment to people and the planet.</p>\n  <div class=\"hero-reveal__badge\">\n    <strong>EST. 1927</strong>\n    Gothenburg · Sweden\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 2,
    name: "Grille Grid (4-Col Category)",
    source: "volvo-heritage.html",
    category: "section",
    css: ".grille-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:60px;border-top:2px solid #2C2C2C}\n.grille-item{padding:40px 32px;border-left:1px solid #E5E5E0;min-height:200px;display:flex;flex-direction:column;justify-content:flex-end;transition:background 0.2s}\n.grille-item:first-child{border-left:none}\n.grille-item:hover{background:#F5F5F0}\n.grille-item__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#A0A0A0;margin-bottom:8px}\n.grille-item__name{font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:300;color:#2C2C2C;letter-spacing:-0.5px;margin-bottom:4px}\n.grille-item__desc{font-size:13px;color:#6B6B6B;line-height:1.5}\n.grille-item.active{background:#2C2C2C;color:#fff}\n.grille-item.active .grille-item__tag{color:rgba(255,255,255,0.3)}\n.grille-item.active .grille-item__name{color:#fff}\n.grille-item.active .grille-item__desc{color:rgba(255,255,255,0.4)}",
    html: "<div class=\"grille-grid\">\n  <div class=\"grille-item active\">\n    <span class=\"grille-item__tag\">SUV</span>\n    <div class=\"grille-item__name\">XC Series</div>\n    <p class=\"grille-item__desc\">Versatility meets capability. The Scandinavian SUV.</p>\n  </div>\n  <div class=\"grille-item\">\n    <span class=\"grille-item__tag\">Sedan</span>\n    <div class=\"grille-item__name\">S Series</div>\n    <p class=\"grille-item__desc\">Elegance in motion. Refined, confident, precise.</p>\n  </div>\n  <div class=\"grille-item\">\n    <span class=\"grille-item__tag\">Wagon</span>\n    <div class=\"grille-item__name\">V Series</div>\n    <p class=\"grille-item__desc\">The iconic Swedish estate. Form meets function.</p>\n  </div>\n  <div class=\"grille-item\">\n    <span class=\"grille-item__tag\">Electric</span>\n    <div class=\"grille-item__name\">EX / EM</div>\n    <p class=\"grille-item__desc\">Fully electric. The future of Scandinavian mobility.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 3,
    name: "Safety Cards (2x2 Grid)",
    source: "volvo-heritage.html",
    category: "section",
    css: ".safety-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:60px;background:#E5E5E0}\n.safety-card{background:#FFFFFF;padding:60px 48px;position:relative;overflow:hidden;transition:background 0.2s}\n.safety-card:hover{background:#F5F5F0}\n.safety-card__yr{font-family:'JetBrains Mono','SF Mono',monospace;font-size:48px;font-weight:600;line-height:0.85;color:#2C2C2C;opacity:0.04;letter-spacing:-2px;margin-bottom:16px;position:absolute;top:24px;right:24px}\n.safety-card__icon{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#E55B2B;margin-bottom:16px}\n.safety-card__name{font-size:22px;font-weight:500;color:#2C2C2C;margin-bottom:8px;letter-spacing:-0.3px}\n.safety-card__desc{font-size:13px;color:#6B6B6B;line-height:1.7;max-width:400px}",
    html: "<div class=\"safety-grid\">\n  <div class=\"safety-card\">\n    <div class=\"safety-card__yr\">1959</div>\n    <div class=\"safety-card__icon\">Seatbelt</div>\n    <div class=\"safety-card__name\">Three-point Belt</div>\n    <p class=\"safety-card__desc\">Nils Bohlin's invention — the single most important safety device in automotive history. Volvo made the patent freely available.</p>\n  </div>\n  <div class=\"safety-card\">\n    <div class=\"safety-card__yr\">1998</div>\n    <div class=\"safety-card__icon\">Whiplash</div>\n    <div class=\"safety-card__name\">WHIPS System</div>\n    <p class=\"safety-card__desc\">Whiplash Protection System — reducing neck injury risk by 50% in rear-end collisions.</p>\n  </div>\n  <div class=\"safety-card\">\n    <div class=\"safety-card__yr\">2014</div>\n    <div class=\"safety-card__icon\">Technology</div>\n    <div class=\"safety-card__name\">City Safety</div>\n    <p class=\"safety-card__desc\">Standard auto-brake technology. Detects pedestrians, cyclists, and large animals.</p>\n  </div>\n  <div class=\"safety-card\">\n    <div class=\"safety-card__yr\">2026</div>\n    <div class=\"safety-card__icon\">Vision</div>\n    <div class=\"safety-card__name\">Zero Collisions</div>\n    <p class=\"safety-card__desc\">The long-term vision — no one should be killed or seriously injured in a new Volvo.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 4,
    name: "Material Swatches (3-Col)",
    source: "volvo-heritage.html",
    category: "detail",
    css: ".material-row{display:grid;grid-template-columns:repeat(3,1fr);gap:60px;margin-top:60px}\n.mat{padding:0;border-top:1px solid #E5E5E0;padding-top:24px}\n.mat__swatch{width:100%;height:100px;margin-bottom:20px;position:relative}\n.mat__swatch--w{background:#F5F5F0;background-image:repeating-linear-gradient(0deg,transparent,transparent 20px,#E5E5E0 20px,#E5E5E0 21px)}\n.mat__swatch--c{background:#8B7355;background-image:repeating-linear-gradient(90deg,transparent,transparent 15px,rgba(0,0,0,0.05) 15px,rgba(0,0,0,0.05) 16px)}\n.mat__swatch--m{background:#2C2C2C;background-image:radial-gradient(circle at 10px 10px,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:20px 20px}\n.mat__name{font-family:'JetBrains Mono','SF Mono',monospace;font-size:13px;font-weight:600;color:#2C2C2C;margin-bottom:2px;letter-spacing:0.5px;text-transform:uppercase}\n.mat__code{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;color:#A0A0A0;margin-bottom:12px;letter-spacing:1px}\n.mat__desc{font-size:13px;color:#6B6B6B;line-height:1.6}",
    html: "<div class=\"material-row\">\n  <div class=\"mat\">\n    <div class=\"mat__swatch mat__swatch--w\"></div>\n    <div class=\"mat__name\">Wool Blend</div>\n    <div class=\"mat__code\">V-102 · 100% Recycled</div>\n    <p class=\"mat__desc\">Responsibly sourced wool from Nordic farms. Warmth, breathability, and timeless texture.</p>\n  </div>\n  <div class=\"mat\">\n    <div class=\"mat__swatch mat__swatch--c\"></div>\n    <div class=\"mat__name\">Leather Alternative</div>\n    <div class=\"mat__code\">V-208 · Nordico</div>\n    <p class=\"mat__desc\">Forest-based sustainable material. Soft, durable, and entirely animal-free.</p>\n  </div>\n  <div class=\"mat\">\n    <div class=\"mat__swatch mat__swatch--m\"></div>\n    <div class=\"mat__name\">Open-pore Wood</div>\n    <div class=\"mat__code\">V-305 · FSC Certified</div>\n    <p class=\"mat__desc\">Thin veneer layers from FSC-certified forests. Each panel is unique.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 5,
    name: "Perf Strip (4-Col Metrics)",
    source: "volvo-heritage.html",
    category: "chart",
    css: ".perf-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:60px;background:rgba(255,255,255,0.06)}\n.perf-cell{padding:48px 32px;background:#2A4A5A;text-align:center;transition:background 0.2s}\n.perf-cell:hover{background:rgba(255,255,255,0.03)}\n.perf-cell__num{font-family:'JetBrains Mono','SF Mono',monospace;font-size:40px;font-weight:600;line-height:1;color:#fff;letter-spacing:-2px;margin-bottom:4px}\n.perf-cell__label{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:8px}\n.perf-cell__desc{font-size:12px;color:rgba(255,255,255,0.3);line-height:1.5}",
    html: "<div class=\"perf-strip\">\n  <div class=\"perf-cell\">\n    <div class=\"perf-cell__num\">600</div>\n    <div class=\"perf-cell__label\">Range (km)</div>\n    <div class=\"perf-cell__desc\">EX90 — fully electric, real-world range</div>\n  </div>\n  <div class=\"perf-cell\">\n    <div class=\"perf-cell__num\">4.9</div>\n    <div class=\"perf-cell__label\">0–100 km/h</div>\n    <div class=\"perf-cell__desc\">Polestar Engineered — dual motor performance</div>\n  </div>\n  <div class=\"perf-cell\">\n    <div class=\"perf-cell__num\">5</div>\n    <div class=\"perf-cell__label\">Euro NCAP</div>\n    <div class=\"perf-cell__desc\">Maximum safety rating — all models</div>\n  </div>\n  <div class=\"perf-cell\">\n    <div class=\"perf-cell__num\">50</div>\n    <div class=\"perf-cell__label\">% Reduction</div>\n    <div class=\"perf-cell__desc\">CO2 per car by 2030 — climate roadmap</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 6,
    name: "Legacy Track (Timeline)",
    source: "volvo-heritage.html",
    category: "section",
    css: ".legacy-track{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:60px;border-top:2px solid #2C2C2C}\n.legacy-item{padding:40px 32px;border-left:1px solid #E5E5E0;position:relative}\n.legacy-item:first-child{border-left:none}\n.legacy-item__yr{font-family:'JetBrains Mono','SF Mono',monospace;font-size:36px;font-weight:600;line-height:1;color:#2C2C2C;letter-spacing:-1.5px;margin-bottom:8px}\n.legacy-item__ev{font-size:13px;color:#6B6B6B;line-height:1.6;margin-bottom:16px}\n.legacy-item__tag{display:inline-block;font-family:'JetBrains Mono','SF Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:3px 10px;border:1px solid #E5E5E0;color:#A0A0A0}\n.legacy-item.active .legacy-item__tag{border-color:#E55B2B;color:#E55B2B}",
    html: "<div class=\"legacy-track\">\n  <div class=\"legacy-item active\">\n    <div class=\"legacy-item__yr\">1927</div>\n    <p class=\"legacy-item__ev\">First car — ÖV4, \"Jakob\". 28 hp, open top, Swedish engineering born.</p>\n    <span class=\"legacy-item__tag\">Founded</span>\n  </div>\n  <div class=\"legacy-item\">\n    <div class=\"legacy-item__yr\">1959</div>\n    <p class=\"legacy-item__ev\">Three-point seatbelt invented. Volvo opens the patent — saves millions of lives.</p>\n    <span class=\"legacy-item__tag\">Innovation</span>\n  </div>\n  <div class=\"legacy-item\">\n    <div class=\"legacy-item__yr\">2010</div>\n    <p class=\"legacy-item__ev\">Geely acquisition. Independent brand identity renewed. Design-led transformation.</p>\n    <span class=\"legacy-item__tag\">Rebirth</span>\n  </div>\n  <div class=\"legacy-item\">\n    <div class=\"legacy-item__yr\">2030</div>\n    <p class=\"legacy-item__ev\">Fully electric lineup. Climate neutral. The most ambitious plan in automotive.</p>\n    <span class=\"legacy-item__tag\">Future</span>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 7,
    name: "Sustainability Metrics (3-Col)",
    source: "volvo-heritage.html",
    category: "section",
    css: ".sustain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:60px;margin-top:60px}\n.sus-item{text-align:center}\n.sus-item__num{font-family:'JetBrains Mono','SF Mono',monospace;font-size:56px;font-weight:600;line-height:1;color:#4A5D3A;letter-spacing:-3px;margin-bottom:8px}\n.sus-item__label{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px}\n.sus-item__desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;max-width:280px;margin:0 auto}",
    html: "<div class=\"sustain-grid\">\n  <div class=\"sus-item\">\n    <div class=\"sus-item__num\">50%</div>\n    <div class=\"sus-item__label\">CO2 Reduction</div>\n    <p class=\"sus-item__desc\">Per car by 2030 — from production to end-of-life.</p>\n  </div>\n  <div class=\"sus-item\">\n    <div class=\"sus-item__num\">25%</div>\n    <div class=\"sus-item__label\">Recycled Content</div>\n    <p class=\"sus-item__desc\">Target for all new models. Circular material economy.</p>\n  </div>\n  <div class=\"sus-item\">\n    <div class=\"sus-item__num\">100%</div>\n    <div class=\"sus-item__label\">Electric</div>\n    <p class=\"sus-item__desc\">Fully electric lineup by 2030. Pure electric mobility.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 8,
    name: "Activity Rings Hero (SVG Rings)",
    source: "apple-activity-rings.html",
    category: "hero",
    css: ".rh{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:16px}\n.rh__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#606060;margin-bottom:12px}\n.rh__g{display:flex;gap:12px;align-items:center;justify-content:center;margin-bottom:12px}\n.rh__ring{width:140px;height:140px;position:relative}\n.rh__ring svg{width:100%;height:100%}\n.rh__ring circle{fill:none;transform:rotate(-90deg);transform-origin:50% 50%}\n.rh__ring .bg{stroke:rgba(255,255,255,.04)}\n.rh__v{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'JetBrains Mono','SF Mono',monospace;font-size:36px;font-weight:600;color:#F0F0F0;letter-spacing:-1px}\n.rh__l{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',monospace;font-size:9px;color:#606060;text-transform:uppercase;letter-spacing:2px}\n.rh__h{font-family:Georgia,'Times New Roman',serif;font-size:clamp(2rem,4vw,3rem);font-weight:300;color:#F0F0F0;margin-bottom:12px;letter-spacing:-1px}\n.rh__h strong{font-weight:700}\n.rh__d{font-size:15px;color:#888888;max-width:360px;line-height:1.6}",
    html: "<section class=\"rh\">\n  <div class=\"rh__tag\">Iconic Data Viz · Three Rings</div>\n  <div class=\"rh__g\">\n    <div class=\"rh__ring\">\n      <svg viewBox=\"0 0 140 140\">\n        <circle class=\"bg\" r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\"/>\n        <circle r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\" stroke=\"#E55B2B\" stroke-dasharray=\"377\" stroke-dashoffset=\"75\"/>\n      </svg>\n      <div class=\"rh__v\">520</div>\n      <div class=\"rh__l\">Move</div>\n    </div>\n    <div class=\"rh__ring\">\n      <svg viewBox=\"0 0 140 140\">\n        <circle class=\"bg\" r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\"/>\n        <circle r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\" stroke=\"#4A5D3A\" stroke-dasharray=\"377\" stroke-dashoffset=\"113\"/>\n      </svg>\n      <div class=\"rh__v\">42</div>\n      <div class=\"rh__l\">Exercise</div>\n    </div>\n    <div class=\"rh__ring\">\n      <svg viewBox=\"0 0 140 140\">\n        <circle class=\"bg\" r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\"/>\n        <circle r=\"60\" cx=\"70\" cy=\"70\" stroke-width=\"8\" stroke=\"#2A4A5A\" stroke-dasharray=\"377\" stroke-dashoffset=\"38\"/>\n      </svg>\n      <div class=\"rh__v\">10</div>\n      <div class=\"rh__l\">Stand</div>\n    </div>\n  </div>\n  <h1 class=\"rh__h\">Close your <strong>rings.</strong></h1>\n  <p class=\"rh__d\">Three circles. One brand. The most minimal data visualization in the world — instantly recognizable at any size.</p>\n</section>",
    hasJS: false
  },
  {
    id: 9,
    name: "Activity Stats Grid",
    source: "apple-activity-rings.html",
    category: "chart",
    css: ".sg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#3A3A3A;margin-top:8px}\n.si{background:#1A1A1A;padding:16px 12px;text-align:center}\n.si__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:64px;font-weight:600;line-height:1;color:#F0F0F0;letter-spacing:-2px;margin-bottom:4px}\n.si__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#606060;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}\n.si__b{height:3px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden;max-width:120px;margin:0 auto}\n.si__f{height:100%;border-radius:2px}",
    html: "<div class=\"sg\">\n  <div class=\"si\"><div class=\"si__n\">520</div><div class=\"si__l\">Move / 600</div><div class=\"si__b\"><div class=\"si__f\" style=\"width:87%;background:#E55B2B\"></div></div></div>\n  <div class=\"si\"><div class=\"si__n\">42</div><div class=\"si__l\">Exercise / 60</div><div class=\"si__b\"><div class=\"si__f\" style=\"width:70%;background:#4A5D3A\"></div></div></div>\n  <div class=\"si\"><div class=\"si__n\">10</div><div class=\"si__l\">Stand / 12</div><div class=\"si__b\"><div class=\"si__f\" style=\"width:83%;background:#2A4A5A\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 10,
    name: "Weekly Trend Bar Chart",
    source: "apple-activity-rings.html",
    category: "chart",
    css: ".wt{padding:32px 16px;background:#2C2C2C}\n.wt__h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}\n.wt__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#606060;text-transform:uppercase;letter-spacing:.06em}\n.wt__v{font-family:'JetBrains Mono','SF Mono',monospace;font-size:13px;color:#888888}\n.wt__g{display:flex;gap:4px;align-items:flex-end;height:100px}\n.wt__g div{flex:1;border-radius:3px 3px 0 0;transition:height .3s cubic-bezier(.16,1,.3,1);min-height:8px;position:relative}\n.wt__g .m{background:#E55B2B;opacity:.8}.wt__g .e{background:#4A5D3A;opacity:.8}.wt__g .s{background:#2A4A5A;opacity:.8}\n.wt__lb{display:flex;gap:4px;margin-top:4px}\n.wt__lb span{flex:1;font-family:'JetBrains Mono','SF Mono',monospace;font-size:8px;color:#606060;text-transform:uppercase;text-align:center;letter-spacing:1px}",
    html: "<section class=\"wt\">\n  <div class=\"wt__h\"><span class=\"wt__l\">This Week</span><span class=\"wt__v\">▲ 12% vs last week</span></div>\n  <div class=\"wt__g\">\n    <div class=\"m\" style=\"height:45%\"></div><div class=\"m\" style=\"height:62%\"></div><div class=\"m\" style=\"height:38%\"></div><div class=\"m\" style=\"height:78%\"></div><div class=\"m\" style=\"height:55%\"></div><div class=\"m\" style=\"height:90%\"></div><div class=\"m\" style=\"height:42%\"></div>\n  </div>\n  <div class=\"wt__lb\"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>\n</section>",
    hasJS: false
  },
  {
    id: 11,
    name: "Achievement Circles",
    source: "apple-activity-rings.html",
    category: "detail",
    css: ".ach{padding:32px 16px}\n.ach__g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}\n.ach__i{text-align:center;padding:12px;border:1px solid #3A3A3A;border-radius:8px;transition:all .2s}\n.ach__i:hover{border-color:#606060}\n.ach__c{width:40px;height:40px;margin:0 auto 6px;display:flex;align-items:center;justify-content:center}\n.ach__c svg{width:100%;height:100%}\n.ach__c circle{fill:none;transform:rotate(-90deg);transform-origin:50% 50%}\n.ach__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:18px;font-weight:600;color:#F0F0F0;margin-bottom:2px}\n.ach__d{font-size:13px;color:#888888;line-height:1.5}",
    html: "<div class=\"ach__g\">\n  <div class=\"ach__i\">\n    <div class=\"ach__c\"><svg viewBox=\"0 0 40 40\"><circle r=\"16\" cx=\"20\" cy=\"20\" stroke=\"#E55B2B\" stroke-width=\"3\" fill=\"none\" stroke-dasharray=\"100\" stroke-dashoffset=\"0\" transform=\"rotate(-90 20 20)\"/></svg></div>\n    <div class=\"ach__n\">Perfect Week</div>\n    <div class=\"ach__d\">All rings closed every day this week</div>\n  </div>\n  <div class=\"ach__i\">\n    <div class=\"ach__c\"><svg viewBox=\"0 0 40 40\"><circle r=\"16\" cx=\"20\" cy=\"20\" stroke=\"#4A5D3A\" stroke-width=\"3\" fill=\"none\" stroke-dasharray=\"75\" stroke-dashoffset=\"25\" transform=\"rotate(-90 20 20)\"/></svg></div>\n    <div class=\"ach__n\">500 Move Goal</div>\n    <div class=\"ach__d\">Doubled your Move goal 5 times</div>\n  </div>\n  <div class=\"ach__i\">\n    <div class=\"ach__c\"><svg viewBox=\"0 0 40 40\"><circle r=\"16\" cx=\"20\" cy=\"20\" stroke=\"#2A4A5A\" stroke-width=\"3\" fill=\"none\" stroke-dasharray=\"50\" stroke-dashoffset=\"50\" transform=\"rotate(-90 20 20)\"/></svg></div>\n    <div class=\"ach__n\">Long Streak</div>\n    <div class=\"ach__d\">30-day consecutive ring closure</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 12,
    name: "Goal Progress Bar",
    source: "apple-activity-rings.html",
    category: "detail",
    css: ".gl{padding:24px 16px;text-align:center;border-top:1px solid #3A3A3A}\n.gl__h{font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#F0F0F0;margin-bottom:8px;letter-spacing:-.3px}\n.gl__bar{display:flex;gap:4px;max-width:400px;margin:0 auto;align-items:center}\n.gl__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#606060;text-transform:uppercase;letter-spacing:.06em}\n.gl__t{flex:1;height:4px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden;position:relative}\n.gl__f{height:100%;background:#4A5D3A;border-radius:2px;transition:width .3s cubic-bezier(.16,1,.3,1)}\n.gl__r{font-family:'JetBrains Mono','SF Mono',monospace;font-size:13px;font-weight:600;color:#F0F0F0}",
    html: "<section class=\"gl\">\n  <div class=\"gl__h\">\"The ring is not a chart. It is a <strong>commitment.</strong>\"</div>\n  <div class=\"gl__bar\">\n    <span class=\"gl__l\">Goal</span>\n    <div class=\"gl__t\"><div class=\"gl__f\" style=\"width:78%\"></div></div>\n    <span class=\"gl__r\">78%</span>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 13,
    name: "Spotify Wrapped Hero",
    source: "spotify-wrapped.html",
    category: "hero",
    css: ".sh{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:24px;position:relative;overflow:hidden}\n.sh::before{content:'';position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(180deg,transparent,#121212);z-index:2}\n.sh__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#727272;margin-bottom:24px;position:relative;z-index:3}\n.sh__yr{font-family:'Inter',-apple-system,sans-serif;font-size:clamp(5rem,15vw,10rem);font-weight:900;line-height:.85;background:linear-gradient(135deg,#4A5D3A,#8B7355,#2A4A5A,#E55B2B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px;position:relative;z-index:3}\n.sh__h{font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;color:#FFFFFF;margin-bottom:4px;position:relative;z-index:3}\n.sh__d{font-size:15px;color:#A0A0A0;max-width:400px;margin:0 auto;position:relative;z-index:3}",
    html: "<section class=\"sh\">\n  <div class=\"sh__tag\">Iconic Data Viz · Wrapped</div>\n  <div class=\"sh__yr\">2026</div>\n  <h1 class=\"sh__h\">Your year in data.</h1>\n  <p class=\"sh__d\">Personal listening stats. Global trends. A ritual that turns data into culture.</p>\n</section>",
    hasJS: false
  },
  {
    id: 14,
    name: "Top Artists List",
    source: "spotify-wrapped.html",
    category: "section",
    css: ".ta{padding:32px 16px}\n.ta__g{display:flex;flex-direction:column;gap:4px}\n.ta__r{display:grid;grid-template-columns:40px 1fr auto;gap:8px;align-items:center;padding:6px 8px;background:#282828;border-radius:12px;transition:all .2s}\n.ta__r:hover{background:#1A1A1A;transform:translateX(4px)}\n.ta__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#727272;font-weight:600}\n.ta__a{font-size:18px;font-weight:600;color:#FFFFFF}\n.ta__t{font-family:'JetBrains Mono','SF Mono',monospace;font-size:13px;color:#A0A0A0}\n.ta__p{font-family:'JetBrains Mono','SF Mono',monospace;font-size:13px;color:#A0A0A0}",
    html: "<div class=\"ta__g\">\n  <div class=\"ta__r\"><span class=\"ta__n\">01</span><div><div class=\"ta__a\">Radiohead</div><div class=\"ta__t\">Alternative · 2,341 min</div></div><span class=\"ta__p\">#1</span></div>\n  <div class=\"ta__r\"><span class=\"ta__n\">02</span><div><div class=\"ta__a\">Björk</div><div class=\"ta__t\">Electronic · 1,892 min</div></div><span class=\"ta__p\">#2</span></div>\n  <div class=\"ta__r\"><span class=\"ta__n\">03</span><div><div class=\"ta__a\">Kendrick Lamar</div><div class=\"ta__t\">Hip-Hop · 1,567 min</div></div><span class=\"ta__p\">#3</span></div>\n  <div class=\"ta__r\"><span class=\"ta__n\">04</span><div><div class=\"ta__a\">Phoebe Bridgers</div><div class=\"ta__t\">Indie · 1,234 min</div></div><span class=\"ta__p\">#4</span></div>\n  <div class=\"ta__r\"><span class=\"ta__n\">05</span><div><div class=\"ta__a\">Nils Frahm</div><div class=\"ta__t\">Classical · 987 min</div></div><span class=\"ta__p\">#5</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 15,
    name: "Genre Mix Grid",
    source: "spotify-wrapped.html",
    category: "section",
    css: ".ge{padding:32px 16px}\n.ge__g{display:grid;grid-template-columns:repeat(2,1fr);gap:4px}\n.ge__i{padding:12px;border-radius:12px;text-align:center;transition:all .2s}\n.ge__i:hover{transform:scale(1.02)}\n.ge__n{font-size:18px;font-weight:700;color:#fff;margin-bottom:2px}\n.ge__p{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em}",
    html: "<div class=\"ge__g\">\n  <div class=\"ge__i\" style=\"background:#E55B2B\"><div class=\"ge__n\">Alternative</div><div class=\"ge__p\">32% · 4,210 min</div></div>\n  <div class=\"ge__i\" style=\"background:#4A5D3A\"><div class=\"ge__n\">Electronic</div><div class=\"ge__p\">24% · 3,150 min</div></div>\n  <div class=\"ge__i\" style=\"background:#2A4A5A\"><div class=\"ge__n\">Hip-Hop</div><div class=\"ge__p\">18% · 2,380 min</div></div>\n  <div class=\"ge__i\" style=\"background:#8B7355\"><div class=\"ge__n\">Indie</div><div class=\"ge__p\">15% · 1,980 min</div></div>\n  <div class=\"ge__i\" style=\"background:#3A3A3A\"><div class=\"ge__n\">Classical</div><div class=\"ge__p\">7% · 920 min</div></div>\n  <div class=\"ge__i\" style=\"background:#1A1A1A\"><div class=\"ge__n\">Jazz</div><div class=\"ge__p\">4% · 520 min</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 16,
    name: "Minutes Highlight (Big Number)",
    source: "spotify-wrapped.html",
    category: "chart",
    css: ".mn{padding:48px 16px;text-align:center;position:relative;overflow:hidden}\n.mn::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#4A5D3A,#2A4A5A);opacity:.08;border-radius:0}\n.mn__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#727272;text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;position:relative;z-index:2}\n.mn__v{font-family:'JetBrains Mono','SF Mono',monospace;font-size:clamp(3rem,8vw,6rem);font-weight:800;line-height:1;color:#FFFFFF;letter-spacing:-3px;margin-bottom:4px;position:relative;z-index:2}\n.mn__d{font-size:15px;color:#A0A0A0;max-width:360px;margin:0 auto;position:relative;z-index:2}",
    html: "<section class=\"mn\">\n  <div class=\"mn__l\">Total Listening Time</div>\n  <div class=\"mn__v\">13,160</div>\n  <div class=\"mn__d\">Minutes of music this year · That's 9.1 days</div>\n</section>",
    hasJS: false
  },
  {
    id: 17,
    name: "Top Tracks List",
    source: "spotify-wrapped.html",
    category: "section",
    css: ".tr{padding:32px 16px}\n.tr__g{display:flex;flex-direction:column;gap:4px}\n.tr__r{display:grid;grid-template-columns:40px 1fr auto;gap:8px;align-items:center;padding:4px 8px;border-bottom:1px solid #333333;font-size:13px}\n.tr__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#727272}\n.tr__s{font-weight:500;color:#FFFFFF}\n.tr__a{font-size:11px;color:#A0A0A0}\n.tr__c{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#727272}",
    html: "<div class=\"tr__g\">\n  <div class=\"tr__r\"><span class=\"tr__n\">01</span><div><div class=\"tr__s\">How to Disappear Completely</div><div class=\"tr__a\">Radiohead</div></div><span class=\"tr__c\">147 plays</span></div>\n  <div class=\"tr__r\"><span class=\"tr__n\">02</span><div><div class=\"tr__s\">Jóga</div><div class=\"tr__a\">Björk</div></div><span class=\"tr__c\">132 plays</span></div>\n  <div class=\"tr__r\"><span class=\"tr__n\">03</span><div><div class=\"tr__s\">Alright</div><div class=\"tr__a\">Kendrick Lamar</div></div><span class=\"tr__c\">98 plays</span></div>\n  <div class=\"tr__r\"><span class=\"tr__n\">04</span><div><div class=\"tr__s\">Motion Sickness</div><div class=\"tr__a\">Phoebe Bridgers</div></div><span class=\"tr__c\">87 plays</span></div>\n  <div class=\"tr__r\"><span class=\"tr__n\">05</span><div><div class=\"tr__s\">Says</div><div class=\"tr__a\">Nils Frahm</div></div><span class=\"tr__c\">76 plays</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 18,
    name: "Audio DNA Card",
    source: "spotify-wrapped.html",
    category: "detail",
    css: ".dna{padding:80px 16px;text-align:center}\n.dna__card{padding:24px;background:linear-gradient(135deg,#282828,#1A1A1A);border-radius:12px;max-width:500px;margin:0 auto;position:relative;overflow:hidden}\n.dna__card::before{content:'\"';position:absolute;top:-20px;left:10px;font-size:120px;color:#4A5D3A;opacity:.05;font-family:Georgia,'Times New Roman',serif}\n.dna__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#727272;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}\n.dna__h{font-size:24px;font-weight:700;color:#FFFFFF;margin-bottom:4px;letter-spacing:-.3px}\n.dna__d{font-size:15px;color:#A0A0A0;line-height:1.6}",
    html: "<div class=\"dna__card\">\n  <div class=\"dna__l\">Your 2026 Audio Personality</div>\n  <div class=\"dna__h\">The Deep Diver</div>\n  <div class=\"dna__d\">You explore albums end-to-end, stay with artists for hours, and listen when the world is quiet. Your music isn't background — it's foreground.</div>\n</div>",
    hasJS: false
  },
  {
    id: 19,
    name: "Terminal Hero + Ticker Board",
    source: "bloomberg-terminal.html",
    category: "hero",
    css: ".th{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;border-bottom:1px solid #3A3A38}\n.th__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#686860;margin-bottom:8px}\n.th__h{font-family:'JetBrains Mono','SF Mono',monospace;font-size:clamp(2rem,4vw,3.5rem);font-weight:300;line-height:1.05;color:#E8E8E0;max-width:700px;margin-bottom:36px;letter-spacing:-.5px}\n.th__h strong{font-weight:600;color:#4A5D3A}\n.th__board{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#3A3A38}\n.th__i{background:#1A1A1A;padding:20px 16px;display:flex;flex-direction:column;gap:2px}\n.th__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;color:#686860;text-transform:uppercase;letter-spacing:.04em}\n.th__v{font-family:'JetBrains Mono','SF Mono',monospace;font-size:18px;font-weight:500;color:#E8E8E0;display:flex;align-items:baseline;gap:4px}\n.th__c{font-size:12px}\n.th__up{color:#4A5D3A}.th__dn{color:#E55B2B}\n.th__sub{font-size:10px;color:#888880}",
    html: "<section class=\"th\">\n  <div class=\"th__tag\">Iconic Data Viz · Terminal Green</div>\n  <h1 class=\"th__h\">Data <strong>density.</strong> Signal <strong>clarity.</strong></h1>\n  <div class=\"th__board\">\n    <div class=\"th__i\"><span class=\"th__l\">S&P 500</span><div class=\"th__v\">5,846.23<span class=\"th__c th__up\"> ▲1.2%</span></div><span class=\"th__sub\">+68.42 pts</span></div>\n    <div class=\"th__i\"><span class=\"th__l\">NASDAQ</span><div class=\"th__v\">18,472.15<span class=\"th__c th__up\"> ▲0.8%</span></div><span class=\"th__sub\">+142.30 pts</span></div>\n    <div class=\"th__i\"><span class=\"th__l\">10Y Yield</span><div class=\"th__v\">4.284<span class=\"th__c th__dn\"> ▼2.1bp</span></div><span class=\"th__sub\">-0.09%</span></div>\n    <div class=\"th__i\"><span class=\"th__l\">VIX</span><div class=\"th__v\">14.67<span class=\"th__c th__dn\"> ▼0.4%</span></div><span class=\"th__sub\">-0.06 pts</span></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 20,
    name: "Data Panels (Key-Value Grid)",
    source: "bloomberg-terminal.html",
    category: "section",
    css: ".dp__g{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#3A3A38}\n.dp__l{background:#1A1A1A;padding:28px 20px}\n.dp__lbl{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;color:#686860;text-transform:uppercase;letter-spacing:.04em;margin-bottom:20px}\n.dp__r{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #3A3A38;font-size:12px}\n.dp__r:last-child{border-bottom:none}\n.dp__k{color:#888880}\n.dp__v{font-family:'JetBrains Mono','SF Mono',monospace;font-weight:500;color:#E8E8E0}\n.dp__up{color:#4A5D3A}.dp__dn{color:#E55B2B}",
    html: "<div class=\"dp__g\">\n  <div class=\"dp__l\">\n    <div class=\"dp__lbl\">Treasury</div>\n    <div class=\"dp__r\"><span class=\"dp__k\">US 2Y</span><span class=\"dp__v\">4.012<span class=\"dp__up\"> ▲1.2bp</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">US 10Y</span><span class=\"dp__v\">4.284<span class=\"dp__dn\"> ▼2.1bp</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">US 30Y</span><span class=\"dp__v\">4.612<span class=\"dp__dn\"> ▼1.8bp</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">German 10Y</span><span class=\"dp__v\">2.846<span class=\"dp__up\"> ▲0.4bp</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">UK 10Y</span><span class=\"dp__v\">4.156<span class=\"dp__up\"> ▲0.9bp</span></span></div>\n  </div>\n  <div class=\"dp__l\">\n    <div class=\"dp__lbl\">Currencies</div>\n    <div class=\"dp__r\"><span class=\"dp__k\">EUR/USD</span><span class=\"dp__v\">1.0842<span class=\"dp__dn\"> ▼0.3%</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">GBP/USD</span><span class=\"dp__v\">1.2648<span class=\"dp__up\"> ▲0.1%</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">USD/JPY</span><span class=\"dp__v\">151.42<span class=\"dp__up\"> ▲0.4%</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">USD/CHF</span><span class=\"dp__v\">0.8926<span class=\"dp__dn\"> ▼0.2%</span></span></div>\n    <div class=\"dp__r\"><span class=\"dp__k\">AUD/USD</span><span class=\"dp__v\">0.6674<span class=\"dp__dn\"> ▼0.1%</span></span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 21,
    name: "Market Movers Table",
    source: "bloomberg-terminal.html",
    category: "section",
    css: ".mm__g{display:flex;flex-direction:column;gap:1px;background:#3A3A38}\n.mm__r{display:grid;grid-template-columns:1fr 80px 80px 60px;gap:0;padding:8px 12px;background:#1A1A1A;align-items:center;font-size:12px;transition:background .2s}\n.mm__r:hover{background:#2A2A28}\n.mm__r--h{font-size:10px;color:#686860;text-transform:uppercase;letter-spacing:.04em;background:#2A2A28}\n.mm__n{font-weight:500;color:#E8E8E0}\n.mm__p{font-family:'JetBrains Mono','SF Mono',monospace;text-align:right;color:#E8E8E0}\n.mm__ch{font-family:'JetBrains Mono','SF Mono',monospace;text-align:right}\n.mm__up{color:#4A5D3A}.mm__dn{color:#E55B2B}",
    html: "<div class=\"mm__g\">\n  <div class=\"mm__r mm__r--h\"><span>Name</span><span>Price</span><span>Change</span><span>Vol</span></div>\n  <div class=\"mm__r\"><span class=\"mm__n\">Nvidia Corp</span><span class=\"mm__p\">148.32</span><span class=\"mm__ch mm__up\">+4.28%</span><span class=\"mm__ch\">42.1M</span></div>\n  <div class=\"mm__r\"><span class=\"mm__n\">Apple Inc</span><span class=\"mm__p\">234.56</span><span class=\"mm__ch mm__up\">+2.14%</span><span class=\"mm__ch\">28.4M</span></div>\n  <div class=\"mm__r\"><span class=\"mm__n\">Tesla Inc</span><span class=\"mm__p\">286.40</span><span class=\"mm__ch mm__dn\">-1.86%</span><span class=\"mm__ch\">35.2M</span></div>\n  <div class=\"mm__r\"><span class=\"mm__n\">Amazon.com</span><span class=\"mm__p\">198.72</span><span class=\"mm__ch mm__up\">+1.42%</span><span class=\"mm__ch\">18.9M</span></div>\n  <div class=\"mm__r\"><span class=\"mm__n\">Microsoft</span><span class=\"mm__p\">426.18</span><span class=\"mm__ch mm__up\">+0.86%</span><span class=\"mm__ch\">15.3M</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 22,
    name: "Chart Panel (Mini Sparklines)",
    source: "bloomberg-terminal.html",
    category: "chart",
    css: ".cp__g{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#3A3A38}\n.cp__i{background:#1A1A1A;padding:28px 20px}\n.cp__lbl{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;color:#686860;text-transform:uppercase;letter-spacing:.04em;margin-bottom:12px}\n.cp__v{font-family:'JetBrains Mono','SF Mono',monospace;font-size:36px;font-weight:500;color:#E8E8E0;letter-spacing:-1px;margin-bottom:4px}\n.cp__sv{width:100%;height:60px}\n.cp__sv path{fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}",
    html: "<div class=\"cp__g\">\n  <div class=\"cp__i\"><div class=\"cp__lbl\">S&P 500</div><div class=\"cp__v\">5,846</div>\n    <svg class=\"cp__sv\" viewBox=\"0 0 280 60\" preserveAspectRatio=\"none\"><path d=\"M0 50 Q20 45 40 38 T80 28 T120 20 T160 15 T200 12 T240 10 T280 8\" stroke=\"rgba(74,93,58,.5)\" stroke-width=\"1.5\"/></svg>\n  </div>\n  <div class=\"cp__i\"><div class=\"cp__lbl\">NASDAQ</div><div class=\"cp__v\">18,472</div>\n    <svg class=\"cp__sv\" viewBox=\"0 0 280 60\" preserveAspectRatio=\"none\"><path d=\"M0 55 Q30 50 60 42 T120 32 T180 25 T240 20 T280 18\" stroke=\"rgba(139,115,85,.5)\" stroke-width=\"1.5\"/></svg>\n  </div>\n  <div class=\"cp__i\"><div class=\"cp__lbl\">VIX</div><div class=\"cp__v\">14.67</div>\n    <svg class=\"cp__sv\" viewBox=\"0 0 280 60\" preserveAspectRatio=\"none\"><path d=\"M0 12 Q20 15 40 20 T80 28 T120 32 T160 38 T200 42 T240 45 T280 48\" stroke=\"rgba(229,91,43,.5)\" stroke-width=\"1.5\"/></svg>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 23,
    name: "Scoreboard Hero (VS Layout)",
    source: "stadium-sport.html",
    category: "hero",
    css: ".hero-score{min-height:100vh;background:#2C2C2C;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;overflow:hidden}\n.hero-score::before{content:'SPORT';position:absolute;top:-.06em;left:-.03em;font-family:Georgia,'Times New Roman',serif;font-size:clamp(10rem,25vw,25rem);font-weight:700;line-height:.8;letter-spacing:-.06em;color:rgba(255,255,255,.015);pointer-events:none;user-select:none}\n.hero-score__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.15);margin-bottom:40px;position:relative;z-index:2}\n.hero-score__board{display:inline-grid;grid-template-columns:1fr auto 1fr;gap:40px;align-items:center;position:relative;z-index:2}\n.hero-score__team{text-align:center}\n.hero-score__team-label{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:12px}\n.hero-score__team-num{font-family:'JetBrains Mono','SF Mono',monospace;font-size:clamp(5rem,12vw,10rem);font-weight:600;line-height:.85;letter-spacing:-4px;color:#fff}\n.hero-score__vs{font-family:Georgia,'Times New Roman',serif;font-size:clamp(1rem,2vw,1.5rem);color:rgba(255,255,255,.12);letter-spacing:4px;text-transform:uppercase}\n.hero-score__team-num.away{color:rgba(255,255,255,.25)}\n.hero-score__meta{display:flex;gap:60px;margin-top:60px;position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.04);padding-top:40px}\n.hero-score__stat{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.15)}\n.hero-score__stat strong{display:block;font-size:20px;color:#fff;font-weight:600;letter-spacing:-.5px;margin-bottom:4px}",
    html: "<section class=\"hero-score\">\n  <div class=\"hero-score__tag\">Stockholm Design Lab · Stadium</div>\n  <div class=\"hero-score__board\">\n    <div class=\"hero-score__team\">\n      <div class=\"hero-score__team-label\">Home</div>\n      <div class=\"hero-score__team-num\">24</div>\n    </div>\n    <div class=\"hero-score__vs\">VS</div>\n    <div class=\"hero-score__team\">\n      <div class=\"hero-score__team-label\">Away</div>\n      <div class=\"hero-score__team-num away\">18</div>\n    </div>\n  </div>\n  <div class=\"hero-score__meta\">\n    <div class=\"hero-score__stat\"><strong>47</strong> Sports</div>\n    <div class=\"hero-score__stat\"><strong>12M</strong> Customers</div>\n    <div class=\"hero-score__stat\"><strong>200+</strong> Stores</div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 24,
    name: "Record Board (Highlight Row)",
    source: "stadium-sport.html",
    category: "section",
    css: ".record-list{display:flex;flex-direction:column;gap:2px;background:#E5E5E0}\n.rec-row{display:grid;grid-template-columns:100px 1fr auto;gap:40px;align-items:center;padding:28px 40px;background:#F5F5F0;transition:background .2s}\n.rec-row:hover{background:#FFFFFF}\n.rec-row--hl{background:#2C2C2C;color:#fff}\n.rec-row--hl:hover{background:#2C2C2C}\n.rec-row--hl .rec-row__val{color:#E55B2B}\n.rec-row--hl .rec-row__cat{color:rgba(255,255,255,.2)}\n.rec-row--hl .rec-row__ctx{color:rgba(255,255,255,.3)}\n.rec-row__cat{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#A0A0A0}\n.rec-row__name{font-size:16px;font-weight:500;color:inherit}\n.rec-row__ctx{font-size:13px;color:#6B6B6B;line-height:1.5}\n.rec-row__val{font-family:'JetBrains Mono','SF Mono',monospace;font-size:28px;font-weight:600;line-height:1;color:#2C2C2C;letter-spacing:-1px;text-align:right}",
    html: "<div class=\"record-list\">\n  <div class=\"rec-row rec-row--hl\">\n    <span class=\"rec-row__cat\">World Record</span>\n    <div>\n      <div class=\"rec-row__name\">100m Sprint</div>\n      <div class=\"rec-row__ctx\">Usain Bolt · Beijing 2008</div>\n    </div>\n    <span class=\"rec-row__val\">9.58s</span>\n  </div>\n  <div class=\"rec-row\">\n    <span class=\"rec-row__cat\">Endurance</span>\n    <div>\n      <div class=\"rec-row__name\">Marathon</div>\n      <div class=\"rec-row__ctx\">Kelvin Kiptum · Chicago 2023</div>\n    </div>\n    <span class=\"rec-row__val\">2:00:35</span>\n  </div>\n  <div class=\"rec-row\">\n    <span class=\"rec-row__cat\">Altitude</span>\n    <div>\n      <div class=\"rec-row__name\">High Jump</div>\n      <div class=\"rec-row__ctx\">Javier Sotomayor · Salamanca 1993</div>\n    </div>\n    <span class=\"rec-row__val\">2.45m</span>\n  </div>\n  <div class=\"rec-row\">\n    <span class=\"rec-row__cat\">Speed</span>\n    <div>\n      <div class=\"rec-row__name\">Tennis Serve</div>\n      <div class=\"rec-row__ctx\">John Isner · Davis Cup 2016</div>\n    </div>\n    <span class=\"rec-row__val\">253 km/h</span>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 25,
    name: "League Table",
    source: "stadium-sport.html",
    category: "section",
    css: ".lg-table{margin-top:60px;border-top:2px solid #2C2C2C}\n.lg-row{display:grid;grid-template-columns:40px 1fr 60px 60px 60px 60px;gap:0;padding:16px 24px;border-bottom:1px solid #E5E5E0;align-items:center;font-size:13px;transition:background .2s}\n.lg-row:hover{background:#F5F5F0}\n.lg-row--header{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#A0A0A0;padding:12px 24px;border-bottom:1px solid #2C2C2C}\n.lg-row--hl{background:#2C2C2C;color:#fff}\n.lg-row--hl:hover{background:#2C2C2C}\n.lg-row--hl .lg-row__pts{color:#E55B2B}\n.lg-row__pos{font-family:'JetBrains Mono','SF Mono',monospace;font-weight:600;color:#6B6B6B}\n.lg-row--hl .lg-row__pos{color:rgba(255,255,255,.3)}\n.lg-row__team{font-weight:500}\n.lg-row__p,.lg-row__w,.lg-row__d{font-family:'JetBrains Mono','SF Mono',monospace;font-size:12px;color:#6B6B6B;text-align:center}\n.lg-row__pts{font-family:'JetBrains Mono','SF Mono',monospace;font-size:16px;font-weight:600;color:#2C2C2C;text-align:center}",
    html: "<div class=\"lg-table\">\n  <div class=\"lg-row lg-row--header\"><span>Pos</span><span>Team</span><span>P</span><span>W</span><span>D</span><span>Pts</span></div>\n  <div class=\"lg-row lg-row--hl\"><span class=\"lg-row__pos\">01</span><span class=\"lg-row__team\">AIK Fotboll</span><span class=\"lg-row__p\">24</span><span class=\"lg-row__w\">16</span><span class=\"lg-row__d\">5</span><span class=\"lg-row__pts\">53</span></div>\n  <div class=\"lg-row\"><span class=\"lg-row__pos\">02</span><span class=\"lg-row__team\">Malmö FF</span><span class=\"lg-row__p\">24</span><span class=\"lg-row__w\">15</span><span class=\"lg-row__d\">4</span><span class=\"lg-row__pts\">49</span></div>\n  <div class=\"lg-row\"><span class=\"lg-row__pos\">03</span><span class=\"lg-row__team\">Djurgårdens IF</span><span class=\"lg-row__p\">24</span><span class=\"lg-row__w\">14</span><span class=\"lg-row__d\">3</span><span class=\"lg-row__pts\">45</span></div>\n  <div class=\"lg-row\"><span class=\"lg-row__pos\">04</span><span class=\"lg-row__team\">Hammarby IF</span><span class=\"lg-row__p\">24</span><span class=\"lg-row__w\">12</span><span class=\"lg-row__d\">6</span><span class=\"lg-row__pts\">42</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 26,
    name: "Sport Category Grid (Hover Dark)",
    source: "stadium-sport.html",
    category: "section",
    css: ".sport-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:60px;background:#E5E5E0}\n.sport{background:#FFFFFF;padding:48px 32px;text-align:center;transition:all .2s;position:relative;overflow:hidden}\n.sport:hover{background:#2C2C2C;color:#fff;transform:scale(1.02);z-index:2}\n.sport__icon{font-family:'JetBrains Mono','SF Mono',monospace;font-size:36px;font-weight:600;color:#2C2C2C;opacity:.06;margin-bottom:12px;line-height:1;letter-spacing:-2px}\n.sport:hover .sport__icon{color:#E55B2B;opacity:.5}\n.sport__name{font-size:18px;font-weight:500;color:inherit;margin-bottom:4px}\n.sport__desc{font-size:12px;color:#6B6B6B;line-height:1.5}\n.sport:hover .sport__desc{color:rgba(255,255,255,.4)}",
    html: "<div class=\"sport-grid\">\n  <div class=\"sport\"><div class=\"sport__icon\">01</div><div class=\"sport__name\">Running</div><p class=\"sport__desc\">From sprints to ultramarathons. Every distance, every pace.</p></div>\n  <div class=\"sport\"><div class=\"sport__icon\">02</div><div class=\"sport__name\">Football</div><p class=\"sport__desc\">The beautiful game. Boots, balls, kits, and gear.</p></div>\n  <div class=\"sport\"><div class=\"sport__icon\">03</div><div class=\"sport__name\">Swimming</div><p class=\"sport__desc\">Pool, open water, and everything in between.</p></div>\n  <div class=\"sport\"><div class=\"sport__icon\">04</div><div class=\"sport__name\">Cycling</div><p class=\"sport__desc\">Road, gravel, mountain, track. Ride your way.</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 27,
    name: "Equipment Specs (Dark Panel)",
    source: "stadium-sport.html",
    category: "detail",
    css: ".gear-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:rgba(255,255,255,.06)}\n.gear{background:#2A4A5A;padding:48px 40px;transition:background .2s}\n.gear:hover{background:rgba(255,255,255,.03)}\n.gear__name{font-size:18px;font-weight:500;color:#fff;margin-bottom:16px}\n.gear__spec{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:13px}\n.gear__spec-lbl{color:rgba(255,255,255,.2);font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase}\n.gear__spec-val{color:rgba(255,255,255,.5)}",
    html: "<div class=\"gear-grid\">\n  <div class=\"gear\">\n    <div class=\"gear__name\">Running Shoe</div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Weight</span><span class=\"gear__spec-val\">185g</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Drop</span><span class=\"gear__spec-val\">8mm</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Stack</span><span class=\"gear__spec-val\">32mm</span></div>\n  </div>\n  <div class=\"gear\">\n    <div class=\"gear__name\">Football Boot</div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Weight</span><span class=\"gear__spec-val\">210g</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Studs</span><span class=\"gear__spec-val\">FG</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Upper</span><span class=\"gear__spec-val\">Kangaroo</span></div>\n  </div>\n  <div class=\"gear\">\n    <div class=\"gear__name\">Swim Goggle</div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Weight</span><span class=\"gear__spec-val\">42g</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Lens</span><span class=\"gear__spec-val\">UV400</span></div>\n    <div class=\"gear__spec\"><span class=\"gear__spec-lbl\">Seal</span><span class=\"gear__spec-val\">Silicone</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 28,
    name: "Crowd Data (Big Numbers Dark)",
    source: "stadium-sport.html",
    category: "chart",
    css: ".crowd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:60px;margin-top:60px}\n.cwd{text-align:center}\n.cwd__num{font-family:'JetBrains Mono','SF Mono',monospace;font-size:56px;font-weight:600;line-height:1;color:#4A5D3A;letter-spacing:-3px;margin-bottom:4px}\n.cwd__label{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:8px}\n.cwd__desc{font-size:13px;color:rgba(255,255,255,.3);line-height:1.5;max-width:280px;margin:0 auto}",
    html: "<div class=\"crowd-grid\">\n  <div class=\"cwd\"><div class=\"cwd__num\">12M</div><div class=\"cwd__label\">Annual Footfall</div><p class=\"cwd__desc\">Across 200+ stores nationwide. Every visit counts.</p></div>\n  <div class=\"cwd\"><div class=\"cwd__num\">4.8M</div><div class=\"cwd__label\">Online Active</div><p class=\"cwd__desc\">Digital customers. The largest sports community in Sweden.</p></div>\n  <div class=\"cwd\"><div class=\"cwd__num\">94%</div><div class=\"cwd__label\">Brand Recall</div><p class=\"cwd__desc\">Top-of-mind awareness for sports retail in Scandinavia.</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 29,
    name: "Track Hero (SVG Path + Grid)",
    source: "strava-heatmap.html",
    category: "hero",
    css: ".th{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:16px;position:relative;overflow:hidden}\n.th__grid{position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:30px 30px;opacity:.5}\n.th__track{position:absolute;bottom:48px;left:10%;right:10%;height:120px;opacity:.15}\n.th__track svg{width:100%;height:100%}\n.th__track path{fill:none;stroke:#E55B2B;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}\n.th__tag{font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#606060;margin-bottom:16px;position:relative;z-index:2}\n.th__h{font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:#F0F0F0;line-height:1;letter-spacing:-1px;margin-bottom:6px;position:relative;z-index:2;max-width:600px}\n.th__h .hl{color:#E55B2B}\n.th__d{font-size:15px;color:#909090;max-width:420px;line-height:1.6;position:relative;z-index:2}\n.th__dot{position:absolute;top:50%;left:50%;width:6px;height:6px;border-radius:50%;background:#E55B2B;box-shadow:0 0 20px rgba(229,91,43,.3);z-index:2}",
    html: "<section class=\"th\">\n  <div class=\"th__grid\"></div>\n  <div class=\"th__track\">\n    <svg viewBox=\"0 0 800 120\" preserveAspectRatio=\"none\">\n      <path d=\"M0 100 Q30 95 60 85 T120 70 T180 55 T240 40 T300 30 T360 25 T420 20 T480 18 T540 15 T600 12 T660 10 T720 8 T800 6\"/>\n    </svg>\n  </div>\n  <div class=\"th__dot\"></div>\n  <div class=\"th__tag\">Iconic Data Viz · Red Track</div>\n  <h1 class=\"th__h\">Every <span class=\"hl\">move</span><br>leaves a mark.</h1>\n  <p class=\"th__d\">The red line on a dark map. A billion activities. One unmistakable signature.</p>\n</section>",
    hasJS: false
  },
  {
    id: 30,
    name: "Heatmap Grid (JS Generated)",
    source: "strava-heatmap.html",
    category: "chart",
    css: ".hm__g{display:grid;grid-template-columns:repeat(52,1fr);gap:2px;margin-top:4px}\n.hm__g span{aspect-ratio:1;border-radius:1px;transition:opacity .2s}\n.hm__g span:hover{opacity:1!important;transform:scale(1.5);z-index:5;position:relative}\n.hm__lb{display:flex;justify-content:space-between;font-family:'JetBrains Mono','SF Mono',monospace;font-size:8px;color:#606060;text-transform:uppercase;letter-spacing:1px;margin-top:2px}",
    html: "<div class=\"hm__g\" id=\"heatmap\"></div>\n<div class=\"hm__lb\"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>",
    hasJS: true
  },
  {
    id: 31,
    name: "Activity Stats Cards",
    source: "strava-heatmap.html",
    category: "chart",
    css: ".sg{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}\n.si{padding:12px;background:#252525;border-radius:6px;text-align:center}\n.si__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:48px;font-weight:600;line-height:1;color:#F0F0F0;letter-spacing:-1px}\n.si__l{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#606060;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}\n.si__d{font-size:11px;color:#909090;margin-top:2px}",
    html: "<div class=\"sg\">\n  <div class=\"si\"><div class=\"si__n\">4,286</div><div class=\"si__l\">Distance (km)</div><div class=\"si__d\">▲ 12% vs last year</div></div>\n  <div class=\"si\"><div class=\"si__n\">312</div><div class=\"si__l\">Activities</div><div class=\"si__d\">▲ 8% vs last year</div></div>\n  <div class=\"si\"><div class=\"si__n\">42,680</div><div class=\"si__l\">Elevation (m)</div><div class=\"si__d\">▲ 15% vs last year</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 32,
    name: "Segment Leaderboard",
    source: "strava-heatmap.html",
    category: "section",
    css: ".se__g{display:flex;flex-direction:column;gap:2px}\n.se__r{display:grid;grid-template-columns:30px 1fr 80px 60px;gap:6px;align-items:center;padding:4px 6px;border-radius:4px;font-size:13px;transition:background .2s}\n.se__r:hover{background:#252525}\n.se__r--h{font-size:11px;color:#606060;text-transform:uppercase;letter-spacing:.04em}\n.se__n{color:#606060;font-family:'JetBrains Mono','SF Mono',monospace}\n.se__s{font-weight:500;color:#F0F0F0}\n.se__t{font-family:'JetBrains Mono','SF Mono',monospace;color:#909090;text-align:right}\n.se__p{font-family:'JetBrains Mono','SF Mono',monospace;color:#606060;text-align:right}",
    html: "<div class=\"se__g\">\n  <div class=\"se__r se__r--h\"><span>Pos</span><span>Name</span><span>Time</span><span>Speed</span></div>\n  <div class=\"se__r\"><span class=\"se__n\">1</span><span class=\"se__s\">Mont Ventoux Ascent</span><span class=\"se__t\">1:12:45</span><span class=\"se__p\">17.2 km/h</span></div>\n  <div class=\"se__r\"><span class=\"se__n\">2</span><span class=\"se__s\">Alpe d'Huez Climb</span><span class=\"se__t\">58:32</span><span class=\"se__p\">16.8 km/h</span></div>\n  <div class=\"se__r\"><span class=\"se__n\">3</span><span class=\"se__s\">Box Hill Loop</span><span class=\"se__t\">24:18</span><span class=\"se__p\">18.4 km/h</span></div>\n  <div class=\"se__r\"><span class=\"se__n\">4</span><span class=\"se__s\">Richmond Park TT</span><span class=\"se__t\">18:42</span><span class=\"se__p\">19.1 km/h</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 33,
    name: "Weekly Training Bars",
    source: "strava-heatmap.html",
    category: "chart",
    css: ".wc{padding:32px 16px;background:#252525}\n.wc__g{display:flex;gap:2px;align-items:flex-end;height:120px;margin-top:4px}\n.wc__g div{flex:1;border-radius:2px 2px 0 0;background:#E55B2B;opacity:.7;transition:all .2s}\n.wc__g div:hover{opacity:1;transform:scaleY(1.02);transform-origin:bottom}\n.wc__lb{display:flex;gap:2px;margin-top:2px}\n.wc__lb span{flex:1;font-family:'JetBrains Mono','SF Mono',monospace;font-size:8px;color:#606060;text-align:center;text-transform:uppercase;letter-spacing:1px}",
    html: "<section class=\"wc\">\n  <div class=\"wc__g\">\n    <div style=\"height:35%\"></div><div style=\"height:52%\"></div><div style=\"height:28%\"></div><div style=\"height:68%\"></div>\n    <div style=\"height:45%\"></div><div style=\"height:82%\"></div><div style=\"height:38%\"></div>\n  </div>\n  <div class=\"wc__lb\"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>\n</section>",
    hasJS: false
  },
  {
    id: 34,
    name: "Badge Progress (SVG Circle)",
    source: "strava-heatmap.html",
    category: "detail",
    css: ".bg{padding:24px 16px;text-align:center}\n.bg__c{width:80px;height:80px;margin:0 auto 8px;position:relative}\n.bg__c svg{width:100%;height:100%}\n.bg__c circle{fill:none;transform:rotate(-90deg);transform-origin:50% 50%}\n.bg__n{font-family:'JetBrains Mono','SF Mono',monospace;font-size:22px;font-weight:600;color:#F0F0F0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}\n.bg__h{font-size:18px;font-weight:600;color:#F0F0F0;margin-bottom:2px}\n.bg__d{font-size:13px;color:#909090;max-width:320px;margin:0 auto;line-height:1.6}",
    html: "<section class=\"bg\">\n  <div class=\"bg__c\">\n    <svg viewBox=\"0 0 80 80\"><circle r=\"35\" cx=\"40\" cy=\"40\" stroke=\"rgba(255,255,255,.06)\" stroke-width=\"4\" fill=\"none\"/><circle r=\"35\" cx=\"40\" cy=\"40\" stroke=\"#E55B2B\" stroke-width=\"4\" fill=\"none\" stroke-dasharray=\"220\" stroke-dashoffset=\"44\" stroke-linecap=\"round\" transform=\"rotate(-90 40 40)\"/></svg>\n    <div class=\"bg__n\">80%</div>\n  </div>\n  <div class=\"bg__h\">Goal Progress</div>\n  <div class=\"bg__d\">4,286 km of 5,000 km annual goal. On track for a personal best year.</div>\n</section>",
    hasJS: false
  },
  {
    id: 35,
    name: "F1 Track Map (SVG + Data Grid)",
    source: "f1-telemetry.html",
    category: "hero",
    css: ".tk{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.tk__svg{width:100%;max-width:400px;margin:0 auto}\n.tk__svg path{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}\n.tk__data{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n.tk__i{padding:16px;background:var(--card2,#F5F5F0);border-radius:6px}\n.tk__l{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3,#A0A0A0)}\n.tk__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;margin-top:2px}",
    html: "<div class=\"tk\">\n  <svg class=\"tk__svg\" viewBox=\"0 0 400 300\">\n    <path d=\"M200 260 Q100 260 80 220 Q60 180 100 150 Q140 120 180 130 Q220 140 240 110 Q260 80 300 70 Q340 60 360 90 Q380 120 360 150 Q340 180 300 180 Q260 180 240 200 Q220 220 200 260\" stroke=\"var(--accent,#E55B2B)\" stroke-width=\"3\" fill=\"none\"/>\n    <path d=\"M200 260 Q100 260 80 220 Q60 180 100 150 Q140 120 180 130 Q220 140 240 110 Q260 80 300 70 Q340 60 360 90 Q380 120 360 150 Q340 180 300 180 Q260 180 240 200 Q220 220 200 260\" stroke=\"var(--line,#E5E5E0)\" stroke-width=\"20\" fill=\"none\" opacity=\".1\" stroke-linecap=\"round\"/>\n    <circle cx=\"200\" cy=\"260\" r=\"6\" fill=\"var(--accent,#E55B2B)\"/><circle cx=\"240\" cy=\"110\" r=\"4\" fill=\"var(--text3,#A0A0A0)\"/>\n    <text x=\"195\" y=\"280\" font-family=\"'JetBrains Mono',monospace\" font-size=\"8\" fill=\"var(--text3,#A0A0A0)\">S/F</text>\n    <text x=\"230\" y=\"105\" font-family=\"'JetBrains Mono',monospace\" font-size=\"7\" fill=\"var(--text3,#A0A0A0)\">T1</text>\n  </svg>\n  <div class=\"tk__data\">\n    <div class=\"tk__i\"><div class=\"tk__l\">Circuit</div><div class=\"tk__v\">Monaco</div></div>\n    <div class=\"tk__i\"><div class=\"tk__l\">Lap Record</div><div class=\"tk__v\">1:12.462</div></div>\n    <div class=\"tk__i\"><div class=\"tk__l\">Length</div><div class=\"tk__v\">3.337 km</div></div>\n    <div class=\"tk__i\"><div class=\"tk__l\">Laps</div><div class=\"tk__v\">78</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 36,
    name: "Telemetry Strip (Opacity Bars)",
    source: "f1-telemetry.html",
    category: "chart",
    css: ".tl{display:flex;flex-direction:column;gap:8px;margin-top:24px;padding:24px;background:var(--card2,#F5F5F0);border-radius:8px}\n.tl__h{display:flex;gap:8px}\n.tl__h span{flex:1;font-family:'JetBrains Mono',monospace;font-size:8px;color:var(--text3,#A0A0A0);text-transform:uppercase;letter-spacing:1px;text-align:center}\n.tl__r{display:flex;gap:8px;align-items:center}\n.tl__r .lbl{width:60px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text2,#6B6B6B);text-transform:uppercase;letter-spacing:.04em;flex-shrink:0}\n.tl__r .trk{flex:1;height:20px;display:flex;gap:1px;border-radius:3px;overflow:hidden}\n.tl__r .trk span{flex:1;transition:opacity .2s}\n.tl__r .trk span:hover{opacity:.5}\n.tl__r .val{width:50px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;text-align:right;flex-shrink:0}",
    html: "<div class=\"tl\">\n  <div class=\"tl__h\"><span></span><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>T8</span><span>T9</span><span>T10</span></div>\n  <div class=\"tl__r\"><span class=\"lbl\">Speed</span><div class=\"trk\"><span style=\"background:var(--accent,#E55B2B);opacity:.3\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.5\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.8\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.4\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.2\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.6\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.9\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.7\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.5\"></span><span style=\"background:var(--accent,#E55B2B);opacity:.3\"></span></div><span class=\"val\" style=\"color:var(--accent,#E55B2B)\">287</span></div>\n  <div class=\"tl__r\"><span class=\"lbl\">RPM</span><div class=\"trk\"><span style=\"background:var(--accent2,#4A5D3A);opacity:.4\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.6\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.9\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.5\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.3\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.7\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:1\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.8\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.6\"></span><span style=\"background:var(--accent2,#4A5D3A);opacity:.4\"></span></div><span class=\"val\" style=\"color:var(--accent2,#4A5D3A)\">10,200</span></div>\n  <div class=\"tl__r\"><span class=\"lbl\">Gear</span><div class=\"trk\"><span style=\"background:var(--accent3,#8B7355);opacity:.4\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.5\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.8\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.6\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.3\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.7\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.9\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.7\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.5\"></span><span style=\"background:var(--accent3,#8B7355);opacity:.3\"></span></div><span class=\"val\" style=\"color:var(--accent3,#8B7355)\">8</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 37,
    name: "Lap Compare (Side-by-Side)",
    source: "f1-telemetry.html",
    category: "section",
    css: ".lc{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--line,#E5E5E0);margin-top:24px}\n.lc__i{padding:24px;background:var(--page,#FAFAF8);text-align:center}\n.lc__n{font-weight:700;font-size:14px;margin-bottom:8px}\n.lc__t{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:600;letter-spacing:-.5px}\n.lc__d{font-size:11px;color:var(--text2,#6B6B6B);margin-top:4px}\n.lc__g{display:flex;gap:2px;height:40px;align-items:flex-end;justify-content:center;margin-top:12px}\n.lc__g span{width:6px;border-radius:2px 2px 0 0}",
    html: "<div class=\"lc\">\n  <div class=\"lc__i\"><div class=\"lc__n\" style=\"color:var(--accent,#E55B2B)\">Verstappen</div><div class=\"lc__t\" style=\"color:var(--accent,#E55B2B)\">1:12.462</div><div class=\"lc__d\">Pole position · Q3</div><div class=\"lc__g\"><span style=\"height:70%;background:var(--accent,#E55B2B)\"></span><span style=\"height:85%;background:var(--accent,#E55B2B)\"></span><span style=\"height:100%;background:var(--accent,#E55B2B)\"></span><span style=\"height:60%;background:var(--accent,#E55B2B)\"></span><span style=\"height:90%;background:var(--accent,#E55B2B)\"></span></div></div>\n  <div class=\"lc__i\"><div class=\"lc__n\" style=\"color:var(--accent2,#4A5D3A)\">Hamilton</div><div class=\"lc__t\" style=\"color:var(--accent2,#4A5D3A)\">1:12.831</div><div class=\"lc__d\">P2 · +0.369s</div><div class=\"lc__g\"><span style=\"height:65%;background:var(--accent2,#4A5D3A)\"></span><span style=\"height:80%;background:var(--accent2,#4A5D3A)\"></span><span style=\"height:95%;background:var(--accent2,#4A5D3A)\"></span><span style=\"height:55%;background:var(--accent2,#4A5D3A)\"></span><span style=\"height:85%;background:var(--accent2,#4A5D3A)\"></span></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 38,
    name: "Pit Stop Data",
    source: "f1-telemetry.html",
    category: "detail",
    css: ".pt{padding:24px;background:var(--card2,#F5F5F0);border-radius:8px;margin-top:24px}\n.pt__g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:16px}\n.pt__i{text-align:center;padding:16px;background:var(--card,#FFFFFF);border-radius:6px}\n.pt__l{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3,#A0A0A0)}\n.pt__v{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:600;margin-top:4px}\n.pt__d{font-size:10px;color:var(--text2,#6B6B6B);margin-top:2px}",
    html: "<div class=\"pt\">\n  <div style=\"display:flex;justify-content:space-between;align-items:baseline\"><span style=\"font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600\">Fastest Pit Stops · Monaco GP</span><span style=\"font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3,#A0A0A0)\">2026 season</span></div>\n  <div class=\"pt__g\">\n    <div class=\"pt__i\"><div class=\"pt__l\">1st</div><div class=\"pt__v\" style=\"color:var(--accent,#E55B2B)\">1.92s</div><div class=\"pt__d\">Red Bull</div></div>\n    <div class=\"pt__i\"><div class=\"pt__l\">2nd</div><div class=\"pt__v\" style=\"color:var(--accent2,#4A5D3A)\">2.04s</div><div class=\"pt__d\">Ferrari</div></div>\n    <div class=\"pt__i\"><div class=\"pt__l\">3rd</div><div class=\"pt__v\" style=\"color:var(--accent3,#8B7355)\">2.11s</div><div class=\"pt__d\">Mercedes</div></div>\n    <div class=\"pt__i\"><div class=\"pt__l\">Avg</div><div class=\"pt__v\">2.34s</div><div class=\"pt__d\">Field average</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 39,
    name: "Championship Standings",
    source: "f1-telemetry.html",
    category: "section",
    css: ".st{display:flex;flex-direction:column;gap:2px;margin-top:24px}\n.st__r{display:grid;grid-template-columns:30px 1fr 80px 80px 60px;gap:8px;align-items:center;padding:8px 16px;border-radius:4px;font-size:13px;transition:background .2s}\n.st__r:hover{background:var(--card2,#F5F5F0)}\n.st__r--h{font-size:10px;color:var(--text3,#A0A0A0);text-transform:uppercase;letter-spacing:.04em;font-family:'JetBrains Mono',monospace}\n.st__r--hl{background:var(--card2,#F5F5F0);border-left:2px solid var(--accent,#E55B2B)}\n.st__p{font-family:'JetBrains Mono',monospace;color:var(--text3,#A0A0A0)}\n.st__n{font-weight:600}\n.st__pt{font-family:'JetBrains Mono',monospace;font-weight:600;text-align:right}\n.st__w{font-family:'JetBrains Mono',monospace;text-align:right;color:var(--text2,#6B6B6B)}",
    html: "<div class=\"st\">\n  <div class=\"st__r st__r--h\"><span>Pos</span><span>Driver</span><span>Team</span><span>Pts</span><span>Wins</span></div>\n  <div class=\"st__r st__r--hl\"><span class=\"st__p\">1</span><span class=\"st__n\">Verstappen</span><span style=\"color:var(--text2,#6B6B6B);font-size:12px\">Red Bull</span><span class=\"st__pt\">187</span><span class=\"st__w\">6</span></div>\n  <div class=\"st__r\"><span class=\"st__p\">2</span><span class=\"st__n\">Leclerc</span><span style=\"color:var(--text2,#6B6B6B);font-size:12px\">Ferrari</span><span class=\"st__pt\">143</span><span class=\"st__w\">4</span></div>\n  <div class=\"st__r\"><span class=\"st__p\">3</span><span class=\"st__n\">Norris</span><span style=\"color:var(--text2,#6B6B6B);font-size:12px\">McLaren</span><span class=\"st__pt\">128</span><span class=\"st__w\">3</span></div>\n  <div class=\"st__r\"><span class=\"st__p\">4</span><span class=\"st__n\">Hamilton</span><span style=\"color:var(--text2,#6B6B6B);font-size:12px\">Mercedes</span><span class=\"st__pt\">112</span><span class=\"st__w\">2</span></div>\n  <div class=\"st__r\"><span class=\"st__p\">5</span><span class=\"st__n\">Sainz</span><span style=\"color:var(--text2,#6B6B6B);font-size:12px\">Ferrari</span><span class=\"st__pt\">98</span><span class=\"st__w\">1</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 40,
    name: "Car Specs Grid",
    source: "f1-telemetry.html",
    category: "detail",
    css: ".cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}\n.cs__i{padding:24px;background:var(--card2,#F5F5F0);border-radius:8px;text-align:center}\n.cs__l{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3,#A0A0A0)}\n.cs__v{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:600;margin-top:4px}\n.cs__d{font-size:10px;color:var(--text2,#6B6B6B);margin-top:4px}",
    html: "<div class=\"cs\">\n  <div class=\"cs__i\"><div class=\"cs__l\">Engine</div><div class=\"cs__v\" style=\"color:var(--accent,#E55B2B)\">1.6L V6</div><div class=\"cs__d\">Twin-turbo hybrid</div></div>\n  <div class=\"cs__i\"><div class=\"cs__l\">Power</div><div class=\"cs__v\" style=\"color:var(--accent2,#4A5D3A)\">1,050 hp</div><div class=\"cs__d\">ICE + MGU-K</div></div>\n  <div class=\"cs__i\"><div class=\"cs__l\">Weight</div><div class=\"cs__v\" style=\"color:var(--accent3,#8B7355)\">798 kg</div><div class=\"cs__d\">Minimum dry weight</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 41,
    name: "Economist Cover Story Hero",
    source: "economist-red-bar.html",
    category: "hero",
    css: ".cv{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;border-bottom:4px solid #E55B2B}\n.cv__tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#A0A0A0;margin-bottom:8px}\n.cv__bar{width:60px;height:4px;background:#E55B2B;margin-bottom:8px}\n.cv__h{font-family:Georgia,'Times New Roman',serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:700;line-height:1;letter-spacing:-3px;color:#2C2C2C;max-width:700px;margin-bottom:8px}\n.cv__sub{font-size:20px;color:#6B6B6B;line-height:1.6;max-width:500px;margin-bottom:24px}\n.cv__meta{display:flex;gap:16px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em}\n.cv__deco{position:absolute;right:120px;bottom:120px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(6rem,12vw,12rem);font-weight:700;line-height:.8;letter-spacing:-6px;color:#E55B2B;opacity:.04;user-select:none}",
    html: "<section class=\"cv\">\n  <div class=\"cv__tag\">Iconic Data Viz · The Red Bar</div>\n  <div class=\"cv__bar\"></div>\n  <h1 class=\"cv__h\">The signal<br>in the noise.</h1>\n  <p class=\"cv__sub\">A single red bar is worth a thousand words. How a chart style became an editorial identity.</p>\n  <div class=\"cv__meta\"><span>1843 · Founded</span><span>Red · 4px bar</span><span>1M+ charts published</span></div>\n  <div class=\"cv__deco\">RED</div>\n</section>",
    hasJS: false
  },
  {
    id: 42,
    name: "Red Bar Chart (Horizontal)",
    source: "economist-red-bar.html",
    category: "chart",
    css: ".rb__g{display:flex;flex-direction:column;gap:4px;margin-top:60px;max-width:600px}\n.rb__r{display:grid;grid-template-columns:80px 1fr 60px;gap:6px;align-items:center}\n.rb__l{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#1A1A1A;letter-spacing:.02em;text-align:right}\n.rb__t{height:28px;background:#FFFFFF;border-radius:0 4px 4px 0;position:relative;overflow:hidden}\n.rb__f{height:100%;border-radius:0 4px 4px 0;background:#E55B2B;transition:width .5s cubic-bezier(.16,1,.3,1)}\n.rb__f--s{background:#6B6B6B}.rb__f--t{background:#4A5D3A}\n.rb__v{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#2C2C2C}\n.rb__hl .rb__l{color:#E55B2B}.rb__hl .rb__t{background:rgba(229,91,43,.06)}",
    html: "<div class=\"rb__g\">\n  <div class=\"rb__r rb__hl\"><span class=\"rb__l\">GDP Growth</span><div class=\"rb__t\"><div class=\"rb__f\" style=\"width:72%\"></div></div><span class=\"rb__v\">+5.2%</span></div>\n  <div class=\"rb__r\"><span class=\"rb__l\">Inflation</span><div class=\"rb__t\"><div class=\"rb__f rb__f--s\" style=\"width:45%\"></div></div><span class=\"rb__v\">+3.1%</span></div>\n  <div class=\"rb__r\"><span class=\"rb__l\">Unemployment</span><div class=\"rb__t\"><div class=\"rb__f rb__f--t\" style=\"width:38%\"></div></div><span class=\"rb__v\">+2.7%</span></div>\n  <div class=\"rb__r\"><span class=\"rb__l\">Trade Balance</span><div class=\"rb__t\"><div class=\"rb__f\" style=\"width:58%\"></div></div><span class=\"rb__v\">+4.1%</span></div>\n  <div class=\"rb__r\"><span class=\"rb__l\">Consumer Confidence</span><div class=\"rb__t\"><div class=\"rb__f\" style=\"width:63%\"></div></div><span class=\"rb__v\">+4.5%</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 43,
    name: "Data Spread (3-Col Big Numbers)",
    source: "economist-red-bar.html",
    category: "section",
    css: ".ds__g{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}\n.ds__i{position:relative}\n.ds__i::before{content:'';position:absolute;top:-24px;left:0;width:32px;height:2px;background:#E55B2B}\n.ds__n{font-family:'JetBrains Mono',monospace;font-size:64px;font-weight:600;line-height:1;color:#2C2C2C;letter-spacing:-3px;margin-bottom:4px}\n.ds__n .pc{font-size:16px;color:#E55B2B}\n.ds__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}\n.ds__d{font-size:12px;color:#6B6B6B;line-height:1.6}",
    html: "<div class=\"ds__g\">\n  <div class=\"ds__i\"><div class=\"ds__n\">124<span class=\"pc\">%</span></div><div class=\"ds__l\">Trade Volume</div><div class=\"ds__d\">Global trade as share of GDP · 2025</div></div>\n  <div class=\"ds__i\"><div class=\"ds__n\">67<span class=\"pc\">%</span></div><div class=\"ds__l\">Digital Economy</div><div class=\"ds__d\">Contribution to global productivity growth</div></div>\n  <div class=\"ds__i\"><div class=\"ds__n\">8.2<span class=\"pc\">B</span></div><div class=\"ds__l\">Connected</div><div class=\"ds__d\">People connected to the internet worldwide</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 44,
    name: "World in Numbers (Dark Grid)",
    source: "economist-red-bar.html",
    category: "chart",
    css: ".wn__g{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:60px;background:rgba(255,255,255,.06)}\n.wn__i{padding:40px 12px;text-align:center;transition:background .2s}\n.wn__i:hover{background:rgba(255,255,255,.03)}\n.wn__c{font-family:'JetBrains Mono',monospace;font-size:48px;font-weight:600;line-height:1;color:#fff;letter-spacing:-2px;margin-bottom:4px}\n.wn__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}\n.wn__b{height:2px;background:rgba(255,255,255,.06);overflow:hidden;border-radius:1px}\n.wn__f{height:100%}",
    html: "<div class=\"wn__g\">\n  <div class=\"wn__i\"><div class=\"wn__c\">67%</div><div class=\"wn__l\">Urbanization</div><div class=\"wn__b\"><div class=\"wn__f\" style=\"width:67%;background:#E55B2B\"></div></div></div>\n  <div class=\"wn__i\"><div class=\"wn__c\">82%</div><div class=\"wn__l\">Literacy</div><div class=\"wn__b\"><div class=\"wn__f\" style=\"width:82%;background:#E55B2B\"></div></div></div>\n  <div class=\"wn__i\"><div class=\"wn__c\">73%</div><div class=\"wn__l\">Life Expectancy</div><div class=\"wn__b\"><div class=\"wn__f\" style=\"width:73%;background:#E55B2B\"></div></div></div>\n  <div class=\"wn__i\"><div class=\"wn__c\">91%</div><div class=\"wn__l\">Electricity Access</div><div class=\"wn__b\"><div class=\"wn__f\" style=\"width:91%;background:#E55B2B\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 45,
    name: "Editorial Spread (2-Col Narrative)",
    source: "economist-red-bar.html",
    category: "section",
    css: ".es__g{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:60px}\n.es__l{border-top:2px solid #E55B2B;padding-top:6px}\n.es__n{font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#2C2C2C;letter-spacing:-.5px;margin-bottom:4px;line-height:1.2}\n.es__d{font-size:14px;color:#6B6B6B;line-height:1.8;margin-bottom:4px}\n.es__s{display:flex;gap:4px;align-items:center}\n.es__b{width:40px;height:3px;background:#E55B2B}\n.es__t{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em}",
    html: "<div class=\"es__g\">\n  <div class=\"es__l\">\n    <div class=\"es__n\">The rise of<br>Asian economies</div>\n    <p class=\"es__d\">By 2030, Asia will account for over 50% of global GDP. The shift east is redefining trade, technology, and geopolitical influence.</p>\n    <div class=\"es__s\"><div class=\"es__b\"></div><span class=\"es__t\">Read full brief</span></div>\n  </div>\n  <div class=\"es__l\">\n    <div class=\"es__n\">The cost of<br>climate inaction</div>\n    <p class=\"es__d\">Every year of delay adds $500bn to the global cost of transition. The window for action is narrowing — and the price is rising.</p>\n    <div class=\"es__s\"><div class=\"es__b\"></div><span class=\"es__t\">Read full brief</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 46,
    name: "Indicator Grid (6-Col Markets)",
    source: "economist-red-bar.html",
    category: "chart",
    css: ".ind__g{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:60px}\n.ind__i{text-align:center}\n.ind__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;color:#2C2C2C;letter-spacing:-.5px}\n.ind__v .ch{font-size:12px}\n.ind__v .up{color:#E55B2B}.ind__v .dn{color:#6B6B6B}\n.ind__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}",
    html: "<div class=\"ind__g\">\n  <div class=\"ind__i\"><div class=\"ind__v\">42,386<span class=\"ch up\"> ▲</span></div><div class=\"ind__l\">S&P 500</div></div>\n  <div class=\"ind__i\"><div class=\"ind__v\">1.08<span class=\"ch dn\"> ▼</span></div><div class=\"ind__l\">EUR/USD</div></div>\n  <div class=\"ind__i\"><div class=\"ind__v\">3,240<span class=\"ch up\"> ▲</span></div><div class=\"ind__l\">Gold</div></div>\n  <div class=\"ind__i\"><div class=\"ind__v\">2.84<span class=\"ch dn\"> ▼</span></div><div class=\"ind__l\">10Y Treasury</div></div>\n  <div class=\"ind__i\"><div class=\"ind__v\">78.4<span class=\"ch up\"> ▲</span></div><div class=\"ind__l\">Brent Oil</div></div>\n  <div class=\"ind__i\"><div class=\"ind__v\">0.92<span class=\"ch up\"> ▲</span></div><div class=\"ind__l\">Bitcoin</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 47,
    name: "Deep System Hero (Bar Mini-Chart)",
    source: "economist-deep-system.html",
    category: "hero",
    css: ".cv__say{font-family:Georgia,'Times New Roman',serif;font-size:12px;color:#6B6B6B;font-style:italic;margin-bottom:8px}\n.cv__chart{display:flex;gap:4px;align-items:flex-end;max-width:600px;height:160px}\n.cv__chart div{flex:1;border-radius:2px 2px 0 0;transition:height .5s cubic-bezier(.16,1,.3,1)}\n.cv__chart .b{background:#E55B2B}.cv__chart .g{background:#E5E5E0}.cv__chart .h{background:#E55B2B;opacity:.5}\n.cv__ft{display:flex;gap:8px;margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;border-top:1px solid #E5E5E0;padding-top:4px}",
    html: "<section class=\"cv\">\n  <div class=\"cv__tag\">Iconic Data Viz · The Chart System</div>\n  <div class=\"cv__say\">\"The red bar is not a chart style. It is a signature.\"</div>\n  <h1 class=\"cv__h\">Red as<br>a language.</h1>\n  <p class=\"cv__sub\">Five chart types. One brand color. An entire visual grammar.</p>\n  <div class=\"cv__chart\">\n    <div class=\"b\" style=\"height:30%\"></div><div class=\"b\" style=\"height:55%\"></div><div class=\"b\" style=\"height:42%\"></div><div class=\"b\" style=\"height:78%\"></div><div class=\"b\" style=\"height:65%\"></div>\n    <div class=\"b\" style=\"height:90%\"></div><div class=\"b\" style=\"height:72%\"></div><div class=\"b\" style=\"height:58%\"></div><div class=\"b\" style=\"height:85%\"></div><div class=\"b\" style=\"height:60%\"></div>\n    <div class=\"b\" style=\"height:40%\"></div><div class=\"b\" style=\"height:70%\"></div><div class=\"b\" style=\"height:95%\"></div><div class=\"b\" style=\"height:55%\"></div><div class=\"b\" style=\"height:38%\"></div>\n    <div class=\"g\" style=\"height:45%\"></div><div class=\"g\" style=\"height:62%\"></div><div class=\"g\" style=\"height:50%\"></div><div class=\"g\" style=\"height:75%\"></div><div class=\"g\" style=\"height:48%\"></div>\n    <div class=\"h\" style=\"height:35%\"></div><div class=\"h\" style=\"height:52%\"></div><div class=\"h\" style=\"height:68%\"></div><div class=\"h\" style=\"height:45%\"></div><div class=\"h\" style=\"height:80%\"></div>\n  </div>\n  <div class=\"cv__deco\">RED</div>\n</section>",
    hasJS: false
  },
  {
    id: 48,
    name: "Line Chart (SVG Trend)",
    source: "economist-deep-system.html",
    category: "chart",
    css: ".ln__svg{width:100%;height:180px;margin-top:4px}\n.ln__svg path{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.ln__lb{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;margin-top:2px}\n.ln__g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px;border-top:1px solid #E5E5E0;padding-top:6px}\n.ln__i{text-align:center}\n.ln__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;color:#2C2C2C;letter-spacing:-.5px}\n.ln__i .chg{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}\n.ln__i .up{color:#E55B2B}.ln__i .dn{color:#6B6B6B}\n.ln__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}",
    html: "<svg class=\"ln__svg\" viewBox=\"0 0 720 180\" preserveAspectRatio=\"none\">\n  <path d=\"M0 160 Q30 155 60 140 T120 110 T180 85 T240 65 T300 50 T360 40 T420 35 T480 30 T540 28 T600 25 T660 22 T720 20\" stroke=\"#E55B2B\" stroke-width=\"2\"/>\n  <path d=\"M0 160 Q30 155 60 140 T120 110 T180 85 T240 65 T300 50 T360 40 T420 35 T480 30 T540 28 T600 25 T660 22 T720 20\" stroke=\"rgba(229,91,43,.06)\" stroke-width=\"20\" fill=\"none\" stroke-linecap=\"round\"/>\n</svg>\n<div class=\"ln__lb\"><span>2015</span><span>2017</span><span>2019</span><span>2021</span><span>2023</span><span>2025</span></div>\n<div class=\"ln__g\">\n  <div class=\"ln__i\"><div class=\"ln__v\">42,386<span class=\"chg up\"> ▲5.2%</span></div><div class=\"ln__l\">S&P 500</div></div>\n  <div class=\"ln__i\"><div class=\"ln__v\">3,240<span class=\"chg up\"> ▲1.8%</span></div><div class=\"ln__l\">Gold</div></div>\n  <div class=\"ln__i\"><div class=\"ln__v\">78.4<span class=\"chg dn\"> ▼2.1%</span></div><div class=\"ln__l\">Brent Oil</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 49,
    name: "Scatter Focus Cards (3-Col)",
    source: "economist-deep-system.html",
    category: "section",
    css: ".sc__g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px}\n.sc__c{text-align:center;padding:8px;background:#FFFFFF;border:1px solid #E5E5E0;border-radius:4px}\n.sc__c--hl{border-left:3px solid #E55B2B}\n.sc__n{font-family:'JetBrains Mono',monospace;font-size:48px;font-weight:600;line-height:1;color:#2C2C2C;letter-spacing:-2px;margin-bottom:2px}\n.sc__n .pc{font-size:16px;color:#E55B2B}\n.sc__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}\n.sc__d{font-size:12px;color:#6B6B6B;line-height:1.5}",
    html: "<div class=\"sc__g\">\n  <div class=\"sc__c sc__c--hl\">\n    <div class=\"sc__n\">67<span class=\"pc\">%</span></div>\n    <div class=\"sc__l\">Digital Economy</div>\n    <div class=\"sc__d\">Share of global GDP growth · 2025</div>\n  </div>\n  <div class=\"sc__c\">\n    <div class=\"sc__n\">124<span class=\"pc\">%</span></div>\n    <div class=\"sc__l\">Trade Volume</div>\n    <div class=\"sc__d\">As share of GDP · Record high</div>\n  </div>\n  <div class=\"sc__c\">\n    <div class=\"sc__n\">8.2<span class=\"pc\">B</span></div>\n    <div class=\"sc__l\">Connected</div>\n    <div class=\"sc__d\">People online worldwide · 2026</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 50,
    name: "Data Table (Economist Style)",
    source: "economist-deep-system.html",
    category: "section",
    css: ".tb__g{width:100%;margin-top:4px}\n.tb__r{display:grid;grid-template-columns:1fr 80px 80px 80px;gap:0;padding:8px 4px;border-bottom:1px solid #E5E5E0;align-items:center;font-size:12px}\n.tb__r--h{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;border-bottom:2px solid #2C2C2C;padding:4px 4px}\n.tb__r--s{background:#F5F5F0;font-weight:600}\n.tb__n{font-weight:500}\n.tb__v{font-family:'JetBrains Mono',monospace;text-align:center}\n.tb__v .up{color:#E55B2B}.tb__v .dn{color:#6B6B6B}",
    html: "<div class=\"tb__g\">\n  <div class=\"tb__r tb__r--h\"><span>Economy</span><span>GDP</span><span>Inflation</span><span>Unemp.</span></div>\n  <div class=\"tb__r tb__r--s\"><span class=\"tb__n\">United States</span><span class=\"tb__v\"><span class=\"up\">+2.8%</span></span><span class=\"tb__v\">3.1%</span><span class=\"tb__v\">3.7%</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">Eurozone</span><span class=\"tb__v\"><span class=\"dn\">+0.8%</span></span><span class=\"tb__v\">2.4%</span><span class=\"tb__v\">6.5%</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">China</span><span class=\"tb__v\"><span class=\"up\">+4.6%</span></span><span class=\"tb__v\">0.3%</span><span class=\"tb__v\">5.1%</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">India</span><span class=\"tb__v\"><span class=\"up\">+6.3%</span></span><span class=\"tb__v\">4.1%</span><span class=\"tb__v\">4.2%</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">Japan</span><span class=\"tb__v\"><span class=\"dn\">+1.2%</span></span><span class=\"tb__v\">2.8%</span><span class=\"tb__v\">2.5%</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 51,
    name: "Area Chart (Dark SVG Fill)",
    source: "economist-deep-system.html",
    category: "chart",
    css: ".ar__svg{width:100%;height:160px;margin-top:4px}\n.ar__svg path{fill:rgba(229,91,43,.1);stroke:#E55B2B;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.ar__lb{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.2);margin-top:2px}\n.ar__g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,.06)}\n.ar__i{text-align:center}\n.ar__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;color:#fff;letter-spacing:-.5px}\n.ar__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.06em;margin-top:2px}",
    html: "<svg class=\"ar__svg\" viewBox=\"0 0 720 160\" preserveAspectRatio=\"none\">\n  <path d=\"M0 150 Q20 145 40 135 T80 115 T120 95 T160 75 T200 60 T240 48 T280 38 T320 30 T360 25 T400 22 T440 18 T480 16 T520 14 T560 12 T600 10 T640 8 T680 7 T720 6 L720 160 L0 160 Z\"/>\n</svg>\n<div class=\"ar__lb\"><span>2015</span><span>2017</span><span>2019</span><span>2021</span><span>2023</span><span>2025</span></div>\n<div class=\"ar__g\">\n  <div class=\"ar__i\"><div class=\"ar__v\">$12.4T</div><div class=\"ar__l\">Digital Economy</div></div>\n  <div class=\"ar__i\"><div class=\"ar__v\">67%</div><div class=\"ar__l\">of Global GDP</div></div>\n  <div class=\"ar__i\"><div class=\"ar__v\">+8.2%</div><div class=\"ar__l\">Annual Growth</div></div>\n  <div class=\"ar__i\"><div class=\"ar__v\">240</div><div class=\"ar__l\">Countries</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 52,
    name: "Data Annotation (Quote + Method)",
    source: "economist-deep-system.html",
    category: "detail",
    css: ".dc__g{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}\n.dc__l{border-left:3px solid #E55B2B;padding:6px 8px;background:#FFFFFF}\n.dc__t{font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;font-style:italic;color:#2C2C2C;margin-bottom:4px;line-height:1.5}\n.dc__s{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em}\n.dc__b{background:#FFFFFF;padding:6px;border:1px solid #E5E5E0}\n.dc__m{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#2C2C2C;letter-spacing:.02em;margin-bottom:2px}\n.dc__d{font-size:12px;color:#6B6B6B;line-height:1.6}\n.dc__f{display:flex;gap:2px;margin-top:4px}\n.dc__f span{width:6px;height:6px;border-radius:50%;background:#E5E5E0}\n.dc__f .a{background:#E55B2B}.dc__f .b{background:#4A5D3A}",
    html: "<div class=\"dc__g\">\n  <div class=\"dc__l\">\n    <p class=\"dc__t\">\"The striking feature of this data is not the average — it is the tail. The top 10% account for 72% of the total, a concentration unseen in any previous cycle.\"</p>\n    <span class=\"dc__s\">Data team · 2026</span>\n  </div>\n  <div class=\"dc__b\">\n    <div class=\"dc__m\">Methodology note</div>\n    <p class=\"dc__d\">Data sourced from 240 countries. Adjusted for purchasing power parity. Rolling 12-month average.</p>\n    <div class=\"dc__f\"><span class=\"a\"></span><span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 53,
    name: "FT Market Dashboard Hero",
    source: "ft-pink-charts.html",
    category: "hero",
    css: ".mh{min-height:100vh;background:#F8F7F5;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative}\n.mh::after{content:'FT';position:absolute;right:-.03em;bottom:-.08em;font-family:Georgia,'Times New Roman',serif;font-size:clamp(10rem,20vw,20rem);font-weight:700;line-height:.8;letter-spacing:-.06em;color:#E55B2B;opacity:.025;pointer-events:none;user-select:none}\n.mh__tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#A0A0A0;margin-bottom:4px}\n.mh__h{font-family:Georgia,'Times New Roman',serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:700;line-height:1;letter-spacing:-2px;color:#1A1A1A;max-width:600px;margin-bottom:40px}\n.mh__board{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:900px}\n.mh__i{padding:6px;background:#FFFFFF;border:1px solid #E8E5E0;border-radius:4px}\n.mh__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}\n.mh__v{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:600;line-height:1;color:#1A1A1A;letter-spacing:-1px;display:flex;align-items:baseline;gap:2px}\n.mh__c{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600}\n.mh__up{color:#E55B2B}.mh__dn{color:#6B6B6B}",
    html: "<section class=\"mh\">\n  <div class=\"mh__tag\">Iconic Data Viz · Pink as Brand</div>\n  <h1 class=\"mh__h\">The colour of<br>financial data.</h1>\n  <div class=\"mh__board\">\n    <div class=\"mh__i\"><div class=\"mh__l\">S&P 500</div><div class=\"mh__v\">5,846<span class=\"mh__c mh__up\"> ▲1.2%</span></div></div>\n    <div class=\"mh__i\"><div class=\"mh__l\">FTSE 100</div><div class=\"mh__v\">8,234<span class=\"mh__c mh__dn\"> ▼0.4%</span></div></div>\n    <div class=\"mh__i\"><div class=\"mh__l\">Nikkei 225</div><div class=\"mh__v\">39,412<span class=\"mh__c mh__up\"> ▲0.8%</span></div></div>\n    <div class=\"mh__i\"><div class=\"mh__l\">DAX</div><div class=\"mh__v\">18,567<span class=\"mh__c mh__up\"> ▲0.3%</span></div></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 54,
    name: "Pink Line Chart (SVG Dual Line)",
    source: "ft-pink-charts.html",
    category: "chart",
    css: ".pl__svg{width:100%;height:200px}\n.pl__svg path{fill:none;stroke:#E55B2B;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.pl__lb{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;margin-top:2px}\n.pl__g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px;border-top:1px solid #E8E5E0;padding-top:6px}\n.pl__i{text-align:center}\n.pl__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;color:#1A1A1A;letter-spacing:-.5px}\n.pl__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}",
    html: "<svg class=\"pl__svg\" viewBox=\"0 0 720 200\" preserveAspectRatio=\"none\">\n  <path d=\"M0 180 Q20 175 40 165 T80 145 T120 120 T160 100 T200 85 T240 70 T280 58 T320 48 T360 42 T400 38 T440 32 T480 28 T520 24 T560 20 T600 18 T640 15 T680 13 T720 12\" stroke=\"#E55B2B\" stroke-width=\"2\"/>\n  <path d=\"M0 180 Q20 175 40 165 T80 145 T120 120 T160 100 T200 85 T240 70 T280 58 T320 48 T360 42 T400 38 T440 32 T480 28 T520 24 T560 20 T600 18 T640 15 T680 13 T720 12\" stroke=\"rgba(229,91,43,.04)\" stroke-width=\"30\" fill=\"none\" stroke-linecap=\"round\"/>\n  <path d=\"M0 185 Q20 182 40 178 T80 170 T120 158 T160 148 T200 140 T240 132 T280 125 T320 118 T360 112 T400 108 T440 102 T480 98 T520 94 T560 90 T600 88 T640 84 T680 80 T720 78\" stroke=\"#8B7355\" stroke-width=\"1.5\" fill=\"none\" stroke-dasharray=\"4 4\" stroke-linecap=\"round\"/>\n</svg>\n<div class=\"pl__lb\"><span>2015</span><span>2017</span><span>2019</span><span>2021</span><span>2023</span><span>2025</span></div>\n<div class=\"pl__g\">\n  <div class=\"pl__i\"><div class=\"pl__v\">5,846</div><div class=\"pl__l\">S&P 500</div></div>\n  <div class=\"pl__i\"><div class=\"pl__v\">42,386</div><div class=\"pl__l\">Dow Jones</div></div>\n  <div class=\"pl__i\"><div class=\"pl__v\">18,567</div><div class=\"pl__l\">DAX</div></div>\n  <div class=\"pl__i\"><div class=\"pl__v\">39,412</div><div class=\"pl__l\">Nikkei</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 55,
    name: "Sector Analysis Cards",
    source: "ft-pink-charts.html",
    category: "section",
    css: ".sa__g{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:4px}\n.sa__c{padding:8px;background:#FFFFFF;border:1px solid #E8E5E0;border-radius:4px}\n.sa__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}\n.sa__r{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #E8E5E0;font-size:12px}\n.sa__r:last-child{border-bottom:none}\n.sa__k{color:#6B6B6B}\n.sa__v{font-family:'JetBrains Mono',monospace;font-weight:600}\n.sa__v .up{color:#E55B2B}.sa__v .dn{color:#6B6B6B}",
    html: "<div class=\"sa__g\">\n  <div class=\"sa__c\">\n    <div class=\"sa__l\">Technology</div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Revenue Growth</span><span class=\"sa__v\"><span class=\"up\">+12.4%</span></span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Operating Margin</span><span class=\"sa__v\">28.6%</span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">R&D Spend</span><span class=\"sa__v\">$342B</span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Market Cap</span><span class=\"sa__v\"><span class=\"up\">+18.2%</span></span></div>\n  </div>\n  <div class=\"sa__c\">\n    <div class=\"sa__l\">Healthcare</div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Revenue Growth</span><span class=\"sa__v\"><span class=\"up\">+8.6%</span></span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Operating Margin</span><span class=\"sa__v\">22.1%</span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">R&D Spend</span><span class=\"sa__v\">$238B</span></div>\n    <div class=\"sa__r\"><span class=\"sa__k\">Market Cap</span><span class=\"sa__v\"><span class=\"up\">+6.4%</span></span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 56,
    name: "Data Story (2-Col Narrative)",
    source: "ft-pink-charts.html",
    category: "section",
    css: ".ds__g{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:4px}\n.ds__l{border-top:2px solid #E55B2B;padding-top:6px}\n.ds__n{font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#1A1A1A;letter-spacing:-.5px;margin-bottom:4px;line-height:1.2}\n.ds__d{font-size:14px;color:#6B6B6B;line-height:1.8;margin-bottom:4px}\n.ds__s{display:flex;gap:4px;align-items:center}\n.ds__b{width:32px;height:2px;background:#E55B2B}\n.ds__t{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em}",
    html: "<div class=\"ds__g\">\n  <div class=\"ds__l\">\n    <div class=\"ds__n\">The rise of<br>passive investing</div>\n    <p class=\"ds__d\">Assets under management in passive funds have surpassed active for the first time. A structural shift reshaping the entire asset management industry.</p>\n    <div class=\"ds__s\"><div class=\"ds__b\"></div><span class=\"ds__t\">Read analysis</span></div>\n  </div>\n  <div class=\"ds__l\">\n    <div class=\"ds__n\">Bond yields<br>and the new normal</div>\n    <p class=\"ds__d\">After a decade of near-zero rates, bond markets have repriced. What this means for portfolios, pensions, and the cost of capital.</p>\n    <div class=\"ds__s\"><div class=\"ds__b\"></div><span class=\"ds__t\">Read analysis</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 57,
    name: "Global Markets (Dark Grid)",
    source: "ft-pink-charts.html",
    category: "chart",
    css: ".gl__g{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:4px;background:rgba(255,255,255,.06)}\n.gl__i{padding:8px 6px;text-align:center}\n.gl__r{font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}\n.gl__v{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:600;line-height:1;color:#fff;letter-spacing:-1px;margin-bottom:2px}\n.gl__d{font-size:12px;color:rgba(255,255,255,.25);line-height:1.5}",
    html: "<div class=\"gl__g\">\n  <div class=\"gl__i\"><div class=\"gl__r\">North America</div><div class=\"gl__v\">+4.2%</div><div class=\"gl__d\">GDP growth · 2026</div></div>\n  <div class=\"gl__i\"><div class=\"gl__r\">Europe</div><div class=\"gl__v\">+1.8%</div><div class=\"gl__d\">GDP growth · 2026</div></div>\n  <div class=\"gl__i\"><div class=\"gl__r\">Asia</div><div class=\"gl__v\">+5.6%</div><div class=\"gl__d\">GDP growth · 2026</div></div>\n  <div class=\"gl__i\"><div class=\"gl__r\">Emerging</div><div class=\"gl__v\">+4.8%</div><div class=\"gl__d\">GDP growth · 2026</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 58,
    name: "FT Data Table (5-Col)",
    source: "ft-pink-charts.html",
    category: "section",
    css: ".tb__g{width:100%;margin-top:4px}\n.tb__r{display:grid;grid-template-columns:1fr 80px 80px 80px 80px;gap:0;padding:4px 4px;border-bottom:1px solid #E8E5E0;font-size:12px;align-items:center}\n.tb__r--h{font-family:'JetBrains Mono',monospace;font-size:10px;color:#A0A0A0;text-transform:uppercase;letter-spacing:.06em;border-bottom:2px solid #1A1A1A}\n.tb__r--a{background:#FFFFFF}\n.tb__r--hl{border-left:2px solid #E55B2B;background:#FFFFFF}\n.tb__n{font-weight:500}\n.tb__v{font-family:'JetBrains Mono',monospace;text-align:center}\n.tb__up{color:#E55B2B}.tb__dn{color:#6B6B6B}",
    html: "<div class=\"tb__g\">\n  <div class=\"tb__r tb__r--h\"><span>Country</span><span>GDP</span><span>Inflation</span><span>Unemployment</span><span>PMI</span></div>\n  <div class=\"tb__r tb__r--hl\"><span class=\"tb__n\">United States</span><span class=\"tb__v\"><span class=\"tb__up\">+2.8%</span></span><span class=\"tb__v\">3.1%</span><span class=\"tb__v\">3.7%</span><span class=\"tb__v\">52.1</span></div>\n  <div class=\"tb__r tb__r--a\"><span class=\"tb__n\">United Kingdom</span><span class=\"tb__v\"><span class=\"tb__dn\">+1.2%</span></span><span class=\"tb__v\">2.8%</span><span class=\"tb__v\">4.2%</span><span class=\"tb__v\">48.9</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">Germany</span><span class=\"tb__v\"><span class=\"tb__dn\">+0.8%</span></span><span class=\"tb__v\">2.4%</span><span class=\"tb__v\">6.1%</span><span class=\"tb__v\">47.3</span></div>\n  <div class=\"tb__r tb__r--a\"><span class=\"tb__n\">Japan</span><span class=\"tb__v\"><span class=\"tb__up\">+1.6%</span></span><span class=\"tb__v\">2.2%</span><span class=\"tb__v\">2.5%</span><span class=\"tb__v\">50.4</span></div>\n  <div class=\"tb__r\"><span class=\"tb__n\">China</span><span class=\"tb__v\"><span class=\"tb__up\">+4.6%</span></span><span class=\"tb__v\">0.3%</span><span class=\"tb__v\">5.1%</span><span class=\"tb__v\">51.8</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 59,
    name: "McKinsey Executive Summary",
    source: "mckinsey-consulting.html",
    category: "hero",
    css: ".ex{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px}\n.ex__i{padding:24px;background:var(--card2);border-radius:6px;border-left:3px solid}\n.ex__l{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:4px}\n.ex__v{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:600;letter-spacing:-1px;margin-bottom:4px}\n.ex__d{font-size:12px;color:var(--text2);line-height:1.5}\n.ex__b{height:2px;margin-top:12px;border-radius:1px}",
    html: "<div class=\"ex\">\n  <div class=\"ex__i\" style=\"border-left-color:var(--accent)\"><div class=\"ex__l\">Revenue</div><div class=\"ex__v\" style=\"color:var(--accent)\">$12.4B</div><div class=\"ex__d\">▲ 8.2% YoY growth</div><div class=\"ex__b\" style=\"background:var(--accent);width:82%\"></div></div>\n  <div class=\"ex__i\" style=\"border-left-color:var(--accent2)\"><div class=\"ex__l\">Margin</div><div class=\"ex__v\" style=\"color:var(--accent2)\">22.4%</div><div class=\"ex__d\">▲ 1.2pp expansion</div><div class=\"ex__b\" style=\"background:var(--accent2);width:68%\"></div></div>\n  <div class=\"ex__i\" style=\"border-left-color:var(--accent4)\"><div class=\"ex__l\">Market Cap</div><div class=\"ex__v\" style=\"color:var(--accent4)\">$248B</div><div class=\"ex__d\">▲ 15.6% YTD</div><div class=\"ex__b\" style=\"background:var(--accent4);width:92%\"></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 60,
    name: "McKinsey Waterfall",
    source: "mckinsey-consulting.html",
    category: "section",
    css: ".wf{margin-top:24px;padding:32px;background:var(--card2);border-radius:8px}\n.wf__g{display:flex;flex-direction:column;gap:6px}\n.wf__r{display:grid;grid-template-columns:120px 1fr 80px;gap:16px;align-items:center;font-size:13px}\n.wf__l{font-weight:500}\n.wf__t{height:24px;background:var(--card);border-radius:3px;position:relative;overflow:hidden}\n.wf__f{height:100%;border-radius:3px;transition:width .5s}\n.wf__v{font-family:'JetBrains Mono',monospace;font-weight:600;text-align:right}\n.wf__r--top .wf__f{background:var(--accent)}\n.wf__r--sub .wf__f{background:var(--accent2)}\n.wf__r--base .wf__f{background:var(--accent4)}",
    html: "<div class=\"wf__g\">\n  <div class=\"wf__r wf__r--top\"><span class=\"wf__l\">Revenue</span><div class=\"wf__t\"><div class=\"wf__f\" style=\"width:100%\"></div></div><span class=\"wf__v\" style=\"color:var(--accent)\">$12.4B</span></div>\n  <div class=\"wf__r wf__r--sub\"><span class=\"wf__l\">COGS</span><div class=\"wf__t\"><div class=\"wf__f\" style=\"width:55%\"></div></div><span class=\"wf__v\" style=\"color:var(--accent2)\">-$5.6B</span></div>\n  <div class=\"wf__r wf__r--sub\"><span class=\"wf__l\">SG&A</span><div class=\"wf__t\"><div class=\"wf__f\" style=\"width:24%\"></div></div><span class=\"wf__v\" style=\"color:var(--accent2)\">-$2.8B</span></div>\n  <div class=\"wf__r wf__r--base\"><span class=\"wf__l\">Operating Profit</span><div class=\"wf__t\"><div class=\"wf__f\" style=\"width:100%\"></div></div><span class=\"wf__v\" style=\"color:var(--accent4)\">$2.8B</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 61,
    name: "McKinsey 2x2 Matrix",
    source: "mckinsey-consulting.html",
    category: "section",
    css: ".mx{margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);position:relative}\n.mx::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:var(--text3);opacity:.3}\n.mx::after{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--text3);opacity:.3}\n.mx__i{padding:40px 24px;text-align:center;background:var(--card);transition:background .2s}\n.mx__i:hover{background:var(--card2)}\n.mx__n{font-size:15px;font-weight:600;margin-bottom:4px}\n.mx__d{font-size:11px;color:var(--text2);line-height:1.5;max-width:200px;margin:0 auto}",
    html: "<div class=\"mx\">\n  <div class=\"mx__i\"><div class=\"mx__n\" style=\"color:var(--accent)\">Build</div><div class=\"mx__d\">Invest in core strengths.</div></div>\n  <div class=\"mx__i\"><div class=\"mx__n\" style=\"color:var(--accent2)\">Disrupt</div><div class=\"mx__d\">New business models.</div></div>\n  <div class=\"mx__i\"><div class=\"mx__n\" style=\"color:var(--accent3)\">Defend</div><div class=\"mx__d\">Optimize operations.</div></div>\n  <div class=\"mx__i\"><div class=\"mx__n\" style=\"color:var(--accent4)\">Exit</div><div class=\"mx__d\">Divest non-core.</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 62,
    name: "McKinsey Bubble Chart",
    source: "mckinsey-consulting.html",
    category: "section",
    css: ".bb{display:flex;gap:32px;justify-content:center;align-items:center;margin-top:24px;padding:40px;background:var(--card2);border-radius:8px;flex-wrap:wrap}\n.bb__i{display:flex;flex-direction:column;align-items:center;gap:8px}\n.bb__c{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}\n.bb__c--lg{width:120px;height:120px}\n.bb__c--md{width:90px;height:90px}\n.bb__c--sm{width:60px;height:60px}\n.bb__l{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;color:#fff}\n.bb__n{font-size:13px;font-weight:600}\n.bb__d{font-size:10px;color:var(--text2)}",
    html: "<div class=\"bb\">\n  <div class=\"bb__i\"><div class=\"bb__c bb__c--lg\" style=\"background:var(--accent)\"><span class=\"bb__l\">42%</span></div><span class=\"bb__n\">Enterprise</span><span class=\"bb__d\">$5.2B · +12%</span></div>\n  <div class=\"bb__i\"><div class=\"bb__c bb__c--md\" style=\"background:var(--accent2)\"><span class=\"bb__l\">28%</span></div><span class=\"bb__n\">SMB</span><span class=\"bb__d\">$3.4B · +8%</span></div>\n  <div class=\"bb__i\"><div class=\"bb__c bb__c--sm\" style=\"background:var(--accent4)\"><span class=\"bb__l\">18%</span></div><span class=\"bb__n\">Public</span><span class=\"bb__d\">$2.2B · +4%</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 63,
    name: "McKinsey Benchmark Table",
    source: "mckinsey-consulting.html",
    category: "section",
    css: ".bm{display:flex;flex-direction:column;gap:6px;margin-top:24px}\n.bm__h{display:grid;grid-template-columns:1fr 100px 100px 80px;gap:16px;padding:8px 0;font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;border-bottom:2px solid var(--line)}\n.bm__r{display:grid;grid-template-columns:1fr 100px 100px 80px;gap:16px;padding:10px 0;align-items:center;font-size:13px;border-bottom:1px solid var(--line);transition:background .2s}\n.bm__r:hover{background:var(--card2)}\n.bm__n{font-weight:500}\n.bm__v{font-family:'JetBrains Mono',monospace;text-align:right}\n.bm__b{height:6px;background:var(--card2);border-radius:3px;overflow:hidden}\n.bm__f{height:100%;border-radius:3px}\n.bm__t{font-family:'JetBrains Mono',monospace;text-align:right;color:var(--text2)}",
    html: "<div class=\"bm\">\n  <div class=\"bm__h\"><span>Metric</span><span>Company</span><span>Peer Avg</span><span>Δ</span></div>\n  <div class=\"bm__r\"><span class=\"bm__n\">Revenue Growth</span><div class=\"bm__b\"><div class=\"bm__f\" style=\"width:82%;background:var(--accent)\"></div></div><span class=\"bm__v\">8.2%</span><span class=\"bm__t\">+2.1pp</span></div>\n  <div class=\"bm__r\"><span class=\"bm__n\">Gross Margin</span><div class=\"bm__b\"><div class=\"bm__f\" style=\"width:68%;background:var(--accent2)\"></div></div><span class=\"bm__v\">48.6%</span><span class=\"bm__t\">-1.2pp</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 64,
    name: "SAS Heritage Timeline",
    source: "sas-scandinavian.html",
    category: "section",
    css: "/* Uses standard design tokens from sas-scandinavian.html (882 lines) */\n/* Key components: Flag Hero (cross composition), Route Map (SVG network),\n   Fleet Data cards, Heritage Timeline, Service Tier comparison,\n   Loyalty Program ring, Nordic Values grid */",
    html: "",
    hasJS: false
  },
  {
    id: 65,
    name: "Ericsson Network Diagram",
    source: "ericsson-infra.html",
    category: "section",
    css: "/* Uses standard design tokens from ericsson-infra.html (746 lines) */\n/* Key components: Network Node Hero (SVG graph), Layer Stack,\n   Spectrum Band visualization, 5G Deployment map, Performance Tiles,\n   Infrastructure Metrics */",
    html: "",
    hasJS: false
  },
  {
    id: 66,
    name: "Infrastructure Hero (Dark with Grid + Nodes)",
    source: "ericsson-infra.html",
    category: "hero",
    css: ".hero-infra{min-height:100vh;background:var(--text-display);color:white;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;overflow:hidden}\n.hero-infra__grid{position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:60px 60px;pointer-events:none}\n.hero-infra__tag{font-family:var(--fm);font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:20px;position:relative;z-index:2}\n.hero-infra__title{font-family:var(--fd);font-size:clamp(3rem,6vw,5.5rem);line-height:.95;letter-spacing:-3px;font-weight:300;color:white;max-width:700px;position:relative;z-index:2}\n.hero-infra__title strong{font-weight:700;color:rgba(74,93,58,.7)}\n.hero-infra__nodes{position:absolute;right:120px;top:50%;transform:translateY(-50%);display:grid;grid-template-columns:repeat(3,1fr);gap:40px;z-index:2}\n.hero-infra__node{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.06);position:relative}\n.hero-infra__node::before{content:'';position:absolute;top:50%;right:-40px;width:40px;height:1px;background:rgba(255,255,255,.04)}\n.hero-infra__node.on{background:var(--primary-olive);box-shadow:0 0 20px rgba(74,93,58,.15)}\n.hero-infra__sub{font-size:16px;color:rgba(255,255,255,.3);max-width:440px;margin-top:20px;position:relative;z-index:2;line-height:1.7}\n@media(max-width:1024px){.hero-infra{padding:60px 40px}.hero-infra__nodes{display:none}}\n@media(max-width:768px){.hero-infra{padding:40px 24px;min-height:80vh}.hero-infra__title{font-size:36px;letter-spacing:-1px}}",
    html: "<section class=\"hero-infra\">\n  <div class=\"hero-infra__grid\"></div>\n  <div class=\"hero-infra__tag\">Stockholm Design Lab · Ericsson</div>\n  <h1 class=\"hero-infra__title\">Connecting <strong>billions.</strong><br>Every second.</h1>\n  <p class=\"hero-infra__sub\">The infrastructure that powers modern communication. Designed for reliability, built for scale.</p>\n  <div class=\"hero-infra__nodes\">\n    <span class=\"hero-infra__node on\"></span>\n    <span class=\"hero-infra__node\"></span>\n    <span class=\"hero-infra__node on\"></span>\n    <span class=\"hero-infra__node\"></span>\n    <span class=\"hero-infra__node on\"></span>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 67,
    name: "Architecture Stack",
    source: "ericsson-infra.html",
    category: "section",
    css: ".arch-stack{display:flex;flex-direction:column;gap:4px;margin-top:60px;max-width:800px}\n.arch-layer{display:grid;grid-template-columns:120px 1fr;gap:40px;align-items:center;padding:24px 32px;background:var(--surface-raised);transition:background .2s}\n.arch-layer:hover{background:var(--border)}\n.arch-layer__label{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text-disabled)}\n.arch-layer__content{display:flex;gap:8px;flex-wrap:wrap}\n.arch-layer__tag{font-family:var(--fm);font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:6px 14px;border:1px solid var(--border);color:var(--text-secondary);transition:all .2s}\n.arch-layer__tag:hover{border-color:var(--text-disabled);color:var(--text-display)}\n.arch-layer__tag--hl{border-color:var(--primary-olive);color:var(--primary-olive)}\n.arch-layer__tag--hl:hover{background:var(--primary-olive);color:white;border-color:var(--primary-olive)}\n@media(max-width:1024px){.arch-layer{grid-template-columns:1fr;gap:16px}}\n@media(max-width:768px){.arch-layer{padding:20px}}",
    html: "<div class=\"arch-stack\">\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 7</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag arch-layer__tag--hl\">Application</span><span class=\"arch-layer__tag\">API Gateway</span><span class=\"arch-layer__tag\">Service Mesh</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 6</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag\">Orchestration</span><span class=\"arch-layer__tag arch-layer__tag--hl\">Kubernetes</span><span class=\"arch-layer__tag\">Service Discovery</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 5</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag arch-layer__tag--hl\">Data Platform</span><span class=\"arch-layer__tag\">Analytics</span><span class=\"arch-layer__tag\">Storage</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 4</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag\">Security</span><span class=\"arch-layer__tag arch-layer__tag--hl\">Identity</span><span class=\"arch-layer__tag\">Encryption</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 3</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag\">Network</span><span class=\"arch-layer__tag\">Edge</span><span class=\"arch-layer__tag arch-layer__tag--hl\">5G Core</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 2</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag\">Virtualization</span><span class=\"arch-layer__tag arch-layer__tag--hl\">NFV</span><span class=\"arch-layer__tag\">SDN</span></div></div>\n  <div class=\"arch-layer\"><span class=\"arch-layer__label\">Layer 1</span><div class=\"arch-layer__content\"><span class=\"arch-layer__tag arch-layer__tag--hl\">Infrastructure</span><span class=\"arch-layer__tag\">Hardware</span><span class=\"arch-layer__tag\">RAN</span></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 68,
    name: "Coverage Grid (with Progress Bars)",
    source: "ericsson-infra.html",
    category: "section",
    css: ".coverage-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:60px;background:var(--border)}\n.cell{background:var(--surface);padding:48px 32px;text-align:center;transition:background .2s}\n.cell:hover{background:var(--surface-raised)}\n.cell__region{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px}\n.cell__coverage{font-family:var(--fm);font-size:40px;font-weight:600;line-height:1;color:var(--text-display);letter-spacing:-2px;margin-bottom:4px}\n.cell__label{font-size:12px;color:var(--text-secondary);margin-bottom:16px}\n.cell__track{height:2px;background:var(--border);margin:0 20px;position:relative}\n.cell__fill{height:2px;position:absolute;top:0;left:0}\n@media(max-width:1024px){.coverage-grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.coverage-grid{grid-template-columns:1fr}.cell{padding:32px 24px}}",
    html: "<div class=\"coverage-grid\">\n  <div class=\"cell\"><div class=\"cell__region\">North America</div><div class=\"cell__coverage\">98<span style=\"font-size:18px;color:var(--text-secondary)\">%</span></div><div class=\"cell__label\">Network coverage</div><div class=\"cell__track\"><div class=\"cell__fill\" style=\"width:98%;background:var(--primary-olive)\"></div></div></div>\n  <div class=\"cell\"><div class=\"cell__region\">Europe</div><div class=\"cell__coverage\">92<span style=\"font-size:18px;color:var(--text-secondary)\">%</span></div><div class=\"cell__label\">Network coverage</div><div class=\"cell__track\"><div class=\"cell__fill\" style=\"width:92%;background:var(--primary-earth)\"></div></div></div>\n  <div class=\"cell\"><div class=\"cell__region\">Asia Pacific</div><div class=\"cell__coverage\">85<span style=\"font-size:18px;color:var(--text-secondary)\">%</span></div><div class=\"cell__label\">Network coverage</div><div class=\"cell__track\"><div class=\"cell__fill\" style=\"width:85%;background:var(--scene-glacier)\"></div></div></div>\n  <div class=\"cell\"><div class=\"cell__region\">Emerging</div><div class=\"cell__coverage\">72<span style=\"font-size:18px;color:var(--text-secondary)\">%</span></div><div class=\"cell__label\">Network coverage</div><div class=\"cell__track\"><div class=\"cell__fill\" style=\"width:72%;background:var(--primary-olive);opacity:.5\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 69,
    name: "Protocol Table (Dark)",
    source: "ericsson-infra.html",
    category: "section",
    css: ".protocol-table{margin-top:60px;width:100%}\n.proto-row{display:grid;grid-template-columns:140px 1fr 120px 100px;gap:0;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.04);align-items:center}\n.proto-row--header{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.15);padding:16px 0;border-bottom:1px solid rgba(255,255,255,.1)}\n.proto-row__name{font-family:var(--fm);font-size:13px;color:white;letter-spacing:.5px}\n.proto-row__desc{font-size:13px;color:rgba(255,255,255,.4);line-height:1.5}\n.proto-row__spec{font-family:var(--fm);font-size:12px;color:rgba(255,255,255,.3);text-align:center}\n.proto-row__status{font-family:var(--fm);font-size:10px;letter-spacing:2px;text-transform:uppercase;text-align:right}\n.proto-row__status.active{color:var(--primary-olive)}\n.proto-row__status.dev{color:var(--primary-earth)}\n.proto-row__status.future{color:rgba(255,255,255,.15)}\n@media(max-width:1024px){.proto-row{grid-template-columns:100px 1fr 80px}.proto-row__spec{display:none}}\n@media(max-width:768px){.proto-row{grid-template-columns:1fr;gap:4px;padding:16px 0}.proto-row--header{display:none}}",
    html: "<div class=\"protocol-table\">\n  <div class=\"proto-row proto-row--header\"><span>Protocol</span><span>Description</span><span>Spec</span><span>Status</span></div>\n  <div class=\"proto-row\"><span class=\"proto-row__name\">5G NR</span><span class=\"proto-row__desc\">New Radio interface — the global standard for 5G.</span><span class=\"proto-row__spec\">3GPP R18</span><span class=\"proto-row__status active\">Active</span></div>\n  <div class=\"proto-row\"><span class=\"proto-row__name\">LTE-M</span><span class=\"proto-row__desc\">Machine-type communication for IoT.</span><span class=\"proto-row__spec\">3GPP R17</span><span class=\"proto-row__status active\">Active</span></div>\n  <div class=\"proto-row\"><span class=\"proto-row__name\">NB-IoT</span><span class=\"proto-row__desc\">Narrowband IoT — deep coverage for massive device deployments.</span><span class=\"proto-row__spec\">3GPP R16</span><span class=\"proto-row__status active\">Active</span></div>\n  <div class=\"proto-row\"><span class=\"proto-row__name\">6G</span><span class=\"proto-row__desc\">Next-generation network architecture — research phase.</span><span class=\"proto-row__spec\">Pre-study</span><span class=\"proto-row__status future\">Future</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 70,
    name: "Innovation Timeline",
    source: "ericsson-infra.html",
    category: "section",
    css: ".inno-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:60px;border-top:1px solid var(--border)}\n.inno-block{padding:40px 32px;border-left:1px solid var(--border);position:relative}\n.inno-block:first-child{border-left:none}\n.inno-block__dot{width:40px;height:40px;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:14px;font-weight:600;color:var(--text-display);margin-bottom:24px}\n.inno-block.active .inno-block__dot{background:var(--primary-olive);border-color:var(--primary-olive);color:white}\n.inno-block__yr{font-family:var(--fm);font-size:13px;color:var(--text-secondary);margin-bottom:4px;letter-spacing:1px}\n.inno-block__name{font-size:18px;font-weight:500;color:var(--text-display);margin-bottom:8px}\n.inno-block__desc{font-size:13px;color:var(--text-secondary);line-height:1.6}\n@media(max-width:1024px){.inno-strip{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.inno-strip{grid-template-columns:1fr}.inno-block{border-left:none;border-top:1px solid var(--border)}}",
    html: "<div class=\"inno-strip\">\n  <div class=\"inno-block active\"><div class=\"inno-block__dot\">1</div><div class=\"inno-block__yr\">1876</div><div class=\"inno-block__name\">Founded</div><p class=\"inno-block__desc\">Lars Magnus Ericsson establishes the company in Stockholm.</p></div>\n  <div class=\"inno-block\"><div class=\"inno-block__dot\">2</div><div class=\"inno-block__yr\">1992</div><div class=\"inno-block__name\">GSM Era</div><p class=\"inno-block__desc\">Global System for Mobile communications — the digital revolution.</p></div>\n  <div class=\"inno-block\"><div class=\"inno-block__dot\">3</div><div class=\"inno-block__yr\">2019</div><div class=\"inno-block__name\">5G Launch</div><p class=\"inno-block__desc\">First commercial 5G networks deployed.</p></div>\n  <div class=\"inno-block\"><div class=\"inno-block__dot\">4</div><div class=\"inno-block__yr\">2026</div><div class=\"inno-block__name\">Design System</div><p class=\"inno-block__desc\">Ericsson Design System — Red Dot Award for brand & interface.</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 71,
    name: "Global Impact Metrics",
    source: "ericsson-infra.html",
    category: "section",
    css: ".impact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:rgba(255,255,255,.06)}\n.impact-item{padding:60px 48px;background:var(--scene-glacier);text-align:center}\n.impact-item__num{font-family:var(--fm);font-size:56px;font-weight:600;line-height:1;color:white;letter-spacing:-3px;margin-bottom:8px}\n.impact-item__num .suffix{font-size:24px;color:rgba(255,255,255,.2);font-weight:400}\n.impact-item__label{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:12px}\n.impact-item__desc{font-size:13px;color:rgba(255,255,255,.35);line-height:1.6;max-width:280px;margin:0 auto}\n@media(max-width:1024px){.impact-grid{grid-template-columns:1fr}}\n@media(max-width:768px){.impact-item{padding:40px 24px}}",
    html: "<div class=\"impact-grid\">\n  <div class=\"impact-item\"><div class=\"impact-item__num\">4.6<span class=\"suffix\">B</span></div><div class=\"impact-item__label\">Subscribers</div><p class=\"impact-item__desc\">Network infrastructure serving billions of daily connections.</p></div>\n  <div class=\"impact-item\"><div class=\"impact-item__num\">160<span class=\"suffix\">+</span></div><div class=\"impact-item__label\">Countries</div><p class=\"impact-item__desc\">Global presence spanning every continent and market.</p></div>\n  <div class=\"impact-item\"><div class=\"impact-item__num\">57<span class=\"suffix\">K</span></div><div class=\"impact-item__label\">Patents</div><p class=\"impact-item__desc\">Innovation portfolio covering the full technology stack.</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 72,
    name: "Bottle Hero (3-column)",
    source: "absolut-heritage.html",
    category: "hero",
    css: ".hero-bottle{min-height:100vh;display:grid;grid-template-columns:1fr 1fr 1fr;position:relative}\n.hero-bottle__left{display:flex;flex-direction:column;justify-content:flex-end;padding:80px 60px 80px 120px}\n.hero-bottle__tag{font-family:var(--fm);font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:20px}\n.hero-bottle__title{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.5rem);line-height:.95;letter-spacing:-2px;font-weight:300;color:var(--text-display);max-width:400px}\n.hero-bottle__title strong{font-weight:700;color:var(--scene-glacier)}\n.hero-bottle__center{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}\n.hero-bottle__outline{width:120px;height:280px;border:2px solid var(--border);position:relative;margin-bottom:40px}\n.hero-bottle__outline::before{content:'';position:absolute;top:-40px;left:50%;transform:translateX(-50%);width:40px;height:40px;border:2px solid var(--border);border-bottom:none;border-radius:20px 20px 0 0}\n.hero-bottle__outline::after{content:'';position:absolute;top:20px;left:50%;transform:translateX(-50%);width:20px;height:20px;background:var(--scene-glacier);opacity:.15;border-radius:50%}\n.hero-bottle__label{font-family:var(--fm);font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--text-secondary);text-align:center}\n.hero-bottle__right{display:flex;flex-direction:column;justify-content:flex-end;padding:80px 120px 80px 60px;align-items:flex-end;text-align:right}\n.hero-bottle__since{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px}\n.hero-bottle__yr{font-family:var(--fd);font-size:120px;font-weight:700;line-height:.8;color:var(--scene-glacier);opacity:.06;letter-spacing:-4px;user-select:none}\n.hero-bottle__origin{font-size:13px;color:var(--text-secondary);max-width:240px}\n@media(max-width:1024px){.hero-bottle{grid-template-columns:1fr 1fr}.hero-bottle__right{display:none}}\n@media(max-width:768px){.hero-bottle{grid-template-columns:1fr}.hero-bottle__left{padding:60px 24px}.hero-bottle__center{padding:40px 24px}.hero-bottle__outline{width:80px;height:200px}.hero-bottle__yr{font-size:80px}}",
    html: "<section class=\"hero-bottle\">\n  <div class=\"hero-bottle__left\">\n    <div class=\"hero-bottle__tag\">Stockholm Design Lab · Absolut</div>\n    <h1 class=\"hero-bottle__title\">Pure <strong>Swedish</strong><br>since 1879.</h1>\n  </div>\n  <div class=\"hero-bottle__center\">\n    <div class=\"hero-bottle__outline\"></div>\n    <div class=\"hero-bottle__label\">The Bottle</div>\n  </div>\n  <div class=\"hero-bottle__right\">\n    <div class=\"hero-bottle__since\">Established</div>\n    <div class=\"hero-bottle__yr\">1879</div>\n    <p class=\"hero-bottle__origin\">Åhus, Sweden · Continuous distillation since the 19th century.</p>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 73,
    name: "Taste Profile (with Progress Bars)",
    source: "absolut-heritage.html",
    category: "section",
    css: ".taste-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:80px;margin-top:60px}\n.taste-item{position:relative}\n.taste-item__bar{width:100%;height:2px;background:var(--border);margin-bottom:40px;position:relative}\n.taste-item__fill{height:2px;position:absolute;top:0;left:0;transition:width .3s ease}\n.taste-item__fill--1{width:85%;background:var(--primary-olive)}\n.taste-item__fill--2{width:70%;background:var(--primary-earth)}\n.taste-item__fill--3{width:60%;background:var(--scene-glacier)}\n.taste-item__label{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px}\n.taste-item__name{font-family:var(--fd);font-size:28px;font-weight:400;color:var(--text-display);margin-bottom:4px;letter-spacing:-.5px}\n.taste-item__desc{font-size:13px;color:var(--text-secondary);line-height:1.7}\n@media(max-width:1024px){.taste-grid{grid-template-columns:1fr;gap:40px}}",
    html: "<div class=\"taste-grid\">\n  <div class=\"taste-item\">\n    <div class=\"taste-item__bar\"><div class=\"taste-item__fill taste-item__fill--1\"></div></div>\n    <div class=\"taste-item__label\">Primary</div>\n    <div class=\"taste-item__name\">Winter Wheat</div>\n    <p class=\"taste-item__desc\">Smooth, mellow character from Swedish winter wheat. The foundation of every expression.</p>\n  </div>\n  <div class=\"taste-item\">\n    <div class=\"taste-item__bar\"><div class=\"taste-item__fill taste-item__fill--2\"></div></div>\n    <div class=\"taste-item__label\">Secondary</div>\n    <div class=\"taste-item__name\">Spring Water</div>\n    <p class=\"taste-item__desc\">Deep well water from Åhus. Limestone-filtered for purity and minerality.</p>\n  </div>\n  <div class=\"taste-item\">\n    <div class=\"taste-item__bar\"><div class=\"taste-item__fill taste-item__fill--3\"></div></div>\n    <div class=\"taste-item__label\">Finish</div>\n    <div class=\"taste-item__name\">Continuous Distillation</div>\n    <p class=\"taste-item__desc\">100+ distillation columns. Precision that creates consistency across every batch.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 74,
    name: "Art Collaboration Grid",
    source: "absolut-heritage.html",
    category: "section",
    css: ".art-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;margin-top:60px;background:var(--border)}\n.art-piece{background:var(--surface);padding:80px 60px;text-align:center;transition:background .2s}\n.art-piece:hover{background:var(--surface-raised)}\n.art-piece__yr{font-family:var(--fm);font-size:48px;font-weight:600;line-height:.85;letter-spacing:-2px;color:var(--text-display);opacity:.06;margin-bottom:16px}\n.art-piece__artist{font-family:var(--fd);font-size:22px;font-weight:400;color:var(--text-display);margin-bottom:4px}\n.art-piece__title{font-size:13px;color:var(--text-secondary);font-style:italic;margin-bottom:20px}\n.art-piece__tag{display:inline-block;font-family:var(--fm);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--scene-glacier);padding:4px 12px;border:1px solid var(--border)}\n@media(max-width:1024px){.art-row{grid-template-columns:1fr}}\n@media(max-width:768px){.art-piece{padding:40px 24px}}",
    html: "<div class=\"art-row\">\n  <div class=\"art-piece\"><div class=\"art-piece__yr\">1986</div><div class=\"art-piece__artist\">Andy Warhol</div><p class=\"art-piece__title\">Absolut Warhol</p><span class=\"art-piece__tag\">First commission</span></div>\n  <div class=\"art-piece\"><div class=\"art-piece__yr\">1992</div><div class=\"art-piece__artist\">Keith Haring</div><p class=\"art-piece__title\">Absolut Haring</p><span class=\"art-piece__tag\">Limited edition</span></div>\n  <div class=\"art-piece\"><div class=\"art-piece__yr\">2024</div><div class=\"art-piece__artist\">SDL Studio</div><p class=\"art-piece__title\">Design System</p><span class=\"art-piece__tag\">Brand evolution</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 75,
    name: "Heritage Quote + Metrics (Dark Scene)",
    source: "absolut-heritage.html",
    category: "section",
    css: ".heritage-quote{max-width:640px;margin:0 auto 80px;text-align:center}\n.heritage-quote__mark{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:24px}\n.heritage-quote__text{font-family:var(--fd);font-size:clamp(1.25rem,2.5vw,2rem);font-weight:400;font-style:italic;line-height:1.5;color:white;margin-bottom:20px}\n.heritage-quote__attr{font-family:var(--fm);font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2)}\n.distillery-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(255,255,255,.06)}\n.metric-block{padding:48px 40px;background:var(--scene-glacier);text-align:center}\n.metric-block__num{font-family:var(--fm);font-size:48px;font-weight:600;line-height:1;color:white;letter-spacing:-2px;margin-bottom:4px}\n.metric-block__label{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:8px}\n.metric-block__desc{font-size:12px;color:rgba(255,255,255,.3);line-height:1.5}\n@media(max-width:1024px){.distillery-metrics{grid-template-columns:1fr}}\n@media(max-width:768px){.metric-block{padding:40px 24px}}",
    html: "<div class=\"heritage-quote\">\n  <div class=\"heritage-quote__mark\">Lars Olsson Smith · 1879</div>\n  <p class=\"heritage-quote__text\">\"The purest vodka is not made — it is distilled. Again and again, until nothing remains but the essence.\"</p>\n  <div class=\"heritage-quote__attr\">Åhus Distillery · Sweden</div>\n</div>\n<div class=\"distillery-metrics\">\n  <div class=\"metric-block\"><div class=\"metric-block__num\">146</div><div class=\"metric-block__label\">Years</div><div class=\"metric-block__desc\">Of continuous distillation tradition</div></div>\n  <div class=\"metric-block\"><div class=\"metric-block__num\">100+</div><div class=\"metric-block__label\">Columns</div><div class=\"metric-block__desc\">Distillation columns in continuous operation</div></div>\n  <div class=\"metric-block\"><div class=\"metric-block__num\">130</div><div class=\"metric-block__label\">Markets</div><div class=\"metric-block__desc\">Global presence worldwide</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 76,
    name: "Global Presence Strip (with Vertical Bars)",
    source: "absolut-heritage.html",
    category: "chart",
    css: ".global-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:60px;border-top:2px solid var(--text-display)}\n.region{padding:40px 32px;border-left:1px solid var(--border);position:relative}\n.region:first-child{border-left:none}\n.region__name{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px}\n.region__bar{height:80px;width:24px;background:var(--surface-raised);margin-bottom:16px;position:relative}\n.region__fill{position:absolute;bottom:0;width:100%;transition:height .3s ease}\n.region__pct{font-family:var(--fm);font-size:24px;font-weight:600;color:var(--text-display);line-height:1}\n.region__ctx{font-size:12px;color:var(--text-secondary)}\n@media(max-width:1024px){.global-strip{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.global-strip{grid-template-columns:1fr}.region{border-left:none;border-top:1px solid var(--border)}}",
    html: "<div class=\"global-strip\">\n  <div class=\"region\"><div class=\"region__name\">Europe</div><div class=\"region__bar\"><div class=\"region__fill\" style=\"height:45%;background:var(--primary-olive)\"></div></div><div class=\"region__pct\">45%</div><div class=\"region__ctx\">Primary market</div></div>\n  <div class=\"region\"><div class=\"region__name\">Americas</div><div class=\"region__bar\"><div class=\"region__fill\" style=\"height:70%;background:var(--primary-earth)\"></div></div><div class=\"region__pct\">70%</div><div class=\"region__ctx\">Growing rapidly</div></div>\n  <div class=\"region\"><div class=\"region__name\">Asia</div><div class=\"region__bar\"><div class=\"region__fill\" style=\"height:55%;background:var(--scene-glacier)\"></div></div><div class=\"region__pct\">55%</div><div class=\"region__ctx\">Expanding</div></div>\n  <div class=\"region\"><div class=\"region__name\">Rest</div><div class=\"region__bar\"><div class=\"region__fill\" style=\"height:30%;background:var(--primary-olive);opacity:.4\"></div></div><div class=\"region__pct\">30%</div><div class=\"region__ctx\">New markets</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 77,
    name: "Light Study Hero (Dark Center)",
    source: "wastberg-lighting.html",
    category: "hero",
    css: ".ls{min-height:100vh;background:var(--text-display);color:#fff;display:flex;align-items:center;padding:120px;position:relative;overflow:hidden}\n.ls::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80vmin;height:80vmin;border-radius:50%;background:radial-gradient(circle,rgba(74,93,58,.06) 0%,transparent 60%);pointer-events:none}\n.ls__in{position:relative;z-index:2;max-width:700px}\n.ls__tag{font-family:var(--fm);font-size:11px;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.12);margin-bottom:var(--s8)}\n.ls__h{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:#fff;margin-bottom:var(--s6)}\n.ls__h strong{font-weight:700;color:rgba(139,115,85,.6)}\n.ls__sub{font-size:var(--xl);color:rgba(255,255,255,.25);line-height:1.7;max-width:420px}\n.ls__beam{position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent 0%,rgba(139,115,85,.08) 50%,transparent 100%);pointer-events:none}\n@media(max-width:1024px){.ls{padding:60px 40px}}\n@media(max-width:768px){.ls{padding:40px 24px;min-height:80vh}.ls__h{font-size:clamp(2rem,8vw,2.5rem)}}",
    html: "<section class=\"ls\">\n  <div class=\"ls__beam\"></div>\n  <div class=\"ls__in\">\n    <div class=\"ls__tag\">Stockholm Design Lab · Wästberg</div>\n    <h1 class=\"ls__h\">The <strong>poetry</strong> of light.<br>Designed in Sweden.</h1>\n    <p class=\"ls__sub\">Since 2008, Wästberg has collaborated with the world's leading designers to create lighting that shapes space and emotion.</p>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 78,
    name: "Fixture Collection (Card Grid)",
    source: "wastberg-lighting.html",
    category: "section",
    css: ".fg__g{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);margin-top:60px}\n.fi{text-align:center;padding:var(--s12) var(--s6);background:var(--surface);border:1px solid var(--border);border-radius:var(--r4);transition:all .2s}\n.fi:hover{transform:translateY(-4px);border-color:var(--text-disabled);box-shadow:0 4px 20px rgba(0,0,0,.04)}\n.fi__l{font-family:var(--fd);font-size:var(--4xl);font-weight:700;color:var(--text-display);opacity:.04;line-height:.85;margin-bottom:var(--s4);letter-spacing:-2px}\n.fi__n{font-size:var(--xl);font-weight:500;color:var(--text-display);margin-bottom:var(--s2);letter-spacing:-.3px}\n.fi__d{font-size:var(--sm);color:var(--text-secondary);line-height:1.6;max-width:280px;margin:0 auto var(--s4)}\n.fi__m{font-family:var(--fm);font-size:var(--xs);color:var(--text-disabled);letter-spacing:.06em;text-transform:uppercase}\n@media(max-width:1024px){.fg__g{grid-template-columns:1fr}}\n@media(max-width:768px){.fi{padding:var(--s8) var(--s4)}}",
    html: "<div class=\"fg__g\">\n  <div class=\"fi\"><div class=\"fi__l\">P</div><div class=\"fi__n\">Pendant</div><div class=\"fi__d\">Suspended light. Glass, brass, and carefully diffused illumination.</div><div class=\"fi__m\">Inga Sempé · 2012</div></div>\n  <div class=\"fi\"><div class=\"fi__l\">F</div><div class=\"fi__n\">Floor</div><div class=\"fi__d\">Standing sculpture. Direct and ambient light in one gesture.</div><div class=\"fi__m\">David Chipperfield · 2015</div></div>\n  <div class=\"fi\"><div class=\"fi__l\">T</div><div class=\"fi__n\">Table</div><div class=\"fi__d\">Personal light. Precise, intimate, adjustable.</div><div class=\"fi__m\">Jasper Morrison · 2018</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 79,
    name: "Light Temperature Spectrum",
    source: "wastberg-lighting.html",
    category: "section",
    css: ".lt__bar{display:flex;height:40px;border-radius:20px;overflow:hidden;margin-top:60px;max-width:600px}\n.lt__seg{flex:1;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.6);letter-spacing:.06em;text-transform:uppercase}\n.lt__seg--w{background:var(--primary-earth)}\n.lt__seg--n{background:#5A4A3A}\n.lt__seg--c{background:var(--scene-glacier)}\n.lt__g{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);margin-top:var(--s12)}\n.lt__i{text-align:center}\n.lt__v{font-family:var(--fm);font-size:var(--3xl);font-weight:600;color:#fff;letter-spacing:-.5px;margin-bottom:var(--s1)}\n.lt__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s2)}\n.lt__d{font-size:var(--sm);color:rgba(255,255,255,.25);line-height:1.5}\n@media(max-width:1024px){.lt__g{grid-template-columns:1fr}}\n@media(max-width:768px){.lt__bar{height:32px;border-radius:16px}}",
    html: "<div class=\"lt__bar\">\n  <div class=\"lt__seg lt__seg--w\">Warm · 2700K</div>\n  <div class=\"lt__seg lt__seg--n\">Neutral · 3500K</div>\n  <div class=\"lt__seg lt__seg--c\">Cool · 5000K</div>\n</div>\n<div class=\"lt__g\">\n  <div class=\"lt__i\"><div class=\"lt__v\">2700K</div><div class=\"lt__l\">Warm White</div><div class=\"lt__d\">Relaxed, intimate. Living rooms, bedrooms.</div></div>\n  <div class=\"lt__i\"><div class=\"lt__v\">3500K</div><div class=\"lt__l\">Neutral</div><div class=\"lt__d\">Balanced, natural. Kitchens, offices.</div></div>\n  <div class=\"lt__i\"><div class=\"lt__v\">5000K</div><div class=\"lt__l\">Daylight</div><div class=\"lt__d\">Crisp, focused. Studios, galleries.</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 80,
    name: "Material Finish Swatches",
    source: "wastberg-lighting.html",
    category: "detail",
    css: ".mf__g{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s6);margin-top:60px}\n.mfi{padding:0;text-align:center}\n.mfi__s{width:100%;height:100px;margin-bottom:var(--s4);position:relative;overflow:hidden}\n.mfi__n{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--text-display);margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px}\n.mfi__c{font-family:var(--fm);font-size:var(--xs);color:var(--text-disabled);letter-spacing:.04em}\n@media(max-width:1024px){.mf__g{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.mf__g{grid-template-columns:1fr}}",
    html: "<div class=\"mf__g\">\n  <div class=\"mfi\"><div class=\"mfi__s\" style=\"background:var(--primary-earth)\"></div><div class=\"mfi__n\">Brass</div><div class=\"mfi__c\">Polished · Patina over time</div></div>\n  <div class=\"mfi\"><div class=\"mfi__s\" style=\"background:var(--text-disabled)\"></div><div class=\"mfi__n\">Aluminum</div><div class=\"mfi__c\">Anodized · Matte finish</div></div>\n  <div class=\"mfi\"><div class=\"mfi__s\" style=\"background:var(--text-display)\"></div><div class=\"mfi__n\">Steel</div><div class=\"mfi__c\">Powder coated · Black</div></div>\n  <div class=\"mfi\"><div class=\"mfi__s\" style=\"background:var(--surface-raised);border:1px solid var(--border)\"></div><div class=\"mfi__n\">Glass</div><div class=\"mfi__c\">Opal white · Hand-blown</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 81,
    name: "Tech Specs (Dark Scene)",
    source: "wastberg-lighting.html",
    category: "section",
    css: ".ts__g{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:rgba(255,255,255,.06)}\n.ts__i{padding:var(--s8) var(--s6);text-align:center}\n.ts__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s4)}\n.ts__v{font-family:var(--fm);font-size:var(--3xl);font-weight:600;line-height:1;color:#fff;letter-spacing:-.5px;margin-bottom:var(--s1)}\n.ts__d{font-size:var(--sm);color:rgba(255,255,255,.25);line-height:1.5}\n@media(max-width:1024px){.ts__g{grid-template-columns:1fr}}",
    html: "<div class=\"ts__g\">\n  <div class=\"ts__i\"><div class=\"ts__l\">CRI</div><div class=\"ts__v\">97+</div><div class=\"ts__d\">Color Rendering Index · True color reproduction</div></div>\n  <div class=\"ts__i\"><div class=\"ts__l\">Lumens</div><div class=\"ts__v\">1,200</div><div class=\"ts__d\">Light output at 3000K · Efficient LED</div></div>\n  <div class=\"ts__i\"><div class=\"ts__l\">Life</div><div class=\"ts__v\">50,000h</div><div class=\"ts__d\">Lifespan L80/B10 · 20+ years of daily use</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 82,
    name: "Entrance Hero (Centered Museum)",
    source: "moderna-museet.html",
    category: "hero",
    css: ".ent{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:var(--surface);padding:80px 120px;text-align:center;position:relative}\n.ent__tag{font-family:var(--fm);font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-disabled);margin-bottom:var(--s12);position:absolute;top:80px;left:120px}\n.ent__yr{font-family:var(--fd);font-size:clamp(6rem,15vw,15rem);font-weight:700;line-height:.85;letter-spacing:-6px;color:var(--text-display);opacity:.03;position:absolute;bottom:80px;right:120px;user-select:none}\n.ent__h{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:var(--text-display);line-height:1.15;letter-spacing:-1px;max-width:600px;margin-bottom:var(--s8)}\n.ent__h em{font-style:italic;color:var(--primary-olive)}\n.ent__sub{font-size:var(--xl);color:var(--text-secondary);line-height:1.7;max-width:440px;margin-bottom:var(--s12)}\n.ent__hr{width:40px;height:1px;background:var(--border);margin-bottom:var(--s6)}\n.ent__cr{display:flex;gap:var(--s12);font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:var(--text-disabled)}\n@media(max-width:1024px){.ent{padding:60px 40px}.ent__tag{top:40px;left:40px}.ent__yr{right:40px;bottom:40px}}\n@media(max-width:768px){.ent{padding:40px 24px}.ent__h{font-size:clamp(2rem,8vw,2.5rem)}.ent__yr{font-size:80px}.ent__cr{flex-direction:column;gap:var(--s4)}}",
    html: "<section class=\"ent\">\n  <div class=\"ent__tag\">Stockholm Design Lab · Moderna Museet</div>\n  <div class=\"ent__yr\">1958</div>\n  <h1 class=\"ent__h\">Art for <em>everyone</em>.<br>Since 1958.</h1>\n  <p class=\"ent__sub\">Sweden's leading museum of modern and contemporary art. On Skeppsholmen, Stockholm.</p>\n  <div class=\"ent__hr\"></div>\n  <div class=\"ent__cr\"><span>Founded 1958</span><span>24,000+ Works</span><span>Free Entry</span></div>\n</section>",
    hasJS: false
  },
  {
    id: 83,
    name: "Exhibition List (2x2 Grid)",
    source: "moderna-museet.html",
    category: "section",
    css: ".exh__g{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:60px;background:var(--border)}\n.ex{background:var(--surface);padding:60px 48px;transition:background .2s;position:relative}\n.ex:hover{background:var(--surface-raised)}\n.ex__yr{font-family:var(--fm);font-size:10px;letter-spacing:3px;color:var(--text-disabled);margin-bottom:var(--s4)}\n.ex__n{font-family:var(--fd);font-size:var(--2xl);font-weight:400;color:var(--text-display);letter-spacing:-.5px;margin-bottom:var(--s2);line-height:1.2}\n.ex__a{font-size:13px;color:var(--text-secondary);margin-bottom:var(--s4);font-style:italic}\n.ex__t{display:inline-block;font-family:var(--fm);font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:3px 10px;border:1px solid var(--border);color:var(--text-disabled)}\n@media(max-width:1024px){.exh__g{grid-template-columns:1fr}}\n@media(max-width:768px){.ex{padding:40px 24px}}",
    html: "<div class=\"exh__g\">\n  <div class=\"ex\"><div class=\"ex__yr\">01 — Current</div><div class=\"ex__n\">The Moderna Museet<br>Collection</div><div class=\"ex__a\">Works from the permanent collection</div><span class=\"ex__t\">Through Oct 2026</span></div>\n  <div class=\"ex\"><div class=\"ex__yr\">02 — Special</div><div class=\"ex__n\">Light, Space,<br>and Time</div><div class=\"ex__a\">A dialogue between Nordic and international artists</div><span class=\"ex__t\">Jun — Sep 2026</span></div>\n  <div class=\"ex\"><div class=\"ex__yr\">03 — Guest</div><div class=\"ex__n\">Forms of<br>Resistance</div><div class=\"ex__a\">Contemporary art from the Global South</div><span class=\"ex__t\">Aug — Nov 2026</span></div>\n  <div class=\"ex\"><div class=\"ex__yr\">04 — Archive</div><div class=\"ex__n\">A Century of<br>Swedish Art</div><div class=\"ex__a\">From 1910s modernism to today</div><span class=\"ex__t\">Permanent</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 84,
    name: "Artwork Frames (3-column)",
    source: "moderna-museet.html",
    category: "section",
    css: ".artw__g{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s12);margin-top:60px}\n.aw{text-align:center}\n.aw__f{width:100%;aspect-ratio:3/4;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:var(--s6);position:relative;overflow:hidden;transition:border-color var(--df) var(--eo)}\n.aw:hover .aw__f{border-color:var(--text-disabled)}\n.aw__fg{font-family:var(--fd);font-size:40px;color:var(--text-display);opacity:.04;font-weight:700;letter-spacing:-2px}\n.aw__n{font-size:var(--lg);font-weight:500;color:var(--text-display);margin-bottom:var(--s1);letter-spacing:-.3px}\n.aw__a{font-size:var(--sm);color:var(--text-secondary);margin-bottom:var(--s3)}\n.aw__m{font-family:var(--fm);font-size:var(--xs);color:var(--text-disabled);letter-spacing:.04em}\n@media(max-width:1024px){.artw__g{grid-template-columns:1fr;gap:var(--s8)}}",
    html: "<div class=\"artw__g\">\n  <div class=\"aw\"><div class=\"aw__f\"><span class=\"aw__fg\">M</span></div><div class=\"aw__n\">The Monument</div><div class=\"aw__a\">Louise Bourgeois</div><div class=\"aw__m\">Bronze · 1968</div></div>\n  <div class=\"aw\"><div class=\"aw__f\"><span class=\"aw__fg\">S</span></div><div class=\"aw__n\">Study in Blue</div><div class=\"aw__a\">Yves Klein</div><div class=\"aw__m\">Oil on canvas · 1961</div></div>\n  <div class=\"aw\"><div class=\"aw__f\"><span class=\"aw__fg\">R</span></div><div class=\"aw__n\">Red Interior</div><div class=\"aw__a\">Matisse</div><div class=\"aw__m\">Oil on canvas · 1948</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 85,
    name: "Quote Hall",
    source: "moderna-museet.html",
    category: "section",
    css: ".qh{background:var(--text-display);color:#fff;padding:120px;text-align:center;position:relative}\n.qh__h{font-family:var(--fd);font-size:clamp(1.5rem,3.5vw,2.5rem);font-weight:400;font-style:italic;line-height:1.5;color:#fff;max-width:640px;margin:0 auto var(--s8)}\n.qh__a{font-family:var(--fm);font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.2)}\n.qh__bar{width:32px;height:1px;background:rgba(255,255,255,.1);margin:var(--s6) auto 0}\n@media(max-width:1024px){.qh{padding:80px 40px}}\n@media(max-width:768px){.qh{padding:60px 24px}.qh__h{font-size:1.5rem}}",
    html: "<section class=\"qh\">\n  <p class=\"qh__h\">\"Modern art is not a style — it is a way of seeing the world with fresh eyes, every single day.\"</p>\n  <div class=\"qh__a\">Pontus Hultén · Founding Director</div>\n  <div class=\"qh__bar\"></div>\n</section>",
    hasJS: false
  },
  {
    id: 86,
    name: "Floorplan Grid (with Hover Invert)",
    source: "moderna-museet.html",
    category: "section",
    css: ".flr__g{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s4);margin-top:60px}\n.fl{text-align:center;padding:var(--s8) var(--s4);background:var(--surface);border:1px solid var(--border);border-radius:var(--r4);transition:all .2s}\n.fl:hover{background:var(--text-display);color:#fff;border-color:var(--text-display)}\n.fl__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:var(--s2)}\n.fl:hover .fl__l{color:rgba(255,255,255,.3)}\n.fl__n{font-size:var(--lg);font-weight:500;color:inherit;margin-bottom:var(--s1)}\n.fl__d{font-size:var(--sm);color:var(--text-secondary);line-height:1.5;max-width:200px;margin:0 auto}\n.fl:hover .fl__d{color:rgba(255,255,255,.4)}\n@media(max-width:1024px){.flr__g{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.flr__g{grid-template-columns:1fr}.fl{padding:var(--s6) var(--s4)}}",
    html: "<div class=\"flr__g\">\n  <div class=\"fl\"><div class=\"fl__l\">Level 1</div><div class=\"fl__n\">Main Hall</div><div class=\"fl__d\">Temporary exhibitions and large-scale works</div></div>\n  <div class=\"fl\"><div class=\"fl__l\">Level 2</div><div class=\"fl__n\">Collection</div><div class=\"fl__d\">Permanent collection — 20th century masters</div></div>\n  <div class=\"fl\"><div class=\"fl__l\">Level 3</div><div class=\"fl__n\">Contemporary</div><div class=\"fl__d\">21st century art and new media</div></div>\n  <div class=\"fl\"><div class=\"fl__l\">Ground</div><div class=\"fl__n\">Sculpture Park</div><div class=\"fl__d\">Outdoor installations on Skeppsholmen</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 87,
    name: "Collection Grid (6-column with Highlight)",
    source: "moderna-museet.html",
    category: "section",
    css: ".col__g{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;margin-top:60px;background:var(--border)}\n.co{padding:var(--s8) var(--s4);text-align:center;background:var(--surface);transition:background .2s}\n.co:hover{background:var(--surface-raised)}\n.co__i{font-family:var(--fd);font-size:var(--3xl);font-weight:700;color:var(--text-display);opacity:.06;margin-bottom:var(--s2);line-height:1}\n.co__n{font-size:var(--sm);font-weight:500;color:var(--text-display);margin-bottom:2px}\n.co__yr{font-family:var(--fm);font-size:var(--xs);color:var(--text-disabled)}\n.co--hl{background:var(--text-display);color:#fff}\n.co--hl .co__i{color:rgba(255,255,255,.15);opacity:1}\n.co--hl .co__n{color:#fff}\n.co--hl .co__yr{color:rgba(255,255,255,.3)}\n@media(max-width:1024px){.col__g{grid-template-columns:repeat(3,1fr)}}\n@media(max-width:768px){.col__g{grid-template-columns:repeat(2,1fr)}}",
    html: "<div class=\"col__g\">\n  <div class=\"co co--hl\"><div class=\"co__i\">P</div><div class=\"co__n\">Picasso</div><div class=\"co__yr\">32 works</div></div>\n  <div class=\"co\"><div class=\"co__i\">D</div><div class=\"co__n\">Duchamp</div><div class=\"co__yr\">18 works</div></div>\n  <div class=\"co\"><div class=\"co__i\">K</div><div class=\"co__n\">Kandinsky</div><div class=\"co__yr\">24 works</div></div>\n  <div class=\"co\"><div class=\"co__i\">R</div><div class=\"co__n\">Rauschenberg</div><div class=\"co__yr\">15 works</div></div>\n  <div class=\"co\"><div class=\"co__i\">W</div><div class=\"co__n\">Warhol</div><div class=\"co__yr\">21 works</div></div>\n  <div class=\"co\"><div class=\"co__i\">G</div><div class=\"co__n\">Giacometti</div><div class=\"co__yr\">12 works</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 88,
    name: "Menu Board Hero (Dark)",
    source: "max-sverige.html",
    category: "hero",
    css: ".mh{min-height:100vh;background:var(--text-display);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;overflow:hidden}\n.mh::before{content:'MAX';position:absolute;top:-.08em;left:-.03em;font-family:var(--fd);font-size:clamp(12rem,30vw,30rem);font-weight:700;line-height:.8;letter-spacing:-.06em;color:rgba(255,255,255,.015);pointer-events:none;user-select:none}\n.mh__tag{font-family:var(--fm);font-size:11px;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.12);margin-bottom:var(--s8);position:relative;z-index:2}\n.mh__board{display:inline-block;position:relative;z-index:2}\n.mh__item{display:flex;align-items:baseline;gap:var(--s8);padding:var(--s3) 0;border-bottom:1px solid rgba(255,255,255,.04)}\n.mh__i{font-family:var(--fm);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:600;color:#fff;letter-spacing:-.5px}\n.mh__p{font-family:var(--fm);font-size:var(--lg);color:rgba(255,255,255,.2);font-weight:500}\n.mh__c{font-size:var(--sm);color:rgba(255,255,255,.15);margin-left:auto}\n@media(max-width:1024px){.mh{padding:60px 40px}}\n@media(max-width:768px){.mh{padding:40px 24px}.mh__i{font-size:1.5rem}.mh__item{gap:var(--s4)}}",
    html: "<section class=\"mh\">\n  <div class=\"mh__tag\">Stockholm Design Lab · MAX</div>\n  <div class=\"mh__board\">\n    <div class=\"mh__item\"><span class=\"mh__i\">MAX Original</span><span class=\"mh__p\">89:-</span><span class=\"mh__c\">Swedish beef · 150g</span></div>\n    <div class=\"mh__item\"><span class=\"mh__i\">Cheese & Bacon</span><span class=\"mh__p\">99:-</span><span class=\"mh__c\">Cheddar · Smoked bacon</span></div>\n    <div class=\"mh__item\"><span class=\"mh__i\">Halloumi</span><span class=\"mh__p\">89:-</span><span class=\"mh__c\">Grilled halloumi · Pesto</span></div>\n    <div class=\"mh__item\"><span class=\"mh__i\">Plant Based</span><span class=\"mh__p\">89:-</span><span class=\"mh__c\">Beyond Meat · Vegan</span></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 89,
    name: "Meal Grid (with Circle Icons)",
    source: "max-sverige.html",
    category: "section",
    css: ".mg__g{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:var(--border)}\n.mg__i{background:var(--surface);padding:var(--s10) var(--s8);text-align:center;position:relative;transition:background .2s}\n.mg__i:hover{background:var(--surface-raised)}\n.mg__b{width:80px;height:80px;border-radius:50%;margin:0 auto var(--s6);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:var(--2xl);color:rgba(255,255,255,.3)}\n.mg__n{font-size:var(--xl);font-weight:500;color:var(--text-display);margin-bottom:var(--s2);letter-spacing:-.3px}\n.mg__d{font-size:var(--sm);color:var(--text-secondary);line-height:1.6;max-width:240px;margin:0 auto var(--s4)}\n.mg__p{font-family:var(--fm);font-size:var(--lg);font-weight:600;color:var(--primary-olive)}\n@media(max-width:1024px){.mg__g{grid-template-columns:1fr}}\n@media(max-width:768px){.mg__i{padding:var(--s8) var(--s4)}}",
    html: "<div class=\"mg__g\">\n  <div class=\"mg__i\"><div class=\"mg__b\" style=\"background:var(--text-display)\">B</div><div class=\"mg__n\">Burgers</div><div class=\"mg__d\">100% Swedish beef. Grilled to order.</div><div class=\"mg__p\">from 89:-</div></div>\n  <div class=\"mg__i\"><div class=\"mg__b\" style=\"background:var(--primary-olive)\">F</div><div class=\"mg__n\">Fresh Fries</div><div class=\"mg__d\">Hand-cut potatoes. Cooked in sunflower oil.</div><div class=\"mg__p\">from 35:-</div></div>\n  <div class=\"mg__i\"><div class=\"mg__b\" style=\"background:var(--primary-earth)\">S</div><div class=\"mg__n\">Shakes</div><div class=\"mg__d\">Real dairy ice cream. Swedish milk.</div><div class=\"mg__p\">from 45:-</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 90,
    name: "Nutrition Facts (Dark Scene)",
    source: "max-sverige.html",
    category: "section",
    css: ".nu__g{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:rgba(255,255,255,.06)}\n.nu__i{padding:var(--s8) var(--s6);text-align:center}\n.nu__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s2)}\n.nu__v{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s1)}\n.nu__c{font-size:var(--sm);color:rgba(255,255,255,.25);line-height:1.5}\n.nu__b{height:2px;background:rgba(255,255,255,.06);margin-top:var(--s4);border-radius:1px;overflow:hidden}\n.nu__f{height:100%}\n@media(max-width:1024px){.nu__g{grid-template-columns:1fr}}",
    html: "<div class=\"nu__g\">\n  <div class=\"nu__i\"><div class=\"nu__l\">Calories</div><div class=\"nu__v\">540</div><div class=\"nu__c\">Per Original Burger · 27% of daily</div><div class=\"nu__b\"><div class=\"nu__f\" style=\"width:27%;background:var(--primary-olive)\"></div></div></div>\n  <div class=\"nu__i\"><div class=\"nu__l\">Protein</div><div class=\"nu__v\">34g</div><div class=\"nu__c\">Swedish beef · High quality</div><div class=\"nu__b\"><div class=\"nu__f\" style=\"width:68%;background:var(--primary-earth)\"></div></div></div>\n  <div class=\"nu__i\"><div class=\"nu__l\">CO2 Impact</div><div class=\"nu__v\">2.1<span style=\"font-size:1.5rem;color:rgba(255,255,255,.2)\">kg</span></div><div class=\"nu__c\">Industry avg: 3.5kg · -40%</div><div class=\"nu__b\"><div class=\"nu__f\" style=\"width:60%;background:var(--primary-olive)\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 91,
    name: "Sustainability Stats (Green Scene)",
    source: "max-sverige.html",
    category: "section",
    css: ".sus__g{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s12);margin-top:60px}\n.sus__i{text-align:center}\n.sus__n{font-family:var(--fm);font-size:var(--5xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s2)}\n.sus__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:var(--s3)}\n.sus__d{font-size:var(--sm);color:rgba(255,255,255,.4);line-height:1.5;max-width:280px;margin:0 auto}\n@media(max-width:1024px){.sus__g{grid-template-columns:1fr}}",
    html: "<div class=\"sus__g\">\n  <div class=\"sus__i\"><div class=\"sus__n\">100%</div><div class=\"sus__l\">Swedish Beef</div><div class=\"sus__d\">All beef from Swedish farms. No imports. Full traceability.</div></div>\n  <div class=\"sus__i\"><div class=\"sus__n\">-40%</div><div class=\"sus__l\">CO2 Reduction</div><div class=\"sus__d\">Compared to industry average. Continuous improvement.</div></div>\n  <div class=\"sus__i\"><div class=\"sus__n\">97%</div><div class=\"sus__l\">Renewable Energy</div><div class=\"sus__d\">All restaurants powered by renewable sources.</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 92,
    name: "Location Counter Grid",
    source: "max-sverige.html",
    category: "section",
    css: ".lc__g{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:60px;background:var(--border)}\n.lc__i{background:var(--surface);padding:var(--s8) var(--s6);text-align:center;transition:background .2s}\n.lc__i:hover{background:var(--surface-raised)}\n.lc__c{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;color:var(--primary-olive);letter-spacing:-1px;margin-bottom:var(--s1)}\n.lc__n{font-size:var(--base);font-weight:500;color:var(--text-display);margin-bottom:var(--s1)}\n.lc__d{font-size:var(--sm);color:var(--text-secondary);line-height:1.5}\n@media(max-width:1024px){.lc__g{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.lc__g{grid-template-columns:1fr}}",
    html: "<div class=\"lc__g\">\n  <div class=\"lc__i\"><div class=\"lc__c\">170+</div><div class=\"lc__n\">Restaurants</div><div class=\"lc__d\">Across Sweden, Norway, and Denmark</div></div>\n  <div class=\"lc__i\"><div class=\"lc__c\">50+</div><div class=\"lc__n\">Drive-thru</div><div class=\"lc__d\">Quick and convenient. Same quality.</div></div>\n  <div class=\"lc__i\"><div class=\"lc__c\">30</div><div class=\"lc__n\">Truck Stops</div><div class=\"lc__d\">Along major Swedish highways</div></div>\n  <div class=\"lc__i\"><div class=\"lc__c\">20</div><div class=\"lc__n\">Airports</div><div class=\"lc__d\">At Arlanda, Landvetter, and more</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 93,
    name: "Runway Hero (Fashion Split)",
    source: "j-lindeberg-performance.html",
    category: "hero",
    css: ".hero-runway{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;position:relative}\n.hero-runway__left{display:flex;flex-direction:column;justify-content:flex-end;padding:80px 120px;position:relative}\n.hero-runway__tag{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:20px;font-family:var(--fm)}\n.hero-runway__title{font-family:var(--fd);font-size:clamp(3.5rem,8vw,7rem);line-height:.92;letter-spacing:-3px;font-weight:300;color:var(--text-display);max-width:640px;position:relative;z-index:2}\n.hero-runway__title em{font-weight:700;font-style:normal}\n.hero-runway__right{background:var(--text-display);position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:80px}\n.hero-runway__number{font-family:var(--fd);font-size:clamp(8rem,16vw,16rem);font-weight:700;line-height:.85;letter-spacing:-6px;color:rgba(255,255,255,.04);position:absolute;right:-20px;bottom:-20px;user-select:none}\n.hero-runway__line{position:absolute;bottom:120px;left:80px;right:80px;height:1px;background:rgba(255,255,255,.08)}\n.hero-runway__credit{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);font-family:var(--fm);position:relative;z-index:2}\n@media(max-width:1024px){.hero-runway{grid-template-columns:1fr}.hero-runway__left{padding:60px 40px;min-height:60vh}.hero-runway__right{padding:40px;min-height:40vh}.hero-runway__line{display:none}}\n@media(max-width:768px){.hero-runway__left{padding:40px 24px}.hero-runway__title{font-size:36px;letter-spacing:-1px}.hero-runway__right{padding:24px}.hero-runway__number{font-size:100px}}",
    html: "<section class=\"hero-runway\">\n  <div class=\"hero-runway__left\">\n    <div class=\"hero-runway__tag\">Stockholm Design Lab · SS26</div>\n    <h1 class=\"hero-runway__title\">Performance<br>through <em>precision.</em></h1>\n  </div>\n  <div class=\"hero-runway__right\">\n    <div class=\"hero-runway__number\">2026</div>\n    <div class=\"hero-runway__line\"></div>\n    <div class=\"hero-runway__credit\">J.Lindeberg · Design System</div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 94,
    name: "Tech Spec Table (Dark 2-column)",
    source: "j-lindeberg-performance.html",
    category: "section",
    css: ".spec-table{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06)}\n.spec-row{display:flex;justify-content:space-between;align-items:baseline;padding:40px 48px;background:var(--text-display)}\n.spec-row__label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.3);font-family:var(--fm)}\n.spec-row__value{font-size:28px;font-weight:300;letter-spacing:-.5px;font-family:var(--fd)}\n.spec-row__value.signal{color:var(--accent-orange)}\n@media(max-width:1024px){.spec-table{grid-template-columns:1fr}}\n@media(max-width:768px){.spec-row{padding:24px}.spec-row__value{font-size:22px}}",
    html: "<div class=\"spec-table\">\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Water Column</span><span class=\"spec-row__value\">20,000<span style=\"font-size:14px;color:rgba(255,255,255,.2);font-family:var(--fm);letter-spacing:1px\">mm</span></span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Breathability</span><span class=\"spec-row__value\">15,000<span style=\"font-size:14px;color:rgba(255,255,255,.2);font-family:var(--fm);letter-spacing:1px\">g</span></span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Weight</span><span class=\"spec-row__value signal\">385<span style=\"font-size:14px;color:rgba(229,91,43,.2);font-family:var(--fm);letter-spacing:1px\">g</span></span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Stretch</span><span class=\"spec-row__value\">4-way</span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Seam Sealing</span><span class=\"spec-row__value\">Fully</span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Pack Size</span><span class=\"spec-row__value signal\">1.2<span style=\"font-size:14px;color:rgba(229,91,43,.2);font-family:var(--fm);letter-spacing:1px\">L</span></span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Face Fabric</span><span class=\"spec-row__value\" style=\"font-size:22px;font-family:var(--fb);font-weight:300\">Pertex Shield</span></div>\n  <div class=\"spec-row\"><span class=\"spec-row__label\">Origin</span><span class=\"spec-row__value\" style=\"font-size:22px;font-family:var(--fb);font-weight:300\">Sweden</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 95,
    name: "Material Palette (with Swatches)",
    source: "j-lindeberg-performance.html",
    category: "section",
    css: ".material-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:60px;margin-top:60px}\n.material-item{border-top:1px solid var(--border);padding-top:24px}\n.material-item__swatch{width:100%;height:120px;margin-bottom:24px;position:relative;overflow:hidden}\n.material-item__swatch--canvas{background:var(--bg)}\n.material-item__swatch--nylon{background:var(--text-display)}\n.material-item__swatch--mesh{background:var(--text-display);background-image:radial-gradient(circle at 2px 2px,rgba(255,255,255,.04) 1px,transparent 1px);background-size:8px 8px}\n.material-item__name{font-size:18px;font-weight:500;color:var(--text-display);margin-bottom:4px;letter-spacing:-.3px}\n.material-item__code{font-size:11px;letter-spacing:2px;color:var(--text-secondary);font-family:var(--fm);margin-bottom:16px}\n.material-item__desc{font-size:13px;color:var(--text-secondary);line-height:1.7}\n@media(max-width:1024px){.material-grid{grid-template-columns:1fr;gap:40px}}",
    html: "<div class=\"material-grid\">\n  <div class=\"material-item\"><div class=\"material-item__swatch material-item__swatch--canvas\"></div><div class=\"material-item__name\">Canvas Weave</div><div class=\"material-item__code\">JL-1014 · 100% Cotton</div><p class=\"material-item__desc\">Heavyweight cotton canvas with a waxed finish.</p></div>\n  <div class=\"material-item\"><div class=\"material-item__swatch material-item__swatch--nylon\"></div><div class=\"material-item__name\">Ripstop Nylon</div><div class=\"material-item__code\">JL-2047 · 100% Polyamide</div><p class=\"material-item__desc\">Ultra-light 20D ripstop. Reinforced grid structure.</p></div>\n  <div class=\"material-item\"><div class=\"material-item__swatch material-item__swatch--mesh\"></div><div class=\"material-item__name\">Aero Mesh</div><div class=\"material-item__code\">JL-3092 · Polyester Blend</div><p class=\"material-item__desc\">3D spacer mesh with open-cell structure. Maximum airflow.</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 96,
    name: "Campaign Spread (Image + Text)",
    source: "j-lindeberg-performance.html",
    category: "section",
    css: ".campaign-spread{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:60px;background:var(--border)}\n.campaign-image{background:var(--text-display);aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:80px;font-weight:200;color:rgba(255,255,255,.04);position:relative;overflow:hidden}\n.campaign-image__label{position:absolute;bottom:40px;left:40px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.15);font-family:var(--fm)}\n.campaign-text{padding:60px;display:flex;flex-direction:column;justify-content:center}\n.campaign-text__label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--text-secondary);font-family:var(--fm);margin-bottom:20px}\n.campaign-text__headline{font-family:var(--fd);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:400;line-height:1.2;color:var(--text-display);margin-bottom:20px;letter-spacing:-.5px}\n.campaign-text__body{font-size:14px;color:var(--text-secondary);line-height:1.8;max-width:400px}\n@media(max-width:1024px){.campaign-spread{grid-template-columns:1fr}}\n@media(max-width:768px){.campaign-text{padding:40px 24px}}",
    html: "<div class=\"campaign-spread\">\n  <div class=\"campaign-image\">JL<span class=\"campaign-image__label\">SS26 Campaign</span></div>\n  <div class=\"campaign-text\">\n    <div class=\"campaign-text__label\">Stockholm · Milan · Tokyo</div>\n    <div class=\"campaign-text__headline\">Lines that perform.<br>Silhouettes that endure.</div>\n    <p class=\"campaign-text__body\">The SS26 collection is a study in contrast: organic movement meets architectural precision. Each piece is engineered for a specific moment on the course, yet designed to transcend it.</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 97,
    name: "Silhouette Matrix (5-column with Active)",
    source: "j-lindeberg-performance.html",
    category: "section",
    css: ".silhouette-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;margin-top:60px;background:var(--border)}\n.silhouette-item{background:var(--bg);aspect-ratio:1/1.6;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;position:relative;transition:background .2s}\n.silhouette-item:hover{background:var(--surface-raised)}\n.silhouette-item__letter{font-family:var(--fd);font-size:40px;font-weight:200;color:var(--text-display);margin-bottom:8px}\n.silhouette-item__label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--text-secondary);font-family:var(--fm)}\n.silhouette-item__price{position:absolute;bottom:24px;font-family:var(--fm);font-size:11px;letter-spacing:1px;color:var(--text-secondary)}\n.silhouette-item.active{background:var(--text-display)}\n.silhouette-item.active .silhouette-item__letter{color:white}\n.silhouette-item.active .silhouette-item__label{color:rgba(255,255,255,.3)}\n.silhouette-item.active .silhouette-item__price{color:var(--accent-orange)}\n@media(max-width:1024px){.silhouette-grid{grid-template-columns:repeat(3,1fr)}}\n@media(max-width:768px){.silhouette-grid{grid-template-columns:repeat(2,1fr)}.silhouette-item{aspect-ratio:auto;min-height:160px}}",
    html: "<div class=\"silhouette-grid\">\n  <div class=\"silhouette-item\"><div class=\"silhouette-item__letter\">S</div><div class=\"silhouette-item__label\">Slim</div><div class=\"silhouette-item__price\">46</div></div>\n  <div class=\"silhouette-item active\"><div class=\"silhouette-item__letter\">M</div><div class=\"silhouette-item__label\">Modern</div><div class=\"silhouette-item__price\">48</div></div>\n  <div class=\"silhouette-item\"><div class=\"silhouette-item__letter\">A</div><div class=\"silhouette-item__label\">Athletic</div><div class=\"silhouette-item__price\">50</div></div>\n  <div class=\"silhouette-item\"><div class=\"silhouette-item__letter\">R</div><div class=\"silhouette-item__label\">Relaxed</div><div class=\"silhouette-item__price\">52</div></div>\n  <div class=\"silhouette-item\"><div class=\"silhouette-item__letter\">C</div><div class=\"silhouette-item__label\">Classic</div><div class=\"silhouette-item__price\">54</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 98,
    name: "Dualism Grid (Dark Contrast Pairs)",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".dualism__grid{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:var(--s8)}\n.dl{padding:var(--s12);border:1px solid rgba(255,255,255,.06);position:relative}\n.dl__num{font-family:var(--fm);font-size:var(--xs);letter-spacing:.1em;color:rgba(255,255,255,.2);margin-bottom:var(--s4)}\n.dl__pair{display:flex;align-items:center;gap:var(--s4);margin-bottom:var(--s4)}\n.dl__a{font-family:var(--fd);font-size:var(--2xl);font-weight:400;color:rgba(255,255,255,.9)}\n.dl__v{width:1px;height:24px;background:rgba(255,255,255,.2)}\n.dl__b{font-family:var(--fd);font-size:var(--2xl);font-weight:700;color:var(--primary-olive)}\n.dl__d{font-size:var(--base);line-height:1.7;color:rgba(255,255,255,.4);max-width:360px}\n@media(max-width:900px){.dualism__grid{grid-template-columns:1fr}}\n@media(max-width:768px){.dl{padding:var(--s8) var(--s4)}}",
    html: "<div class=\"dualism__grid\">\n  <div class=\"dl\"><div class=\"dl__num\">01</div><div class=\"dl__pair\"><span class=\"dl__a\">Heritage</span><span class=\"dl__v\"></span><span class=\"dl__b\">Future</span></div><p class=\"dl__d\">111 年的历史不是束缚，是基座。每款新产品必须同时回答：它尊重了什么传统？突破了什么边界？</p></div>\n  <div class=\"dl\"><div class=\"dl__num\">02</div><div class=\"dl__pair\"><span class=\"dl__a\">Organic</span><span class=\"dl__v\"></span><span class=\"dl__b\">Engineered</span></div><p class=\"dl__d\">自然的形态通过精确的几何被提炼。每一个弧度都有功能理由。</p></div>\n  <div class=\"dl\"><div class=\"dl__num\">03</div><div class=\"dl__pair\"><span class=\"dl__a\">Nature</span><span class=\"dl__v\"></span><span class=\"dl__b\">Tech</span></div><p class=\"dl__d\">泥土色的基底上，用精准的橙色信号做功能提示。</p></div>\n  <div class=\"dl\"><div class=\"dl__num\">04</div><div class=\"dl__pair\"><span class=\"dl__a\">Warmth</span><span class=\"dl__v\"></span><span class=\"dl__b\">Precision</span></div><p class=\"dl__d\">功能上的精确性和情感上的温度必须同时存在。</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 99,
    name: "Separated Fields (3-column Principles)",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".fields__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s10);margin-top:var(--s8)}\n.fld{position:relative}\n.fld::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--border)}\n.fld__icon{width:24px;height:24px;border:1.5px solid var(--primary-olive);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:var(--s4);font-family:var(--fm);font-size:var(--xs);color:var(--primary-olive)}\n.fld__h{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--text-display);margin-bottom:var(--s2);text-transform:uppercase;letter-spacing:.04em}\n.fld__p{font-size:var(--base);line-height:1.7;color:var(--text-secondary)}\n@media(max-width:900px){.fields__grid{grid-template-columns:1fr;gap:var(--s6)}}",
    html: "<div class=\"fields__grid\">\n  <div class=\"fld\"><div class=\"fld__icon\">F</div><div class=\"fld__h\">Form Follows Function</div><div class=\"fld__p\">每个组件的形态由其功能决定。装饰不是加法——是未被发现的减法。</div></div>\n  <div class=\"fld\"><div class=\"fld__icon\">G</div><div class=\"fld__h\">Grid as Rhythm</div><div class=\"fld__p\">网格不是牢笼。8px 是步长，不是精度。用间距而非分割线建立层级。</div></div>\n  <div class=\"fld\"><div class=\"fld__icon\">T</div><div class=\"fld__h\">Typography as Voice</div><div class=\"fld__p\">三种字体，三种角色，永不混用。每页不超过 3 字号 2 字重。</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 100,
    name: "Color Pillars (3-column Metrics)",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".pillars__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:var(--s8);background:var(--border)}\n.pll{padding:var(--s12) var(--s6);background:var(--bg);position:relative;overflow:hidden}\n.pll__bar{width:32px;height:2px;margin-bottom:var(--s4)}\n.pll__label{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:var(--s4)}\n.pll__num{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:var(--text-display);margin-bottom:var(--s2)}\n.pll__desc{font-size:var(--sm);line-height:1.6;color:var(--text-secondary)}\n.pll__deco{position:absolute;right:var(--s6);bottom:var(--s6);width:80px;height:80px;border-radius:50%;opacity:.04;pointer-events:none}\n@media(max-width:900px){.pillars__grid{grid-template-columns:1fr}}\n@media(max-width:768px){.pll{padding:var(--s8) var(--s4)}}",
    html: "<div class=\"pillars__grid\">\n  <div class=\"pll\"><div class=\"pll__bar\" style=\"background:var(--primary-olive)\"></div><div class=\"pll__label\">Nature · 户外 DNA</div><div class=\"pll__num\">olive</div><div class=\"pll__desc\">#4A5D3A — 品牌主色，承载户外基因与可持续理念。</div><div class=\"pll__deco\" style=\"background:var(--primary-olive)\"></div></div>\n  <div class=\"pll\"><div class=\"pll__bar\" style=\"background:var(--primary-earth)\"></div><div class=\"pll__label\">Material · 工艺温度</div><div class=\"pll__num\">earth</div><div class=\"pll__desc\">#8B7355 — 辅助品牌色，传递材质温暖与自然纹理。</div><div class=\"pll__deco\" style=\"background:var(--primary-earth)\"></div></div>\n  <div class=\"pll\"><div class=\"pll__bar\" style=\"background:var(--scene-glacier)\"></div><div class=\"pll__label\">Tech · 技术精确</div><div class=\"pll__num\">glacier</div><div class=\"pll__desc\">#2A4A5A — 场景色，代表冬季/高海拔/技术。</div><div class=\"pll__deco\" style=\"background:var(--scene-glacier)\"></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 101,
    name: "Dot Matrix (Fifth Element)",
    source: "sdl-design-principles.html",
    category: "decorative",
    css: ".fifth__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;max-width:300px;margin:var(--s12) auto}\n.fifth__grid .dot{aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.08);transition:background var(--dn) var(--eo)}\n.fifth__grid .dot.on{background:rgba(255,255,255,.3)}\n.fifth__grid .dot.hl{background:var(--primary-olive)}\n.fifth__p{font-size:var(--base);color:rgba(255,255,255,.3);max-width:560px;margin:0 auto;line-height:1.8}\n.fifth__p em{color:rgba(255,255,255,.6);font-style:normal}",
    html: "<div class=\"fifth__grid\">\n  <span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span>\n  <span class=\"dot on\"></span><span class=\"dot\"></span><span class=\"dot\"></span><span class=\"dot\"></span><span class=\"dot on\"></span>\n  <span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot\"></span><span class=\"dot on\"></span>\n  <span class=\"dot hl\"></span><span class=\"dot\"></span><span class=\"dot on\"></span><span class=\"dot\"></span><span class=\"dot on\"></span>\n  <span class=\"dot on\"></span><span class=\"dot\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span>\n  <span class=\"dot hl\"></span><span class=\"dot\"></span><span class=\"dot\"></span><span class=\"dot\"></span><span class=\"dot on\"></span>\n  <span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span><span class=\"dot on\"></span>\n</div>\n<p class=\"fifth__p\">点阵 H 是品牌的 <em>第五元素</em>——一个贯穿系统的签名视觉符号。从 Hero 区到数据卡片，它不做装饰，只做标记。</p>",
    hasJS: false
  },
  {
    id: 102,
    name: "Typography Specimen",
    source: "sdl-design-principles.html",
    category: "detail",
    css: ".specimen__grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--s6);margin-top:var(--s6)}\n.spec{padding:var(--s6);border:1px solid var(--border);border-radius:var(--r4);transition:border-color var(--df) var(--eo)}\n.spec:hover{border-color:var(--text-disabled)}\n.spec__role{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:var(--s2)}\n.spec__font{font-size:var(--lg);margin-bottom:var(--s1)}\n.spec__demo{font-size:var(--sm);color:var(--text-secondary);line-height:1.6;border-top:1px solid var(--border);padding-top:var(--s4);margin-top:var(--s4)}\n.spec__demo .x{font-family:var(--fd);display:block;font-size:2rem;line-height:1.2;color:var(--text-display)}\n.spec__demo .m{font-family:var(--fm);display:block;font-size:1.25rem;color:var(--text-display);margin-top:var(--s1)}\n@media(max-width:900px){.specimen__grid{grid-template-columns:1fr}}",
    html: "<div class=\"specimen__grid\">\n  <div class=\"spec\"><div class=\"spec__role\">Display · 展示</div><div class=\"spec__font\" style=\"font-family:var(--fd)\">Georgia</div><div class=\"spec__demo\"><span class=\"x\">Haglöfs</span><span class=\"m\">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</span></div></div>\n  <div class=\"spec\"><div class=\"spec__role\">Body · 正文</div><div class=\"spec__font\" style=\"font-family:var(--fb)\">Inter</div><div class=\"spec__demo\"><span style=\"font-family:var(--fb);font-size:1.125rem;display:block;line-height:1.4\">Crafted for the wild, since 1914.</span><span class=\"m\" style=\"font-family:var(--fb)\">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</span></div></div>\n  <div class=\"spec\"><div class=\"spec__role\">Mono · 数据</div><div class=\"spec__font\" style=\"font-family:var(--fm)\">JetBrains Mono</div><div class=\"spec__demo\"><span style=\"font-family:var(--fm);font-size:1.125rem;display:block;letter-spacing:.04em\">TECH-SPECS: 024 720 891</span><span class=\"m\" style=\"font-family:var(--fm)\">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</span></div></div>\n  <div class=\"spec\"><div class=\"spec__role\">Usage · 使用规则</div><div class=\"spec__font\">1 : 10 : 1</div><div class=\"spec__demo\"><span style=\"display:block;line-height:1.6\">Georgia : Inter : Mono 的使用频率比。Georgia 仅用于标题，Inter 覆盖 80%+ 正文，Mono 只做数据标签。</span></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 103,
    name: "System Apps Grid (8-card)",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".apps__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s4);margin-top:var(--s6)}\n.app{padding:var(--s6);background:var(--surface);border:1px solid var(--border);border-radius:var(--r4);text-align:center;transition:all var(--df) var(--eo)}\n.app:hover{border-color:var(--text-disabled);transform:translateY(-2px)}\n.app__ico{width:32px;height:32px;margin:0 auto var(--s3);border-radius:var(--r4);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:var(--sm);font-weight:600;color:#fff}\n.app__n{font-family:var(--fm);font-size:var(--xs);font-weight:600;color:var(--text-display);margin-bottom:var(--s1);letter-spacing:.02em;text-transform:uppercase}\n.app__d{font-size:var(--xs);color:var(--text-secondary);line-height:1.5}\n@media(max-width:1024px){.apps__grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.apps__grid{grid-template-columns:1fr}}",
    html: "<div class=\"apps__grid\">\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--primary-olive)\">R</div><div class=\"app__n\">Reading Portal</div><div class=\"app__d\">阅读入口 · 书卷式封面</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--scene-glacier)\">M</div><div class=\"app__n\">Marginalia</div><div class=\"app__d\">边注系统 · 3:1 双栏</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--primary-earth)\">D</div><div class=\"app__n\">Data Matrix</div><div class=\"app__d\">数据矩阵 · 关键指标</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--text-display)\">S</div><div class=\"app__n\">Summary</div><div class=\"app__d\">摘要胶囊 · 核心结论</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--primary-olive)\">I</div><div class=\"app__n\">Insight Cards</div><div class=\"app__d\">分析洞察 · 进度指标</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--scene-glacier)\">Q</div><div class=\"app__n\">Quote Array</div><div class=\"app__d\">引用阵列 · 关键片段</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--primary-earth)\">T</div><div class=\"app__n\">Key Terms</div><div class=\"app__d\">关键术语 · 交叉引用</div></div>\n  <div class=\"app\"><div class=\"app__ico\" style=\"background:var(--text-display)\">C</div><div class=\"app__n\">Chapter Index</div><div class=\"app__d\">章节索引 · 阅读轨迹</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 104,
    name: "Summary Numbered List (Dark)",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".summary__out{font-family:var(--fd);font-size:var(--5xl);font-weight:700;line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s8)}\n.summary__hed{font-family:var(--fm);font-size:var(--xs);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:var(--s4)}\n.summary__items{display:flex;flex-direction:column;gap:var(--s4)}\n.si{display:flex;gap:var(--s4);padding-bottom:var(--s4);border-bottom:1px solid rgba(255,255,255,.06)}\n.si:last-child{border:none;padding-bottom:0}\n.si__n{font-family:var(--fm);font-size:var(--sm);color:rgba(255,255,255,.2);flex-shrink:0;width:24px}\n.si__t{font-size:var(--base);line-height:1.6;color:rgba(255,255,255,.7)}\n.si__t .m{font-family:var(--fm);color:var(--primary-olive)}",
    html: "<div class=\"summary__hed\">阅读 + 分析 · 核心结论</div>\n<div class=\"summary__out\">4</div>\n<div class=\"summary__items\">\n  <div class=\"si\"><span class=\"si__n\">01</span><p class=\"si__t\"><span class=\"m\">Dualism</span> — 双元对比是品牌能量的来源。四组张力对同时工作。</p></div>\n  <div class=\"si\"><span class=\"si__n\">02</span><p class=\"si__t\"><span class=\"m\">Separated Fields</span> — 用间距建立层级，不用分割线。</p></div>\n  <div class=\"si\"><span class=\"si__n\">03</span><p class=\"si__t\"><span class=\"m\">Color Coding</span> — 颜色必须承载功能。80% brand + 10-15% scene + 5-10% accent。</p></div>\n  <div class=\"si\"><span class=\"si__n\">04</span><p class=\"si__t\"><span class=\"m\">The Fifth Element</span> — 每个品牌需要一个贯穿系统的签名元素。</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 105,
    name: "Chapter Index with Progress Trail",
    source: "sdl-design-principles.html",
    category: "section",
    css: ".ch-idx__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);margin-bottom:var(--s6)}\n.ch{display:flex;gap:var(--s4);align-items:flex-start}\n.ch__num{font-family:var(--fm);font-size:var(--sm);color:rgba(255,255,255,.2);flex-shrink:0;width:28px}\n.ch.act .ch__num{color:var(--primary-olive)}\n.ch__name{font-size:var(--base);color:rgba(255,255,255,.4);line-height:1.5}\n.ch.act .ch__name{color:#fff}\n.ch__ctx{display:block;font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.15);margin-top:2px;letter-spacing:.04em;text-transform:uppercase}\n.ch.act::before{content:'\\2192';font-family:var(--fm);font-size:var(--sm);color:var(--primary-olive);margin-right:var(--s2)}\n.ch.act{display:flex}\n.ptrl{display:flex;gap:var(--s2);align-items:center;padding:var(--s6) 0;border-top:1px solid rgba(255,255,255,.04)}\n.ptrl__d{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.1);transition:all var(--dn) var(--eo)}\n.ptrl__d.done{background:rgba(255,255,255,.15)}\n.ptrl__d.cur{background:var(--primary-olive);width:20px;border-radius:3px}\n.ptrl__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.15);margin-left:var(--s2)}\n@media(max-width:1024px){.ch-idx__grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.ch-idx__grid{grid-template-columns:1fr}}",
    html: "<div class=\"ch-idx__grid\">\n  <div class=\"ch act\"><span class=\"ch__num\">01</span><div><div class=\"ch__name\">双元对比 · Dualism</div><span class=\"ch__ctx\">当前 · 设计哲学</span></div></div>\n  <div class=\"ch\"><span class=\"ch__num\">02</span><div><div class=\"ch__name\">分隔场域 · Separated Fields</div><span class=\"ch__ctx\">网格与间距系统</span></div></div>\n  <div class=\"ch\"><span class=\"ch__num\">03</span><div><div class=\"ch__name\">色彩编码 · Color Pillars</div><span class=\"ch__ctx\">颜色功能化</span></div></div>\n  <div class=\"ch\"><span class=\"ch__num\">04</span><div><div class=\"ch__name\">第五元素 · The Fifth Element</div><span class=\"ch__ctx\">签名视觉</span></div></div>\n  <div class=\"ch\"><span class=\"ch__num\">05</span><div><div class=\"ch__name\">字体即声音 · Typography</div><span class=\"ch__ctx\">三工分离</span></div></div>\n  <div class=\"ch\"><span class=\"ch__num\">06</span><div><div class=\"ch__name\">系统应用 · Ecosystem</div><span class=\"ch__ctx\">全触点覆盖</span></div></div>\n</div>\n<div class=\"ptrl\">\n  <span class=\"ptrl__d done\"></span>\n  <span class=\"ptrl__d cur\"></span>\n  <span class=\"ptrl__d\"></span>\n  <span class=\"ptrl__d\"></span>\n  <span class=\"ptrl__d\"></span>\n  <span class=\"ptrl__d\"></span>\n  <span class=\"ptrl__lbl\">当前 · 双元对比</span>\n</div>",
    hasJS: false
  },
  {
    id: 106,
    name: "Choropleth Map",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".ec-map{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.ec-map__g{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;max-width:400px}\n.ec-map__g span{aspect-ratio:1;border-radius:2px;transition:opacity .2s}\n.ec-map__g span:hover{opacity:.6}\n.ec-map__l{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}\n.ec-map__l span{font-family:'JetBrains Mono',monospace;font-size:8px;display:flex;align-items:center;gap:4px}\n.ec-map__l .s{width:10px;height:10px;border-radius:2px}\n.ec-map__r{padding:24px;background:var(--card2);border-radius:8px}\n.ec-map__t{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text2);margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em}\n.ec-map__i{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}\n.ec-map__i:last-child{border-bottom:none}\n.ec-map__n{color:var(--text2)}\n.ec-map__v{font-family:'JetBrains Mono',monospace;font-weight:600}\n@media(max-width:900px){.ec-map{grid-template-columns:1fr}}",
    html: "<div class=\"ec-map\">\n  <div>\n    <div class=\"ec-map__g\">\n      <span style=\"background:var(--accent);opacity:.8\"></span><span style=\"background:var(--accent);opacity:.6\"></span><span style=\"background:var(--accent);opacity:.4\"></span><span style=\"background:var(--accent);opacity:.2\"></span><span style=\"background:var(--accent);opacity:.1\"></span>\n      <span style=\"background:var(--accent);opacity:.3\"></span><span style=\"background:var(--accent);opacity:.7\"></span><span style=\"background:var(--accent);opacity:.9\"></span><span style=\"background:var(--accent);opacity:.5\"></span><span style=\"background:var(--accent);opacity:.2\"></span>\n      <span style=\"background:var(--accent);opacity:.1\"></span><span style=\"background:var(--accent);opacity:.4\"></span><span style=\"background:var(--accent);opacity:.8\"></span><span style=\"background:var(--accent);opacity:.6\"></span><span style=\"background:var(--accent);opacity:.3\"></span>\n      <span style=\"background:var(--accent);opacity:.5\"></span><span style=\"background:var(--accent);opacity:.2\"></span><span style=\"background:var(--accent);opacity:.1\"></span><span style=\"background:var(--accent);opacity:.7\"></span><span style=\"background:var(--accent);opacity:.9\"></span>\n      <span style=\"background:var(--accent);opacity:.8\"></span><span style=\"background:var(--accent);opacity:.6\"></span><span style=\"background:var(--accent);opacity:.4\"></span><span style=\"background:var(--accent);opacity:.2\"></span><span style=\"background:var(--accent);opacity:.1\"></span>\n    </div>\n    <div class=\"ec-map__l\">\n      <span><span class=\"s\" style=\"background:var(--accent);opacity:.9\"></span> High</span>\n      <span><span class=\"s\" style=\"background:var(--accent);opacity:.5\"></span> Med</span>\n      <span><span class=\"s\" style=\"background:var(--accent);opacity:.1\"></span> Low</span>\n    </div>\n  </div>\n  <div class=\"ec-map__r\">\n    <div class=\"ec-map__t\">Global GDP Growth 2026</div>\n    <div class=\"ec-map__i\"><span class=\"ec-map__n\">Asia-Pacific</span><span class=\"ec-map__v\" style=\"color:var(--accent)\">+5.2%</span></div>\n    <div class=\"ec-map__i\"><span class=\"ec-map__n\">North America</span><span class=\"ec-map__v\" style=\"color:var(--accent2)\">+2.8%</span></div>\n    <div class=\"ec-map__i\"><span class=\"ec-map__n\">Europe</span><span class=\"ec-map__v\" style=\"color:var(--accent3)\">+1.4%</span></div>\n    <div class=\"ec-map__i\"><span class=\"ec-map__n\">Middle East</span><span class=\"ec-map__v\" style=\"color:var(--accent4)\">+3.6%</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 107,
    name: "Daily Chart Grid",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".ec-daily{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;background:var(--line);margin-top:24px}\n.ec-daily__i{padding:24px;background:var(--card);transition:background .2s}\n.ec-daily__i:hover{background:var(--card2)}\n.ec-daily__l{font-family:'JetBrains Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.ec-daily__n{font-size:15px;font-weight:700;margin-bottom:4px;line-height:1.3}\n.ec-daily__d{font-size:11px;color:var(--text2);line-height:1.5;margin-bottom:12px}\n.ec-daily__b{height:3px;width:100%;background:var(--card2);border-radius:2px;overflow:hidden}\n.ec-daily__f{height:100%}\n@media(max-width:900px){.ec-daily{grid-template-columns:1fr}}",
    html: "<div class=\"ec-daily\">\n  <div class=\"ec-daily__i\"><div class=\"ec-daily__l\">Markets</div><div class=\"ec-daily__n\">Bond yields cross 5%</div><div class=\"ec-daily__d\">Long-term US Treasury yields hit levels not seen since 2007.</div><div class=\"ec-daily__b\"><div class=\"ec-daily__f\" style=\"width:82%;background:var(--accent)\"></div></div></div>\n  <div class=\"ec-daily__i\"><div class=\"ec-daily__l\">Economy</div><div class=\"ec-daily__n\">Eurozone avoids recession</div><div class=\"ec-daily__d\">GDP flat in Q4 but labour market remains resilient.</div><div class=\"ec-daily__b\"><div class=\"ec-daily__f\" style=\"width:45%;background:var(--accent2)\"></div></div></div>\n  <div class=\"ec-daily__i\"><div class=\"ec-daily__l\">Tech</div><div class=\"ec-daily__n\">AI investment surges 40%</div><div class=\"ec-daily__d\">Global corporate spending on AI infrastructure reaches new high.</div><div class=\"ec-daily__b\"><div class=\"ec-daily__f\" style=\"width:68%;background:var(--accent4)\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 108,
    name: "Data Appendix",
    source: "dataviz-deep-part1.html",
    category: "detail",
    css: ".ec-app{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}\n.ec-app__i{padding:20px;background:var(--card2);border-radius:6px;font-size:12px}\n.ec-app__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.ec-app__p{color:var(--text2);line-height:1.6}\n@media(max-width:900px){.ec-app{grid-template-columns:1fr}}",
    html: "<div class=\"ec-app\">\n  <div class=\"ec-app__i\"><div class=\"ec-app__t\">Sources & Methods</div><div class=\"ec-app__p\">Data drawn from national statistical agencies, IMF World Economic Outlook, and Bloomberg. All GDP figures adjusted for purchasing power parity.</div></div>\n  <div class=\"ec-app__i\"><div class=\"ec-app__t\">Notes</div><div class=\"ec-app__p\">Regional aggregates weighted by GDP. \"Europe\" includes EU27 + UK + Switzerland + Norway. Asia-Pacific excludes Japan.</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 109,
    name: "Big Number Cover",
    source: "dataviz-deep-part1.html",
    category: "hero",
    css: ".ft-bn{padding:64px 48px;background:var(--card2);border-radius:8px;text-align:center;margin-top:24px;position:relative;overflow:hidden}\n.ft-bn__tag{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:24px}\n.ft-bn__n{font-family:'JetBrains Mono',monospace;font-size:clamp(4rem,10vw,8rem);font-weight:800;line-height:.85;letter-spacing:-4px;margin-bottom:16px}\n.ft-bn__d{font-size:15px;color:var(--text2);max-width:400px;margin:0 auto;line-height:1.6}\n.ft-bn__s{display:flex;gap:16px;justify-content:center;margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3)}\n.ft-bn__l{width:40px;height:2px;background:var(--accent);margin:24px auto 0}\n@media(max-width:768px){.ft-bn{padding:40px 24px}.ft-bn__n{font-size:clamp(2.5rem,15vw,4rem)}}",
    html: "<div class=\"ft-bn\">\n  <div class=\"ft-bn__tag\">FT Big Read</div>\n  <div class=\"ft-bn__n\" style=\"color:var(--accent2)\">$12.4T</div>\n  <div class=\"ft-bn__d\">The digital economy now accounts for 15.6% of global GDP — larger than the entire economy of China.</div>\n  <div class=\"ft-bn__s\"><span>Source: IMF</span><span>Updated: 2026</span></div>\n  <div class=\"ft-bn__l\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 110,
    name: "Lex Column Cards",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".ft-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}\n.ft-col__i{padding:24px;border:1px solid var(--line);border-radius:6px}\n.ft-col__a{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:4px}\n.ft-col__h{font-size:18px;font-weight:600;margin-bottom:8px;letter-spacing:-.3px}\n.ft-col__p{font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px}\n.ft-col__s{display:flex;gap:8px;align-items:center}\n.ft-col__b{width:24px;height:2px;background:var(--accent)}\n@media(max-width:900px){.ft-col{grid-template-columns:1fr}}",
    html: "<div class=\"ft-col\">\n  <div class=\"ft-col__i\"><div class=\"ft-col__a\">Lex · Tech</div><div class=\"ft-col__h\">Apple's Services<br>margins expand</div><div class=\"ft-col__p\">Services now contribute 42% of gross profit, up from 28% five years ago. The shift is structural, not cyclical.</div><div class=\"ft-col__s\"><div class=\"ft-col__b\"></div><span style=\"font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);text-transform:uppercase\">Read full column</span></div></div>\n  <div class=\"ft-col__i\"><div class=\"ft-col__a\">Lex · Energy</div><div class=\"ft-col__h\">BP's transition<br>hits turbulence</div><div class=\"ft-col__p\">Renewable investments have not yet offset declining upstream margins. The market is losing patience.</div><div class=\"ft-col__s\"><div class=\"ft-col__b\"></div><span style=\"font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);text-transform:uppercase\">Read full column</span></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 111,
    name: "Correlation Scatter",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".ft-scatter{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.ft-scatter__g{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;max-width:300px;margin:0 auto}\n.ft-scatter__g span{aspect-ratio:1;border-radius:50%;transition:all .2s}\n.ft-scatter__g span:hover{transform:scale(1.5)}\n.ft-scatter__r{padding:20px;background:var(--card2);border-radius:8px}\n.ft-scatter__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:12px}\n.ft-scatter__i{display:flex;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px solid var(--line)}\n.ft-scatter__i:last-child{border-bottom:none}\n.ft-scatter__k{color:var(--text2)}\n.ft-scatter__v{font-family:'JetBrains Mono',monospace;font-weight:600}\n@media(max-width:900px){.ft-scatter{grid-template-columns:1fr}}",
    html: "<div class=\"ft-scatter\">\n  <div class=\"ft-scatter__g\">\n    <span style=\"background:var(--accent2);width:24px;height:24px\"></span>\n    <span style=\"background:var(--accent2);width:18px;height:18px\"></span>\n    <span style=\"background:var(--accent2);width:12px;height:12px\"></span>\n    <span style=\"background:var(--accent2);width:30px;height:30px\"></span>\n    <span style=\"background:var(--accent2);width:16px;height:16px\"></span>\n    <span style=\"background:var(--accent2);width:20px;height:20px\"></span>\n  </div>\n  <div class=\"ft-scatter__r\">\n    <div class=\"ft-scatter__t\">R&D vs Revenue Growth</div>\n    <div class=\"ft-scatter__i\"><span class=\"ft-scatter__k\">Correlation</span><span class=\"ft-scatter__v\" style=\"color:var(--accent2)\">0.72</span></div>\n    <div class=\"ft-scatter__i\"><span class=\"ft-scatter__k\">Sample</span><span class=\"ft-scatter__v\">248 firms</span></div>\n    <div class=\"ft-scatter__i\"><span class=\"ft-scatter__k\">Significance</span><span class=\"ft-scatter__v\">p &lt; 0.01</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 112,
    name: "Billionaire Index",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".bl-bill{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;margin-top:24px}\n.bl-bill__i{padding:24px 16px;text-align:center}\n.bl-bill__p{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em}\n.bl-bill__n{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:600;margin:4px 0}\n.bl-bill__d{font-size:10px;color:var(--text2);line-height:1.4}\n.bl-bill__c{width:40px;height:2px;margin:8px auto 0;border-radius:1px}\n@media(max-width:900px){.bl-bill{grid-template-columns:1fr}}",
    html: "<div class=\"bl-bill\">\n  <div class=\"bl-bill__i\"><div class=\"bl-bill__p\">#1</div><div class=\"bl-bill__n\" style=\"color:var(--accent2)\">$138B</div><div class=\"bl-bill__d\">Bernard Arnault</div><div class=\"bl-bill__c\" style=\"background:var(--accent2);opacity:.5\"></div></div>\n  <div class=\"bl-bill__i\"><div class=\"bl-bill__p\">#2</div><div class=\"bl-bill__n\" style=\"color:var(--accent4)\">$128B</div><div class=\"bl-bill__d\">Jeff Bezos</div><div class=\"bl-bill__c\" style=\"background:var(--accent4);opacity:.5\"></div></div>\n  <div class=\"bl-bill__i\"><div class=\"bl-bill__p\">#3</div><div class=\"bl-bill__n\" style=\"color:var(--accent3)\">$98B</div><div class=\"bl-bill__d\">Elon Musk</div><div class=\"bl-bill__c\" style=\"background:var(--accent3);opacity:.5\"></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 113,
    name: "Supply Chain Pressure",
    source: "dataviz-deep-part1.html",
    category: "section",
    css: ".bl-sc{margin-top:24px;padding:24px;background:var(--card2);border-radius:8px}\n.bl-sc__g{display:flex;flex-direction:column;gap:6px;margin-top:12px}\n.bl-sc__r{display:grid;grid-template-columns:80px 1fr 60px;gap:16px;align-items:center;font-size:12px}\n.bl-sc__l{font-family:'JetBrains Mono',monospace;color:var(--text3);text-transform:uppercase;letter-spacing:.04em}\n.bl-sc__t{height:12px;background:var(--card);border-radius:2px;overflow:hidden;display:flex}\n.bl-sc__t span{height:100%}\n.bl-sc__v{font-family:'JetBrains Mono',monospace;text-align:right}",
    html: "<div class=\"bl-sc\">\n  <div style=\"font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600\">Supply Chain Pressure Index</div>\n  <div class=\"bl-sc__g\">\n    <div class=\"bl-sc__r\"><span class=\"bl-sc__l\">Semi</span><div class=\"bl-sc__t\"><span style=\"width:65%;background:var(--accent4)\"></span></div><span class=\"bl-sc__v\">0.65</span></div>\n    <div class=\"bl-sc__r\"><span class=\"bl-sc__l\">Shipping</span><div class=\"bl-sc__t\"><span style=\"width:42%;background:var(--accent)\"></span></div><span class=\"bl-sc__v\">0.42</span></div>\n    <div class=\"bl-sc__r\"><span class=\"bl-sc__l\">Energy</span><div class=\"bl-sc__t\"><span style=\"width:78%;background:var(--accent2)\"></span></div><span class=\"bl-sc__v\">0.78</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 114,
    name: "Economic Surprise Index",
    source: "dataviz-deep-part1.html",
    category: "detail",
    css: ".bl-surprise{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:24px}\n.bl-surprise__i{padding:20px 12px;border:1px solid var(--line);border-radius:6px;text-align:center;transition:all .2s}\n.bl-surprise__i:hover{border-color:var(--text3)}\n.bl-surprise__r{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3);margin-bottom:4px}\n.bl-surprise__v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600}\n.bl-surprise__d{font-size:9px;color:var(--text2);margin-top:2px}\n.bl-surprise__t{height:2px;margin-top:8px;border-radius:1px;overflow:hidden}\n.bl-surprise__f{height:100%}\n@media(max-width:900px){.bl-surprise{grid-template-columns:repeat(2,1fr)}}",
    html: "<div class=\"bl-surprise\">\n  <div class=\"bl-surprise__i\"><div class=\"bl-surprise__r\">US</div><div class=\"bl-surprise__v\" style=\"color:var(--accent2)\">+12.4</div><div class=\"bl-surprise__d\">Above expectations</div><div class=\"bl-surprise__t\"><div class=\"bl-surprise__f\" style=\"width:68%;background:var(--accent2)\"></div></div></div>\n  <div class=\"bl-surprise__i\"><div class=\"bl-surprise__r\">EU</div><div class=\"bl-surprise__v\" style=\"color:var(--accent4)\">-3.2</div><div class=\"bl-surprise__d\">Below expectations</div><div class=\"bl-surprise__t\"><div class=\"bl-surprise__f\" style=\"width:28%;background:var(--accent4)\"></div></div></div>\n  <div class=\"bl-surprise__i\"><div class=\"bl-surprise__r\">Japan</div><div class=\"bl-surprise__v\" style=\"color:var(--accent)\">+8.6</div><div class=\"bl-surprise__d\">Above expectations</div><div class=\"bl-surprise__t\"><div class=\"bl-surprise__f\" style=\"width:55%;background:var(--accent)\"></div></div></div>\n  <div class=\"bl-surprise__i\"><div class=\"bl-surprise__r\">China</div><div class=\"bl-surprise__v\" style=\"color:var(--accent3)\">+5.8</div><div class=\"bl-surprise__d\">Above expectations</div><div class=\"bl-surprise__t\"><div class=\"bl-surprise__f\" style=\"width:42%;background:var(--accent3)\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 115,
    name: "Global Dot Map",
    source: "dataviz-deep-part1.html",
    category: "decorative",
    css: ".bl-globe{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;max-width:400px;margin:24px auto 0}\n.bl-globe span{aspect-ratio:1;border-radius:3px;transition:opacity .2s}\n.bl-globe span:hover{opacity:.5}\n@media(max-width:768px){.bl-globe{grid-template-columns:repeat(4,1fr)}}",
    html: "<div class=\"bl-globe\">\n  <span style=\"background:var(--accent2);opacity:.7\"></span><span style=\"background:var(--accent2);opacity:.9\"></span><span style=\"background:var(--accent2);opacity:.4\"></span><span style=\"background:var(--accent2);opacity:.2\"></span><span style=\"background:var(--accent2);opacity:.5\"></span><span style=\"background:var(--accent2);opacity:.8\"></span><span style=\"background:var(--accent2);opacity:.3\"></span><span style=\"background:var(--accent2);opacity:.6\"></span>\n</div>",
    hasJS: false
  },
  {
    id: 116,
    name: "Heart Rate Trend (SVG)",
    source: "dataviz-deep-part2.html",
    category: "section",
    css: ".ap-hr{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.ap-hr__svg{width:100%;height:120px}\n.ap-hr__svg path{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.ap-hr__r{padding:24px;background:var(--card2);border-radius:8px}\n.ap-hr__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:12px}\n.ap-hr__i{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}\n.ap-hr__i:last-child{border-bottom:none}\n@media(max-width:900px){.ap-hr{grid-template-columns:1fr}}",
    html: "<div class=\"ap-hr\">\n  <svg class=\"ap-hr__svg\" viewBox=\"0 0 400 120\" preserveAspectRatio=\"none\">\n    <path d=\"M0 80 Q20 78 40 72 T80 65 T120 58 T160 50 T200 45 T240 42 T280 55 T320 50 T360 38 T400 32\" stroke=\"var(--accent)\" stroke-width=\"2\"/>\n    <path d=\"M0 80 Q20 78 40 72 T80 65 T120 58 T160 50 T200 45 T240 42 T280 55 T320 50 T360 38 T400 32\" stroke=\"rgba(229,91,43,.06)\" stroke-width=\"16\" fill=\"none\" stroke-linecap=\"round\"/>\n  </svg>\n  <div class=\"ap-hr__r\">\n    <div class=\"ap-hr__t\">Today's Readings</div>\n    <div class=\"ap-hr__i\"><span>Resting</span><span style=\"font-weight:600\">58 bpm</span></div>\n    <div class=\"ap-hr__i\"><span>Walking</span><span style=\"font-weight:600\">82 bpm</span></div>\n    <div class=\"ap-hr__i\"><span>Workout</span><span style=\"font-weight:600;color:var(--accent)\">138 bpm</span></div>\n    <div class=\"ap-hr__i\"><span>Recovery</span><span style=\"font-weight:600\">72 bpm</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 117,
    name: "Sleep Analysis",
    source: "dataviz-deep-part2.html",
    category: "section",
    css: ".ap-sl{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}\n.ap-sl__i{padding:24px;background:var(--card2);border-radius:8px;text-align:center}\n.ap-sl__l{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.ap-sl__v{font-size:36px;font-weight:600;font-family:'JetBrains Mono',monospace;letter-spacing:-1px}\n.ap-sl__d{font-size:11px;color:var(--text2);margin-top:4px}\n.ap-sl__b{height:4px;margin:8px auto 0;border-radius:2px;overflow:hidden;max-width:120px}\n.ap-sl__f{height:100%}\n@media(max-width:900px){.ap-sl{grid-template-columns:1fr}}",
    html: "<div class=\"ap-sl\">\n  <div class=\"ap-sl__i\"><div class=\"ap-sl__l\">Deep Sleep</div><div class=\"ap-sl__v\" style=\"color:var(--accent4)\">2h 12m</div><div class=\"ap-sl__d\">18% of total</div><div class=\"ap-sl__b\"><div class=\"ap-sl__f\" style=\"width:18%;background:var(--accent4)\"></div></div></div>\n  <div class=\"ap-sl__i\"><div class=\"ap-sl__l\">REM</div><div class=\"ap-sl__v\" style=\"color:var(--accent3)\">1h 48m</div><div class=\"ap-sl__d\">15% of total</div><div class=\"ap-sl__b\"><div class=\"ap-sl__f\" style=\"width:15%;background:var(--accent3)\"></div></div></div>\n  <div class=\"ap-sl__i\"><div class=\"ap-sl__l\">Light Sleep</div><div class=\"ap-sl__v\" style=\"color:var(--accent2)\">8h 12m</div><div class=\"ap-sl__d\">67% of total</div><div class=\"ap-sl__b\"><div class=\"ap-sl__f\" style=\"width:67%;background:var(--accent2)\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 118,
    name: "Workout Log",
    source: "dataviz-deep-part2.html",
    category: "detail",
    css: ".ap-wo{display:flex;flex-direction:column;gap:6px;margin-top:24px}\n.ap-wo__r{display:grid;grid-template-columns:1fr 60px 60px;gap:16px;align-items:center;padding:12px 16px;background:var(--card2);border-radius:6px;font-size:13px;transition:background .2s}\n.ap-wo__r:hover{background:var(--line)}\n.ap-wo__n{font-weight:500}\n.ap-wo__v{font-family:'JetBrains Mono',monospace;text-align:right}\n.ap-wo__l{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);text-align:right}\n@media(max-width:900px){.ap-wo__r{grid-template-columns:1fr 50px;gap:8px}.ap-wo__l{display:none}}",
    html: "<div class=\"ap-wo\">\n  <div class=\"ap-wo__r\"><span class=\"ap-wo__n\">Outdoor Run</span><span class=\"ap-wo__v\">8.4 km</span><span class=\"ap-wo__l\">42 min</span></div>\n  <div class=\"ap-wo__r\"><span class=\"ap-wo__n\">Cycling</span><span class=\"ap-wo__v\">24.6 km</span><span class=\"ap-wo__l\">68 min</span></div>\n  <div class=\"ap-wo__r\"><span class=\"ap-wo__n\">Strength</span><span class=\"ap-wo__v\">45 min</span><span class=\"ap-wo__l\">8 exercises</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 119,
    name: "Audio Radar",
    source: "dataviz-deep-part2.html",
    category: "section",
    css: ".sp-radar{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.sp-radar__g{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-width:200px;margin:0 auto}\n.sp-radar__l{text-align:center;padding:12px;font-family:'JetBrains Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:1px;border-radius:4px;color:#fff}\n.sp-radar__r{padding:20px;background:var(--card2);border-radius:8px}\n.sp-radar__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.sp-radar__i{display:flex;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px solid var(--line)}\n@media(max-width:900px){.sp-radar{grid-template-columns:1fr}}",
    html: "<div class=\"sp-radar\">\n  <div class=\"sp-radar__g\">\n    <div class=\"sp-radar__l\" style=\"background:var(--accent)\">E · 78%</div>\n    <div class=\"sp-radar__l\" style=\"background:var(--accent2)\">A · 65%</div>\n    <div class=\"sp-radar__l\" style=\"background:var(--accent4)\">H · 82%</div>\n    <div class=\"sp-radar__l\" style=\"background:var(--accent3)\">T · 42%</div>\n    <div class=\"sp-radar__l\" style=\"background:grey\">V · 58%</div>\n    <div class=\"sp-radar__l\" style=\"background:var(--accent2)\">D · 71%</div>\n  </div>\n  <div class=\"sp-radar__r\">\n    <div class=\"sp-radar__t\">Audio DNA Key</div>\n    <div class=\"sp-radar__i\"><span>Energy</span><span>78%</span></div>\n    <div class=\"sp-radar__i\"><span>Acoustic</span><span>65%</span></div>\n    <div class=\"sp-radar__i\"><span>Happiness</span><span>82%</span></div>\n    <div class=\"sp-radar__i\"><span>Tempo</span><span>42%</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 120,
    name: "Decade Bar Trend",
    source: "dataviz-deep-part2.html",
    category: "hero",
    css: ".sp-dec{display:flex;gap:2px;align-items:flex-end;height:120px;margin-top:24px;padding:0 16px}\n.sp-dec div{flex:1;border-radius:2px 2px 0 0;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative}\n.sp-dec__v{position:absolute;top:-18px;font-family:'JetBrains Mono',monospace;font-size:9px}\n.sp-dec__lbl{position:absolute;bottom:-18px;font-family:'JetBrains Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.5px}\n@media(max-width:768px){.sp-dec{height:80px;padding:0 4px}.sp-dec__v{font-size:7px;top:-14px}}",
    html: "<div class=\"sp-dec\">\n  <div style=\"height:28%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">28%</span><span class=\"sp-dec__lbl\">2016</span></div>\n  <div style=\"height:45%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">45%</span><span class=\"sp-dec__lbl\">2018</span></div>\n  <div style=\"height:62%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">62%</span><span class=\"sp-dec__lbl\">2020</span></div>\n  <div style=\"height:78%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">78%</span><span class=\"sp-dec__lbl\">2022</span></div>\n  <div style=\"height:55%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">55%</span><span class=\"sp-dec__lbl\">2024</span></div>\n  <div style=\"height:82%;background:var(--accent2)\"><span class=\"sp-dec__v\" style=\"color:var(--accent2)\">82%</span><span class=\"sp-dec__lbl\">2026</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 121,
    name: "Collab Playlist",
    source: "dataviz-deep-part2.html",
    category: "detail",
    css: ".sp-collab{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px}\n.sp-collab__i{padding:16px;background:var(--card2);border-radius:6px;display:flex;align-items:center;gap:12px}\n.sp-collab__c{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#fff;flex-shrink:0}\n@media(max-width:900px){.sp-collab{grid-template-columns:1fr}}",
    html: "<div class=\"sp-collab\">\n  <div class=\"sp-collab__i\"><div class=\"sp-collab__c\" style=\"background:var(--accent2)\">M</div><div><div style=\"font-size:13px;font-weight:500\">Morning Commute</div><div style=\"font-size:10px;color:var(--text2)\">42 tracks · 2h 48m</div></div></div>\n  <div class=\"sp-collab__i\"><div class=\"sp-collab__c\" style=\"background:var(--accent)\">F</div><div><div style=\"font-size:13px;font-weight:500\">Friday Night</div><div style=\"font-size:10px;color:var(--text2)\">28 tracks · 1h 52m</div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 122,
    name: "Strava Training Log",
    source: "dataviz-deep-part2.html",
    category: "detail",
    css: ".st-train{display:flex;flex-direction:column;gap:4px;margin-top:24px}\n.st-train__r{display:grid;grid-template-columns:1fr 60px 60px;gap:16px;align-items:center;padding:10px 16px;background:var(--card2);border-radius:6px;font-size:12px;transition:background .2s}\n.st-train__r:hover{background:var(--line)}\n.st-train__d{font-weight:500}\n.st-train__k{font-family:'JetBrains Mono',monospace;text-align:right;color:var(--text2)}\n.st-train__t{font-family:'JetBrains Mono',monospace;text-align:right}",
    html: "<div class=\"st-train\">\n  <div class=\"st-train__r\"><span class=\"st-train__d\">Morning Run</span><span class=\"st-train__k\">6.2 km</span><span class=\"st-train__t\">32 min</span></div>\n  <div class=\"st-train__r\"><span class=\"st-train__d\">Interval Training</span><span class=\"st-train__k\">4.8 km</span><span class=\"st-train__t\">28 min</span></div>\n  <div class=\"st-train__r\"><span class=\"st-train__d\">Tempo Run</span><span class=\"st-train__k\">10 km</span><span class=\"st-train__t\">48 min</span></div>\n  <div class=\"st-train__r\"><span class=\"st-train__d\">Recovery</span><span class=\"st-train__k\">3 km</span><span class=\"st-train__t\">20 min</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 123,
    name: "Friend Compare",
    source: "dataviz-deep-part2.html",
    category: "section",
    css: ".st-friend{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);margin-top:24px}\n.st-friend__i{padding:24px;background:var(--card);text-align:center}\n.st-friend__n{font-size:13px;font-weight:600;margin-bottom:8px}\n.st-friend__v{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:600;letter-spacing:-.5px}\n.st-friend__l{font-size:10px;color:var(--text2);margin-top:4px}\n.st-friend__b{height:2px;width:40px;margin:8px auto 0;border-radius:1px}\n@media(max-width:900px){.st-friend{grid-template-columns:1fr}}",
    html: "<div class=\"st-friend\">\n  <div class=\"st-friend__i\"><div class=\"st-friend__n\">You</div><div class=\"st-friend__v\" style=\"color:var(--accent)\">42.6 km</div><div class=\"st-friend__l\">This week</div><div class=\"st-friend__b\" style=\"background:var(--accent)\"></div></div>\n  <div class=\"st-friend__i\"><div class=\"st-friend__n\">Sarah</div><div class=\"st-friend__v\" style=\"color:var(--accent2)\">38.2 km</div><div class=\"st-friend__l\">This week</div><div class=\"st-friend__b\" style=\"background:var(--accent2)\"></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 124,
    name: "NYT Upshot Cards",
    source: "dataviz-deep-part3.html",
    category: "section",
    css: ".ny-up{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:24px}\n.ny-up__i{padding:24px;border:1px solid var(--line);border-radius:6px;transition:all .2s}\n.ny-up__i:hover{background:var(--card2)}\n.ny-up__t{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:4px}\n.ny-up__h{font-size:16px;font-weight:600;margin-bottom:4px;letter-spacing:-.3px}\n.ny-up__p{font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px}\n.ny-up__n{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:600;letter-spacing:-1px}\n@media(max-width:900px){.ny-up{grid-template-columns:1fr}}",
    html: "<div class=\"ny-up\">\n  <div class=\"ny-up__i\"><div class=\"ny-up__t\">Rent vs Buy</div><div class=\"ny-up__h\">In 78% of US cities,<br>renting is cheaper</div><div class=\"ny-up__p\">The math has flipped. A decade ago, buying was cheaper in 62% of markets.</div><div class=\"ny-up__n\" style=\"color:var(--accent)\">78%</div></div>\n  <div class=\"ny-up__i\"><div class=\"ny-up__t\">Student Debt</div><div class=\"ny-up__h\">Borrowers aged 35-44<br>owe the most</div><div class=\"ny-up__p\">The oldest Millennials carry more student debt than any generation before them.</div><div class=\"ny-up__n\" style=\"color:var(--accent2)\">$2.1T</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 125,
    name: "Poll Tracker Circles",
    source: "dataviz-deep-part3.html",
    category: "hero",
    css: ".ny-poll{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}\n.ny-poll__i{padding:20px;text-align:center;background:var(--card2);border-radius:6px}\n.ny-poll__c{width:60px;height:60px;border-radius:50%;margin:0 auto 8px;display:flex;align-items:center;justify-content:center}\n.ny-poll__l{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3);margin-bottom:2px}\n.ny-poll__v{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:600}\n@media(max-width:900px){.ny-poll{grid-template-columns:1fr}}",
    html: "<div class=\"ny-poll\">\n  <div class=\"ny-poll__i\"><div class=\"ny-poll__c\" style=\"background:var(--accent);opacity:.2\"><span style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:var(--accent)\">48</span></div><div class=\"ny-poll__l\">Democrat</div><div class=\"ny-poll__v\" style=\"color:var(--accent)\">48%</div></div>\n  <div class=\"ny-poll__i\"><div class=\"ny-poll__c\" style=\"background:var(--accent4);opacity:.2\"><span style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:var(--accent4)\">45</span></div><div class=\"ny-poll__l\">Republican</div><div class=\"ny-poll__v\" style=\"color:var(--accent4)\">45%</div></div>\n  <div class=\"ny-poll__i\"><div class=\"ny-poll__c\" style=\"background:var(--text3);opacity:.2\"><span style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:var(--text3)\">7</span></div><div class=\"ny-poll__l\">Undecided</div><div class=\"ny-poll__v\">7%</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 126,
    name: "Mortgage Calculator",
    source: "dataviz-deep-part3.html",
    category: "detail",
    css: ".ny-calc{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:24px;align-items:center}\n.ny-calc__l{padding:24px;background:var(--card2);border-radius:8px}\n.ny-calc__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.ny-calc__i{display:flex;justify-content:space-between;padding:4px 0;font-size:12px}\n.ny-calc__r{text-align:center;padding:24px;border:1px solid var(--line);border-radius:8px}\n.ny-calc__n{font-family:'JetBrains Mono',monospace;font-size:36px;font-weight:600;letter-spacing:-1px}\n.ny-calc__d{font-size:12px;color:var(--text2);margin-top:4px}\n@media(max-width:900px){.ny-calc{grid-template-columns:1fr}}",
    html: "<div class=\"ny-calc\">\n  <div class=\"ny-calc__l\">\n    <div class=\"ny-calc__t\">Mortgage Calculator</div>\n    <div class=\"ny-calc__i\"><span>Home Price</span><span style=\"font-weight:600\">$450,000</span></div>\n    <div class=\"ny-calc__i\"><span>Down Payment</span><span style=\"font-weight:600\">$90,000</span></div>\n    <div class=\"ny-calc__i\"><span>Rate</span><span style=\"font-weight:600\">6.875%</span></div>\n    <div class=\"ny-calc__i\"><span>Term</span><span style=\"font-weight:600\">30 years</span></div>\n  </div>\n  <div class=\"ny-calc__r\">\n    <div class=\"ny-calc__n\" style=\"color:var(--accent)\">$2,958</div>\n    <div class=\"ny-calc__d\">Monthly payment</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 127,
    name: "F1 Tire Strategy",
    source: "dataviz-deep-part3.html",
    category: "section",
    css: ".f1-tire{display:flex;gap:8px;margin-top:24px;padding:24px;background:var(--card2);border-radius:8px;flex-wrap:wrap}\n.f1-tire__l{width:100%;font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.f1-tire__s{flex:1;padding:12px;border-radius:4px;text-align:center;min-width:80px}\n.f1-tire__n{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;color:#fff}\n.f1-tire__d{font-size:9px;color:rgba(255,255,255,.6);margin-top:2px}",
    html: "<div class=\"f1-tire\">\n  <div class=\"f1-tire__l\">Race Strategy · Monaco GP · 78 laps</div>\n  <div class=\"f1-tire__s\" style=\"background:var(--accent2)\"><div class=\"f1-tire__n\">Soft</div><div class=\"f1-tire__d\">Laps 1-24</div></div>\n  <div class=\"f1-tire__s\" style=\"background:var(--accent3)\"><div class=\"f1-tire__n\">Medium</div><div class=\"f1-tire__d\">Laps 25-52</div></div>\n  <div class=\"f1-tire__s\" style=\"background:var(--accent)\"><div class=\"f1-tire__n\">Hard</div><div class=\"f1-tire__d\">Laps 53-78</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 128,
    name: "F1 Sector Times",
    source: "dataviz-deep-part3.html",
    category: "detail",
    css: ".f1-sec{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:24px}\n.f1-sec__i{padding:20px;text-align:center}\n.f1-sec__l{font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3);margin-bottom:4px}\n.f1-sec__v{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:600;letter-spacing:-.5px}\n.f1-sec__d{font-size:9px;color:var(--text2);margin-top:2px}\n.f1-sec__b{height:2px;margin:8px auto 0;width:40px;border-radius:1px}\n@media(max-width:900px){.f1-sec{grid-template-columns:1fr}}",
    html: "<div class=\"f1-sec\">\n  <div class=\"f1-sec__i\"><div class=\"f1-sec__l\">Sector 1</div><div class=\"f1-sec__v\" style=\"color:var(--accent2)\">24.42s</div><div class=\"f1-sec__d\">+0.12s vs best</div><div class=\"f1-sec__b\" style=\"background:var(--accent2)\"></div></div>\n  <div class=\"f1-sec__i\"><div class=\"f1-sec__l\">Sector 2</div><div class=\"f1-sec__v\" style=\"color:var(--accent)\">36.18s</div><div class=\"f1-sec__d\">Personal best</div><div class=\"f1-sec__b\" style=\"background:var(--accent)\"></div></div>\n  <div class=\"f1-sec__i\"><div class=\"f1-sec__l\">Sector 3</div><div class=\"f1-sec__v\" style=\"color:var(--accent4)\">28.94s</div><div class=\"f1-sec__d\">+0.08s vs best</div><div class=\"f1-sec__b\" style=\"background:var(--accent4)\"></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 129,
    name: "F1 Weather Grid",
    source: "dataviz-deep-part3.html",
    category: "detail",
    css: ".f1-wx{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:24px}\n.f1-wx__i{padding:16px;text-align:center;background:var(--card2);border-radius:6px}\n.f1-wx__l{font-family:'JetBrains Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3)}\n.f1-wx__v{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;margin-top:4px}\n@media(max-width:900px){.f1-wx{grid-template-columns:repeat(2,1fr)}}",
    html: "<div class=\"f1-wx\">\n  <div class=\"f1-wx__i\"><div class=\"f1-wx__l\">Track</div><div class=\"f1-wx__v\" style=\"color:var(--accent2)\">32°C</div></div>\n  <div class=\"f1-wx__i\"><div class=\"f1-wx__l\">Air</div><div class=\"f1-wx__v\" style=\"color:var(--accent)\">26°C</div></div>\n  <div class=\"f1-wx__i\"><div class=\"f1-wx__l\">Humidity</div><div class=\"f1-wx__v\">58%</div></div>\n  <div class=\"f1-wx__i\"><div class=\"f1-wx__l\">Wind</div><div class=\"f1-wx__v\">12 km/h</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 130,
    name: "McKinsey 3x3 Matrix",
    source: "dataviz-deep-part3.html",
    category: "section",
    css: ".mc-3x3{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:24px}\n.mc-3x3__i{padding:24px 16px;text-align:center;transition:background .2s}\n.mc-3x3__i:hover{background:var(--card2)}\n.mc-3x3__n{font-size:13px;font-weight:600;margin-bottom:4px}\n.mc-3x3__d{font-size:10px;color:var(--text2);line-height:1.5}\n@media(max-width:900px){.mc-3x3{grid-template-columns:1fr}}",
    html: "<div class=\"mc-3x3\">\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\" style=\"color:var(--accent2)\">Cost Leader</div><div class=\"mc-3x3__d\">Scale advantage</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\" style=\"color:var(--accent)\">Differentiator</div><div class=\"mc-3x3__d\">Premium value</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\" style=\"color:var(--accent4)\">Niche Player</div><div class=\"mc-3x3__d\">Focused</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Challenger</div><div class=\"mc-3x3__d\">Growing share</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Market Leader</div><div class=\"mc-3x3__d\">Dominant</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Innovator</div><div class=\"mc-3x3__d\">First mover</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Laggard</div><div class=\"mc-3x3__d\">Catching up</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Incumbent</div><div class=\"mc-3x3__d\">Established</div></div>\n  <div class=\"mc-3x3__i\"><div class=\"mc-3x3__n\">Disruptor</div><div class=\"mc-3x3__d\">New model</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 131,
    name: "Capability Heatmap",
    source: "dataviz-deep-part3.html",
    category: "section",
    css: ".mc-heat{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:24px;max-width:300px}\n.mc-heat span{aspect-ratio:1;border-radius:3px;transition:opacity .2s}\n.mc-heat span:hover{opacity:.6}",
    html: "<div class=\"mc-heat\">\n  <span style=\"background:var(--accent2);opacity:.9\"></span><span style=\"background:var(--accent2);opacity:.6\"></span><span style=\"background:var(--accent2);opacity:.3\"></span><span style=\"background:var(--accent4);opacity:.7\"></span><span style=\"background:var(--accent4);opacity:.4\"></span>\n  <span style=\"background:var(--accent2);opacity:.4\"></span><span style=\"background:var(--accent);opacity:.8\"></span><span style=\"background:var(--accent);opacity:.5\"></span><span style=\"background:var(--accent4);opacity:.5\"></span><span style=\"background:var(--accent);opacity:.2\"></span>\n  <span style=\"background:var(--accent3);opacity:.6\"></span><span style=\"background:var(--accent2);opacity:.7\"></span><span style=\"background:var(--accent);opacity:.9\"></span><span style=\"background:var(--accent4);opacity:.8\"></span><span style=\"background:var(--accent4);opacity:.3\"></span>\n  <span style=\"background:var(--accent3);opacity:.3\"></span><span style=\"background:var(--accent);opacity:.6\"></span><span style=\"background:var(--accent);opacity:.4\"></span><span style=\"background:var(--accent4);opacity:.9\"></span><span style=\"background:var(--accent2);opacity:.5\"></span>\n  <span style=\"background:var(--accent3);opacity:.8\"></span><span style=\"background:var(--accent2);opacity:.4\"></span><span style=\"background:var(--accent4);opacity:.6\"></span><span style=\"background:var(--accent3);opacity:.5\"></span><span style=\"background:var(--accent);opacity:.7\"></span>\n</div>",
    hasJS: false
  },
  {
    id: 132,
    name: "S-Curve (SVG)",
    source: "dataviz-deep-part3.html",
    category: "detail",
    css: ".mc-s{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:24px}\n.mc-s__g{width:100%;height:120px;position:relative}\n.mc-s__g svg{width:100%;height:100%}\n.mc-s__g path{fill:none;stroke-width:2;stroke-linecap:round}\n.mc-s__r{padding:20px;background:var(--card2);border-radius:8px}\n.mc-s__t{font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:8px}\n.mc-s__i{display:flex;justify-content:space-between;padding:4px 0;font-size:12px}\n@media(max-width:900px){.mc-s{grid-template-columns:1fr}}",
    html: "<div class=\"mc-s\">\n  <div class=\"mc-s__g\">\n    <svg viewBox=\"0 0 300 120\" preserveAspectRatio=\"none\">\n      <path d=\"M0 100 Q50 95 100 85 T200 60 T250 30 T300 15\" stroke=\"var(--accent)\" stroke-width=\"2\"/>\n      <path d=\"M0 100 Q50 95 100 85 T200 60 T250 30 T300 15\" stroke=\"rgba(229,91,43,.06)\" stroke-width=\"20\" fill=\"none\" stroke-linecap=\"round\"/>\n    </svg>\n  </div>\n  <div class=\"mc-s__r\">\n    <div class=\"mc-s__t\">Technology Adoption Phases</div>\n    <div class=\"mc-s__i\"><span>Innovators</span><span style=\"font-weight:600\">2.5%</span></div>\n    <div class=\"mc-s__i\"><span>Early Adopters</span><span style=\"font-weight:600\">13.5%</span></div>\n    <div class=\"mc-s__i\"><span>Early Majority</span><span style=\"font-weight:600\">34%</span></div>\n    <div class=\"mc-s__i\"><span>Late Majority</span><span style=\"font-weight:600\">34%</span></div>\n    <div class=\"mc-s__i\"><span>Laggards</span><span style=\"font-weight:600\">16%</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 133,
    name: "Data Philosophy Hero (dark)",
    source: "iconic-data-viz.html",
    category: "hero",
    css: ".dp-hero{min-height:100vh;background:var(--pk);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:120px;position:relative;overflow:hidden}\n.dp-hero__g{position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}\n.dp-hero__in{position:relative;z-index:2;max-width:800px}\n.dp-hero__tag{font-family:var(--fm);font-size:11px;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.12);margin-bottom:var(--s8)}\n.dp-hero__h{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:300;line-height:1.02;letter-spacing:-2px;color:#fff;margin-bottom:var(--s6)}\n.dp-hero__h strong{font-weight:700;color:var(--olive)}\n.dp-hero__sub{font-size:var(--xl);color:rgba(255,255,255,.2);line-height:1.7;max-width:480px;margin-bottom:var(--s12)}\n.dp-hero__pr{display:flex;gap:var(--s4);font-family:var(--fm);font-size:var(--sm);color:rgba(255,255,255,.12)}\n.dp-hero__pr span{padding:var(--s1) var(--s3);border:1px solid rgba(255,255,255,.06);border-radius:var(--r4);letter-spacing:.04em}\n@media(max-width:768px){.dp-hero{padding:40px 24px}.dp-hero__h{font-size:clamp(2rem,8vw,2.5rem)}.dp-hero__pr{flex-wrap:wrap;gap:var(--s2)}}",
    html: "<section class=\"dp-hero\">\n  <div class=\"dp-hero__g\"></div>\n  <div class=\"dp-hero__in\">\n    <div class=\"dp-hero__tag\">Iconic Data Visualization · Progressive Disclosure</div>\n    <h1 class=\"dp-hero__h\">Data is not a tool.<br>It is <strong>identity.</strong></h1>\n    <p class=\"dp-hero__sub\">Ericsson's design philosophy: every data point carries the brand. Information revealed in layers — from iconic overview to microscopic detail.</p>\n    <div class=\"dp-hero__pr\"><span>Radial Pulse</span><span>Cascade Flow</span><span>Spectrum Band</span><span>Cluster Grid</span><span>Stack Layer</span></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 134,
    name: "Radial Pulse (SVG + dark)",
    source: "iconic-data-viz.html",
    category: "hero",
    css: ".f1-dk{background:var(--pk);color:#fff}\n.rp-hero{position:relative;min-height:50vh;display:flex;align-items:center;justify-content:center}\n.rp-hero__svg{width:280px;height:280px}\n.rp-hero__svg circle{fill:none;stroke-width:1;transform:rotate(-90deg);transform-origin:50% 50%}\n.rp-hero__svg .h{stroke:rgba(255,255,255,.03)}.rp-hero__svg .m{stroke:rgba(255,255,255,.06);stroke-width:.5}\n.rp-hero__svg .d{stroke:var(--olive);stroke-width:2;stroke-dasharray:4 8;animation:rpd 4s linear infinite}\n@keyframes rpd{to{transform:rotate(270deg)}}\n.rp-hero__svg .c1{stroke:var(--olive);stroke-width:3;stroke-dasharray:502;stroke-dashoffset:100;stroke-linecap:round}\n.rp-hero__svg .c2{stroke:var(--earth);stroke-width:2;stroke-dasharray:377;stroke-dashoffset:150;stroke-linecap:round}\n.rp-hero__svg .c3{stroke:var(--glacier);stroke-width:1.5;stroke-dasharray:251;stroke-dashoffset:80;stroke-linecap:round}\n.rp-hero__v{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}\n.rp-hero__n{font-family:var(--fm);font-size:var(--5xl);font-weight:600;line-height:1;color:#fff;letter-spacing:-3px}\n.rp-hero__l{font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.2);letter-spacing:.1em;text-transform:uppercase}\n.rp-sec{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s12);padding-top:var(--s8);border-top:1px solid rgba(255,255,255,.06)}\n.rp-s{text-align:center}\n.rp-s__n{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;color:#fff;letter-spacing:-.03em;margin-bottom:var(--s1)}\n.rp-s__l{font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.2);letter-spacing:.08em;text-transform:uppercase;margin-bottom:var(--s4)}\n.rp-s__b{height:2px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden}\n.rp-s__f{height:100%}\n.rp-det{display:flex;gap:var(--s8)}\n.rp-d{border-top:1px solid rgba(255,255,255,.06);padding-top:var(--s4)}\n.rp-d__v{font-family:var(--fm);font-size:var(--lg);font-weight:600;color:#fff}\n.rp-d__l{font-size:var(--sm);color:rgba(255,255,255,.2)}\n@media(max-width:1024px){.rp-sec{grid-template-columns:1fr}}\n@media(max-width:768px){.rp-hero__svg{width:200px;height:200px}.rp-hero__n{font-size:var(--4xl)}}",
    html: "<div class=\"rp-hero\">\n  <svg class=\"rp-hero__svg\" viewBox=\"0 0 280 280\">\n    <circle class=\"h\" cx=\"140\" cy=\"140\" r=\"130\"/><circle class=\"m\" cx=\"140\" cy=\"140\" r=\"110\"/><circle class=\"m\" cx=\"140\" cy=\"140\" r=\"90\"/><circle class=\"m\" cx=\"140\" cy=\"140\" r=\"70\"/><circle class=\"m\" cx=\"140\" cy=\"140\" r=\"50\"/><circle class=\"m\" cx=\"140\" cy=\"140\" r=\"30\"/>\n    <circle class=\"d\" cx=\"140\" cy=\"140\" r=\"120\"/>\n    <circle class=\"c1\" cx=\"140\" cy=\"140\" r=\"80\" stroke-dasharray=\"502\" stroke-dashoffset=\"100\"/>\n    <circle class=\"c2\" cx=\"140\" cy=\"140\" r=\"60\" stroke-dasharray=\"377\" stroke-dashoffset=\"150\"/>\n    <circle class=\"c3\" cx=\"140\" cy=\"140\" r=\"40\" stroke-dasharray=\"251\" stroke-dashoffset=\"80\"/>\n  </svg>\n  <div class=\"rp-hero__v\"><div class=\"rp-hero__n\">4.6B</div><div class=\"rp-hero__l\">Connected Devices</div></div>\n</div>\n<div class=\"rp-sec\">\n  <div class=\"rp-s\"><div class=\"rp-s__n\">99.97%</div><div class=\"rp-s__l\">Uptime</div><div class=\"rp-s__b\"><div class=\"rp-s__f\" style=\"width:99.97%;background:var(--olive)\"></div></div></div>\n  <div class=\"rp-s\"><div class=\"rp-s__n\">1.2ms</div><div class=\"rp-s__l\">Latency</div><div class=\"rp-s__b\"><div class=\"rp-s__f\" style=\"width:85%;background:var(--earth)\"></div></div></div>\n  <div class=\"rp-s\"><div class=\"rp-s__n\">240</div><div class=\"rp-s__l\">Countries</div><div class=\"rp-s__b\"><div class=\"rp-s__f\" style=\"width:92%;background:var(--glacier)\"></div></div></div>\n</div>\n<div class=\"rp-det\">\n  <div class=\"rp-d\"><div class=\"rp-d__v\">328M</div><div class=\"rp-d__l\">5G Subscribers</div></div>\n  <div class=\"rp-d\"><div class=\"rp-d__v\">1.2B</div><div class=\"rp-d__l\">IoT Devices</div></div>\n  <div class=\"rp-d\"><div class=\"rp-d__v\">74%</div><div class=\"rp-d__l\">Coverage</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 135,
    name: "Pulse Texture (decorative SVG)",
    source: "iconic-data-viz.html",
    category: "decorative",
    css: "",
    html: "<svg width=\"100%\" height=\"8\" style=\"opacity:.3\"><circle cx=\"4\" cy=\"4\" r=\"2\" fill=\"var(--olive)\"/><circle cx=\"16\" cy=\"4\" r=\"2\" fill=\"var(--earth)\"/><circle cx=\"28\" cy=\"4\" r=\"2\" fill=\"var(--glacier)\"/><circle cx=\"40\" cy=\"4\" r=\"2\" fill=\"var(--bd)\"/><circle cx=\"52\" cy=\"4\" r=\"2\" fill=\"var(--tda)\"/><circle cx=\"64\" cy=\"4\" r=\"2\" fill=\"var(--olive)\"/><circle cx=\"76\" cy=\"4\" r=\"2\" fill=\"var(--earth)\"/><circle cx=\"88\" cy=\"4\" r=\"2\" fill=\"var(--glacier)\"/><circle cx=\"100\" cy=\"4\" r=\"2\" fill=\"var(--bd)\"/><circle cx=\"112\" cy=\"4\" r=\"2\" fill=\"var(--tda)\"/></svg>",
    hasJS: false
  },
  {
    id: 136,
    name: "Cascade Flow (interactive hover)",
    source: "iconic-data-viz.html",
    category: "section",
    css: ".cf-sec{display:flex;flex-direction:column;gap:2px;margin-top:var(--s8)}\n.cf-l{display:grid;grid-template-columns:60px 1fr 100px;gap:var(--s6);align-items:center;padding:var(--s6) var(--s8);background:var(--sr);border-radius:var(--r4);transition:all .2s}\n.cf-l:hover{background:var(--pk);color:#fff}\n.cf-l__n{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;color:var(--td);opacity:.08;letter-spacing:-2px}\n.cf-l:hover .cf-l__n{color:rgba(255,255,255,.15);opacity:1}\n.cf-l__h{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);letter-spacing:.02em}\n.cf-l:hover .cf-l__h{color:#fff}\n.cf-l__v{font-family:var(--fm);font-size:var(--lg);font-weight:600;color:var(--olive);text-align:right}\n.cf-l:hover .cf-l__v{color:var(--org)}\n.cf-l__d{font-size:var(--sm);color:var(--ts);grid-column:2;margin-top:-4px}\n.cf-l:hover .cf-l__d{color:rgba(255,255,255,.3)}\n.cf-l__b{height:2px;background:var(--bd);border-radius:1px;grid-column:2;overflow:hidden}\n.cf-l:hover .cf-l__b{background:rgba(255,255,255,.1)}\n.cf-l__f{height:100%;background:var(--olive);transition:width .3s var(--eo)}\n.cf-l:hover .cf-l__f{background:var(--org)}\n.cf-det{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s4)}\n.cf-d{padding:var(--s4) 0}\n.cf-d__v{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--td)}\n.cf-d__l{font-size:var(--xs);color:var(--ts)}\n@media(max-width:1024px){.cf-l{grid-template-columns:40px 1fr 80px}.cf-det{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.cf-l{grid-template-columns:1fr;gap:var(--s2);padding:var(--s4)}}",
    html: "<div class=\"cf-sec\">\n  <div class=\"cf-l\"><span class=\"cf-l__n\">01</span><div><div class=\"cf-l__h\">Network Layer</div><div class=\"cf-l__d\">Core infrastructure · 12,416 nodes</div><div class=\"cf-l__b\"><div class=\"cf-l__f\" style=\"width:100%\"></div></div></div><span class=\"cf-l__v\">4.6B</span></div>\n  <div class=\"cf-l\"><span class=\"cf-l__n\">02</span><div><div class=\"cf-l__h\">Edge Layer</div><div class=\"cf-l__d\">Distributed computing · 2,847 edge sites</div><div class=\"cf-l__b\"><div class=\"cf-l__f\" style=\"width:68%\"></div></div></div><span class=\"cf-l__v\">3.1B</span></div>\n  <div class=\"cf-l\"><span class=\"cf-l__n\">03</span><div><div class=\"cf-l__h\">Application Layer</div><div class=\"cf-l__d\">Service delivery · 1,240 applications</div><div class=\"cf-l__b\"><div class=\"cf-l__f\" style=\"width:45%\"></div></div></div><span class=\"cf-l__v\">1.8B</span></div>\n  <div class=\"cf-l\"><span class=\"cf-l__n\">04</span><div><div class=\"cf-l__h\">Endpoint Layer</div><div class=\"cf-l__d\">User devices · 8.2B registered</div><div class=\"cf-l__b\"><div class=\"cf-l__f\" style=\"width:82%\"></div></div></div><span class=\"cf-l__v\">8.2B</span></div>\n</div>\n<div class=\"cf-det\">\n  <div class=\"cf-d\"><div class=\"cf-d__v\">12,416</div><div class=\"cf-d__l\">Core Nodes</div></div>\n  <div class=\"cf-d\"><div class=\"cf-d__v\">2,847</div><div class=\"cf-d__l\">Edge Sites</div></div>\n  <div class=\"cf-d\"><div class=\"cf-d__v\">1,240</div><div class=\"cf-d__l\">Applications</div></div>\n  <div class=\"cf-d\"><div class=\"cf-d__v\">8.2B</div><div class=\"cf-d__l\">Endpoints</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 137,
    name: "Flow Markers (decorative)",
    source: "iconic-data-viz.html",
    category: "decorative",
    css: "",
    html: "<div style=\"display:flex;gap:var(--s2);height:12px;align-items:flex-end\">\n  <span style=\"width:4px;height:4px;border-radius:50%;background:var(--olive)\"></span>\n  <span style=\"width:4px;height:8px;border-radius:2px;background:var(--earth)\"></span>\n  <span style=\"width:4px;height:12px;border-radius:2px;background:var(--glacier)\"></span>\n  <span style=\"width:4px;height:6px;border-radius:2px;background:var(--olive)\"></span>\n  <span style=\"width:4px;height:10px;border-radius:2px;background:var(--earth)\"></span>\n  <span style=\"width:4px;height:4px;border-radius:50%;background:var(--glacier)\"></span>\n</div>",
    hasJS: false
  },
  {
    id: 138,
    name: "Spectrum Band (dark)",
    source: "iconic-data-viz.html",
    category: "hero",
    css: ".f3-dk{background:var(--pk);color:#fff}\n.sb-hero{height:60px;width:100%;display:flex;border-radius:var(--r4);overflow:hidden;margin-top:var(--s8)}\n.sb-hero__s{flex:1;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:var(--sm);color:rgba(255,255,255,.6);letter-spacing:.06em;text-transform:uppercase;position:relative}\n.sb-hero__s--1{background:var(--olive)}.sb-hero__s--2{background:#5A7A4A}.sb-hero__s--3{background:#6B8A5B}.sb-hero__s--4{background:#7A9A6A}.sb-hero__s--5{background:#8AAA7A}\n.sb-sec{display:grid;grid-template-columns:repeat(5,1fr);gap:var(--s4);margin-top:var(--s8)}\n.sb-s{text-align:center}\n.sb-s__v{font-family:var(--fm);font-size:var(--2xl);font-weight:600;color:#fff;letter-spacing:-.5px}\n.sb-s__l{font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.2);letter-spacing:.06em;text-transform:uppercase;margin-top:var(--s1)}\n.sb-det{display:grid;grid-template-columns:repeat(5,1fr);gap:var(--s4)}\n.sb-d{font-size:var(--sm);color:rgba(255,255,255,.3);text-align:center;line-height:1.5}\n@media(max-width:1024px){.sb-sec{grid-template-columns:repeat(3,1fr)}}\n@media(max-width:768px){.sb-sec{grid-template-columns:repeat(2,1fr)}}",
    html: "<div class=\"sb-hero\">\n  <div class=\"sb-hero__s sb-hero__s--1\">700MHz</div>\n  <div class=\"sb-hero__s sb-hero__s--2\">2.6GHz</div>\n  <div class=\"sb-hero__s sb-hero__s--3\">3.5GHz</div>\n  <div class=\"sb-hero__s sb-hero__s--4\">28GHz</div>\n  <div class=\"sb-hero__s sb-hero__s--5\">39GHz</div>\n</div>\n<div class=\"sb-sec\">\n  <div class=\"sb-s\"><div class=\"sb-s__v\">700</div><div class=\"sb-s__l\">MHz</div></div>\n  <div class=\"sb-s\"><div class=\"sb-s__v\">2.6</div><div class=\"sb-s__l\">GHz</div></div>\n  <div class=\"sb-s\"><div class=\"sb-s__v\">3.5</div><div class=\"sb-s__l\">GHz</div></div>\n  <div class=\"sb-s\"><div class=\"sb-s__v\">28</div><div class=\"sb-s__l\">GHz</div></div>\n  <div class=\"sb-s\"><div class=\"sb-s__v\">39</div><div class=\"sb-s__l\">GHz</div></div>\n</div>\n<div class=\"sb-det\">\n  <div class=\"sb-d\">Coverage<br>Wide</div>\n  <div class=\"sb-d\">Speed<br>Medium</div>\n  <div class=\"sb-d\">Capacity<br>High</div>\n  <div class=\"sb-d\">Speed<br>Ultra</div>\n  <div class=\"sb-d\">Capacity<br>Extreme</div>\n</div>",
    hasJS: false
  },
  {
    id: 139,
    name: "Cluster Grid 12x12",
    source: "iconic-data-viz.html",
    category: "hero",
    css: ".cg-hero{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-top:var(--s8)}\n.cg-hero span{aspect-ratio:1;border-radius:2px;background:var(--sr);transition:all .2s}\n.cg-hero .a{background:var(--olive)}.cg-hero .b{background:var(--earth)}.cg-hero .c{background:var(--glacier)}\n.cg-hero .h{background:var(--org)}\n.cg-sec{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s8);margin-top:var(--s8)}\n.cg-s{display:flex;gap:var(--s4);align-items:center}\n.cg-s__d{width:20px;height:20px;border-radius:var(--r4);flex-shrink:0}\n.cg-s__v{font-family:var(--fm);font-size:var(--lg);font-weight:600;color:var(--td)}\n.cg-s__l{font-size:var(--sm);color:var(--ts)}\n@media(max-width:1024px){.cg-hero{grid-template-columns:repeat(6,1fr)}.cg-sec{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:768px){.cg-hero{grid-template-columns:repeat(4,1fr)}.cg-sec{grid-template-columns:1fr}}",
    html: "<div class=\"cg-hero\" style=\"max-width:480px\">\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span class=\"c\"></span>\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span class=\"c\"></span>\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span class=\"c\"></span>\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span class=\"c\"></span>\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span class=\"c\"></span>\n  <span></span><span></span><span></span><span></span><span></span><span class=\"h\"></span><span class=\"h\"></span><span></span><span></span><span></span><span></span><span></span>\n  <span></span><span></span><span></span><span></span><span></span><span class=\"h\"></span><span class=\"h\"></span><span></span><span></span><span></span><span></span><span></span>\n  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span></span><span></span><span></span>\n  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class=\"c\"></span><span class=\"c\"></span><span></span><span></span><span></span>\n  <span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class=\"a\"></span><span class=\"a\"></span><span></span>\n  <span class=\"b\"></span><span class=\"b\"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class=\"a\"></span><span class=\"a\"></span><span></span>\n  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class=\"a\"></span>\n</div>\n<div class=\"cg-sec\">\n  <div class=\"cg-s\"><div class=\"cg-s__d\" style=\"background:var(--olive)\"></div><div><div class=\"cg-s__v\">12.4K</div><div class=\"cg-s__l\">Active Nodes</div></div></div>\n  <div class=\"cg-s\"><div class=\"cg-s__d\" style=\"background:var(--earth)\"></div><div><div class=\"cg-s__v\">8.2K</div><div class=\"cg-s__l\">Edge Nodes</div></div></div>\n  <div class=\"cg-s\"><div class=\"cg-s__d\" style=\"background:var(--glacier)\"></div><div><div class=\"cg-s__v\">4.1K</div><div class=\"cg-s__l\">Core Clusters</div></div></div>\n  <div class=\"cg-s\"><div class=\"cg-s__d\" style=\"background:var(--org)\"></div><div><div class=\"cg-s__v\">247</div><div class=\"cg-s__l\">Incidents</div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 140,
    name: "Density Texture (decorative)",
    source: "iconic-data-viz.html",
    category: "decorative",
    css: ".cg-det{display:flex;flex-wrap:wrap;gap:var(--s2)}\n.cg-det span{width:12px;height:12px;border-radius:2px;background:var(--bd)}\n.cg-det .a{background:var(--olive)}.cg-det .b{background:var(--earth)}.cg-det .c{background:var(--glacier)}.cg-det .h{background:var(--org)}",
    html: "<div class=\"cg-det\">\n  <span class=\"a\"></span><span class=\"a\"></span><span class=\"b\"></span><span class=\"b\"></span><span></span><span></span>\n  <span class=\"c\"></span><span class=\"c\"></span><span></span><span class=\"h\"></span><span></span><span></span>\n  <span></span><span class=\"b\"></span><span class=\"a\"></span><span></span><span class=\"c\"></span><span></span>\n</div>",
    hasJS: false
  },
  {
    id: 141,
    name: "Stack Layer Protocol (dark)",
    source: "iconic-data-viz.html",
    category: "hero",
    css: ".f5-dk{background:var(--pk);color:#fff}\n.sl-hero{display:flex;flex-direction:column;gap:3px;margin-top:var(--s8)}\n.sl-hero__l{display:grid;grid-template-columns:80px 1fr 80px;gap:var(--s6);align-items:center;padding:var(--s4) var(--s6);border-radius:var(--r4);transition:all .2s}\n.sl-hero__l:hover{background:rgba(255,255,255,.04)}\n.sl-hero__n{font-family:var(--fm);font-size:var(--sm);color:rgba(255,255,255,.2)}\n.sl-hero__h{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:#fff;letter-spacing:.02em}\n.sl-hero__v{font-family:var(--fm);font-size:var(--base);font-weight:600;color:var(--olive);text-align:right}\n.sl-hero__b{height:3px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden;grid-column:2}\n.sl-hero__f{height:100%;border-radius:2px;transition:width .5s var(--eo)}\n.sl-sec{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s6);margin-top:var(--s8);padding-top:var(--s8);border-top:1px solid rgba(255,255,255,.06)}\n.sl-s{text-align:center}\n.sl-s__v{font-family:var(--fm);font-size:var(--3xl);font-weight:600;line-height:1;color:#fff;letter-spacing:-1px}\n.sl-s__l{font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.2);letter-spacing:.06em;text-transform:uppercase;margin-top:var(--s1)}\n.sl-det{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s4)}\n.sl-d{text-align:center}\n.sl-d__v{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:rgba(255,255,255,.6)}\n.sl-d__l{font-size:var(--xs);color:rgba(255,255,255,.15);margin-top:2px}\n@media(max-width:1024px){.sl-sec,.sl-det{grid-template-columns:repeat(2,1fr)}}",
    html: "<div class=\"sl-hero\">\n  <div class=\"sl-hero__l\"><span class=\"sl-hero__n\">L07</span><div><div class=\"sl-hero__h\">Application</div><div class=\"sl-hero__b\"><div class=\"sl-hero__f\" style=\"width:100%;background:var(--olive)\"></div></div></div><span class=\"sl-hero__v\">4.6B</span></div>\n  <div class=\"sl-hero__l\"><span class=\"sl-hero__n\">L06</span><div><div class=\"sl-hero__h\">Orchestration</div><div class=\"sl-hero__b\"><div class=\"sl-hero__f\" style=\"width:82%;background:var(--earth)\"></div></div></div><span class=\"sl-hero__v\">3.8B</span></div>\n  <div class=\"sl-hero__l\"><span class=\"sl-hero__n\">L05</span><div><div class=\"sl-hero__h\">Data Platform</div><div class=\"sl-hero__b\"><div class=\"sl-hero__f\" style=\"width:68%;background:var(--glacier)\"></div></div></div><span class=\"sl-hero__v\">1.2B</span></div>\n  <div class=\"sl-hero__l\"><span class=\"sl-hero__n\">L04</span><div><div class=\"sl-hero__h\">Security</div><div class=\"sl-hero__b\"><div class=\"sl-hero__f\" style=\"width:92%;background:var(--olive)\"></div></div></div><span class=\"sl-hero__v\">100%</span></div>\n  <div class=\"sl-hero__l\"><span class=\"sl-hero__n\">L03</span><div><div class=\"sl-hero__h\">Network</div><div class=\"sl-hero__b\"><div class=\"sl-hero__f\" style=\"width:96%;background:var(--earth)\"></div></div></div><span class=\"sl-hero__v\">99.97%</span></div>\n</div>\n<div class=\"sl-sec\">\n  <div class=\"sl-s\"><div class=\"sl-s__v\">100%</div><div class=\"sl-s__l\">Orchestration</div></div>\n  <div class=\"sl-s\"><div class=\"sl-s__v\">99.97</div><div class=\"sl-s__l\">Network</div></div>\n  <div class=\"sl-s\"><div class=\"sl-s__v\">240</div><div class=\"sl-s__l\">Countries</div></div>\n  <div class=\"sl-s\"><div class=\"sl-s__v\">4.6B</div><div class=\"sl-s__l\">Connected</div></div>\n</div>\n<div class=\"sl-det\">\n  <div class=\"sl-d\"><div class=\"sl-d__v\">12,416</div><div class=\"sl-d__l\">Nodes</div></div>\n  <div class=\"sl-d\"><div class=\"sl-d__v\">2,847</div><div class=\"sl-d__l\">Sites</div></div>\n  <div class=\"sl-d\"><div class=\"sl-d__v\">1,240</div><div class=\"sl-d__l\">Apps</div></div>\n  <div class=\"sl-d\"><div class=\"sl-d__v\">8.2B</div><div class=\"sl-d__l\">Endpoints</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 142,
    name: "Layer Divider (decorative)",
    source: "iconic-data-viz.html",
    category: "decorative",
    css: "",
    html: "<div style=\"display:flex;gap:3px;height:6px\">\n  <span style=\"flex:1;background:var(--olive);border-radius:2px\"></span>\n  <span style=\"flex:2;background:var(--earth);border-radius:2px\"></span>\n  <span style=\"flex:3;background:var(--glacier);border-radius:2px\"></span>\n  <span style=\"flex:4;background:var(--olive);border-radius:2px\"></span>\n  <span style=\"flex:5;background:var(--earth);border-radius:2px\"></span>\n</div>",
    hasJS: false
  },
  {
    id: 143,
    name: "Hero Section (diagonal clip)",
    source: "数据讲故事视觉设计实战手册.html",
    category: "hero",
    css: ".hero{\n  min-height:100vh;display:flex;flex-direction:column;justify-content:center;\n  padding:80px 120px;position:relative;overflow:hidden;\n}\n.hero::before{\n  content:'';position:absolute;top:0;right:0;\n  width:40%;height:100%;\n  background:linear-gradient(135deg,var(--scene-glacier) 0%,#1A2A36 100%);\n  clip-path:polygon(30% 0,100% 0,100% 100%,0% 100%);\n}\n.hero-content{position:relative;z-index:2;max-width:600px;}\n.hero-tag{\n  font-family:var(--font-mono);font-size:11px;letter-spacing:4px;text-transform:uppercase;\n  color:var(--text-secondary);margin-bottom:40px;\n  position:relative;padding-top:12px;\n}\n.hero-tag::before{\n  content:'';position:absolute;top:0;left:0;\n  width:40px;height:3px;background:var(--scene-glacier);\n}\n.hero h1{\n  font-family:var(--font-display);font-size:72px;font-weight:300;\n  line-height:1.05;letter-spacing:-2px;margin-bottom:40px;color:var(--text-display);\n}\n.hero h1 strong{font-weight:600;}\n.hero-desc{\n  font-size:18px;line-height:1.7;color:var(--text-secondary);max-width:440px;\n}\n.hero-year{\n  position:absolute;right:120px;bottom:80px;\n  font-family:var(--font-display);font-size:180px;font-weight:200;\n  color:rgba(255,255,255,0.08);line-height:1;letter-spacing:-8px;z-index:1;\n  pointer-events:none;user-select:none;\n}\n@media(max-width:1024px){.hero{padding-left:40px;padding-right:40px;}.hero h1{font-size:48px;}}\n@media(max-width:768px){.hero{padding-left:24px;padding-right:24px;min-height:80vh;}.hero h1{font-size:36px;}.hero::before{display:none;}.hero-year{display:none;}}",
    html: "<section class=\"hero\">\n  <div class=\"hero-content\">\n    <div class=\"hero-tag\">Mino · 方法论文档</div>\n    <h1>数据讲故事<br><strong>视觉设计实战手册</strong></h1>\n    <p class=\"hero-desc\">基于 Cole Nussbaumer Knaflic《Storytelling with Data》30 个技能卡的系统化整合。图表选择·视觉降噪·叙事结构·流程迭代。</p>\n  </div>\n  <div class=\"hero-year\">DS</div>\n</section>",
    hasJS: false
  },
  {
    id: 144,
    name: "Seam Divider",
    source: "数据讲故事视觉设计实战手册.html",
    category: "decorative",
    css: ".seam-divider{\n  height:1px;background:var(--border-visible);\n  mask-image:linear-gradient(to right,transparent 0%,black 20%,black 80%,transparent 100%);\n  -webkit-mask-image:linear-gradient(to right,transparent 0%,black 20%,black 80%,transparent 100%);\n}",
    html: "<div class=\"seam-divider\"></div>",
    hasJS: false
  },
  {
    id: 145,
    name: "Data Table (chart selection)",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".table-wrap{overflow-x:auto;margin:32px 0;border:1px solid var(--border);}\n.table-wrap table{width:100%;border-collapse:collapse;font-size:14px;}\n.table-wrap th{\n  font-family:var(--font-mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;\n  color:var(--text-secondary);background:var(--surface-raised);\n  padding:14px 16px;text-align:left;border-bottom:1px solid var(--border);\n}\n.table-wrap td{\n  padding:14px 16px;border-bottom:1px solid var(--border);color:var(--text-primary);font-size:13px;\n}\n.table-wrap tr:last-child td{border-bottom:none;}\n.table-wrap tr:hover td{background:var(--surface-raised);}",
    html: "<div class=\"table-wrap\">\n  <table>\n    <thead>\n      <tr><th>功能目标</th><th>推荐图表</th><th>关键提醒</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>时间趋势</td><td>折线图</td><td>核心趋势线用强调色，辅助线用灰色</td></tr>\n      <tr><td>分类对比</td><td>条形图（水平优先）</td><td>共享基线，排序体现故事逻辑</td></tr>\n      <tr><td>相关性</td><td>散点图 / 气泡图</td><td>气泡半透明，关键标注</td></tr>\n      <tr><td>一两个关键数字</td><td style=\"font-weight:600;\">大字，不是图</td><td>直接呈现，不要图表化</td></tr>\n      <tr><td>部分与整体</td><td>堆积条形图</td><td>避免饼图，除非类别极少</td></tr>\n      <tr><td>结构 + 规模</td><td>Marimekko 图</td><td>宽=市场规模，高=细分份额</td></tr>\n      <tr><td>定性评估</td><td>Harvey Balls 对比矩阵</td><td>实心/空心圆点替代文字</td></tr>\n    </tbody>\n  </table>\n</div>",
    hasJS: false
  },
  {
    id: 146,
    name: "Compare Grid (Do/Dont)",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:32px 0;}\n.compare-col{border:1px solid var(--border-visible);padding:24px;}\n.compare-header{\n  display:flex;align-items:center;gap:8px;margin-bottom:20px;\n  padding-bottom:16px;border-bottom:1px solid var(--border);\n}\n.compare-marker{font-size:20px;line-height:1;}\n.compare-title{\n  font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;color:var(--text-secondary);\n}\n.compare-row{\n  display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);\n}\n.compare-row:last-child{border-bottom:none;}\n.compare-row .ct{font-size:14px;color:var(--text-primary);line-height:1.5;}\n.compare-row .ct strong{font-weight:600;}\n.compare-col--do .compare-marker,.compare-col--do .compare-icon{color:var(--scene-glacier);}\n.compare-col--dont .compare-marker,.compare-col--dont .compare-icon{color:var(--accent-orange);}\n@media(max-width:1024px){.compare-grid{grid-template-columns:1fr;}}",
    html: "<div class=\"compare-grid\">\n  <div class=\"compare-col compare-col--dont\">\n    <div class=\"compare-header\">\n      <span class=\"compare-marker\">&times;</span>\n      <span class=\"compare-title\">禁止</span>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>饼图 / 环形图</strong> — 人类视觉无法准确比较角度和弧长</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>次级 Y 轴</strong> — 迫使观众判断数据对应哪个轴</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>3D 效果</strong> — 扭曲视觉感知，增加装饰噪音</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>截断坐标轴</strong> — 柱状图非零基线 = 视觉欺骗</span></div>\n    </div>\n  </div>\n  <div class=\"compare-col compare-col--do\">\n    <div class=\"compare-header\">\n      <span class=\"compare-marker\">&middot;</span>\n      <span class=\"compare-title\">推荐替代</span>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>排序水平条形图</strong> — 脚注标注总计=100%</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>直接标注 / 拆分对齐图</strong> — 去掉次级轴</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>二维平面</strong> — 3D 永不用，唯一例外：科学曲面图</span></div>\n    </div>\n    <div class=\"compare-row\">\n      <div><span class=\"ct\"><strong>零基线 + 数据标签</strong> — 可以去掉轴但必须从 0 开始</span></div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 147,
    name: "Callout",
    source: "数据讲故事视觉设计实战手册.html",
    category: "detail",
    css: ".callout{\n  border-left:3px solid var(--scene-glacier);background:var(--surface-raised);\n  padding:20px 24px;margin:32px 0;\n}\n.callout__title{\n  font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;\n  color:var(--scene-glacier);margin-bottom:6px;\n}\n.callout__body{font-size:14px;color:var(--text-secondary);line-height:1.7;}\n.callout--warning{border-left-color:var(--accent-orange);}\n.callout--warning .callout__title{color:var(--accent-orange);}",
    html: "<div class=\"callout\">\n  <div class=\"callout__title\">饼图的极端例外</div>\n  <div class=\"callout__body\">仅 2-3 个类别，且一个类别占比超过 70%、压倒性优势是唯一信息时可用。标准替代永远是排序水平条形图。</div>\n</div>",
    hasJS: false
  },
  {
    id: 148,
    name: "Tension Grid (Gestalt)",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".tension-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;margin:40px 0;}\n.tension-item{\n  padding:40px;border:1px solid var(--border);\n  background:var(--surface);position:relative;overflow:hidden;\n}\n.tension-item .tn-label{\n  font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;\n  color:var(--text-disabled);margin-bottom:16px;\n}\n.tension-item .tn-pair{\n  display:flex;align-items:center;gap:12px;margin-bottom:12px;\n}\n.tension-item .tn-side{\n  font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--text-display);\n}\n.tension-item .tn-side-en{\n  font-family:var(--font-mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;\n  color:var(--text-disabled);margin-top:2px;\n}\n.tension-item .tn-vs{width:24px;height:1px;background:var(--border);}\n.tension-item .tn-desc{font-size:13px;color:var(--text-secondary);line-height:1.7;max-width:300px;}\n@media(max-width:1024px){.tension-grid{grid-template-columns:1fr;}}",
    html: "<div class=\"tension-grid\">\n  <div class=\"tension-item\">\n    <div class=\"tn-label\">原则一</div>\n    <div class=\"tn-pair\">\n      <span class=\"tn-side\">接近性</span>\n      <span class=\"tn-vs\"></span>\n      <span class=\"tn-side\" style=\"font-weight:300;font-size:14px;color:var(--text-secondary);\">Proximity</span>\n    </div>\n    <p class=\"tn-desc\">相关元素靠近，无关元素加大间距。间距本身是分组工具。</p>\n  </div>\n  <div class=\"tension-item\">\n    <div class=\"tn-label\">原则二</div>\n    <div class=\"tn-pair\">\n      <span class=\"tn-side\">相似性</span>\n      <span class=\"tn-vs\"></span>\n      <span class=\"tn-side\" style=\"font-weight:300;font-size:14px;color:var(--text-secondary);\">Similarity</span>\n    </div>\n    <p class=\"tn-desc\">相同颜色 / 形状 / 大小 = 同一组。人不学分类，直接看颜色就知道一组。</p>\n  </div>\n  <div class=\"tension-item\">\n    <div class=\"tn-label\">原则三</div>\n    <div class=\"tn-pair\">\n      <span class=\"tn-side\">封闭性</span>\n      <span class=\"tn-vs\"></span>\n      <span class=\"tn-side\" style=\"font-weight:300;font-size:14px;color:var(--text-secondary);\">Enclosure</span>\n    </div>\n    <p class=\"tn-desc\">用极淡背景色替代边框。去掉外框——人脑会自动补全。</p>\n  </div>\n  <div class=\"tension-item\">\n    <div class=\"tn-label\">原则四</div>\n    <div class=\"tn-pair\">\n      <span class=\"tn-side\">连续性</span>\n      <span class=\"tn-vs\"></span>\n      <span class=\"tn-side\" style=\"font-weight:300;font-size:14px;color:var(--text-secondary);\">Continuity</span>\n    </div>\n    <p class=\"tn-desc\">元素沿平滑路径对齐，去掉不必要的轴线。</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 149,
    name: "Flow Pipeline (3-act)",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".flow-pipeline{display:flex;align-items:center;gap:0;padding:16px 0;}\n.flow-stage{display:flex;flex-direction:column;gap:4px;padding:8px 16px;text-align:center;flex:1;}\n.flow-stage .sl{\n  font-family:var(--font-mono);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-disabled);\n}\n.flow-stage .sv{\n  font-family:var(--font-display);font-size:18px;color:var(--text-secondary);\n}\n.flow-stage--active .sv{color:var(--text-display);font-weight:700;}\n.flow-stage--done .sv{color:var(--scene-glacier);}\n.flow-arrow{font-size:20px;color:var(--text-disabled);flex-shrink:0;}\n@media(max-width:768px){.flow-pipeline{flex-direction:column;gap:8px;}.flow-arrow{transform:rotate(90deg);}}",
    html: "<div class=\"flow-pipeline\">\n  <div class=\"flow-stage flow-stage--done\">\n    <span class=\"sl\">第一幕</span>\n    <span class=\"sv\">铺垫</span>\n  </div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage flow-stage--active\">\n    <span class=\"sl\">第二幕</span>\n    <span class=\"sv\">冲突</span>\n  </div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage\">\n    <span class=\"sl\">第三幕</span>\n    <span class=\"sv\">决议</span>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 150,
    name: "Step Sequence",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".step-item{display:flex;flex-direction:column;gap:24px;margin:32px 0;}\n.step-item{display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start;}\n.step-item__num{\n  font-family:var(--font-mono);font-size:24px;font-weight:600;\n  color:var(--scene-glacier);opacity:0.4;line-height:1;\n}\n.step-item__desc .step-item__title{\n  font-weight:600;font-size:15px;color:var(--text-display);margin-bottom:4px;\n}\n.step-item__desc .step-item__desc{font-size:13px;color:var(--text-secondary);line-height:1.6;}\n@media(max-width:768px){.step-item{grid-template-columns:1fr;gap:8px;}}",
    html: "<div class=\"step-item\">\n  <div class=\"step-item\">\n    <span class=\"step-item__num\">01</span>\n    <div class=\"step-item__desc\">\n      <div class=\"step-item__title\">WHO — 定义精准受众</div>\n      <div class=\"step-item__desc\">拒绝\"所有利益相关者\"。找出真正的决策者。多类受众有分歧时，做分开的沟通，不要拼成一个谁都不满意的版本。</div>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <span class=\"step-item__num\">02</span>\n    <div class=\"step-item__desc\">\n      <div class=\"step-item__title\">WHAT — 行动导向的目标</div>\n      <div class=\"step-item__desc\">用强动词：批准、调整、优先、启动，不是了解、注意、关注。不完美的建议也比被动的总结好。</div>\n    </div>\n  </div>\n  <div class=\"step-item\">\n    <span class=\"step-item__num\">03</span>\n    <div class=\"step-item__desc\">\n      <div class=\"step-item__title\">HOW — Big Idea 一句话</div>\n      <div class=\"step-item__desc\">包含洞察 + 建议。所有设计选择是否服务于 Big Idea？验证后进入六步执行：理解上下文→选形式→消噪音→引导注意力→功能优先→三幕结构。</div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 151,
    name: "Blockquote",
    source: "数据讲故事视觉设计实战手册.html",
    category: "detail",
    css: ".blockquote{\n  border-top:1px solid var(--border);border-bottom:1px solid var(--border);\n  padding:32px 0;margin:48px 0;position:relative;\n}\n.blockquote::before{\n  content:'\\201C';font-family:var(--font-display);\n  font-size:48px;color:var(--scene-glacier);opacity:0.2;\n  position:absolute;top:8px;left:-4px;line-height:1;\n}\n.blockquote-text{\n  font-family:var(--font-display);font-size:20px;font-style:italic;color:var(--text-primary);\n  line-height:1.6;padding-left:20px;max-width:600px;\n}\n.blockquote-cite{\n  display:block;margin-top:12px;padding-left:20px;\n  font-family:var(--font-mono);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;\n  color:var(--text-disabled);font-style:normal;\n}",
    html: "<div class=\"blockquote\">\n  <p class=\"blockquote-text\">数据讲故事的本质不是\"把图画好看\"，而是降低受众理解数据含义的认知成本，同时引导他们走向你期望的行动。</p>\n  <span class=\"blockquote-cite\">Storytelling with Data · Cole Nussbaumer Knaflic</span>\n</div>",
    hasJS: false
  },
  {
    id: 152,
    name: "Principle Card Grid",
    source: "数据讲故事视觉设计实战手册.html",
    category: "section",
    css: ".principle-card{border:1px solid var(--border);background:var(--surface);padding:28px;border-left:3px solid var(--scene-glacier);}\n.principle-card .pc-label{\n  font-family:var(--font-mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;\n  color:var(--text-disabled);margin-bottom:8px;\n}\n.principle-card .pc-title{\n  font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--text-display);margin-bottom:8px;\n}\n.principle-card .pc-body{font-size:13px;color:var(--text-secondary);line-height:1.7;}",
    html: "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:20px;\">\n  <div class=\"principle-card\" style=\"border-left-color:var(--scene-glacier);\">\n    <div class=\"pc-label\">原则一</div>\n    <div class=\"pc-title\">受众中心</div>\n    <div class=\"pc-body\">所有设计决策从\"他们需要什么\"出发。不是\"我想展示什么\"，是\"他们需要知道什么\"。</div>\n  </div>\n  <div class=\"principle-card\" style=\"border-left-color:var(--primary-olive);\">\n    <div class=\"pc-label\">原则二</div>\n    <div class=\"pc-title\">少即是多</div>\n    <div class=\"pc-body\">删除一切不传递信息的元素。一两个关键数字用大字呈现，不是图表。</div>\n  </div>\n  <div class=\"principle-card\" style=\"border-left-color:var(--accent-orange);\">\n    <div class=\"pc-label\">原则三</div>\n    <div class=\"pc-title\">注意力稀缺</div>\n    <div class=\"pc-body\">一次只引导一个焦点。如果什么都突出，就等于什么都没突出。</div>\n  </div>\n  <div class=\"principle-card\" style=\"border-left-color:var(--scene-glacier);\">\n    <div class=\"pc-label\">原则四</div>\n    <div class=\"pc-title\">诚实比好看重要</div>\n    <div class=\"pc-body\">包含反证，不做视觉欺骗。零基线、无 3D、无双 Y 轴。</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 153,
    name: "4-Level Label Bar",
    source: "iconic-data-viz.html",
    category: "detail",
    css: ".l4{display:flex;gap:var(--s8);margin-bottom:var(--s8);font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase}\n.l4 span{color:var(--tda);position:relative;padding-left:var(--s4)}\n.l4 span::before{content:'';position:absolute;left:0;top:50%;width:4px;height:4px;border-radius:50%;background:var(--bd);transform:translateY(-50%)}\n.l4 .a{color:var(--td)}.l4 .a::before{background:var(--olive);width:8px;height:8px}\n@media(max-width:768px){.l4{flex-wrap:wrap;gap:var(--s4)}}",
    html: "<div class=\"l4\">\n  <span class=\"a\">Hero</span>\n  <span>Section</span>\n  <span>Detail</span>\n  <span>Decorative</span>\n</div>",
    hasJS: false
  },
  {
    id: 154,
    name: "工业Hero (Grid + Scroll)",
    source: "haglofs-production-grade.html",
    category: "hero",
    css: ".hero {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: var(--space-4xl) clamp(24px, 5vw, 80px);\n  position: relative;\n  background: var(--white);\n}\n.hero__grid {\n  position: absolute; inset: 0; pointer-events: none; opacity: 0.15;\n  background-image:\n    linear-gradient(var(--gray1) 1px, transparent 1px),\n    linear-gradient(90deg, var(--gray1) 1px, transparent 1px);\n  background-size: 64px 64px;\n}\n.hero__label {\n  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em;\n  text-transform: uppercase; color: var(--gray5); margin-bottom: var(--space-lg);\n  position: relative; z-index: 1;\n}\n.hero__title {\n  font-size: clamp(48px, 10vw, 120px); font-weight: 800; color: var(--black);\n  line-height: 0.88; letter-spacing: -0.04em; margin-bottom: var(--space-lg);\n  position: relative; z-index: 1;\n}\n.hero__title-em { color: var(--red); }\n.hero__desc {\n  font-size: 15px; color: var(--gray7); max-width: 480px; line-height: 1.7;\n  margin-bottom: var(--space-xl); position: relative; z-index: 1;\n}\n.hero__tags {\n  display: flex; gap: var(--space-sm); flex-wrap: wrap;\n  position: relative; z-index: 1;\n}\n.hero__scroll {\n  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);\n  font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em;\n  text-transform: uppercase; color: var(--gray3);\n  display: flex; flex-direction: column; align-items: center; gap: var(--space-sm);\n  animation: scrollPulse 2.4s ease-in-out infinite;\n}\n@keyframes scrollPulse {\n  0%, 100% { transform: translateX(-50%) translateY(0); }\n  50% { transform: translateX(-50%) translateY(8px); }\n}\n.hero__scroll-line {\n  width: 1px; height: 32px;\n  background: linear-gradient(to bottom, var(--gray3), transparent);\n}\n.tag {\n  font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;\n  text-transform: uppercase; color: var(--gray5);\n  display: inline-flex; align-items: center; gap: 6px;\n  padding: 4px 10px; border: 1px solid var(--gray1); background: var(--white);\n}\n.tag::before {\n  content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--gray3);\n}\n.tag--accent { color: var(--red); border-color: var(--red); }\n.tag--accent::before { background: var(--red); }",
    html: "<section class=\"hero\">\n  <div class=\"hero__grid\"></div>\n  <div class=\"hero__label\">Stockholm Design Lab x Haglofs</div>\n  <h1 class=\"hero__title\">工业<br><span class=\"hero__title-em\">组件库</span></h1>\n  <p class=\"hero__desc\">精工版。四个核心形式——分段块条、点阵矩阵、SVG 仪表盘、非对称布局。</p>\n  <div class=\"hero__tags\">\n    <span class=\"tag tag--accent\">4 forms</span>\n    <span class=\"tag tag--accent\">22 components</span>\n    <span class=\"tag\">industrial</span>\n  </div>\n  <div class=\"hero__scroll\">\n    <span>Scroll</span>\n    <div class=\"hero__scroll-line\"></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 155,
    name: "Dark Statement Hero",
    source: "haglofs-component-showcase.html",
    category: "hero",
    css: ".hero-dark{min-height:100vh;background:var(--glacier);display:flex;flex-direction:column;\n  justify-content:center;position:relative;overflow:hidden;padding:8vh 6vw}\n.hero-dark__contour{position:absolute;inset:0;z-index:1;pointer-events:none}\n.hero-dark__contour svg{width:100%;height:100%}\n.hero-dark__content{position:relative;z-index:2;max-width:900px}\n.hero-dark__micro{font-family:var(--fm);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(250,250,248,.2);margin-bottom:36px}\n.hero-dark__title{font-family:var(--fd);font-size:clamp(36px,6.5vw,88px);font-weight:700;color:#FAFAF8;line-height:1.06;letter-spacing:-.03em}\n.hero-dark__title em{font-style:normal;color:var(--orange);opacity:.85}\n.hero-dark__leds{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;\n  padding-top:32px;border-top:1px solid rgba(250,250,248,.08)}\n.hero-dark__led{position:relative}\n.hero-dark__led-val{font-family:var(--fm);font-size:clamp(28px,3.5vw,48px);font-weight:600;color:#FAFAF8;line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}\n.hero-dark__led-tag{font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(250,250,248,.25);margin-top:6px}\n.hero-dark__led-bar{height:3px;margin-top:10px;border-radius:2px;background:rgba(250,250,248,.1)}\n.hero-dark__led-bar-fill{height:100%;border-radius:2px;background:var(--olive);opacity:.6}\n.grain{position:relative}\n.grain::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:3;\n  background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E\");\n  background-repeat:repeat;mix-blend-mode:multiply;opacity:.25}",
    html: "<section class=\"hero-dark grain\">\n  <div class=\"hero-dark__contour\">\n    <svg viewBox=\"0 0 1440 900\" fill=\"none\" preserveAspectRatio=\"none\">\n      <path d=\"M0 300 C240 200,480 280,720 220 C960 160,1200 240,1440 200\" stroke=\"#FAFAF8\" stroke-width=\".5\" opacity=\".12\"/>\n      <path d=\"M0 340 C240 240,480 320,720 260 C960 200,1200 280,1440 240\" stroke=\"#FAFAF8\" stroke-width=\".5\" opacity=\".09\"/>\n      <path d=\"M0 380 C240 280,480 360,720 300 C960 240,1200 320,1440 280\" stroke=\"#FAFAF8\" stroke-width=\".5\" opacity=\".07\"/>\n      <path d=\"M0 420 C240 320,480 400,720 340 C960 280,1200 360,1440 320\" stroke=\"#FAFAF8\" stroke-width=\".5\" opacity=\".05\"/>\n    </svg>\n  </div>\n  <div class=\"hero-dark__content\">\n    <div class=\"hero-dark__micro\">Haglofs Data as Landscape v4</div>\n    <h1 class=\"hero-dark__title\">Data as<em> landscape</em>.<br>Not as<em> spreadsheet</em>.</h1>\n    <div class=\"hero-dark__leds\">\n      <div class=\"hero-dark__led\">\n        <div class=\"hero-dark__led-val\">111</div>\n        <div class=\"hero-dark__led-tag\">Years</div>\n        <div class=\"hero-dark__led-bar\"><div class=\"hero-dark__led-bar-fill\" style=\"width:100%\"></div></div>\n      </div>\n      <div class=\"hero-dark__led\">\n        <div class=\"hero-dark__led-val\">87%</div>\n        <div class=\"hero-dark__led-tag\">Retention</div>\n        <div class=\"hero-dark__led-bar\"><div class=\"hero-dark__led-bar-fill\" style=\"width:87%\"></div></div>\n      </div>\n    </div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 156,
    name: "Scale Jump (Polestar)",
    source: "haglofs-component-showcase.html",
    category: "hero",
    css: ".scale-jump{padding:10vh 6vw;display:flex;align-items:baseline;gap:8px;border-bottom:1px solid var(--bd)}\n.scale-jump__micro{font-family:var(--fm);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--tda)}\n.scale-jump__macro{font-family:var(--fd);font-size:clamp(120px,20vw,280px);font-weight:700;line-height:.85;letter-spacing:-.05em;color:var(--td)}\n.scale-jump__macro--mono{font-family:var(--fm);font-weight:200}\n.scale-jump__detail{margin-left:auto;max-width:240px;font-size:13px;color:var(--ts);line-height:1.6;align-self:center}",
    html: "<section class=\"scale-jump grain\">\n  <div>\n    <span class=\"scale-jump__micro\">Revenue growth</span>\n    <div class=\"scale-jump__macro scale-jump__macro--mono\">91</div>\n  </div>\n  <div class=\"scale-jump__detail\">Data as landscape. Standing in Nordic wilderness, not reading a report.</div>\n</section>",
    hasJS: false
  },
  {
    id: 157,
    name: "Fjord Silhouette",
    source: "haglofs-component-showcase.html",
    category: "section",
    css: ".fjord{padding:0;border-bottom:1px solid var(--bd)}\n.fjord__label{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);padding:28px 5vw 0;margin:0}\n.fjord__chart{width:100%;position:relative}\n.fjord__chart svg{width:100%;height:auto;display:block}\n.fjord__overlay{position:absolute;bottom:0;left:0;right:0;padding:3vh 5vw;z-index:2}\n.fjord__stats{display:flex;gap:40px}\n.fjord__stat-val{font-family:var(--fm);font-size:28px;font-weight:700;color:var(--td);font-variant-numeric:tabular-nums}\n.fjord__stat-label{font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--tda);margin-top:4px}",
    html: "<section class=\"fjord\">\n  <div class=\"fjord__label\">Section Fjord Silhouette</div>\n  <div class=\"fjord__chart\">\n    <svg viewBox=\"0 0 1200 320\" fill=\"none\" preserveAspectRatio=\"none\" style=\"font-family:var(--fm)\">\n      <defs>\n        <linearGradient id=\"sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#e8e4df\"/><stop offset=\"40%\" stop-color=\"#f0ede8\"/><stop offset=\"100%\" stop-color=\"#FAFAF8\"/>\n        </linearGradient>\n        <linearGradient id=\"terrain1\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#2C2C2C\" stop-opacity=\"1\"/><stop offset=\"100%\" stop-color=\"#2C2C2C\" stop-opacity=\"0.85\"/>\n        </linearGradient>\n      </defs>\n      <rect width=\"1200\" height=\"320\" fill=\"url(#sky)\"/>\n      <path d=\"M0,300 C50,280 100,270 150,240 C200,210 250,180 320,140 C390,100 430,110 500,150 C570,190 610,160 680,110 C750,60 790,40 860,30 C930,20 970,50 1030,80 C1090,110 1140,130 1200,150 L1200,320 L0,320 Z\" fill=\"url(#terrain1)\"/>\n      <circle cx=\"860\" cy=\"30\" r=\"3\" fill=\"var(--org)\" opacity=\".8\"/>\n      <text x=\"860\" y=\"22\" fill=\"var(--td)\" font-size=\"9\" text-anchor=\"middle\" font-weight=\"600\">PEAK 91%</text>\n    </svg>\n  </div>\n  <div class=\"fjord__overlay\">\n    <div class=\"fjord__stats\">\n      <div><div class=\"fjord__stat-val\">91%</div><div class=\"fjord__stat-label\">Peak revenue</div></div>\n      <div><div class=\"fjord__stat-val\">3.2x</div><div class=\"fjord__stat-label\">Growth factor</div></div>\n    </div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 158,
    name: "Tension Grid",
    source: "haglofs-component-showcase.html",
    category: "section",
    css: ".s-tension{display:grid;grid-template-columns:1fr 1fr;min-height:45vh;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}\n.s-tension__cell{display:flex;flex-direction:column;justify-content:center;padding:8vh 5vw;position:relative}\n.s-tension__cell--dark{background:var(--glacier)}\n.s-tension__cell--light{background:var(--bg)}\n.s-tension__divider{position:absolute;top:8%;bottom:8%;left:50%;width:3px;background:var(--org);transform:translateX(-50%);z-index:5}\n.s-tension__tag{font-family:var(--fm);font-size:9px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px}\n.s-tension__cell--dark .s-tension__tag{color:rgba(250,250,248,.25)}\n.s-tension__cell--light .s-tension__tag{color:var(--tda)}\n.s-tension__ttl{font-family:var(--fd);font-size:clamp(22px,3vw,36px);font-weight:700;line-height:1.12;letter-spacing:-.02em}\n.s-tension__cell--dark .s-tension__ttl{color:#FAFAF8}\n.s-tension__cell--light .s-tension__ttl{color:var(--td)}",
    html: "<section class=\"s-tension\">\n  <div class=\"s-tension__cell s-tension__cell--dark\">\n    <div class=\"s-tension__tag\">Legacy metrics</div>\n    <div class=\"s-tension__ttl\">Established<br>performance</div>\n  </div>\n  <div class=\"s-tension__divider\"></div>\n  <div class=\"s-tension__cell s-tension__cell--light\">\n    <div class=\"s-tension__tag\">Growth metrics</div>\n    <div class=\"s-tension__ttl\">Accelerating<br>momentum</div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 159,
    name: "Bento Grid",
    source: "haglofs-component-showcase.html",
    category: "section",
    css: ".s-bento{padding:8vh 5vw;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--bd)}\n.s-bento__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.s-bento__grid{display:grid;grid-template-columns:1fr 1fr;gap:3px}\n.s-bento__tile{background:var(--sf);border:1px solid var(--bd);padding:24px 20px;position:relative;overflow:hidden}\n.s-bento__tile-tag{font-family:var(--fm);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--tda);margin-bottom:12px}\n.s-bento__tile-title{font-family:var(--fd);font-size:18px;font-weight:700;color:var(--td);line-height:1.2;margin-bottom:4px}\n.s-bento__tile svg{width:100%;height:auto;margin-top:12px}",
    html: "<section class=\"s-bento\">\n  <div class=\"s-bento__lbl\">Section Bento</div>\n  <div class=\"s-bento__grid\">\n    <div class=\"s-bento__tile\">\n      <div class=\"s-bento__tile-tag\">Tree-ring</div>\n      <div class=\"s-bento__tile-title\">Growth rings</div>\n      <!-- Inline SVG tree-ring chart -->\n      <svg viewBox=\"0 0 200 200\" fill=\"none\" style=\"font-family:var(--fm)\">\n        <circle cx=\"100\" cy=\"100\" r=\"3\" fill=\"var(--earth)\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"12\" fill=\"none\" stroke=\"#d4c5a9\" stroke-width=\"4\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"24\" fill=\"none\" stroke=\"#d4c5a9\" stroke-width=\"6\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"42\" fill=\"none\" stroke=\"#d4c5a9\" stroke-width=\"10\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"64\" fill=\"none\" stroke=\"#d4c5a9\" stroke-width=\"8\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"84\" fill=\"none\" stroke=\"#d4c5a9\" stroke-width=\"14\"/>\n      </svg>\n    </div>\n    <div class=\"s-bento__tile\">\n      <div class=\"s-bento__tile-tag\">Compass-rose</div>\n      <div class=\"s-bento__tile-title\">Capability bearing</div>\n      <!-- Inline SVG compass rose -->\n      <svg viewBox=\"0 0 200 200\" fill=\"none\" style=\"font-family:var(--fm)\">\n        <circle cx=\"100\" cy=\"100\" r=\"30\" stroke=\"var(--bd)\" stroke-width=\".5\" fill=\"none\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"55\" stroke=\"var(--bd)\" stroke-width=\".5\" fill=\"none\"/>\n        <circle cx=\"100\" cy=\"100\" r=\"80\" stroke=\"var(--bd)\" stroke-width=\".5\" fill=\"none\"/>\n        <line x1=\"100\" y1=\"10\" x2=\"100\" y2=\"190\" stroke=\"var(--bd)\" stroke-width=\".5\"/>\n        <line x1=\"10\" y1=\"100\" x2=\"190\" y2=\"100\" stroke=\"var(--bd)\" stroke-width=\".5\"/>\n        <polygon points=\"100,22 160,70 140,140 55,150 32,80\" fill=\"var(--glacier)\" fill-opacity=\".08\" stroke=\"var(--glacier)\" stroke-width=\"1.5\"/>\n      </svg>\n    </div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 160,
    name: "Bathymetric Depth Bands",
    source: "haglofs-component-showcase.html",
    category: "detail",
    css: ".d-bathy{padding:8vh 5vw;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--bd)}\n.d-bathy__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.d-bathy__chart{width:100%}\n.d-bathy__chart svg{width:100%;height:auto;display:block}\n.d-bathy__legend{display:flex;gap:20px;margin-top:16px}\n.d-bathy__legend-item{display:flex;align-items:center;gap:6px;font-family:var(--fm);font-size:10px;color:var(--ts)}\n.d-bathy__legend-dot{width:14px;height:8px;border-radius:2px}",
    html: "",
    hasJS: false
  },
  {
    id: 161,
    name: "Stratum Cross-Section",
    source: "haglofs-component-showcase.html",
    category: "detail",
    css: ".d-stratum{padding:8vh 5vw;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--bd)}\n.d-stratum__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.d-stratum__chart{width:100%}\n.d-stratum__chart svg{width:100%;height:auto;display:block}\n.d-stratum__legend{display:flex;gap:20px;margin-top:16px}\n.d-stratum__legend-item{display:flex;align-items:center;gap:6px;font-family:var(--fm);font-size:10px;color:var(--ts)}\n.d-stratum__legend-swatch{width:14px;height:8px;border-radius:2px}",
    html: "",
    hasJS: false
  },
  {
    id: 162,
    name: "Aurora Curtain",
    source: "haglofs-component-showcase.html",
    category: "decorative",
    css: ".aurora{position:relative;min-height:50vh;background:#0a0e1a;overflow:hidden;padding:10vh 5vw}\n.aurora__curtains{position:absolute;inset:0;z-index:0;mix-blend-mode:screen}\n.aurora__curtains svg{width:100%;height:100%}\n.aurora__content{position:relative;z-index:1}\n.aurora__label{font-family:var(--fm);font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(250,250,248,.3);margin-bottom:14px}\n.aurora__title{font-family:var(--fd);font-size:clamp(28px,4vw,52px);font-weight:700;color:#FAFAF8;line-height:1.1;letter-spacing:-.02em}\n.aurora__sub{font-size:13px;color:rgba(250,250,248,.5);margin-top:12px;max-width:32rem;line-height:1.6}\n.aurora__stats{display:flex;gap:40px;margin-top:32px}\n.aurora__stat-val{font-family:var(--fm);font-size:32px;font-weight:700;color:#FAFAF8;font-variant-numeric:tabular-nums}\n.aurora__stat-label{font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(250,250,248,.25);margin-top:4px}",
    html: "",
    hasJS: false
  },
  {
    id: 163,
    name: "Ghost Number",
    source: "haglofs-component-showcase.html",
    category: "decorative",
    css: ".dc-ghost{position:relative;padding:14vh 5vw;overflow:hidden;min-height:40vh;display:flex;align-items:center;justify-content:center}\n.dc-ghost__num{font-family:var(--fm);font-size:clamp(80px,15vw,240px);font-weight:200;color:var(--td);opacity:.04;user-select:none;position:relative;z-index:1;letter-spacing:-.05em;mix-blend-mode:multiply}",
    html: "<section class=\"dc-ghost grain\">\n  <div class=\"dc-ghost__num\">87</div>\n</section>",
    hasJS: false
  },
  {
    id: 164,
    name: "Seismic Wave Hero",
    source: "haglofs-component-showcase.html",
    category: "hero",
    css: ".hero-seismic{min-height:100vh;background:#0a0e1a;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;padding:8vh 6vw}\n.hero-seismic__waves{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.45}\n.hero-seismic__waves svg{width:100%;height:100%}\n.hero-seismic__content{position:relative;z-index:2;max-width:900px}\n.hero-seismic__micro{font-family:var(--fm);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(250,250,248,.2);margin-bottom:36px}\n.hero-seismic__title{font-family:var(--fd);font-size:clamp(36px,6.5vw,88px);font-weight:700;color:#FAFAF8;line-height:1.06;letter-spacing:-.03em}\n.hero-seismic__title em{font-style:normal;color:var(--org);opacity:.85}\n.hero-seismic__leds{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(250,250,248,.08)}\n.hero-seismic__led{position:relative}\n.hero-seismic__led-val{font-family:var(--fm);font-size:clamp(28px,3.5vw,48px);font-weight:600;color:#FAFAF8;line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}\n.hero-seismic__led-tag{font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(250,250,248,.25);margin-top:6px}\n.hero-seismic__led-bar{height:3px;margin-top:10px;border-radius:2px;background:rgba(250,250,248,.1)}\n.hero-seismic__led-bar-fill{height:100%;border-radius:2px;background:var(--olive);opacity:.6}",
    html: "<section class=\"hero-seismic grain\">\n  <div class=\"hero-seismic__waves\">\n    <svg id=\"seismicSvg\" viewBox=\"0 0 1440 900\" fill=\"none\" preserveAspectRatio=\"none\"></svg>\n  </div>\n  <div class=\"hero-seismic__content\">\n    <div class=\"hero-seismic__micro\">Industrial Precision Organic Mathematics v5</div>\n    <h1 class=\"hero-seismic__title\">Data as<em> signal</em>.<br>Not as<em> noise</em>.</h1>\n    <div class=\"hero-seismic__leds\">\n      <div class=\"hero-seismic__led\"><div class=\"hero-seismic__led-val\">12</div><div class=\"hero-seismic__led-tag\">Dimensions</div><div class=\"hero-seismic__led-bar\"><div class=\"hero-seismic__led-bar-fill\" style=\"width:100%\"></div></div></div>\n    </div>\n  </div>\n</section>",
    hasJS: true
  },
  {
    id: 165,
    name: "Isometric 2.5D Grid",
    source: "haglofs-component-showcase.html",
    category: "section",
    css: ".s-isometric{padding:8vh 5vw;border-bottom:1px solid var(--bd)}\n.s-isometric__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.s-isometric__grid{max-width:1120px;margin:0 auto}\n.s-isometric__grid svg{width:100%;height:auto;display:block}",
    html: "",
    hasJS: false
  },
  {
    id: 166,
    name: "Fold/Hinge Section",
    source: "haglofs-component-showcase.html",
    category: "section",
    css: ".s-fold{display:flex;min-height:45vh;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}\n.s-fold__panel{flex:1;display:flex;flex-direction:column;justify-content:center;padding:8vh 5vw;position:relative}\n.s-fold__panel--left{background:var(--bg);clip-path:polygon(0 0,100% 0,92% 100%,0 100%)}\n.s-fold__panel--right{background:var(--glacier);clip-path:polygon(8% 0,100% 0,100% 100%,0 100%)}\n.s-fold__tag{font-family:var(--fm);font-size:9px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:16px}\n.s-fold__panel--left .s-fold__tag{color:var(--tda)}\n.s-fold__panel--right .s-fold__tag{color:rgba(250,250,248,.25)}\n.s-fold__ttl{font-family:var(--fd);font-size:clamp(22px,3vw,36px);font-weight:700;line-height:1.12;letter-spacing:-.02em}\n.s-fold__panel--left .s-fold__ttl{color:var(--td)}\n.s-fold__panel--right .s-fold__ttl{color:#FAFAF8}\n.s-fold__hinge{position:relative;z-index:5;width:3px;background:var(--org);flex-shrink:0}",
    html: "<section class=\"s-fold\">\n  <div class=\"s-fold__panel s-fold__panel--left\">\n    <div class=\"s-fold__tag\">Flat design</div>\n    <div class=\"s-fold__ttl\">Everything<br>on one plane</div>\n  </div>\n  <div class=\"s-fold__hinge\"></div>\n  <div class=\"s-fold__panel s-fold__panel--right\">\n    <div class=\"s-fold__tag\">Folded design</div>\n    <div class=\"s-fold__ttl\">Depth through<br>perspective</div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 167,
    name: "Polar Rose / Wind Rose",
    source: "haglofs-component-showcase.html",
    category: "detail",
    css: ".d-polarrose{padding:8vh 5vw;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--bd)}\n.d-polarrose__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.d-polarrose__wrap{display:flex;align-items:center;gap:48px}\n.d-polarrose__chart{flex-shrink:0}\n.d-polarrose__chart svg{display:block}\n.d-polarrose__info{min-width:0}\n.d-polarrose__title{font-family:var(--fd);font-size:20px;font-weight:600;color:var(--td);margin-bottom:8px}\n.d-polarrose__desc{font-size:13px;color:var(--ts);line-height:1.6;margin-bottom:16px}\n.d-polarrose__legend{display:flex;flex-direction:column;gap:6px}\n.d-polarrose__legend-item{display:flex;align-items:center;gap:8px;font-family:var(--fm);font-size:10px;color:var(--ts)}\n.d-polarrose__legend-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}",
    html: "",
    hasJS: false
  },
  {
    id: 168,
    name: "Weave/Lattice",
    source: "haglofs-component-showcase.html",
    category: "detail",
    css: ".d-weave{padding:8vh 5vw;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--bd)}\n.d-weave__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tda);margin-bottom:28px}\n.d-weave__chart{width:100%}\n.d-weave__chart svg{width:100%;height:auto;display:block}\n.d-weave__legend{display:flex;gap:20px;margin-top:16px}\n.d-weave__legend-item{display:flex;align-items:center;gap:6px;font-family:var(--fm);font-size:10px;color:var(--ts)}\n.d-weave__legend-swatch{width:14px;height:4px;border-radius:1px}",
    html: "",
    hasJS: false
  },
  {
    id: 169,
    name: "Striated + Brand Statement",
    source: "haglofs-component-showcase.html",
    category: "decorative",
    css: ".dc-striated{position:relative;padding:6vh 5vw;overflow:hidden;border-top:1px solid var(--bd)}\n.dc-striated__bg{position:absolute;inset:0;z-index:0;pointer-events:none}\n.dc-striated__bg svg{width:100%;height:100%}\n.dc-striated__content{position:relative;z-index:2;max-width:560px}\n.dc-striated__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--earth);margin-bottom:14px}\n.dc-striated__ttl{font-family:var(--fd);font-size:clamp(22px,3vw,36px);font-weight:700;color:var(--td);line-height:1.15;letter-spacing:-.02em}",
    html: "",
    hasJS: false
  },
  {
    id: 170,
    name: "Pulse Hero (Brand Analytics)",
    source: "haglofs-brand-analytics.html",
    category: "hero",
    css: ".hero{\n  min-height:100vh;background:var(--pk);color:#fff;display:flex;flex-direction:column;\n  justify-content:center;position:relative;overflow:hidden;padding:var(--s8);\n}\n.hero::before{\n  content:'ANALYTICS';position:absolute;top:-.08em;left:-.04em;\n  font-family:var(--fd);font-size:clamp(8rem,20vw,22rem);font-weight:700;line-height:.8;\n  letter-spacing:-.06em;color:rgba(255,255,255,.02);pointer-events:none;user-select:none;\n}\n.hero__pulse{\n  position:absolute;top:0;left:0;right:0;height:1px;\n  background:linear-gradient(90deg,transparent 0%,rgba(74,93,58,.6) 50%,transparent 100%);\n  animation:pulse 3s ease-in-out infinite;\n}\n@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}\n.hero__inner{max-width:1120px;margin:0 auto;width:100%;position:relative;z-index:2}\n.hero__tag{\n  font-family:var(--fm);font-size:var(--sm);letter-spacing:.15em;text-transform:uppercase;\n  color:rgba(255,255,255,.2);margin-bottom:var(--s12);display:flex;align-items:center;gap:var(--s4);\n}\n.hero__tag::before{content:'';width:32px;height:1px;background:rgba(255,255,255,.15)}\n.hero__h{\n  font-family:var(--fd);font-size:clamp(3rem,6vw,5rem);font-weight:400;\n  line-height:1.05;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s16);max-width:700px;\n}\n.hero__h strong{font-weight:700;color:rgba(74,93,58,.8)}\n.hero__strip{\n  display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);\n  border-top:1px solid rgba(255,255,255,.06);padding-top:var(--s8);\n}\n.hm__num{\n  font-family:var(--fm);font-size:clamp(2rem,4vw,3.5rem);font-weight:600;\n  line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s1);\n}\n.hm__lbl{\n  font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;\n  color:rgba(255,255,255,.3);margin-bottom:2px;\n}\n.hm__ctx{font-size:var(--sm);color:rgba(255,255,255,.15);line-height:1.5}",
    html: "<section class=\"hero\">\n  <div class=\"hero__pulse\"></div>\n  <div class=\"hero__inner\">\n    <div class=\"hero__tag\">Haglofs Brand Analytics</div>\n    <h1 class=\"hero__h\">Data tells the<br>story of <strong>the wild.</strong></h1>\n    <div class=\"hero__strip\">\n      <div><div class=\"hm__lbl\">Brand coverage</div><div class=\"hm__num\">94%</div><div class=\"hm__ctx\">28 markets</div></div>\n      <div><div class=\"hm__lbl\">Components</div><div class=\"hm__num\">82</div><div class=\"hm__ctx\">A-G all categories</div></div>\n      <div><div class=\"hm__lbl\">Scenarios</div><div class=\"hm__num\">10/10</div><div class=\"hm__ctx\">Full coverage</div></div>\n    </div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 171,
    name: "Compass Trend Card",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".compass{background:var(--sf)}\n.compass__grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--s8);margin-top:var(--s8)}\n.cmp-card{padding:var(--s8);border:1px solid var(--bd);border-radius:var(--r4);position:relative;overflow:hidden;transition:border-color var(--df) var(--eo)}\n.cmp-card:hover{border-color:var(--tda)}\n.cmp-card__hed{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--s6)}\n.cmp-card__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--tda)}\n.cmp-card__dir{display:flex;align-items:center;gap:var(--s1);font-family:var(--fm);font-size:var(--xs);letter-spacing:.04em}\n.cmp-card__dir.up{color:var(--olive)}.cmp-card__dir.down{color:var(--org)}.cmp-card__dir.stable{color:var(--ts)}\n.cmp-card__num{font-family:var(--fm);font-size:var(--5xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:var(--td);margin-bottom:var(--s2)}\n.cmp-card__ctx{font-size:var(--sm);color:var(--ts);line-height:1.6}\n.cmp-card__trail{display:flex;gap:3px;margin-top:var(--s6);align-items:flex-end;height:40px}\n.cmp-card__trail span{width:6px;background:var(--bd);border-radius:2px;transition:background var(--dn) var(--eo)}\n.cmp-card__trail span.f{background:var(--olive)}.cmp-card__trail span.s{background:var(--earth)}\n.cmp-card__bar{position:absolute;top:0;left:0;height:2px;transition:width 1s var(--eo)}",
    html: "",
    hasJS: false
  },
  {
    id: 172,
    name: "Elevation Profile",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".elevation{background:var(--pk);color:#fff}\n.elevation__charts{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--s8);margin-top:var(--s8)}\n.elev{padding:var(--s8) var(--s6);position:relative;overflow:hidden}\n.elev__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:var(--s4)}\n.elev__val{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;color:#fff;letter-spacing:-.03em;margin-bottom:var(--s6)}\n.elev__line{width:100%;height:80px;position:relative;overflow:hidden}\n.elev__line svg{width:100%;height:100%}\n.elev__line path{fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}\n.elev__ctx{font-size:var(--sm);color:rgba(255,255,255,.2);margin-top:var(--s4);font-family:var(--fm);letter-spacing:.04em;text-transform:uppercase}",
    html: "<div class=\"elev\">\n  <div class=\"elev__lbl\">Brand Growth</div>\n  <div class=\"elev__val\">+23%</div>\n  <div class=\"elev__line\">\n    <svg viewBox=\"0 0 280 90\" preserveAspectRatio=\"none\">\n      <path d=\"M0 70 Q40 65 80 55 T160 35 T220 20 T280 15\" stroke=\"rgba(74,93,58,.6)\"/>\n      <path d=\"M0 70 Q40 65 80 55 T160 35 T220 20 T280 15\" stroke=\"rgba(255,255,255,.08)\" stroke-width=\"20\" fill=\"none\" stroke-linecap=\"round\"/>\n    </svg>\n  </div>\n  <div class=\"elev__ctx\">2019 to 2026</div>\n</div>",
    hasJS: false
  },
  {
    id: 173,
    name: "Seam Benchmark (Target Comparison Bars)",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".seam{background:var(--sf)}\n.seam__list{display:flex;flex-direction:column;gap:var(--s4);margin-top:var(--s8)}\n.seam-row{display:grid;grid-template-columns:140px 1fr 80px;gap:var(--s6);align-items:center;padding:var(--s4) 0;position:relative}\n.seam-row::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:repeating-linear-gradient(90deg,var(--bd) 0,var(--bd) 4px,transparent 4px,transparent 8px)}\n.seam-row:last-child::after{display:none}\n.seam-row__lbl{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);letter-spacing:.02em}\n.seam-row__track{height:4px;background:var(--sr);border-radius:2px;position:relative;overflow:hidden}\n.seam-row__fill{height:100%;border-radius:2px;transition:width 1s var(--eo)}\n.seam-row__fill.g{background:var(--olive)}.seam-row__fill.e{background:var(--earth)}\n.seam-row__fill.c{background:var(--glacier)}.seam-row__fill.o{background:var(--org)}\n.seam-row__mark{position:absolute;top:-6px;width:2px;height:16px;background:var(--td);opacity:.3;transition:left 1s var(--eo)}\n.seam-row__val{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--td);text-align:right}\n.seam-row__tgt{font-family:var(--fm);font-size:var(--xs);color:var(--tda);margin-top:1px}",
    html: "<div class=\"seam-row\">\n  <span class=\"seam-row__lbl\">Brand Awareness</span>\n  <div class=\"seam-row__track\">\n    <div class=\"seam-row__fill g\" style=\"width:68%\"></div>\n    <div class=\"seam-row__mark\" style=\"left:75%\"></div>\n  </div>\n  <div><div class=\"seam-row__val\">68</div><div class=\"seam-row__tgt\">Target 75</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 174,
    name: "Layer Stack",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".layer{background:var(--sr)}\n.layer__stack{display:flex;flex-direction:column;gap:2px;margin-top:var(--s8)}\n.lyr{display:grid;grid-template-columns:180px 1fr auto;gap:var(--s6);align-items:center;padding:var(--s5) var(--s6);background:var(--sf);border-radius:var(--r4);transition:all var(--df) var(--eo);cursor:default}\n.lyr:hover{background:var(--pk);color:#fff}\n.lyr__num{font-family:var(--fm);font-size:var(--xs);color:var(--tda);letter-spacing:.08em;text-transform:uppercase}\n.lyr:hover .lyr__num{color:rgba(255,255,255,.3)}\n.lyr__name{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);letter-spacing:.02em}\n.lyr:hover .lyr__name{color:#fff}\n.lyr__val{font-family:var(--fm);font-size:var(--base);font-weight:600;color:var(--olive)}\n.lyr:hover .lyr__val{color:rgba(229,91,43,.7)}\n.lyr__ctx{font-size:var(--sm);color:var(--ts);grid-column:2;margin-top:-4px}\n.lyr:hover .lyr__ctx{color:rgba(255,255,255,.4)}\n.lyr__bar{height:3px;background:var(--bd);border-radius:2px;grid-column:2;margin-top:var(--s2);position:relative;overflow:hidden}\n.lyr__bar-f{height:100%;background:var(--olive);border-radius:2px}\n.lyr:hover .lyr__bar{background:rgba(255,255,255,.1)}\n.lyr:hover .lyr__bar-f{background:rgba(229,91,43,.5)}",
    html: "",
    hasJS: false
  },
  {
    id: 175,
    name: "Swatch Cards",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".swatch{background:var(--bg)}\n.swatch__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s6);margin-top:var(--s8)}\n.sw{padding:0;border:1px solid var(--bd);border-radius:var(--r4);overflow:hidden;transition:border-color var(--df) var(--eo)}\n.sw:hover{border-color:var(--tda)}\n.sw__face{height:100px;position:relative;overflow:hidden}\n.sw__face-in{position:absolute;inset:0;display:flex;align-items:flex-end;padding:var(--s4)}\n.sw__face-lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;opacity:.5;color:#fff}\n.sw__body{padding:var(--s4) var(--s5) var(--s5)}\n.sw__val{font-family:var(--fm);font-size:var(--3xl);font-weight:600;line-height:1;letter-spacing:-.02em;color:var(--td);margin-bottom:var(--s1)}\n.sw__ctx{font-size:var(--sm);color:var(--ts);line-height:1.6}\n.sw__dotline{display:flex;gap:3px;margin-top:var(--s4)}\n.sw__dotline span{width:4px;height:4px;border-radius:50%;background:var(--bd);transition:background var(--df) var(--eo)}\n.sw__dotline span.on{background:var(--olive)}\n.sw:hover .sw__dotline span.on{background:var(--org)}",
    html: "",
    hasJS: false
  },
  {
    id: 176,
    name: "Grid Matrix",
    source: "haglofs-brand-analytics.html",
    category: "section",
    css: ".matrix{background:var(--pk);color:#fff}\n.matrix__grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:rgba(255,255,255,.06);margin-top:var(--s8)}\n.mx{padding:var(--s5) var(--s4);background:var(--pk);text-align:center;transition:background var(--df) var(--eo)}\n.mx:hover{background:rgba(74,93,58,.15)}\n.mx__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s2)}\n.mx__val{font-family:var(--fm);font-size:var(--xl);font-weight:600;line-height:1;color:#fff}",
    html: "",
    hasJS: false
  },
  {
    id: 177,
    name: "Callout + Action Grid",
    source: "haglofs-brand-analytics.html",
    category: "detail",
    css: ".insight{background:var(--sf)}\n.insight__grid{display:grid;grid-template-columns:2fr 1fr;gap:var(--s8);margin-top:var(--s8)}\n.callout{padding:var(--s8);background:var(--sr);border-radius:var(--r4);border-left:2px solid var(--olive)}\n.callout__tag{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--tda);margin-bottom:var(--s4)}\n.callout__h{font-size:var(--xl);font-weight:600;color:var(--tp);margin-bottom:var(--s3);line-height:1.4}\n.callout__h .hl{color:var(--olive)}\n.callout__p{font-size:var(--base);color:var(--ts);line-height:1.8}\n.action{padding:var(--s8);border:1px solid var(--bd);border-radius:var(--r4)}\n.action__tag{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--tda);margin-bottom:var(--s4)}\n.action__list{display:flex;flex-direction:column;gap:var(--s3)}\n.act-item{display:flex;gap:var(--s3);align-items:flex-start}\n.act-item__dot{width:4px;height:4px;border-radius:50%;background:var(--olive);margin-top:8px;flex-shrink:0}\n.act-item__t{font-size:var(--sm);color:var(--ts);line-height:1.5}",
    html: "",
    hasJS: false
  },
  {
    id: 178,
    name: "Progress Trail",
    source: "haglofs-brand-analytics.html",
    category: "detail",
    css: ".ptrl{max-width:1120px;margin:0 auto;padding:var(--s8) var(--s8) var(--s3);display:flex;gap:var(--s2);align-items:center}\n.ptrl__d{width:6px;height:6px;border-radius:50%;background:var(--bd);transition:all var(--dn) var(--eo)}\n.ptrl__d.done{background:var(--tda)}\n.ptrl__d.cur{background:var(--olive);width:20px;border-radius:3px}\n.ptrl__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:var(--tda);margin-left:var(--s2)}",
    html: "<div class=\"ptrl\">\n  <span class=\"ptrl__d done\"></span><span class=\"ptrl__d done\"></span><span class=\"ptrl__d done\"></span>\n  <span class=\"ptrl__d done\"></span><span class=\"ptrl__d done\"></span><span class=\"ptrl__d done\"></span>\n  <span class=\"ptrl__d cur\"></span>\n  <span class=\"ptrl__lbl\">8/8 completed</span>\n</div>",
    hasJS: false
  },
  {
    id: 179,
    name: "Gallery Entrance (Heritage)",
    source: "haglofs-heritage-gallery.html",
    category: "hero",
    css: ".entrance{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;background:var(--bg);padding:var(--s8) var(--s8) var(--s20);position:relative;overflow:hidden}\n.entrance__bg{position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,var(--sr) 0%,transparent 100%);opacity:.5}\n.entrance__inner{max-width:1120px;margin:0 auto;width:100%;position:relative;z-index:2}\n.entrance__tag{font-family:var(--fm);font-size:var(--sm);letter-spacing:.15em;text-transform:uppercase;color:var(--tda);margin-bottom:var(--s10);display:flex;align-items:center;gap:var(--s4)}\n.entrance__tag::before{content:'';width:40px;height:1px;background:var(--bd)}\n.entrance__h{font-family:var(--fd);font-size:clamp(3rem,7vw,5.5rem);font-weight:400;line-height:1.02;letter-spacing:-.03em;color:var(--td);margin-bottom:var(--s4);max-width:800px}\n.entrance__h strong{font-weight:700}\n.entrance__sub{font-size:var(--xl);color:var(--ts);line-height:1.6;max-width:520px;margin-bottom:var(--s12)}\n.entrance__meta{display:flex;gap:var(--s12);font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:var(--tda);border-top:1px solid var(--bd);padding-top:var(--s6)}\n.entrance__seal{position:absolute;right:var(--s8);bottom:var(--s20);width:120px;height:120px;border:1px solid var(--bd);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:var(--sm);color:var(--tda);letter-spacing:.08em;text-align:center;line-height:1.4;transform:rotate(-6deg);opacity:.4}",
    html: "<section class=\"entrance\">\n  <div class=\"entrance__bg\"></div>\n  <div class=\"entrance__inner\">\n    <div class=\"entrance__tag\">Haglofs Heritage 1914 - 2026</div>\n    <h1 class=\"entrance__h\">111 years of<br><strong>craft, wild,</strong> and<br><strong>purpose.</strong></h1>\n    <p class=\"entrance__sub\">Description text</p>\n    <div class=\"entrance__meta\"><span>7 galleries</span><span>111 years</span></div>\n  </div>\n  <div class=\"entrance__seal\">EST<br>1914</div>\n</section>",
    hasJS: false
  },
  {
    id: 180,
    name: "Heritage Frieze (Timeline)",
    source: "haglofs-heritage-gallery.html",
    category: "section",
    css: ".frieze{background:var(--sf);padding-bottom:var(--s12)}\n.frieze__track{display:flex;gap:0;overflow-x:auto;padding:var(--s8) 0;margin-top:var(--s4);scrollbar-width:none;-ms-overflow-style:none}\n.frieze__track::-webkit-scrollbar{display:none}\n.frieze__item{flex-shrink:0;width:200px;padding:var(--s6) var(--s4);border-left:1px solid var(--bd);position:relative}\n.frieze__item:last-child{border-right:1px solid var(--bd)}\n.frieze__yr{font-family:var(--fm);font-size:var(--3xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:var(--td);margin-bottom:var(--s2)}\n.frieze__yr .hl{font-size:var(--base);color:var(--olive);letter-spacing:.06em}\n.frieze__ev{font-size:var(--sm);color:var(--ts);line-height:1.6}\n.frieze__dot{position:absolute;top:0;left:-3px;width:6px;height:6px;border-radius:50%;background:var(--olive)}",
    html: "<div class=\"frieze__track\">\n  <div class=\"frieze__item\"><div class=\"frieze__dot\"></div><div class=\"frieze__yr\">1914</div><div class=\"frieze__ev\">Event description</div></div>\n  <!-- More items -->\n</div>",
    hasJS: false
  },
  {
    id: 181,
    name: "Artifact Vitrine (Showcase Grid)",
    source: "haglofs-heritage-gallery.html",
    category: "section",
    css: ".vitrine{background:var(--sr)}\n.vitrine__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd);margin-top:var(--s8)}\n.art{background:var(--sf);padding:var(--s12) var(--s8);position:relative;overflow:hidden}\n.art::before{content:'';position:absolute;top:var(--s6);right:var(--s6);width:48px;height:48px;border:1px solid var(--bd);border-radius:50%;opacity:.3}\n.art__num{font-family:var(--fd);font-size:var(--4xl);font-weight:700;line-height:1;letter-spacing:-.03em;color:var(--td);opacity:.08;margin-bottom:var(--s8)}\n.art__icon{width:48px;height:48px;display:flex;align-items:center;justify-content:center;margin-bottom:var(--s6);font-size:var(--xl)}\n.art__name{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);text-transform:uppercase;letter-spacing:.04em;margin-bottom:var(--s2)}\n.art__desc{font-size:var(--base);line-height:1.7;color:var(--ts);margin-bottom:var(--s6)}\n.art__meta{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:var(--tda);padding-top:var(--s4);border-top:1px solid var(--bd)}",
    html: "",
    hasJS: false
  },
  {
    id: 182,
    name: "Spotlight (Dark Center)",
    source: "haglofs-heritage-gallery.html",
    category: "section",
    css: ".spotlight{background:var(--pk);color:#fff;text-align:center;position:relative;overflow:hidden}\n.spotlight::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60vmin;height:60vmin;border-radius:50%;background:radial-gradient(circle,rgba(74,93,58,.08) 0%,transparent 70%);pointer-events:none}\n.spotlight__inner{position:relative;z-index:2}\n.spotlight__glyph{width:120px;height:120px;margin:0 auto var(--s10);display:grid;grid-template-columns:repeat(5,1fr);gap:6px}\n.spotlight__glyph span{aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.06)}\n.spotlight__glyph span.on{background:rgba(255,255,255,.3)}\n.spotlight__glyph span.hl{background:var(--olive)}\n.spotlight__h{font-family:var(--fd);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:400;color:#fff;line-height:1.4;margin-bottom:var(--s6);max-width:560px;margin:0 auto var(--s6)}\n.spotlight__h em{font-style:italic;color:rgba(139,115,85,.7)}\n.spotlight__desc{font-size:var(--base);color:rgba(255,255,255,.35);line-height:1.8;max-width:480px;margin:0 auto}\n.spotlight__bar{width:40px;height:1px;background:rgba(255,255,255,.15);margin:var(--s8) auto 0}",
    html: "<section class=\"sec spotlight\">\n  <div class=\"sec--n spotlight__inner\">\n    <div class=\"spotlight__glyph\">\n      <span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span>\n      <!-- 5x7 dot grid for letter H -->\n    </div>\n    <p class=\"spotlight__h\">The <em>fifth element</em></p>\n    <p class=\"spotlight__desc\">Description</p>\n    <div class=\"spotlight__bar\"></div>\n  </div>\n</section>",
    hasJS: false
  },
  {
    id: 183,
    name: "Era Gallery (Time Periods)",
    source: "haglofs-heritage-gallery.html",
    category: "section",
    css: ".era{background:var(--bg)}\n.era__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);margin-top:var(--s8)}\n.er{padding:0;position:relative}\n.er__top{height:120px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:var(--s6);margin-bottom:0}\n.er__top--1{background:var(--sr)}\n.er__yr{font-family:var(--fd);font-size:var(--3xl);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--td);opacity:.1;position:absolute;bottom:var(--s2);right:var(--s4)}\n.er__tag{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--td);position:relative;z-index:2}\n.er__body{padding:var(--s6) 0}\n.er__h{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);margin-bottom:var(--s3);letter-spacing:.02em}\n.er__p{font-size:var(--base);color:var(--ts);line-height:1.7;margin-bottom:var(--s4)}\n.er__stat{font-family:var(--fm);font-size:var(--sm);color:var(--olive);font-weight:600}\n.er__line{width:100%;height:1px;background:var(--bd);margin-bottom:var(--s6)}",
    html: "",
    hasJS: false
  },
  {
    id: 184,
    name: "Exhibition Trail (Stepper)",
    source: "haglofs-heritage-gallery.html",
    category: "section",
    css: ".trail{background:var(--pk);color:#fff}\n.trail__path{display:flex;align-items:center;gap:0;margin-top:var(--s8);position:relative}\n.trail__stop{flex:1;text-align:center;position:relative;padding:var(--s6) var(--s2)}\n.trail__dot{width:12px;height:12px;border-radius:50%;border:2px solid rgba(255,255,255,.15);margin:0 auto var(--s3);transition:all var(--dn) var(--eo);position:relative;z-index:2}\n.trail__stop.vis .trail__dot{background:var(--olive);border-color:var(--olive)}\n.trail__stop.cur .trail__dot{background:var(--org);border-color:var(--org);width:16px;height:16px}\n.trail__lbl{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s1)}\n.trail__stop.vis .trail__lbl{color:rgba(255,255,255,.5)}\n.trail__stop.cur .trail__lbl{color:#fff}\n.trail__name{font-size:var(--sm);color:rgba(255,255,255,.35);line-height:1.4}\n.trail__line{position:absolute;top:calc(var(--s6) + 6px);left:0;right:0;height:2px;background:rgba(255,255,255,.06);z-index:1}",
    html: "",
    hasJS: false
  },
  {
    id: 185,
    name: "Terrain Curve (F1 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "hero",
    css: ".th{position:relative;min-height:50vh;display:flex;flex-direction:column;justify-content:flex-end;padding:var(--s12) 0 0}\n.th__sv{width:100%;height:200px;margin-bottom:var(--s8)}\n.th__sv svg{width:100%;height:100%}\n.th__sv path{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n.th__lb{display:flex;justify-content:space-between;font-family:var(--fm);font-size:var(--xs);color:rgba(255,255,255,.2);letter-spacing:.04em;text-transform:uppercase}\n.th__st{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s8);padding-top:var(--s8);border-top:1px solid rgba(255,255,255,.06)}\n.th__n{font-family:var(--fm);font-size:var(--4xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:#fff}\n.th__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.2)}",
    html: "",
    hasJS: false
  },
  {
    id: 186,
    name: "Dot Fill (F2 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "section",
    css: ".dg{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s6)}\n.dc{text-align:center;padding:var(--s8);background:var(--sf);border:1px solid var(--bd);border-radius:var(--r4);transition:border-color var(--df) var(--eo)}\n.dc:hover{border-color:var(--tda)}\n.dc__g{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;max-width:120px;margin:0 auto var(--s6)}\n.dc__g span{aspect-ratio:1;border-radius:50%;background:var(--bd)}\n.dc__g .on{background:var(--olive)}\n.dc__v{font-family:var(--fm);font-size:var(--5xl);font-weight:600;line-height:1;letter-spacing:-.03em;color:var(--td);margin-bottom:var(--s1)}\n.dc__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--tda)}",
    html: "<div class=\"dc\">\n  <div class=\"dc__g\">\n    <span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span>\n    <!-- 5x5 grid, filled dots = percentage -->\n  </div>\n  <div class=\"dc__v\">96%</div>\n  <div class=\"dc__l\">Adoption</div>\n</div>",
    hasJS: false
  },
  {
    id: 187,
    name: "Segmented Bar (F3 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "section",
    css: ".br{display:flex;flex-direction:column;gap:var(--s5)}\n.br-r{display:grid;grid-template-columns:120px 1fr 60px;gap:var(--s6);align-items:center}\n.br-r__l{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--tp);letter-spacing:.02em}\n.br-r__t{height:24px;background:var(--sr);border-radius:var(--r4);overflow:hidden;display:flex}\n.br-r__s{height:100%;transition:width .5s var(--eo)}\n.br-r__s--a{background:var(--olive)}.br-r__s--b{background:var(--earth)}.br-r__s--c{background:var(--glacier)}\n.br-r__v{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--td);text-align:right}",
    html: "<div class=\"br-r\">\n  <span class=\"br-r__l\">Materials</span>\n  <div class=\"br-r__t\"><div class=\"br-r__s br-r__s--a\" style=\"width:45%\"></div><div class=\"br-r__s br-r__s--b\" style=\"width:30%\"></div><div class=\"br-r__s br-r__s--c\" style=\"width:10%\"></div></div>\n  <span class=\"br-r__v\">85%</span>\n</div>",
    hasJS: false
  },
  {
    id: 188,
    name: "Metric Tower (F4 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "hero",
    css: ".mh{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s12);padding-top:var(--s8)}\n.mh-i{text-align:center}\n.mh-i__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:var(--s6)}\n.mh-i__n{font-family:var(--fm);font-size:clamp(3rem,6vw,5rem);font-weight:600;line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:var(--s4)}\n.mh-i__b{width:40px;height:100px;margin:0 auto var(--s4);background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden;position:relative}\n.mh-i__f{position:absolute;bottom:0;width:100%;border-radius:2px;transition:height 1s var(--eo)}\n.mh-i__c{font-size:var(--sm);color:rgba(255,255,255,.25)}",
    html: "<div class=\"mh-i\">\n  <div class=\"mh-i__l\">Brand Value</div>\n  <div class=\"mh-i__n\">82</div>\n  <div class=\"mh-i__b\"><div class=\"mh-i__f\" style=\"height:82%;background:var(--olive)\"></div></div>\n  <div class=\"mh-i__c\">Target: 90</div>\n</div>",
    hasJS: false
  },
  {
    id: 189,
    name: "Ring Progress (F5 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "section",
    css: ".rg{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s8)}\n.ri{text-align:center}\n.ri__sv{width:100px;height:100px;margin:0 auto var(--s4);position:relative}\n.ri__sv svg{width:100%;height:100%}\n.ri__sv circle{fill:none;stroke-width:6;transform:rotate(-90deg);transform-origin:50% 50%}\n.ri__sv .b{stroke:var(--bd)}\n.ri__sv .f{stroke:var(--olive);stroke-linecap:round;transition:stroke-dashoffset 1s var(--eo)}\n.ri__v{font-family:var(--fm);font-size:var(--lg);font-weight:600;color:var(--td);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}\n.ri__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.06em;text-transform:uppercase;color:var(--tda)}",
    html: "<div class=\"ri\">\n  <div class=\"ri__sv\">\n    <svg viewBox=\"0 0 100 100\">\n      <circle class=\"b\" r=\"40\" cx=\"50\" cy=\"50\"/>\n      <circle class=\"f\" r=\"40\" cx=\"50\" cy=\"50\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"50.2\"/>\n    </svg>\n    <div class=\"ri__v\">80%</div>\n  </div>\n  <div class=\"ri__l\">Completion</div>\n</div>",
    hasJS: false
  },
  {
    id: 190,
    name: "Network Node (F6 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "hero",
    css: ".nh{position:relative;min-height:40vh;display:flex;align-items:center;justify-content:center}\n.nh__sv{width:100%;height:250px}\n.nh__sv line{stroke:rgba(255,255,255,.06);stroke-width:1}\n.nh__sv circle{fill:rgba(255,255,255,.08)}\n.nh__sv .hl{fill:var(--olive)}\n.nh__sv .t{fill:rgba(255,255,255,.2);font-family:var(--fm);font-size:8px;text-transform:uppercase;letter-spacing:2px}",
    html: "",
    hasJS: false
  },
  {
    id: 191,
    name: "Comparison (F7 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "section",
    css: ".cg{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s8)}\n.cp{padding:var(--s8);border:1px solid var(--bd);border-radius:var(--r4)}\n.cp__l{font-family:var(--fm);font-size:var(--xs);letter-spacing:.08em;text-transform:uppercase;color:var(--tda);margin-bottom:var(--s6)}\n.cp__r{display:flex;justify-content:space-between;align-items:center;padding:var(--s3) 0;border-bottom:1px solid var(--bd);font-size:var(--sm)}\n.cp__r:last-child{border-bottom:none}\n.cp__k{color:var(--ts)}\n.cp__v{font-family:var(--fm);font-weight:600;color:var(--td)}\n.cp__v--a{color:var(--olive)}.cp__v--b{color:var(--earth)}",
    html: "",
    hasJS: false
  },
  {
    id: 192,
    name: "Mini Distribution (F8 Dataviz)",
    source: "haglofs-dataviz-forms.html",
    category: "section",
    css: ".mg8{display:grid;grid-template-columns:repeat(6,1fr);gap:var(--s8)}\n.mi{text-align:center}\n.mi__b{width:100%;height:40px;background:var(--sr);border-radius:2px;position:relative;overflow:hidden;margin-bottom:var(--s2)}\n.mi__f{position:absolute;bottom:0;width:100%;border-radius:2px}\n.mi__v{font-family:var(--fm);font-size:var(--sm);font-weight:600;color:var(--td)}\n.mi__l{font-family:var(--fm);font-size:var(--xs);color:var(--tda);letter-spacing:.06em;text-transform:uppercase}",
    html: "",
    hasJS: false
  },
  {
    id: 193,
    name: "Fold/Hinge (Uncovered)",
    source: "haglofs-uncovered-forms.html",
    category: "section",
    css: ".fd-panel{position:relative;overflow:hidden;min-height:340px;border:1px solid var(--bd);background:var(--sf);cursor:default;padding:32px;display:flex;flex-direction:column;justify-content:flex-end;transition:all 0.6s ease}\n.fd-fold{position:absolute;top:0;left:0;right:0;height:55%;transform-origin:bottom center;transition:transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);pointer-events:none}\n.fd-panel:hover .fd-fold{transform:rotateX(14deg)}\n.fd-index{font-family:var(--fm);font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--tda);margin-bottom:4px;position:relative;z-index:1}\n.fd-head{font-family:var(--fd);font-size:20px;font-weight:700;color:var(--pk);line-height:1.2;position:relative;z-index:1}\n.fd-body{font-size:12px;color:var(--ts);margin-top:4px;max-width:220px;position:relative;z-index:1;line-height:1.5}\n.fd-val{position:absolute;top:60%;right:32px;font-family:var(--fm);font-size:24px;font-weight:600;color:var(--pk);z-index:1;transition:all 0.4s ease}\n.fd-panel:hover .fd-val{color:var(--olive)}",
    html: "",
    hasJS: false
  },
  {
    id: 194,
    name: "Variant Atlas Hero",
    source: "haglofs-variant-atlas.html",
    category: "hero",
    css: ".hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px clamp(24px,5vw,80px);position:relative;overflow:hidden;background:#fff}\n.hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(#E8E8E8 1px,transparent 1px),linear-gradient(90deg,#E8E8E8 1px,transparent 1px);background-size:64px 64px;opacity:0.4}\n.hero-top{position:relative;z-index:1;margin-bottom:48px}\n.hero-overline{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#999;margin-bottom:12px}\n.hero-title{font-family:'Inter',sans-serif;font-size:clamp(48px,8vw,104px);font-weight:800;color:#1A1A1A;line-height:0.9;letter-spacing:-0.04em;margin-bottom:16px}\n.hero-title .accent{color:#D71921}\n.hero-sub{font-size:15px;color:#666;max-width:480px;line-height:1.65;margin-bottom:40px}\n.hero-badge-row{display:flex;gap:8px;flex-wrap:wrap;position:relative;z-index:1}\n.hero-badge{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#999;padding:6px 12px;border:1px solid #E8E8E8;background:#F5F5F5}\n.hero-badge.accent{color:#D71921;border-color:#D71921;background:rgba(215,25,33,0.04)}\n@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}",
    html: "",
    hasJS: false
  },
  {
    id: 195,
    name: "Hero Split (带 Brief)",
    source: "nian-with-brief.html",
    category: "hero",
    css: ".nameplate{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary-earth);margin-bottom:6px;display:flex;align-items:center;gap:10px}\n.nameplate::before{content:'';width:20px;height:1px;background:var(--primary-earth)}\n.seam{height:1px;background:var(--border);margin:24px 0}\n.hero-split{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-bottom:48px}\n.hero-split__left{padding-top:8px}\n.hero-split__title{font-family:Georgia,serif;font-size:clamp(28px,5vw,48px);font-weight:700;color:var(--text-display);line-height:1.1;letter-spacing:-0.02em;margin-bottom:16px}\n.hero-split__desc{font-size:15px;color:var(--text-secondary);line-height:1.7;max-width:440px}\n.hero-split__right{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:32px}\n.hero-split__big{font-family:Georgia,serif;font-size:72px;font-weight:700;color:var(--text-display);line-height:1;margin-bottom:4px}\n.hero-split__unit{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-disabled)}\n.hero-split__row{display:flex;gap:24px;margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}",
    html: "<div class=\"hero-split\">\n  <div class=\"hero-split__left\">\n    <div class=\"nameplate\">品牌前缀</div>\n    <h1 class=\"hero-split__title\">标题文字<br>换行展示</h1>\n    <p class=\"hero-split__desc\">描述性文字，控制在 440px 宽度以内。</p>\n  </div>\n  <div class=\"hero-split__right\">\n    <div class=\"hero-split__big\">3,340</div>\n    <div class=\"hero-split__unit\">单位标签</div>\n    <div class=\"hero-split__row\">\n      <div><div class=\"nameplate\" style=\"margin-bottom:4px\">标签A</div><div style=\"font-family:Georgia,serif;font-size:24px;font-weight:700\">值A</div></div>\n      <div><div class=\"nameplate\" style=\"margin-bottom:4px\">标签B</div><div style=\"font-family:Georgia,serif;font-size:24px;font-weight:700\">值B</div></div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 196,
    name: "Section Label",
    source: "nian-with-brief.html",
    category: "section",
    css: ".sec-label{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary-earth);margin-bottom:6px;display:flex;align-items:center;gap:10px}\n.sec-label::before{content:'';width:20px;height:1px;background:var(--primary-earth)}",
    html: "<div class=\"sec-label\">Section 01 · 标题</div>",
    hasJS: false
  },
  {
    id: 197,
    name: "SVG Gauge (弧形仪表盘)",
    source: "nian-with-brief.html",
    category: "chart",
    css: ".gauge-wrap{text-align:center;margin-bottom:24px}\n.gauge-wrap svg{display:block;margin:0 auto}\n.gauge-val{font-family:Georgia,serif;font-size:32px;font-weight:700;color:var(--text-display);margin-top:8px}\n.gauge-lbl{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-disabled);margin-top:2px}",
    html: "<div class=\"gauge-wrap\">\n  <svg width=\"200\" height=\"120\" viewBox=\"0 0 200 120\">\n    <path d=\"M 20 110 A 80 80 0 0 1 180 110\" fill=\"none\" stroke=\"var(--border)\" stroke-width=\"10\" stroke-linecap=\"square\"/>\n    <path id=\"g1\" d=\"M 20 110 A 80 80 0 0 1 180 110\" fill=\"none\" stroke=\"#4A5D3A\" stroke-width=\"10\" stroke-linecap=\"square\" stroke-dasharray=\"0 999\"/>\n  </svg>\n  <div class=\"gauge-val\">87<span style=\"font-size:16px;color:var(--text-secondary)\">/100</span></div>\n  <div class=\"gauge-lbl\">Overall Score</div>\n</div>",
    hasJS: false
  },
  {
    id: 198,
    name: "Segmented Bar (20-block)",
    source: "nian-with-brief.html",
    category: "chart",
    css: ".seg20{display:flex;gap:2px;height:12px}\n.seg20-b{flex:1;border-radius:1px}\n.seg20-b.on{background:var(--primary-olive)}\n.seg20-b.off{background:var(--border)}\n.seg20-b.warn{background:var(--accent-orange)}",
    html: "<div class=\"seg20\">\n  <div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b on\"></div><div class=\"seg20-b off\"></div><div class=\"seg20-b off\"></div><div class=\"seg20-b off\"></div><div class=\"seg20-b off\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 199,
    name: "LED Cards (4-col grid)",
    source: "nian-with-brief.html",
    category: "section",
    css: ".led-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}\n.led-card{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px;text-align:center}\n.led-card__ghost{font-family:Georgia,serif;font-size:48px;font-weight:700;color:var(--text-display);opacity:0.06;position:absolute;top:8px;right:12px;pointer-events:none}\n.led-card__label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px}\n.led-card__val{font-family:Georgia,serif;font-size:28px;font-weight:700;color:var(--text-display);line-height:1}\n.led-card__sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-secondary);margin-top:6px}",
    html: "<div class=\"led-grid\">\n  <div class=\"led-card\" style=\"position:relative\">\n    <div class=\"led-card__ghost\">01</div>\n    <div class=\"led-card__label\">Metric A</div>\n    <div class=\"led-card__val\">3,340</div>\n    <div class=\"led-card__sub\">+0.9%</div>\n  </div>\n  <div class=\"led-card\">\n    <div class=\"led-card__label\">Metric B</div>\n    <div class=\"led-card__val\" style=\"color:var(--primary-olive)\">+15.3%</div>\n    <div class=\"led-card__sub\">增长</div>\n  </div>\n  <div class=\"led-card\">\n    <div class=\"led-card__label\">Metric C</div>\n    <div class=\"led-card__val\">108</div>\n    <div class=\"led-card__sub\">站点数</div>\n  </div>\n  <div class=\"led-card\">\n    <div class=\"led-card__label\">Metric D</div>\n    <div class=\"led-card__val\" style=\"color:var(--accent-orange)\">1</div>\n    <div class=\"led-card__sub\">风险信号</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 200,
    name: "Data Table (状态点)",
    source: "nian-with-brief.html",
    category: "section",
    css: ".dtbl{width:100%;border-collapse:collapse}\n.dtbl th{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-disabled);text-align:left;padding:10px 12px;border-bottom:1px solid var(--border-visible)}\n.dtbl td{padding:10px 12px;border-bottom:1px solid var(--border);font-size:13px}\n.dtbl .dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:6px;vertical-align:middle}\n.dot-ok{background:var(--primary-olive)}.dot-warn{background:var(--accent-orange)}",
    html: "<table class=\"dtbl\">\n  <thead><tr><th>名称</th><th>数值</th><th>状态</th></tr></thead>\n  <tbody>\n    <tr><td>项目A</td><td>481</td><td><span class=\"dot dot-ok\"></span>正常</td></tr>\n    <tr><td>项目B</td><td>200</td><td><span class=\"dot dot-warn\"></span>预警</td></tr>\n  </tbody>\n</table>",
    hasJS: false
  },
  {
    id: 201,
    name: "Title Area (flat 标题)",
    source: "nian-without-brief.html",
    category: "hero",
    css: ".title-area{margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--border)}\n.title-area h1{font-family:Georgia,serif;font-size:28px;font-weight:700;color:var(--text-display);margin-bottom:8px}\n.title-area p{font-size:14px;color:var(--text-secondary)}",
    html: "<div class=\"title-area\">\n  <h1>标题文字</h1>\n  <p>描述段落</p>\n</div>",
    hasJS: false
  },
  {
    id: 202,
    name: "Summary Cards (3-col)",
    source: "nian-without-brief.html",
    category: "section",
    css: ".summary{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px}\n.s-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:20px}\n.s-card-l{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:6px}\n.s-card-v{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:600;color:var(--text-display)}\n.s-card-u{font-size:13px;font-weight:400;color:var(--text-secondary)}\n.s-card-c{margin-top:4px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--primary-olive)}",
    html: "<div class=\"summary\">\n  <div class=\"s-card\">\n    <div class=\"s-card-l\">标签</div>\n    <div class=\"s-card-v\">值<span class=\"s-card-u\">单位</span></div>\n    <div class=\"s-card-c\">变化</div>\n  </div>\n  <div class=\"s-card\">\n    <div class=\"s-card-l\">标签</div>\n    <div class=\"s-card-v\">值<span class=\"s-card-u\">%</span></div>\n    <div class=\"s-card-c\">+3.1pp</div>\n  </div>\n  <div class=\"s-card\">\n    <div class=\"s-card-l\">标签</div>\n    <div class=\"s-card-v\">+8.3<span class=\"s-card-u\">%</span></div>\n    <div class=\"s-card-c\">变化说明</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 203,
    name: "Detail Cards (4-col)",
    source: "nian-without-brief.html",
    category: "section",
    css: ".detail{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px}\n.d-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px}\n.d-card-l{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:4px}\n.d-card-v{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:var(--text-display)}\n.d-card-s{font-size:12px;color:var(--text-secondary);margin-top:4px}",
    html: "<div class=\"detail\">\n  <div class=\"d-card\"><div class=\"d-card-l\">标签A</div><div class=\"d-card-v\">值</div><div class=\"d-card-s\">说明</div></div>\n  <div class=\"d-card\"><div class=\"d-card-l\">标签B</div><div class=\"d-card-v\">值</div><div class=\"d-card-s\">说明</div></div>\n  <div class=\"d-card\"><div class=\"d-card-l\">标签C</div><div class=\"d-card-v\">值</div><div class=\"d-card-s\">说明</div></div>\n  <div class=\"d-card\"><div class=\"d-card-l\">标签D</div><div class=\"d-card-v\">值</div><div class=\"d-card-s\">说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 204,
    name: "Rank Cards with Mini Progress",
    source: "nian-without-brief.html",
    category: "section",
    css: ".rank-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}\n.r-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px}\n.r-card-n{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:var(--text-disabled);margin-bottom:4px}\n.r-card-name{font-size:15px;font-weight:600;color:var(--text-display);margin-bottom:2px}\n.r-card-val{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-secondary)}\n.r-card-bar{height:4px;background:var(--surface-raised);border-radius:2px;margin-top:8px;overflow:hidden}\n.r-card-fill{height:100%;background:var(--primary-olive);border-radius:2px}",
    html: "<div class=\"rank-grid\">\n  <div class=\"r-card\"><div class=\"r-card-n\">01</div><div class=\"r-card-name\">名称A</div><div class=\"r-card-val\">值 · 百分比</div><div class=\"r-card-bar\"><div class=\"r-card-fill\" style=\"width:100%\"></div></div></div>\n  <div class=\"r-card\"><div class=\"r-card-n\">02</div><div class=\"r-card-name\">名称B</div><div class=\"r-card-val\">值 · 百分比</div><div class=\"r-card-bar\"><div class=\"r-card-fill\" style=\"width:82%\"></div></div></div>\n  <div class=\"r-card\"><div class=\"r-card-n\">03</div><div class=\"r-card-name\">名称C</div><div class=\"r-card-val\">值 · 百分比</div><div class=\"r-card-bar\"><div class=\"r-card-fill\" style=\"width:68%\"></div></div></div>\n</div>",
    hasJS: false
  },
  {
    id: 205,
    name: "Notes List",
    source: "nian-without-brief.html",
    category: "section",
    css: ".notes ul{list-style:none}\n.notes li{padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-secondary)}\n.notes li:last-child{border-bottom:none}",
    html: "<div class=\"notes\">\n  <ul>\n    <li>备注事项一</li>\n    <li>备注事项二</li>\n    <li>备注事项三</li>\n  </ul>\n</div>",
    hasJS: false
  },
  {
    id: 206,
    name: "Dark Hero (grid background + 4 stats)",
    source: "2026-06-01-电销异常IP登录分析.html",
    category: "hero",
    css: ".hero-dark{background:var(--scene-glacier);padding:40px;position:relative;overflow:hidden;color:#fff}\n.hero-dark::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px)}\n.hero-dark__tag{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:12px}\n.hero-dark__title{font-family:Georgia,serif;font-size:32px;font-weight:700;line-height:1.2;margin-bottom:24px;position:relative}\n.hero-dark__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative}\n.hero-dark__stat-num{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;line-height:1}\n.hero-dark__stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:4px}",
    html: "<div class=\"hero-dark\">\n  <div class=\"hero-dark__tag\">前缀标签</div>\n  <h1 class=\"hero-dark__title\">标题文字</h1>\n  <div class=\"hero-dark__stats\">\n    <div><div class=\"hero-dark__stat-num\">1,247</div><div class=\"hero-dark__stat-label\">指标A</div></div>\n    <div><div class=\"hero-dark__stat-num\" style=\"color:var(--accent-yellow)\">89</div><div class=\"hero-dark__stat-label\">指标B</div></div>\n    <div><div class=\"hero-dark__stat-num\">7.1%</div><div class=\"hero-dark__stat-label\">指标C</div></div>\n    <div><div class=\"hero-dark__stat-num\">23</div><div class=\"hero-dark__stat-label\">指标D</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 207,
    name: "Section Header (维度+问题+方法)",
    source: "2026-06-01-电销异常IP登录分析.html",
    category: "section",
    css: ".sh{margin-bottom:24px}\n.sh__dim{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-earth);margin-bottom:6px}\n.sh__q{font-family:Georgia,serif;font-size:22px;font-weight:700;color:var(--text-display);margin-bottom:4px}\n.sh__m{font-size:13px;color:var(--text-secondary)}",
    html: "<div class=\"sh\">\n  <div class=\"sh__dim\">维度标签</div>\n  <h2 class=\"sh__q\">核心问题</h2>\n  <p class=\"sh__m\">方法说明文字</p>\n</div>",
    hasJS: false
  },
  {
    id: 208,
    name: "Metric Card Grid (含高亮变体)",
    source: "2026-06-01-电销异常IP登录分析.html",
    category: "section",
    css: ".mc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}\n.mc{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:16px}\n.mc--hl{border-color:var(--accent-orange);border-width:1px;border-style:solid}\n.mc__l{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:4px}\n.mc__v{font-family:Georgia,serif;font-size:24px;font-weight:700;color:var(--text-display);line-height:1}\n.mc__s{font-size:12px;color:var(--text-secondary);margin-top:4px}",
    html: "<div class=\"mc-grid\">\n  <div class=\"mc\"><div class=\"mc__l\">指标A</div><div class=\"mc__v\">值</div><div class=\"mc__s\">说明</div></div>\n  <div class=\"mc mc--hl\"><div class=\"mc__l\">异常指标</div><div class=\"mc__v\" style=\"color:var(--accent-orange)\">值</div><div class=\"mc__s\">异常说明</div></div>\n  <div class=\"mc\"><div class=\"mc__l\">指标C</div><div class=\"mc__v\">值</div><div class=\"mc__s\">说明</div></div>\n  <div class=\"mc\"><div class=\"mc__l\">指标D</div><div class=\"mc__v\">值</div><div class=\"mc__s\">说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 209,
    name: "Rank Bar (colored fills)",
    source: "2026-06-01-电销异常IP登录分析.html",
    category: "chart",
    css: ".rb{display:flex;flex-direction:column;gap:6px}\n.rb__row{display:flex;align-items:center;gap:8px}\n.rb__name{font-size:13px;font-weight:500;min-width:80px;color:var(--text-primary)}\n.rb__track{flex:1;height:6px;background:var(--surface-raised);border-radius:3px;overflow:hidden}\n.rb__fill{height:100%;border-radius:3px}\n.rb__val{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;min-width:40px;text-align:right}",
    html: "<div class=\"rb\">\n  <div class=\"rb__row\"><span class=\"rb__name\">名称A</span><div class=\"rb__track\"><div class=\"rb__fill\" style=\"width:90%;background:var(--primary-olive)\"></div></div><span class=\"rb__val\" style=\"color:var(--primary-olive)\">90%</span></div>\n  <div class=\"rb__row\"><span class=\"rb__name\">名称B</span><div class=\"rb__track\"><div class=\"rb__fill\" style=\"width:45%;background:var(--accent-orange)\"></div></div><span class=\"rb__val\" style=\"color:var(--accent-orange)\">45%</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 210,
    name: "Alert/Callout (left border)",
    source: "2026-06-01-电销异常IP登录分析.html",
    category: "section",
    css: ".callout-l{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent-orange);border-radius:0 6px 6px 0;padding:16px 20px;margin-bottom:16px}\n.callout-l__title{font-size:13px;font-weight:600;color:var(--text-display);margin-bottom:4px}\n.callout-l__text{font-size:13px;color:var(--text-secondary);line-height:1.6}",
    html: "<div class=\"callout-l\">\n  <div class=\"callout-l__title\">警示标题</div>\n  <div class=\"callout-l__text\">警示内容描述</div>\n</div>",
    hasJS: false
  },
  {
    id: 211,
    name: "Hero with Tag Prefix + Stats Row",
    source: "岐力职场-数据.html",
    category: "hero",
    css: ".hero-tags{font-family:var(--fm);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--tda);display:flex;align-items:center;gap:var(--s2);margin-bottom:var(--s5)}\n.hero-tags::before{content:'';width:20px;height:1px;background:var(--bd)}\n.hero__s{display:flex;gap:var(--s6);margin-top:var(--s5);padding-top:var(--s4);border-top:1px solid var(--bd)}\n.hero__n{font-family:var(--fm);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;line-height:1;letter-spacing:-.02em}\n.hero__l{margin-top:var(--s1)}",
    html: "<div class=\"hero\">\n  <div class=\"hero-tags\">前缀标签 · 分类</div>\n  <div class=\"h1\">大标题文字<br>第二行</div>\n  <div class=\"hero__s\">\n    <div><div class=\"hero__n\">37</div><div class=\"l hero__l\">统计项</div></div>\n    <div><div class=\"hero__n\" style=\"color:var(--org)\">2</div><div class=\"l hero__l\">统计项</div></div>\n    <div><div class=\"hero__n\">68<span style=\"font-size:1rem;color:var(--tda)\">%</span></div><div class=\"l hero__l\">统计项</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 212,
    name: "Metric Bar (4-col gap-1px + dark header)",
    source: "岐力职场-数据.html",
    category: "section",
    css: ".mb{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:var(--s7)}\n.mb__i{background:var(--sf);padding:var(--s4) var(--s3)}\n.mb__i--h{background:var(--glacier);color:#fff}\n.mb__i--h .l{color:rgba(255,255,255,.4)}\n.mb__v{font-family:var(--fm);font-size:clamp(1.25rem,2vw,1.75rem);font-weight:700;line-height:1;letter-spacing:-.02em;margin-top:var(--s1)}\n.mb__u{margin-top:var(--s1)}",
    html: "<div class=\"mb\">\n  <div class=\"mb__i mb__i--h\"><div class=\"l\">高亮指标</div><div class=\"mb__v\">值</div><div class=\"l mb__u\" style=\"color:rgba(255,255,255,.3)\">说明</div></div>\n  <div class=\"mb__i\"><div class=\"l\">指标B</div><div class=\"mb__v\">值</div><div class=\"l mb__u\">说明</div></div>\n  <div class=\"mb__i\"><div class=\"l\">指标C</div><div class=\"mb__v\" style=\"color:var(--org)\">值</div><div class=\"l mb__u\">说明</div></div>\n  <div class=\"mb__i\"><div class=\"l\">指标D</div><div class=\"mb__v\">值</div><div class=\"l mb__u\">说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 213,
    name: "Segment Bar (flex blocks)",
    source: "岐力职场-数据.html",
    category: "chart",
    css: ".sb{display:flex;gap:2px;height:20px;width:100%}\n.sb__s{background:var(--bd);flex:1}\n.sb__s.on{background:var(--td)}\n.sb__s.w{background:var(--org)}\n.sbr{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--s2)}\n.sbr__v{font-family:var(--fm);font-size:14px;font-weight:700}",
    html: "<div class=\"sbr\"><span class=\"lb\">标签</span><span class=\"sbr__v\">值</span></div>\n<div class=\"sb\">\n  <div class=\"sb__s on\" style=\"width:65%\"></div>\n  <div class=\"sb__s\" style=\"width:35%\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 214,
    name: "Rank (gap-1px grid)",
    source: "岐力职场-数据.html",
    category: "chart",
    css: ".rk{display:flex;flex-direction:column;gap:1px;background:var(--bd)}\n.rk__r{display:grid;grid-template-columns:24px 1fr 80px;gap:var(--s4);align-items:center;padding:var(--s2) var(--s3);background:var(--sf);font-size:14px;transition:background .15s}\n.rk__r:hover{background:var(--sr)}\n.rk__p{font-family:var(--fm);font-size:10px;color:var(--tda)}\n.rk__v{font-family:var(--fm);font-weight:700;text-align:right}\n.rk__b{height:3px;background:var(--bd);border-radius:2px;overflow:hidden;grid-column:2}\n.rk__f{height:100%;border-radius:2px}",
    html: "<div class=\"rk\">\n  <div class=\"rk__r\"><span class=\"rk__p\">#1</span><span>名称A</span><div class=\"rk__b\"><div class=\"rk__f\" style=\"width:100%;background:var(--glacier)\"></div></div><span class=\"rk__v\">729.2</span></div>\n  <div class=\"rk__r\"><span class=\"rk__p\">#2</span><span>名称B</span><div class=\"rk__b\"><div class=\"rk__f\" style=\"width:63%;background:var(--org)\"></div></div><span class=\"rk__v\">462.0</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 215,
    name: "Stat Pair (2-col split)",
    source: "岐力职场-数据.html",
    category: "section",
    css: ".sp{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--bd)}\n.sp__i{background:var(--sf);padding:var(--s4)}\n.sp__v{font-family:var(--fm);font-size:clamp(1.5rem,3vw,2rem);font-weight:700;line-height:1;letter-spacing:-.02em;margin-top:var(--s1)}",
    html: "<div class=\"sp\">\n  <div class=\"sp__i\"><div class=\"l\">标签A</div><div class=\"sp__v\" style=\"color:var(--org)\">2</div><div style=\"color:var(--ts);margin-top:4px\">说明</div></div>\n  <div class=\"sp__i\"><div class=\"l\">标签B</div><div class=\"sp__v\">35</div><div style=\"color:var(--ts);margin-top:4px\">说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 216,
    name: "Dot Strip (5px dots)",
    source: "岐力职场-数据.html",
    category: "chart",
    css: ".ds{display:flex;gap:3px;margin-top:var(--s4)}\n.ds span{width:5px;height:5px;border-radius:50%;background:var(--bd)}\n.ds .on{background:var(--td)}\n.ds .w{background:var(--org)}",
    html: "<div class=\"ds\">\n  <span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span class=\"on\"></span><span></span><span></span><span></span><span></span><span></span>\n</div>",
    hasJS: false
  },
  {
    id: 217,
    name: "Finding Card (left-border color variants)",
    source: "岐力职场-数据.html",
    category: "section",
    css: ".fc{padding:var(--s4) var(--s5);background:var(--sf);margin-bottom:var(--s4);border-left:2px solid}\n.fc--1{border-color:var(--glacier)}\n.fc--2{border-color:var(--org)}\n.fc__h{margin-bottom:var(--s2);line-height:1.35}\n.fc__p{line-height:1.7;max-width:520px}\n.fc__m{margin-top:var(--s4);display:flex;align-items:center;gap:var(--s2)}",
    html: "<div class=\"fc fc--1\">\n  <div class=\"lb\" style=\"color:var(--glacier);margin-bottom:8px\">发现一 · 标签</div>\n  <div class=\"fc__h\" style=\"font-weight:700\">发现标题</div>\n  <div class=\"fc__p\" style=\"color:var(--ts)\">发现描述</div>\n  <div class=\"fc__m\"><span class=\"l\" style=\"color:var(--tda)\">备注</span></div>\n</div>\n<div class=\"fc fc--2\">\n  <div class=\"lb\" style=\"color:var(--org);margin-bottom:8px\">发现二 · 标签</div>\n  <div class=\"fc__h\" style=\"font-weight:700\">发现标题</div>\n  <div class=\"fc__p\" style=\"color:var(--ts)\">发现描述</div>\n</div>",
    hasJS: false
  },
  {
    id: 218,
    name: "Outro Grid (border-top items)",
    source: "岐力职场-数据.html",
    category: "section",
    css: ".outro{max-width:600px;margin:0 auto;text-align:center}\n.outro__g{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s5);margin-top:var(--s5)}\n.outro__i{padding:var(--s4) 0;border-top:1px solid var(--bd)}\n.outro__n{font-family:var(--fm);font-size:14px;font-weight:700;margin-bottom:var(--s1)}",
    html: "<div class=\"outro\">\n  <div class=\"outro__g\">\n    <div class=\"outro__i\"><div class=\"outro__n\">行动A</div><div style=\"color:var(--ts)\">说明</div></div>\n    <div class=\"outro__i\"><div class=\"outro__n\">行动B</div><div style=\"color:var(--ts)\">说明</div></div>\n    <div class=\"outro__i\"><div class=\"outro__n\">行动C</div><div style=\"color:var(--ts)\">说明</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 219,
    name: "Split Hero (light + dark panels)",
    source: "岐力职场-绩效报告.html",
    category: "hero",
    css: ".hero-dual{display:grid;grid-template-columns:1fr 1fr;min-height:280px;border-radius:8px;overflow:hidden}\n.hero-dual__light{padding:40px;display:flex;flex-direction:column;justify-content:center}\n.hero-dual__dark{background:var(--scene-glacier);padding:40px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;color:#fff}\n.hero-dual__dark::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px)}",
    html: "<div class=\"hero-dual\">\n  <div class=\"hero-dual__light\">\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px\">前缀</div>\n    <h1 style=\"font-family:Georgia,serif;font-size:36px;font-weight:700;color:var(--text-display);line-height:1.15\">标题文字</h1>\n    <p style=\"font-size:14px;color:var(--text-secondary);margin-top:12px\">描述</p>\n  </div>\n  <div class=\"hero-dual__dark\">\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px;position:relative\">标签</div>\n    <div style=\"font-family:Georgia,serif;font-size:48px;font-weight:700;line-height:1;position:relative\">值</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 220,
    name: "Insight Cards (3-col with progress)",
    source: "岐力职场-绩效报告.html",
    category: "section",
    css: ".insight-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}\n.insight-card{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px}\n.insight-card__title{font-family:Georgia,serif;font-size:16px;font-weight:700;color:var(--text-display);margin-bottom:12px}\n.insight-card__bar{height:4px;background:var(--surface-raised);border-radius:2px;overflow:hidden;margin-top:8px}\n.insight-card__fill{height:100%;border-radius:2px}",
    html: "<div class=\"insight-grid\">\n  <div class=\"insight-card\">\n    <div class=\"insight-card__title\">指标A</div>\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700\">值</div>\n    <div class=\"insight-card__bar\"><div class=\"insight-card__fill\" style=\"width:85%;background:var(--primary-olive)\"></div></div>\n  </div>\n  <div class=\"insight-card\">\n    <div class=\"insight-card__title\">指标B</div>\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;color:var(--accent-orange)\">值</div>\n    <div class=\"insight-card__bar\"><div class=\"insight-card__fill\" style=\"width:45%;background:var(--accent-orange)\"></div></div>\n  </div>\n  <div class=\"insight-card\">\n    <div class=\"insight-card__title\">指标C</div>\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700\">值</div>\n    <div class=\"insight-card__bar\"><div class=\"insight-card__fill\" style=\"width:70%;background:var(--primary-earth)\"></div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 221,
    name: "Bar Chart (labeled horizontal bars)",
    source: "岐力职场-绩效报告.html",
    category: "chart",
    css: ".hbar{display:flex;flex-direction:column;gap:12px}\n.hbar__row{display:flex;align-items:center;gap:12px}\n.hbar__label{font-size:13px;min-width:80px;color:var(--text-primary)}\n.hbar__track{flex:1;height:8px;background:var(--surface-raised);border-radius:4px;overflow:hidden}\n.hbar__fill{height:100%;border-radius:4px}\n.hbar__val{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;min-width:50px;text-align:right}",
    html: "<div class=\"hbar\">\n  <div class=\"hbar__row\"><span class=\"hbar__label\">项目A</span><div class=\"hbar__track\"><div class=\"hbar__fill\" style=\"width:90%;background:var(--primary-olive)\"></div></div><span class=\"hbar__val\" style=\"color:var(--primary-olive)\">90%</span></div>\n  <div class=\"hbar__row\"><span class=\"hbar__label\">项目B</span><div class=\"hbar__track\"><div class=\"hbar__fill\" style=\"width:60%;background:var(--primary-earth)\"></div></div><span class=\"hbar__val\" style=\"color:var(--primary-earth)\">60%</span></div>\n  <div class=\"hbar__row\"><span class=\"hbar__label\">项目C</span><div class=\"hbar__track\"><div class=\"hbar__fill\" style=\"width:35%;background:var(--accent-orange)\"></div></div><span class=\"hbar__val\" style=\"color:var(--accent-orange)\">35%</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 222,
    name: "Thesis Banner (centered dark block)",
    source: "岐力职场-绩效诊断.html",
    category: "hero",
    css: ".thesis{background:var(--scene-glacier);padding:40px;text-align:center;position:relative;overflow:hidden;border-radius:8px;color:#fff}\n.thesis::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.04) 19px,rgba(255,255,255,.04) 20px)}\n.thesis__title{font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:1.3;position:relative}",
    html: "<div class=\"thesis\">\n  <div style=\"font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:12px;position:relative\">诊断标题</div>\n  <div class=\"thesis__title\">核心论断文字</div>\n</div>",
    hasJS: false
  },
  {
    id: 223,
    name: "Distribution Bar (3-col labeled segments)",
    source: "岐力职场-绩效诊断.html",
    category: "chart",
    css: ".dist-bar{display:flex;height:24px;border-radius:4px;overflow:hidden}\n.dist-bar__seg{display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:#fff}",
    html: "<div class=\"dist-bar\">\n  <div class=\"dist-bar__seg\" style=\"flex:40%;background:var(--primary-olive)\">40%</div>\n  <div class=\"dist-bar__seg\" style=\"flex:35%;background:var(--primary-earth)\">35%</div>\n  <div class=\"dist-bar__seg\" style=\"flex:25%;background:var(--accent-orange)\">25%</div>\n</div>",
    hasJS: false
  },
  {
    id: 224,
    name: "Compare Grid (side-by-side columns)",
    source: "岐力职场-绩效诊断.html",
    category: "section",
    css: ".cmp{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border);border-radius:6px;overflow:hidden}\n.cmp__col{background:var(--surface);padding:20px}\n.cmp__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:12px}",
    html: "<div class=\"cmp\">\n  <div class=\"cmp__col\"><div class=\"cmp__label\">方案A</div><div>内容</div></div>\n  <div class=\"cmp__col\"><div class=\"cmp__label\">方案B</div><div>内容</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 225,
    name: "Diagnosis Card (left-bordered)",
    source: "岐力职场-绩效诊断.html",
    category: "section",
    css: ".diag{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--primary-earth);border-radius:0 6px 6px 0;padding:16px 20px;margin-bottom:12px}\n.diag__title{font-size:14px;font-weight:600;color:var(--text-display);margin-bottom:4px}\n.diag__text{font-size:13px;color:var(--text-secondary);line-height:1.6}",
    html: "<div class=\"diag\">\n  <div class=\"diag__title\">诊断标题</div>\n  <div class=\"diag__text\">诊断描述</div>\n</div>",
    hasJS: false
  },
  {
    id: 226,
    name: "Full-height Hero (diagonal clip-path + ghost year)",
    source: "供应商分量策略与方法论.html",
    category: "hero",
    css: ".hero-full{min-height:80vh;display:flex;flex-direction:column;justify-content:flex-end;position:relative;padding:64px;overflow:hidden;clip-path:polygon(0 0,100% 0,100% 88%,0 100%);background:linear-gradient(135deg,var(--primary-olive) 0%,var(--scene-glacier) 100%);color:#fff}\n.hero-full__ghost{position:absolute;top:20%;right:-40px;font-family:Georgia,serif;font-size:200px;font-weight:400;opacity:.06;line-height:1;pointer-events:none}\n.hero-full__tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}\n.hero-full__title{font-family:Georgia,serif;font-size:clamp(32px,5vw,56px);font-weight:700;line-height:1.1;letter-spacing:-.02em;margin-bottom:12px}\n.hero-full__sub{font-size:15px;color:rgba(255,255,255,.7);max-width:520px;line-height:1.6}",
    html: "<div class=\"hero-full\">\n  <div class=\"hero-full__ghost\">2026</div>\n  <div class=\"hero-full__tag\">前缀标签</div>\n  <h1 class=\"hero-full__title\">大标题文字<br>第二行</h1>\n  <p class=\"hero-full__sub\">副标题描述</p>\n</div>",
    hasJS: false
  },
  {
    id: 227,
    name: "Flow Pipeline (stage + arrow)",
    source: "供应商分量策略与方法论.html, 2026-05-31-#004-racing-rules.html, core-components.html",
    category: "section",
    css: ".flow{display:flex;align-items:center;gap:0;padding:8px 0;flex-wrap:wrap}\n.flow-stage{display:flex;flex-direction:column;gap:2px;padding:6px 12px}\n.flow-label{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled)}\n.flow-val{font-size:13px;color:var(--text-secondary)}\n.flow-stage.active .flow-val{color:var(--text-display);font-weight:600}\n.flow-stage.done .flow-val{color:var(--primary-olive)}\n.flow-stage.blocked .flow-val{color:var(--accent-orange)}\n.flow-arrow{font-size:16px;color:var(--text-disabled);padding:0 2px}",
    html: "<div class=\"flow\">\n  <div class=\"flow-stage done\"><span class=\"flow-label\">Stage 1</span><span class=\"flow-val\">阶段一</span></div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage active\"><span class=\"flow-label\">Stage 2</span><span class=\"flow-val\">阶段二</span></div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage blocked\"><span class=\"flow-label\">Stage 3</span><span class=\"flow-val\">阶段三</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 228,
    name: "Compare Grid (carrot vs stick)",
    source: "供应商分量策略与方法论.html",
    category: "section",
    css: ".compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}\n.compare-col{border:1px solid var(--border);border-radius:6px;padding:16px}\n.compare-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)}\n.compare-marker{font-size:14px}\n.compare-col.avoid .compare-marker{color:var(--accent-orange)}\n.compare-col.prefer .compare-marker{color:var(--primary-olive)}\n.compare-title{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary)}\n.compare-row{display:flex;align-items:flex-start;gap:8px;padding:6px 0;font-size:12px;color:var(--text-primary);line-height:1.5}\n.compare-row .ci{font-size:10px;flex-shrink:0;padding-top:3px}\n.compare-col.avoid .ci{color:var(--accent-orange)}\n.compare-col.prefer .ci{color:var(--primary-olive)}",
    html: "<div class=\"compare-grid\">\n  <div class=\"compare-col avoid\">\n    <div class=\"compare-header\"><span class=\"compare-marker\">x</span><span class=\"compare-title\">AVOID</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">x</span><span>避免的做法</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">x</span><span>另一条避免</span></div>\n  </div>\n  <div class=\"compare-col prefer\">\n    <div class=\"compare-header\"><span class=\"compare-marker\">+</span><span class=\"compare-title\">PREFER</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">+</span><span>推荐的做法</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">+</span><span>另一条推荐</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 229,
    name: "Principle Card (left-bordered)",
    source: "供应商分量策略与方法论.html",
    category: "section",
    css: ".principle-card{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--primary-earth);border-radius:0 8px 8px 0;padding:20px 24px}\n.principle-card__title{font-family:Georgia,serif;font-size:16px;font-weight:700;color:var(--text-display);margin-bottom:12px}\n.principle-card__text{font-size:13px;color:var(--text-secondary);line-height:1.7}",
    html: "<div class=\"principle-card\">\n  <div class=\"principle-card__title\">原则标题</div>\n  <div class=\"principle-card__text\">原则描述内容</div>\n</div>",
    hasJS: false
  },
  {
    id: 230,
    name: "Data Card (stat blocks + segmented bar)",
    source: "2026-05-31-#004-racing-rules.html",
    category: "section",
    css: ".data-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:24px}\n.data-card__header{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px}\n.data-card__stats{display:flex;gap:24px;margin-bottom:16px}\n.data-card__stat-val{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;line-height:1;color:var(--text-display)}\n.data-card__stat-label{font-size:12px;color:var(--text-secondary);margin-top:4px}",
    html: "<div class=\"data-card\">\n  <div class=\"data-card__header\">数据卡片标题</div>\n  <div class=\"data-card__stats\">\n    <div><div class=\"data-card__stat-val\" style=\"color:var(--primary-olive)\">60%</div><div class=\"data-card__stat-label\">标签A</div></div>\n    <div><div class=\"data-card__stat-val\" style=\"color:var(--accent-orange)\">40%</div><div class=\"data-card__stat-label\">标签B</div></div>\n  </div>\n  <div style=\"display:flex;gap:3px;height:14px\">\n    <div style=\"flex:6;background:var(--primary-olive)\"></div><div style=\"flex:4;background:var(--accent-orange)\"></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 231,
    name: "Comparison Block (old/new)",
    source: "core-components.html, 2026-05-31-#004-racing-rules.html",
    category: "section",
    css: ".comparison{display:flex;flex-direction:column;gap:0}\n.comparison-block{padding:14px 18px}\n.comparison-block--old{background:var(--surface-raised);border-left:3px solid var(--primary-earth)}\n.comparison-block--new{background:#f0f4ec;border-left:3px solid var(--primary-olive)}\n.comparison-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;display:inline-block;padding:2px 8px;border-radius:3px}\n.comparison-label--old{color:var(--primary-earth);background:rgba(139,115,85,0.1)}\n.comparison-label--new{color:#fff;background:var(--primary-olive)}\n.comparison-text{font-size:13px;line-height:1.6;margin:0}\n.comparison-text--old{color:var(--primary-earth)}\n.comparison-text--new{color:var(--primary-olive);font-weight:600}\n.comparison-divider{height:1px;background:var(--border);margin:0}",
    html: "<div class=\"comparison\">\n  <div class=\"comparison-block comparison-block--old\">\n    <span class=\"comparison-label comparison-label--old\">旧规则</span>\n    <p class=\"comparison-text comparison-text--old\">旧规则描述</p>\n  </div>\n  <div class=\"comparison-divider\"></div>\n  <div class=\"comparison-block comparison-block--new\">\n    <span class=\"comparison-label comparison-label--new\">新规则</span>\n    <p class=\"comparison-text comparison-text--new\">新规则描述</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 232,
    name: "Tab System (JS-powered)",
    source: "2026-05-31-#004-racing-rules.html, core-components.html",
    category: "section",
    css: ".tab-panel{border:1px solid var(--border);border-radius:6px;overflow:hidden}\n.tp-bar{display:flex;gap:0;border-bottom:1px solid var(--border)}\n.tp-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;padding:10px 18px;border:none;background:transparent;color:var(--text-disabled);cursor:pointer;position:relative;transition:color 150ms ease-out;text-transform:uppercase}\n.tp-btn:hover{color:var(--text-secondary)}\n.tp-btn.tp-active{color:var(--text-display)}\n.tp-btn.tp-active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--text-display)}\n.tp-content{padding:18px}",
    html: "<div class=\"tab-panel\">\n  <div class=\"tp-bar\">\n    <button class=\"tp-btn tp-active\" data-tab=\"tab1\">Tab 1</button>\n    <button class=\"tp-btn\" data-tab=\"tab2\">Tab 2</button>\n    <button class=\"tp-btn\" data-tab=\"tab3\">Tab 3</button>\n  </div>\n  <div class=\"tp-content\" id=\"tab1\">内容一</div>\n  <div class=\"tp-content\" id=\"tab2\" style=\"display:none\">内容二</div>\n  <div class=\"tp-content\" id=\"tab3\" style=\"display:none\">内容三</div>\n</div>",
    hasJS: true
  },
  {
    id: 233,
    name: "Timeline (vertical with nodes)",
    source: "2026-05-31-#004-racing-rules.html",
    category: "section",
    css: ".tl{position:relative;padding-left:32px}\n.tl::before{content:'';position:absolute;left:11px;top:0;bottom:0;width:1px;background:var(--border)}\n.tl-item{position:relative;margin-bottom:32px}\n.tl-item:last-child{margin-bottom:0}\n.tl-dot{position:absolute;left:-32px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid var(--border);background:var(--surface)}\n.tl-item.active .tl-dot{border-color:var(--primary-olive);background:var(--primary-olive)}\n.tl-item.warn .tl-dot{border-color:var(--accent-orange);background:var(--accent-orange)}\n.tl-date{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-disabled);margin-bottom:4px}\n.tl-title{font-size:14px;font-weight:600;color:var(--text-display);margin-bottom:4px}\n.tl-desc{font-size:13px;color:var(--text-secondary);line-height:1.6}",
    html: "<div class=\"tl\">\n  <div class=\"tl-item active\">\n    <div class=\"tl-dot\"></div>\n    <div class=\"tl-date\">2026-01</div>\n    <div class=\"tl-title\">事件A</div>\n    <div class=\"tl-desc\">事件描述</div>\n  </div>\n  <div class=\"tl-item\">\n    <div class=\"tl-dot\"></div>\n    <div class=\"tl-date\">2026-03</div>\n    <div class=\"tl-title\">事件B</div>\n    <div class=\"tl-desc\">事件描述</div>\n  </div>\n  <div class=\"tl-item warn\">\n    <div class=\"tl-dot\"></div>\n    <div class=\"tl-date\">2026-05</div>\n    <div class=\"tl-title\">事件C</div>\n    <div class=\"tl-desc\">事件描述</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 234,
    name: "Scoring Grid (4-col cards)",
    source: "2026-05-31-#004-racing-rules.html",
    category: "section",
    css: ".score-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}\n.score-card{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:16px;text-align:center}\n.score-card__val{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;color:var(--text-display);line-height:1}\n.score-card__label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-top:6px}\n.score-card__desc{font-size:11px;color:var(--text-secondary);margin-top:4px;line-height:1.4}",
    html: "<div class=\"score-grid\">\n  <div class=\"score-card\"><div class=\"score-card__val\" style=\"color:var(--primary-olive)\">40%</div><div class=\"score-card__label\">维度A</div><div class=\"score-card__desc\">说明</div></div>\n  <div class=\"score-card\"><div class=\"score-card__val\" style=\"color:var(--primary-earth)\">30%</div><div class=\"score-card__label\">维度B</div><div class=\"score-card__desc\">说明</div></div>\n  <div class=\"score-card\"><div class=\"score-card__val\" style=\"color:var(--accent-orange)\">20%</div><div class=\"score-card__label\">维度C</div><div class=\"score-card__desc\">说明</div></div>\n  <div class=\"score-card\"><div class=\"score-card__val\">10%</div><div class=\"score-card__label\">维度D</div><div class=\"score-card__desc\">说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 235,
    name: "Formula Block",
    source: "2026-05-31-#004-racing-rules.html",
    category: "section",
    css: ".formula{background:var(--surface-raised);border:1px solid var(--border);border-left:3px solid var(--primary-olive);border-radius:2px;padding:16px 20px;font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary)}",
    html: "<div class=\"formula\">总分 = 维度A x 40% + 维度B x 30% + 维度C x 20% + 维度D x 10%</div>",
    hasJS: false
  },
  {
    id: 236,
    name: "Hero Split (content + dark dot-pattern panel)",
    source: "scenario-brand-read-analyze.html",
    category: "hero",
    css: ".hero-reading{display:grid;grid-template-columns:1.4fr 1fr;min-height:380px;border-radius:8px;overflow:hidden}\n.hero-reading__main{padding:48px;display:flex;flex-direction:column;justify-content:center}\n.hero-reading__side{background:var(--scene-glacier);position:relative;display:flex;align-items:center;justify-content:center}\n.hero-reading__side::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.05) 19px,rgba(255,255,255,.05) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.05) 19px,rgba(255,255,255,.05) 20px)}",
    html: "<div class=\"hero-reading\">\n  <div class=\"hero-reading__main\">\n    <div style=\"font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:12px\">标签</div>\n    <h1 style=\"font-family:Georgia,serif;font-size:40px;font-weight:700;line-height:1.1;color:var(--text-display);margin-bottom:16px\">标题</h1>\n    <p style=\"font-size:15px;color:var(--text-secondary);line-height:1.7\">描述</p>\n  </div>\n  <div class=\"hero-reading__side\">\n    <div style=\"position:relative;font-family:Georgia,serif;font-size:48px;font-weight:700;color:rgba(255,255,255,.15)\">Aa</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 237,
    name: "Preamble (dropcap + rule line)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".preamble{max-width:640px}\n.preamble::first-letter{font-family:Georgia,serif;font-size:3.2em;float:left;line-height:.8;margin-right:8px;margin-top:4px;color:var(--text-display)}\n.preamble::after{content:'';display:block;width:60px;height:1px;background:var(--border);margin-top:24px}",
    html: "<div class=\"preamble\" style=\"font-size:16px;color:var(--text-primary);line-height:1.8\">\n  首字母放大的段落文字。后续文字正常排列。\n</div>",
    hasJS: false
  },
  {
    id: 238,
    name: "Data Matrix (dark bg, 4-col metric grid)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".data-matrix{background:var(--scene-glacier);border-radius:8px;padding:32px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;color:#fff}\n.data-matrix__val{font-family:Georgia,serif;font-size:32px;font-weight:700;line-height:1}\n.data-matrix__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:6px}",
    html: "<div class=\"data-matrix\">\n  <div><div class=\"data-matrix__val\">87</div><div class=\"data-matrix__label\">指标A</div></div>\n  <div><div class=\"data-matrix__val\" style=\"color:var(--accent-yellow)\">62%</div><div class=\"data-matrix__label\">指标B</div></div>\n  <div><div class=\"data-matrix__val\">1.8x</div><div class=\"data-matrix__label\">指标C</div></div>\n  <div><div class=\"data-matrix__val\">15</div><div class=\"data-matrix__label\">指标D</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 239,
    name: "Deep Read (3:1.2 layout with margin notes)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".deep-read{display:grid;grid-template-columns:3fr 1.2fr;gap:32px;align-items:start}\n.deep-read__main{font-size:15px;line-height:1.8;color:var(--text-primary)}\n.deep-read__note{border-left:2px solid var(--primary-earth);padding-left:16px}\n.deep-read__note-title{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--primary-earth);margin-bottom:8px}\n.deep-read__note-text{font-size:12px;color:var(--text-secondary);line-height:1.6}",
    html: "<div class=\"deep-read\">\n  <div class=\"deep-read__main\">正文内容区域</div>\n  <div class=\"deep-read__note\">\n    <div class=\"deep-read__note-title\">批注标签</div>\n    <div class=\"deep-read__note-text\">侧边批注内容</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 240,
    name: "Float Quote (display font + attribution)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".float-quote{font-family:Georgia,serif;font-size:24px;font-style:italic;line-height:1.5;color:var(--text-display);border-left:3px solid var(--primary-olive);padding-left:24px;margin:32px 0;max-width:560px}\n.float-quote cite{display:block;margin-top:12px;font-family:'JetBrains Mono',monospace;font-size:11px;font-style:normal;letter-spacing:.06em;text-transform:uppercase;color:var(--text-disabled)}",
    html: "<blockquote class=\"float-quote\">\n  引用文字内容\n  <cite>出处 · 时间</cite>\n</blockquote>",
    hasJS: false
  },
  {
    id: 241,
    name: "Annotated Highlights (hover tooltips)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".anno{position:relative;border-bottom:2px solid var(--accent-orange);cursor:help}\n.anno__tip{display:none;position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:var(--text-display);color:var(--bg);padding:8px 12px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:11px;white-space:nowrap;margin-bottom:8px;z-index:10}\n.anno:hover .anno__tip{display:block}",
    html: "<span class=\"anno\">高亮文字<span class=\"anno__tip\">注解提示</span></span>",
    hasJS: false
  },
  {
    id: 242,
    name: "Key Terms (2-col cards)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".kt-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n.kt-card{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:16px}\n.kt-card__term{font-family:Georgia,serif;font-size:16px;font-weight:700;color:var(--text-display);margin-bottom:4px}\n.kt-card__def{font-size:13px;color:var(--text-secondary);line-height:1.5}",
    html: "<div class=\"kt-grid\">\n  <div class=\"kt-card\"><div class=\"kt-card__term\">术语A</div><div class=\"kt-card__def\">定义说明</div></div>\n  <div class=\"kt-card\"><div class=\"kt-card__term\">术语B</div><div class=\"kt-card__def\">定义说明</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 243,
    name: "Quote Array (3-col)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".quote-array{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}\n.quote-item{border-left:3px solid var(--primary-olive);padding-left:16px}\n.quote-item__text{font-family:Georgia,serif;font-size:15px;font-style:italic;color:var(--text-primary);line-height:1.5;margin-bottom:8px}\n.quote-item__src{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-disabled);letter-spacing:.04em}",
    html: "<div class=\"quote-array\">\n  <div class=\"quote-item\"><div class=\"quote-item__text\">引用A</div><div class=\"quote-item__src\">出处A</div></div>\n  <div class=\"quote-item\"><div class=\"quote-item__text\">引用B</div><div class=\"quote-item__src\">出处B</div></div>\n  <div class=\"quote-item\"><div class=\"quote-item__text\">引用C</div><div class=\"quote-item__src\">出处C</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 244,
    name: "Summary Capsule (big number + numbered items)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".capsule{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:24px}\n.capsule__big{font-family:Georgia,serif;font-size:48px;font-weight:700;color:var(--primary-olive);line-height:1;margin-bottom:4px}\n.capsule__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px}\n.capsule__list{list-style:none;counter-reset:cap}\n.capsule__list li{counter-increment:cap;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-primary)}\n.capsule__list li::before{content:counter(cap) \".\";font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-disabled);margin-right:8px}",
    html: "<div class=\"capsule\">\n  <div class=\"capsule__big\">87%</div>\n  <div class=\"capsule__label\">总评分</div>\n  <ul class=\"capsule__list\">\n    <li>要点一</li>\n    <li>要点二</li>\n    <li>要点三</li>\n  </ul>\n</div>",
    hasJS: false
  },
  {
    id: 245,
    name: "Chapter Index (dark bg, 3-col + progress dots)",
    source: "scenario-brand-read-analyze.html",
    category: "section",
    css: ".ch-index{background:var(--text-display);border-radius:8px;padding:32px;color:#fff}\n.ch-index__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:16px}\n.ch-index__item{padding:16px 0;border-top:1px solid rgba(255,255,255,.1)}\n.ch-index__num{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.4);letter-spacing:.08em;text-transform:uppercase}\n.ch-index__title{font-family:Georgia,serif;font-size:16px;font-weight:700;margin-top:4px}",
    html: "<div class=\"ch-index\">\n  <div style=\"font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)\">目录索引</div>\n  <div class=\"ch-index__grid\">\n    <div class=\"ch-index__item\"><div class=\"ch-index__num\">01</div><div class=\"ch-index__title\">章节A</div></div>\n    <div class=\"ch-index__item\"><div class=\"ch-index__num\">02</div><div class=\"ch-index__title\">章节B</div></div>\n    <div class=\"ch-index__item\"><div class=\"ch-index__num\">03</div><div class=\"ch-index__title\">章节C</div></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 246,
    name: "Sticky Tabs (scrollable tab navigation)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".sticky-tabs{position:sticky;top:0;z-index:100;background:var(--bg);border-bottom:1px solid var(--border);display:flex;gap:0;overflow-x:auto;-webkit-overflow-scrolling:touch}\n.sticky-tabs::-webkit-scrollbar{display:none}\n.tab-btn{flex-shrink:0;padding:12px 20px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--text-disabled);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all .15s}\n.tab-btn:hover{color:var(--text-primary)}\n.tab-btn.active{color:var(--text-display);border-bottom-color:var(--primary-olive)}\n.tab-panel{display:none;padding:32px 0}\n.tab-panel.active{display:block}",
    html: "<div class=\"sticky-tabs\">\n  <button class=\"tab-btn active\" data-tab=\"overview\">总览</button>\n  <button class=\"tab-btn\" data-tab=\"detail\">细节</button>\n  <button class=\"tab-btn\" data-tab=\"compare\">对比</button>\n</div>\n<div class=\"tab-panel active\" id=\"panel-overview\">面板内容</div>\n<div class=\"tab-panel\" id=\"panel-detail\">面板内容</div>\n<div class=\"tab-panel\" id=\"panel-compare\">面板内容</div>",
    hasJS: false
  },
  {
    id: 247,
    name: "Story Flow (numbered narrative steps)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".story-flow{position:relative;padding-left:32px}\n.story-flow::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:var(--border)}\n.story-step{position:relative;margin-bottom:32px}\n.story-step::before{content:attr(data-step);position:absolute;left:-32px;top:0;width:16px;height:16px;border-radius:50%;background:var(--primary-olive);color:#fff;font-family:'JetBrains Mono',monospace;font-size:9px;display:flex;align-items:center;justify-content:center}\n.story-step__title{font-family:Georgia,serif;font-size:18px;font-weight:700;color:var(--text-display);margin-bottom:8px}\n.story-step__body{font-size:14px;color:var(--text-secondary);line-height:1.7}",
    html: "<div class=\"story-flow\">\n  <div class=\"story-step\" data-step=\"1\">\n    <div class=\"story-step__title\">第一步标题</div>\n    <div class=\"story-step__body\">描述内容</div>\n  </div>\n  <div class=\"story-step\" data-step=\"2\">\n    <div class=\"story-step__title\">第二步标题</div>\n    <div class=\"story-step__body\">描述内容</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 248,
    name: "Split Compare (side-by-side with divider)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".split-cmp{display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch}\n.split-cmp__side{padding:24px;background:var(--surface);border:1px solid var(--border)}\n.split-cmp__divider{width:1px;background:var(--border-visible);position:relative}\n.split-cmp__divider::after{content:'VS';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg);padding:4px 8px;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;letter-spacing:.1em;color:var(--text-disabled)}\n.split-cmp__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px}\n.split-cmp__val{font-family:Georgia,serif;font-size:28px;font-weight:700;color:var(--text-display)}",
    html: "<div class=\"split-cmp\">\n  <div class=\"split-cmp__side\">\n    <div class=\"split-cmp__label\">方案 A</div>\n    <div class=\"split-cmp__val\">选项A</div>\n  </div>\n  <div class=\"split-cmp__divider\"></div>\n  <div class=\"split-cmp__side\">\n    <div class=\"split-cmp__label\">方案 B</div>\n    <div class=\"split-cmp__val\">选项B</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 249,
    name: "Brief Builder (configurable option cards)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".brief-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}\n.brief-opt{background:var(--surface);border:2px solid var(--border);border-radius:8px;padding:16px;cursor:pointer;transition:all .15s}\n.brief-opt:hover{border-color:var(--border-visible)}\n.brief-opt.selected{border-color:var(--primary-olive);background:rgba(74,93,58,.04)}\n.brief-opt__icon{font-size:24px;margin-bottom:8px}\n.brief-opt__name{font-family:Georgia,serif;font-size:14px;font-weight:700;color:var(--text-display)}\n.brief-opt__desc{font-size:12px;color:var(--text-secondary);margin-top:4px;line-height:1.4}",
    html: "<div class=\"brief-grid\">\n  <div class=\"brief-opt selected\">\n    <div class=\"brief-opt__icon\">A</div>\n    <div class=\"brief-opt__name\">选项一</div>\n    <div class=\"brief-opt__desc\">描述文字</div>\n  </div>\n  <div class=\"brief-opt\">\n    <div class=\"brief-opt__icon\">B</div>\n    <div class=\"brief-opt__name\">选项二</div>\n    <div class=\"brief-opt__desc\">描述文字</div>\n  </div>\n  <div class=\"brief-opt\">\n    <div class=\"brief-opt__icon\">C</div>\n    <div class=\"brief-opt__name\">选项三</div>\n    <div class=\"brief-opt__desc\">描述文字</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 250,
    name: "Decision Chain (flow arrow connectors)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".dec-chain{display:flex;align-items:center;gap:0;flex-wrap:wrap}\n.dec-node{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 20px;text-align:center}\n.dec-node__q{font-family:Georgia,serif;font-size:14px;font-weight:700;color:var(--text-display)}\n.dec-node__a{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--primary-olive);margin-top:4px}\n.dec-arrow{width:40px;height:2px;background:var(--border-visible);position:relative;flex-shrink:0}\n.dec-arrow::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);border:5px solid transparent;border-left-color:var(--border-visible)}",
    html: "<div class=\"dec-chain\">\n  <div class=\"dec-node\"><div class=\"dec-node__q\">条件A?</div><div class=\"dec-node__a\">是</div></div>\n  <div class=\"dec-arrow\"></div>\n  <div class=\"dec-node\"><div class=\"dec-node__q\">条件B?</div><div class=\"dec-node__a\">否</div></div>\n  <div class=\"dec-arrow\"></div>\n  <div class=\"dec-node\"><div class=\"dec-node__q\">结论</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 251,
    name: "Concrete Example (inset card with code-style body)",
    source: "nian-ia-deep-dive.html",
    category: "section",
    css: ".concrete{background:var(--surface-raised);border:1px solid var(--border);border-radius:8px;padding:24px;margin:16px 0}\n.concrete__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--primary-earth);margin-bottom:12px}\n.concrete__title{font-family:Georgia,serif;font-size:18px;font-weight:700;color:var(--text-display);margin-bottom:8px}\n.concrete__body{font-size:14px;color:var(--text-primary);line-height:1.7}\n.concrete__result{margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--primary-olive)}",
    html: "<div class=\"concrete\">\n  <div class=\"concrete__label\">实例</div>\n  <div class=\"concrete__title\">场景标题</div>\n  <div class=\"concrete__body\">具体描述内容</div>\n  <div class=\"concrete__result\">结果 = 值</div>\n</div>",
    hasJS: false
  },
  {
    id: 252,
    name: "Product Card (image + specs)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".product-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden}\n.product-card__image{aspect-ratio:4/3;background:var(--surface-raised);display:flex;align-items:center;justify-content:center}\n.product-card__body{padding:14px 16px;display:flex;flex-direction:column;gap:6px}\n.product-name{font-family:Georgia,serif;font-size:16px;font-weight:700;color:var(--text-display)}\n.product-card__specs{display:flex;gap:16px;padding-top:8px;border-top:1px solid var(--border)}\n.sl{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary)}\n.sv{font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:var(--text-primary)}",
    html: "<div class=\"product-card\">\n  <div class=\"product-card__image\"><span style=\"font-family:Georgia,serif;font-size:32px;font-weight:700;color:var(--text-disabled);opacity:.3\">IMG</span></div>\n  <div class=\"product-card__body\">\n    <div class=\"product-name\">产品名称</div>\n    <div style=\"font-size:12px;color:var(--text-secondary)\">简短描述</div>\n    <div class=\"product-card__specs\">\n      <div><span class=\"sl\">规格A</span><div class=\"sv\">值</div></div>\n      <div><span class=\"sl\">规格B</span><div class=\"sv\">值</div></div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 253,
    name: "Brand Statement (centered display)",
    source: "2026-05-31-component-showcase.html",
    category: "hero",
    css: ".brand-card{padding:48px 24px;text-align:center;max-width:640px;margin:0 auto}\n.brand-card__label{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px}\n.brand-stmt{font-family:Georgia,serif;font-size:36px;font-weight:700;color:var(--text-display);line-height:1.15;margin-bottom:8px}\n.brand-card__sub{font-size:16px;color:var(--text-secondary);font-style:italic}",
    html: "<div class=\"brand-card\">\n  <div class=\"brand-card__label\">标签</div>\n  <div class=\"brand-stmt\">核心品牌宣言</div>\n  <div class=\"brand-card__sub\">副标题</div>\n</div>",
    hasJS: false
  },
  {
    id: 254,
    name: "Spec Table (key-value rows)",
    source: "2026-05-31-component-showcase.html",
    category: "detail",
    css: ".spec-table{display:flex;flex-direction:column}\n.spec-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}\n.spec-row:last-child{border-bottom:none}",
    html: "<div class=\"spec-table\">\n  <div class=\"spec-row\"><span class=\"sl\">指标A</span><span class=\"sv\">值</span></div>\n  <div class=\"spec-row\"><span class=\"sl\">指标B</span><span class=\"sv\" style=\"color:var(--primary-olive)\">+15%</span></div>\n  <div class=\"spec-row\"><span class=\"sl\">指标C</span><span class=\"sv\">值</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 255,
    name: "Color Swatch Card",
    source: "2026-05-31-component-showcase.html",
    category: "detail",
    css: ".swatch-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden}\n.swatch-card__color{height:80px;display:flex;align-items:flex-end;padding:8px}\n.swatch-card__token{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;padding:2px 6px;border-radius:2px;background:rgba(255,255,255,.15);color:#fff}\n.swatch-card__info{padding:10px 14px}\n.swatch-card__name{font-weight:600;font-size:12px;margin-bottom:2px}\n.swatch-card__desc{font-size:11px;color:var(--text-secondary);margin-bottom:4px}\n.swatch-card__hex{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-disabled)}",
    html: "<div class=\"swatch-card\">\n  <div class=\"swatch-card__color\" style=\"background:#4A5D3A\"><span class=\"swatch-card__token\">--primary-olive</span></div>\n  <div class=\"swatch-card__info\">\n    <div class=\"swatch-card__name\">Olive</div>\n    <div class=\"swatch-card__desc\">品牌主色</div>\n    <div class=\"swatch-card__hex\">#4A5D3A</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 256,
    name: "Dot Matrix Logo (5x7 grid)",
    source: "2026-05-31-component-showcase.html",
    category: "decorative",
    css: ".dm-logo{display:inline-grid;grid-template-columns:repeat(5,var(--dot-size,8px));grid-template-rows:repeat(7,var(--dot-size,8px));gap:var(--dot-gap,3px)}\n.dm-logo[data-size=\"sm\"]{--dot-size:4px;--dot-gap:2px}\n.dm-logo[data-size=\"md\"]{--dot-size:8px;--dot-gap:3px}\n.dm-logo[data-size=\"lg\"]{--dot-size:12px;--dot-gap:4px}\n.dm-logo[data-size=\"xl\"]{--dot-size:16px;--dot-gap:5px}\n.dm-logo .dot{width:var(--dot-size,8px);height:var(--dot-size,8px);border-radius:50%;background:var(--text-display)}\n.dm-logo .dot.empty{background:transparent}\n.dm-logo .dot.accent{background:var(--accent-orange)}",
    html: "<div class=\"dm-logo\" data-size=\"md\">\n  <div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot empty\"></div><div class=\"dot\"></div>\n  <div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 257,
    name: "Dot Pattern Background (random dots)",
    source: "2026-05-31-component-showcase.html",
    category: "decorative",
    css: ".dot-pattern{display:grid;grid-template-columns:repeat(auto-fill,8px);grid-auto-rows:8px;gap:4px;opacity:.4}\n.dot-pattern .dp{width:8px;height:8px;border-radius:50%;background:var(--primary-olive)}\n.dot-pattern .dp.off{background:transparent}",
    html: "<div class=\"dot-pattern\">\n  <div class=\"dp\"></div><div class=\"dp off\"></div><div class=\"dp\"></div><div class=\"dp\"></div><div class=\"dp off\"></div>\n  <div class=\"dp off\"></div><div class=\"dp\"></div><div class=\"dp\"></div><div class=\"dp off\"></div><div class=\"dp\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 258,
    name: "Gauge Arc (SVG semicircle)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".gauge-item{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:24px;text-align:center}\n.gauge-item svg{display:block;margin:0 auto 12px}\n.gauge-value{font-family:Georgia,serif;font-size:32px;font-weight:700;color:var(--text-display);line-height:1}\n.gauge-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary);margin-top:4px}\n.gauge-status{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:.06em;margin-top:8px;padding:3px 8px;border-radius:3px;display:inline-block}\n.gauge-status.ok{color:var(--primary-olive);background:rgba(74,93,58,.08)}\n.gauge-status.warn{color:var(--accent-orange);background:rgba(229,91,43,.08)}",
    html: "<div class=\"gauge-item\">\n  <svg width=\"180\" height=\"110\" viewBox=\"0 0 180 110\">\n    <path d=\"M 15 100 A 75 75 0 0 1 165 100\" fill=\"none\" stroke=\"var(--border)\" stroke-width=\"10\" stroke-linecap=\"square\"/>\n    <path d=\"M 15 100 A 75 75 0 0 1 165 100\" fill=\"none\" stroke=\"#4A5D3A\" stroke-width=\"10\" stroke-linecap=\"square\" stroke-dasharray=\"212 236\"/>\n  </svg>\n  <div class=\"gauge-value\">87<span style=\"font-size:14px;color:var(--text-secondary)\">%</span></div>\n  <div class=\"gauge-label\">Metric</div>\n  <div class=\"gauge-status ok\">EXCELLENT</div>\n</div>",
    hasJS: false
  },
  {
    id: 259,
    name: "Quadrant Chart (SVG scatter with axis)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".quad-demo{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px;position:relative}\n.quad-demo svg{width:100%;display:block}",
    html: "<!-- JS-generated. Static placeholder: -->\n<div class=\"quad-demo\">\n  <svg viewBox=\"0 0 480 280\" preserveAspectRatio=\"xMidYMid meet\">\n    <line x1=\"96\" y1=\"24\" x2=\"96\" y2=\"248\" stroke=\"var(--border)\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n    <line x1=\"48\" y1=\"144\" x2=\"456\" y2=\"144\" stroke=\"var(--border)\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n    <circle cx=\"200\" cy=\"80\" r=\"20\" fill=\"rgba(74,93,58,0.15)\" stroke=\"#4A5D3A\" stroke-width=\"1.5\"/>\n    <text x=\"200\" y=\"83\" text-anchor=\"middle\" font-family=\"JetBrains Mono,monospace\" font-size=\"8\" font-weight=\"600\" fill=\"#4A5D3A\">毅航</text>\n    <circle cx=\"140\" cy=\"200\" r=\"14\" fill=\"rgba(229,91,43,0.12)\" stroke=\"#E55B2B\" stroke-width=\"1.5\"/>\n    <text x=\"140\" y=\"203\" text-anchor=\"middle\" font-family=\"JetBrains Mono,monospace\" font-size=\"8\" font-weight=\"600\" fill=\"#E55B2B\">速讯达</text>\n  </svg>\n</div>",
    hasJS: false
  },
  {
    id: 260,
    name: "Segmented LED Bar (20-block meter)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".seg-led{display:flex;gap:2px;height:12px}\n.seg-led-block{flex:1;border-radius:1px;transition:background 150ms ease-out}\n.seg-led-block.filled{background:var(--primary-olive)}\n.seg-led-block.empty{background:var(--border)}\n.seg-led-block.warn{background:var(--accent-orange)}\n.seg-led-block.good{background:var(--success)}",
    html: "<div style=\"display:flex;justify-content:space-between;margin-bottom:6px\"><span class=\"sl\">标签</span><span style=\"font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:var(--primary-olive)\">85%</span></div>\n<div class=\"seg-led\">\n  <div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block filled\"></div><div class=\"seg-led-block empty\"></div><div class=\"seg-led-block empty\"></div><div class=\"seg-led-block empty\"></div><div class=\"seg-led-block empty\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 261,
    name: "Stat Block + Seg Bar + Legend",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".stat-row{display:flex;gap:24px;margin-bottom:12px}\n.stat-block{display:flex;flex-direction:column;align-items:flex-start}\n.stat-value{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:28px;line-height:1;color:var(--text-display)}\n.stat-value--olive{color:var(--primary-olive)}\n.stat-value--orange{color:var(--accent-orange)}\n.kpi-card__label{font-size:12px;color:var(--text-secondary);margin-top:4px}\n.seg-bar{display:flex;gap:3px;margin-bottom:8px}\n.seg-block{height:14px;flex:1}\n.seg-block--olive{background:var(--primary-olive)}\n.seg-block--orange{background:var(--accent-orange)}\n.legend{display:flex;gap:16px;flex-wrap:wrap}\n.legend-item{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)}\n.legend-dot{width:8px;height:8px;flex-shrink:0;border-radius:2px}",
    html: "<div class=\"stat-row\">\n  <div class=\"stat-block\"><span class=\"stat-value stat-value--olive\">60%</span><span class=\"kpi-card__label\">类别A</span></div>\n  <div class=\"stat-block\"><span class=\"stat-value stat-value--orange\">40%</span><span class=\"kpi-card__label\">类别B</span></div>\n</div>\n<div class=\"seg-bar\">\n  <div class=\"seg-block seg-block--olive\"></div><div class=\"seg-block seg-block--olive\"></div><div class=\"seg-block seg-block--olive\"></div><div class=\"seg-block seg-block--orange\"></div><div class=\"seg-block seg-block--orange\"></div>\n</div>\n<div class=\"legend\">\n  <span class=\"legend-item\"><span class=\"legend-dot\" style=\"background:var(--primary-olive)\"></span>类别A 60%</span>\n  <span class=\"legend-item\"><span class=\"legend-dot\" style=\"background:var(--accent-orange)\"></span>类别B 40%</span>\n</div>",
    hasJS: false
  },
  {
    id: 262,
    name: "Comparison Block (old vs new)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".comparison{display:flex;flex-direction:column;gap:0}\n.comparison-block{padding:14px 18px}\n.comparison-block--old{background:var(--surface-raised);border-left:3px solid var(--primary-earth)}\n.comparison-block--new{background:#f0f4ec;border-left:3px solid var(--primary-olive)}\n.comparison-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;display:inline-block;padding:2px 8px;border-radius:3px}\n.comparison-label--old{color:var(--primary-earth);background:rgba(139,115,85,.1)}\n.comparison-label--new{color:#fff;background:var(--primary-olive)}\n.comparison-text{font-size:13px;line-height:1.6;margin:0}\n.comparison-text--old{color:var(--primary-earth)}\n.comparison-text--new{color:var(--primary-olive);font-weight:600}\n.comparison-divider{height:1px;background:var(--border);margin:0}",
    html: "<div class=\"comparison\">\n  <div class=\"comparison-block comparison-block--old\">\n    <span class=\"comparison-label comparison-label--old\">旧规则</span>\n    <p class=\"comparison-text comparison-text--old\">旧规则描述</p>\n  </div>\n  <div class=\"comparison-divider\"></div>\n  <div class=\"comparison-block comparison-block--new\">\n    <span class=\"comparison-label comparison-label--new\">新规则</span>\n    <p class=\"comparison-text comparison-text--new\">新规则描述</p>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 263,
    name: "Inline Bar (label + track + value)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".inline-bar{display:flex;align-items:center;gap:8px}\n.inline-bar__track{flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden}\n.inline-bar__fill{height:100%;background:var(--primary-olive);border-radius:2px}",
    html: "<div class=\"inline-bar\">\n  <span class=\"sl\" style=\"min-width:80px\">指标</span>\n  <div class=\"inline-bar__track\"><div class=\"inline-bar__fill\" style=\"width:75%\"></div></div>\n  <span class=\"sv\">值</span>\n</div>",
    hasJS: false
  },
  {
    id: 264,
    name: "Progress Bar (multi-segment)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".progress-bar{display:flex;height:8px;border-radius:4px;overflow:hidden}",
    html: "<div class=\"progress-bar\">\n  <div style=\"width:60%;background:var(--primary-olive)\"></div>\n  <div style=\"width:25%;background:var(--primary-earth)\"></div>\n  <div style=\"width:15%;background:var(--accent-orange)\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 265,
    name: "Waterfall Bar (diverging horizontal)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".wf-row{display:grid;grid-template-columns:120px 1fr 52px 60px;gap:8px;align-items:center;padding:4px 0;border-bottom:1px solid var(--border)}\n.wf-row:last-child{border-bottom:none}\n.wf-name{font-size:10px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.wf-name.up{color:var(--primary-olive)}.wf-name.down{color:var(--accent-orange)}\n.wf-track{height:5px;background:var(--surface-raised);border-radius:3px;overflow:hidden}\n.wf-fill{height:100%;border-radius:3px}\n.wf-pct{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;text-align:right}\n.wf-pct.up{color:var(--primary-olive)}.wf-pct.down{color:var(--accent-orange)}",
    html: "<!-- JS-generated. Static example: -->\n<div class=\"wf-row\">\n  <div class=\"wf-name down\">站点A</div>\n  <div class=\"wf-track\"><div class=\"wf-fill\" style=\"width:53%;background:var(--accent-orange)\"></div></div>\n  <div class=\"wf-pct down\">-53%</div>\n  <div class=\"wf-num\">-53%</div>\n</div>\n<div class=\"wf-row\">\n  <div class=\"wf-name up\">站点B</div>\n  <div class=\"wf-track\"><div class=\"wf-fill\" style=\"width:33%;background:var(--primary-olive);margin-left:auto\"></div></div>\n  <div class=\"wf-pct up\">+33%</div>\n  <div class=\"wf-num\">+33%</div>\n</div>",
    hasJS: false
  },
  {
    id: 266,
    name: "Insight Bar (judgment prefix + text)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".insight{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--primary-earth);border-radius:0 6px 6px 0;padding:14px 18px;display:flex;gap:12px;align-items:flex-start}\n.insight-icon{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-earth);padding-top:3px;white-space:nowrap}\n.insight p{font-size:13px;color:var(--text-primary);line-height:1.7}\n.insight strong{font-weight:600;color:var(--text-display)}",
    html: "<div class=\"insight\">\n  <div class=\"insight-icon\">Signal</div>\n  <p>判断结论文字。<strong>关键数据</strong>支持论点。</p>\n</div>",
    hasJS: false
  },
  {
    id: 267,
    name: "Alert Box (system signal with metric grid)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".alert{background:var(--surface);border:1px solid var(--border);border-radius:6px;overflow:hidden}\n.alert-head{padding:12px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border)}\n.alert-dot{width:6px;height:6px;border-radius:50%;background:var(--accent-orange)}\n.alert-head h3{font-size:13px;font-weight:600;color:var(--text-primary)}\n.alert-badge{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:.04em;color:var(--accent-orange);background:rgba(229,91,43,.07);padding:3px 8px;border-radius:3px}\n.alert-body{padding:14px 16px}",
    html: "<div class=\"alert\">\n  <div class=\"alert-head\">\n    <div style=\"display:flex;align-items:center;gap:10px\"><div class=\"alert-dot\"></div><h3>预警标题</h3></div>\n    <div class=\"alert-badge\">值变化</div>\n  </div>\n  <div class=\"alert-body\">\n    <div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:24px\">\n      <div><label class=\"sl\">指标A</label><div style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700\">值</div></div>\n      <div><label class=\"sl\">指标B</label><div style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--accent-orange)\">值</div></div>\n      <div><label class=\"sl\">指标C</label><div style=\"font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700\">值</div></div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 268,
    name: "Data Density Pattern (Heavy/Medium/Light 3-layer)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".density-grid{display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start}\n.density-heavy{position:relative;padding-bottom:24px}\n.density-heavy .deco{position:absolute;top:-24px;left:-12px;font-family:Georgia,serif;font-size:80px;font-weight:700;color:var(--text-display);opacity:.05;line-height:1;pointer-events:none}\n.density-big-metric{font-family:Georgia,serif;font-size:80px;font-weight:700;color:var(--text-display);line-height:1}\n.density-big-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-secondary);margin-top:8px}\n.density-seam{height:1px;background:var(--border);margin:20px 0}\n.density-medium{margin-top:20px}\n.density-light{margin-top:20px}",
    html: "<div class=\"density-grid\">\n  <div>\n    <div class=\"density-heavy\">\n      <div class=\"deco\">01</div>\n      <span class=\"tag\" style=\"margin-bottom:16px;display:inline-flex\">HEAVY ANCHOR</span>\n      <div class=\"density-big-metric\">3,340<span style=\"font-size:32px;color:var(--text-secondary)\">人</span></div>\n      <div class=\"density-big-label\">在册人力总量</div>\n    </div>\n    <div class=\"density-seam\"></div>\n    <div class=\"density-medium\">\n      <span class=\"tag\" style=\"margin-bottom:12px;display:inline-flex\">MEDIUM VIZ</span>\n      <!-- 分段条形图 -->\n    </div>\n    <div class=\"density-seam\"></div>\n    <div class=\"density-light\">\n      <span class=\"tag\" style=\"margin-bottom:12px;display:inline-flex\">LIGHT DATA</span>\n      <div class=\"spec-table\">\n        <div class=\"spec-row\"><span class=\"sl\">指标1</span><span class=\"sv\">值</span></div>\n        <div class=\"spec-row\"><span class=\"sl\">指标2</span><span class=\"sv\">值</span></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"density-explain\"><p>说明文字</p></div>\n</div>",
    hasJS: false
  },
  {
    id: 269,
    name: "Metrics Row (4-col 1px-gap grid)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".metrics-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:6px;overflow:hidden}\n.metric{background:var(--surface);padding:16px}\n.metric .ml{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:3px}\n.metric .mv{font-family:Georgia,serif;font-size:22px;font-weight:700;color:var(--text-display);line-height:1}\n.metric .ms{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;margin-top:3px}\n.ms.up{color:var(--primary-olive)}.ms.down{color:var(--accent-orange)}.ms.flat{color:var(--text-secondary)}",
    html: "<div class=\"metrics-row\">\n  <div class=\"metric\"><div class=\"ml\">指标A</div><div class=\"mv\">481</div><div class=\"ms up\">+15.3%</div></div>\n  <div class=\"metric\"><div class=\"ml\">指标B</div><div class=\"mv\">350</div><div class=\"ms flat\">+1.8%</div></div>\n  <div class=\"metric\"><div class=\"ml\">指标C</div><div class=\"mv\">7</div><div class=\"ms up\">+2</div></div>\n  <div class=\"metric\"><div class=\"ml\">指标D</div><div class=\"mv\" style=\"color:var(--accent-orange)\">-28%</div><div class=\"ms down\">收缩</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 270,
    name: "Decorative Number Header",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".deco-header{position:relative;padding:28px 20px 20px;overflow:hidden;border:1px solid var(--border);border-radius:6px}\n.deco-num{position:absolute;top:-16px;right:-8px;font-family:Georgia,serif;font-size:100px;font-weight:700;color:var(--text-display);opacity:.05;line-height:1;pointer-events:none;user-select:none}\n.deco-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled);display:block;margin-bottom:4px}\n.deco-title{font-family:Georgia,serif;font-size:20px;font-weight:700;color:var(--text-display);line-height:1.3}",
    html: "<div class=\"deco-header\">\n  <span class=\"deco-num\">01</span>\n  <span class=\"deco-label\">Section Label</span>\n  <h2 class=\"deco-title\">章节标题</h2>\n</div>",
    hasJS: false
  },
  {
    id: 271,
    name: "Button (4 variants)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".btn{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:10px 22px;border-radius:999px;cursor:pointer;transition:all 150ms ease-out;display:inline-block;text-decoration:none}\n.btn-primary{background:var(--text-display);color:var(--bg);border:none}\n.btn-primary:hover{opacity:.85}\n.btn-secondary{background:transparent;color:var(--text-primary);border:1px solid var(--border-visible)}\n.btn-secondary:hover{border-color:var(--text-primary)}\n.btn-ghost{background:transparent;color:var(--text-secondary);border:none;padding:10px 12px}\n.btn-ghost:hover{color:var(--text-primary)}\n.btn-accent{background:transparent;color:var(--accent-orange);border:1px solid var(--accent-orange);border-radius:999px}\n.btn-accent:hover{background:rgba(229,91,43,.08)}",
    html: "<div style=\"display:flex;gap:10px;flex-wrap:wrap;align-items:center\">\n  <button class=\"btn btn-primary\">Primary</button>\n  <button class=\"btn btn-secondary\">Secondary</button>\n  <button class=\"btn btn-ghost\">Ghost</button>\n  <button class=\"btn btn-accent\">Accent</button>\n</div>",
    hasJS: false
  },
  {
    id: 272,
    name: "Input (label + underline + error state)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".input-wrap{display:flex;flex-direction:column;gap:4px}\n.input-wrap label{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)}\n.input-wrap input{border:none;border-bottom:1px solid var(--border-visible);padding:8px 0;font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);background:transparent;outline:none;transition:border-color 150ms ease-out}\n.input-wrap input:focus{border-color:var(--primary-olive)}\n.input-wrap input.input-error{border-color:var(--error)}\n.input-wrap .input-msg{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--error);letter-spacing:.02em}",
    html: "<div class=\"input-wrap\">\n  <label>字段标签</label>\n  <input type=\"text\" placeholder=\"输入内容\">\n</div>",
    hasJS: false
  },
  {
    id: 273,
    name: "Segmented Control (pill selector)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".seg-ctrl{display:inline-flex;border:1px solid var(--border-visible);border-radius:6px;overflow:hidden}\n.seg-btn{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:8px 16px;background:transparent;border:none;color:var(--text-secondary);cursor:pointer;transition:all 150ms ease-out}\n.seg-btn:hover{color:var(--text-primary)}\n.seg-btn.seg-active{background:var(--text-display);color:var(--bg)}",
    html: "<div class=\"seg-ctrl\">\n  <button class=\"seg-btn seg-active\">选项A</button>\n  <button class=\"seg-btn\">选项B</button>\n  <button class=\"seg-btn\">选项C</button>\n</div>",
    hasJS: false
  },
  {
    id: 274,
    name: "Tab Panel (content switcher)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".tab-panel{border:1px solid var(--border);border-radius:6px;overflow:hidden}\n.tp-bar{display:flex;gap:0;border-bottom:1px solid var(--border)}\n.tp-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;padding:10px 18px;border:none;background:transparent;color:var(--text-disabled);cursor:pointer;position:relative;transition:color 150ms ease-out;text-transform:uppercase}\n.tp-btn:hover{color:var(--text-secondary)}\n.tp-btn.tp-active{color:var(--text-display)}\n.tp-btn.tp-active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--text-display)}\n.tp-content{padding:18px}",
    html: "<div class=\"tab-panel\">\n  <div class=\"tp-bar\">\n    <button class=\"tp-btn tp-active\" data-tab=\"tab1\">Tab 1</button>\n    <button class=\"tp-btn\" data-tab=\"tab2\">Tab 2</button>\n  </div>\n  <div class=\"tp-content\" id=\"tab1\">面板1内容</div>\n  <div class=\"tp-content\" id=\"tab2\" style=\"display:none\">面板2内容</div>\n</div>",
    hasJS: false
  },
  {
    id: 275,
    name: "Accordion (expand/collapse)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".acc{border-top:1px solid var(--border-visible)}\n.acc-item{border-bottom:1px solid var(--border-visible)}\n.acc-toggle{width:100%;display:flex;justify-content:space-between;align-items:center;padding:14px 0;background:transparent;border:none;cursor:pointer;text-align:left}\n.acc-label{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--text-primary)}\n.acc-icon{font-family:'JetBrains Mono',monospace;font-size:16px;color:var(--text-disabled);min-width:20px;text-align:right}\n.acc-body{padding:0 0 20px;font-size:13px;color:var(--text-secondary);line-height:1.6}",
    html: "<div class=\"acc\">\n  <div class=\"acc-item\">\n    <button class=\"acc-toggle\"><span class=\"acc-label\">展开项标题</span><span class=\"acc-icon\">+</span></button>\n    <div class=\"acc-body\" style=\"display:none\">展开内容</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 276,
    name: "Checklist (interactive checkboxes)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".chk-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}\n.chk-item:last-child{border-bottom:none}\n.chk-box{width:16px;height:16px;border:1px solid var(--border-visible);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 150ms ease-out;border-radius:2px}\n.chk-box.checked{background:var(--text-display);border-color:var(--text-display)}\n.chk-box.checked::after{content:'';width:8px;height:3px;border-bottom:2px solid var(--bg);border-left:2px solid var(--bg);transform:rotate(-45deg);margin-top:-2px}\n.chk-text{flex:1;font-size:13px;color:var(--text-primary)}\n.chk-status{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase}\n.chk-status.ok{color:var(--success)}.chk-status.pending{color:var(--warning)}",
    html: "<div style=\"background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:16px\">\n  <div class=\"chk-item\"><span class=\"chk-box checked\"></span><span class=\"chk-text\">已完成项</span><span class=\"chk-status ok\">OK</span></div>\n  <div class=\"chk-item\"><span class=\"chk-box\"></span><span class=\"chk-text\">待完成项</span><span class=\"chk-status pending\">PENDING</span></div>\n  <div class=\"chk-item\"><span class=\"chk-box\"></span><span class=\"chk-text\">未开始项</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 277,
    name: "Flow Pipeline (stage progress)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".flow{display:flex;align-items:center;gap:0;padding:8px 0;flex-wrap:wrap}\n.flow-stage{display:flex;flex-direction:column;gap:2px;padding:6px 12px}\n.flow-label{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled)}\n.flow-val{font-size:13px;color:var(--text-secondary)}\n.flow-stage.active .flow-val{color:var(--text-display);font-weight:600}\n.flow-stage.done .flow-val{color:var(--primary-olive)}\n.flow-stage.blocked .flow-val{color:var(--accent-orange)}\n.flow-arrow{font-size:16px;color:var(--text-disabled);padding:0 2px}",
    html: "<div class=\"flow\">\n  <div class=\"flow-stage done\"><span class=\"flow-label\">Stage 1</span><span class=\"flow-val\">准入</span></div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage active\"><span class=\"flow-label\">Stage 2</span><span class=\"flow-val\">运营</span></div>\n  <span class=\"flow-arrow\">›</span>\n  <div class=\"flow-stage blocked\"><span class=\"flow-label\">Stage 3</span><span class=\"flow-val\">清退</span></div>\n</div>",
    hasJS: false
  },
  {
    id: 278,
    name: "Toggle Switch",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".toggle-track{width:40px;height:22px;border-radius:11px;background:var(--border-visible);position:relative;cursor:pointer;transition:background 150ms ease-out}\n.toggle-track.on{background:var(--primary-olive)}\n.toggle-thumb{width:18px;height:18px;border-radius:50%;background:var(--bg);position:absolute;top:2px;left:2px;transition:left 150ms ease-out}\n.toggle-track.on .toggle-thumb{left:20px}",
    html: "<div style=\"display:flex;gap:24px;align-items:center\">\n  <div style=\"display:flex;align-items:center;gap:8px\">\n    <div class=\"toggle-track on\"><div class=\"toggle-thumb\"></div></div>\n    <span style=\"font-size:12px;color:var(--text-primary)\">已启用</span>\n  </div>\n  <div style=\"display:flex;align-items:center;gap:8px\">\n    <div class=\"toggle-track\"><div class=\"toggle-thumb\"></div></div>\n    <span style=\"font-size:12px;color:var(--text-secondary)\">已禁用</span>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 279,
    name: "Flip Card (front/back toggle)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".flip-card{perspective:800px;cursor:pointer}\n.flip-inner{position:relative;width:100%;min-height:200px;transition:transform .3s step-end;transform-style:preserve-3d}\n.flip-card.flipped .flip-inner{transform:rotateY(180deg)}\n.flip-front,.flip-back{position:absolute;inset:0;backface-visibility:hidden;border:1px solid var(--border);padding:24px;display:flex;flex-direction:column;justify-content:center;border-radius:6px}\n.flip-front{background:var(--surface)}\n.flip-back{background:var(--surface-raised);transform:rotateY(180deg)}\n.flip-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled);margin-bottom:16px}\n.flip-hero{font-family:Georgia,serif;font-size:48px;font-weight:700;color:var(--text-display);line-height:1}\n.flip-unit{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;color:var(--text-secondary);margin-top:4px}\n.flip-hint{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-disabled);margin-top:12px;letter-spacing:.04em}",
    html: "<div class=\"flip-card\" onclick=\"this.classList.toggle('flipped')\">\n  <div class=\"flip-inner\">\n    <div class=\"flip-front\">\n      <span class=\"flip-label\">指标名</span>\n      <span class=\"flip-hero\">481</span>\n      <span class=\"flip-unit\">单位 · 时间</span>\n      <span class=\"flip-hint\">[CLICK TO FLIP]</span>\n    </div>\n    <div class=\"flip-back\">\n      <span class=\"flip-label\">详情</span>\n      <div class=\"spec-table\">\n        <div class=\"spec-row\"><span class=\"sl\">子项A</span><span class=\"sv\">值</span></div>\n        <div class=\"spec-row\"><span class=\"sl\">子项B</span><span class=\"sv\">值</span></div>\n      </div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 280,
    name: "Asymmetric Comparison (side-by-side detail table)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".asym-table{display:grid;grid-template-columns:.35fr 1fr;gap:40px;align-items:start}\n.asym-side{position:sticky;top:80px}\n.asym-big{font-family:Georgia,serif;font-size:56px;font-weight:700;color:var(--text-display);opacity:.06;line-height:.85;display:block}\n.asym-num{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:var(--text-disabled);display:block;margin-bottom:4px}\n.asym-title{font-family:Georgia,serif;font-size:22px;font-weight:700;color:var(--text-display)}\n.asym-sub{font-size:13px;color:var(--text-secondary);margin-top:6px;line-height:1.5}\n.asym-rows{display:flex;flex-direction:column}\n.asym-row{display:grid;grid-template-columns:40px 1fr 1fr;gap:14px;padding:20px 0;border-bottom:1px solid var(--border)}\n.asym-row:last-child{border-bottom:none}\n.asym-row-num{font-family:'JetBrains Mono',monospace;font-size:20px;color:var(--text-disabled);line-height:1}\n.asym-cell{display:flex;flex-direction:column;gap:3px}\n.asym-cell-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled)}\n.asym-cell-val{font-size:14px;color:var(--text-primary);line-height:1.4}",
    html: "<div class=\"asym-table\">\n  <div class=\"asym-side\">\n    <span class=\"asym-big\">VS</span>\n    <span class=\"asym-num\">01 / HEAD-TO-HEAD</span>\n    <h2 class=\"asym-title\">标题</h2>\n    <p class=\"asym-sub\">描述</p>\n  </div>\n  <div class=\"asym-rows\">\n    <div class=\"asym-row\">\n      <span class=\"asym-row-num\">01</span>\n      <div class=\"asym-cell\"><span class=\"asym-cell-label\">A</span><span class=\"asym-cell-val\">值A</span></div>\n      <div class=\"asym-cell\"><span class=\"asym-cell-label\">B</span><span class=\"asym-cell-val\">值B</span></div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 281,
    name: "Period Navigation (prev/next date)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".period-nav{display:inline-flex;align-items:center;gap:0;border:1px solid var(--border-visible);border-radius:6px;overflow:hidden}\n.period-btn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:16px;transition:all 150ms ease-out}\n.period-btn:hover{color:var(--text-primary);background:var(--surface-raised)}\n.period-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:.06em;color:var(--text-display);padding:0 16px;min-width:120px;text-align:center;text-transform:uppercase}",
    html: "<div class=\"period-nav\">\n  <button class=\"period-btn\">‹</button>\n  <span class=\"period-label\">Q1 2026</span>\n  <button class=\"period-btn\">›</button>\n</div>",
    hasJS: false
  },
  {
    id: 282,
    name: "Modal (confirm dialog)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;padding:2rem}\n.modal-overlay.active{display:flex}\n.modal{background:var(--surface);border:1px solid var(--border);border-radius:8px;max-width:440px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}\n.modal-head{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}\n.modal-title{font-family:Georgia,serif;font-size:18px;font-weight:700;color:var(--text-display)}\n.modal-close{width:32px;height:32px;border:1px solid var(--border-visible);background:transparent;color:var(--text-primary);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all 150ms ease-out}\n.modal-body{padding:20px 24px;font-size:13px;color:var(--text-secondary);line-height:1.7;overflow-y:auto}\n.modal-foot{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}",
    html: "<div class=\"modal-overlay\" id=\"modalDemo\">\n  <div class=\"modal\">\n    <div class=\"modal-head\">\n      <span class=\"modal-title\">确认操作</span>\n      <button class=\"modal-close\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <p>确认描述内容</p>\n    </div>\n    <div class=\"modal-foot\">\n      <button class=\"btn btn-ghost\">取消</button>\n      <button class=\"btn btn-accent\">确认</button>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 283,
    name: "Detail Panel (overlay slide-in)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".detail-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.5);display:none;overflow-y:auto;padding:5vh 2rem}\n.detail-overlay.active{display:block}\n.detail-close{position:fixed;top:16px;right:16px;width:40px;height:40px;border:1px solid var(--border-visible);background:var(--surface);color:var(--text-primary);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:201;border-radius:4px}\n.detail-panel{max-width:600px;margin:0 auto;border:1px solid var(--border);background:var(--surface);border-radius:6px}\n.detail-head{padding:24px;border-bottom:1px solid var(--border)}\n.detail-head-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-disabled)}\n.detail-head-title{font-family:Georgia,serif;font-size:20px;font-weight:700;color:var(--text-display);margin-top:6px}\n.detail-body{padding:20px 24px 24px;font-size:13px;color:var(--text-secondary);line-height:1.7}",
    html: "<div class=\"detail-overlay\" id=\"detailDemo\">\n  <button class=\"detail-close\">×</button>\n  <div class=\"detail-panel\">\n    <div class=\"detail-head\">\n      <div class=\"detail-head-label\">Profile</div>\n      <div class=\"detail-head-title\">详情标题</div>\n    </div>\n    <div class=\"detail-body\">内容区域</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 284,
    name: "SVG Sparkline Card (trend mini chart)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".sparkline-card{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px;overflow:hidden}\n.sparkline-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}\n.sparkline-title{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-secondary)}\n.sparkline-trend{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500}\n.sparkline-trend.up{color:var(--success)}.sparkline-trend.neutral{color:var(--primary-olive)}.sparkline-trend.earth{color:var(--primary-earth)}\n.sparkline-svg{display:block;width:100%;height:32px}\n.sparkline-value{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:600;color:var(--text-display);line-height:1;margin-top:10px}",
    html: "<div class=\"sparkline-card\">\n  <div class=\"sparkline-header\">\n    <span class=\"sparkline-title\">指标名</span>\n    <span class=\"sparkline-trend up\">+15.3%</span>\n  </div>\n  <svg class=\"sparkline-svg\" viewBox=\"0 0 160 32\" preserveAspectRatio=\"none\">\n    <polyline points=\"0,28 20,26 40,24 60,22 80,18 100,16 120,12 140,8 160,5\" fill=\"none\" stroke=\"#4A5D3A\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <circle cx=\"160\" cy=\"5\" r=\"3\" fill=\"#4A5D3A\"/>\n  </svg>\n  <div class=\"sparkline-value\">1,720</div>\n</div>",
    hasJS: false
  },
  {
    id: 285,
    name: "Blockquote (display quote)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: "blockquote{border-left:3px solid var(--primary-olive);padding:0 0 0 24px;margin:0}\nblockquote p{font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:1.6;color:var(--text-display)}\nblockquote cite{display:block;margin-top:12px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-style:normal;color:var(--text-secondary)}",
    html: "<blockquote>\n  <p>引用文字内容</p>\n  <cite>出处 · 时间</cite>\n</blockquote>",
    hasJS: false
  },
  {
    id: 286,
    name: "Code Block (syntax display)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".code-block{background:var(--surface-raised);border:1px solid var(--border);border-left:3px solid var(--primary-olive);border-radius:2px;padding:20px 24px;overflow-x:auto}\n.code-block pre{font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;color:var(--text-primary);margin:0;white-space:pre}\n.code-block .comment{color:var(--text-disabled)}",
    html: "<div class=\"code-block\">\n  <pre><span class=\"comment\">// 注释</span>\n{\n  \"key\": \"value\"\n}</pre>\n</div>",
    hasJS: false
  },
  {
    id: 287,
    name: "Alert Messages (success/warning/error)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".alert-msg{display:flex;align-items:flex-start;gap:12px;padding:16px 20px;border:1px solid;border-radius:2px;background:var(--surface)}\n.alert-prefix{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;flex-shrink:0;line-height:1.5}\n.alert-body{font-size:14px;line-height:1.5;color:var(--text-primary)}\n.alert-success{border-color:var(--success)}.alert-success .alert-prefix{color:var(--success)}\n.alert-warning{border-color:var(--warning)}.alert-warning .alert-prefix{color:var(--warning)}\n.alert-error{border-color:var(--error)}.alert-error .alert-prefix{color:var(--error)}",
    html: "<div class=\"alert-msg alert-success\">\n  <span class=\"alert-prefix\">[SUCCESS]</span>\n  <span class=\"alert-body\">成功信息</span>\n</div>\n<div class=\"alert-msg alert-warning\">\n  <span class=\"alert-prefix\">[WARNING]</span>\n  <span class=\"alert-body\">警告信息</span>\n</div>\n<div class=\"alert-msg alert-error\">\n  <span class=\"alert-prefix\">[ERROR]</span>\n  <span class=\"alert-body\">错误信息</span>\n</div>",
    hasJS: false
  },
  {
    id: 288,
    name: "Callout Block (expandable note)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".callout{border-left:3px solid var(--primary-olive);padding:20px 24px;background:var(--surface);border-radius:0 2px 2px 0}\n.callout__title{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-olive);margin-bottom:12px}\n.callout-text{font-size:14px;color:var(--text-secondary);line-height:1.7}\n.callout-expand{margin-top:12px;padding-top:12px;border-top:1px solid var(--border);max-height:0;overflow:hidden;transition:max-height .3s ease}\n.callout-expand.open{max-height:200px}\n.callout-expand-text{font-size:13px;color:var(--text-disabled);line-height:1.7}\n.callout-toggle{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--primary-olive);background:none;border:none;cursor:pointer;padding:0;margin-top:12px}",
    html: "<div class=\"callout\">\n  <div class=\"callout__title\">METHODOLOGY</div>\n  <div class=\"callout-text\">简要说明。</div>\n  <div class=\"callout-expand\" id=\"callout-expand\">\n    <div class=\"callout-expand-text\">展开后的详细说明。</div>\n  </div>\n  <button class=\"callout-toggle\" onclick=\"document.getElementById('callout-expand').classList.toggle('open');this.textContent=this.textContent.includes('MORE')?'READ LESS [-]':'READ MORE [+'\">READ MORE [+]</button>\n</div>",
    hasJS: false
  },
  {
    id: 289,
    name: "Do/Don't Comparison Grid",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}\n.compare-col{border:1px solid var(--border);border-radius:6px;padding:16px}\n.compare-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)}\n.compare-marker{font-size:14px}\n.compare-col.avoid .compare-marker{color:var(--accent-orange)}\n.compare-col.prefer .compare-marker{color:var(--primary-olive)}\n.compare-title{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary)}\n.compare-row{display:flex;align-items:flex-start;gap:8px;padding:6px 0;font-size:12px;color:var(--text-primary);line-height:1.5}\n.compare-row .ci{font-size:10px;flex-shrink:0;padding-top:3px}\n.compare-col.avoid .ci{color:var(--accent-orange)}\n.compare-col.prefer .ci{color:var(--primary-olive)}",
    html: "<div class=\"compare-grid\">\n  <div class=\"compare-col avoid\">\n    <div class=\"compare-header\"><span class=\"compare-marker\">×</span><span class=\"compare-title\">AVOID</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">×</span><span>不要做的事</span></div>\n  </div>\n  <div class=\"compare-col prefer\">\n    <div class=\"compare-header\"><span class=\"compare-marker\">·</span><span class=\"compare-title\">PREFER</span></div>\n    <div class=\"compare-row\"><span class=\"ci\">·</span><span>推荐的做法</span></div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 290,
    name: "Segmented Progress Bar (20-block)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".seg-progress{display:flex;gap:2px;height:8px}\n.seg-p{flex:1;border-radius:1px}\n.seg-p.filled{background:var(--primary-olive)}\n.seg-p.empty{background:var(--border)}\n.seg-p.warn{background:var(--accent-orange)}\n.seg-p.good{background:var(--success)}",
    html: "<div style=\"display:flex;justify-content:space-between;margin-bottom:4px\"><span class=\"sl\">指标</span><span style=\"font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:var(--primary-olive)\">85%</span></div>\n<div class=\"seg-progress\">\n  <div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p filled\"></div><div class=\"seg-p empty\"></div><div class=\"seg-p empty\"></div><div class=\"seg-p empty\"></div><div class=\"seg-p empty\"></div>\n</div>",
    hasJS: false
  },
  {
    id: 291,
    name: "Scene Overlay (image + text overlay)",
    source: "2026-05-31-component-showcase.html",
    category: "section",
    css: ".scene-overlay{position:relative;min-height:200px;overflow:hidden;border-radius:8px;display:flex;align-items:flex-end}\n.scene-overlay__bg{position:absolute;inset:0}\n.scene-overlay__content{position:relative;z-index:1;padding:32px 24px 24px;width:100%}",
    html: "<div class=\"scene-overlay\">\n  <div class=\"scene-overlay__bg\" style=\"background:var(--scene-glacier)\"></div>\n  <div class=\"scene-overlay__content\" style=\"color:#fff\">\n    <div style=\"font-family:Georgia,serif;font-size:24px;font-weight:700\">标题</div>\n    <div style=\"font-size:13px;opacity:.8;margin-top:6px\">描述</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 292,
    name: "Inline Sparkline Table (table with mini charts)",
    source: "2026-05-31-component-showcase.html",
    category: "chart",
    css: ".spark-table{width:100%;border-collapse:collapse}\n.spark-table th{padding:10px 14px;text-align:left;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-disabled);border-bottom:1px solid var(--border-visible);font-weight:500}\n.spark-table td{padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-primary)}\n.spark-table td:last-child{text-align:right}",
    html: "<!-- JS fills tbody with sparkline SVG rows. Static example: -->\n<table class=\"spark-table\">\n  <thead><tr><th>名称</th><th>趋势</th><th style=\"text-align:right\">当前</th><th style=\"text-align:right\">变化</th></tr></thead>\n  <tbody>\n    <tr>\n      <td style=\"font-weight:500\">金条</td>\n      <td><svg viewBox=\"0 0 120 24\" style=\"width:100%;height:24px\" preserveAspectRatio=\"none\"><polyline points=\"4,20 24,18 44,16 64,14 84,10 104,8 116,5\" fill=\"none\" stroke=\"#4A5D3A\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"116\" cy=\"5\" r=\"2.5\" fill=\"#4A5D3A\"/></svg></td>\n      <td style=\"font-family:'JetBrains Mono',monospace;font-weight:600\">1,740</td>\n      <td style=\"font-family:'JetBrains Mono',monospace;font-size:12px;color:#4A5D3A\">+1.2%</td>\n    </tr>\n  </tbody>\n</table>",
    hasJS: false
  },
  {
    id: 293,
    name: "Needle Gauge (thin arc with pointer)",
    source: "nyt-data-narrative.html",
    category: "chart",
    css: "/* nyt 系统使用独立令牌 */\n.needle-gauge{position:relative;width:120px;height:70px;margin:0 auto}\n.needle-gauge svg{width:100%;height:100%}\n.needle-gauge__value{position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-family:Georgia,serif;font-size:28px;font-weight:700;color:var(--accent,#2C2C2C)}\n.needle-gauge__label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary,#6B6B6B);text-align:center;margin-top:4px}",
    html: "<div style=\"text-align:center\">\n  <div class=\"needle-gauge\">\n    <svg viewBox=\"0 0 120 70\">\n      <path d=\"M 10 60 A 50 50 0 0 1 110 60\" fill=\"none\" stroke=\"#E5E5E0\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n      <line x1=\"60\" y1=\"60\" x2=\"95\" y2=\"20\" stroke=\"#2C2C2C\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n      <circle cx=\"60\" cy=\"60\" r=\"4\" fill=\"#2C2C2C\"/>\n    </svg>\n    <div class=\"needle-gauge__value\">87</div>\n  </div>\n  <div class=\"needle-gauge__label\">达标率</div>\n</div>",
    hasJS: false
  },
  {
    id: 294,
    name: "Scrollytelling Section (sticky text + scroll)",
    source: "nyt-data-narrative.html",
    category: "section",
    css: ".scrolly{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}\n.scrolly__text{position:sticky;top:80px}\n.scrolly__step{padding:24px 0;margin-bottom:80vh;opacity:.3;transition:opacity .4s ease}\n.scrolly__step.active{opacity:1}\n.scrolly__step-title{font-family:Georgia,serif;font-size:20px;font-weight:700;color:var(--accent,#2C2C2C);margin-bottom:8px}\n.scrolly__step-body{font-size:14px;color:var(--text-secondary,#6B6B6B);line-height:1.7}\n.scrolly__visual{position:sticky;top:80px}",
    html: "<div class=\"scrolly\">\n  <div class=\"scrolly__text\">\n    <div class=\"scrolly__step active\">\n      <div class=\"scrolly__step-title\">第一步</div>\n      <div class=\"scrolly__step-body\">描述文字</div>\n    </div>\n    <div class=\"scrolly__step\">\n      <div class=\"scrolly__step-title\">第二步</div>\n      <div class=\"scrolly__step-body\">描述文字</div>\n    </div>\n  </div>\n  <div class=\"scrolly__visual\">\n    <!-- 可视化内容 -->\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 295,
    name: "Annotation (highlighted text with note)",
    source: "nyt-data-narrative.html",
    category: "section",
    css: ".annotation{position:relative;display:inline;border-bottom:2px solid var(--accent,#E55B2B);cursor:help}\n.annotation__popup{display:none;position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:var(--accent,#2C2C2C);color:#fff;padding:8px 12px;border-radius:4px;font-size:12px;white-space:nowrap;margin-bottom:8px;z-index:10}\n.annotation:hover .annotation__popup{display:block}\n.annotation__popup::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:var(--accent,#2C2C2C)}",
    html: "<span class=\"annotation\">高亮文字<span class=\"annotation__popup\">注解内容</span></span>",
    hasJS: false
  },
  {
    id: 296,
    name: "Side-by-Side Compare (equal split)",
    source: "nyt-data-narrative.html",
    category: "section",
    css: ".sbs{display:grid;grid-template-columns:1fr 1fr;gap:24px}\n.sbs__col{background:var(--card,#fff);border:1px solid var(--line,#E5E5E0);border-radius:8px;padding:24px}\n.sbs__label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary,#6B6B6B);margin-bottom:12px}\n.sbs__val{font-family:Georgia,serif;font-size:32px;font-weight:700;color:var(--accent,#2C2C2C);line-height:1}\n.sbs__desc{font-size:13px;color:var(--text-secondary,#6B6B6B);margin-top:8px;line-height:1.6}",
    html: "<div class=\"sbs\">\n  <div class=\"sbs__col\">\n    <div class=\"sbs__label\">方案 A</div>\n    <div class=\"sbs__val\">481</div>\n    <div class=\"sbs__desc\">描述A</div>\n  </div>\n  <div class=\"sbs__col\">\n    <div class=\"sbs__label\">方案 B</div>\n    <div class=\"sbs__val\" style=\"color:var(--accent,#E55B2B)\">350</div>\n    <div class=\"sbs__desc\">描述B</div>\n  </div>\n</div>",
    hasJS: false
  },
  {
    id: 297,
    name: "Geographic Grid (map-style card matrix)",
    source: "nyt-data-narrative.html",
    category: "chart",
    css: ".geo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}\n.geo-cell{background:var(--card,#fff);border:1px solid var(--line,#E5E5E0);border-radius:4px;padding:12px;text-align:center}\n.geo-cell__region{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary,#6B6B6B);margin-bottom:4px}\n.geo-cell__val{font-family:Georgia,serif;font-size:20px;font-weight:700;color:var(--accent,#2C2C2C);line-height:1}\n.geo-cell--hot{background:rgba(229,91,43,.06);border-color:rgba(229,91,43,.3)}\n.geo-cell--cold{background:rgba(74,93,58,.06);border-color:rgba(74,93,58,.3)}",
    html: "<div class=\"geo-grid\">\n  <div class=\"geo-cell geo-cell--cold\"><div class=\"geo-cell__region\">华东</div><div class=\"geo-cell__val\">481</div></div>\n  <div class=\"geo-cell\"><div class=\"geo-cell__region\">华南</div><div class=\"geo-cell__val\">350</div></div>\n  <div class=\"geo-cell geo-cell--hot\"><div class=\"geo-cell__region\">华北</div><div class=\"geo-cell__val\" style=\"color:var(--accent,#E55B2B)\">-28%</div></div>\n  <div class=\"geo-cell\"><div class=\"geo-cell__region\">西南</div><div class=\"geo-cell__val\">+15%</div></div>\n</div>",
    hasJS: false
  },
  {
    id: 298,
    name: "Horizontal Timeline (dot + line + event)",
    source: "nyt-data-narrative.html",
    category: "chart",
    css: ".h-timeline{position:relative;padding:24px 0}\n.h-timeline__track{display:flex;align-items:center;position:relative}\n.h-timeline__track::before{content:'';position:absolute;left:0;right:0;top:50%;height:2px;background:var(--line,#E5E5E0);transform:translateY(-50%)}\n.h-timeline__event{position:relative;flex:1;text-align:center;z-index:1}\n.h-timeline__dot{width:12px;height:12px;border-radius:50%;background:var(--card,#fff);border:2px solid var(--accent,#2C2C2C);margin:0 auto 8px}\n.h-timeline__dot.active{background:var(--accent,#2C2C2C)}\n.h-timeline__date{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;color:var(--text-secondary,#6B6B6B)}\n.h-timeline__label{font-size:12px;color:var(--accent,#2C2C2C);font-weight:600;margin-top:2px}",
    html: "<div class=\"h-timeline\">\n  <div class=\"h-timeline__track\">\n    <div class=\"h-timeline__event\">\n      <div class=\"h-timeline__dot active\"></div>\n      <div class=\"h-timeline__date\">01月</div>\n      <div class=\"h-timeline__label\">事件A</div>\n    </div>\n    <div class=\"h-timeline__event\">\n      <div class=\"h-timeline__dot\"></div>\n      <div class=\"h-timeline__date\">03月</div>\n      <div class=\"h-timeline__label\">事件B</div>\n    </div>\n    <div class=\"h-timeline__event\">\n      <div class=\"h-timeline__dot\"></div>\n      <div class=\"h-timeline__date\">06月</div>\n      <div class=\"h-timeline__label\">事件C</div>\n    </div>\n  </div>\n</div>",
    hasJS: false
  },
];
