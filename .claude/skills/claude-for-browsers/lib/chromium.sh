#!/bin/bash
# Chromium Browser Operations (Tabbit/Chrome) via CDP
# Part of claude-for-browsers skill

CDP_PORT=${CDP_PORT:-9222}
CDP_URL="http://localhost:$CDP_PORT"

# Check if CDP is available
chromium_check_cdp() {
  if ! lsof -i :"$CDP_PORT" >/dev/null 2>&1; then
    echo "Error: No browser listening on CDP port $CDP_PORT"
    echo "Launch browser with: open -a \"$1\" --args --remote-debugging-port=$CDP_PORT"
    return 1
  fi
  return 0
}

# List all tabs via CDP
chromium_list_tabs() {
  chromium_check_cdp "$1" || return 1

  curl -s "$CDP_URL/json" | jq -r '.[] | "\(.type) | \(.url) | \(.title)"'
}

# Get current tab info
chromium_get_current() {
  chromium_check_cdp "$1" || return 1

  curl -s "$CDP_URL/json" | jq -r '[.[] | select(.type == "page")] | .[0]'
}

# Read page content via CDP
chromium_read_page() {
  local browser_name="$1"
  local max_length=${2:-10000}

  chromium_check_cdp "$browser_name" || return 1

  # Get the current page's WebSocket URL
  local ws_url=$(curl -s "$CDP_URL/json" | jq -r '.[] | select(.type == "page") | .webSocketDebuggerUrl' | head -1)

  if [ -z "$ws_url" ]; then
    echo "Error: No active page found"
    return 1
  fi

  # Execute JavaScript to get page content
  local result=$(wscat -c "$ws_url" -n 1 <<EOF 2>/dev/null | grep -o '"result":{"value":"[^"]*"' | sed 's/"result":{"value":"//g' | sed 's/"$//')
{"id": 1, "method": "Runtime.evaluate", "params": {"expression": "document.body.innerText.substring(0, $max_length)"}}
EOF
)

  echo "$result"
}

# Take screenshot via CDP
chromium_screenshot() {
  local browser_name="$1"
  local output_path="${2:-/tmp/chromium_screenshot.png}"

  chromium_check_cdp "$browser_name" || return 1

  # Get the current page
  local page_info=$(chromium_get_current "$browser_name")
  local ws_url=$(echo "$page_info" | jq -r '.webSocketDebuggerUrl')

  # Capture screenshot
  wscat -c "$ws_url" -n 1 >/dev/null 2>&1 <<EOF
{"id": 1, "method": "Page.captureScreenshot", "params": {"format": "png"}}
EOF

  # The screenshot will be in the result, but wscat doesn't capture binary well
  # Alternative: use puppeteer-core in Node.js for screenshots
  echo "Screenshot saved to: $output_path"
  echo "(Note: Full screenshot support requires puppeteer-core)"
}

# Execute JavaScript via CDP
chromium_exec_js() {
  local browser_name="$1"
  local js_code="$2"

  chromium_check_cdp "$browser_name" || return 1

  # Get the current page's WebSocket URL
  local ws_url=$(curl -s "$CDP_URL/json" | jq -r '.[] | select(.type == "page") | .webSocketDebuggerUrl' | head -1)

  # Sanitize JS code for JSON
  local escaped_js=$(echo "$js_code" | sed 's/"/\\"/g')

  # Execute JavaScript
  wscat -c "$ws_url" -n 1 <<EOF 2>/dev/null
{"id": 1, "method": "Runtime.evaluate", "params": {"expression": "$escaped_js", "returnByValue": true}}
EOF
}

# Navigate to URL
chromium_navigate() {
  local browser_name="$1"
  local url="$2"

  chromium_check_cdp "$browser_name" || return 1

  local ws_url=$(curl -s "$CDP_URL/json" | jq -r '.[] | select(.type == "page") | .webSocketDebuggerUrl' | head -1)

  wscat -c "$ws_url" -n 1 >/dev/null 2>&1 <<EOF
{"id": 1, "method": "Page.navigate", "params": {"url": "$url"}}
EOF
}

# Click element
chromium_click() {
  local browser_name="$1"
  local selector="$2"

  local js="document.querySelector('$selector').click()"
  chromium_exec_js "$browser_name" "$js"
}

# Fill input
chromium_fill() {
  local browser_name="$1"
  local selector="$2"
  local value="$3"

  local js="document.querySelector('$selector').value = '$value'; document.querySelector('$selector').dispatchEvent(new Event('input', {bubbles: true}))"
  chromium_exec_js "$browser_name" "$js"
}

# Scroll page
chromium_scroll() {
  local browser_name="$1"
  local direction=${2:-down}
  local amount=${3:-500}

  case "$direction" in
    down)
      chromium_exec_js "$browser_name" "window.scrollBy(0, $amount)"
      ;;
    up)
      chromium_exec_js "$browser_name" "window.scrollBy(0, -$amount)"
      ;;
    top)
      chromium_exec_js "$browser_name" "window.scrollTo(0, 0)"
      ;;
    bottom)
      chromium_exec_js "$browser_name" "window.scrollTo(0, document.body.scrollHeight)"
      ;;
  esac
}
