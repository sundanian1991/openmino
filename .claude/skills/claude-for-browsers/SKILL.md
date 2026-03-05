---
name: claude-for-browsers
description: Control user's real browsers (Safari/Tabbit/Chrome) on macOS with preserved login state. Supports Safari via AppleScript, Tabbit/Chrome via CDP connection. Use when user needs to interact with their actual browser, operate on logged-in pages, or automate tasks with existing sessions.
---

# Claude for Browsers

Control user's real browsers on macOS with preserved login state and cookies. No extensions, no separate browser instances — just direct control of what you're already using.

## Supported Browsers

| Browser | Method | Login State | Status |
|---------|--------|-------------|--------|
| **Safari** | AppleScript | ✅ Preserved | ✅ Implemented |
| **Tabbit** | CDP (Chromium) | ✅ Preserved | ✅ Implemented |
| **Chrome** | CDP (Chromium) | ✅ Preserved | ✅ Implemented |

## Quick Start

```bash
# Install
npm skills add .claude/skills/claude-for-browsers

# Then in Claude Code
claude
> "show me what tabs are open in my browser"
> "take a screenshot of the current page"
> "click the submit button"
```

## How It Works

```
Claude Code ──► detect() ──► Safari (AppleScript)
                    │
                    ├──► Tabbit (CDP)
                    │
                    └──► Chrome (CDP)
```

**Core Principle**: Connect to your existing browser, not launch a new one. Your login state, cookies, sessions — everything stays.

---

## Browser Detection

Auto-detect which browser the user is currently using:

```bash
# Check which browsers are running
pgrep -l "Safari" >/dev/null && echo "Safari running"
pgrep -l "Tabbit" >/dev/null && echo "Tabbit running"
pgrep -l "Chrome" >/dev/null && echo "Chrome running"

# Get frontmost browser
FRONT_APP=$(osascript -e 'tell application "System Events" to get name of first process whose frontmost is true')
echo "$FRONT_APP" | grep -i -E "safari|tabbit|chrome" && echo "Browser detected"
```

---

## Safari Operations (AppleScript)

### List Tabs

```bash
osascript -e '
tell application "Safari"
  set output to ""
  repeat with w from 1 to (count of windows)
    repeat with t from 1 to (count of tabs of window w)
      set tabName to name of tab t of window w
      set tabURL to URL of tab t of window w
      set output to output & "W" & w & "T" & t & " | " & tabName & " | " & tabURL & linefeed
    end repeat
  end repeat
  return output
end tell'
```

### Read Page Content

```bash
osascript -e '
tell application "Safari"
  do JavaScript "document.body.innerText" in current tab of front window
end tell'
```

### Screenshot

```bash
# Background (requires Screen Recording permission)
screencapture -l "$(/tmp/safari_wid)" -x /tmp/safari_screenshot.png

# Or foreground (no extra permission)
FRONT_APP=$(osascript -e 'tell application "System Events" to get name of first process whose frontmost is true')
osascript -e 'tell application "Safari" to activate'
sleep 0.3
screencapture -x /tmp/safari_screenshot.png
osascript -e "tell application \"$FRONT_APP\" to activate"
```

---

## Chromium Browsers (Tabbit/Chrome) via CDP

### Start Browser with Remote Debugging

**Important**: Browser must be launched with remote debugging enabled:

```bash
# For Tabbit
/Applications/Tabbit\ Browser.app/Contents/MacOS/Tabbit\ Browser --remote-debugging-port=9222

# For Chrome
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

Or create an alias in `~/.zshrc`:

```bash
alias tabbit-debug='open -a "Tabbit Browser" --args --remote-debugging-port=9222'
alias chrome-debug='open -a "Google Chrome" --args --remote-debugging-port=9222'
```

### Connect via CDP

```javascript
// Using puppeteer-core
const puppeteer = require('puppeteer-core');

async function connectToBrowser() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222'
  });

  const pages = await browser.pages();
  const targetPage = pages.find(p => p.url().includes('github.com'));

  if (targetPage) {
    await targetPage.bringToFront();
    const title = await targetPage.title();
    const url = targetPage.url();
    return { title, url };
  }
}

// Or using Playwright
const { chromium } = require('playwright');

async function connectWithPlaywright() {
  const browser = await chromium.connect('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0];

  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
}
```

### List Tabs via CDP

```bash
# Get list of all pages via CDP
curl http://localhost:9222/json/list | jq '.[] | {url: .url, title: .title}'
```

### Execute JavaScript

```bash
# Using CDP WebSocket
wscat -c ws://localhost:9222/devtools/page/ABC123 << 'EOF'
{"id": 1, "method": "Runtime.evaluate", "params": {"expression": "document.title"}}
EOF
```

---

## Unified Command Interface

### getTabs(browser)

```bash
get_tabs() {
  local browser=$1
  case "$browser" in
    safari)
      osascript -e 'tell application "Safari" to get URL of every tab of every window'
      ;;
    tabbit|chrome)
      curl -s http://localhost:9222/json/list | jq -r '.[] | .url'
      ;;
  esac
}
```

### screenshot(browser)

```bash
screenshot() {
  local browser=$1
  local output=$2

  case "$browser" in
    safari)
      # Safari screenshot implementation
      ;;
    tabbit|chrome)
      # CDP screenshot via puppeteer/playwright
      ;;
  esac
}
```

---

## First-Time Setup

### Safari

1. **System Settings > Privacy & Security > Automation** — Allow terminal to control Safari
2. **Safari > Settings > Advanced** — Enable "Show features for web developers"
3. **Safari > Develop menu** — Check "Allow JavaScript from Apple Events"

### Tabbit/Chrome

1. Quit browser completely
2. Launch with remote debugging:
   ```bash
   open -a "Tabbit Browser" --args --remote-debugging-port=9222
   # or
   open -a "Google Chrome" --args --remote-debugging-port=9222
   ```
3. Keep browser running in background

---

## Troubleshooting

### Safari: "execution error: invalid index"

**Cause**: Safari has no open windows or automation permission not granted.

**Fix**:
1. Open at least one Safari window
2. Grant automation permission in System Settings

### Tabbit/Chrome: "Connection refused"

**Cause**: Browser not running or remote debugging not enabled.

**Fix**:
```bash
# Check if port 9222 is listening
lsof -i :9222

# If not, launch browser with debugging
open -a "Tabbit Browser" --args --remote-debugging-port=9222
```

### Multiple Browsers Running

The system auto-detects the frontmost browser. To specify a browser:

```bash
# Explicitly use Safari
BROWSER=safari [command]

# Explicitly use Tabbit
BROWSER=tabbit [command]
```

---

## Implementation Notes

### Why puppeteer-core?

- `puppeteer` includes bundled Chromium (not what we want)
- `puppeteer-core` is the library only — connects to existing browsers
- Perfect for "use what's already open" use case

### Why CDP port 9222?

- Default Chrome DevTools Protocol port
- Can be customized with `--remote-debugging-port=XXXX`
- Multiple browsers need different ports

---

*Last updated: 2026-03-06*
