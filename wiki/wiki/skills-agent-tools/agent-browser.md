# agent-browser — 浏览器自动化

> Sources: MyAgents, 2026-04-27
> Raw:[SKILL.md](../../raw/skills/agent-browser-SKILL.md); [authentication.md](../../raw/skills/agent-browser-authentication.md); [commands.md](../../raw/skills/agent-browser-commands.md); [profiling.md](../../raw/skills/agent-browser-profiling.md); [proxy-support.md](../../raw/skills/agent-browser-proxy-support.md); [session-management.md](../../raw/skills/agent-browser-session-management.md); [snapshot-refs.md](../../raw/skills/agent-browser-snapshot-refs.md); [video-recording.md](../../raw/skills/agent-browser-video-recording.md)

## 概述

agent-browser 是基于 Playwright 的 CLI 浏览器自动化工具。通过 Chromium 引擎实现网页打开、表单填写、点击交互、截图抓取、数据提取、Web 应用测试等全链路操作。支持桌面端、iOS 模拟器、已有 Chrome 实例连接、云端浏览器代理等多种运行模式。

核心设计理念：**snapshot → ref → interact → re-snapshot**，通过紧凑的可访问性树（accessibility tree）替代完整 DOM，将 token 消耗从 3000-5000 降至 200-400。

## 核心工作流

### 导航 → 快照 → 交互 → 再快照

每个浏览器自动化任务遵循四步模式：

1. **导航**：`agent-browser open <url>`
2. **快照**：`agent-browser snapshot -i`（获取元素 ref，如 `@e1`、`@e2`）
3. **交互**：使用 ref 进行点击、填写、选择
4. **重新快照**：页面导航或 DOM 变化后，必须获取新 ref

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
# 输出: @e1 [input type="email"], @e2 [input type="password"], @e3 [button] "Submit"

agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i  # 检查结果
```

### 命令链式执行

浏览器通过后台 daemon 保持持久化，支持 `&&` 链式调用：

```bash
# 一次性完成：打开 + 等待 + 快照
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser snapshot -i

