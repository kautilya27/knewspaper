"""Old vs new regime, tax year 2026-27 (FY 2026-27), resident individual under 60,
salary income only. Sources: Finance Bill 2026 memorandum (rates unchanged),
Income-tax Act 2025 s.202 (new slabs), s.156 (rebate), s.19 (standard deduction).
Surcharge ignored: applies only above Rs 50 lakh. Cess 4%."""

NEW_SLABS = [(400000, 0), (800000, .05), (1200000, .10), (1600000, .15),
             (2000000, .20), (2400000, .25), (float('inf'), .30)]
OLD_SLABS = [(250000, 0), (500000, .05), (1000000, .20), (float('inf'), .30)]
SD_NEW, SD_OLD = 75000, 50000

def slab_tax(ti, slabs):
    tax, lo = 0.0, 0
    for hi, r in slabs:
        if ti > lo:
            tax += (min(ti, hi) - lo) * r
        lo = hi
    return tax

def new_tax(gross):
    ti = max(0, gross - SD_NEW)
    t = slab_tax(ti, NEW_SLABS)
    if ti <= 1200000:
        t = max(0, t - 60000)              # s.156(2) rebate
    else:
        t = min(t, ti - 1200000)           # marginal relief
    return round(t * 1.04)

def old_tax(gross, ded):
    ti = max(0, gross - SD_OLD - ded)
    t = slab_tax(ti, OLD_SLABS)
    if ti <= 500000:
        t = max(0, t - 12500)              # s.156(1) rebate
    return round(t * 1.04)

def breakeven(gross):
    """Smallest deduction (beyond std deduction) where old tax <= new tax."""
    target = new_tax(gross)
    lo, hi = 0, gross
    if old_tax(gross, 0) <= target:
        return 0
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if old_tax(gross, mid) <= target: hi = mid
        else: lo = mid
    return hi

def L(x): return f"{x/100000:.2f} L"

if __name__ == "__main__":
    print("Gross | New tax | Old tax (0 ded) | Old tax (2L ded) | Old tax (3.75L) | Break-even ded")
    for g in [800000, 1000000, 1200000, 1275000, 1300000, 1500000, 2000000, 2500000, 3000000]:
        print(g, new_tax(g), old_tax(g, 0), old_tax(g, 200000), old_tax(g, 375000), breakeven(g), L(breakeven(g)))
    print("marginal relief check:", 1275000, new_tax(1275000), 1280000, new_tax(1280000), 1300000, new_tax(1300000), 1350000, new_tax(1350000))
    # where marginal relief ends
    g = 1275000
    while True:
        ti = g - SD_NEW
        if slab_tax(ti, NEW_SLABS) <= ti - 1200000: break
        g += 100
    print("marginal relief ends near gross", g)

    # Example 1: Bengaluru renter, gross 18 L
    gross, basic = 1800000, 900000
    hra_recd, rent = 450000, 40000 * 12
    for pct, label in [(0.5, "50% (2026 Rules, Bengaluru)"), (0.4, "40% (old rule)")]:
        hra_ex = min(hra_recd, rent - 0.10 * basic, pct * basic)
        print(label, "HRA exempt", hra_ex)
    hra_ex = min(hra_recd, rent - 0.10 * basic, 0.5 * basic)
    ded1 = hra_ex + 150000 + 25000
    print("Ex1 ded", ded1, "old", old_tax(gross, ded1), "new", new_tax(gross), "BE", breakeven(gross))
    ded1_40 = min(hra_recd, rent - 0.10 * basic, 0.4 * basic) + 175000
    print("Ex1 at 40% cap: ded", ded1_40, "old", old_tax(gross, ded1_40))
    print("Ex1 + 24(b)? n/a; Ex1 + NPS 50k:", old_tax(gross, ded1 + 50000))
    print("Breakeven 18L:", breakeven(1800000))

    # Example 2: home loan, gross 25 L
    gross = 2500000
    ded2 = 200000 + 150000 + 25000 + 50000   # 24(b) + 80C + 80D self + 80D senior parents
    print("Ex2 ded", ded2, "old", old_tax(gross, ded2), "new", new_tax(gross), "BE", breakeven(gross))
    ded2b = ded2 + 50000  # + NPS 80CCD(1B)
    print("Ex2 +NPS ded", ded2b, "old", old_tax(gross, ded2b))
    # Ex2 at 15 L
    print("Ex2 same deds at 15L", old_tax(1500000, ded2), new_tax(1500000))
