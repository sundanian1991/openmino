#!/usr/bin/env python3
"""validate-decision-card.py — 决策卡硬校验

用法：
    python3 validate-decision-card.py <决策卡.yaml>
    python3 validate-decision-card.py output/            # 批量校验目录下所有 .yaml
    python3 validate-decision-card.py <file> --strict    # warnings 也算 fail

校验项（参照 decision-card-schema.md）：
  1. 顶层字段完整：branch/visualStream/layoutSequence/heroType/components/breakPoint/palette/source
  2. branch ∈ {text, data}
  3. visualStream ∈ VISUAL-STREAMS.md 视觉型枚举（动态解析）
  4. structuralStream ∈ {S1-黑条书签, S2-长文导航, null}
  5. layoutSequence 非空，每项 layout ∈ layouts.md S01-S28（动态解析）
  6. heroType 与 visualStream 映射一致（见 schema 气质→Hero 表）
  7. components 非空，每项 id ∈ components.md 32 族（含 12a/12b/12c/12d 子编号，动态解析）
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
    "Statement": "V4-Statement",
    "Diagonal": "V1-Diagonal",
    "Split": "V2-Split",
    "Numeral": "V6-Numeral",
    "Entrance": "整屏居中大字",
    "Pulse": "Numeral简化",
    "Dashboard": "Numeral缩到60vh",
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
    """从 components.md 解析组件族编号（01-32 + 12a/12b/12c/12d）。"""
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
        if ht and ht != expected:
            issues.append(Issue("WARN", "heroType",
                                f"由 visualStream={vs} 应为 {expected!r}，实际 {ht!r}"))

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
                                    f"编号 {m.group(1)!r} 不在 components.md 32 族"))

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


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
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
