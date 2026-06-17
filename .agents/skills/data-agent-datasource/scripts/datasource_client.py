#!/usr/bin/env python3
"""
Data Source CLI - API 调用辅助脚本

提供四个核心能力的封装：
1. GET_MY_DATASOURCE - 获取数据源列表
2. GET_DB_TABLES - 获取数据库表列表
3. GET_TABLE_SCHEMA - 获取表结构
4. QUERY_DATA_BY_SQL - 执行 SQL 查询
"""

import os
import json
import re
import requests
from typing import Optional, List, Dict, Any

BASE_URL = "http://da-api-99.jd.com/joy-claw-datasource/api/v1/datasourceAction"


def get_sso_token() -> str:
    """从环境变量获取 SSO_TOKEN"""
    token = os.environ.get("SSO_TOKEN")
    if not token:
        raise EnvironmentError("SSO_TOKEN 环境变量未设置")
    return token


def make_request(action: str, **params) -> Dict[str, Any]:
    """
    发送 API 请求
    
    Args:
        action: 动作类型 (GET_MY_DATASOURCE, GET_DB_TABLES, GET_TABLE_SCHEMA, QUERY_DATA_BY_SQL)
        **params: 其他请求参数
        
    Returns:
        API 响应数据
    """
    token = get_sso_token()
    headers = {
        "Content-Type": "application/json",
        "Cookie": f"sso.jd.com={token}"
    }
    
    payload = {"action": action, **params}
    
    response = requests.post(
        BASE_URL,
        headers=headers,
        json=payload,
        timeout=30
    )
    
    response.raise_for_status()
    return response.json()


def get_my_datasource() -> Dict[str, Any]:
    """
    获取当前用户可用的数据源列表
    
    Returns:
        数据源列表信息
    """
    return make_request("GET_MY_DATASOURCE")


def get_db_tables(datasource_id: int = None, market_code: str = None, account_code: str = None, db_name: str = "app", **extra_params) -> Dict[str, Any]:
    """
    获取指定数据源的数据库表列表
    
    支持两种请求方式：
    1. 使用 datasourceId 查询普通数据源
    2. 使用 marketCode + accountCode + dbName 查询大数据平台
    
    Args:
        datasource_id: 数据源 ID（数字类型），方式 1 使用
        market_code: 市场代码，方式 2 使用
        account_code: 账号代码，方式 2 使用
        db_name: 数据库名，方式 2 使用（可选，默认为 "app"）
        **extra_params: 其他可选参数
        
    Returns:
        表列表信息
    """
    if datasource_id is not None:
        return make_request("GET_DB_TABLES", datasourceId=datasource_id, **extra_params)
    elif market_code is not None and account_code is not None:
        return make_request("GET_DB_TABLES", marketCode=market_code, accountCode=account_code, dbName=db_name, **extra_params)
    else:
        raise ValueError("需要提供 datasourceId 或 (marketCode + accountCode)")


def get_table_schema(datasource_id: int = None, market_code: str = None, account_code: str = None, db_name: str = "app", table_name: str = None, **extra_params) -> Dict[str, Any]:
    """
    获取指定表的字段结构和元数据
    
    支持两种请求方式：
    1. 使用 datasourceId + tableName 查询普通数据源
    2. 使用 marketCode + accountCode + dbName + tableName 查询大数据平台
    
    Args:
        datasource_id: 数据源 ID（数字类型），方式 1 使用
        market_code: 市场代码，方式 2 使用
        account_code: 账号代码，方式 2 使用
        db_name: 数据库名，方式 2 使用（可选，默认为 "app"）
        table_name: 表名（必填）
        **extra_params: 其他可选参数
        
    Returns:
        表结构信息
    """
    if datasource_id is not None and table_name is not None:
        return make_request("GET_TABLE_SCHEMA", datasourceId=datasource_id, tableName=table_name, **extra_params)
    elif market_code is not None and account_code is not None and table_name is not None:
        return make_request("GET_TABLE_SCHEMA", marketCode=market_code, accountCode=account_code, dbName=db_name, tableName=table_name, **extra_params)
    else:
        raise ValueError("需要提供 (datasourceId + tableName) 或 (marketCode + accountCode + tableName)")


def validate_select_sql(sql: str) -> bool:
    """
    验证 SQL 是否为只读查询 (SELECT/SHOW/EXPLAIN/WITH)
    
    Args:
        sql: SQL 语句
        
    Returns:
        是否为合法的只读查询
    """
    if not sql:
        return False
    
    sql_upper = sql.strip().upper()
    
    # 移除注释 (-- 和 /* */ 注释)
    sql_upper = re.sub(r'--.*$', '', sql_upper, flags=re.MULTILINE)
    sql_upper = re.sub(r'/\*.*?\*/', '', sql_upper, flags=re.DOTALL)
    sql_upper = sql_upper.strip()
    
    # 检查是否以允许的关键字开头
    allowed_starts = ["SELECT", "SHOW", "EXPLAIN", "WITH"]
    if not any(sql_upper.startswith(kw) for kw in allowed_starts):
        return False
    
    # 检查是否包含禁止的关键字
    forbidden_keywords = [
        r'\bINSERT\b', r'\bUPDATE\b', r'\bDELETE\b', r'\bDROP\b',
        r'\bCREATE\b', r'\bALTER\b', r'\bTRUNCATE\b',
        r'\bGRANT\b', r'\bREVOKE\b', r'\bEXEC\b', r'\bEXECUTE\b'
    ]
    
    for keyword in forbidden_keywords:
        if re.search(keyword, sql_upper):
            return False
    
    return True


