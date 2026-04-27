---
input: 学习文档、速查需求
output: 快速参考、命令速查
pos: docs/learning/，速查表
---

# Claude Code 速查表

> 一页纸掌握核心组件

---

## 🎯 七大组件一句话总结

| 组件 | 作用 | 配置文件 | 命令 |
|------|------|----------|------|
| **CLAUDE.md** | 项目记忆体 | `CLAUDE.md` | 自动加载 |
| **Commands** | 快捷指令 | `.claude/commands/` | `/xxx` |
| **Hooks** | 自动化触发器 | `.claude/hooks.json` | 事件触发 |
| **SubAgents** | 任务分解 | Task 工具 | 自动委派 |
| **Skills** | 工作流模板 | `.claude/skills/` | `使用 [skill]` |
| **Plugins** | 功能大礼包 | 插件市场 | `/plugin install` |
| **MCP** | 连接外部 | `~/.mcp.json` | MCP 工具调用 |

---

## 📋 快速上手（30 分钟）

### Step 1: 创建 CLAUDE.md（5 分钟）
```bash
cat > CLAUDE.md << 'EOF'
---
input: 会话请求
output: AI 协作
pos: 项目根目录
---

# CLAUDE.md

## 项目命令
- npm run dev: 启动开发
- npm run test: 运行测试

## 代码规范
- TypeScript strict
- ES 模块语法
EOF
```

### Step 2: 创建第一个 Command（10 分钟）
```bash
mkdir -p .claude/commands
cat > .claude/commands/review.md << 'EOF'
请审查代码，重点检查：
1. 代码质量
2. 安全漏洞
3. 性能问题
4. 测试覆盖率
5. 文档完整性
EOF

# 使用
claude "/review"
```

### Step 3: 配置 Hooks（10 分钟）
```bash
cat > .claude/hooks.json << 'EOF'
{
  "file_edit": {
    "command": "npm run lint -- --fix $FILE",
    "description": "Auto-fix lint"
  }
}
EOF
```

### Step 4: 测试（5 分钟）
```bash
# 编辑一个文件，观察自动 lint 修复
claude "帮我修改 src/index.ts，添加一个函数"
```

---

## 🔧 常用命令速查

### Commands
```bash
/review          # 代码审查
/fix-issue 123   # 处理 Issue #123
/plan5           # 五文件工作流
/wake            # 会话启动
```

### Plugins
```bash
/plugin marketplace add xxx    # 添加插件市场
/plugin install xxx            # 安装插件
/plugin list                   # 列出已安装
```

### Skills
```bash
使用 add-api-endpoint 来添加接口
使用 tdd-workflow 来开发功能
```

---

## ⚠️ 避坑清单

| 不要 | 应该 |
|------|------|
| 一次性启用所有组件 | 从 CLAUDE.md 开始逐步扩展 |
| Hooks 自动执行写操作 | 数据修改操作手动确认 |
| 使用不可信 MCP/Plugins | 优先官方和可信来源 |
| CLAUDE.md 过于冗长 | 保持简洁，用 IMPORTANT 标识 |

---

## 📚 学习路径

| 周次 | 内容 | 验收 |
|------|------|------|
| 第 1 周 | CLAUDE.md + Commands | 能创建项目和命令 |
| 第 2 周 | Hooks + Skills | 能配置自动化和工作流 |
| 第 3 周 | SubAgents + MCP | 能分解任务和连接外部 |
| 第 4 周 | Plugins + 组合 | 能安装插件和协同使用 |

---

## 🔗 资源链接

- 官方文档：https://docs.anthropic.com/claude-code
- MCP Servers: https://github.com/modelcontextprotocol/servers
- 插件市场：`/plugin marketplace`

---

*最后更新：2026-02-24*
