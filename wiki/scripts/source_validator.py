#!/usr/bin/env python3
"""
Source Validator — 来源标注完整性验证
扫描distill/层，找出缺少[来源]标注的关键规则段落

使用方式：
    cd wiki/scripts && python3 source_validator.py
    python3 source_validator.py --wiki-dir ../ --fix-suggestions

作者：年老师
日期：2026-06-13
"""

import os
import re
import argparse
from pathlib import Path


class SourceValidator:
    def __init__(self, wiki_dir="../"):
        self.wiki_dir = Path(wiki_dir).resolve()
        self.distill_dir = self.wiki_dir / "distill"
        self.raw_dir = self.wiki_dir / "raw"
        self.missing_sources = []

    def validate_file(self, md_file):
        """验证单个文件的来源标注"""
        content = md_file.read_text(encoding="utf-8")
        lines = content.splitlines()

        # 关键规则模式：包含阈值、百分比、数字+动作指令的段落
        rule_patterns = [
            r'\d+%',  # 百分比
            r'≥\d+|≤\d+|<\d+|>\d+',  # 比较符号+数字
            r'连续\d+',  # 连续N
            r'扣\d+|罚\d+',  # 扣罚
            r'\d+天|\d+月|\d+年',  # 时间
            r'\d+分',  # 分数
            r'\d+万元|\d+元',  # 金额
        ]

        current_section = ""
        in_table = False
        table_has_source = False
        table_start_line = 0

        for i, line in enumerate(lines):
            # 跟踪当前章节
            if line.startswith("## ") or line.startswith("### "):
                current_section = line.strip("# ").strip()
                in_table = False
                table_has_source = False

            # 检测表格开始
            if line.strip().startswith("|") and "---" in line:
                in_table = True
                table_start_line = i
                table_has_source = False
                continue

            # 检测表格结束
            if in_table and not line.strip().startswith("|"):
                # 检查表格后是否有来源标注
                source_found = False
                for j in range(table_start_line, min(i+5, len(lines))):
                    if "[来源" in lines[j] or "来源：" in lines[j]:
                        source_found = True
                        break
                if not source_found:
                    # 检查表格内容是否包含关键规则
                    table_content = "\n".join(lines[table_start_line:i])
                    is_key_rule = any(re.search(p, table_content) for p in rule_patterns)
                    if is_key_rule:
                        self.missing_sources.append({
                            "file": md_file.name,
                            "section": current_section,
                            "line": table_start_line + 1,
                            "type": "表格",
                            "preview": lines[table_start_line][:80] if table_start_line < len(lines) else "",
                        })
                in_table = False

    def suggest_source(self, item):
        """根据内容猜测可能的来源"""
        # 简单的关键词匹配逻辑
        section = item["section"].lower()
        if "引入" in section or "准入" in section:
            return "SM-2026-010_供应商引入管理规范.md"
        elif "清退" in section:
            return "SM-2026-030_供应商清退管理规范.md"
        elif "日常" in section or "出勤" in section or "巡检" in section:
            return "SM-2026-020_供应商日常管理规范.md"
        elif "考核" in section or "评分" in section or "赛马" in section:
            return "SM-2026-040_供应商管理SLA.md 或 MT-2026-100"
        elif "触发" in section or "产能" in section or "主管" in section:
            return "MT-2026-100_供应商管理思路梳理.md"
        elif "检查清单" in section or "决策模板" in section:
            return "TM-2026-400/500_检查清单集/决策模板集.md"
        else:
            return "[待补充：请核对原始文档]"

    def run(self, show_suggestions=False):
        """执行验证"""
        print("🔍 开始来源标注完整性验证...")

        if not self.distill_dir.exists():
            print(f"❌ distill/目录不存在: {self.distill_dir}")
            return

        for md_file in sorted(self.distill_dir.glob("*.md")):
            self.validate_file(md_file)

        if not self.missing_sources:
            print("✅ 所有关键规则段落都有来源标注")
            return

        print(f"\n⚠️ 发现 {len(self.missing_sources)} 个缺少来源标注的关键规则段落:\n")

        for i, item in enumerate(self.missing_sources, 1):
            print(f"{i}. [{item['file']}] {item['section']}")
            print(f"   位置: 第{item['line']}行 ({item['type']})")
            print(f"   预览: {item['preview'][:60]}...")
            if show_suggestions:
                suggestion = self.suggest_source(item)
                print(f"   💡 建议来源: {suggestion}")
            print()

        print(f"\n建议操作: 为上述段落添加 [来源: xxx.md §章节] 标注")
        if not show_suggestions:
            print("运行 python3 source_validator.py --fix-suggestions 查看来源建议")


def main():
    parser = argparse.ArgumentParser(description="Wiki来源标注验证")
    parser.add_argument("--wiki-dir", default="../", help="Wiki根目录")
    parser.add_argument("--fix-suggestions", action="store_true", help="显示来源建议")
    args = parser.parse_args()

    validator = SourceValidator(wiki_dir=args.wiki_dir)
    validator.run(show_suggestions=args.fix_suggestions)


if __name__ == "__main__":
    main()
