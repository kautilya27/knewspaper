# Notes: ctc-to-in-hand-salary

## Top results reviewed (query "ctc to in hand salary")
- internshala.com/blog/difference-between-ctc-and-in-hand-salary/ (comparable; 2023/24): definitions, glossary, generic formulas, one reverse calc with flat 12% "income tax". No labour codes, no regime/slabs.
- zoho.com/in/payroll/academy/.../calculate-in-hand-salary-from-ctc.html: 4 LPA & 10 LPA monthly examples; no labour codes, no slabs.
- groww.in/blog/how-to-calculate-in-hand-salary-from-ctc: 6 LPA example with arithmetic inconsistencies; no labour codes; no regime.
- upstox.com/banking/how-to-calculate-in-hand-salary-from-ctc-process-method/: monthly example with hypothetical TDS; mentions new regime generally, no slabs; no labour codes.
- adityabirlacapital.com/abc-of-money/how-to-calculate-in-hand-salary-from-ctc: 10 LPA example whose components exceed CTC; no labour codes; no regime.
Common: definitions + components + generic formula + one example. 
Missed (our gain): 50% wage rule effect; Sept 2026 EPF ceiling ₹25,000; capped vs full-basic PF; gratuity provision inside CTC; FY 2026-27 new-regime slabs/rebate with real computed tax; side-by-side 6/10/15 LPA tables; offer-letter checklist.

## Sources and what they confirm
- PIB PRID=2192463 https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2192463&reg=48&lang=2 : four Codes effective 21 Nov 2025; fixed-term employees gratuity after 1 year.
- PIB Year End Review 2025 https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209767&reg=48&lang=2 : uniform wage definition (basic+DA+retaining allowance); FTE gratuity after 1 year.
- labour.gov.in FAQ PDF https://labour.gov.in/sites/default/files/faqs_on_labour_codes.pdf : allowances (except gratuity, retrenchment comp.) exceeding 50% of all remuneration added back to wages; gratuity 15 days' wages per completed year (part >6 months), last wages, max ₹20 lakh.
- taxmann https://www.taxmann.com/post/blog/definition-of-wages-section-2y-code-on-wages-50-percent-rule/ : list of Sec 2(y) exclusions (a)-(k) incl. HRA, conveyance, employer PF, bonus, overtime, commission; one-half proviso applies to (a)-(i). (secondary, summarising statute)
- scconline (Ministry FAQs summary) https://www.scconline.com/blog/post/2026/04/26/ministry-faqs-four-labour-codes-india-2026/ : wages definition effective 21 Nov 2025; gratuity revision prospective.
- Outlook Money https://www.outlookmoney.com/personal-finance/retirementplanfinancial-planningwill-your-take-home-salary-reduce-under-the-new-labour-codes-labour-ministry-issues-clarification : Ministry X post (10 Dec 2025) that take-home not reduced if PF on statutory ceiling.
- PIB PRID=2311548 https://www.pib.gov.in/PressReleasePage.aspx?PRID=2311548&amp=&lang=2&amp=&reg=48 : EPF wage ceiling ₹15,000 -> ₹25,000 effective 17 Sep 2026; 12% employee, 12% employer (8.33% EPS, 3.67% EPF).
- PIB PRID=2313829 https://www.pib.gov.in/PressReleasePage.aspx?PRID=2313829&amp=&lang=2&amp=&reg=48 : same date; max employer pension contribution ₹1,250 -> ₹2,083.
- taxguru https://taxguru.in/corporate-law/epf-wage-ceiling-increased-rs-15-000-rs-25-000-employers.html : 12% rate unchanged; max capped employee contribution ₹3,000 (from ₹1,800).
- PIB PRID=2098406 https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2098406&reg=3&lang=2 : new-regime slabs (0-4 nil ... >24L 30%), nil tax to ₹12 lakh, ₹12.75 lakh for salaried with ₹75,000 SD.
- Business Today https://www.businesstoday.in/personal-finance/tax/story/union-budget-2026-new-income-tax-act-to-come-into-force-from-april-1-says-fm-sitharaman-513967-2026-02-01 : Budget 2026 no change to slabs; Income-tax Act 2025 in force 1 Apr 2026.
- taxguru Karnataka PT https://taxguru.in/corporate-law/karnataka-tax-profession-trades-callings-employments-amendment-act2025.html : ₹200/month, ₹300 in Feb from 1 Apr 2025.
- BankBazaar https://www.bankbazaar.com/tax/professional-tax.html : Maharashtra ₹200/month + ₹300 last month = ₹2,500; PT max ₹2,500/yr; no PT in Delhi, Haryana, UP.

## Calc assumptions
Basic 40% (old) vs 50% of CTC; CTC = basic + allowances + employer PF + gratuity (4.81% of basic = 15/26/12); PF 12% of full basic or of min(basic, ₹25,000/month); PT ₹2,500/yr; new regime, SD ₹75,000, rebate if taxable ≤ ₹12L, 4% cess; no variable pay; employer PF not taxed (well under ₹7.5L aggregate limit). Marginal relief checked: not triggered at 15 LPA (tax < income over ₹12L).

