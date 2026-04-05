#!/usr/bin/env python3
"""
记忆索引管理器
维护daily和observations的.index文件
"""

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List
import re


class MemoryIndexManager:
    """记忆索引管理器"""

    def __init__(self, base_path: str = None):
        """初始化索引管理器"""
        if base_path is None:
            # 自动检测：从脚本位置向上5级找到项目根目录
            # 脚本位置: memory/active/tasks/scripts/index_manager.py
            # 项目根: my-agent
            script_dir = Path(__file__).parent.parent.parent.parent.parent
            base_path = script_dir

        self.base_path = Path(base_path)
        self.daily_path = self.base_path / "memory/active/daily"
        self.obs_path = self.base_path / "memory/active/observations"

    def update_daily_index(self) -> dict:
        """更新daily索引"""
        index_file = self.daily_path / ".index.md"

        # 收集所有daily文件
        files = []
        for f in sorted(self.daily_path.glob("*.md"), reverse=True):
            if f.name == ".index.md":
                continue

            # 读取文件获取标签和摘要
            lifecycle, tags, summary = self._parse_file_meta(f)

            files.append({
                "file": f.name,
                "date": f.name[:10],  # YYYY-MM-DD
                "lifecycle": lifecycle,
                "tags": tags,
                "summary": summary
            })

        # 生成markdown表格
        content = self._generate_daily_index(files)

        # 写入索引文件
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)

        return {"updated": len(files), "file": str(index_file)}

    def _parse_file_meta(self, file_path: Path) -> tuple:
        """解析文件的元数据"""
        lifecycle = "P2"  # 默认P2
        tags = []
        summary = ""

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

                # 解析生命周期
            lifecycle_match = re.search(r'^lifecycle:\s*(P[0-2])', content, re.MULTILINE)
            if lifecycle_match:
                lifecycle = lifecycle_match.group(1)

            # 解析标签
            tags_match = re.search(r'^tags:\s*\[(.*?)\]', content, re.MULTILINE)
            if tags_match:
                tags = [t.strip().strip('"') for t in tags_match.group(1).split(',')]

            # 生成摘要（取第一段）
            lines = content.split('\n')
            for line in lines:
                if line.strip() and not line.startswith('#') and not line.startswith('-') and not line.startswith('*'):
                    summary = line.strip()[:80]
                    break

        except Exception:
            pass

        return lifecycle, tags, summary

    def _generate_daily_index(self, files: List[dict]) -> str:
        """生成daily索引内容"""
        content = """# Daily Files Index

> 快速索引 daily 目录下的所有记录

---

## 元信息

```yaml
version: "1.0"
last_updated: "{datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}"
directory: "memory/daily/"
```

---

## 文件列表

"""

        # 添加表格
        for f in files:
            tags_str = ", ".join(f["tags"]) if f["tags"] else "-"
            content += f'| {f["file"]} | {f["date"]} | {f["lifecycle"]} | {tags_str} | {f["summary"]} | - |\n'

        content += """
---

## 生命周期说明

- **P0**：核心决策、重大洞察、错误教训（永久保留）
- **P1**：重要进展、工作里程碑（90天）
- **P2**：常规记录、临时数据（30天）

---

## 查询指南

### 按日期查询
直接查找对应日期的文件

### 按标签查询
搜索关键词找到对应文件

### 按生命周期查询
- P0：重大决策、错误教训
- P1：重要进展
- P2：常规记录

---

## 维护规则

- 创建新daily文件时，更新此索引
- UPDATE_MEMORY时，更新lifecycle和引用
- 超期P2文件清理后，从索引删除

"""

        return content

    def update_obs_index(self) -> dict:
        """更新observations索引"""
        index_file = self.obs_path / ".index.md"

        # 收集观察报告
        observations = []

        # 按主题分类
        personality = []
        work_style = []
        cognition = []

        for obs_file in sorted(self.obs_path.glob("*.md"), reverse=True):
            if obs_file.name == ".index.md":
                continue

            with open(obs_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # 提取观察主题
            themes = self._extract_themes(content)

            obs_entry = {
                "file": obs_file.name,
                "date": obs_file.name[:10],  # YYYY-MM
                "themes": themes
            }

            observations.append(obs_entry)

            # 分类
            for theme in themes:
                if "人格" in theme or "关系" in theme or "伙伴" in theme:
                    personality.append(obs_entry)
                elif "工作" in theme or "机制" in theme or "落地" in theme:
                    work_style.append(obs_entry)
                elif "认知" in theme or "思维" in theme:
                    cognition.append(obs_entry)

        # 生成索引内容
        content = self._generate_obs_index(observations, personality, work_style, cognition)

        # 写入索引
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)

        return {"updated": len(observations), "file": str(index_file)}

    def _extract_themes(self, content: str) -> List[str]:
        """提取观察主题"""
        themes = []

        # 查找标题行
        for line in content.split('\n'):
            if line.startswith('### ') and ':' in line:
                theme = line[3:].strip()
                themes.append(theme)

        return themes

    def _generate_obs_index(self, all_obs, personality, work_style, cognition) -> str:
        """生成observations索引内容"""
        content = """# Observations Files Index

> 快速索引 observations 目录下的所有观察报告

---

## 元信息

```yaml
version: "1.0"
last_updated: "{datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}"
directory: "memory/observations/"
```

---

## 按主题索引

### 人格特质

| 观察 | 日期 | 核心洞察 |
|------|------|---------|
"""

        for obs in personality[:5]:
            content += f'| {obs["file"]} | {obs["date"]} | {", ".join(obs["themes"])[:30]} |\n'

        content += """

### 工作风格

| 观察 | 日期 | 核心洞察 |
|------|------|---------|
"""

        for obs in work_style[:5]:
            content += f'| {obs["file"]} | {obs["date"]} | {", ".join(obs["themes"])[:30]} |\n'

        content += """

### 认知模式

| 观察 | 日期 | 核心洞察 |
|------|------|---------|
"""

        for obs in cognition[:5]:
            content += f'| {obs["file"]} | {obs["date"]} | {", ".join(obs["themes"])[:30]} |\n'

        content += """
---

## 维护规则

- 新观察记录时，更新索引
- UPDATE_MEMORY时，检查是否需要精炼到长期记忆
- 月度末，将本月观察汇总到周文档

---

## 查询指南

### 按人格特质
搜索 "人格特质" 或具体特质名称

### 按工作风格
搜索 "工作风格" 或具体风格名称

### 按认知模式
搜索 "认知模式" 或具体模式名称

### 按日期
搜索具体日期的观察报告

"""

        return content

    def query_daily_by_tags(self, tags: List[str]) -> List[dict]:
        """按标签查询daily文件"""
        index_file = self.daily_path / ".index.md"
        if not index_file.exists():
            return []

        results = []

        # 解析索引文件
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 提取表格行
        in_table = False
        for line in content.split('\n'):
            if '|' in line and '文件' in line:
                in_table = True
                continue
            if in_table and line.startswith('|---'):
                continue
            if in_table and line.startswith('|'):
                # 提取文件信息
                parts = [p.strip() for p in line.split('|') if p.strip()]

                if len(parts) >= 4:
                    file_tags = parts[3].split(', ') if parts[3] != '-' else []

                    # 检查标签匹配
                    if any(tag.lower() in str(file_tags).lower() for tag in tags):
                        results.append({
                            "file": parts[0],
                            "date": parts[1],
                            "lifecycle": parts[2],
                            "tags": file_tags,
                            "summary": parts[4]
                        })

        return results

    def update_all_indexes(self) -> dict:
        """更新所有索引"""
        daily_result = self.update_daily_index()
        obs_result = self.update_obs_index()
        return {
            "daily": daily_result,
            "obs": obs_result
        }

    def create_dir_claude_md(self, dir_path: str, template: str = "default") -> bool:
        """为新目录创建 CLAUDE.md"""
        dir_path = Path(dir_path)
        if not dir_path.exists():
            print(f"目录不存在：{dir_path}")
            return False

        claude_md = dir_path / "CLAUDE.md"
        if claude_md.exists():
            print(f"CLAUDE.md 已存在：{claude_md}")
            return False

        # 模板
        templates = {
            "default": """# CLAUDE.md — {dir_name}

> **L3: {dir_name} 模块说明**

---

## Summary

{一句话描述这个目录的用途}

---

## Members

| 文件 | 内容 |
|------|------|
| - | - |

---

## Rules

### 使用方式

[说明如何使用这个目录的文件]

### 新增文件

当 [触发条件] 时：
1. 在本目录下新建 .md 文件
2. 说明 [文件内容]
3. 在对应 command 中集成调用

---

*{一句话总结}*

---

*最后更新：{date}*
""",
            "tasks": """# CLAUDE.md — {dir_name}

> **L3: {dir_name} 模块说明**

---

## Summary

{一句话描述这个目录的用途}

---

## Members

| 文件 | 内容 |
|------|------|
| - | - |

---

## Rules

### 机制文档结构

每个机制文档包含：
- 触发条件（何时启动）
- 执行流程（怎么做）
- 相关文件（涉及哪些文件）
- 变更记录（历史演进）

### 新增机制

创建新机制时：
1. 在本目录下新建 .md 文件
2. 说明触发条件、执行流程、相关文件
3. 在 observer 或 UPDATE_MEMORY 中集成调用

---

*{一句话总结}*

---

*最后更新：{date}*
"""
        }

        template_content = templates.get(template, templates["default"])
        dir_name = dir_path.name

        content = template_content.format(
            dir_name=dir_name,
            date=datetime.now().strftime("%Y-%m-%d")
        )

        with open(claude_md, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"已创建 CLAUDE.md: {claude_md}")
        return True


