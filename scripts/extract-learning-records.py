#!/usr/bin/env python3
"""
从 MyAgents sessions 目录提炼学习记录
处理 700 个 jsonl 文件，提取纠正、错误、最佳实践、功能请求
"""

import json
import os
import re
from datetime import datetime
from collections import defaultdict
from pathlib import Path
from typing import List, Dict, Set

# 目标关键词模式
PATTERNS = {
    'correction': [
        r'不对', r'错了', r'不是这样', r'你搞错了', r'错误',
        r'不要这样', r'不是这个意思', r'不是', r'不行',
        r'有问题', r'不正确', r'错了啊', r'搞错了',
        r'你理解错了', r'理解反了', r'应该'
    ],
    'error': [
        r'error', r'Error', r'ERROR', r'failed', r'Failed', r'FAILED',
        r'exception', r'Exception', r'EXCEPTION', r'无法完成',
        r'做不到', r'不行', r'失败', r'报错', r'出错'
    ],
    'best_practice': [
        r'^对$', r'^好的$', r'^可以$', r'^行$', r'^就这样', r'^可以了',
        r'很好', r'不错', r'是的', r'正确', r'认可',
        r'就这样做', r'可以了，', r'对，', r'好的，'
    ],
    'feature_request': [
        r'能不能', r'能不能帮', r'我希望', r'我还想要',
        r'能不能加', r'能不能增加', r'能不能支持',
        r'需要.*功能', r'想要.*功能', r'希望.*功能'
    ]
}

# 忽略的闲聊模式
IGNORE_PATTERNS = [
    r'^现在几点了', r'^你好', r'^在吗', r'^谢谢', r'^好的，谢谢',
    r'^明白了', r'^懂了', r'^知道了', r'^继续', r'^嗯',
    r'^[，，。、？！]*$'
]

def extract_date(timestamp: str) -> str:
    """从ISO时间戳提取日期"""
    try:
        dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        return dt.strftime('%Y-%m-%d')
    except:
        return 'unknown'

def matches_any_pattern(text: str, patterns: List[str]) -> bool:
    """检查文本是否匹配任一模式"""
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE | re.MULTILINE):
            return True
    return False

def should_ignore(content: str) -> bool:
    """检查是否应该忽略此内容"""
    content_stripped = content.strip()
    for pattern in IGNORE_PATTERNS:
        if re.match(pattern, content_stripped):
            return True
    return False

def classify_message(content: str, role: str) -> Set[str]:
    """分类消息类型"""
    if should_ignore(content):
        return set()

    types = set()

    # 只分析 user 消息（assistant 的回复不算）
    # 除非是明确的错误消息
    if role == 'user':
        # 按优先级检查（避免重复分类）
        if matches_any_pattern(content, PATTERNS['correction']):
            types.add('correction')
        elif matches_any_pattern(content, PATTERNS['error']):
            types.add('error')
        elif matches_any_pattern(content, PATTERNS['best_practice']):
            # 只检查简单的确认短语
            if re.match(r'^(对|好的|可以|行)$', content.strip()):
                types.add('best_practice')
        elif matches_any_pattern(content, PATTERNS['feature_request']):
            types.add('feature_request')
    elif role == 'assistant':
        # 只处理明确的错误消息
        if any(err in content.lower() for err in ['error', 'failed', 'exception', '无法', '做不到', '不行']):
            if matches_any_pattern(content, PATTERNS['error']):
                types.add('error')

    return types

def determine_priority(content: str, msg_type: str) -> str:
    """确定优先级"""
    high_priority_keywords = [
        '核心', '关键', '重要', '必须', '一定',
        '永远', '禁止', '强制', '不要', '不能'
    ]

    content_lower = content.lower()

    # 高优先级：关键词或纠正类
    if msg_type == 'correction' or any(kw in content for kw in high_priority_keywords):
        return 'high'
    # 中优先级：错误或功能请求
    elif msg_type in ['error', 'feature_request']:
        return 'medium'
    # 低优先级：最佳实践
    else:
        return 'low'

