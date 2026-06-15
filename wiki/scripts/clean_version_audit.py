#!/usr/bin/env python3
"""
Clean Version Audit — 以清洁版为基准，扫描其他制度文件的一致性
提取各文件中的关键规则（数字、百分比、阈值、时限），对比找出不一致

使用方式：
    cd wiki/scripts && python3 clean_version_audit.py

作者：年老师
日期：2026-06-13
"""

import re
from pathlib import Path
from collections import defaultdict

WIKI_DIR = Path("../")
RAW_DIR = WIKI_DIR / "raw"
DISTILL_DIR = WIKI_DIR / "distill"

def extract_key_rules(filepath):
    """从文件中提取关键规则（含数字、百分比、阈值、时限的段落）"""
    if filepath.suffix == '.pdf':
        return []
    try:
        content = filepath.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        try:
            content = filepath.read_text(encoding="gbk")
        except:
            return []
    lines = content.splitlines()
    
    rules = []
    current_section = ""
    
    for i, line in enumerate(lines):
        # 跟踪当前章节
        if line.startswith("## ") or line.startswith("### ") or line.startswith("**第"):
            current_section = line.strip("# *").strip()
        
        # 关键规则模式：包含数字+单位/百分比的行
        has_number = bool(re.search(r'\d+', line))
        has_unit = bool(re.search(r'%|人|天|月|年|小时|工作日|分|元|万', line))
        has_threshold = bool(re.search(r'≥|≤|<|>|不超过|超过|低于|高于|至少|最多', line))
        
        if has_number and has_unit and (has_threshold or len(line) > 20):
            # 过滤掉目录、索引等元段落
            if any(skip in line for skip in ['目录', '索引', '导航', '编号', '---', '===']):
                continue
            # 过滤过短的行
            if len(line.strip()) < 15:
                continue
            
            rules.append({
                "line": i + 1,
                "section": current_section,
                "text": line.strip()[:200],
                "file": filepath.name,
            })
    
    return rules

