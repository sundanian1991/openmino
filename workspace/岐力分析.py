#!/usr/bin/env python3
"""岐力职场人力分析 - 2026-05-14"""

import pandas as pd
import json
from datetime import datetime, timedelta
from collections import defaultdict

# === 读取与清洗 ===
df = pd.read_csv('岐力职场人力分析-20260514.csv', encoding='utf-8-sig')
df.columns = df.columns.str.strip()

# 排除袁爱珍（主管，只开账户无外呼）
df = df[df['坐席名称'] != '袁爱珍'].copy()

# 解析日期
REFERENCE_DATE = datetime(2026, 5, 12)

df['首次外呼'] = pd.to_datetime(df['金条业务首次外呼日期'], errors='coerce')
df['最后外呼'] = pd.to_datetime(df['最近一次有效外呼时间'], errors='coerce')

# 计算时间差：5月12日 - 最后外呼时间（天数）
df['离线天数'] = df['最后外呼'].apply(
    lambda x: (REFERENCE_DATE - x).days if pd.notna(x) else None
)

# 判断状态：5月12日有外呼 = 在职
# 最后外呼日期是5月12日的算在职
df['是否在职'] = df['最后外呼'].apply(
    lambda x: x.date() == REFERENCE_DATE.date() if pd.notna(x) else False
)

# 入职月份
df['入职月'] = df['首次外呼'].apply(lambda x: x.strftime('%Y-%m') if pd.notna(x) else None)

# 在职天数（从首次外呼到5月12日）
df['在职天数'] = df['首次外呼'].apply(
    lambda x: (REFERENCE_DATE - x).days if pd.notna(x) else None
)

# GMV（万）
df['复贷GMV万'] = pd.to_numeric(df['复贷GMV(万)'], errors='coerce').fillna(0)
df['T0复贷GMV万'] = pd.to_numeric(df['T0复贷GMV(万)'], errors='coerce').fillna(0)

# 复贷订单数
df['复贷订单数'] = pd.to_numeric(df['近30日累计转化复贷订单数'], errors='coerce').fillna(0)

# 分组
in_service = df[df['是否在职']].copy()
churned = df[~df['是否在职']].copy()

total = len(df)
in_count = len(in_service)
churn_count = len(churned)

print(f"=== 基础数据 ===")
print(f"总人数（排除袁爱珍）: {total}")
print(f"在职人数（5月12日有外呼）: {in_count}")
print(f"流失人数: {churn_count}")
print(f"流失率: {churn_count/total*100:.1f}%")

# === 1. 按月入职趋势 ===
print(f"\n=== 按月入职趋势 ===")
monthly_hire = df.groupby('入职月').size().sort_index()
for month, count in monthly_hire.items():
    print(f"  {month}: {count}人")

# === 2. 当月在职人数趋势 ===
# 定义：截至每个月最后一天，在职人数 = 当月及之前入职 - 当月及之前流失
print(f"\n=== 月度在职人数趋势 ===")
# 流失月份 = 最后外呼月份
churned_copy = churned.copy()
churned_copy['流失月'] = churned_copy['最后外呼'].apply(
    lambda x: x.strftime('%Y-%m') if pd.notna(x) else None
)

all_months = sorted(set(
    list(df['入职月'].dropna().unique()) +
    list(churned_copy['流失月'].dropna().unique())
))

monthly_active = {}
for month in all_months:
    hired_by = df[df['入职月'] <= month].shape[0]
    churned_by = churned_copy[churned_copy['流失月'] <= month].shape[0]
    monthly_active[month] = hired_by - churned_by

for month in sorted(monthly_active.keys()):
    print(f"  {month}: {monthly_active[month]}人在职")

# === 3. 在职人员司龄结构 ===
print(f"\n=== 在职人员司龄结构 ===")
# 按在职天数分段
def tenure_bucket(days):
    if days <= 30: return '0-30天'
    elif days <= 60: return '31-60天'
    elif days <= 90: return '61-90天'
    elif days <= 180: return '91-180天'
    elif days <= 365: return '181-365天'
    else: return '365天+'

in_service['司龄段'] = in_service['在职天数'].apply(tenure_bucket)
tenure_dist = in_service['司龄段'].value_counts()
# 排序
bucket_order = ['0-30天', '31-60天', '61-90天', '91-180天', '181-365天', '365天+']
for b in bucket_order:
    if b in tenure_dist:
        print(f"  {b}: {tenure_dist[b]}人")

# === 4. 在职人员人均复贷GMV ===
print(f"\n=== 在职人员人均复贷GMV ===")
avg_gmv = in_service['复贷GMV万'].mean()
total_gmv = in_service['复贷GMV万'].sum()
print(f"  人均复贷GMV: {avg_gmv:.2f}万")
print(f"  总复贷GMV: {total_gmv:.2f}万")
print(f"  人均T0复贷GMV: {in_service['T0复贷GMV万'].mean():.2f}万")

# === 5. 流失人员在职天数分布 ===
print(f"\n=== 流失人员在职天数分布 ===")
churned['流失司龄段'] = churned['在职天数'].apply(tenure_bucket)
churn_tenure = churned['流失司龄段'].value_counts()
for b in bucket_order:
    if b in churn_tenure:
        print(f"  {b}: {churn_tenure[b]}人")

