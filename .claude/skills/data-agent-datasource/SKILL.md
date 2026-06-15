---
name: data-agent-datasource
description: 访问 dataAgent 平台的数据源，支持获取数据源列表、数据库表、表结构和执行 SQL 查询。当用户需要查询 dataAgent 平台上注册的数据源、获取表结构、执行数据查询时使用此技能。
---

# Data Source Client Skill

这是一个用于访问 dataAgent 平台数据源的技能，支持以下四个核心能力：

## 使用方法

详细的使用说明和提问示例请参考：[README.md](./README.md)

**快速体验：**
- "有哪些数据源？" → 获取数据源列表
- "数据源 136 有哪些表？" → 获取表列表
- "app.adjust_config 表的字段结构" → 获取表结构
- "select * from app.table limit 10" → 执行 SQL 查询

## 支持的 API 能力

所有 API 请求都发送到：`http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction`

### 1. GET_MY_DATASOURCE
获取当前用户可用的数据源列表

**请求参数：**
- `action`: "GET_MY_DATASOURCE"

**响应结构：**
```json
{
  "code": 0,
  "msg": null,
  "requestId": "xxx",
  "data": {
    "datasourceList": [
      {"id": 56, "type": "MySql", "name": "autobots 测试", "remark": null}
    ],
    "tables": null,
    "tableColumns": null,
    "queryData": null
  }
}
```

**返回字段：**
- `data.datasourceList`: 数据源列表数组
- 每个数据源包含：`id` (数字), `type` (MySql/Presto/StarRocks/ClickHouse), `name`, `remark`

### 2. GET_DB_TABLES
获取指定数据源的数据库表列表

**支持两种请求方式：**

**方式 1：使用 datasourceId（普通数据源）**
```json
{
  "action": "GET_DB_TABLES",
  "datasourceId": 136
}
```

**方式 2：使用 marketCode + accountCode + dbName（大数据平台）**
```json
{
  "action": "GET_DB_TABLES",
  "marketCode": "mart_cfo",
  "accountCode": "mart_cfo_hr",
  "dbName": "app"
}
```

**响应结构：**
```json
{
  "code": 0,
  "msg": null,
  "requestId": "jmpjgHc8nnBXt9b6ksv1",
  "data": {
    "action": "GET_DB_TABLES",
    "datasourceList": null,
    "tables": [
      {
        "tableSchema": "app",
        "tableName": "app.adjust_config",
        "tableType": "0",
        "comments": "日记账中间表",
        "datasourceId": 2167
      }
    ],
    "tableColumns": null,
    "queryData": null
  }
}
```

**返回字段：**
- `data.tables`: 表列表数组
- 每个表包含：`tableSchema`, `tableName`, `tableType`, `comments`, `datasourceId`

**参数说明：**
- `marketCode`: 大数据市场代码（必填）
- `accountCode`: 账号代码（必填）
- `dbName`: 数据库名（可选，**默认为 "app"**）

---

### 3. GET_TABLE_SCHEMA
获取指定表的字段结构和元数据

**支持两种请求方式：**

**方式 1：使用 datasourceId（普通数据源）**
```json
{
  "action": "GET_TABLE_SCHEMA",
  "datasourceId": 1540,
  "tableName": "app.app_data_organization_all_jdl"
}
```

**方式 2：使用 marketCode + accountCode + dbName（大数据平台）**
```json
{
  "action": "GET_TABLE_SCHEMA",
  "marketCode": "mart_cfo",
  "accountCode": "mart_cfo_hr",
  "dbName": "app",
  "tableName": "app.app_data_organization_all_jdl"
}
```

**响应结构：**
```json
{
  "code": 0,
  "msg": null,
  "requestId": "zzo3zpDb2PMM0AwE9RW1",
  "data": {
    "action": "GET_TABLE_SCHEMA",
    "datasourceList": null,
    "tables": null,
    "tableColumns": [
      {
        "name": "organization_code",
        "dataType": "VARCHAR",
        "originDataType": "string",
        "columnLength": null,
        "nullable": true,
        "defaultValue": null,
        "comment": "机构 ID",
        "position": 1
      }
    ],
    "queryData": null
  }
}
```

