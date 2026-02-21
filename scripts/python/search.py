#!/usr/bin/env python3
"""
简单搜索工具 - 用Python直接搜
"""
import sys
import json
import requests
from bs4 import BeautifulSoup

def search(query, num=10):
    """用百度搜索"""
    try:
        url = "https://www.baidu.com/s"
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        params = {"wd": query, "rn": num}

        resp = requests.get(url, params=params, headers=headers, timeout=10)
        resp.encoding = 'utf-8'

        soup = BeautifulSoup(resp.text, 'html.parser')
        results = []

        for item in soup.select('.result')[:num]:
            title_elem = item.select_one('h3 a')
            if title_elem:
                title = title_elem.get_text(strip=True)
                url = title_elem.get('href', '')
                # 简化摘要
                desc = item.select_one('.c-abstract') or item.select_one('.content-right_8Zs40')
                content = desc.get_text(strip=True) if desc else ""
                results.append({"title": title, "url": url, "content": content[:200]})

        return {"success": True, "query": query, "count": len(results), "results": results}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    q = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "test"
    print(json.dumps(search(q), ensure_ascii=False, indent=2))
