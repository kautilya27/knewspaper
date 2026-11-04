// Privacy policy, carried over from knewspaper.in/privacy-policy (last
// updated 25 March 2024). Review it with your own adviser and replace the
// text below with your exact policy if it differs.

export const privacyHtml = (site) => `
<p class="lede">${site.name} values your privacy. This policy explains how we collect, use, share and protect information when you visit our website. By using the site, you agree to this policy.</p>
<p><em>Last updated 25 March 2024.</em></p>

<h2>Information we collect</h2>
<ul>
  <li><strong>Personal information</strong> you choose to give us, such as your name and email address when you contact us or subscribe.</li>
  <li><strong>Usage data</strong> collected automatically, such as your IP address, browser type and the pages you visit.</li>
  <li><strong>Cookies and similar technologies</strong> that help the site work, improve browsing and measure traffic.</li>
</ul>

<h2>How we use your information</h2>
<ul>
  <li>To provide the services you ask for, such as replying to your messages.</li>
  <li>To improve the site and tailor content to readers’ interests.</li>
  <li>For analytics and to send you updates you have signed up for.</li>
</ul>

<h2>Sharing your information</h2>
<p>We do not sell or rent your personal information. We may share it with service providers who help us run the site, such as hosting providers, and we may disclose it when the law requires or to protect our rights and safety.</p>

<h2>Your rights</h2>
<p>You can ask for a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it, subject to our legal obligations.</p>

<h2>Security</h2>
<p>We take reasonable steps to protect your information from unauthorised access, alteration or disclosure.</p>

<h2>Contact us</h2>
<p>Questions about this policy? Use our <a href="${site.basePath}contact/">contact page</a> or email <a href="mailto:${site.email}">${site.email}</a>.</p>
`;
