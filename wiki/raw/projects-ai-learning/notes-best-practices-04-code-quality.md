---
input: monday-learning.md 文章2 要点4
output: 代码质量详细实践指南
pos: stanford-cs146s/notes/best-practices/
---

# 04 - 代码质量

> **核心认知**：AI 生成的代码经常"表面上工作"但包含微妙 bug；测试提供唯一可靠的验证机制

---

## 🎯 为什么 TDD 对 AI 更重要

### 问题本质

**AI 代码的特点**：
```
人类编码 → 基于理解 → 逻辑清晰 → bug 较少
    ↓
AI 编码 → 模式匹配 → 表面正确 → 微妙 bug 多
```

**常见 AI Bug 类型**：
| Bug 类型 | 说明 | 难以发现的原因 |
|---------|------|---------------|
| **边界情况** | 空值、极值、异常输入 | AI 可能不考虑到 |
| **类型错误** | TypeScript 类型不匹配 | 表面编译通过，运行时错误 |
| **异步问题** | Promise/async 处理不当 | 非确定性，难以复现 |
| **状态管理** | 状态更新逻辑错误 | 特定序列才出现 |
| **性能问题** | 算法效率低下 | 正常数据量不明显 |

**为什么测试是唯一可靠验证**：
- AI 说"完成了" ≠ 真的完成了
- 代码看起来对 ≠ 运行对
- 手动测试覆盖有限 ≠ 自动化测试全面

---

## 📋 TDD 共识模式（4+ 来源）

### 完整流程

```
1. 实施前写测试
    ↓
2. 确认测试失败（避免 mock 实现）
    ↓
3. 分开提交测试
    ↓
4. 实施直到测试通过
    ↓
5. 实施期间不修改测试
```

### Step 1: 实施前写测试

**为什么先写测试**：
- **定义接口**：测试即文档，明确"做什么"
- **验证理解**：测试失败证明理解正确
- **防止自欺**：避免测试"通过已实现的代码"

**示例**：

```typescript
// 用户注册功能

// ❌ 后写测试（容易自欺）
function registerUser(email: string, password: string) {
  // 实现
}

// 然后写测试，可能只是"测试已实现的行为"
test('registerUser', () => {
  // 测试已实现的功能，而不是应该的功能
});

// ✅ 先写测试（定义接口）
test('registerUser - valid input', () => {
  const result = registerUser('test@example.com', 'validPass123');
  expect(result.success).toBe(true);
  expect(result.user).toBeDefined();
  expect(result.user.email).toBe('test@example.com');
});

test('registerUser - duplicate email', () => {
  const result = registerUser('existing@example.com', 'validPass123');
  expect(result.success).toBe(false);
  expect(result.error).toBe('Email already exists');
});

test('registerUser - weak password', () => {
  const result = registerUser('test@example.com', '123');
  expect(result.success).toBe(false);
  expect(result.error).toBe('Password too weak');
});

// 然后实现，确保测试通过
function registerUser(email: string, password: string) {
  // 实现
}
```

**测试覆盖的场景**：

| 场景类型 | 示例 | 必须测试 |
|---------|------|---------|
| **正常输入** | 有效邮箱、强密码 | ✅ |
| **边界输入** | 空字符串、极长字符串 | ✅ |
| **异常输入** | 无效格式、SQL 注入 | ✅ |
| **错误情况** | 重复邮箱、网络错误 | ✅ |
| **状态变更** | 创建后读取、更新后读取 | ✅ |

---

### Step 2: 确认测试失败

**为什么重要**：
- **避免 mock 实现**：测试不是假的，真的会失败
- **验证测试有效**：失败的测试证明测试在检测
- **明确起点**：知道从哪里开始实现

**示例**：

```typescript
// 测试文件
test('registerUser - valid input', () => {
  const result = registerUser('test@example.com', 'validPass123');
  expect(result.success).toBe(true); // ❌ 函数未实现，测试失败 ✅
});

// 运行测试
// FAIL: registerUser is not defined

// 这证明：
// 1. 测试在运行
// 2. 测试在检测
// 3. 不是 mock 实现（假的测试）
```

**坏做法**：

```typescript
// ❌ 写假实现让测试"通过"
function registerUser(email: string, password: string) {
  return { success: true }; // 假的！
}

// 测试"通过"了，但不是真的实现
```

---

### Step 3: 分开提交测试

**为什么分开**：
- **Git 历史清晰**：看到"添加测试"和"实现功能"两个提交
- **Review 容易**：先看测试定义，再看实现
- **回滚方便**：可单独回滚实现，保留测试

**Commit 示例**：

```bash
# Commit 1: 添加测试
git add tests/registerUser.test.ts
git commit -m "test: add registerUser test suite"

# Commit 2: 实现功能
git add src/auth/registerUser.ts
git commit -m "feat: implement registerUser function"
```

**Git 历史**：

```
* feat: implement registerUser function
* test: add registerUser test suite
```

**清晰看到**：先定义测试，再实现功能

---

### Step 4: 实施直到测试通过

