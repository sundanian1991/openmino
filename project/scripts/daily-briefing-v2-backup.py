#!/usr/bin/env python3
"""
每日简报生成器 V2 - Vibe Coding标准
- Tailwind CSS + Lucide Icons
- 两版输出：brief.html（简洁）+ full.html（详细）
- 精选15个高质量RSS源
- Newsletter级别排版设计
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
API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# 精选15个高质量RSS源（从92个中精选）
FEATURED_SOURCES = [
    "https://simonwillison.net/atom/everything/",      # Simon Willison - AI/技术
    "https://www.jeffgeerling.com/blog.xml",          # Jeff Geerling - Linux/硬件
    "https://mitchellh.com/feed.xml",                 # Mitchell Hashimoto - 创业/工程
    "http://www.aaronsw.com/2002/feeds/pgessays.rss", # Paul Graham - 深度思考
    "https://gwern.substack.com/feed",                # Gwern - AI研究
    "https://www.theatlantic.com/feed/author/derek-thompson/", # Derek Thompson - 经济/社会
    "https://danack.me/feed",                         # Dan Ackroyd - PHP/工程
    "https://danluu.com/atom.xml",                    # Dan Luu - 系统设计
    "https://refactoringenglish.com/index.xml",       # Refactoring English - 思考
    "https://krebsonsecurity.com/feed/",              # Krebs - 安全
    "https://www.troyhunt.com/rss/",                  # Troy Hunt - 安全
    "https://www.dwarkeshpatel.com/feed",             # Dwarkesh Podcast - 深度对话
    "https://www.johndcook.com/blog/feed/",           # John Cook - 数学/思考
    "https://blog.miguelgrinberg.com/feed",           # Miguel Grinberg - Python
    "https://tedunangst.com/flak/rss",                # Ted Unangst - 技术/生活
]

client = anthropic.Anthropic(api_key=API_KEY) if API_KEY else None

def fetch_rss(url: str) -> str:
    """抓取RSS feed"""
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=10) as response:
        return response.read().decode('utf-8', errors='ignore')

def parse_rss(xml_content: str, max_items: int = 3) -> list:
    """解析RSS/Atom feed"""
    items = []
    try:
        root = ET.fromstring(xml_content)
        namespaces = {'atom': 'http://www.w3.org/2005/Atom'}

        if root.tag == '{http://www.w3.org/2005/Atom}feed':
            for entry in root.findall('atom:entry', namespaces)[:max_items]:
                title = entry.find('atom:title', namespaces)
                link = entry.find('atom:link', namespaces)
                content = entry.find('atom:content', namespaces) or entry.find('atom:summary', namespaces)
                items.append({
                    'title': title.text if title is not None else '',
                    'link': link.get('href') if link is not None else '',
                    'content': content.text if content is not None else ''
                })
        else:
            for item in root.findall('.//item')[:max_items]:
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

def summarize(article: dict) -> str:
    """用Claude API生成摘要"""
    if not client:
        return None

    try:
        content = article.get('content', '')[:3000]
        if not content:
            content = article.get('title', '')

        prompt = f"""Generate 3 key points in Chinese, max 30 chars each. Return ONLY JSON:
{{"points": ["point1", "point2", "point3"]}}

