#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
export PYTHONPATH="$SCRIPT_DIR${PYTHONPATH:+:$PYTHONPATH}"
# Prefer the joyclaw venv Python if available (auto-detected from $HOME)
JOYCLAW_PYTHON="$HOME/.joyclaw/venv/bin/python3"
if [ -x "$JOYCLAW_PYTHON" ]; then
  PYTHON_BIN="$JOYCLAW_PYTHON"
else
  PYTHON_BIN="python3"
fi

ensure_python_module() {
  local module_name="$1"
  if "$PYTHON_BIN" - <<PY >/dev/null 2>&1
import importlib.util
raise SystemExit(0 if importlib.util.find_spec("$module_name") else 1)
PY
  then
    return 0
  fi

  "$PYTHON_BIN" -m ensurepip --upgrade >/dev/null 2>&1 || true
  "$PYTHON_BIN" -m pip install --disable-pip-version-check --quiet "$module_name" >/dev/null 2>&1 || return 1

  "$PYTHON_BIN" - <<PY >/dev/null 2>&1
import importlib.util
raise SystemExit(0 if importlib.util.find_spec("$module_name") else 1)
PY
}

if ! ensure_python_module requests; then
  echo '{"success": false, "error_code": "DEPENDENCY_INSTALL_FAILED", "error": "mail skill 自动安装 Python 依赖 requests 失败，请检查当前 Python 环境是否允许安装依赖。"}'
  exit 1
fi

if ! ensure_python_module cryptography; then
  echo '{"success": false, "error_code": "DEPENDENCY_INSTALL_FAILED", "error": "mail skill 自动安装 Python 依赖 cryptography 失败，请检查当前 Python 环境是否允许安装依赖。"}'
  exit 1
fi

# truststore 仅在 Windows 下用于让 Python 走系统证书库，避免公司根证书校验失败；安装失败不阻塞。
if [ "$(uname -s 2>/dev/null)" = "MINGW64_NT" ] || [ "$(uname -s 2>/dev/null)" = "MSYS_NT" ] || [ -n "${OS:-}" ]; then
  ensure_python_module truststore >/dev/null 2>&1 || true
fi

exec "$PYTHON_BIN" -c 'import runpy, sys; d = sys.argv[1]; p = d + "/soap_mail_cli.py"; sys.path.insert(0, d); sys.argv = [p] + sys.argv[2:]; runpy.run_path(p, run_name="__main__")' "$SCRIPT_DIR" "$@"
