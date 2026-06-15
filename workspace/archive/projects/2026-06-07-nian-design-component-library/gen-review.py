#!/usr/bin/env python3
"""生成四个组件复审 HTML 文件"""
import os, re, html as H

BASE = "/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/nian-design/references/components"

CATEGORIES = {
    "D-CTA-Proof": {
        "files": [
            "1-typographic-link.md", "2-outlined-chip.md", "3-inline-form.md",
            "4-pull-quote.md", "05-flip-card.md", "06-code-panel.md",
            "07-tag-card.md", "08-editorial-quote.md", "09-period-nav.md",
            "10-inline-bar.md", "11-segmented-block-bar.md", "12-metric-card-led-style.md",
            "13-nameplate-label.md", "14-gauge-arc.md", "15-svg-sparkline.md",
            "16-reference-line-overlay.md", "17-data-spotlight.md", "18-buttons.md",
            "19-blockquote-pull-quote.md", "5-logo-wall.md", "6-single-huge-quote.md",
            "7-numbered-stat-strip.md", "8-tag.md", "9-progress-bar.md",
        ],
        "prefix": "D",
    },
    "E-Footer": {
        "files": [
            "1-mast-headed.md", "2-inline-rule-single-line.md", "3-index.md",
            "4-dense-typographic.md", "5-letter-close.md", "6-statement.md",
            "7-code-block.md",
        ],
        "prefix": "E",
    },
    "F-Navigation": {
        "files": [
            "1-wordmark-2-links.md", "2-floating-pill.md", "3-side-rail.md",
            "4-cmd-k.md", "5-floating-chip.md", "6-newspaper-masthead.md",
            "7-edge-aligned-minimal.md",
        ],
        "prefix": "F",
    },
    "G-Brand-System": {
        "files": [
            "1-color-swatch-grid.md", "2-typography-showcase.md", "3-symbol-evolution.md",
            "4-numeral-grid.md", "5-tension-grid.md", "6-color-swatch.md",
            "7-dot-matrix-logo.md", "8-principle-card.md", "9-do-don-t-comparison.md",
        ],
        "prefix": "G",
    },
}

TEMPLATE = """\
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:'Inter',sans-serif;background:#FAFAF8;color:#1A1A1A;padding:24px;max-width:1200px;margin:0 auto}}
h1{{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-bottom:8px}}
.sub{{font-size:13px;color:#8A7D6E;margin-bottom:24px}}
.review-item{{border:1px solid #E5E5E0;background:#FFF;margin-bottom:12px;border-radius:6px;overflow:hidden}}
.review-header{{display:flex;align-items:center;padding:10px 14px;background:#F5F5F0;border-bottom:1px solid #E5E5E0}}
.review-id{{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:#888;margin-right:12px;min-width:28px}}
.review-name{{font-size:13px;font-weight:600;flex:1}}
.review-excluded{{font-size:10px;color:#C66B4B;margin-left:8px;font-weight:400}}
.review-select{{padding:3px 8px;border:1px solid #E5E5E0;border-radius:4px;font-size:11px;font-family:'Inter',sans-serif}}
.review-meta{{padding:10px 14px;display:grid;grid-template-columns:1fr 1fr;gap:6px}}
.meta-label{{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#888;display:block;margin-bottom:2px}}
.meta-value{{font-size:11px;color:#666;line-height:1.5}}
.review-preview{{padding:12px 14px;border-top:1px solid #E5E5E0;background:#FAFAF8}}
.review-preview pre{{background:#FFF;border:1px solid #E5E5E0;padding:10px;border-radius:4px;font-size:11px;line-height:1.5;overflow-x:auto;max-height:300px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}}
</style>
</head>
<body>
<h1>{title}</h1>
<div class="sub">{subtitle}</div>
{sections}
</body>
</html>"""


def extract_component_name(content):
    """从 md 提取组件名（第一个 # 标题去掉排除标记）"""
    m = re.search(r'^#\s+(.+)', content, re.M)
    if not m:
        return "Unknown"
    name = m.group(1).strip()
    name = re.sub(r'~~(.+?)~~', r'\1', name)  # 去掉删除线标记
    return name


def is_excluded(content):
    """检查是否被标记排除"""
    return '~~' in content[:50] or '（C1 - 排除）' in content or '（C2 - 排除）' in content or '（Ft3 - 排除）' in content or '（Ft6 - 排除）' in content or '（N1 - 排除）' in content or '（N8 - 排除）' in content or '（N4 - 排除）' in content or '（N2 - 排除）' in content or '（T4 - 排除）' in content


