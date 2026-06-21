import { useEffect, useState, Fragment } from 'react'

// ============================================================
// 世界上只有一种语言：意图的语言
// 从建筑的物理结构，到语言的意图结构
// ============================================================

// ---------- 阅读进度条 ----------
function ReadingProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setW(scrolled * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="reading-bar" style={{ width: `${w}%` }} />
}

// ---------- 章节外壳 ----------
function Section({ id, num, title, subtitle, children }: {
  id: string; num: string; title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 md:px-0 py-20 md:py-28">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="section-num text-2xl md:text-3xl">{num}</span>
        <div className="hairline flex-1 mt-4 opacity-60" />
      </div>
      <h2 className="serif text-3xl md:text-4xl font-medium leading-tight mb-2" style={{ color: 'var(--ink)' }}>
        {title}
      </h2>
      {subtitle && <p className="ink-muted text-sm md:text-base mt-3 mb-10 tracking-wide">{subtitle}</p>}
      <div className="prose-body text-base md:text-[17px] mt-8">{children}</div>
    </section>
  )
}

// ---------- Hero ----------
function Hero() {
  return (
    <header className="relative min-h-[92vh] flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 overflow-hidden">
      {/* 背景建筑剪影 + 语言字符 双柱 */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* 左：建筑天际线 */}
        <g fill="none" stroke="#1C1A17" strokeWidth="1.2">
          <path d="M40 700 L40 420 L120 360 L120 700" />
          <path d="M140 700 L140 500 L200 460 L260 500 L260 700" />
          <path d="M280 700 L280 380 L340 340 L400 380 L400 700" />
          <path d="M180 460 L180 440 M220 460 L220 440" />
        </g>
        {/* 右：字符柱 */}
        <g fill="#1C1A17" fontFamily="Songti SC, serif" fontSize="48">
          <text x="1180" y="200">語</text>
          <text x="1180" y="290">意</text>
          <text x="1180" y="380">言</text>
          <text x="1180" y="470">建</text>
          <text x="1180" y="560">築</text>
        </g>
      </svg>

      <div className="relative z-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[var(--ochre)]" />
          <span className="mono text-xs tracking-[0.3em] uppercase ink-muted">An Essay · 2026</span>
        </div>
        <h1 className="serif font-medium leading-[1.05] text-5xl md:text-7xl lg:text-8xl mb-6" style={{ color: 'var(--ink)' }}>
          世界上只有<br/>一种语言
        </h1>
        <p className="serif text-xl md:text-3xl mt-4 ink-soft leading-snug">
          意图的语言<span className="ochre mx-3">·</span>从建筑的物理结构<br className="hidden md:block"/>到语言的意图结构
        </p>

        {/* 核心命题卡片 */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] max-w-3xl">
          <div className="bg-paper p-6 md:p-8">
            <div className="mono text-xs tracking-widest ink-muted mb-3">建 筑</div>
            <p className="serif text-lg md:text-xl leading-relaxed ink">
              本体条件是<br/><span className="ochre">物理稳定</span>
            </p>
          </div>
          <div className="bg-paper p-6 md:p-8">
            <div className="mono text-xs tracking-widest ink-muted mb-3">语 言</div>
            <p className="serif text-lg md:text-xl leading-relaxed ink">
              本体条件是<br/><span className="ochre">意图可识别</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 ink-muted text-sm">
          <span>向下阅读</span>
          <div className="w-12 h-px bg-[var(--ink-muted)]" />
        </div>
      </div>
    </header>
  )
}

