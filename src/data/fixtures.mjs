// Offline preview data taken from the current knewspaper.in homepage and
// category pages. Used only by `npm run build:fixtures` (or when no Client ID
// is configured locally) so the design can be previewed without network
// access. Real builds always read live content from Wix.

import config from '../../site.config.mjs';
import { normalizePost } from './normalize.mjs';

const C = Object.fromEntries(config.categories.map((c, i) => [c.slug, { id: 'cat-' + c.slug, label: c.label, slug: c.slug, description: '', postCount: 0, order: i }]));

const rows = [
  ['small-habits-big-changes-why-tiny-daily-actions-outperform-ambitious-goals', 'Small Habits, Big Changes: Why Tiny Daily Actions Outperform Ambitious Goals', 'career', 'c0f544_5f6646119f8d46de808d1ed155a287b0~mv2.webp', 'Mannu Dutt', 7, 'Big goals and full routine overhauls tend to collapse at the first disruption. Small, repeatable actions compound quietly and keep going when motivation does not.', true],
  ['surface-area-of-a-cylinder', 'Surface Area of a Cylinder: Formula, Worked Examples and Practice Questions', 'education', '', '', 6, 'The curved surface, the two circular ends, and how to put them together, with worked examples and practice questions to check your answers.', true],
  ['schizophrenia-symptoms-causes', 'Schizophrenia: Symptoms, Causes and How It Is Treated', 'health-fitness', '7d90fe_1aea737dd07a49019d0d7cbf497a9cc8~mv2.webp', '', 8, 'A serious, long-term condition that is widely misunderstood. What the symptoms look like, what is known about the causes, and how treatment works.', true],
  ['kidney-stones-symptoms-causes', 'Kidney Stones: Symptoms, Causes, Types and When to Seek Help', 'health-fitness', '7d90fe_fe20f8ed95534dfe86954bc0f0440aeb~mv2.webp', '', 7, 'How kidney stones form, the symptoms they cause, the main types, and the warning signs that mean you should see a doctor.', true],
  ['sustainable-development-practices-for-a-better-and-more-efficient-future', 'Sustainable Development Practices for a Better and More Efficient Future', 'sociology-and-society', '', '', 5, 'Practical approaches to development that meet today’s needs without borrowing against tomorrow.'],
  ['best-mock-test-platform-india', 'Best Mock Test Platform in India: Five Options Compared', 'education', '', '', 6, 'Five mock test platforms compared on question quality, analytics, pricing and exam coverage.'],
  ['biodata-format', 'Biodata Format for a Job Application: What It Is, What to Include and How to Write It', 'career', '', '', 6, 'What a biodata is, how it differs from a resume, and a simple format you can follow.'],
  ['morningmantras', '50 Morning Mantras to Start Your Day With Intention and Calm', 'devotional', '7d90fe_1b541f2b74ba4c77a8210a8df8e3204c~mv2.webp', '', 9, 'How a short phrase repeated in the first minutes of the day can steady the mind, plus fifty to choose from.'],
  ['what-is-a-prime-number', 'What Is a Prime Number? Definition, List up to 100 and Worked Examples', 'education', '', '', 5, 'The definition, every prime up to 100, quick ways to test a number, and worked examples.'],
  ['narcissistic-personality-disorder-what-it-actually-is-and-how-to-recognise-it', 'Narcissistic Personality Disorder: What It Actually Is and How to Recognise It', 'health-fitness', '', '', 8, 'The clinical picture behind a word that is used loosely online, and the signs that actually matter.'],
  ['diabetes-diagnosis-and-treatment', 'Diabetes Diagnosis and Treatment: What the Tests Mean and What Happens Next', 'health-fitness', '7d90fe_aeb3d3802bd74e26990920af971eb777~mv2.webp', '', 8, 'The blood tests used to diagnose diabetes, what the numbers mean, and how treatment usually begins.'],
  ['resume-action-verbs', '185 Resume Action Verbs That Make Your Experience Sound Like Achievement', 'career', '', '', 10, 'Swap weak phrases for verbs that show results, grouped by the skill you want to highlight.'],
  ['goals-vs-systems', 'Goals vs Systems: Why the Process Matters More Than the Target', 'career', '', '', 6, 'Goals set direction; systems decide whether you get there. How to build the second.'],
  ['trigonometry-table', 'Trigonometry Table: Standard Values You Need to Know by Heart', 'education', '', '', 5, 'The standard sin, cos and tan values, and an easy pattern for remembering them.'],
  ['anxiety-symptoms-and-causes', 'Anxiety: Symptoms, Causes and When It Becomes Something to Treat', 'health-fitness', '7d90fe_e5b389ad436849d494859e66b8c11bd5~mv2.webp', '', 7, 'Anxiety is a normal response. Here is how to tell when it has become a medical concern.'],
  ['how-to-stop-procrastinating', 'How to Stop Procrastinating: A Practical Guide That Does Not Rely on Motivation', 'career', '7d90fe_9400fdab49f149bcaf0b9c5130c24c1c~mv2.webp', '', 7, 'Procrastination is a mood-regulation problem, not laziness. Practical steps that work on a bad day.'],
  ['translation-maths', 'Translation in Maths: How to Move a Shape Using Column Vectors', 'education', '', '', 5, 'What a translation is, how column vectors describe it, and worked examples on a grid.'],
  ['add-vs-adhd', 'ADD vs ADHD: Are They Actually Two Different Conditions?', 'health-fitness', '7d90fe_76d0b651828d48e1887fd8cc8a9ea151~mv2.webp', '', 6, 'ADD is an older name. What changed, and how ADHD is described and diagnosed today.'],
  ['rangoli-designs-for-diwali-2026', 'Rangoli Designs for Diwali 2026: Easy Ideas, Step-by-Step Method and Safety Tips', 'fesrival', '', '', 6, 'Easy rangoli ideas for beginners, a step-by-step method, and tips for safe colours and diyas.'],
  ['board-exam-paper-presentation-tips', 'Paper Presentation Tips for Board Exams: 15 Ways to Score Higher on the Same Answers', 'education', '', '', 7, 'Layout, headings, diagrams and timing: small changes that help examiners give you the marks.'],
  ['halloween-2026', 'Halloween 2026: Date, History and How It Is Celebrated', 'fesrival', '', '', 5, 'When Halloween falls this year, where it comes from, and how it is celebrated around the world.'],
  ['pongal-2027-first-day-bhogi', 'Pongal 2027: The First Day, Bhogi, and the Full Four Day Calendar', 'fesrival', '', '', 5, 'Bhogi, Thai Pongal, Mattu Pongal and Kaanum Pongal: dates and traditions for 2027.'],
  ['oral-maxillofacial-surgeon-role', 'The Role of an Oral & Maxillofacial Surgeon: Transforming Smiles and Lives', 'health-fitness', 'c0f544_1b4a7e2a68f14e90b961ead3fc9377f8~mv2.png', '', 5, 'What this dental specialty covers, from wisdom teeth to jaw surgery.'],
  ['what-is-a-root-canal', 'What is a Root Canal? Myths vs. Facts', 'health-fitness', 'c0f544_ecafa4faf09b4ca685a1dfa6d43fa6ec~mv2.webp', 'Dr. Sailee Kalyankar', 4, 'Common root canal myths, and what actually happens in the chair.'],
  ['best-protein-sources', 'Best Protein Sources: Fuel Your Body Right', 'food', '6798aa_12aad999fc00490d9adbdd07e3177935~mv2.webp', '', 5, 'Protein’s role in muscle growth and repair, and the best vegetarian and non-vegetarian sources.'],
  ['which-vegetables-can-beat-egg-in-protein', 'Which Vegetables Can Beat Egg in Protein?', 'food', 'afb999_acefe348b72e4e1f825f7474ed2f7e74~mv2.webp', '', 4, 'Eggs are the usual benchmark. These vegetables and legumes come close or beat them.'],
  ['coursera-vs-udemy', 'Coursera Vs Udemy. What To Choose?', 'career', 'afb999_eaf71fc8d43d493ab0816caea8ea2dcb~mv2.webp', '', 2, 'Certificates, pricing and course quality compared, so you can pick the right platform.'],
  ['gta-6-pc-requirements', 'GTA 6 PC Requirements: From Minimum Specs to Ultimate Performance', 'gaming', 'c0f544_492355e752eb40d2a1530f2a0b4a7a08~mv2.webp', '', 6, 'Expected minimum, recommended and high-end specs, and what upgrades matter most.'],
  ['eligibility-to-launch-an-ipo', 'Eligibility Requirements for Launching an IPO', 'finance', 'c0f544_6f0a1cceccd942b19c6f4d9825260eb9~mv2.webp', '', 3, 'What a company needs in place before it can list on Indian stock exchanges.'],
  ['jeans-vs-cargos-which-streetwear-staple-should-men-rock-in-2025', 'Jeans vs. Cargos: Which Streetwear Staple Should Men Rock in 2025?', 'fashion', 'c0f544_991987fb670445d79036de7c563c47c2~mv2.webp', '', 4, 'Fit, comfort and styling compared for two everyday staples.'],
  ['best-medical-certificate-course-platforms', 'Best Medical Certificate Course Platforms: A Comprehensive Guide', 'education', 'c0f544_49a2676588e0448f82808922494d0aba~mv2.webp', '', 9, 'Where to find recognised short medical certificate courses online, and how to choose one.'],
  ['fees-of-icse-schools-in-hinjewadi-pune', 'What Parents Should Know About Fees Of ICSE Schools in Hinjewadi Pune', 'education', 'c0f544_77d00592214142c3abcba854d58c23e8~mv2.webp', '', 4, 'Fee ranges, what is included, and questions to ask before admission.'],
];

