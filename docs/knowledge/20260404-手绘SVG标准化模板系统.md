# 手绘SVG标准化模板系统

**目标**：从东京猫/李诞虾提取可复用模板，填空式生成新内容
**创建时间**：2026-04-04

---

## 一、东京猫模板分析

### 1.1 结构分层

```
Layer 1: 填充层（色彩权重）
├── 主体填充（#FEFFFA 暖白）
├── 强调填充（#BA3420 陶土）
└── 点缀填充（#0B0800 墨黑小点）

Layer 2: 线条层（精细轮廓）
├── 主轮廓（stroke-width: 1.5px）
├── 细节线（stroke-width: 1.04px）
└── 最细线（stroke-width: 0.7-1px）

Layer 3: 装饰层（点缀元素）
└── 小色块（纯填充，无描边）
```

### 1.2 核心技法参数

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  fill="none"
  viewBox="0 0 200 200"
>
  <!-- 全局技法 -->
  <g fill="none" stroke="#0B0800" stroke-linecap="round" stroke-linejoin="round">
```

### 1.3 色彩系统

| 用途 | 颜色代码 | 说明 |
|------|---------|------|
| 背景/主体填充 | #FEFFFA | 暖白色 |
| 强调填充 | #BA3420 | 陶土色（主） |
| 线条 | #0B0800 | 墨黑色 |
| 次要背景 | #F7F3ED | 米白色 |
| 辅助强调 | #C4432A | 浅陶土 |

### 1.4 线条粗细层级

| 粗细 | 用途 | 示例 |
|------|------|------|
| 1.5px | 主轮廓 | 身体、头部外沿 |
| 1.04px | 细节线 | 爪子、胡须 |
| 0.7-1px | 最细线 | 纹理、高光 |

---

## 二、李诞虾模板分析

### 2.1 结构分层（更清晰的双层）

```xml
<svg viewBox="0 0 250 250">
  <!-- 第一层：填充层（纯色，无描边） -->
  <path d="..." fill="#BA3420"/>           <!-- 陶土色填充 -->
  <path d="..." fill="#FEFFFA"/>          <!-- 暖白填充 -->
  <path d="..." fill="#0B0800"/>          <!-- 墨黑填充 -->

  <!-- 第二层：描边层（纯线，无填充） -->
  <g fill="none" stroke="#0B0800" stroke-linecap="round" stroke-linejoin="round">
    <path d="..." stroke-width="1.6"/>    <!-- 主线 -->
    <path d="..." stroke-width="2.1"/>    <!-- 轮廓 -->
    <path d="..." stroke-width="0.7"/>    <!-- 细节 -->
  </g>
</svg>
```

### 2.2 关键差异

| 维度 | 东京猫 | 李诞虾 |
|------|--------|--------|
| 层分离 | 不严格（混合） | 严格（先填后描） |
| 线条粗细 | 1.04-1.5px | 0.7-2.1px（更广） |
| 色彩深度 | 多层次 | 双层为主 |
| 装饰元素 | 小色块点缀 | 大面积填充 |

---

## 三、通用API输入模板

### 3.1 主Prompt模板

```
[主体描述] in [风格] style.

主体构成:
- [主要元素1] with [细节描述]
- [主要元素2] with [细节描述]
- [关系/动作] between elements

风格要求:
- Hand-drawn ink style with 双层技法 (fill layer + ink line layer)
- 精细度: ~50-60 path elements for main content
- stroke-linecap: round, stroke-linejoin: round

构图:
- [布局描述: horizontal/vertical/circular]
- [尺寸: viewBox 0 0 W H]
- [重点: 用色彩/线条粗细引导视线]

色彩:
- 陶土色 #BA3420 (强调)
- 米白 #F7F3ED/#FEFFFA (背景)
- 墨黑 #0B0800 (线条)
```

### 3.2 Instructions模板

```
色彩规范:
- 陶土色: #BA3420 (主), #E2725B (辅)
- 米白: #F7F3ED (背景), #FEFFFA (填充)
- 墨黑: #0B0800 (线条), #111111 (文字)