# 多个交互链式执行
agent-browser fill @e1 "user@example.com" && agent-browser fill @e2 "password123" && agent-browser click @e3
```

**何时链式**：不需要读取中间命令输出时用 `&&`（如 open + wait + screenshot）。需要先解析快照输出发现 ref 再交互时，应分步执行。

## 首次安装

首次使用时需下载 Chromium（约 160MB，一次性）：

```bash
agent-browser install
```

## 核心命令体系

### 导航命令

| 命令 | 用途 |
|------|------|
| `agent-browser open <url>` | 打开页面（别名：goto、navigate，自动补 https://） |
| `agent-browser back / forward` | 后退/前进 |
| `agent-browser reload` | 刷新页面 |
| `agent-browser close` | 关闭浏览器（别名：quit、exit） |
| `agent-browser connect 9222` | 通过 CDP 端口连接已有浏览器 |

### 快照命令

| 命令 | 用途 |
|------|------|
| `agent-browser snapshot -i` | 仅交互元素（推荐，200-400 tokens） |
| `agent-browser snapshot -i -C` | 包含 cursor:pointer 等可点击 div |
| `agent-browser snapshot -s "#selector"` | 限定 CSS 选择器范围 |
| `agent-browser snapshot -d 3` | 限制深度为 3 |
| `agent-browser snapshot -c` | 紧凑输出 |

### 交互命令

| 命令 | 用途 |
|------|------|
| `agent-browser click @e1` | 点击元素 |
| `agent-browser click @e1 --new-tab` | 新标签页打开 |
| `agent-browser fill @e2 "text"` | 清空后输入 |
| `agent-browser type @e2 "text"` | 不清空直接输入 |
| `agent-browser select @e1 "option"` | 下拉选项选择 |
| `agent-browser check @e1 / uncheck @e1` | 勾选/取消复选框 |
| `agent-browser press Enter` | 按键（支持组合键如 Control+a） |
| `agent-browser scroll down 500` | 滚动页面（默认 down 300px） |
| `agent-browser hover @e1` | 悬停 |
| `agent-browser drag @e1 @e2` | 拖拽 |
| `agent-browser upload @e1 file.pdf` | 文件上传 |

### 信息获取命令

| 命令 | 用途 |
|------|------|
| `agent-browser get text @e1` | 元素文本 |
| `agent-browser get html @e1` | 内部 HTML |
| `agent-browser get value @e1` | 输入框值 |
| `agent-browser get attr @e1 href` | 属性值 |
| `agent-browser get url / title` | 当前 URL / 标题 |
| `agent-browser get count ".item"` | 匹配元素计数 |
| `agent-browser get box @e1` | 边界框坐标 |
| `agent-browser get styles @e1` | 计算样式（字体、颜色、背景等） |

### 等待命令

| 命令 | 用途 |
|------|------|
| `agent-browser wait @e1` | 等待元素出现 |
| `agent-browser wait --load networkidle` | 等待网络空闲（慢页面首选） |
| `agent-browser wait --url "**/dashboard"` | 等待 URL 模式匹配 |
| `agent-browser wait --text "Success"` | 等待特定文本出现 |
| `agent-browser wait --fn "document.readyState === 'complete'"` | 等待 JS 条件成立 |
| `agent-browser wait 5000` | 固定毫秒等待（最后手段） |

默认超时 25 秒，可通过 `AGENT_BROWSER_DEFAULT_TIMEOUT` 环境变量自定义。

### 截图与 PDF

| 命令 | 用途 |
|------|------|
| `agent-browser screenshot` | 截图到临时目录 |
| `agent-browser screenshot path.png` | 指定路径保存 |
| `agent-browser screenshot --full` | 全页截图 |
| `agent-browser screenshot --annotate` | 带编号标注的截图（每个标签 `[N]` 对应 ref `@eN`） |
| `agent-browser pdf output.pdf` | 保存为 PDF |

标注截图适用于：图标按钮、视觉布局验证、Canvas/图表元素、空间位置推理。标注后会缓存 ref，可立即交互无需再次快照。

### 下载管理

```bash
agent-browser download @e1 ./file.pdf              # 点击触发下载
agent-browser wait --download ./output.zip         # 等待下载完成
agent-browser --download-path ./downloads open URL # 设置默认下载目录
```

### Diff 验证

用于验证操作是否生效，对比页面状态变化：

```bash
agent-browser snapshot -i          # 基线快照
agent-browser click @e2            # 执行操作
agent-browser diff snapshot        # 查看变化（+ 表示新增，- 表示删除）
```

支持截图像素级对比和 URL 对比：

```bash
agent-browser diff screenshot --baseline baseline.png      # 视觉差异对比
agent-browser diff url https://staging.example.com https://prod.example.com  # 环境对比
```

### JavaScript 执行

```bash
agent-browser eval 'document.title'                    # 简单表达式
agent-browser eval --stdin <<'EVALEOF'                 # 复杂 JS（推荐）
JSON.stringify(Array.from(document.querySelectorAll("img")))
EVALEOF
agent-browser eval -b "$(echo -n '...' | base64)"     # base64 编码避免 shell 转义
```

**关键规则**：单行无嵌套引号用单引号；嵌套引号/箭头函数/模板字符串/多行脚本用 `--stdin`；程序化生成的脚本用 `-b` base64。

### 语义定位器（ref 不可用时的替代方案）

```bash
agent-browser find text "Sign In" click
agent-browser find label "Email" fill "user@test.com"
agent-browser find role button click --name "Submit"
agent-browser find testid "submit-btn" click
```

### 浏览器设置

```bash
agent-browser set viewport 1920 1080          # 视口大小
agent-browser set device "iPhone 14"          # 设备模拟
agent-browser set geo 37.7749 -122.4194       # 地理位置
agent-browser set offline on                  # 离线模式
agent-browser set headers '{"X-Key":"v"}'     # 额外 HTTP 头
agent-browser set credentials user pass       # HTTP Basic 认证
agent-browser set media dark                  # 暗色模式
```

### Cookie 与存储

```bash
agent-browser cookies                     # 查看所有 cookie
agent-browser cookies set name value      # 设置 cookie
agent-browser cookies clear               # 清除 cookie
agent-browser storage local               # 查看 localStorage
agent-browser storage local set k v       # 设置 localStorage
```

### 网络拦截

```bash
agent-browser network route <url> --abort      # 阻止请求
agent-browser network route <url> --body '{}'  # Mock 响应
agent-browser network requests                 # 查看追踪的请求
agent-browser network requests --filter api    # 过滤请求
```

### Tab 和 Frame 管理

```bash
agent-browser tab                    # 列出标签页
agent-browser tab new [url]          # 新标签页
agent-browser tab 2                  # 切换到第 2 个标签页
agent-browser tab close              # 关闭当前标签页
agent-browser frame "#iframe"        # 切换到 iframe
agent-browser frame main             # 回到主 frame
```

## Ref 生命周期

**核心规则**：ref（`@e1`、`@e2` 等）在页面变化后立即失效，必须重新快照。

以下场景必须重新快照：
- 点击导航链接或跳转按钮
- 表单提交
- 动态内容加载（下拉菜单、模态框、懒加载）

```bash
agent-browser click @e5              # 导航到新页面
agent-browser snapshot -i            # 必须重新快照
agent-browser click @e1              # 使用新 ref
```

### Ref 表示法

```
@e1 [tag type="value"] "text content" placeholder="hint"
│    │   │             │               │
│    │   │             │               └─ 附加属性
│    │   │             └─ 可见文本
│    │   └─ 关键属性
│    └─ HTML 标签名
└─ 唯一 ref ID
```

## 认证模式

### Auth Vault（推荐）

加密保存凭证，LLM 不接触密码：

```bash
# 保存凭证（通过 stdin 管道避免 shell 历史暴露）
echo "pass" | agent-browser auth save github --url https://github.com/login --username user --password-stdin

