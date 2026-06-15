export const meta = {
  name: 't01-t08-rewrite',
  description: '用 wiki 真实数据重写 T01-T08 模板内容，每模 14-16 页',
  phases: [
    { title: 'T01-T04', detail: '并行写入前4个模板' },
    { title: 'T05-T08', detail: '并行写入后4个模板' },
  ],
}

const TEMPLATE_DIR = '.claude/skills/nian-design/references/templates-v2'
const WIKI_DIR = 'wiki/raw'

// Visual standards shared by all templates
const VISUAL_STANDARDS = `
## Visual Standards (MUST follow)
- Use sh/shn/sst component pattern for section headers:
  \`<div class="sh"><div class="shn">01</div><div class="sst">标题</div></div>\`
- ghost decorations: position absolute, 22vw, opacity .04, color var(--glacier)
- Deep dark pages use --olive-l instead of --olive for accent
- Alternating backgrounds: --bg / --sr / --srr (cycle through)
- Number decoration cards: position:absolute, top:-12px, right:8px, font-size:64px, opacity:.03
- gap:1px grid with background:var(--bd) for table-like layouts
- Page numbers: position:absolute, bottom:24px, right:32px, font-family:var(--fm), font-size:10px
- .co class for callout blocks: border-left:3px solid var(--olive)
- .htg for header tags
- .ns/.nsc/.nsn/.nsl for number shock grids
- .kp/.ki/.kn/.kt for key points
- .sg/.sc/.scn/.scl for stat grids
- NO emoji, NO shadows, NO gradients, NO border-radius > 6px
- Font families: --fd (Playfair Display), --fb (Inter), --fm (JetBrains Mono)
`

const CONTENT_STANDARDS = `
## Content Density Standards (MUST follow)
- Every page must contain: specific numbers or thresholds (e.g. "≤85%" not "较低")
- Decision matrices or classification tables with real data
- Real business scenarios with concrete examples
- Judgment criteria (e.g. "连续2月后30%→橙色")
- Use real supplier names: 毅航、毛毛虫、伽玛、赛维斯、岐力、翰锐
- Use real business lines: 金条、企金、信用卡、财富
- Use real numbers from the wiki sources
`

// T01: Statement Hero → 供应商管理办法总纲
const T01_PROMPT = `You are rewriting T01-供应商管理办法.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T01-供应商管理办法.html
READ wiki sources:
- ${WIKI_DIR}/SM-2026-001_供应商管理办法.md
- ${WIKI_DIR}/A1-业绩异常判断.md
- ${WIKI_DIR}/SM-2026-020_供应商日常管理规范.md

KEEP the exact CSS <style> block from the existing template. Only rewrite the content pages.

Write 14 pages with this structure:
P1: HERO — Statement style. Title "供应商管理办法·总纲", subtitle with 4 principles, bottom tags
P2: 四大管理原则 — 4 cards with principles (规则先行/数据驱动/公平透明/闭环管理), real descriptions from wiki
P3: 文件体系 — 5 file hierarchy table (总纲/日常手册/SLA/评估方案/质量管理规范)
P4: 准入条件 — Split layout: 基本资质(5项) + 业务能力(4项), real requirements from wiki
P5: 准入流程 — Timeline: 供应商申请→资质初审5日→业务能力评审10日→试运营90天→转正评估
P6: 异常信号 — 6 signal grid with real thresholds (排名后30%/断崖>20%/峰值<70%/出勤<85%)
P7: 异常级别与干预 — 4 level cards: 黄色关注/橙色干预/红色决策/A级骤降, with real triggers and authorization
P8: 评估体系 — 100分制, 4 dimensions (交付质量40/业务达成30/合规20/配合10), ABCDE grading
P9: 预警状态机 — 6-level S0-S5 state machine with real conditions and actions
P10: 清退机制 — Trigger conditions matrix + 30-day transition + customer data handling
P11: 权责划分 — RACI table: 供应商管理岗/业务对接人/质检团队/站点负责人/站点对接人
P12: SLA指标速查 — 8 metrics with 达标/预警/红线 thresholds, real numbers
P13: 沟通机制 — 4 meeting types with frequency and participants
P14: CLOSING — Dark page, quote about management philosophy

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write the COMPLETE HTML file to: ${TEMPLATE_DIR}/T01-供应商管理办法.html
Use the Write tool. The file must be a complete, valid HTML document.`

