#!/usr/bin/env python3
"""
Excalidraw JSON 本地预览工具
将 .excalidraw JSON 文件转换为 PNG 图片

依赖安装：
  uv pip install pillow

用法：
  python render_excalidraw.py docs/供应商管理/图表/01-整体架构三层模型.excalidraw
  python render_excalidraw.py docs/供应商管理/图表/ --all  # 批量渲染全部
"""

import json
import sys
import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("请先安装依赖: uv pip install pillow")
    sys.exit(1)


# 颜色映射（Excalidraw stroke -> RGB）
STROKE_COLORS = {
    "#1e40af": (30, 64, 175),   # 深蓝 - 标题
    "#64748b": (100, 116, 139), # 灰 - 副标题
    "#0F6E56": (15, 110, 86),   # 绿 - A类
    "#1D9E75": (29, 158, 117),  # 浅绿 - B类
    "#378ADD": (55, 138, 221),  # 蓝 - C类
    "#D85A30": (216, 90, 48),   # 橙 - D类
    "#3B6D11": (59, 109, 17),   # 深绿 - AI提效
    "#A32D2D": (163, 45, 45),   # 红 - 警告
    "#1e3a5f": (30, 58, 95),    # 深蓝灰 - 边框
    "#ffffff": (255, 255, 255), # 白
    "#e2e8f0": (226, 232, 240), # 浅灰
    "#dbeafe": (219, 234, 254), # 淡蓝
    "#C0DD97": (192, 221, 151), # 浅绿
    "#EAF3DE": (234, 243, 222), # 极浅绿
    "#E6F1FB": (230, 241, 251), # 极浅蓝
    "#FAECE7": (250, 236, 231), # 极浅橙
    "#f8fafc": (248, 250, 252), # 极浅灰
}

FILL_COLORS = {
    "#dbeafe": (219, 234, 254),
    "#C0DD97": (192, 221, 151),
    "#EAF3DE": (234, 243, 222),
    "#E6F1FB": (230, 241, 251),
    "#FAECE7": (250, 236, 231),
    "#f8fafc": (248, 250, 252),
    "#0F6E56": (15, 110, 86),
    "#1D9E75": (29, 158, 117),
    "#378ADD": (55, 138, 221),
    "#D85A30": (216, 90, 48),
    "#ffffff": (255, 255, 255),
    "transparent": None,
}


def hex_to_rgb(hex_color):
    """转换 hex 颜色到 RGB 元组"""
    if not hex_color or hex_color == "transparent":
        return None
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join(c*2 for c in hex_color)
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def get_font(size=14, bold=False):
    """获取系统字体"""
    fonts = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Arial Unicode.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for font_path in fonts:
        if os.path.exists(font_path):
            try:
                from PIL import ImageFont
                return ImageFont.truetype(font_path, size, index=0 if not bold else 1)
            except Exception:
                continue
    return ImageFont.load_default()


def calc_bounds(elements):
    """计算所有元素的边界"""
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')

    for el in elements:
        x, y = el.get('x', 0), el.get('y', 0)
        w, h = el.get('width', 0), el.get('height', 0)

        if el['type'] == 'text':
            # 文本没有 width/height，估算
            text = el.get('text', '')
            font_size = el.get('fontSize', 14)
            w = len(text) * font_size * 0.6
            h = font_size * 1.2

        min_x = min(min_x, x)
        min_y = min(min_y, y)
        max_x = max(max_x, x + w)
        max_y = max(max_y, y + h)

    # 添加边距
    padding = 40
    return (
        min_x - padding,
        min_y - padding,
        max_x + padding,
        max_y + padding
    )


