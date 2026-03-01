#!/usr/bin/env python3
"""
抓取 zara.faces.site/ai 的完整内容
使用 Playwright 处理动态渲染的页面
"""
from playwright.sync_api import sync_playwright
import json
from datetime import datetime

def scrape_ai_library():
    """抓取AI学习库的完整内容"""

    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("正在访问网站...")
        page.goto('https://zara.faces.site/ai', wait_until='networkidle')

        # 等待页面加载完成
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)  # 额外等待2秒确保动态内容加载

        # 获取页面内容
        content = page.content()

        # 尝试截图查看页面状态
        page.screenshot(path='/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs/screenshot.png', full_page=True)

        # 提取所有链接和文本
        links = page.locator('a').all()
        print(f"找到 {len(links)} 个链接")

        # 提取页面标题和主要结构
        title = page.title()

        # 尝试获取所有卡片/项目元素
        # 这个网站可能使用特定的class名称，我们尝试多种选择器
        possible_selectors = [
            'a[href*="http"]',
            '[class*="card"]',
            '[class*="item"]',
            '[class*="link"]',
        ]

        resources = []

        # 获取所有外部链接
        for link in links:
            try:
                href = link.get_attribute('href')
                text = link.inner_text()

                if href and href.startswith('http') and not 'faces.site' in href:
                    # 获取链接周围的描述文本
                    resources.append({
                        'url': href,
                        'text': text.strip(),
                        'title': text.strip() if text else 'Untitled'
                    })
            except Exception as e:
                continue

        # 去重
        seen = set()
        unique_resources = []
        for r in resources:
            if r['url'] not in seen:
                seen.add(r['url'])
                unique_resources.append(r)

        browser.close()

        return {
            'title': title,
            'resources': unique_resources,
            'total_count': len(unique_resources)
        }

def format_markdown(data):
    """将数据格式化为Markdown"""
    md = f"""# AI学习库完整内容扫描

扫描时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
网站：https://zara.faces.site/ai

## 页面信息

**标题**: {data['title']}

## 资源清单

共找到 **{data['total_count']}** 个资源链接：

---

"""

    # 按类别分组资源
    categories = {}

    for resource in data['resources']:
        url = resource['url']
        text = resource.get('text', '')
        title = resource.get('title', 'Untitled')

        # 尝试分类
        category = "其他资源"

        if 'blog.google' in url or 'google' in url.lower():
            category = "Google Blog - Innovation & AI"
        elif 'deepmind' in url.lower() or 'google.com' in url:
            category = "Google DeepMind"
        elif 'openai.com' in url or 'chatgpt' in url.lower():
            category = "OpenAI"
        elif 'anthropic.com' in url or 'claude' in url.lower():
            category = "Anthropic / Claude"
        elif 'x.com' in url or 'twitter.com' in url:
            category = "X (Twitter) - AI 研究者"
        elif 'youtube.com' in url:
            category = "YouTube 频道"
        elif 'newsletter' in url.lower() or 'beehiiv' in url or 'substack' in url:
            category = "Newsletter"
        elif 'podcast' in url.lower():
            category = "Podcast"
        elif 'producthunt' in url or 'github' in url:
            category = "产品与工具"

        if category not in categories:
            categories[category] = []

        categories[category].append({
            'title': title,
            'url': url,
            'description': text
        })

    # 输出分类内容
    for category, items in sorted(categories.items()):
        md += f"\n### {category}\n\n"

        for item in items:
            item_title = item['title'] if item['title'] else item['url']
            item_desc = item['description'] if item['description'] else ''

            if item_desc and len(item_desc) > 100:
                item_desc = item_desc[:100] + '...'

            md += f"- [{item_title}]({item_url})"
            if item_desc:
                md += f" - {item_desc}"
            md += "\n"

        md += "\n"

    # 添加统计信息
    md += f"""## 统计

- 总资源数：{data['total_count']}
- 分类数：{len(categories)}

---

*此文件由 Playwright 自动抓取生成*
"""

    return md

if __name__ == '__main__':
    # 确保输出目录存在
    import os
    output_dir = '/Users/sundanian/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz/outputs'
    os.makedirs(output_dir, exist_ok=True)

    # 抓取数据
    data = scrape_ai_library()

    # 格式化并保存
    markdown_content = format_markdown(data)

    output_file = f'{output_dir}/2026-02-28-full-scan.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_content)

    print(f"\n✅ 抓取完成！")
    print(f"📄 输出文件: {output_file}")
    print(f"📊 总资源数: {data['total_count']}")
