#!/usr/bin/env python3
"""
每日简报生成器
- 抓取RSS文章
- Claude API摘要
- 生成Shadcn UI风格的HTML
"""

import sys
import json
import os
import ssl
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError
import xml.etree.ElementTree as ET
import anthropic

# 禁用SSL验证
ssl._create_default_https_context = ssl._create_unverified_context

# 配置
OPML_FILE = Path(__file__).parent.parent / "sources" / "karpathy-rss.opml"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "briefing"
MAX_SOURCES = int(sys.argv[1]) if len(sys.argv) > 1 else 3
MAX_ITEMS = 2  # 每个源取2篇（控制API调用成本）

# Claude API
API_KEY = os.environ.get("ANTHROPIC_API_KEY")
if not API_KEY:
    print("❌ 请设置 ANTHROPIC_API_KEY 环境变量")
    sys.exit(1)

client = anthropic.Anthropic(api_key=API_KEY)

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日简报 - {date}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
            background: #f8fafc;
            color: #1e293b;
            line-height: 1.6;
            padding: 2rem 1rem;
        }}
        .container {{
            max-width: 800px;
            margin: 0 auto;
        }}
        header {{
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e2e8f0;
        }}
        h1 {{
            font-size: 1.5rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 0.5rem;
        }}
        .date {{
            color: #64748b;
            font-size: 0.875rem;
        }}
        article {{
            background: white;
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: box-shadow 0.2s, transform 0.2s;
        }}
        article:hover {{
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transform: translateY(-1px);
        }}
        .source {{
            font-size: 0.75rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }}
        h2 {{
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #0f172a;
        }}
        h2 a {{
            color: inherit;
            text-decoration: none;
        }}
        h2 a:hover {{
            color: #3b82f6;
        }}
        .summary {{
            color: #475569;
            font-size: 0.9375rem;
            line-height: 1.7;
        }}
        .summary ul {{
            padding-left: 1.25rem;
            margin-top: 0.5rem;
        }}
        .summary li {{
            margin-bottom: 0.375rem;
        }}
        footer {{
            text-align: center;
            margin-top: 3rem;
            color: #94a3b8;
            font-size: 0.875rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>每日简报</h1>
            <p class="date">{date}</p>
        </header>
        {content}
        <footer>
            <p>由 Mino 自动生成 · Claude API 驱动</p>
        </footer>
    </div>
</body>
</html>
"""

def fetch_rss(url: str) -> str:
    """抓取RSS feed"""
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=10) as response:
        return response.read().decode('utf-8', errors='ignore')

def parse_rss(xml_content: str) -> list:
    """解析RSS/Atom feed"""
    items = []
    try:
        root = ET.fromstring(xml_content)
        namespaces = {'atom': 'http://www.w3.org/2005/Atom'}

        if root.tag == '{http://www.w3.org/2005/Atom}feed':
            for entry in root.findall('atom:entry', namespaces)[:MAX_ITEMS]:
                title = entry.find('atom:title', namespaces)
                link = entry.find('atom:link', namespaces)
                content = entry.find('atom:content', namespaces) or entry.find('atom:summary', namespaces)
                items.append({
                    'title': title.text if title is not None else '',
                    'link': link.get('href') if link is not None else '',
                    'content': content.text if content is not None else ''
                })
        else:
            for item in root.findall('.//item')[:MAX_ITEMS]:
                title = item.find('title')
                link = item.find('link')
                desc = item.find('description') or item.find('{http://purl.org/rss/1.0/modules/content/}encoded')
                items.append({
                    'title': title.text if title is not None else '',
                    'link': link.text if link is not None else '',
                    'content': desc.text if desc is not None else ''
                })
    except Exception as e:
        print(f"  ⚠️ 解析错误: {e}")
    return items

def summarize(article: dict, source_name: str) -> str:
    """用Claude API生成摘要"""
    try:
        # 限制输入长度
        content = article.get('content', '')[:3000]
        if not content:
            content = article.get('title', '')

        prompt = f"""请用中文为这篇文章生成3点摘要，每点不超过30字。

标题：{article['title']}
来源：{source_name}
内容：{content}

返回格式（直接返回JSON）：
{{"points": ["要点1", "要点2", "要点3"]}}"""

        message = client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=500,
            temperature=0.3,
            messages=[{"role": "user", "content": prompt}]
        )

        import re
        content = message.content[0].text
        # 提取JSON
        match = re.search(r'\{.*\}', content, re.DOTALL)
        if match:
            data = json.loads(match.group())
            points = data.get('points', [])
            return '<ul>' + ''.join(f'<li>{p}</li>' for p in points) + '</ul>'
        return f'<p>{content[:200]}...</p>'
    except Exception as e:
        print(f"  ⚠️ 摘要失败: {e}")
        return '<p>摘要生成失败</p>'

def extract_opml_urls(opml_path: Path) -> list:
    """从OPML提取RSS源"""
    tree = ET.parse(opml_path)
    root = tree.getroot()
    return [outline.get('xmlUrl') for outline in root.findall('.//outline') if outline.get('xmlUrl')]

def main():
    print("📰 生成每日简报...")
    print(f"抓取前 {MAX_SOURCES} 个RSS源，每个源 {MAX_ITEMS} 篇文章\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime('%Y-%m-%d')

    rss_urls = extract_opml_urls(OPML_FILE)
    articles_html = []

    for i, url in enumerate(rss_urls[:MAX_SOURCES], 1):
        print(f"[{i}/{MAX_SOURCES}] 处理: {url}")

        try:
            xml = fetch_rss(url)
            items = parse_rss(xml)

            for item in items:
                if not item.get('title'):
                    continue

                print(f"  📄 {item['title'][:50]}...")
                summary = summarize(item, url)

                articles_html.append(f"""
        <article>
            <div class="source">{url}</div>
            <h2><a href="{item['link']}" target="_blank">{item['title']}</a></h2>
            <div class="summary">{summary}</div>
        </article>""")

        except Exception as e:
            print(f"  ❌ 错误: {e}")

    # 生成HTML
    html = HTML_TEMPLATE.format(
        date=today,
        content=''.join(articles_html)
    )

    output_file = OUTPUT_DIR / f"{today}.html"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"\n✅ 简报生成：{output_file}")
    print(f"🌐 在浏览器中打开查看效果")

if __name__ == '__main__':
    main()