## Calc script output (scratchpad/calc.py)
CTC 600000
  A basic40 PF full {'basic': 240000.0, 'emp_pf': 28800.0, 'grat': 11538, 'gross': 559662, 'taxable': 484662, 'tax': 0, 'ee_pf': 28800.0, 'pt': 2500, 'inhand_yr': 528362, 'inhand_mo': 44030, 'retirals': 69138}
  B basic50 PF full {'basic': 300000.0, 'emp_pf': 36000.0, 'grat': 14423, 'gross': 549577, 'taxable': 474577, 'tax': 0, 'ee_pf': 36000.0, 'pt': 2500, 'inhand_yr': 511077, 'inhand_mo': 42590, 'retirals': 86423}
  C basic50 PF capped {'basic': 300000.0, 'emp_pf': 36000.0, 'grat': 14423, 'gross': 549577, 'taxable': 474577, 'tax': 0, 'ee_pf': 36000.0, 'pt': 2500, 'inhand_yr': 511077, 'inhand_mo': 42590, 'retirals': 86423}
CTC 1000000
  A basic40 PF full {'basic': 400000.0, 'emp_pf': 48000.0, 'grat': 19231, 'gross': 932769, 'taxable': 857769, 'tax': 0, 'ee_pf': 48000.0, 'pt': 2500, 'inhand_yr': 882269, 'inhand_mo': 73522, 'retirals': 115231}
  B basic50 PF full {'basic': 500000.0, 'emp_pf': 60000.0, 'grat': 24038, 'gross': 915962, 'taxable': 840962, 'tax': 0, 'ee_pf': 60000.0, 'pt': 2500, 'inhand_yr': 853462, 'inhand_mo': 71122, 'retirals': 144038}
  C basic50 PF capped {'basic': 500000.0, 'emp_pf': 36000.0, 'grat': 24038, 'gross': 939962, 'taxable': 864962, 'tax': 0, 'ee_pf': 36000.0, 'pt': 2500, 'inhand_yr': 901462, 'inhand_mo': 75122, 'retirals': 96038}
CTC 1500000
  A basic40 PF full {'basic': 600000.0, 'emp_pf': 72000.0, 'grat': 28846, 'gross': 1399154, 'taxable': 1324154, 'tax': 81768, 'ee_pf': 72000.0, 'pt': 2500, 'inhand_yr': 1242886, 'inhand_mo': 103574, 'retirals': 172846}
  B basic50 PF full {'basic': 750000.0, 'emp_pf': 90000.0, 'grat': 36058, 'gross': 1373942, 'taxable': 1298942, 'tax': 77835, 'ee_pf': 90000.0, 'pt': 2500, 'inhand_yr': 1203607, 'inhand_mo': 100301, 'retirals': 216058}
  C basic50 PF capped {'basic': 750000.0, 'emp_pf': 36000.0, 'grat': 36058, 'gross': 1427942, 'taxable': 1352942, 'tax': 86259, 'ee_pf': 36000.0, 'pt': 2500, 'inhand_yr': 1303183, 'inhand_mo': 108599, 'retirals': 108058}

```python
SD=75000; PT=2500; CEIL=25000*12
def tax(ti):
    slabs=[(400000,0),(800000,.05),(1200000,.10),(1600000,.15),(2000000,.20),(2400000,.25),(float('inf'),.30)]
    t=0;lo=0
    for hi,r in slabs:
        if ti>lo: t+=(min(ti,hi)-lo)*r
        lo=hi
    if ti<=1200000: t=0
    return round(t*1.04)
def run(ctc,bp,capped):
    basic=ctc*bp
    pfw=min(basic,CEIL) if capped else basic
    epf=0.12*pfw
    grat=basic*15/26/12
    gross=ctc-epf-grat
    ti=max(gross-SD,0)
    t=tax(ti)
    inhand=gross-epf-PT-t
    return dict(basic=basic,emp_pf=epf,grat=round(grat),gross=round(gross),taxable=round(ti),tax=t,ee_pf=epf,pt=PT,inhand_yr=round(inhand),inhand_mo=round(inhand/12),retirals=round(2*epf+grat))
for ctc in (600000,1000000,1500000):
    print("CTC",ctc)
    for lab,bp,cap in (("A basic40 PF full",.4,False),("B basic50 PF full",.5,False),("C basic50 PF capped",.5,True)):
        print(" ",lab,run(ctc,bp,cap))
```

## Uncertain / left out
- Couldn't fetch the Code text or labour.gov.in FAQ HTML directly; Sec 2(y) exclusions list taken from taxmann summary + labour.gov.in FAQ PDF (consistent with statute).
- Whether "voluntary" contributions above the ₹25,000 ceiling still work as before was not confirmed by an official source after Sept 2026; article only says employers may use full basic or ceiling.
- Did not state section numbers under the Income-tax Act 2025 (rebate section renumbered); left out.
- Karnataka PT salary threshold (₹25,000) not confirmed on the fetched page; article only says ₹2,500/yr at these salary levels.
- Labour Ministry take-home clarification was from Dec 2025 (₹15,000 ceiling era) via Outlook Money; FAQ answer phrased generally, not attributed.
- Whether PT is deductible under new regime: not stated in article (calc does not deduct it).