// T02: Watermark Hero → SLA与服务承诺
const T02_PROMPT = `You are rewriting T02-金融全景-Watermark.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T02-金融全景-Watermark.html
READ wiki sources:
- ${WIKI_DIR}/SM-2026-040_供应商管理SLA.md
- ${WIKI_DIR}/SM-2026-060_精华版.md

KEEP the exact CSS <style> block. Only rewrite content.

Write 14 pages:
P1: WATERMARK HERO — Title "供应商管理SLA·服务承诺", watermark ghost "SLA"
P2: SLA总览 — Split: left=核心交付指标(4项), right=合规指标(4项), real thresholds
P3: 核心交付指标 — 3 cards: 日均出勤率(≥95%/预警<90%/红线<85%), 产能达标率(≥90%/<80%/<70%), 数据报送(≥98%/<95%/<90%)
P4: 合规指标 — Grid: 信息安全0违规, 持证率100%, 录音100%, 话术≥95%, with scoring table
P5: ABC分级标准 — 3 tier cards: A级≥90续约优先, B级80-89正常, C级70-79关注, D级60-69整改, E级<60清退
P6: 评估维度 — 4 dimensions with weights: 交付质量40/业务达成30/合规20/配合10
P7: 预警响应流程 — Timeline: 触及预警→书面通知→3日整改计划→30天整改→复评
P8: 服务响应时效 — Table: 群消息30min, 紧急立即电话, 整改24h, 月度总结次月3日, 人员变动提前3日
P9: 分量审批流 — Threshold table: <50% C3, ≥50% C3→C2, ≥100% 专项汇报, ≤10人快速通道5日
P10: 集中度管控 — n-1原则 + AI场景上限(3家≤70%/4家≤60%/≥5家≤50%) + 人工场景具体数字
P11: 续签评估 — 90天启动, 60天完成, 评分卡(历史70+合规15+配合15), ≥80分续签
P12: 定价与结算 — 触发条件(±5%市场/±10%成本), 结算T+2月, 45工作日付款
P13: SLA与评估关系 — 两套体系独立运作对比表
P14: CLOSING — Dark page, SLA philosophy quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T02-金融全景-Watermark.html`

// T03: TypeMonument → 方法论体系
const T03_PROMPT = `You are rewriting T03-设计规范-TypeMonument.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T03-设计规范-TypeMonument.html
READ wiki sources:
- ${WIKI_DIR}/MT-2026-100_供应商管理思路梳理.md
- ${WIKI_DIR}/MT-2026-200_方法论速查卡.md

KEEP the exact CSS <style> block including the sidebar bookmark nav. Only rewrite content.

Write 14 pages:
P1: TYPE MONUMENT HERO — Title "供应商管理·方法论体系", subtitle "从个人经验到组织能力"
P2: 方法论总览 — Dark page, 6 modules ring: 触发规则/产能双维度/主管胜任/异常信号/整改闭环/数据防控
P3: 触发规则9状态 — 9-state grid with real triggers and actions from wiki
P4: 产能双维度 — Split: 自身峰值比(>85%/65-85%/<65%) + 头部差距(>80%/60-80%/<60%)
P5: 四象限矩阵 — 2x2 grid: 标杆型(高高)/尽力型(高低)/问题型(低低)/暂时波动(低高)
P6: 主管胜任评估 — 5 indicators: 流失<8%/月, 出勤>90%, 人效趋势, 响应>80%, 整改>70%
P7: 异常信号扫描 — 周度3信号 + 月度5信号, real thresholds
P8: 整改闭环验证 — 4 dimensions: 目标≥80%, 动作≥70%, 持续2月, 根因消除≥1级
P9: 数据防控 — 5 detection signals + quality score (0项=100/1项=70/≥2项=40)
P10: 月度排名5维 — 业绩35%+合规20%+配合20%+组织健康15%+成长性10%
P11: 新供应商6月里程碑 — Timeline: 引入期出勤≥85% → 成长期GMV中位60% → 稳定期排名前70%
P12: 方法论关联速查 — Table mapping methods to chapters
P13: AI提效空间 — 月196h, AI提效83.5h(43%), 人工保留112.5h
P14: CLOSING — Dark page, methodology quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T03-设计规范-TypeMonument.html`

