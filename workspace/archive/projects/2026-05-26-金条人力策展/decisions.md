# Decisions — 金条人力供给策展

> 2026-06-06 | nian-ui Phase 1

---

## 前置问卷结果

| 项 | 选择 |
|---|------|
| 开始方式 | Step-by-step |
| 图片占位 | 不需要（纯数据展览） |
| 站点类型 | 单页纵向滚动报告（6屏） |
| 场景色 | **Glacier** `#2A4A5A` — 冷峻、精确、距离感 |
| 导演参考 | **Errol Morris** — 证据驱动、图解式、数据可视化（仅结构） |

---

## 场景色正当性声明

金条人力供给策展不是品牌故事，也不是人文叙事——它是一份关于**结构性分化**的决策工具。17个月的数据表明：基本盘成型、长尾分化、脉冲掩盖衰减。Glacier 的冷峻与精确恰好承载这种"冷眼审视"的视角——不美化、不煽情，让数据自己说话。Errol Morris 的证据驱动结构确保每个数据屏都像一个"案件"被透彻展示。

---

## Previous-work audit

| 项目 | 日期 | 场景色 | 构图族 | 重叠风险 |
|------|------|--------|--------|---------|
| 供应商月度通报 | 06-03 | Olive | Panoramic slab | 场景色不同，构图族不同。题材同为供应商数据但切入角度完全不同（月报 vs 策展），无重叠 |
| nian-ui-intro | 06-03 | Glacier | Panoramic slab | 同一场景色但构图族不同，且 intro 是方法论介绍，与数据策展无重叠 |
| nian-ui-demo | 06-03 | Olive | Corridor + Archive Wall | 场景色和构图族均不同 |

**结论：无直接重叠。将注意避免 panoramic slab 的宽幅横贯式构图。**

---

## Shell-ban list

| 禁止项 | 理由 |
|--------|------|
| SaaS 仪表板式布局 | 不是产品后台，是策展报告 |
| 卡片网格全覆盖 | 避免 AI 模板感 |
| 装饰图像/插画/图标 | 纯数据展览，策展方案明确排除 |
| hover 动效 | 报告不是交互玩具，仅入场动画许可 |
| 标签页切换 | 纵向滚动叙事，不跳转 |
| 工具提示/tooltip | 数据直接在正文中标注，不需要隐藏信息 |
| 斑马纹/填充图标 | nian 红线 |
| emoji | 策展方案明确禁止 |

---

## Primary composition family

**Vertical tower（垂直堆叠）**

每屏垂直堆叠一个数据层级，逐层深入。Errol Morris 的证据积累逻辑——每个塔层揭示一个证据片段，组成完整的结构性叙事。

| 屏 | 角色 | 塔层内容 |
|----|------|---------|
| 1 | Hero | 核心数字锚点(5,174 / 746 / 130) + 策展标题 |
| 2 | 脉搏 | 17个月趋势线 + 季节性脉冲标注 |
| 3 | 基本盘 | TOP3 职场画像 + 三种供给模式 |
| 4 | 分化线 | 11职场排名 + 增长/平稳/下降分类 |
| 5 | 脉冲归因 | 异常检测 + 春节脉冲深度归因 |
| 6 | 来源 | 数据源 + 校验说明 |

---

## Errol Morris 结构翻译

| Morris 技法 | Web 翻译 | 运用位置 |
|------------|---------|---------|
| Interrotron（直视镜头） | 超大数字直接冲击——5,174 占据视口 | Hero 屏、排名屏 |
| Re-enactment（重现） | 趋势线+动画演绎时间节奏 | 脉搏屏 — 从59→746→147的脉冲轨迹 |
| Evidence-driven（证据驱动） | 数据分层呈现：结论→依据→来源 | 每屏的三层金字塔 |
| Diagrammatic（图解式） | 清晰的信息图形展示结构性关系 | 基本盘（供给模式），分化线（排名分类） |
| Interview as architecture | 策展正文=访谈，数据=证据 | 每屏左侧文段+右侧数据并置 |

---

## 字体（nian 固定）

Playfair Display / Inter / JetBrains Mono / Doto（Hero数字装饰）

---

## 颜色 tokens

```css
:root {
  --scene: var(--brand-glacier);       /* #2A4A5A */
  --scene-bg: rgba(42, 74, 90, 0.06);
  --scene-border: rgba(42, 74, 90, 0.2);
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;
  --success: #2E7D32;
  --error: #C62828;
  --warning: #F9A825;
}
```
