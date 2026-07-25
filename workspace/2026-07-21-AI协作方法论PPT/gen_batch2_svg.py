#!/usr/bin/env python3
"""Generate batch_02 SVGs: P4 Agent Loop, P5 三大收益, P6 5 习惯总览."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P4 Agent Loop 六步循环 ============
p4 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_04"
data-layout="L06"
page_mode="rational"
visual_density="balanced"
reason="Agent Loop 六步循环：顶部主张 + 2×3 流程网格 + 底部结论。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">长时间运行的关键不是巨大的 prompt，而是<tspan fill="#C62828">循环结构</tspan></text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">Agent Loop 六步循环</text>

<!-- 2×3 流程网格（6 步） -->
<!-- 步骤 1: Plan -->
<rect x="180" y="300" width="500" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="180" y="300" width="6" height="200" fill="#C62828"/>
<text x="220" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">01</text>
<text x="330" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Plan</text>
<text x="220" y="440" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">规划下一步</text>

<!-- 箭头 1→2 -->
<line x1="680" y1="400" x2="720" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="715,390 735,400 715,410" fill="#C62828"/>

<!-- 步骤 2: Edit -->
<rect x="740" y="300" width="500" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="740" y="300" width="6" height="200" fill="#C62828"/>
<text x="780" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">02</text>
<text x="890" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Edit</text>
<text x="780" y="440" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">编辑代码</text>

<!-- 箭头 2→3 -->
<line x1="1240" y1="400" x2="1280" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="1275,390 1295,400 1275,410" fill="#C62828"/>

<!-- 步骤 3: Run Tools -->
<rect x="1300" y="300" width="480" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1300" y="300" width="6" height="200" fill="#C62828"/>
<text x="1340" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">03</text>
<text x="1450" y="370" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Run Tools</text>
<text x="1340" y="440" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">运行测试 / 构建</text>

<!-- 步骤 4: Observe -->
<rect x="180" y="560" width="500" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="180" y="560" width="6" height="200" fill="#C62828"/>
<text x="220" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">04</text>
<text x="330" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Observe</text>
<text x="220" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">观察结果</text>

<!-- 箭头 4→5 -->
<line x1="680" y1="660" x2="720" y2="660" stroke="#C62828" stroke-width="2"/>
<polygon points="715,650 735,660 715,670" fill="#C62828"/>

<!-- 步骤 5: Repair -->
<rect x="740" y="560" width="500" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="740" y="560" width="6" height="200" fill="#C62828"/>
<text x="780" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">05</text>
<text x="890" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Repair</text>
<text x="780" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">修复失败</text>

<!-- 箭头 5→6 -->
<line x1="1240" y1="660" x2="1280" y2="660" stroke="#C62828" stroke-width="2"/>
<polygon points="1275,650 1295,660 1275,670" fill="#C62828"/>

<!-- 步骤 6: Update -->
<rect x="1300" y="560" width="480" height="200" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="1300" y="560" width="6" height="200" fill="#C62828"/>
<text x="1340" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">06</text>
<text x="1450" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#333333">Update</text>
<text x="1340" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">更新文档</text>

<!-- 循环回路箭头（从 06 回到 01） -->
<path d="M 1540 780 Q 1540 850, 1100 850 T 430 780" fill="none" stroke="#C62828" stroke-width="2" opacity="0.5"/>
<polygon points="425,790 445,780 445,800" fill="#C62828" opacity="0.5"/>
<text x="960" y="876" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#C62828" text-anchor="middle" opacity="0.7">循环回到 Plan</text>

<!-- 底部结论 -->
<line x1="140" y1="900" x2="1780" y2="900" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">harness 提供结构化上下文（repo 元数据 / 文件树 / diffs / 命令输出）</text>
<text x="960" y="980" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">并强制执行严格的「完成条件」流程</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">04 / 18</text>

</svg>
'''

# ============ P5 三大收益 ============
p5 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_05"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="三大收益三支柱（带具体例子）：真实反馈 / 外部化状态 / 可转向性。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">循环结构为 Agent 提供三种关键能力</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">Plan-Edit-Run-Observe-Repair-Update 的底层收益</text>

<!-- 三支柱卡 -->
<!-- 真实反馈 -->
<rect x="140" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="140" y="360" width="520" height="60" fill="#C62828"/>
<text x="180" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">01</text>
<text x="180" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">真实反馈</text>

<text x="180" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">跑测试后看到 traceback、</text>
<text x="180" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">diff、错误日志</text>

<line x1="180" y1="570" x2="620" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">EXAMPLE</text>
<text x="180" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">不是「猜哪里错了」，</text>
<text x="180" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">而是看到实际报错结果</text>

<!-- 外部化状态 -->
<rect x="700" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="700" y="360" width="520" height="60" fill="#C62828"/>
<text x="740" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">02</text>
<text x="740" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">外部化状态</text>

<text x="740" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">repo / 文件 / GOALS.md /</text>
<text x="740" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">worktrees / 输出</text>

<line x1="740" y1="570" x2="1180" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="740" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">EXAMPLE</text>
<text x="740" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">不依赖 context window，</text>
<text x="740" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">关掉笔记本状态还在</text>

<!-- 可转向性 -->
<rect x="1260" y="300" width="520" height="560" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="300" width="520" height="120" fill="#C62828" rx="8"/>
<rect x="1260" y="360" width="520" height="60" fill="#C62828"/>
<text x="1300" y="345" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3">03</text>
<text x="1300" y="395" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">可转向性</text>

<text x="1300" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">基于结果调整方向</text>
<text x="1300" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">中途修正不丢失进度</text>

<line x1="1300" y1="570" x2="1740" y2="570" stroke="#E0E0E0" stroke-width="1"/>

<text x="1300" y="630" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="2">EXAMPLE</text>
<text x="1300" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">发现某模块实现错了，</text>
<text x="1300" y="718" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">回滚不丢失其他模块</text>

<!-- 底部结论 -->
<line x1="140" y1="900" x2="1780" y2="900" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">harness 提供结构化上下文 + 强制「完成条件」流程 → 比通用聊天窗口表现更好</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">05 / 18</text>

</svg>
'''

# ============ P6 5 习惯总览 ============
p6 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_06"
data-layout="L05"
page_mode="rational"
visual_density="balanced"
reason="5 习惯横排总览卡（章节预告页），下 5 页每页展开一个。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">Gabriel Chua 的 5 个习惯，构成长周期协作的完整框架</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">下面 5 页展开每个习惯</text>

<!-- 5 卡横排 -->
<!-- 习惯 1 -->
<rect x="140" y="310" width="320" height="540" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<circle cx="300" cy="400" r="50" fill="#C62828"/>
<text x="300" y="418" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">1</text>

<text x="300" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">自主规划</text>
<text x="300" y="544" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">+ GOALS.md</text>

<line x1="180" y1="580" x2="420" y2="580" stroke="#E0E0E0" stroke-width="1"/>
<text x="300" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">让 Codex 自主规划</text>
<text x="300" y="676" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">并维护路线图</text>

<text x="300" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">用对话启动</text>
<text x="300" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">用 GOALS.md 锚定</text>

<!-- 习惯 2 -->
<rect x="480" y="310" width="320" height="540" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<circle cx="640" cy="400" r="50" fill="#C62828"/>
<text x="640" y="418" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">2</text>

<text x="640" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">主线程</text>
<text x="640" y="544" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">只做协调</text>

<line x1="520" y1="580" x2="760" y2="580" stroke="#E0E0E0" stroke-width="1"/>
<text x="640" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">主线程决定下一步</text>
<text x="640" y="676" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">委派 + 评估</text>

<text x="640" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">目标/约束/决策/状态</text>
<text x="640" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">不陷入实现细节</text>

<!-- 习惯 3 -->
<rect x="820" y="310" width="320" height="540" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<circle cx="980" cy="400" r="50" fill="#C62828"/>
<text x="980" y="418" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">3</text>

<text x="980" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">里程碑审计</text>
<text x="980" y="544" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">+ review</text>

<line x1="860" y1="580" x2="1100" y2="580" stroke="#E0E0E0" stroke-width="1"/>
<text x="980" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">里程碑后先审计</text>
<text x="980" y="676" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">再 review 代码</text>

<text x="980" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">计划还对吗？</text>
<text x="980" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">代码质量够吗？</text>

<!-- 习惯 4 -->
<rect x="1160" y="310" width="320" height="540" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<circle cx="1320" cy="400" r="50" fill="#C62828"/>
<text x="1320" y="418" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">4</text>

<text x="1320" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">本机测试</text>
<text x="1320" y="544" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">分工</text>

<line x1="1200" y1="580" x2="1440" y2="580" stroke="#E0E0E0" stroke-width="1"/>
<text x="1320" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">本机测试交给</text>
<text x="1320" y="676" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">本地线程</text>

<text x="1320" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">远程跑绝大多数</text>
<text x="1320" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">本机专属校验</text>

<!-- 习惯 5 -->
<rect x="1500" y="310" width="280" height="540" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<circle cx="1640" cy="400" r="50" fill="#C62828"/>
<text x="1640" y="418" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle">5</text>

<text x="1640" y="510" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">简报 +</text>
<text x="1640" y="544" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333" text-anchor="middle">仪表盘</text>

<line x1="1540" y1="580" x2="1740" y2="580" stroke="#E0E0E0" stroke-width="1"/>
<text x="1640" y="640" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">同步全局进度</text>

<text x="1640" y="770" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">三段式汇报</text>
<text x="1640" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="18" fill="#999999" text-anchor="middle">可视化仪表盘</text>

<!-- 底部章节预告 -->
<line x1="140" y1="900" x2="1780" y2="900" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">下面 5 页（P7-P11）每页展开一个习惯的具体做法</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">06 / 18</text>

</svg>
'''

(SVG_DIR / "page_04.svg").write_text(p4, encoding="utf-8")
(SVG_DIR / "page_05.svg").write_text(p5, encoding="utf-8")
(SVG_DIR / "page_06.svg").write_text(p6, encoding="utf-8")
print("Generated batch_02 SVGs: page_04, page_05, page_06")