// T04: QuestionHook → 数据驱动管理
const T04_PROMPT = `You are rewriting T04-深度阅读-QuestionHook.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T04-深度阅读-QuestionHook.html
READ wiki sources:
- ${WIKI_DIR}/C1-问题拆解.md
- ${WIKI_DIR}/C2-邮件起草.md
- ${WIKI_DIR}/C3-数据整理分析.md
- ${WIKI_DIR}/C4-制度流程梳理.md

KEEP the exact CSS <style> block including sidebar layout. Only rewrite content.

Write 16 pages:
P1: QUESTION HOOK HERO — Title "为什么数据驱动难以落地？", subtitle about C1-C4 scenarios
P2: 问题拆解方法 — C1: 一句话写问题→事实/判断/行动三层→最小可行动作
P3: 优先级矩阵 — 紧急×影响 2x2 grid with real examples
P4: 邮件起草5类型 — 向上汇报(300字)/供应商通知(量化+截止)/跨部门/口头留痕/定期报告
P5: 邮件检查清单 — 3项: 数据准确性/收件人抄送/语气匹配
P6: 三线对比法 — C3: 自身趋势线(3-6月) + 同类对比线 + 目标阈值线
P7: 排名5维拆解 — 业绩30%+质检客诉25%+上人15%+配合15%+战略15%
P8: 预警阈值速查 — 后30%/出勤<85%/质检<85分/GMV降>20%
P9: 制度流程6步法 — C4: 明确边界→还原现状→找问题→设计改进→写制度→确认落地
P10: 常见问题类型 — 标准模糊/责任不清/时间缺失/信息断点
P11: 数据报送规范 — 每日10:00出勤/下线前业绩/周五周报/次月3日月度总结
P12: 数据质量防控 — 5 signals + quality score system
P13: 落地执行清单 — Checklist format with checkboxes
P14: 闭环流程 — Pipeline: 发起→执行→反馈→归档
P15: 案例验证 — Real supplier case study
P16: CLOSING — Dark page, data-driven quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T04-深度阅读-QuestionHook.html`

// T05: Numeral → 决策判断
const T05_PROMPT = `You are rewriting T05-季度业绩-Numeral.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T05-季度业绩-Numeral.html
READ wiki sources:
- ${WIKI_DIR}/A1-业绩异常判断.md
- ${WIKI_DIR}/A2-约谈准备.md
- ${WIKI_DIR}/A3-分量调整决策.md
- ${WIKI_DIR}/A4-转正延期决策.md
- ${WIKI_DIR}/A5-合规问题定级.md
- ${WIKI_DIR}/A6-清退评估.md

KEEP the exact CSS <style> block. Only rewrite content.

Write 16 pages:
P1: NUMERAL HERO — Title "供应商决策判断体系", 4 key numbers in ns grid
P2: 业绩异常判断 — A1: 7 trigger signals with real thresholds
P3: 异常级别判定 — 4-level matrix: 黄色首次/橙色连续2月/红色连续3月/A级骤降
P4: 产能双维度诊断 — 自身峰值比 + 头部差距, 四象限矩阵
P5: 约谈准备 — A2: 4-stage structure (开场5min/数据10min/原因15min/承诺10min)
P6: 整改跟踪 — Timeline: 3天收计划→1周检查→2周验证→1月验收
P7: 分量调整决策 — A3: 5-dimension scoring (业绩30/质检25/上人15/配合15/战略15)
P8: 分量阈值 — ≥4.0加量/≤2.5减量, 产能≥85%余力/<70%消化不了, 单次≤30%
P9: 转正延期决策 — A4: 6月里程碑 (引入期/成长期/稳定期)
P10: 决策标准 — 转正=前70%+3项达标/延期=接近达标/清退=≤2项
P11: 合规定级 — A5: 三维矩阵 (影响范围×违规性质×累犯)
P12: 三级处理 — 黄色5日/橙色48h/红色24h, with authorization levels
P13: 清退评估 — A6: 触发条件 + 退出可行性判断
P14: 成本对比 — 清退成本 vs 保留成本 analysis
P15: 决策授权矩阵 — Complete authorization table across all A1-A6 scenarios
P16: CLOSING — Dark page, decision philosophy quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T05-季度业绩-Numeral.html`

