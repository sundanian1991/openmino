#!/usr/bin/env python3
"""Render supplier grading PPT using MckEngine — warm orange theme."""

import sys
import os
sys.path.insert(0, os.path.expanduser('~/.workbuddy/skills/mck-ppt-design'))
from pptx.dml.color import RGBColor

# Import engine and all submodules
from mck_ppt import MckEngine
import mck_ppt.engine as _e
import mck_ppt.core as _co
import mck_ppt.constants as _c

# ── Color mapping: old -> warm orange ──
_COLOR_MAP = {
    0x051C2C: 0xCC6B1E,  # NAVY -> warm orange
    0x333333: 0x4A4A4A,  # DARK_GRAY
    0x666666: 0xB8B8B8,  # MED_GRAY
    0xCCCCCC: 0xD4D0CA,  # LINE_GRAY
    0xF2F2F2: 0xFFF3E6,  # BG_GRAY
    0x006BA6: 0xCC6B1E,  # ACCENT_BLUE -> warm orange
    0x007A53: 0x8BA04B,  # ACCENT_GREEN -> olive
    0xD46A00: 0xE8963E,  # ACCENT_ORANGE -> light orange
    0xC62828: 0xC0503A,  # ACCENT_RED -> brick
    0xE3F2FD: 0xFFF3E6,  # LIGHT_BLUE -> warm white
    0xE8F5E9: 0xF5F0E0,  # LIGHT_GREEN -> beige
    0xFFF3E0: 0xFFE8CC,  # LIGHT_ORANGE
    0xFFEBEE: 0xFDE8E0,  # LIGHT_RED
}

def _hex_to_rgb(h):
    return RGBColor((h >> 16) & 0xFF, (h >> 8) & 0xFF, h & 0xFF)

# Patch all modules' globals
for name in ['NAVY','DARK_GRAY','MED_GRAY','LINE_GRAY','BG_GRAY',
             'ACCENT_BLUE','ACCENT_GREEN','ACCENT_ORANGE','ACCENT_RED',
             'LIGHT_BLUE','LIGHT_GREEN','LIGHT_ORANGE','LIGHT_RED']:
    old_val = getattr(_c, name)
    old_hex = (old_val[0] << 16) | (old_val[1] << 8) | old_val[2]
    if old_hex in _COLOR_MAP:
        new_val = _hex_to_rgb(_COLOR_MAP[old_hex])
        setattr(_c, name, new_val)
        setattr(_e, name, new_val)
        setattr(_co, name, new_val)

# Patch function default args (Python binds defaults at def time)
def _patch_defaults(func):
    if not hasattr(func, '__defaults__') or func.__defaults__ is None:
        return
    new_defaults = []
    for d in func.__defaults__:
        if isinstance(d, RGBColor):
            h = (d[0] << 16) | (d[1] << 8) | d[2]
            new_defaults.append(_hex_to_rgb(_COLOR_MAP.get(h, h)))
        else:
            new_defaults.append(d)
    func.__defaults__ = tuple(new_defaults)

# Patch all functions and methods in core + engine
for mod in [_co, _e]:
    for attr_name in dir(mod):
        obj = getattr(mod, attr_name, None)
        if callable(obj):
            _patch_defaults(obj)
            if hasattr(obj, '__func__'):
                _patch_defaults(obj.__func__)
    # Patch class methods
    for attr_name in dir(mod):
        cls = getattr(mod, attr_name, None)
        if isinstance(cls, type):
            for mname in dir(cls):
                m = getattr(cls, mname, None)
                if callable(m):
                    if hasattr(m, '__func__'):
                        _patch_defaults(m.__func__)
                    else:
                        _patch_defaults(m)

from mck_ppt.constants import *

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return RGBColor(int(hex_str[0:2], 16), int(hex_str[2:4], 16), int(hex_str[4:6], 16))

WARM_PRIMARY = RGBColor(0xCC, 0x6B, 0x1E)
WARM_BG      = RGBColor(0xFF, 0xF3, 0xE6)
WARM_LIGHT   = RGBColor(0xFF, 0xE8, 0xCC)
WARM_OLIVE   = RGBColor(0x8B, 0xA0, 0x4B)
WARM_BRICK   = RGBColor(0xC0, 0x50, 0x3A)

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(OUTPUT_DIR, '供应商分级清退管理制度.pptx')

eng = MckEngine(total_slides=14)

# S1: Cover
eng.cover(
    title='供应商分级清退管理制度',
    subtitle='三维评分·九宫格映射·清退机制',
    author='服务组',
    date='2026年6月'
)

# S2: TOC
eng.toc(
    title='目录',
    items=[
        ('1', '评估体系', '三维评分+公式+扣分标准'),
        ('2', '九宫格评级', '贡献×趋势=ABC档位'),
        ('3', '管控动作', '差异化分级管理'),
        ('4', '清退机制', '三触发条件+四步流程'),
        ('5', '盘点与操作', '半年度盘点+季度时间表'),
    ]
)

# S3: 三维评分体系
eng.table_insight(
    title='三维评分体系构成评估基础',
    headers=['维度', '说明', '满分/扣分', '数据来源'],
    rows=[
        ['赛马成绩', '季度各月均值', '100分', '业务系统'],
        ['合规扣分', '违规事件累计扣分', '扣5-10分/次', '巡检记录'],
        ['稳定性得分', '人员/产能/SLA/突发', '+5/-10分', '供管检查表'],
        ['供管自评', '五项主观评估', '0-5分', '供管评估'],
    ],
    insights=['最终得分=赛马基础分-合规扣分+稳定性得分+供管自评，最低0分'],
    insight_title='核心公式',
    source='制度第四条、第五条'
)

