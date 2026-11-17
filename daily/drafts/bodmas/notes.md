## BODMAS: research notes

### Top results reviewed ("what is bodmas", "bodmas rule")
- thirdspacelearning.com/blog/what-is-bodmas/ (competitor, UK): mnemonic, BIDMAS, left to right for D/M and A/S, KS2/Year 6, brief calculator note. No "of", no nested brackets, no 6÷2(1+2), no Excel.
- aakash.ac.in/important-concepts/maths/bodmas-rule: table of letters and one worked example. Does not state the left-to-right rule; no "of", vinculum, bracket order, NCERT or calculators.
- cuemath.com/numbers/bodmas-rule: O = orders (sometimes "of"), bracket order ( ) { } [ ], left to right, BODMAS vs PEMDAS, common errors. No vinculum, NCERT, Excel or 6÷2(1+2).
- vedantu.com/maths/bodmas-rules: steps, left to right, "of", FAQs. No vinculum, NCERT, calculators or 6÷2(1+2).
- unacademy / careers360 / edplace results: full-form level only.

### Gap filled (information gain)
- New NCERT Class 7 Ganita Prakash Ch 2 "Arithmetic Expressions" teaches the order through "brackets" and "terms" and does not use the word BODMAS (no competitor says this).
- "Of" ranks above ÷ and × in Indian exam simplification (36 ÷ 3 of 4 = 3 vs 36 ÷ 3 × 4 = 48).
- Vinculum → ( ) → { } → [ ] order, plus the "VBODMAS" name.
- Honest explanation of why 6 ÷ 2(1 + 2) is ambiguous (9 vs 1).
- Tools: basic calculators chain left to right; Excel negation before ^ (=-2^2 = 4); Python -3**2 = -9 and 2**3**2 = 512.

### Sources and what each confirms
- https://www.ncert.nic.in/textbook/pdf/gegp102.pdf: Ganita Prakash Grade 7, Ch 2 "Arithmetic Expressions". No BODMAS mention. Sections "Brackets in Expressions" (solve inside brackets first), "Terms in Expressions" (terms separated by +, subtractions converted to additions, evaluate terms first), "Removing Brackets I/II" (minus before bracket flips signs; distributive property). Example 30 + 5 × 4 = 50. Linked externally in the article.
- https://support.microsoft.com/en-us/excel/calculation-operators-and-precedence-in-excel: precedence table puts negation (as in –1) above exponentiation (^), then * /, then + –; equal precedence is evaluated left to right. The page gives no =-2^2 example.
- https://learn.microsoft.com/en-us/answers/questions/4988402/excel-returns-wrong-value: Microsoft Q&A thread; an answer says "=-2^2 is equivalent to =(-2)^2 and Excel yields 4"; =0-2^2 gives -4.
- Wikipedia "Order of operations" (IPFS mirror: https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Order_of_operations; en.wikipedia.org fetch was blocked by a permission timeout): simple calculators without a stack chain left to right (1 + 2 × 3 = 9); Excel reads −3² as (−3)² = 9; some literature/calculators give implied multiplication higher precedence (1 ÷ 2x = 1/(2x)), others don't; BODMAS "O" read as Order or "Of".
- https://docs.python.org/3/reference/expressions.html: the power operator binds more tightly than unary operators on its left, so -1**2 = -1; same-precedence operators group left to right, except exponentiation (right to left).
- https://www.adda247.com/question-answer/simplify-20-5-of-4-8-6-24-of-3-48-6-18-9/q.v1.bfa40b91-c868-4d74-9219-743bd60b564c-en: SSC-style simplification works "of" before ÷ and × (20 ÷ 5 of 4 → 20 ÷ 20). Answer 9 checked with Python.
- https://www.math-only-math.com/simplification-of-numerical-expressions.html: bracket removal order is bar (vinculum), ( ), { }, [ ]; "of" means multiplication and is done before division and multiplication.
- https://speedmath.in/blog/bodmas-rules-complete-guide: in competitive exams "of" means multiplication; bracket order ( ) → { } → [ ].
- https://www.hpmuseum.org/forum/post-140149.html (forum, supporting only): some calculator models give 1 for 6÷2(1+2) and others 9; written with an explicit ×, they give 9.

### Calculation checks (python3)
- 18 − 6 ÷ 3 × 2 + 4 = 18
- 24 ÷ 4 × 2 = 12; 24 ÷ (4 × 2) = 3
- 36 ÷ (3 × 4) = 3; 36 ÷ 3 × 4 = 48
- 50 − [20 + {12 − (3 + 5) ÷ 2}] = 22
- 2 + 3² × 4 = 38; (2 + 3)² = 25
- −3**2 = −9; (−3)**2 = 9
- 6/2*(1+2) = 9; 6/(2*(1+2)) = 1
- 30 + 5 × 4 = 50; (30 + 5) × 4 = 140
- 100 − ½ × 40 + 8 ÷ 4 × 3 = 86
- 10 − 4 − 2 = 4; 10 − (4 − 2) = 8
- 2 + 3 × 4 = 14 (a chain calculator gives (2 + 3) × 4 = 20)
- 2**3**2 = 512

### Unsure / caveats
- Excel =-2^2 = 4: inferred from Microsoft's official precedence table and stated in a Microsoft Q&A answer and on Wikipedia. Not run in Excel here.
- "VBODMAS" is a coaching-book term, not NCERT. Vinculum and bracket order come from secondary maths sites, not NCERT. The article says "exam books" and "Indian textbooks" in general terms.
- The calculator split on 6 ÷ 2(1 + 2) is described generally; no brand is named.
- I did not check older NCERT books (pre-Ganita Prakash) or Class 6/8 Ganita Prakash for order-of-operations content, so the article names only Class 7 Ch 2.
- I assumed the internal link slugs (easy-vedic-maths-tricks, what-is-a-prime-number, how-to-write-answers-in-cbse-board-exams) exist, as given in the brief. I did not check them live.
- Article word count is about 1,478 by wc (including markdown symbols and table pipes), close to the 1,500 limit.
