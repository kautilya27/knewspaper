**Quick answer:** A **face** is a flat surface of a solid, an **edge** is a line segment where two faces meet, and a **vertex** (plural: vertices) is a corner point where edges meet. A cube, for example, has **6 faces, 12 edges and 8 vertices**.

For any solid with flat faces (a polyhedron) that has no holes, these three numbers are linked by **Euler's formula: F + V − E = 2**. For the cube, 6 + 8 − 12 = 2. Curved solids like the cylinder, cone and sphere are where most counting confusion starts, so they get their own section below.

## The three words, explained with a matchbox

Pick up a matchbox or any cuboid-shaped box.

- **Faces:** the flat rectangles: top, bottom, front, back, left and right, so 6.
- **Edges:** the straight folds where two faces meet: 4 around the top, 4 around the bottom and 4 upright, so 12.
- **Vertices:** the corners: 4 on top and 4 at the bottom, so 8.

The current NCERT Class 8 book uses exactly these definitions. In *Ganita Prakash* Part 2, Chapter 4 ("Exploring Some Geometric Themes"), section 4.2 "Visualising Solids" describes faces as the flat surfaces that form the boundary of a solid, edges as the line segments that form the sides of the faces, and vertices as the points where the edges meet. Its own example is the cuboid: 6 faces, 12 edges, 8 vertices.

## Faces, edges and vertices of common solids

| Solid | Faces (F) | Vertices (V) | Edges (E) | F + V − E |
|---|---|---|---|---|
| Cube | 6 | 8 | 12 | 2 |
| Cuboid | 6 | 8 | 12 | 2 |
| Triangular prism | 5 | 6 | 9 | 2 |
| Pentagonal prism | 7 | 10 | 15 | 2 |
| Hexagonal prism | 8 | 12 | 18 | 2 |
| Triangular pyramid (tetrahedron) | 4 | 4 | 6 | 2 |
| Square pyramid | 5 | 5 | 8 | 2 |
| Pentagonal pyramid | 6 | 6 | 10 | 2 |
| Hexagonal pyramid | 7 | 7 | 12 | 2 |
| Octahedron | 8 | 6 | 12 | 2 |

Every row in the last column gives 2: that is Euler's formula at work.

## A shortcut for any prism or pyramid

If the base has **n** sides, you can work everything out without memorising the table. NCERT's Class 8 book asks students to find this pattern themselves.

### Prism with an n-sided base

A prism has two identical bases joined by rectangles.

- **Vertices = 2n**, because each base has n corners.
- **Edges = 3n**: n around the top, n around the bottom, and n upright edges joining them.
- **Faces = n + 2**: n rectangular side faces, plus the 2 bases.

### Pyramid with an n-sided base

A pyramid has one base and triangles meeting at a top point (the apex).

- **Vertices = n + 1**: n corners of the base, plus the apex.
- **Edges = 2n**: n around the base, plus n slanting edges up to the apex.
- **Faces = n + 1**: n triangles, plus the base.

### Worked example: an octagonal prism

An octagon has 8 sides, so n = 8.

Vertices = 2 × 8 = 16

Edges = 3 × 8 = 24

Faces = 8 + 2 = 10

Check with Euler's formula: 10 + 16 − 24 = 2. Correct.

### Worked example: a decagonal pyramid

A decagon has 10 sides, so n = 10.

Vertices = 10 + 1 = 11

Edges = 2 × 10 = 20

Faces = 10 + 1 = 11

Check: 11 + 11 − 20 = 2. Correct.

## Euler's formula: using it, and when it fails

**F + V − E = 2** is named after the Swiss mathematician Leonhard Euler. Its most common exam use is finding a missing number.

### Worked example: find the edges

A polyhedron has 12 faces and 20 vertices. How many edges does it have?

F + V − E = 2

12 + 20 − E = 2

32 − E = 2

E = 30

(This is the dodecahedron, the 12-faced solid made of pentagons.)

### Worked example: can this solid exist

Can a polyhedron have 10 faces, 15 vertices and 20 edges?

F + V − E = 10 + 15 − 20 = 5

The answer is not 2, so no polyhedron can have these numbers.

