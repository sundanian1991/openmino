#!/usr/bin/env python3
"""
Warm Editorial — 精确色值提取脚本
从Rachel Akinwale作品集截图中提取主要颜色
"""

from PIL import Image
import os
from collections import Counter
import json

def get_dominant_colors(image_path, num_colors=8, sample_region=None):
    """提取图片中的主要颜色"""
    img = Image.open(image_path)

    # 如果指定了采样区域，裁剪
    if sample_region:
        x1, y1, x2, y2 = sample_region
        img = img.crop((x1, y1, x2, y2))

    # 缩小图片提高性能
    img = img.resize((200, 200))
    img = img.convert('RGB')

    # 量化颜色（减少颜色数量以便聚类）
    img = img.quantize(colors=24, method=2)
    img = img.convert('RGB')

    # 统计颜色出现频率
    pixels = list(img.getdata())
    color_counts = Counter(pixels)

    # 返回最频繁的颜色
    return color_counts.most_common(num_colors)

def rgb_to_hex(r, g, b):
    """RGB转HEX"""
    return f"#{r:02x}{g:02x}{b:02x}"

def classify_color(r, g, b):
    """根据色值分类颜色角色"""
    # 计算明度
    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    # 计算色相
    max_val = max(r, g, b)
    min_val = min(r, g, b)
    diff = max_val - min_val

    if diff == 0:
        hue = 0
    elif max_val == r:
        hue = (60 * ((g - b) / diff) + 360) % 360
    elif max_val == g:
        hue = (60 * ((b - r) / diff) + 120) % 360
    else:
        hue = (60 * ((r - g) / diff) + 240) % 360

    # 计算饱和度
    if max_val == 0:
        saturation = 0
    else:
        saturation = (diff / max_val) * 100

    # 分类
    if luminance < 0.15:
        return "深灰/黑色"
    elif luminance > 0.9:
        return "白色/浅色"
    elif saturation < 10:
        if luminance < 0.4:
            return "深灰"
        elif luminance < 0.7:
            return "中灰"
        else:
            return "浅灰/米白"
    else:
        if 20 < hue < 50 and saturation > 30:
            return "橙色系"
        elif 50 < hue < 80 and saturation > 20:
            return "黄绿/卡其系"
        elif 80 < hue < 160 and saturation > 15:
            return "绿色系"
        elif 160 < hue < 200 and saturation > 15:
            return "青绿系"
        elif hue > 350 or hue < 20:
            return "红色系"
        else:
            return f"其他(hue={hue:.0f})"

def analyze_image(image_path, sample_regions=None):
    """分析单张图片的色值"""
    print(f"\n{'='*60}")
    print(f"图片: {os.path.basename(image_path)}")
    print(f"{'='*60}")

    results = []

    if sample_regions:
        # 分析指定区域
        for region_name, region_coords in sample_regions.items():
            colors = get_dominant_colors(image_path, num_colors=5, sample_region=region_coords)
            print(f"\n区域: {region_name}")
            for (r, g, b), count in colors:
                hex_val = rgb_to_hex(r, g, b)
                color_type = classify_color(r, g, b)
                print(f"  {hex_val} RGB({r},{g},{b}) - {color_type} (出现{count}次)")
                results.append({
                    "region": region_name,
                    "hex": hex_val,
                    "rgb": (r, g, b),
                    "type": color_type,
                    "count": count
                })
    else:
        # 分析整张图片
        colors = get_dominant_colors(image_path, num_colors=8)
        print(f"\n主要颜色:")
        for (r, g, b), count in colors:
            hex_val = rgb_to_hex(r, g, b)
            color_type = classify_color(r, g, b)
            print(f"  {hex_val} RGB({r},{g},{b}) - {color_type} (出现{count}次)")
            results.append({
                "region": "全图",
                "hex": hex_val,
                "rgb": (r, g, b),
                "type": color_type,
                "count": count
            })

    return results

def main():
    base_path = "/Users/sundanian/Documents/projects/ai-agents/my-agent/myagents_files"

    # 图片文件列表（手机截图）
    images = [
        "get_notes_prod_202607171013_getnotes_img_1a9663f000228fb0pCEbkUqu.jpeg",  # 联系页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4002f548VH8VC9hk.jpeg",  # 首页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4012f548WqfxZXCQ.jpeg",  # 技能页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4022f548jj05uFcP.jpeg",  # 教育页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4052f548vLt1GQa7.jpeg",  # 目录页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4062f548266SqMGS.jpeg",  # 工作经验页
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4072f548n1KD6qlN.jpeg",  # 技能页v2
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4082f5486VgZzL4O.jpeg",  # 项目01
        "get_notes_prod_202607171013_getnotes_img_1a9663ec4092f548MalfQ2WC.jpeg",  # 项目02
        "get_notes_prod_202607171013_getnotes_img_1a9663f000028fb0EuS09Og8.jpeg",  # 项目03
        "get_notes_prod_202607171013_getnotes_img_1a9663f000128fb04cfniIEf.jpeg",  # 评价页
        "get_notes_prod_202607171013_getnotes_img_1a9663f000228fb0pCEbkUqu_1.jpeg", # 联系页v2
    ]

    all_results = []

    # 分析前3张核心页面
    for img_name in images[:3]:
        img_path = os.path.join(base_path, img_name)
        if os.path.exists(img_path):
            results = analyze_image(img_path)
            all_results.extend(results)

    # 汇总分析
    print(f"\n\n{'='*60}")
    print("色值汇总分析")
    print(f"{'='*60}")

    # 按颜色类型分组
    color_groups = {}
    for r in all_results:
        color_type = r["type"]
        if color_type not in color_groups:
            color_groups[color_type] = []
        color_groups[color_type].append(r)

    for color_type, items in color_groups.items():
        print(f"\n{color_type}:")
        # 去重并按出现次数排序
        unique_colors = {}
        for item in items:
            hex_val = item["hex"]
            if hex_val not in unique_colors:
                unique_colors[hex_val] = item
            else:
                unique_colors[hex_val]["count"] += item["count"]

        sorted_colors = sorted(unique_colors.values(), key=lambda x: -x["count"])[:3]
        for item in sorted_colors:
            print(f"  {item['hex']} RGB{item['rgb']} (总出现{item['count']}次)")

if __name__ == "__main__":
    main()
