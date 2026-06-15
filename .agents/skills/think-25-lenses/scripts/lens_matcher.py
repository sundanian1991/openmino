#!/usr/bin/env python3
"""
透镜匹配评分器 V2 (Lens Matcher)

基于问题分类映射 + 关键词匹配，智能推荐最优透镜组合。

用法:
    python3 lens_matcher.py "供应商不配合，交付总是延期"
    python3 lens_matcher.py --top 5 "团队激励失效，积极性下降"
    python3 lens_matcher.py --mode classify "帮我审一下这个方案"
    python3 lens_matcher.py --json "方案同质化严重"

升级说明 V2:
- 新增问题分类识别（路径B）：根据输入自动判定问题类型，推荐映射表中的最优组合
- 保留关键词匹配（V1功能）：作为分类识别的补充和交叉验证
- 输出格式升级：显示问题类型 + 推荐组合 + 组合逻辑 + 关键词匹配Top结果
"""

import sys
import json
import re
import argparse
from typing import List, Tuple, Dict

# ============ 问题分类映射表（路径B）============

PROBLEM_TYPES = {
    "人际冲突": {
        "keywords": ["冲突", "沟通", "不配合", "误解", "关系", "矛盾", "争执", "对立", "信任", "隔阂"],
        "lenses": ["Psychologist", "Teacher", "Anthropologist", "Salesperson"],
        "logic": "先检验理解偏差→消除知识诅咒→沉浸对方文化→洞察真实动机",
        "blind_spot": "自我中心、知识诅咒、误解动机"
    },
    "系统故障": {
        "keywords": ["故障", "bug", "报错", "崩溃", "异常", "失效", "根因", "诊断", "排查", "修复"],
        "lenses": ["Doctor", "Engineer", "Hacker", "Plumber"],
        "logic": "诊断根因→建模量化→看底层机制→动手拆解验证",
        "blind_spot": "只看症状、忽视结构、不敢拆解"
    },
    "战略决策": {
        "keywords": ["决策", "选择", "方向", "战略", "要不要", "是否", "权衡", "取舍", "投资", "布局"],
        "lenses": ["Economist", "Philosopher", "Chess Master", "Politician"],
        "logic": "算激励反应→推极限后果→预判多步→管感知预期",
        "blind_spot": "过早收敛、忽视二阶效应、情绪绑架"
    },
    "创意瓶颈": {
        "keywords": ["创意", "差异化", "同质化", "瓶颈", "想不出", "卡住了", "新玩法", "突破", "创新", "差异化"],
        "lenses": ["Artist", "Entrepreneur", "Critic"],
        "logic": "解放约束→快速试错→二次创作（如需更强冲击力，加强制跨界组合）",
        "blind_spot": "思维定势、路径依赖、缺乏差异化"
    },
    "执行偏差": {
        "keywords": ["执行", "落地", "偏差", "流程", "规范", "标准", "合规", "纪律", "checklist", "出错"],
        "lenses": ["Soldier", "Programmer", "Designer", "Accountant"],
        "logic": "checklist保护→模式自动化→信息自解释→数据监控",
        "blind_spot": "纪律松弛、标准模糊、关键遗漏"
    },
    "内容审查": {
        "keywords": ["审", "方案", "邮件", "ppt", "文档", "报告", "制度", "内容", "写法", "表达"],
        "lenses": ["Journalist", "Novelist", "Designer", "Politician", "Critic"],
        "logic": "事实核查→叙事结构→信息设计→感知管理→深度解读",
        "blind_spot": "叙事混乱、事实偏差、受众错位"
    },
    "业绩诊断": {
        "keywords": ["业绩", "gmv", "下滑", "下降", "异常", "诊断", "数据", "指标", "产能", "效率"],
        "lenses": ["Doctor", "Accountant", "Scientist", "Engineer"],
        "logic": "根因诊断→比率分析→假设验证→建模量化",
        "blind_spot": "归因错误、口径混乱、忽视比率"
    },
    "团队激励": {
        "keywords": ["团队", "激励", "士气", "积极性", "动力", "倦怠", "流失", "人心", "氛围", "凝聚力"],
        "lenses": ["Economist", "Psychologist", "Teacher", "Anthropologist"],
        "logic": "对齐激励→检验理解→消除知识诅咒→沉浸文化",
        "blind_spot": "激励错位、理解偏差、文化隔阂"
    },
    "谈判说服": {
        "keywords": ["谈判", "说服", "筹码", "底线", "条件", "条款", "协商", "博弈", "让步", "争取"],
        "lenses": ["Salesperson", "Chess Master", "Politician"],
        "logic": "洞察动机→预判多步→管理感知",
        "blind_spot": "误判筹码、忽视对方底线、未预判反制"
    },
    "制度设计": {
        "keywords": ["制度", "规则", "规范", "流程设计", "机制", "政策", "管理办法"],
        "lenses": ["Soldier", "Programmer", "Designer", "Economist"],
        "logic": "纪律保护→自动化→自解释→激励对齐",
        "blind_spot": "理想化、忽视人性、激励错位"
    },
    "个人状态": {
        "keywords": ["状态", "焦虑", "压力", "不想动", "拖延", "畏缩", "恐惧", "迷茫", "没劲", "累"],
        "lenses": ["Actor", "Soldier", "Plumber"],
        "logic": "情绪代入→纪律routine→拆解恐惧",
        "blind_spot": "情绪干扰、恐惧未知、缺乏routine"
    },
    "内容创作": {
        "keywords": ["写作", "创作", "表达", "文章", "文案", "故事", "内容", "传播"],
        "lenses": ["Novelist", "Designer", "Critic"],
        "logic": "叙事结构→信息设计→深度解读",
        "blind_spot": "信息密度低、逻辑不清、缺乏说服力"
    },
    "竞争策略": {
        "keywords": ["竞争", "对手", "市场", "策略", "差异化", "定位", "博弈", "份额", "优势"],
        "lenses": ["Chess Master", "Anthropologist", "Hacker"],
        "logic": "预判对手→沉浸市场文化→看底层机制",
        "blind_spot": "忽视对手、只看自己、静态视角"
    },
    "资源有限": {
        "keywords": ["资源", "预算", "有限", "没钱", "人手", "时间紧", "mvp", "验证", "试错"],
        "lenses": ["Entrepreneur", "Artist", "Journalist"],
        "logic": "快速验证→解放约束→事实核查",
        "blind_spot": "完美主义、不敢试错、信息过载"
    },
    "跨部门协作": {
        "keywords": ["跨部门", "协作", "协同", "配合", "接口", "对齐", "协同", "部门墙"],
        "lenses": ["Anthropologist", "Teacher", "Politician", "Economist"],
        "logic": "沉浸文化→消除知识诅咒→管理感知→对齐激励",
        "blind_spot": "本位主义、信息不对称、目标错位"
    }
}

