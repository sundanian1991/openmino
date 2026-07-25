"""
生成供应商分级盘点 Excel 计算模板 v3
- 预填11家供应商名称
- 稳定性检查表：每项A/B/C写满打分标准和行为描述
- 调整11家分位切分规则
"""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import FormulaRule
from openpyxl.worksheet.datavalidation import DataValidation

OUTPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-21-供应商分级上半年盘点SOP/供应商分级盘点-计算模板.xlsx"

wb = openpyxl.Workbook()

# 11家供应商
SUPPLIERS = [
    "毅航合肥职场",
    "毛毛虫职场",
    "赛维斯职场",
    "博岳石家庄职场",
    "汇讯职场",
    "伽玛职场",
    "翰锐曲靖职场",
    "广达陕西职场",
    "人和职场",
    "岐力职场",
    "华啸职场",
]

# ===== 样式定义 =====
HEADER_FILL = PatternFill("solid", fgColor="1F4E78")
HEADER_FONT = Font(name="微软雅黑", size=11, bold=True, color="FFFFFF")
SUBHEADER_FILL = PatternFill("solid", fgColor="D6E4F0")
SUBHEADER_FONT = Font(name="微软雅黑", size=10, bold=True, color="1F4E78")
TITLE_FONT = Font(name="微软雅黑", size=14, bold=True, color="1F4E78")
NORMAL_FONT = Font(name="微软雅黑", size=10)
INPUT_FILL = PatternFill("solid", fgColor="FFF2CC")
CALC_FILL = PatternFill("solid", fgColor="E2EFDA")
RESULT_FILL = PatternFill("solid", fgColor="FCE4D6")
A_FILL = PatternFill("solid", fgColor="C6EFCE")
B_FILL = PatternFill("solid", fgColor="FFEB9C")
C_FILL = PatternFill("solid", fgColor="FFC7CE")
DEFAULT_FILL = PatternFill("solid", fgColor="F2F2F2")
STANDARD_FILL = PatternFill("solid", fgColor="E8F4FD")  # 蓝色=打分标准
THIN_BORDER = Border(
    left=Side(style="thin", color="B0B0B0"),
    right=Side(style="thin", color="B0B0B0"),
    top=Side(style="thin", color="B0B0B0"),
    bottom=Side(style="thin", color="B0B0B0"),
)
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
LEFT = Alignment(horizontal="left", vertical="center", wrap_text=True)


def style_header_row(ws, row, start_col, end_col):
    for c in range(start_col, end_col + 1):
        cell = ws.cell(row=row, column=c)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = CENTER
        cell.border = THIN_BORDER


def apply_border_range(ws, min_row, max_row, min_col, max_col):
    for r in range(min_row, max_row + 1):
        for c in range(min_col, max_col + 1):
            ws.cell(row=r, column=c).border = THIN_BORDER


def fill_supplier_names(ws, start_row, col_id=1, col_name=2):
    """预填供应商ID和名称"""
    for i, name in enumerate(SUPPLIERS):
        r = start_row + i
        ws.cell(row=r, column=col_id, value=f"S{i+1:03d}")
        ws.cell(row=r, column=col_name, value=name)


# ==========================================
# Sheet 0: 使用说明
# ==========================================
ws0 = wb.active
ws0.title = "使用说明"

ws0["B2"] = "金条产线供应商分级 · 上半年盘点计算模板 v3"
ws0["B2"].font = TITLE_FONT
ws0.merge_cells("B2:H2")

instructions = [
    ("", ""),
    ("📍 颜色含义", ""),
    ("🟡 黄色", "需要你手动填入（首贷分/复贷分/SLA事件/供管自评）"),
    ("🟢 绿色", "自动计算（不要改）"),
    ("🟠 橙色", "最终结果（评级、清单等）"),
    ("⚪ 灰色", "默认值（稳定性已预填B档，有异常才改）"),
    ("🔵 蓝色", "打分标准（供管和业管参照标准打分留痕）"),
    ("", ""),
    ("📋 操作步骤", ""),
    ("Step 1", "「1.赛马分原始数据」→ 填11家×6个月的首贷分+复贷分"),
    ("Step 2", "「2.SLA扣分台账」→ 填Q2黄牌/投诉/红线次数"),
    ("Step 3", "「3.稳定性检查表」→ 默认B档，有异常改A/C（标准已写好）"),
    ("Step 4", "「4.供管自评表」→ 对每家5项打高/中/低（标准已写好）"),
    ("Step 5", "「5.评级结果」→ 查看自动计算（含偏科标记）"),
    ("Step 6", "「6.三张清单」→ 按评级分组"),
    ("Step 7", "「7.集中度管控」→ 检查A级产能占比"),
    ("Step 8", "「8.清退路径」→ C级处理路径"),
    ("", ""),
    ("📊 11家供应商分位规则", ""),
    ("高贡献", "前30% = 前3名（排名第1-3）"),
    ("中贡献", "30%-70% = 第4-8名"),
    ("低贡献", "后30% = 第9-11名"),
    ("", ""),
    ("⚠️ 首贷/复贷处理", ""),
    ("规则", "月度赛马分 = (首贷分 + 复贷分) / 2"),
    ("偏科标记", "首贷复贷分差>10分 → 标记偏科"),
    ("", ""),
    ("⚠️ 其他注意事项", ""),
    ("1", "赛马分缺失的月份填0"),
    ("2", "红线违规=直接C级，不走分数计算"),
    ("3", "临界点（第3/4名、第8/9名分差<2分）需人工复核"),
]

for i, (k, v) in enumerate(instructions, start=4):
    ws0.cell(row=i, column=2, value=k).font = Font(name="微软雅黑", size=10, bold=True)
    ws0.cell(row=i, column=3, value=v).font = NORMAL_FONT
    ws0.cell(row=i, column=3).alignment = LEFT
    ws0.merge_cells(start_row=i, start_column=3, end_row=i, end_column=8)

ws0.column_dimensions["A"].width = 3
ws0.column_dimensions["B"].width = 28
for col in "CDEFGH":
    ws0.column_dimensions[col].width = 18


# ==========================================
# Sheet 1: 赛马分原始数据
# ==========================================
ws1 = wb.create_sheet("1.赛马分原始数据")

ws1["A1"] = "📊 赛马月度评分 - 原始数据（首贷+复贷 → 算术平均）"
ws1["A1"].font = TITLE_FONT
ws1.merge_cells("A1:X1")

