---
name: report-builder
description: |
  Framework for building structured, effective reports. Use when creating business reports, status updates,
  research reports, recommendation documents, executive summaries, or any formal report.
  Trigger on: "report", "status update", "recommendation", "executive summary", "business case",
  "proposal", "analysis document", or any request for structured business writing.
  Even if not explicitly mentioned, use this skill for any formal report to ensure clarity and impact.
---

# Report Builder

A framework for creating clear, structured, and actionable business reports.

## Report Structure

### Standard Report Outline

```
1. Executive Summary
   └── One page overview, written last

2. Introduction
   ├── Purpose and scope
   ├── Background context
   └── Methodology (if applicable)

3. Findings / Analysis
   ├── Data presented clearly
   ├── Key insights highlighted
   └── Evidence with sources

4. Discussion
   ├── What findings mean
   ├── Implications and impact
   └── Connection to objectives

5. Recommendations
   ├── Actionable steps
   ├── Priority ranking
   └── Ownership and timeline

6. Conclusion
   └── Brief wrap-up

7. Appendices
   ├── Detailed data
   ├── Supporting documents
   └── References
```

## Writing Guidelines

### The Pyramid Principle (Barbara Minto)

```
                Main Conclusion
                      /  \
          Argument 1    Argument 2    Argument 3
              /|\          /|\          /|\
         Support   Support   Support   Support
```

**Rules**:
1. Start with the conclusion first
2. Group related ideas together
3. Each level supports the one above
4. Present ideas in logical order

### BLUF Method (Bottom Line Up Front)

**Executive Summary Structure**:
```
┌─────────────────────────────────────┐
│ WHAT: Decision needed or key finding│
│ WHY: Critical context               │
│ SO WHAT: Implications               │
│ NOW WHAT: Recommended action        │
└─────────────────────────────────────┘
```

### Clear Writing

| Do | Don't |
|----|-------|
| Active voice | Passive voice |
| Simple words | Jargon, buzzwords |
| Short sentences | Long, complex sentences |
| Specifics | Vague statements |
| Data and facts | Opinions without support |

## Visual Elements

### Charts Selection Guide

| Purpose | Chart Type |
|---------|------------|
| Show trends over time | Line chart |
| Compare values | Bar chart (horizontal) |
| Show parts of whole | Pie chart (max 5 categories) |
| Compare categories | Column chart (vertical) |
| Show distribution | Histogram |
| Show relationship | Scatter plot |
| Process flow | Flowchart |

### Table Design

```
┌────────────┬──────────┬──────────┐
│ Category   │ Metric 1 │ Metric 2 │  ← Clear headers
├────────────┼──────────┼──────────┤
│ Item A     │    12    │    34%   │  ← Align numbers right
│ Item B     │    28    │    56%   │  ← Use consistent precision
│ Item C     │    15    │    23%   │  ← Highlight key values
└────────────┴──────────┴──────────┘
      ↑                ↑
Column headers   Row headers (if needed)
```

### Data Visualization Best Practices

- **Title**: Descriptive, not generic
- **Labels**: Direct labels, no legends
- **Colors**: Purposeful, not decorative
- **Gridlines**: Minimal or none
- **Callouts**: Highlight key insights

## Report Types

### Status Report

```
┌──────────────────────────────────────┐
│ PROJECT STATUS REPORT                 │
│ Date: [Date]  Period: [Week/Month]   │
├──────────────────────────────────────┤
│ STATUS: [On Track / At Risk / Delayed]│
├──────────────────────────────────────┤
│                                      │
│ This Period:                          │
│ • Accomplishment 1                    │
│ • Accomplishment 2                    │
│ • Blocker / Challenge                 │
│                                      │
│ Next Period:                          │
│ • Planned task 1                      │
│ • Planned task 2                      │
│                                      │
│ Metrics:                              │
│ • Metric 1: [value] vs target         │
│ • Metric 2: [value] vs target         │
└──────────────────────────────────────┘
```

### Research Report

```
1. Abstract (150-250 words)
2. Introduction
   - Research question
   - Background/literature review
   - Hypothesis or objectives

3. Methodology
   - Approach and design
   - Data sources
   - Analysis methods

4. Results
   - Findings with data
   - Visual representations
   - Statistical significance (if applicable)

5. Discussion
   - Interpretation of results
   - Limitations
   - Implications

6. Conclusions
   - Answer to research question
   - Recommendations for future research

7. References
```

### Recommendation Report

```
1. Executive Summary (1 page)
2. Problem Statement
   - Current situation
   - Gap between current and desired
   - Impact of the problem

3. Analysis
   - Root cause analysis
   - Options considered
   - Evaluation criteria

4. Recommendations
   - Primary recommendation with rationale
   - Alternative options
   - Implementation plan

5. Risk Assessment
   - Potential obstacles
   - Mitigation strategies

6. Resources Required
   - Budget
   - Timeline
   - People
   - Technology

7. Approval Required
```

