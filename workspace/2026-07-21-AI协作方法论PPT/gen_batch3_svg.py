#!/usr/bin/env python3
"""Generate batch_03 SVGs: P7 习惯1 (L10), P8 习惯2 (L13 层级图), P9 习惯3 (L06 5问流程)."""
from pathlib import Path

DECK = Path(__file__).parent / "deck"
SVG_DIR = DECK / "_internal/02_svg_source"

# ============ P7 习惯1：L10 双栏解释 ============
p7 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_07"
data-layout="L10"
page_mode="rational"
visual_density="balanced"
reason="习惯1：左栏核心逻辑 + 右栏 GOALS.md 结构示意。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">跳过 /plan 模式，先对话；用 GOALS.md 锚定持久目标</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">习惯 1 · 让 AI 自主规划并维护路线图</text>

<!-- 左栏：核心逻辑 -->
<text x="164" y="310" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">CORE LOGIC</text>
<text x="164" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="26" font-weight="bold" fill="#333333">用对话启动，用文件锚定</text>

<line x1="164" y1="400" x2="280" y2="400" stroke="#C62828" stroke-width="2"/>

<text x="164" y="460" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 保持灵活性：早期想法不必写成规格文档</text>
<text x="164" y="500" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 让它采访你：识别缺口，转化为可执行计划</text>
<text x="164" y="540" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 设置 Goal：综合上下文设定持久目标</text>
<text x="164" y="580" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">· 持续迭代：新发现可能改变里程碑范围</text>

<line x1="164" y1="640" x2="900" y2="640" stroke="#E0E0E0" stroke-width="1"/>

<rect x="164" y="680" width="740" height="180" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<text x="194" y="720" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" letter-spacing="2">KEY · 关键约束</text>
<text x="194" y="765" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#333333">只有一个 Goal-mode 目标同时激活</text>
<text x="194" y="808" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">里程碑完成后更新 GOALS.md，激活下一个</text>
<text x="194" y="840" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">继续工作</text>

<!-- 右栏：GOALS.md 结构示意 -->
<rect x="980" y="280" width="760" height="580" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="980" y="280" width="760" height="60" fill="#C62828" rx="8"/>
<rect x="980" y="320" width="760" height="20" fill="#C62828"/>
<text x="1020" y="320" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">GOALS.md · 路线图文件</text>

<text x="1020" y="400" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#999999" letter-spacing="2">MILESTONE TEMPLATE</text>

<text x="1020" y="450" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333">里程碑结构：</text>

<rect x="1020" y="475" width="6" height="20" fill="#C62828"/>
<text x="1040" y="492" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">状态（进行中 / 待开始 / 已完成）</text>

<rect x="1020" y="515" width="6" height="20" fill="#C62828"/>
<text x="1040" y="532" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">目标产出（具体交付物）</text>

<rect x="1020" y="555" width="6" height="20" fill="#C62828"/>
<text x="1040" y="572" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">工作范围（任务清单）</text>

<rect x="1020" y="595" width="6" height="20" fill="#C62828"/>
<text x="1040" y="612" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">重要决策（描述 + 原因）</text>

<rect x="1020" y="635" width="6" height="20" fill="#C62828"/>
<text x="1040" y="652" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">已知阻塞</text>

<rect x="1020" y="675" width="6" height="20" fill="#C62828"/>
<text x="1040" y="692" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">完成证据（测试 / 审查 / 演示）</text>

<line x1="1020" y1="740" x2="1700" y2="740" stroke="#E0E0E0" stroke-width="1"/>
<text x="1020" y="790" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#C62828" letter-spacing="2">PLUS</text>
<text x="1020" y="830" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">+ 决策日志（日期 / 决策 / 原因 / 影响）</text>

<!-- 底部 -->
<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">07 / 18</text>

