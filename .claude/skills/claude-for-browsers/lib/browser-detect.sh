#!/bin/bash
# Browser Detection and Selection
# Part of claude-for-browsers skill

# Detect running browsers
detect_browsers() {
  local browsers=()

  if pgrep -x "Safari" >/dev/null 2>&1; then
    browsers+=("safari")
  fi

  if pgrep -f "Tabbit Browser" >/dev/null 2>&1; then
    browsers+=("tabbit")
  fi

  if pgrep -f "Google Chrome" >/dev/null 2>&1; then
    browsers+=("chrome")
  fi

  echo "${browsers[@]}"
}

# Get frontmost browser
get_frontmost_browser() {
  local front_app=$(osascript -e 'tell application "System Events" to get name of first process whose frontmost is true' 2>/dev/null)

  case "$front_app" in
    *Safari*)
      echo "safari"
      ;;
    *Tabbit*)
      echo "tabbit"
      ;;
    *Chrome*)
      echo "chrome"
      ;;
    *)
      # Fallback to first available
      local browsers=($(detect_browsers))
      echo "${browsers[0]}"
      ;;
  esac
}

# Check if browser supports CDP (Chromium-based)
is_chromium_browser() {
  local browser=$1
  [[ "$browser" == "tabbit" || "$browser" == "chrome" ]]
}

# Check if CDP is available
check_cdp_available() {
  local browser=$1
  local port=${2:-9222}

  if is_chromium_browser "$browser"; then
    if lsof -i :"$port" >/dev/null 2>&1; then
      return 0
    else
      return 1
    fi
  fi
  return 1
}

# Main detection logic
main() {
  local action=${1:-detect}

  case "$action" in
    detect)
      detect_browsers
      ;;
    frontmost)
      get_frontmost_browser
      ;;
    check-cdp)
      local browser=$2
      check_cdp_available "$browser" && echo "available" || echo "unavailable"
      ;;
    *)
      echo "Usage: $0 {detect|frontmost|check-cdp} [browser]"
      exit 1
      ;;
  esac
}

main "$@"
