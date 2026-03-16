# 供应商知识库建设 - 文档中心

## 项目导航

| 文档 | 用途 | 路径 |
|------|------|------|
| **prompt.md** | 需求边界 | `docs/prompt.md` |
| **plans.md** | 任务拆解 | `docs/plans.md` |
| **findings.md** | 数据发现 | `docs/findings.md` |
| **progress.md** | 进度追踪 | `docs/progress.md` |
| **documentation.md** | 文档中心（本文件） | `docs/documentation.md` |

## 产出物目录

```
docs/supplier-kb/
├── profiles/          # 供应商画像（17个MD文件）
│   ├── 中乾.md
│   ├── 锦瑞.md
│   └── ...
├── index/             # 索引文件
│   ├── supplier-index.md    # 主索引
│   ├── alias-mapping.md     # 别名映射
│   └── province-index.md    # 地理索引
└── templates/         # 模板
    └── supplier-profile-template.md
```

## 快速链接

- [供应商画像模板](#)
- [别名映射表](#)
- [会议纪要分析器集成](#)

## 使用指南

### 如何查找供应商

1. **通过简称**: 使用 `docs/supplier-kb/index/alias-mapping.md`
2. **通过省份**: 使用 `docs/supplier-kb/index/province-index.md`
3. **通过职场**: 搜索 `profiles/` 目录下的文件

### 如何更新画像

1. 修改对应供应商的 MD 文件
2. 同步更新 `supplier-index.md`
3. 提交并推送

## 集成说明

### 与会议纪要分析器集成

在分析会议时，自动匹配供应商简称：
```
输入: "中乾昨天汇报..."
输出: 自动关联 → docs/supplier-kb/profiles/中乾.md
```

### 与实时画像集成

在 `06-NOW.md` 中添加：
```markdown
## 供应商上下文
- 当前合作供应商: 17家
- 主力供应商: [待填充]
- 近期变动: [待关联daily记录]
```