def extract_keywords(content: str) -> List[str]:
    """提取关键词"""
    # 技术关键词
    tech_keywords = [
        'python', 'javascript', 'html', 'css', 'svg', 'ppt', 'excel',
        'git', 'api', 'json', 'markdown', 'regex', 'bash', 'shell',
        'agent', 'skill', 'frontend', 'backend', 'database'
    ]

    # 业务关键词
    business_keywords = [
        '供应商', '人力', '数据', '分析', '报告', '图表',
        '设计', '格式', '排版', '颜色', '字体', '布局',
        '记忆', '档案', '规则', '流程', '文档'
    ]

    keywords = []
    content_lower = content.lower()

    for keyword in tech_keywords + business_keywords:
        if keyword.lower() in content_lower:
            keywords.append(keyword)

    return keywords[:5]  # 最多返回5个关键词

def process_jsonl_file(filepath: Path) -> List[Dict]:
    """处理单个jsonl文件"""
    records = []

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                try:
                    data = json.loads(line.strip())
                    role = data.get('role', '')
                    content = data.get('content', '')
                    timestamp = data.get('timestamp', '')

                    if not content or not role:
                        continue

                    # 分类消息
                    msg_types = classify_message(content, role)

                    if not msg_types:
                        continue

                    date = extract_date(timestamp)

                    # 为每种类型创建记录
                    for msg_type in msg_types:
                        priority = determine_priority(content, msg_type)
                        keywords = extract_keywords(content)

                        # 摘要（取前100字符）
                        summary = content[:100].replace('\n', ' ').strip()
                        if len(content) > 100:
                            summary += '...'

                        records.append({
                            'date': date,
                            'type': msg_type,
                            'priority': priority,
                            'summary': summary,
                            'keywords': keywords,
                            'source_file': filepath.name,
                            'line': line_num
                        })

                except json.JSONDecodeError:
                    continue
                except Exception:
                    continue

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

    return records

def deduplicate_records(records: List[Dict]) -> List[Dict]:
    """去重并统计重复次数"""
    seen = defaultdict(int)
    unique_records = []

    for record in records:
        # 用日期+类型+摘要前50字符作为唯一键
        key = (record['date'], record['type'], record['summary'][:50])
        seen[key] += 1

        if seen[key] == 1:  # 第一次出现
            unique_records.append(record)
        else:
            # 后续出现：增加重复次数标记
            record['duplicate_count'] = seen[key] - 1

    return unique_records

def cluster_similar_records(records: List[Dict]) -> List[Dict]:
    """聚类相似记录（简单实现：按类型+关键词分组）"""
    clusters = defaultdict(list)

    for record in records:
        # 按类型和主要关键词聚类
        if record['keywords']:
            key = (record['type'], record['keywords'][0])
        else:
            key = (record['type'], 'other')

        clusters[key].append(record)

    # 如果某个聚类有3条以上记录，标记为"高频问题"
    for key, cluster_records in clusters.items():
        if len(cluster_records) >= 3:
            for record in cluster_records:
                record['is_frequent'] = True
                record['cluster_size'] = len(cluster_records)

    return records