# === 6. 流失人员司龄分布 ===
# 这个和上面一样，但按原始司龄分段字段
print(f"\n=== 流失人员原始司龄分段 ===")
churn_tenure_orig = churned['司龄分段'].value_counts()
for seg, cnt in churn_tenure_orig.items():
    print(f"  {seg}: {cnt}人")

# === 7. 各司龄流失率 ===
print(f"\n=== 各司龄流失率 ===")
df['司龄段'] = df['在职天数'].apply(tenure_bucket)
for b in bucket_order:
    bucket_df = df[df['司龄段'] == b]
    if len(bucket_df) > 0:
        churn_rate = len(bucket_df[~bucket_df['是否在职']]) / len(bucket_df) * 100
        print(f"  {b}: {len(bucket_df)}人, 流失{len(bucket_df[~bucket_df['是否在职']])}人, 流失率{churn_rate:.1f}%")

# === 8. 在职人员按入职月人均GMV ===
print(f"\n=== 在职人员按入职月人均GMV ===")
in_by_month = in_service.groupby('入职月').agg(
    人均GMV=('复贷GMV万', 'mean'),
    人数=('坐席id', 'count'),
    总GMV=('复贷GMV万', 'sum')
).sort_index()
for month, row in in_by_month.iterrows():
    print(f"  {month}: 人均{row['人均GMV']:.2f}万, {int(row['人数'])}人, 总{row['总GMV']:.2f}万")

# === 9. 流失人员明细 ===
print(f"\n=== 流失人员明细（按最后外呼时间倒序）===")
churn_detail = churned[['坐席名称', '入职月', '在职天数', '离线天数',
                         '复贷GMV万', 'T0复贷GMV万', '复贷订单数',
                         '最后外呼', '参评排名', '等级', '司龄分段']].copy()
churn_detail = churn_detail.sort_values('最后外呼', ascending=False)
for _, row in churn_detail.iterrows():
    last_call = row['最后外呼'].strftime('%m-%d') if pd.notna(row['最后外呼']) else '无'
    rank = int(row['参评排名']) if pd.notna(row['参评排名']) else '-'
    level = row['等级'] if pd.notna(row['等级']) else '-'
    print(f"  {row['坐席名称']} | 入职{row['入职月']} | 在职{row['在职天数']}天 | 离线{row['离线天数']}天 | GMV{row['复贷GMV万']:.1f}万 | T0{row['T0复贷GMV万']:.1f}万 | 订单{int(row['复贷订单数'])} | 最后外呼{last_call} | 排名{rank} | {level} | {row['司龄分段']}")

# === 输出JSON给可视化用 ===
output = {
    'summary': {
        'total': total,
        'in_service': in_count,
        'churned': churn_count,
        'churn_rate': round(churn_count/total*100, 1),
        'avg_gmv_in_service': round(float(avg_gmv), 2),
        'total_gmv_in_service': round(float(total_gmv), 2)
    },
    'monthly_hire': {str(k): int(v) for k, v in monthly_hire.items()},
    'monthly_active': {str(k): int(v) for k, v in monthly_active.items()},
    'tenure_in_service': {b: int(tenure_dist.get(b, 0)) for b in bucket_order},
    'tenure_churned': {b: int(churn_tenure.get(b, 0)) for b in bucket_order},
    'churn_rate_by_tenure': {},
    'monthly_avg_gmv': {},
    'churn_scatter': [],
    'churn_detail': []
}

for b in bucket_order:
    bucket_df = df[df['司龄段'] == b]
    if len(bucket_df) > 0:
        churn_rate = len(bucket_df[~bucket_df['是否在职']]) / len(bucket_df) * 100
        output['churn_rate_by_tenure'][b] = {
            'total': len(bucket_df),
            'churned': len(bucket_df[~bucket_df['是否在职']]),
            'rate': round(churn_rate, 1)
        }

for month, row in in_by_month.iterrows():
    output['monthly_avg_gmv'][str(month)] = {
        'avg_gmv': round(float(row['人均GMV']), 2),
        'count': int(row['人数']),
        'total_gmv': round(float(row['总GMV']), 2)
    }

for _, row in churned.iterrows():
    output['churn_scatter'].append({
        'name': row['坐席名称'],
        'tenure_days': int(row['在职天数']) if pd.notna(row['在职天数']) else 0,
        'gmv': round(float(row['复贷GMV万']), 2),
        't0_gmv': round(float(row['T0复贷GMV万']), 2)
    })

for _, row in churn_detail.iterrows():
    output['churn_detail'].append({
        'name': row['坐席名称'],
        'hire_month': str(row['入职月']),
        'tenure_days': int(row['在职天数']) if pd.notna(row['在职天数']) else 0,
        'offline_days': int(row['离线天数']) if pd.notna(row['离线天数']) else 0,
        'gmv': round(float(row['复贷GMV万']), 2),
        't0_gmv': round(float(row['T0复贷GMV万']), 2),
        'orders': int(row['复贷订单数']),
        'last_call': row['最后外呼'].strftime('%Y-%m-%d') if pd.notna(row['最后外呼']) else '无',
        'rank': int(row['参评排名']) if pd.notna(row['参评排名']) else None,
        'level': str(row['等级']) if pd.notna(row['等级']) else None,
        'tenure_seg': str(row['司龄分段'])
    })

with open('岐力分析结果.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"\n结果已保存到 岐力分析结果.json")
