# Settings.json 配置说明

> Hook系统需要在 `~/.claude/settings.json` 中注册才能生效

---

## 配置内容

在 `~/.claude/settings.json` 中添加以下 `hooks` 配置：

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "name": "skills-auto-activate",
        "path": "/Users/sundanian/my-agent/.claude/hooks/skills-auto-activate.js",
        "description": "自动分析消息并提醒激活对应skill"
      }
    ],
    "Stop": [
      {
        "name": "quality-check",
        "path": "/Users/sundanian/my-agent/.claude/hooks/quality-check.js",
        "description": "质量控制检查 - 分析文件变更，检测风险模式"
      }
    ]
  }
}
```

**注意**：`path` 字段需要使用**绝对路径**。

---

## Hook 说明

### UserPromptSubmit Hook

**文件**：`skills-auto-activate.js`

**触发时机**：用户发送消息后

**功能**：
- 分析用户消息关键词
- 匹配对应skill
- 注入激活提醒

**支持的skills**（硬编码在脚本中）：
- brainstorming（头脑风暴）
- writing-plans（写方案）
- executing-plans（执行计划）
- systematic-debugging（系统化调试）
- copywriting（文案创作）
- copy-editing（文案编辑）
- content-creation（内容创作）
- pptx（演示文稿）
- frontend-design（前端设计）
- web-design-guidelines（设计审查）
- pdf（PDF处理）
- xlsx（表格处理）
- steal-learning（经验萃取）

### Stop Hook

**文件**：`quality-check.js`

**触发时机**：Claude完成回复后

**功能**：
- 分析文件变更
- 检测风险模式
- 输出质量问题报告

**检查项**（来自 `skill-rules.json`）：
- 后端错误处理（空catch块、数据库操作）
- 前端可访问性（按钮aria-label）
- 安全审查（eval、明文密码）

---

## 验证配置

1. **重启Claude Code**
2. **发送测试消息**（如"帮我想想新功能"）
3. **检查是否看到激活提醒**

---

## 故障排查

**Hook未触发**：
1. 检查路径是否使用绝对路径
2. 确认文件存在且可执行
3. 重启Claude Code

**路径获取**：
```bash
# 获取当前项目绝对路径
pwd
# 输出：/Users/sundanian/my-agent
```

---

*最后更新：2026-02-20*
