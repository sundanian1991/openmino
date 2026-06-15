#!/usr/bin/env python3
"""修复剩余的来源标注缺失"""
from pathlib import Path

DISTILL_DIR = Path("../distill")

fixes = {
    "00_索引与导航.md": {
        "## 一、知识库架构总览": "[来源：知识库架构设计文档 / 卡帕西LLM Wiki模式]",
        "### 编码体系": "[来源：知识库编码体系设计 / 各分册文件命名]",
        "## 二、快速导航": "[来源：各distill分册内容汇总]",
        "### 按管理层级查找": "[来源：各distill分册内容汇总]",
        "### 按工作场景查找": "[来源：A1-A6/B1-B6/C1-C4/D1-D4/E1-E2场景文档汇总]",
        "## 三、全局关键数字": "[来源：各制度文件关键阈值汇总 / SM-2026-000/010/020/030/040/050/060/035]",
        "## 四、跨分册关联速查": "[来源：各分册方法论调用链汇总]",
        "### 方法论调用链": "[来源：[05 方法论体系](05_方法论体系.md) §总览]",
        "### 制度→方法论→工具 映射": "[来源：[05 方法论体系](05_方法论体系.md) §9 制度-方法论关联矩阵]",
        "## 五、原文层快速索引": "[来源：raw/目录文件清单]",
        "## 六、健康判断层入口": "[来源：notes/目录文件清单]",
        "## 七、自动化脚本入口": "[来源：scripts/目录及README.md]",
    },
    "02_引入与清退规范.md": {
        "## 管理心法（四句话）": "[来源：MT-2026-110_全生命周期管理框架.docx §管理心法 / SM-2026-050_清洁版操作指引.md §管理原则]",
    },
    "04_评估与考核体系.md": {
        "### 9.3 ABC分级管理动作": "[来源：SM-2026-035_供应商分级清退管理制度.md §第十条 / §附录四]",
        "#### A级（优秀）": "[来源：SM-2026-035_供应商分级清退管理制度.md §附录四 A级管理动作]",
        "#### B级（合格）": "[来源：SM-2026-035_供应商分级清退管理制度.md §附录四 B级管理动作]",
        "#### C级（不合格）": "[来源：SM-2026-035_供应商分级清退管理制度.md §附录四 C级管理动作]",
        "#### 观察区（新供应商保护期）": "[来源：SM-2026-035_供应商分级清退管理制度.md §第九条 观察区 / §附录四 观察区]",
    },
    "10_AI转型与知识库.md": {
        "## 二、数据来源清单": "[来源：方案框架.md §数据源 / Task3-供应商管理数字化.md §数据源]",
    },
}

for filename, sections in fixes.items():
    filepath = DISTILL_DIR / filename
    if not filepath.exists():
        print(f"跳过: {filename}")
        continue

    content = filepath.read_text(encoding="utf-8")
    lines = content.splitlines()
    new_lines = []
    i = 0
    added = 0

    while i < len(lines):
        line = lines[i]
        new_lines.append(line)

        for section_title, source_line in sections.items():
            if line.strip() == section_title:
                # 检查后面是否已有来源
                has_source = False
                j = i + 1
                while j < len(lines) and j < i + 4:
                    if '[来源' in lines[j] or '来源：' in lines[j]:
                        has_source = True
                        break
                    if lines[j].strip() and not lines[j].strip().startswith('>'):
                        break
                    j += 1

                if not has_source:
                    # 添加空行和来源（如果后面不是空行则先加空行）
                    if i + 1 < len(lines) and lines[i + 1].strip():
                        new_lines.append("")
                    new_lines.append(f"> {source_line}")
                    new_lines.append("")
                    added += 1
                break

        i += 1

    filepath.write_text("\n".join(new_lines), encoding="utf-8")
    print(f"{filename}: 新增 {added} 个来源标注")

print("\n✅ 剩余来源标注修复完成")