const HABITS_HEADINGS = [
  'Why habits are the operating system of your life',
  'How habits form: the habit loop',
  'Four ways to break a bad habit',
  'Identity is the real mechanism of lasting change',
  'When habits stall or break',
  'The compounding argument',
];

const t = (text, decorations = []) => ({ type: 'TEXT', textData: { text, decorations } });
const para = (...nodes) => ({ type: 'PARAGRAPH', nodes });
const h = (level, text) => ({ type: 'HEADING', headingData: { level }, nodes: [t(text)] });

function sampleBody(excerpt, headings) {
  const nodes = [
    para(t(excerpt)),
    para(
      t('Preview text. ', [{ type: 'BOLD' }]),
      t('This is an offline preview build. The full article loads from your Wix Blog when the site is built with your Wix Client ID.'),
    ),
  ];
  for (const head of headings) {
    nodes.push(h(2, head));
    nodes.push(para(t('Article text from Wix appears here, with its headings, images, lists, quotes and links rendered in the site’s reading typography.')));
  }
  nodes.push({ type: 'BLOCKQUOTE', nodes: [para(t('Small actions, repeated daily, end up deciding most outcomes.'))] });
  nodes.push({
    type: 'BULLETED_LIST',
    nodes: ['Make it obvious', 'Make it attractive', 'Make it easy', 'Make it satisfying'].map((x) => ({ type: 'LIST_ITEM', nodes: [para(t(x))] })),
  });
  return { nodes };
}

