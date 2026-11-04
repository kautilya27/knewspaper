// Browser-side Wix SDK module, loaded on demand (sign-in, forms).
// Uses OAuthStrategy with the public Client ID only. Member tokens are kept
// in localStorage so the visitor stays signed in. No secrets are involved.

import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';
import { submissions } from '@wix/forms';

const CFG = window.KNEWS || {};
const TOKENS_KEY = 'knews.wix.tokens';
const OAUTH_KEY = 'knews.wix.oauth';

export const available = true;

const store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  },
  del(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};

let client;
function wix() {
  if (client) return client;
  const tokens = store.get(TOKENS_KEY) || undefined;
  client = createClient({
    modules: { members, submissions },
    auth: OAuthStrategy({ clientId: CFG.clientId, tokens }),
  });
  return client;
}

const origin = () => CFG.siteOrigin && location.origin === CFG.siteOrigin ? CFG.siteOrigin : location.origin;
export const callbackUrl = () => `${origin()}${CFG.basePath}callback/`;

/** Start Wix-hosted sign-in. returnTo = page to come back to afterwards. */
export async function login(returnTo = location.href) {
  const c = wix();
  const oauthData = c.auth.generateOAuthData(callbackUrl(), returnTo);
  store.set(OAUTH_KEY, oauthData);
  const { authUrl } = await c.auth.getAuthUrl(oauthData);
  location.assign(authUrl);
}

/** Called on /callback/: exchanges the code for member tokens. */
export async function completeLogin() {
  const c = wix();
  const oauthData = store.get(OAUTH_KEY);
  if (!oauthData) throw new Error('Sign-in session expired. Start sign-in again.');

  let { code, state, error, errorDescription } = c.auth.parseFromUrl() || {};
  if (!code) {
    // Accept both ?query and #fragment responses.
    const params = new URLSearchParams(location.search + '&' + location.hash.replace(/^#/, ''));
    code = params.get('code');
    state = params.get('state');
    error = error || params.get('error');
    errorDescription = errorDescription || params.get('error_description');
  }
  if (error) throw new Error(errorDescription || error);
  if (!code) throw new Error('No sign-in code was returned.');

  const tokens = await c.auth.getMemberTokens(code, state, oauthData);
  c.auth.setTokens(tokens);
  store.set(TOKENS_KEY, tokens);
  store.del(OAUTH_KEY);
  return oauthData.originalUri || CFG.basePath;
}

export function isLoggedIn() {
  try { return Boolean(store.get(TOKENS_KEY)) && wix().auth.loggedIn(); } catch { return false; }
}

export async function currentMember() {
  if (!isLoggedIn()) return null;
  const res = await wix().members.getCurrentMember({ fieldsets: ['FULL'] });
  const m = res?.member || res;
  return m ? { name: m.profile?.nickname || m.contact?.firstName || m.loginEmail || 'Member' } : null;
}

export async function logout() {
  const c = wix();
  store.del(TOKENS_KEY);
  try {
    const { logoutUrl } = await c.auth.logout(`${origin()}${CFG.basePath}`);
    location.assign(logoutUrl);
  } catch {
    location.assign(CFG.basePath);
  }
}

/** Submit a Wix Form. values = { fieldKey: value }. */
export async function submitForm(formId, values) {
  if (!formId) throw new Error('No Wix form is configured.');
  return wix().submissions.createSubmission({ formId, submissions: values });
}