def query_data_by_sql(datasource_id: int = None, market_code: str = None, account_code: str = None, db_name: str = "app", sql: str = None, **extra_params) -> Dict[str, Any]:
    """
    执行 SQL 查询语句获取数据（仅支持 SELECT）
    
    支持两种请求方式：
    1. 使用 datasourceId + sql 查询普通数据源
    2. 使用 marketCode + accountCode + dbName + sql 查询大数据平台
    
    Args:
        datasource_id: 数据源 ID（数字类型），方式 1 使用
        market_code: 市场代码，方式 2 使用
        account_code: 账号代码，方式 2 使用
        db_name: 数据库名，方式 2 使用（可选，默认为 "app"）
        sql: SQL 查询语句（必须是 SELECT 语句）
        **extra_params: 其他可选参数
        
    Returns:
        查询结果数据，queryData 是对象数组，每行是一个 {列名：值} 对象
        
    Raises:
        ValueError: 当 SQL 不是 SELECT 语句时抛出
    """
    if not validate_select_sql(sql):
        raise ValueError("仅支持 SELECT 查询语句，不允许执行修改操作")
    
    if datasource_id is not None and sql is not None:
        return make_request("QUERY_DATA_BY_SQL", datasourceId=datasource_id, sql=sql, **extra_params)
    elif market_code is not None and account_code is not None and sql is not None:
        return make_request("QUERY_DATA_BY_SQL", marketCode=market_code, accountCode=account_code, dbName=db_name, sql=sql, **extra_params)
    else:
        raise ValueError("需要提供 (datasourceId + sql) 或 (marketCode + accountCode + sql)")


def list_datasources() -> List[Dict[str, Any]]:
    """
    便捷函数：获取数据源列表并返回格式化结果
    
    Returns:
        数据源列表，每个数据源包含 id、name、type 等信息
        
    Raises:
        RuntimeError: 当 API 返回错误码时抛出
    """
    try:
        result = get_my_datasource()
        if isinstance(result, dict):
            # 检查响应码
            if result.get("code") != 0:
                msg = result.get("msg") or result.get("message", "未知错误")
                raise RuntimeError(f"获取数据源失败：{msg}")
            # 解析实际的数据路径：data.datasourceList
            data = result.get("data", {})
            if isinstance(data, dict):
                datasource_list = data.get("datasourceList", [])
                # 如果数据源列表为空，输出引导提示
                if not datasource_list:
                    print("未找到相关数据源信息。如需了解如何配置和添加数据源，请参考帮助文档：https://joyspace.jd.com/pages/J52hOLII2LaOVpgyb3XR")
                return datasource_list
            return []
        return result if isinstance(result, list) else []
    except Exception as e:
        print(f"获取数据源列表失败：{e}")
        return []


def list_tables(datasource_id: int = None, market_code: str = None, account_code: str = None, db_name: str = None) -> List[Dict[str, Any]]:
    """
    便捷函数：获取表列表并返回格式化结果
    
    支持两种请求方式：
    1. 使用 datasourceId 查询普通数据源
    2. 使用 marketCode + accountCode + dbName 查询大数据平台
    
    Args:
        datasource_id: 数据源 ID（数字类型），方式 1 使用
        market_code: 市场代码，方式 2 使用
        account_code: 账号代码，方式 2 使用
        db_name: 数据库名，方式 2 使用
        
    Returns:
        表列表，每个表包含 tableName、tableSchema、comments 等信息
    """
    try:
        result = get_db_tables(
            datasource_id=datasource_id,
            market_code=market_code,
            account_code=account_code,
            db_name=db_name
        )
        if isinstance(result, dict):
            if result.get("code") != 0:
                msg = result.get("msg") or result.get("message", "未知错误")
                raise RuntimeError(f"获取表列表失败：{msg}")
            data = result.get("data", {})
            if isinstance(data, dict):
                return data.get("tables", [])
            return []
        return result if isinstance(result, list) else []
    except Exception as e:
        print(f"获取表列表失败：{e}")
        return []


def get_table_info(datasource_id: int = None, market_code: str = None, account_code: str = None, db_name: str = None, table_name: str = None) -> Optional[Dict[str, Any]]:
    """
    便捷函数：获取表结构信息
    
    支持两种请求方式：
    1. 使用 datasourceId + tableName 查询普通数据源
    2. 使用 marketCode + accountCode + dbName + tableName 查询大数据平台
    
    Args:
        datasource_id: 数据源 ID（数字类型），方式 1 使用
        market_code: 市场代码，方式 2 使用
        account_code: 账号代码，方式 2 使用
        db_name: 数据库名，方式 2 使用
        table_name: 表名（必填）
        
    Returns:
        表结构信息，包含字段列表、主键等
    """
    try:
        return get_table_schema(
            datasource_id=datasource_id,
            market_code=market_code,
            account_code=account_code,
            db_name=db_name,
            table_name=table_name
        )
    except Exception as e:
        print(f"获取表结构失败：{e}")
        return None


if __name__ == "__main__":
    # 测试代码
    if not os.environ.get("SSO_TOKEN"):
        print("请设置 SSO_TOKEN 环境变量")
        exit(1)
    
    print("=== 获取数据源列表 ===")
    datasources = list_datasources()
    print(f"找到 {len(datasources)} 个数据源")
    for ds in datasources[:5]:  # 只显示前 5 个
        print(f"  - {ds.get('name', 'N/A')} (ID: {ds.get('id', 'N/A')})")
    
    if datasources:
        first_ds_id = datasources[0].get("id")
        if first_ds_id:
            print(f"\n=== 获取数据源 {first_ds_id} 的表列表 ===")
            tables = list_tables(first_ds_id)
            print(f"找到 {len(tables)} 个表")
            for tbl in tables[:5]:  # 只显示前 5 个
                print(f"  - {tbl.get('tableName', 'N/A')}")
