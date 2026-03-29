# intent-capture — 意图捕获

> 通过 Enter 键捕获用户意图，自动截图并分析全天工作流

---

## 核心灵感

源自 AirJelly 产品理念：**Enter 键是用户意图表达的"高光时刻"**。

---

## 功能

| 能力 | 说明 |
|------|------|
| **Enter 键监听** | 全局监听 Enter 键，自动触发截图 |
| **文本提取** | OCR 识别屏幕内容（支持中英文） |
| **意图推断** | 根据文本和应用推断用户活动 |
| **全天摘要** | 聚合分析，生成工作流报告 |

---

## 工作流

```
按下 Enter → 截图 → OCR 提取 → 意图分析 → 聚合摘要
```

---

## 安装依赖

### 快速安装（推荐）

```bash
bash .claude/skills/intent-capture/scripts/install.sh
```

### 手动安装

**macOS 注意**：系统 Python 有环境限制，需使用虚拟环境：

```bash
# 1. Tesseract OCR + 中文语言包
brew install tesseract tesseract-lang

# 2. 创建虚拟环境
python3 -m venv ~/.intent-capture/venv
source ~/.intent-capture/venv/bin/activate

# 3. Python 依赖
pip install pynput pillow

# 4. 退出虚拟环境（可选）
deactivate
```

---

## 使用方法

### 1. 启动监听

```bash
python3 .claude/skills/intent-capture/scripts/listener.py
```

**输出**：
- 截图保存：`~/.intent-capture/screenshots/`
- 时间线：`~/.intent-capture/timeline.jsonl`

**停止**：按 `Ctrl+C`

### 2. 分析截图

```bash
# 分析所有截图
python3 .claude/skills/intent-capture/scripts/analyzer.py --analyze

# 分析最近 10 张
python3 .claude/skills/intent-capture/scripts/analyzer.py --analyze -n 10

# 只生成摘要
python3 .claude/skills/intent-capture/scripts/analyzer.py --summary
```

**输出**：
- 分析结果：`~/.intent-capture/analyzed.jsonl`
- 全天摘要：`~/.intent-capture/summary.json`

### 3. 查看摘要

```bash
cat ~/.intent-capture/summary.json | python3 -m json.tool
```

---

## 输出示例

**时间线 (timeline.jsonl)**：
```json
{"time": "2026-03-28T10:23:45", "type": "enter_press", "screenshot": "/path/to/screenshot.png", "status": "captured"}
```

**分析结果 (analyzed.jsonl)**：
```json
{
  "time": "2026-03-28T10:23:45",
  "screenshot": "/path/to/screenshot.png",
  "text": "飞书 老板 AI提效方案...",
  "apps": ["飞书"],
  "intent": {"category": "communication", "description": "IM 沟通", "confidence": 0.7}
}
```

**全天摘要 (summary.json)**：
```json
{
  "date": "2026-03-28",
  "total_enters": 127,
  "top_intents": [["communication", 45], ["document_editing", 32]],
  "top_apps": [["飞书", 45], ["浏览器", 38]],
  "hourly_peak": ["2026-03-28T14", 23]
}
```

---

## 系统权限

macOS 需授予**辅助功能**权限：
1. 系统设置 → 隐私与安全性 → 辅助功能
2. 添加终端或 Python

---

## 数据存储

```
~/.intent-capture/
├── screenshots/          # 截图文件
├── timeline.jsonl        # 原始时间线
├── analyzed.jsonl        # 分析结果
└── summary.json          # 全天摘要
```

---

## 意图分类

| 分类 | 说明 | 触发条件 |
|------|------|----------|
| `communication` | IM 沟通 | 飞书、微信、钉钉 |
| `search` | 信息搜索 | 浏览器 + 搜索框 |
| `reading` | 网页阅读 | 浏览器 + 长文本 |
| `coding` | 代码编写 | VS Code、Terminal |
| `document_editing` | 文档编辑 | Word、Excel、PPT |

---

## 技术栈

| 组件 | 方案 |
|------|------|
| 键盘监听 | `pynput` |
| 截图 | `screencapture` (macOS) |
| OCR | `tesseract` + `chi_sim+eng` |
| 图像处理 | `Pillow` |

---

## 注意事项

1. **隐私敏感**：截图可能包含敏感信息，注意数据安全
2. **存储空间**：全天截图约 50-200MB，定期清理
3. **CPU 占用**：OCR 分析较耗时，建议非高峰期运行

---

## 版本

v1.0 — 2026-03-28

---

*灵感来源：AirJelly (黄柏特 / 李一豪)*
