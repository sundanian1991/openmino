// 生成 13 个 HTML 幻灯片。共享 CSS 写在 base() 中。
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = 'slides';
if (!fs.existsSync(SLIDES_DIR)) fs.mkdirSync(SLIDES_DIR);

// 调色板
const C = {
  ink:    '1A2333',   // 主文本-午夜深
  sub:    '5A6878',   // 次文本-灰
  bg:     'F6F2EA',   // 暖米白
  bg2:    'FFFFFF',
  gold:   'C8943A',   // 数据驱动
  goldD:  '9C6F1F',
  blue:   '2E5C8A',   // 客户分层
  blueD:  '1F4267',
  green:  '4A7C59',   // 人员辅导
  greenD: '33593F',
  rust:   'B5512F',   // 警示
  rustD:  '8C3D22',
  line:   'DCD3C2',   // 分隔线
  panel:  'EFE8D8',
};
// 方便内联
const P = (...a) => a.join('');

function base(inner, bodyStyle = '', opts = {}) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
html { background:${C.bg}; }
body { width:720pt; height:405pt; font-family:Arial,"Helvetica Neue",sans-serif; color:${C.ink}; background:${C.bg}; display:flex; position:relative; overflow:hidden; ${bodyStyle} }
.serif { font-family:Georgia,"Times New Roman",serif; }
.wrap { width:100%; height:100%; position:relative; }
.chip { font-size:10pt; color:${C.sub}; letter-spacing:2pt; font-weight:bold; text-transform:uppercase; }
.footer { position:absolute; bottom:14pt; left:40pt; right:40pt; display:flex; justify-content:space-between; align-items:center; font-size:8.5pt; color:${C.sub}; }
.footer .dot { width:5pt; height:5pt; border-radius:50%; display:inline-block; margin:0 4pt; vertical-align:middle; }
.h1 { font-family:Georgia,serif; font-size:27pt; font-weight:bold; line-height:1.1; color:${C.ink}; }
.h2 { font-size:13pt; font-weight:bold; color:${C.ink}; }
.body { font-size:11pt; line-height:1.55; color:#34404E; }
.small { font-size:9pt; color:${C.sub}; line-height:1.5; }
.tiny { font-size:8pt; color:${C.sub}; }
.gold { color:${C.gold}; } .blue { color:${C.blue}; } .green { color:${C.green}; } .rust { color:${C.rust}; }
em { font-style:normal; }
</style></head><body><div class="wrap">${inner}</div></body></html>`;
}

// 通用页眉（非封面）
function hdr(section, idx, color) {
  return P(
    `<div style="position:absolute;top:0;left:0;right:0;height:6pt;background:#`, color, `;"></div>`,
    `<div style="position:absolute;top:22pt;left:40pt;right:40pt;display:flex;justify-content:space-between;align-items:center;">`,
      `<p class="chip" style="color:#`, color, `;">`, section, `</p>`,
      `<p style="font-size:10pt;color:#`, C.sub, `;"><b style="color:#`, C.ink, `;">`, idx, `</b> / 13</p>`,
    `</div>`
  );
}
function ftr() {
  return P(`<div class="footer">`,
    `<p>数据驱动运营 × 人员分层 × 员工辅导</p>`,
    `<p><span class="dot" style="background:#`, C.gold, `;"></span>数据 <span class="dot" style="background:#`, C.blue, `;"></span>分层 <span class="dot" style="background:#`, C.green, `;"></span>辅导</p>`,
  `</div>`);
}

const slides = [];

// ===== 第1页 封面 =====
slides.push(base(
  P(
    `<img src="assets/cover-bg.png" style="position:absolute;left:0;top:0;width:720pt;height:405pt;">`,
    `<div style="position:absolute;left:52pt;top:70pt;width:44pt;height:4pt;background:#`, C.gold, `;"></div>`,
    `<div style="position:absolute;left:52pt;top:92pt;color:#9FB1CC;font-size:10pt;letter-spacing:4pt;font-weight:bold;"><p>MANAGEMENT TRAINING · 管理层培训</p></div>`,
    `<div style="position:absolute;left:50pt;top:130pt;right:50pt;">`,
      `<h1 class="serif" style="color:#FFFFFF;font-size:42pt;font-weight:bold;line-height:1.12;margin-bottom:8pt;">数据驱动运营</h1>`,
      `<div style="display:flex;align-items:center;gap:12pt;margin:4pt 0;">`,
        `<div style="width:24pt;height:2pt;background:#`, C.gold, `;"></div>`,
        `<span class="serif" style="color:#`, C.gold, `;font-size:22pt;font-weight:bold;">×</span>`,
        `<div style="width:24pt;height:2pt;background:#`, C.gold, `;"></div>`,
      `</div>`,
      `<h1 class="serif" style="color:#FFFFFF;font-size:42pt;font-weight:bold;line-height:1.12;margin-top:6px;">客户分层 <span style="color:#`, C.gold, `;">×</span> 员工辅导</h1>`,
    `</div>`,
    `<div style="position:absolute;left:52pt;top:298pt;right:52pt;color:#A8BACE;font-size:14pt;line-height:1.5;font-style:italic;" class="serif">`,
      `<p>从凭感觉到靠数据，从管业务到带队伍。</p>`,
    `</div>`,
    `<div style="position:absolute;left:52pt;bottom:34pt;right:52pt;display:flex;justify-content:space-between;align-items:center;color:#6E8198;font-size:9pt;border-top:1px solid rgba(255,255,255,0.15);padding-top:12pt;">`,
      `<p>2026 年 7 月 · 内部培训</p><p>讲师：XXX　｜　内部保密</p>`,
    `</div>`
  ),
  ''
));

// ===== 第2页 课程核心逻辑 =====
slides.push(base(
  P(hdr('课程总览', '02', C.ink), `
    <div style="position:absolute;left:40pt;top:64pt;right:40pt;">
      <div class="chip">CORE LOGIC</div>
      <h1 class="h1" style="margin-top:6pt;">一张图看懂今天讲什么</h1>
      <p class="small" style="margin-top:4pt;">30 分钟，只讲透三个词，以及它们如何串成闭环。</p>
    </div>
    <!-- 三角图示 -->
    <div style="position:absolute;left:40pt;right:40pt;top:158pt;display:flex;justify-content:center;gap:0;align-items:stretch;">
      <div style="flex:1;padding:18pt 16pt 16pt;background:#FFFFFF;border-top:5pt solid #`, C.gold, `;box-shadow:0 2pt 8pt rgba(0,0,0,0.05);margin-right:8pt;">
        <p class="chip" style="color:#`, C.gold, `;">① 武器</p>
        <p class="h2" style="margin-top:6pt;">数据驱动运营</p>
        <p class="small" style="margin-top:6pt;">用数据看清业务、发现机会、做出决策。</p>
      </div>
      <div style="flex:1;padding:18pt 16pt 16pt;background:#FFFFFF;border-top:5pt solid #`, C.blue, `;box-shadow:0 2pt 8pt rgba(0,0,0,0.05);margin:0 8pt;">
        <p class="chip" style="color:#`, C.blue, `;">② 战术</p>
        <p class="h2" style="margin-top:6pt;">客户分层</p>
        <p class="small" style="margin-top:6pt;">不同客户不同策略，精准配置资源。</p>
      </div>
      <div style="flex:1;padding:18pt 16pt 16pt;background:#FFFFFF;border-top:5pt solid #`, C.green, `;box-shadow:0 2pt 8pt rgba(0,0,0,0.05);margin-left:8pt;">
        <p class="chip" style="color:#`, C.green, `;">③ 基本功</p>
        <p class="h2" style="margin-top:6pt;">人员分层辅导</p>
        <p class="small" style="margin-top:6pt;">不同员工不同教法，保障策略落地。</p>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;text-align:center;">
      <div style="display:inline-block;background:#`, C.ink, `;color:#FFFFFF;padding:9pt 22pt;border-radius:3pt;">
        <p style="font-size:12pt;font-weight:bold;">数据是武器，分层是战术，辅导是基本功</p>
      </div>
    </div>
  `, ftr())
));

// ===== 第3页 数据驱动运营闭环 =====
slides.push(base(
  P(hdr('数据驱动运营', '03', C.gold), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.gold, `;">CLOSED LOOP</div>
      <h1 class="h1" style="margin-top:6pt;">五步闭环，管理者盯住两头</h1>
    </div>
    <!-- 闭环 -->
    <div style="position:absolute;left:40pt;right:40pt;top:148pt;display:flex;align-items:center;justify-content:space-between;">
      `, ['数据','洞察','策略','行动'].map((t,i)=>P(
        `<div style="display:flex;flex-direction:column;align-items:center;width:100pt;">`,
          `<div style="width:56pt;height:56pt;border-radius:50%;background:#`, C.gold, `;display:flex;align-items:center;justify-content:center;box-shadow:0 3pt 8pt rgba(200,148,58,0.35);">`,
            `<p style="color:#FFFFFF;font-size:16pt;font-weight:bold;">`, i+1, `</p>`,
          `</div>`,
          `<p style="margin-top:8pt;font-size:12pt;font-weight:bold;color:#`, C.ink, `;">`, t, `</p>`,
        `</div>`,
        (i<3 ? `<div style="color:#` : '<!--'), C.gold, (i<3 ? `;font-size:18pt;font-weight:bold;">→</div>` : `--noarrow-->`)
      )).join(''), `
      <div style="display:flex;flex-direction:column;align-items:center;width:100pt;">
        <div style="width:56pt;height:56pt;border-radius:50%;background:#FFFFFF;border:3pt solid #`, C.gold, `;display:flex;align-items:center;justify-content:center;">
          <p style="color:#`, C.gold, `;font-size:16pt;font-weight:bold;">5</p>
        </div>
        <p style="margin-top:8pt;font-size:12pt;font-weight:bold;color:#`, C.ink, `;">反馈</p>
      </div>
    </div>
    <!-- 回流箭头注释 -->
    <p class="tiny" style="position:absolute;left:50%;top:240pt;transform:translateX(-50%);color:#`, C.gold, `;">↻ 反馈回流，形成闭环</p>
    <!-- 管理者三件事 -->
    <div style="position:absolute;left:40pt;right:40pt;top:270pt;background:#FFFFFF;border-left:4pt solid #`, C.gold, `;padding:14pt 18pt;">
      <p class="chip" style="color:#`, C.goldD, `;">管理者三件事</p>
      <div style="display:flex;gap:16pt;margin-top:8pt;">
        <p class="body" style="flex:1;"><b>① 看趋势</b>　业务在变好还是变差？</p>
        <p class="body" style="flex:1;"><b>② 找异常</b>　哪里出了问题或机会？</p>
        <p class="body" style="flex:1;"><b>③ 做决策</b>　资源往哪投？策略怎么调？</p>
      </div>
    </div>
    <p class="small" style="position:absolute;left:40pt;bottom:48pt;font-style:italic;">讲师视角：不讲技术实现，只讲管理视角要关注什么。</p>
  `, ftr())
));

// ===== 第4页 北极星指标 =====
slides.push(base(
  P(hdr('数据驱动运营', '04', C.gold), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.gold, `;">NORTH STAR</div>
      <h1 class="h1" style="margin-top:6pt;">对齐目标，层层穿透</h1>
    </div>
    <div style="position:absolute;left:40pt;top:140pt;width:300pt;">
      <p class="chip" style="color:#`, C.goldD, `;">北极星指标（按业务选定）</p>
      <ul style="list-style:none;margin-top:8pt;">
        <li style="margin-bottom:7pt;"><p class="body"><b class="gold">消费贷/现金贷</b>　→　在贷余额 或 放款量</p></li>
        <li style="margin-bottom:7pt;"><p class="body"><b class="gold">理财平台</b>　→　AUM 增量</p></li>
        <li><p class="body"><b class="gold">综合平台</b>　→　月活跃用户数（MAU）</p></li>
      </ul>
    </div>
    <!-- 金字塔 -->
    <div style="position:absolute;right:46pt;top:138pt;width:300pt;">
      <p class="chip" style="color:#`, C.goldD, `;text-align:center;">三层穿透</p>
      <div style="margin-top:10pt;display:flex;flex-direction:column;align-items:center;">
        <div style="width:170pt;background:#`, C.gold, `;color:#fff;padding:7pt 0;text-align:center;"><p style="font-size:11pt;font-weight:bold;">公司级</p></div>
        <div style="width:0;height:0;border-left:8pt solid transparent;border-right:8pt solid transparent;border-top:6pt solid #`, C.gold, `;"></div>
        <div style="width:215pt;background:#D6A854;color:#fff;padding:7pt 0;text-align:center;"><p style="font-size:11pt;font-weight:bold;">部门级</p></div>
        <div style="width:0;height:0;border-left:8pt solid transparent;border-right:8pt solid transparent;border-top:6pt solid #D6A854;"></div>
        <div style="width:260pt;background:#E0BC7C;color:#`, C.ink, `;padding:7pt 0;text-align:center;"><p style="font-size:11pt;font-weight:bold;">个人级</p></div>
      </div>
      <p class="tiny" style="margin-top:8pt;text-align:center;">每一层都对齐上一级目标</p>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;text-align:center;background:#`, C.panel, `;padding:10pt;">
      <p class="body"><b>每一层都知道自己在为什么而战。</b></p>
    </div>
  `, ftr())
));

// ===== 第5页 三个实战场景 =====
slides.push(base(
  P(hdr('数据驱动运营', '05', C.gold), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.gold, `;">USE CASES</div>
      <h1 class="h1" style="margin-top:6pt;">数据分析到底解决什么问题？</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:138pt;display:flex;gap:10pt;">
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.gold, `;">
        <p class="chip" style="color:#`, C.gold, `;">场景一</p>
        <p class="h2" style="margin-top:5pt;">现状看清</p>
        <p class="small" style="margin-top:6pt;color:#`, C.ink, `;">要回答：整体表现如何？哪类客户好？</p>
        <div style="margin-top:8pt;background:#`, C.panel, `;padding:6pt 8pt;"><p class="tiny" style="color:#`, C.goldD, `;">▸ 趋势图 · 客户分群对比</p></div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.gold, `;">
        <p class="chip" style="color:#`, C.gold, `;">场景二</p>
        <p class="h2" style="margin-top:5pt;">原因找寻</p>
        <p class="small" style="margin-top:6pt;color:#`, C.ink, `;">要回答：问题出在哪个环节？</p>
        <div style="margin-top:8pt;background:#`, C.panel, `;padding:6pt 8pt;"><p class="tiny" style="color:#`, C.goldD, `;">▸ 转化漏斗 · 分布分析</p></div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.gold, `;">
        <p class="chip" style="color:#`, C.gold, `;">场景三</p>
        <p class="h2" style="margin-top:5pt;">增量发现</p>
        <p class="small" style="margin-top:6pt;color:#`, C.ink, `;">要回答：还有哪些未被满足的需求？</p>
        <div style="margin-top:8pt;background:#`, C.panel, `;padding:6pt 8pt;"><p class="tiny" style="color:#`, C.goldD, `;">▸ 客户旅程地图</p></div>
      </div>
    </div>
    <!-- 案例 -->
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;background:#`, C.ink, `;color:#fff;padding:12pt 16pt;">
      <p class="chip" style="color:#`, C.gold, `;">案例</p>
      <p class="small" style="color:#E8DFD0;margin-top:4pt;">某平台「注册 → 首投」转化率仅 <b style="color:#`, C.gold, `;">60%</b>，定位为实名认证环节体验差，优化后提升至 <b style="color:#`, C.gold, `;">45%</b> 流失改善。</p>
    </div>
  `, ftr())
));

