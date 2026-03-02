---
input: monday-learning.md 文章2 要点3
output: 工具与自动化详细实践指南
pos: stanford-cs146s/notes/best-practices/
---

# 03 - 工具与自动化

> **核心认知**：Skills 需要自动激活才能可靠工作；Hooks 是质量保障的最后防线

---

## 🎯 Skills 系统

### 问题发现

**关键发现**：手动 skills 约 90% 时间被忽略

**原因分析**：
```
用户请求 → Claude 理解意图 → 选择工具
    ↓
如果技能是"手动调用"（需要用户明确说）
    ↓
Claude 优先选择原生工具
    ↓
Skills 被忽略 ❌
```

**解决方案**：基于 Hook 的自动激活

---

## 🔄 自动激活机制

### 两种 Hook 类型

#### UserPromptSubmit Hook（用户消息提交前）

**触发时机**：Claude 看到用户消息之前

**工作流程**：

```
用户输入消息
    ↓
UserPromptSubmit Hook 触发
    ↓
1. 分析 prompt 的关键词/意图
2. 检查相关 skills
3. 注入 "🎯 SKILL ACTIVATION CHECK - Use X skill"
4. Claude 读问题前看到提醒
    ↓
Claude 开始处理消息
```

**配置示例**：

```javascript
// .claude/hooks/skills-auto-activate.js

module.exports = {
  async UserPromptSubmit(context) {
    const { prompt } = context;

    // 分析关键词
    const keywords = {
      'frontend-design': ['前端', 'frontend', 'UI', '界面设计'],
      'security-review': ['安全', 'security', '漏洞', 'vulnerability'],
      'tdd-strict': ['测试', 'test', 'TDD'],
    };

    // 检查匹配
    for (const [skill, words] of Object.entries(keywords)) {
      if (words.some(w => prompt.toLowerCase().includes(w))) {
        // 注入激活提醒
        context.prompt = `🎯 SKILL ACTIVATION CHECK - Consider using ${skill} skill\n\n${prompt}`;
        break;
      }
    }

    return context;
  }
};
```

#### Stop Event Hook（响应后）

**触发时机**：Claude 生成响应后

**工作流程**：

```
Claude 生成响应
    ↓
Stop Event Hook 触发
    ↓
1. 分析编辑的文件
2. 检查风险模式（try-catch, DB ops, async）
3. 显示温和的自我检查提醒
4. 非阻塞感知
    ↓
用户看到响应 + 提醒
```

**配置示例**：

```javascript
// .claude/hooks/quality-check.js

module.exports = {
  async StopEvent(context) {
    const { edits } = context;

    // 风险模式检测
    const riskPatterns = {
      'error-handling': /try\s*{[\s\S]*?}\s*catch\s*\([^)]*\)\s*{\s*}/g,
      'db-operations': /(db\.|database\.|query\()/gi,
      'async-issues': /async\s*\([^)]*\)/g,
    };

    const warnings = [];

    for (const [risk, pattern] of Object.entries(riskPatterns)) {
      for (const edit of edits) {
        if (pattern.test(edit.content)) {
          warnings.push(`⚠️ 检测到 ${risk} 模式，建议验证`);
        }
      }
    }

    if (warnings.length > 0) {
      console.log('\n' + warnings.join('\n'));
    }

    return context;
  }
};
```

---

## 📋 skill-rules.json 模式

### 完整配置示例

```json
{
  "backend-dev-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "description": "后端开发最佳实践",
    "promptTriggers": {
      "keywords": ["backend", "controller", "API", "后端"],
      "intentPatterns": [
        "(create|add).*?(route|endpoint)",
        "(build|implement).*API",
        "后端.*开发"
      ]
    },
    "fileTriggers": {
      "pathPatterns": ["backend/src/**/*.ts", "api/**/*.js"],
      "contentPatterns": ["router\\.", "express\\.Router", "@GetMapping"]
    }
  },
  "security-review": {
    "type": "quality",
    "enforcement": "suggest",
    "priority": "critical",
    "description": "安全审查",
    "promptTriggers": {
      "keywords": ["security", "安全", "vulnerability", "漏洞"],
      "intentPatterns": [
        "review.*security",
        "安全.*审查",
        "check.*vulnerability"
      ]
    },
    "fileTriggers": {
      "pathPatterns": ["**/*.ts", "**/*.js"],
      "contentPatterns": ["eval(", "innerHTML", "dangerouslySetInnerHTML"]
    }
  }
}
```

### 字段说明

