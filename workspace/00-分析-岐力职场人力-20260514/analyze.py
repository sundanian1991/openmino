#!/usr/bin/env python3
"""岐力职场人力分析 — 完整分析脚本"""

import pandas as pd
import numpy as np

df = pd.read_csv('/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/岐力职场人力分析-20260514.csv')

# ── 数值列统一处理 ──
num_cols = ['近30天累计通时（秒）', '近30天累计有效通时', '近30天外呼天数（通话时长>30分钟天数）',
            '近30日累计转化首贷用户数', '近30日累计转化首贷GMV', '近30日累计转化t0首贷GMV',
            '近30日累计转化复贷用户数', '近30日累计转化复贷订单数', '近30日累计转化复贷GMV',
            '近30日累计转化t0复贷GMV', '近30日累计转化GMV', '接通用户数', '接通话单数',
            '有效接通数话单数', '个人ATT(秒)', '复贷GMV(万)', '件均金额(元)', 'T0复贷GMV(万)',
            '日均有效通时(分钟)', '金条业务线在职日期', '210客户池在职天数']
for c in num_cols:
    df[c] = pd.to_numeric(df[c], errors='coerce').fillna(0)

# 有效接通率 = 有效接通数话单数 / 接通话单数
df['有效接通率'] = np.where(df['接通话单数'] > 0, df['有效接通数话单数'] / df['接通话单数'], 0)

# 预警标记
df['预警_超7天'] = (df['超7天未上线'] == '是')
df['预警_外呼不足'] = (df['外呼天数不足22天'] == '是')
df['预警_连续3天'] = (df['连续3天未上线预警'] == '是')
df['有外呼天数'] = df['近30天外呼天数（通话时长>30分钟天数）'] > 0
df['有GMV'] = df['近30日累计转化GMV'] > 0
df['有参评'] = df['是否参评'] == '是'

mob_order = ['MOB1-', 'MOB1-3', 'MOB3-6', 'MOB6-12']

# ════════════════════════════════════════════════
print("=" * 70)
print("岐力职场人力分析报告 — 2026年5月")
print("=" * 70)

# ── 1. 人力结构 ──
print("\n" + "=" * 70)
print("一、人力结构分析")
print("=" * 70)

print(f"\n总坐席: {len(df)} 人")
print(f"司龄分段分布:")
for m in mob_order:
    n = len(df[df['司龄分段'] == m])
    pct = n / len(df) * 100
    print(f"  {m}: {n}人 ({pct:.1f}%)")

print(f"\n等级分布:")
total_rated = len(df[df['有参评']])
for g in ['S', 'A', 'B', 'C']:
    n = len(df[df['等级'] == g])
    gmv_sum = df[df['等级'] == g]['近30日累计转化GMV'].sum()
    total_gmv = df['近30日累计转化GMV'].sum()
    gmv_pct = gmv_sum / total_gmv * 100 if total_gmv > 0 else 0
    print(f"  {g}: {n}人, GMV贡献占比 {gmv_pct:.1f}%")
n_non = len(df[df['等级'] == '非参评'])
non_gmv = df[df['等级'] == '非参评']['近30日累计转化GMV'].sum()
non_pct = non_gmv / total_gmv * 100 if total_gmv > 0 else 0
print(f"  非参评: {n_non}人, GMV贡献占比 {non_pct:.1f}%")

# 各分段人均指标
print(f"\n各分段人均指标:")
print(f"  {'分段':<8} {'人数':>4} {'人均GMV(万)':>12} {'人均有效通时(分)':>16} {'人均接通率':>10} {'有产出率':>10}")
for m in mob_order:
    sub = df[df['司龄分段'] == m]
    n = len(sub)
    avg_gmv = sub['近30日累计转化GMV'].sum() / n
    avg_eff = sub['近30天累计有效通时'].sum() / n / 60  # 秒转分钟
    avg_rr = sub['有效接通率'].mean() * 100
    prod_rate = (sub['有GMV'].sum() / n) * 100
    print(f"  {m:<8} {n:>4} {avg_gmv:>12,.0f} {avg_eff:>16,.1f} {avg_rr:>9.1f}% {prod_rate:>9.1f}%")

