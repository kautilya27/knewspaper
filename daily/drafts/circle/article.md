**Quick answer:** The area of a circle is **π × radius × radius**, written **A = πr²**. Take π as 22/7 or 3.14. A circle of radius 7 cm has an area of 22/7 × 7 × 7 = **154 cm²**.

If you know the diameter (d) instead, halve it first, or use A = πd²/4. If you know the circumference (C), use A = C²/4π. The answer is always in square units, such as cm² or m².

## Finding the area from what you are given

Exam questions rarely hand you the radius directly. These formulas all give the same area:

| You know | First step | Area formula |
|---|---|---|
| Radius r | None | A = πr² |
| Diameter d | r = d ÷ 2 | A = πd² ÷ 4 |
| Circumference C | r = C ÷ 2π | A = C² ÷ 4π |
| Area, and want the radius | Reverse it | r = √(A ÷ π) |

Use the circumference route when you can only wrap a tape around something, such as a well or a tree trunk.

## Why the area is πr²

Cut a circle into many equal slices, like a cake. Lay them in a row, pointing alternately up and down. Together they make a shape that looks like a parallelogram with wavy top and bottom edges.

- Half the slices form the bottom edge, so it is half the circumference long: ½ × 2πr = **πr**.
- The height of the shape is the length of one slice, which is the **radius r**.

The thinner the slices, the straighter the edges get, and the shape becomes a rectangle. Its area is base × height = πr × r = **πr²**.

The new Class 9 NCERT book presents this slicing-and-rearranging argument and credits it to the Kerala mathematician Nīlakaṇṭha Somayājī (around 1500 CE). It also explains Archimedes' method, which fits regular polygons with more and more sides around the circle. If you have worked out the [area of a trapezium](https://www.knewspaper.in/post/area-of-a-trapezium) by rearranging pieces into a parallelogram, this is the same idea taken to the limit.

## 22/7 or 3.14: which value of π should you use?

π is irrational (3.14159…), so every calculation uses an approximation. NCERT exercises usually say "use π = 22/7 unless stated otherwise", and some questions ask for 3.14 instead. **Always use the value the question gives.** If none is given, choose the one that makes the arithmetic easy:

- Use **22/7** when the radius is a multiple of 7 (7, 14, 21, 3.5…), because the 7 cancels.
- Use **3.14** when the radius is a round decimal number such as 10, 20 or 2.5.

How big is the error?

| Value of π | Area for r = 7 cm | Area for r = 20 cm | Error |
|---|---|---|---|
| 22/7 (3.142857…) | 154 cm² | 1,257.14 cm² | About 0.04% too high |
| 3.14 | 153.86 cm² | 1,256 cm² | About 0.05% too low |
| Actual π | 153.94 cm² | 1,256.64 cm² | None |

Both are within roughly 1 part in 2,000 of the true value, far finer than you can measure a rangoli or a plot with a tape. Neither is "more correct"; the marking scheme expects the value the question asked for. The idea itself is old: Aryabhata's *Aryabhatiya* (499 CE) gives the circumference of a circle 20,000 units across as about 62,832 units, which puts π at 3.1416.

## Worked examples

### Example 1: Area from the diameter (a round rangoli)

A circular rangoli is 1.4 m across. How much floor does it cover?

r = 1.4 ÷ 2 = 0.7 m. Area = 22/7 × 0.7 × 0.7 = 22/7 × 0.49 = **1.54 m²**

### Example 2: Area from the circumference (a village well)

A tape wrapped around the inside of a well's rim measures 22 m. Find the area of its opening.

r = C ÷ 2π = 22 ÷ (2 × 22/7) = 22 × 7 ÷ 44 = 3.5 m. Area = 22/7 × 3.5 × 3.5 = **38.5 m²**

### Example 3: Radius from the area

A circular garden bed has an area of 616 cm². Find its radius.

r² = 616 × 7/22 = 196, so r = √196 = **14 cm**

### Example 4: Area of a sector

A sector is a "pizza slice" of a circle. Its area is the same fraction of the whole circle as its angle θ is of 360°:

Area of sector = (θ ÷ 360°) × πr²

