---
name: hand-drawn-icon
description: 手绘风格 SVG 生成器。包含两套流程：①简单流程→ better-icons搜索（直接用）；②复杂流程→设计指令+API输出。关键词：画个XX、生成图标、手绘SVG、帮我画个
---

# Hand-Drawn Icon — 手绘 SVG 生成器

> 风格来源：李诞虾（四色系统 + 曲线节奏）
> API 额度：每周 20 次（仅复杂场景使用）

---

## 核心工作流

### 判断：简单 vs 复杂

| 类型 | 判断标准 | 流程 |
|------|----------|------|
| **简单** | 有标准 icon 库可搜索（箭头、警告、生物轮廓、简单器物） | 简单流程 |
| **复杂** | 无标准 icon、需有机曲线（杯子、虾、树、生物） | 复杂流程 |

---

### 流程一：简单 icon（better-icons 搜索）

```
1. 需求 → 翻译成目标语言
   年老师："我要一个警告图标" → "warning icon"

2. better-icons 搜索
   curl -s "https://api.iconify.design/search?query=warning"

3. 导出候选 SVG
   curl -s "https://api.iconify.design/{collection}:{icon}.svg"

4. 风格检查
   - icon 风格与李诞虾风格一致？→ 直接用
   - 风格不一致？→ 考虑手绘对照（可选）
```

**核心原则**：简单 icon 优先用 better-icons，风格一致就直接用，不用手绘。

---

### 流程二：复杂 icon（API 输出）

```
1. 设计指令
   - 设计哲学（运动名称 + 3句话）
   - 风格体系（四色 + 线条 + 曲线节奏）
   - 物体分析（结构分解 + 视角 + 复杂度）

2. 调用 API（每周 20 次额度）
   POST https://api.quiver.ai/v1/svgs/generations
   {
     "prompt": "...",
     "model": "arrow-preview",
     "aspect_ratio": "1:1",
     "style": "hand-drawn"
   }

3. 验证输出
   - 形状、颜色、线条是否符合规范
   - 交付
```

**核心原则**：复杂 icon 无参考结构，必须 API 生成。

---

## 技能定位

**是"翻译"** — 把年老师的需求，翻译成精确的设计指令，让 API 或 icon 库产出对的结果。

**API 额度**：每周 20 次，仅用于复杂场景。简单 icon 不用 API。

---

### 色彩系统（四色）

```css
--terra-cotta: #D6654B;    /* 陶土色 — 焦点强调 */
--ink-black: #1A1612;      /* 墨黑 — 描边 */
--rice-white: #FEFFFE;     /* 米白 — 主体填充 */
--deep-terra: #B03A21;     /* 深陶土 — 阴影/深度 */
```

**快速决策流程**：
1. 这个物体是活的吗？→ 是 = 陶土色主体，否 = 米白主体
2. 需要强调哪个部分？→ 那部分用陶土色点缀（≤2处）
3. 底部需要重量感吗？→ 添加深陶土阴影
4. 所有线条用墨黑描边

---

### 线条系统

```css
主轮廓: 4.0 - 5.5px;    /* 手工绘制标准（简单 icon 常用） */
结构线: 2.5 - 3.5px;
细节线: 1.5 - 2.0px;

/* 必须使用 */
stroke-linecap="round"
stroke-linejoin="round"
```

---

## 游泳场景 icon 案例（已验证）

| 元素 | better-icons 来源 | 状态 |
|------|-------------------|------|
| 警告三角 | mingcute:warning-fill | ✅ 可直接用 |
| 泳帽 | hugeicons:swimming-cap | ✅ 可直接用 |
| 泳镜 | ph:goggles | ✅ 可直接用 |
| 救生圈 | ph:lifebuoy-fill | ✅ 可直接用 |
| 浴巾 | ph:towel-fill | ✅ 可直接用 |
| 泳衣 | icon-park:swimsuit | ✅ 可直接用 |

**验证结论**：Iconify 的 icon 风格与李诞虾风格一致，游泳场景的简单 icon 可直接使用。

---

*最后更新：2026-04-04*
