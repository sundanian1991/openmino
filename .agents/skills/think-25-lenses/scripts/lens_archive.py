#!/usr/bin/env python3
"""
个人透镜档案生成器 (Lens Archive Generator)

读取用户的透镜使用记录，生成热力图、盲区雷达、有效排行榜等可视化摘要。

用法:
    python3 lens_archive.py --input records.json
    python3 lens_archive.py --input records.json --format html --output report.html
    python3 lens_archive.py --input records.json --format markdown

记录文件格式 (records.json):
    [
      {
        "date": "2026-06-09",
        "scene": "写方案",
        "lenses": ["Architect", "Engineer", "Novelist"],
        "insights": ["...", "..."],
        "actions": ["..."],
        "validated": "待验证"
      }
    ]
"""

import json
import argparse
import sys
from collections import Counter, defaultdict
from datetime import datetime
from typing import List, Dict

# 透镜分类
CATEGORIES = {
    "系统类": ["Engineer", "Architect", "Programmer", "Hacker"],
    "人际类": ["Salesperson", "Psychologist", "Teacher", "Anthropologist"],
    "分析类": ["Economist", "Doctor", "Accountant", "Scientist", "Mathematician"],
    "创意类": ["Artist", "Novelist", "Entrepreneur", "Critic"],
    "策略类": ["Chess Master", "Politician", "Philosopher", "Journalist"],
    "执行类": ["Soldier", "Plumber", "Actor", "Designer"],
}

LENSES_ALL = []
for cat, items in CATEGORIES.items():
    LENSES_ALL.extend(items)


def load_records(path: str) -> List[Dict]:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def analyze(records: List[Dict]) -> Dict:
    """分析记录，生成各项指标"""
    total = len(records)
    lens_counter = Counter()
    category_counter = Counter()
    scene_counter = Counter()
    validated_insights = []
    pending_insights = []

    for r in records:
        for lens in r.get("lenses", []):
            lens_counter[lens] += 1
        for cat, items in CATEGORIES.items():
            if any(l in items for l in r.get("lenses", [])):
                category_counter[cat] += 1
        scene_counter[r.get("scene", "未知")] += 1

        if r.get("validated") == "已验证有效":
            validated_insights.extend(r.get("insights", []))
        elif r.get("validated") == "待验证":
            pending_insights.extend(r.get("insights", []))

    # 盲区计算：从未使用过的透镜
    used = set(lens_counter.keys())
    blind_spots = [l for l in LENSES_ALL if l not in used]

    # 有效透镜排行榜
    effective = []
    for lens in LENSES_ALL:
        count = lens_counter.get(lens, 0)
        if count > 0:
            effective.append((lens, count))
    effective.sort(key=lambda x: x[1], reverse=True)

    return {
        "total": total,
        "lens_counter": dict(lens_counter),
        "category_counter": dict(category_counter),
        "scene_counter": dict(scene_counter),
        "blind_spots": blind_spots,
        "effective_ranking": effective,
        "validated_insights": validated_insights,
        "pending_insights": pending_insights,
    }


def render_heatmap_text(counter: Dict[str, int], total: int) -> str:
    """文本热力图"""
    lines = []
    max_count = max(counter.values()) if counter else 1
    for cat in CATEGORIES.keys():
        count = counter.get(cat, 0)
        pct = (count / total * 100) if total > 0 else 0
        bar_len = int((count / max_count) * 20) if max_count > 0 else 0
        bar = "█" * bar_len + "░" * (20 - bar_len)
        lines.append(f"  {cat:<10} {bar}  {count}次 ({pct:.0f}%)")
    return "\n".join(lines)


