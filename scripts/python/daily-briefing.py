#!/usr/bin/env python3
"""
每日简报 V6 - 8pt Grid + Design Tokens + 排版层级
风格：克制、中性、留白足、轻边框、轻投影
"""

import os
import sys
import ssl
import time
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen
from xml.etree import ElementTree as ET
from anthropic import Anthropic

# Disable SSL verification
ssl._create_default_https_context = ssl._create_unverified_context

API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
OUTPUT_DIR = Path('data/briefing')

# ========== 精选RSS源（15个高质量来源）==========
FEATURED_SOURCES = [
    ("https://simonwillison.net/atom/everything/", "Simon Willison", "AI技术"),
    ("https://www.jeffgeerling.com/blog.xml", "Jeff Geerling", "Linux硬件"),
    ("https://www.hashicorp.com/blog/feed.xml", "Mitchell Hashimoto", "工程创业"),
    ("https://paulgraham.com/feed.xml", "Paul Graham", "深度思考"),
    ("https://gwern.net/feed.xml", "Gwern", "AI研究"),
    ("https://danluu.com/atom.xml", "Dan Luu", "系统设计"),
    ("https://refactoringenglish.com/feed/", "Refactoring English", "思维方法"),
    ("https://krebsonsecurity.com/feed/", "Krebs", "网络安全"),
    ("https://www.troyhunt.com/rss/", "Troy Hunt", "安全实践"),
    ("https://dwarkeshpatel.com/feed", "Dwarkesh", "深度对话"),
    ("https://www.johndcook.com/blog/feed/", "John Cook", "数学思维"),
    ("https://blog.miguelgrinberg.com/feed", "Miguel Grinberg", "Python开发"),
    ("https://www.unlimitednovelty.com/feed/", "Ted Unangst", "技术生活"),
    ("https://overreacted.io/feed.xml", "Dan Abramov", "React哲学"),
    ("https://matklad.github.io/feed.xml", "Matklad", "软件工程"),
]

# ========== Design Tokens (shadcn/ui风格) ==========
# 间距: 4/8/12/16/24/32/40/48
# 圆角: 10 (统一)
# 字号: 32/24/20/16/14/12
# 颜色: 1品牌色 + 灰阶系统

INDEX_HTML = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日简报 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", -apple-system, sans-serif; }}

        /* ========== Design Tokens ========== */
        :root {{
            /* Spacing - 8pt Grid */
            --space-4: 4px;
            --space-8: 8px;
            --space-12: 12px;
            --space-16: 16px;
            --space-24: 24px;
            --space-32: 32px;

            /* Radius - 统一10 */
            --radius: 10px;

            /* Colors - 品牌色 + 灰阶 */
            --color-primary: #6366f1;
            --color-primary-hover: #4f46e5;
            --color-bg: #ffffff;
            --color-bg-muted: #f9fafb;
            --color-border: #e5e7eb;
            --color-text: #111827;
            --color-text-muted: #6b7280;
            --color-text-faint: #9ca3af;

            /* Shadow - 2层 */
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);
            --shadow-hover: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);
        }}

        /* ========== Typography ========== */
        /* H1: 32px/40px */
        .display {{ font-size: 32px; line-height: 40px; }}
        /* H2: 24px/32px */
        .heading {{ font-size: 24px; line-height: 32px; }}
        /* H3: 20px */
        .subheading {{ font-size: 20px; }}
        /* Body: 16px/1.6 */
        .body {{ font-size: 16px; line-height: 1.6; }}
        /* Caption: 14px/22px */
        .caption {{ font-size: 14px; line-height: 22px; }}
        /* Label: 12px/18px */
        .label {{ font-size: 12px; line-height: 18px; }}

        /* ========== Components ========== */
        .card {{
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            transition: all 150ms ease;
        }}
        .card:hover {{
            box-shadow: var(--shadow-hover);
            border-color: #d1d5db;
        }}

        .btn-primary {{
            background: var(--color-primary);
            color: white;
            padding: 10px var(--space-16);
            border-radius: var(--radius);
            font-weight: 500;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: background 150ms ease;
        }}
        .btn-primary:hover {{
            background: var(--color-primary-hover);
        }}

        .tag {{
            display: inline-flex;
            align-items: center;
            padding: 4px var(--space-12);
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            background: var(--color-bg-muted);
            color: var(--color-text-muted);
            border: 1px solid var(--color-border);
        }}

        /* ========== Layout ========== */
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding-left: var(--space-24);
            padding-right: var(--space-24);
        }}

        .grid-cards {{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-16);
        }}
        @media (max-width: 768px) {{
            .grid-cards {{ grid-template-columns: 1fr; }}
        }}

        /* Hero - 克制风格 */
        .hero {{
            background: var(--color-bg-muted);
            border-bottom: 1px solid var(--color-border);
            padding: var(--space-32) 0;
        }}
    </style>