export function loadFixtures() {
  const start = Date.parse('2026-11-02T06:30:00Z');
  const categoriesById = new Map(Object.values(C).map((c) => [c.id, c]));
  const posts = rows.map(([slug, title, cat, img, author, minutes, excerpt, featured], i) => {
    const raw = {
      _id: 'fx-' + i,
      slug,
      title,
      excerpt,
      contentText: excerpt,
      firstPublishedDate: new Date(start - i * 1000 * 60 * 60 * 31).toISOString(),
      featured: Boolean(featured),
      minutesToRead: minutes,
      metrics: { views: Math.round(5000 / (1 + ((i * 7) % 13))) },
      categoryIds: ['cat-' + cat],
      media: img ? { wixMedia: { image: `wix:image://v1/${img}/${img}#originWidth=1200&originHeight=675` } } : undefined,
      author,
    };
    const post = normalizePost(raw, { categoriesById });
    post.richContent = sampleBody(excerpt, i === 0 ? HABITS_HEADINGS : HABITS_HEADINGS.slice(0, 3));
    return post;
  });
  const counts = {};
  posts.forEach((p) => p.categories.forEach((c) => (counts[c.slug] = (counts[c.slug] || 0) + 1)));
  const categories = Object.values(C).map((c) => ({ ...c, postCount: counts[c.slug] || 0 }));
  return { posts, categories, source: 'fixtures' };
}
