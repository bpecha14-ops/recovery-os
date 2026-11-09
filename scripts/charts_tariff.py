# -*- coding: utf-8 -*-
"""Charts for the Tariff Refund OS strategy report (Russian labels).
Template 07 'Crystal Blue' body palette. Rules: typesetting/charts.md
- no top/right spines, dashed grid 20% (or none when values labeled)
- no internal chart titles (captions live in the PDF)
- constrained_layout=True, legend outside plot, no legend frame
"""
import matplotlib
import matplotlib.font_manager as fm

fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')

import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['font.size'] = 11

OUT = '/home/z/my-project/download/assets_tariff'

# Template 07 body palette (single blue family)
ACCENT   = '#2d7ab3'   # XS accent
HEADER   = '#1a4a7a'   # M tier deep blue
MID      = '#5a7a96'   # muted blue-gray
LIGHT    = '#8fb3d1'   # light family
PALE     = '#c0d0e2'   # S tier border
TEXTP    = '#142840'
MUTED    = '#5a7a96'


def style_ax(ax, keep_x=True, keep_y=True):
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(keep_y)
    ax.spines['bottom'].set_visible(keep_x)
    for s in ('left', 'bottom'):
        ax.spines[s].set_color('#9fb2c4')
        ax.spines[s].set_linewidth(0.8)
    ax.tick_params(colors=TEXTP, labelsize=10.5)


# ─────────────────────────────────────────────────────────────────────────
# Chart 1 — competitor density across scanned niches
# ─────────────────────────────────────────────────────────────────────────
niches = [
    'Возврат тарифов (CAPE) для SMB',
    'UK MTD ITSA (налоги арендодателей)',
    'Certified payroll (Davis-Bacon)',
    'GovCon / RFP-инструменты',
    'Home care платформы',
    'EU AI Act compliance',
    'Duty drawback софт',
    'HTS-классификация (AI)',
    'Photo-to-quote для стройки',
    'Ветеринарные AI-скрайбы',
    'AI-SEO / GEO-аналитика',
    'Голосовые AI-приёмные',
]
counts = [1, 5, 6, 8, 8, 9, 9, 9, 10, 11, 20, 30]

fig, ax = plt.subplots(figsize=(8.6, 4.9), constrained_layout=True)
colors = [ACCENT if i == 0 else LIGHT for i in range(len(niches))]
bars = ax.barh(niches, counts, color=colors, height=0.62, edgecolor='none')
for b, c, i in zip(bars, counts, range(len(niches))):
    label = f'{c}+' if c >= 8 else str(c)
    if c == 1:
        label = '0–1 (пусто!)'
    x_pos = max(b.get_width() + 0.45, 2.2) if c == 1 else b.get_width() + 0.45
    ax.text(x_pos, b.get_y() + b.get_height() / 2, label,
            va='center', ha='left', fontsize=10.5,
            color=ACCENT if c == 1 else TEXTP,
            fontweight='bold' if c == 1 else 'normal')
# emphasize the winner niche label on the Y axis
labels = ax.get_yticklabels()
labels[0].set_color(ACCENT)
labels[0].set_fontweight('bold')
style_ax(ax, keep_x=False, keep_y=True)
ax.set_xlim(0, 33.5)
ax.set_xticks([])
ax.tick_params(axis='y', length=0)
ax.set_xlabel('')
fig.savefig(f'{OUT}/chart1_density.png', dpi=200, facecolor='white')
plt.close(fig)

# ─────────────────────────────────────────────────────────────────────────
# Chart 2 — weighted scoring of the top-3 finalists (raw 1-10 by criterion)
# ─────────────────────────────────────────────────────────────────────────
criteria = [
    'Катализатор: срочность\nи масштаб (вес ×3)',
    'Низкая плотность\nконкурентов (вес ×3)',
    'Скорость до первой\nвыручки (вес ×2)',
    'Глобальность\nрынка (вес ×2)',
    'Реализуемость\nсоло-MVP (вес ×2)',
    'Маржинальность\n(вес ×2)',
    'Повторяющаяся\nвыручка (вес ×2)',
    'Дешёвый CAC:\nSEO и каналы (вес ×2)',
]
tariff = [10, 9, 9, 8, 9, 9, 9, 9]
cpay   = [8, 6, 7, 4, 7, 8, 7, 7]
mtd    = [9, 5, 6, 3, 7, 7, 8, 6]

import numpy as np
y = np.arange(len(criteria))[::-1]
h = 0.26

