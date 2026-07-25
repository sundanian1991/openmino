# page-list

一个轻量的 AI 页面拆解 Skill：将需求文档、PRD、技术规格书或功能清单，快速转换为可供 AI 生成原型的 Page List Excel。

## 输入与输出

```text
需求文档 / PRD / 技术规格书
              ↓
      page-list.xlsx
```

默认只输出 `page-list.xlsx`。

## 目录

```text
page-list/
├── SKILL.md
├── README.md
├── references/
│   └── page-list-guide.md
└── assets/
    └── page-list-schema.json
```

## 使用边界

- `page-list` 负责需求到页面清单的拆解；
- `page-list-schema.json` 定义页面清单的字段顺序、字段含义和示例；
- PRD 可以作为输入材料，但不由本 Skill 生成；
- 优先输出 `page-list.xlsx`，无法生成 Excel 时输出 `page-list.csv`；
