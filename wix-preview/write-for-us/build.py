# Builds site/write-for-us.html: the live page's head, masthead and footer
# (shell.html, a copy of the published page) around main.html, with wfu.css
# inlined and the page's own script bundle (assets/write.bundle.js).
import pathlib, re
here = pathlib.Path(__file__).parent
shell = (here / "shell.html").read_text()
main = (here / "main.html").read_text().strip()
css = (here / "wfu.css").read_text().strip()
desc = "Publish a guest post on Knewspaper: ₹499 for one article, or a one-year membership for 5 to 100 articles. Guidelines, plans and how to submit."
out = re.sub(r'(<main id="main" tabindex="-1">).*?(</main>)', lambda m: m.group(1) + main + m.group(2), shell, flags=re.S)
out = out.replace('/assets/site.bundle.js', '/assets/write.bundle.js')
out = out.replace('content="Guest posting guidelines for Knewspaper."', f'content="{desc}"')
out = out.replace('</head>', f'<style>{css}</style></head>', 1)
assert out.count('write.bundle.js') == 1 and 'data-wfu-form' in out
(here.parent / "site" / "write-for-us.html").write_text(out)
print("wrote", len(out), "bytes")
