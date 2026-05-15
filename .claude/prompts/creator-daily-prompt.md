执行 follow-builders 技能，生成今日 AI Builders 创作者日报。

工作目录：/Users/sundanian/Documents/projects/ai-agents/my-agent
技能路径：.claude/skills/follow-builders/

执行步骤：
1. 读取 .claude/skills/follow-builders/config/default-sources.json 获取跟踪目标列表
2. 读取 .claude/skills/follow-builders/feed-x.json 和 feed-podcasts.json 获取上次抓取状态（lastItemUrl）
3. 读取 .claude/skills/follow-builders/state-feed.json 获取运行状态
4. 用 WebFetch / 搜索工具逐一抓取各来源最新内容（跳过 lastItemUrl 已存在的条目）
5. 用 .claude/skills/follow-builders/prompts/ 下的模板总结内容并翻译为中文
6. 输出格式完整的中文日报
7. 更新 feed-*.json 中的 lastItemUrl 和 state-feed.json 的 lastDigestDate、totalRuns

注意：
- 跳过 active: false 的来源
- 每源最多取 3 条
- 英文内容必须翻译为中文
- 日报输出到 stdout

## 验收标准
- [ ] 所有 active 的来源都被检查了
- [ ] feed-*.json 和 state-feed.json 的状态已更新
- [ ] 日报用中文输出，覆盖至少 3 个分类
- [ ] 没有出现旧数据重复