### When Euler's formula does NOT work

- **Solids with a hole through them.** Picture a square photo frame made of wood, with flat sides. Split its front and back into 4 trapezium-shaped pieces each, so that every face is an ordinary polygon. It then has 16 faces, 16 vertices and 32 edges, so F + V − E = 16 + 16 − 32 = **0**, not 2. Euler's formula in its school form applies to polyhedra without holes, such as all convex polyhedra (cube, prisms, pyramids).
- **Curved solids.** The cylinder, cone and sphere are not polyhedra, because their surfaces are not all flat polygons. The formula was never meant for them, so don't use it as a check there.

## The curved-solid trap: cylinder, cone and sphere

Textbooks, guidebooks and websites genuinely disagree here, so know both ways of counting.

**The strict way (matches NCERT's definitions).** NCERT defines a face as a *flat* surface and an edge as a *line segment*. Under these definitions, a cylinder has 2 flat faces (the circles) and a curved surface that is not called a face. Its circular rims are curves, not line segments, and a sphere has no flat face, no edge and no vertex at all.

**The common way (many guidebooks and international sites).** Here curved surfaces also count as faces and curved boundaries count as edges:

| Solid | Faces | Edges | Vertices |
|---|---|---|---|
| Cylinder | 3 (2 flat + 1 curved) | 2 (curved) | 0 |
| Cone | 2 (1 flat + 1 curved) | 1 (curved) | 1 (apex) |
| Sphere | 1 (curved) | 0 | 0 |

In an exam, follow your own textbook and teacher's notes. If you use the second table, say "curved face" and "curved edge" so the examiner sees you know the difference. And never "verify Euler's formula" on these shapes: the cylinder gives 3 + 0 − 2 = 1, and the cone giving 2 is a coincidence, not proof.

If you're working with these round solids in mensuration, our guides to the [surface area of a cylinder](https://www.knewspaper.in/post/surface-area-of-a-cylinder) and the [volume of a sphere](https://www.knewspaper.in/post/volume-of-a-sphere) pick up from here.

## Common mistakes that cost marks

1. **Missing hidden edges.** In a drawing, the back edges are dashed or hidden. Count in groups (top, bottom, sides) instead of tracing one by one.
2. **Mixing up a pyramid's vertices and faces.** Both are n + 1, but they are different things that happen to be equal.
3. **Forgetting the bases of a prism.** A hexagonal prism has 6 side faces plus 2 bases, so 8 faces, not 6.
4. **Calling a curved surface a face in an NCERT answer.** Under NCERT's definitions, faces are flat, so say "curved surface" unless your book counts it as a face.
5. **Using Euler's formula on a shape with a tunnel** or on curved solids.

## Where this is in the NCERT syllabus

Students on the new books meet this in *Ganita Prakash* Class 8, Part 2, Chapter 4, "Exploring Some Geometric Themes", under section 4.2, "Visualising Solids" (alongside nets, projections and isometric drawing). The chapter defines faces, edges and vertices and asks you to find the counts for an n-sided prism and pyramid, but it does not state Euler's formula by name. Euler's formula and "verify Euler's formula" exercises come from the older Class 8 book's Chapter 10, "Visualising Solid Shapes", and still appear in many reference books. You can download the current textbooks free from the [NCERT textbooks page](https://ncert.nic.in/textbook.php).

## Frequently asked questions

### How many faces, edges and vertices does a cube have?

A cube has 6 square faces, 12 edges and 8 vertices. A cuboid has the same numbers, only its faces are rectangles.

### Does a sphere have any faces, edges or vertices?

By NCERT's definition (a face is flat, an edge is a line segment), a sphere has none of the three. Books that count curved surfaces say it has 1 curved face, 0 edges and 0 vertices.

### Does Euler's formula work for every 3D shape?

No. It works for polyhedra without holes, such as cubes, prisms and pyramids. It fails for a polyhedron with a hole through it, like a photo frame (which gives 0), and it isn't meant for curved solids.

### What is the difference between a vertex and an apex?

Every corner of a solid is a vertex. The apex is the special vertex at the top of a pyramid or cone, where the slanting edges or surface meet.