// ---------- §I 双柱隐喻图 ----------
function DualPillars() {
  return (
    <figure className="my-12 md:my-16">
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="建筑与语言的双柱隐喻">
        {/* 地平线 */}
        <line x1="20" y1="360" x2="740" y2="360" stroke="#1C1A17" strokeWidth="1.5"/>
        <text x="380" y="395" textAnchor="middle" fontFamily="Songti SC, serif" fontSize="13" fill="#8A8378">存在的最低条件</text>

        {/* 左柱：建筑 */}
        <g>
          <text x="190" y="50" textAnchor="middle" fontFamily="Songti SC, serif" fontSize="20" fill="#1C1A17" fontWeight="500">建 筑</text>
          {/* 三种风格剪影 */}
          <g stroke="#4A453E" fill="none" strokeWidth="1.3">
            {/* 哥特尖拱 */}
            <path d="M70 320 L70 200 Q100 150 130 200 L130 320"/>
            <path d="M70 200 L130 200"/>
            {/* 中式屋顶 */}
            <path d="M150 320 L150 220 L165 210 Q190 185 215 210 L230 220 L230 320"/>
            {/* 现代方盒 */}
            <path d="M250 320 L250 180 L320 180 L320 320"/>
            <line x1="250" y1="240" x2="320" y2="240"/>
          </g>
          {/* 底座 */}
          <rect x="60" y="338" width="270" height="22" fill="#1C1A17"/>
          <text x="195" y="353" textAnchor="middle" fontFamily="Songti SC, serif" fontSize="12" fill="#F4F1EA">物理稳定</text>
        </g>

        {/* 中分虚线 */}
        <line x1="380" y1="60" x2="380" y2="340" stroke="#D4CDBE" strokeWidth="1" strokeDasharray="3 4"/>

        {/* 右柱：语言 */}
        <g>
          <text x="570" y="50" textAnchor="middle" fontFamily="Songti SC, serif" fontSize="20" fill="#1C1A17" fontWeight="500">语 言</text>
          {/* 多种文字符号 */}
          <g fontFamily="Songti SC, serif" fill="#4A453E" fontSize="22">
            <text x="460" y="140">語</text>
            <text x="510" y="140">言</text>
            <text x="560" y="140">Language</text>
            <text x="460" y="190">言葉</text>
            <text x="540" y="190">Langue</text>
            <text x="460" y="240">لغة</text>
            <text x="540" y="240">Sprache</text>
          </g>
          {/* 底座 */}
          <rect x="440" y="338" width="270" height="22" fill="#A8531E"/>
          <text x="575" y="353" textAnchor="middle" fontFamily="Songti SC, serif" fontSize="12" fill="#F4F1EA">意图可识别</text>
        </g>
      </svg>
      <figcaption className="text-center ink-muted text-sm mt-4 serif">
        风格各异，底座同一。建筑在物理世界中成立，语言在交际世界中成立。
      </figcaption>
    </figure>
  )
}

// ---------- §II 建筑六层层级 ----------
function ArchiLayers() {
  const layers = [
    { k: '物理规律', d: '重力 · 承重 · 材料强度 · 结构稳定', base: true },
    { k: '材料技术', d: '木 · 石 · 砖 · 钢筋混凝土 · 玻璃' },
    { k: '功能需求', d: '居住 · 祭祀 · 办公 · 审判 · 展示权力' },
    { k: '社会制度', d: '礼制秩序 · 等级 · 仪式 · 产权' },
    { k: '文化风格', d: '哥特 · 中式 · 现代主义 · 伊斯兰 · 侘寂' },
    { k: '审美表达', d: '比例 · 光影 · 装饰 · 象征', top: true },
  ]
  return (
    <figure className="my-12 md:my-16">
      <div className="space-y-px">
        {layers.map((l, i) => (
          <div key={l.k} className="lift grid grid-cols-12 items-center gap-3 px-4 md:px-6 py-4 md:py-5"
            style={{ background: l.base ? '#1C1A17' : l.top ? 'var(--stone)' : 'var(--paper-soft)' }}>
            <div className="col-span-1 mono text-xs ink-muted">{String(layers.length - i).padStart(2,'0')}</div>
            <div className={`col-span-4 md:col-span-3 serif text-lg md:text-xl ${l.base ? 'text-[var(--paper)]' : 'ink'}`}>{l.k}</div>
            <div className={`col-span-7 md:col-span-8 text-sm ${l.base ? 'text-[var(--paper)] opacity-80' : 'ink-soft'}`}>{l.d}</div>
          </div>
        ))}
      </div>
      <figcaption className="ink-muted text-sm mt-4 serif text-center">
        自下而上：建筑先必须站得住，然后才可能成为哥特式、中式或现代主义。
      </figcaption>
    </figure>
  )
}

