#!/usr/bin/env python3
"""
suilu 储备沉淀辅助分析脚本
读取 raw/ 中的原始输入，输出基础统计和沉淀报告草稿。

用法:
    python3 scripts/analyze.py raw/2026.md
    python3 scripts/analyze.py raw/2026.md --output reserve/2026.md
"""

import re
import sys
import json
import argparse
from collections import Counter
from datetime import datetime
from pathlib import Path


def load_topics(topics_file=None):
    """从外部 JSON 文件加载主题词库，默认读取同目录下的 topics.json"""
    if topics_file is None:
        topics_file = Path(__file__).parent / "topics.json"
    else:
        topics_file = Path(topics_file)

    if not topics_file.exists():
        print(f"警告：词库文件 {topics_file} 不存在，使用内置默认词库")
        return {
            "供应商管理": ["供应商", "BPO", "续约", "流失", "清退", "五项制度", "风控线"],
            "定价与谈判": ["定价", "降价", "谈判", "单价", "费效", "利润率", "成本"],
            "团队与人力": ["自建", "产能", "人力", "出勤", "司龄", "MOB", "宿迁"],
            "间接杠杆": ["间接杠杆", "流程", "管控", "制度", "操作空间", "无权"],
            "数据与AI": ["数据口径", "AI", "模型", "分析", "数字化", "智能纪要"],
            "行业认知": ["行业", "周期", "市场", "竞争", "趋势", "退场"],
            "个人觉察": ["觉察", "意识到", "想到", "发现", "反思", "框架"],
            "上下游协作": ["军哥", "年老师", "王易人", "策略组", "汇报", "周会"],
        }

    with open(topics_file, "r", encoding="utf-8") as f:
        return json.load(f)


# 延迟加载，main() 中初始化
TOPIC_KEYWORDS = None


def parse_raw_entries(filepath):
    """解析 raw/ 文件，提取 (日期, 内容) 列表"""
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    # 匹配 ## YYYY-MM-DD 开头的条目
    pattern = r"##\s+(\d{4}-\d{2}-\d{2})\s*\n>\s*(.+?)(?=\n##\s+\d{4}-\d{2}-\d{2}|\Z)"
    matches = re.findall(pattern, text, re.DOTALL)

    entries = []
    for date_str, content in matches:
        # 清理内容：去掉换行符，保留为连续文本
        content_clean = " ".join(content.strip().split())
        entries.append((date_str, content_clean))

    return entries


def basic_stats(entries):
    """基础统计"""
    total_entries = len(entries)
    total_chars = sum(len(content) for _, content in entries)
    dates = [datetime.strptime(d, "%Y-%m-%d") for d, _ in entries]

    if not dates:
        return {}

    date_range = f"{min(dates).strftime('%Y-%m-%d')} ~ {max(dates).strftime('%Y-%m-%d')}"
    days_span = (max(dates) - min(dates)).days + 1
    avg_per_day = total_entries / days_span if days_span > 0 else 0
    avg_chars = total_chars / total_entries if total_entries > 0 else 0

    return {
        "总条数": total_entries,
        "总字数": total_chars,
        "时间跨度": date_range,
        "天数": days_span,
        "日均条数": round(avg_per_day, 2),
        "平均每条字数": round(avg_chars, 1),
    }


def topic_density(entries, topic_keywords):
    """主题密度分析"""
    topic_counts = {topic: 0 for topic in topic_keywords}
    topic_entries = {topic: [] for topic in topic_keywords}

    for date_str, content in entries:
        for topic, keywords in topic_keywords.items():
            if any(kw in content for kw in keywords):
                topic_counts[topic] += 1
                # 记录摘要（前30字）
                summary = content[:30] + "..." if len(content) > 30 else content
                topic_entries[topic].append(f"[{date_str}] {summary}")

    return topic_counts, topic_entries


