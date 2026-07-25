"""
验证 v5: Sheet5→Sheet6→Sheet7→Sheet8 全链路联动
填入模拟数据，检查三张清单和清退路径是否自动抓取
"""
import openpyxl

INPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板.xlsx"
wb = openpyxl.load_workbook(INPUT)

SUPPLIERS = [
    "毅航合肥职场", "毛毛虫职场", "赛维斯职场", "博岳石家庄职场", "汇讯职场",
    "伽玛职场", "翰锐曲靖职场", "广达陕西职场", "人和职场", "岐力职场", "华啸职场",
]

# ===== 填入Sheet1赛马分 =====
ws1 = wb["1.赛马分原始数据"]
test_scores = [
    [(92,90),(94,92),(90,88),(93,91),(95,93),(91,89)],  # 毅航-优
    [(85,83),(87,85),(83,81),(88,86),(90,88),(86,84)],  # 毛毛虫-良
    [(80,78),(82,80),(78,76),(84,82),(86,84),(82,80)],  # 赛维斯-中上
    [(75,73),(77,75),(73,71),(78,76),(80,78),(76,74)],  # 博岳-中
    [(72,70),(74,72),(70,68),(76,74),(78,76),(74,72)],  # 汇讯-中
    [(68,66),(70,68),(66,64),(72,70),(74,72),(70,68)],  # 伽玛-中下
    [(65,63),(67,65),(63,61),(69,67),(71,69),(67,65)],  # 翰锐-中边
    [(60,58),(62,60),(58,56),(64,62),(66,64),(62,60)],  # 广达-差边
    [(55,53),(57,55),(53,51),(58,56),(60,58),(56,54)],  # 人和-差
    [(50,48),(52,50),(48,46),(54,52),(56,54),(52,50)],  # 岐力-很差
    [(45,43),(47,45),(43,41),(48,46),(50,48),(46,44)],  # 华啸-最差
]

for i, monthly in enumerate(test_scores):
    r = 6 + i
    for j, (sd, fd) in enumerate(monthly):
        ws1.cell(row=r, column=3 + j * 2, value=sd)
        ws1.cell(row=r, column=4 + j * 2, value=fd)

# ===== 填入Sheet2 SLA扣分 =====
ws2 = wb["2.SLA扣分台账"]
sla_data = [
    (0, 0, "否"),   # 毅航-无
    (0, 0, "否"),   # 毛毛虫-无
    (0, 0, "否"),   # 赛维斯-无
    (-5, 0, "否"),  # 博岳-1黄牌
    (0, 0, "否"),   # 汇讯-无
    (0, 0, "否"),   # 伽玛-无
    (-5, -5, "否"), # 翰锐-黄牌+投诉
    (0, 0, "否"),   # 广达-无
    (0, 0, "否"),   # 人和-无
    (0, -5, "否"),  # 岐力-投诉
    (0, 0, "是"),   # 华啸-红线！
]
for i, (hp, ts, red) in enumerate(sla_data):
    r = 5 + i
    ws2.cell(row=r, column=3, value=hp)
    ws2.cell(row=r, column=4, value=ts)
    ws2.cell(row=r, column=5, value=red)

# ===== 填入Sheet4供管自评 =====
ws4 = wb["4.供管自评表"]
eval_data = [
    ["高","高","高","高","高"],  # 毅航 5高
    ["高","高","中","高","高"],  # 毛毛虫 4高
    ["高","中","高","中","高"],  # 赛维斯 3高
    ["中","高","中","高","中"],  # 博岳 2高
    ["中","中","高","中","中"],  # 汇讯 1高
    ["中","中","中","中","中"],  # 伽玛 0高
    ["中","低","中","中","中"],  # 翰锐 0高
    ["低","低","中","低","中"],  # 广达 0高
    ["低","低","低","中","低"],  # 人和 0高
    ["低","低","低","低","低"],  # 岐力 0高
    ["低","低","低","低","低"],  # 华啸 0高
]
for i, ev in enumerate(eval_data):
    r = 5 + i
    for j, e in enumerate(ev):
        ws4.cell(row=r, column=3 + j, value=e)

# Sheet3稳定性保持默认B档（不动）

OUTPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板【验证版v5】.xlsx"
wb.save(OUTPUT)

# ===== 手动计算预期结果 =====
print("=" * 90)
print("📊 全链路验证：Sheet1-4 填入 → Sheet5评级 → Sheet6清单 → Sheet7/8")
print("=" * 90)

