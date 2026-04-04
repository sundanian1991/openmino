# Quiver API 深度分析 — SVG代码构成与API输入策略

**创建时间**：2026-04-04
**目标**：一次性成功生成高质量SVG（每周20次配额，每次都要成功）

---

## 一、参考SVG代码结构分析

### 1.1 东京猫 — 实际精细度

**统计**：
- 总共396个`<path>`元素（不是我之前估计的50个）
- 但实际用于猫主体的约50-60个，其余是页面装饰元素

**核心技法**：
```xml
<!-- 填充层 + 线条层分离 -->
<path d="..." fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/>
<path d="..." fill="#BA3420"/>  <!-- 纯填充，无描边 -->
<path d="..." stroke="#0B0800" stroke-width="1.5"/>  <!-- 纯描边，无填充 -->

<!-- 手绘感关键参数 -->
stroke-linecap="round"
stroke-linejoin="round"
stroke-width="1.5"  <!-- 主线 -->
stroke-width="0.7-1.06"  <!-- 细节线 -->
```

**色彩系统**：
- 背景/填充：`#FEFFFA`（暖白）、`#F7F3ED`（米白）
- 强调色：`#BA3420`（陶土）、`#C4432A`（陶土浅）
- 线条：`#0B0800`（墨黑）

### 1.2 李诞虾 — 双层技法典范

**结构**：
```xml
<svg viewBox="0 0 250 250">
  <!-- 填充层：纯色彩，无描边 -->
  <path d="..." fill="#BA3420"/>
  <path d="..." fill="#FEFFFA"/>
  <path d="..." fill="#0B0800"/>

  <!-- 描边层：纯线条，无填充 -->
  <g fill="none" stroke="#0B0800" stroke-linecap="round" stroke-linejoin="round">
    <path d="..." stroke-width="1.6"/>
    <path d="..." stroke-width="2.1"/>
    <path d="..." stroke-width="0.7"/>
  </g>
</svg>
```

**关键发现**：
1. **严格的层分离**：先有完整的填充层，再有完整的描边层
2. **线条粗细变化**：1.6px（主线）、2.1px（轮廓）、0.7px（细节）
3. **手工贝塞尔曲线**：每个`d`属性都有20-40个控制点
4. **viewBox精确定义**：`250x250`（封面）vs `72x72`（图标）

---

## 二、本地手工SVG vs Quiver API的核心差异

### 2.1 手工SVG的优势

| 维度 | 手工SVG | Quiver API |
|------|---------|------------|
| **精细控制** | ✅ 每个path精确控制 | ❌ prompt描述，有随机性 |
| **修改成本** | ✅ 直接改代码 | ❌ 需要重新生成 |
| **一致性** | ✅ 多次调用相同结果 | ❌ 每次可能有差异 |
| **文字** | ✅ 中文完美支持 | ❓ 待验证中文效果 |
| **时间成本** | ❌ 高（需手工调参） | ✅ 低（一次调用） |
| **艺术性** | ❓ 取决于技能 | ✅ AI生成更自然 |

### 2.2 Quiver API的核心价值

**不是替代手工，而是加速起点**：
- API生成 → 70-80%完成度
- 手工精修 → 达到100%

**但如果API生成质量不够**，手工精修成本可能超过从零开始。

---

## 三、API输入策略（一次性成功）

### 3.1 Prompt结构（基于反推）

```
prompt = [主体内容] + [风格技法] + [构图说明] + [输出要求]

示例（针对"策略组vs服务组权责分离"）：
```
**主体内容**：
"Japanese organizational diagram showing 权责不对等 in a company.
Left side: 策略组 with pricing authority (定价权),
Right side: 服务组 with execution responsibility (执行责任).
Middle: 供应商 (suppliers) caught between conflicting signals.
Key人物: 刘伟佳 on left, 王易人→年老师 on right."