线条技法:
- stroke-linecap: round
- stroke-linejoin: round
- 主线: 1.5-2.1px
- 细节: 0.7-1.2px

分层结构:
- 先填充层 (fill only, no stroke)
- 后描边层 (stroke only, no fill)
- 装饰点缀 (small solid fills)

输出要求:
- SVG viewBox [尺寸]
- 确保中文清晰可读
- 使用上述色彩系统
```

### 3.3 References模板

```json
[
  {
    "type": "style_fill",
    "description": "东京猫填充层技法",
    "url": "[东京猫SVG URL或base64]"
  },
  {
    "type": "style_line",
    "description": "李诞虾线条层技法",
    "url": "[李诞虾SVG URL或base64]"
  },
  {
    "type": "composition",
    "description": "[类似构图参考]",
    "url": "[参考图URL]"
  },
  {
    "type": "color",
    "description": "色彩系统",
    "url": "[色卡SVG]"
  }
]
```

---

## 四、具体应用模板

### 4.1 组织架构图模板

```
Prompt:
"Organizational chart showing [主体关系] in Japanese hand-drawn style.

Elements:
- Left: [左侧实体] with [属性/权力]
- Right: [右侧实体] with [属性/权力]
- Middle: [中间实体] caught between
- Arrows: [关系流向] (使用stroke-width 2-2.5px强调)

Composition:
- Horizontal layout, viewBox 0 0 800 400
- 三分构图: 30%-40%-30%
- 用circle size表示权力权重
- 用箭头粗细表示关系强度

Style:
- 东京猫风格精细度
- 双层技法分离清晰
- 陶土色强调关键权力点"
```

### 4.2 流程图模板

```
Prompt:
"Process diagram showing [流程名称] with [步骤数] steps.

Elements:
- 步骤1: [名称] with [图标/符号]
- 步骤2: [名称] with [图标/符号]
- ...
- Arrows connecting steps horizontally

Composition:
- Horizontal flow, viewBox 0 0 1000 300
- 每个步骤用card/box表示
- 用色彩强调关键步骤
- 用箭头表示流向

Style:
- 李诞虾风格（简洁）
- stroke-width: 1.5-2px
- 适当留白，不拥挤"
```

### 4.3 人物关系图模板

```
Prompt:
"Network diagram showing [人物关系].

Elements:
- Center: [中心人物] with largest circle
- 周边: [周边人物] with smaller circles
- Connections: [关系类型] 用虚线/实线区分

Composition:
- 中心辐射布局, viewBox 0 0 600 600
- Circle size ∝ 权力/影响力
- Line thickness ∝ 关系强度

