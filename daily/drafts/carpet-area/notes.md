# Notes: carpet-area-vs-built-up-area (niche row #8)

## Top results for "carpet area vs built up area" (WebSearch, 16 Nov 2026)
1. Brigade Group blog, 2. Godrej Properties blog, 3. BankBazaar, 4. Bajaj Housing Finance, 5. Kotak Bank (also: Sobha, ICICI, Paisabazaar, Piramal; propertyfinder.ae is UAE).

What they all say: the three definitions; carpet area excludes outer walls and common areas; super area includes a share of lifts, lobbies, clubhouse; a loose "loading" percentage (Kotak: 20-30% of carpet area).

What they miss:
- No worked conversion from a super-area rate to a price per carpet sq ft for comparing two projects (BankBazaar gives only 1,000 built-up = ~700 carpet; Kotak's examples have inconsistent ratios).
- No explanation that "loading %" is quoted on two different bases (of super area vs of carpet area).
- Little or no exact RERA text: section 4(2)(h) disclosure of balcony/terrace areas, section 11(2) registration number on ads, section 13(1) 10% cap.
- The area-variation clause is either missing or stated as a flat "3%" for all of India (Kotak). It is not uniform: MahaRERA 3%; Bihar model form no % cap; a Haryana-filed agreement 5% increase / 90-day refund.
- No RERA-portal checking steps (BankBazaar, Kotak).
- Gap is real; proceeded.

Inspired-by page (nobroker.in/blog/carpet-area-calculation): WebFetch was blocked (permission request not answered). Not read.

## Sources used
- RERA Act 2016, India Code PDF: https://www.indiacode.nic.in/bitstream/123456789/19012/1/reraact.pdf (sections 2(k) + Explanation, 4(2)(h), 11(2), 13(1)).
- Bihar RERA agreement for sale proforma (clause 1.2 price "based on the carpet area", clause 1.7 final carpet area, 45-day refund, no % cap): https://rera.bihar.gov.in/All_Document/RERAP3110201801043RERAP3110201801043-1ProformaforSaleofAgreement.pdf
- Haryana RERA Gurugram, Sale of Apartments/Floors on Carpet Area Regulations 2021 (dated 7 May 2021, gazette 18 May 2021): https://haryanarera.gov.in/regulations/Sale_of_ApartmentsFloors_in_a_Real_Estate_Project_on_the_basis_of_Carpet_Area.pdf
- Agreement filed on Haryana RERA portal (clause 1.7: up to 5% increase, 90-day refund): https://haryanarera.gov.in/project/view_uploaded_Document_open/NTc1MDc=
- MahaRERA Order No. 38/2022 dated 13.12.2022 (non-negotiable clauses, 3% variation cap, 45-day refund), as summarised by WIRC-ICAI law update: https://old.wirc-icai.org/images/law-updates/maharera-jan-23.pdf ; corroborated by Free Press Journal (clause 1(g)) and SNR Law.
- Anarock loading data (31% in 2019 to 40% Q1 2025; MMR 43% highest, Chennai 36% lowest, Bengaluru 30%→41%), Business Standard 9 Jun 2025: https://www.business-standard.com/industry/news/avg-apartment-loading-grows-in-top-cities-amid-demand-for-amenities-report-125060900484_1.html
- MahaRERA project search steps: Lodha Group blog (generic steps only used).

## Arithmetic check (python)
- A: 1,250 x 8,000 = 1,00,00,000; /850 = 11,764.7; loading 400/1250 = 32%, 400/850 = 47.1%; 850/10.764 = 78.97 sq m.
- B: 1,200 x 8,500 = 1,02,00,000; /900 = 11,333.3; loading 25% / 33.3%; 900/10.764 = 83.6 sq m.
- Difference per carpet sq ft = ~431 ("about ₹430").
- Variation: 20 sq ft x 11,764.7 = 2,35,294 (2.35% of 850). 1,250 x 0.6 = 750. 60 sq m x 10.764 = 645.8.

## Uncertain / to note
- MahaRERA Order 38/2022 details come from a secondary summary (WIRC-ICAI), not the MahaRERA order PDF itself; may since have been revised by a later MahaRERA order.
- The Haryana 5%/90-day figures come from one project's filed agreement (a commercial unit), not the rules' form directly; article words it as "one agreement filed on the Haryana RERA portal".
- Anarock "loading" is computed against super area (implied by the reported 60/40 split; the article does not state the denominator explicitly).
- Stamp duty on the higher of agreement value and ready reckoner/circle value is stated generally ("usually"); rules vary by state and were not verified state by state.
- "Apartment summary" label on portals is generic (MahaRERA layout described by a builder blog), hedged with "usually".
