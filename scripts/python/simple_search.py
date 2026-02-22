#!/usr/bin/env python3
"""
简单搜索工具 - 通过API调用搜索
"""

import sys
import json
import requests

def search(query, max_results=10):
    """执行搜索"""
    # 尝试多个免费搜索API
    apis = [
        # DuckDuckGo Lite
        {
            "url": "https://lite.duckduckgo.com/lite/",
            "params": {"q": query, "kl": "cn-zh"},
            "parser": "ddg"
        },
        # Bing API (可能需要key)
        {
            "url": "https://api.bing.microsoft.com/v7.0/search",
            "params": {"q": query, "count": max_results},
            "parser": "bing"
        }
    ]

    errors = []
    for api in apis:
        try:
            response = requests.get(
                api["url"],
                params=api["params"],
                timeout=10,
                headers={"User-Agent": "Mozilla/5.0"}
            )
            if response.status_code == 200:
                return parse_results(response.text, api["parser"], query)
        except Exception as e:
            errors.append(str(e))
            continue

    return {"error": "所有搜索API都失败", "details": errors}

def parse_results(html, parser, query):
    """解析搜索结果"""
    results = []

    if parser == "ddg":
        # 简单解析DDG结果
        import re
        # 查找结果
        result_pattern = re.compile(r'<a rel="nofollow" class="result__a" href="([^"]+)"[^>]*>(.+?)</a>')
        matches = result_pattern.findall(html)

        for url, title in matches[:10]:
            # 清理HTML标签
            title = re.sub(r'<[^>]+>', '', title)
            results.append({"title": title.strip(), "url": url})

    return {"results": results, "query": query}

if __name__ == "__main__":
    query = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "test"
    result = search(query)
    print(json.dumps(result, ensure_ascii=False, indent=2))
