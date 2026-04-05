#!/usr/bin/env python3
"""
从 MyAgents sessions 目录提炼学习记录 V2
更精准地提取纠正、错误、最佳实践、功能请求
"""

import json
import os
import re
from datetime import datetime
from collections import defaultdict, Counter
from pathlib import Path
from typing import List, Dict, Set, Tuple

# 用户消息的关键词模式（更严格）
USER_CORRECTION_PATTERNS = [
    r'不对', r'错了', r'不是这样', r'你搞错了', r'你理解错了',
    r'理解反了', r'不是这个意思', r'不要这样',
    r'错了啊', r'搞错了', r'不正确'
]

USER_ERROR_PATTERNS = [
    r'报错', r'出错了', r'失败', r'有问题', r'不行',
    r'无法.*完成', r'做不到', r'出错'
]

USER_FEATURE_PATTERNS = [
    r'能不能(帮|加|增|支持)', r'我(希望|想要|还缺|还需要)',
    r'需要.*功能', r'想要.*功能', r'希望.*功能',
    r'能不能做个', r'能不能搞个'
]

# 明确的纠正句式
CORRECTION_SENTENCE_PATTERNS = [
    r'^应该', r'^应该是', r'^应该是用', r'^要用',
    r'^正确的是', r'^不对，',
    r'^不是.*是', r'^应该是.*不是',
    r'^你得', r'^你需要',
    r'^记录下', r'^记住',
    r'^错了\.', r'^错了：'
]

# 忽略的模式
IGNORE_PATTERNS = [
    r'^现在几点了', r'^你好', r'^在吗', r'^谢谢', r'^好的，谢谢',
    r'^明白了', r'^懂了', r'^知道了', r'^继续', r'^嗯嗯',
    r'^[，，。、？！\s]*$',
    r'^\[{',  # JSON/工具调用输出
    r'^Error:', r'^error:',  # 系统错误消息
]

def extract_date(timestamp: str) -> str:
    """从ISO时间戳提取日期"""
    try:
        dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        return dt.strftime('%Y-%m-%d')
    except:
        return 'unknown'

def is_valid_user_message(content: str) -> bool:
    """检查是否是有效的用户消息（排除工具输出、系统消息）"""
    content_stripped = content.strip()

    # 检查是否应该忽略
    for pattern in IGNORE_PATTERNS:
        if re.match(pattern, content_stripped, re.MULTILINE):
            return False

    # 排除纯工具输出（JSON 格式）
    if content_stripped.startswith('[{"type":') or content_stripped.startswith('{"type":'):
        return False

    # 排除太短的消息（<5字符）
    if len(content_stripped) < 5:
        return False

    return True

def classify_user_message(content: str) -> Tuple[str, str]:
    """
    分类用户消息
    返回: (类型, 优先级)
    """
    if not is_valid_user_message(content):
        return None, None

    content_lower = content.lower()

    # 检查纠正句式（最高优先级）
    for pattern in CORRECTION_SENTENCE_PATTERNS:
        if re.search(pattern, content, re.MULTILINE):
            return 'correction', 'high'

    # 检查纠正关键词
    for pattern in USER_CORRECTION_PATTERNS:
        if re.search(pattern, content):
            # 包含核心/重要/关键等词 → 高优先级
            if any(kw in content for kw in ['核心', '关键', '重要', '必须', '永远', '禁止', '强制']):
                return 'correction', 'high'
            return 'correction', 'medium'

    # 检查功能请求
    for pattern in USER_FEATURE_PATTERNS:
        if re.search(pattern, content):
            return 'feature_request', 'medium'

    # 检查错误/问题
    for pattern in USER_ERROR_PATTERNS:
        if re.search(pattern, content):
            return 'error', 'medium'

    return None, None

def extract_keywords(content: str) -> List[str]:
    """提取关键词"""
    keywords = []

    # 技术关键词
    tech_keywords = {
        'python', 'javascript', 'html', 'css', 'svg', 'ppt', 'excel',
        'git', 'github', 'api', 'json', 'markdown', 'regex', 'bash', 'shell',
        'agent', 'skill', 'frontend', 'backend', 'database', 'mcp'
    }

    # 业务关键词
    business_keywords = {
        '供应商', '人力', '数据', '分析', '报告', '图表',
        '设计', '格式', '排版', '颜色', '字体', '布局',
        '记忆', '档案', '规则', '流程', '文档', '技能',
        'mino-frontend', 'hand-drawn', 'pptx', 'workspace'
    }

    content_lower = content.lower()

    for keyword in tech_keywords | business_keywords:
        if keyword.lower() in content_lower:
            keywords.append(keyword)

    return keywords[:5]

def summarize_content(content: str, max_len: int = 150) -> str:
    """生成内容摘要"""
    # 移除多余换行和空格
    summary = re.sub(r'\s+', ' ', content.strip())

    if len(summary) > max_len:
        summary = summary[:max_len] + '...'

    return summary

def process_jsonl_file(filepath: Path) -> List[Dict]:
    """处理单个jsonl文件"""
    records = []

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    role = data.get('role', '')
                    content = data.get('content', '')
                    timestamp = data.get('timestamp', '')

                    if role != 'user' or not content:
                        continue

                    # 分类用户消息
                    msg_type, priority = classify_user_message(content)

                    if not msg_type:
                        continue

                    date = extract_date(timestamp)
                    keywords = extract_keywords(content)
                    summary = summarize_content(content)

                    records.append({
                        'date': date,
                        'type': msg_type,
                        'priority': priority,
                        'summary': summary,
                        'keywords': keywords,
                        'full_content': content,
                        'source_file': filepath.name
                    })

                except (json.JSONDecodeError, KeyError):
                    continue
                except Exception:
                    continue

    except Exception:
        pass

    return records

