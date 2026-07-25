#!/usr/bin/env python3
"""Generate SVG files for batch_01 (P1 cover, P2 KPI, P3 voice workstation)."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"
SVG_DIR.mkdir(parents=True, exist_ok=True)

# ============ P1 封面 ============
p1 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_01"
data-layout="L01"
page_mode="emotional"
visual_density="airy"
reason="封面单一命题：能跑多久 vs 怎么不跑偏；左侧文字 + 右侧循环几何。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 右侧 Agent Loop 循环几何（呼应"长周期"） -->
<circle cx="1500" cy="540" r="280" fill="none" stroke="#C62828" stroke-width="3" opacity="0.4"/>
<circle cx="1500" cy="540" r="220" fill="none" stroke="#C62828" stroke-width="2" opacity="0.25"/>
<circle cx="1500" cy="540" r="160" fill="none" stroke="#C62828" stroke-width="1" opacity="0.15"/>

<!-- 循环节点 -->
<circle cx="1500" cy="260" r="12" fill="#C62828" opacity="0.6"/>
<circle cx="1760" cy="420" r="10" fill="#C62828" opacity="0.5"/>
<circle cx="1760" cy="660" r="10" fill="#C62828" opacity="0.5"/>
<circle cx="1500" cy="820" r="12" fill="#C62828" opacity="0.6"/>
<circle cx="1240" cy="660" r="10" fill="#C62828" opacity="0.5"/>
<circle cx="1240" cy="420" r="10" fill="#C62828" opacity="0.5"/>

<!-- 顶部 deck 标识 -->
<line x1="140" y1="120" x2="240" y2="120" stroke="#C62828" stroke-width="3"/>
<text x="140" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#999999" letter-spacing="3">A METHODOLOGY FOR LONG-HORIZON AI COLLABORATION</text>

<!-- 主标题 -->
<text x="140" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="80" font-weight="bold" fill="#333333">AI 长周期任务</text>
<text x="140" y="548" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="80" font-weight="bold" fill="#333333">协作方法论</text>
<text x="140" y="628" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" fill="#555555">从实验验证到实操框架</text>

<!-- 命题引子 -->
<text x="140" y="760" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" fill="#555555">真正的问题不是<tspan fill="#999999">「能跑多久」</tspan>，</text>
<text x="140" y="805" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" fill="#555555">而是<tspan fill="#C62828" font-weight="bold">「怎么让它不跑偏」</tspan>。</text>

<!-- 底部来源条 -->
<line x1="140" y1="970" x2="1740" y2="970" stroke="#E0E0E0" stroke-width="1"/>
<text x="140" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">OpenAI 内部实践 · Derrick Choi × Gabriel Chua</text>
<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">01 / 18</text>

</svg>
'''

# ============ P2 25h KPI ============
p2 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_02"
data-layout="L03"
page_mode="rational"
visual_density="balanced"
reason="4 KPI 横排（25h/13M/30k/10）+ 主张 + 锚点结论。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">25 小时连续运行，从空仓库构建真实可测试的设计工具</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">Derrick Choi · GPT-5.3-Codex · Extra High 推理级别</text>

<!-- 4 KPI 横排 -->
<rect x="140" y="290" width="400" height="240" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="6" height="240" fill="#C62828"/>
<text x="340" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="96" font-weight="bold" fill="#C62828" text-anchor="middle">25h</text>
<text x="340" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">连续运行时间</text>

<rect x="560" y="290" width="400" height="240" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="560" y="290" width="6" height="240" fill="#C62828"/>
<text x="760" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="96" font-weight="bold" fill="#C62828" text-anchor="middle">13M</text>
<text x="760" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">消耗 tokens</text>

<rect x="980" y="290" width="400" height="240" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="290" width="6" height="240" fill="#C62828"/>
<text x="1180" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="96" font-weight="bold" fill="#C62828" text-anchor="middle">30k</text>
<text x="1180" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">生成代码行数</text>

<rect x="1400" y="290" width="380" height="240" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1400" y="290" width="6" height="240" fill="#C62828"/>
<text x="1590" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="96" font-weight="bold" fill="#C62828" text-anchor="middle">10</text>
<text x="1590" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">核心功能模块</text>

<!-- 锚点结论 -->
<line x1="140" y1="600" x2="1780" y2="600" stroke="#E0E0E0" stroke-width="1"/>
<text x="140" y="660" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828" letter-spacing="2">CORE FINDING · 核心发现</text>

<text x="140" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="30" font-weight="bold" fill="#333333">这不是「模型变聪明了」的简单升级。</text>

<text x="140" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" fill="#555555">真正的变化是：Agent 能保持更长时间的连贯性，</text>
<text x="140" y="844" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" fill="#555555">端到端完成更大的工作块，</text>
<text x="140" y="888" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" fill="#555555">并且在<tspan fill="#C62828" font-weight="bold">出错时能恢复而不丢失主线</tspan>。</text>

<!-- 页码 -->
<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">02 / 18</text>

</svg>
'''

# ============ P3 语音工作站 ============
p3 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_03"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="练/写/记三支柱（语音工作站真实案例）+ 训练产出条。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">真实案例：用这套方法论构建出「语音工作站」</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">桌面端语音工具 · 围绕练 / 写 / 记 三大能力</text>

<!-- 三大能力卡 -->
<!-- 练 -->
<rect x="140" y="290" width="520" height="500" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="140" y="350" width="520" height="40" fill="#C62828"/>
<text x="180" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">练</text>
<text x="260" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#FFFFFF">8 种场景训练</text>

<text x="180" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">自由训练 · 材料讲解</text>
<text x="180" y="498" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">汇报演练 · 话题展开</text>
<text x="180" y="546" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">会议发言 · 沟通说服</text>
<text x="180" y="594" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">面试模拟 · 即兴表达</text>

<line x1="180" y1="640" x2="620" y2="640" stroke="#E0E0E0" stroke-width="1"/>
<text x="180" y="690" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">场景化表达训练</text>
<text x="180" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">从即兴到结构化</text>

<!-- 写 -->
<rect x="700" y="290" width="520" height="500" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="700" y="350" width="520" height="40" fill="#C62828"/>
<text x="740" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">写</text>
<text x="820" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#FFFFFF">5 种成文类型</text>

<text x="740" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">报告：结构化分析</text>
<text x="740" y="498" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">方案：目标 + 路径 + 风险</text>
<text x="740" y="546" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">邮件：可直接发送</text>
<text x="740" y="594" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">汇报稿 · 日志</text>

<line x1="740" y1="640" x2="1180" y2="640" stroke="#E0E0E0" stroke-width="1"/>
<text x="740" y="690" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">口述 → 确认转写</text>
<text x="740" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">→ AI 生成正式文档</text>

<!-- 记 -->
<rect x="1260" y="290" width="520" height="500" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="1260" y="350" width="520" height="40" fill="#C62828"/>
<text x="1300" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF">记</text>
<text x="1380" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#FFFFFF">会议纪要</text>

<text x="1300" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">议题拆分 · 讨论要点</text>
<text x="1300" y="498" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">决议 · 待办事项</text>
<text x="1300" y="546" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">未决问题追踪</text>

<line x1="1300" y1="640" x2="1740" y2="640" stroke="#E0E0E0" stroke-width="1"/>
<text x="1300" y="690" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">录制会议</text>
<text x="1300" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">→ AI 自动提取</text>

<!-- 底部训练产出条 -->
<rect x="140" y="830" width="1640" height="100" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<text x="180" y="870" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" letter-spacing="2">TRAINING OUTPUT · 训练产出</text>
<text x="180" y="908" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">词库分析（填充词/犹豫词/笼统词/情绪词）· 表达力报告 · 逐句改写建议 · 教练观察</text>

<!-- 页码 -->
<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">03 / 18</text>

</svg>
'''

(SVG_DIR / "page_01.svg").write_text(p1, encoding="utf-8")
(SVG_DIR / "page_02.svg").write_text(p2, encoding="utf-8")
(SVG_DIR / "page_03.svg").write_text(p3, encoding="utf-8")
print("Generated batch_01 SVGs: page_01, page_02, page_03")
