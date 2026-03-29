#!/usr/bin/env python3
"""使用 Google Translate 免费API翻译 - 完整版"""

import re
import time
import urllib.request
import json
from pathlib import Path

def translate_google(text, max_retries=3):
    """使用Google Translate免费API"""
    url = "https://translate.googleapis.com/translate_a/single"
    params = {
        'client': 'gtx',
        'sl': 'en',
        'tl': 'zh-CN',
        'dt': 't',
        'q': text
    }

    full_url = url + '?' + '&'.join([f"{k}={urllib.request.quote(str(v))}" for k, v in params.items()])

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as response:
                result = json.loads(response.read().decode())
                if result and len(result) > 0 and result[0]:
                    translated = ''.join([item[0] for item in result[0] if item and len(item) > 0 and item[0]])
                    return translated
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2)
            else:
                return text
    return text

def split_into_chunks(text, max_chars=2000):
    """分割文本 - 每块最多2000字符"""
    paragraphs = text.split('\n\n')
    chunks = []
    current_chunk = ""

    for para in paragraphs:
        if len(current_chunk) + len(para) + 2 <= max_chars:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = para + "\n\n"

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

def main():
    input_file = Path("adolescence-of-technology.md")
    output_file = Path("adolescence-of-technology-cn.md")

    print(f"读取文件: {input_file}")
    content = input_file.read_text()

    # 分页
    pages = re.split(r'(## Page \d+)', content)
    structured_pages = []
    for i in range(1, len(pages), 2):
        if i < len(pages):
            page_header = pages[i]
            page_content = pages[i + 1] if i + 1 < len(pages) else ""
            structured_pages.append((page_header, page_content))

    print(f"总页数: {len(structured_pages)}")

    translated_content = ""

    for i, (header, content) in enumerate(structured_pages):
        print(f"[{i + 1}/{len(structured_pages)}] ", end="", flush=True)

        translated_content += f"## 第 {i + 1} 页\n\n"

        if not content.strip():
            print("跳过")
            continue

        chunks = split_into_chunks(content)
        for chunk in chunks:
            translated_chunk = translate_google(chunk)
            translated_content += translated_chunk + "\n\n"
            time.sleep(0.5)  # 避免API限制

        print("✓")

        # 每10页保存
        if (i + 1) % 10 == 0:
            temp_file = Path(f"adolescence-cn-temp-{i + 1}.md")
            temp_file.write_text(translated_content, encoding='utf-8')
            print(f"  已保存: {temp_file}")

    output_file.write_text(translated_content, encoding='utf-8')
    print(f"\n✅ 完成! 输出: {output_file} ({output_file.stat().st_size / 1024:.1f} KB)")

if __name__ == "__main__":
    main()
