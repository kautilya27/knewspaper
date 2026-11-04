import re,sys
live = open("live-write-for-us.html").read()
sec = open("membership-section.html").read()
html = live
html = html.replace('href="/assets/', 'href="https://www.knewspaper.in/assets/').replace('src="/assets/', 'src="https://www.knewspaper.in/assets/')
html = re.sub(r'<script id="wix-site-script"[^>]*></script>', '', html)
html = html.replace('<title>Write for us | Knewspaper</title>', '<title>Write for us (sample) | Knewspaper</title><meta name="robots" content="noindex">')
for p in ['/about-us','/write-for-us','/contact','/privacy-policy','/blog','/search.html']:
    html = html.replace(f'href="{p}"', f'href="https://www.knewspaper.in{p}"')
html = html.replace('href="/"', 'href="https://www.knewspaper.in/"').replace('action="/search.html"', 'action="https://www.knewspaper.in/search.html"')
html = html.replace('<body>', '<body><div class="wfu-sample-banner">Sample preview: not live on knewspaper.in</div>', 1)
anchor = '</div></section></main>'
assert html.count(anchor) == 1
html = html.replace(anchor, '</div>' + sec + '</section></main>')
open("write-for-us-sample.html", "w").write(html)
print(len(html))