// ===== 第6页 为什么做客户分层 =====
slides.push(base(
  P(hdr('客户分层', '06', C.blue), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.blue, `;">WHY SEGMENT</div>
      <h1 class="h1" style="margin-top:6pt;">告别一刀切，告别预算浪费</h1>
    </div>
    <!-- 对比 -->
    <div style="position:absolute;left:40pt;right:40pt;top:144pt;display:flex;gap:16pt;">
      <div style="flex:1;background:#FFFFFF;padding:18pt;border:1pt solid #`, C.line, `;">
        <p class="chip" style="color:#`, C.rust, `;">传统方式</p>
        <p class="serif" style="font-size:34pt;font-weight:bold;color:#`, C.rust, `;margin-top:6pt;">70%</p>
        <p class="body" style="margin-top:2pt;">营销预算投给了<b>不会转化</b>的客户</p>
        <div style="margin-top:10pt;height:8pt;background:#E8DDD0;position:relative;">
          <div style="position:absolute;left:0;top:0;bottom:0;width:70%;background:#`, C.rust, `;"></div>
        </div>
        <p class="tiny" style="margin-top:4pt;">预算浪费区</p>
      </div>
      <div style="display:flex;align-items:center;font-size:22pt;color:#`, C.blue, `;"><p>→</p></div>
      <div style="flex:1;background:#FFFFFF;padding:18pt;border:1pt solid #`, C.line, `;">
        <p class="chip" style="color:#`, C.blue, `;">分层后</p>
        <p class="serif" style="font-size:34pt;font-weight:bold;color:#`, C.blue, `;margin-top:6pt;">2-3×</p>
        <p class="body" style="margin-top:2pt;">高意向客户转化率<b>提升 2-3 倍</b></p>
        <div style="margin-top:10pt;height:8pt;background:#E8DDD0;position:relative;">
          <div style="position:absolute;left:0;top:0;bottom:0;width:88%;background:#`, C.blue, `;"></div>
        </div>
        <p class="tiny" style="margin-top:4pt;">精准触达区</p>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;text-align:center;background:#`, C.blue, `;color:#fff;padding:10pt;">
      <p style="font-size:12pt;font-weight:bold;">不同客户，不同价值，不同策略，不同投入。</p>
    </div>
  `, ftr())
));

