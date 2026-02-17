#!/usr/bin/env python3
"""
每日简报生成器 V4 - UI/UX Pro Max标准
- 基于ui-ux-pro-max skill的设计规范
- 专业级质感：精致阴影层次、视觉层级优化
- 完善的交互反馈：cursor-pointer、smooth transitions、hover states
- 高对比度排版：符合4.5:1对比度标准
- 中文界面 + Lucide Icons
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

ssl._create_default_https_context = ssl._create_unverified_context

OUTPUT_DIR = Path(__file__).parent.parent / "data" / "briefing"
API_KEY = os.environ.get("ANTHROPIC_API_KEY")

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
                items.append({'title': title.text if title is not None else '',
                              'link': link.get('href') if link is not None else '',
                              'content': content.text if content is not None else ''})
        else:
            for item in root.findall('.//item')[:max_items]:
                title = item.find('title')
                link = item.find('link')
                desc = item.find('description') or item.find('{http://purl.org/rss/1.0/modules/content/}encoded')
                items.append({'title': title.text if title is not None else '',
                              'link': link.text if link is not None else '',
                              'content': desc.text if desc is not None else ''})
    except:
        pass
    return items

def extract_insight(article: dict, source_name: str, category: str) -> dict:
    if not client:
        return {'insight': '', 'one_liner': article['title'][:50] + '...', 'value': '深度阅读'}
    try:
        content = article.get('content', '')[:2000]
        prompt = f"""分析这篇文章，返回JSON：
{{
  "insight": "核心观点（30字内）",
  "one_liner": "一句话总结（25字内，抓人眼球）",
  "value": "阅读价值（10字内）"
}}