# ── 2. 出勤/活跃度 ──
print("\n" + "=" * 70)
print("二、出勤/活跃度分析")
print("=" * 70)

# 外呼天数分布
days = df['近30天外呼天数（通话时长>30分钟天数）']
print(f"\n近30天外呼天数分布:")
for band in [(22, 99), (18, 21), (15, 17), (8, 14), (1, 7), (0, 0)]:
    mask = (days >= band[0]) & (days <= band[1])
    label = f"{band[0]}-{band[1]}天" if band[0] != band[1] else "0天(无外呼)"
    n = mask.sum()
    pct = n / len(df) * 100
    print(f"  {label:>12}: {n:>3}人 ({pct:.1f}%)")

print(f"\n预警统计:")
w7 = df['预警_超7天'].sum()
w22 = df['预警_外呼不足'].sum()
w3 = df['预警_连续3天'].sum()
no_call = (~df['有外呼天数']).sum()
print(f"  超7天未上线:        {w7}人 ({w7/len(df)*100:.1f}%)")
print(f"  外呼天数<22天:      {w22}人 ({w22/len(df)*100:.1f}%)")
print(f"  连续3天未上线:      {w3}人 ({w3/len(df)*100:.1f}%)")
print(f"  无任何外呼记录:     {no_call}人 ({no_call/len(df)*100:.1f}%)")
print(f"  有有效外呼记录:     {df['有外呼天数'].sum()}人 ({df['有外呼天数'].sum()/len(df)*100:.1f}%)")

# ── 3. 产能分析 ──
print("\n" + "=" * 70)
print("三、产能分析")
print("=" * 70)

print(f"\n各分段产能汇总:")
print(f"  {'分段':<8} {'总GMV(万)':>10} {'人均GMV':>10} {'总通时(小时)':>14} {'平均接通率':>10}")
for m in mob_order:
    sub = df[df['司龄分段'] == m]
    total_gmv = sub['近30日累计转化GMV'].sum()
    avg_gmv = total_gmv / len(sub) if len(sub) > 0 else 0
    total_call = sub['近30天累计通时（秒）'].sum() / 3600
    avg_rr = sub['有效接通率'].mean() * 100
    print(f"  {m:<8} {total_gmv:>10,.0f} {avg_gmv:>10,.0f} {total_call:>14,.1f} {avg_rr:>9.1f}%")

# 参评 vs 非参评
print(f"\n参评 vs 非参评:")
rated = df[df['有参评']]
unrated = df[~df['有参评']]
print(f"  {'维度':<15} {'参评(46人)':>12} {'非参评(72人)':>12}")
print(f"  {'总GMV(万)':<15} {rated['近30日累计转化GMV'].sum():>12,.0f} {unrated['近30日累计转化GMV'].sum():>12,.0f}")
print(f"  {'人均GMV':<15} {rated['近30日累计转化GMV'].mean():>12,.0f} {unrated['近30日累计转化GMV'].mean():>12,.0f}")
print(f"  {'有产出人数':<14} {rated['有GMV'].sum():>10}人 ({rated['有GMV'].mean()*100:.0f}%) {unrated['有GMV'].sum():>10}人 ({unrated['有GMV'].mean()*100:.0f}%)")
print(f"  {'人均有效通时(分)':<15} {rated['近30天累计有效通时'].mean()/60:>12,.1f} {unrated['近30天累计有效通时'].mean()/60:>12,.1f}")
print(f"  {'平均接通率':<14} {rated['有效接通率'].mean()*100:>11.1f}% {unrated['有效接通率'].mean()*100:>11.1f}%")

