**Quick answer:** If you know two sides of a triangle and the angle **between** them, the area is **½ × a × b × sin C**, where *a* and *b* are the two sides and *C* is the included angle. For sides of 8 cm and 11 cm with 30° between them, the area is ½ × 8 × 11 × sin 30° = ½ × 8 × 11 × 0.5 = **22 cm²**. You don't need the height at all.

The formula works for any triangle (acute, right-angled or obtuse), as long as the angle you use sits between the two sides you multiply. Below are why it works, worked examples (including a land-plot problem in square feet and guntha), the four mistakes that cost marks, and where the formula appears in Indian syllabuses.

## The formula and its three versions

Label the triangle in the usual way: vertices A, B and C, with side *a* opposite A, side *b* opposite B and side *c* opposite C. Then:

| You know | Use |
|---|---|
| Sides *a*, *b* and angle C | Area = ½ab sin C |
| Sides *b*, *c* and angle A | Area = ½bc sin A |
| Sides *a*, *c* and angle B | Area = ½ac sin B |

All three are the same rule: **half the product of two sides times the sine of the angle between them**. The pattern to remember is that the angle is the one letter *not* used by the two sides.

## Why ½ab sin C works

Start from the formula everyone knows: area = ½ × base × height.

Take side *a* (BC) as the base and drop a perpendicular from A to BC. Call its length *h*. In the right-angled triangle this creates, side *b* (AC) is the hypotenuse and *h* is opposite angle C, so:

sin C = *h* ÷ *b*, which means *h* = *b* sin C

Put that into ½ × base × height:

Area = ½ × *a* × *b* sin C = **½ab sin C**

If C is obtuse, the perpendicular falls outside the triangle, and *h* = *b* sin(180° − C). Since sin(180° − C) = sin C, the formula stays exactly the same. So, for example, sin 150° = sin 30° = 0.5, and the formula never needs a separate rule for obtuse triangles.

For the standard sine values (sin 30° = ½, sin 45° = 1/√2, sin 60° = √3/2), see our [trigonometry table](https://www.knewspaper.in/post/trigonometry-table).

## Worked examples

### Example 1: an obtuse angle

Two sides are 12 cm and 9 cm, and the angle between them is 150°.

Area = ½ × 12 × 9 × sin 150° = 54 × 0.5 = **27 cm²**

Notice that sin 150° is positive. Areas never come out negative with this formula if the calculator is in the right mode.

### Example 2: the equilateral triangle formula, derived

In an equilateral triangle with side *a*, every angle is 60°. So:

Area = ½ × *a* × *a* × sin 60° = ½ × *a*² × √3/2 = **(√3/4)a²**

For a side of 6 cm, the area is (√3/4) × 36 = 9√3 ≈ **15.59 cm²**. This is a neat way to prove the formula students memorise in school.

### Example 3: a plot of land

A triangular corner plot has two boundary walls of 40 m and 25 m that meet at an angle of 120°. Find its area in square metres, square feet and guntha.

Area = ½ × 40 × 25 × sin 120° = 500 × 0.8660 = **433.0 m²**

- In square feet: 433.0 × 10.764 ≈ **4,661 sq ft**
- In guntha (1 guntha = 1,089 sq ft ≈ 101.17 m², a unit used in states including Maharashtra, Karnataka, Telangana, Andhra Pradesh and Gujarat): 433.0 ÷ 101.17 ≈ **4.28 guntha**

This is the practical reason surveyors like the formula: on the ground it is often easier to measure two sides and the angle at a corner than to measure a perpendicular height across a field. Local units such as the bigha vary from state to state, so always check the local conversion before relying on one.

### Example 4: when the angle is not between the sides

You know side *c* = 10 cm, angle A = 50° and angle B = 60°. You can't use ½ab sin C directly yet, because you have only one side.

1. Find the third angle: C = 180° − 50° − 60° = 70°.
2. Find another side with the sine rule: *a* = *c* sin A ÷ sin C = 10 × 0.7660 ÷ 0.9397 ≈ 8.15 cm.
3. Now you have *a* and *c* with angle B between them: Area = ½ × 10 × 8.15 × sin 60° ≈ **35.3 cm²**.

### Example 5: working backwards to find the angle

A triangle has sides 10 cm and 12 cm and an area of 30 cm². What is the angle between those sides?

30 = ½ × 10 × 12 × sin C, so sin C = 30 ÷ 60 = 0.5.

So C = 30° **or** C = 150°. Both give the same area, so two different triangles fit this information. Give both answers unless the question says the angle is acute.

## Which area formula should you use?

| What you know | Best formula | Taught in |
|---|---|---|
| Base and perpendicular height | ½ × base × height | Middle school |
| All three sides | Heron's formula: √[s(s − a)(s − b)(s − c)], where s = (a + b + c) ÷ 2 | Class 9 |
| Two sides and the included angle | ½ab sin C | Trigonometry (see syllabus section) |
| Coordinates of the three corners | ½ × the absolute value of [x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)] | Class 12 (determinants) |
| One side and two angles | Sine rule first, then ½ab sin C | Trigonometry |

