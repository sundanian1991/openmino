---
name: "workflow-code"
description: "代码开发工作流 - 从需求到部署的专业开发流程"
---

# Workflow: 代码开发

> 半自动化全流程方案 - 需求分析→方案设计→TDD开发→代码审查→部署上线

**核心理念**：好代码 = 想清楚 + 测试驱动 + 持续验证

---

## 为什么需要代码开发工作流

**问题**：
- 需求理解不清就开始写
- 写完发现不符合需求
- 没有测试，改一个功能崩一片
- 代码没有审查就上线

**解决**：
- 需求澄清后再动手
- 先写测试再写代码
- 每次提交前审查
- 自动化测试验证

**价值**：
- 质量：bug更少
- 效率：返工更少
- 可维护：代码更清晰
- 可回滚：每步可逆

---

## 工作流程

```
需求分析 → 方案设计 → TDD开发 → 代码审查 → 部署上线
   ↓          ↓          ↓          ↓          ↓
 clarify   planning-  tdd-      requesting  github/
 需求      files      strict     code-review  testing
                      testing-
                      patterns
```

---

## 执行步骤

### 阶段1：需求分析（10分钟）
**调用**：系统引导 + `brainstorming`

**输出**：
- 需求澄清：要做什么
- 约束条件：技术/时间/资源限制
- 验收标准：怎么算完成
- 边界范围：不做什么

**需求分析框架（5W1H）**：
- **What**：具体做什么功能？
- **Why**：为什么要做？解决什么问题？
- **Who**：谁会用？用户场景是什么？
- **When**：什么时候完成？
- **Where**：在哪里用？（平台/环境）
- **How**：大概怎么做？（技术方向）

**交互**：
- 我问你问题澄清需求
- 你回答，我整理成需求文档
- 确认验收标准

---

### 阶段2：方案设计（15分钟）
**调用**：`planning-with-files` + `brainstorming`

**输出**：
- 技术方案：用什么技术栈
- 架构设计：文件结构、模块划分
- 数据流：数据怎么流转
- API设计：接口定义

**设计文档结构**：

```
## 技术选型
- 前端：[框架/库]
- 后端：[框架/语言]
- 数据库：[类型]
- 部署：[平台]

## 架构设计
- 目录结构
- 模块划分
- 依赖关系

## 数据流
[数据流转图]

## API设计
| 端点 | 方法 | 参数 | 返回 |
|------|------|------|------|
| /api/xxx | GET | - | {...} |

## 关键技术点
1. [技术点1]
2. [技术点2]
```

**交互**：
- 我提出技术方案
- 你确认或调整
- 确定最终方案

---

### 阶段3：TDD开发（60-120分钟）
**调用**：`tdd-strict` + `testing-patterns` + 项目skills

**输出**：
- 测试用例：覆盖核心场景
- 功能代码：通过测试
- 文档：API文档/使用说明

**TDD流程（Red-Green-Refactor）**：

```
1. 🔴 Red：写一个失败的测试
   - 描述期望行为
   - 运行测试，确认失败

2. 🟢 Green：写最简单的代码让测试通过
   - 不求完美，只求通过
   - 运行测试，确认通过

3. 🔵 Refactor：重构代码
   - 优化结构
   - 提取重复
   - 运行测试，确认依然通过
```

**开发原则**：
- **小步快跑**：一次只写一个测试
- **测试先行**：没有测试不写代码
- **持续重构**：代码要越来越清晰

**交互**：
- 我指导TDD流程
- 你写测试和代码
- 我帮你review和debug

---

### 阶段4：代码审查（15分钟）
**调用**：`requesting-code-review` + 项目skills

**输出**：
- 审查清单：检查项
- 修改建议：优化点
- 审查报告：通过/修改建议

**代码审查清单**：

| 维度 | 检查项 |
|------|--------|
| **功能** | 是否满足需求？边界条件？ |
| **测试** | 测试覆盖率？关键场景？ |
| **代码** | 命名清晰？结构合理？ |
| **性能** | 有性能问题？ |
| **安全** | 有安全漏洞？ |
| **文档** | 代码注释？API文档？ |

