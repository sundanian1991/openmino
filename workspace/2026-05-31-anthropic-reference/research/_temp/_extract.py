#!/usr/bin/env python3
"""提取 Anthropic 研究文章内容 + 下载插图"""

import os, sys, json, time, re, hashlib
from pathlib import Path
from urllib.parse import urlparse, urljoin
import urllib.request
import trafilatura
from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).parent
URLS_FILE = BASE_DIR / "research-urls.txt"
CONTENT_DIR = BASE_DIR / "_content"
IMAGES_DIR = BASE_DIR / "_images"
META_FILE = BASE_DIR / "_meta.json"

CONTENT_DIR.mkdir(exist_ok=True)
IMAGES_DIR.mkdir(exist_ok=True)

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

def fetch_url(url, timeout=30):
    """Fetch HTML with retries"""
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception as e:
            if attempt == 2:
                raise
            time.sleep(2)

def extract_images(html, base_url, slug):
    """Extract and download article images"""
    soup = BeautifulSoup(html, "html.parser")
    images = []

    for img in soup.find_all("img"):
        src = img.get("src", "")
        alt = img.get("alt", "")

        # Skip icons, logos, next.js internal
        if not src or "/_next/" in src:
            continue
        if any(x in src for x in ["favicon", "logo", "icon.svg"]):
            continue

        # Make absolute URL
        img_url = urljoin(base_url, src)

        # Download image
        try:
            img_req = urllib.request.Request(img_url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                img_data = img_resp.read()

            # Determine extension
            content_type = img_resp.headers.get("Content-Type", "")
            ext_map = {"image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif",
                       "image/webp": ".webp", "image/svg+xml": ".svg"}
            ext = ext_map.get(content_type, ".img")

            # Generate unique filename
            name_hash = hashlib.md5(img_url.encode()).hexdigest()[:10]
            filename = f"{slug}_{name_hash}{ext}"
            filepath = IMAGES_DIR / filename

            with open(filepath, "wb") as f:
                f.write(img_data)

            images.append({
                "url": img_url,
                "alt": alt,
                "filename": filename,
                "path": str(filepath.relative_to(BASE_DIR.parent)),
            })
        except Exception as e:
            print(f"  [WARN] Failed to download image {img_url}: {e}")

    return images

def slug_from_url(url):
    """Extract a clean slug from URL"""
    path = urlparse(url).path.strip("/")
    parts = path.split("/")
    return parts[-1] if parts else "unknown"

def main():
    with open(URLS_FILE) as f:
        urls = [line.strip() for line in f if line.strip()]

    print(f"Total URLs: {len(urls)}")

    meta_all = []

    for i, url in enumerate(urls):
        slug = slug_from_url(url)
        print(f"\n[{i+1}/{len(urls)}] {slug}")

        # Fetch page
        try:
            html = fetch_url(url)
            if not html:
                print(f"  [SKIP] No HTML returned")
                continue
        except Exception as e:
            print(f"  [FAIL] Fetch error: {e}")
            meta_all.append({
                "url": url, "slug": slug, "status": "fetch_error", "error": str(e)
            })
            continue

        # Extract metadata + content via trafilatura
        try:
            text_content = trafilatura.extract(
                html, output_format="markdown", with_metadata=True, include_images=True,
                include_links=True, include_tables=True, include_formatting=True,
                favor_precision=True,
            )

            metadata = trafilatura.extract(html, output_format="json", with_metadata=True, favor_precision=True)
            if metadata:
                metadata = json.loads(metadata)
            else:
                metadata = {}
        except Exception as e:
            print(f"  [WARN] Extraction error: {e}")
            text_content = None
            metadata = {}

        # Extract and download images
        images = extract_images(html, url, slug)

        # Extract title from metadata or h1
        title = metadata.get("title", "")
        if not title:
            soup = BeautifulSoup(html, "html.parser")
            h1 = soup.find("h1")
            title = h1.get_text(strip=True) if h1 else slug

        date = metadata.get("date", "")
        author = metadata.get("author", "")

        # Save raw markdown
        raw_md_path = CONTENT_DIR / f"{slug}.md"
        if text_content:
            with open(raw_md_path, "w") as f:
                f.write(text_content)

        entry = {
            "url": url,
            "slug": slug,
            "title": title,
            "date": date,
            "author": author,
            "status": "ok",
            "has_content": bool(text_content),
            "content_length": len(text_content) if text_content else 0,
            "images": images,
            "raw_md": str(raw_md_path.relative_to(BASE_DIR)),
        }

        meta_all.append(entry)
        print(f"  ✓ {title[:60]} | images: {len(images)} | chars: {entry['content_length']}")

        # Be polite
        time.sleep(0.5)

    # Save meta
    with open(META_FILE, "w") as f:
        json.dump(meta_all, f, ensure_ascii=False, indent=2)

    # Summary
    ok = [m for m in meta_all if m["status"] == "ok"]
    fails = [m for m in meta_all if m["status"] != "ok"]
    total_images = sum(len(m["images"]) for m in ok)
    total_chars = sum(m["content_length"] for m in ok)

    print(f"\n{'='*50}")
    print(f"Done! {len(ok)}/{len(meta_all)} succeeded, {len(fails)} failed")
    print(f"Total images: {total_images}")
    print(f"Total content: {total_chars} chars")

if __name__ == "__main__":
    main()
