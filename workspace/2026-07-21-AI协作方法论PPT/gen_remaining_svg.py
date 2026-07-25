#!/usr/bin/env python3
"""Generate batch_05+06 SVGs: P13-P18."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P13 可迁移框架 ============
p13 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_13"
data-layout="L09"
page_mode="rational"
visual_density="balanced"
reason="4 骨架 + 工具对应表。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">核心骨架不依赖特定工具，是 AI 时代的新型项目管理模式</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">跨工具通用</text>

<!-- 4 骨架速览 -->
<text x="164" y="280" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">4 CORE SKELETONS · 核心骨架</text>

<rect x="140" y="300" width="400" height="80" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="300" width="6" height="80" fill="#C62828"/>
<text x="170" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">路线图锚定</text>
<text x="170" y="372" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">GOALS.md</text>

<rect x="560" y="300" width="400" height="80" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="560" y="300" width="6" height="80" fill="#C62828"/>
<text x="590" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">里程碑验收</text>
<text x="590" y="372" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">审计 + review</text>

<rect x="980" y="300" width="400" height="80" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="300" width="6" height="80" fill="#C62828"/>
<text x="1010" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">远程本地分工</text>
<text x="1010" y="372" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">多 session 支持</text>

<rect x="1400" y="300" width="380" height="80" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1400" y="300" width="6" height="80" fill="#C62828"/>
<text x="1430" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">状态外置</text>
<text x="1430" y="372" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">简报 + 仪表盘</text>

<!-- 工具对应表 -->
<line x1="140" y1="460" x2="1780" y2="460" stroke="#E0E0E0" stroke-width="1"/>
<text x="164" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">TOOL MAPPING · 工具对应</text>

<rect x="140" y="530" width="1640" height="60" fill="#C62828"/>
<text x="170" y="568" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">Codex 能力</text>
<text x="620" y="568" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">Claude Code 对应</text>
<text x="1120" y="568" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">Cursor 对应</text>

<rect x="140" y="590" width="1640" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
<text x="170" y="620" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#333333">/goal（持久目标）</text>
<text x="620" y="620" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">CLAUDE.md + memory</text>
<text x="1120" y="620" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">.cursorrules</text>

<rect x="140" y="640" width="1640" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
<text x="170" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#333333">Subagent（委派）</text>
<text x="620" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">Agent tool</text>
<text x="1120" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">多文件 + terminal</text>

<rect x="140" y="690" width="1640" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
<text x="170" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#333333">/review（代码审查）</text>
<text x="620" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">独立对话 + review</text>
<text x="1120" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">独立对话 + 审查</text>

<rect x="140" y="740" width="1640" height="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1"/>
<text x="170" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#333333">Computer Use（本机）</text>
<text x="620" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">本地 terminal</text>
<text x="1120" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">本地 terminal</text>

<!-- 底部 -->
<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">13 / 18</text>

</svg>
'''

# ============ P14 启动 Prompt ============
p14 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_14"
data-layout="L10"
page_mode="rational"
visual_density="balanced"
reason="左 Prompt 原文 + 右中文解读（用户反馈）。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">可复制的长周期项目启动 Prompt</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">6 段核心指令（左原文 / 右解读）</text>

<!-- 左栏：Prompt 原文（代码区，改成中文） -->
<rect x="140" y="280" width="800" height="540" fill="#1E1E1E" rx="8"/>
<rect x="140" y="280" width="800" height="40" fill="#2D2D2D" rx="8"/>
<rect x="140" y="300" width="800" height="20" fill="#2D2D2D"/>
<text x="170" y="305" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#8A8A8A">启动 Prompt · 中文版</text>

<text x="170" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">这是一个长周期项目。</text>
<text x="170" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">先采访我，让我口述想法和约束，</text>
<text x="170" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">然后转化为初步计划。</text>

<text x="170" y="500" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">创建 GOALS.md 作为共享路线图，</text>
<text x="170" y="540" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">按里程碑组织。</text>

<text x="170" y="590" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">同时只维护一个活跃目标。</text>

<text x="170" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">把实现委派给 subagent 或新线程。</text>

<text x="170" y="690" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">每个里程碑后审计路线图，</text>
<text x="170" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">审查代码实现。</text>

<text x="170" y="780" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#D4D4D4">只汇报：已完成 / 下一步 / 阻塞。</text>

<text x="170" y="830" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#C62828">没有证据，不宣布完成。</text>

<!-- 右栏：7 段中文解读 -->
<text x="980" y="325" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">WHAT IT MEANS · 中文解读</text>

<text x="980" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">01</tspan> Coordinate → 声明长周期项目</text>
<text x="980" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">02</tspan> Interview → 先采访后计划，别直接动手</text>
<text x="980" y="470" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">03</tspan> GOALS.md → 创建共享路线图</text>
<text x="980" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">04</tspan> One objective → 单目标同时激活</text>
<text x="980" y="550" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">05</tspan> Delegate → 委派给 subagent</text>
<text x="980" y="590" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">06</tspan> Audit → 每里程碑后审计</text>
<text x="980" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">07</tspan> Report → 只汇报 done/next/blockers</text>
<text x="980" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333"><tspan font-weight="bold" fill="#C62828">08</tspan> No evidence → 没证据不宣布完成</text>

<line x1="980" y1="730" x2="1700" y2="730" stroke="#E0E0E0" stroke-width="1"/>
<text x="980" y="780" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" letter-spacing="2">USE IT · 使用方式</text>
<text x="980" y="820" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">复制到新对话开头，</text>
<text x="980" y="855" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">AI 自动进入「协调者」模式</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">14 / 18</text>

</svg>
'''

# ============ P15 模板 ============
p15 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_15"
data-layout="L10"
page_mode="rational"
visual_density="balanced"
reason="左 GOALS.md 模板结构 + 右进度汇报模板。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">GOALS.md 路线图模板 + 三段式进度汇报模板</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">两个可直接复制的结构化模板</text>

<!-- 左栏：GOALS.md 模板结构 -->
<text x="164" y="285" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">GOALS.md · 每个里程碑需记录</text>

<rect x="140" y="310" width="800" height="80" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="310" width="6" height="80" fill="#C62828"/>
<text x="170" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">项目目标</text>
<text x="170" y="380" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">一句话描述最终交付物 · 当前状态</text>

<rect x="140" y="400" width="800" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="400" width="6" height="280" fill="#C62828"/>
<text x="170" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333">M1：[里程碑名称]</text>

<text x="170" y="500" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">状态：进行中</text>
<text x="170" y="536" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">目标产出：[具体交付物]</text>
<text x="170" y="572" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">工作范围：[任务清单]</text>
<text x="170" y="608" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">重要决策：[描述 + 原因]</text>
<text x="170" y="644" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">已知阻塞：[阻塞描述]</text>
<text x="170" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555">完成证据：[测试 / 审查 / 演示]</text>

<!-- 右栏：进度汇报 -->
<text x="980" y="285" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">PROGRESS REPORT · 进度汇报模板</text>

<rect x="980" y="310" width="800" height="140" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="310" width="6" height="140" fill="#C62828"/>
<text x="1020" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828">01</text>
<text x="1070" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">What's done</text>
<text x="1020" y="400" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">已完成什么</text>
<text x="1020" y="435" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">每次状态变化时输出</text>

<rect x="980" y="460" width="800" height="140" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="460" width="6" height="140" fill="#C62828"/>
<text x="1020" y="505" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828">02</text>
<text x="1070" y="505" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">What's next</text>
<text x="1020" y="550" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">下一步是什么</text>
<text x="1020" y="585" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">像每小时一次的站会</text>

<rect x="980" y="610" width="800" height="140" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="610" width="6" height="140" fill="#C62828"/>
<text x="1020" y="655" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828">03</text>
<text x="1070" y="655" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">Any blockers</text>
<text x="1020" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">有无阻塞</text>
<text x="1020" y="735" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">或「无」</text>

<!-- 底部结论 -->
<line x1="140" y1="800" x2="1780" y2="800" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="850" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#333333" text-anchor="middle">+ 证据区：测试结果 / 审查结论 / 演示截图</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">15 / 18</text>

</svg>
'''

# ============ P16 角色转变金句 ============
p16 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_16"
data-layout="L08"
page_mode="emotional"
visual_density="airy"
reason="金句页：不会带团队你就自己干到死 + 角色转变表。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">不会带团队，你就自己干到死</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">管理学金句（赵伟同名管理书）· AI 时代同样成立</text>

<text x="960" y="340" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" fill="#555555" text-anchor="middle">当开发者从「亲自写代码」</text>
<text x="960" y="388" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" fill="#555555" text-anchor="middle">转向「带 AI 团队」</text>

<text x="960" y="480" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="88" font-weight="bold" fill="#C62828" text-anchor="middle">不会带 AI 团队</text>
<text x="960" y="588" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="72" font-weight="bold" fill="#C62828" text-anchor="middle">只能自己写代码到死</text>

<line x1="780" y1="640" x2="1140" y2="640" stroke="#E0E0E0" stroke-width="1"/>

<rect x="400" y="680" width="520" height="60" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<text x="660" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">过去：亲自写代码的执行者</text>

<rect x="1000" y="680" width="520" height="60" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<text x="1260" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" text-anchor="middle">现在：带领 AI 团队的技术负责人</text>

<text x="960" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">关注目标、里程碑、验收标准</text>
<text x="960" y="838" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">设计验证流程让 AI 自动执行</text>
<text x="960" y="876" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">多 worker 并行协调</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">16 / 18</text>

</svg>
'''

# ============ P17 底层三要素 ============
p17 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_17"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="三支柱 + 适用边界。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">持久锚点 + 验收关卡 + 状态外置 = 长周期协作底层三要素</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">为 AI 提供不会漂移的目标 + 多层验证 + 不依赖线程</text>

<!-- 三支柱 -->
<rect x="140" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="140" y="370" width="520" height="40" fill="#C62828"/>
<text x="180" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">01</text>
<text x="180" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF">持久锚点</text>

<text x="180" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">Goal + GOALS.md</text>
<text x="180" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">为 AI 提供</text>
<text x="180" y="566" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">不会漂移的目标</text>

<line x1="180" y1="600" x2="620" y2="600" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">里程碑完成后</text>
<text x="180" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">更新 GOALS.md</text>

<rect x="700" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="290" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="700" y="370" width="520" height="40" fill="#C62828"/>
<text x="740" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">02</text>
<text x="740" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF">验收关卡</text>

<text x="740" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">里程碑审计 + review</text>
<text x="740" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">多层验证防止</text>
<text x="740" y="566" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">偏差累积</text>

<line x1="740" y1="600" x2="1180" y2="600" stroke="#E0E0E0" stroke-width="1"/>

<text x="740" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">每个里程碑都检查</text>
<text x="740" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">不是最后才检查</text>

<rect x="1260" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="290" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="1260" y="370" width="520" height="40" fill="#C62828"/>
<text x="1300" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">03</text>
<text x="1300" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF">状态外置</text>

<text x="1300" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">简报 + 仪表盘</text>
<text x="1300" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">项目状态</text>
<text x="1300" y="566" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">不依赖线程上下文</text>

<line x1="1300" y1="600" x2="1740" y2="600" stroke="#E0E0E0" stroke-width="1"/>

<text x="1300" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">几小时后回来</text>
<text x="1300" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">无需读每个 thread</text>

<!-- 适用边界 -->
<line x1="140" y1="740" x2="1780" y2="740" stroke="#E0E0E0" stroke-width="1"/>
<text x="164" y="790" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">APPLICABLE WHEN · 适用边界</text>
<text x="164" y="840" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">仅当满足以下特征时投入产出比最高：</text>
<text x="164" y="885" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 项目推进会持续涌现新信息</text>
<text x="164" y="925" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 涉及多块独立并行工作</text>
<text x="164" y="965" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 需要多个不同环境的验证证据</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">17 / 18</text>

</svg>
'''

# ============ P18 结语 ============
p18 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_18"
data-layout="L15"
page_mode="emotional"
visual_density="airy"
reason="收束页：模型负责智能，开发者负责引导 + 行动召唤。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">模型负责智能，开发者负责引导</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">AI 时代的新型项目管理模式</text>

<text x="960" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="60" font-weight="bold" fill="#333333" text-anchor="middle">模型负责发挥智能能力</text>
<text x="960" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" fill="#555555" text-anchor="middle">开发者负责引导这份智能</text>

<text x="960" y="520" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" fill="#C62828" text-anchor="middle">始终锚定同一目标</text>
<text x="960" y="580" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" fill="#C62828" text-anchor="middle">沿着验证证据的路径</text>

<line x1="780" y1="630" x2="1140" y2="630" stroke="#E0E0E0" stroke-width="1"/>

<text x="960" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" fill="#555555" text-anchor="middle">起点：下次启动长周期任务时</text>

<text x="960" y="820" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="48" font-weight="bold" fill="#333333" text-anchor="middle">先写一份 GOALS.md</text>
<text x="960" y="890" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="48" font-weight="bold" fill="#333333" text-anchor="middle">再让 AI 采访你</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">18 / 18</text>

</svg>
'''

for name, content in [("page_13", p13), ("page_14", p14), ("page_15", p15), ("page_16", p16), ("page_17", p17), ("page_18", p18)]:
    (SVG_DIR / f"{name}.svg").write_text(content, encoding="utf-8")
print("Generated remaining 6 SVGs: page_13 to page_18")