</head>
<body class="bg-white">
    <!-- Hero -->
    <header class="hero">
        <div class="container text-center">
            <h1 class="display font-bold text-gray-900 mb-8">每日简报</h1>
            <p class="caption text-gray-500 mb-4">{date_zh}</p>
            <p class="caption text-gray-400">精选 {total_sources} 个来源 · {total_articles} 篇内容</p>
        </div>
    </header>

    <!-- Edition Cards -->
    <main class="container" style="margin-top: -32px;">
        <div class="grid-cards">
            <!-- Brief Edition -->
            <a href="brief.html" class="card p-24 block cursor-pointer" style="padding: var(--space-24);">
                <div class="flex items-start gap-16 mb-16">
                    <div class="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center" style="background: #eef2ff;">
                        <i data-lucide="zap" class="w-6 h-6 text-indigo-600"></i>
                    </div>
                    <div class="flex-1">
                        <h2 class="heading font-semibold text-gray-900 mb-8">快速浏览</h2>
                        <p class="body text-gray-600 mb-16">每源1篇 · 轻量阅读</p>
                        <div class="flex items-center justify-between">
                            <span class="tag">{brief_count} 篇精华</span>
                            <span class="caption text-gray-400 font-medium">开始阅读 →</span>
                        </div>
                    </div>
                </div>
            </a>

            <!-- Full Edition -->
            <a href="full.html" class="card p-24 block cursor-pointer" style="padding: var(--space-24);">
                <div class="flex items-start gap-16 mb-16">
                    <div class="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center" style="background: #fffbeb;">
                        <i data-lucide="book-open" class="w-6 h-6 text-amber-600"></i>
                    </div>
                    <div class="flex-1">
                        <h2 class="heading font-semibold text-gray-900 mb-8">深度阅读</h2>
                        <p class="body text-gray-600 mb-16">每源3篇 · AI摘要</p>
                        <div class="flex items-center justify-between">
                            <span class="tag">{full_count} 篇完整</span>
                            <span class="caption text-gray-400 font-medium">开始阅读 →</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </main>

    <!-- Footer -->
    <footer class="container text-center" style="padding: var(--space-32) 0;">
        <p class="label text-gray-400">由 Mino 生成 · Claude API 驱动</p>
    </footer>

    <script>lucide.createIcons();</script>
