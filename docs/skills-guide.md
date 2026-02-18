# Skills & 子代理使用规范

---

## UI/UX Skills

| Skill | 定位 | 使用场景 |
|-------|------|---------|
| ui-ux-pro-max | 设计系统 | 颜色、图标、组件、最佳实践 |
| frontend-design | 界面创作 | 避免AI风格、高质量网页 |
| web-design-guidelines | 规范审查 | 可访问性、合规检查 |
| building-native-ui | 原生移动 | Expo Router应用 |

**互补关系**：创作 → 审查 → 移动端复用

---

## 子代理系统

### 核心工作流

```
复杂功能 → planner → tdd-guide → 写代码 → code-reviewer
涉及用户输入 → security-reviewer
```

### Task Tool 类型

| 类型 | 用途 | 模型 |
|------|------|------|
| Explore | 探索代码库 | haiku |
| general-purpose | 复杂任务 | sonnet |
| Plan | 架构设计 | opus |
| Bash | 命令执行 | haiku |

### 强制使用

- ✅ 代码写完 → code-reviewer
- ✅ 用户输入/认证/支付 → security-reviewer
- ✅ 复杂功能 → planner
- ✅ 写代码前 → tdd-guide

### 禁止

- ❌ 写完代码不review
- ❌ 测试和代码一起写
- ❌ 复杂任务直接上手

---

*更新日期：2026-02-18*