**核心原则**：
- **最小实现**：只写足够的代码让测试通过
- **不多不少**：不添加测试没要求的代码
- **逐步实现**：一个测试一个测试地通过

**示例**：

```typescript
// 测试 1: 有效输入
test('registerUser - valid input', () => {
  const result = registerUser('test@example.com', 'validPass123');
  expect(result.success).toBe(true);
});

// 实现 1: 最小实现
function registerUser(email: string, password: string) {
  return { success: true }; // 通过测试 1
}

// 测试 2: 返回用户对象
test('registerUser - returns user object', () => {
  const result = registerUser('test@example.com', 'validPass123');
  expect(result.user).toBeDefined();
  expect(result.user.email).toBe('test@example.com');
});

// 实现 2: 扩展实现
function registerUser(email: string, password: string) {
  return {
    success: true,
    user: { email } // 通过测试 2
  };
}

// 继续这个过程...
```

---

### Step 5: 实施期间不修改测试

**为什么重要**：
- **测试即需求**：修改测试 = 修改需求
- **防止滑坡**：发现测试"难通过"就改测试
- **保持诚实**：困难说明设计可能有问题

**坏做法**：

```typescript
// 测试定义了要求
test('registerUser - weak password rejected', () => {
  const result = registerUser('test@example.com', '123');
  expect(result.success).toBe(false);
});

// 实现时发现"难以验证弱密码"
// ❌ 改测试！
test('registerUser - weak password accepted', () => {
  const result = registerUser('test@example.com', '123');
  expect(result.success).toBe(true); // 改了！
});

// ✅ 正确做法：重新设计
// 如果验证弱密码困难，考虑：
// 1. 使用密码验证库
// 2. 后续实现（Phase 2）
// 3. 明确标记为 TODO
```

---

## 👁️ 代码审查（包括 AI 自己的工作）

### 核心洞察

> **"我相信我对有我名字的 PR 中的代码负责，不管它是如何生产的"** — Chris Dzombak

**关键认知**：
- 用 AI 生成代码 ≠ 甩锅给 AI
- 你提交的代码，你负责
- PR 上的名字 = 责任归属

---

### 多层审查流程

```
1. Claude 自审查：用 subagents 或新鲜上下文
    ↓
2. 人工审查：手动验证行为和测试覆盖
    ↓
3. 多 Claude 实例：一个写，另一个审查（新上下文 = 更好批判）
```

---

### 层级 1: Claude 自审查

**方法 1: Subagent 审查**

```bash
# 使用 code-reviewer subagent
Agent: code-reviewer
Prompt: 审查以下 PR，关注：
- 安全漏洞
- 性能问题
- 边界情况
- 代码风格
```

**方法 2: 新鲜上下文审查**

```bash
# 启动新会话，只给 PR 内容
/clear

# 然后读取 PR
PR 内容：[PR diff]

# 批判性审查
请找出这段代码的问题：
- 逻辑错误
- 安全风险
- 边界情况
- 可维护性
```

**为什么新上下文更好**：
- 没有"编写时的偏见"
- 更容易发现问题
- 模拟独立审查者视角

---

### 层级 2: 人工审查

**审查清单**：

| 类别 | 检查项 | 说明 |
|------|--------|------|
| **功能** | 是否实现需求 | 对照需求文档 |
| **测试** | 测试覆盖是否充分 | 边界情况、错误处理 |
| **安全** | 有无安全漏洞 | SQL 注入、XSS 等 |
| **性能** | 有无性能问题 | 算法复杂度、查询优化 |
| **风格** | 代码风格是否一致 | 团队规范 |
| **文档** | 文档是否更新 | README、注释 |
| **可读性** | 代码是否易于理解 | 命名、结构 |

**审查方法**：

```bash
# 1. 查看 PR 描述
gh pr view 123

# 2. 查看 diff
gh pr diff 123

# 3. 查看 files changed
gh pr view 123 --json files

# 4. 本地检查（可选）
git fetch origin pull/123/head:pr-123
git checkout pr-123
npm test
```

---

### 层级 3: 多 Claude 实例

**方法**：

```
会话 A（编写者）：
- 编写代码
- 创建 PR

会话 B（审查者，新上下文）：
- 读取 PR
- 批判性审查
- 提出改进意见

会话 A（回应）：
- 根据反馈修改
- 更新 PR
```

**为什么有效**：
- **不同上下文**：B 没有 A 的"编写记忆"
- **批判视角**：B 更容易发现问题
- **模拟团队**：像两个人协作

---

## 🔍 审查检查什么

### 1. 意大利面代码（难以跟随的逻辑）

**示例**：

```typescript
// ❌ 意大利面代码
function processUser(user: User) {
  if (user.age < 18) {
    if (user.country === 'US') {
      if (user.state === 'CA') {
        // 50 行嵌套逻辑
      } else {
        // 另一个 50 行
      }
    } else {
      // 又一个 50 行
    }
  } else {
    // 继续嵌套
  }
}

// ✅ 清晰结构
function processUser(user: User) {
  if (!isAdult(user)) {
    return handleMinor(user);
  }
  return handleAdult(user);
}

function handleAdult(user: User) {
  if (user.country === 'US') {
    return handleUSUser(user);
  }
  return handleInternationalUser(user);
}
```

