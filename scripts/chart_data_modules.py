#!/usr/bin/env python3
"""Chart for the project description docx: data-module sizes (LOC).
Russian labels; DejaVu Sans (default) covers Cyrillic; single accent
color 1B6B7A (DM-1 table accent); constrained_layout, no bbox_tight."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

modules = [
    ("programs-data.ts — каталог гражданских программ", 2271),
    ("world-registry.ts — мировая библиотека реестров", 1501),
    ("recovery-data.ts — класс-экшены и IEEPA", 483),
    ("scan-engine.ts — движок сканера покупок", 426),
    ("rights-packages.ts — пакеты претензий", 241),
    ("data-sources.ts — справочник источников", 189),
    ("eligibility-engine.ts — движок соответствия", 164),
]
modules = modules[::-1]  # largest on top in barh
labels = [m[0] for m in modules]
vals = [m[1] for m in modules]

fig, ax = plt.subplots(figsize=(10, 5.2), constrained_layout=True)
bars = ax.barh(labels, vals, color="#1B6B7A", height=0.62)
ax.bar_label(bars, padding=6, fontsize=10, color="#333333")
ax.set_xlabel("Строк кода", fontsize=11)
ax.set_title("Объём предметных модулей данных платформы", fontsize=13, pad=10)
ax.grid(True, axis="x", alpha=0.3)
ax.set_axisbelow(True)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", labelsize=10)
ax.set_xlim(0, 2600)
fig.savefig("/home/z/my-project/scripts/chart-data-modules.png", dpi=200)
print("chart saved")
