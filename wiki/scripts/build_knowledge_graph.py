#!/usr/bin/env python3
"""
Knowledge Graph Builder — 构建Wiki分册间关联图谱
解析distill/层文件之间的引用关系，生成可视化图谱

使用方式：
    cd wiki/scripts && python3 build_knowledge_graph.py
    python3 build_knowledge_graph.py --format mermaid --output graph.md
    python3 build_knowledge_graph.py --format json --output graph.json

作者：年老师
日期：2026-06-13
"""

import re
import json
import argparse
from pathlib import Path
from collections import defaultdict


class KnowledgeGraphBuilder:
    def __init__(self, wiki_dir="../"):
        self.wiki_dir = Path(wiki_dir).resolve()
        self.distill_dir = self.wiki_dir / "distill"
        self.nodes = {}
        self.edges = []

    def extract_references(self, md_file):
        """从文件中提取引用关系"""
        content = md_file.read_text(encoding="utf-8")
        refs = {
            "internal_links": [],  # [XX](XX.md) 形式的内部链接
            "method_refs": [],      # [05 §X] 或 [05] 形式的方法论引用
            "source_citations": [], # [来源：xxx] 形式的来源引用
        }

        # 内部链接：如 [06 A1](06_场景SOP-决策判断.md)
        link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+\.md)\)')
        for match in link_pattern.finditer(content):
            refs["internal_links"].append(match.group(2))

        # 方法论引用：如 [05 §2] 或 [05]
        method_pattern = re.compile(r'\[(\d+)(?:\s*§\s*([^\]]+))?\]')
        for match in method_pattern.finditer(content):
            refs["method_refs"].append(match.group(1))

        # 来源引用
        source_pattern = re.compile(r'\[来源[：:]\s*([^\]]+)\]')
        for match in source_pattern.finditer(content):
            refs["source_citations"].append(match.group(1))

        return refs

    def build_graph(self):
        """构建图谱"""
        if not self.distill_dir.exists():
            print(f"❌ distill/目录不存在")
            return

        # 先建立所有节点
        for md_file in sorted(self.distill_dir.glob("*.md")):
            doc_id = md_file.stem.split("_")[0]  # 如 "05" 从 "05_方法论体系.md"
            title = md_file.stem.split("_", 1)[1] if "_" in md_file.stem else md_file.stem
            self.nodes[doc_id] = {
                "id": doc_id,
                "file": md_file.name,
                "title": title,
                "type": self._classify_doc(title),
            }

        # 再建立边（引用关系）
        for md_file in sorted(self.distill_dir.glob("*.md")):
            doc_id = md_file.stem.split("_")[0]
            refs = self.extract_references(md_file)

            # 内部链接 -> 边
            for target_file in refs["internal_links"]:
                target_id = target_file.replace(".md", "").split("_")[0]
                if target_id in self.nodes and target_id != doc_id:
                    self.edges.append({
                        "from": doc_id,
                        "to": target_id,
                        "type": "引用",
                        "label": "参见",
                    })

            # 方法论引用 -> 边（指向05方法论体系）
            for method_id in refs["method_refs"]:
                if method_id in self.nodes and method_id != doc_id:
                    self.edges.append({
                        "from": doc_id,
                        "to": method_id,
                        "type": "方法论调用",
                        "label": "调用",
                    })

    def _classify_doc(self, title):
        """分类文档类型"""
        if any(k in title for k in ["制度", "权责", "规范"]):
            return "制度层"
        elif any(k in title for k in ["方法论", "体系"]):
            return "方法论层"
        elif any(k in title for k in ["场景", "SOP", "执行", "工具", "模板", "清单"]):
            return "执行层"
        elif any(k in title for k in ["AI", "知识库", "索引", "导航"]):
            return "支撑层"
        return "其他"

    def to_mermaid(self):
        """生成Mermaid流程图格式"""
        lines = ["```mermaid", "graph TD"]

        # 按类型分组
        type_colors = {
            "制度层": "#e1f5fe",
            "方法论层": "#fff3e0",
            "执行层": "#e8f5e9",
            "支撑层": "#f3e5f5",
        }

        # 节点定义
        for node_id, node in self.nodes.items():
            color = type_colors.get(node["type"], "#ffffff")
            lines.append(f'    {node_id}["{node_id} {node["title"][:12]}"]')

        # 子图分组
        for doc_type in ["制度层", "方法论层", "执行层", "支撑层"]:
            type_nodes = [n["id"] for n in self.nodes.values() if n["type"] == doc_type]
            if type_nodes:
                lines.append(f"    subgraph {doc_type}")
                for nid in type_nodes:
                    lines.append(f"        {nid}")
                lines.append("    end")

        # 边
        for edge in self.edges:
            lines.append(f'    {edge["from"]} -->|{edge["label"]}| {edge["to"]}')

        lines.append("```")
        return "\n".join(lines)

    def to_json(self):
        """生成JSON格式"""
        return json.dumps({
            "nodes": list(self.nodes.values()),
            "edges": self.edges,
            "stats": {
                "node_count": len(self.nodes),
                "edge_count": len(self.edges),
            }
        }, ensure_ascii=False, indent=2)

    def to_summary(self):
        """生成文字摘要"""
        lines = ["=" * 50, "Wiki知识图谱摘要", "=" * 50]

        # 统计每个节点的入度和出度
        in_degree = defaultdict(int)
        out_degree = defaultdict(int)
        for edge in self.edges:
            out_degree[edge["from"]] += 1
            in_degree[edge["to"]] += 1

        lines.append(f"\n📊 总览: {len(self.nodes)}个节点, {len(self.edges)}条引用关系\n")

        lines.append("🔝 被引用最多的分册 (Top 5):")
        sorted_in = sorted(in_degree.items(), key=lambda x: x[1], reverse=True)[:5]
        for doc_id, count in sorted_in:
            title = self.nodes.get(doc_id, {}).get("title", doc_id)
            lines.append(f"   {doc_id} {title[:15]}... ← 被引用 {count} 次")

        lines.append("\n📤 引用最多的分册 (Top 5):")
        sorted_out = sorted(out_degree.items(), key=lambda x: x[1], reverse=True)[:5]
        for doc_id, count in sorted_out:
            title = self.nodes.get(doc_id, {}).get("title", doc_id)
            lines.append(f"   {doc_id} {title[:15]}... → 引用他人 {count} 次")

        lines.append("\n" + "=" * 50)
        return "\n".join(lines)

    def run(self, output_format="summary", output_file=None):
        """执行构建"""
        print("🔍 开始构建知识图谱...")
        self.build_graph()

        if output_format == "mermaid":
            result = self.to_mermaid()
        elif output_format == "json":
            result = self.to_json()
        else:
            result = self.to_summary()

        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(result)
            print(f"图谱已保存至: {output_file}")

        print(result)
        return result


def main():
    parser = argparse.ArgumentParser(description="Wiki知识图谱构建")
    parser.add_argument("--wiki-dir", default="../", help="Wiki根目录")
    parser.add_argument("--format", choices=["summary", "mermaid", "json"], default="summary", help="输出格式")
    parser.add_argument("--output", default=None, help="输出文件路径")
    args = parser.parse_args()

    builder = KnowledgeGraphBuilder(wiki_dir=args.wiki_dir)
    builder.run(output_format=args.format, output_file=args.output)


if __name__ == "__main__":
    main()
