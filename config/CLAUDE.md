---
input: [外部服务配置需求]
output: [可用的 API 配置、快捷函数]
pos: config 目录，存放外部服务配置
---

# CLAUDE.md — CONFIG

> 外部服务配置与 API 凭证

---

## Summary

存放项目所需的外部服务配置：
- MCP 服务器配置
- API 凭证与快捷函数

---

## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |
| `getnote-api.sh` | Get 笔记 API 凭证 + 快捷函数 |
| `mcporter.json` | MCP 服务器配置（Exa 搜索） |

---

## 使用方式

**Get 笔记 API**：
```bash
source config/getnote-api.sh
getnote_list          # 列出笔记
getnote_search "关键词" # 搜索笔记
getnote_save "标题" "内容" # 保存笔记
```

---

*最后更新：2026-03-13*