**返回字段：**
- `data.tableColumns`: 字段结构数组
- 每个字段包含：`name`, `dataType`, `originDataType`, `columnLength`, `nullable`, `defaultValue`, `comment`, `position`

**参数说明：**
- `marketCode`: 大数据市场代码（必填）
- `accountCode`: 账号代码（必填）
- `dbName`: 数据库名（可选，**默认为 "app"**）

---

### 4. QUERY_DATA_BY_SQL
执行 SQL 查询语句获取数据

**支持两种请求方式：**

**方式 1：使用 datasourceId（普通数据源）**
```json
{
  "action": "QUERY_DATA_BY_SQL",
  "datasourceId": 1540,
  "sql": "select * from app.app_data_organization_all_jdl limit 10"
}
```

**方式 2：使用 marketCode + accountCode + dbName（大数据平台）**
```json
{
  "action": "QUERY_DATA_BY_SQL",
  "marketCode": "mart_cfo",
  "accountCode": "mart_cfo_hr",
  "dbName": "app",
  "sql": "select * from app.app_data_organization_all_jdl limit 10"
}
```

**响应结构：**
```json
{
  "code": 0,
  "msg": null,
  "requestId": "gYZym5hvm7YuE27aULQO",
  "data": {
    "action": "QUERY_DATA_BY_SQL",
    "datasourceList": null,
    "tables": null,
    "tableColumns": null,
    "queryData": [
      {
        "organization_code": "00001207",
        "organization_name": "北京图书音像仓 1 号库",
        "dt": "2024-10-26",
        ...
      },
      ...
    ]
  }
}
```

**返回字段：**
- `data.queryData`: 查询结果数组
- 每行数据是一个对象，Key 为列名，Value 为列值

**参数说明：**
- `marketCode`: 大数据市场代码（必填）
- `accountCode`: 账号代码（必填）
- `dbName`: 数据库名（可选，**默认为 "app"**）

## API 请求规范

### 认证方式
所有请求必须在 Cookie 中包含：
```
sso.jd.com=<SSO_TOKEN>
```

SSO_TOKEN 从环境变量 `SSO_TOKEN` 中获取。

### 请求格式
- 方法：POST
- Content-Type: application/json
- 请求体格式：JSON

### 响应处理
- 成功响应：包含数据结果的 JSON 对象
- 失败响应：包含错误信息的 JSON 对象

## 输出格式规范

### GET_MY_DATASOURCE - 数据源列表

使用 Markdown 表格格式展示：

| ID | 类型 | 名称 | 备注 |
|----|------|------|------|
| 56 | MySql | autobots 测试 | - |
| 76 | Presto | cwsj | - |

### GET_DB_TABLES - 表列表

使用 Markdown 表格格式展示：

| 库名 | 表名 | 类型 | 注释 |
|------|------|------|------|
| app | adjust_config | 视图 | 日记账中间表 |

### GET_TABLE_SCHEMA - 表结构

使用 Markdown 表格格式展示：

| 字段名 | 类型 | 长度 | 可空 | 注释 |
|--------|------|------|------|------|
| organization_code | VARCHAR | - | 是 | 机构 ID |

### QUERY_DATA_BY_SQL - 查询结果

使用 Markdown 表格格式展示，数据行过多时只显示前 100 行。

## 自动执行规则

### 直接执行，无需解释

当用户提问时，直接调用对应 API 并返回结果：

| 用户问题关键词 | 直接执行的 action |
|--------------|------------------|
| "有哪些数据源" / "数据源列表" / "可用的数据源" | `GET_MY_DATASOURCE` |
| "有哪些表" / "表列表" / "数据库表" | `GET_DB_TABLES` |
| "表结构" / "字段结构" / "列信息" | `GET_TABLE_SCHEMA` |
| "查询数据" / "执行 SQL" / "select" | `QUERY_DATA_BY_SQL` |