</body>
</html>'''

FULL_HTML = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>深度阅读 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", -apple-system, sans-serif; }}

        /* ========== Design Tokens ========== */
        :root {{
            --space-4: 4px;
            --space-8: 8px;
            --space-12: 12px;
            --space-16: 16px;
            --space-24: 24px;
            --space-32: 32px;
            --radius: 10px;
            --color-primary: #6366f1;
            --color-bg: #ffffff;
            --color-bg-muted: #f9fafb;
            --color-border: #e5e7eb;
            --color-text: #111827;
            --color-text-muted: #6b7280;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07);
            --shadow-hover: 0 10px 15px -3px rgb(0 0 0 / 0.08);
        }}

        /* Typography */
        .display {{ font-size: 32px; line-height: 40px; }}
        .heading {{ font-size: 24px; line-height: 32px; }}
        .subheading {{ font-size: 20px; }}
        .body {{ font-size: 16px; line-height: 1.6; }}
        .caption {{ font-size: 14px; line-height: 22px; }}
        .label {{ font-size: 12px; line-height: 18px; }}

        /* Components */
        .article-card {{
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            padding: var(--space-24);
            margin-bottom: var(--space-16);
            transition: all 150ms ease;
        }}
        .article-card:hover {{
            box-shadow: var(--shadow-hover);
            border-color: #d1d5db;
        }}

        .tag {{
            display: inline-flex;
            align-items: center;
            padding: 4px var(--space-12);
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            background: var(--color-bg-muted);
            color: var(--color-text-muted);
            border: 1px solid var(--color-border);
        }}

        .btn-link {{
            display: inline-flex;
            align-items: center;
            gap: var(--space-4);
            color: var(--color-primary);
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            transition: color 150ms ease;
        }}
        .btn-link:hover {{
            color: #4f46e5;
        }}

        /* Layout */
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding-left: var(--space-24);
            padding-right: var(--space-24);
        }}

        .header-sticky {{
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--color-border);
            position: sticky;
            top: 0;
            z-index: 50;
        }}

        .summary-box {{
            background: var(--color-bg-muted);
            border-radius: 8px;
            padding: var(--space-16);
            margin: var(--space-16) 0;
            border: 1px solid var(--color-border);
        }}
    </style>
</head>
<body class="bg-white">
    <!-- Sticky Header -->
    <header class="header-sticky">
        <div class="container flex items-center justify-between" style="padding-top: var(--space-16); padding-bottom: var(--space-16);">
            <a href="index.html" class="btn-link">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>返回</span>
            </a>
            <div class="text-center">
                <h1 class="heading font-semibold text-gray-900">深度阅读</h1>
                <p class="label text-gray-500 mt-4">{date_zh} · {total_count} 篇</p>
            </div>
            <div style="width: 60px;"></div>
        </div>
    </header>

    <!-- Articles -->
    <main class="container" style="padding-top: var(--space-32);">
        {articles}
    </main>

    <!-- Footer -->
    <footer class="container text-center" style="padding: var(--space-32) 0; border-top: 1px solid var(--color-border); margin-top: var(--space-32);">
        <p class="label text-gray-400">由 Mino 生成 · Claude API 驱动</p>
    </footer>

    <script>lucide.createIcons();</script>
</body>
</html>'''

BRIEF_HTML = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>快速浏览 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", -apple-system, sans-serif; }}

        :root {{
            --space-16: 16px;
            --space-24: 24px;
            --space-32: 32px;
            --radius: 10px;
            --color-primary: #6366f1;
            --color-border: #e5e7eb;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-hover: 0 10px 15px -3px rgb(0 0 0 / 0.08);
        }}

        .body {{ font-size: 16px; line-height: 1.6; }}
        .heading {{ font-size: 24px; line-height: 32px; }}
        .caption {{ font-size: 14px; line-height: 22px; }}

        .article-card {{
            background: white;
            border: 1px solid var(--color-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            padding: var(--space-24);
            margin-bottom: var(--space-16);
            transition: all 150ms ease;
        }}
        .article-card:hover {{
            box-shadow: var(--shadow-hover);
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding-left: var(--space-24);
            padding-right: var(--space-24);
        }}

        .header-sticky {{
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--color-border);
            position: sticky;
            top: 0;
            z-index: 50;
        }}

        .btn-link {{
            display: inline-flex;
            align-items: center;
            gap: 4px;
            color: var(--color-primary);
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
        }}
    </style>
</head>
<body class="bg-white">
    <header class="header-sticky">
        <div class="container flex items-center justify-between" style="padding: 16px 24px;">
            <a href="index.html" class="btn-link">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>返回</span>
            </a>
            <div class="text-center">
                <h1 class="heading font-semibold text-gray-900">快速浏览</h1>
                <p class="caption text-gray-500 mt-4">{date_zh}</p>
            </div>
            <div style="width: 60px;"></div>
        </div>
    </header>

    <main class="container" style="padding-top: 32px;">
        {articles}
    </main>

    <footer class="container text-center" style="padding: 32px 0; border-top: 1px solid #e5e7eb; margin-top: 32px;">
        <p style="font-size: 12px; line-height: 18px; color: #9ca3af;">由 Mino 生成 · Claude API 驱动</p>
    </footer>

    <script>lucide.createIcons();</script>
