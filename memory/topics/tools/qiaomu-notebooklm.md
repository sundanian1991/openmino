# qiaomu-anything-to-notebooklm 技能

> 多源内容（微信/网页/YouTube/播客/PDF等）→ NotebookLM 生成播客/PPT/思维导图/深度分析。2026-07-29 补全并配置打通。

## 仓库与位置

- **上游**：`github.com/joeseesun/qiaomu-anything-to-notebooklm`
- **本地两处**：项目内 `skills/qiaomu-anything-to-notebooklm/` + 全局 `~/.claude/skills/qiaomu-anything-to-notebooklm/`（都补齐）
- **软链**：`skills/qiaomu-anything-to-notebooklm → ~/.agents/skills/qiaomu-anything-to-notebooklm`
- **注册**：2026-07-29 补入 `skills-lock.json`，技能系统内可用
- **关键**：`wexin-read-mcp/` 是外部仓库 `Bwkyd/wexin-read-mcp`，install.sh 检测到目录存在就跳过克隆——本地曾因此留下两个 0 字节空壳（requirements.txt + src/server.py）。修复方式：从 Bwkyd 重新克隆真实源码替换空壳

## 运行时配置（2026-07-29 打通）

| 组件 | 状态 | 说明 |
|---|---|---|
| notebooklm CLI | ✅ | pipx 装 notebooklm-py 0.8.0rc1（**不用 pip3**，撞 PEP 668）|
| notebooklm 登录 | ✅ | `notebooklm login --browser chrome`，token 存 `~/.notebooklm/profiles/default/storage_state.json` |
| playwright | ✅ | `pipx inject notebooklm-py playwright`（pipx 隔离环境缺这个）|
| Playwright Chromium | ✅ | 微信抓取 weixin-reader MCP 用 |
| weixin-reader MCP | ⚠️ 待重启 | 已写入 `~/.claude.json` mcpServers，command=`/opt/homebrew/bin/python3`，需重启 Claude Code 生效 |
| markitdown | ✅ | Homebrew 已装 |
| feishu-read-mcp | ✅ 文件就位 | 未配进 MCP，深度分析+飞书才用 |
| rookiepy | ❌ 装不上 | Python 3.14.6 太新无 wheel，cookies 复用方案弃用 |

## 关键经验

### notebooklm CLI 用法
- `notebooklm create "标题"` → 建笔记本返回 ID
- `notebooklm use <id>` → 切换上下文（source add 前必须 use）
- `notebooklm source add <file> --title "..."` → 上传源。**`/tmp` 是 symlink，notebooklm 拒绝跟**，要写到 `/private/tmp` 真实路径，或加 `--follow-symlinks`
- `notebooklm ask "问题"` → 提问，**自动维持会话上下文**（返回 `Continuing conversation <id>`），三轮递进提问设计成立
- `notebooklm login --browser chrome` → macOS 15+ 用系统 Chrome 比 bundled chromium 稳

### 深度分析模式（12问3轮递进）
- main.py 的 `deep_analysis()` 会**重复建笔记本**，复用已有笔记本时手动复刻提问循环更干净（问题模板见 main.py `generate_questions_progressive`）
- 三轮：概览与框架(4问) → 深度挖掘(5问) → 综合与反刍(3问)
- 每问约16-20秒，12问约6分钟
- 源脚本：`/private/tmp/deep_analysis.py`（复刻版，复用已建笔记本）

### 微信文章抓取链路（重要）
- **fetch_url.sh 6 层绕过对微信全失效**：r.jina.ai 空返回、Googlebot UA 显示"该页面不存在"、archive.today 撞 CAPTCHA
- **curl 直接抓也不行**：微信靠 JS 渲染，不渲染连 title 都空
- **可靠替代：getnote MCP**：`save_note(link_url)` → 轮询 `get_note_task_progress` → `get_note`。后台浏览器渲染绕过反爬
- **注意**：getnote 返回的是 AI 总结（非原文逐字），质量高但不是原文。`web_page.content` 字段对微信也为空
- **NoteID 大整数精度**：getnote 的 note_id 超 2^53（如 `1916290665173123992`），直接传参会被取整丢失精度。绕过：用 `list_notes` 接口取最新笔记

### pipx + Homebrew Python 经验
- Homebrew Python 禁直接 `pip3 install`（PEP 668 "externally-managed-environment"）
- CLI 工具用 `pipx install`，隔离环境
- pipx 装的 CLI 缺可选依赖时（如 notebooklm 缺 playwright），用 `pipx inject <pkg> <dep>` 注入，不要 `pip3 install`
- `pipx ensurepath` 把 `~/.local/bin` 加进 PATH，需重开终端生效

## 未完成 / 下一步

- [ ] 重启 Claude Code 加载 weixin-reader MCP（重启后微信公众号本地抓取可用，不消耗 getnote 配额）
- [ ] 验证 weixin-reader MCP 实际抓取效果（vs getnote 后台渲染）
- [ ] feishu-read-mcp 若要用深度分析+飞书，需配进 ~/.claude.json + 装 lark-cli

## Session 更新记录

| 日期 | 更新 |
|------|------|
| 2026-07-29 | 补全+配置打通：仓库文件补齐、notebooklm CLI 装好登录、weixin-reader MCP 配置写入、12问深度分析跑通

## 链路验证记录（2026-07-29）

完整跑通：微信文章 → getnote 抓取 → notebooklm 上传 → 12问深度分析 → markdown
- 测试文：《职场能力跃迁指南：从积累经验到搭建可复用的判断模型》
- 产物：`workspace/职场跃迁指南_深度分析.md`（12418字）
- 深度分析增量价值集中在 Q7（矛盾分析）/ Q9（最尖锐批评）/ Q11（行动指南）