---

### 2. 重大 API/后端变更

**检查项**：
- [ ] API 版本是否更新
- [ ] 向后兼容性是否保持
- [ ] 破坏性变更是否文档化
- [ ] 旧版本是否支持（过渡期）

**示例**：

```typescript
// ❌ 破坏性变更，无文档
function getUser(id: string): User {
  // 之前返回 User | null
  // 现在直接抛出错误
  if (!user) throw new Error('User not found');
  return user;
}

// ✅ 文档化破坏性变更
/**
 * @deprecated 使用 getUserV2
 * @throws {UserNotFoundError} 当用户不存在时
 * @migration_guide 移动到 getUserV2，使用 try/catch 处理错误
 */
function getUser(id: string): User {
  if (!user) throw new UserNotFoundError(id);
  return user;
}

function getUserV2(id: string): Promise<{ user: User | null }> {
  // 新 API，返回 Promise，不抛错
}
```

---

### 3. 不必要的 imports、functions、comments

**示例**：

```typescript
// ❌ 不必要的 imports
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { SomeUtil } from './utils';
import { neverUsed } from './neverUsed';

// 只用了 useState
const [state, setState] = useState();

// ✅ 只导入需要的
import { useState } from 'react';

// ❌ 不必要的函数
function helper1() { /* 定义但不用 */ }
function helper2() { /* 定义但不用 */ }
function main() { /* 实际只用这个 */ }

// ✅ 只保留需要的
function main() { /* ... */ }

// ❌ 无用的注释
// 这是一个函数
function foo() { /* ... */ }

// ✅ 删除或写有用的注释
/**
 * 计算折扣价格
 * @param originalPrice 原价
 * @param discountRate 折扣率（0-1）
 * @returns 折扣后价格
 */
function calculateDiscount(originalPrice: number, discountRate: number): number {
  return originalPrice * (1 - discountRate);
}
```

---

### 4. 缺少错误处理

**示例**：

```typescript
// ❌ 无错误处理
async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  return response.json(); // 可能失败
}

// ✅ 完整错误处理
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // 网络错误
      throw new NetworkError('Failed to reach server', { cause: error });
    }
    // 其他错误
    throw error;
  }
}
```

---

### 5. 安全漏洞

**常见漏洞类型**：

| 漏洞 | 示例 | 修复 |
|------|------|------|
| **SQL 注入** | `WHERE name = '${input}'` | 参数化查询 |
| **XSS** | `innerHTML = userInput` | `textContent` 或 sanitization |
| **硬编码密钥** | `API_KEY = 'xxx'` | 环境变量 |
| **不安全的随机** | `Math.random()` | `crypto.getRandomValues()` |
| **路径遍历** | `../../etc/passwd` | 路径验证 |

**示例**：

```typescript
// ❌ SQL 注入风险
const query = `SELECT * FROM users WHERE name = '${userName}'`;
db.execute(query); // userName = "'; DROP TABLE users; --"

// ✅ 参数化查询
const query = 'SELECT * FROM users WHERE name = ?';
db.execute(query, [userName]);

// ❌ XSS 风险
element.innerHTML = userComment; // comment = "<script>alert('xss')</script>"

// ✅ 安全渲染
element.textContent = userComment;
// 或使用 DOMPurify
element.innerHTML = DOMPurify.sanitize(userComment);
```

---

## 🔄 与我们实践的对比

| 实践 | Anthropic/社区建议 | 我们做法 | 差距/行动 |
|------|-------------------|---------|----------|
| **TDD** | 测试优先 | ⚠️ 部分遵循 | ✅ 可增强 |
| **测试分离提交** | 测试和实现分开提交 | ⚠️ 混在一起 | 可改进 |
| **代码审查** | 多层审查 | ⚠️ 主要人工审查 | ✅ 可加 AI 自审查 |

---

## ✅ 行动建议

### 立即可做（本周）

1. **强化 TDD 实践**
   - 测试优先：先写测试，再实现
   - 分开提交：测试和实现分开 commit
   - 不在实施中修改测试

2. **添加 AI 自审查**
   - PR 创建后，用新会话审查
   - 或使用 code-reviewer subagent
   - 记录审查意见

### 中期优化（本月）

3. **完善测试覆盖**
   - 边界情况测试
   - 错误处理测试
   - 集成测试

4. **建立审查清单**
   - 团队共享审查清单
   - 每次必查：安全、性能、可读性
   - 记录常见问题模式

---

## 📚 相关资源

- [03 - 工具与自动化](./03-tools-automation.md) — Hooks 自动质量检查
- [05 - 反模式与避坑](./05-anti-patterns.md) - 常见错误
- [原文讨论](https://github.com/anthropics/claude-code-best-practices) — 社区实践

---

*创建时间：2026-03-01*
