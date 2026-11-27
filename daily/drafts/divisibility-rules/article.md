**Quick answer:** A divisibility rule tells you whether one number divides another without doing the long division. The everyday ones: a number is divisible by 2 if its last digit is even, by 3 if its digit sum is divisible by 3, by 4 if its last two digits are, by 5 if it ends in 0 or 5, by 8 if its last three digits are, by 9 if its digit sum is divisible by 9, by 10 if it ends in 0, and by 11 if the alternating sum of its digits is 0 or a multiple of 11.

For 6 and 12 you combine two rules (2 and 3, or 3 and 4). For 7 and 13 there are short "chop the last digit" tricks, shown correctly below.

## Where divisibility rules come in the NCERT syllabus

- **Class 6, Ganita Prakash, Chapter 5 "Prime Time"** has a section on divisibility tests. It works with divisibility by 10, 5, 2, 4 and 8 (the "Figure it out" questions ask which numbers are divisible by all of 2, 4, 5, 8 and 10).
- **Class 8, Ganita Prakash Part I, Chapter 5 "Number Play"** returns to the idea and explains the digit-sum rules for 3 and 9, plus the alternating-sum rule for 11. It shows *why* the rule for 9 works: every power of 10 is one more than a multiple of 9.
- **The older Class 6 textbook, Chapter 3 "Playing with Numbers"**, which many reference books and older question papers still follow, covered tests for 2, 3, 4, 5, 6, 8, 9, 10 and 11, along with the co-prime rule explained further down.

