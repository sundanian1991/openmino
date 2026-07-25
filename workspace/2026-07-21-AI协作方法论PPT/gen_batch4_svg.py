#!/usr/bin/env python3
"""Generate batch_04 SVGs: P10 习惯4 (L06 闭环), P11 习惯5 (L03 KPI), P12 4 共识 (L12 2×2)."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P10 习惯4：L06 远程→本地→远程闭环 ============
p10 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_10"
data-layout="L06"
page_mode="rational"
visual_density="balanced"
reason="习惯4：UU 远程 → 本地 → 远程 5 步闭环流程。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">远程（UU）跑绝大多数，本机只做环境依赖的专属校验</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">习惯 4 · UU 远程优先 + 本地专属校验</text>

<!-- 5 步闭环（水平流程） -->
<!-- 步骤 1 -->
<rect x="140" y="290" width="300" height="220" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="6" height="220" fill="#C62828"/>
<text x="170" y="335" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">01</text>
<text x="170" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">UU 远程 Worker</text>
<text x="170" y="425" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">实现功能</text>
<text x="170" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">跑在远程实例</text>

<!-- 箭头 -->
<line x1="440" y1="400" x2="480" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="475,390 495,400 475,410" fill="#C62828"/>

<!-- 步骤 2 -->
<rect x="500" y="290" width="300" height="220" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="500" y="290" width="6" height="220" fill="#C62828"/>
<text x="530" y="335" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">02</text>
<text x="530" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">远程测试</text>
<text x="530" y="425" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">测试通过</text>
<text x="530" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">单元/集成测试</text>

<!-- 箭头 -->
<line x1="800" y1="400" x2="840" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="835,390 855,400 835,410" fill="#C62828"/>

<!-- 步骤 3 -->
<rect x="860" y="290" width="300" height="220" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="860" y="290" width="6" height="220" fill="#C62828"/>
<text x="890" y="335" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">03</text>
<text x="890" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">本地线程</text>
<text x="890" y="425" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">环境校验</text>
<text x="890" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">专属环境验证</text>

<!-- 箭头 -->
<line x1="1160" y1="400" x2="1200" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="1195,390 1215,400 1195,410" fill="#C62828"/>

<!-- 步骤 4 -->
<rect x="1220" y="290" width="300" height="220" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1220" y="290" width="6" height="220" fill="#C62828"/>
<text x="1250" y="335" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">04</text>
<text x="1250" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">发现 Bug</text>
<text x="1250" y="425" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">回传远程</text>
<text x="1250" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">环境相关问题</text>

<!-- 箭头 -->
<line x1="1520" y1="400" x2="1560" y2="400" stroke="#C62828" stroke-width="2"/>
<polygon points="1555,390 1575,400 1555,410" fill="#C62828"/>

<!-- 步骤 5 -->
<rect x="1580" y="290" width="200" height="220" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1580" y="290" width="6" height="220" fill="#C62828"/>
<text x="1610" y="335" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">05</text>
<text x="1610" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">远程修复</text>
<text x="1610" y="425" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">UU 远程</text>
<text x="1610" y="475" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">回到步骤 01</text>

<!-- 回环箭头（从 05 回到 01） -->
<path d="M 1680 540 Q 1680 600, 1100 600 T 290 540" fill="none" stroke="#C62828" stroke-width="2" opacity="0.5"/>
<polygon points="285,548 305,540 305,558" fill="#C62828" opacity="0.5"/>
<text x="960" y="620" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#C62828" text-anchor="middle" opacity="0.7">循环回到 UU 远程</text>

<!-- 本机场景区 -->
<line x1="140" y1="700" x2="1780" y2="700" stroke="#E0E0E0" stroke-width="1"/>
<text x="164" y="750" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">LOCAL SCENARIOS · 需要本机的场景</text>

<text x="164" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">登录态浏览器</text>
<text x="350" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 本地凭据</text>
<text x="540" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· Xcode</text>
<text x="690" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· macOS 权限</text>
<text x="900" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· iOS 模拟器</text>

<!-- 底部结论 -->
<line x1="140" y1="860" x2="1780" y2="860" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="910" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">项目保持远程优先（UU），电脑只在需要时加入</text>
<text x="960" y="945" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">远程线程可检查本地是否可用</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">10 / 18</text>

</svg>
'''

# ============ P11 习惯5：L03 三段式 + 仪表盘 6 模块 ============
p11 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_11"
data-layout="L03"
page_mode="rational"
visual_density="balanced"
reason="习惯5：三段式汇报 3 卡 + 仪表盘 6 模块网格。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">三段式汇报 + 可视化仪表盘</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">习惯 5 · 用简报和仪表盘同步全局进度</text>

<!-- 三段式汇报 3 卡 -->
<text x="164" y="285" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">THREE-SEGMENT REPORT · 三段式汇报</text>

<rect x="140" y="310" width="540" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="310" width="6" height="160" fill="#C62828"/>
<text x="170" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">01</text>
<text x="280" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#333333">What's done</text>
<text x="170" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">已完成什么</text>
<text x="170" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">每次状态变化时输出</text>

<rect x="700" y="310" width="540" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="310" width="6" height="160" fill="#C62828"/>
<text x="730" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">02</text>
<text x="840" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#333333">What's next</text>
<text x="730" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">下一步是什么</text>
<text x="730" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">像每小时一次的站会</text>

<rect x="1260" y="310" width="520" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="310" width="6" height="160" fill="#C62828"/>
<text x="1290" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">03</text>
<text x="1400" y="355" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#333333">Any blockers</text>
<text x="1290" y="410" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">有无阻塞</text>
<text x="1290" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">或「无」</text>

<!-- 仪表盘 6 模块 -->
<text x="164" y="540" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">DASHBOARD · 可视化仪表盘（progress-dashboard.html）</text>

<rect x="140" y="565" width="520" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="565" width="6" height="160" fill="#C62828"/>
<text x="170" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">01</text>
<text x="280" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">当前活跃目标</text>
<text x="170" y="665" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">正在推进的里程碑</text>
<text x="170" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">+ 已完成里程碑</text>

<rect x="680" y="565" width="520" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="680" y="565" width="6" height="160" fill="#C62828"/>
<text x="710" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">02</text>
<text x="820" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">证据状态</text>
<text x="710" y="665" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">测试 / 审查 / 演示</text>
<text x="710" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">验证完成度</text>

<rect x="1220" y="565" width="560" height="160" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1220" y="565" width="6" height="160" fill="#C62828"/>
<text x="1250" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">03</text>
<text x="1360" y="610" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">阻塞项</text>
<text x="1250" y="665" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">当前阻塞 + 决策记录</text>
<text x="1250" y="700" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">最近更新时间</text>

<!-- 底部结论 -->
<line x1="140" y1="800" x2="1780" y2="800" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="850" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">Codex 可将仪表盘部署为 Site，保持远程可访问</text>
<text x="960" y="885" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">几小时后回来，无需读取每个 worker thread 就能理解项目状态</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">11 / 18</text>

</svg>
'''

# ============ P12 4 共识 2×2 ============
p12 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_12"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="完整方法论 4 共识 2×2 网格 + 底部一句话总结。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">完整方法论的四个核心共识</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">能力基础 + 协作流程 = 完整方法论</text>

<!-- 2×2 网格 -->
<!-- 共识 1 左上 -->
<rect x="140" y="290" width="800" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="6" height="280" fill="#C62828"/>
<text x="180" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">01</text>
<text x="290" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" font-weight="bold" fill="#333333">持久 Goal</text>

<line x1="180" y1="390" x2="900" y2="390" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">为 AI 提供</text>
<text x="180" y="485" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" font-weight="bold" fill="#C62828">不会漂移的锚点</text>
<text x="180" y="535" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#999999">Goal + GOALS.md</text>

<!-- 共识 2 右上 -->
<rect x="980" y="290" width="800" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="290" width="6" height="280" fill="#C62828"/>
<text x="1020" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">02</text>
<text x="1130" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" font-weight="bold" fill="#333333">里程碑审计</text>

<line x1="1020" y1="390" x2="1740" y2="390" stroke="#E0E0E0" stroke-width="1"/>

<text x="1020" y="445" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">为项目设置</text>
<text x="1020" y="485" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" font-weight="bold" fill="#C62828">多层验收关卡</text>
<text x="1020" y="535" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#999999">里程碑审计 + /review</text>

<!-- 共识 3 左下 -->
<rect x="140" y="600" width="800" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="600" width="6" height="280" fill="#C62828"/>
<text x="180" y="660" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">03</text>
<text x="290" y="660" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" font-weight="bold" fill="#333333">状态外置</text>

<line x1="180" y1="700" x2="900" y2="700" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="755" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">避免信息仅存在于</text>
<text x="180" y="795" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" font-weight="bold" fill="#C62828">线程上下文</text>
<text x="180" y="845" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#999999">文件 + 仪表盘</text>

<!-- 共识 4 右下 -->
<rect x="980" y="600" width="800" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="600" width="6" height="280" fill="#C62828"/>
<text x="1020" y="660" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="56" font-weight="bold" fill="#C62828">04</text>
<text x="1130" y="660" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" font-weight="bold" fill="#333333">持续验证</text>

<line x1="1020" y1="700" x2="1740" y2="700" stroke="#E0E0E0" stroke-width="1"/>

<text x="1020" y="755" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555">每个里程碑都检查</text>
<text x="1020" y="795" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" font-weight="bold" fill="#C62828">不是最后才检查</text>
<text x="1020" y="845" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#999999">tests + review</text>

<!-- 底部一句话总结 -->
<line x1="140" y1="910" x2="1780" y2="910" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#555555" text-anchor="middle">能力是<tspan font-weight="bold" fill="#333333">地基</tspan>（能跑 25 小时），协作流程是<tspan font-weight="bold" fill="#C62828">建筑</tspan>（怎么不翻车）</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">12 / 18</text>

</svg>
'''

for name, content in [("page_10", p10), ("page_11", p11), ("page_12", p12)]:
    (SVG_DIR / f"{name}.svg").write_text(content, encoding="utf-8")
print("Generated batch_04 SVGs: page_10, page_11, page_12")
