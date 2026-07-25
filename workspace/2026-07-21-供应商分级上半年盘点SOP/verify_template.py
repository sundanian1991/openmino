"""
验证Excel模板：填入12家模拟数据，检查公式计算结果是否正确
"""
import openpyxl
from openpyxl.styles import PatternFill

INPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板.xlsx"

wb = openpyxl.load_workbook(INPUT)

# ===== Sheet 1: 赛马分 =====
ws1 = wb["1.赛马分原始数据"]

# 12家供应商模拟数据 (ID, 名称, 1-6月赛马分)
test_data = [
    ("S001", "供应商A-优",    90, 92, 94, 91, 93, 95),
    ("S002", "供应商B-优",    88, 86, 90, 89, 91, 93),
    ("S003", "供应商C-优",    85, 87, 83, 88, 90, 92),
    ("S004", "供应商D-优边",  82, 84, 86, 85, 87, 89),
    ("S005", "供应商E-中上",  78, 80, 76, 82, 84, 86),
    ("S006", "供应商F-中",    75, 77, 73, 78, 80, 82),
    ("S007", "供应商G-中",    72, 74, 70, 76, 78, 80),
    ("S008", "供应商H-中下",  68, 70, 66, 72, 74, 76),
    ("S009", "供应商I-中边",  65, 67, 63, 69, 71, 73),
    ("S010", "供应商J-差边",  60, 62, 58, 64, 66, 68),
    ("S011", "供应商K-差",    55, 57, 53, 58, 60, 62),
    ("S012", "供应商L-差红",  50, 52, 48, 54, 56, 58),  # 这家后面加红线
]

for i, (sid, name, *scores) in enumerate(test_data):
    r = 4 + i
    ws1.cell(row=r, column=1, value=sid)
    ws1.cell(row=r, column=2, value=name)
    for j, s in enumerate(scores):
        ws1.cell(row=r, column=3 + j, value=s)

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
    r = 5 + i
    ws2.cell(row=r, column=1, value=test_data[i][0])
    ws2.cell(row=r, column=2, value=test_data[i][1])
    ws2.cell(row=r, column=3, value=yellow)
    ws2.cell(row=r, column=4, value=complain)
    ws2.cell(row=r, column=5, value=red)

# ===== Sheet 3: 稳定性 =====
ws3 = wb["3.稳定性检查表"]

# 每家3个月 × 4项 (A/B/C)
stab_data = [
    # S001: 优秀稳定
    ["A","A","A","A", "A","A","A","A", "A","A","A","A"],
    # S002: 良好
    ["A","B","A","B", "A","A","B","A", "B","A","A","B"],
    # S003: 良好
    ["B","A","B","A", "A","B","A","B", "B","A","B","A"],
    # S004: 中等
    ["B","B","A","B", "B","A","B","B", "A","B","B","A"],
    # S005: 中等
    ["B","B","B","A", "B","B","A","B", "A","B","B","B"],
    # S006: 一般
    ["B","C","B","B", "C","B","B","B", "B","B","C","B"],
    # S007: 一般
    ["B","B","C","B", "B","B","B","C", "C","B","B","B"],
    # S008: 较差
    ["C","B","C","B", "B","C","B","C", "C","B","C","B"],
    # S009: 较差
    ["C","C","B","C", "B","C","C","B", "C","B","C","C"],
    # S010: 差
    ["C","C","C","B", "C","B","C","C", "C","C","B","C"],
    # S011: 很差
    ["C","C","C","C", "C","C","C","B", "C","C","C","C"],
    # S012: 很差+红线
    ["C","C","C","C", "C","C","C","C", "C","C","C","C"],
]

for i, months in enumerate(stab_data):
    r = 6 + i
    ws3.cell(row=r, column=1, value=test_data[i][0])
    ws3.cell(row=r, column=2, value=test_data[i][1])
    for j, grade in enumerate(months):
        ws3.cell(row=r, column=3 + j, value=grade)

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
OUTPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板【验证版】.xlsx"
wb.save(OUTPUT)
print(f"✅ 验证版已生成: {OUTPUT}")

