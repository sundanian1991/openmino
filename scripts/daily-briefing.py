#!/usr/bin/env python3
"""
每日简报生成器 V3 - 产品级设计
- 质感提升：精致阴影、渐变、动效
- 内容二次加工：焦点文章、分类组织、核心观点提炼
- 高度组织化：视觉层级、阅读路径、信息架构
- 全中文呈现
"""

import sys
import json
import os
import ssl
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
import xml.etree.ElementTree as ET
import anthropic

# 禁用SSL验证
ssl._create_default_https_context = ssl._create_unverified_context

# 配置
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "briefing"
API_KEY = os.environ.get("ANTHROPIC_API_KEY")

# 精选15个高质量RSS源
FEATURED_SOURCES = [
    ("https://simonwillison.net/atom/everything/", "Simon Willison", "AI技术"),
    ("https://www.jeffgeerling.com/blog.xml", "Jeff Geerling", "Linux硬件"),
    ("https://mitchellh.com/feed.xml", "Mitchell Hashimoto", "工程创业"),
    ("http://www.aaronsw.com/2002/feeds/pgessays.rss", "Paul Graham", "深度思考"),
    ("https://gwern.substack.com/feed", "Gwern", "AI研究"),
    ("https://danluu.com/atom.xml", "Dan Luu", "系统设计"),
    ("https://refactoringenglish.com/index.xml", "Refactoring English", "思维方法"),
    ("https://krebsonsecurity.com/feed/", "Krebs", "网络安全"),
    ("https://www.troyhunt.com/rss/", "Troy Hunt", "安全实践"),
    ("https://www.dwarkeshpatel.com/feed", "Dwarkesh", "深度对话"),
    ("https://www.johndcook.com/blog/feed/", "John Cook", "数学思维"),
    ("https://blog.miguelgrinberg.com/feed", "Miguel Grinberg", "Python开发"),
    ("https://tedunangst.com/flak/rss", "Ted Unangst", "技术生活"),
    ("https://overreacted.io/rss.xml", "Dan Abramov", "React哲学"),
    ("https://matklad.github.io/feed.xml", "Matklad", "软件工程"),
]

client = anthropic.Anthropic(api_key=API_KEY) if API_KEY else None

def fetch_rss(url: str) -> str:
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=10) as response:
        return response.read().decode('utf-8', errors='ignore')

def parse_rss(xml_content: str, max_items: int = 3) -> list:
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
        pass
    return items

def extract_insight(article: dict, source_name: str, category: str) -> dict:
    """AI内容二次加工：提炼核心观点、一句话总结、阅读价值"""
    if not client:
        return {
            'insight': '',
            'one_liner': article['title'][:50] + '...',
            'value': '深度阅读'
        }

    try:
        content = article.get('content', '')[:2000]
        prompt = f"""分析这篇文章，返回JSON：
{{
  "insight": "核心观点（30字内）",
  "one_liner": "一句话总结（25字内，抓人眼球）",
  "value": "阅读价值（10字内，如：提升认知/实战技巧/行业洞察）"
}}

标题：{article['title']}
来源：{source_name}
分类：{category}
内容：{content}"""

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
            return json.loads(match.group())
    except Exception as e:
        pass

    return {
        'insight': '',
        'one_liner': article['title'][:50] + '...',
        'value': '深度阅读'
    }

# ========== 产品级HTML模板 ==========