</body>
</html>'''


def fetch_rss(url: str) -> list:
    """抓取RSS feed"""
    try:
        with urlopen(url, timeout=10) as response:
            xml = response.read().decode('utf-8', errors='ignore')
        root = ET.fromstring(xml)

        articles = []
        items = root.findall('.//item') or root.findall('.//{http://www.w3.org/2005/Atom}entry')

        for item in items[:5]:
            title_elem = item.find('title') or item.find('{http://www.w3.org/2005/Atom}title')
            link_elem = item.find('link') or item.find('{http://www.w3.org/2005/Atom}link')
            desc_elem = item.find('description') or item.find('{http://www.w3.org/2005/Atom}summary')

            if title_elem is not None and link_elem is not None:
                title = title_elem.text or ''
                link = link_elem.text or link_elem.get('href', '')
                desc = desc_elem.text if desc_elem is not None else ''

                if link:
                    articles.append({'title': title.strip(), 'link': link, 'desc': desc.strip()})

        return articles
    except Exception as e:
        print(f"  ❌ 错误: {e}")
        return []


def extract_insight(article: dict, source_name: str, category: str) -> dict:
    """AI内容二次加工：提炼核心观点、一句话总结、阅读价值"""
    if not API_KEY:
        return {'insight': '', 'one_liner': article['title'][:50] + '...', 'value': '深度阅读'}

    try:
        client = Anthropic(api_key=API_KEY)
        content = f"标题: {article['title']}\n来源: {source_name}\n分类: {category}"

        message = client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=300,
            messages=[{
                "role": "user",
                "content": f"""分析以下文章，返回JSON（纯JSON，无markdown标记）:
{content}

返回格式:
{{"insight": "核心观点（一句话，20字内）", "one_liner": "一句话总结（30字内）", "value": "阅读价值标签（深度思考/实用工具/技术前沿/行业洞察）"}}"""
            }]
        )

        import json
        result = json.loads(message.content[0].text)
        return result
    except:
        return {'insight': '', 'one_liner': article['title'][:50] + '...', 'value': '深度阅读'}


def get_category_emoji(category: str) -> str:
    emoji_map = {
        "AI技术": "🤖", "Linux硬件": "⚙️", "工程创业": "🚀",
        "深度思考": "💡", "AI研究": "🧠", "系统设计": "🏗️",
        "思维方法": "📚", "网络安全": "🛡️", "安全实践": "🔒",
        "深度对话": "🎙️", "数学思维": "📐", "Python开发": "🐍",
        "技术生活": "☕", "React哲学": "⚛️", "软件工程": "🔧"
    }
    return emoji_map.get(category, "📄")


def main():
    if not API_KEY:
        print("❌ 请设置 ANTHROPIC_API_KEY 环境变量")
        sys.exit(1)

    print("📰 生成每日简报 V6（8pt Grid + Design Tokens）...")
    print(f"精选 {len(FEATURED_SOURCES)} 个高质量RSS源\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now()
    today_str = today.strftime('%Y-%m-%d')
    today_dir = OUTPUT_DIR / today_str
    today_dir.mkdir(exist_ok=True)

    weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    date_zh = f"{today.month}月{today.day}日 {weekdays[today.weekday()]}"

    all_articles = []

    for i, (url, source_name, category) in enumerate(FEATURED_SOURCES, 1):
        print(f"[{i}/{len(FEATURED_SOURCES)}] {source_name} ({category})")

        try:
            xml = fetch_rss(url)
            for article in xml[:3]:
                article['source'] = source_name
                article['category'] = category
                article['emoji'] = get_category_emoji(category)

                # AI二次加工
                ai_result = extract_insight(article, source_name, category)
                article.update(ai_result)

                all_articles.append(article)
            time.sleep(0.5)
        except Exception as e:
            print(f"  ❌ 错误: {e}")

    print(f"\n✅ 共获取 {len(all_articles)} 篇文章")

    # ========== 生成FULL HTML ==========
    articles_html = ""
    for article in all_articles:
        articles_html += f'''
        <article class="article-card">
            <div class="flex items-start gap-16" style="gap: var(--space-16);">
                <span class="text-4xl">{article['emoji']}</span>
                <div class="flex-1">
                    <div class="flex items-center gap-8 mb-12" style="margin-bottom: 12px; gap: 8px;">
                        <span class="tag">{article['category']}</span>
                        <span class="caption text-gray-400">·</span>
                        <span class="caption text-gray-500">{article['source']}</span>
                    </div>

                    <h2 class="subheading font-semibold text-gray-900 mb-12" style="margin-bottom: 12px;">
                        <a href="{article['link']}" target="_blank" class="hover:text-indigo-600 transition-colors">
                            {article['title']}
                        </a>
                    </h2>

                    {f'<p class="body text-gray-700 mb-12" style="margin-bottom: 12px;">{article["insight"]}</p>' if article['insight'] else ''}

                    <div class="summary-box">
                        <p class="caption text-gray-600">{article['one_liner']}</p>
                    </div>

                    <div class="flex items-center justify-between mt-16" style="margin-top: 16px;">
                        <span class="tag">{article['value']}</span>
                        <a href="{article['link']}" target="_blank" class="btn-link">
                            <span>阅读全文</span>
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </article>'''

    full_path = today_dir / "full.html"
    full_html = FULL_HTML.format(
        date=today_str,
        date_zh=date_zh,
        total_count=len(all_articles),
        articles=articles_html
    )
    full_path.write_text(full_html, encoding='utf-8')
    print(f"✅ full.html 生成")

    # ========== 生成BRIEF HTML ==========
    brief_articles = []
    sources_seen = set()
    for article in all_articles:
        if article['source'] not in sources_seen:
            brief_articles.append(article)
            sources_seen.add(article['source'])

    brief_html_content = ""
    for article in brief_articles:
        brief_html_content += f'''
        <article class="article-card">
            <div class="flex items-start gap-16" style="gap: 16px;">
                <span class="text-3xl">{article['emoji']}</span>
                <div class="flex-1">
                    <div class="flex items-center gap-8 mb-8" style="margin-bottom: 8px; gap: 8px;">
                        <span class="tag">{article['category']}</span>
                        <span class="caption text-gray-400">·</span>
                        <span class="caption text-gray-500">{article['source']}</span>
                    </div>
                    <h2 class="subheading font-semibold text-gray-900 mb-8" style="margin-bottom: 8px;">
                        <a href="{article['link']}" target="_blank" class="hover:text-indigo-600 transition-colors">
                            {article['title']}
                        </a>
                    </h2>
                </div>
            </div>
        </article>'''

    brief_path = today_dir / "brief.html"
    brief_html = BRIEF_HTML.format(
        date=today_str,
        date_zh=date_zh,
        articles=brief_html_content
    )
    brief_path.write_text(brief_html, encoding='utf-8')
    print(f"✅ brief.html 生成")

    # ========== 生成INDEX HTML ==========
    index_path = today_dir / "index.html"
    index_html = INDEX_HTML.format(
        date=today_str,
        date_zh=date_zh,
        total_sources=len(FEATURED_SOURCES),
        total_articles=len(all_articles),
        brief_count=len(brief_articles),
        full_count=len(all_articles)
    )
    index_path.write_text(index_html, encoding='utf-8')
    print(f"✅ index.html 生成")

    print(f"\n📁 目录: {today_dir}")
    print(f"   - index.html  (导航页)")
    print(f"   - brief.html  (快速浏览)")
    print(f"   - full.html   (深度阅读)")


if __name__ == "__main__":
    main()
