---
input: 无
output: 测试用例库索引
pos: memory/active/tasks/test-suites/README.md
---

# 测试用例库 (Test Suites)

> **核心理念**：测试用例是核心资产，不是辅助工具。

---

## 目录结构

```
test-suites/
├── README.md                    # 本文件
├── TEMPLATE/                    # 模板
│   ├── spec.md                  # Spec 模板
│   ├── test-cases.md            # 测试用例模板
│   └── validation.sh            # 验证脚本模板
├── supplier-evaluation/         # 供应商评估测试集
│   ├── spec.md
│   ├── test-cases.md
│   └── implementation/
├── risk-alert/                 # 风险预警测试集
└── dashboard-kpi/              # Dashboard KPI 测试集
```

---

## 使用流程

```
1. 复制 TEMPLATE/ 到新目录
   ↓
2. 填写 spec.md（基于 spec-driven 技能）
   ↓
3. 拆解 test-cases.md
   ↓
4. AI 循环实现
   ↓
5. 验证通过后归档
```

---

## 测试集状态

| 测试集 | 状态 | 最后更新 |
|--------|------|----------|
| supplier-evaluation | 🟡 建设中 | 2026-02-28 |
| risk-alert | ⚪ 待建 | - |
| dashboard-kpi | ⚪ 待建 | - |

---

## 核心规则

1. **Spec 优先**：没有 Spec 不写测试
2. **一规则一测试**：每条业务规则对应至少一个测试
3. **可执行**：测试用例必须可执行（自动化或人工）
4. **版本绑定**：测试用例版本与 Spec 版本绑定

---

## 与技能配合

| 技能 | 用途 |
|------|------|
| **spec-driven** | 写 Spec + 拆解测试 |
| **tdd-agentic** | 基于测试实现 |
| **agentic-orchestration** | 多 Agent 协同 |

---

*测试用例是核心 IP，妥善保管。*
