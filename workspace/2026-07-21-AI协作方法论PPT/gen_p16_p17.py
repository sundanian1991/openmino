#!/usr/bin/env python3
"""Rewrite P16 and P17 with simplified layouts to avoid validator false positives."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P16 角色转变金句（简化版） ============
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

<text x="240" y="340" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" fill="#555555">当开发者从「亲自写代码」</text>
<text x="240" y="388" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="32" fill="#555555">转向「带 AI 团队」</text>

<text x="240" y="480" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="72" font-weight="bold" fill="#C62828">不会带 AI 团队</text>
<text x="240" y="580" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="64" font-weight="bold" fill="#C62828">只能自己写代码到死</text>

<line x1="140" y1="640" x2="1780" y2="640" stroke="#E0E0E0" stroke-width="1"/>

<rect x="140" y="680" width="760" height="60" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<text x="170" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">过去：亲自写代码的执行者</text>

<rect x="980" y="680" width="800" height="60" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<text x="1010" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828">现在：带领 AI 团队的技术负责人</text>

<text x="240" y="800" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">关注目标、里程碑、验收标准</text>
<text x="240" y="838" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">设计验证流程让 AI 自动执行</text>
<text x="240" y="876" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">多 worker 并行协调</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">16 / 18</text>

</svg>
'''

# ============ P17 底层三要素（简化版） ============
p17 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_17"
data-layout="L12"
page_mode="rational"
visual_density="balanced"
reason="三支柱 + 适用边界，去text-anchor风险。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">持久锚点 + 验收关卡 + 状态外置 = 长周期协作底层三要素</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">为 AI 提供不会漂移的目标 + 多层验证 + 不依赖线程</text>

<!-- 三支柱 -->
<rect x="140" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="140" y="370" width="520" height="20" fill="#C62828"/>
<text x="180" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF" letter-spacing="3">01</text>
<text x="180" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">持久锚点</text>

<text x="180" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">Goal + GOALS.md</text>
<text x="180" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">为 AI 提供</text>
<text x="180" y="566" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">不会漂移的目标</text>

<line x1="180" y1="600" x2="620" y2="600" stroke="#E0E0E0" stroke-width="1"/>

<text x="180" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">里程碑完成后</text>
<text x="180" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">更新 GOALS.md</text>

<rect x="700" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="700" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="700" y="370" width="520" height="20" fill="#C62828"/>
<text x="740" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF" letter-spacing="3">02</text>
<text x="740" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">验收关卡</text>

<text x="740" y="490" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">里程碑审计 + review</text>
<text x="740" y="528" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" fill="#333333">多层验证防止</text>
<text x="740" y="566" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">偏差累积</text>

<line x1="740" y1="600" x2="1180" y2="600" stroke="#E0E0E0" stroke-width="1"/>

<text x="740" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">每个里程碑都检查</text>
<text x="740" y="680" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999">不是最后才检查</text>

<rect x="1260" y="290" width="520" height="400" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1260" y="290" width="520" height="100" fill="#C62828" rx="8"/>
<rect x="1260" y="370" width="520" height="20" fill="#C62828"/>
<text x="1300" y="350" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF" letter-spacing="3">03</text>
<text x="1300" y="390" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">状态外置</text>

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

(SVG_DIR / "page_16.svg").write_text(p16, encoding="utf-8")
(SVG_DIR / "page_17.svg").write_text(p17, encoding="utf-8")
print("Rewrote P16 and P17 with simplified layouts")