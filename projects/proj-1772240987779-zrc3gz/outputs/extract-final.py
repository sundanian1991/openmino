#!/usr/bin/env python3
"""从Tavily抓取的内容中提取所有资源"""
import re
from datetime import datetime

with open('/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs/raw-content.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到各个部分的起始位置
people_idx = content.find('People to Follow on X')
newsletter_idx = content.find('Newsletters', people_idx)
products_idx = content.find('Products I like', newsletter_idx)
video_idx = content.find('[**Deep Dive into LLMs')

# 提取各部分内容
videos_section = content[video_idx:people_idx] if video_idx < people_idx else content[:people_idx]
people_section = content[people_idx:newsletter_idx]
newsletter_section = content[newsletter_idx:products_idx]
products_section = content[products_idx:products_idx+3000]

# 提取Videos
video_pattern = r'\[\*\*(.*?)\*\*\]\(https://www\.youtube\.com/watch\?v=([^)]+)\)'
videos = re.findall(video_pattern, videos_section)

# 提取Video Podcasts (在Featured Videos后面)
podcast_idx = videos_section.find('Video Podcasts')
if podcast_idx > 0:
    podcast_section = videos_section[podcast_idx:people_idx-video_idx]
else:
    podcast_section = ''
podcast_pattern = r'\[\*\*(.*?)\*\*\s*\n+Watch\s*\n*\n*(.*?)\n*\]\((https://www\.youtube\.com/[^)]+)\)'
podcasts = re.findall(podcast_pattern, podcast_section, re.DOTALL)

# 提取People - 使用新的模式
people = []
person_pattern = r'\[\*\*(.*?)\*\*\s*\n+(.*?)\n+\]\((https://x\.com/[^)]+)\)'
people_raw = re.findall(person_pattern, people_section, re.DOTALL)
for name, desc, url in people_raw:
    clean_desc = desc.strip().replace('\n', ' ')
    people.append((name, clean_desc, url))

# 提取Newsletters
newsletters = []
newsletter_pattern = r'\[\*\*(.*?)\*\*\]\((https?://[^)]+)\)'
newsletters_raw = re.findall(newsletter_pattern, newsletter_section)
for name, url in newsletters_raw:
    newsletters.append((name, url))

# 提取Products
products = []
product_pattern = r'\[?\*?\*?(.*?)\*?\*?\]?\s*\n+(.*?)\s*\n+Visit\]\((https?://[^)]+)\)'
products_raw = re.findall(product_pattern, products_section, re.DOTALL)
for name, desc, url in products_raw:
    clean_name = name.strip().replace('*', '').replace(']', '').replace('[', '')
    if clean_name and url:
        products.append((clean_name, url, desc.strip()))

# 生成最终Markdown
md = f"""# AI学习库完整内容扫描

> Zara Zhang的手工精选AI资源库

---

## 📋 扫描信息

- **扫描时间**：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **来源网站**：https://zara.faces.site/ai
- **作者**：Zara Zhang ([@zarazhangrui](https://x.com/zarazhangrui))
- **资源特点**：免费访问 + 非技术人员友好

---

## 🎯 资源概览

| 分类 | 数量 |
|------|------|
| 📺 **Featured Videos** | {len(videos)} |
| 🎙️ **Video Podcasts** | {len(podcasts)} |
| 👥 **People to Follow** | {len(people)} |
| 📰 **Newsletters** | {len(newsletters)} |
| 🛠️ **Products** | {len(products)} |
| **总计** | **{len(videos) + len(podcasts) + len(people) + len(newsletters) + len(products)}** |

---

## 📺 Featured Videos

_Zara Zhang亲自观看并推荐的AI视频，从海量内容中精选_

1. **[Deep Dive into LLMs like ChatGPT](https://www.youtube.com/watch?v=7xTGNNLPyMI)**
   - Andrej Karpathy - 最好的LLM入门教程（3:31:23）

2. **[How to Build a Beloved AI Product - Granola CEO Chris Pedregal](https://www.youtube.com/watch?v=IcbuTTVUY7M)**
   - The MAD Podcast - 最欣赏的AI PM的产品思维（1:08:35）

3. **[Inside NotebookLM with Raiza Martin and Steven Johnson](https://www.youtube.com/watch?v=mccQdu5afZw)**
   - Google NotebookLM幕后故事（46:11）

4. **[Prompting 101 | Code w/ Claude](https://www.youtube.com/watch?v=ysPbXH0LpIE)**
   - Anthropic团队官方提示指南（24:52）

5. **[Andrew Ng: Building Faster with AI](https://www.youtube.com/watch?v=RNJCfif1dPY)**
   - Y Combinator - AI时代产品开发思维（43:57）

6. **[Inside ChatGPT: The fastest growing product in history](https://www.youtube.com/watch?v=ixY2PvQJ0To)**
   - Lenny's Podcast - ChatGPT增长内幕（1:35:37）

---

## 🎙️ Video Podcasts

_推荐观看视频版本，包含产品演示和屏幕分享_

"""

for i, (title, desc, url) in enumerate(podcasts, 1):
    clean_desc = ' '.join(desc.split())[:100] + ('...' if len(desc) > 100 else '')
    md += f"{i}. **[{title}]({url})**\n   - {clean_desc}\n\n"

md += f"""
---
## 👥 People to Follow on X ({len(people)}人)

_原则：关注构建者，而非影响者。以下大多数人都在亲手构建AI产品/公司_

"""

for i, (name, desc, url) in enumerate(people, 1):
    md += f"{i}. **[{name}]({url})** - {desc}\n"

md += f"""

---
## 📰 Newsletters ({len(newsletters)}个)

_Zara定期阅读的Newsletter，获取AI产品、模型发布和深度文章_

"""

for i, (name, url) in enumerate(newsletters, 1):
    md += f"{i}. **[{name}]({url})**\n"

md += f"""

---
## 🛠️ Products ({len(products)}个)

_Zara个人使用和推荐的AI产品_

"""

for i, (name, url, desc) in enumerate(products, 1):
    clean_desc = ' '.join(desc.split())[:60] + ('...' if len(desc) > 60 else '')
    md += f"{i}. **[{name}]({url})** - {clean_desc}\n"

md += """

---

## 🔗 相关链接

- **完整资源库**：https://zara.faces.site/ai
- **作者 X**：[@zarazhangrui](https://x.com/zarazhangrui)
- **LongCut工具**：https://longcut.ai (长视频学习工具)
- **TLDW工具**：https://tldw.us/ (YouTube视频学习工具)

---

*扫描工具：Tavily Search + Python*
*生成时间：""" + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "*\n"

# 保存
output_path = '/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs/2026-02-28-full-scan.md'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(md)

print("=" * 50)
print("✅ 最终版本生成完成！")
print("=" * 50)
print(f"📄 文件：{output_path}")
print(f"\n📊 资源统计：")
print(f"   📺 Featured Videos: {len(videos)}")
print(f"   🎙️ Video Podcasts: {len(podcasts)}")
print(f"   👥 People to Follow: {len(people)}")
print(f"   📰 Newsletters: {len(newsletters)}")
print(f"   🛠️ Products: {len(products)}")
print(f"\n   总计: {len(videos) + len(podcasts) + len(people) + len(newsletters) + len(products)} 个资源")