def main():
    """主函数"""
    sessions_dir = Path.home() / '.myagents' / 'sessions'
    output_file = Path.home() / 'Documents' / 'projects' / 'ai-agents' / 'my-agent' / 'workspace' / 'inbox' / f'learning-records-{datetime.now().strftime("%Y%m%d")}.md'

    all_records = []
    file_count = 0
    processed_count = 0

    print(f"📂 扫描目录: {sessions_dir}")

    # 遍历所有jsonl文件
    for filepath in sessions_dir.glob('*.jsonl'):
        file_count += 1
        if file_count % 50 == 0:
            print(f"🔄 已扫描 {file_count} 个文件...")

        records = process_jsonl_file(filepath)
        if records:
            all_records.extend(records)
            processed_count += 1

    print(f"\n📊 扫描完成:")
    print(f"   - 总文件数: {file_count}")
    print(f"   - 有效文件: {processed_count}")
    print(f"   - 提取记录: {len(all_records)} 条")

    # 去重
    print(f"\n🔄 去重中...")
    unique_records = deduplicate_records(all_records)
    print(f"   - 去重后: {len(unique_records)} 条")

    # 聚类
    print(f"\n🔄 聚类相似记录...")
    clustered_records = cluster_similar_records(unique_records)

    # 按日期倒序排序
    clustered_records.sort(key=lambda x: x['date'], reverse=True)

    # 按优先级分组
    high_priority = [r for r in clustered_records if r.get('priority') == 'high']
    medium_priority = [r for r in clustered_records if r.get('priority') == 'medium']
    low_priority = [r for r in clustered_records if r.get('priority') == 'low']

    print(f"\n📊 优先级分布:")
    print(f"   - 高优先级: {len(high_priority)} 条")
    print(f"   - 中优先级: {len(medium_priority)} 条")
    print(f"   - 低优先级: {len(low_priority)} 条")

    # 生成输出
    print(f"\n📝 生成报告: {output_file}")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"# 学习记录提炼报告\n\n")
        f.write(f"> 提取时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"> 数据源: {file_count} 个会话文件 ({extract_date(min(r['date'] for r in all_records))} 至 {extract_date(max(r['date'] for r in all_records))})\n\n")

        f.write(f"## 📊 统计概览\n\n")
        f.write(f"- **总记录数**: {len(clustered_records)} 条（去重后）\n")
        f.write(f"- **高优先级**: {len(high_priority)} 条\n")
        f.write(f"- **中优先级**: {len(medium_priority)} 条\n")
        f.write(f"- **低优先级**: {len(low_priority)} 条\n\n")

        # 高优先级记录
        if high_priority:
            f.write(f"## 🔴 高优先级记录 ({len(high_priority)} 条)\n\n")
            for i, record in enumerate(high_priority, 1):
                f.write(f"### {i}. {record['date']} — {record['type'].upper()}\n\n")
                f.write(f"> {record['summary']}\n\n")
                if record['keywords']:
                    f.write(f"**关键词**: {', '.join(record['keywords'])}\n\n")
                if record.get('is_frequent'):
                    f.write(f"⚠️ **高频问题** (出现 {record['cluster_size']} 次)\n\n")
                f.write(f"---\n\n")

        # 中优先级记录
        if medium_priority:
            f.write(f"## 🟡 中优先级记录 ({len(medium_priority)} 条)\n\n")
            for i, record in enumerate(medium_priority[:50], 1):  # 最多50条
                f.write(f"### {i}. {record['date']} — {record['type'].upper()}\n\n")
                f.write(f"> {record['summary']}\n\n")
                if record['keywords']:
                    f.write(f"**关键词**: {', '.join(record['keywords'])}\n\n")
                f.write(f"---\n\n")

            if len(medium_priority) > 50:
                f.write(f"\n*...还有 {len(medium_priority) - 50} 条记录省略*\n\n")

        # 低优先级记录
        if low_priority:
            f.write(f"## 🟢 低优先级记录 ({len(low_priority)} 条)\n\n")
            f.write(f"*仅显示高频问题（≥3次）*\n\n")
            frequent_low = [r for r in low_priority if r.get('is_frequent')]
            for i, record in enumerate(frequent_low[:20], 1):
                f.write(f"### {i}. {record['date']} — {record['type'].upper()}\n\n")
                f.write(f"> {record['summary']}\n\n")
                if record['keywords']:
                    f.write(f"**关键词**: {', '.join(record['keywords'])}\n\n")
                f.write(f"**出现次数**: {record['cluster_size']}\n\n")
                f.write(f"---\n\n")

    print(f"\n✅ 完成! 报告已保存到: {output_file}")

if __name__ == '__main__':
    main()