### 执行步骤

1. 从环境变量读取 `SSO_TOKEN`
2. 识别用户需求对应的 action 类型
3. 直接构造 POST 请求到 API 端点
4. 返回响应结果（无需解释）

## 安全限制

### SQL 白名单验证

执行 `QUERY_DATA_BY_SQL` 前必须验证 SQL 语句，**只允许 SELECT 查询**：

**允许的关键字（不区分大小写）：**
- `SELECT`
- `SHOW`
- `EXPLAIN`
- `WITH` (CTE 查询)

**禁止的关键字（出现任一即拒绝执行）：**
- `INSERT`
- `UPDATE`
- `DELETE`
- `DROP`
- `CREATE`
- `ALTER`
- `TRUNCATE`
- `REPLACE`
- `GRANT`
- `REVOKE`
- `EXEC`
- `EXECUTE`

**验证规则：**
1. SQL 必须以允许的关键字开头（忽略前导空格和注释）
2. SQL 中不能包含任何禁止的关键字
3. 拒绝执行不符合规则的 SQL，返回错误提示："仅支持 SELECT 查询语句，禁止执行修改/删除/创建等操作"

## 错误处理

常见的错误场景：
- SSO_TOKEN 缺失或无效：返回认证错误
- 数据源不存在：返回数据源未找到错误
- SQL 语法错误：返回 SQL 解析错误
- 权限不足：返回权限错误
- **未找到相关数据源信息**：返回空结果或无匹配数据

遇到错误时，应将详细的错误信息返回给用户，帮助用户定位问题。

### 无数据源信息时的引导提示

当用户调用 **GET_MY_DATASOURCE** 获取数据源列表时，如果返回结果为空（`datasourceList` 为空数组），或 API 返回错误提示找不到相关数据源时，**必须**友好地引导用户查看帮助文档：

**提示文案：**
> 未找到相关数据源信息。如需了解如何配置和添加数据源，请参考帮助文档：https://joyspace.jd.com/pages/J52hOLII2LaOVpgyb3XR

**触发场景：**
- GET_MY_DATASOURCE 返回 `datasourceList` 为空数组
- API 返回错误信息提示数据源不存在或未找到

## 示例调用

```bash
# 获取数据源列表
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "GET_MY_DATASOURCE"}'

# 获取表列表 - 方式 1: 使用 datasourceId
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "GET_DB_TABLES", "datasourceId": 136}'

# 获取表列表 - 方式 2: 使用大数据平台参数
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "GET_DB_TABLES", "marketCode": "mart_cfo", "accountCode": "mart_cfo_hr", "dbName": "app"}'

# 获取表结构 - 方式 1: 使用 datasourceId
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "GET_TABLE_SCHEMA", "datasourceId": 1540, "tableName": "app.app_data_organization_all_jdl"}'

# 获取表结构 - 方式 2: 使用大数据平台参数
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "GET_TABLE_SCHEMA", "marketCode": "mart_cfo", "accountCode": "mart_cfo_hr", "dbName": "app", "tableName": "app.app_data_organization_all_jdl"}'

# 执行 SQL 查询 - 方式 1: 使用 datasourceId
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "QUERY_DATA_BY_SQL", "datasourceId": 1540, "sql": "select * from app.app_data_organization_all_jdl limit 10"}'

# 执行 SQL 查询 - 方式 2: 使用大数据平台参数
curl -L -X POST http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction \
  -H "Content-Type: application/json" \
  -H "Cookie: sso.jd.com=$SSO_TOKEN" \
  -d '{"action": "QUERY_DATA_BY_SQL", "marketCode": "mart_cfo", "accountCode": "mart_cfo_hr", "dbName": "app", "sql": "select * from app.app_data_organization_all_jdl limit 10"}'
```