# 使用保存的配置文件登录
agent-browser auth login github

# 管理配置文件
agent-browser auth list
agent-browser auth show github
agent-browser auth delete github
```

加密密钥由 `AGENT_BROWSER_ENCRYPTION_KEY` 环境变量控制。

### 状态持久化

手动登录一次，保存状态后复用：

```bash
# 首次登录
agent-browser open https://app.example.com/login
agent-browser fill @e1 "$USERNAME"
agent-browser fill @e2 "$PASSWORD"
agent-browser click @e3
agent-browser wait --url "**/dashboard"
agent-browser state save auth.json

# 后续会话直接加载
agent-browser state load auth.json
agent-browser open https://app.example.com/dashboard
```

状态文件包含 cookies、localStorage、sessionStorage、origins。

### OAuth/SSO 流程

自动处理 OAuth 重定向：

```bash
agent-browser open https://app.example.com/auth/google
agent-browser wait --url "**/accounts.google.com**"
agent-browser snapshot -i
agent-browser fill @e1 "user@gmail.com"
agent-browser click @e2
agent-browser wait --url "**/app.example.com**"
agent-browser state save ./oauth-state.json
```

### 2FA 处理

需要人工介入时，用 `--headed` 显示浏览器窗口：

```bash
agent-browser open https://app.example.com/login --headed
agent-browser fill @e1 "user"
agent-browser fill @e2 "pass"
agent-browser click @e3
echo "请在浏览器窗口中完成 2FA..."
agent-browser wait --url "**/dashboard" --timeout 120000
agent-browser state save ./2fa-state.json
```

## 会话管理

### 命名会话

每个会话独立 cookies、localStorage、IndexedDB、缓存、历史、标签页：

```bash
agent-browser --session site1 open https://site-a.com
agent-browser --session site2 open https://site-b.com
agent-browser session list
```

### 加密会话

```bash
export AGENT_BROWSER_ENCRYPTION_KEY=$(openssl rand -hex 32)
agent-browser --session secure open https://app.example.com
```

### 会话清理

```bash
agent-browser state list
agent-browser state show myapp-default.json
agent-browser state clear myapp
agent-browser state clean --older-than 7
```

未正常关闭时，daemon 可能仍在运行，用 `agent-browser close` 清理。

### 并行会话模式

并发抓取时，每个 agent 使用独立命名会话避免冲突。

## 代理支持

### 基本配置

```bash
# CLI 方式
agent-browser --proxy "http://proxy.example.com:8080" open https://example.com