| 字段 | 说明 | 可选值 |
|------|------|--------|
| **type** | 技能类型 | domain, quality, workflow |
| **enforcement** | 执行级别 | suggest（建议）, require（强制） |
| **priority** | 优先级 | low, medium, high, critical |
| **promptTriggers** | 提示词触发 | keywords, intentPatterns |
| **fileTriggers** | 文件触发 | pathPatterns, contentPatterns |

---

## 📐 Skill 结构（Anthropic 最佳实践）

### 重构前后对比

**重构前**（1500+ 行单文件）：
```
SKILL.md
├── 核心概念（200 行）
├── 基础用法（300 行）
├── 进阶用法（400 行）
├── 示例代码（500 行）
└── FAQ（100 行）
    ↓
Token 浪费：每次加载全部
    ↓
效率低下
```

**重构后**（300-400 行主文件 + 10-11 个资源文件）：
```
SKILL.md（主文件，300-400 行）
├── 核心概念 + 快速参考
└── 资源文件链接：
    ├── basics/（基础详解）
    ├── advanced/（进阶用法）
    ├── examples/（示例代码）
    └── faq.md（FAQ）
    ↓
Token 效率提升 40-60%
    ↓
按需加载
```

### 主文件结构

```markdown
# [Skill Name]

> 一句话描述

## 快速参考

| 场景 | 命令/方法 | 说明 |
|------|----------|------|
| 场景1 | `xxx` | 说明1 |
| 场景2 | `yyy` | 说明2 |

## 核心概念（简洁）

1-2 段话，不超过 200 字

## 基础用法（常见场景）

### 场景 1

**提示词**：
```
[模板]
```

**详细说明**：见 `resources/basics/scenario-1.md`

### 场景 2

**提示词**：
```
[模板]
```

**详细说明**：见 `resources/basics/scenario-2.md`

## 进阶用法（按需）

详见 `resources/advanced/`

## 示例代码

见 `resources/examples/`

## FAQ

见 `resources/faq.md`
```

### 资源文件示例

**resources/basics/scenario-1.md**：

```markdown
# 场景 1 详细说明

## 完整提示词

```
[完整模板，包含所有选项]
```

## 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| option1 | 说明1 | 默认1 |
| option2 | 说明2 | 默认2 |

## 示例输出

```
[示例]
```

## 常见问题

Q: XXX
A: YYY
```

---

## 🚪 Hooks 质量控制

### 共识 Hook 类型

#### 1. Block-at-Submit Hooks（主要策略）

**工作原理**：

```
PreToolUse hook 包装 Bash(git commit)
    ↓
检查 /tmp/agent-pre-commit-pass 文件
    ↓
文件缺失则阻止提交
    ↓
强制 "test-and-fix" 循环直到通过
```

**配置示例**：

```javascript
// .claude/hooks/pre-commit-guard.js

module.exports = {
  async PreToolUse(context) {
    const { tool, input } = context;

    // 拦截 git commit
    if (tool === 'Bash' && input.command.includes('git commit')) {
      const passFile = '/tmp/agent-pre-commit-pass';

      // 检查是否通过验证
      if (!fs.existsSync(passFile)) {
        throw new Error(
          '❌ 提交被阻止：未通过验证\n' +
          '请运行 ./scripts/verify-plan.sh 验证后再提交'
        );
      }

      // 验证通过，清理文件
      fs.unlinkSync(passFile);
    }

    return context;
  }
};
```

#### 2. Hint Hooks（非阻塞反馈）

**工作原理**：

```
检测到次优模式
    ↓
提供即抛即用指导
    ↓
不阻止操作，只是提醒
```

**配置示例**：

```javascript
// .claude/hooks/error-handling-hint.js

module.exports = {
  async StopEvent(context) {
    const { edits } = context;

    // 检测空 catch 块
    for (const edit of edits) {
      const emptyCatch = /catch\s*\([^)]*\)\s*{\s*}/g;
      if (emptyCatch.test(edit.content)) {
        console.log(
          '\n💡 提示：检测到空 catch 块\n' +
          '建议至少记录错误：console.error(err)\n' +
          '或考虑：\n' +
          '- 添加错误处理逻辑\n' +
          '- 向上抛出有意义的错误\n' +
          '- 使用错误监控服务'
        );
      }
    }

    return context;
  }
};
```

### 关键洞察

> **"不要在写入时阻塞 — 让 agent 完成计划，然后检查最终结果"**

**为什么这样设计**：

```
❌ 错误方式：每次写入都检查
  写入 → 阻塞 → 检查 → 放行 → 写入 → 阻塞...
  结果：流程被打断，agent 难以完成完整计划

✅ 正确方式：完成后检查
  计划 → 执行（多次写入） → 完成 → 一次性检查
  结果：流程顺畅，检查更全面
```