// ===== 第7页 分层维度与策略 =====
slides.push(base(
  P(hdr('客户分层', '07', C.blue), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.blue, `;">HOW TO SEGMENT</div>
      <h1 class="h1" style="margin-top:6pt;">一张表看懂分层与对应打法</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:134pt;background:#FFFFFF;border:1pt solid #`, C.line, `;">
      <div style="display:flex;background:#`, C.blue, `;color:#fff;padding:9pt 14pt;">
        <p style="flex:1;font-weight:bold;font-size:11pt;">怎么分</p>
        <p style="flex:1.3;font-weight:bold;font-size:11pt;">怎么打</p>
      </div>
      <div style="display:flex;padding:10pt 14pt;border-bottom:1pt solid #`, C.line, `;align-items:center;">
        <p class="body" style="flex:1;"><b>按资产 / 行为打标签</b></p>
        <p class="body" style="flex:1.3;">定向推送对应产品</p>
      </div>
      <div style="display:flex;padding:10pt 14pt;border-bottom:1pt solid #`, C.line, `;align-items:center;">
        <p class="body" style="flex:1;"><b>按生命周期</b><br><span class="tiny">新客 / 老客 / 流失</span></p>
        <p class="body" style="flex:1.3;">新客促活 ｜ 老客提频 ｜ 流失预警召回</p>
      </div>
      <div style="display:flex;padding:10pt 14pt;align-items:center;">
        <p class="body" style="flex:1;"><b>按价值分层</b><br><span class="tiny">高价值 vs 长尾</span></p>
        <p class="body" style="flex:1.3;">高价值：<b class="blue">人工深度服务</b>　长尾：<b>自动化低成本触达</b></p>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:46pt;background:#`, C.panel, `;border-left:4pt solid #`, C.blue, `;padding:10pt 14pt;">
      <p class="chip" style="color:#`, C.blueD, `;">管理者自测</p>
      <p class="body" style="margin-top:3pt;">你的团队精力，主要花在哪些客户上？合理吗？</p>
    </div>
  `, ftr())
));

