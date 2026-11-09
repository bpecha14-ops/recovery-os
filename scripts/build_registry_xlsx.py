#!/usr/bin/env python3
"""Build RecoveryOS_World_Registry.xlsx + CSV from the dumped registry JSON."""
import json
import csv
import sys
import os

XLSX_SKILL_DIR = "/home/z/my-project/skills/xlsx"
for sub in [XLSX_SKILL_DIR, os.path.join(XLSX_SKILL_DIR, "templates")]:
    if sub not in sys.path:
        sys.path.insert(0, sub)

from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from templates.base import (
    setup_sheet, style_header_row, style_data_row, style_total_row,
    font_body, font_caption, font_subheader, font_kpi, font_kpi_label,
    fill_data_row, NEUTRAL_600, ACCENT_POSITIVE, ACCENT_WARNING,
)

SRC = "/home/z/my-project/scripts/out/world-registry.json"
OUT_XLSX = "/home/z/my-project/download/RecoveryOS_World_Registry.xlsx"
OUT_CSV = "/home/z/my-project/download/RecoveryOS_World_Registry_Sources.csv"

with open(SRC, encoding="utf-8") as f:
    data = json.load(f)

countries = data["countries"]
all_sources = [s for c in countries for s in c["sources"]]

wb = Workbook()

# ---------------------------------------------------------------- Summary ---
ws = wb.active
ws.title = "Summary"
setup_sheet(ws, title="RecoveryOS — The World Library · Global Registry of Unclaimed Money", last_col=7)

# KPI band (row 4-5)
kpis = [
    ("Markets indexed", data["stats"]["countries"]),
    ("Live markets", sum(1 for c in countries if c["status"] == "live")),
    ("Official sources", data["stats"]["sources"]),
    ("Verified total (USD bn, low bound)", data["stats"]["verifiedUSDBillions"]),
]
col = 2
for label, value in kpis:
    vcell = ws.cell(row=4, column=col, value=value)
    vcell.font = font_kpi()
    lcell = ws.cell(row=5, column=col, value=label)
    lcell.font = font_kpi_label()
    col += 1
ws.row_dimensions[4].height = 26
ws.row_dimensions[5].height = 14

# Country table
headers = ["Country", "Region", "Status", "Sources", "Headline total", "USD bn (low)", "Notes"]
head_row = 7
for i, h in enumerate(headers, start=2):
    ws.cell(row=head_row, column=i, value=h)
style_header_row(ws, head_row, 2, 2 + len(headers) - 1)

region_labels = {
    "americas": "Americas",
    "europe": "Europe",
    "asia-pacific": "Asia-Pacific",
    "africa-me": "Africa & ME",
}

r = head_row + 1
for idx, c in enumerate(countries):
    values = [
        c["name"],
        region_labels.get(c["region"], c["region"]),
        "Live" if c["status"] == "live" else "Researching",
        len(c["sources"]),
        c["total"],
        c["totalUSDB"] if c["totalUSDB"] else "—",
        c["summary"],
    ]
    for i, v in enumerate(values, start=2):
        ws.cell(row=r, column=i, value=v)
    style_data_row(ws, r, 2, 2 + len(headers) - 1, idx)
    # color the status cell
    st = ws.cell(row=r, column=4)
    from openpyxl.styles import Font as _Font
    base_font = font_body()
    st.font = _Font(name=base_font.name, size=base_font.size,
                    color=ACCENT_POSITIVE if c["status"] == "live" else ACCENT_WARNING)
    r += 1

# Totals row (computed values — programmatic verification)
total_row = r
ws.cell(row=total_row, column=2, value="Total")
ws.cell(row=total_row, column=5, value=len(countries))
ws.cell(row=total_row, column=6, value=len(all_sources))
ws.cell(row=total_row, column=7, value=f"${data['stats']['verifiedUSDBillions']}B+ verified")
style_total_row(ws, total_row, 2, 2 + len(headers) - 1)

note = ws.cell(
    row=total_row + 2, column=2,
    value=f"Compiled {data['exportedAt'][:10]} from official program disclosures and major press. "
          "Low-bound USD conversions for summation only. Verify on official sites before acting.",
)
note.font = font_caption()

widths = {2: 18, 3: 13, 4: 13, 5: 9, 6: 34, 7: 13, 8: 90}
for cidx, w in widths.items():
    ws.column_dimensions[get_column_letter(cidx)].width = w
ws.freeze_panes = "B8"

# ------------------------------------------------------------ All Sources ---
ws2 = wb.create_sheet("All Sources")
setup_sheet(ws2, title="Every official source, country by country", last_col=11)

headers2 = ["#", "Country", "Source", "Operator", "Amount", "Type", "Access", "Time", "URL", "Practical note"]
for i, h in enumerate(headers2, start=2):
    ws2.cell(row=4, column=i, value=h)
style_header_row(ws2, 4, 2, 2 + len(headers2) - 1)

r = 5
for idx, s in enumerate(all_sources):
    values = [
        idx + 1, s["country"], s["title"], s["operator"], s["amount"],
        s["type"], s["access"], s["minutes"], s["url"], s["note"],
    ]
    for i, v in enumerate(values, start=2):
        ws2.cell(row=r, column=i, value=v)
    style_data_row(ws2, r, 2, 2 + len(headers2) - 1, idx)
    # hyperlink on URL
    link = ws2.cell(row=r, column=10)
    if str(link.value).startswith("http"):
        link.hyperlink = link.value
        link.style = "Hyperlink"
    r += 1

widths2 = {2: 5, 3: 16, 4: 34, 5: 30, 6: 18, 7: 14, 8: 12, 9: 9, 10: 52, 11: 72}
for cidx, w in widths2.items():
    ws2.column_dimensions[get_column_letter(cidx)].width = w
ws2.freeze_panes = "C5"
ws2.auto_filter.ref = f"B4:{get_column_letter(2 + len(headers2) - 1)}{r - 1}"

wb.properties.creator = "Z.ai"
wb.save(OUT_XLSX)

# --------------------------------------------------------------------- CSV ---
with open(OUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["country", "source", "operator", "url", "amount", "type", "access", "minutes", "note"])
    for s in all_sources:
        w.writerow([s["country"], s["title"], s["operator"], s["url"], s["amount"],
                    s["type"], s["access"], s["minutes"], s["note"]])

print(f"XLSX: {OUT_XLSX}")
print(f"CSV : {OUT_CSV}")
print(f"Rows: {len(all_sources)} sources across {len(countries)} countries")
