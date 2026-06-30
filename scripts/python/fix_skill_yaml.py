#!/usr/bin/env python3
"""
修复技能文件的YAML frontmatter格式问题
用法: python3 fix_skill_yaml.py [文件路径]
如果不提供文件路径，则修复所有已知的问题文件
"""
import yaml
import re
import os
import sys

def extract_name_from_filename(file_path):
    """从文件路径中提取技能名称"""
    basename = os.path.basename(os.path.dirname(file_path))
    return basename

def fix_yaml_frontmatter(file_path):
    """修复单个文件的YAML frontmatter"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return False, f"读取文件失败: {e}"
    
    # 检查是否有YAML frontmatter
    if not content.startswith('---'):
        # 没有frontmatter，需要添加
        name = extract_name_from_filename(file_path)
        # 尝试从内容中提取description
        desc_match = re.search(r'^>\s*(.*?)$', content, re.MULTILINE)
        if desc_match:
            description = desc_match.group(1).strip()
        else:
            description = f"技能: {name}"
        
        # 创建新的frontmatter
        new_frontmatter = f"""---
name: {name}
description: "{description}"
---

"""
        new_content = new_frontmatter + content
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, "添加了YAML frontmatter"
        except Exception as e:
            return False, f"写入文件失败: {e}"
    
    # 有frontmatter，尝试解析
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False, "无效的frontmatter结构"
    
    yaml_content = parts[1]
    try:
        data = yaml.safe_load(yaml_content)
        # 检查是否有description字段
        if 'description' not in data:
            # 尝试从内容中提取description
            rest_content = parts[2]
            desc_match = re.search(r'^>\s*(.*?)$', rest_content, re.MULTILINE)
            if desc_match:
                description = desc_match.group(1).strip()
            else:
                description = f"技能: {data.get('name', 'unknown')}"
            
            # 更新YAML
            data['description'] = description
            new_yaml = yaml.dump(data, allow_unicode=True, default_flow_style=False)
            new_content = '---\n' + new_yaml + '---' + parts[2]
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True, "添加了description字段"
            except Exception as e:
                return False, f"写入文件失败: {e}"
        return True, "YAML格式正确"
    except yaml.YAMLError as e:
        # YAML解析错误，尝试修复常见的问题
        # 对于word-proofreader这类问题：description字段的值包含未转义的引号
        # 尝试将description字段的值用单引号括起来
        lines = yaml_content.split('\n')
        fixed_lines = []
        for line in lines:
            # 匹配 'description: "..."' 形式，其中值包含中文引号
            match = re.match(r'^(\s*description:\s*)"(.*?)"$', line)
            if match:
                prefix = match.group(1)
                value = match.group(2)
                # 将值用单引号括起来，并转义内部的单引号
                fixed_value = "'" + value.replace("'", "''") + "'"
                line = prefix + fixed_value
            fixed_lines.append(line)
        
        fixed_yaml = '\n'.join(fixed_lines)
        try:
            data = yaml.safe_load(fixed_yaml)
            # 重建文件
            new_content = '---\n' + fixed_yaml + '---' + parts[2]
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True, "修复了YAML语法"
            except Exception as e:
                return False, f"写入文件失败: {e}"
        except yaml.YAMLError as e2:
            return False, f"YAML解析错误: {e2}"

def main():
    if len(sys.argv) > 1:
        files_to_fix = sys.argv[1:]
    else:
        # 默认修复所有已知的问题文件
        files_to_fix = [
            '/Users/sundanian/.agents/skills/word-proofreader/SKILL.md',
            '/Users/sundanian/.agents/skills/llm-wiki-pm/SKILL.md',
            '/Users/sundanian/.agents/skills/ljg-relationship/SKILL.md',
            '/Users/sundanian/.agents/skills/html-interactive/SKILL.md',
            '/Users/sundanian/.agents/skills/nyc-subway-campaign/SKILL.md',
            '/Users/sundanian/.agents/skills/viz-echarts-visualization/SKILL.md',
            '/Users/sundanian/.agents/skills/jingME/SKILL.md',
            '/Users/sundanian/.agents/skills/guizang-social-card-skill/SKILL.md',
            '/Users/sundanian/.agents/skills/viz-anthropic/SKILL.md',
            '/Users/sundanian/.myagents/skills/prompt-writer/SKILL.md',
            '/Users/sundanian/.agents/skills/viz-apple/SKILL.md',
            '/Users/sundanian/.agents/skills/ask-better/SKILL.md',
            '/Users/sundanian/.agents/skills/minto/SKILL.md',
            '/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/presentation-report-preflight/SKILL.md',
        ]
    
    print("开始修复技能文件...")
    for file_path in files_to_fix:
        if os.path.exists(file_path):
            success, message = fix_yaml_frontmatter(file_path)
            print(f"{file_path}: {message}")
        else:
            print(f"{file_path}: 文件不存在")
    
    print("修复完成。")

if __name__ == "__main__":
    main()
