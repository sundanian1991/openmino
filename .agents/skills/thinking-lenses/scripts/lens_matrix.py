#!/usr/bin/env python3
"""
交叉透镜矩阵生成器 (Lens Crossover Matrix)

生成25×25的透镜交叉组合表，标出冲突度、创意潜力、和推荐组合。

用法:
    python3 lens_matrix.py --format table
    python3 lens_matrix.py --format html --output matrix.html
    python3 lens_matrix.py --top-conflict 10
    python3 lens_matrix.py --top-creative 10
"""

import argparse
import json

LENSES = [
    "Artist", "Economist", "Engineer", "Entrepreneur", "Doctor",
    "Journalist", "Scientist", "Mathematician", "Programmer", "Architect",
    "Salesperson", "Soldier", "Chess Master", "Designer", "Teacher",
    "Anthropologist", "Psychologist", "Critic", "Philosopher", "Accountant",
    "Politician", "Novelist", "Actor", "Plumber", "Hacker"
]

# 领域分组（用于计算冲突度）
DOMAINS = {
    "creative": ["Artist", "Designer", "Critic", "Novelist", "Actor"],
    "analytical": ["Economist", "Engineer", "Mathematician", "Accountant", "Scientist"],
    "systems": ["Programmer", "Architect", "Hacker", "Chess Master"],
    "people": ["Salesperson", "Teacher", "Anthropologist", "Psychologist", "Politician"],
    "practical": ["Soldier", "Plumber", "Doctor", "Journalist"],
    "strategic": ["Entrepreneur", "Philosopher"],
}

# 已知的高创意组合（人工标注）
HIGH_CREATIVE = {
    ("Artist", "Engineer"): "把工程严谨性注入创意流程，产生可落地的创新",
    ("Economist", "Psychologist"): "激励设计+行为预测，精准操控系统参与者行为",
    ("Hacker", "Politician"): "看透系统漏洞+管理公众感知，双刃剑组合",
    ("Novelist", "Accountant"): "用数据讲故事，把枯燥数字变成 compelling narrative",
    ("Plumber", "Architect"): "从愿景到落地的完整闭环，既有蓝图又能拆机",
    ("Soldier", "Entrepreneur"): "纪律执行+快速试错，在规范中保持敏捷",
    ("Philosopher", "Journalist"): "极限推演+事实核查，既大胆假设又小心求证",
    ("Actor", "Mathematician"): "情绪真实+逻辑严谨，在感性与理性间找到平衡点",
    ("Teacher", "Salesperson"): "让别人理解+让别人买单，沟通与说服的终极组合",
    ("Chess Master", "Anthropologist"): "预判对手+理解文化，跨国/跨组织竞争利器",
}


def get_domain(lens: str) -> str:
    for domain, items in DOMAINS.items():
        if lens in items:
            return domain
    return "other"


def conflict_score(a: str, b: str) -> int:
    """计算两个透镜的冲突度（0-10，越高越冲突/越反直觉）"""
    if a == b:
        return 0
    da, db = get_domain(a), get_domain(b)
    if da == db:
        return 2  # 同领域，有点相似
    # 不同领域，基础冲突度5
    score = 5
    # 特别冲突的组合加分
    conflicts = [
        ("Artist", "Accountant"), ("Philosopher", "Soldier"),
        ("Actor", "Mathematician"), ("Novelist", "Engineer"),
        ("Entrepreneur", "Soldier"), ("Plumber", "Politician"),
        ("Hacker", "Teacher"), ("Critic", "Programmer"),
    ]
    pair = tuple(sorted([a, b]))
    if pair in [tuple(sorted(c)) for c in conflicts]:
        score += 3
    # 创意组合加分
    if pair in [tuple(sorted(c)) for c in HIGH_CREATIVE.keys()]:
        score += 2
    return min(score, 10)