# TOP10 / BOTTOM10
print(f"\nTOP10 vs BOTTOM10 GMV:")
top10 = df.nlargest(10, '近30日累计转化GMV')
bottom10 = df.nsmallest(10, '近30日累计转化GMV')
for label, sub in [('TOP10', top10), ('BOTTOM10', bottom10)]:
    gmv = sub['近30日累计转化GMV'].sum()
    avg_gmv = sub['近30日累计转化GMV'].mean()
    eff = sub['近30天累计有效通时'].sum() / 60
    rr = sub['有效接通率'].mean() * 100
    print(f"  {label}: 总GMV {gmv:,.0f}, 人均 {avg_gmv:,.0f}, 总有效通时 {eff:,.0f}分, 接通率 {rr:.1f}%")

# GMV集中度
print(f"\nGMV集中度:")
total_gmv = df['近30日累计转化GMV'].sum()
sorted_gmv = df['近30日累计转化GMV'].sort_values(ascending=False)
for pct_label, n_pct in [('TOP10%', 0.1), ('TOP20%', 0.2), ('TOP30%', 0.3), ('TOP50%', 0.5)]:
    n = max(1, int(len(df) * n_pct))
    top_gmv = sorted_gmv.head(n).sum()
    print(f"  {pct_label} ({n}人) 贡献 GMV: {top_gmv:,.0f} ({top_gmv/total_gmv*100:.1f}%)")

# 零产出人数
zero_gmv = (df['近30日累计转化GMV'] == 0).sum()
print(f"\n零产出: {zero_gmv}人 ({zero_gmv/len(df)*100:.1f}%)")
print(f"有产出: {(df['有GMV'].sum())}人 ({df['有GMV'].mean()*100:.1f}%)")

# ── 4. 流失/新人风险 ──
print("\n" + "=" * 70)
print("四、流失/新人风险")
print("=" * 70)

mob1 = df[df['司龄分段'] == 'MOB1-']
print(f"\nMOB1- (最新入职) 共 {len(mob1)}人:")
print(f"  有外呼天数: {mob1['有外呼天数'].sum()}人 ({mob1['有外呼天数'].mean()*100:.1f}%)")
print(f"  有GMV产出: {mob1['有GMV'].sum()}人 ({mob1['有GMV'].mean()*100:.1f}%)")
print(f"  人均GMV: {mob1['近30日累计转化GMV'].mean():,.0f}")
print(f"  预警_超7天未上线: {mob1['预警_超7天'].sum()}人")
print(f"  预警_连续3天未上线: {mob1['预警_连续3天'].sum()}人")
print(f"  预警_外呼不足22天: {mob1['预警_外呼不足'].sum()}人")

# 入职≤7天
new_7 = df[df['210客户池在职天数'] <= 7]
print(f"\n入职≤7天的新人: {len(new_7)}人")
print(f"  其中有产出: {new_7['有GMV'].sum()}人 ({new_7['有GMV'].sum()/len(new_7)*100:.1f}%)" if len(new_7) > 0 else "  无入职≤7天人员")
print(f"  其中有外呼: {new_7['有外呼天数'].sum()}人 ({new_7['有外呼天数'].sum()/len(new_7)*100:.1f}%)" if len(new_7) > 0 else "")

# 各分段预警集中度
print(f"\n各分段预警信号集中度:")
print(f"  {'分段':<8} {'超7天未上线':>12} {'外呼不足22天':>14} {'连续3天未上线':>15} {'零产出':>8}")
for m in mob_order:
    sub = df[df['司龄分段'] == m]
    n = len(sub)
    print(f"  {m:<8} {sub['预警_超7天'].sum():>8}人({sub['预警_超7天'].mean()*100:4.0f}%) {sub['预警_外呼不足'].sum():>8}人({sub['预警_外呼不足'].mean()*100:4.0f}%) {sub['预警_连续3天'].sum():>8}人({sub['预警_连续3天'].mean()*100:4.0f}%) {(sub['近30日累计转化GMV']==0).sum():>6}人({(sub['近30日累计转化GMV']==0).mean()*100:4.0f}%)")

# ── 5. 总体KPI ──
print("\n" + "=" * 70)
print("五、总体KPI概览")
print("=" * 70)
print(f"  总GMV:              ¥{total_gmv:,.0f}")
print(f"  有产出人数/总人数:   {df['有GMV'].sum()}/{len(df)} ({df['有GMV'].mean()*100:.1f}%)")
print(f"  人均GMV:            ¥{df['近30日累计转化GMV'].mean():,.0f}")
print(f"  中位数GMV:          ¥{df['近30日累计转化GMV'].median():,.0f}")
print(f"  总通时:             {df['近30天累计通时（秒）'].sum()/3600:,.0f}小时")
print(f"  总有效通时:         {df['近30天累计有效通时'].sum()/3600:,.0f}小时")
print(f"  有效通时/总通时:    {df['近30天累计有效通时'].sum()/df['近30天累计通时（秒）'].sum()*100:.1f}%")
print(f"  平均接通率:         {df['有效接通率'].mean()*100:.1f}%")
print(f"  人均外呼天数:       {df['近30天外呼天数（通话时长>30分钟天数）'].mean():.1f}天")

# ── 6. 深度挖掘 ──
print("\n" + "=" * 70)
print("六、深度挖掘")
print("=" * 70)

# 有外呼但零产出的人
no_prod_active = df[(df['有外呼天数']) & (~df['有GMV'])]
print(f"\n有外呼但零产出: {len(no_prod_active)}人")
if len(no_prod_active) > 0:
    print(f"  这些人平均有效通时: {no_prod_active['近30天累计有效通时'].mean()/60:.1f}分钟")
    print(f"  这些人平均接通率: {no_prod_active['有效接通率'].mean()*100:.1f}%")
    print(f"  司龄分布: {no_prod_active['司龄分段'].value_counts().to_dict()}")

# 高产出画像
high_prod = df[df['近30日累计转化GMV'] >= df['近30日累计转化GMV'].quantile(0.8)]
print(f"\nTOP20%高产出({len(high_prod)}人)画像:")
print(f"  平均GMV: ¥{high_prod['近30日累计转化GMV'].mean():,.0f}")
print(f"  平均有效通时: {high_prod['近30天累计有效通时'].mean()/60:.1f}分钟")
print(f"  平均外呼天数: {high_prod['近30天外呼天数（通话时长>30分钟天数）'].mean():.1f}天")
print(f"  平均接通率: {high_prod['有效接通率'].mean()*100:.1f}%")
print(f"  司龄分布: {high_prod['司龄分段'].value_counts().to_dict()}")

# 低产出画像
low_prod = df[df['近30日累计转化GMV'] < df['近30日累计转化GMV'].quantile(0.2)]
print(f"\nBOTTOM20%低产出({len(low_prod)}人)画像:")
print(f"  平均GMV: ¥{low_prod['近30日累计转化GMV'].mean():,.0f}")
print(f"  平均有效通时: {low_prod['近30天累计有效通时'].mean()/60:.1f}分钟")
print(f"  平均外呼天数: {low_prod['近30天外呼天数（通话时长>30分钟天数）'].mean():.1f}天")
print(f"  平均接通率: {low_prod['有效接通率'].mean()*100:.1f}%")
print(f"  司龄分布: {low_prod['司龄分段'].value_counts().to_dict()}")
print(f"  零产出: {(low_prod['近30日累计转化GMV']==0).sum()}人")

# 通时与GMV相关性
corr = df['近30天累计有效通时'].corr(df['近30日累计转化GMV'])
print(f"\n有效通时与GMV的皮尔逊相关系数: {corr:.3f}")
if corr < 0.3:
    print("  弱相关，说明通时不是GMV的决定因素")
elif corr < 0.6:
    print("  中等相关")
else:
    print("  强相关")

print("\n" + "=" * 70)
print("分析完毕")
print("=" * 70)
