# Implementation Guardrails（年 UI 版）

## 入口映射规则

- 每页至少 4 种不同入口类型
- 相邻 section 不能使用相同的入口
- `fadeUp` / `opacity + translateY` 每页最多出现 2 次
- 如果页面 section 足够多，必须使用扩展入口类型

## 互动预算

- 最多 1 个重互动 per page（需要复杂 JS 的互动）
- 最多 2 个注意吸引式揭示 per page
- 剩余动效必须服从页面的视觉主题

## 年 UI 硬约束

- 所有颜色引用 nian token 变量，不写色值
- 深度通过 border 对比实现，不是 box-shadow
- 入场使用 transform + opacity + clip-path，不使用 blur/scale 突变
- 缓动函数使用 `cubic-bezier(0.25, 0.1, 0.25, 1)`
- 每页恰好一处"打破"

## External Library Decision

当需要外部库时：

1. 是否必须？纯 CSS 能实现就不要引入 JS 库
2. 是否 nian-safe？不引入带阴影/渐变/模糊效果的库
3. 是否轻量？< 50KB gzipped
4. 是否需要？功能是否可以用更基础的技术实现

## Quality Checklist（Phase 3）

- [ ] 每个 section 有明确的层级（Answer/Argument/Evidence）
- [ ] 签名构图已记录 library id
- [ ] 入口类型已分配
- [ ] 颜色 token 已验证
- [ ] 视觉元素使用 nian-safe 子集
- [ ] 场景色唯一
- [ ] 无 forbidden effects（shadow/gradient/blur/glassmorphism）

## Post-Screening Adjustments

首次构建后，如果输出不完全满足预期：

1. 返回 Phase 3 调整 compiled-spec.md
2. 特别关注：Hero 冲击力、构图独特性、叙事节奏
3. 不违背 nian 约束来"修复"视觉问题——用间距和层级解决