For radius 14 cm and angle 45°: (45 ÷ 360) × 22/7 × 14 × 14 = ⅛ × 616 = **77 cm²**

If you know the arc length l instead of the angle, the sector's area is ½ × l × r.

### Example 5: A ring-shaped path (annulus)

A round park has a radius of 21 m. A path 3.5 m wide runs around the outside. Find the area of the path, and its cost at an assumed rate of ₹40 per m².

The path is the region between two circles with the same centre. Outer radius R = 21 + 3.5 = 24.5 m.

Area of ring = π(R² − r²) = π(R + r)(R − r) = 22/7 × 45.5 × 3.5 = **500.5 m²**

Cost = 500.5 × 40 = **₹20,020**

Factorising R² − r² as (R + r)(R − r) saves you from squaring 24.5. Don't work out the area of the ring as π(R − r)², which is a common mistake.

## Pizza maths: why one large beats two small

Pizzas are often described by their diameter, so they are a good test of the r² rule. Compare one 12-inch pizza with two 8-inch pizzas:

- 8-inch: r = 4 in, area = π × 16 ≈ 50.3 sq in. Two of them make about **100.5 sq in**.
- 12-inch: r = 6 in, area = π × 36 ≈ **113.1 sq in**

The 12-inch is only 1.5 times as wide, but because area grows with the square of the radius, it has 1.5² = **2.25 times** the area of one 8-inch pizza. So when you compare value, divide the price by the area, not by the diameter. The same rule explains why doubling the radius of any circle makes its area four times larger.

## Where area of a circle is in the NCERT syllabus

NCERT is replacing its textbooks under NCF-SE 2023, so older guides that point to "Class 7, Perimeter and Area" may be out of date. Based on the published chapter lists:

| Class | Book | Where circles appear |
|---|---|---|
| 6 to 8 | Ganita Prakash (new) | Class 6 (Chapter 6, Perimeter and Area) and Class 8 (Part II, Chapter 7, Area) cover rectangles, triangles, parallelograms, trapeziums and polygons, but not circles. Class 7 has no area chapter. |
| 9 | Ganita Manjari, Part I (new, 2026–27) | Chapter 6, "Measuring Space: Perimeter and Area": circumference and π, arc length, area of a circle and sector problems |
| 10 | Mathematics (current rationalised book; new books expected in 2027–28) | Chapter 11, "Areas Related to Circles": sectors and segments |

Some schools and state boards still use older books, so check with your teacher. You can download the current books free from [NCERT's textbook page](https://ncert.nic.in/textbook.php). Circle area also comes up later in 3D shapes. The two ends of a cylinder are circles, which is where the 2πr² in the [surface area of a cylinder](https://www.knewspaper.in/post/surface-area-of-a-cylinder) comes from.

## Common mistakes

- **Using the diameter as the radius.** If you put d into πr², your answer is 4 times too big. Halve the diameter first.
- **Writing cm instead of cm².** Area is always in square units. Circumference (2πr) is in cm, area (πr²) is in cm².
- **Confusing 2πr and πr².** 2πr is the distance around the circle. πr² is the space inside it.
- **Mixing units.** Convert everything to the same unit before you square it. Remember that 1 m² = 10,000 cm², not 100 cm².
- **Squaring π along with r.** πr² means π × (r × r). It does not mean (π × r)².

## Frequently asked questions

### What is the formula for the area of a circle?

Area = πr², where r is the radius and π is about 22/7 or 3.14. With the diameter, use πd²/4. With the circumference, use C²/4π.

### How do you find the area of a circle with the diameter?

Halve the diameter to get the radius, then use πr². For example, a 28 cm diameter gives r = 14 cm, so the area is 22/7 × 14 × 14 = 616 cm².

### Should I use 22/7 or 3.14 for π in exams?

Use whichever value the question gives. NCERT exercises usually default to 22/7. If no value is given, 22/7 is easier when the radius is a multiple of 7, and 3.14 is easier for round decimals. Both are within about 0.05% of the true value.

### What is the difference between the area and the circumference of a circle?

The circumference (2πr) is the length of the boundary, measured in units like cm. The area (πr²) is the space enclosed, measured in square units like cm².
