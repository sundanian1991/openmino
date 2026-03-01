---
input: 决策请示需求
output: decision-request.md
pos: .claude/skills/official-docs/templates/general/decision-request.md
---

# 决策请示模板

## 使用场景

供应商选型、方案选择、资源申请等需要领导决策的事项。

---

## 邮件格式

**邮件主题**：关于XXX事项的决策请示

---

**邮件正文**：

<p>尊敬的领导：</p>

<p>现就XXX事项请示决策。</p>

<p><strong>事项背景：</strong></p>

<p>XXX（简述情况：目标、约束、核心挑战）</p>

<p><strong>核心挑战：</strong></p>

<p>XXX（如果有不确定性的核心挑战，单独列出）</p>

<p><strong>备选方案：</strong></p>

<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <tr style="background-color: #f5f5f5;">
    <th style="text-align: center; min-width: 80px;">方案</th>
    <th style="text-align: center; min-width: 120px;">优点</th>
    <th style="text-align: center; min-width: 120px;">缺点</th>
    <th style="text-align: center; min-width: 120px;">风险</th>
  </tr>
  <tr>
    <td style="text-align: center;">方案A</td>
    <td style="text-align: center;">XXX</td>
    <td style="text-align: center;">XXX</td>
    <td style="text-align: center;">XXX</td>
  </tr>
  <tr>
    <td style="text-align: center;">方案B</td>
    <td style="text-align: center;">XXX</td>
    <td style="text-align: center;">XXX</td>
    <td style="text-align: center;">XXX</td>
  </tr>
</table>

<p><strong>我方建议：</strong></p>

<p>建议采用<strong>方案A</strong>。理由：XXX；XXX。</p>

<p><strong>需要决策：</strong></p>

<p>请确认以下事项：采用哪个方案、是否有其他要求、执行时限要求。</p>

<p><strong>预期影响：</strong></p>

<ul>
  <li>优点：XXX</li>
  <li>风险：XXX</li>
  <li>成本：XXX</li>
</ul>

<p>请批示。</p>

---

## 示例：供应商选型决策请示

**邮件主题**：关于AI外呼加微项目供应商选型的决策请示

---

**邮件正文**：

<p>尊敬的领导：</p>

<p>现就AI外呼加微项目供应商选型事项请示决策。</p>

<p><strong>事项背景：</strong></p>

<p>本项目目标为160万数据加满10万商家（转化率6.25%），成本≤20元/单。当前有两家存量供应商可选：言犀（京东内，场景对口）和零犀（第三方，有金融加微案例）。因技术对接成本高，只能选择一家。</p>

<p><strong>核心挑战：</strong></p>

<p>6.25%转化率无行业参考，两家供应商均无把握，必须通过试调用验证。</p>

<p><strong>备选方案：</strong></p>

<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <tr style="background-color: #f5f5f5;">
    <th style="text-align: center; min-width: 80px;">方案</th>
    <th style="text-align: center; min-width: 120px;">优点</th>
    <th style="text-align: center; min-width: 120px;">缺点</th>
    <th style="text-align: center; min-width: 120px;">风险</th>
  </tr>
  <tr>
    <td style="text-align: center;">言犀</td>
    <td style="text-align: center;">零售商家场景对口；来电身份可用京东</td>
    <td style="text-align: center;">排期对齐需时间</td>
    <td style="text-align: center;">场景对口不等于能达到6.25%转化率</td>
  </tr>
  <tr>
    <td style="text-align: center;">零犀</td>
    <td style="text-align: center;">有多个金融加微案例，话术录音确认OK；来电身份可用京东；可快速启动</td>
    <td style="text-align: center;">金融加微场景，需验证零售商家适配性</td>
    <td style="text-align: center;">零售商家场景适配性待验证</td>
  </tr>
</table>

<p><strong>我方建议：</strong></p>

<p>建议采用<strong>零犀</strong>。理由：6.25%转化率无行业参考，必须试调用验证；零犀可快速启动试调用，节省时间；有多个金融加微案例，话术确认OK，与零售商家决策心智相似度较高；若试调用失败，快速切换言犀。</p>

<p><strong>需要决策：</strong></p>

