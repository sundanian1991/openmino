#!/usr/bin/env python3
"""Build dashi-ppt HTML - v3: clean deck replacement"""
import json, re, os

slides = [
    {"id":"theme11_page001-1","key":"theme11_page001","layout":"theme11_page001","dataLayout":"THEME11-001","themePack":"theme11","label":"第 1 页","props":{"wordmarkLabel":"管理层培训","wordmarkSub":"数据驱动运营","railText":"数据驱动运营与人才分层辅导","statusText":"内部培训","deckLabel":"管理层培训","deckYear":"2026","kickerLabel":"管理层专项","kickerText":"从凭感觉到靠数据，从管业务到带队伍","ghostMark":"数","headlineHtml":"<span class=\"row\">数据驱动运营</span><span class=\"row\">人员分层 <span class=\"ign-ember-text\">员工辅导</span></span>","ledeHtml":"从凭感觉到靠数据，从管业务到带队伍","ticker":["数据驱动","客户分层","人员辅导","管理层赋能","执行力保障"],"pageLabel":"开始","tickerCount":5},"media":{}},
    {"id":"theme11_page006-2","key":"theme11_page006","layout":"theme11_page006","dataLayout":"THEME11-006","themePack":"theme11","label":"第 2 页","props":{"ghostMark":"01","railText":"课程核心逻辑","navItems":["课程逻辑"],"navCurrent":0,"ixNo":"01","ixLabel":"OVERVIEW","tagChapter":"核心逻辑","tagEn":"THE LOGIC","headingHtml":"一张图看懂<br><span class=\"ign-ember-text\">今天讲什么</span>","lede":"三个关键词，串起管理者的核心能力","agenda":[{"t":"数据驱动运营","e":"用数据看清业务、发现机会"},{"t":"客户分层","e":"不同客户不同策略，精准配置资源"},{"t":"人员分层辅导","e":"不同员工不同教法，保障策略落地"}],"metaLeft":"数据是武器，分层是战术，辅导是基本功","metaMid":"30分钟","agendaCount":3},"media":{}},
    {"id":"theme11_page023-3","key":"theme11_page023","layout":"theme11_page023","dataLayout":"THEME11-023","themePack":"theme11","label":"第 3 页","props":{"ghostMark":"02","railText":"数据驱动闭环","navItems":["数据闭环"],"navCurrent":0,"ixNo":"02","ixLabel":"PROCESS","lead":"管理者盯住两头，中间让团队跑","headingHtml":"五步闭环<br><span class=\"ign-ember-text\">管理者盯住两头</span>","noteHtml":"数据 → 洞察 → 策略 → 行动 → 反馈（闭环）","steps":[{"t":"数据","e":"DATA"},{"t":"洞察","e":"INSIGHT"},{"t":"策略","e":"STRATEGY"},{"t":"行动","e":"ACTION"},{"t":"反馈","e":"FEEDBACK"}],"caps":[{"t":"看趋势","d":"业务在变好还是变差？"},{"t":"找异常","d":"哪里出了问题或机会？"},{"t":"做决策","d":"资源往哪投？策略怎么调？"}],"metaLeft":"不讲技术实现，只讲管理视角","metaMid":"闭环","stepCount":5},"media":{}},
    {"id":"theme11_page075-4","key":"theme11_page075","layout":"theme11_page075","dataLayout":"THEME11-075","themePack":"theme11","label":"第 4 页","props":{"ghostMark":"03","railText":"北极星指标","navItems":["指标体系"],"navCurrent":0,"ixNo":"03","ixLabel":"METRICS","eyebrowNo":"指标对齐","eyebrowEn":"ALIGNMENT","headingHtml":"对齐目标<br><span class=\"ign-ember-text\">层层穿透</span>","noteHtml":"公司级 → 部门级 → 个人级<br>每一层都要对齐上一级目标","metricCount":3,"emphasis":True,"emphasisIndex":0,"showBands":True,"showTargets":True,"showValues":True,"showStatus":True,"showKicker":True,"showLede":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"targetLabel":"目标","statusHit":"✓ 对齐","statusMiss":"◷ 待对齐","rows":[{"nm":"公司级","en":"Company","meas":85,"target":80,"b2":55,"b3":78,"disp":"在贷余额/AUM","u":"","hit":True},{"nm":"部门级","en":"Department","meas":72,"target":70,"b2":48,"b3":68,"disp":"转化率/活跃度","u":"%","hit":True},{"nm":"个人级","en":"Individual","meas":65,"target":70,"b2":45,"b3":65,"disp":"首投/跟进量","u":"","hit":False}],"metaLeft":"每一层都知道自己在为什么而战","metaMid":"穿透"},"media":{}},
    {"id":"theme11_page011-5","key":"theme11_page011","layout":"theme11_page011","dataLayout":"THEME11-011","themePack":"theme11","label":"第 5 页","props":{"ghostMark":"04","railText":"数据洞察场景","navItems":["实战场景"],"navCurrent":0,"ixNo":"04","ixLabel":"SCENARIOS","leadEn":"THREE SCENARIOS","headingHtml":"数据分析<br><span class=\"ign-ember-text\">解决什么问题</span>","leadText":"三个场景覆盖管理者日常数据需求：看清现状、找到原因、发现增量","panelTitle":"案例","panelTag":"CASE","panelRows":[{"k":"注册→首投","v":"60% <em>→ 85%</em>"},{"k":"问题环节","v":"实名认证 <em>体验差</em>"},{"k":"优化效果","v":"+25<em>%</em>"}],"steps":[{"fn":"01 — 现状","t":"现状看清","en":"AS-IS","d":"整体表现如何？哪类客户好？用趋势图、客户分群对比"},{"fn":"02 — 原因","t":"原因找寻","en":"ROOT CAUSE","d":"问题出在哪个环节？用转化漏斗、分布分析"},{"fn":"03 — 增量","t":"增量发现","en":"OPPORTUNITY","d":"还有哪些未被满足的需求？用客户旅程地图"}],"metaLeft":"不讲技术，只讲管理视角要关注什么","metaMid":"三场景","stepCount":3},"media":{}},
    {"id":"theme11_page060-6","key":"theme11_page060","layout":"theme11_page060","dataLayout":"THEME11-060","themePack":"theme11","label":"第 6 页","props":{"ghostMark":"05","railText":"为什么分层","navItems":["客户分层"],"navCurrent":0,"ixNo":"05","ixLabel":"SEGMENTATION","eyebrowNo":"告别一刀切","eyebrowEn":"WHY SEGMENT","headingHtml":"告别一刀切<br><span class=\"ign-ember-text\">告别预算浪费</span>","colLabel":"传统方式 → 分层后","pairCount":3,"showArrows":True,"showColLabels":True,"emphasis":False,"emphasisIndex":0,"showKicker":True,"showFootLine":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"pairs":[{"p":"70%营销预算投给不会转化的客户","g":"高意向客户转化率提升2-3倍"},{"p":"所有客户用同一套触达策略","g":"不同客户不同价值不同策略"},{"p":"预算花了但看不出效果","g":"精准配置资源，投入产出可衡量"}],"footLine":"不同客户，不同价值，不同策略，不同投入。","metaLeft":"从大水漫灌到精准滴灌","metaMid":"分层"},"media":{}},
    {"id":"theme11_page026-7","key":"theme11_page026","layout":"theme11_page026","dataLayout":"THEME11-026","themePack":"theme11","label":"第 7 页","props":{"ghostMark":"✓","railText":"分层与打法","navItems":["分层策略"],"navCurrent":0,"ixNo":"06","ixLabel":"STRATEGY","lead":"怎么分决定怎么打","headingHtml":"一张表看懂<br><span class=\"ign-ember-text\">分层与对应打法</span>","lede":"分层维度决定运营策略，管理者要清楚每类客户的打法","rowCount":3,"columnCount":3,"highlightColumnIndex":2,"showHeadRow":True,"showLegend":True,"showKicker":True,"showLede":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"rowHeadLabel":"分层维度","colLabels":["怎么分","怎么打","管理者关注"],"usLabel":"执行要点","rows":[{"t":"按资产/行为打标签","en":"Tags","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]},{"t":"按生命周期分","en":"Lifecycle","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]},{"t":"按价值分层","en":"Value Tier","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]}],"legendFull":"核心策略","legendHalf":"辅助策略","legendNone":"待优化","metaLeft":"你的团队精力，主要花在哪些客户上？","metaMid":"自测"},"media":{}},
    {"id":"theme11_page060-8","key":"theme11_page060","layout":"theme11_page060","dataLayout":"THEME11-060","themePack":"theme11","label":"第 8 页","props":{"ghostMark":"07","railText":"为什么靠人","navItems":["人员辅导"],"navCurrent":0,"ixNo":"07","ixLabel":"COACHING","eyebrowNo":"执行落地","eyebrowEn":"WHY PEOPLE","headingHtml":"数据再漂亮<br><span class=\"ign-ember-text\">执行不到位就是零</span>","colLabel":"痛点 → 结论","pairCount":3,"showArrows":True,"showColLabels":True,"emphasis":False,"emphasisIndex":0,"showKicker":True,"showFootLine":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"pairs":[{"p":"新人多，SOP都不熟","g":"需要标准化培训+即时反馈"},{"p":"老员工能力强但带不了人","g":"需要赋予带教机会和管理赋能"},{"p":"被提拔做管理，不知道怎么辅导下属","g":"需要分层辅导方法论"}],"footLine":"策略越精细，越需要分层辅导来保障执行。","metaLeft":"从知道到做到，差一个辅导","metaMid":"落地"},"media":{}},
    {"id":"theme11_page026-9","key":"theme11_page026","layout":"theme11_page026","dataLayout":"THEME11-026","themePack":"theme11","label":"第 9 页","props":{"ghostMark":"★","railText":"人员分层","navItems":["人员分层"],"navCurrent":0,"ixNo":"08","ixLabel":"TIERS","lead":"四层员工，四种教法","headingHtml":"四层员工<br><span class=\"ign-ember-text\">四种教法</span>","lede":"不同阶段的员工需要不同的辅导方式，管理者要识别并匹配","rowCount":4,"columnCount":3,"highlightColumnIndex":2,"showHeadRow":True,"showLegend":True,"showKicker":True,"showLede":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"rowHeadLabel":"员工层级","colLabels":["特点","辅导重点","管理者动作"],"usLabel":"关键动作","rows":[{"t":"新手期","en":"Newbie","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]},{"t":"成长期","en":"Growing","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]},{"t":"成熟期","en":"Mature","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]},{"t":"导师期","en":"Mentor","cells":[{"state":"full"},{"state":"full"},{"state":"full"}]}],"legendFull":"核心策略","legendHalf":"辅助策略","legendNone":"待优化","metaLeft":"识别阶段 → 匹配方法 → 持续跟进","metaMid":"因材施教"},"media":{}},
    {"id":"theme11_page023-10","key":"theme11_page023","layout":"theme11_page023","dataLayout":"THEME11-023","themePack":"theme11","label":"第 10 页","props":{"ghostMark":"09","railText":"辅导方法","navItems":["辅导方法"],"navCurrent":0,"ixNo":"09","ixLabel":"METHOD","lead":"用数据说话，而不是凭感觉","headingHtml":"用数据说话<br><span class=\"ign-ember-text\">而不是凭感觉</span>","noteHtml":"辅导四步法：数据事实 → 差距分析 → 根因探讨 → 改进计划","steps":[{"t":"数据事实","e":"FACT"},{"t":"差距分析","e":"GAP"},{"t":"根因探讨","e":"ROOT"},{"t":"改进计划","e":"PLAN"},{"t":"跟进追踪","e":"TRACK"}],"caps":[{"t":"多问少说","d":"让员工自己发现问题"},{"t":"聚焦行为","d":"针对具体行为而非人格"},{"t":"具体可执行","d":"给明确的下一步行动"}],"metaLeft":"关键原则：多问少说、聚焦行为、给具体反馈","metaMid":"四步法","stepCount":5},"media":{}},
    {"id":"theme11_page053-11","key":"theme11_page053","layout":"theme11_page053","dataLayout":"THEME11-053","themePack":"theme11","label":"第 11 页","props":{"ghostMark":"10","railText":"三者关系","navItems":["总结"],"navCurrent":0,"ixNo":"10","ixLabel":"SUMMARY","lead":"数据是武器，分层是战术，辅导是基本功","headingHtml":"一句话<br><span class=\"ign-ember-text\">串起全部内容</span>","lede":"三者缺一不可，管理者是串联三者的核心","stages":[{"zh":"数据驱动","en":"DATA"},{"zh":"客户分层","en":"SEGMENT"},{"zh":"人员辅导","en":"COACH"},{"zh":"执行保障","en":"EXECUTE"}],"hubZh":"管理者","hubEn":"MANAGER","showHub":True,"showList":True,"showArrows":True,"emphasis":False,"emphasisIndex":0,"showKicker":True,"showLede":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"stageCount":4,"metaLeft":"三者缺一不可，管理者是串联核心","metaMid":"闭环"},"media":{}},
    {"id":"theme11_page077-12","key":"theme11_page077","layout":"theme11_page077","dataLayout":"THEME11-077","themePack":"theme11","label":"第 12 页","props":{"ghostMark":"11","railText":"行动清单","navItems":["行动"],"navCurrent":0,"ixNo":"11","ixLabel":"ACTION","tagText":"回去就能做的三件事","headingHtml":"立即行动<br><span class=\"ign-ember-text\">三件事</span>","lede":"不需要完美准备，从今天开始第一步","arrowGlyph":"→","whenLeft":"本周","whenRight":"本月","stepCount":3,"emphasis":True,"emphasisIndex":0,"showTag":True,"showLede":True,"showArrows":True,"showDesc":True,"showWhen":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"steps":[{"t":"梳理核心指标","d":"确认团队当前用的核心指标是否对齐公司北极星"},{"t":"识别1名需辅导员工","d":"准备一次数据化辅导对话，用数据说话"},{"t":"做一次数据复盘","d":"用真实业务数据做团队复盘，代替感觉说话"}],"metaLeft":"本周行动 + 本月行动","metaMid":"落地"},"media":{}},
    {"id":"theme11_page087-13","key":"theme11_page087","layout":"theme11_page087","dataLayout":"THEME11-087","themePack":"theme11","label":"第 13 页","props":{"ghostMark":"12","railText":"Q&A","navItems":["问答"],"navCurrent":0,"ixNo":"12","ixLabel":"END","kickerEn":"Q & A","kickerZh":"提问与交流","headingHtml":"提问<br><span class=\"ign-serif\">与交流</span>","sub":"课程反馈二维码（如有）","badge":"管理层培训","showSub":True,"showRule":True,"showContact":True,"contactCount":2,"showKicker":True,"showGhostMark":True,"showScaffold":True,"showMeta":True,"contact":[{"k":"主题","v":"数据驱动运营与人才分层辅导","ar":""},{"k":"时长","v":"30分钟","ar":""}],"metaLeft":"数据驱动运营 × 人员分层 × 员工辅导","metaMid":"谢谢"},"media":{}}
]

# Read template
tpl_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'codex-5habits', 'ppt', 'index.html')
with open(tpl_path) as f:
    tpl = f.read()

# Find deck area boundaries
DECK_OPEN = '<div id="deck" class="dk-scope">'
PAGER_MARKER = '<div id="deck-page-pager"'

deck_start = tpl.find(DECK_OPEN)
pager_start = tpl.find(PAGER_MARKER)

# Extract template sections (inside deck)
deck_area = tpl[deck_start:pager_start]
# Find each section
sec_starts = [m.start() for m in re.finditer(r'<section class="slide', deck_area)]
sec_ends = sec_starts[1:] + [len(deck_area)]
template_sections = [deck_area[s:e].rstrip() for s, e in zip(sec_starts, sec_ends)]

print(f"Template: {len(template_sections)} sections")

# Build lookup: data-layout -> list of section strings
layout_pool = {}
for sec in template_sections:
    m = re.search(r'data-layout="([^"]*)"', sec)
    if m:
        layout_pool.setdefault(m.group(1), []).append(sec)

# For each slide, pick a template section and replace props
used = {dl: 0 for dl in layout_pool}
new_sections = []

for i, slide in enumerate(slides):
    dl = slide["dataLayout"]
    if dl not in layout_pool:
        print(f"WARN: layout {dl} not in template")
        continue

    pool = layout_pool[dl]
    # Cycle through available sections for this layout
    tpl_sec = pool[used[dl] % len(pool)]
    used[dl] += 1

    # Replace prop-defaults
    new_props = json.dumps(slide["props"], ensure_ascii=False)
    new_sec = re.sub(r'data-prop-defaults="[^"]*"', f'data-prop-defaults="{new_props}"', tpl_sec, count=1)
    # Replace slide id
    new_sec = re.sub(r'data-vm-slide-id="[^"]*"', f'data-vm-slide-id="{slide["id"]}"', new_sec, count=1)
    # Replace index
    new_sec = re.sub(r'data-vm-index="\d+"', f'data-vm-index="{i}"', new_sec, count=1)
    # Replace label
    new_sec = re.sub(r'data-label="[^"]*"', f'data-label="{slide["label"]}"', new_sec, count=1)

    new_sections.append(new_sec)

print(f"Generated: {len(new_sections)} sections")

# Rebuild HTML: keep everything before deck sections + new sections + everything after
pre = tpl[:deck_start + len(DECK_OPEN)]
post = tpl[pager_start:]

new_html = pre + "\n\n" + "\n".join(new_sections) + "\n\n</div>\n</div>\n" + post

# Update deck-view-model
view_model = {
    "version": 1,
    "title": "数据驱动运营与人才分层辅导",
    "themePack": "theme11",
    "slides": slides,
    "state": {
        "slideOrder": [s["id"] for s in slides],
        "text": {}, "media": {}, "props": {},
        "skippedSlides": [], "deletedSlides": [], "duplicatedSlides": [],
        "__deckSignature": "training2026"
    }
}
vm_json = json.dumps(view_model, ensure_ascii=False)
new_html = re.sub(
    r'(<script id="deck-view-model" type="application/json">)(.*?)(</script>)',
    lambda m: m.group(1) + vm_json + m.group(3),
    new_html, count=1, flags=re.DOTALL
)
new_html = new_html.replace('<title>让Codex长周期大项目不跑偏</title>', '<title>数据驱动运营与人才分层辅导</title>')

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ppt', 'index.html')
with open(out, 'w') as f:
    f.write(new_html)

# Verify
with open(out) as f:
    result = f.read()
marks = re.findall(r'"ghostMark": "([^"]+)"', result)
from collections import Counter
dupes = {k:v for k,v in Counter(marks).items() if v > 1}
print(f"GhostMarks: {len(marks)} (expect 13)")
if dupes:
    print(f"DUPLICATES: {dupes}")
else:
    print("No duplicates - OK")
print(f"Output: {out}")
