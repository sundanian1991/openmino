#!/bin/bash
# Safari Browser Operations
# Part of claude-for-browsers skill

# List all tabs in Safari
safari_list_tabs() {
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
}

# Get current tab URL
safari_get_url() {
  osascript -e 'tell application "Safari" to get URL of current tab of front window' 2>/dev/null
}

# Get current tab title
safari_get_title() {
  osascript -e 'tell application "Safari" to get name of current tab of front window' 2>/dev/null
}

# Read page content
safari_read_page() {
  local max_length=${1:-10000}
  osascript -e "
tell application \"Safari\"
  do JavaScript \"document.body.innerText.substring(0, $max_length)\" in current tab of front window
end tell"
}

# Execute JavaScript
safari_exec_js() {
  local js_code="$1"
  osascript -e "tell application \"Safari\" to do JavaScript \"$js_code\" in current tab of front window"
}

# Navigate to URL
safari_navigate() {
  local url="$1"
  osascript -e "tell application \"Safari\" to set URL of current tab of front window to \"$url\""
}

# Open URL in new tab
safari_new_tab() {
  local url="$1"
  osascript -e "
tell application \"Safari\"
  tell front window
    set newTab to make new tab with properties {URL:\"$url\"}
    set current tab to newTab
  end tell
end tell"
}

# Switch to tab by index
safari_switch_tab() {
  local tab_index=$1
  osascript -e "tell application \"Safari\" to set current tab of front window to tab $tab_index of front window"
}

# Take screenshot
safari_screenshot() {
  local output_path="${1:-/tmp/safari_screenshot.png}"

  # Check if screen recording permission is available
  if [ -f /tmp/safari_wid ]; then
    # Background screenshot
    local WID=$(/tmp/safari_wid)
    screencapture -l "$WID" -x "$output_path"
  else
    # Foreground screenshot
    local FRONT_APP=$(osascript -e 'tell application "System Events" to get name of first process whose frontmost is true')
    osascript -e 'tell application "Safari" to activate'
    sleep 0.3

    # Get window bounds
    local BOUNDS=$(osascript -e '
tell application "System Events"
  tell process "Safari"
    set bestW to 0
    set bestBounds to ""
    repeat with i from 1 to (count of windows)
      set {x, y} to position of window i
      set {w, h} to size of window i
      if w * h > bestW then
        set bestW to w * h
        set bestBounds to (x as text) & "," & (y as text) & "," & (w as text) & "," & (h as text)
      end if
    end repeat
    return bestBounds
  end tell
end tell')

    screencapture -x -R "$BOUNDS" "$output_path"
    osascript -e "tell application \"$FRONT_APP\" to activate"
  fi

  echo "$output_path"
}

# Click element (via JS)
safari_click() {
  local selector="$1"
  osascript -e "
tell application \"Safari\"
  do JavaScript \"
    const el = document.querySelector('$selector');
    if (el) {
      el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
      'clicked';
    } else {
      'element not found';
    }
  \" in current tab of front window
end tell"
}

# Fill input
safari_fill() {
  local selector="$1"
  local value="$2"
  osascript -e "
tell application \"Safari\"
  do JavaScript \"
    const input = document.querySelector('$selector');
    if (input) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call(input, '$value');
      input.dispatchEvent(new Event('input', {bubbles: true}));
      input.dispatchEvent(new Event('change', {bubbles: true}));
      'filled';
    } else {
      'element not found';
    }
  \" in current tab of front window
end tell"
}

# Scroll page
safari_scroll() {
  local direction=${1:-down}
  local amount=${2:-500}

  case "$direction" in
    down)
      osascript -e "tell application \"Safari\" to do JavaScript \"window.scrollBy(0, $amount)\" in current tab of front window"
      ;;
    up)
      osascript -e "tell application \"Safari\" to do JavaScript \"window.scrollBy(0, -$amount)\" in current tab of front window"
      ;;
    top)
      osascript -e "tell application \"Safari\" to do JavaScript \"window.scrollTo(0, 0)\" in current tab of front window"
      ;;
    bottom)
      osascript -e "tell application \"Safari\" to do JavaScript \"window.scrollTo(0, document.body.scrollHeight)\" in current tab of front window"
      ;;
  esac
}

# Wait for page load
safari_wait_load() {
  local timeout=${1:-10}
  local elapsed=0
  local interval=0.5

  while [ $elapsed -lt $timeout ]; do
    local ready=$(osascript -e 'tell application "Safari" to do JavaScript "document.readyState" in current tab of front window' 2>/dev/null)
    if [ "$ready" == "complete" ]; then
      return 0
    fi
    sleep $interval
    elapsed=$(echo "$elapsed + $interval" | bc)
  done

  return 1
}