// ===== 第8页 为什么最终要靠人落地 =====
slides.push(base(
  P(hdr('人员分层辅导', '08', C.green), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.green, `;">WHY COACHING</div>
      <h1 class="h1" style="margin-top:6pt;">数据再漂亮，执行不到位就是零</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:140pt;display:flex;gap:10pt;">
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.rust, `;">
        <p class="serif" style="font-size:26pt;font-weight:bold;color:#`, C.rust, `;">①</p>
        <p class="h2" style="margin-top:2pt;">新人多</p>
        <p class="small" style="margin-top:5pt;">SOP 都不熟，上手慢，出错率高。</p>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.rust, `;">
        <p class="serif" style="font-size:26pt;font-weight:bold;color:#`, C.rust, `;">②</p>
        <p class="h2" style="margin-top:2pt;">老员工带不动</p>
        <p class="small" style="margin-top:5pt;">能力不错，但不会、也没时间带人。</p>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14pt;border-top:4pt solid #`, C.rust, `;">
        <p class="serif" style="font-size:26pt;font-weight:bold;color:#`, C.rust, `;">③</p>
        <p class="h2" style="margin-top:2pt;">新晋管理者</p>
        <p class="small" style="margin-top:5pt;">被提拔做管理，却不知怎么辅导下属。</p>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;background:#`, C.green, `;color:#fff;padding:12pt 16pt;">
      <p style="font-size:12.5pt;font-weight:bold;">结论：策略越精细，越需要分层辅导来保障执行。</p>
    </div>
  `, ftr())
));