</svg>
'''

# ============ P8 习惯2：L13 Hierarchy 层级图 ============
p8 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_08"
data-layout="L13"
page_mode="rational"
visual_density="balanced"
reason="习惯2：主线程-Worker 层级图（顶部主张 + 三层架构 + 底部结论）。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">主线程只做协调，不陷入实现细节</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">习惯 2 · 目标 / 约束 / 决策 / 状态</text>

<!-- 顶层：主线程 -->
<rect x="730" y="280" width="460" height="100" fill="#C62828" rx="8"/>
<text x="960" y="320" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" letter-spacing="3" text-anchor="middle">MAIN THREAD</text>
<text x="960" y="358" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">主线程（协调者）</text>

<!-- 下行箭头 -->
<line x1="960" y1="380" x2="960" y2="430" stroke="#C62828" stroke-width="2"/>
<polygon points="950,425 970,425 960,445" fill="#C62828"/>
<text x="990" y="412" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#C62828">委派任务</text>

<!-- 中层：3 个 Worker（用单层卡，header 是色条而非独立 rect） -->
<rect x="200" y="450" width="460" height="200" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="200" y="450" width="460" height="6" fill="#C62828"/>
<text x="320" y="494" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828">Worker A · 功能实现</text>
<text x="240" y="570" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">读代码、尝试方法、</text>
<text x="240" y="606" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">追踪失败的测试</text>

<rect x="730" y="450" width="460" height="200" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="730" y="450" width="460" height="6" fill="#C62828"/>
<text x="850" y="494" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828">Worker B · 代码审查</text>
<text x="770" y="570" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">检查实现质量、</text>
<text x="770" y="606" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">发现 token 存储问题</text>

<rect x="1260" y="450" width="460" height="200" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="1260" y="450" width="460" height="6" fill="#C62828"/>
<text x="1380" y="494" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828">Worker C · 测试验证</text>
<text x="1300" y="570" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">跑 tests、代码审查、</text>
<text x="1300" y="606" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">环境校验</text>

<!-- 下行箭头 -->
<line x1="430" y1="650" x2="430" y2="700" stroke="#C62828" stroke-width="2"/>
<polygon points="420,695 440,695 430,715" fill="#C62828"/>
<line x1="960" y1="650" x2="960" y2="700" stroke="#C62828" stroke-width="2"/>
<polygon points="950,695 970,695 960,715" fill="#C62828"/>
<line x1="1490" y1="650" x2="1490" y2="700" stroke="#C62828" stroke-width="2"/>
<polygon points="1480,695 1500,695 1490,715" fill="#C62828"/>

<!-- 底层：状态文件 -->
<rect x="430" y="720" width="500" height="120" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<text x="680" y="760" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">GOALS.md</text>
<text x="680" y="795" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">路线图更新</text>
<text x="680" y="825" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">决策 + 阻塞记录</text>

<rect x="990" y="720" width="500" height="120" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<text x="1240" y="760" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">Documentation.md</text>
<text x="1240" y="795" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">状态日志</text>
<text x="1240" y="825" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#555555" text-anchor="middle">证据归档</text>

<!-- 底部结论 -->
<line x1="140" y1="860" x2="1780" y2="860" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="905" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555" text-anchor="middle">主线程只需：worker 学到了什么 / 什么变了 / 证据是什么 / 下一步做什么</text>
<text x="960" y="940" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" text-anchor="middle">委派可用 subagent 或独立 thread（有完整历史可回溯）</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">08 / 18</text>

</svg>
'''

