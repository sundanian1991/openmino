#!/usr/bin/env python3
"""validate-decision-card.py — 决策卡硬校验

用法：
    python3 validate-decision-card.py <决策卡.yaml>
    python3 validate-decision-card.py output/            # 批量校验目录下所有 .yaml
    python3 validate-decision-card.py <file> --strict    # warnings 也算 fail
    python3 validate-decision-card.py --lint-self        # 扫描技能文档元数据漂移
    python3 validate-decision-card.py --lint-all         # 跨技能扫描 nian-design 侧

校验项（参照 decision-card-schema.md）：
  1. 顶层字段完整：branch/visualStream/layoutSequence/heroType/components/breakPoint/palette/source
  2. branch ∈ {text, data}
  3. visualStream ∈ VISUAL-STREAMS.md 视觉型枚举（动态解析）
  4. structuralStream ∈ {S1-黑条书签, S2-长文导航, null}
  5. layoutSequence 非空，每项 layout ∈ layouts.md S01-S28（动态解析）
  6. heroType 与 visualStream 映射一致（见 schema 气质→Hero 表）
  7. components 非空，每项 id ∈ components.md 38 族（含 12a/12b/12c/12d 子编号，动态解析）
  8. breakPoint 恰好 1 处，method ∈ {ghost水印, 超大数字, accent色, 异形元素}
  9. palette.primary ∈ {darkgray, olive, earth}
 10. palette.accent ∈ {yellow, orange}
 11. palette.baseMode ∈ {light, dark, mix}
 12. branch=data → dataCharts 非 null，每项 embedSection ∈ layoutSequence 的 section 名
 13. branch=text → dataCharts 为 null
 14. breakPoint.section ∈ layoutSequence 的 section 名

退出码：0=PASS，1=FAIL（含 --strict 时的 warning）
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import NamedTuple

import yaml

SKILL_ROOT = Path(__file__).resolve().parent.parent
NIAN_DESIGN_REF = SKILL_ROOT.parent / "nian-design" / "references"

VISUAL_STREAMS = {"Statement", "Diagonal", "Split", "Numeral", "Entrance", "Pulse", "Dashboard"}
STRUCTURAL_STREAMS = {"S1-黑条书签", "S2-长文导航", None}
HERO_MAP = {
    "Statement": {"V4-Statement"},
    "Diagonal": {"V1-Diagonal"},
    "Split": {"V2-Split"},
    "Numeral": {"V6-Numeral"},
    "Entrance": {"整屏居中大字"},
    "Pulse": {"Numeral简化", "Split简化"},
    "Dashboard": {"Numeral缩到60vh"},
}
BREAK_METHODS = {"ghost水印", "超大数字", "accent色", "异形元素"}
PALETTE_PRIMARY = {"darkgray", "olive", "earth"}
PALETTE_ACCENT = {"yellow", "orange"}
PALETTE_BASEMODE = {"light", "dark", "mix"}
REQUIRED_TOP = ["branch", "visualStream", "layoutSequence", "heroType",
                "components", "breakPoint", "palette", "source"]


class Issue(NamedTuple):
    level: str  # ERROR / WARN
    field: str
    msg: str


def parse_layouts() -> set[str]:
    """从 layouts.md 解析 S01-S28 等骨架编号。"""
    src = (NIAN_DESIGN_REF / "layouts.md").read_text(encoding="utf-8")
    return set(re.findall(r"^## (S\d{2}) ·", src, re.MULTILINE))


def parse_components() -> set[str]:
    """从 components.md 解析组件族编号（01-38 + 12a/12b/12c/12d）。"""
    src = (NIAN_DESIGN_REF / "components.md").read_text(encoding="utf-8")
    ids = set(re.findall(r"^## (\d{2})\. ", src, re.MULTILINE))
    subs = set(re.findall(r"^### (\d{2}[a-d])\. ", src, re.MULTILINE))
    return ids | subs


def load_card(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def validate(card: dict, layouts: set[str], components: set[str]) -> list[Issue]:
    issues: list[Issue] = []

    # 1. 顶层字段完整
    for k in REQUIRED_TOP:
        if k not in card:
            issues.append(Issue("ERROR", "顶层", f"缺字段 {k}"))

    if "branch" in card and card["branch"] not in {"text", "data"}:
        issues.append(Issue("ERROR", "branch", f"值 {card['branch']!r} 不在 {{text, data}}"))

    # 3. visualStream
    vs = card.get("visualStream")
    if vs and vs not in VISUAL_STREAMS:
        issues.append(Issue("ERROR", "visualStream",
                            f"值 {vs!r} 不在 VISUAL-STREAMS 视觉型 {sorted(VISUAL_STREAMS)}"))

    # 4. structuralStream
    ss = card.get("structuralStream")
    if ss not in STRUCTURAL_STREAMS:
        issues.append(Issue("ERROR", "structuralStream",
                            f"值 {ss!r} 不在 {sorted(x for x in STRUCTURAL_STREAMS if x)} 或 null"))

    # 5. layoutSequence
    seq = card.get("layoutSequence")
    if not seq:
        issues.append(Issue("ERROR", "layoutSequence", "为空或缺失"))
    else:
        section_names = set()
        for i, item in enumerate(seq):
            if not isinstance(item, dict):
                issues.append(Issue("ERROR", f"layoutSequence[{i}]", "不是 dict"))
                continue
            s = item.get("section")
            if s:
                section_names.add(s)
            lay = item.get("layout")
            if not lay:
                issues.append(Issue("ERROR", f"layoutSequence[{i}]", "缺 layout"))
            elif lay not in layouts:
                issues.append(Issue("ERROR", f"layoutSequence[{i}].layout",
                                    f"值 {lay!r} 不在 layouts.md {sorted(layouts)}"))

    # 6. heroType 与 visualStream 一致
    ht = card.get("heroType")
    if vs and vs in HERO_MAP:
        expected = HERO_MAP[vs]
        if ht and ht not in expected:
            issues.append(Issue("WARN", "heroType",
                                f"由 visualStream={vs} 应为 {sorted(expected)}，实际 {ht!r}"))

    # 7. components
    comps = card.get("components")
    if not comps:
        issues.append(Issue("ERROR", "components", "为空或缺失"))
    else:
        for i, c in enumerate(comps):
            if not isinstance(c, dict):
                issues.append(Issue("ERROR", f"components[{i}]", "不是 dict"))
                continue
            cid = c.get("id")
            if not cid:
                issues.append(Issue("ERROR", f"components[{i}]", "缺 id"))
                continue
            # id 形如 "05 TABLES" / "12a Bar Chart" / "20 ASYMMETRIC COMPARISON"
            m = re.match(r"^(\d{2}[a-d]?)\b", cid)
            if not m:
                issues.append(Issue("ERROR", f"components[{i}].id",
                                    f"{cid!r} 无法解析编号"))
            elif m.group(1) not in components:
                issues.append(Issue("ERROR", f"components[{i}].id",
                                    f"编号 {m.group(1)!r} 不在 components.md 38 族"))

    # 8. breakPoint 恰好 1 处
    bp = card.get("breakPoint")
    if not bp:
        issues.append(Issue("ERROR", "breakPoint", "缺失（必须恰好 1 处）"))
    elif not isinstance(bp, dict):
        issues.append(Issue("ERROR", "breakPoint", "不是 dict"))
    else:
        m = bp.get("method")
        if m not in BREAK_METHODS:
            issues.append(Issue("ERROR", "breakPoint.method",
                                f"值 {m!r} 不在 {sorted(BREAK_METHODS)}"))

    # 9-11. palette
    pal = card.get("palette")
    if not isinstance(pal, dict):
        issues.append(Issue("ERROR", "palette", "缺失或不是 dict"))
    else:
        if pal.get("primary") not in PALETTE_PRIMARY:
            issues.append(Issue("ERROR", "palette.primary",
                                f"值 {pal.get('primary')!r} 不在 {sorted(PALETTE_PRIMARY)}"))
        if pal.get("accent") not in PALETTE_ACCENT:
            issues.append(Issue("ERROR", "palette.accent",
                                f"值 {pal.get('accent')!r} 不在 {sorted(PALETTE_ACCENT)}"))
        if pal.get("baseMode") not in PALETTE_BASEMODE:
            issues.append(Issue("ERROR", "palette.baseMode",
                                f"值 {pal.get('baseMode')!r} 不在 {sorted(PALETTE_BASEMODE)}"))

    # 12-13. dataCharts 与 branch 一致
    dc = card.get("dataCharts")
    branch = card.get("branch")
    section_names = {item.get("section") for item in seq} if seq else set()
    if branch == "data":
        if not dc:
            issues.append(Issue("ERROR", "dataCharts", "branch=data 但 dataCharts 为空/null"))
        else:
            for i, d in enumerate(dc):
                if not isinstance(d, dict):
                    issues.append(Issue("ERROR", f"dataCharts[{i}]", "不是 dict"))
                    continue
                es = d.get("embedSection")
                if es not in section_names:
                    issues.append(Issue("ERROR", f"dataCharts[{i}].embedSection",
                                        f"{es!r} 不在 layoutSequence 的 section 名 {sorted(x for x in section_names if x)}"))
    elif branch == "text":
        if dc is not None:
            issues.append(Issue("ERROR", "dataCharts", "branch=text 但 dataCharts 非 null"))

    # 14. breakPoint.section 在 layoutSequence
    if isinstance(bp, dict) and bp.get("section"):
        if bp["section"] not in section_names:
            issues.append(Issue("ERROR", "breakPoint.section",
                                f"{bp['section']!r} 不在 layoutSequence 的 section 名"))

    return issues


def format_issues(path: Path, issues: list[Issue]) -> str:
    if not issues:
        return f"  PASS  {path.name}"
    errors = [i for i in issues if i.level == "ERROR"]
    warns = [i for i in issues if i.level == "WARN"]
    status = "FAIL" if errors else "PASS(warn)"
    lines = [f"  {status:8}  {path.name}  ({len(errors)} err, {len(warns)} warn)"]
    for i in issues:
        lines.append(f"           [{i.level}] {i.field}: {i.msg}")
    return "\n".join(lines)


def lint_self() -> int:
    """扫描技能自身文档的元数据漂移（FM-05/FM-06 自动化防御）。

    检查 SKILL.md / schema.md / intake-*.md 里写的"N 族""S01-SXX"是否
    与 components.md / layouts.md 实际枚举一致。漂移则报错。
    """
    layouts = parse_layouts()
    components = parse_components()
    max_layout = max(layouts)  # 如 "S28"
    # 组件族数 = 主编号数（01-32），不含子编号 12a 等
    comp_main = {c for c in components if re.fullmatch(r"\d{2}", c)}
    comp_count = len(comp_main)

    docs = [
        SKILL_ROOT / "SKILL.md",
        SKILL_ROOT / "references" / "decision-card-schema.md",
        SKILL_ROOT / "references" / "intake-text.md",
        SKILL_ROOT / "references" / "intake-data.md",
    ]

    print(f"已加载源枚举：layouts 最大 {max_layout}，components 主族 {comp_count} 个")
    print(f"扫描 {len(docs)} 个文档\n")

    has_fail = False
    for doc in docs:
        if not doc.exists():
            continue
        text = doc.read_text(encoding="utf-8")
        issues = _scan_metadata_drift(text, comp_count, max_layout)

        status = "FAIL" if any(i.level == "ERROR" for i in issues) else "PASS"
        print(f"  {status:8}  {doc.relative_to(SKILL_ROOT)}  ({len(issues)} err)")
        for i in issues:
            print(f"           [{i.level}] {i.field}: {i.msg}")
        if any(i.level == "ERROR" for i in issues):
            has_fail = True

    return 1 if has_fail else 0


def _scan_metadata_drift(text: str, comp_count: int, max_layout: str) -> list[Issue]:
    """扫描文本中的元数据漂移（N族 / S01-SXX 表述与源枚举不符）。

    白名单：包含 "Nothing Design" "原始 26" 的行是来源说明，跳过。
    """
    issues: list[Issue] = []
    max_layout_num = int(max_layout[1:])

    for m in re.finditer(r"(\d+)\s*(?:组件)?族", text):
        # 跳过 Nothing Design 来源说明（"Nothing Design 26 组件族"是历史事实）
        line_start = text.rfind("\n", 0, m.start()) + 1
        line = text[line_start:text.find("\n", m.end())]
        if "Nothing Design" in line or "原始 26" in line:
            continue
        # 跳过字体族语境（"字体 2 族""字重 2 族"指 typeface，非组件族）
        pre = text[max(0, m.start() - 6):m.start()]
        if re.search(r"字体|字重|字体家族\s*≤?\s*", pre):
            continue
        n = int(m.group(1))
        if n != comp_count:
            issues.append(Issue("ERROR", "元数据漂移",
                                f'写"{n}族"，实际 components.md 主族 {comp_count} 个'))

    for m in re.finditer(r"S01-S(\d{2})", text):
        written_num = int(m.group(1))
        if written_num > max_layout_num:
            issues.append(Issue("ERROR", "元数据漂移",
                                f'写"S01-S{m.group(1)}"，实际 layouts.md 最大 {max_layout}（声明了不存在的骨架）'))
    return issues


def lint_all() -> int:
    """跨技能扫描：检查 nian-design 侧文档的元数据漂移（契约对账防御盲区）。

    --lint-self 只扫 decision-card 自身，但 nian-design 侧文档也会写
    "N族""S01-SXX"，漂移时 decision-card 校验不到。本模式补上这个缺口。
    """
    layouts = parse_layouts()
    components = parse_components()
    max_layout = max(layouts)
    comp_main = {c for c in components if re.fullmatch(r"\d{2}", c)}
    comp_count = len(comp_main)

    nian_design_root = SKILL_ROOT.parent / "nian-design"
    docs = [
        nian_design_root / "SKILL.md",
        nian_design_root / "references" / "CRAFT-RULES.md",
        nian_design_root / "references" / "checklist.md",
        nian_design_root / "references" / "DESIGN-SYSTEM-MAP.md",
        nian_design_root / "references" / "showcase-index.md",
    ]

    print(f"跨技能扫描 nian-design 侧文档（源枚举：layouts 最大 {max_layout}，components 主族 {comp_count} 个）")
    print(f"扫描 {len(docs)} 个文档\n")

    has_fail = False
    for doc in docs:
        if not doc.exists():
            continue
        text = doc.read_text(encoding="utf-8")
        issues = _scan_metadata_drift(text, comp_count, max_layout)

        status = "FAIL" if any(i.level == "ERROR" for i in issues) else "PASS"
        rel = doc.relative_to(SKILL_ROOT.parent)
        print(f"  {status:8}  {rel}  ({len(issues)} err)")
        for i in issues:
            print(f"           [{i.level}] {i.field}: {i.msg}")
        if any(i.level == "ERROR" for i in issues):
            has_fail = True

    return 1 if has_fail else 0


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    if "--lint-self" in argv:
        return lint_self()
    if "--lint-all" in argv:
        return lint_all()
    strict = "--strict" in argv
    targets = [Path(a) for a in argv[1:] if not a.startswith("-")]
    if not targets:
        print("错误：未指定校验目标", file=sys.stderr)
        return 2

    files: list[Path] = []
    for t in targets:
        if t.is_dir():
            files.extend(sorted(t.glob("*.yaml")))
            files.extend(sorted(t.glob("*.yml")))
        else:
            files.append(t)

    if not files:
        print("错误：未找到 .yaml 文件", file=sys.stderr)
        return 2

    layouts = parse_layouts()
    components = parse_components()
    print(f"已加载枚举：layouts={len(layouts)} 个，components={len(components)} 个")
    print(f"校验 {len(files)} 个决策卡\n")

    has_fail = False
    for f in files:
        try:
            card = load_card(f)
        except Exception as e:
            print(f"  FAIL     {f.name}  (YAML 解析失败: {e})")
            has_fail = True
            continue
        issues = validate(card, layouts, components)
        print(format_issues(f, issues))
        if any(i.level == "ERROR" for i in issues):
            has_fail = True
        elif strict and any(i.level == "WARN" for i in issues):
            has_fail = True

    return 1 if has_fail else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