// ---------- §IV 意图三层结构 ----------
function IntentionLayers() {
  const layers = [
    {
      n: '一', t: '心理意向性', en: 'Intentionality',
      d: '心灵状态具有"关于某物"的能力——我看见、害怕、相信、想要、期待。意识不是空白流动，而是总是指向某物。',
      src: 'Stanford Encyclopedia of Philosophy'
    },
    {
      n: '二', t: '交际意图', en: 'Communicative Intention',
      d: '我有一个想法；我想让你知道；我还想让你知道我是故意让你知道。这是语言与普通信号的根本区别——树叶传递"有风"，但没有意图。',
      src: 'Sperber & Wilson · 关联理论'
    },
    {
      n: '三', t: '共享意向性', en: 'Shared Intentionality',
      d: '我注意某物，希望你注意，相信你能识别我这个意图——于是我们拥有一个共同对象。语言从个体心理推向共同世界。',
      src: 'Tomasello · 共同注意 / 共同基础'
    },
  ]
  return (
    <div className="my-12 md:my-16 space-y-px">
      {layers.map((l, i) => (
        <div key={l.n} className="bg-paper-soft p-6 md:p-8 lift" style={{ borderLeft: `3px solid ${i===0?'var(--ochre-soft)':i===1?'var(--ochre)':'var(--ochre-deep)'}` }}>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="serif text-3xl ochre">{l.n}</span>
            <div className="flex-1">
              <h4 className="serif text-xl md:text-2xl ink">{l.t}</h4>
              <div className="mono text-xs ink-muted tracking-wider mt-1">{l.en}</div>
            </div>
          </div>
          <p className="text-[15px] md:text-base ink-soft leading-relaxed">{l.d}</p>
          <div className="mono text-xs ink-muted mt-3">— {l.src}</div>
        </div>
      ))}
    </div>
  )
}

// ---------- §V 建筑×语言对应表 ----------
function CorrespondenceTable() {
  const rows = [
    { archi: '在物理世界中成立', lang: '在交际世界中成立', key: true },
    { archi: '服从重力与承重', lang: '服从意图可识别性' },
    { archi: '材料：木石钢玻璃', lang: '媒介：语音文字手势' },
    { archi: '功能：居住办公祭祀', lang: '行为：请求承诺宣告' },
    { archi: '社会制度进入空间', lang: '社会关系进入表达' },
    { archi: '哥特 / 中式 / 现代主义', lang: '中文 / 英文 / 阿拉伯语' },
    { archi: '审美：比例光影装饰', lang: '修辞：隐喻礼貌反讽' },
  ]
  return (
    <figure className="my-12 md:my-16">
      <div className="grid grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
        <div className="bg-ink p-4 md:p-5 text-center">
          <div className="mono text-xs tracking-[0.3em] text-[var(--paper)] opacity-70">建 筑</div>
        </div>
        <div className="bg-[var(--ochre)] p-4 md:p-5 text-center">
          <div className="mono text-xs tracking-[0.3em] text-[var(--paper)] opacity-90">语 言</div>
        </div>
        {rows.map((r, i) => (
          <Fragment key={i}>
            <div className="bg-paper p-4 md:p-5 flex items-center min-h-[64px]"
              style={r.key ? { background: 'var(--paper-soft)' } : {}}>
              <div className="serif text-[15px] md:text-base ink leading-snug">{r.archi}</div>
            </div>
            <div className="bg-paper p-4 md:p-5 flex items-center min-h-[64px]"
              style={r.key ? { background: 'var(--paper-soft)' } : {}}>
              <div className="serif text-[15px] md:text-base ink leading-snug">{r.lang}</div>
            </div>
          </Fragment>
        ))}
      </div>
      <figcaption className="ink-muted text-sm mt-4 serif text-center">
        关键在第一行：建筑最深层是「它如何在物理世界中成立」，语言最深层是「它如何在交际世界中成立」。
      </figcaption>
    </figure>
  )
}