ws1["A2"] = "规则：月度赛马分 = (首贷分 + 复贷分) / 2 | Q1基础分 = (Q1首贷均 + Q1复贷均) / 2"
ws1["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="666666")
ws1.merge_cells("A2:X2")

ws1.cell(row=4, column=1, value="供应商ID")
ws1.cell(row=4, column=2, value="供应商名称")
ws1.merge_cells("A4:A5")
ws1.merge_cells("B4:B5")

for i, m in enumerate(["1月", "2月", "3月"]):
    start_c = 3 + i * 2
    ws1.cell(row=4, column=start_c, value=m)
    ws1.merge_cells(start_row=4, start_column=start_c, end_row=4, end_column=start_c + 1)
    ws1.cell(row=5, column=start_c, value="首贷分")
    ws1.cell(row=5, column=start_c + 1, value="复贷分")

for i, m in enumerate(["4月", "5月", "6月"]):
    start_c = 9 + i * 2
    ws1.cell(row=4, column=start_c, value=m)
    ws1.merge_cells(start_row=4, start_column=start_c, end_row=4, end_column=start_c + 1)
    ws1.cell(row=5, column=start_c, value="首贷分")
    ws1.cell(row=5, column=start_c + 1, value="复贷分")

summary_headers = ["Q1首贷均", "Q2首贷均", "Q1复贷均", "Q2复贷均", "Q1基础分", "Q2基础分", "环比%", "Y档", "偏科标记", "备注"]
for i, h in enumerate(summary_headers):
    ws1.cell(row=4, column=15 + i, value=h)
    ws1.merge_cells(start_row=4, start_column=15 + i, end_row=5, end_column=15 + i)

style_header_row(ws1, 4, 1, 24)
style_header_row(ws1, 5, 1, 24)

# 11行供应商
for r in range(6, 17):  # 11家 (6-16行)
    ws1.cell(row=r, column=1).fill = INPUT_FILL
    ws1.cell(row=r, column=2).fill = INPUT_FILL
    for c in range(3, 15):
        ws1.cell(row=r, column=c).fill = INPUT_FILL

    ws1.cell(row=r, column=15, value=f"=IFERROR(AVERAGE(C{r},E{r},G{r}),0)")
    ws1.cell(row=r, column=15).fill = CALC_FILL
    ws1.cell(row=r, column=15).number_format = "0.0"
    ws1.cell(row=r, column=16, value=f"=IFERROR(AVERAGE(I{r},K{r},M{r}),0)")
    ws1.cell(row=r, column=16).fill = CALC_FILL
    ws1.cell(row=r, column=16).number_format = "0.0"
    ws1.cell(row=r, column=17, value=f"=IFERROR(AVERAGE(D{r},F{r},H{r}),0)")
    ws1.cell(row=r, column=17).fill = CALC_FILL
    ws1.cell(row=r, column=17).number_format = "0.0"
    ws1.cell(row=r, column=18, value=f"=IFERROR(AVERAGE(J{r},L{r},N{r}),0)")
    ws1.cell(row=r, column=18).fill = CALC_FILL
    ws1.cell(row=r, column=18).number_format = "0.0"
    ws1.cell(row=r, column=19, value=f"=ROUND((O{r}+Q{r})/2,1)")
    ws1.cell(row=r, column=19).fill = CALC_FILL
    ws1.cell(row=r, column=19).number_format = "0.0"
    ws1.cell(row=r, column=20, value=f"=ROUND((P{r}+R{r})/2,1)")
    ws1.cell(row=r, column=20).fill = CALC_FILL
    ws1.cell(row=r, column=20).number_format = "0.0"
    ws1.cell(row=r, column=21, value=f'=IF(S{r}=0,"",ROUND((T{r}-S{r})/S{r}*100,1))')
    ws1.cell(row=r, column=21).fill = CALC_FILL
    ws1.cell(row=r, column=21).number_format = '0.0"%"'
    ws1.cell(row=r, column=22, value=f'=IF(U{r}="","数据不全",IF(U{r}>10,"上升",IF(U{r}<-10,"下降","持平")))')
    ws1.cell(row=r, column=22).fill = CALC_FILL
    ws1.cell(row=r, column=23, value=f'=IF(ABS(P{r}-R{r})<=10,"⚖️均衡",IF(P{r}-R{r}>10,"↗️首贷偏强","↘️复贷偏强"))')
    ws1.cell(row=r, column=23).fill = CALC_FILL
    ws1.cell(row=r, column=24).fill = INPUT_FILL

# 预填供应商名称
fill_supplier_names(ws1, 6)

apply_border_range(ws1, 4, 16, 1, 24)

ws1.column_dimensions["A"].width = 12
ws1.column_dimensions["B"].width = 18
for c in range(3, 15):
    ws1.column_dimensions[get_column_letter(c)].width = 8
summary_widths = [10, 10, 10, 10, 10, 10, 10, 8, 12, 16]
for i, w in enumerate(summary_widths):
    ws1.column_dimensions[get_column_letter(15 + i)].width = w

ws1.freeze_panes = "C6"


# ==========================================
# Sheet 2: SLA扣分台账（v4: 下拉选择式，选完自动联动）
# ==========================================
ws2 = wb.create_sheet("2.SLA扣分台账")

ws2["A1"] = "⚠️ SLA/合规扣分台账（Q2）"
ws2["A1"].font = TITLE_FONT
ws2.merge_cells("A1:I1")

ws2["A2"] = "🔑 操作：点击黄色格子，下拉选择扣分值（0=无发生 / -5=有发生），自动汇总到Q2合规扣分"
ws2["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="666666")
ws2.merge_cells("A2:I2")

# 表头
headers2 = ["供应商ID", "供应商名称", "黄牌整改", "有责投诉", "红线违规", "Q2合规扣分", "触发直接C级", "扣分明细", "备注"]
for i, h in enumerate(headers2, start=1):
    ws2.cell(row=4, column=i, value=h)
style_header_row(ws2, 4, 1, len(headers2))

# 下拉选项：扣分值 0 或 -5
dv_score = DataValidation(type="list", formula1='"0,-5"', allow_blank=False)
ws2.add_data_validation(dv_score)

# 红线违规：是/否
dv_red = DataValidation(type="list", formula1='"否,是"', allow_blank=False)
ws2.add_data_validation(dv_red)

for r in range(5, 16):  # 11家
    # A: ID, B: 名称（预填）
    ws2.cell(row=r, column=1).fill = INPUT_FILL
    ws2.cell(row=r, column=2).fill = INPUT_FILL
    # C: 黄牌整改（下拉选 0 或 -5）
    cell_c = ws2.cell(row=r, column=3, value=0)
    cell_c.fill = INPUT_FILL
    cell_c.font = Font(name="微软雅黑", size=11, bold=True, color="C00000")
    cell_c.alignment = CENTER
    dv_score.add(cell_c)
    # D: 有责投诉（下拉选 0 或 -5）
    cell_d = ws2.cell(row=r, column=4, value=0)
    cell_d.fill = INPUT_FILL
    cell_d.font = Font(name="微软雅黑", size=11, bold=True, color="C00000")
    cell_d.alignment = CENTER
    dv_score.add(cell_d)
    # E: 红线违规（下拉选 否 或 是）
    cell_e = ws2.cell(row=r, column=5, value="否")
    cell_e.fill = INPUT_FILL
    cell_e.font = Font(name="微软雅黑", size=11, bold=True, color="C00000")
    cell_e.alignment = CENTER
    dv_red.add(cell_e)
    # F: Q2合规扣分 = C + D（红线不进扣分，直接触发C级）
    ws2.cell(row=r, column=6, value=f"=C{r}+D{r}")
    ws2.cell(row=r, column=6).fill = CALC_FILL
    ws2.cell(row=r, column=6).font = Font(name="微软雅黑", size=11, bold=True)
    ws2.cell(row=r, column=6).alignment = CENTER
    # G: 触发直接C级
    ws2.cell(row=r, column=7, value=f'=IF(E{r}="是","🔴 是·直接C级","否")')
    ws2.cell(row=r, column=7).fill = CALC_FILL
    ws2.cell(row=r, column=7).alignment = CENTER
    # H: 扣分明细（自动生成文字说明）
    ws2.cell(row=r, column=8, value=(
        f'=IF(C{r}=0,"",IF(C{r}=-5,"黄牌","黄牌"&"×"&-C{r}/5&"次"))'
        f'&IF(AND(C{r}<0,D{r}<0)," + ","")'
        f'&IF(D{r}=0,"",IF(D{r}=-5,"有责投诉","有责投诉×"&-D{r}/5&"次"))'
        f'&IF(E{r}="是",IF(OR(C{r}<0,D{r}<0)," + ","")&"🔴红线","")'
        f'&IF(AND(C{r}=0,D{r}=0,E{r}<>"是"),"无扣分","")'
    ))
    ws2.cell(row=r, column=8).fill = CALC_FILL
    ws2.cell(row=r, column=8).alignment = LEFT
    # I: 备注（手填）
    ws2.cell(row=r, column=9).fill = INPUT_FILL

# 预填供应商名称
fill_supplier_names(ws2, 5)

apply_border_range(ws2, 4, 15, 1, 9)

widths2 = [12, 20, 12, 12, 12, 12, 16, 28, 18]
for i, w in enumerate(widths2, start=1):
    ws2.column_dimensions[get_column_letter(i)].width = w

# ===== 扣分标准说明区 =====
ws2["A17"] = "📋 扣分标准说明"
ws2["A17"].font = Font(name="微软雅黑", size=11, bold=True, color="1F4E78")
ws2["A17"].fill = STANDARD_FILL
ws2.merge_cells("A17:I17")
ws2["A17"].alignment = Alignment(horizontal="left", vertical="center")

rules = [
    ("黄牌整改", "SLA核心指标未达标/质量问题被下发整改通知。选0=无，选-5=有"),
    ("有责投诉", "客户投诉经核查供应商有责任。选0=无，选-5=有。多次发生可叠加选择（每次-5）"),
    ("红线违规", "触发底线：合规/资金/信息安全等重大违规。选'是'=直接评级C级，启动清退评估"),
]
ws2.cell(row=18, column=1, value="项目").font = SUBHEADER_FONT
ws2.cell(row=18, column=2, value="定义与操作").font = SUBHEADER_FONT
ws2.merge_cells("B18:I18")
for c in range(1, 10):
    ws2.cell(row=18, column=c).fill = SUBHEADER_FILL
    ws2.cell(row=18, column=c).border = THIN_BORDER
    ws2.cell(row=18, column=c).alignment = CENTER

for i, (item, desc) in enumerate(rules, start=19):
    ws2.cell(row=i, column=1, value=item).font = Font(name="微软雅黑", size=10, bold=True)
    ws2.cell(row=i, column=1).fill = STANDARD_FILL
    ws2.cell(row=i, column=2, value=desc)
    ws2.merge_cells(start_row=i, start_column=2, end_row=i, end_column=9)
    for c in range(1, 10):
        ws2.cell(row=i, column=c).border = THIN_BORDER
        ws2.cell(row=i, column=c).alignment = LEFT
        if c >= 2:
            ws2.cell(row=i, column=c).font = NORMAL_FONT


# ==========================================
# Sheet 3: 稳定性检查表（v3: 预填名称 + 打分标准）
# ==========================================
ws3 = wb.create_sheet("3.稳定性检查表")

ws3["A1"] = "🔧 月度稳定性检查表（Q2三个月）"
ws3["A1"].font = TITLE_FONT
ws3.merge_cells("A1:R1")

ws3["A2"] = "🔑 操作：默认已预填B档。有异常才改A/C。打分标准见下方蓝色区域。"
ws3["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="006100")
ws3.merge_cells("A2:R2")

# 月份分组表头
ws3.cell(row=4, column=1, value="供应商ID")
ws3.cell(row=4, column=2, value="供应商名称")
ws3.merge_cells("A4:A5")
ws3.merge_cells("B4:B5")

months_groups = [("4月", 3, 6), ("5月", 7, 10), ("6月", 11, 14)]
for mname, start_c, end_c in months_groups:
    ws3.cell(row=4, column=start_c, value=mname)
    ws3.merge_cells(start_row=4, start_column=start_c, end_row=4, end_column=end_c)
    sub_hdrs = ["人员变动", "产能波动", "SLA达成", "突发情况"]
    for i, h in enumerate(sub_hdrs):
        ws3.cell(row=5, column=start_c + i, value=h)

ws3.cell(row=4, column=15, value="Q2稳定性得分")
ws3.merge_cells("O4:O5")
ws3.cell(row=4, column=16, value="备注")
ws3.merge_cells("P4:P5")

style_header_row(ws3, 4, 1, 16)
style_header_row(ws3, 5, 1, 16)

dv_abc = DataValidation(type="list", formula1='"A,B,C"', allow_blank=True)
ws3.add_data_validation(dv_abc)

# 11行供应商
for r in range(6, 17):  # 11家
    ws3.cell(row=r, column=1).fill = INPUT_FILL
    ws3.cell(row=r, column=2).fill = INPUT_FILL
    for c in range(3, 15):
        cell = ws3.cell(row=r, column=c)
        cell.value = "B"
        cell.fill = DEFAULT_FILL
        dv_abc.add(cell)
    m4 = f'(IF(C{r}="A",1,IF(C{r}="C",-1,0))+IF(D{r}="A",1,IF(D{r}="C",-1,0))+IF(E{r}="A",1,IF(E{r}="C",-1,0))+IF(F{r}="A",1,IF(F{r}="C",-1,0)))'
    m5 = f'(IF(G{r}="A",1,IF(G{r}="C",-1,0))+IF(H{r}="A",1,IF(H{r}="C",-1,0))+IF(I{r}="A",1,IF(I{r}="C",-1,0))+IF(J{r}="A",1,IF(J{r}="C",-1,0)))'
    m6 = f'(IF(K{r}="A",1,IF(K{r}="C",-1,0))+IF(L{r}="A",1,IF(L{r}="C",-1,0))+IF(M{r}="A",1,IF(M{r}="C",-1,0))+IF(N{r}="A",1,IF(N{r}="C",-1,0)))'
    formula = f"=ROUND(({m4}+{m5}+{m6})/3,0)"
    ws3.cell(row=r, column=15, value=formula)
    ws3.cell(row=r, column=15).fill = CALC_FILL
    ws3.cell(row=r, column=16).fill = INPUT_FILL

# 预填供应商名称
fill_supplier_names(ws3, 6)

apply_border_range(ws3, 4, 16, 1, 16)

widths3 = [12, 18, 9, 9, 9, 10, 9, 9, 9, 10, 9, 9, 9, 10, 12, 16]
for i, w in enumerate(widths3, start=1):
    ws3.column_dimensions[get_column_letter(i)].width = w

ws3.freeze_panes = "C6"

# ===== 打分标准区域（蓝色） =====
ws3["A18"] = "📋 稳定性检查表 · 打分标准（业管参照此标准打分，在备注列写明依据）"
ws3["A18"].font = Font(name="微软雅黑", size=11, bold=True, color="1F4E78")
ws3.merge_cells("A18:P18")
ws3["A18"].fill = STANDARD_FILL
ws3["A18"].alignment = Alignment(horizontal="left", vertical="center")

# 打分标准表头
std_table_headers = ["维度", "检查什么", "A档（+1分）", "B档（0分）", "C档（-1分）"]
col_spans = [(1,1), (2,2), (3,6), (7,9), (10,13)]  # (start_col, end_col)
for (h, (sc, ec)) in zip(std_table_headers, col_spans):
    ws3.cell(row=19, column=sc, value=h)
    if sc != ec:
        ws3.merge_cells(start_row=19, start_column=sc, end_row=19, end_column=ec)
    cell = ws3.cell(row=19, column=sc)
    cell.fill = HEADER_FILL
    cell.font = HEADER_FONT
    cell.alignment = CENTER
    cell.border = THIN_BORDER
    for c in range(sc, ec + 1):
        ws3.cell(row=19, column=c).border = THIN_BORDER

standards = [
    {
        "dim": "人员变动",
        "check": "核心人员（主管/质检/培训师/核心TOP坐席）流失或调岗情况",
        "a": "团队零流失或仅个别基层流动，核心团队完整，人员替补无缝衔接，对产能和培训无任何影响",
        "b": "有少量人员流动（个位数），但不涉及核心岗位，或涉及核心岗位但有成熟替补机制，交付未受影响",
        "c": "核心人员（主管/质检/培训师）流失≥2人，或单月人员流失率>15%，导致产能下降或培训断档，影响当月交付",
    },
    {
        "dim": "产能波动",
        "check": "月度实际产能相对月均基准的波动幅度",
        "a": "产能稳定，波动≤±5%，持续超预期交付，能灵活响应临时加量需求",
        "b": "产能波动在±5%~15%之间，基本按计划交付，偶有偏差但可通过加班/调配补齐",
        "c": "产能波动>±15%，出现明显交付缺口或严重超量（导致资源浪费），未达月度产能目标的80%或超出120%",
    },
    {
        "dim": "SLA达成",
        "check": "月度SLA核心指标达成率（接通率/转化率/合规率/首解率等综合）",
        "a": "SLA达成率≥98%，核心指标全面达标，多项指标超基准值，质量标杆级表现",
        "b": "SLA达成率85%~98%，核心指标基本达标，个别指标在临界值但未触发预警线",
        "c": "SLA达成率<85%，或核心指标中任意一项触发红线（如合规率<90%、客诉率超标等），当月有黄牌/投诉记录",
    },
    {
        "dim": "突发情况",
        "check": "重大故障/系统事故/客户投诉升级/舆情事件",
        "a": "当月无任何突发，且能主动协助其他职场处理突发，应急预案完善",
        "b": "当月有≤2次小规模突发（如短时系统卡顿、个别客户投诉），但已快速恢复，未造成业务影响",
        "c": "当月有重大故障（如大规模系统瘫痪、集中客诉≥5件、舆情发酵），或突发反复发生≥2次未根治，影响业务连续性",
    },
]

for i, std in enumerate(standards):
    r = 20 + i
    ws3.cell(row=r, column=1, value=std["dim"]).font = Font(name="微软雅黑", size=10, bold=True)
    ws3.cell(row=r, column=1).fill = STANDARD_FILL

    ws3.cell(row=r, column=2, value=std["check"])
    ws3.merge_cells(start_row=r, start_column=2, end_row=r, end_column=2)

    ws3.cell(row=r, column=3, value=std["a"])
    ws3.merge_cells(start_row=r, start_column=3, end_row=r, end_column=6)

    ws3.cell(row=r, column=7, value=std["b"])
    ws3.merge_cells(start_row=r, start_column=7, end_row=r, end_column=9)

    ws3.cell(row=r, column=10, value=std["c"])
    ws3.merge_cells(start_row=r, start_column=10, end_row=r, end_column=13)

    for c in range(1, 14):
        cell = ws3.cell(row=r, column=c)
        cell.border = THIN_BORDER
        cell.alignment = LEFT
        if c >= 2:
            cell.font = NORMAL_FONT
        if c in [3,4,5,6]:
            cell.fill = A_FILL
        elif c in [7,8,9]:
            cell.fill = B_FILL
        elif c in [10,11,12,13]:
            cell.fill = C_FILL


# ==========================================
# Sheet 4: 供管自评5项（v3: 预填名称 + 打分标准）
# ==========================================
ws4 = wb.create_sheet("4.供管自评表")

ws4["A1"] = "📝 供管自评5项（Q2）"
ws4["A1"].font = TITLE_FONT
ws4.merge_cells("A1:H1")

ws4["A2"] = "规则：高=1分 | 中=0分 | 低=0分 | 加分=5项中评高的项数（封顶5）"
ws4["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="666666")
ws4.merge_cells("A2:H2")

headers4 = ["供应商ID", "供应商名称", "战略协作", "响应质量", "高效执行", "共同成长", "坦诚透明", "自评加分"]
for i, h in enumerate(headers4, start=1):
    ws4.cell(row=4, column=i, value=h)
style_header_row(ws4, 4, 1, len(headers4))

dv_hml = DataValidation(type="list", formula1='"高,中,低"', allow_blank=True)
ws4.add_data_validation(dv_hml)

for r in range(5, 16):  # 11家
    ws4.cell(row=r, column=1).fill = INPUT_FILL
    ws4.cell(row=r, column=2).fill = INPUT_FILL
    for c in range(3, 8):
        cell = ws4.cell(row=r, column=c)
        cell.fill = INPUT_FILL
        dv_hml.add(cell)
    ws4.cell(row=r, column=8, value=f'=COUNTIF(C{r}:G{r},"高")')
    ws4.cell(row=r, column=8).fill = CALC_FILL

fill_supplier_names(ws4, 5)

apply_border_range(ws4, 4, 15, 1, 8)

widths4 = [12, 20, 12, 12, 12, 12, 12, 12]
for i, w in enumerate(widths4, start=1):
    ws4.column_dimensions[get_column_letter(i)].width = w

# ===== 打分标准区域 =====
ws4["A17"] = "📋 供管自评5项 · 打分标准（供管参照此标准打分，必须有事实依据）"
ws4["A17"].font = Font(name="微软雅黑", size=11, bold=True, color="1F4E78")
ws4["A17"].fill = STANDARD_FILL
ws4.merge_cells("A17:H17")

std4_headers = ["维度", "高（1分）· 评分依据", "中（0分）· 评分依据", "低（0分）· 评分依据"]
col_spans4 = [(1,1), (2,3), (4,5), (6,8)]
for (h, (sc, ec)) in zip(std4_headers, col_spans4):
    ws4.cell(row=18, column=sc, value=h)
    if sc != ec:
        ws4.merge_cells(start_row=18, start_column=sc, end_row=18, end_column=ec)
    for c in range(sc, ec + 1):
        cell = ws4.cell(row=18, column=c)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = CENTER
        cell.border = THIN_BORDER

eval_standards = [
    {
        "dim": "战略协作",
        "high": "主动配合战略级项目落地，能前瞻性提出业务优化建议，在关键决策上与平台保持高度一致",
        "mid": "按要求配合日常项目，不主动但也不抵触，被动执行为主",
        "low": "对战略项目配合度低，抵触变革，或在关键节点不响应",
    },
    {
        "dim": "响应质量",
        "high": "问题响应速度快（<2小时），回复内容准确、完整、有建设性，能举一反三提供解决方案",
        "mid": "问题响应正常（2-8小时），回复内容基本可用，偶有遗漏需追问",
        "low": "响应慢（>8小时或不回复），回复内容敷衍、不完整，需多次追问",
    },
    {
        "dim": "高效执行",
        "high": "任务交付准时率>95%，交付质量超预期，能主动优化执行流程，减少返工",
        "mid": "任务交付基本准时（80%-95%），质量达标，偶有返工",
        "low": "任务经常延期（准时率<80%），质量不达标，频繁返工",
    },
    {
        "dim": "共同成长",
        "high": "主动分享行业经验/最佳实践，参与平台组织的培训和能力共建，团队专业能力持续提升",
        "mid": "按平台要求参与培训，但不主动分享，能力维持现状",
        "low": "拒绝参与培训/共建活动，团队专业能力停滞或下滑",
    },
    {
        "dim": "坦诚透明",
        "high": "主动如实汇报问题（包括自身失误），数据透明无隐瞒，遇到困难及时上报",
        "mid": "被问到才汇报问题，数据基本真实但不够主动",
        "low": "隐瞒问题或虚报数据，被发现后才承认，缺乏诚信",
    },
]

for i, std in enumerate(eval_standards):
    r = 19 + i
    ws4.cell(row=r, column=1, value=std["dim"]).font = Font(name="微软雅黑", size=10, bold=True)
    ws4.cell(row=r, column=1).fill = STANDARD_FILL

    ws4.cell(row=r, column=2, value=std["high"])
    ws4.merge_cells(start_row=r, start_column=2, end_row=r, end_column=3)
    ws4.cell(row=r, column=4, value=std["mid"])
    ws4.merge_cells(start_row=r, start_column=4, end_row=r, end_column=5)
    ws4.cell(row=r, column=6, value=std["low"])
    ws4.merge_cells(start_row=r, start_column=6, end_row=r, end_column=8)

    for c in range(1, 9):
        cell = ws4.cell(row=r, column=c)
        cell.border = THIN_BORDER
        cell.alignment = LEFT
        if c >= 2:
            cell.font = NORMAL_FONT
        if c in [2,3]:
            cell.fill = A_FILL
        elif c in [4,5]:
            cell.fill = B_FILL
        elif c in [6,7,8]:
            cell.fill = C_FILL


# ==========================================
# Sheet 5: 评级结果（v3: 11家排名规则）
# ==========================================
ws5 = wb.create_sheet("5.评级结果")

ws5["A1"] = "🏆 供应商分级评级结果（自动计算）"
ws5["A1"].font = TITLE_FONT
ws5.merge_cells("A1:O1")

ws5["A2"] = "⚠️ 全部自动计算。11家分位规则：前3名高、4-8名中、9-11名低"
ws5["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="666666")
ws5.merge_cells("A2:O2")

headers5 = ["供应商ID", "供应商名称", "Q2赛马基础分", "Q2合规扣分", "Q2稳定性得分",
            "Q2供管自评加分", "最终得分", "排名", "X档(贡献)", "环比%", "Y档(趋势)",
            "九宫格位置", "ABC评级", "偏科标记", "评级说明"]
for i, h in enumerate(headers5, start=1):
    ws5.cell(row=4, column=i, value=h)
style_header_row(ws5, 4, 1, len(headers5))

for r in range(5, 16):  # 11家
    src = r - 1
    ws5.cell(row=r, column=1, value=f"=IF('1.赛马分原始数据'!A{src}=\"\",\"\",'1.赛马分原始数据'!A{src})")
    ws5.cell(row=r, column=2, value=f"=IF('1.赛马分原始数据'!B{src}=\"\",\"\",'1.赛马分原始数据'!B{src})")
    ws5.cell(row=r, column=3, value=f"='1.赛马分原始数据'!T{src}")
    ws5.cell(row=r, column=3).number_format = "0.0"
    ws5.cell(row=r, column=4, value=f"='2.SLA扣分台账'!F{src}")
    ws5.cell(row=r, column=5, value=f"='3.稳定性检查表'!O{src}")
    ws5.cell(row=r, column=6, value=f"='4.供管自评表'!H{src}")
    ws5.cell(row=r, column=7, value=f"=ROUND(C{r}-D{r}+E{r}+F{r},1)")
    ws5.cell(row=r, column=7).fill = RESULT_FILL
    ws5.cell(row=r, column=7).font = Font(name="微软雅黑", size=11, bold=True)
    ws5.cell(row=r, column=8, value=f'=IF(G{r}=0,"",RANK(G{r},$G$5:$G$15,0))')
    # X档: 11家规则 - 前3高、4-8中、9-11低
    ws5.cell(row=r, column=9, value=f'=IF(H{r}="","",IF(H{r}<=3,"高",IF(H{r}<=8,"中","低")))')
    ws5.cell(row=r, column=9).fill = CALC_FILL
    ws5.cell(row=r, column=10, value=f"='1.赛马分原始数据'!U{src}")
    ws5.cell(row=r, column=10).number_format = '0.0"%"'
    ws5.cell(row=r, column=11, value=f"='1.赛马分原始数据'!V{src}")
    ws5.cell(row=r, column=11).fill = CALC_FILL
    ws5.cell(row=r, column=12, value=f'=IF(OR(I{r}="",K{r}="数据不全"),"",I{r}&"-"&K{r})')
    ws5.cell(row=r, column=12).fill = CALC_FILL
    ws5.cell(row=r, column=13, value=(
        f'=IF(B{r}="","",'
        f'IF(\'2.SLA扣分台账\'!G{src}="是·直接C级","C(红线)",'
        f'IF(I{r}="高",IF(K{r}="下降","A(防下滑)","A"),'
        f'IF(I{r}="中","B",'
        f'IF(I{r}="低","C","")))))'
    ))
    ws5.cell(row=r, column=13).fill = RESULT_FILL
    ws5.cell(row=r, column=13).font = Font(name="微软雅黑", size=11, bold=True)
    ws5.cell(row=r, column=14, value=f"='1.赛马分原始数据'!W{src}")
    ws5.cell(row=r, column=14).fill = CALC_FILL
    ws5.cell(row=r, column=15, value=f'=IF(M{r}="","",IF(LEFT(M{r},1)="A","优秀·资源优先倾斜",IF(LEFT(M{r},1)="B","合格·维持现状",IF(LEFT(M{r},1)="C","不合格·整改或清退",""))))')

apply_border_range(ws5, 4, 15, 1, 15)

widths5 = [12, 20, 14, 12, 14, 14, 12, 8, 10, 10, 10, 14, 12, 12, 22]
for i, w in enumerate(widths5, start=1):
    ws5.column_dimensions[get_column_letter(i)].width = w

ws5.freeze_panes = "C5"

for r in range(5, 16):
    ws5.conditional_formatting.add(f"M{r}", FormulaRule(formula=[f'LEFT(M{r},1)="A"'], fill=A_FILL))
    ws5.conditional_formatting.add(f"M{r}", FormulaRule(formula=[f'LEFT(M{r},1)="B"'], fill=B_FILL))
    ws5.conditional_formatting.add(f"M{r}", FormulaRule(formula=[f'LEFT(M{r},1)="C"'], fill=C_FILL))

# 九宫格分布统计区
ws5["A19"] = "📊 九宫格分布统计"
ws5["A19"].font = SUBHEADER_FONT
ws5["A19"].fill = SUBHEADER_FILL
ws5.merge_cells("A19:O19")
ws5["A19"].alignment = Alignment(horizontal="left", vertical="center")

ws5.cell(row=20, column=1, value="九宫格位置").font = SUBHEADER_FONT
ws5.cell(row=20, column=2, value="含义").font = SUBHEADER_FONT
ws5.cell(row=20, column=3, value="数量").font = SUBHEADER_FONT
for c in range(1, 4):
    ws5.cell(row=20, column=c).fill = SUBHEADER_FILL
    ws5.cell(row=20, column=c).alignment = CENTER
    ws5.cell(row=20, column=c).border = THIN_BORDER

grid_labels = [
    ("高-上升", "战略绑定"), ("高-持平", "核心保持"), ("高-下降", "防止下滑"),
    ("中-上升", "重点培养"), ("中-持平", "稳定维持"), ("中-下降", "关注下降"),
    ("低-上升", "边缘培养"), ("低-持平", "观察区"), ("低-下降", "预警清退"),
]
for i, (grid, meaning) in enumerate(grid_labels):
    row = 21 + i
    ws5.cell(row=row, column=1, value=grid)
    ws5.cell(row=row, column=2, value=meaning)
    ws5.cell(row=row, column=3, value=f'=COUNTIF(L5:L15,"{grid}")')
    ws5.cell(row=row, column=3).fill = CALC_FILL
    for c in range(1, 4):
        ws5.cell(row=row, column=c).border = THIN_BORDER


# ==========================================
# Sheet 6: 三张清单（v5: 自动从Sheet5抓取）
# ==========================================
ws6 = wb.create_sheet("6.三张清单")

ws6["A1"] = "📋 三张清单（自动生成 · 保留/培养/优化）"
ws6["A1"].font = TITLE_FONT
ws6.merge_cells("A1:G1")

ws6["A2"] = "前4列自动从Sheet5抓取，后3列根据建议手填"
ws6["A2"].font = Font(name="微软雅黑", size=9, italic=True, color="666666")
ws6.merge_cells("A2:G2")

# ---- A级保留清单（行3-9）----
ws6["A3"] = "🟢 保留清单（A级）— 自动抓取"
ws6["A3"].font = Font(name="微软雅黑", size=12, bold=True, color="006100")
ws6["A3"].fill = A_FILL
ws6.merge_cells("A3:G3")

a_headers = ["供应商名称", "最终得分", "九宫格", "偏科标记", "关键优势", "保留理由", "资源倾斜建议"]
for i, h in enumerate(a_headers, start=1):
    ws6.cell(row=4, column=i, value=h)
style_header_row(ws6, 4, 1, 7)

# A级数据行：5-9（A级最多3家，留5行余量）
# 用IFERROR+INDEX+SMALL+IF数组公式抓取评级以A开头的供应商
for i in range(5):
    r = 5 + i
    rank_idx = i + 1  # 第i+1个A级
    # A: 供应商名称 - 数组公式抓取第rank_idx个A级
    ws6.cell(row=r, column=1, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$B$5:$B$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="A",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=1).fill = A_FILL
    # B: 最终得分
    ws6.cell(row=r, column=2, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$G$5:$G$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="A",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=2).fill = A_FILL
    ws6.cell(row=r, column=2).number_format = "0.0"
    # C: 九宫格
    ws6.cell(row=r, column=3, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$L$5:$L$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="A",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=3).fill = A_FILL
    # D: 偏科标记
    ws6.cell(row=r, column=4, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$N$5:$N$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="A",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=4).fill = A_FILL
    # E-G: 手填部分
    for c in range(5, 8):
        ws6.cell(row=r, column=c).fill = INPUT_FILL

# ---- B级培养清单（行12-18）----
ws6["A11"] = "🟡 培养清单（B级）— 自动抓取"
ws6["A11"].font = Font(name="微软雅黑", size=12, bold=True, color="9C5700")
ws6["A11"].fill = B_FILL
ws6.merge_cells("A11:G11")

b_headers = ["供应商名称", "最终得分", "九宫格", "偏科标记", "短板", "培养方向", "提升路径"]
for i, h in enumerate(b_headers, start=1):
    ws6.cell(row=12, column=i, value=h)
style_header_row(ws6, 12, 1, 7)

# B级数据行：13-18（B级最多5家，留6行）
for i in range(6):
    r = 13 + i
    rank_idx = i + 1
    ws6.cell(row=r, column=1, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$B$5:$B$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="B",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=1).fill = B_FILL
    ws6.cell(row=r, column=2, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$G$5:$G$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="B",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=2).fill = B_FILL
    ws6.cell(row=r, column=2).number_format = "0.0"
    ws6.cell(row=r, column=3, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$L$5:$L$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="B",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=3).fill = B_FILL
    ws6.cell(row=r, column=4, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$N$5:$N$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="B",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=4).fill = B_FILL
    for c in range(5, 8):
        ws6.cell(row=r, column=c).fill = INPUT_FILL

# ---- C级优化清单（行20-26）----
ws6["A19"] = "🔴 优化清单（C级）— 自动抓取"
ws6["A19"].font = Font(name="微软雅黑", size=12, bold=True, color="9C0006")
ws6["A19"].fill = C_FILL
ws6.merge_cells("A19:G19")

c_headers = ["供应商名称", "最终得分", "九宫格", "偏科标记", "主要问题", "整改/清退路径", "时间节点"]
for i, h in enumerate(c_headers, start=1):
    ws6.cell(row=20, column=i, value=h)
style_header_row(ws6, 20, 1, 7)

# C级数据行：21-26（C级最多3家，留6行）
for i in range(6):
    r = 21 + i
    rank_idx = i + 1
    ws6.cell(row=r, column=1, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$B$5:$B$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="C",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=1).fill = C_FILL
    ws6.cell(row=r, column=2, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$G$5:$G$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="C",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=2).fill = C_FILL
    ws6.cell(row=r, column=2).number_format = "0.0"
    ws6.cell(row=r, column=3, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$L$5:$L$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="C",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=3).fill = C_FILL
    ws6.cell(row=r, column=4, value=(
        f'=IFERROR(INDEX(\'5.评级结果\'!$N$5:$N$15,'
        f'SMALL(IF(LEFT(\'5.评级结果\'!$M$5:$M$15,1)="C",ROW(\'5.评级结果\'!$M$5:$M$15)-ROW(\'5.评级结果\'!$M$5)+1),'
        f'{rank_idx})),"")'
    ))
    ws6.cell(row=r, column=4).fill = C_FILL
    for c in range(5, 8):
        ws6.cell(row=r, column=c).fill = INPUT_FILL

apply_border_range(ws6, 4, 9, 1, 7)
apply_border_range(ws6, 12, 18, 1, 7)
apply_border_range(ws6, 20, 26, 1, 7)

for i, w in enumerate([20, 12, 12, 12, 22, 22, 22], start=1):
    ws6.column_dimensions[get_column_letter(i)].width = w


# ==========================================
# Sheet 7: 集中度管控
# ==========================================
ws7 = wb.create_sheet("7.集中度管控")

ws7["A1"] = "📊 集中度管控检查"
ws7["A1"].font = TITLE_FONT
ws7.merge_cells("A1:E1")

ws7["A3"] = "规则：A级供应商合计产能占比 ≤ 40%（PDF第十六条）"
ws7["A3"].font = Font(name="微软雅黑", size=10, bold=True, color="C00000")
ws7.merge_cells("A3:E3")

ws7["A5"] = "步骤1：A级供应商自动带出，只需填产能数据"
ws7["A5"].font = SUBHEADER_FONT
ws7["A5"].fill = SUBHEADER_FILL
ws7.merge_cells("A5:E5")

cap_headers = ["供应商名称（自动）", "Q2月均产能（手填）", "产能占比", "是否单家>25%", "备注"]
for i, h in enumerate(cap_headers, start=1):
    ws7.cell(row=6, column=i, value=h)
style_header_row(ws7, 6, 1, 5)

# A级供应商名称自动从Sheet6抓取（Sheet6已从Sheet5抓了A级）
for i in range(3):  # A级最多3家
    r = 7 + i
    src_r = 5 + i  # Sheet6 A级行
    ws7.cell(row=r, column=1, value=f"=IF('6.三张清单'!A{src_r}=\"\",\"\",'6.三张清单'!A{src_r})")
    ws7.cell(row=r, column=1).fill = A_FILL
    ws7.cell(row=r, column=2).fill = INPUT_FILL
    ws7.cell(row=r, column=3, value=f'=IF(B{r}=0,"",IFERROR(B{r}/$B$12,0))')
    ws7.cell(row=r, column=3).number_format = "0.0%"
    ws7.cell(row=r, column=3).fill = CALC_FILL
    ws7.cell(row=r, column=4, value=f'=IF(C{r}="","",IF(C{r}>0.25,"⚠️ 超标","达标"))')
    ws7.cell(row=r, column=4).fill = CALC_FILL
    ws7.cell(row=r, column=5).fill = INPUT_FILL

ws7.cell(row=11, column=1, value="A级合计").font = Font(bold=True)
ws7.cell(row=11, column=2, value="=SUM(B7:B9)")
ws7.cell(row=11, column=3, value="=SUM(C7:C9)")
ws7.cell(row=11, column=3).number_format = "0.0%"
for c in range(1, 6):
    ws7.cell(row=11, column=c).fill = RESULT_FILL
    ws7.cell(row=11, column=c).font = Font(name="微软雅黑", size=10, bold=True)

ws7.cell(row=12, column=1, value="金条产线总产能（含所有级）").font = Font(bold=True)
ws7.cell(row=12, column=2).fill = INPUT_FILL
ws7.cell(row=12, column=2).font = Font(bold=True)

ws7["A14"] = "集中度检查结论"
ws7["A14"].font = SUBHEADER_FONT
ws7["A14"].fill = SUBHEADER_FILL
ws7.merge_cells("A14:E14")

ws7["A15"] = "A级合计产能占比"
ws7["B15"] = "=C11"
ws7["B15"].number_format = "0.0%"
ws7["B15"].font = Font(bold=True)

ws7["A16"] = "阈值"
ws7["B16"] = 0.4
ws7["B16"].number_format = "0.0%"

ws7["A17"] = "是否达标"
ws7["B17"] = '=IF(B15<=B16,"✅ 达标","⚠️ 超标·需调整")'
ws7["B17"].font = Font(bold=True, size=12)

for i, w in enumerate([24, 20, 14, 16, 20], start=1):
    ws7.column_dimensions[get_column_letter(i)].width = w


# ==========================================
# Sheet 8: 清退路径
# ==========================================
ws8 = wb.create_sheet("8.清退路径")

ws8["A1"] = "🚪 清退路径判定（针对C级供应商）"
ws8["A1"].font = TITLE_FONT
ws8.merge_cells("A1:G1")

headers8 = ["供应商名称（自动）", "是否红线违规", "是否连续两季C", "当季C且趋势下降", "首次C趋势持平/上升",
            "走哪条路径（自动）", "关键时间节点（自动）"]
for i, h in enumerate(headers8, start=1):
    ws8.cell(row=5, column=i, value=h)
style_header_row(ws8, 5, 1, 7)

# C级供应商名称自动从Sheet6抓取，判断条件自动从Sheet5带出
for r in range(6, 12):  # C级最多3家，留6行
    src_s6 = 21 + (r - 6)  # Sheet6 C级从21行开始
    # A: 供应商名称（自动）
    ws8.cell(row=r, column=1, value=f"=IF('6.三张清单'!A{src_s6}=\"\",\"\",'6.三张清单'!A{src_s6})")
    ws8.cell(row=r, column=1).fill = C_FILL
    # B: 是否红线违规（自动从Sheet2判断）
    # 需要通过供应商名称反查Sheet2的红线状态
    ws8.cell(row=r, column=2, value=(
        f'=IF(A{r}="","",'
        f'IF(IFERROR(VLOOKUP(A{r},\'2.SLA扣分台账\'!$B$5:$G$15,6,FALSE),"")="🔴 是·直接C级","是","否"))'
    ))
    ws8.cell(row=r, column=2).fill = CALC_FILL
    # C: 是否连续两季C（首次盘点默认"否"）
    ws8.cell(row=r, column=3, value=f'=IF(A{r}="","","否（首次盘点）")')
    ws8.cell(row=r, column=3).fill = CALC_FILL
    # D: 当季C且趋势下降（自动从Sheet5判断）
    ws8.cell(row=r, column=4, value=(
        f'=IF(A{r}="","",'
        f'IF(AND(IFERROR(VLOOKUP(A{r},\'5.评级结果\'!$B$5:$L$15,11,FALSE),"")="下降",'
        f'LEFT(IFERROR(VLOOKUP(A{r},\'5.评级结果\'!$B$5:$M$15,12,FALSE),""),1)="C"),"是","否"))'
    ))
    ws8.cell(row=r, column=4).fill = CALC_FILL
    # E: 首次C趋势持平/上升（自动）
    ws8.cell(row=r, column=5, value=(
        f'=IF(A{r}="","",'
        f'IF(AND(LEFT(IFERROR(VLOOKUP(A{r},\'5.评级结果\'!$B$5:$M$15,12,FALSE),""),1)="C",'
        f'IFERROR(VLOOKUP(A{r},\'5.评级结果\'!$B$5:$L$15,11,FALSE),"")<>"下降"),"是","否"))'
    ))
    ws8.cell(row=r, column=5).fill = CALC_FILL
    # F: 走哪条路径（自动判定）
    ws8.cell(row=r, column=6, value=(
        f'=IF(A{r}="","",'
        f'IF(B{r}="是","路径三：红线清退·联合评估",'
        f'IF(C{r}="是","路径一·末期：启动解约",'
        f'IF(D{r}="是","路径二：快车道·30天交接",'
        f'IF(E{r}="是","路径一：常规·整改30天→观察→复评",'
        f'"⚠️ 请核对判定条件")))))'
    ))
    ws8.cell(row=r, column=6).fill = RESULT_FILL
    # G: 关键时间节点（自动）
    ws8.cell(row=r, column=7, value=(
        f'=IF(A{r}="","",'
        f'IF(B{r}="是","管理层决策后执行",'
        f'IF(C{r}="是","启动解约",'
        f'IF(D{r}="是","D0通知→D30交接完成",'
        f'IF(E{r}="是","D30整改报告→D90复评",'
        f'"")))))'
    ))

apply_border_range(ws8, 5, 11, 1, 7)

ws8["A14"] = "三条路径详解"
ws8["A14"].font = SUBHEADER_FONT
ws8["A14"].fill = SUBHEADER_FILL
ws8.merge_cells("A14:G14")

paths_info = [
    ("路径一：常规清退", "首次C，趋势持平/上升", "整改期30天 → 观察期1季度 → 复评 → 达标升B/未达标解约", "D30整改报告 / D90复评决策"),
    ("路径二：快车道清退", "当季C 且 趋势下降", "通知 → 30天内完成业务交接", "D0通知 / D30交接完成"),
    ("路径三：红线清退", "触发红线违规", "联合评估 → 管理层决策 → 执行交接", "视违规严重程度"),
]
ws8.cell(row=15, column=1, value="路径").font = SUBHEADER_FONT
ws8.cell(row=15, column=2, value="触发条件").font = SUBHEADER_FONT
ws8.cell(row=15, column=3, value="流程").font = SUBHEADER_FONT
ws8.cell(row=15, column=4, value="关键节点").font = SUBHEADER_FONT
for c in range(1, 5):
    ws8.cell(row=15, column=c).fill = SUBHEADER_FILL
    ws8.cell(row=15, column=c).alignment = CENTER

for i, (p, t, f, n) in enumerate(paths_info, start=16):
    ws8.cell(row=i, column=1, value=p).font = Font(bold=True)
    ws8.cell(row=i, column=2, value=t)
    ws8.cell(row=i, column=3, value=f)
    ws8.cell(row=i, column=4, value=n)
    ws8.merge_cells(start_row=i, start_column=3, end_row=i, end_column=5)
    ws8.merge_cells(start_row=i, start_column=4, end_row=i, end_column=7)
    for c in range(1, 8):
        ws8.cell(row=i, column=c).alignment = LEFT
        ws8.cell(row=i, column=c).border = THIN_BORDER

for i, w in enumerate([20, 14, 14, 14, 14, 28, 22], start=1):
    ws8.column_dimensions[get_column_letter(i)].width = w


# ==========================================
# 保存
# ==========================================
wb.save(OUTPUT)
print(f"✅ Excel模板 v3 已生成: {OUTPUT}")

import os
size_kb = os.path.getsize(OUTPUT) / 1024
print(f"📊 文件大小: {size_kb:.1f} KB")
print(f"📋 包含 {len(wb.sheetnames)} 个工作表")
print(f"\n🆕 v3 更新:")
print(f"   ✓ 预填11家供应商名称到所有Sheet")
print(f"   ✓ 稳定性检查表4项A/B/C打满打分标准+行为描述")
print(f"   ✓ 供管自评5项高/中/低打满打分标准+行为描述")
print(f"   ✓ 分位规则调整为11家：前3高/4-8中/9-11低")