**风格技法**：
"Hand-drawn ink style with 双层技法:
1. Fill layer with color opacity (#BA3420 at 0.08-0.15, #F7F3ED backgrounds)
2. Ink line layer with stroke-width 1.5-2.1px, stroke-linecap round, stroke-linejoin round
Use 东京猫 style精细度: ~50 path elements for main content."

**构图说明**：
"Horizontal layout: 策略组(left 30%) → 供应商(middle 40%) → 服务组(right 30%)
Arrows showing 决策权 flowing left→right, 风险 flowing right→left.
Use circles for 人物 with size indicating power level."

**输出要求**：
"viewBox 0 0 800 400, ensure Chinese text readable,
color palette: #BA3420 vermillion, #0B0800 ink, #F7F3ED cream background"
```

### 3.2 instructions参数（技术指导）

```
instructions =
"色彩规范:
- 陶土色 #BA3420 (重点), #E2725B (辅助)
- 米白 #F7F3ED (背景), #F5F1EE (深色)
- 墨黑 #0B0800 (线条), #111111 (文字)
- 灰度 #D4CFC7, #A8A098

线条技法:
- stroke-linecap: round
- stroke-linejoin: round
- 主线 1.5-2px, 细节 0.8-1.2px

构图:
- 双层分离: fill layer + ink layer
- 信息密度高但不拥挤
- 用色彩引导视线"
```

### 3.3 references参数（风格锚点）

**关键假设**（需验证）：
- references可能接受：URL、base64、或混合
- 最多4张，建议使用：2张风格参考 + 1张构图参考 + 1张色彩参考

**策略**：
```json
"references": [
  {
    "type": "style",
    "url": "https://.../东京猫.svg"  // 或本地转base64
  },
  {
    "type": "technique",
    "url": "https://.../李诞虾.svg"
  },
  {
    "type": "composition",
    "url": "https://.../类似组织架构图.svg"
  },
  {
    "type": "color",
    "url": "data:image/svg+xml;base64,..."  // 纯色卡参考
  }
]
```

---

## 四、20次配额的最优使用策略

### 4.1 场景优先级（基于Dashboard内容）

| 优先级 | 场景 | 复杂度 | 配额分配 | 理由 |
|--------|------|--------|----------|------|
| **P0** | 结构性权责分离 | 高 | 4次 | 核心场景，值得迭代 |
| **P1** | 供应商夹层困境 | 中 | 3次 | 次要，但需要质量 |
| **P2** | REACT回应框架 | 低 | 2次 | 流程图，相对简单 |
| **P3** | 刘伟佳行为模式 | 中 | 2次 | 可复用P0经验 |
| **P4** | 联盟可行性评估 | 低 | 2次 | 对比图，简单 |
| **预留** | 应急/重试 | - | 7次 | 容错空间 |

### 4.2 每次调用的准备清单

**Before API Call**:
- [ ] Prompt完整（内容+风格+构图+要求）
- [ ] Instructions详细（色彩+线条+技法）
- [ ] References准备（至少2张风格参考）
- [ ] 参数确定（model=arrow-preview, n=1, temperature=0.7）
- [ ] 备选方案（如果失败，调整哪个参数？）

**After API Call**:
- [ ] 记录完整参数和结果
- [ ] 评估质量（精细度/色彩/构图/文字）
- [ ] 如果失败，分析原因（prompt? references? model limit?）

---

## 五、待验证的关键假设

### 5.1 技术假设

| 假设 | 验证方法 | 失败预案 |
|------|---------|---------|
| references接受URL | 用东京猫公网URL测试 | 改用base64 |
| 中文prompt有效 | 混合中英文测试 | 纯英文+图标代替 |
| n=1质量稳定 | 同prompt生成2次对比 | 固定seed参数 |
| 长prompt不被截断 | 逐步增加长度测试 | 拆分prompt |

### 5.2 质量假设

| 假设 | 验证方法 | 失败预案 |
|------|---------|---------|
| 能达到~50个path | 统计生成SVG的path数量 | 手工添加细节 |
| 双层技法可复现 | 检查是否有fill+stroke分离 | 手工后处理 |
| 中文文字清晰 | 生成后检查 | 改用图标+英文 |

---

## 六、B计划：API失败时的手工方案

如果Quiver API无法达到预期：

### 6.1 混合方案

1. **API生成基础框架**（构图、布局）
2. **手工添加细节**（人物、标注、数据）
3. **手工调整色彩**（统一到品牌色系）

### 6.2 纯手工方案

基于东京猫/李诞虾的代码模板：
1. 建立SVG组件库（人物、箭头、框架）
2. 编写SVG生成脚本（Python/nodes）
3. 参数化配置（色彩、尺寸、内容）

---

## 七、下一步行动

### 7.1 立即测试（1-2次配额）

**测试1**：验证基础流程
```
prompt: "Simple organizational chart with 3 boxes connected by arrows"
instructions: "Hand-drawn style, black strokes on white"
references: []  // 先不用references
```

**测试2**：验证references
```
prompt: "Same as test 1"
instructions: "Same as test 1"
references: [东京猫SVG的URL或base64]
```

### 7.2 如果测试成功

立即开始P0场景（结构性权责分离）：
- 准备完整prompt（见3.1）
- 准备references（东京猫+李诞虾）
- 使用2-3次配额迭代到满意

### 7.3 如果测试失败

立即切换到手工方案：
- 基于东京猫模板手工创建
- 保存为组件库复用

---

## 八、关键决策点

需要年老师确认：

1. **配额使用策略**：同意P0-P4的优先级吗？
2. **质量vs速度**：如果API需要3-4次迭代才能达到东京猫水平，是否接受？还是第一次生成"够用"就行？
3. **B计划触发条件**：如果前2次测试都不满意，立即切换手工方案？还是继续尝试？
4. **时间预期**：这批可视化需要在什么时间前完成？
