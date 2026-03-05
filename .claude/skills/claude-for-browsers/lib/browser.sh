#!/bin/bash
# Unified Browser Interface
# Part of claude-for-browsers skill

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/browser-detect.sh"
source "$SCRIPT_DIR/safari.sh"
source "$SCRIPT_DIR/chromium.sh"

# Auto-detect and use the frontmost browser
: "${BROWSER:=$(get_frontmost_browser)}"

# List tabs in the current browser
list_tabs() {
  local browser="${1:-$BROWSER}"

  case "$browser" in
    safari)
      safari_list_tabs
      ;;
    tabbit|chrome)
      chromium_list_tabs "$browser"
      ;;
    *)
      echo "Error: Unsupported browser '$browser'"
      return 1
      ;;
  esac
}

# Get current page URL
get_url() {
  local browser="${1:-$BROWSER}"

  case "$browser" in
    safari)
      safari_get_url
      ;;
    tabbit|chrome)
      chromium_get_current "$browser" | jq -r '.url'
      ;;
  esac
}

# Read page content
read_page() {
  local browser="${1:-$BROWSER}"
  local max_length="${2:-10000}"

  case "$browser" in
    safari)
      safari_read_page "$max_length"
      ;;
    tabbit|chrome)
      chromium_read_page "$browser" "$max_length"
      ;;
  esac
}

# Take screenshot
screenshot() {
  local browser="${1:-$BROWSER}"
  local output="${2:-/tmp/browser_screenshot.png}"

  case "$browser" in
    safari)
      safari_screenshot "$output"
      ;;
    tabbit|chrome)
      chromium_screenshot "$browser" "$output"
      ;;
  esac
}

# Navigate to URL
navigate() {
  local browser="${1:-$BROWSER}"
  local url="$2"

  case "$browser" in
    safari)
      safari_navigate "$url"
      ;;
    tabbit|chrome)
      chromium_navigate "$browser" "$url"
      ;;
  esac
}

# Execute JavaScript
exec_js() {
  local browser="${1:-$BROWSER}"
  local js_code="$2"

  case "$browser" in
    safari)
      safari_exec_js "$js_code"
      ;;
    tabbit|chrome)
      chromium_exec_js "$browser" "$js_code"
      ;;
  esac
}

# Click element
click() {
  local browser="${1:-$BROWSER}"
  local selector="$2"

  case "$browser" in
    safari)
      safari_click "$selector"
      ;;
    tabbit|chrome)
      chromium_click "$browser" "$selector"
      ;;
  esac
}

# Fill input
fill() {
  local browser="${1:-$BROWSER}"
  local selector="$2"
  local value="$3"

  case "$browser" in
    safari)
      safari_fill "$selector" "$value"
      ;;
    tabbit|chrome)
      chromium_fill "$browser" "$selector" "$value"
      ;;
  esac
}

# Scroll page
scroll() {
  local browser="${1:-$BROWSER}"
  local direction="$2"
  local amount="${3:-500}"

  case "$browser" in
    safari)
      safari_scroll "$direction" "$amount"
      ;;
    tabbit|chrome)
      chromium_scroll "$browser" "$direction" "$amount"
      ;;
  esac
}

# Main command dispatcher
main() {
  local command="$1"
  shift

  case "$command" in
    list)
      list_tabs "$@"
      ;;
    url)
      get_url "$@"
      ;;
    read)
      read_page "$@"
      ;;
    screenshot)
      screenshot "$@"
      ;;
    navigate)
      navigate "$@"
      ;;
    exec)
      exec_js "$@"
      ;;
    click)
      click "$@"
      ;;
    fill)
      fill "$@"
      ;;
    scroll)
      scroll "$@"
      ;;
    detect)
      get_frontmost_browser
      ;;
    *)
      echo "Usage: $0 {list|url|read|screenshot|navigate|exec|click|fill|scroll|detect} [args...]"
      exit 1
      ;;
  esac
}

main "$@"
