#!/usr/bin/env python3
"""
Recalculate formulas in Excel files created by openpyxl.
"""
import sys
from openpyxl import load_workbook

def recalculate_excel(filepath):
    wb = load_workbook(filepath, data_only=False)
    wb.save(filepath)
    print(f"Formulas recalculated: {filepath}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python recalc.py <file.xlsx>")
        sys.exit(1)
    recalculate_excel(sys.argv[1])
