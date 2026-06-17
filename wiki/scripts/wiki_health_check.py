#!/usr/bin/env python3
"""
Wiki Health Check — 供应商管理知识库健康巡检脚本
卡帕西式三层架构健康度检测

功能：
1. 检查来源标注完整性（distill层是否标注了[来源]）
2. 检查冲突记录状态（是否有未解决冲突）
3. 检查待验证假设数量
4. 检查raw/原文层文件完整性（distill引用的raw文件是否存在）
5. 输出健康度报告

使用方式：
    cd wiki/scripts && python3 wiki_health_check.py
    # 或带参数：
    python3 wiki_health_check.py --wiki-dir ../ --output report.json

作者：年老师
日期：2026-06-13
"""

import re
import json
import argparse
from pathlib import Path
from datetime import datetime

class WikiHealthChecker:
    def __init__(self, wiki_dir="../"):
        self.wiki_dir = Path(wiki_dir).resolve()
        self.distill_dir = self.wiki_dir / "distill"
        self.raw_dir = self.wiki_dir / "raw"
        self.notes_dir = self.wiki_dir / "notes"
        self.issues = []
        self.stats = {
            "distill_files": 0,
            "raw_files": 0,
            "notes_files": 0,
            "total_lines_distill": 0,
            "sections_with_source": 0,
            "sections_without_source": 0,
            "conflicts_open": 0,
            "assumptions_pending": 0,
            "raw_missing": 0,
        }

    def check_distill_source_annotations(self):
        """检查提炼层的来源标注完整性"""
        if not self.distill_dir.exists():
            self.issues.append(("ERROR", "distill/目录不存在"))
            return

        source_pattern = re.compile(r'\[来源[：:]')
        section_pattern = re.compile(r'^#{2,4}\s+(.+)$', re.MULTILINE)

        for md_file in sorted(self.distill_dir.glob("*.md")):
            self.stats["distill_files"] += 1
            content = md_file.read_text(encoding="utf-8")
            self.stats["total_lines_distill"] += len(content.splitlines())

            # 按二级/三级标题分段检查
            sections = section_pattern.split(content)
            for i in range(1, len(sections), 2):
                if i < len(sections):
                    section_title = sections[i].strip()
                    section_content = sections[i+1] if i+1 < len(sections) else ""
                    # 跳过目录、索引、总览、纯交叉链接导航等元段落
                    if any(skip in section_title for skip in ["索引", "导航", "总览", "速查", "目录", "与其他分册的关联", "交叉链接", "关联分册"]):
                        continue
                    if source_pattern.search(section_content):
                        self.stats["sections_with_source"] += 1
                    else:
                        # 只有内容段落（包含表格或列表）才需要来源
                        if any(line.strip().startswith('|') or line.strip().startswith('- ') for line in section_content.split('\n')[:10]):
                            self.stats["sections_without_source"] += 1
                            self.issues.append((
                                "WARN",
                                f"[{md_file.name}] §{section_title[:30]} 缺少[来源]标注"
                            ))

    def check_raw_completeness(self):
        """检查distill中引用的raw文件是否都存在"""
        if not self.raw_dir.exists():
            self.issues.append(("ERROR", "raw/目录不存在"))
            return

        self.stats["raw_files"] = len(list(self.raw_dir.iterdir()))

        # 扫描distill中引用的raw文件（排除逗号/中文逗号，支持多来源写法）
        raw_ref_pattern = re.compile(r'`?raw/([^`\s\],，]+)`?')
        source_ref_pattern = re.compile(r'\[来源[：:]\s*([^\]]+)\]')
        # 去掉 §章节 等描述后缀，只保留文件路径/名
        section_suffix = re.compile(r'\s*§.*$')

        referenced_raws = set()
        for md_file in self.distill_dir.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            for match in raw_ref_pattern.finditer(content):
                ref = match.group(1)
                # 只保留文件路径型引用：带扩展名，或带编码特征（避免匹配 "raw/distill/notes" 这类目录描述）
                if re.search(r'[（）()]', ref):
                    continue
                valid_exts = ('.md', '.json', '.docx', '.pdf', '.txt', '.xlsx', '.pptx')
                has_code = re.search(r'[A-Za-z0-9]', ref) and ('_' in ref or '-' in ref)
                if ref.endswith(valid_exts) or has_code:
                    referenced_raws.add(ref)
            for match in source_ref_pattern.finditer(content):
                ref_str = match.group(1).strip()
                # 支持多来源逗号分隔：[来源：raw/A.md, raw/B.md, ...]
                for ref in re.split(r'[,，]', ref_str):
                    ref = ref.strip()
                    # 如果来源是raw文件路径（排除scripts/notes/distill等内部路径）
                    if ('raw/' in ref or ref.endswith('.md') or ref.endswith('.json')) and \
                       not any(skip in ref for skip in ['scripts/', 'notes/', 'distill/', '目录']):
                        ref = section_suffix.sub('', ref).strip()
                        referenced_raws.add(ref.split('/')[-1] if '/' in ref else ref)

        # 检查引用的文件是否存在
        for ref in referenced_raws:
            # 跳过无效引用
            if not ref or ref.strip() in [')', '）', '', ' ']:
                continue
            ref = ref.strip()
            # 尝试多种匹配方式
            possible_names = [
                ref,
                ref + '.md',
                ref + '.json',
                ref + '.docx',
                ref + '.pdf',
                ref + '.txt',
            ]
            found = any((self.raw_dir / name).exists() for name in possible_names)
            # 也尝试子目录路径（如 raw/2026-06-16_主题/文件.md）
            if not found and '/' in ref:
                found = (self.raw_dir / ref).exists()
            # 也尝试前缀匹配（如SM-2026-001匹配SM-2026-001_xxx.md），递归子目录
            if not found:
                for raw_file in self.raw_dir.rglob('*'):
                    if raw_file.is_file() and (raw_file.name.startswith(ref) or ref in raw_file.name):
                        found = True
                        break
            if not found:
                self.stats["raw_missing"] += 1
                self.issues.append(("ERROR", f"引用的raw文件不存在: {ref}"))

    def check_notes_health(self):
        """检查健康判断层状态"""
        if not self.notes_dir.exists():
            self.issues.append(("ERROR", "notes/目录不存在"))
            return

        self.stats["notes_files"] = len(list(self.notes_dir.glob("*.md")))

        # 检查冲突记录
        conflict_file = self.notes_dir / "冲突记录.md"
        if conflict_file.exists():
            content = conflict_file.read_text(encoding="utf-8")
            # 统计冲突条目总数
            conflicts_all = re.findall(r'### 冲突\d+', content)
            # 已解决：段落里出现 ✅ / 已解决 / 已修正 / 用户已确认 等状态标记
            resolved_markers = re.compile(
                r'✅|☑️|已解决|已确认|已修正|用户已确认|状态[：:]\s*\[?✅'
            )
            conflicts_resolved = 0
            # 按冲突块切分：每块从"### 冲突N"到下一个"### 冲突N"
            blocks = re.split(r'(?=### 冲突\d+)', content)
            for block in blocks:
                if block.startswith('### 冲突') and resolved_markers.search(block):
                    conflicts_resolved += 1
            self.stats["conflicts_open"] = len(conflicts_all) - conflicts_resolved

        # 检查待验证假设
        assumption_file = self.notes_dir / "待验证假设.md"
        if assumption_file.exists():
            content = assumption_file.read_text(encoding="utf-8")
            assumptions = re.findall(r'### 假设\d+', content)
            self.stats["assumptions_pending"] = len(assumptions)

    def generate_report(self, output_file=None):
        """生成健康度报告"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "wiki_dir": str(self.wiki_dir),
            "stats": self.stats,
            "health_score": self._calculate_health_score(),
            "issues": [
                {"level": level, "message": msg}
                for level, msg in self.issues
            ],
            "summary": self._generate_summary(),
        }

        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, ensure_ascii=False, indent=2)
            print(f"报告已保存至: {output_file}")

        return report

    def _calculate_health_score(self):
        """计算健康度得分（0-100）"""
        score = 100
        # 每个ERROR扣15分
        errors = sum(1 for level, _ in self.issues if level == "ERROR")
        score -= errors * 15
        # 每个WARN扣5分
        warns = sum(1 for level, _ in self.issues if level == "WARN")
        score -= warns * 5
        # 待验证假设过多扣分（>5个扣10分）
        if self.stats["assumptions_pending"] > 5:
            score -= 10
        # 来源覆盖率不足扣分
        total_sections = self.stats["sections_with_source"] + self.stats["sections_without_source"]
        if total_sections > 0:
            coverage = self.stats["sections_with_source"] / total_sections
            if coverage < 0.5:
                score -= 20
            elif coverage < 0.8:
                score -= 10
        return max(0, score)

    def _generate_summary(self):
        """生成文字摘要"""
        lines = []
        lines.append("=" * 50)
        lines.append("供应商管理知识库健康巡检报告")
        lines.append("=" * 50)
        lines.append(f"巡检时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        lines.append(f"提炼层文件: {self.stats['distill_files']}个")
        lines.append(f"原文层文件: {self.stats['raw_files']}个")
        lines.append(f"健康判断层文件: {self.stats['notes_files']}个")
        lines.append(f"提炼层总行数: {self.stats['total_lines_distill']}行")
        lines.append(f"来源标注覆盖率: {self._get_coverage()}")
        lines.append(f"未解决冲突: {self.stats['conflicts_open']}个")
        lines.append(f"待验证假设: {self.stats['assumptions_pending']}个")
        lines.append(f"缺失raw文件: {self.stats['raw_missing']}个")
        lines.append(f"健康度得分: {self._calculate_health_score()}/100")
        lines.append("-" * 50)

        if not self.issues:
            lines.append("✅ 所有检查通过，知识库状态健康")
        else:
            lines.append(f"⚠️ 发现 {len(self.issues)} 个问题:")
            for level, msg in self.issues[:20]:  # 最多显示20个
                icon = "🔴" if level == "ERROR" else "🟡"
                lines.append(f"  {icon} [{level}] {msg}")
            if len(self.issues) > 20:
                lines.append(f"  ... 还有 {len(self.issues)-20} 个问题未显示")

        lines.append("=" * 50)
        return "\n".join(lines)

    def _get_coverage(self):
        total = self.stats["sections_with_source"] + self.stats["sections_without_source"]
        if total == 0:
            return "N/A"
        return f"{self.stats['sections_with_source']}/{total} ({self.stats['sections_with_source']/total*100:.1f}%)"

    def run(self, output_file=None):
        """执行完整巡检"""
        print("🔍 开始知识库健康巡检...")
        print(f"   Wiki目录: {self.wiki_dir}")

        print("   [1/3] 检查提炼层来源标注...")
        self.check_distill_source_annotations()

        print("   [2/3] 检查原文层完整性...")
        self.check_raw_completeness()

        print("   [3/3] 检查健康判断层状态...")
        self.check_notes_health()

        report = self.generate_report(output_file)
        print("\n" + report["summary"])
        return report


def main():
    parser = argparse.ArgumentParser(description="供应商管理Wiki知识库健康巡检")
    parser.add_argument("--wiki-dir", default="../", help="Wiki根目录路径")
    parser.add_argument("--output", default=None, help="输出JSON报告路径")
    args = parser.parse_args()

    checker = WikiHealthChecker(wiki_dir=args.wiki_dir)
    checker.run(output_file=args.output)


if __name__ == "__main__":
    main()
