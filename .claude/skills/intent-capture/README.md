# 意图捕获技能 — AI 增强版

> 通过 Enter 键自动截图 + AI 理解工作流，生成深度洞察

---

## 核心能力

| 能力 | 说明 | AI |
|------|------|-----|
| **Enter 监听** | 全局键盘监听，自动截图 | ❌ |
| **OCR 分析** | 提取屏幕文本 | ❌ |
| **基础分析** | 时间统计、应用分类 | ❌ |
| **工作流理解** | 理解"在做什么" | ✅ Claude |
| **智能洞察** | 问题识别 + 改进建议 | ✅ Claude |

---

## 一分钟安装

```bash
# 1. 进入技能目录
cd intent-capture

# 2. 运行安装脚本
bash scripts/install.sh

# 3. 授予辅助功能权限
# 系统设置 → 隐私与安全性 → 辅助功能 → 添加"终端"或"iTerm2"
```

---

## 快速开始

### 测试单次截图
```bash
~/.intent-capture/venv/bin/python scripts/listener.py --test
```

### 启动持续监听
```bash
~/.intent-capture/venv/bin/python scripts/listener.py
```
按 `Ctrl+C` 停止

### 分析截图
```bash
~/.intent-capture/venv/bin/python scripts/analyzer.py --analyze
```

### 深度分析
```bash
~/.intent-capture/venv/bin/python scripts/deep_analyzer.py
```

### AI 增强分析（⭐ 核心价值）
```bash
# 设置 API Key
export ANTHROPIC_API_KEY="your-key-here"

# AI 深度理解
~/.intent-capture/venv/bin/python scripts/ai_analyzer.py
```

**AI 分析输出**：
- 效率评分（0-100分）
- 工作节奏（高峰/低谷时段）
- 切换模式（碎片化分析）
- 打断分析（IM打断识别）
- 工作主题（关键词、领域）

### 查看趋势分析
```bash
~/.intent-capture/venv/bin/python scripts/deep_analyzer.py --trends
```

---

## 数据输出

所有数据保存在 `~/.intent-capture/`：

| 文件 | 内容 |
|------|------|
| `screenshots/` | 原始截图 |
| `timeline.jsonl` | 按键时间线 |
| `analyzed.jsonl` | 分析结果 |
| `summary.json` | 全天摘要 |
| `deep_report.json` | 深度分析报告 |
| `trend_report.json` | 趋势分析报告 |

---

## 查看摘要

```bash
cat ~/.intent-capture/summary.json | python3 -m json.tool
```

输出示例：
```json
{
  "date": "2026-03-28",
  "total_enters": 127,
  "top_intents": [["communication", 45], ["document_editing", 32]],
  "top_apps": [["飞书", 45], ["浏览器", 38]]
}
```

---

## 深度分析报告

```bash
~/.intent-capture/venv/bin/python scripts/deep_analyzer.py
```

输出示例：
```
============================================================
📊 深度工作流分析 — 2026-03-28
============================================================

🎯 效率评分: 75/100 (良好)
  专注度: 80/100
  连续性: 70/100
  活跃度: 75/100
  💡 建议: 尝试减少应用切换，专注单一任务

⏰ 工作节奏
  活跃时段: 8 小时
  🔥 高峰: 14点(23次) 10点(18次) 11点(15次)
  💤 低谷: 13点(2次) 18点(1次) 19点(0次)

🔄 切换与打断
  碎片化: 0.35 (中等)
  打断次数: 12
  打断率: 0.09

🎯 工作主题
  供应商: 45
  AI/技术: 32
  文档: 28
============================================================
```

### 趋势分析

```bash
~/.intent-capture/venv/bin/python scripts/deep_analyzer.py --trends
```

输出：
- 近7天效率趋势
- 平均碎片化程度
- 每日指标对比

---

## 意图分类

| 分类 | 说明 |
|------|------|
| `communication` | IM 沟通 |
| `search` | 信息搜索 |
| `reading` | 网页阅读 |
| `coding` | 代码编写 |
| `document_editing` | 文档编辑 |

---

## 注意事项

1. **隐私**：截图可能包含敏感信息，注意数据安全
2. **存储**：全天截图约 50-200MB，定期清理
3. **权限**：首次运行需授予辅助功能权限

---

## 故障排查

**问题**：监听器无法启动
**解决**：检查辅助功能权限是否已授予

**问题**：OCR 识别不准确
**解决**：正常现象，Tesseract 识别率约 60-70%

**问题**：中文无法识别
**解决**：等待 `tesseract-lang` 安装完成，或手动运行 `brew install tesseract-lang`

---

*灵感来源：AirJelly (黄柏特 / 李一豪)*
