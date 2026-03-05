---
input: 无
output: 无
pos: 用户文档
---

# Claude for Browsers

> **统一浏览器控制工具** — Safari + Tabbit + Chrome，保留登录态，零扩展

---

## 核心特性

| 特性 | 说明 |
|------|------|
| **登录态复用** | 直接操作你已打开的浏览器，保留所有登录状态 |
| **多浏览器支持** | Safari (AppleScript) + Tabbit/Chrome (CDP) |
| **无自动化指纹** | 网站看到的是真实用户 |
| **统一接口** | 同样的命令支持所有浏览器 |

---

## 快速开始

### 1. Safari 设置（一次性）

```bash
# 系统设置 → 隐私与安全 → 自动化 → 允许终端控制 Safari
# Safari → 设置 → 高级 → 显示开发菜单
# Safari → 开发 → 允许来自 Apple Events 的 JavaScript
```

### 2. Tabbit/Chrome 设置（使用前）

```bash
# 启动 Tabbit（开启调试端口）
open -a "Tabbit Browser" --args --remote-debugging-port=9222

# 或启动 Chrome
open -a "Google Chrome" --args --remote-debugging-port=9222
```

**建议**：在 `~/.zshrc` 添加别名：

```bash
alias tabbit-debug='open -a "Tabbit Browser" --args --remote-debugging-port=9222'
alias chrome-debug='open -a "Google Chrome" --args --remote-debugging-port=9222'
```

### 3. 使用

```bash
# 测试浏览器检测
./lib/browser-detect.sh detect

# 测试列表标签页
./lib/browser.sh list

# 测试获取当前 URL
./lib/browser.sh url

# 测试截图
./lib/browser.sh screenshot
```

---

## 命令参考

### 浏览器检测

```bash
./lib/browser-detect.sh detect          # 列出所有运行的浏览器
./lib/browser-detect.sh frontmost       # 获取当前最前浏览器
./lib/browser-detect.sh check-cdp tabbit # 检查 CDP 是否可用
```

### 统一接口

```bash
./lib/browser.sh list                  # 列出标签页
./lib/browser.sh url                   # 获取当前 URL
./lib/browser.sh read                  # 读取页面内容
./lib/browser.sh screenshot [path]     # 截图
./lib/browser.sh navigate <url>        # 导航到 URL
./lib/browser.sh exec "<js>"          # 执行 JavaScript
./lib/browser.sh click <selector>      # 点击元素
./lib/browser.sh fill <selector> <val> # 填写表单
./lib/browser.sh scroll <dir> [amt]    # 滚动 (up/down/top/bottom)
```

### 指定浏览器

```bash
BROWSER=safari ./lib/browser.sh list
BROWSER=tabbit ./lib/browser.sh list
BROWSER=chrome ./lib/browser.sh list
```

---

## 架构

```
claude-for-browsers
    ├── lib/
    │   ├── browser-detect.sh    # 浏览器检测
    │   ├── safari.sh            # Safari 操作 (AppleScript)
    │   ├── chromium.sh          # Tabbit/Chrome 操作 (CDP)
    │   └── browser.sh           # 统一接口
    ├── SKILL.md                 # 技能文档
    └── README.md                # 本文件
```

---

## 工作原理

### Safari 流程

```
Claude Code → AppleScript → Safari (真实浏览器)
                       ↓
                  读取/控制/截图
```

### Tabbit/Chrome 流程

```
Claude Code → CDP (WebSocket) → Tabbit/Chrome (真实浏览器)
                   ↓
              读取/控制/截图
```

---

## 故障排除

### Safari：权限错误

**错误**：`execution error: invalid index`

**解决**：
1. 打开至少一个 Safari 窗口
2. 设置 → 隐私与安全 → 自动化 → 允许终端控制 Safari

### Tabbit/Chrome：连接被拒绝

**错误**：`Connection refused` 或 `No browser listening on CDP port`

**解决**：
```bash
# 检查端口是否被占用
lsof -i :9222

# 重新启动浏览器（带调试端口）
open -a "Tabbit Browser" --args --remote-debugging-port=9222
```

### 多浏览器运行

系统自动检测最前的浏览器。可以手动指定：

```bash
BROWSER=safari ./lib/browser.sh screenshot
BROWSER=tabbit ./lib/browser.sh screenshot
```

---

## 与其他工具对比

| 工具 | 登录态 | 浏览器实例 | 指纹检测 |
|------|--------|-----------|---------|
| **Claude for Browsers** | ✅ 保留 | 真实浏览器 | ❌ 无指纹 |
| **agent-browser** | ❌ 需要登录 | 独立 Chromium | ⚠️ 有指纹 |
| **Playwright** | ❌ 需要登录 | 独立 Chromium | ⚠️ 有指纹 |

---

## 下一步

- [ ] 添加更多浏览器支持（Firefox？）
- [ ] 实现 Tabbit/Chrome 的完整截图支持（需要 puppeteer-core）
- [ ] 添加更多交互命令（拖拽、右键等）
- [ ] 封装成 MCP Server

---

*最后更新：2026-03-06*
