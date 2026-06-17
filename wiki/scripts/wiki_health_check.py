#!/usr/bin/env python3
"""
Wiki Health Check — 供应商管理知识库健康巡检脚本
卡帕西式三层架构健康度检测（从 ../wiki/scripts 迁移，逻辑通用）

功能：
1. 检查来源标注完整性（distill层是否标注了[来源]，子段继承上级来源）
2. 检查冲突记录状态（认 ✅ 已解决标记，不算 open）
3. 检查待验证假设数量
4. 检查raw/原文层文件完整性（严格编码校验，忽略描述性文字）
5. 输出健康度报告（支持多来源逗号分隔引用）

使用方式：
    cd wiki/scripts && python3 wiki_health_check.py
    # 或带参数：
    python3 wiki_health_check.py --wiki-dir ../ --output report.json

作者：年老师
日期：2026-06-17（供应商wiki主版本，2026-06-17含继承+严格校验改进，含继承+严格校验改进）
"""

import re
import json
import argparse
from pathlib import Path
from datetime import datetime

# 模块级正则常量（避免在函数内反复编译，且规避 Edit 工具对含 $ 正则的处理问题）
SECTION_SUFFIX_RE = re.compile(r"\s*§.*$")
VALID_FILENAME_RE = re.compile(r"^[A-Z]{2,3}-\d{4}-\d{3}(?:[_\.]|$)")
VALID_EXTS = ('.md', '.json', '.docx', '.pdf', '.txt', '.xlsx', '.pptx')


def is_valid_raw_ref(ref):
    """判断一个字符串是否是合法的 raw 文件引用（而非描述性文字）。
    合法 = 形如 VZ-2026-001 或 VZ-2026-001_主题.md；非法 = "VZ-2026-900 各图表最佳实践"。
    """
    ref = ref.strip()
    if not ref or re.search(r"[（）()]", ref):
        return False
    ref_clean = ref.split("/")[-1]
    ref_clean = SECTION_SUFFIX_RE.sub("", ref_clean).strip()
    if VALID_FILENAME_RE.match(ref_clean):
        return True
    if ref_clean.endswith(VALID_EXTS) and VALID_FILENAME_RE.match(ref_clean):
        return True
    return False