The formulas agree with each other. For the classic 13–14–15 triangle, Heron's formula gives s = 21 and area = √(21 × 8 × 7 × 6) = **84**. Using the cosine rule, the angle between the sides 13 and 14 has cos C = 5/13, so sin C = 12/13, and ½ × 13 × 14 × 12/13 = **84** again.

## Four mistakes that cost marks

1. **Using an angle that isn't between the two sides.** ½ab sin A is wrong; with sides *a* and *b* you need angle C. Check that the angle letter is the one not in your sides.
2. **Calculator in radian mode.** sin 30 in radian mode gives about −0.988 instead of 0.5. Look for "D" or "DEG" on the screen before you start.
3. **Forgetting the ½.** ab sin C is the area of a parallelogram with those sides, which is exactly double the triangle.
4. **Rounding too early.** Keep sin values to at least four decimal places (or use exact values like √3/2) and round only the final answer, with units squared (cm², m²).

## Where this formula is in Indian syllabuses

- **CBSE / NCERT Class 11:** not currently in the syllabus. The 2023 rationalisation removed the section on the sine and cosine formulae from the Trigonometric Functions chapter, and the CBSE 2025-26 Class 11 syllabus does not list it. It is still useful background for physics (the magnitude of a cross product of two vectors is ab sin θ, twice this triangle's area) and for competitive exams.
- **Tamil Nadu Class 11:** the Trigonometry chapter covers the sine and cosine rules, Heron's formula and finding the area of a triangle without the altitude.
- **Maharashtra HSC:** "solutions of a triangle", including area problems, is in the Class 12 Trigonometric Functions chapter.
- **NDA:** the maths syllabus lists "properties of triangles" under trigonometry, and area questions appear in past papers.
- **JEE Main:** since the 2024 revision, the trigonometry unit lists trigonometric identities, trigonometric functions and inverse trigonometric functions (trigonometric equations and heights and distances were removed). Properties of triangles is not listed by name, so check the current NTA information bulletin for your exam year.

If you are revising other mensuration formulas, see our guides to the [surface area of a cylinder](https://www.knewspaper.in/post/surface-area-of-a-cylinder) and the [volume of a sphere](https://www.knewspaper.in/post/volume-of-a-sphere).

## Frequently asked questions

### What is the formula for the area of a triangle using trigonometry?

Area = ½ab sin C, where *a* and *b* are two sides and *C* is the angle between them. The same rule can be written ½bc sin A or ½ac sin B.

### Does ½ab sin C work for a right-angled triangle?

Yes. If C is 90°, sin C = 1, so the formula becomes ½ab, which is the usual ½ × base × height with the two shorter sides as base and height.

### Can I use ½ab sin C if I know all three sides but no angle?

Use Heron's formula instead, or find an angle first with the cosine rule (cos C = (a² + b² − c²) ÷ 2ab) and then use ½ab sin C. Both give the same answer.

### Why is sin of an obtuse angle positive in the area formula?

Because sin(180° − θ) = sin θ. For example, sin 120° = sin 60° ≈ 0.866, so a triangle with an obtuse angle still gets a positive area, matching the height measured outside the triangle.
