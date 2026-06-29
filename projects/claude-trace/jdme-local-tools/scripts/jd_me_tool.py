#!/usr/bin/env python3
"""Command entry point for JD ME local tools."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from jd_me_tool_core import main


if __name__ == "__main__":
    raise SystemExit(main())