// ===== 第9页 人员分层模型 =====
slides.push(base(
  P(hdr('人员分层辅导', '09', C.green), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.green, `;">COACHING MODEL</div>
      <h1 class="h1" style="margin-top:6pt;">四层员工，四种教法</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:132pt;display:flex;gap:8pt;">
      <div style="flex:1;background:#E8F0EA;padding:14pt 12pt;border-bottom:4pt solid #`, C.green, `;">
        <p class="chip" style="color:#`, C.greenD, `;">L1</p>
        <p class="h2" style="margin-top:4pt;">新手期</p>
        <p class="tiny" style="margin-top:4pt;color:#`, C.ink, `;">按流程做事，缺乏经验</p>
        <div style="margin-top:8pt;border-top:1pt solid #`, C.green, `;padding-top:6pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导重点</p>
          <p class="small" style="margin-top:3pt;">标准化 SOP + 每日 / 每周即时反馈</p>
        </div>
      </div>
      <div style="flex:1;background:#DCE9DF;padding:14pt 12pt;border-bottom:4pt solid #`, C.green, `;">
        <p class="chip" style="color:#`, C.greenD, `;">L2</p>
        <p class="h2" style="margin-top:4pt;">成长期</p>
        <p class="tiny" style="margin-top:4pt;color:#`, C.ink, `;">能独立执行，渴望成长</p>
        <div style="margin-top:8pt;border-top:1pt solid #`, C.green, `;padding-top:6pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导重点</p>
          <p class="small" style="margin-top:3pt;">给挑战任务 + 画成长路径</p>
        </div>
      </div>
      <div style="flex:1;background:#CFE0D3;padding:14pt 12pt;border-bottom:4pt solid #`, C.green, `;">
        <p class="chip" style="color:#`, C.greenD, `;">L3</p>
        <p class="h2" style="margin-top:4pt;">成熟期</p>
        <p class="tiny" style="margin-top:4pt;color:#`, C.ink, `;">业绩稳定，有主见</p>
        <div style="margin-top:8pt;border-top:1pt solid #`, C.green, `;padding-top:6pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导重点</p>
          <p class="small" style="margin-top:3pt;">给自主权 + 及时认可</p>
        </div>
      </div>
      <div style="flex:1;background:#BFD6C5;padding:14pt 12pt;border-bottom:4pt solid #`, C.greenD, `;">
        <p class="chip" style="color:#`, C.greenD, `;">L4</p>
        <p class="h2" style="margin-top:4pt;">导师期</p>
        <p class="tiny" style="margin-top:4pt;color:#`, C.ink, `;">能带人，有影响力</p>
        <div style="margin-top:8pt;border-top:1pt solid #`, C.greenD, `;padding-top:6pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导重点</p>
          <p class="small" style="margin-top:3pt;">给带教机会 + 管理赋能</p>
        </div>
      </div>
    </div>
    <p class="small" style="position:absolute;left:40pt;right:40pt;bottom:48pt;text-align:center;font-style:italic;">层级随能力递进，教法从「指令」走向「赋能」。</p>
  `, ftr())
));