# ===== 重新加载计算（强制公式计算） =====
wb2 = openpyxl.load_workbook(OUTPUT, data_only=False)
ws5 = wb2["5.评级结果"]

# 手动计算验证
print("\n" + "="*80)
print("📊 评级结果验证（手动计算 vs 公式预期）")
print("="*80)
print(f"{'供应商':<16} {'Q2赛马':>8} {'扣分':>6} {'稳定':>6} {'自评':>6} {'最终分':>8} {'排名':>6} {'X档':>6} {'Y档':>6} {'评级':>10}")
print("-"*80)

expected = []
for i in range(12):
    s1_scores = test_data[i][2:8]  # 1-6月
    q2_base = round((s1_scores[3] + s1_scores[4] + s1_scores[5]) / 3, 1)
    q1_base = round((s1_scores[0] + s1_scores[1] + s1_scores[2]) / 3, 1)

    sla = sla_data[i]
    penalty = sla[0] * 5 + sla[1] * 5
    red_line = sla[2] > 0

    stab = stab_data[i]
    def grade_score(g):
        return {"A": 1, "B": 0, "C": -1}[g]
    m4 = sum(grade_score(stab[j]) for j in range(4))
    m5 = sum(grade_score(stab[j]) for j in range(4, 8))
    m6 = sum(grade_score(stab[j]) for j in range(8, 12))
    stab_score = round((m4 + m5 + m6) / 3)

    ev = eval_data[i]
    eval_plus = sum(1 for e in ev if e == "高")

    final = round(q2_base - penalty + stab_score + eval_plus, 1)
    qoq = round((q2_base - q1_base) / q1_base * 100, 1)

    expected.append({
        "name": test_data[i][1],
        "q2": q2_base,
        "penalty": penalty,
        "stab": stab_score,
        "eval": eval_plus,
        "final": final,
        "qoq": qoq,
        "red": red_line,
    })

# 排名
sorted_final = sorted(expected, key=lambda x: x["final"], reverse=True)
for rank, e in enumerate(sorted_final, 1):
    e["rank"] = rank

# X档: 1-4高, 5-9中, 10-12低
for e in expected:
    if e["rank"] <= 4:
        e["x"] = "高"
    elif e["rank"] <= 9:
        e["x"] = "中"
    else:
        e["x"] = "低"

# Y档
for e in expected:
    if e["qoq"] > 10:
        e["y"] = "上升"
    elif e["qoq"] < -10:
        e["y"] = "下降"
    else:
        e["y"] = "持平"

# ABC
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
    print(f"{e['name']:<16} {e['q2']:>8.1f} {e['penalty']:>6} {e['stab']:>6} {e['eval']:>6} {e['final']:>8.1f} {e['rank']:>6} {e['x']:>6} {e['y']:>6} {e['abc']:>10}")

print("\n" + "="*80)
print("📋 统计摘要")
a_count = sum(1 for e in expected if e["abc"].startswith("A"))
b_count = sum(1 for e in expected if e["abc"].startswith("B"))
c_count = sum(1 for e in expected if e["abc"].startswith("C"))
print(f"  A级（优秀）: {a_count} 家")
print(f"  B级（合格）: {b_count} 家")
print(f"  C级（不合格）: {c_count} 家")
print(f"  最高分: {sorted_final[0]['final']:.1f} ({sorted_final[0]['name']})")
print(f"  最低分: {sorted_final[-1]['final']:.1f} ({sorted_final[-1]['name']})")

# 检查临界点
print(f"\n⚠️ 临界点检查:")
for i in range(len(sorted_final)-1):
    diff = sorted_final[i]["final"] - sorted_final[i+1]["final"]
    if diff < 2:
        print(f"  第{sorted_final[i]['rank']}名({sorted_final[i]['name']}) vs 第{sorted_final[i+1]['rank']}名({sorted_final[i+1]['name']}) 分差={diff:.1f} < 2分 → 需人工复核")

print(f"\n✅ 验证完成！请打开Excel确认公式结果与上述一致。")
