# XSD Schemas已移除

## 说明
为节省存储空间，XSD schema文件已移除。

## 这些是什么
XSD (XML Schema Definition) 文件是Office文档格式（ISO/IEC 29500标准）的XML结构定义，用于：
- 解析.docx/.xlsx/.pptx文件内部结构
- 验证文档格式合规性
- 生成Office文档

## 为什么移除
1. **极少使用** - 供应商管理场景基本不涉及深度Office文档解析
2. **体积庞大** - 117个文件，占用数MB空间
3. **可重新获取** - 如需，可从官方下载

## 如何恢复（如需要）
```bash
# 从ISO标准下载
curl -O https://www.iso.org/standard/71691.html

# 或从ECMA标准下载
curl -O https://www.ecma-international.org/publications-and-standards/standards/ecma-376/
```

## 替代方案
如需处理Office文档，使用：
- Python: `openpyxl`, `python-docx`, `python-pptx`
- Node.js: `xlsx`, `docx` 等库
- 这些库已内置schema处理，无需原始XSD文件

---
*移除时间：2026-02-20*