**交互**：
- 我逐项审查
- 标记问题
- 提出修改建议

---

### 阶段5：部署上线（10分钟）
**调用**：`github` + `testing-patterns`

**输出**：
- Git提交：规范的commit message
- CI/CD：自动测试
- 部署：上线到环境
- 验证：线上验证

**部署检查清单**：
- [ ] 所有测试通过
- [ ] 代码已commit
- [ ] 环境变量已配置
- [ ] 数据库迁移已准备
- [ ] 回滚方案已准备

**交互**：
- 我帮你提交代码
- 运行CI/CD
- 部署验证

---

## 总耗时

| 阶段 | 小功能 | 中功能 | 大功能 |
|------|--------|--------|--------|
| 需求分析 | 5分钟 | 10分钟 | 20分钟 |
| 方案设计 | 5分钟 | 15分钟 | 30分钟 |
| TDD开发 | 30分钟 | 60分钟 | 120分钟 |
| 代码审查 | 5分钟 | 15分钟 | 30分钟 |
| 部署上线 | 5分钟 | 10分钟 | 20分钟 |
| **总计** | **50分钟** | **110分钟** | **220分钟** |

---

## 使用示例

```
用户: /workflow-code 做一个供应商评分系统

AI: 让我们开始代码开发流程。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 阶段1：需求分析
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

我需要了解：

**What（做什么）**：
用户: 供应商评分系统，根据KPI自动计算分数

**Why（为什么）**：
用户: 现在手动算太慢，容易出错

**Who（谁用）**：
用户: 我和团队，每月评估时用

**When（什么时候完成）**：
用户: 本周内

**Where（在哪用）**：
用户: 先内部用，web端

**How（怎么做）**：
用户: 后端算分，前端展示

**验收标准**：
用户:
1. 能导入Excel数据
2. 自动计算总分
3. 显示排名
4. 可导出结果

**需求文档整理完成** ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ 阶段2：方案设计
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[调用 planning-with-files]

**技术选型**：
- 前端：Next.js（你熟悉）
- 后端：Next.js API Routes
- 数据处理：xlsx库（处理Excel）
- 部署：Vercel

**架构设计**：

```
/
├── app/
│   ├── api/
│   │   └── calculate/route.ts    # 评分API
│   └── score/
│       └── page.tsx              # 评分页面
├── lib/
│   ├── scoring.ts                # 评分逻辑
│   └── types.ts                  # 类型定义
└── public/
    └── template.xlsx             # 模板文件
```

**数据流**：
```
上传Excel → 解析数据 → 计算分数 → 排序 → 展示/导出
```

**API设计**：

| 端点 | 方法 | 参数 | 返回 |
|------|------|------|------|
| /api/calculate | POST | Excel文件 | 评分结果 |

**评分逻辑**：
- 质量分（30%）：合格率
- 成本分（20%）：价格竞争力
- 交付分（30%）：准时率
- 服务分（20%）：响应速度

你确认这个方案吗？

用户: 可以

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴🟢🔵 阶段3：TDD开发
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[调用 tdd-strict]

**第一步：写测试（🔴 Red）**

```typescript
// lib/scoring.test.ts
import { calculateScore } from './scoring';

describe('calculateScore', () => {
  it('should calculate total score correctly', () => {
    const input = {
      quality: 90,    // 合格率90%
      cost: 85,       // 价格竞争力85分
      delivery: 95,   // 准时率95%
      service: 80     // 响应速度80分
    };

    const result = calculateScore(input);

    expect(result.total).toBe(88);
    // 90*0.3 + 85*0.2 + 95*0.3 + 80*0.2 = 88
  });

  it('should handle edge case: all zero', () => {
    const input = {
      quality: 0,
      cost: 0,
      delivery: 0,
      service: 0
    };

    const result = calculateScore(input);

    expect(result.total).toBe(0);
  });
});
```

运行测试：❌ 失败（函数还不存在）

**第二步：写代码（🟢 Green）**

```typescript
// lib/scoring.ts
export interface ScoreInput {
  quality: number;
  cost: number;
  delivery: number;
  service: number;
}

