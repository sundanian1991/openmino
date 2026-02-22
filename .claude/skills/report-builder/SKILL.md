---
name: report-builder
description: Framework for building structured, effective reports
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