You can download the current books free from the [NCERT textbooks page](https://ncert.nic.in/textbook.php). Rules for 7, 13, 25, 99 and 101 go beyond the NCERT tests but help in olympiads and aptitude tests.

## Divisibility rules from 2 to 13, with an example each

| Divisor | Rule | Worked example |
|---|---|---|
| 2 | Last digit is 0, 2, 4, 6 or 8 | 3,478 ends in 8, so yes (3,478 ÷ 2 = 1,739) |
| 3 | Sum of digits is divisible by 3 | 7,254: 7 + 2 + 5 + 4 = 18, so yes (÷ 3 = 2,418) |
| 4 | Number formed by the last two digits is divisible by 4 | 31,716: 16 is divisible by 4, so yes (÷ 4 = 7,929) |
| 5 | Last digit is 0 or 5 | 4,635 ends in 5, so yes (÷ 5 = 927) |
| 6 | Divisible by both 2 and 3 | 2,532 is even and 2 + 5 + 3 + 2 = 12, so yes (÷ 6 = 422) |
| 7 | Double the last digit and subtract it from the rest; repeat | 2,401: 240 − 2 = 238; 23 − 16 = 7, so yes (÷ 7 = 343) |
| 8 | Number formed by the last three digits is divisible by 8 | 51,112: 112 = 8 × 14, so yes (÷ 8 = 6,389) |
| 9 | Sum of digits is divisible by 9 | 85,734: 8 + 5 + 7 + 3 + 4 = 27, so yes (÷ 9 = 9,526) |
| 10 | Last digit is 0 | 7,390 ends in 0, so yes (÷ 10 = 739) |
| 11 | Alternating sum of digits (from the right) is 0 or a multiple of 11 | 9,174: 4 − 7 + 1 − 9 = −11, so yes (÷ 11 = 834) |
| 12 | Divisible by both 3 and 4 | 4,716: 16 is divisible by 4 and 4 + 7 + 1 + 6 = 18, so yes (÷ 12 = 393) |
| 13 | Add 4 times the last digit to the rest; repeat | 3,367: 336 + 28 = 364; 36 + 16 = 52 = 13 × 4, so yes (÷ 13 = 259) |

### Three bonus rules: 25, 99 and 101

- **25:** the last two digits are 00, 25, 50 or 75. Example: 8,675 ends in 75, and 8,675 ÷ 25 = 347.
- **99:** split the number into pairs from the right and add them. Example: 3,465 → 34 + 65 = 99, and 3,465 ÷ 99 = 35.
- **101:** split into pairs from the right and take the alternating sum. Example: 52,621 → 21 − 26 + 5 = 0, and 52,621 ÷ 101 = 521.

## Why the rules work

All of them come from place value: 7,254 is really 7 × 1000 + 2 × 100 + 5 × 10 + 4.

### 2, 5 and 10: only the last digit matters

10 is divisible by 2, 5 and 10, so every ten, hundred and thousand is too. Only the units digit can leave a remainder, which is why you check the last digit alone.

### 4 and 8: the last two or three digits

100 is divisible by 4 (100 = 4 × 25), so all the hundreds and above are already multiples of 4. Only the last two digits are left to check. In the same way 1,000 = 8 × 125, so for 8 you check the last three digits.

### 3 and 9: because 10 leaves remainder 1

10 = 9 + 1, 100 = 99 + 1, 1,000 = 999 + 1. So when you divide by 9 (or by 3), each digit leaves behind just itself. That makes the number and its digit sum leave the **same remainder**. In maths language, 10 ≡ 1 (mod 9).

A useful bonus: the digit sum gives you the actual remainder. 85,736 has digit sum 29, and 29 leaves 2 when divided by 9, so 85,736 leaves remainder 2 as well.

### 11: because 10 is one less than 11

10 = 11 − 1, so 10 behaves like −1 when you divide by 11, 100 behaves like +1, 1,000 like −1, and so on. That is why the digits get alternating plus and minus signs. In maths language, 10 ≡ −1 (mod 11).

The same idea gives the bonus rules: 100 = 99 + 1 (so pairs of digits add up for 99) and 100 = 101 − 1 (so pairs alternate for 101).

### 7 and 13: the "chop" tricks, explained

Write the number as 10a + b, where b is the last digit and a is everything before it. For 2,401, a = 240 and b = 1.

- **For 7:** 10 × (a − 2b) = (10a + b) − 21b. Since 21b is always a multiple of 7, the number is divisible by 7 exactly when a − 2b is.
- **For 13:** 10 × (a + 4b) = (10a + b) + 39b. Since 39 = 3 × 13, the number is divisible by 13 exactly when a + 4b is.

One catch: these tricks only answer yes or no. Unlike the digit-sum rule for 9, they don't give the remainder. For example, 2,403 → 240 − 6 = 234, which leaves remainder 3 when divided by 7, but 2,403 itself leaves remainder 2.

### One test for 7, 11 and 13 together

1,001 = 7 × 11 × 13. For long numbers, split the digits into groups of three from the right and take the alternating sum. Example: 1,234,563 → 563 − 234 + 1 = 330. Now 330 = 11 × 30, so 1,234,563 is divisible by 11 (it equals 11 × 112,233). But 330 is not divisible by 7 or 13, so neither is 1,234,563.

## The composite-number rule: co-prime factors only

To test a number like 6, 12, 15 or 36, break it into two factors that are **co-prime** (their only common factor is 1) and apply both rules: 6 = 2 × 3, 12 = 3 × 4, 15 = 3 × 5, 18 = 2 × 9, 36 = 4 × 9.

**The 4 and 6 trap:** 4 × 6 = 24, so it is tempting to say "divisible by 4 and 6 means divisible by 24". It does not. 36 is divisible by 4 and by 6, but 36 ÷ 24 leaves remainder 12. 4 and 6 share the factor 2, so it gets counted twice. For 24 the right pair is 3 and 8.

The older NCERT Class 6 book makes the same point with 4 and 6. If co-prime numbers are new to you, our guide on [prime numbers](https://www.knewspaper.in/post/what-is-a-prime-number) covers factors and prime factorisation first.

## Common mistakes students make

1. **Checking only the last digit for 4.** 54 ends in 4 but is not divisible by 4 (54 ÷ 4 = 13 remainder 2). Always use the last two digits.
2. **Using the digit sum for 4, 6 or 8.** The digit-sum trick works only for 3 and 9.
3. **Forgetting that 0 and negative answers count for 11.** A result of 0, −11 or 22 still means "divisible by 11".
4. **Multiplying non-co-prime factors.** "Divisible by 2 and 4" does not mean divisible by 8 (12 is a counterexample).

For more mental-maths shortcuts, try our [easy Vedic maths tricks](https://www.knewspaper.in/post/easy-vedic-maths-tricks).

## Frequently asked questions

### What is the divisibility rule of 7?
Double the last digit and subtract it from the number formed by the remaining digits. If the answer is 0 or a multiple of 7, the original number is divisible by 7; repeat the step for big numbers.

### Which chapter of NCERT has divisibility rules?
In the new Ganita Prakash books, divisibility tests appear in Class 6 Chapter 5 "Prime Time" and again in Class 8 Part I Chapter 5 "Number Play". The older Class 6 textbook covered them in Chapter 3 "Playing with Numbers".

### Is a number divisible by 2 and 4 also divisible by 8?
Not always. 12 is divisible by 2 and 4 but not by 8, because 2 and 4 are not co-prime. To test 8, check whether the last three digits form a multiple of 8.

### Why does the digit sum work for 3 and 9 but not for other numbers?
Every power of 10 is one more than a multiple of 9 (10 = 9 + 1, 100 = 99 + 1), so each digit contributes only its own value to the remainder. That is true for 3 and 9 but not for divisors like 4, 7 or 8.