fig, ax = plt.subplots(figsize=(8.6, 6.2), constrained_layout=True)
b1 = ax.barh(y + h, tariff, height=h, color=ACCENT, label='TariffRefund OS (итог 163/170)', edgecolor='none')
b2 = ax.barh(y, cpay, height=h, color=MID, label='Certified Payroll AI (итог 122/170)', edgecolor='none')
b3 = ax.barh(y - h, mtd, height=h, color=PALE, label='UK MTD Landlord Tax (итог 116/170)', edgecolor='none')
for bars in (b1, b2, b3):
    for b in bars:
        ax.text(b.get_width() + 0.12, b.get_y() + b.get_height() / 2,
                f'{int(b.get_width())}', va='center', ha='left', fontsize=9, color=TEXTP)
ax.set_yticks(y)
ax.set_yticklabels(criteria, fontsize=9.8)
ax.set_xlim(0, 11.3)
style_ax(ax, keep_x=False)
ax.set_xticks([])
ax.tick_params(axis='y', length=0)
ax.legend(loc='lower center', bbox_to_anchor=(0.5, 1.01), ncol=1,
          frameon=False, fontsize=10, handlelength=1.2, handleheight=0.9)
fig.savefig(f'{OUT}/chart2_scoring.png', dpi=200, facecolor='white')
plt.close(fig)

# ─────────────────────────────────────────────────────────────────────────
# Chart 3 — market funnel TAM / SAM / SOM (not to scale, values annotated)
# ─────────────────────────────────────────────────────────────────────────
labels = [
    'TAM — софт- и сервисный слой\nвокруг возврата $166 млрд',
    'SAM — SMB-импортёры США,\nself-serve сегмент',
    'SOM — реалистичная доля\nсоло-основателя за 18 мес',
]
vals = ['$1,6 млрд / год', '$170 млн / год', '$0,47 млн (база)']
fracs = [1.0, 0.60, 0.30]
y = [2, 1, 0]

fig, ax = plt.subplots(figsize=(8.6, 3.4), constrained_layout=True)
cols = [HEADER, ACCENT, LIGHT]
for yi, fr, lb, v, c in zip(y, fracs, labels, vals, cols):
    ax.barh(yi, fr, left=(1 - fr) / 2, height=0.56, color=c, edgecolor='none')
    txt_color = 'white' if c in (HEADER, ACCENT) else TEXTP
    ax.text(0.5, yi, f'{lb}\n{v}', ha='center', va='center',
            fontsize=10.3, color=txt_color, linespacing=1.5)
ax.set_xlim(0, 1)
ax.set_ylim(-0.55, 2.55)
ax.axis('off')
fig.savefig(f'{OUT}/chart3_funnel.png', dpi=200, facecolor='white')
plt.close(fig)

# ─────────────────────────────────────────────────────────────────────────
# Chart 4 — revenue scenarios, 18 months (stacked: one-time + subscription)
# ─────────────────────────────────────────────────────────────────────────
scen = ['Пессимистичный\n(320 клиентов)', 'Базовый\n(1 000 клиентов)', 'Оптимистичный\n(3 000 клиентов)']
one_time = [48, 199, 747]   # $K
subs     = [71, 272, 891]   # $K
totals   = [o + s for o, s in zip(one_time, subs)]

fig, ax = plt.subplots(figsize=(8.6, 4.3), constrained_layout=True)
x = np.arange(len(scen))
w = 0.5
p1 = ax.bar(x, one_time, width=w, color=ACCENT, label='Разовые пакеты (скан + CAPE-декларации)', edgecolor='none')
p2 = ax.bar(x, subs, width=w, bottom=one_time, color=HEADER, label='Подписка TariffOps ($99/мес)', edgecolor='none')
for i, t in enumerate(totals):
    ax.text(x[i], t + 38, f'${t}K'.replace('K', ' тыс. $'), ha='center', va='bottom',
            fontsize=11.5, color=TEXTP, fontweight='bold')
for i in range(len(scen)):
    if one_time[i] > 90:
        ax.text(x[i], one_time[i] / 2, f'{one_time[i]}', ha='center', va='center', fontsize=9.5, color='white')
    if subs[i] > 90:
        ax.text(x[i], one_time[i] + subs[i] / 2, f'{subs[i]}', ha='center', va='center', fontsize=9.5, color='white')
ax.set_xticks(x)
ax.set_xticklabels(scen, fontsize=10.3, color=TEXTP)
ax.set_ylabel('Выручка за 18 месяцев, тыс. $', fontsize=10.3, color=TEXTP)
ax.set_ylim(0, 1900)
style_ax(ax, keep_x=True, keep_y=True)
ax.grid(axis='y', linestyle='--', alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.legend(loc='upper left', bbox_to_anchor=(0.0, 1.14), ncol=1, frameon=False, fontsize=9.8)
fig.savefig(f'{OUT}/chart4_scenarios.png', dpi=200, facecolor='white')
plt.close(fig)

print('OK: 4 charts saved to', OUT)