def render_markdown(report: Dict) -> str:
    """生成 Markdown 报告"""
    lines = []
    lines.append("# 个人透镜档案摘要")
    lines.append(f"\n> 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"> 累计使用次数：{report['total']}")
    lines.append(f"> 覆盖透镜数：{len(report['lens_counter'])}/25")
    lines.append("")

    lines.append("## 一、透镜热力图（按类别）")
    lines.append(render_heatmap_text(report["category_counter"], report["total"]))
    lines.append("")

    lines.append("## 二、有效透镜排行榜（Top 10）")
    lines.append("")
    lines.append(f"{'排名':<4} {'透镜':<20} {'使用次数'}")
    lines.append("-" * 40)
    for i, (lens, count) in enumerate(report["effective_ranking"][:10], 1):
        lines.append(f"  {i:<4} {lens:<20} {count}")
    lines.append("")

    lines.append("## 三、盲区雷达（从未使用的透镜）")
    if report["blind_spots"]:
        lines.append(f"\n⚠️ 你从未使用过以下 {len(report['blind_spots'])} 个透镜：")
        for lens in report["blind_spots"]:
            lines.append(f"- {lens}")
        lines.append("")
        # 找出盲区所属类别
        blind_cats = defaultdict(list)
        for lens in report["blind_spots"]:
            for cat, items in CATEGORIES.items():
                if lens in items:
                    blind_cats[cat].append(lens)
        for cat, items in blind_cats.items():
            lines.append(f"  - **{cat}盲区**：{', '.join(items)}")
    else:
        lines.append("\n✅ 已覆盖全部25个透镜！")
    lines.append("")

    lines.append("## 四、场景分布")
    sorted_scenes = sorted(report["scene_counter"].items(), key=lambda x: x[1], reverse=True)
    for scene, count in sorted_scenes:
        lines.append(f"- {scene}：{count}次")
    lines.append("")

    lines.append("## 五、洞察验证状态")
    lines.append(f"- 已验证有效洞察：{len(report['validated_insights'])}")
    lines.append(f"- 待验证洞察：{len(report['pending_insights'])}")
    lines.append("")

    lines.append("## 六、训练建议")
    # 根据盲区给出建议
    if report["blind_spots"]:
        top_blind_cat = max(
            ((cat, sum(1 for l in items if l in report["blind_spots"])) for cat, items in CATEGORIES.items()),
            key=lambda x: x[1]
        )
        lines.append(f"\n1. **优先突破盲区**：你最多盲区在「{top_blind_cat[0]}」，建议下次遇到问题时强制使用该类透镜。")

    # 思维偏好模式
    top_cat = max(report["category_counter"].items(), key=lambda x: x[1], default=("无", 0))
    if top_cat[1] > 0:
        lines.append(f"2. **注意思维偏好**：你最常用「{top_cat[0]}」类透镜（{top_cat[1]}次），警惕用同一套思维处理所有问题。")

    lines.append("3. **定期复盘**：每月回顾一次档案，更新验证状态，调整训练重点。")
    lines.append("")

    return "\n".join(lines)


def render_html(report: Dict) -> str:
    """生成 HTML 报告"""
    md = render_markdown(report)
    # 简单转换：把 markdown 转成 HTML 结构
    # 实际应用中可用 markdown 库，这里做简化处理
    html_parts = [
        "<!DOCTYPE html><html><head><meta charset='UTF-8'>",
        "<title>个人透镜档案</title>",
        "<style>",
        "body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;background:#FAF8F5;color:#333;}",
        "h1{border-bottom:2px solid #CC6B1E;padding-bottom:10px;}",
        "h2{border-bottom:1px solid #E5E2DE;padding-bottom:6px;margin-top:30px;}",
        "table{width:100%;border-collapse:collapse;margin:10px 0;}",
        "th,td{padding:8px 12px;text-align:left;border-bottom:1px solid #E5E2DE;}",
        "th{background:#FFF8F0;color:#CC6B1E;}",
        "code{background:#F0EEEB;padding:2px 6px;font-size:13px;}",
        ".bar{background:#CC6B1E;height:16px;display:inline-block;margin-right:8px;}",
        "</style></head><body>",
    ]

    # 简化：直接嵌入 pre 格式的 markdown
    html_parts.append(f"<pre style='white-space:pre-wrap;font-family:inherit;line-height:1.8;'>{md}</pre>")
    html_parts.append("</body></html>")
    return "\n".join(html_parts)


def main():
    parser = argparse.ArgumentParser(description="个人透镜档案生成器")
    parser.add_argument("--input", required=True, help="记录文件路径 (JSON)")
    parser.add_argument("--format", choices=["markdown", "html", "json"], default="markdown",
                        help="输出格式")
    parser.add_argument("--output", help="输出文件路径（默认输出到stdout）")
    args = parser.parse_args()

    records = load_records(args.input)
    report = analyze(records)

    if args.format == "json":
        output = json.dumps(report, ensure_ascii=False, indent=2)
    elif args.format == "html":
        output = render_html(report)
    else:
        output = render_markdown(report)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"报告已保存到: {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
