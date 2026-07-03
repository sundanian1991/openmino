#!/usr/bin/env python3
"""Batch generate slide images by reading prompt files and calling AutoGLM API."""
import json
import hashlib
import time
import urllib.request
import sys
import os

APP_ID = "100003"
APP_KEY = "38d2391985e2369a5fb8227d8e6cd5e5"
URL = "https://autoglm-api.zhipuai.cn/agentdr/v1/assistant/skills/generate-image"
TOKEN_URL = "http://127.0.0.1:53699/get_token"

def get_token():
    try:
        with urllib.request.urlopen(TOKEN_URL) as resp:
            token = resp.read().decode("utf-8").strip()
    except Exception as e:
        print(f"ERROR: cannot get token: {e}")
        sys.exit(1)
    if not token:
        print("ERROR: empty token")
        sys.exit(1)
    if not token.lower().startswith("bearer "):
        token = f"Bearer {token}"
    return token

def extract_prompt(prompt_path):
    """Extract the visual description section from a prompt file."""
    with open(prompt_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract Visual Description section
    lines = content.split("\n")
    visual_lines = []
    in_visual = False
    for line in lines:
        if "**Visual Description**:" in line:
            in_visual = True
            continue
        if in_visual:
            if line.startswith("**") or line.startswith("##") or line.startswith("// Layout"):
                break
            visual_lines.append(line)
    
    # Also get headline
    headline = ""
    for line in lines:
        if "**Headline**:" in line:
            headline = line.split("**Headline**:", 1)[1].strip()
            break
    
    # Get style info
    style_section = ""
    in_style = False
    for line in lines:
        if "## STYLE_INSTRUCTIONS" in line:
            in_style = True
            continue
        if in_style:
            if "## SLIDE_CONTENT" in line:
                break
            style_section += line + "\n"
    
    visual_text = "\n".join(vl.strip() for vl in visual_lines if vl.strip())
    
    # Build concise prompt
    prompt = f"Presentation slide design.\n"
    prompt += f"Title: {headline}\n\n"
    if style_section:
        style_short = "\n".join(
            line for line in style_section.split("\n")
            if any(kw in line for kw in ["Design Aesthetic", "Background", "Typography", "Color Palette", "Style Rules"])
        )
        prompt += f"Style: {style_short[:500]}\n\n"
    prompt += f"Visual: {visual_text[:800]}"
    
    return prompt

def generate_one(text, slide_num, out_dir):
    token = get_token()
    timestamp = str(int(time.time()))
    sign_data = f"{APP_ID}&{timestamp}&{APP_KEY}"
    sign = hashlib.md5(sign_data.encode("utf-8")).hexdigest()

    payload = json.dumps({"text": text}).encode("utf-8")
    headers = {
        "Authorization": token,
        "Content-Type": "application/json",
        "X-Auth-Appid": APP_ID,
        "X-Auth-TimeStamp": timestamp,
        "X-Auth-Sign": sign,
    }

    req = urllib.request.Request(URL, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Slide {slide_num}: API error: {e}")
        return None

    image_url = result.get("data", {}).get("image_url", "")
    if image_url:
        # Download the image
        img_path = os.path.join(out_dir, f"{slide_num:02d}-slide.png")
        try:
            urllib.request.urlretrieve(image_url, img_path)
            print(f"Slide {slide_num}: saved to {img_path}")
            return img_path
        except Exception as e:
            print(f"Slide {slide_num}: download error: {e}")
            return image_url  # return url as fallback
    else:
        print(f"Slide {slide_num}: no image_url in response: {json.dumps(result, ensure_ascii=False)}")
        return None

if __name__ == "__main__":
    prompts_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "."
    os.makedirs(out_dir, exist_ok=True)

    prompt_files = sorted([f for f in os.listdir(prompts_dir) if f.endswith(".md")])
    
    for pf in prompt_files:
        slide_num = int(pf.split("-")[0])
        prompt_path = os.path.join(prompts_dir, pf)
        print(f"\n--- Generating slide {slide_num}: {pf} ---")
        text = extract_prompt(prompt_path)
        result = generate_one(text, slide_num, out_dir)
        if result:
            print(f"  Result: {result}")
        else:
            print(f"  Failed!")