export interface ScoreResult {
  total: number;
  breakdown: {
    quality: number;
    cost: number;
    delivery: number;
    service: number;
  };
}

export function calculateScore(input: ScoreInput): ScoreResult {
  const breakdown = {
    quality: input.quality * 0.3,
    cost: input.cost * 0.2,
    delivery: input.delivery * 0.3,
    service: input.service * 0.2
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return {
    total: Math.round(total),
    breakdown
  };
}
```

运行测试：✅ 通过

**第三步：重构（🔵 Refactor）**

代码已经很简洁，无需重构。

继续下一个测试...

[继续TDD流程，覆盖更多场景...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👀 阶段4：代码审查
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[调用 requesting-code-review]

**审查清单**：

| 维度 | 检查项 | 状态 |
|------|--------|------|
| **功能** | 满足需求？ | ✅ |
| **功能** | 边界条件？ | ✅ 已处理0分情况 |
| **测试** | 测试覆盖率？ | ✅ 正常+边界 |
| **测试** | 关键场景？ | ⚠️ 需加负数场景 |
| **代码** | 命名清晰？ | ✅ |
| **代码** | 结构合理？ | ✅ |
| **性能** | 有性能问题？ | ✅ 计算简单 |
| **安全** | 有安全漏洞？ | ✅ 无外部输入 |
| **文档** | 代码注释？ | ⚠️ 需加JSDoc |

**修改建议**：

1. **加负数测试**：
```typescript
it('should handle negative input', () => {
  // 确保负数被处理
});
```

2. **加JSDoc注释**：
```typescript
/**
 * 计算供应商综合评分
 * @param input - 各维度评分（0-100）
 * @returns 总分和明细
 */
```

你修改后我们继续。

[修改完成...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 阶段5：部署上线
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[调用 github + testing-patterns]

**部署检查清单**：
- [x] 所有测试通过
- [x] 代码已commit
- [x] 环境变量已配置
- [x] 无需数据库迁移
- [x] 回滚方案：删除部署即可

**Git提交**：

```bash
git add .
git commit -m "feat: 供应商评分系统

- 实现评分算法（质量30%+成本20%+交付30%+服务20%）
- 添加单元测试
- 支持Excel导入导出

Co-Authored-By: Claude Code"
```

**部署到Vercel**：
- 推送到GitHub → 自动触发Vercel部署
- 验证线上功能正常

✅ 部署完成！
```

---

## 涉及 Skills

| 阶段 | 主要 Skills |
|------|------------|
| 需求分析 | brainstorming, 系统引导 |
| 方案设计 | planning-with-files, brainstorming |
| TDD开发 | tdd-strict, testing-patterns, 项目相关skills |
| 代码审查 | requesting-code-review, 项目相关skills |
| 部署上线 | github, testing-patterns |

---

## Git提交规范

**Commit Message格式**：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type类型**：
- `feat`：新功能
- `fix`：Bug修复
- `docs`：文档
- `style`：格式（不影响功能）
- `refactor`：重构
- `test`：测试
- `chore`：构建/工具

**示例**：
```
feat(supplier): add score calculation

Implement automatic scoring for suppliers based on KPIs:
- Quality (30%)
- Cost (20%)
- Delivery (30%)
- Service (20%)

Closes #123
```

---

## 重要说明

**适用场景**：
- 新功能开发
- Bug修复
- 代码重构
- 性能优化

**核心原则**：
- **想清楚再写**：需求不明不动手
- **测试先行**：没有测试不写代码
- **小步提交**：频繁提交，每次可回滚
- **代码审查**：自己review，重要代码找人review

**你的角色**：
- 明确需求
- 写代码
- 运行测试
- 验证功能

**我的角色**：
- 引导需求澄清
- 设计技术方案
- 指导TDD流程
- 审查代码质量
- 辅助部署上线

---

*最后更新：2026-02-22 — 代码开发工作流*
