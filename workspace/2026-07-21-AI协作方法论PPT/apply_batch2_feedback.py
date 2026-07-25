#!/usr/bin/env python3
"""Apply batch_02 feedback: P4 圆环 / P5 通俗化 / P6 标题改 AI 人机协作."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P4 改成圆环 ============
p4 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_04"
data-layout="L06"
page_mode="rational"
visual_density="balanced"
reason="Agent Loop 圆环图：6 节点围一圈，顺时针箭头（用户反馈：圆环比网格直观）。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">长时间运行的关键不是巨大的 prompt，而是<tspan fill="#C62828">循环结构</tspan></text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">Agent Loop 六步循环（顺时针）</text>

<!-- 圆环（中心 960,580, 半径 220） -->
<circle cx="960" cy="580" r="220" fill="none" stroke="#C62828" stroke-width="3" opacity="0.4"/>
<circle cx="960" cy="580" r="220" fill="none" stroke="#CCCCCC" stroke-width="1"/>

<!-- 6 个节点（顺时针，从顶部开始，每个加中文） -->
<!-- 01 Plan 顶部 -->
<circle cx="960" cy="360" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="960" y="346" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">01</text>
<text x="960" y="378" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">Plan</text>
<text x="960" y="402" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">规划</text>

<!-- 02 Edit 右上 -->
<circle cx="1151" cy="470" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="1151" y="456" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">02</text>
<text x="1151" y="488" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">Edit</text>
<text x="1151" y="512" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">编辑</text>

<!-- 03 Run Tools 右下 -->
<circle cx="1151" cy="690" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="1151" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">03</text>
<text x="1151" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">Run Tools</text>
<text x="1151" y="725" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">运行测试</text>

<!-- 04 Observe 底部 -->
<circle cx="960" cy="800" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="960" y="780" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">04</text>
<text x="960" y="810" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">Observe</text>
<text x="960" y="835" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">观察</text>

<!-- 05 Repair 左下 -->
<circle cx="769" cy="690" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="769" y="670" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">05</text>
<text x="769" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">Repair</text>
<text x="769" y="725" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">修复</text>

<!-- 06 Update 左上 -->
<circle cx="769" cy="470" r="80" fill="#FFFFFF" stroke="#C62828" stroke-width="3"/>
<text x="769" y="456" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" text-anchor="middle">06</text>
<text x="769" y="488" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">Update</text>
<text x="769" y="512" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">更新</text>

<!-- 顺时针弧形箭头（节点之间，6 段） -->
<!-- 01→02 -->
<path d="M 1037 392 A 220 220 0 0 1 1119 442" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="1115,437 1131,452 1113,455" fill="#C62828"/>
<!-- 02→03 -->
<path d="M 1192 548 A 220 220 0 0 1 1192 612" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="1188,608 1205,622 1186,623" fill="#C62828"/>
<!-- 03→04 -->
<path d="M 1119 718 A 220 220 0 0 1 1037 768" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="1031,763 1048,779 1030,780" fill="#C62828"/>
<!-- 04→05 -->
<path d="M 883 768 A 220 220 0 0 1 801 718" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="806,713 789,728 808,730" fill="#C62828"/>
<!-- 05→06 -->
<path d="M 728 612 A 220 220 0 0 1 728 548" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="732,552 715,538 734,537" fill="#C62828"/>
<!-- 06→01 -->
<path d="M 801 442 A 220 220 0 0 1 883 392" fill="none" stroke="#C62828" stroke-width="2"/>
<polygon points="889,397 872,381 891,380" fill="#C62828"/>

<!-- 中心标识 -->
<text x="960" y="570" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" text-anchor="middle">Agent</text>
<text x="960" y="602" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" text-anchor="middle">Loop</text>

<!-- 底部结论 -->
<line x1="140" y1="920" x2="1780" y2="920" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="970" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">harness 提供结构化上下文（repo / 文件树 / diffs）+ 强制「完成条件」流程</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">04 / 18</text>

</svg>
'''

# ============ P5 通俗化 ============
p5 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_05"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="三大收益通俗化版本（用户反馈：太专业改通俗易懂）。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">循环让 AI 像真人一样工作</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">三个通俗收益</text>

<!-- 三支柱卡 -->
<!-- 收益1：看到真实结果 -->
<rect x="140" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="140" y="360" width="520" height="60" fill="#C62828"/>
<text x="180" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">01</text>
<text x="180" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">看到真实结果</text>

<text x="180" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">不是猜哪里错了</text>
<text x="180" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">而是看到实际报错</text>

<line x1="180" y1="570" x2="620" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">举个例</text>
<text x="180" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">跑完测试，</text>
<text x="180" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">直接看到哪行错了</text>

<!-- 收益2：状态存得久 -->
<rect x="700" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="700" y="360" width="520" height="60" fill="#C62828"/>
<text x="740" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">02</text>
<text x="740" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">状态存得久</text>

<text x="740" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">不依赖短期记忆</text>
<text x="740" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">写在文件里</text>

<line x1="740" y1="570" x2="1180" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="740" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">举个例</text>
<text x="740" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">关掉笔记本，</text>
<text x="740" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">下次打开进度还在</text>

<!-- 收益3：随时能改方向 -->
<rect x="1260" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="1260" y="360" width="520" height="60" fill="#C62828"/>
<text x="1300" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">03</text>
<text x="1300" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">随时能改方向</text>

<text x="1300" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">发现走错了</text>
<text x="1300" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">能回头不丢进度</text>

<line x1="1300" y1="570" x2="1740" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="1300" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">举个例</text>
<text x="1300" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">某模块实现错了，</text>
<text x="1300" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">回滚不影响其他</text>

<!-- 底部结论 -->
<line x1="140" y1="900" x2="1780" y2="900" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">这套「循环 + 文件存档」让 AI 比在普通聊天窗口里更靠谱</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">05 / 18</text>

</svg>
'''

# ============ P6 标题改 ============
p6 = (SVG_DIR / "page_06.svg").read_text(encoding="utf-8")
p6 = p6.replace(
    '<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">Gabriel Chua 的 5 个习惯，构成长周期协作的完整框架</text>',
    '<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">AI 人机协作的 5 个习惯，构成长周期任务的完整框架</text>'
)

(SVG_DIR / "page_04.svg").write_text(p4, encoding="utf-8")
(SVG_DIR / "page_05.svg").write_text(p5, encoding="utf-8")
(SVG_DIR / "page_06.svg").write_text(p6, encoding="utf-8")
print("Applied batch_02 feedback:")
print("  P4 - 2x3 网格 → 圆环图（6 节点顺时针）")
print("  P5 - 专业术语 → 通俗易懂（看到真实结果 / 状态存得久 / 随时能改方向）")
print("  P6 - 标题 Gabriel Chua → AI 人机协作")