# ============ P9 习惯3：L06 5问流程 ============
p9 = '''<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<!--
page_key="page_09"
data-layout="L06"
page_mode="rational"
visual_density="balanced"
reason="习惯3：路线图审计 5 问 + 同步 /review 流程图。"
-->
<rect x="0" y="0" width="1920" height="1080" fill="#F5F7FA"/>

<!-- 主标题 -->
<rect x="140" y="120" width="4" height="76" fill="#C62828"/>
<text x="164" y="170" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="38" font-weight="bold" fill="#333333">里程碑后先审计路线图，再 review 代码</text>
<text x="164" y="214" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">习惯 3 · 双重验证：计划还对吗？代码质量够吗？</text>

<!-- 5 问水平流程 -->
<text x="164" y="290" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">路线图审计 5 问</text>

<!-- 问题 1 -->
<rect x="140" y="320" width="300" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="320" width="6" height="200" fill="#C62828"/>
<text x="170" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">Q1</text>
<text x="170" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">里程碑真的</text>
<text x="170" y="462" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">完成了吗？</text>

<!-- 箭头 -->
<line x1="440" y1="420" x2="480" y2="420" stroke="#C62828" stroke-width="2"/>
<polygon points="475,410 495,420 475,430" fill="#C62828"/>

<!-- 问题 2 -->
<rect x="500" y="320" width="300" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="500" y="320" width="6" height="200" fill="#C62828"/>
<text x="530" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">Q2</text>
<text x="530" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">下一个目标</text>
<text x="530" y="462" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">还是对的吗？</text>

<!-- 箭头 -->
<line x1="800" y1="420" x2="840" y2="420" stroke="#C62828" stroke-width="2"/>
<polygon points="835,410 855,420 835,430" fill="#C62828"/>

<!-- 问题 3 -->
<rect x="860" y="320" width="300" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="860" y="320" width="6" height="200" fill="#C62828"/>
<text x="890" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">Q3</text>
<text x="890" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">有遗漏的</text>
<text x="890" y="462" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">里程碑吗？</text>

<!-- 箭头 -->
<line x1="1160" y1="420" x2="1200" y2="420" stroke="#C62828" stroke-width="2"/>
<polygon points="1195,410 1215,420 1195,430" fill="#C62828"/>

<!-- 问题 4 -->
<rect x="1220" y="320" width="300" height="200" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="1220" y="320" width="6" height="200" fill="#C62828"/>
<text x="1250" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">Q4</text>
<text x="1250" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">新证据是否</text>
<text x="1250" y="462" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">调整了顺序？</text>

<!-- 箭头 -->
<line x1="1520" y1="420" x2="1560" y2="420" stroke="#C62828" stroke-width="2"/>
<polygon points="1555,410 1575,420 1555,430" fill="#C62828"/>

<!-- 问题 5 -->
<rect x="1580" y="320" width="200" height="200" fill="#FFFFFF" stroke="#C62828" stroke-width="2" rx="8"/>
<rect x="1580" y="320" width="6" height="200" fill="#C62828"/>
<text x="1610" y="365" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="36" font-weight="bold" fill="#C62828">Q5</text>
<text x="1610" y="430" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">完成定义</text>
<text x="1610" y="462" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">还成立吗？</text>

<!-- 中部对照：路线图审计 vs /review -->
<line x1="140" y1="600" x2="1780" y2="600" stroke="#E0E0E0" stroke-width="1"/>
<text x="164" y="650" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#C62828" letter-spacing="3">双轨验证 · TWO-TRACK VALIDATION</text>

<!-- 左：路线图审计 -->
<rect x="140" y="690" width="780" height="170" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="140" y="690" width="6" height="170" fill="#C62828"/>
<text x="170" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">路线图审计</text>
<text x="170" y="780" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">发现：没人用真实登录浏览器测过</text>
<text x="170" y="820" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">→ 缺失的浏览器验证</text>

<!-- 右：/review -->
<rect x="940" y="690" width="840" height="170" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="8"/>
<rect x="940" y="690" width="6" height="170" fill="#C62828"/>
<text x="970" y="730" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="24" font-weight="bold" fill="#C62828">同步 /review</text>
<text x="970" y="780" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#333333">发现：token 存储方式不对</text>
<text x="970" y="820" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" fill="#555555">→ 即使远程测试通过</text>

<!-- 底部结论 -->
<line x1="140" y1="900" x2="1780" y2="900" stroke="#E0E0E0" stroke-width="1"/>
<text x="960" y="950" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="22" font-weight="bold" fill="#333333" text-anchor="middle">更新 GOALS.md → 委派 token 修复 → 添加缺失的浏览器验证 → 才激活下一个里程碑</text>

<text x="1740" y="1015" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="20" fill="#999999" text-anchor="end">09 / 18</text>

</svg>
'''

for name, content in [("page_07", p7), ("page_08", p8), ("page_09", p9)]:
    (SVG_DIR / f"{name}.svg").write_text(content, encoding="utf-8")
print("Generated batch_03 SVGs: page_07 (L10), page_08 (L13), page_09 (L06)")
