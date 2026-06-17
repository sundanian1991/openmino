#!/usr/bin/env bash
set -euo pipefail

# Portable across bash 3.2+ (macOS stock /bin/bash) and bash 4+ (Linux, Homebrew).
# Avoids `declare -A` so the script runs on a fresh macOS without `brew install bash`.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_FONT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)/assets/fonts"

# Download target lives OUTSIDE the skill directory on purpose.
#
# Claude Desktop skill ZIPs exclude the ~36MB TsangerJinKai TTFs. The old code
# downloaded them back into the skill's own assets/fonts, which pushed the
# installed skill past Claude Desktop's size limit ("upload/execution too big").
# We instead drop them in the XDG user font dir, which fontconfig scans by
# default on both macOS (Homebrew) and Linux, yet does NOT show up in macOS
# Font Book. WeasyPrint then resolves "TsangerJinKai02" from here when the
# template's relative @font-face path is absent; online renders still fall back
# to the jsDelivr URL baked alongside each @font-face declaration.
FONT_DIR="${KAMI_FONT_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/fonts/kami}"

MIN_SIZE=10000000  # 10MB, prevents truncated downloads

# Parallel arrays: index N pairs CN_NAMES[N] with LOCAL_NAMES[N].
CN_NAMES=("仓耳今楷02-W04.ttf" "仓耳今楷02-W05.ttf")
LOCAL_NAMES=("TsangerJinKai02-W04.ttf" "TsangerJinKai02-W05.ttf")

# Mirror order is intentionally jsdmirror-first here, opposite of the
# templates' @font-face fallback (which lists jsdelivr first). Reasoning:
# this script runs interactively when fonts are missing locally, often from
# China where jsdmirror is reachable and faster than jsdelivr; templates run
# anywhere and prioritize jsdelivr's broader global coverage.
MIRROR_SOURCES=(
  "https://cdn.jsdmirror.com/gh/tw93/Kami@main/assets/fonts"
  "https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts"
)

check_size() {
  local file="$1"
  [[ -f "$file" ]] || return 1
  local size
  size=$(wc -c < "$file" | tr -d ' ')
  [[ "$size" -ge "$MIN_SIZE" ]]
}

all_present_in() {
  local dir="$1" name
  for name in "${LOCAL_NAMES[@]}"; do
    check_size "$dir/$name" || return 1
  done
  return 0
}

refresh_fontconfig() {
  # The XDG font dir is already on fontconfig's default scan path, so a cache
  # refresh is all that is needed for WeasyPrint to pick the fonts up. Optional:
  # absence of fc-cache (e.g. minimal sandbox) is non-fatal, fontconfig rescans
  # the directory lazily on next use.
  if command -v fc-cache >/dev/null 2>&1; then
    fc-cache -f "$FONT_DIR" >/dev/null 2>&1 || true
  fi
}

download_font() {
  local cn_name="$1"
  local local_name="$2"
  local target="$FONT_DIR/$local_name"

  # Source 1: official tsanger.cn
  local official_url="https://tsanger.cn/download/${cn_name}"
  echo "  Trying: tsanger.cn (official)"
  if curl --retry 2 --connect-timeout 15 --max-time 300 -fSL "$official_url" -o "$target.tmp" 2>/dev/null; then
    if check_size "$target.tmp"; then
      mv "$target.tmp" "$target"
      echo "  OK: $local_name downloaded ($(du -h "$target" | cut -f1))"
      return 0
    else
      rm -f "$target.tmp"
    fi
  else
    rm -f "$target.tmp"
  fi

  # Source 2+: CDN mirrors (already named TsangerJinKai02-W0x.ttf)
  for src in "${MIRROR_SOURCES[@]}"; do
    local url="$src/$local_name"
    echo "  Trying: $url"
    if curl --retry 2 --connect-timeout 15 --max-time 300 -fSL "$url" -o "$target.tmp" 2>/dev/null; then
      if check_size "$target.tmp"; then
        mv "$target.tmp" "$target"
        echo "  OK: $local_name downloaded ($(du -h "$target" | cut -f1))"
        return 0
      else
        rm -f "$target.tmp"
      fi
    else
      rm -f "$target.tmp"
    fi
  done

  echo "  ERROR: all sources failed for $local_name"
  return 1
}

# 1. A repo checkout ships the committed TTFs. Templates resolve their relative
#    `../fonts/*.ttf` @font-face path against them directly, so there is nothing
#    to download or register. This branch is skipped inside a Claude Desktop
#    skill, whose assets/fonts has the TTFs stripped out.
if all_present_in "$REPO_FONT_DIR"; then
  echo "OK: TsangerJinKai fonts present in repo checkout ($REPO_FONT_DIR)"
  exit 0
fi

mkdir -p "$FONT_DIR"

if all_present_in "$FONT_DIR"; then
  echo "OK: TsangerJinKai fonts present ($FONT_DIR)"
  refresh_fontconfig
  exit 0
fi

echo "Downloading TsangerJinKai fonts to $FONT_DIR ..."
failed=0
for i in "${!CN_NAMES[@]}"; do
  cn_name="${CN_NAMES[$i]}"
  local_name="${LOCAL_NAMES[$i]}"
  if check_size "$FONT_DIR/$local_name"; then
    echo "  OK: $local_name already present"
    continue
  fi
  if ! download_font "$cn_name" "$local_name"; then
    failed=$((failed + 1))
  fi
done

if [[ "$failed" -gt 0 ]]; then
  echo ""
  echo "Some fonts could not be downloaded. Alternatives:"
  echo "  1. Install Source Han Serif SC: brew install --cask font-source-han-serif-sc"
  echo "  2. Copy TsangerJinKai02-W04.ttf and W05.ttf manually into $FONT_DIR"
  exit 1
fi

refresh_fontconfig
echo "OK: all fonts ready ($FONT_DIR)"