// ---------- §VI 六次转向时间轴 ----------
function HistoryTurns() {
  const turns = [
    { n: '01', e: '古典语法', t: '形式秩序', d: '声音、词类、句法、修辞的系统。语言被看成静态对象，而非交际行为。' },
    { n: '02', e: '结构主义', t: '符号系统', d: 'Saussure 之后，语言由差异关系构成。解释了「结构」，尚未充分解释「使用」。' },
    { n: '03', e: '生成语法', t: '心智能力', d: 'Chomsky 推进到认知层面。Hymes 补充 communicative competence，把语言拉回社会交际。' },
    { n: '04', e: '语用学转向', t: '使用中的意图', d: 'Grice、Austin、Searle：一句话的本质不是字面形式，而是 illocutionary force，言外行为力量。' },
    { n: '05', e: '发展心理学', t: '共同意图先于词', d: 'Baldwin、Csibra & Gergely：儿童进入语言不是先进入词典，而是先进入共同注意结构。' },
    { n: '06', e: '计算语用学', t: '意图推理可模型化', d: 'RSA 框架把 Grice 式语用学变成可计算、可实验、可预测的模型。' },
  ]
  return (
    <figure className="my-12 md:my-16">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[18px] h-px bg-[var(--rule)] hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-3">
          {turns.map((t) => (
            <div key={t.n} className="relative">
              <div className="w-9 h-9 rounded-full bg-paper border-2 border-[var(--ochre)] flex items-center justify-center mono text-xs ochre shrink-0 relative z-10">
                {t.n}
              </div>
              <div className="mt-3 md:mt-4">
                <div className="serif text-base ink font-medium">{t.e}</div>
                <div className="mono text-[11px] ink-muted tracking-wider mt-0.5">{t.t}</div>
                <p className="text-[13px] ink-soft leading-relaxed mt-2">{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="ink-muted text-sm mt-8 serif">
        从形式 → 结构 → 心智 → 使用 → 共同注意 → 计算：语言研究一步步从「句子长什么样」走向「意图如何在交际中成立」。
      </figcaption>
    </figure>
  )
}

// ---------- §VIII 语言全结构 7 步 ----------
function FullStructure() {
  const steps = [
    { n: '1', t: '内部经验', d: '我看到、感到、判断、需要、计划。' },
    { n: '2', t: '意图形成', d: '我想让你注意、知道、相信、感受、行动。' },
    { n: '3', t: '明示信号', d: '我用声音、眼神、手势、文字、语调告诉你：我现在在对你表达。' },
    { n: '4', t: '符号表达', d: '我选择词汇、语法、句型、隐喻、礼貌策略。' },
    { n: '5', t: '听者推理', d: '你根据语境、关系、共同知识反推我为什么这样说。' },
    { n: '6', t: '共同基础更新', d: '如果你理解了，我们之间的共同世界被改变。' },
    { n: '7', t: '行动协调', d: '你回应、行动、拒绝、追问、沉默、修正。' },
  ]
  return (
    <figure className="my-12 md:my-16">
      <div className="relative pl-4 md:pl-8">
        <div className="absolute left-[7px] md:left-[15px] top-3 bottom-3 w-px bg-[var(--rule)]" />
        <div className="space-y-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative flex gap-5 items-start">
              <div className="w-4 h-4 rounded-full bg-[var(--ochre)] ring-4 ring-[var(--paper)] shrink-0 mt-1 relative z-10" />
              <div className="flex-1 pb-1">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-xs ink-muted">{String(i+1).padStart(2,'0')}</span>
                  <h4 className="serif text-lg ink font-medium">{s.t}</h4>
                </div>
                <p className="text-[14px] ink-soft leading-relaxed mt-1">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="quote-block mt-8">
        <p className="text-base md:text-lg">语言不是「声音 → 意义」的简单流程。语言是：<em>一个人的内部世界，通过意图结构，进入另一个人的世界</em>。</p>
      </div>
    </figure>
  )
}

// ---------- APP 颠覆性：路径对比 ----------
function PathCompare() {
  const oldPath = ['语言材料', '练习', '未来使用']
  const newPath = ['真实意图', '目标语表达', '语境沉淀', '复现', '掌握']
  return (
    <figure className="my-12 md:my-16">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="mono text-xs tracking-widest ink-muted">传 统 路 径</span>
            <div className="hairline flex-1" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {oldPath.map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <div className="px-4 py-2.5 bg-stone ink-soft text-sm rounded-sm">{p}</div>
                {i < oldPath.length - 1 && <span className="ink-muted">→</span>}
              </div>
            ))}
          </div>
          <p className="ink-muted text-xs mt-3">隐含逻辑：先掌握语言材料，再等待未来某一天能够交流。</p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="mono text-xs tracking-widest ochre">空 气 小 猪 路 径</span>
            <div className="flex-1 h-px bg-[var(--ochre-soft)]" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {newPath.map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <div className="px-4 py-2.5 text-sm rounded-sm font-medium"
                  style={i === 0 ? { background: 'var(--ochre-deep)', color: 'var(--paper)' } : { background: 'var(--ochre)', color: 'var(--paper)' }}>{p}</div>
                {i < newPath.length - 1 && <span className="ochre">→</span>}
              </div>
            ))}
          </div>
          <p className="ink-muted text-xs mt-3">真实生活持续生成语言能力：每一次表达都被朗读、保存、沉淀为 Memo 组块，反复复现。</p>
        </div>
      </div>
    </figure>
  )
}