INDEX_HTML = '''<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日简报 · {date}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", sans-serif; }}

        /* 渐变背景 */
        .hero-gradient {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }}

        /* 卡片光泽效果 */
        .card-shine {{
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
        position: relative;
        overflow: hidden;
        }}
        .card-shine::before {{
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s;
        }}
        .card-shine:hover::before {{
            left: 100%;
        }}

        /* 焦点文章动画 */
        @keyframes fadeInUp {{
            from {{ opacity: 0; transform: translateY(20px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        .animate-fadeInUp {{
            animation: fadeInUp 0.6s ease-out forwards;
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen">
        <!-- Hero Section -->
        <header class="hero-gradient text-white">
            <div class="max-w-4xl mx-auto px-6 py-16">
                <div class="flex items-center justify-center gap-3 mb-4">
                    <i data-lucide="newspaper" class="w-10 h-10"></i>
                    <h1 class="text-4xl font-bold tracking-tight">每日简报</h1>
                </div>
                <p class="text-center text-white/80 text-lg">{date_zh}</p>
                <p class="text-center text-white/60 text-sm mt-2">精选 {total_sources} 个高质量来源 · {total_articles} 篇深度内容</p>
            </div>
        </header>

        <!-- Edition Cards -->
        <div class="max-w-4xl mx-auto px-6 -mt-8">
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Brief Edition -->
                <a href="brief.html" class="group">
                    <article class="card-shine bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                                <i data-lucide="zap" class="w-7 h-7 text-white"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-slate-900">快速浏览</h2>
                                <p class="text-slate-400 text-sm">Brief Edition</p>
                            </div>
                        </div>
                        <p class="text-slate-600 leading-relaxed mb-6">
                            精选每源精华文章，3分钟了解今日要闻。适合晨间快速阅读。
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-violet-600 text-sm font-semibold">{brief_count} 篇精选</span>
                            <div class="flex items-center text-violet-600 font-medium">
                                <span>开始阅读</span>
                                <i data-lucide="arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </article>
                </a>

                <!-- Full Edition -->
                <a href="full.html" class="group">
                    <article class="card-shine bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                                <i data-lucide="book-open" class="w-7 h-7 text-white"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-slate-900">深度阅读</h2>
                                <p class="text-slate-400 text-sm">Full Edition</p>
                            </div>
                        </div>
                        <p class="text-slate-600 leading-relaxed mb-6">
                            完整内容，AI提炼核心观点，每篇文章一句话总结。适合深度学习。
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-amber-600 text-sm font-semibold">{full_count} 篇完整</span>
                            <div class="flex items-center text-amber-600 font-medium">
                                <span>开始阅读</span>
                                <i data-lucide="arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </article>
                </a>
            </div>
        </div>

        <!-- Footer -->
        <footer class="max-w-4xl mx-auto px-6 py-12 text-center">
            <p class="text-slate-400 text-sm">由 Mino 自动生成 · Claude API 驱动</p>
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
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", sans-serif; }}

        /* 文章卡片渐变边框 */
        .article-card {{
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
            position: relative;
        }}
        .article-card::before {{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd);
            border-radius: 16px 16px 0 0;
            opacity: 0;
            transition: opacity 0.3s;
        }}
        .article-card:hover::before {{
            opacity: 1;
        }}

        /* 标签渐变 */
        .tag-gradient {{
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white border-b border-slate-100 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
            <div class="max-w-3xl mx-auto px-6 py-4">
                <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm transition-colors">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                    <span>返回首页</span>
                </a>
                <div class="flex items-center justify-between mt-4">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">深度阅读</h1>
                        <p class="text-slate-400 text-sm mt-1">{date_zh} · {total_count} 篇完整内容</p>
                    </div>
                    <div class="p-3 bg-amber-100 rounded-xl">
                        <i data-lucide="book-open" class="w-6 h-6 text-amber-600"></i>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-3xl mx-auto px-6 py-8">
            {articles}
        </main>

        <!-- Footer -->
        <footer class="border-t border-slate-100 mt-16">
            <div class="max-w-3xl mx-auto px-6 py-8 text-center">
                <p class="text-slate-400 text-sm">由 Mino 自动生成 · Claude API 驱动</p>
            </div>
        </footer>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>'''

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

    print("📰 生成每日简报 V3（产品级设计）...")
    print(f"精选 {len(FEATURED_SOURCES)} 个高质量RSS源\\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now()
    today_str = today.strftime('%Y-%m-%d')
    today_dir = OUTPUT_DIR / today_str
    today_dir.mkdir(exist_ok=True)

    # 中文日期
    weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    date_zh = f"{today.month}月{today.day}日 {weekdays[today.weekday()]}"

    all_articles = []

    for i, (url, source_name, category) in enumerate(FEATURED_SOURCES, 1):
        print(f"[{i}/{len(FEATURED_SOURCES)}] {source_name} ({category})")

        try:
            xml = fetch_rss(url)
            items = parse_rss(xml, max_items=3)

            for item in items:
                insight = extract_insight(item, source_name, category)

                all_articles.append({
                    'title': item['title'],
                    'link': item['link'],
                    'source': source_name,
                    'category': category,
                    'emoji': get_category_emoji(category),
                    'insight': insight['insight'],
                    'one_liner': insight['one_liner'],
                    'value': insight['value']
                })

        except Exception as e:
            print(f"  ❌ 错误: {e}")

    # 生成文章卡片HTML
    articles_html = ""
    for article in all_articles:
        articles_html += f'''
        <article class="article-card bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100
                          hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                    <span class="text-3xl">{article['emoji']}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="tag-gradient inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-violet-700">
                            {article['category']}
                        </span>
                        <span class="text-slate-400 text-xs">·</span>
                        <span class="text-slate-400 text-xs flex items-center gap-1">
                            <i data-lucide="user" class="w-3 h-3"></i>
                            {article['source']}
                        </span>
                    </div>

                    <a href="{article['link']}" target="_blank" class="block group">
                        <h2 class="text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2
                                   group-hover:text-violet-600 transition-colors">
                            {article['title']}
                        </h2>
                    </a>

                    {f'<p class="text-violet-600 text-sm font-medium mb-3">{article["insight"]}</p>' if article['insight'] else ''}

                    <p class="text-slate-600 text-sm leading-relaxed mb-4">
                        💬 {article['one_liner']}
                    </p>

                    <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span class="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                            {article['value']}
                        </span>
                        <a href="{article['link']}" target="_blank"
                           class="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-sm font-semibold
                                  hover:gap-2 transition-all">
                            <span>阅读全文</span>
                            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </article>'''

    # 生成文件
    index_path = today_dir / "index.html"
    index_html = INDEX_HTML.format(
        date=today_str,
        date_zh=date_zh,
        total_sources=len(FEATURED_SOURCES),
        total_articles=len(all_articles),
        brief_count=len(FEATURED_SOURCES),
        full_count=len(all_articles)
    )
    index_path.write_text(index_html, encoding='utf-8')

    # Brief HTML（简洁版，每源1篇）
    brief_articles = all_articles[::3][:len(FEATURED_SOURCES)]  # 每源取第1篇
    brief_html = f'''<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>快速浏览 · {today_str}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
        body {{ font-family: "Noto Sans SC", "Inter", sans-serif; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="max-w-2xl mx-auto px-6 py-8">
        <header class="mb-8">
            <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-4">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>返回首页</span>
            </a>
            <div class="flex items-center justify-between">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <i data-lucide="zap" class="w-6 h-6 text-violet-600"></i>
                        <h1 class="text-2xl font-bold">快速浏览</h1>
                    </div>
                    <p class="text-slate-400 text-sm">{date_zh} · {len(brief_articles)} 篇精选</p>
                </div>
            </div>
        </header>

        <main>
            {''.join([f'''
            <a href="{a['link']}" target="_blank" class="block bg-white rounded-xl p-5 mb-4
                       shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-200 group">
                <div class="flex items-start gap-3">
                    <span class="text-2xl flex-shrink-0">{a['emoji']}</span>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-slate-900 leading-snug mb-1 line-clamp-2
                                   group-hover:text-violet-600 transition-colors">
                            {a['title']}
                        </h3>
                        <div class="flex items-center gap-2 text-slate-400 text-xs">
                            <span>{a['category']}</span>
                            <span>·</span>
                            <span>{a['source']}</span>
                        </div>
                    </div>
                    <i data-lucide="external-link" class="w-4 h-4 text-slate-300 flex-shrink-0"></i>
                </div>
            </a>''' for a in brief_articles])}
        </main>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>'''

    (today_dir / "brief.html").write_text(brief_html, encoding='utf-8')

    # Full HTML
    full_html = FULL_HTML.format(
        date=today_str,
        date_zh=date_zh,
        total_count=len(all_articles),
        articles=articles_html
    )
    (today_dir / "full.html").write_text(full_html, encoding='utf-8')

    print(f"\\n✅ 简报生成完成！")
    print(f"📁 目录: {today_dir}")
    print(f"   - index.html  (导航页)")
    print(f"   - brief.html  (快速浏览)")
    print(f"   - full.html   (深度阅读)")
    print(f"\\n🌐 在浏览器中打开")
    print(f"   open {index_path}")

if __name__ == '__main__':
    main()
