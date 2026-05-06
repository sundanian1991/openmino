# Skill Sync Report — 技能同步记录

## 2026-05-06 15:13

**结论**：9 个技能全部有本地修改，全部跳过，未执行 pull。

| 技能 | 远程更新 | 本地修改 | 决策 |
|------|---------|---------|------|
| fe-cinematic-ui | 无 | SKILL.md | 跳过 |
| doc-kami | ~57 commits | SKILL.md | 跳过（保护） |
| ppt-presentation-skill | 无 | SKILL.md, .DS_Store | 跳过 |
| fe-huashu-design | 1 commit | SKILL.md | 跳过（保护） |
| viz-svg-flow-diagram | 2 commits | SKILL.md | 跳过（保护） |
| viz-claude | 无 | skill/SKILL.md | 跳过 |
| ppt-aham-ppt | 无 | SKILL.md | 跳过 |
| ppt-html-ppt-skill | ~10 commits | SKILL.md + themes/examples 大量新增 | 跳过（保护） |

**4 个技能远程有新提交**：doc-kami(~57), viz-svg-flow-diagram(+2), ppt-html-ppt-skill(~10), fe-huashu-design(+1)。
全部因本地修改被跳过。

> 注：本轮技能目录命名已对齐 SKILL.md name 字段，与之前报告中的简称不同。doc-kami 上游迭代较多（WeasyPrint 模板、AI 可见性配置等），后续可评估是否手动合并。

## 2026-05-06 02:35

**结论**：9 个技能全部有本地修改，全部跳过，未执行 pull。

| 技能 | 远程更新 | 本地修改 | 决策 |
|------|---------|---------|------|
| fe-cinematic | 无 | SKILL.md | 跳过 |
| doc-kami | 2 commits | SKILL.md | 跳过（保护） |
| ppt-presentation | 无 | SKILL.md, .DS_Store | 跳过 |
| fe-diagram | 8 commits | SKILL.md, brand-skilljar.md | 跳过（保护） |
| viz-svg-flow | 2 commits | SKILL.md | 跳过（保护） |
| viz-claude | 无 | skill/SKILL.md | 跳过 |
| ppt-aham | 无 | SKILL.md | 跳过 |
| ppt-html | 10 commits | SKILL.md + themes/examples 大量新增 | 跳过（保护） |
| fe-huashu | 1 commit | SKILL.md | 跳过（保护） |

**5 个技能远程有新提交**：doc-kami(+2), fe-diagram(+8), viz-svg-flow(+2), ppt-html(+10), fe-huashu(+1)。
全部因本地修改被跳过。

## 2026-05-06 15:46 检查

- 检查技能数：9
- 成功同步：0
- 跳过（有本地修改）：9
- 异常：0

远程有新提交的技能：doc-kami(+56), viz-svg-flow-diagram(+2), ppt-html-ppt-skill(+10), fe-huashu-design(+1), viz-diagram-design(+8)。全部因本地修改被跳过。

**建议手动评估**：doc-kami（56 commits, WeasyPrint 模板系统+插件生态）、ppt-html-ppt-skill（10 commits, v2 架构）、viz-diagram-design（8 commits, v2 架构）。