// T06: Data → 项目落地
const T06_PROMPT = `You are rewriting T06-供应商数据-Data.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T06-供应商数据-Data.html
READ wiki sources:
- ${WIKI_DIR}/B1-新供应商准入.md
- ${WIKI_DIR}/B2-新项目对接.md
- ${WIKI_DIR}/B3-出差巡检准备.md
- ${WIKI_DIR}/B4-月度复盘.md
- ${WIKI_DIR}/B5-向上汇报准备.md
- ${WIKI_DIR}/B6-降价谈判准备.md

KEEP the exact CSS <style> block. Only rewrite content.

Write 14 pages:
P1: DATA HERO — Title "供应商项目落地·执行手册", subtitle about B1-B6 scenarios
P2: 新供应商准入 — B1: 寻源判断 (产能>90%+无法扩容=成立, 80-90%优先扩容, <80%不需)
P3: 准入9维度评分 — Table: 过往业绩/同类型对标/管理方式/人员数量/公司背景/历史交付/配合商务/团队架构/资质合规
P4: 决策阈值 — ≥36准入/30-35有条件/<30拒绝, 单项1分一票否决
P5: 新项目对接 — B2: 5W2H需求澄清 + 分量分配原则
P6: 上线节奏 — 4-week timeline: 头部先上→中位跟进→试水→全量
P7: 出差巡检 — B3: 12项巡检标准 + 得分判定 (≥108优秀/96-107良好/84-95合格)
P8: 巡检流程 — 不预先通知→文件审查+现场观察→问题汇总→整改通知书
P9: 月度复盘 — B4: 6步法 (趋势速览10min/排名扫描15min/产能定性10min/异常归因10min/重点5条/叙事5min)
P10: 向上汇报 — B5: 对象差异 (王易人=具体状态+决策, 军哥=大盘+趋势+投入产出)
P11: 汇报节奏 — 周会2-3min/月度10-15min/专项5-10min/书面3-5min阅读量
P12: 降价谈判 — B6: 目标区间 (理想=均价-5%/可接受=均价/底线=现状-5%)
P13: 谈判筹码 — 分量承诺>增量机会>新产线>结算周期, 年化节省>10万值得谈
P14: CLOSING — Dark page, execution quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T06-供应商数据-Data.html`

// T07: DataPunch → 供应商沟通
const T07_PROMPT = `You are rewriting T07-决策分析-DataPunch.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T07-决策分析-DataPunch.html
READ wiki sources:
- ${WIKI_DIR}/D1-被同事@数据进度.md
- ${WIKI_DIR}/D2-被领导点名.md
- ${WIKI_DIR}/D3-供应商来电来消息.md
- ${WIKI_DIR}/D4-供应商群异常信号.md

KEEP the exact CSS <style> block. Only rewrite content.

Write 14 pages:
P1: DATAPUNCH HERO — Title "供应商沟通·场景应对手册", subtitle about D1-D4
P2: 被同事@数据进度 — D1: 30秒判断 (识别身份→紧急度→能否直接给)
P3: 身份识别矩阵 — 刘伟佳=排名分量/刘乾坤=巡检合规/郭鑫=项目进度
P4: 紧急度分级 — 群@连续追问=5min/群@一次=30min/私聊=当天/邮件=24h
P5: 被领导点名 — D2: 军哥=只报事实/王易人=可给判断但要确认
P6: 5维快速扫描 — 排名趋势/出勤率<85%/业绩断崖>20%/流失>5%/重大事件
P7: 口径模板 — [供应商]目前[定性状态],[关键数据],[已做XX处理/持续关注]
P8: 供应商来电来消息 — D3: 6类意图 (要量/要支持/反映问题/试探/投诉/走近关系)
P9: 紧急度判断 — 在途客户=立即/数据安全=立即+同步/日常咨询=当天/分量=1-3日
P10: 核心原则 — 绝不当场答应具体数字, 30秒内给"收到"
P11: 供应商群异常信号 — D4: 5种信号 (失联24h/态度转向/群内发难/集体信号/沉默退让)
P12: 介入级别 — 仅记录→主动关注→私下沟通→正式约谈→升级上报
P13: 沟通矩阵速查 — Complete decision matrix for all D1-D4 scenarios
P14: CLOSING — Dark page, communication quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T07-决策分析-DataPunch.html`

