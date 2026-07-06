# 设计判断前置输入 · handoff-3

> Step 0c。策展大纲 + 审查报告 → 施工输入。

---

## 内容形式
P2 数据简报 / 研究报告。机构署名、硬数据、克制语气。
→ 视觉形式：**数据叙事链**（V5 Pulse Hero + Stat Grid + Seam/Tension + Data Table + Callout + Footer）。这是数据组件的主场。

## 施工硬约束（必须 preserve）
1. **70/20 主语角度**：用"人做 70% 规划、仅做 20% 执行"，不写"AI 做 80%"——原文主语是"人"
2. **verified success 三条件**：代码提交 OR 测试通过 OR 用户确认——必须显式列出
3. **"may be a preview"开场**：概念建立段用这句视角锚定
4. **"if/suggests"语气**：标题用命名式（"persistent returns"→"专业知识的持续回报"），不用"证明/揭示"
5. **未来指标机制解释**："回报下降=模型补判断力=受益群体扩展"必须解释清楚
6. **"观察框架不是结论"增量**：收束段点出
7. **+27% 改定性**：任务价值用"持续上升"不写未确认数字

## 施工弹性区
- 分工比例用 Stat Grid 还是 Tension Grid（70 vs 20 不是对立，是分工——倾向 Stat Grid 并列）
- 错误恢复用 Tension Grid（专家 vs 新手——这是对比关系，Tension 合适）

## 组件禁用清单
- ❌ Article Header / Drop Cap / Pull Quote / Article Footer（长文体例——这是报告不是长文）
- ❌ Manifesto（仪式宣言——报告不需要情绪升华）
- ❌ Testimonial（第三方证言——机构报告无人物声音）

---

## 8 问

### Q1 内容本质上在做什么？
**证明一个论点（数据报告）**——用 40 万次会话实证支持三个论断。→ **V5 Pulse Hero**（深底 + KPI 数据条）。数据报告封面首选 Pulse。

### Q2 primary？
"专业知识的持续回报"（persistent returns to expertise）——这是报告标题的核心，也是最反直觉的发现（不是 coding 技能，是 domain 知识）。

### Q3 情绪温度？
精确/可控/掌握 + 安静/克制/信任。机构报告的权威感来自数据 + 克制，不来自戏剧化。→ 配色承诺：轻克制，主底 offwhite + forest 单色贯穿。Signal ≤2。深段用于节奏断点。

### Q4 信息层次？
- primary：persistent returns to expertise（专业度持续回报）
- secondary：70/20 分工 / 专家-中级 modest / 错误恢复差距
- tertiary：9 个工作模式、职业排名、未来指标

### Q5 叙事弧线？
数据漏斗：Hero(KPI) → 概念("may be a preview") → 分工(70/20) → 专业度回报(核心发现) → 错误恢复(机制) → 职业排名(横向) → 未来指标(收束)。含"反转"——管理者成功率不比工程师低。

### Q6 克制度？
轻克制。信息密集，多组件共存。64-96px section padding。1px 发丝线分隔。

### Q7 视觉气质？
**测绘感**。点阵 + 前缀线 + 等宽标签 + 网格。技术报告的工程化精度感。

### Q8 换品牌成立吗？
否。三个论断 + 40 万样本 + 持续回报指标是这篇独有。

---

## 施工图

### Hero：V5 Pulse
- 深底 charcoal + 脉动线 + ghost 巨字 "EXPERTISE" + 3 KPI 条（40万/23.5万/7个月）

### 数据叙事链
1. **Pulse Hero**（深底 KPI 概览）
2. **Concept section**（浅底 · "may be a preview" 开场 + 三个论断预告）
3. **Stat Grid**（浅底 · 分工 70/20 + 9 个工作模式）
4. **Seam Benchmark 或 Stat Grid**（深底 · 专业度回报：专家 vs 中级 vs 新手 + "modest gap"）
5. **Tension Grid**（浅底 · 错误恢复：专家 vs 新手翻车后）
6. **Data Table 排名**（浅底 · 10 个职业成功率 + ≤7pp + verified success 三条件）
7. **Callout**（深底 · 未来观察指标：if returns decrease → 机制解释）
8. **Footer**（black · 报告来源 + 附录链接）

### 深段配额
Hero(深) + 专业度(深) + 未来指标(深) + Footer(深) = 4 段。
检查 R10（深段孤立）：Hero → 浅(概念) → 浅(分工) → 深(专业度) → 浅(错误) → 浅(排名) → 深(未来) → 深(Footer)。
**问题**：未来指标(深) 与 Footer(深) 相邻——违 R10。**修复**：未来指标改为浅底 Callout（cream 底 + forest 左边线），让 Footer 是唯一终局深段。或在未来和 Footer 之间插一个浅段（"观察框架不是结论"的收束段）。
**采用**：未来指标用 cream 浅底 Callout + 收束段（浅底）→ Footer(深)。深段序列：Hero + 专业度 = 2 段内容深 + Footer。合规。

### hover 反转
数据页标配——Layer/Swatch/Matrix 行 hover 反色。这篇用 Stat Grid + Seam，hover 用 border 变色（A15 克制）。
