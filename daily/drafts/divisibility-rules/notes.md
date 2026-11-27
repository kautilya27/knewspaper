# Notes: divisibility-rules (plan #77, Education)

## Sources for key facts
- Class 6 Ganita Prakash Ch 5 "Prime Time" has a "Divisibility Tests" section; its Figure-it-out (pp. 125-126) uses 2, 4, 5, 8, 10:
  https://www.teachoo.com/subjects/cbse-maths/class-6/chapter-5-ganit-prakash/ ,
  https://www.teachoo.com/25568/5350/Question-6/category/Figure-it-out---Page-125--126/
- Class 8 Ganita Prakash (Part I) Ch 5 "Number Play" covers 3, 9 (digit sum, powers of 10 = multiple of 9 + 1), 11 (alternating sum), revisits 2/4/5/8/10:
  https://www.evidyarthi.in/maths-8th/notes-class-8-maths-ganita-prakash-i-chapter-5-number-play ,
  https://www.teachoo.com/26933/5679/Divisibility-by-5-and-10/category/Divisibility-Rules---2--5--10-and-3/
- Older NCERT Class 6 Ch 3 "Playing with Numbers": tests for 2,3,4,5,6,8,9,10,11; co-prime product rule (5 and 12 -> 60) and the 4 and 6 counterexample (12, 36 not divisible by 24):
  https://orchidsinternationalschool.com/ncert-solutions-class-6-maths/chapter-3-playing-with-numbers
- External link in article: https://ncert.nic.in/textbook.php (official NCERT textbook page).
- Rules themselves and proofs: standard number theory (cross-checked against Wikipedia "Divisibility rule"); every worked example, intermediate step and remainder verified with python3 (e.g. 2401/7=343, 3367/13=259, 52621/101=521, 1234563 = 11 x 112233 and not divisible by 7 or 13, 2403 mod 7 = 2 vs 234 mod 7 = 3, 85736 mod 9 = 2, 36 mod 24 = 12, 54 mod 4 = 2).

## Information gain vs top results (Wikipedia, mathsisfun, brilliant, cuemath, Third Space Learning)
- Top results list rules with examples; most skip the "why", and none map rules to NCERT/CBSE chapters (new Ganita Prakash Class 6 and 8 vs old Playing with Numbers).
- Added: one-line proofs for 7 and 13 chop tricks (10(a-2b) = n - 21b; 10(a+4b) = n + 39b), the warning that the 7 trick gives no remainder (with a counterexample), the 1001 = 7 x 11 x 13 triple test, the co-prime trap (4 and 6 -> 24; 2 and 4 -> 8), and 25/99/101 bonus rules, all with verified numbers.

## Not verified / caveats
- NCERT PDF (ncert.nic.in/textbook/pdf/fegp105.pdf) could not be fetched (permission not granted); chapter/section details rely on Teachoo / eVidyarthi / Orchids summaries, which agree with each other. Exact section numbers deliberately not stated.
- "Part I" for Class 8 Number Play inferred from eVidyarthi page title ("Ganita Prakash - I") and Teachoo; not confirmed on NCERT's own site.