// ---------- APP 五个升级 ----------
function FiveUpgrades() {
  const items = [
    { from: '知识对象', to: '交际事件', k: '语言' },
    { from: '课堂时间', to: '生活时间', k: '学习' },
    { from: '记忆工具', to: '意图痕迹系统', k: '词卡' },
    { from: '句子转换', to: '意图转写', k: '翻译' },
    { from: '模拟陪练', to: '表达复现机制', k: 'AI 语伴' },
  ]
  return (
    <figure className="my-12 md:my-16">
      <div className="space-y-px">
        {items.map((it, i) => (
          <div key={it.k} className="bg-paper-soft grid grid-cols-12 items-center gap-3 px-4 md:px-6 py-4 md:py-5">
            <div className="col-span-2 md:col-span-1 mono text-xs ink-muted tracking-wider">{String(i+1).padStart(2,'0')}</div>
            <div className="col-span-3 md:col-span-2 serif text-lg ink">{it.k}</div>
            <div className="col-span-6 md:col-span-3 text-sm ink-muted line-through decoration-[var(--ink-muted)]">{it.from}</div>
            <div className="col-span-1 text-center ochre">→</div>
            <div className="col-span-12 md:col-span-5 serif text-base ochre font-medium">{it.to}</div>
          </div>
        ))}
      </div>
    </figure>
  )
}

// ---------- RSA 结构类比 ----------
function RsaAnalogy() {
  const pairs = [
    { left: '建筑师不随便放梁柱', right: '说话者不随便选词句' },
    { left: '在物理条件下选择', right: '在语境条件下选择' },
    { left: '能稳定传力的结构', right: '能稳定传递意图的表达' },
  ]
  return (
    <figure className="my-10">
      <div className="grid grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
        <div className="bg-paper p-4 text-center serif text-sm ink">建 筑 结 构 力 学</div>
        <div className="bg-paper p-4 text-center serif text-sm ochre">RSA · 说话者—听者推理</div>
        {pairs.map((p, i) => (
          <Fragment key={i}>
            <div className="bg-paper-soft p-4 text-center text-[13px] ink-soft">{p.left}</div>
            <div className="bg-paper-soft p-4 text-center text-[13px] ink-soft">{p.right}</div>
          </Fragment>
        ))}
      </div>
    </figure>
  )
}

