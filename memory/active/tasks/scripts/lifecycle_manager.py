#!/usr/bin/env python3
"""
记忆生命周期管理器
input: daily/目录下的.md 文件（读取 lifecycle 标签）
output: 检查/清理超期文件，输出统计报告
pos: scripts 目录的成员，文件夹变化需更新此注释
# 文件更新需同步注释及所属文件夹 md
"""

import os
import sys
from pathlib import Path
from datetime import datetime, timedelta
from typing import List, Tuple


# 生命周期配置
LIFECYCLE_CONFIG = {
    'P0': {'days': None, 'desc': '永久保留'},
    'P1': {'days': 90, 'desc': '90 天'},
    'P2': {'days': 30, 'desc': '30 天'},
}


def get_lifecycle_from_file(file_path: Path) -> str:
    """从文件头部提取 lifecycle 标签"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read(500)  # 只读前 500 字符
            for line in content.split('\n'):
                if line.startswith('lifecycle:'):
                    return line.split(':')[1].strip()
    except Exception as e:
        print(f"⚠️  读取失败 {file_path.name}: {e}")
    return ''


def check_lifecycle(daily_dir: Path) -> List[Tuple[Path, str, int]]:
    """
    检查 daily 目录文件的生命周期状态

    返回：(文件路径，生命周期，超出天数) 列表
    """
    expired_files = []
    today = datetime.now()

    if not daily_dir.exists():
        print(f"❌ 目录不存在：{daily_dir}")
        return expired_files

    for file_path in daily_dir.glob('*.md'):
        if file_path.name.startswith('.'):
            continue

        lifecycle = get_lifecycle_from_file(file_path)
        if not lifecycle:
            print(f"⚠️  无 lifecycle 标签：{file_path.name}")
            continue

        if lifecycle not in LIFECYCLE_CONFIG:
            print(f"⚠️  未知生命周期：{lifecycle} ({file_path.name})")
            continue

        config = LIFECYCLE_CONFIG[lifecycle]
        if config['days'] is None:  # P0 永久保留
            continue

        # 计算文件年龄
        file_mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
        age_days = (today - file_mtime).days

        if age_days > config['days']:
            expired_days = age_days - config['days']
            expired_files.append((file_path, lifecycle, expired_days))
            print(f"🔴 超期：{file_path.name} ({lifecycle}, 超期{expired_days}天)")

    return expired_files


def cleanup(daily_dir: Path, dry_run: bool = True) -> int:
    """
    清理超期文件

    Args:
        daily_dir: daily 目录路径
        dry_run: True=仅检查，False=实际删除

    Returns:
        清理的文件数量
    """
    expired_files = check_lifecycle(daily_dir)

    if not expired_files:
        print("✅ 没有超期文件")
        return 0

    print(f"\n📊 超期统计：{len(expired_files)} 个文件")

    if dry_run:
        print("\n🔍 干运行模式（未实际删除）")
        print("   执行 cleanup --action cleanup 进行实际清理")
        return 0

    # 实际删除
    deleted_count = 0
    for file_path, lifecycle, expired_days in expired_files:
        try:
            # P2 文件直接删除（内容已提炼到周文档）
            file_path.unlink()
            print(f"🗑️  已删除：{file_path.name} (超期{expired_days}天)")
            deleted_count += 1
        except Exception as e:
            print(f"❌ 删除失败 {file_path.name}: {e}")

    print(f"\n✅ 清理完成：{deleted_count}/{len(expired_files)} 个文件")
    return deleted_count


def archive_files(source_dir: Path, target_dir: Path, days_threshold: int = 90, dry_run: bool = True) -> int:
    """
    归档超期文件到 archive 目录

    Args:
        source_dir: 源目录（如 active/daily）
        target_dir: 目标目录（如 archive/daily）
        days_threshold: 超过多少天归档
        dry_run: True=仅检查，False=实际归档

    Returns:
        归档的文件数量
    """
    if not source_dir.exists():
        print(f"⚠️  源目录不存在：{source_dir}")
        return 0

    # 创建目标目录
    target_dir.mkdir(parents=True, exist_ok=True)

    archived_count = 0
    today = datetime.now()

    print(f"🔍 扫描 {source_dir.name} 中超过 {days_threshold} 天的文件...")

    for file_path in source_dir.glob('*.md'):
        if file_path.name.startswith('.'):
            continue

        # 计算文件年龄
        file_mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
        age_days = (today - file_mtime).days

        if age_days > days_threshold:
            target_path = target_dir / file_path.name

            if dry_run:
                print(f"  📋 [归档] {file_path.name} ({age_days}天) → {target_dir.relative_to(file_path.parents[3])}")
            else:
                try:
                    # 如果目标文件已存在，先备份
                    if target_path.exists():
                        backup_path = target_dir / f"{file_path.stem}.backup{file_path.suffix}"
                        target_path.rename(backup_path)
                        print(f"  ⚠️  目标文件已存在，备份为：{backup_path.name}")

                    # 移动文件到归档目录
                    file_path.rename(target_path)
                    print(f"  📦 [归档] {file_path.name} ({age_days}天)")
                    archived_count += 1
                except Exception as e:
                    print(f"  ❌ 归档失败 {file_path.name}: {e}")

    if dry_run and archived_count > 0:
        print(f"\n🔍 干运行模式：发现 {archived_count} 个文件需要归档")
        print("   执行 archive --no-dry-run 进行实际归档")
    elif not dry_run:
        print(f"\n✅ 归档完成：{archived_count} 个文件")

    return archived_count


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("用法：python lifecycle_manager.py [check|cleanup|archive] [--dry-run]")
        print("  check   - 检查超期文件")
        print("  cleanup - 清理超期文件（默认干运行）")
        print("  archive - 归档超期文件到 archive/（默认干运行）")
        print("  --dry-run - 干运行模式（不实际操作）")
        print("  --no-dry-run - 实际执行操作")
        sys.exit(1)

    action = sys.argv[1]
    dry_run = '--no-dry-run' not in sys.argv

    # 定位脚本所在目录
    script_dir = Path(__file__).parent
    memory_dir = script_dir.parent.parent.parent  # 回到 memory/
    daily_dir = memory_dir / 'active' / 'daily'
    archive_daily_dir = memory_dir / 'archive' / 'daily'

    if action == 'check':
        print("🔍 检查生命周期状态...\n")
        expired = check_lifecycle(daily_dir)
        if not expired:
            print("\n✅ 所有文件生命周期正常")
        else:
            print(f"\n⚠️  发现 {len(expired)} 个超期文件")
            sys.exit(1)

    elif action == 'cleanup':
        print("🗑️  清理超期文件...\n")
        cleanup(daily_dir, dry_run=dry_run)

    elif action == 'archive':
        print("📦 归档超期文件...\n")
        archive_files(daily_dir, archive_daily_dir, days_threshold=90, dry_run=dry_run)

    else:
        print(f"❌ 未知操作：{action}")
        sys.exit(1)


if __name__ == '__main__':
    main()