---

## 🔧 常见 Hooks

### Build Checker（TypeScript/Linter 错误）

**触发时机**：保存 TypeScript 文件后

**检查内容**：
- TypeScript 编译错误
- ESLint 警告
- Prettier 格式问题

**配置示例**：

```javascript
// .claude/hooks/build-checker.js

const { execSync } = require('child_process');

module.exports = {
  async StopEvent(context) {
    const { edits } = context;

    // 检查是否有 TypeScript 文件被编辑
    const hasTsEdits = edits.some(e => e.path.endsWith('.ts'));

    if (hasTsEdits) {
      try {
        // 运行 TypeScript 检查
        execSync('npx tsc --noEmit', { encoding: 'utf-8' });
        console.log('✅ TypeScript 检查通过');
      } catch (error) {
        console.log(
          '\n❌ TypeScript 错误：\n' +
          error.stdout + '\n' +
          '请修复后继续'
        );
      }
    }

    return context;
  }
};
```

---

### Test Runner（确保测试通过）

**触发时机**：编辑测试文件或源文件后

**检查内容**：
- 测试是否通过
- 覆盖率是否达标

**配置示例**：

```javascript
// .claude/hooks/test-runner.js

const { execSync } = require('child_process');

module.exports = {
  async StopEvent(context) {
    const { edits } = context;

    // 检查是否有测试文件或源文件被编辑
    const relevantEdits = edits.filter(e =>
      e.path.includes('.test.') ||
      e.path.includes('src/')
    );

    if (relevantEdits.length > 0) {
      try {
        // 运行测试
        execSync('npm test', { encoding: 'utf-8' });
        console.log('✅ 测试通过');
      } catch (error) {
        console.log(
          '\n❌ 测试失败：\n' +
          error.stdout + '\n' +
          '请修复后继续'
        );
      }
    }

    return context;
  }
};
```

---

### Error Handling Reminder

**触发时机**：检测到异步操作或数据库操作

**检查内容**：
- 是否有错误处理
- 错误处理是否完善

**配置示例**：

```javascript
// .claude/hooks/error-handling-reminder.js

module.exports = {
  async StopEvent(context) {
    const { edits } = context;

    for (const edit of edits) {
      // 检测没有错误处理的异步操作
      const asyncWithoutError =
        /(?:await\s+\w+\(|\.then\(|\.fetch\()[\s\S]{0,500}?((?!catch|try).)*$/gm;

      if (asyncWithoutError.test(edit.content)) {
        console.log(
          '\n💡 提醒：检测到可能缺少错误处理的异步操作\n' +
          '建议添加 .catch() 或 try/catch'
        );
      }
    }

    return context;
  }
};
```

---

### Skills Auto-Activation

**触发时机**：每次用户输入

**检查内容**：
- 分析用户意图
- 匹配相关 skills
- 注入激活提醒

（详见上文 "UserPromptSubmit Hook" 部分）

---

## 🔄 与我们实践的对比

| 实践 | Anthropic/社区建议 | 我们做法 | 差距/行动 |
|------|-------------------|---------|----------|
| **Skills 自动激活** | 基于 Hook | ❌ 无自动激活 | ⚠️ 需要添加 |
| **Skill 结构** | 渐进式披露 + 资源文件 | 部分遵循 | ✅ 可优化 |
| **Hooks** | 质量 Gates | ✅ pre-commit hook | 符合最佳实践 |
| **Build 检查** | 自动检查 TypeScript/ESLint | ⚠️ 部分实现 | 可增强 |

---

## ✅ 行动建议

### 立即可做（本周）

1. **添加 Skills 自动激活**
   - 创建 `skills-auto-activate.js`
   - 定义关键词和意图模式
   - 测试激活是否生效

2. **实现 Hint Hooks**
   - 创建 `error-handling-hint.js`
   - 添加常见错误模式检测
   - 提供温和的改进建议

### 中期优化（本月）

3. **优化 Skill 结构**
   - 检查现有 Skills 文件大小
   - 拆分为主文件 + 资源文件
   - 提升 Token 效率 40-60%

4. **增强 Build 检查**
   - 添加 TypeScript 自动检查
   - 添加 ESLint 自动检查
   - 编辑后立即反馈

---

## 📚 相关资源

- [01 - Context 管理](./01-context-management.md) — Context 与 Skills 的关系
- [02 - 规划与架构](./02-planning-architecture.md) — Subagent 策略
- [原文讨论](https://github.com/anthropics/claude-code-best-practices) — 社区实践

---

*创建时间：2026-03-01*