标题：{article['title']}
来源：{source_name}
分类：{category}
内容：{content}"""
        message = client.messages.create(model="claude-3-5-haiku-20241022", max_tokens=300,
                                          temperature=0.3, messages=[{"role": "user", "content": prompt}])
        import re
        text = message.content[0].text
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except:
        pass
    return {'insight': '', 'one_liner': article['title'][:50] + '...', 'value': '深度阅读'}

# ========== V4: UI/UX Pro Max 标准 ==========

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

        /* Hero渐变 - 多层次深度 */
        .hero-gradient {{
            background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%);
            position: relative;
        }}
        .hero-gradient::before {{
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
            pointer-events: none;
        }}

        /* 卡片深层阴影系统 */
        .card-deep {{
            box-shadow:
                0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(0, 0, 0, 0.05);
        }}
        .card-deep:hover {{
            box-shadow:
                0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 20px 25px -5px rgba(124, 58, 237, 0.15),
                0 0 0 1px rgba(124, 58, 237, 0.1);
        }}

        /* 内阴影深度效果 */
        .inset-shadow {{
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }}

        /* 紫罗兰渐变边框 */
        .violet-border {{
            position: relative;
        }}
        .violet-border::before {{
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(135deg, #8b5cf6, #a78bfa, #c4b5fd);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }}

        /* 微妙的背景纹理 */
        .subtle-pattern {{
            background-image: radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.05) 1px, transparent 0);
            background-size: 20px 20px;
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen subtle-pattern">
        <!-- Hero -->
        <header class="hero-gradient text-white relative">
            <div class="max-w-5xl mx-auto px-6 py-20 relative z-10">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center gap-3 mb-6">
                        <i data-lucide="newspaper" class="w-12 h-12"></i>
                        <h1 class="text-5xl font-bold tracking-tight">每日简报</h1>
                    </div>
                    <p class="text-white/90 text-xl mb-2">{date_zh}</p>
                    <p class="text-white/70 text-sm">精选 {total_sources} 个高质量来源 · {total_articles} 篇深度内容</p>
                </div>
            </div>
            <!-- 底部装饰曲线 -->
            <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,64 C480,120 960,120 1440,64 L1440,120 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.05)"/>
            </svg>
        </header>

        <!-- Edition Cards -->
        <div class="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Brief Edition -->
                <a href="brief.html" class="group block">
                    <article class="card-deep violet-border bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-4 mb-5">
                            <div class="p-4 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-lg">
                                <i data-lucide="zap" class="w-8 h-8 text-white"></i>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900">快速浏览</h2>
                                <p class="text-slate-400 text-sm font-medium">Brief Edition</p>
                            </div>
                        </div>
                        <p class="text-slate-600 leading-relaxed mb-6 text-base">
                            精选每源精华文章，适合晨间快速阅读。3分钟了解今日要闻。
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-sm font-semibold border border-violet-200">
                                {brief_count} 篇精选
                            </span>
                            <div class="flex items-center text-violet-600 font-semibold">
                                <span>开始阅读</span>
                                <i data-lucide="arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </article>
                </a>

                <!-- Full Edition -->
                <a href="full.html" class="group block">
                    <article class="card-deep violet-border bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-4 mb-5">
                            <div class="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                                <i data-lucide="book-open" class="w-8 h-8 text-white"></i>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900">深度阅读</h2>
                                <p class="text-slate-400 text-sm font-medium">Full Edition</p>
                            </div>
                        </div>
                        <p class="text-slate-600 leading-relaxed mb-6 text-base">
                            完整内容，AI提炼核心观点，每篇文章一句话总结。适合深度学习。
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-200">
                                {full_count} 篇完整
                            </span>
                            <div class="flex items-center text-amber-600 font-semibold">
                                <span>开始阅读</span>
                                <i data-lucide="arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </article>
                </a>
            </div>
        </div>

        <!-- Footer -->
        <footer class="max-w-5xl mx-auto px-6 py-16 text-center">
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

        /* 文章卡片 - 多层次阴影 + 丰富质感 */
        .article-card {{
            background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%);
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow:
                0 2px 4px 0 rgba(0, 0, 0, 0.06),
                0 6px 12px -2px rgba(0, 0, 0, 0.1),
                0 16px 24px -4px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        .article-card:hover {{
            background: linear-gradient(145deg, #ffffff 0%, #fafafa 50%, #f1f5f9 100%);
            box-shadow:
                0 8px 12px -1px rgba(124, 58, 237, 0.15),
                0 24px 36px -4px rgba(124, 58, 237, 0.2),
                0 0 0 1px rgba(124, 58, 237, 0.15);
            transform: translateY(-3px) scale(1.005);
            border-color: rgba(139, 92, 246, 0.3);
        }}

        /* 顶部渐变条 - hover显示 + 更鲜艳 */
        .article-card::before {{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%);
            border-radius: 16px 16px 0 0;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }}
        .article-card:hover::before {{
            opacity: 1;
        }}

        /* 标签渐变 - 更丰富的色彩 */
        .tag-gradient {{
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
            border: 1px solid rgba(139, 92, 246, 0.25);
            box-shadow: 0 1px 2px rgba(139, 92, 246, 0.1);
        }}

        /* 内阴影增加深度 */
        .depth-shadow {{
            box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen">
        <!-- Sticky Header -->
        <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div class="max-w-6xl mx-auto px-6 py-4">
                <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-violet-600 text-sm font-medium transition-colors cursor-pointer">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                    <span>返回首页</span>
                </a>
                <div class="flex items-center justify-between mt-4">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">深度阅读</h1>
                        <p class="text-slate-500 text-sm mt-1">{date_zh} · {total_count} 篇完整内容</p>
                    </div>
                    <div class="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                        <i data-lucide="book-open" class="w-7 h-7 text-white"></i>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-6xl mx-auto px-6 py-8">
            {articles}
        </main>

        <!-- Footer -->
        <footer class="border-t border-slate-200 mt-16">
            <div class="max-w-6xl mx-auto px-6 py-8 text-center">
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

    print("📰 生成每日简报 V4（UI/UX Pro Max 标准）...")
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

    # 生成文章卡片HTML - 改进版
    articles_html = ""
    for article in all_articles:
        articles_html += f'''
        <article class="article-card relative rounded-2xl p-7 mb-8 cursor-pointer">
            <div class="flex items-start gap-5">
                <div class="flex-shrink-0">
                    <span class="text-5xl filter drop-shadow-md">{article['emoji']}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="tag-gradient inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-violet-900 border border-violet-300">
                            {article['category']}
                        </span>
                        <span class="text-slate-300 text-sm">·</span>
                        <span class="text-slate-600 text-sm flex items-center gap-1.5 font-medium">
                            <i data-lucide="user" class="w-3.5 h-3.5"></i>
                            {article['source']}
                        </span>
                    </div>

                    <a href="{article['link']}" target="_blank" class="block group">
                        <h2 class="text-2xl font-bold text-slate-900 leading-relaxed mb-4 line-clamp-2
                                   group-hover:text-violet-700 transition-colors duration-200">
                            {article['title']}
                        </h2>
                    </a>

                    {f'<p class="text-violet-800 font-semibold text-lg mb-4 leading-relaxed">{article["insight"]}</p>' if article['insight'] else ''}

                    <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 mb-5 depth-shadow border border-slate-200">
                        <p class="text-slate-800 text-base leading-relaxed font-medium">
                            💬 {article['one_liner']}
                        </p>
                    </div>

                    <div class="flex items-center justify-between pt-5 border-t border-slate-300">
                        <span class="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-sm font-semibold border border-slate-300">
                            {article['value']}
                        </span>
                        <a href="{article['link']}" target="_blank"
                           class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-700 to-purple-700 text-white text-base font-semibold rounded-xl
                                  hover:from-violet-800 hover:to-purple-800 transition-all duration-200
                                  shadow-lg hover:shadow-xl cursor-pointer">
                            <span>阅读全文</span>
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>'''

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

    # Brief HTML
    brief_articles = all_articles[::3][:len(FEATURED_SOURCES)]
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

        .card-item {{
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0,0,0,0.1);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        .card-item:hover {{
            box-shadow: 0 4px 6px -1px rgba(124,58,237,0.1), 0 20px 25px -5px rgba(124,58,237,0.15);
            transform: translateY(-1px);
        }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen">
        <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div class="max-w-2xl mx-auto px-6 py-4">
                <a href="index.html" class="inline-flex items-center gap-2 text-slate-400 hover:text-violet-600 text-sm font-medium transition-colors cursor-pointer">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                    <span>返回首页</span>
                </a>
                <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center gap-2">
                        <i data-lucide="zap" class="w-6 h-6 text-violet-600"></i>
                        <h1 class="text-2xl font-bold text-slate-900">快速浏览</h1>
                    </div>
                </div>
                <p class="text-slate-400 text-sm mt-1">{date_zh} · {len(brief_articles)} 篇精选</p>
            </div>
        </header>

        <main class="max-w-2xl mx-auto px-6 py-8">
            {''.join([f'''
            <a href="{a['link']}" target="_blank" class="card-item block bg-white rounded-2xl p-5 mb-4 cursor-pointer">
                <div class="flex items-start gap-3">
                    <span class="text-2xl flex-shrink-0 filter drop-shadow-sm">{a['emoji']}</span>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-slate-900 leading-snug mb-2 line-clamp-2 hover:text-violet-600 transition-colors">
                            {a['title']}
                        </h3>
                        <div class="flex items-center gap-2 text-slate-400 text-xs">
                            <span class="inline-flex items-center px-2 py-0.5 rounded bg-violet-50 text-violet-700 font-medium">
                                {a['category']}
                            </span>
                            <span>·</span>
                            <span>{a['source']}</span>
                        </div>
                    </div>
                    <i data-lucide="external-link" class="w-4 h-4 text-slate-300 flex-shrink-0 mt-1"></i>
                </div>
            </a>''' for a in brief_articles])}
        </main>

        <footer class="border-t border-slate-200 mt-16">
            <div class="max-w-2xl mx-auto px-6 py-8 text-center">
                <p class="text-slate-400 text-sm">由 Mino 自动生成</p>
            </div>
        </footer>
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

    print(f"\n✅ 简报生成完成！")
    print(f"📁 目录: {today_dir}")
    print(f"   - index.html  (渐变Hero + 双版本卡片)")
    print(f"   - brief.html  (快速浏览)")
    print(f"   - full.html   (深度阅读)")
    print(f"\n🌐 在浏览器中打开")
    print(f"   open {index_path}")

if __name__ == '__main__':
    main()