def cluster_and_deduplicate(records: List[Dict]) -> List[Dict]:
    """聚类相似记录并去重"""
    # 按日期分组
    by_date = defaultdict(list)
    for record in records:
        by_date[record['date']].append(record)

    # 在同一天内，查找相似记录（摘要相似度 > 80%）
    unique_records = []
    seen_signatures = set()

    for date, day_records in by_date.items():
        for i, record in enumerate(day_records):
            # 生成签名（前50字符 + 类型）
            signature = (record['summary'][:50], record['type'])

            if signature in seen_signatures:
                continue

            seen_signatures.add(signature)
            unique_records.append(record)

    return unique_records

def extract_insights(records: List[Dict]) -> Dict[str, List[Dict]]:
    """提取洞察（高频主题）"""
    # 按关键词聚类
    keyword_clusters = defaultdict(list)

    for record in records:
        if record['keywords']:
            primary_keyword = record['keywords'][0]
            keyword_clusters[primary_keyword].append(record)

    # 找出高频主题（≥5条记录）
    high_frequency_topics = {
        kw: records_list
        for kw, records_list in keyword_clusters.items()
        if len(records_list) >= 5
    }

    return high_frequency_topics

def main():
    """主函数"""
    sessions_dir = Path.home() / '.myagents' / 'sessions'
    output_dir = Path.home() / 'Documents' / 'projects' / 'ai-agents' / 'my-agent' / 'workspace' / 'inbox'
    output_file = output_dir / f'learning-records-v2-{datetime.now().strftime("%Y%m%d")}.md'

    output_dir.mkdir(parents=True, exist_ok=True)

    all_records = []
    file_count = 0
    processed_count = 0

    print(f"📂 扫描目录: {sessions_dir}")

    # 遍历所有jsonl文件
    for filepath in sessions_dir.glob('*.jsonl'):
        file_count += 1
        if file_count % 100 == 0:
            print(f"🔄 已扫描 {file_count} 个文件...")

        records = process_jsonl_file(filepath)
        if records:
            all_records.extend(records)
            processed_count += 1

    print(f"\n📊 扫描完成:")
    print(f"   - 总文件数: {file_count}")
    print(f"   - 有效文件: {processed_count}")
    print(f"   - 提取记录: {len(all_records)} 条")

    if not all_records:
        print(f"\n⚠️  没有提取到有效记录")
        return

    # 聚类去重
    print(f"\n🔄 聚类去重中...")
    unique_records = cluster_and_deduplicate(all_records)
    print(f"   - 去重后: {len(unique_records)} 条")

    # 提取高频主题
    print(f"\n🔄 分析高频主题...")
    insights = extract_insights(unique_records)
    print(f"   - 高频主题: {len(insights)} 个")

    # 按日期倒序排序
    unique_records.sort(key=lambda x: x['date'], reverse=True)

    # 按优先级分组
    high_priority = [r for r in unique_records if r.get('priority') == 'high']
    medium_priority = [r for r in unique_records if r.get('priority') == 'medium']

    print(f"\n📊 优先级分布:")
    print(f"   - 高优先级: {len(high_priority)} 条")
    print(f"   - 中优先级: {len(medium_priority)} 条")

    # 生成输出
    print(f"\n📝 生成报告: {output_file}")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"# 学习记录提炼报告 V2\n\n")
        f.write(f"> 提取时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"> 数据源: {file_count} 个会话文件\n")
        f.write(f"> 有效记录: {len(unique_records)} 条（去重后）\n\n")

        f.write(f"## 📊 统计概览\n\n")
        f.write(f"- **总记录数**: {len(unique_records)} 条\n")
        f.write(f"- **高优先级**: {len(high_priority)} 条\n")
        f.write(f"- **中优先级**: {len(medium_priority)} 条\n")
        f.write(f"- **高频主题**: {len(insights)} 个\n\n")

        # 高频主题洞察
        if insights:
            f.write(f"## 🔍 高频主题洞察\n\n")
            for keyword, records_list in sorted(insights.items(), key=lambda x: len(x[1]), reverse=True)[:10]:
                f.write(f"### {keyword} ({len(records_list)} 条)\n\n")
                # 显示最近3条
                for record in records_list[:3]:
                    f.write(f"- **{record['date']}**: {record['summary'][:80]}...\n")
                f.write(f"\n")

        # 高优先级记录
        if high_priority:
            f.write(f"\n## 🔴 高优先级记录 ({len(high_priority)} 条)\n\n")
            for i, record in enumerate(high_priority[:100], 1):  # 最多100条
                f.write(f"### {i}. {record['date']} — {record['type'].upper()}\n\n")
                f.write(f"> {record['summary']}\n\n")
                if record['keywords']:
                    f.write(f"**关键词**: {', '.join(record['keywords'])}\n\n")
                f.write(f"---\n\n")

            if len(high_priority) > 100:
                f.write(f"\n*...还有 {len(high_priority) - 100} 条记录省略*\n\n")

        # 中优先级记录
        if medium_priority:
            f.write(f"\n## 🟡 中优先级记录 ({len(medium_priority)} 条)\n\n")
            f.write(f"*显示前 50 条*\n\n")
            for i, record in enumerate(medium_priority[:50], 1):
                f.write(f"### {i}. {record['date']} — {record['type'].upper()}\n\n")
                f.write(f"> {record['summary']}\n\n")
                if record['keywords']:
                    f.write(f"**关键词**: {', '.join(record['keywords'])}\n\n")
                f.write(f"---\n\n")

            if len(medium_priority) > 50:
                f.write(f"\n*...还有 {len(medium_priority) - 50} 条记录省略*\n\n")

    print(f"\n✅ 完成! 报告已保存到: {output_file}")

if __name__ == '__main__':
    main()
