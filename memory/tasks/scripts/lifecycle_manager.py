#!/usr/bin/env python3
"""
记忆生命周期管理器
自动检查和清理超期的P2文件
"""

import os
import json
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List


class LifecycleManager:
    """记忆生命周期管理器"""

    def __init__(self, base_path: str = None):
        """初始化生命周期管理器"""
        self.base_path = Path(base_path or os.path.expanduser("~/my-agent"))
        self.daily_path = self.base_path / "memory/daily"

        # 生命周期规则
        self.rules = {
            "P0": {"retention_days": None, "description": "永久保留"},
            "P1": {"retention_days": 90, "description": "重要进展"},
            "P2": {"retention_days": 30, "description": "常规记录"}
        }

    def check_expired_files(self, dry_run: bool = True) -> List[dict]:
        """检查超期文件"""
        expired_files = []
        now = datetime.now()

        for f in sorted(self.daily_path.glob("*.md"), reverse=True):
            if f.name == ".index.md":
                continue

            # 获取生命周期
            lifecycle = self._get_lifecycle(f)
            if not lifecycle:
                continue

            # P0永久保留，不检查
            if lifecycle == "P0":
                continue

            # 获取创建时间
            create_time = self._get_file_date(f)
            if not create_time:
                continue

            # 计算天数差
            days_old = (now - create_time).days
            retention = self.rules[lifecycle]["retention_days"]

            # 检查是否超期
            if retention and days_old > retention:
                expired_files.append({
                    "file": str(f),
                    "lifecycle": lifecycle,
                    "days_old": days_old,
                    "retention": retention,
                    "reason": f"{lifecycle}已超期{days_old - retention}天"
                })

        return expired_files

    def _get_lifecycle(self, file_path: Path) -> str:
        """获取文件的生命周期标签"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # 解析生命周期
            import re
            match = re.search(r'^lifecycle:\s*(P[0-2])', content, re.MULTILINE)
            if match:
                return match.group(1)
        except Exception:
            pass

        return "P2"  # 默认P2

    def _get_file_date(self, file_path: Path) -> datetime:
        """获取文件日期"""
        # 从文件名提取
        try:
            date_str = file_path.name[:10]  # YYYY-MM-DD
            return datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return None

    def cleanup_expired_files(self, dry_run: bool = True) -> dict:
        """清理超期文件"""
        expired = self.check_expired_files(dry_run=True)

        results = {
            "expired_count": len(expired),
            "deleted": [],
            "skipped": []
        }

        for file_info in expired:
            file_path = Path(file_info["file"])

            # P2文件可以直接删除（内容已提炼到周文档）
            if file_info["lifecycle"] == "P2":
                if not dry_run:
                    try:
                        file_path.unlink()
                        results["deleted"].append(file_info)
                    except Exception as e:
                        results["skipped"].append({
                            **file_info,
                            "error": str(e)
                        })
                else:
                    results["deleted"].append(file_info)

            # P1文件需要人工确认
            elif file_info["lifecycle"] == "P1":
                results["skipped"].append({
                    **file_info,
                    "reason": "P1文件需要人工确认是否保留"
                })

        return results

    def classify_file(self, file_path: str, tags: List[str] = None) -> str:
        """自动分类文件生命周期"""
        # P0触发条件
        p0_keywords = ["错误", "教训", "核心决策", "重大洞察", "WAL", "重要机制"]
        for keyword in p0_keywords:
            if keyword in str(tags).lower() if tags else False:
                return "P0"

        # P1触发条件
        p1_keywords = ["进展", "里程碑", "重要", "突破", "完成"]
        for keyword in p1_keywords:
            if keyword in str(tags).lower() if tags else False:
                return "P1"

        # 默认P2
        return "P2"

    def get_lifecycle_stats(self) -> dict:
        """获取生命周期统计"""
        stats = {"P0": 0, "P1": 0, "P2": 0}

        for f in self.daily_path.glob("*.md"):
            if f.name == ".index.md":
                continue

            lifecycle = self._get_lifecycle(f)
            if lifecycle in stats:
                stats[lifecycle] += 1

        stats["total"] = sum(stats.values())
        return stats


def main():
    """命令行入口"""
    import argparse

    parser = argparse.ArgumentParser(description="记忆生命周期管理器")
    parser.add_argument("--action", choices=["check", "cleanup", "stats", "classify"], required=True)
    parser.add_argument("--file")
    parser.add_argument("--tags", nargs='+')
    parser.add_argument("--dry-run", action="store_true")

    args = parser.parse_args()

    manager = LifecycleManager()

    if args.action == "check":
        expired = manager.check_expired_files(args.dry_run)
        print(f"发现 {len(expired)} 个超期文件：")
        for f in expired:
            print(f"  {f['file']} - {f['reason']}")

    elif args.action == "cleanup":
        results = manager.cleanup_expired_files(args.dry_run)
        print(f"清理结果：")
        print(f"  超期：{results['expired_count']} 个")
        print(f"  删除：{len(results['deleted'])} 个")
        print(f"  跳过：{len(results['skipped'])} 个")

        if not args.dry_run and results["deleted"]:
            print("\n已删除的文件：")
            for f in results["deleted"]:
                print(f"  - {f['file']}")

    elif args.action == "stats":
        stats = manager.get_lifecycle_stats()
        print("生命周期统计：")
        print(f"  P0: {stats['P0']} 个（永久）")
        print(f"  P1: {stats['P1']} 个（90天）")
        print(f"  P2: {stats['P2']} 个（30天）")
        print(f"  总计: {stats['total']} 个")

    elif args.action == "classify":
        if not args.file:
            print("错误：classify操作需要--file参数")
            return

        lifecycle = manager.classify_file(args.file, args.tags)
        print(f"文件分类为：{lifecycle}")


if __name__ == "__main__":
    main()