def render_excalidraw_to_png(excalidraw_path, output_path=None, scale=1.0):
    """将 Excalidraw JSON 渲染为 PNG"""
    with open(excalidraw_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    elements = data.get('elements', [])
    app_state = data.get('appState', {})
    bg_color = app_state.get('viewBackgroundColor', '#ffffff')

    # 计算边界
    bounds = calc_bounds(elements)
    min_x, min_y, max_x, max_y = bounds
    width = int((max_x - min_x) * scale)
    height = int((max_y - min_y) * scale)

    # 创建图像
    img = Image.new('RGBA', (max(1, width), max(1, height)), hex_to_rgb(bg_color) or (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 平移所有元素到正坐标
    offset_x = -min_x
    offset_y = -min_y

    # 渲染元素
    for el in elements:
        render_element(draw, el, offset_x, offset_y, scale)

    # 保存
    if output_path is None:
        output_path = str(Path(excalidraw_path).with_suffix('.png'))

    img.save(output_path, 'PNG')
    print(f"✓ 已生成: {output_path}")
    return output_path


def render_element(draw, el, offset_x, offset_y, scale):
    """渲染单个元素"""
    el_type = el.get('type')
    x = (el.get('x', 0) + offset_x) * scale
    y = (el.get('y', 0) + offset_y) * scale
    w = el.get('width', 0) * scale if el.get('width') else 0
    h = el.get('height', 0) * scale if el.get('height') else 0

    stroke = hex_to_rgb(el.get('stroke', '#000000'))
    fill = hex_to_rgb(el.get('fill', 'transparent'))

    if el_type == 'rectangle':
        if fill:
            draw.rectangle([x, y, x + w, y + h], fill=fill, outline=stroke, width=int(el.get('strokeWidth', 1) * scale))
        else:
            draw.rectangle([x, y, x + w, y + h], outline=stroke, width=int(el.get('strokeWidth', 1) * scale))

    elif el_type == 'ellipse':
        if fill:
            draw.ellipse([x, y, x + w, y + h], fill=fill, outline=stroke, width=int(el.get('strokeWidth', 1) * scale))
        else:
            draw.ellipse([x, y, x + w, y + h], outline=stroke, width=int(el.get('strokeWidth', 1) * scale))

    elif el_type == 'line':
        points = el.get('points', [])
        if len(points) >= 2:
            pts = [((p[0] + offset_x) * scale, (p[1] + offset_y) * scale) for p in points]
            draw.line(pts, fill=stroke, width=int(el.get('strokeWidth', 1) * scale))

    elif el_type == 'text':
        text = el.get('text', '')
        if text:
            font_size = int(el.get('fontSize', 14) * scale)
            font = get_font(font_size, bold=False)
            align = el.get('textAlign', 'center')
            vert_align = el.get('verticalAlign', 'middle')

            # 计算文本位置
            bbox = draw.textbbox((0, 0), text, font=font)
            tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

            if align == 'center':
                tx = x - tw / 2
            elif align == 'right':
                tx = x - tw
            else:
                tx = x

            if vert_align == 'middle':
                ty = y - th / 2
            elif vert_align == 'bottom':
                ty = y - th
            else:
                ty = y

            fill_rgb = hex_to_rgb(el.get('fill', '#000000'))
            draw.text((tx, ty), text, font=font, fill=fill_rgb)


def batch_render(folder_path):
    """批量渲染文件夹内所有 .excalidraw 文件"""
    folder = Path(folder_path)
    png_dir = folder / 'png'
    png_dir.mkdir(exist_ok=True)

    files = sorted(folder.glob('*.excalidraw'))
    print(f"找到 {len(files)} 个图表文件")

    for f in files:
        try:
            render_excalidraw_to_png(str(f), str(png_dir / f.with_suffix('.png').name))
        except Exception as e:
            print(f"✗ {f.name}: {e}")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    # 检查是否有 --all 或 -a 标志
    is_batch = '--all' in sys.argv or '-a' in sys.argv

    if is_batch:
        # 批量模式：使用当前目录或第一个非 flag 参数作为目录
        path = '.'
        for arg in sys.argv[1:]:
            if not arg.startswith('-') and os.path.isdir(arg):
                path = arg
                break
        batch_render(path)
    else:
        # 单文件模式
        path = sys.argv[1]
        if os.path.isdir(path):
            batch_render(path)
        else:
            render_excalidraw_to_png(path)