Title: {article['title']}
Content: {content}"""

        message = client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=300,
            temperature=0.3,
            messages=[{"role": "user", "content": prompt}]
        )

        import re
        text = message.content[0].text
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group()).get('points', [])
    except Exception as e:
        print(f"    ⚠️ 摘要失败: {e}")
    return None

# ========== HTML模板 ==========

INDEX_HTML = '''<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日简报 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");
        body {{ font-family: "Inter", "Noto Sans SC", sans-serif; }}
        .gradient-text {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="max-w-4xl mx-auto px-6 py-12">
        <!-- Header -->
        <header class="text-center mb-16">
            <div class="flex items-center justify-center gap-2 mb-4">
                <i data-lucide="newspaper" class="w-8 h-8 text-violet-600"></i>
                <h1 class="text-3xl font-bold tracking-tight">每日简报</h1>
            </div>
            <p class="text-slate-500 text-sm">{date}</p>
            <p class="text-slate-400 text-xs mt-2">由 Mino 自动生成 · {total_articles} 篇文章</p>
        </header>

        <!-- Edition Cards -->
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Brief Edition -->
            <a href="brief.html" class="group">
                <article class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-3 bg-violet-100 rounded-xl">
                            <i data-lucide="zap" class="w-6 h-6 text-violet-600"></i>
                        </div>
                        <div>
                            <h2 class="font-semibold text-lg">快速浏览</h2>
                            <p class="text-slate-400 text-sm">Brief Edition</p>
                        </div>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mb-4">
                        精选15个高质量来源，每源1篇精华，适合快速了解今日要闻。
                    </p>
                    <div class="flex items-center text-violet-600 text-sm font-medium group-hover:gap-2 transition-all">
                        <span>开始阅读</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </article>
            </a>

            <!-- Full Edition -->
            <a href="full.html" class="group">
                <article class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-3 bg-amber-100 rounded-xl">
                            <i data-lucide="book-open" class="w-6 h-6 text-amber-600"></i>
                        </div>
                        <div>
                            <h2 class="font-semibold text-lg">深度阅读</h2>
                            <p class="text-slate-400 text-sm">Full Edition</p>
                        </div>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mb-4">
                        完整内容，每源3篇文章，AI生成摘要，适合深度学习。
                    </p>
                    <div class="flex items-center text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
                        <span>开始阅读</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </article>
            </a>
        </div>

        <!-- Footer -->
        <footer class="mt-16 text-center text-slate-400 text-sm">
            <p>由 Mino 自动生成 · Claude API 驱动</p>
        </footer>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>'''

BRIEF_HTML = '''<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>快速浏览 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");
        body {{ font-family: "Inter", "Noto Sans SC", sans-serif; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="max-w-2xl mx-auto px-6 py-12">
        <!-- Header -->
        <header class="mb-12">
            <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-6 transition-colors">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>返回首页</span>
            </a>
            <div class="flex items-center gap-2 mb-2">
                <i data-lucide="zap" class="w-6 h-6 text-violet-600"></i>
                <h1 class="text-2xl font-bold">快速浏览</h1>
            </div>
            <p class="text-slate-500 text-sm">{date} · {count} 篇精选</p>
        </header>

        <!-- Articles -->
        <div class="space-y-4">
            {articles}
        </div>

        <!-- Footer -->
        <footer class="mt-16 text-center text-slate-400 text-sm">
            <p>由 Mino 自动生成</p>
        </footer>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>'''

FULL_HTML = '''<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>深度阅读 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");
        body {{ font-family: "Inter", "Noto Sans SC", sans-serif; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="max-w-3xl mx-auto px-6 py-12">
        <!-- Header -->
        <header class="mb-12">
            <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-6 transition-colors">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>返回首页</span>
            </a>
            <div class="flex items-center gap-2 mb-2">
                <i data-lucide="book-open" class="w-6 h-6 text-amber-600"></i>
                <h1 class="text-2xl font-bold">深度阅读</h1>
            </div>
            <p class="text-slate-500 text-sm">{date} · {count} 篇完整内容</p>
        </header>

        <!-- Articles -->
        <div class="space-y-8">
            {articles}
        </div>

        <!-- Footer -->
        <footer class="mt-16 text-center text-slate-400 text-sm">
            <p>由 Mino 自动生成 · Claude API 驱动</p>
        </footer>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>'''

def get_source_name(url: str) -> str:
    """从URL提取来源名称"""
    name_map = {
        "simonwillison.net": "Simon Willison",
        "jeffgeerling.com": "Jeff Geerling",
        "mitchellh.com": "Mitchell H.",
        "aaronsw.com": "Paul Graham",
        "gwern.substack.com": "Gwern",
        "theatlantic.com": "The Atlantic",
        "danack.me": "Dan Ackroyd",
        "danluu.com": "Dan Luu",
        "refactoringenglish.com": "Refactoring English",
        "krebsonsecurity.com": "Krebs",
        "troyhunt.com": "Troy Hunt",
        "dwarkeshpatel.com": "Dwarkesh",
        "johndcook.com": "John Cook",
        "miguelgrinberg.com": "Miguel Grinberg",
        "tedunangst.com": "Ted Unangst",
    }
    for key, name in name_map.items():
        if key in url:
            return name
    return url.split("//")[-1].split("/")[0]

def main():
    if not API_KEY:
        print("❌ 请设置 ANTHROPIC_API_KEY 环境变量")
        sys.exit(1)

    print("📰 生成每日简报 V2...")
    print(f"精选 {len(FEATURED_SOURCES)} 个高质量RSS源\\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime('%Y-%m-%d')
    today_dir = OUTPUT_DIR / today
    today_dir.mkdir(exist_ok=True)

    brief_articles = []
    full_articles = []
    total_count = 0

    for i, url in enumerate(FEATURED_SOURCES, 1):
        print(f"[{i}/{len(FEATURED_SOURCES)}] {get_source_name(url)}")

        try:
            xml = fetch_rss(url)
            items = parse_rss(xml, max_items=3)

            if not items:
                continue

            source_name = get_source_name(url)

            # Brief: 只取第一篇
            brief_articles.append(f'''
            <a href="{items[0]['link']}" target="_blank" class="block bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-violet-300 hover:-translate-y-0.5">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">{items[0]['title']}</h3>
                        <p class="text-slate-400 text-xs flex items-center gap-1">
                            <i data-lucide="user" class="w-3 h-3"></i>
                            <span>{source_name}</span>
                        </p>
                    </div>
                    <i data-lucide="external-link" class="w-4 h-4 text-slate-300 flex-shrink-0 mt-1"></i>
                </div>
            </a>''')

            # Full: 全部3篇 + AI摘要
            for item in items:
                print(f"  📄 {item['title'][:40]}...")
                summary = summarize(item)

                summary_html = ""
                if summary:
                    summary_html = f'''
                    <div class="mt-4 pl-4 border-l-2 border-amber-200">
                        <ul class="space-y-1.5 text-sm text-slate-600">
                            {"".join(f"<li>{p}</li>" for p in summary)}
                        </ul>
                    </div>'''

                full_articles.append(f'''
            <article class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div class="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <i data-lucide="user" class="w-3.5 h-3.5"></i>
                    <span>{source_name}</span>
                </div>
                <a href="{item['link']}" target="_blank" class="group">
                    <h2 class="text-lg font-semibold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors line-clamp-2">
                        {item['title']}
                    </h2>
                </a>
                {summary_html}
                <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-slate-400">原文链接</span>
                    <a href="{item['link']}" target="_blank" class="text-violet-600 hover:text-violet-700 text-xs font-medium inline-flex items-center gap-1">
                        阅读全文 <i data-lucide="external-link" class="w-3 h-3"></i>
                    </a>
                </div>
            </article>''')

                total_count += 1

        except Exception as e:
            print(f"  ❌ 错误: {e}")

    # 生成HTML
    # Index
    index_path = today_dir / "index.html"
    index_html = INDEX_HTML.format(
        date=today,
        total_articles=total_count
    )
    index_path.write_text(index_html, encoding='utf-8')

    # Brief
    brief_path = today_dir / "brief.html"
    brief_html = BRIEF_HTML.format(
        date=today,
        count=len(brief_articles),
        articles=''.join(brief_articles)
    )
    brief_path.write_text(brief_html, encoding='utf-8')

    # Full
    full_path = today_dir / "full.html"
    full_html = FULL_HTML.format(
        date=today,
        count=total_count,
        articles=''.join(full_articles)
    )
    full_path.write_text(full_html, encoding='utf-8')

    print(f"\\n✅ 简报生成完成！")
    print(f"📁 目录: {today_dir}")
    print(f"   - index.html  (导航页)")
    print(f"   - brief.html  (快速浏览)")
    print(f"   - full.html   (深度阅读)")
    print(f"\\n🌐 在浏览器中打开查看")
    print(f"   open {index_path}")

if __name__ == '__main__':
    main()