def extract_meta(content):
    """从 md 提取四个 meta 字段"""
    # 适用场景
    usage = ""
    m = re.search(r'##\s*使用场景\s*\n+(.*?)(?:\n##|\n---|\Z)', content, re.S)
    if m:
        usage = m.group(1).strip().replace('\n', ' ')
    if not usage:
        # 从"含义"行提取
        m = re.search(r'\*\*含义\*\*[：:]\s*(.+)', content)
        if m:
            usage = m.group(1).strip()

    # CSS 要点
    css_summary = ""
    # 找 CSS 代码块
    css_blocks = re.findall(r'```css\n(.*?)```', content, re.S)
    if css_blocks:
        # 提取关键 class 名和属性
        all_css = ' '.join(css_blocks)
        # 找出主要 class 选择器
        selectors = re.findall(r'\.([\w-]+)(?:\s*[,{])', all_css)
        # 去重保序
        seen = set()
        unique = []
        for s in selectors:
            if s not in seen and '__' not in s and '--' not in s:
                seen.add(s)
                unique.append(s)
        css_summary = ', '.join(unique[:4]) if unique else ''

    # 使用边界
    boundary = ""
    # 检查变体旋钮描述
    m = re.search(r'变体旋钮[：:]\s*(.+)', content)
    if m:
        boundary = m.group(1).strip()
    # 检查"规则"段落
    if not boundary:
        m = re.search(r'\*\*规则\*\*[：:]\s*(.+)', content)
        if m:
            boundary = m.group(1).strip()
    # 检查实现映射
    if not boundary:
        m = re.search(r'\*\*实现映射\*\*[：:]\s*(.+)', content)
        if m:
            boundary = '映射: ' + m.group(1).strip()

    # 推荐 D 值 - 从文件内容中尝试提取
    dval = ""
    m = re.search(r'（[CDETNAF](\d+)\s*-\s*入选）', content)
    if m:
        dval = f"C{m.group(1)} 入选"
    elif is_excluded(content):
        m2 = re.search(r'（[CDETNAF](\d+)\s*-\s*排除）', content)
        if m2:
            dval = f"C{m2.group(1)} 排除"
        else:
            dval = "排除"
    else:
        # 基础组件
        m3 = re.search(r'实现 #(\d+)', content)
        if m3:
            dval = f"基础组件 #{m3.group(1)}"

    return usage, css_summary, boundary, dval


def extract_code_blocks(content):
    """提取 HTML 和 CSS 代码块"""
    html_blocks = re.findall(r'```html\n(.*?)```', content, re.S)
    css_blocks = re.findall(r'```css\n(.*?)```', content, re.S)
    parts = []
    for i, hb in enumerate(html_blocks):
        parts.append(f"<!-- HTML -->\n{hb.strip()}")
    for i, cb in enumerate(css_blocks):
        parts.append(f"/* CSS */\n{cb.strip()}")
    return '\n\n'.join(parts) if parts else '(无代码)'


def build_section(data_id, name, meta, code, excluded):
    exc = '<span class="review-excluded">⚠️ 已排除</span>' if excluded else ''
    e = H.escape
    return f'''<section class="review-item" data-id="{e(data_id)}">
  <div class="review-header">
    <div class="review-id">{e(data_id)}</div>
    <div class="review-name">{e(name)}{exc}</div>
    <div class="review-select">
      <select><option value="keep">✅ 保留</option><option value="delete">❌ 删除</option><option value="uncertain">⚠️ 不确定</option></select>
    </div>
  </div>
  <div class="review-meta">
    <div><span class="meta-label">适用场景</span><span class="meta-value">{e(meta[0][:120])}</span></div>
    <div><span class="meta-label">CSS 要点</span><span class="meta-value">{e(meta[1][:120])}</span></div>
    <div><span class="meta-label">使用边界</span><span class="meta-value">{e(meta[2][:120])}</span></div>
    <div><span class="meta-label">推荐D值</span><span class="meta-value">{e(meta[3][:120])}</span></div>
  </div>
  <div class="review-preview"><pre>{e(code[:3000])}</pre></div>
</section>'''


def generate(cat_name, cat_info, output_path):
    prefix = cat_info["prefix"]
    files = cat_info["files"]
    sections = []
    for idx, fname in enumerate(files, 1):
        fpath = os.path.join(BASE, cat_name, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        data_id = f"{prefix}{idx}"
        name = extract_component_name(content)
        excluded = is_excluded(content)
        meta = extract_meta(content)
        code = extract_code_blocks(content)
        sections.append(build_section(data_id, name, meta, code, excluded))

    title = f"{cat_name} 组件复审"
    subtitle = f"共 {len(files)} 个组件 · {prefix}1–{prefix}{len(files)}"
    html = TEMPLATE.format(
        title=title,
        subtitle=subtitle,
        sections='\n'.join(sections),
    )
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"✅ {output_path} ({len(files)} components)")


if __name__ == "__main__":
    OUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace"
    for cat_name, cat_info in CATEGORIES.items():
        generate(cat_name, cat_info, os.path.join(OUT, f"review-{cat_name}.html"))
