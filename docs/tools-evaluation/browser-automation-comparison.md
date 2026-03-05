---
input: 浏览器自动化工具选择需求
output: 工具对比评估与选择建议
pos: docs/tools-evaluation/工具评估
---

# 浏览器自动化工具对比评估

> **评估日期**: 2026-03-06
> **评估目的**: 对比 Claude for Safari 与 agent-browser，确定是否需要切换或补充工具链

---

## 一、工具概览

### Claude for Safari

| 项目 | 内容 |
|------|------|
| **开发者** | SDLLL (GitHub) |
| **安装方式** | `npx skills add SDLLL/claude-for-safari` |
| **技术栈** | AppleScript + macOS Native + 真实 Safari |
| **许可** | MIT (免费开源) |
| **平台限制** | macOS only |

**核心特点**：
- 使用真实 Safari 浏览器（保留登录状态、标签页、会话）
- 无需安装依赖（macOS 内置 AppleScript）
- 无需浏览器扩展
- 网站视为真实用户（无自动化指纹）

---

### agent-browser

| 项目 | 内容 |
|------|------|
| **来源** | 已集成到 `.claude/skills/agent-browser/` |
| **技术栈** | Playwright + Chromium |
| **安装方式** | npm global 安装 |
| **许可** | 开源（需确认） |
| **平台支持** | 跨平台（macOS/Windows/Linux） |

**核心特点**：
- 独立 Chromium（~160MB 一次性下载）
- 完整浏览器自动化（点击、填写、截图、PDF等）
- 支持并行会话、状态持久化
- 丰富的安全特性（域名白名单、动作策略、内容边界）

---

## 二、详细对比

### 功能维度

| 功能 | Claude for Safari | agent-browser | 优势方 |
|------|------------------|---------------|--------|
| **浏览器类型** | 真实 Safari | 独立 Chromium | 各有优势 |
| **登录状态** | 保留现有会话 | 需要登录或状态持久化 | **CfS** |
| **平台支持** | macOS only | 跨平台 | **a-b** |
| **依赖安装** | 零依赖（AppleScript） | Node.js + Playwright + Chromium | **CfS** |
| **首次启动** | 即用 | 需下载 Chromium (~160MB) | **CfS** |
| **会话隔离** | 共享用户会话 | 支持多会话隔离 | **a-b** |
| **并行任务** | 受限 | 原生支持 | **a-b** |
| **安全特性** | 基础 | 域名白名单、动作策略、内容边界 | **a-b** |
| **反检测** | 真实用户，无指纹 | 可能有自动化指纹 | **CfS** |
| **iOS 支持** | ❌ | ✅ (via Appium) | **a-b** |
| **命令丰富度** | 基础（AppleScript 限制） | 丰富（snapshot、diff、eval等） | **a-b** |

### 性能维度

| 指标 | Claude for Safari | agent-browser |
|------|------------------|---------------|
| **启动速度** | 快（秒级） | 中等（需启动 Chromium） |
| **内存占用** | 共享 Safari | 独立进程（~200MB+） |
| **稳定性** | 依赖 Safari 版本 | Playwright 成熟稳定 |
| **维护成本** | AppleScript 生态小 | Playwright 生态活跃 |

### 适用场景

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **需要登录状态的操作** | **Claude for Safari** | 直接用已有登录，无需重新登录 |
| **跨平台需求** | **agent-browser** | 唯一支持 Windows/Linux |
| **大规模数据抓取** | **agent-browser** | 并行会话、更好的隔离性 |
| **快速原型** | **Claude for Safari** | 零依赖、即用 |
| **需要 iOS 测试** | **agent-browser** | 支持 iOS Simulator |
| **敏感操作（涉及登录）** | **Claude for Safari** | 反检测、真实用户指纹 |
| **复杂交互流程** | **agent-browser** | 丰富的命令和调试能力 |

---

## 三、决策建议

### ✅ 保留 agent-browser，补充 Claude for Safari

**理由**：
1. **agent-browser 已深度集成**：技能文档完整，已熟悉工作流
2. **场景互补**：不是替代关系，是互补关系
3. **成本极低**：Claude for Safari 零依赖，安装无负担

### 📋 工具选择决策树

```
需要浏览器自动化？
    ↓
是 macOS only？
    ├─ 是 → 需要登录状态？
    │       ├─ 是 → Claude for Safari
    │       └─ 否 → agent-browser
    │
    └─ 否（跨平台）→ agent-browser
```

---

## 四、行动清单

### 立即执行

- [ ] 安装 Claude for Safari：`npx skills add SDLLL/claude-for-safari`
- [ ] 测试基础功能：查看标签页、导航、截图
- [ ] 更新 `.claude/rules/reference/TOOLS.md` 工具优先级

### 本月优化

- [ ] 创建选择指南（上述决策树）
- [ ] 补充使用示例到相关 skills
- [ ] 评估是否需要封装统一接口

### Q2 考虑

- [ ] 监控两个工具的使用频率
- [ ] 根据实际使用情况调整优先级
- [ ] 考虑是否需要开发统一 wrapper

---

## 五、风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|---------|
| AppleScript 生态萎缩 | 中 | 中 | 保留 agent-browser 作为主要工具 |
| Safari 更新破坏兼容性 | 中 | 低 | 维护期修复 |
| 两个工具混淆使用 | 低 | 低 | 文档明确场景边界 |

---

## 六、参考资料

- **Claude for Safari**: [dev.to 文章](https://dev.to/sidrel/i-built-an-ai-agent-that-controls-my-real-safari-browser-no-extensions-needed-4h00)
- **Claude for Safari**: GitHub (SDLLL/claude-for-safari)
- **agent-browser**: `.claude/skills/agent-browser/SKILL.md`

---

*最后更新：2026-03-06*
*下次评估：2026-06-06（或根据实际使用情况触发）*