export default function App() {
  return (
    <main className="min-h-screen bg-paper">
      <ReadingProgress />
      <Hero />

      <div className="hairline-ink mx-6 md:mx-16" />

      <Section id="problem" num="壹" title="真正的问题" subtitle="不是「语言有多少种」，而是「语言凭什么成立」">
        <p>世界上确实有很多自然语言。Ethnologue 目前列出 <strong>7,170</strong> 种仍在使用的语言；WALS 也把世界语言在语音、语法、词汇等结构特征上的差异系统记录下来。</p>
        <p>世界上有很多建筑，哥特式向上，中式院落向内；现代主义强调功能，伊斯兰建筑强调几何、庭院与光影；原始棚屋、宫殿、寺庙、办公楼、住宅、桥梁也都不同。</p>
        <p>它们之所以都属于建筑，不是因为它们共享同一种外观，而是因为它们共享一个更底层的存在条件：<em>它们必须在物理世界中成立</em>。</p>
        <p>也就是说，建筑存在的最低条件不是风格，不是装饰，不是文化象征，甚至不首先是「居住功能」，而是：它必须服从重力、承重、材料强度、结构稳定性。没有这个底层物理条件，建筑就不存在。</p>
        <p>语言也是这样。中文、英文、日文、法文、阿拉伯语、德语，它们不像——发音不同，文字不同，语法不同，词序不同，礼貌系统不同，隐喻系统不同，历史来源不同。但它们之所以都能被称为语言，是因为它们共享一个更底层的交际条件：<em>说话者的意图必须能够被听者识别、推断和回应</em>。</p>
        <p>没有这个条件，声音只是声音，文字只是图形，词汇只是符号，语法只是排列。</p>
        <DualPillars />
      </Section>

      <Section id="archi-base" num="贰" title="建筑的存在底层" subtitle="物理规律先于风格和功能">
        <p>建筑有功能——它可以遮风避雨，可以居住，可以祭祀，可以办公，可以审判，可以展示权力，可以组织城市空间。建筑也有风格——哥特式、中式禅意、古典主义、巴洛克、现代主义、伊斯兰建筑、日式侘寂，每一种风格都承载着时代、技术、宗教、权力和生活方式。</p>
        <p>但是，功能和风格都不是建筑最底层的存在条件，最底层的是物理规律。</p>
        <div className="quote-block my-8">
          <p className="text-lg md:text-xl">哥特式教堂之所以能够向上生长，不只是因为宗教想象，也因为<em>尖拱、肋架拱顶、飞扶壁</em>等结构技术使它能够把重量导向外部支撑。</p>
        </div>
        <p>中式木构建筑形成柱网、斗拱、院落和屋顶体系，与木材传统、礼制秩序、气候和家族生活有关。现代主义建筑能发展出玻璃幕墙、开放平面和高层结构，依赖钢筋、混凝土、电梯、工业生产和城市化。</p>
        <p>所以，建筑的层级应该是：物理规律 → 材料技术 → 功能需求 → 社会制度 → 文化风格 → 审美表达，而不是反过来。建筑不是先有风格再勉强站起来——<strong>建筑是先必须站得住，然后才可能成为哥特式、中式、现代主义或其他风格</strong>。</p>
        <ArchiLayers />
      </Section>

      <Section id="lang-base" num="叁" title="语言的存在底层" subtitle="意图识别先于词汇、语法和文化表达">
        <p>语言也是同样的结构。我们通常从语言的外层看语言：发音、文字、单词、语法、句型、翻译、修辞。但这些都不是语言最底层的存在条件。</p>
        <p>语言最底层的问题是：<em>一个人的内部状态，如何成为另一个人可以识别、推断、回应和共同参与的公共信号？</em></p>
        <p>这正是 Grice 的核心贡献。Grice 把意义从「词本身的意义」推进到 speaker meaning，说话者意义：听者理解一句话，不只是解码字面内容，而是推断说话者想让自己理解什么。Stanford Encyclopedia of Philosophy 对 Grice 的总结也指出，Grice 的会话准则帮助听者从说出内容建立推理桥梁，理解说话者真正传达的东西。</p>
        <div className="quote-block my-8">
          <p className="text-lg md:text-xl">词义不是语言的终点，词义只是<em>意图推理的入口</em>。</p>
        </div>
      </Section>

      <Section id="intention" num="肆" title="意图不是简单「想法」" subtitle="它是语言的存在结构，至少有三层">
        <p>这里的「意图」不能理解得太浅，它不是简单的「我想说什么」，它至少有三层。</p>
        <IntentionLayers />
        <p className="mt-8">因此，语言的底层不是孤立意图，而是：<em>意图被共同识别</em>。一个不能被对方识别的意图，它只是内心状态。</p>
      </Section>

      <div className="hairline mx-6 md:mx-auto md:max-w-3xl" />

      <Section id="correspondence" num="伍" title="建筑和语言的真正对应关系" subtitle="风格在底层之上发生">
        <p>现在可以把建筑和语言做一个更深的对应。</p>
        <CorrespondenceTable />
        <p>建筑最深层不是「房子长什么样」，而是「它如何在物理世界中成立」。语言最深层不是「句子长什么样」，而是「它如何在交际世界中成立」。</p>
        <div className="quote-block my-8">
          <p className="text-lg md:text-xl">建筑的本体条件是<em>物理稳定</em>；语言的本体条件是<em>意图可识别</em>。</p>
        </div>
      </Section>

      <Section id="history" num="陆" title="历史中的语言研究" subtitle="从形式走向意图">
        <p>为了把这个观点写得更深，可以把语言研究史分成几次转向。每一次转向，都把语言从「它长什么样」推向「它如何在交际中成立」。</p>
        <HistoryTurns />
        <p className="mt-8">现代 Rational Speech Act 框架（RSA）把 Grice 式语用学变成了可计算模型。Goodman 和 Frank 的综述指出，RSA 用博弈论和概率建模解释语境中的意义推理，能够解释模糊、夸张等现象。</p>
        <p>这意味着，「意图的语言」不是纯哲学口号，而已经进入可实验、可计算、可预测的模型中。RSA 的核心结构是：<em>说话者选择表达，是为了让听者识别目标意图；听者理解表达，是为了反推说话者为什么选择这个表达</em>。</p>
        <RsaAnalogy />
        <p>这和建筑结构力学的类比很接近——说话者不是随便选词句，而是在语境条件下选择能稳定传递意图的表达。</p>
      </Section>

      <Section id="differences" num="柒" title="语言差异的来源" subtitle="风格不是表面装饰，而是历史沉积">
        <p>自然语言之间的差异不是偶然的，也不是简单装饰。它们像建筑风格一样，是历史、环境、技术、制度、文化长期作用的结果。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] my-8">
          {[
            { k: '历史分化', d: '同一祖源在不同地区分化出不同语言。拉丁语演化出法、西、意；日耳曼语族发展出英、德、荷；汉语内部有普通话、粤语、吴语、闽南语。语言不是一次性设计，而是历史沉积。' },
            { k: '生态与生活方式', d: '海洋、农耕、游牧、山地、沙漠、城市商业社会，对方向、距离、亲属、季节、交易、礼貌、风险的表达需求不同。建筑因气候地理而异，语言也一样。' },
            { k: '社会结构', d: '权力、身份和关系进入语言。同一拒绝意图可被包装成「我再看看」「这个可能有点困难」「That won\'t work for me」。差异不是语言不同，而是关系处理方式不同。' },
            { k: '信息组织方式', d: 'Slobin 的 thinking for speaking：不同语言在说话过程中引导说话者关注不同信息。有的强制标记时态，有的标记证据来源，有的标记敬语或空间关系。' },
          ].map((x) => (
            <div key={x.k} className="bg-paper-soft p-5 md:p-6">
              <div className="serif text-lg ochre font-medium mb-2">{x.k}</div>
              <p className="text-[13px] ink-soft leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <p>语言差异不是不同底层意图，而是<em>不同语言把意图编码成表达时，要求说话者走不同路径</em>。这就像不同建筑风格引导人的行动路线不同：轴线建筑让你沿中心秩序前进，庭院建筑让你层层进入，开放平面让你自由流动。</p>
      </Section>

      <Section id="structure" num="捌" title="语言的真正结构" subtitle="从内部世界到公共世界">
        <p>到这里可以把语言的底层结构重新表述为一个完整过程。语言不是「声音 → 意义」的简单流程，它是一个七步结构：</p>
        <FullStructure />
      </Section>

      <Section id="thesis" num="玖" title="为什么说「世界上只有一种语言」" subtitle="">
        <p>它不是说：世界上只有一种自然语言，而是说：世界上有许多语言形式，但只有一种语言成立条件。</p>
        <p>这个成立条件就是：<em>意图必须能够被识别</em>。</p>
        <p>建筑也是这样。世界上有许多建筑风格，但只有一种建筑成立条件：结构必须能够稳定承载。</p>
        <div className="bg-ink text-[var(--paper)] p-8 md:p-10 my-8">
          <p className="serif text-xl md:text-2xl leading-relaxed">
            建筑的底层是<span className="ochre">物理可承载性</span>；<br/>
            语言的底层是<span className="ochre">意图可识别性</span>。
          </p>
          <div className="mt-6 text-sm opacity-70">风格、文化、时代、技术，都在底层之上发生。没有物理结构，建筑不存在；没有意图识别，语言不存在。</div>
        </div>
        <p>语言符号本身不完成意义；意义在解释者识别意图的过程中完成。</p>
      </Section>

      <Section id="theory" num="拾" title="理论表达" subtitle="">
        <p>建筑的本质不在于它是哥特式、中式、现代主义还是伊斯兰风格，也不首先在于它被用来居住、祭祀、办公还是展示权力。建筑之所以成为建筑，首先是因为它能够在物理世界中成立：它必须服从重力、承重、材料强度和结构稳定性。风格、功能、文化和时代，都建立在这个物理成立条件之上。</p>
        <p>语言也是如此。语言的本质不在于它是中文、英文、法文、日文还是阿拉伯语，也不首先在于它有怎样的发音、文字、词汇和语法。语言之所以成为语言，首先是因为它能够在交际世界中成立：一个人的意图必须能够通过符号被另一个人识别、推断和回应。</p>
        <p>词汇、语法、文化、礼貌、修辞和媒介，都是建立在这个意图成立条件之上的历史形式。</p>
        <div className="quote-block my-8">
          <p className="text-lg md:text-xl">自然语言的差异，是不同文明在不同环境、技术、社会结构和时代条件下形成的<em>表达建筑</em>；语言的共同底层，则是<em>意图的可识别化</em>。</p>
        </div>
        <p>语言的本质不是意图的直接传递，而是意图的<strong>可识别化、可推断化和可共同化</strong>。</p>
      </Section>

      {/* ========== 应用 · 空气小猪 ========== */}
      <div className="bg-stone">
        <div className="max-w-3xl mx-auto px-6 md:px-0 py-20 md:py-28">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="section-num text-2xl md:text-3xl">应 用</span>
            <div className="hairline flex-1 mt-4 opacity-60" />
          </div>
          <h2 className="serif text-3xl md:text-4xl font-medium leading-tight mb-8" style={{ color: 'var(--ink)' }}>
            空气小猪 APP 的颠覆性
          </h2>
          <div className="prose-body text-base md:text-[17px]">
            <p>空气小猪 APP 的颠覆性，在于它重新定义了语言学习的起点。</p>
            <p>传统语言学习从语言的外壳进入语言：单词、语法、课文、题库、课程、词卡、口语练习。它的隐含逻辑是：先掌握语言材料，再等待未来某一天能够交流。</p>
            <p>但真实语言从来不是这样发生的。真实语言不是先有词汇，再有表达；而是<em>先有意图，再寻找形式</em>。一个人想回应、解释、拒绝、安慰、请求、分享、建立关系，语言才被召唤出来。词汇和语法不是语言的起点，而是意图进入公共世界时调用的材料和结构。</p>
            <p>空气小猪 APP 正是从这里切入。它不再把用户放在「学习材料」的面前，而是把用户放回「语言发生」的现场：真实聊天、真实语音、真实发布、真实回复、真实关系、真实情绪、真实表达。用户每一次想说的话，都被转化为目标语言表达；每一次表达，又被朗读、保存、沉淀为 Memo 组块，并在后续对话和 AI 语伴中反复复现，直到变成可理解、可调用、可输出的能力。</p>
            <PathCompare />
            <p className="mt-8">所以，空气小猪 APP 真正改变的不是学习效率，而是<em>语言能力的生成路径</em>。</p>
            <p>Duolingo 解决课程，Anki 解决记忆，LingQ 解决输入，HelloTalk 解决交流，italki 解决真人反馈，Speak 和 ELSA 解决 AI 口语。但它们大多仍然把语言作为外部材料提供给用户。空气小猪 APP 的不同在于：语言材料不是外部给定的，而是<em>从用户自己的真实意图中长出来的</em>。</p>
            <p>这才是它的根本颠覆。</p>
            <FiveUpgrades />
            <p className="mt-8">因此，空气小猪 APP 不是一个更丰富的语言学习工具，而是一个以真实意图为入口的语言习得系统。它真正提出的问题不是：怎样让人更努力地学语言？而是：<em>怎样让人的每一次真实表达，都自动生长为语言能力？</em></p>
          </div>
        </div>
      </div>

      {/* ========== Footer ========== */}
      <footer className="border-t border-[var(--rule)]">
        <div className="max-w-3xl mx-auto px-6 md:px-0 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="serif text-xl ink mb-2">世界上只有一种语言：意图的语言</div>
            <div className="ink-muted text-sm">从建筑的物理结构，到语言的意图结构</div>
          </div>
          <div className="mono text-xs ink-muted tracking-wider">
            Grice · Sperber & Wilson · Tomasello · RSA
          </div>
        </div>
      </footer>
    </main>
  )
}