def normalize_raw_ref(ref):
    """把合法引用归一化为文件名（去路径前缀、去 § 描述后缀）。"""
    ref = ref.strip().split("/")[-1]
    return SECTION_SUFFIX_RE.sub("", ref).strip()


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
        """检查提炼层的来源标注完整性（子段继承最近的来源标注）"""
        if not self.distill_dir.exists():
            self.issues.append(("ERROR", "distill/目录不存在"))
            return

        source_pattern = re.compile(r"\[来源[：:]")
        section_pattern = re.compile(r"^#{2,4}\s+(.+)$", re.MULTILINE)
        skip_words = ["索引", "导航", "总览", "速查", "目录",
                      "与其他分册的关联", "交叉链接", "关联分册"]

        for md_file in sorted(self.distill_dir.glob("*.md")):
            self.stats["distill_files"] += 1
            content = md_file.read_text(encoding="utf-8")
            self.stats["total_lines_distill"] += len(content.splitlines())

            # 00_索引文件是地图，整体跳过来源检查
            if md_file.name.startswith("00_"):
                continue

            sections = section_pattern.split(content)
            last_source = None  # 子段继承锚点
            for i in range(1, len(sections), 2):
                if i >= len(sections):
                    break
                section_title = sections[i].strip()
                section_content = sections[i + 1] if i + 1 < len(sections) else ""
                if any(w in section_title for w in skip_words):
                    # 被跳过的导航段若含来源，仍更新继承锚点（不影响统计）
                    if source_pattern.search(section_content):
                        last_source = section_title
                    continue
                has_own = bool(source_pattern.search(section_content))
                if has_own:
                    self.stats["sections_with_source"] += 1
                    last_source = section_title
                elif last_source is not None:
                    self.stats["sections_with_source"] += 1  # 继承上级
                else:
                    # 只对含表格或列表的内容段报缺来源
                    head = section_content.split("\n")[:10]
                    if any(l.strip().startswith("|") or l.strip().startswith("- ") for l in head):
                        self.stats["sections_without_source"] += 1
                        self.issues.append((
                            "WARN",
                            f"[{md_file.name}] §{section_title[:30]} 缺少[来源]标注"
                        ))

    def check_raw_completeness(self):
        """检查distill中引用的raw文件是否都存在（严格编码校验）"""
        if not self.raw_dir.exists():
            self.issues.append(("ERROR", "raw/目录不存在"))
            return

        self.stats["raw_files"] = len(list(self.raw_dir.iterdir()))

        raw_ref_pattern = re.compile(r"`?raw/([^`\s\],，]+)`?")
        source_ref_pattern = re.compile(r"\[来源[：:]\s*([^\]]+)\]")

        referenced_raws = set()
        for md_file in self.distill_dir.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            for match in raw_ref_pattern.finditer(content):
                if is_valid_raw_ref(match.group(1)):
                    referenced_raws.add(normalize_raw_ref(match.group(1)))
            for match in source_ref_pattern.finditer(content):
                ref_str = match.group(1).strip()
                # 支持多来源逗号分隔：[来源：raw/A.md, raw/B.md]
                for ref in re.split(r"[,，]", ref_str):
                    ref = ref.strip()
                    if ("raw/" in ref or ref.endswith(".md") or ref.endswith(".json")) and \
                       not any(s in ref for s in ["scripts/", "notes/", "distill/", "目录"]):
                        if is_valid_raw_ref(ref):
                            referenced_raws.add(normalize_raw_ref(ref))

        for ref in referenced_raws:
            if not ref or ref.strip() in [")", "）", "", " "]:
                continue
            ref = ref.strip()
            possible_names = [ref, ref + ".md", ref + ".json",
                              ref + ".docx", ref + ".pdf", ref + ".txt"]
            found = any((self.raw_dir / n).exists() for n in possible_names)
            if not found and "/" in ref:
                found = (self.raw_dir / ref).exists()
            if not found:
                for raw_file in self.raw_dir.rglob("*"):
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

        conflict_file = self.notes_dir / "冲突记录.md"
        if conflict_file.exists():
            content = conflict_file.read_text(encoding="utf-8")
            conflicts_all = re.findall(r"### 冲突\d+", content)
            resolved_markers = re.compile(r"✅|☑️|已解决|已确认|已修正|用户已确认|状态[：:]\s*\[?✅")
            conflicts_resolved = 0
            blocks = re.split(r"(?=### 冲突\d+)", content)
            for block in blocks:
                if block.startswith("### 冲突") and resolved_markers.search(block):
                    conflicts_resolved += 1
            self.stats["conflicts_open"] = len(conflicts_all) - conflicts_resolved

        assumption_file = self.notes_dir / "待验证假设.md"
        if assumption_file.exists():
            content = assumption_file.read_text(encoding="utf-8")
            self.stats["assumptions_pending"] = len(re.findall(r"### 假设\d+", content))

    def _calculate_health_score(self):
        """计算健康度得分（0-100）"""
        score = 100
        score -= sum(1 for lv, _ in self.issues if lv == "ERROR") * 15
        score -= sum(1 for lv, _ in self.issues if lv == "WARN") * 5
        if self.stats["assumptions_pending"] > 5:
            score -= 10
        total = self.stats["sections_with_source"] + self.stats["sections_without_source"]
        if total > 0:
            coverage = self.stats["sections_with_source"] / total
            if coverage < 0.5:
                score -= 20
            elif coverage < 0.8:
                score -= 10
        return max(0, score)

    def _get_coverage(self):
        total = self.stats["sections_with_source"] + self.stats["sections_without_source"]
        if total == 0:
            return "N/A"
        return f"{self.stats['sections_with_source']}/{total} ({self.stats['sections_with_source']/total*100:.1f}%)"

    def _generate_summary(self):
        lines = ["=" * 50, "供应商管理知识库健康巡检报告", "=" * 50]
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
            for lv, msg in self.issues[:20]:
                icon = "🔴" if lv == "ERROR" else "🟡"
                lines.append(f"  {icon} [{lv}] {msg}")
            if len(self.issues) > 20:
                lines.append(f"  ... 还有 {len(self.issues)-20} 个问题未显示")
        lines.append("=" * 50)
        return "\n".join(lines)

    def generate_report(self, output_file=None):
        report = {
            "timestamp": datetime.now().isoformat(),
            "wiki_dir": str(self.wiki_dir),
            "stats": self.stats,
            "health_score": self._calculate_health_score(),
            "issues": [{"level": lv, "message": m} for lv, m in self.issues],
            "summary": self._generate_summary(),
        }
        if output_file:
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(report, f, ensure_ascii=False, indent=2)
            print(f"报告已保存至: {output_file}")
        return report

    def run(self, output_file=None):
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
    WikiHealthChecker(wiki_dir=args.wiki_dir).run(output_file=args.output)


if __name__ == "__main__":
    main()