def creative_potential(a: str, b: str) -> int:
    """计算创意潜力（0-10）"""
    if a == b:
        return 0
    pair = tuple(sorted([a, b]))
    if pair in [tuple(sorted(c)) for c in HIGH_CREATIVE.keys()]:
        return 9
    da, db = get_domain(a), get_domain(b)
    if da != db:
        return 6 + (conflict_score(a, b) // 2)
    return 3


def generate_matrix():
    """生成完整的25×25矩阵"""
    matrix = []
    for i, a in enumerate(LENSES):
        row = []
        for j, b in enumerate(LENSES):
            if i == j:
                row.append({"conflict": 0, "creative": 0, "pair": (a, b)})
            else:
                row.append({
                    "conflict": conflict_score(a, b),
                    "creative": creative_potential(a, b),
                    "pair": (a, b),
                })
        matrix.append(row)
    return matrix


def print_table(matrix):
    """打印文本表格（简化版，只显示上三角）"""
    print(f"\n{'':>15}", end="")
    for lens in LENSES:
        print(f"{lens[:3]:>4}", end="")
    print()
    print("-" * (15 + 4 * 25))

    for i, a in enumerate(LENSES):
        print(f"{a[:12]:>15}", end="")
        for j, b in enumerate(LENSES):
            if j < i:
                print("    ", end="")
            elif i == j:
                print("  - ", end="")
            else:
                cell = matrix[i][j]
                # 显示冲突度
                val = cell["conflict"]
                symbol = "·" if val < 4 else "○" if val < 7 else "◆"
                print(f"{symbol:>4}", end="")
        print()

    print("\n  图例：· 低冲突(1-3)  ○ 中冲突(4-6)  ◆ 高冲突(7-10)")
    print("  只显示上三角，对角线为同透镜，不显示。\n")


def top_combinations(matrix, n=10, sort_by="conflict"):
    """获取Top N组合"""
    pairs = []
    for i in range(25):
        for j in range(i + 1, 25):
            cell = matrix[i][j]
            pairs.append(cell)

    if sort_by == "conflict":
        pairs.sort(key=lambda x: x["conflict"], reverse=True)
        print(f"\n{'='*70}")
        print(f"  Top {n} 最冲突/最反直觉的透镜组合")
        print(f"{'='*70}")
    else:
        pairs.sort(key=lambda x: x["creative"], reverse=True)
        print(f"\n{'='*70}")
        print(f"  Top {n} 最具创意潜力的透镜组合")
        print(f"{'='*70}")

    for rank, cell in enumerate(pairs[:n], 1):
        a, b = cell["pair"]
        pair_key = tuple(sorted([a, b]))
        note = ""
        for pk, desc in HIGH_CREATIVE.items():
            if tuple(sorted(pk)) == pair_key:
                note = f"  ⭐ {desc}"
                break
        if sort_by == "conflict":
            print(f"  {rank}. {a} + {b}  冲突度:{cell['conflict']}/10  创意潜力:{cell['creative']}/10{note}")
        else:
            print(f"  {rank}. {a} + {b}  创意潜力:{cell['creative']}/10  冲突度:{cell['conflict']}/10{note}")
    print()


def generate_html(matrix, output_path):
    """生成交互式HTML矩阵"""
    html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>交叉透镜矩阵 25×25</title>
<style>
body { font-family: system-ui, sans-serif; background: #FAF8F5; color: #333; padding: 20px; margin: 0; }
h1 { font-size: 20px; border-bottom: 2px solid #CC6B1E; padding-bottom: 8px; margin-bottom: 16px; }
.controls { margin-bottom: 16px; }
button { padding: 8px 16px; border: none; background: #CC6B1E; color: white; font-weight: 600; cursor: pointer; margin-right: 8px; }
button:hover { background: #B85F1A; }
button.secondary { background: #F0EEEB; color: #333; }
table { border-collapse: collapse; font-size: 11px; }
th, td { width: 32px; height: 32px; text-align: center; border: 1px solid #E5E2DE; }
th { background: #FFF8F0; font-size: 10px; color: #CC6B1E; }
td { cursor: pointer; transition: opacity 0.15s; }
td:hover { opacity: 0.7; }
td.diag { background: #F0EEEB; }
td.low { background: #F0EEEB; }
td.mid { background: #E8D5C0; }
td.high { background: #CC6B1E; color: white; }
td.null { background: transparent; border: none; }
.info { margin-top: 16px; padding: 12px; background: white; border: 1px solid #E5E2DE; font-size: 13px; line-height: 1.6; }
.legend { display: flex; gap: 16px; font-size: 12px; margin-top: 8px; }
.legend span { display: inline-block; width: 14px; height: 14px; margin-right: 4px; vertical-align: middle; }
</style>
</head>
<body>
<h1>交叉透镜矩阵 25×25</h1>
<div class="controls">
  <button onclick="setMode('conflict')">冲突度视图</button>
  <button class="secondary" onclick="setMode('creative')">创意潜力视图</button>
</div>
<div style="overflow-x:auto;">
<table id="matrix">
"""

    # Header row
    html += "<tr><th></th>"
    for lens in LENSES:
        html += f"<th title='{lens}'>{lens[:3]}</th>"
    html += "</tr>\n"

    for i, a in enumerate(LENSES):
        html += f"<tr><th title='{a}'>{a[:3]}</th>"
        for j, b in enumerate(LENSES):
            if i == j:
                html += '<td class="diag">-</td>'
            elif j < i:
                html += '<td class="null"></td>'
            else:
                cell = matrix[i][j]
                c = cell["conflict"]
                cr = cell["creative"]
                cls = "high" if c >= 7 else ("mid" if c >= 4 else "low")
                html += f'<td class="{cls}" data-a="{a}" data-b="{b}" data-conflict="{c}" data-creative="{cr}" onclick="showInfo(this)"></td>'
        html += "</tr>\n"

    html += """
</table>
</div>
<div class="legend">
  <span><span style="background:#F0EEEB;border:1px solid #E5E2DE;"></span>低(1-3)</span>
  <span><span style="background:#E8D5C0;border:1px solid #E5E2DE;"></span>中(4-6)</span>
  <span><span style="background:#CC6B1E;border:1px solid #CC6B1E;"></span>高(7-10)</span>
</div>
<div class="info" id="infoBox">点击矩阵中的单元格查看透镜组合详情。</div>

<script>
let mode = 'conflict';
function setMode(m) {
  mode = m;
  document.querySelectorAll('#matrix td').forEach(td => {
    if (td.classList.contains('null') || td.classList.contains('diag')) return;
    const v = parseInt(td.getAttribute(m === 'conflict' ? 'data-conflict' : 'data-creative'));
    td.className = v >= 7 ? 'high' : (v >= 4 ? 'mid' : 'low');
  });
}
function showInfo(td) {
  const a = td.getAttribute('data-a');
  const b = td.getAttribute('data-b');
  const c = td.getAttribute('data-conflict');
  const cr = td.getAttribute('data-creative');
  document.getElementById('infoBox').innerHTML =
    '<strong>' + a + ' + ' + b + '</strong><br>' +
    '冲突度：' + c + '/10 | 创意潜力：' + cr + '/10<br>' +
    '试着同时用这两个视角分析你的问题。冲突最大的地方往往是盲区所在。';
}
</script>
</body>
</html>
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"交互式矩阵已保存到: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="交叉透镜矩阵生成器")
    parser.add_argument("--format", choices=["table", "html"], default="table",
                        help="输出格式")
    parser.add_argument("--output", help="HTML输出路径")
    parser.add_argument("--top-conflict", type=int, help="显示Top N最冲突组合")
    parser.add_argument("--top-creative", type=int, help="显示Top N最具创意组合")
    args = parser.parse_args()

    matrix = generate_matrix()

    if args.format == "html":
        output = args.output or "lens_matrix.html"
        generate_html(matrix, output)
    else:
        print_table(matrix)
        if args.top_conflict:
            top_combinations(matrix, n=args.top_conflict, sort_by="conflict")
        if args.top_creative:
            top_combinations(matrix, n=args.top_creative, sort_by="creative")


if __name__ == "__main__":
    main()