# 环境变量方式
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
agent-browser open https://example.com
```

### 认证代理

```bash
export HTTP_PROXY="http://username:password@proxy.example.com:8080"
```

### SOCKS 代理

```bash
export ALL_PROXY="socks5://user:pass@proxy.example.com:1080"
```

### 代理绕过

```bash
agent-browser --proxy "http://proxy:8080" --proxy-bypass "localhost,*.internal.com" open URL
export NO_PROXY="localhost,127.0.0.1,.internal.company.com"
```

### 典型场景

- **地理位置测试**：循环切换不同地区代理，截图对比
- **旋转代理抓取**：多代理轮换避免频率限制
- **企业网络访问**：内网直连、外网走代理

## 性能分析（Profiling）

### 基本用法

```bash
agent-browser profiler start
agent-browser open https://app.example.com
agent-browser wait --load networkidle
agent-browser profiler stop ./trace.json
```

### Trace 类别

默认包含：`devtools.timeline`、`v8.execute`、`blink`、`blink.user_timing`、`latencyInfo`、`renderer.scheduler`、`toplevel`，以及多个 `disabled-by-default-*` 详细类别。

自定义类别：

```bash
agent-browser profiler start --categories "devtools.timeline,v8.execute,blink.user_timing"
```

### 查看分析结果

输出为 Chrome Trace Event 格式 JSON，可用以下工具查看：
- Chrome DevTools Performance 面板
- Perfetto UI（ui.perfetto.dev）
- chrome://tracing

仅支持 Chromium 系浏览器，追踪数据内存上限 500 万事件。

## 视频录制

```bash
agent-browser record start ./demo.webm
# 执行操作...
agent-browser record stop
agent-browser record restart ./take2.webm  # 停止当前并开始新录制
```

输出格式：WebM（VP8/VP9），兼容所有现代浏览器。适用于调试失败自动化、文档生成、CI/CD 测试证据。

## 安全特性

所有安全特性均为可选（opt-in），默认无限制。

### 内容边界

```bash
export AGENT_BROWSER_CONTENT_BOUNDARIES=1
```

用标记包裹页面来源输出，帮助 LLM 区分工具输出和不可信页面内容。

### 域名白名单

```bash
export AGENT_BROWSER_ALLOWED_DOMAINS="example.com,*.example.com"
```

限制导航到可信域名，通配符 `*.example.com` 同时匹配裸域。子资源请求、WebSocket、EventSource 也会被阻止。

### 操作策略

```bash
export AGENT_BROWSER_ACTION_POLICY=./policy.json
```

通过策略文件控制哪些操作允许执行：

```json
{"default": "deny", "allow": ["navigate", "snapshot", "click", "scroll", "wait", "get"]}
```

Auth Vault 操作绕过策略，但域名白名单仍然生效。

### 输出限制

```bash
export AGENT_BROWSER_MAX_OUTPUT=50000
```

防止大页面导致的上下文溢出。

## 反检测配置

默认反检测配置存储在 `~/.agent-browser/config.json`，包括：headed 模式、隐藏 `navigator.webdriver`、真实窗口大小/UA、持久化浏览器配置文件。

持久化登录：浏览器配置文件位于 `~/.playwright-mcp-profile/`，跨会话保留 cookies/localStorage。

**MyAgents 管理注意**：`~/.agent-browser/config.json` 带 `"_managed_by": "myagents"` 时，每次 app 启动会自动重新生成。要持久化修改，必须先删除 `_managed_by` 字段。`args` 字段按逗号和换行分割——避免含逗号的参数。

配置优先级：`~/.agent-browser/config.json` < `./agent-browser.json` < 环境变量 < CLI 标志。

## 暗色模式

```bash
agent-browser --color-scheme dark open https://example.com
AGENT_BROWSER_COLOR_SCHEME=dark agent-browser open https://example.com
agent-browser set media dark  # 会话中设置（持久化到后续命令）
```

## 可视化浏览器（调试用）

```bash
agent-browser --headed open https://example.com
agent-browser highlight @e1          # 高亮元素
agent-browser record start demo.webm # 录制
agent-browser profiler start         # Chrome DevTools 分析
```

## 本地文件

```bash
agent-browser --allow-file-access open file:///path/to/document.pdf
agent-browser --allow-file-access open file:///path/to/page.html
```

## iOS 模拟器（Mobile Safari）

```bash
agent-browser device list                           # 列出可用模拟器
agent-browser -p ios --device "iPhone 16 Pro" open URL  # 启动 Safari
agent-browser -p ios snapshot -i                    # 快照
agent-browser -p ios tap @e1                        # 点击（click 别名）
agent-browser -p ios swipe up                       # 滑动手势
agent-browser -p ios screenshot mobile.png          # 截图
agent-browser -p ios close                          # 关闭会话
```

要求：macOS + Xcode + Appium（`npm install -g appium && appium driver install xcuitest`）。也支持物理 iOS 设备，需预先配置。

## 连接已有 Chrome

```bash
agent-browser --auto-connect open https://example.com  # 自动发现
agent-browser --cdp 9222 snapshot                       # 指定 CDP 端口
```

## 全局选项

```bash
agent-browser --session <name>   # 隔离会话
agent-browser --json             # JSON 输出
agent-browser --headed           # 显示窗口
agent-browser --cdp <port>       # CDP 连接
agent-browser -p <provider>      # 云端浏览器代理
agent-browser --proxy <url>      # 代理
agent-browser --extension <path> # 加载扩展
agent-browser --ignore-https-errors  # 忽略 SSL 错误
```

### 环境变量速查

| 变量 | 用途 |
|------|------|
| `AGENT_BROWSER_SESSION` | 默认会话名 |
| `AGENT_BROWSER_EXECUTABLE_PATH` | 自定义浏览器路径 |
| `AGENT_BROWSER_EXTENSIONS` | 扩展路径（逗号分隔） |
| `AGENT_BROWSER_PROVIDER` | 云端浏览器代理 |
| `AGENT_BROWSER_STREAM_PORT` | WebSocket 流端口 |
| `AGENT_BROWSER_DEFAULT_TIMEOUT` | 默认超时（毫秒） |
| `AGENT_BROWSER_MAX_OUTPUT` | 最大输出限制 |
| `AGENT_BROWSER_CONTENT_BOUNDARIES` | 启用内容边界 |
| `AGENT_BROWSER_ALLOWED_DOMAINS` | 域名白名单 |
| `AGENT_BROWSER_ACTION_POLICY` | 操作策略文件路径 |
| `AGENT_BROWSER_ENCRYPTION_KEY` | 加密密钥 |