results = []
for i in range(11):
    monthly = test_scores[i]
    q2_sd = round((monthly[3][0] + monthly[4][0] + monthly[5][0]) / 3, 1)
    q2_fd = round((monthly[3][1] + monthly[4][1] + monthly[5][1]) / 3, 1)
    q1_sd = round((monthly[0][0] + monthly[1][0] + monthly[2][0]) / 3, 1)
    q1_fd = round((monthly[0][1] + monthly[1][1] + monthly[2][1]) / 3, 1)
    q2_base = round((q2_sd + q2_fd) / 2, 1)
    q1_base = round((q1_sd + q1_fd) / 2, 1)

    hp, ts, red = sla_data[i]
    penalty = hp + ts

    ev_plus = sum(1 for e in eval_data[i] if e == "高")

    final = round(q2_base - penalty + 0 + ev_plus, 1)  # 稳定性默认0
    qoq = round((q2_base - q1_base) / q1_base * 100, 1)

    diff = abs(q2_sd - q2_fd)
    pike = "⚖️均衡" if diff <= 10 else ("↗️首贷偏强" if q2_sd > q2_fd else "↘️复贷偏强")

    results.append({
        "name": SUPPLIERS[i],
        "final": final,
        "qoq": qoq,
        "pike": pike,
        "red": red == "是",
        "qoq_dir": "上升" if qoq > 10 else ("下降" if qoq < -10 else "持平"),
    })

# 排名
sorted_r = sorted(results, key=lambda x: x["final"], reverse=True)
for rank, r in enumerate(sorted_r, 1):
    r["rank"] = rank

# X档
for r in results:
    if r["rank"] <= 3:
        r["x"] = "高"
    elif r["rank"] <= 8:
        r["x"] = "中"
    else:
        r["x"] = "低"

# ABC评级
for r in results:
    if r["red"]:
        r["abc"] = "C(红线)"
    elif r["x"] == "高":
        r["abc"] = "A" if r["qoq_dir"] != "下降" else "A(防下滑)"
    elif r["x"] == "中":
        r["abc"] = "B"
    else:
        r["abc"] = "C"

# 输出Sheet5预期
print(f"\n{'排名':>4} {'供应商':<16} {'最终分':>8} {'X档':>4} {'趋势':>6} {'评级':>10} {'偏科':>12}")
print("-" * 70)
for r in sorted_r:
    print(f"{r['rank']:>4} {r['name']:<16} {r['final']:>8.1f} {r['x']:>4} {r['qoq_dir']:>6} {r['abc']:>10} {r['pike']:>12}")

# Sheet6预期
a_list = [r for r in results if r["abc"].startswith("A")]
b_list = [r for r in results if r["abc"].startswith("B")]
c_list = [r for r in results if r["abc"].startswith("C")]

print(f"\n{'='*70}")
print(f"📋 Sheet6 三张清单预期")
print(f"{'='*70}")
print(f"\n🟢 A级保留清单（{len(a_list)}家）:")
for r in sorted(a_list, key=lambda x: x["final"], reverse=True):
    print(f"   {r['name']} - {r['final']:.1f}分")
print(f"\n🟡 B级培养清单（{len(b_list)}家）:")
for r in sorted(b_list, key=lambda x: x["final"], reverse=True):
    print(f"   {r['name']} - {r['final']:.1f}分")
print(f"\n🔴 C级优化清单（{len(c_list)}家）:")
for r in sorted(c_list, key=lambda x: x["final"], reverse=True):
    print(f"   {r['name']} - {r['final']:.1f}分", end="")
    if r["red"]:
        print(" [红线→路径三]")
    elif r["qoq_dir"] == "下降":
        print(" [C+下降→路径二]")
    else:
        print(" [首次C→路径一]")

# Sheet8清退路径预期
print(f"\n{'='*70}")
print(f"📋 Sheet8 清退路径预期（仅C级）")
print(f"{'='*70}")
for r in sorted(c_list, key=lambda x: x["final"], reverse=True):
    if r["red"]:
        path = "路径三：红线清退·联合评估"
        node = "管理层决策后执行"
    elif r["qoq_dir"] == "下降":
        path = "路径二：快车道·30天交接"
        node = "D0通知→D30交接完成"
    else:
        path = "路径一：常规·整改30天→观察→复评"
        node = "D30整改报告→D90复评"
    print(f"  {r['name']} → {path} → {node}")

print(f"\n{'='*70}")
print(f"✅ v5全链路验证完成")
print(f"{'='*70}")
print(f"\n📝 请在Excel中打开验证版，确认：")
print(f"   1. Sheet5评级结果与上表一致")
print(f"   2. Sheet6三张清单自动抓取了A级{len(a_list)}家/B级{len(b_list)}家/C级{len(c_list)}家")
print(f"   3. Sheet7供应商名称自动带出")
print(f"   4. Sheet8清退路径自动判定（C级供应商名称+路径都自动）")