def main():
    """命令行入口"""
    import argparse

    parser = argparse.ArgumentParser(description="记忆索引管理器")
    parser.add_argument("--action", choices=["update-daily", "update-obs", "update-all", "query", "create-claude-md"], required=True)
    parser.add_argument("--tags", nargs='+')
    parser.add_argument("--dir", help="目录路径（create-claude-md 使用）")
    parser.add_argument("--template", choices=["default", "tasks"], default="default")

    args = parser.parse_args()

    manager = MemoryIndexManager()

    if args.action == "update-daily":
        result = manager.update_daily_index()
        print(f"Daily索引已更新：{result['updated']} 个文件")

    elif args.action == "update-obs":
        result = manager.update_obs_index()
        print(f"Observations索引已更新：{result['updated']} 个观察")

    elif args.action == "update-all":
        result = manager.update_all_indexes()
        print(f"所有索引已更新：daily={result['daily']['updated']} 个文件，obs={result['obs']['updated']} 个观察")

    elif args.action == "query":
        if not args.tags:
            print("错误：query操作需要--tags参数")
            return

        results = manager.query_daily_by_tags(args.tags)
        print(f"找到 {len(results)} 个文件：")
        for r in results:
            print(f"  {r['file']} - {r['summary']}")

    elif args.action == "create-claude-md":
        if not args.dir:
            print("错误：create-claude-md 操作需要--dir 参数")
            return

        manager.create_dir_claude_md(args.dir, args.template)


if __name__ == "__main__":
    main()