// ===== 第10页 数据驱动的辅导方法 =====
slides.push(base(
  P(hdr('人员分层辅导', '10', C.green), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.green, `;">DATA-DRIVEN COACHING</div>
      <h1 class="h1" style="margin-top:6pt;">用数据说话，而不是凭感觉</h1>
    </div>
    <!-- 辅导四步法 -->
    <div style="position:absolute;left:40pt;right:40pt;top:124pt;display:flex;align-items:center;gap:4pt;">
      `, ['数据事实','差距分析','根因探讨','改进计划','跟进追踪'].map((t,i)=>P(
        `<div style="background:#`, C.green, `;color:#fff;padding:6pt 8pt;text-align:center;flex:1;"><p style="font-size:9.5pt;font-weight:bold;">`, t, `</p></div>`,
        (i<4 ? `<p style="color:#` : '<!--'), C.green, (i<4 ? `;font-size:11pt;">›</p>` : `--noarrow-->`)
      )).join(''), `
    </div>
    <!-- 案例 -->
    <div style="position:absolute;left:40pt;right:40pt;top:168pt;background:#FFFFFF;border-left:4pt solid #`, C.green, `;padding:12pt 16pt;">
      <p class="chip" style="color:#`, C.greenD, `;">实操案例</p>
      <div style="display:flex;gap:14pt;margin-top:8pt;">
        <div style="flex:1;border-left:2pt solid #`, C.line, `;padding-left:10pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">发现</p>
          <p class="small" style="margin-top:2pt;color:#`, C.ink, `;">某运营转化率低于团队平均 <b class="rust">30%</b>。</p>
        </div>
        <div style="flex:1;border-left:2pt solid #`, C.line, `;padding-left:10pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">定位</p>
          <p class="small" style="margin-top:2pt;color:#`, C.ink, `;">漏斗「资料上传」流失比团队高 <b class="rust">25%</b>。</p>
        </div>
        <div style="flex:1;border-left:2pt solid #`, C.line, `;padding-left:10pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导</p>
          <p class="small" style="margin-top:2pt;color:#`, C.ink, `;">追问：技能？流程？沟通方式？</p>
        </div>
        <div style="flex:1;border-left:2pt solid #`, C.green, `;padding-left:10pt;">
          <p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">结果</p>
          <p class="small" style="margin-top:2pt;color:#`, C.ink, `;">两周后转化率<b class="green">提升至接近平均</b>。</p>
        </div>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:46pt;background:#`, C.panel, `;padding:10pt 14pt;display:flex;justify-content:space-around;">
      <p class="body"><b class="green">多问少说</b></p>
      <p class="body"><b class="green">聚焦行为</b>，而非人格</p>
      <p class="body">给<b class="green">具体可执行</b>的反馈</p>
    </div>
  `, ftr())
));

