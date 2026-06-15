# Data Agent Datasource Skill 使用文档

## 技能简介

这是一个用于访问 dataAgent 平台数据源的技能，支持查询数据源列表、数据库表、表结构和执行 SQL 查询。

---

## 1. 获取数据源列表

**你可以这样问：**
- "有哪些数据源？"
- "帮我看看有哪些可用的数据源"
- "数据源列表"
- "我有哪些数据源可以访问？"

**空结果提示：**
如果未找到数据源，会提示你查看帮助文档：
> 未找到相关数据源信息。如需了解如何配置和添加数据源，请参考帮助文档：https://joyspace.jd.com/pages/J52hOLII2LaOVpgyb3XR

---

## 2. 获取表列表

**你可以这样问：**
- "数据源 136 有哪些表？"
- "mart_cfo_hr 的 app 库有哪些表？"
- "帮我查一下数据源的表列表"
- "有哪些数据库表？"

---

## 3. 获取表结构

**你可以这样问：**
- "表 app.adjust_config 的结构是什么？"
- "帮我看看 adjust_config 表的字段信息"
- "app.app_data_organization_all_jdl 的字段结构"
- "这个表的列信息有哪些？"

---

## 4. 执行 SQL 查询

**你可以这样问：**
- "查询数据源 1540 的表，select * from app.adjust_config limit 10"
- "帮我执行这个 SQL：select count(*) from app.user_info"
- "查一下 mart_cfo_hr 的 app 表，select * from app.orders where dt='2024-01-01'"
- "执行 SQL 查询：show tables"

**SQL 安全限制：**
- ✅ 允许：`SELECT`, `SHOW`, `EXPLAIN`, `WITH`
- ❌ 禁止：`INSERT`, `UPDATE`, `DELETE`, `DROP`, `CREATE`, `ALTER`, `TRUNCATE`

---

## 使用示例

### 示例 1：查询数据源列表
```
用户：有哪些数据源？
```

### 示例 2：查询某数据源的表
```
用户：数据源 136 有哪些表？
```

### 示例 3：查询大数据平台的表
```
用户：mart_cfo_hr 的 app 库有哪些表？
```

### 示例 4：查询表结构
```
用户：app.adjust_config 表的字段结构是什么？
```

### 示例 5：执行 SQL 查询
```
用户：select * from app.user_info limit 10
```

---

## 注意事项

1. **认证要求**：需要设置 `SSO_TOKEN` 环境变量
2. **SQL 安全**：仅支持 SELECT 查询，禁止修改/删除/创建操作
3. **默认数据库**：使用大数据平台参数时，`dbName` 默认为 `app`
4. **空结果处理**：查询数据源列表为空时会提供帮助文档链接

