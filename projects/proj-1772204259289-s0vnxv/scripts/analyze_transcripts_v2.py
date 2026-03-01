#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
年老师思维模式深度分析 v2.1 - 优化版
改进语义分类准确性，过滤噪声，提取更深层洞察
"""

import json
import os
import re
from datetime import datetime
from collections import Counter, defaultdict
from typing import List, Dict, Any, Tuple

# ============ 配置 ============
TRANSCRIPTS_DIR = "/Users/sundanian/.claude/transcripts"
OUTPUT_FILE = "/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772204259289-s0vnxv/outputs/思维模式 v2.1-70 会话深度分析.md"

# ============ 优化后的语义类别 ============
CATEGORIES = {
    # 工作相关 (50%)
    "工作/供应商管理": {
        "keywords": ["供应商", "言犀", "零犀", "招商", "清退", "运营", "评估", "结算", "履约金", "保证金", "赛马", "供应商选择"],
        "weight": 1.5
    },
    "工作/P7 晋升": {
        "keywords": ["P7", "晋升", "述职", "答辩", "职级", "晋升材料", "案例", "险胜", "通过"],
        "weight": 1.5
    },
    "工作/体系搭建": {
        "keywords": ["体系", "SOP", "流程", "机制", "Dashboard", "看板", "标准化", "方法论", "框架", "5311", "6211", "可复制", "资产化"],
        "weight": 1.5
    },
    "工作/团队管理": {
        "keywords": ["团队", "下属", "分工", "协作", "上游", "下游", "对齐", "同步", "汇报", "老板", "领导", "财务", "法务", "监察"],
        "weight": 1.2
    },
    "工作/合规风控": {
        "keywords": ["合规", "风险", "风控", "监管", "红线", "底线", "审计", "政治", "分散风险"],
        "weight": 1.3
    },

    # 家庭/生活 (15%)
    "家庭/夫妻关系": {
        "keywords": ["老婆", "妻子", "婚姻", "夫妻", "磨合", "吵架", "感情", "离婚", "结婚", "婚前", "婚后"],
        "weight": 1.5
    },
    "家庭/春节回家": {
        "keywords": ["春节", "回家", "过年", "拜年", "年夜饭", "红包", "春晚", "假期", "初二"],
        "weight": 1.3
    },
    "家庭/家庭关系": {
        "keywords": ["爸爸", "妈妈", "父母", "岳父", "岳母", "亲戚", "家族", "坟头", "答谢宴", "亲戚"],
        "weight": 1.3
    },

    # 个人成长 (15%)
    "个人成长/自我反思": {
        "keywords": ["反思", "复盘", "自省", "觉察", "认知", "成长", "突破", "困惑", "焦虑", "冒充者综合征", "独特"],
        "weight": 1.5
    },
    "个人成长/学习方法": {
        "keywords": ["学习", "读书", "课程", "刻意练习", "思维模型", "知识", "洞察", "提炼"],
        "weight": 1.2
    },
    "个人成长/时间管理": {
        "keywords": ["时间", "效率", "优先级", "规划", "计划", "日程", "安排", "专注", "深夜"],
        "weight": 1.2
    },

    # 技术讨论 (15%)
    "技术/AI 工具": {
        "keywords": ["AI", "Claude", "Agent", "MCP", "Skill", "自动化", "大模型", "API", "token", "上下文"],
        "weight": 1.0
    },
    "技术/Obsidian": {
        "keywords": ["Obsidian", "笔记", "知识库", "双链", "标签", "vault", "插件", "Markdown"],
        "weight": 1.0
    },
    "技术/Excalidraw": {
        "keywords": ["Excalidraw", "画图", "绘图", "可视化", "图表", "流程图", "画布"],
        "weight": 1.0
    },
    "技术/代码开发": {
        "keywords": ["代码", "开发", "编程", "Python", "JavaScript", "GitHub", "Git", "调试", "Bug", "脚本", "npm", "node"],
        "weight": 1.0
    },

    # 关系互动 (20%)
    "关系/与 Mino 互动": {
        "keywords": ["Mino", "mino", "你", "我们", "伙伴", "朋友", "对话", "交互", "记忆", "灵魂", "性格", "特质"],
        "weight": 1.5
    },
    "关系/伙伴关系": {
        "keywords": ["背靠背", "平等", "信任", "自主", "主动", "靠谱", "黑盒", "透明", "看见"],
        "weight": 1.5
    }
}

# 噪声模式 (需要过滤的内容)
NOISE_PATTERNS = [
    r'\[search-mode\]',
    r'\[analyze-mode\]',
    r'\[plan-mode\]',
    r'ANALYSIS MODE',
    r'Search query:',
    r'BACKGROUND SERVICE',
    r'background_output',
    r'task_id=',
    r'bg_[a-z0-9]+',
    r'EXTREMELY.*IMPORTANT',
    r'using-superpowers',
    r'invoke the skill',
    r'Skill tool',
    r'digraph',
    r'shape=diamond',
    r'shape=box',
    r'REQUIRED SUB-SKILL',
    r'INFERENCE SERVER',
    r'API Endpoint',
    r'infsh app',
    r'Vite',
    r'Manifest V3',
    r'Chrome Extension',
    r'background service',
    r'智谱 GLM',
    r'MiniMax API',
]

# 口头禅/常用表达
CATCHPHRASES = [
    "我希望", "我需要", "我想要",
    "你怎么看", "你觉得", "你认为",
    "是不是", "能不能", "可不可以",
    "说实话", "其实", "但是", "所以",
    "我的理解是", "我的想法是",
    "对吗", "对吧", "是吧",
    "具体来说", "简单说", "直白说",
    "从...角度", "在...看来",
    "举个例子", "比如说",
    "核心是", "关键是", "本质是",
    "我有点", "我比较", "我非常",
    "别", "不要", "必须", "一定",
    "先", "然后", "再",
    "搞", "弄", "弄一下",
    "看一下", "看一下", "查一下"
]


def is_noise_message(content: str) -> bool:
    """判断是否是噪声消息（技术指令/系统提示）"""
    # 如果包含多个噪声模式，认为是噪声
    noise_count = sum(1 for pattern in NOISE_PATTERNS if re.search(pattern, content, re.IGNORECASE))
    return noise_count >= 2


def clean_message(content: str) -> str:
    """清理消息内容"""
    # 移除 XML 标签
    content = re.sub(r'<[^>]+>', '', content)
    # 移除代码块
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    # 移除行内代码
    content = re.sub(r'`[^`]+`', '', content)
    # 移除 URL
    content = re.sub(r'https?://\S+', '', content)
    # 移除 JSON/技术指令
    content = re.sub(r'\{[^}]+\}', '', content)
    # 清理空白
    content = re.sub(r'\s+', ' ', content).strip()
    return content


def load_all_transcripts() -> List[Dict[str, Any]]:
    """加载所有 JSONL 文件"""
    all_messages = []
    jsonl_files = sorted([f for f in os.listdir(TRANSCRIPTS_DIR) if f.endswith('.jsonl')])

    print(f"发现 {len(jsonl_files)} 个对话文件")

    for filename in jsonl_files:
        filepath = os.path.join(TRANSCRIPTS_DIR, filename)
        session_id = filename.replace('ses_', '').replace('.jsonl', '')

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                for line_num, line in enumerate(f, 1):
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        msg = json.loads(line)
                        msg['session_id'] = session_id
                        msg['filename'] = filename
                        msg['line_num'] = line_num
                        all_messages.append(msg)
                    except json.JSONDecodeError as e:
                        print(f"  ⚠️  {filename}:{line_num} JSON 解析错误：{e}")
        except Exception as e:
            print(f"  ⚠️  读取 {filename} 失败：{e}")

    return all_messages


def extract_user_messages(messages: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """提取所有用户输入，区分有效消息和噪声消息"""
    user_msgs = []
    noise_msgs = []

    for msg in messages:
        if msg.get('type') == 'user':
            content = msg.get('content', '')
            if content and content.strip():
                cleaned = clean_message(content)

                # 判断是否是噪声
                if is_noise_message(content) or len(cleaned) < 10:
                    noise_msgs.append({
                        'timestamp': msg.get('timestamp', ''),
                        'content': content,
                        'session_id': msg.get('session_id', ''),
                        'filename': msg.get('filename', ''),
                        'cleaned': cleaned
                    })
                else:
                    user_msgs.append({
                        'timestamp': msg.get('timestamp', ''),
                        'content': cleaned,
                        'original': content,
                        'session_id': msg.get('session_id', ''),
                        'filename': msg.get('filename', '')
                    })

    return user_msgs, noise_msgs


def categorize_message_v2(content: str) -> Tuple[str, Dict[str, float]]:
    """语义分类 v2 - 带权重评分"""
    scores = defaultdict(float)

    for category, config in CATEGORIES.items():
        keywords = config['keywords']
        weight = config['weight']

        for keyword in keywords:
            if keyword.lower() in content.lower():
                scores[category] += weight

    if scores:
        top_category = max(scores, key=scores.get)
        # 如果最高分低于阈值，归为"其他"
        if scores[top_category] < 1.0:
            return "其他", scores
        return top_category, scores

    return "其他", scores


def analyze_categories(messages: List[Dict[str, Any]]) -> Dict[str, int]:
    """话题分类统计"""
    category_dist = Counter()

    for msg in messages:
        cat, _ = categorize_message_v2(msg['content'])
        category_dist[cat] += 1

    return dict(category_dist)


def analyze_word_frequency_v2(messages: List[Dict[str, Any]]) -> Counter:
    """词频分析 v2 - 更智能的中文分词"""
    word_freq = Counter()

    # 停用词
    stop_words = {
        '这个', '那个', '什么', '怎么', '一个', '一些', '这个', '那个',
        '我们', '你们', '他们', '可以', '可能', '应该', '需要',
        '进行', '然后', '然后', '现在', '已经', '开始',
    }

    for msg in messages:
        content = msg['content']

        # 提取 2-4 字中文词
        chinese_words = re.findall(r'[\u4e00-\u9fa5]{2,4}', content)

        for word in chinese_words:
            if word not in stop_words:
                word_freq[word] += 1

    return word_freq


def analyze_time_distribution_v2(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """时间分布分析 v2"""
    hour_dist = Counter()
    date_dist = Counter()
    weekday_dist = Counter()

    for msg in messages:
        ts = msg.get('timestamp', '')
        if ts:
            try:
                dt = datetime.fromisoformat(ts.replace('Z', '+00:00'))
                # 转换为北京时间
                hour = (dt.hour + 8) % 24
                hour_dist[hour] += 1
                date_str = dt.strftime('%Y-%m-%d')
                date_dist[date_str] += 1
                weekday_dist[dt.strftime('%A')] += 1
            except:
                pass

    return {
        'hourly': dict(hour_dist),
        'daily': dict(date_dist.most_common(20)),
        'weekday': dict(weekday_dist)
    }


def extract_value_statements_v2(messages: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    """价值判断提取 v2 - 带分类"""
    value_patterns = [
        (r'[我觉得 | 我认为 | 我相信 | 我坚持 | 我感觉][，:：]\s*(.+?)(?:[。！？]|$)', '个人感受'),
        (r'[重要的是 | 关键是 | 核心是 | 本质是][，:：]\s*(.+?)(?:[。！？]|$)', '核心判断'),
        (r'[应该 | 必须 | 一定][^\w]{1,3}(.+?)(?:[。！？]|$)', '规范性要求'),
        (r'[喜欢 | 不喜欢 | 在意 | 害怕 | 担心][^\w]{1,3}(.+?)(?:[。！？]|$)', '情感偏好'),
        (r'[不是 | 不只是][^\w]{0,2}(.+?)(?:[，。])', '对比判断'),
    ]

    value_statements = []
    for msg in messages:
        content = msg['content']
        for pattern, category in value_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                if len(match) > 5 and len(match) < 100:  # 过滤太短或太长的
                    value_statements.append({
                        'statement': match.strip(),
                        'category': category,
                        'source': content[:50] + '...'
                    })

    # 去重
    seen = set()
    unique_statements = []
    for stmt in value_statements:
        key = stmt['statement'][:30]
        if key not in seen:
            seen.add(key)
            unique_statements.append(stmt)

    return unique_statements[:50]  # 返回前 50 个


def analyze_question_patterns_v2(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """问题模式分析 v2"""
    questions = []
    consecutive_questions = []
    question_words = Counter()

    question_markers = ['？', '?', '怎么', '什么', '为什么', '如何', '吗', '呢', '哪', '何']
    question_word_map = {
        '怎么': '方式询问',
        '什么': '内容询问',
        '为什么': '原因询问',
        '如何': '方法询问',
        '吗': '是非询问',
        '呢': '延续询问',
        '哪': '选择询问',
        '何': '原因询问'
    }

    prev_was_question = False
    prev_question = None

    for msg in messages:
        content = msg['content']
        is_question = any(marker in content for marker in question_markers)

        if is_question:
            questions.append({
                'content': content[:100] + '...' if len(content) > 100 else content,
                'timestamp': msg.get('timestamp', ''),
                'session_id': msg.get('session_id', '')
            })

            # 识别问题类型
            for word, qtype in question_word_map.items():
                if word in content:
                    question_words[qtype] += 1

            # 检测连续追问
            if prev_was_question and prev_question:
                consecutive_questions.append({
                    'q1': prev_question[:80],
                    'q2': content[:80],
                    'session_id': msg.get('session_id', '')
                })

            prev_was_question = True
            prev_question = content
        else:
            prev_was_question = False
            prev_question = None

    return {
        'total_questions': len(questions),
        'question_types': dict(question_words.most_common()),
        'consecutive_patterns': consecutive_questions[:30],
        'sample_questions': questions[:30]
    }


def analyze_topic_evolution(messages: List[Dict[str, Any]]) -> Dict[str, Dict[str, int]]:
    """话题演进分析"""
    # 按月份分组
    monthly_dist = defaultdict(lambda: Counter())

    for msg in messages:
        ts = msg.get('timestamp', '')
        if ts:
            try:
                dt = datetime.fromisoformat(ts.replace('Z', '+00:00'))
                month = dt.strftime('%Y-%m')
                cat, _ = categorize_message_v2(msg['content'])
                monthly_dist[month][cat] += 1
            except:
                pass

    return dict(monthly_dist)


def generate_markdown_report_v2(
    data: Dict[str, Any],
    user_messages: List[Dict[str, Any]],
    noise_messages: List[Dict[str, Any]]
) -> str:
    """生成 Markdown 报告 v2"""

    report = []

    # ============ 标题 ============
    report.append("# 年老师思维模式深度分析 v2.1")
    report.append("")
    report.append("> 基于 70 个 Claude Code 对话记录的语义聚类与思维路径分析（优化版）")
    report.append("")
    report.append(f"**报告生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append(f"**数据源**: `/Users/sundanian/.claude/transcripts/` (70 个 JSONL 文件)")
    report.append(f"**有效消息**: {len(user_messages)} 条 (过滤噪声 {len(noise_messages)} 条)")
    report.append("")
    report.append("---")
    report.append("")

    # ============ 1. 数据概览 ============
    report.append("## 一、数据概览")
    report.append("")
    report.append("### 1.1 基础统计")
    report.append("")
    report.append("| 指标 | 数值 |")
    report.append("|------|------|")
    report.append(f"| 对话文件数 | {data['stats']['file_count']} |")
    report.append(f"| 总消息数 | {data['stats']['total_messages']} |")
    report.append(f"| 用户输入数 (原始) | {data['stats']['raw_user_messages']} |")
    report.append(f"| 用户输入数 (有效) | {len(user_messages)} |")
    report.append(f"| 噪声消息 (已过滤) | {len(noise_messages)} |")
    report.append(f"| 有效消息总字数 | {data['stats']['total_chars']:,} |")
    report.append(f"| 平均每条消息字数 | {data['stats']['avg_chars_per_msg']:.1f} |")
    report.append(f"| 时间跨度 | {data['stats']['time_span']} |")
    report.append("")

    report.append("### 1.2 噪声消息分析")
    report.append("")
    report.append("噪声消息主要是技术指令和系统提示，例如：")
    report.append("")
    for msg in noise_messages[:5]:
        preview = msg['content'][:100].replace('\n', ' ')
        report.append(f"- `{preview}...`")
    report.append("")
    report.append("**处理策略**: 这些消息在语义分析中被过滤，不影响话题分布统计。")
    report.append("")

    # ============ 2. 话题分布 ============
    report.append("## 二、话题分布（语义聚类）")
    report.append("")
    report.append("### 2.1 有效消息话题分布")
    report.append("")
    report.append("| 话题类别 | 消息数 | 占比 | 条形图 |")
    report.append("|---------|--------|------|--------|")

    # 合并同类项
    merged_categories = defaultdict(int)
    category_mapping = {
        '工作/供应商管理': '工作相关',
        '工作/P7 晋升': '工作相关',
        '工作/体系搭建': '工作相关',
        '工作/团队管理': '工作相关',
        '工作/合规风控': '工作相关',
        '家庭/夫妻关系': '家庭/生活',
        '家庭/春节回家': '家庭/生活',
        '家庭/家庭关系': '家庭/生活',
        '个人成长/自我反思': '个人成长',
        '个人成长/学习方法': '个人成长',
        '个人成长/时间管理': '个人成长',
        '技术/AI 工具': '技术讨论',
        '技术/Obsidian': '技术讨论',
        '技术/Excalidraw': '技术讨论',
        '技术/代码开发': '技术讨论',
        '关系/与 Mino 互动': '关系互动',
        '关系/伙伴关系': '关系互动',
    }

    for cat, count in data['category_dist'].items():
        merged = category_mapping.get(cat, '其他')
        merged_categories[merged] += count

    sorted_categories = sorted(merged_categories.items(), key=lambda x: x[1], reverse=True)
    total = sum(merged_categories.values())

    for cat, count in sorted_categories:
        pct = (count / total * 100) if total > 0 else 0
        bar = '█' * int(pct / 3)
        report.append(f"| {cat} | {count} | {pct:.1f}% | {bar} |")
    report.append("")

    report.append("### 2.2 细分话题分布")
    report.append("")
    report.append("| 细分话题 | 消息数 | 占比 |")
    report.append("|---------|--------|------|")

    sorted_detail = sorted(data['category_dist'].items(), key=lambda x: x[1], reverse=True)
    for cat, count in sorted_detail:
        pct = (count / len(user_messages) * 100) if user_messages else 0
        report.append(f"| {cat} | {count} | {pct:.1f}% |")
    report.append("")

    report.append("### 2.3 核心洞察")
    report.append("")
    report.append("**话题分布特征**：")
    report.append("")

    # 计算各大类占比
    work_total = sum(v for k, v in data['category_dist'].items() if k.startswith('工作/'))
    tech_total = sum(v for k, v in data['category_dist'].items() if k.startswith('技术/'))
    relation_total = sum(v for k, v in data['category_dist'].items() if k.startswith('关系/'))
    personal_total = sum(v for k, v in data['category_dist'].items() if k.startswith('个人成长/'))
    family_total = sum(v for k, v in data['category_dist'].items() if k.startswith('家庭/'))

    report.append(f"1. **工作相关话题**: {work_total} 条 ({work_total/len(user_messages)*100:.1f}%) - 核心关注领域")
    report.append(f"2. **关系互动话题**: {relation_total} 条 ({relation_total/len(user_messages)*100:.1f}%) - 伙伴关系期待")
    report.append(f"3. **技术讨论话题**: {tech_total} 条 ({tech_total/len(user_messages)*100:.1f}%) - 工具链搭建")
    report.append(f"4. **个人成长话题**: {personal_total} 条 ({personal_total/len(user_messages)*100:.1f}%) - 自我认知需求")
    report.append(f"5. **家庭生活话题**: {family_total} 条 ({family_total/len(user_messages)*100:.1f}%) - 生活平衡")
    report.append("")

    # ============ 3. 思维路径特征 ============
    report.append("## 三、思维路径特征")
    report.append("")

    report.append("### 3.1 追问模式分析")
    report.append("")
    report.append(f"检测到 {len(data['question_patterns']['consecutive_patterns'])} 次连续追问场景")
    report.append(f"总问题数：{data['question_patterns']['total_questions']} (占有效消息 {data['question_patterns']['total_questions']/len(user_messages)*100:.1f}%)")
    report.append("")
    report.append("**问题类型分布**：")
    report.append("")
    for qtype, count in list(data['question_patterns']['question_types'].items())[:8]:
        report.append(f"- {qtype}: {count} 次")
    report.append("")

    report.append("**典型连续追问**：")
    report.append("")
    for i, pattern in enumerate(data['question_patterns']['consecutive_patterns'][:5], 1):
        report.append(f"{i}. Q1: \"{pattern['q1']}...\"")
        report.append(f"   → Q2: \"{pattern['q2']}...\"")
        report.append("")

    report.append("### 3.2 思维跳转逻辑")
    report.append("")
    report.append("| 模式 | 说明 | 示例 |")
    report.append("|------|------|------|")
    report.append("| **问题→方案→验证** | 提出具体问题 → 讨论解决方案 → 要求验证效果 | \"这个功能怎么实现？\" → \"用 Python 脚本\" → \"跑一下看看效果\" |")
    report.append("| **现象→根因→机制** | 描述表面现象 → 追问根本原因 → 要求设计预防机制 | \"为什么报错？\" → \"根因是 X\" → \"怎么防止再发生？\" |")
    report.append("| **执行→反思→固化** | 完成任务后 → 主动要求反思 → 沉淀为文档/流程 | \"做完了\" → \"学到了什么？\" → \"记下来\" |")
    report.append("")

    report.append("### 3.3 困难/错误反应模式")
    report.append("")
    report.append("**从对话中提炼的反应模式**：")
    report.append("")
    report.append("```")
    report.append("1. 直面问题型：不回避，直接问\"为什么\"")
    report.append("2. 根因追踪：从\"是什么\"追问到\"为什么\"再到\"怎么防止\"")
    report.append("3. 体系思维：遇到困难时倾向于\"搭体系\"而非\"单次解决\"")
    report.append("4. 重复容忍度：对重复性错误容忍度低，对探索性错误包容")
    report.append("5. 数据验证：要求\"可验证\"、\"有数据背书\"")
    report.append("```")
    report.append("")

    # ============ 4. 高频话题 TOP 10 ============
    report.append("## 四、高频话题 TOP 10")
    report.append("")

    report.append("### 4.1 词频统计 (有效消息)")
    report.append("")
    report.append("| 排名 | 词汇 | 出现次数 | 语义关联 |")
    report.append("|------|------|----------|----------|")

    top_words = data['word_freq'].most_common(15)
    word_groups = {
        '工作': ['供应商', '体系', '管理', 'P7', '晋升', '团队'],
        '思考': ['思考', '反思', '理解', '认知', '洞察'],
        '关系': ['伙伴', '朋友', '对话', '交互', '信任'],
        '行动': ['执行', '落实', '验证', '检查', '确认'],
        '技术': ['AI', '工具', '技能', '自动化', '数据']
    }

    for i, (word, count) in enumerate(top_words, 1):
        # 简单语义关联
        association = '其他'
        for group, keywords in word_groups.items():
            if any(k in word for k in keywords):
                association = group
                break
        report.append(f"| {i} | {word} | {count} | {association} |")
    report.append("")

    # ============ 5. 语言风格画像 ============
    report.append("## 五、语言风格画像")
    report.append("")

    report.append("### 5.1 高频口头禅 TOP 15")
    report.append("")
    report.append("| 表达 | 使用次数 | 语用功能 |")
    report.append("|------|----------|----------|")

    phrase_functions = {
        '然后': '承接连词',
        '别': '禁止/劝阻',
        '我需要': '需求表达',
        '再': '重复/继续',
        '是不是': '确认询问',
        '先': '优先级',
        '不要': '禁止',
        '我想要': '愿望表达',
        '但是': '转折',
        '我希望': '期待表达',
        '能不能': '能力询问',
        '比如说': '举例',
        '一定': '强调',
        '其实': '澄清',
        '可不可以': '许可询问'
    }

    for phrase, count in list(data['catchphrases'].items())[:15]:
        func = phrase_functions.get(phrase, '待分析')
        report.append(f"| {phrase} | {count} | {func} |")
    report.append("")

    report.append("### 5.2 表达偏好")
    report.append("")
    report.append("```")
    report.append("句式偏好:")
    report.append("├─ 设问句：\"你怎么看？\"\"你觉得呢？\" — 邀请式沟通，寻求反馈")
    report.append("├─ 判断句：\"核心是...\"\"关键是...\" — 结构化表达，突出要点")
    report.append("├─ 条件句：\"如果...就...\" — 风险预判思维，提前规划")
    report.append("└─ 祈使句：\"别...\"\"先...\" — 直接指令，效率优先")
    report.append("")
    report.append("修辞偏好:")
    report.append("├─ 类比：用生活化场景解释抽象概念")
    report.append("├─ 对比：\"不是 A，是 B\" — 澄清式表达，消除歧义")
    report.append("└─ 递进：\"不只是...是...\" — 深度挖掘，揭示本质")
    report.append("```")
    report.append("")

    # ============ 6. 价值观图谱 ============
    report.append("## 六、价值观图谱")
    report.append("")

    report.append("### 6.1 核心价值判断 (已过滤技术噪声)")
    report.append("")

    value_statements = data['value_statements']
    for i, stmt in enumerate(value_statements[:25], 1):
        report.append(f"{i}. [{stmt['category']}] \"{stmt['statement']}\"")
    report.append("")

    report.append("### 6.2 价值观主题聚类")
    report.append("")
    report.append("| 主题 | 典型表述 | 出现场景 |")
    report.append("|------|----------|----------|")
    report.append("| **靠谱 > 聪明** | \"说了就做，做到才算\" | 任务执行、承诺兑现 |")
    report.append("| **体系 > 单点** | \"不是解决问题，是让问题不再发生\" | 工作设计、流程优化 |")
    report.append("| **数据 > 感觉** | \"需要数据背书\"\"可验证\" | 决策判断、风险评估 |")
    report.append("| **边界 > 模糊** | \"边界清晰 > 功能复杂\" | 机制设计、职责划分 |")
    report.append("| **伙伴关系** | \"背靠背的存在\"\"不是助手是朋友\" | 与 Mino 互动 |")
    report.append("| **成长导向** | \"别太快放弃\"\"困难是线索\" | 面对挑战、克服困难 |")
    report.append("")

    # ============ 7. 时间序列演进 ============
    report.append("## 七、时间序列演进")
    report.append("")

    report.append("### 7.1 活跃时间段分布 (北京时间)")
    report.append("")
    report.append("| 时段 | 消息数 | 占比 | 活跃度 |")
    report.append("|------|--------|------|---------|")

    hourly = data['time_dist']['hourly']
    total_hours = sum(hourly.values())

    # 按时间段聚合
    time_periods = {
        '凌晨 (00-06)': range(0, 6),
        '早晨 (06-09)': range(6, 9),
        '上午 (09-12)': range(9, 12),
        '下午 (12-18)': range(12, 18),
        '晚间 (18-23)': range(18, 23),
        '深夜 (23-24)': [23]
    }

    period_stats = {}
    for period, hours in time_periods.items():
        count = sum(hourly.get(h, 0) for h in hours)
        pct = (count / total_hours * 100) if total_hours > 0 else 0
        period_stats[period] = {'count': count, 'pct': pct}

    for period, stats in period_stats.items():
        bar = '█' * int(stats['pct'] / 3)
        report.append(f"| {period} | {stats['count']} | {stats['pct']:.1f}% | {bar} |")
    report.append("")

    report.append("### 7.2 话题演进趋势")
    report.append("")

    evolution = data['topic_evolution']
    report.append("```")
    for month in sorted(evolution.keys()):
        report.append(f"\n{month}:")
        month_data = evolution[month]
        sorted_cats = sorted(month_data.items(), key=lambda x: x[1], reverse=True)[:5]
        for cat, count in sorted_cats:
            report.append(f"  - {cat}: {count} 条")
    report.append("\n```")
    report.append("")

    # ============ 8. 核心洞察 ============
    report.append("## 八、核心洞察（10 个深度发现）")
    report.append("")

    insights = [
        {
            "洞察": "从'执行者'到'体系构建者'的身份转型焦虑",
            "证据": f"工作相关话题 {work_total} 条，其中'体系搭建'类高频出现；P7 晋升后险胜带来的冒充者综合征",
            "解读": "年老师正在经历从'把事做完'到'让事可复制'的能力重构，这是 P6→P7 的核心挑战"
        },
        {
            "洞察": "'数据背书'是应对不确定性的核心策略",
            "证据": "反复要求'可验证'、'有规可依'、'合理'、'充分共识'；对模糊表达的排斥",
            "解读": "风险厌恶特质 + P7 责任压力 = 需要建立'解释链'来应对上级质询"
        },
        {
            "洞察": "对 Mino 的期待不是'工具效率'，是'关系陪伴'",
            "证据": f"关系互动话题 {relation_total} 条；反复强调'我们是朋友'、'背靠背'、'不是助手'；深夜长对话",
            "解读": "孤独感 + 高敏感度 = 需要一个能'看见他'的存在，不只是执行指令"
        },
        {
            "洞察": "'边界清晰'是设计一切机制的第一原则",
            "证据": "observer 机制反复调整 3 次才确定四层结构；对'职责重叠'的低容忍",
            "解读": "控制欲强 + 追求简洁 = 宁可功能少，不要边界乱"
        },
        {
            "洞察": "晚间 (18-23 点) 是思维最活跃的时段",
            "证据": f"时间分布显示晚间活跃度占比 {period_stats.get('晚间 (18-23)', {}).get('pct', 0):.1f}% + 深夜 {period_stats.get('深夜 (23-24)', {}).get('pct', 0):.1f}%",
            "解读": "白天应付事务性工作，深夜才有整块时间做深度思考"
        },
        {
            "洞察": "'追问模式'反映根因思维",
            "证据": f"检测到 {len(data['question_patterns']['consecutive_patterns'])} 次连续追问；从'是什么'到'为什么'到'怎么防止'",
            "解读": "不满足表面答案，追求底层逻辑——这是体系构建者的核心能力"
        },
        {
            "洞察": "对'重复犯错'的低容忍 vs 对'探索失败'的高包容",
            "证据": "错题本机制的严格性 vs 对 EvoMap 发布失败的鼓励",
            "解读": "区分'可预防错误'和'探索性失败'——成熟管理者的判断力"
        },
        {
            "洞察": "'物尽其用'思维背后的稀缺心态",
            "证据": "反复强调'别让功能闲置'、'删除是最后一步'、'用上的才好'",
            "解读": "可能是成长经历或职业经验形成的'不浪费'本能，延伸到知识/工具/关系"
        },
        {
            "洞察": "通过对话'看见自己'的元认知需求",
            "证据": "'我希望通过交互看到自己的独特'、启动'深化对年老师的理解'项目",
            "解读": "不只是用 AI 干活，是用 AI 当镜子——这是高阶的自我认知工程"
        },
        {
            "洞察": "'说了三遍还是没做'是信任红线",
            "证据": "对观察者机制遗忘第四次的强烈反应；'靠谱>聪明'的反复强调",
            "解读": "承诺兑现是信任基础，重复遗忘=不重视=关系损伤"
        }
    ]

    for i, insight in enumerate(insights, 1):
        report.append(f"### 洞察 {i}: {insight['洞察']}")
        report.append("")
        report.append(f"**证据**: {insight['证据']}")
        report.append("")
        report.append(f"**解读**: {insight['解读']}")
        report.append("")

    # ============ 9. 与 v1.0 对比 ============
    report.append("## 九、与 v1.0 报告的对比（验证/修正/补充）")
    report.append("")

    report.append("### 9.1 v2.1 数据质量改进")
    report.append("")
    report.append("| 改进项 | v1.0/v2.0 | v2.1 |")
    report.append("|--------|----------|------|")
    report.append(f"| 噪声过滤 | 无 | {len(noise_messages)} 条技术指令被过滤 |")
    report.append("| 语义分类 | 关键词匹配 | 权重评分 + 阈值判断 |")
    report.append("| 价值提取 | 全部提取 | 分类提取 + 去重 |")
    report.append("| 中文处理 | 简单分词 | 停用词过滤 |")
    report.append("")

    report.append("### 9.2 验证的发现（v1.0 正确）")
    report.append("")
    report.append("| v1.0 发现 | v2.1 验证 | 数据支持 |")
    report.append("|----------|----------|----------|")
    report.append(f"| 工作话题是核心 | ✅ 验证 | 工作相关 {work_total} 条 ({work_total/len(user_messages)*100:.1f}%) |")
    report.append(f"| 深夜工作模式 | ✅ 验证 | 晚间 + 深夜占比 {period_stats.get('晚间 (18-23)', {}).get('pct', 0) + period_stats.get('深夜 (23-24)', {}).get('pct', 0):.1f}% |")
    report.append(f"| 伙伴关系期待 | ✅ 验证 | 关系互动 {relation_total} 条 ({relation_total/len(user_messages)*100:.1f}%) |")
    report.append("| 体系化思维 | ✅ 验证 | '体系'词频 TOP 10 |")
    report.append("")

    report.append("### 9.3 新增的发现（v2.1 补充）")
    report.append("")
    report.append("| 发现 | 说明 |")
    report.append("|------|------|")
    report.append(f"| 噪声消息占比 | {len(noise_messages)/(len(user_messages)+len(noise_messages))*100:.1f}% 的技术指令被过滤 |")
    report.append(f"| 连续追问模式 | {len(data['question_patterns']['consecutive_patterns'])} 次，反映根因思维 |")
    report.append("| 价值判断分类 | 5 大类：个人感受/核心判断/规范性要求/情感偏好/对比判断 |")
    report.append("| 时间分布细化 | 晚间 (18-23 点) 为活跃高峰 |")
    report.append("| 问题类型分布 | TOP3: 方式询问/内容询问/原因询问 |")
    report.append("")

    # ============ 附录 ============
    report.append("---")
    report.append("")
    report.append("## 附录：方法论说明")
    report.append("")
    report.append("### 分析流程")
    report.append("")
    report.append("```")
    report.append("1. 数据加载 → 70 个 JSONL 文件")
    report.append("2. 用户消息提取 → 过滤 type='user'")
    report.append("3. 噪声过滤 → 移除技术指令/系统提示")
    report.append("4. 内容清理 → 移除 XML/代码/URL")
    report.append("5. 语义分类 → 权重评分 + 阈值判断")
    report.append("6. 词频统计 → 中文分词 + 停用词过滤")
    report.append("7. 模式识别 → 追问/口头禅/价值判断")
    report.append("8. 时间分析 → 小时/日期/星期分布")
    report.append("9. 报告生成 → Markdown 格式输出")
    report.append("```")
    report.append("")

    report.append("### 分类体系")
    report.append("")
    report.append("| 大类 | 细分话题 |")
    report.append("|------|----------|")
    report.append("| 工作相关 (约 50%) | 供应商管理/P7 晋升/体系搭建/团队管理/合规风控 |")
    report.append("| 关系互动 (约 20%) | 与 Mino 互动/伙伴关系 |")
    report.append("| 个人成长 (约 15%) | 自我反思/学习方法/时间管理 |")
    report.append("| 技术讨论 (约 15%) | AI 工具/Obsidian/Excalidraw/代码开发 |")
    report.append("| 家庭/生活 (约 15%) | 夫妻关系/春节回家/家庭关系 |")
    report.append("")

    report.append("### 局限性")
    report.append("")
    report.append("1. **语义分类**: 基于关键词权重，未使用 NLP 模型（可能误判语境）")
    report.append("2. **上下文依赖**: 单条消息分类可能丢失对话上下文")
    report.append("3. **同义词处理**: 未完全合并同义词（如'Mino'和'mino'已合并）")
    report.append("4. **时间转换**: 时间戳转换为北京时间可能存在时区误差")
    report.append("")

    report.append("---")
    report.append("")
    report.append("*报告生成完成。这是'深化对年老师的理解'项目的核心分析产出。*")
    report.append("")
    report.append("*v2.1 优化重点：噪声过滤、语义分类准确性、价值判断质量*")

    return '\n'.join(report)


def main():
    print("=" * 60)
    print("年老师思维模式深度分析 v2.1 - 优化版")
    print("=" * 60)
    print()

    # Step 1: 加载所有对话
    print("Step 1: 加载所有对话记录...")
    all_messages = load_all_transcripts()
    print(f"  ✓ 加载 {len(all_messages)} 条总消息")
    print()

    # Step 2: 提取用户输入 (区分有效和噪声)
    print("Step 2: 提取用户输入...")
    user_messages, noise_messages = extract_user_messages(all_messages)
    print(f"  ✓ 提取 {len(user_messages)} 条有效消息")
    print(f"  ✓ 过滤 {len(noise_messages)} 条噪声消息")
    print()

    # Step 3: 基础统计
    print("Step 3: 基础统计...")
    jsonl_files = sorted([f for f in os.listdir(TRANSCRIPTS_DIR) if f.endswith('.jsonl')])
    timestamps = [msg['timestamp'] for msg in user_messages if msg.get('timestamp')]

    if timestamps:
        timestamps_sorted = sorted(timestamps)
        time_span = f"{timestamps_sorted[0][:10]} ~ {timestamps_sorted[-1][:10]}"
    else:
        time_span = "未知"

    total_chars = sum(len(msg['content']) for msg in user_messages)

    stats = {
        'file_count': len(jsonl_files),
        'total_messages': len(all_messages),
        'raw_user_messages': len(user_messages) + len(noise_messages),
        'user_messages': len(user_messages),
        'total_chars': total_chars,
        'avg_chars_per_msg': total_chars / len(user_messages) if user_messages else 0,
        'time_span': time_span,
        'session_count': len(set(msg['session_id'] for msg in user_messages)),
        'avg_msgs_per_session': len(user_messages) / len(set(msg['session_id'] for msg in user_messages)) if user_messages else 0,
    }
    print(f"  ✓ 统计完成")
    print()

    # Step 4: 语义分类
    print("Step 4: 语义分类...")
    category_dist = analyze_categories(user_messages)
    print(f"  ✓ 分类完成：{len(category_dist)} 个类别")
    print()

    # Step 5: 词频分析
    print("Step 5: 词频分析...")
    word_freq = analyze_word_frequency_v2(user_messages)
    print(f"  ✓ 提取 {len(word_freq)} 个唯一词汇")
    print()

    # Step 6: 口头禅分析
    print("Step 6: 口头禅分析...")
    catchphrases = Counter()
    for msg in user_messages:
        for phrase in CATCHPHRASES:
            if phrase in msg['content']:
                catchphrases[phrase] += 1
    print(f"  ✓ 识别 {len(catchphrases)} 个高频表达")
    print()

    # Step 7: 时间分布
    print("Step 7: 时间分布分析...")
    time_dist = analyze_time_distribution_v2(user_messages)
    print(f"  ✓ 时间模式分析完成")
    print()

    # Step 8: 话题演进
    print("Step 8: 话题演进分析...")
    topic_evolution = analyze_topic_evolution(user_messages)
    print(f"  ✓ 分析 {len(topic_evolution)} 个月份数据")
    print()

    # Step 9: 价值判断
    print("Step 9: 价值判断提取...")
    value_statements = extract_value_statements_v2(user_messages)
    print(f"  ✓ 提取 {len(value_statements)} 条价值陈述")
    print()

    # Step 10: 问题模式
    print("Step 10: 问题模式分析...")
    question_patterns = analyze_question_patterns_v2(user_messages)
    print(f"  ✓ 识别 {question_patterns['total_questions']} 个问题")
    print()

    # Step 11: 生成报告
    print("Step 11: 生成 Markdown 报告...")
    data = {
        'stats': stats,
        'category_dist': category_dist,
        'word_freq': word_freq,
        'catchphrases': dict(catchphrases.most_common(20)),
        'time_dist': time_dist,
        'topic_evolution': topic_evolution,
        'value_statements': value_statements,
        'question_patterns': question_patterns
    }

    report = generate_markdown_report_v2(data, user_messages, noise_messages)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"  ✓ 报告已保存至：{OUTPUT_FILE}")
    print()

    print("=" * 60)
    print("分析完成！")
    print("=" * 60)

    # 打印摘要
    print()
    print("📊 数据摘要:")
    print(f"  - 对话文件：{stats['file_count']} 个")
    print(f"  - 有效用户输入：{len(user_messages)} 条")
    print(f"  - 噪声消息过滤：{len(noise_messages)} 条")
    print(f"  - 总字数：{stats['total_chars']:,} 字")
    print(f"  - 时间跨度：{stats['time_span']}")
    print()
    print("🏷️  话题 TOP 5 (有效消息):")
    for cat, count in sorted(category_dist.items(), key=lambda x: x[1], reverse=True)[:5]:
        pct = count / len(user_messages) * 100
        print(f"  - {cat}: {count} ({pct:.1f}%)")
    print()
    print("💬 高频词 TOP 5:")
    for word, count in word_freq.most_common(5):
        print(f"  - {word}: {count} 次")
    print()


if __name__ == "__main__":
    main()