// ===== 第11页 三者关系总结 =====
slides.push(base(
  P(hdr('总结', '11', C.ink), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip">SYNTHESIS</div>
      <h1 class="h1" style="margin-top:6pt;">一句话串起全部内容</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:140pt;display:flex;gap:12pt;">
      <div style="flex:1;background:#FFFFFF;padding:16pt;border-top:5pt solid #`, C.gold, `;text-align:center;">
        <p class="serif" style="font-size:14pt;font-weight:bold;color:#`, C.gold, `;">数据驱动运营</p>
        <p class="small" style="margin-top:10pt;color:#`, C.ink, `;">看清业务、发现机会</p>
        <div style="margin-top:12pt;background:#`, C.panel, `;padding:6pt;"><p class="tiny" style="color:#`, C.goldD, `;font-weight:bold;">数据是武器</p></div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:16pt;border-top:5pt solid #`, C.blue, `;text-align:center;">
        <p class="serif" style="font-size:14pt;font-weight:bold;color:#`, C.blue, `;">客户分层</p>
        <p class="small" style="margin-top:10pt;color:#`, C.ink, `;">精准识别、差异运营</p>
        <div style="margin-top:12pt;background:#EDF1F7;padding:6pt;"><p class="tiny" style="color:#`, C.blueD, `;font-weight:bold;">分层是战术</p></div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:16pt;border-top:5pt solid #`, C.green, `;text-align:center;">
        <p class="serif" style="font-size:14pt;font-weight:bold;color:#`, C.green, `;">人员分层辅导</p>
        <p class="small" style="margin-top:10pt;color:#`, C.ink, `;">因材施教、保障执行</p>
        <div style="margin-top:12pt;background:#E8F0EA;padding:6pt;"><p class="tiny" style="color:#`, C.greenD, `;font-weight:bold;">辅导是基本功</p></div>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;bottom:48pt;text-align:center;background:#`, C.ink, `;color:#fff;padding:14pt;">
      <p class="serif" style="font-size:15pt;font-weight:bold;">三者缺一不可，<span style="color:#`, C.gold, `;">管理者</span>是串联三者的核心。</p>
    </div>
  `, ftr())
));

// ===== 第12页 立即行动清单 =====
slides.push(base(
  P(hdr('行动清单', '12', C.gold), `
    <div style="position:absolute;left:40pt;top:64pt;">
      <div class="chip" style="color:#`, C.gold, `;">ACTION ITEMS</div>
      <h1 class="h1" style="margin-top:6pt;">回去就能做的三件事</h1>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:140pt;">
      <div style="display:flex;align-items:center;gap:8pt;margin-bottom:6pt;">
        <div style="background:#`, C.gold, `;color:#fff;padding:3pt 10pt;"><p style="font-size:10pt;font-weight:bold;">本周</p></div>
        <div style="flex:1;height:1pt;background:#`, C.line, `;"></div>
      </div>
      <div style="display:flex;gap:10pt;margin-top:6pt;">
        <div style="width:30pt;height:30pt;border-radius:50%;background:#`, C.gold, `;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><p style="font-weight:bold;">1</p></div>
        <div style="flex:1;background:#FFFFFF;padding:9pt 12pt;"><p class="body">梳理团队当前用的<b>核心指标</b>，确认是否对齐公司北极星。</p></div>
      </div>
      <div style="display:flex;gap:10pt;margin-top:8pt;">
        <div style="width:30pt;height:30pt;border-radius:50%;background:#`, C.gold, `;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><p style="font-weight:bold;">2</p></div>
        <div style="flex:1;background:#FFFFFF;padding:9pt 12pt;"><p class="body">识别团队中 <b>1 名最需要辅导的员工</b>，准备一次数据化辅导对话。</p></div>
      </div>
    </div>
    <div style="position:absolute;left:40pt;right:40pt;top:262pt;">
      <div style="display:flex;align-items:center;gap:8pt;margin-bottom:6pt;">
        <div style="background:#`, C.green, `;color:#fff;padding:3pt 10pt;"><p style="font-size:10pt;font-weight:bold;">本月</p></div>
        <div style="flex:1;height:1pt;background:#`, C.line, `;"></div>
      </div>
      <div style="display:flex;gap:10pt;margin-top:6pt;">
        <div style="width:30pt;height:30pt;border-radius:50%;background:#`, C.green, `;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><p style="font-weight:bold;">3</p></div>
        <div style="flex:1;background:#FFFFFF;padding:9pt 12pt;"><p class="body">用一次<b>真实业务数据</b>做团队复盘，用「数据说话」代替「感觉说话」。</p></div>
      </div>
    </div>
  `, ftr())
));

// ===== 第13页 Q&A =====
slides.push(base(
  P(
    `<img src="assets/end-bg.png" style="position:absolute;left:0;top:0;width:720pt;height:405pt;">`,
    `<div style="position:absolute;left:0;right:0;top:120pt;text-align:center;">`,
      `<p class="serif" style="color:#`, C.gold, `;font-size:11pt;letter-spacing:6pt;font-weight:bold;">QUESTIONS &amp; DISCUSSION</p>`,
      `<h1 class="serif" style="color:#FFFFFF;font-size:60pt;font-weight:bold;margin-top:14pt;">Q &amp; A</h1>`,
      `<div style="width:60pt;height:3pt;background:#`, C.gold, `;margin:18pt auto;"></div>`,
      `<p style="color:#A8BACE;font-size:14pt;margin-top:6pt;">提问与交流</p>`,
    `</div>`,
    `<div style="position:absolute;left:0;right:0;bottom:40pt;text-align:center;color:#6E8198;font-size:9pt;">`,
      `<p>课程反馈二维码　｜　感谢聆听</p>`,
    `</div>`
  ),
  ''
));

// 写出
slides.forEach((html, i) => {
  const n = String(i + 1).padStart(2, '0');
  fs.writeFileSync(path.join(SLIDES_DIR, `slide-${n}.html`), html);
});
console.log('Generated', slides.length, 'slides');
