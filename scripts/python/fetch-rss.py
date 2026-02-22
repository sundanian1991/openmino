#!/usr/bin/env python3
"""
RSS抓取脚本
作者：Mino
日期：2026-02-17
"""

import sys
import json
import xml.etree.ElementTree as ET
from urllib.request import urlopen, Request
from urllib.error import URLError
from datetime import datetime
from pathlib import Path
import ssl

# 禁用SSL验证（仅用于脚本抓取）
ssl._create_default_https_context = ssl._create_unverified_context

# 配置
OPML_FILE = Path(__file__).parent.parent / "sources" / "karpathy-rss.opml"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "rss"
MAX_ITEMS = 3  # 每个源取最新3篇
MAX_SOURCES = int(sys.argv[1]) if len(sys.argv) > 1 else 5
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"

def fetch_rss(url: str, timeout: int = 10) -> str:
    """抓取RSS feed"""
    req = Request(url, headers={'User-Agent': USER_AGENT})
    with urlopen(req, timeout=timeout) as response:
        return response.read().decode('utf-8', errors='ignore')

def parse_rss(xml_content: str) -> list:
    """解析RSS/Atom feed，返回文章列表"""
    items = []

    try:
        root = ET.fromstring(xml_content)

        # 处理命名空间
        namespaces = {
            'atom': 'http://www.w3.org/2005/Atom',
            'rss': 'http://purl.org/rss/1.0/',
        }

        # 查找item/entry
        if root.tag == '{http://www.w3.org/2005/Atom}feed':
            # Atom格式
            for entry in root.findall('atom:entry', namespaces):
                if len(items) >= MAX_ITEMS:
                    break
                title = entry.find('atom:title', namespaces)
                link = entry.find('atom:link', namespaces)
                items.append({
                    'title': title.text if title is not None else '',
                    'link': link.get('href') if link is not None else ''
                })
        else:
            # RSS格式
            for item in root.findall('.//item'):
                if len(items) >= MAX_ITEMS:
                    break
                title = item.find('title')
                link = item.find('link')
                items.append({
                    'title': title.text if title is not None else '',
                    'link': link.text if link is not None else ''
                })

    except ET.ParseError as e:
        print(f"  ⚠️ XML解析错误: {e}")
    except Exception as e:
        print(f"  ⚠️ 解析错误: {e}")

    return items

def extract_opml_urls(opml_path: Path) -> list:
    """从OPML文件提取RSS源URL"""
    tree = ET.parse(opml_path)
    root = tree.getroot()

    urls = []
    for outline in root.findall('.//outline'):
        url = outline.get('xmlUrl')
        if url:
            urls.append(url)

    return urls

def main():
    print(f"📡 开始抓取RSS...")
    print(f"限制：前 {MAX_SOURCES} 个源，每个源最新 {MAX_ITEMS} 篇文章\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 提取RSS源
    rss_urls = extract_opml_urls(OPML_FILE)
    print(f"📊 OPML中共有 {len(rss_urls)} 个RSS源")
    print(f"🔄 本次抓取前 {MAX_SOURCES} 个\n")

    # 准备输出
    today = datetime.now().strftime('%Y-%m-%d')
    output_file = OUTPUT_DIR / f"{today}.json"

    result = {
        'date': today,
        'sources': []
    }

    # 抓取每个源
    for i, url in enumerate(rss_urls[:MAX_SOURCES], 1):
        print(f"[{i}/{MAX_SOURCES}] 抓取: {url}")

        try:
            xml_content = fetch_rss(url)
            items = parse_rss(xml_content)

            if items:
                result['sources'].append({
                    'url': url,
                    'items': items
                })
                print(f"  ✅ 获取到 {len(items)} 篇文章")
            else:
                print(f"  ⚠️ 未找到文章")

        except URLError as e:
            print(f"  ❌ 网络错误: {e}")
        except Exception as e:
            print(f"  ❌ 错误: {e}")

        # 避免限流
        import time
        time.sleep(1)

    # 保存结果
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 抓取完成：{output_file}")
    print(f"📊 共获取 {sum(len(s['items']) for s in result['sources'])} 篇文章")

if __name__ == '__main__':
    main()