# ============ 透镜数据（V1保留）============

LENSES = [
    {"id": 1, "en": "Artist", "cn": "艺术家", "q": "What if Creativity Were the Priority?",
     "scenes": ["创意瓶颈", "方案同质化", "差异化竞争", "品牌设计"],
     "tags": ["创意", "差异化", "创新", "设计", "独特", "新颖", "艺术", "同质化"]},
    {"id": 2, "en": "Economist", "cn": "经济学家", "q": "How Do People React to Incentives?",
     "scenes": ["团队激励", "政策设计", "行为预测", "制度激励对齐"],
     "tags": ["激励", "行为", "反应", "政策", "制度", "团队", "薪酬", "奖励", "惩罚", "对齐"]},
    {"id": 3, "en": "Engineer", "cn": "工程师", "q": "Can I Model This and Calculate?",
     "scenes": ["模糊决策", "量化评估", "风险评估", "建模分析"],
     "tags": ["量化", "模型", "计算", "数据", "评估", "风险", "建模", "精确", "测量"]},
    {"id": 4, "en": "Entrepreneur", "cn": "企业家", "q": "Do a Lot of Things; See What Works",
     "scenes": ["资源有限", "方向不明", "快速验证", "MVP设计"],
     "tags": ["验证", "原型", "测试", "快速", "资源", "方向", "MVP", "试错", "实验"]},
    {"id": 5, "en": "Doctor", "cn": "医生", "q": "What's the Diagnosis?",
     "scenes": ["故障排查", "根因分析", "症状复杂", "问题诊断"],
     "tags": ["诊断", "根因", "症状", "排查", "故障", "病因", "问题", "疾病", "治愈"]},
    {"id": 6, "en": "Journalist", "cn": "记者", "q": "Just the Facts",
     "scenes": ["信息混乱", "事实核查", "会议纪要", "去情绪化"],
     "tags": ["事实", "核查", "信息", "客观", "纪要", "真相", "报道", "新闻", "核实"]},
    {"id": 7, "en": "Scientist", "cn": "科学家", "q": "Make a Hypothesis and Test It",
     "scenes": ["假设验证", "因果推断", "实验设计", "A/B测试"],
     "tags": ["假设", "验证", "实验", "测试", "因果", "科学", "对照", "变量"]},
    {"id": 8, "en": "Mathematician", "cn": "数学家", "q": "You Don't Know Until You Can Prove It",
     "scenes": ["逻辑严谨性", "证明标准", "漏洞排查", "结论验证"],
     "tags": ["证明", "严谨", "逻辑", "漏洞", "数学", "标准", "定理", "精确"]},
    {"id": 9, "en": "Programmer", "cn": "程序员", "q": "What's the Pattern I Can Automate?",
     "scenes": ["流程自动化", "重复劳动", "模式抽象", "标准化"],
     "tags": ["自动化", "模式", "重复", "流程", "代码", "效率", "脚本", "标准化"]},
    {"id": 10, "en": "Architect", "cn": "建筑师", "q": "Envisioning the Future",
     "scenes": ["长期规划", "愿景设计", "大项目", "阶段性里程碑"],
     "tags": ["规划", "愿景", "未来", "设计", "项目", "长期", "蓝图", "阶段"]},
    {"id": 11, "en": "Salesperson", "cn": "销售", "q": "Understand Their Minds Better than They Do",
     "scenes": ["谈判准备", "客户洞察", "说服策略", "动机分析"],
     "tags": ["谈判", "说服", "客户", "动机", "洞察", "需求", "成交", "沟通"]},
    {"id": 12, "en": "Soldier", "cn": "军人", "q": "Routine and Discipline Prevent Deadly Mistakes",
     "scenes": ["关键流程", "安全合规", "checklist设计", "纪律执行"],
     "tags": ["纪律", "流程", "checklist", "安全", "执行", "规范", "routine", "合规"]},
    {"id": 13, "en": "Chess Master", "cn": "象棋大师", "q": "See The Moves In Your Mind's Eye",
     "scenes": ["竞争策略", "多步推演", "预判对手", "风险评估"],
     "tags": ["推演", "预判", "竞争", "策略", "对手", "步骤", "棋局", "博弈"]},
    {"id": 14, "en": "Designer", "cn": "设计师", "q": "The Things You Make Communicate For You",
     "scenes": ["用户体验", "信息设计", "自解释文档", "表达优化"],
     "tags": ["设计", "体验", "表达", "信息", "用户", "沟通", "界面", "交互"]},
    {"id": 15, "en": "Teacher", "cn": "教师", "q": "Can You See What it is Like Not to Know?",
     "scenes": ["知识诅咒", "沟通障碍", "培训设计", "受众理解"],
     "tags": ["教学", "知识", "沟通", "理解", "受众", "培训", "学生", "学习"]},
    {"id": 16, "en": "Anthropologist", "cn": "人类学家", "q": "Can You Immerse and Join Another Culture?",
     "scenes": ["跨部门协作", "文化差异", "陌生领域", "沉浸式理解"],
     "tags": ["文化", "沉浸", "跨部门", "协作", "陌生", "融入", "观察", "民族"]},
    {"id": 17, "en": "Psychologist", "cn": "心理学家", "q": "Test Your Understanding of Other People",
     "scenes": ["人际冲突", "动机分析", "行为预测", "认知偏差"],
     "tags": ["心理", "动机", "冲突", "行为", "偏差", "理解", "情绪", "人格"]},
    {"id": 18, "en": "Critic", "cn": "评论家", "q": "Can You Build on The Work of Others?",
     "scenes": ["创新不足", "二次创作", "深度解读", "竞品分析"],
     "tags": ["评论", "创新", "解读", "竞品", "二次", "深度", "批评", "分析"]},
    {"id": 19, "en": "Philosopher", "cn": "哲学家", "q": "What are the Unexpected Consequences?",
     "scenes": ["直觉检验", "极限推演", "潜在风险", "二阶效应"],
     "tags": ["哲学", "推演", "极限", "后果", "风险", "直觉", "二阶", "悖论"]},
    {"id": 20, "en": "Accountant", "cn": "会计师", "q": "Watch the Ratios",
     "scenes": ["数据诊断", "效率评估", "比率分析", "隐藏问题"],
     "tags": ["数据", "比率", "效率", "诊断", "隐藏", "评估", "财务", "指标"]},
    {"id": 21, "en": "Politician", "cn": "政治家", "q": "What Will People Believe?",
     "scenes": ["舆论管理", "利益相关者", "感知现实", "预期管理"],
     "tags": ["政治", "舆论", "利益", "感知", "相信", "管理", "PR", "公众"]},
    {"id": 22, "en": "Novelist", "cn": "小说家", "q": "Does Your Story Make Sense?",
     "scenes": ["叙事结构", "品牌故事", "说服力", "起承转合"],
     "tags": ["故事", "叙事", "说服", "结构", "品牌", "逻辑", "情节", "小说"]},
    {"id": 23, "en": "Actor", "cn": "演员", "q": "The Best Way to Pretend is to Be Real",
     "scenes": ["状态管理", "情绪调节", "角色代入", "自信构建"],
     "tags": ["情绪", "状态", "角色", "自信", "管理", "调节", "表演", "代入"]},
    {"id": 24, "en": "Plumber", "cn": "水管工", "q": "Take it Apart and See What's Broken",
     "scenes": ["系统拆解", "动手实践", "恐惧面对", "故障排查"],
     "tags": ["拆解", "动手", "实践", "故障", "恐惧", "维修", "管道", "零件"]},
    {"id": 25, "en": "Hacker", "cn": "黑客", "q": "What's Really Going on Underneath?",
     "scenes": ["深层机制", "系统漏洞", "表象之下", "unintended features"],
     "tags": ["黑客", "底层", "机制", "漏洞", "表象", "深层", "系统", "破解"]},
]


def tokenize(text: str) -> List[str]:
    """简单分词"""
    text = text.lower()
    chars = re.findall(r'[\u4e00-\u9fff]', text)
    words = re.findall(r'[a-z]+', text)
    return chars + words


def classify_problem(problem: str) -> List[Tuple[str, float]]:
    """基于关键词匹配识别问题类型，返回排序后的类型列表"""
    tokens = tokenize(problem)
    scores = []

    for ptype, info in PROBLEM_TYPES.items():
        score = 0
        for kw in info["keywords"]:
            for token in tokens:
                if kw in token or token in kw:
                    score += 1
        if score > 0:
            scores.append((ptype, score))

    scores.sort(key=lambda x: x[1], reverse=True)
    return scores


def score_lens(problem: str, lens: Dict) -> int:
    """V1关键词匹配评分"""
    tokens = tokenize(problem)
    score = 0
    for tag in lens["tags"]:
        for token in tokens:
            if tag in token or token in tag:
                score += 3
    for scene in lens["scenes"]:
        for token in tokens:
            if scene in token or token in scene:
                score += 2
    q_tokens = tokenize(lens["q"])
    for qt in q_tokens:
        for token in tokens:
            if qt in token or token in qt:
                score += 1
    return score


def match(problem: str, top_n: int = 5) -> List[Tuple[int, Dict]]:
    """V1关键词匹配"""
    results = []
    for lens in LENSES:
        s = score_lens(problem, lens)
        results.append((s, lens))
    results.sort(key=lambda x: x[0], reverse=True)
    return results[:top_n]


def get_lens_info(en_name: str) -> Dict:
    """根据英文名获取透镜信息"""
    for lens in LENSES:
        if lens["en"] == en_name:
            return lens
    return None


def print_results(problem: str, classified_types: List[Tuple[str, float]], keyword_results: List[Tuple[int, Dict]], as_json: bool = False):
    """打印综合结果"""
    if as_json:
        output = {
            "problem": problem,
            "classification": [
                {"type": t, "score": s, "lenses": PROBLEM_TYPES[t]["lenses"], "logic": PROBLEM_TYPES[t]["logic"]}
                for t, s in classified_types[:3]
            ],
            "keyword_match": [
                {
                    "rank": i + 1,
                    "score": score,
                    "id": lens["id"],
                    "en": lens["en"],
                    "cn": lens["cn"],
                    "question": lens["q"]
                }
                for i, (score, lens) in enumerate(keyword_results)
            ]
        }
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return

    print(f"\n{'='*70}")
    print(f"  问题：{problem}")
    print(f"{'='*70}")

    # 问题分类结果
    print(f"\n📋 问题分类识别（路径B）")
    print("-" * 70)
    if classified_types:
        top_type, top_score = classified_types[0]
        info = PROBLEM_TYPES[top_type]
        print(f"\n  判定类型：{top_type}（匹配度：{top_score}）")
        print(f"  核心盲区：{info['blind_spot']}")
        print(f"\n  推荐透镜组合：{' + '.join(info['lenses'])}")
        print(f"  组合逻辑：{info['logic']}")

        if len(classified_types) > 1:
            print(f"\n  次要类型：")
            for t, s in classified_types[1:3]:
                print(f"    - {t}（匹配度：{s}）→ {' + '.join(PROBLEM_TYPES[t]['lenses'])}")
    else:
        print("  未能识别问题类型，请尝试更具体的描述。")

    # 关键词匹配结果
    print(f"\n🔍 关键词匹配（路径A补充验证）")
    print("-" * 70)
    print(f"\n{'排名':<4} {'分数':<4} {'编号':<4} {'透镜':<20} {'核心问题'}")
    print("-" * 70)
    for rank, (score, lens) in enumerate(keyword_results, 1):
        if score == 0:
            break
        print(f"  {rank:<4} {score:<4} #{lens['id']:<3} {lens['cn']} ({lens['en']})".ljust(42) + f"  {lens['q']}")

    # 交叉验证提示
    print(f"\n{'='*70}")
    if classified_types:
        top_lenses = set(PROBLEM_TYPES[classified_types[0][0]]["lenses"])
        keyword_lenses = {lens["en"] for _, lens in keyword_results[:3]}
        overlap = top_lenses & keyword_lenses
        if overlap:
            print(f"  ✅ 交叉验证：分类推荐与关键词匹配在 {', '.join(overlap)} 上一致")
        else:
            print(f"  ⚠️  交叉验证：分类推荐与关键词匹配差异较大")
            print(f"     分类推荐：{' + '.join(top_lenses)}")
            print(f"     关键词Top3：{' + '.join(keyword_lenses)}")
            print(f"     建议：以分类推荐为主，补充关键词匹配的独特视角")
    print(f"{'='*70}\n")


def main():
    parser = argparse.ArgumentParser(description="透镜匹配评分器 V2")
    parser.add_argument("problem", help="问题描述")
    parser.add_argument("--top", type=int, default=5, help="显示前N个关键词匹配结果")
    parser.add_argument("--json", action="store_true", help="以JSON格式输出")
    args = parser.parse_args()

    classified_types = classify_problem(args.problem)
    keyword_results = match(args.problem, top_n=args.top)
    print_results(args.problem, classified_types, keyword_results, as_json=args.json)


if __name__ == "__main__":
    main()