def audit_consistency():
    """执行一致性审计"""
    print("=" * 70)
    print("清洁版(SM-2026-050) vs 其他制度文件 一致性审计")
    print("=" * 70)
    
    # 定义文件映射
    files = {
        "清洁版": "SM-2026-050_清洁版操作指引.md",
        "总纲": "SM-2026-000_供应商管理办法_总纲.md",
        "引入规范": "SM-2026-010_供应商引入管理规范.md",
        "日常规范": "SM-2026-020_供应商日常管理规范.md",
        "清退规范": "SM-2026-030_供应商清退管理规范.md",
        "SLA": "SM-2026-040_供应商管理SLA.md",
        "精华版": "SM-2026-060_精华版.md",
        "分级清退": "SM-2026-035_供应商分级清退管理制度.md",
    }
    
    # 提取各文件的关键规则
    all_rules = {}
    for name, filename in files.items():
        filepath = RAW_DIR / filename
        if not filepath.exists():
            # 尝试找类似的文件
            for f in RAW_DIR.iterdir():
                if filename.split('_')[0] in f.name:
                    filepath = f
                    break
        
        if filepath.exists():
            rules = extract_key_rules(filepath)
            all_rules[name] = rules
            print(f"\n📄 {name} ({filename}): 提取 {len(rules)} 条关键规则")
        else:
            print(f"\n⚠️ {name} ({filename}): 文件不存在")
    
    # 定义需要对比的关键主题
    themes = {
        "准入门槛-人数": {
            "patterns": [r'\d+人', r'人数.*\d+', r'规模.*\d+', r'≥\d+人', r'至少\d+人'],
            "clean_section": "第四章",
        },
        "准入门槛-年限": {
            "patterns": [r'\d+年', r'年限.*\d+', r'经营.*\d+年'],
            "clean_section": "第四章",
        },
        "准入门槛-资本": {
            "patterns": [r'\d+万', r'\d+元', r'注册资本', r'资本.*\d+'],
            "clean_section": "第四章",
        },
        "清退触发-连续月份": {
            "patterns": [r'连续\d+月', r'连续\d+个?月', r'\d+月.*后30%'],
            "clean_section": "第五章",
        },
        "清退触发-阈值": {
            "patterns": [r'后30%', r'末位', r'尾部', r'淘汰'],
            "clean_section": "第五章/第九章",
        },
        "禁入期": {
            "patterns": [r'禁入', r'禁止.*合作', r'\d+个月', r'\d+年'],
            "clean_section": "第五章",
        },
        "集中度-单一供应商": {
            "patterns": [r'单一.*\d+%', r'单一.*上限', r'占比.*\d+%', r'\d+%.*上限'],
            "clean_section": "第六章",
        },
        "集中度-TOP3": {
            "patterns": [r'TOP3', r'前三', r'合计.*\d+%'],
            "clean_section": "第六章",
        },
        "赛马-周期": {
            "patterns": [r'月度', r'季度', r'每月', r'每季度'],
            "clean_section": "第八章",
        },
        "审批时效": {
            "patterns": [r'\d+个工作日', r'\d+天', r'\d+小时'],
            "clean_section": "第六章",
        },
        "结算-付款周期": {
            "patterns": [r'\d+工作日.*付款', r'付款.*\d+', r'结算.*\d+'],
            "clean_section": "第十章",
        },
        "巡检-频率": {
            "patterns": [r'巡检.*\d+', r'\d+.*巡检', r'定期.*\d+'],
            "clean_section": "第七章",
        },
    }
    
    print("\n" + "=" * 70)
    print("对比结果：")
    print("=" * 70)
    
    inconsistencies = []
    
    for theme_name, theme_info in themes.items():
        print(f"\n🔍 【{theme_name}】")
        
        # 在清洁版中查找
        clean_rules = []
        for rule in all_rules.get("清洁版", []):
            for pattern in theme_info["patterns"]:
                if re.search(pattern, rule["text"]):
                    clean_rules.append(rule)
                    break
        
        if not clean_rules:
            print(f"  清洁版中未找到相关规则")
            continue
        
        print(f"  清洁版({theme_info['clean_section']}):")
        for rule in clean_rules[:3]:
            print(f"    - {rule['text'][:100]}")
        
        # 在其他文件中查找
        for file_name, rules in all_rules.items():
            if file_name == "清洁版":
                continue
            
            other_rules = []
            for rule in rules:
                for pattern in theme_info["patterns"]:
                    if re.search(pattern, rule["text"]):
                        other_rules.append(rule)
                        break
            
            if other_rules:
                print(f"  {file_name}:")
                for rule in other_rules[:3]:
                    print(f"    - {rule['text'][:100]}")
                
                # 检查是否有明显冲突
                # 简单启发式：如果清洁版和其他文件都有数字，检查数字是否一致
                clean_nums = set()
                for rule in clean_rules:
                    nums = re.findall(r'\d+', rule["text"])
                    clean_nums.update(nums)
                
                other_nums = set()
                for rule in other_rules:
                    nums = re.findall(r'\d+', rule["text"])
                    other_nums.update(nums)
                
                if clean_nums and other_nums and not clean_nums.intersection(other_nums):
                    # 数字完全不重叠，可能有冲突
                    if len(clean_nums) > 0 and len(other_nums) > 0:
                        inconsistencies.append({
                            "theme": theme_name,
                            "clean_nums": clean_nums,
                            "other_file": file_name,
                            "other_nums": other_nums,
                        })
    
    # 输出潜在冲突
    if inconsistencies:
        print("\n" + "=" * 70)
        print("⚠️ 潜在数字冲突（需人工核对）：")
        print("=" * 70)
        for inc in inconsistencies:
            print(f"\n【{inc['theme']}】")
            print(f"  清洁版数字: {sorted(inc['clean_nums'])}")
            print(f"  {inc['other_file']}数字: {sorted(inc['other_nums'])}")
            print(f"  建议: 核对两文件的数值标准是否一致")
    else:
        print("\n✅ 未发现明显的数字冲突")
    
    print("\n" + "=" * 70)
    print("审计完成。请人工核对上述潜在冲突。")
    print("=" * 70)

if __name__ == "__main__":
    audit_consistency()