<p>请确认是否选择零犀。试调用方案：5000-10000条数据，1-2周，验收标准转化率≥5%。不通过则快速切换言犀。</p>

<p><strong>预期影响：</strong></p>

<ul>
  <li>优点：快速启动试调用验证，节省时间</li>
  <li>风险：场景适配性待验证，但可通过试调用快速验证</li>
  <li>成本：试调用失败增加1-2周时间成本</li>
</ul>

<p>请批示。</p>

---

## 决策请示写作要点

1. **背景简洁**：一句话说明目标、约束、可选方案
2. **核心挑战突出**：如果有不确定性（如无行业参考），单独列出
3. **备选方案表格化**：优点/缺点/风险一目了然
4. **建议理由清晰**：为什么选A不选B，给出2-3个核心理由
5. **需要决策明确**：老板要决定什么，具体列出
6. **预期影响客观**：优点、风险、成本都要说

---

## 常见误区

| 误区 | 正确做法 |
|------|---------|
| 理由站不住脚 | "技术对接排期"不是充分理由，除非有明确证据 |
| 给内部供应商贴负面标签 | 不说"配合度低"，说"时间差异" |
| 只说优点不说风险 | 优点/风险/成本都要客观呈现 |
| 需要决策不明确 | 具体列出：选哪个、什么要求、什么时限 |
| 没考虑政治因素 | 内部供应商决策要考虑"支持不够"的质疑 |

---

## 经验教训（2026-02-28）

**问题**：选零犀不选言犀，理由"历史案例、交付、技术对接排期"有瑕疵，被领导质疑。

**根因**：
1. "技术对接排期"不是充分理由，老板会问"为什么不让内部也对接？"
2. 没考虑内部供应商的政治因素 — 会被解读为"对内部工具支持不够"
3. 6.25%转化率无参考，两家都没把握，选一家风险过高

**改进**：
1. **内部供应商决策三原则**：不给内部供应商贴负面标签；无充分把握时优先"赛马机制"；决策理由要经得起追问
2. **供应商选择决策树**：
   - 两家都有把握 → 选更合适的
   - 一家有把握 → 选有把握的
   - 两家都没把握 → 赛马机制，数据说话
3. **决策理由要经得起追问**："技术对接排期"需要明确的排期冲突证据，否则不要用

**最终决策**：两家一起测，赛马留一家。

---

*持续打磨中*

---

## 本模板检查规则

### L1 语言风格检查
- [ ] 无口语化表达（这个、那个、咱们、还行、挺好）
- [ ] 无模糊词（看情况、也许、可能、大概）
- [ ] 无情绪化表达（我觉得、我希望、我认为）
- [ ] 无废话开场（好的、收到、没问题）
- [ ] 无感叹号、emoji、网络用语

### L2 场景适当性检查
- [ ] 内容适合目标场景（向上审批/对外沟通/内部协调）
- [ ] 优缺点平衡，不只说优点
- [ ] 细节适度，符合接收方需求

### L3 政治敏感性检查
- [ ] 不给内部供应商贴负面标签
- [ ] 避免被解读为对内部工具支持不够
- [ ] 不点名批评内部部门

### L4 结构完整性检查
- [ ] 结构完整，包含必需部分
- [ ] 逻辑清晰，段落之间有过渡

### L5 逻辑一致性检查
- [ ] 理由与结论匹配
- [ ] 数据一致性（同一数据多处一致）
- [ ] 能量化尽量量化

### L6 格式规范性检查
- [ ] 表格有表头、边框
- [ ] 段落间有空行
- [ ] 关键段落用<strong>加粗
- [ ] 无分割线、手动编号


### L3 政治敏感性检查（决策请示专用）
- [ ] 不给内部供应商贴负面标签
- [ ] 无充分把握时优先考虑赛马机制
- [ ] 决策理由要经得起为什么不选内部供应商的追问
- [ ] 供应商选择决策树：两家都有把握→选更合适的；一家有把握→选有把握的；两家都没把握→赛马机制

### L4 结构完整性检查（决策请示专用）
- [ ] 有事项背景
- [ ] 有备选方案表格（至少2个方案）
- [ ] 有我方建议
- [ ] 有需要决策
- [ ] 有预期影响（优点/风险/成本）

