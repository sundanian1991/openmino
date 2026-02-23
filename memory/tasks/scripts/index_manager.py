#!/usr/bin/env python3
"""
记忆索引管理器
input: daily/和 observations/目录下的.md 文件
output: 更新.index 索引文件，支持查询
pos: scripts 目录的成员，文件夹变化需更新此注释
# 文件更新需同步注释及所属文件夹 md
"""

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List
import re


class MemoryIndexManager: