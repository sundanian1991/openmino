"""
验证Excel模板 v2：填入12家模拟数据（含首贷/复贷），检查公式计算结果
"""
import openpyxl

INPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板.xlsx"

wb = openpyxl.load_workbook(INPUT)

# ===== Sheet 1: 赛马分（首贷+复贷） =====
ws1 = wb["1.赛马分原始数据"]

# 12家供应商模拟数据：每家6个月 × (首贷分, 复贷分)
# 格式: (ID, 名称, [(1月首,1月复), (2月首,2月复), ...])
test_data = [
    ("S001", "供应商A-均衡优", [(92,90),(94,92),(90,88),(93,91),(95,93),(91,89)]),
    ("S002", "供应商B-首贷强", [(95,75),(97,78),(93,72),(96,74),(98,76),(94,70)]),  # 首贷偏强
    ("S003", "供应商C-均衡良", [(85,83),(87,85),(83,81),(88,86),(90,88),(86,84)]),
    ("S004", "供应商D-复贷强", [(72,88),(74,90),(70,86),(76,92),(78,94),(74,90)]),  # 复贷偏强
    ("S005", "供应商E-中上",   [(80,78),(82,80),(78,76),(84,82),(86,84),(82,80)]),
    ("S006", "供应商F-中",     [(75,73),(77,75),(73,71),(78,76),(80,78),(76,74)]),
    ("S007", "供应商G-中",     [(72,70),(74,72),(70,68),(76,74),(78,76),(74,72)]),
    ("S008", "供应商H-中下",   [(68,66),(70,68),(66,64),(72,70),(74,72),(70,68)]),
    ("S009", "供应商I-中边",   [(65,63),(67,65),(63,61),(69,67),(71,69),(67,65)]),
    ("S010", "供应商J-差边",   [(60,58),(62,60),(58,56),(64,62),(66,64),(62,60)]),
    ("S011", "供应商K-差",     [(55,53),(57,55),(53,51),(58,56),(60,58),(56,54)]),
    ("S012", "供应商L-差红",   [(50,48),(52,50),(48,46),(54,52),(56,54),(52,50)]),  # 这家后面加红线
]

for i, (sid, name, monthly) in enumerate(test_data):
    r = 6 + i  # Sheet1数据从第6行开始（表头占4-5行）
    ws1.cell(row=r, column=1, value=sid)
    ws1.cell(row=r, column=2, value=name)
    for j, (sdai, fdai) in enumerate(monthly):
        ws1.cell(row=r, column=3 + j * 2, value=sdai)   # 首贷分
        ws1.cell(row=r, column=4 + j * 2, value=fdai)   # 复贷分

# ===== Sheet 2: SLA扣分 =====
ws2 = wb["2.SLA扣分台账"]

sla_data = [
    (0, 0, 0),  # S001 无
    (1, 0, 0),  # S002 1黄牌
    (0, 0, 0),  # S003 无
    (0, 1, 0),  # S004 1投诉
    (0, 0, 0),  # S005 无
    (2, 0, 0),  # S006 2黄牌
    (0, 0, 0),  # S007 无
    (1, 1, 0),  # S008 1黄牌+1投诉
    (0, 0, 0),  # S009 无
    (0, 0, 0),  # S010 无
    (3, 0, 0),  # S011 3黄牌
    (0, 0, 1),  # S012 红线！
]

for i, (yellow, complain, red) in enumerate(sla_data):
    r = 5 + i  # Sheet2数据从第5行开始
    ws2.cell(row=r, column=1, value=test_data[i][0])
    ws2.cell(row=r, column=2, value=test_data[i][1])
    ws2.cell(row=r, column=3, value=yellow)
    ws2.cell(row=r, column=4, value=complain)
    ws2.cell(row=r, column=5, value=red)

# ===== Sheet 3: 稳定性 =====
ws3 = wb["3.稳定性检查表"]

# 只改异常格子（默认B档）
stab_exceptions = {
    # S001: 全部B（无异常）
    # S002: 5月产能波动A（表现突出）
    (2, 10): "A",  # S002(行索引2), 5月产能波动(列10) → 从第6行开始算，5月=7+3=10
    # S006: 4月突发情况C
    (6, 8): "C",   # S006, 4月突发
    # S008: 两个异常
    (8, 8): "C",   # S008, 4月突发
    (8, 12): "C",  # S008, 5月SLA达成C
    # S011: 6月人员变动C
    (11, 15): "C", # S011, 6月人员变动
}

for (row_idx, col), val in stab_exceptions.items():
    r = 6 + row_idx
    ws3.cell(row=r, column=col, value=val)

# ===== Sheet 4: 供管自评 =====
ws4 = wb["4.供管自评表"]

eval_data = [
    ["高","高","高","高","高"],  # S001 5高
    ["高","高","高","中","高"],  # S002 4高
    ["高","高","中","高","高"],  # S003 4高
    ["高","中","高","中","高"],  # S004 3高
    ["中","高","中","高","中"],  # S005 2高
    ["中","中","高","中","中"],  # S006 1高
    ["中","中","中","高","中"],  # S007 1高
    ["中","低","中","中","中"],  # S008 0高
    ["低","中","中","中","低"],  # S009 0高
    ["低","低","中","低","中"],  # S010 0高
    ["低","低","低","中","低"],  # S011 0高
    ["低","低","低","低","低"],  # S012 0高
]

for i, evals in enumerate(eval_data):
    r = 5 + i
    ws4.cell(row=r, column=1, value=test_data[i][0])
    ws4.cell(row=r, column=2, value=test_data[i][1])
    for j, e in enumerate(evals):
        ws4.cell(row=r, column=3 + j, value=e)

# ===== 保存为验证版 =====
OUTPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板【验证版v2】.xlsx"
wb.save(OUTPUT)
print(f"✅ 验证版 v2 已生成: {OUTPUT}")

# ===== 手动计算验证 =====
print("\n" + "="*100)
print("📊 评级结果验证 v2（含首贷/复贷 → 偏科标记）")
print("="*100)
print(f"{'供应商':<16} {'Q2首贷':>8} {'Q2复贷':>8} {'Q2基础':>8} {'扣分':>6} {'稳定':>6} {'自评':>6} {'最终分':>8} {'排名':>6} {'X档':>6} {'Y档':>6} {'评级':>10} {'偏科':>12}")
print("-"*100)

expected = []
for i in range(12):
    monthly = test_data[i][2]
    q1_shou = round((monthly[0][0] + monthly[1][0] + monthly[2][0]) / 3, 1)
    q2_shou = round((monthly[3][0] + monthly[4][0] + monthly[5][0]) / 3, 1)
    q1_fu = round((monthly[0][1] + monthly[1][1] + monthly[2][1]) / 3, 1)
    q2_fu = round((monthly[3][1] + monthly[4][1] + monthly[5][1]) / 3, 1)
    q1_base = round((q1_shou + q1_fu) / 2, 1)
    q2_base = round((q2_shou + q2_fu) / 2, 1)

    sla = sla_data[i]
    penalty = sla[0] * 5 + sla[1] * 5
    red_line = sla[2] > 0

    # 稳定性（默认B=0，异常按stab_exceptions）
    stab_score = 0
    if (i, 8) in stab_exceptions: stab_score += -1  # 4月突发
    if (i, 10) in stab_exceptions: stab_score += 1   # 5月产能A
    if (i, 12) in stab_exceptions: stab_score += -1  # 5月SLA
    if (i, 15) in stab_exceptions: stab_score += -1  # 6月人员

    ev = eval_data[i]
    eval_plus = sum(1 for e in ev if e == "高")

    final = round(q2_base - penalty + stab_score + eval_plus, 1)
    qoq = round((q2_base - q1_base) / q1_base * 100, 1)

    # 偏科标记
    diff = abs(q2_shou - q2_fu)
    if diff <= 10:
        pike = "⚖️均衡"
    elif q2_shou - q2_fu > 10:
        pike = "↗️首贷偏强"
    else:
        pike = "↘️复贷偏强"

    expected.append({
        "name": test_data[i][1],
        "q2_shou": q2_shou,
        "q2_fu": q2_fu,
        "q2_base": q2_base,
        "penalty": penalty,
        "stab": stab_score,
        "eval": eval_plus,
        "final": final,
        "qoq": qoq,
        "red": red_line,
        "pike": pike,
    })

# 排名
sorted_final = sorted(expected, key=lambda x: x["final"], reverse=True)
for rank, e in enumerate(sorted_final, 1):
    e["rank"] = rank

for e in expected:
    if e["rank"] <= 4:
        e["x"] = "高"
    elif e["rank"] <= 9:
        e["x"] = "中"
    else:
        e["x"] = "低"

for e in expected:
    if e["qoq"] > 10:
        e["y"] = "上升"
    elif e["qoq"] < -10:
        e["y"] = "下降"
    else:
        e["y"] = "持平"

for e in expected:
    if e["red"]:
        e["abc"] = "C(红线)"
    elif e["x"] == "高":
        e["abc"] = "A" if e["y"] != "下降" else "A(防下滑)"
    elif e["x"] == "中":
        e["abc"] = "B"
    else:
        e["abc"] = "C"

for e in sorted(expected, key=lambda x: x["rank"]):
    print(f"{e['name']:<16} {e['q2_shou']:>8.1f} {e['q2_fu']:>8.1f} {e['q2_base']:>8.1f} {e['penalty']:>6} {e['stab']:>6} {e['eval']:>6} {e['final']:>8.1f} {e['rank']:>6} {e['x']:>6} {e['y']:>6} {e['abc']:>10} {e['pike']:>12}")

print("\n" + "="*100)
print("📋 统计摘要")
a_count = sum(1 for e in expected if e["abc"].startswith("A"))
b_count = sum(1 for e in expected if e["abc"].startswith("B"))
c_count = sum(1 for e in expected if e["abc"].startswith("C"))
print(f"  A级（优秀）: {a_count} 家")
print(f"  B级（合格）: {b_count} 家")
print(f"  C级（不合格）: {c_count} 家")

# 偏科统计
pike_count = {"⚖️均衡": 0, "↗️首贷偏强": 0, "↘️复贷偏强": 0}
for e in expected:
    pike_count[e["pike"]] = pike_count.get(e["pike"], 0) + 1
print(f"\n📐 偏科分布:")
for k, v in pike_count.items():
    if v > 0:
        print(f"  {k}: {v} 家")

# 临界点
print(f"\n⚠️ 临界点检查:")
for i in range(len(sorted_final)-1):
    diff = sorted_final[i]["final"] - sorted_final[i+1]["final"]
    if diff < 2:
        print(f"  第{sorted_final[i]['rank']}名({sorted_final[i]['name']}) vs 第{sorted_final[i+1]['rank']}名({sorted_final[i+1]['name']}) 分差={diff:.1f} < 2分 → 需人工复核")

print(f"\n✅ v2 验证完成！请打开Excel确认公式结果与上述一致。")
print(f"   🆕 重点检查：")
print(f"   1. Sheet1 偏科标记列（W列）是否正确标记了首贷偏强/复贷偏强")
print(f"   2. Sheet3 稳定性默认B档是否生效")
print(f"   3. Sheet5 偏科标记列（N列）是否从Sheet1正确带出")