Style:
- 东京猫精细风格
- 双层技法
- 陶土色点缀中心人物"
```

---

## 五、填空式生成流程

### 5.1 准备清单

生成前必须准备好：

**内容信息**：
- [ ] 主要元素有哪些？（人物/部门/概念）
- [ ] 它们之间什么关系？（层级/流动/对比）
- [ ] 重点强调什么？（用色彩/尺寸/位置）

**构图信息**：
- [ ] 布局方式？（水平/垂直/辐射）
- [ ] viewBox尺寸？
- [ ] 元素比例？

**风格信息**：
- [ ] 东京猫风格（精细）还是李诞虾风格（简洁）？
- [ ] 需要文字吗？（中文/英文/纯图标）

### 5.2 填空步骤

1. **选择基础模板** → 组织架构/流程/关系
2. **填写内容信息** → 替换[主体]、[元素]、[关系]
3. **调整构图** → viewBox、布局、比例
4. **固定风格** → 色彩、线条、分层
5. **准备references** → 东京猫+李诞虾+类似参考
6. **调用API** → 一次性生成

---

## 六、质量控制检查点

生成后检查：

**结构**：
- [ ] 是否有清晰的双层分离？
- [ ] stroke-linecap/round 是否应用？
- [ ] 色彩是否符合系统？

**精细度**：
- [ ] path元素数量约50-60个？（主体）
- [ ] 线条粗细有变化吗？
- [ ] 细节足够但不拥挤？

**内容**：
- [ ] 所有元素都包含了吗？
- [ ] 关系表达清晰吗？
- [ ] 重点是否突出？

**文字**：
- [ ] 中文清晰可读？
- [ ] 位置合适吗？
- [ ] 大小合适吗？

---

## 七、API调用示例（完整）

### 示例：生成"策略组vs服务组权责分离"

```json
{
  "model": "arrow-preview",
  "n": 1,
  "temperature": 0.7,
  "prompt": "Organizational chart showing 权责不对等 in a company.\n\nElements:\n- Left: 策略组 with 定价权, 人物: 刘伟佳\n- Right: 服务组 with 执行责任, 人物: 王易人→年老师\n- Middle: 供应商 caught between conflicting signals\n- Arrows: 决策权 left→right (thick stroke), 风险 right→left (dashed)\n\nComposition:\n- Horizontal layout, viewBox 0 0 800 400\n- Three sections: 30%-40%-30%\n- Circle size ∝ power level\n- Use vermillion for key power points\n\nStyle:\n- 东京猫手绘风格，精细度 ~50 path elements\n- 双层技法: fill layer (opacity 0.08-0.15) + ink line layer\n- stroke-linecap: round, stroke-linejoin: round\n- 主线 1.5-2px, 细节 0.8-1.2px",
  "instructions": "色彩规范:\n- 陶土色 #BA3420 (强调), #E2725B (辅助)\n- 米白 #F7F3ED (背景), #FEFFFA (填充)\n- 墨黑 #0B0800 (线条)\n\n线条技法:\n- stroke-linecap: round\n- stroke-linejoin: round\n- 主轮廓 1.5-2px, 细节 0.8-1.2px\n\n分层:\n- 先填充层 (fill only)\n- 后描边层 (stroke only)\n- 装饰点缀 (small fills)\n\n文字:\n- 中文清晰可读\n- 使用墨黑色 #0B0800",
  "references": [
    {
      "type": "style",
      "url": "[东京猫SVG]"
    },
    {
      "type": "technique",
      "url": "[李诞虾SVG]"
    }
  ]
}
```

---

## 八、模板库扩展

### 8.1 可复用的SVG组件

**人物图标**：
```xml
<!-- 简单版 -->
<circle cx="x" cy="y" r="size" fill="#F7F3ED" stroke="#0B0800" stroke-width="1.5"/>

<!-- 带文字版 -->
<circle cx="x" cy="y" r="size" fill="#BA3420" fill-opacity="0.1" stroke="#0B0800" stroke-width="2"/>
<text x="x" y="y+text_offset" text-anchor="middle" fill="#0B0800">姓名</text>
```

**箭头**：
```xml
<!-- 实线箭头（强关系） -->
<path d="Mx1 y1 Lx2 y2" stroke="#BA3420" stroke-width="2.5" marker-end="url(#arrow)"/>

<!-- 虚线箭头（弱关系） -->
<path d="Mx1 y1 Lx2 y2" stroke="#0B0800" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
```

**卡片框架**：
```xml
<rect x="x" y="y" width="w" height="h" rx="4"
      fill="#F7F3ED" stroke="#0B0800" stroke-width="2"/>
```

---

## 九、后续扩展方向

1. **建立组件库** → 人物、箭头、卡片的标准SVG代码
2. **脚本生成器** → 根据内容自动生成API调用参数
3. **质量评分** → 生成后自动评分是否达标
4. **批量生成** → 一次调用生成多个场景

---

**总结**：这个模板系统让每次API调用都是"填空题"，而不是"创作题"。准备好内容 → 选择模板 → 填空 → 生成成功。
