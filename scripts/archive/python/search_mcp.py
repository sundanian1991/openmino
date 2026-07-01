#!/usr/bin/env python3
"""
简单MCP搜索 - Stdio模式
"""
import sys
import json
import requests

def search(query, num=10):
    """用Bing搜索"""
    try:
        url = "https://www.bing.com/search"
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        params = {"q": query, "count": num}
        resp = requests.get(url, params=params, headers=headers, timeout=15)

        import re, urllib.parse
        results = []

        # 找到所有结果li
        divs = re.findall(r'<li class=\"b_algo\"[^>]*>(.*?)</li>', resp.text, re.S)

        for div in divs:
            link_match = re.search(r'href=\"([^\"]+)\"', div)
            title_match = re.search(r'<h2[^>]*><a[^>]*>([^<]+)</a></h2>', div)
            if link_match and title_match:
                url = link_match.group(1)
                title = title_match.group(1).strip()
                # 解码URL
                if 'url?q=' in url:
                    match = re.search(r'url\?q=([^&]+)', url)
                    if match:
                        url = urllib.parse.unquote(match.group(1))
                if title and 'http' in url:
                    results.append({"title": title[:200], "url": url[:500]})
                    if len(results) >= num:
                        break

        return {"success": True, "query": query, "count": len(results), "results": results}
    except Exception as e:
        return {"success": False, "error": str(e)}

# MCP协议处理
while True:
    try:
        line = sys.stdin.readline()
        if not line:
            break
        request = json.loads(line.strip())

        method = request.get('method', '')
        request_id = request.get('id')

        if method == 'initialize':
            response = {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "serverInfo": {"name": "baidu-search", "version": "1.0"},
                    "capabilities": {"tools": {}}
                }
            }
            print(json.dumps(response), flush=True)

        elif method == 'tools/list':
            response = {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {
                    "tools": [{
                        "name": "web_search",
                        "description": "用百度搜索网页内容",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "query": {"type": "string"},
                                "num": {"type": "number", "default": 10}
                            },
                            "required": ["query"]
                        }
                    }]
                }
            }
            print(json.dumps(response), flush=True)

        elif method == 'tools/call':
            params = request.get('params', {})
            name = params.get('name', '')
            args = params.get('arguments', {})

            if name == 'web_search':
                result = search(args.get('query', ''), args.get('num', 10))
                response = {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": {
                        "content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False)}]
                    }
                }
                print(json.dumps(response), flush=True)
    except Exception as e:
        break
