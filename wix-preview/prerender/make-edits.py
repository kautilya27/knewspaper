# Builds prerender/edits.json: text edits deploy.js applies to the live files.
# Script changes are expressed as find/replace hunks against the committed
# (= live) version, with a length check, so only the differences are sent.
import json, subprocess, difflib, sys
BASE = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
E = []
ROOT = ["index.html","about.html","contact.html","blog.html","category.html","post.html","search.html","write-for-us.html","privacy-policy.html","terms.html","refund-policy.html","404.html"]
for a, b in [
    ("include up to 2 do-follow links and 3 no-follow links.", "include up to 5 links to other websites. Because these are paid placements, every outside link is marked rel=\"sponsored\" and the post is labelled as a sponsored guest post, as Google and ASCI guidelines require."),
    ("<li>Up to 2 do-follow and 3 no-follow links per article</li>", "<li>Up to 5 links to your site or sources, marked rel=\"sponsored\"</li>"),
    ("""          <select data-link-follow aria-label="Link type">
            <option value="nofollow">No-follow</option>
            <option value="follow">Do-follow</option>
          </select>
""", ""),
    ("""        <span data-meter="dofollow">Do-follow links 0/2</span>
        <span data-meter="nofollow">No-follow links 0/3</span>""", """        <span data-meter="links">Links to other sites 0/5</span>"""),
    ("links you paste start as no-follow; click a link to change it.", "up to 5 links to other sites (published as sponsored); click a link to edit it."),
]:
    E.append({"path": "write-for-us.html", "find": a, "replace": b, "optional": BASE != "HEAD"})
E.append({"path": "terms.html", "find": "and at most 2 do-follow and 3 no-follow external links.</li>", "replace": "and at most 5 links to other websites.</li>\n<li>Guest posts are paid placements. Each one is labelled \"Sponsored guest post\" and every link to another website in it is published with rel=\"sponsored\", as Google's guidelines for paid links require. We do not sell do-follow links.</li>", "optional": BASE != "HEAD"})
E.append({"path": "assets/feed.js", "find": 'import { PUBLISHER, SITE, breadcrumbs, setJsonLd } from "/assets/seo.js";', "replace": 'import { PUBLISHER, SITE, breadcrumbs, noindex, setJsonLd } from "/assets/seo.js";', "optional": True})
E.append({"path": "assets/feed.js", "find": '      titleEl.textContent = "Topic not found";\n', "replace": '      noindex();\n      titleEl.textContent = "Topic not found";\n', "optional": True})
for p in ROOT:
    E.append({"path": p, "find": '<li><a href="/about-us">About us</a></li>', "replace": '<li><a href="/about-us">About us</a></li><li><a href="/editorial-team.html">Editorial team</a></li>', "optional": True, "unless": 'href="/editorial-team.html"'})
    E.append({"path": p, "find": "min-height:100px;text-align:center", "replace": "min-height:280px;text-align:center", "optional": True, "all": True})
E.append({"path": "post.html", "find": "</head>", "replace": "<style>.article[data-article]{min-height:100vh}.prose img[width]{height:auto}</style></head>", "unless": ".article[data-article]{min-height"})

files = ["site.js", "post.js", "fast.js", "seo.js", "guest-rules.js", "write.js"]
for f in files:
    old = subprocess.run(["git", "show", f"{BASE}:wix-preview/src/assets/{f}"], capture_output=True, text=True, check=True).stdout
    new = open(f"src/assets/{f}").read()
    if old == new:
        continue
    a, b = old.splitlines(keepends=True), new.splitlines(keepends=True)
    hunks = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag == "equal":
            continue
        c = 0
        while True:
            lo, hi = max(0, i1 - c), min(len(a), i2 + c)
            find = "".join(a[lo:hi])
            if find and old.count(find) == 1:
                break
            c += 1
        hunks.append((lo, "".join(a[lo:hi]), "".join(a[lo:i1]) + "".join(b[j1:j2]) + "".join(a[i2:hi])))
    cur = old
    for lo, find, rep in sorted(hunks, key=lambda h: -h[0]):
        assert cur.count(find) == 1, (f, find[:80])
        cur = cur.replace(find, rep)
        E.append({"path": "assets/" + f, "find": find, "replace": rep})
    assert cur == new, "mismatch " + f
    E.append({"path": "assets/" + f, "check": True, "length": len(new)})
json.dump(E, open("prerender/edits.json", "w"))
print(len(E), "edits")