## Formatting Standards

### Page Layout
- Margins: 1 inch (2.54 cm)
- Line spacing: 1.15 or 1.5
- Page numbers: bottom right or bottom center
- Font: 11-12pt for body

### Headings Hierarchy
```
# Heading 1 (Centered, Bold)
## Heading 2 (Left, Bold)
### Heading 3 (Left, Bold)
#### Heading 4 (Left, Italic)
```

### Numbering
- Main sections: 1, 2, 3...
- Subsections: 1.1, 1.2, 1.3...
- Deep levels: 1.1.1, 1.1.2...

## Quality Checklist

### Before Submitting

| Check | Question |
|-------|----------|
| Purpose | Does it meet its stated objective? |
| Structure | Is the flow logical and easy to follow? |
| Clarity | Is language clear and jargon-free? |
| Evidence | Are claims supported by data? |
| Completeness | Is all required information included? |
| Accuracy | Are numbers, dates, facts correct? |
| Formatting | Is visual presentation professional? |
| Actionability | Are next steps clear? |

### Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Buried lead | Put conclusion first |
| Data dump | Synthesize, don't just present |
| Ambiguous recommendations | Make them specific and actionable |
| No context | Provide background and relevance |
| Too long | Ruthlessly edit, use appendices |
| Inconsistent format | Use templates and style guides |

## Templates

### Weekly Status Update

```markdown
# Weekly Status Update - [Your Name]

## Week of: [Date Range]

### Key Achievements This Week
- [ ] Accomplishment 1
- [ ] Accomplishment 2
- [ ] Accomplishment 3

### Blockers / Challenges
- **Issue**: [Description]
- **Impact**: [What it affects]
- **Help needed**: [Who/what can help]

### Plans for Next Week
- [ ] Priority 1
- [ ] Priority 2
- [ ] Priority 3

### Metrics / KPIs
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| KPI 1  | [value] | [value] | [🟢/🟡/🔴] |
```

## Report Distribution

### Distribution Checklist
- [ ] Final proofread complete
- [ ] All sensitive info reviewed
- [ ] PDF version created
- [ ] Distribution list confirmed
- [ ] Cover email/message prepared
- [ ] Follow-up plan ready

### Presentation Tips
- Send report 24-48 hours before meeting
- Include executive summary in email body
- Specify if action is required
- Offer to walk through in person
- Set deadline for feedback

---

## Remix 模式（风险等级变体）

> **核心理念**：核心逻辑 → 3-4个风险等级版本 → 前置应对不同质疑场景

### 风险等级变体矩阵

| 风险等级 | 特点 | 适用场景 | 结构侧重 |
|---------|------|---------|---------|
| **低风险（标准版）** | 完整、规范、结构化 | 常规汇报、已知事项、例行总结 | 完整七章节结构 |
| **中风险（防御版）** | 强化论证、风险前置 | 有争议事项、需要决策、涉及资源 | 强化风险分析、替代方案、应对措施 |
| **高风险（对抗版）** | 多方案对比、假设验证 | 重大决策、战略调整、高层汇报 | 多方案对比、压力测试、退路说明 |
| **紧急（精简版）** | 结论驱动、快速决策 | 突发事件、时限压力、快速同步 | Executive Summary + 关键数据 + 立即行动 |

### Remix 工作流

```
1. 确定核心结论（建议/决策/行动）
2. 评估风险等级（低/中/高/紧急）
3. 生成 3-4 个风险等级版本
4. 根据受众和场景选择版本
5. 前置准备应对质疑的补充材料
```

### 示例：供应商引入决策的4种版本

| 版本 | 标题示例 | 侧重点 | 核心差异 |
|------|---------|--------|---------|
| 低风险 | "关于引入XX供应商的建议" | 完整论证、规范流程 | 七章节完整、数据支撑充分 |
| 中风险 | "关于引入XX供应商的建议（含风险应对）" | 强化风险分析、替代方案 | 增加3.2倍风险场景、应对措施、备选供应商 |
| 高风险 | "供应商引入方案：XX vs YY vs ZZ（综合评估）" | 多方案对比、压力测试 | 三方案对比矩阵、最差情况假设、退路说明 |
| 紧急 | "【紧急】XX供应商引入决策建议" | 结论先行、立即行动 | Executive Summary + 核心数据 + 24h行动清单 |

### 高风险报告的"压力测试"检查清单

- [ ] 是否提供了至少2个替代方案？
- [ ] 每个关键假设是否有数据支撑？
- [ ] 是否分析了最差情况及应对？
- [ ] 是否明确了"如果失败，退路是什么"？
- [ ] 是否预留了决策者的"否决空间"？
- [ ] 是否回答了"为什么不选更便宜的方案"？
- [ ] 是否说明了"这个决策在6个月后如何评估"？

---

*最后更新：2026-03-06 — 新增 Remix 模式*
