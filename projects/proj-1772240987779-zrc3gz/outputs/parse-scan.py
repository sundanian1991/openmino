#!/usr/bin/env python3
"""
解析Tavily抓取的zara.faces.site/ai内容
生成格式化的Markdown文件
"""
import json
import re
from datetime import datetime
from urllib.parse import urlparse, unquote

def parse_content(raw_text):
    """解析原始文本，提取结构化数据"""

    # 按部分分割
    sections = {}
    current_section = "Intro"
    current_content = []

    # 主要分类标识
    section_markers = [
        "Featured Videos",
        "Video Podcasts",
        "Newsletters",
        "Products I like",
        "People",
        "Google resources",
    ]

    lines = raw_text.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # 检测新分类
        if line in section_markers:
            # 保存当前分类内容
            if current_content:
                if current_section not in sections:
                    sections[current_section] = []
                sections[current_section].extend(current_content)
            current_section = line
            current_content = []
        else:
            if line:
                current_content.append(line)

        i += 1

    # 保存最后一个分类
    if current_content:
        if current_section not in sections:
            sections[current_section] = []
        sections[current_section].extend(current_content)

    return sections

def extract_videos(content):
    """提取视频资源"""
    videos = []

    # 匹配模式: 标题 (URL) 描述 时长
    # 找所有链接
    url_pattern = r'https?://[^\s\)]+'
    urls = re.findall(url_pattern, content)

    # 找所有YouTube链接
    for url in urls:
        if 'youtube.com' in url or 'youtu.be' in url:
            videos.append({
                'type': 'video',
                'url': url
            })

    return videos

def extract_newsletters(content):
    """提取Newsletter资源"""
    newsletters = []

    lines = content.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # Newsletter名称通常在前一行，URL和描述在后
        if line and not line.startswith('http'):
            name = line
            # 检查下一行是否有描述
            if i + 1 < len(lines):
                desc = lines[i + 1].strip()
                # 检查是否有URL
                if i + 2 < len(lines) and 'http' in lines[i + 2]:
                    url = lines[i + 2].strip()
                    newsletters.append({
                        'name': name,
                        'description': desc,
                        'url': url
                    })
                    i += 3
                    continue
                else:
                    newsletters.append({
                        'name': name,
                        'description': desc,
                        'url': None
                    })
                    i += 2
                    continue

        i += 1

    return newsletters

def extract_people(content):
    """提取人物信息"""
    people = []

    lines = content.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # 人物格式: 姓名 职位/描述
        if line and len(line) < 100 and not line.startswith('http') and not line.startswith('['):
            # 可能是人名
            if i + 1 < len(lines):
                desc = lines[i + 1].strip()
                if desc and not desc.startswith('http') and len(desc) < 200:
                    people.append({
                        'name': line,
                        'description': desc
                    })

        i += 1

    return people

def format_markdown(raw_text):
    """将原始内容格式化为Markdown"""
    md = f"""# AI学习库完整内容扫描

扫描时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
网站：https://zara.faces.site/ai
作者：Zara Zhang (@zarazhangrui)

---

## 简介

这是一个精选的AI学习资源库，由Zara Zhang手工策划。

所有资源特点：
- 免费访问
- 对非技术人员友好

---

"""

    # 直接使用原始内容，因为Tavily已经做了很好的格式化
    # 让我们分段提取

    # 找到主要内容开始位置
    if "Featured Videos" in raw_text:
        featured_idx = raw_text.index("Featured Videos")
        main_content = raw_text[featured_idx:]
    else:
        main_content = raw_text

    # 清理多余内容
    main_content = main_content.replace("Raw Content:", "")
    main_content = main_content.replace("Detailed Results:", "")
    main_content = main_content.replace("Title: Zara's AI learning library - Faces", "")
    main_content = main_content.replace("URL: https://zara.faces.site/ai", "")
    main_content = main_content.replace("Content:", "")

    # 添加主要内容
    md += main_content

    # 添加统计
    md += f"""

---

## 扫描统计

- 扫描时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- 内容长度：{len(raw_text)} 字符
- 分类：Featured Videos, Video Podcasts, Newsletters, Products, People, Google Resources

---

*此文件由 Tavily + Python 自动抓取生成*
"""

    return md

if __name__ == '__main__':
    import os

    # 读取原始内容
    with open('/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs/raw-content.txt', 'r', encoding='utf-8') as f:
        raw_text = f.read()

    # 生成Markdown
    markdown_content = format_markdown(raw_text)

    # 保存
    output_dir = '/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs'
    os.makedirs(output_dir, exist_ok=True)

    output_file = f'{output_dir}/2026-02-28-full-scan.md'

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_content)

    print(f"\n✅ 解析完成！")
    print(f"📄 输出文件: {output_file}")
    print(f"📊 内容长度: {len(markdown_content)} 字符")