def high_freq_words(entries, top_n=15):
    """高频词统计（简单分词，2字及以上）"""
    all_text = " ".join(content for _, content in entries)
    # 简单分词：连续的中文字符
    words = re.findall(r"[\u4e00-\u9fa5]{2,}", all_text)
    # 过滤常见停用词
    stopwords = set([
        "一个", "这个", "那个", "今天", "现在", "就是", "什么", "怎么", "觉得",
        "觉得", "知道", "没有", "可以", "可能", "因为", "所以", "然后", "但是",
        "不过", "还是", "一下", "一点", "一些", "一直", "已经", "其实", "感觉",
        "时候", "东西", "事情", "问题", "地方", "方式", "方法", "时间", "结果",
        "情况", "部分", "方面", "过程", "水平", "标准", "基础", "意义", "作用",
        "进行", "通过", "根据", "关于", "对于", "作为", "成为", "出现", "发生",
        "需要", "能够", "应该", "必须", "不要", "不能", "不会", "不要", "不用",
    ])
    filtered = [w for w in words if w not in stopwords and len(w) >= 2]
    counter = Counter(filtered)
    return counter.most_common(top_n)


def generate_reserve_report(entries, stats, topic_counts, topic_entries, freq_words):
    """生成储备沉淀报告草稿"""
    lines = []
    lines.append("## 储备沉淀报告（辅助分析）")
    lines.append("")
    lines.append(f"> 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"> 数据来源：raw/ 原始输入")
    lines.append("")

    # 基础统计
    lines.append("### 基础统计")
    for k, v in stats.items():
        lines.append(f"- {k}：{v}")
    lines.append("")

    # 主题密度
    lines.append("### 主题密度")
    sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
    for topic, count in sorted_topics:
        trend = "↑" if count >= 3 else "→" if count >= 1 else "↓"
        lines.append(f"| {topic} | {count} | {trend} |")
        # 附上前3条相关摘要
        if topic_entries[topic]:
            for summary in topic_entries[topic][:3]:
                lines.append(f"  - {summary}")
    lines.append("")

    # 高频词
    lines.append("### 高频词（前15）")
    for word, count in freq_words:
        lines.append(f"- {word}：{count} 次")
    lines.append("")

    # 可深挖点提示
    lines.append("### 可深挖点（待人工筛选）")
    lines.append("以下基于主题交叉和高频词自动生成，需人工判断：")
    lines.append("")

    # 自动生成交叉提示
    cross_hints = []
    top_topics = [t for t, c in sorted_topics[:3] if c > 0]
    if len(top_topics) >= 2:
        cross_hints.append(f"1. **{top_topics[0]} × {top_topics[1]}**：两个高频主题是否有内在关联？交叉点在哪？")
    if freq_words:
        cross_hints.append(f"2. **高频词 '{freq_words[0][0]}' 的语境变化**：同一词在不同时间/场景中出现，含义是否发生了偏移？")
    if len(entries) >= 5:
        cross_hints.append("3. **时间演变**：最早和最晚的条目中，对同一问题的表述是否有变化？")

    for hint in cross_hints:
        lines.append(hint)
    lines.append("")

    # 待验证假设提示
    lines.append("### 待验证假设（需人工补充）")
    lines.append("| 假设 | 来源条目 | 当前证据 | 状态 |")
    lines.append("|------|---------|---------|------|")
    lines.append("| （请根据原始内容填写） | | | 待验证 |")
    lines.append("")

    # 行动线索提示
    lines.append("### 行动线索（需人工补充）")
    lines.append("| 线索 | 来源条目 | 下一步动作 |")
    lines.append("|------|---------|-----------|")
    lines.append("| （请根据原始内容填写） | | |")
    lines.append("")

    lines.append("---")
    lines.append("> 注：本报告由 analyze.py 自动生成，交叉深挖点和假设需结合人工阅读原始内容后判断。")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="suilu 储备沉淀辅助分析")
    parser.add_argument("input", help="raw/ 文件路径，如 raw/2026.md")
    parser.add_argument("--output", "-o", help="输出到指定文件（追加模式）")
    parser.add_argument("--topics", "-t", help="主题词库 JSON 文件路径（默认读取 scripts/topics.json）")
    args = parser.parse_args()

    # 加载词库
    topic_keywords = load_topics(args.topics)

    entries = parse_raw_entries(args.input)
    if not entries:
        print("未找到有效条目。请确认文件格式为：")
        print("## YYYY-MM-DD")
        print("> 原始输入内容...")
        sys.exit(1)

    stats = basic_stats(entries)
    topic_counts, topic_entries = topic_density(entries, topic_keywords)
    freq_words = high_freq_words(entries)

    report = generate_reserve_report(entries, stats, topic_counts, topic_entries, freq_words)

    if args.output:
        with open(args.output, "a", encoding="utf-8") as f:
            f.write("\n\n")
            f.write(report)
        print(f"报告已追加到：{args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
