# 技能搜索规范

**技能市场**：[claw123.ai](https://claw123.ai) — OpenClaw 精选技能导航站（5000+ 技能）

**搜索方法**：

> curl -s https://claw123.ai/api/skills.zh.json

**字段说明**：`name`（技能名）、`description_zh`（中文描述）、`category_zh`（分类）、`url`（SKILL.md 源地址）

**安装流程**：
1. 需要某功能时 → 先 curl 搜索技能列表
2. 推荐最匹配的 1-3 个 → 确认后再安装
3. fetch `url` 获取 SKILL.md → 按说明复制到 `.claude/skills/`
4. **按需安装，不批量装**