// T08: Diagonal → 准入评审
const T08_PROMPT = `You are rewriting T08-品牌发布-Diagonal.html with REAL wiki data.

READ the CSS framework from: ${TEMPLATE_DIR}/T08-品牌发布-Diagonal.html
READ wiki sources:
- ${WIKI_DIR}/E1-新供应商初筛.md
- ${WIKI_DIR}/E2-准入评审决策.md
- ${WIKI_DIR}/SM-2026-010_供应商引入管理规范.md
- ${WIKI_DIR}/SM-2026-030_供应商清退管理规范.md

KEEP the exact CSS <style> block. Only rewrite content.

Write 14 pages:
P1: DIAGONAL HERO — Split layout: left=标题 "供应商准入·评审体系", right=dark with tagline
P2: 初筛一票否决 — E1: 注册<2年/注册资本<500万/竞品合规清退/团队来自清退供应商
P3: 业务匹配评估 — 同类经验=加分/只做客服=培训成本高/团队<100人=小产线/报价+20%=不值得
P4: 准入9维度评分 — E2: 过往业绩/同类型对标/管理方式/人员数量/公司背景/历史交付/配合商务/团队架构/资质合规
P5: 决策矩阵 — ≥36准入/30-35有条件/<30拒绝, 单项1分一票否决
P6: 基础资质门槛 — SM-2026-010: 注册资本≥1000万/增值电信许可/资产负债率≤60%/综合≥85分
P7: 引入SOP — 8阶段T+0到T+15标准周期, 紧急引入7工作日
P8: 准入承接 — 15工作日内提交7模块管理规范 (人力/培训/排班/质量/绩效/现场/数据)
P9: 试运营期 — 90天, 月度评估B级及以上, 不达标终止
P10: 清退触发 — SM-2026-030: 即时清退(合规红线48h)/预警清退(连续2月E级5日)/整改无效(最长60天)
P11: 合规红线细节 — 持证: 无证扣5分/假证直接清退; 数据造假: 清退+保证金+3年禁入
P12: 退出后管理 — 单业务线3月禁入+保密2年; 全业务线永久禁入
P13: 审批时效速查 — 引入C3≤3天+C2≤5天; 转正C3≤2天+C2≤3天; 清退C3≤1天+C2≤2天
P14: CLOSING — Dark page, admission philosophy quote

${VISUAL_STANDARDS}
${CONTENT_STANDARDS}

Write COMPLETE HTML to: ${TEMPLATE_DIR}/T08-品牌发布-Diagonal.html`

// Phase 1: T01-T04 in parallel
phase('T01-T04')
const [r1, r2, r3, r4] = await parallel([
  () => agent(T01_PROMPT, { label: 'T01-Statement', phase: 'T01-T04', agentType: 'general-purpose' }),
  () => agent(T02_PROMPT, { label: 'T02-Watermark', phase: 'T01-T04', agentType: 'general-purpose' }),
  () => agent(T03_PROMPT, { label: 'T03-TypeMonument', phase: 'T01-T04', agentType: 'general-purpose' }),
  () => agent(T04_PROMPT, { label: 'T04-QuestionHook', phase: 'T01-T04', agentType: 'general-purpose' }),
])

// Phase 2: T05-T08 in parallel
phase('T05-T08')
const [r5, r6, r7, r8] = await parallel([
  () => agent(T05_PROMPT, { label: 'T05-Numeral', phase: 'T05-T08', agentType: 'general-purpose' }),
  () => agent(T06_PROMPT, { label: 'T06-Data', phase: 'T05-T08', agentType: 'general-purpose' }),
  () => agent(T07_PROMPT, { label: 'T07-DataPunch', phase: 'T05-T08', agentType: 'general-purpose' }),
  () => agent(T08_PROMPT, { label: 'T08-Diagonal', phase: 'T05-T08', agentType: 'general-purpose' }),
])

return {
  t01: r1, t02: r2, t03: r3, t04: r4,
  t05: r5, t06: r6, t07: r7, t08: r8,
  message: '8 templates rewritten with real wiki data'
}