# S4: 评分公式流程
eng.process_chevron(
    title='评分公式实现加减分制平衡',
    steps=[
        ('赛马', '季度均值', '满分100'),
        ('合规', '黄牌-10', '投诉-5'),
        ('稳定', 'A:+5分', 'C:-10分'),
        ('自评', '五项各0/1', '满分5分'),
        ('终分', '最低0分', '不出现负分'),
    ],
    source='制度第五条'
)

# S5: 稳定性三档
eng.three_stat(
    title='稳定性得分采用加减分三档制',
    stats=[
        ('+5分', '稳定A档', True),
        ('0分', '波动B档', False),
        ('-10分', '失控C档', False),
    ],
    detail_items='四项检查表逐项勾选：人员变动、产能波动、SLA达成、突发情况\n四项均A=+5分，均B=0分，均C=-10分，供管只需勾选系统自动计算',
    source='制度第七条'
)

# S6: 合规扣分标准
eng.data_table(
    title='合规扣分标准明确三类红线',
    headers=['事件类型', '扣分', '触发条件'],
    rows=[
        ['黄牌整改', '-10分/次', '巡检发现并下发整改函'],
        ['投诉/一般违规', '-5分/次', '质检通报或客户投诉'],
        ['红线违规', '直接评级C', '安全事件/数据泄露'],
        ['红线类型', '安全+数据+合规', '严重违规一次性降级'],
    ],
    source='制度第六条'
)

# S7: 九宫格矩阵 — 暖色系背景
eng.matrix_2x2(
    title='九宫格映射将贡献与趋势交叉评级',
    quadrants=[
        ('A保留/优秀', hex_to_rgb('#FFF3E6'), '高贡献供应商：趋势持平或上升则资源倾斜，下降则启动保留动作'),
        ('B需关注', hex_to_rgb('#F5F0E0'), '中贡献供应商：趋势下降则月度跟踪，持平或上升则培养维持'),
        ('C不合格', hex_to_rgb('#FFE8CC'), '低贡献+持平/上升：启动30天整改流程'),
        ('C淘汰', hex_to_rgb('#FDE8E0'), '低贡献+趋势下降：当季直接启动快车道清退'),
    ],
    axis_labels=('贡献度→', '↑趋势'),
    source='制度第九条、第十条'
)

# S8: ABC管控动作 — 暖色状态灯
eng.rag_status(
    title='ABC评级对应差异化管控动作',
    headers=['评级', '状态', '沟通频次', '份额策略', '关键动作'],
    rows=[
        ['A优秀', WARM_OLIVE, '月度1对1', '优先增量', '深度绑定+联合规划'],
        ['B合格', WARM_PRIMARY, '季度例行', '基础份额', '培养观察+改善计划'],
        ['C不合格', WARM_BRICK, '月度约谈', '逐步缩减', '整改或启动清退'],
    ],
    source='制度附录四'
)

# S9: 清退流程
eng.process_chevron(
    title='清退流程四步走确保产能平稳',
    steps=[
        ('预警', '首发C评级', '30天整改'),
        ('观察', '持续跟踪', '下一季评估'),
        ('解约', '连续两次C', '30天交接'),
        ('分配', '份额再分配', '按赛马排名'),
    ],
    source='制度第十一条、第十二条'
)

# S10: 半年度盘点
eng.four_column(
    title='半年度盘点追加三个战略维度',
    items=[
        ('1', '战略意义', '关键产线不可替代性评估，管理层联合判断'),
        ('2', '长期潜力', '规模扩张意愿+技术升级+团队稳定性'),
        ('3', '风险敞口', '客户集中度+财务状况+舆情监控'),
        ('4', '校准决策', '季度评级与半年度校准交叉验证最终决策'),
    ],
    source='制度第十四条、第十五条'
)

# S11: 供管工作量
eng.big_number(
    title='供管每季度约6小时完成评估',
    number='6',
    unit='小时/季度',
    description='稳定性评定2h+自评1.5h+九宫格30min+清单1h+通知1h',
    detail_items=[
        '业管负责：赛马成绩+合规事件数据拉取',
        '供管只做判断性工作，不做数据性工作',
    ],
    source='制度附录五'
)

# S12: 时间表
eng.timeline(
    title='季度评估严格按时间节点推进确保制度落地',
    milestones=[
        ('前1周', '业管数据'),
        ('前5天', '稳定性评定'),
        ('前3天', '自评加分'),
        ('季末', '九宫格'),
        ('后3天', '三张清单'),
        ('后10天', '整改通知'),
    ],
    source='制度附录一'
)

# S13: 核心要点
eng.key_takeaway(
    title='三维评分与九宫格映射实现优者留劣者退',
    left_text='三维评分体系（赛马+合规+稳定性+自评）→九宫格映射（贡献×趋势）→ABC评级→差异化管控动作',
    takeaways=[
        '优者留：A级深度绑定+资源倾斜，集中度管控A级≤60%',
        '劣者退：连续两季C或当季C且下降即触发清退',
        '半年度盘点追加战略维度校准评级决策',
    ],
    source='《供应商分级清退管理制度 v1.1》2026-06-01生效'
)

# S14: Closing
eng.closing(
    title='谢谢',
    message='制度自2026年6月1日起生效'
)

eng.save(OUTPUT)
print(f'Saved to: {OUTPUT}')
