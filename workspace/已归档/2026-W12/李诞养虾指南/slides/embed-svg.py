#!/usr/bin/env python3
"""
PPTX SVG 嵌入器 - 将真正的 SVG 文件嵌入到 PPTX
"""

import zipfile
import os
import re
import shutil
from pathlib import Path

# ============================================
# SVG 图标定义（陶土色手绘风格）
# ============================================
SVG_ICONS = {
    'icon-soul': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" fill="#FEFFFA" stroke="none"/>
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <circle cx="36" cy="42" r="3.5" fill="#E2725B"/>
</svg>''',

    'icon-skills': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="10" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="10" y="42" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="42" width="20" height="20" rx="2" fill="#E2725B"/>
    <rect x="10" y="10" width="20" height="20" rx="2" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <rect x="42" y="10" width="20" height="20" rx="2" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <rect x="10" y="42" width="20" height="20" rx="2" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <rect x="42" y="42" width="20" height="20" rx="2" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <circle cx="52" cy="52" r="3" fill="#FEFFFA"/>
</svg>''',

    'icon-memory': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" fill="#FEFFFA"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" fill="#FEFFFA"/>
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" stroke="#3D2C29" stroke-width="1.3" fill="none"/>
    <line x1="36" y1="18" x2="36" y2="62" stroke="#3D2C29" stroke-width="1.3"/>
    <path d="m46 16l3-4l3 4v8h-6z" fill="#E2725B"/>
    <g stroke="#3D2C29" stroke-width="1.04" fill="none">
        <line x1="18" y1="28" x2="30" y2="30"/>
        <line x1="18" y1="36" x2="28" y2="38"/>
        <line x1="42" y1="30" x2="54" y2="28"/>
        <line x1="42" y1="38" x2="52" y2="36"/>
    </g>
</svg>''',

    'icon-balance': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="26" y="56" width="20" height="6" rx="1.5" fill="#FEFFFA"/>
    <rect x="26" y="56" width="20" height="6" rx="1.5" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
    <line x1="36" y1="14" x2="36" y2="56" stroke="#3D2C29" stroke-width="1.8"/>
    <line x1="8" y1="22" x2="64" y2="22" stroke="#3D2C29" stroke-width="1.8"/>
    <ellipse cx="14" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#3D2C29" stroke-width="1.5"/>
    <ellipse cx="58" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#3D2C29" stroke-width="1.5"/>
    <line x1="14" y1="22" x2="14" y2="27" stroke="#3D2C29" stroke-width="1.2"/>
    <line x1="58" y1="22" x2="58" y2="27" stroke="#3D2C29" stroke-width="1.2"/>
</svg>''',

    'icon-brain': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" fill="#FEFFFA"/>
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" stroke="#E2725B" stroke-width="1.8" fill="none"/>
    <path d="M36 14 Q40 34 36 52" fill="none" stroke="#E2725B" stroke-width="1.5"/>
    <path d="M20 24 Q26 30 22 40" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M26 20 Q30 26 26 36" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M52 24 Q46 30 50 40" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M46 20 Q42 26 46 36" fill="none" stroke="#E2725B" stroke-width="1.2"/>
</svg>''',

    'icon-shrimp': '''<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 20 Q80 30 75 50 Q70 70 55 80 Q40 90 30 85 Q20 80 25 65 Q30 50 45 40 Q55 32 60 20" fill="#FEFFFA"/>
    <path d="M60 20 Q80 30 75 50 Q70 70 55 80 Q40 90 30 85 Q20 80 25 65 Q30 50 45 40 Q55 32 60 20" stroke="#E2725B" stroke-width="2" fill="none"/>
    <circle cx="58" cy="35" r="4" fill="#3D2C29"/>
    <path d="M45 50 Q55 55 50 65" stroke="#E2725B" stroke-width="1.5" fill="none"/>
    <path d="M35 60 Q45 65 42 75" stroke="#E2725B" stroke-width="1.5" fill="none"/>
    <path d="M70 45 Q85 40 90 50" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
    <path d="M75 55 Q90 52 95 60" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
</svg>''',

    'icon-steps': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="36" r="10" fill="#E2725B"/>
    <circle cx="16" cy="36" r="10" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
    <text x="13" y="40" font-size="12" fill="#FEFFFA" font-weight="bold">1</text>
    <line x1="26" y1="36" x2="32" y2="36" stroke="#3D2C29" stroke-width="2"/>
    <circle cx="42" cy="36" r="10" fill="#FEFFFA"/>
    <circle cx="42" cy="36" r="10" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
    <text x="39" y="40" font-size="12" fill="#3D2C29" font-weight="bold">2</text>
    <line x1="52" y1="36" x2="58" y2="36" stroke="#3D2C29" stroke-width="2"/>
    <circle cx="66" cy="36" r="6" fill="#E2725B"/>
</svg>''',

    'icon-rocket': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M36 8 Q50 20 48 40 Q46 55 36 62 Q26 55 24 40 Q22 20 36 8" fill="#FEFFFA"/>
    <path d="M36 8 Q50 20 48 40 Q46 55 36 62 Q26 55 24 40 Q22 20 36 8" stroke="#3D2C29" stroke-width="1.8" fill="none"/>
    <circle cx="36" cy="32" r="6" fill="#E2725B"/>
    <path d="M28 50 L20 58 L24 60 L28 52" fill="#E2725B"/>
    <path d="M44 50 L52 58 L48 60 L44 52" fill="#E2725B"/>
    <path d="M30 62 Q36 70 42 62" stroke="#3D2C29" stroke-width="1.5" fill="none"/>
</svg>''',

    'icon-deploy': '''<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="36" cy="36" r="12" fill="#FEFFFA" stroke="#3D2C29" stroke-width="1.8"/>
    <path d="M36 8 L36 16" stroke="#3D2C29" stroke-width="2"/>
    <path d="M36 56 L36 64" stroke="#3D2C29" stroke-width="2"/>
    <path d="M8 36 L16 36" stroke="#3D2C29" stroke-width="2"/>
    <path d="M56 36 L64 36" stroke="#3D2C29" stroke-width="2"/>
    <path d="M16 16 L22 22" stroke="#3D2C29" stroke-width="2"/>
    <path d="M50 50 L56 56" stroke="#3D2C29" stroke-width="2"/>
    <path d="M16 56 L22 50" stroke="#3D2C29" stroke-width="2"/>
    <path d="M50 22 L56 16" stroke="#3D2C29" stroke-width="2"/>
    <circle cx="36" cy="36" r="5" fill="#E2725B"/>
</svg>'''
}

# ============================================
# 幻灯片内容定义
# ============================================
SLIDES = [
    {
        'type': 'cover',
        'elements': [
            # 装饰圆
            {'type': 'oval', 'x': -1, 'y': -1, 'w': 3, 'h': 3, 'fill': 'E8E4E1'},
            {'type': 'oval', 'x': 8, 'y': 4, 'w': 3, 'h': 3, 'fill': 'E8E4E1'},
            # 虾图标
            {'type': 'svg', 'name': 'icon-shrimp', 'x': 7.5, 'y': 0.8, 'w': 1.8, 'h': 1.8},
            # 标题
            {'type': 'text', 'x': 0.5, 'y': 2, 'w': 9, 'h': 0.6, 'text': '李诞的', 'font': 'Microsoft YaHei', 'size': 32, 'color': '8A8683', 'align': 'center'},
            {'type': 'text', 'x': 0.5, 'y': 2.6, 'w': 9, 'h': 1.2, 'text': 'AI养虾哲学', 'font': 'Microsoft YaHei', 'size': 56, 'color': '3D2C29', 'bold': True, 'align': 'center'},
        ]
    },
    {
        'type': 'content',
        'elements': [
            {'type': 'text', 'x': 0.5, 'y': 0.3, 'w': 9, 'h': 0.6, 'text': '01  养虾三要素', 'font': 'Microsoft YaHei', 'size': 28, 'color': '3D2C29', 'bold': True},
            {'type': 'text', 'x': 0.5, 'y': 0.85, 'w': 9, 'h': 0.4, 'text': '将AI养成"个人风格智能体"的核心方法论', 'font': 'Microsoft YaHei', 'size': 14, 'color': '8A8683'},
            # 三张卡片
            {'type': 'card', 'x': 0.5, 'y': 1.5, 'w': 2.9, 'h': 3.4, 'icon': 'icon-soul', 'title': '人设', 'subtitle': 'Soul', 'desc': '定义AI的价值观、语气、身份'},
            {'type': 'card', 'x': 3.6, 'y': 1.5, 'w': 2.9, 'h': 3.4, 'icon': 'icon-skills', 'title': '技能', 'subtitle': 'Skills', 'desc': '模块化技能包，独立迭代'},
            {'type': 'card', 'x': 6.7, 'y': 1.5, 'w': 2.9, 'h': 3.4, 'icon': 'icon-memory', 'title': '记忆', 'subtitle': 'Memory', 'desc': '文档、记录喂给AI形成长期记忆'},
        ]
    }
]

def create_svg_slide_xml(slide_idx, slide_data, svg_refs):
    """创建包含 SVG 引用的幻灯片 XML"""

    shapes_xml = []
    shape_id = 2  # 从2开始（1是背景）

    for elem in slide_data['elements']:
        if elem['type'] == 'text':
            # 文本框
            x_emu = int(elem['x'] * 914400)
            y_emu = int(elem['y'] * 914400)
            w_emu = int(elem['w'] * 914400)
            h_emu = int(elem['h'] * 914400)

            color = elem.get('color', '3D2C29')
            size = elem.get('size', 14)
            bold = 'b="1"' if elem.get('bold') else ''

            shapes_xml.append(f'''
    <p:sp>
      <p:nvSpPr>
        <p:cNvPr id="{shape_id}" name="TextBox {shape_id}"/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm>
          <a:off x="{x_emu}" y="{y_emu}"/>
          <a:ext cx="{w_emu}" cy="{h_emu}"/>
        </a:xfrm>
        <a:prstGeom prst="rect">
          <a:avLst/>
        </a:prstGeom>
        <a:noFill/>
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square" anchor="ctr">
          <a:spAutoFit/>
        </a:bodyPr>
        <a:lstStyle/>
        <a:p>
          <a:pPr aln="{elem.get('align', 'l')}"/>
          <a:r>
            <a:rPr lang="zh-CN" sz="{size * 100}" {bold}>
              <a:solidFill>
                <a:srgbClr val="{color}"/>
              </a:solidFill>
            </a:rPr>
            <a:t>{elem['text']}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>''')
            shape_id += 1

        elif elem['type'] == 'oval':
            # 圆形
            x_emu = int(elem['x'] * 914400)
            y_emu = int(elem['y'] * 914400)
            w_emu = int(elem['w'] * 914400)
            h_emu = int(elem['h'] * 914400)
            fill = elem.get('fill', 'E8E4E1')

            shapes_xml.append(f'''
    <p:sp>
      <p:nvSpPr>
        <p:cNvPr id="{shape_id}" name="Oval {shape_id}"/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm>
          <a:off x="{x_emu}" y="{y_emu}"/>
          <a:ext cx="{w_emu}" cy="{h_emu}"/>
        </a:xfrm>
        <a:prstGeom prst="ellipse">
          <a:avLst/>
        </a:prstGeom>
        <a:solidFill>
          <a:srgbClr val="{fill}"/>
        </a:solidFill>
        <a:ln>
          <a:noFill/>
        </a:ln>
      </p:spPr>
    </p:sp>''')
            shape_id += 1

        elif elem['type'] == 'svg':
            # SVG 图片引用
            svg_name = elem['name']
            svg_idx = svg_refs.get(svg_name)
            if svg_idx:
                x_emu = int(elem['x'] * 914400)
                y_emu = int(elem['y'] * 914400)
                w_emu = int(elem['w'] * 914400)
                h_emu = int(elem['h'] * 914400)

                shapes_xml.append(f'''
    <p:pic>
      <p:nvPicPr>
        <p:cNvPr id="{shape_id}" name="SVG {svg_name}"/>
        <p:cNvPicPr a:preferRelativeResize="1"/>
        <p:nvPr/>
      </p:nvPicPr>
      <p:blipFill>
        <a:blip r:embed="rId{svg_idx}"/>
        <a:stretch>
          <a:fillRect/>
        </a:stretch>
      </p:blipFill>
      <p:spPr>
        <a:xfrm>
          <a:off x="{x_emu}" y="{y_emu}"/>
          <a:ext cx="{w_emu}" cy="{h_emu}"/>
        </a:xfrm>
        <a:prstGeom prst="rect">
          <a:avLst/>
        </a:prstGeom>
      </p:spPr>
    </p:pic>''')
                shape_id += 1

    return '\n'.join(shapes_xml)


def embed_svgs_to_pptx(input_pptx, output_pptx, svg_files):
    """
    将 SVG 文件嵌入到 PPTX 中
    """
    import tempfile

    with tempfile.TemporaryDirectory() as tmpdir:
        # 解压原 PPTX
        extract_dir = os.path.join(tmpdir, 'extracted')
        with zipfile.ZipFile(input_pptx, 'r') as zf:
            zf.extractall(extract_dir)

        # 添加 SVG 文件到 media 目录
        media_dir = os.path.join(extract_dir, 'ppt', 'media')
        os.makedirs(media_dir, exist_ok=True)

        svg_rids = {}
        next_rid = 100  # 从100开始避免冲突

        for svg_name, svg_content in svg_files.items():
            svg_path = os.path.join(media_dir, f'{svg_name}.svg')
            with open(svg_path, 'w', encoding='utf-8') as f:
                f.write(svg_content)
            svg_rids[svg_name] = next_rid
            next_rid += 1

        # 更新 [Content_Types].xml
        content_types_path = os.path.join(extract_dir, '[Content_Types].xml')
        with open(content_types_path, 'r', encoding='utf-8') as f:
            content_types = f.read()

        # 添加 SVG 类型
        if 'image/svg+xml' not in content_types:
            content_types = content_types.replace(
                '</Types>',
                '  <Default Extension="svg" ContentType="image/svg+xml"/>\n</Types>'
            )
            with open(content_types_path, 'w', encoding='utf-8') as f:
                f.write(content_types)

        # 更新幻灯片关系文件
        slides_dir = os.path.join(extract_dir, 'ppt', 'slides', '_rels')
        if os.path.exists(slides_dir):
            for rels_file in os.listdir(slides_dir):
                if rels_file.endswith('.rels'):
                    rels_path = os.path.join(slides_dir, rels_file)
                    with open(rels_path, 'r', encoding='utf-8') as f:
                        rels_content = f.read()

                    # 添加 SVG 关系
                    for svg_name, rid in svg_rids.items():
                        rel_entry = f'<Relationship Id="rId{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/{svg_name}.svg"/>'
                        if f'rId{rid}' not in rels_content:
                            rels_content = rels_content.replace('</Relationships>', f'  {rel_entry}\n</Relationships>')

                    with open(rels_path, 'w', encoding='utf-8') as f:
                        f.write(rels_content)

        # 重新打包 PPTX
        with zipfile.ZipFile(output_pptx, 'w', zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(extract_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arc_name = os.path.relpath(file_path, extract_dir)
                    zf.write(file_path, arc_name)

    return True


def main():
    slides_dir = Path(__file__).parent
    output_dir = slides_dir / 'output'
    output_dir.mkdir(exist_ok=True)

    # 先生成基础 PPTX（用 PptxGenJS）
    print("📄 编译基础 PPTX...")
    os.system(f'cd {slides_dir} && node compile.js')

    input_pptx = slides_dir / 'output' / '李诞养虾指南.pptx'
    output_pptx = slides_dir / 'output' / '李诞养虾指南-svg.pptx'

    if not input_pptx.exists():
        print("❌ 基础 PPTX 不存在，请先运行 compile.js")
        return

    print("\n🔧 嵌入 SVG 图标...")

    # 嵌入 SVG
    success = embed_svgs_to_pptx(str(input_pptx), str(output_pptx), SVG_ICONS)

    if success:
        print(f"\n✅ SVG 版 PPTX 已生成: {output_pptx}")

        # 显示文件大小
        size_kb = os.path.getsize(output_pptx) / 1024
        print(f"   文件大小: {size_kb:.0f} KB")

        # 检查嵌入的 SVG
        with zipfile.ZipFile(output_pptx, 'r') as zf:
            svgs = [f for f in zf.namelist() if f.endswith('.svg')]
            print(f"   嵌入 SVG: {len(svgs)} 个")
            for svg in svgs:
                print(f"      - {svg}")


if __name__ == '__main__':
    main()