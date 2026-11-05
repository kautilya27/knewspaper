// Guest-post plans and buying one by email. Shared by the Write for us page
// (assets/wfu.js) and the Submit your article page (assets/write.js).
// Plans are sold by email and paid to the owner directly; the owner then adds
// the plan to the writer's account in Wix Pricing Plans (an offline order).
import { esc } from "/assets/site.js";

export const PLANS = {
  single: { id: "57bd1c30-084b-437b-94da-270f365b0c0e", price: 499, label: "Single guest post" },
  m5: { id: "04f4d952-fc28-4c5d-99ce-559ff5e51b12", price: 999, label: "Membership · 5 articles for 1 year" },
  m10: { id: "b86d4fef-a32d-4ef8-84a7-c78100993911", price: 1499, label: "Membership · 10 articles for 1 year" },
  m50: { id: "ced45f94-49c2-4e41-a75c-e2465eb21c7c", price: 2999, label: "Membership · 50 articles for 1 year" },
  m100: { id: "204dbc14-ce23-4cd4-aed4-bf60e7fd0974", price: 4999, label: "Membership · 100 articles for 1 year" },
};
export const planKeyById = Object.fromEntries(Object.entries(PLANS).map(([k, p]) => [p.id, k]));
export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const MAIL = "knewspaper.in@gmail.com";

// The email that buys a plan, with the plan, the writer's account email and the article filled in.
export function buyMessage(key, articleTitle, accountEmail) {
  const plan = PLANS[key] || PLANS.single;
  const subject = `Buy guest post plan: ${plan.label} (${inr(plan.price)})`;
  const body = [
    "Hi Knewspaper team,",
    "",
    `I'd like to buy: ${plan.label} (${inr(plan.price)}).`,
    `My Knewspaper account email: ${accountEmail || ""}`,
    articleTitle ? `Article I've submitted: ${articleTitle}` : "",
    "",
    "Please send me the payment details.",
  ].filter((l, i, a) => l || a[i - 1]).join("\n");
  return { plan, subject, body };
}
export function buyLink(key, articleTitle, accountEmail) {
  const { subject, body } = buyMessage(key, articleTitle, accountEmail);
  return `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// The buy box: choose the plan, then write the email in Gmail, copy the address
// or the message, or open the mail app (not everyone has one set up).
let dialog = null;
export function showBuy(key, articleTitle = "", accountEmail = "") {
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.className = "wfu-buydlg";
    document.body.append(dialog);
    document.head.insertAdjacentHTML("beforeend", `<style>.wfu-buydlg{max-width:470px;width:calc(100% - 32px);border:0;border-radius:14px;padding:22px 22px 18px;box-shadow:0 18px 50px rgba(0,0,0,.25);font-family:var(--sans)}.wfu-buydlg::backdrop{background:rgba(15,23,42,.45)}.wfu-buydlg h3{margin:0 0 6px;font-size:1.15rem}.wfu-buydlg p{margin:.4em 0;color:#444}.wfu-buydlg label{display:block;font-weight:600;margin:12px 0 4px}.wfu-buydlg select{width:100%;padding:9px 10px;border:1px solid #c9ced8;border-radius:8px;font:inherit}.wfu-buydlg .addr{display:flex;gap:8px;align-items:center;margin:12px 0;padding:10px 12px;border:1px solid #d5dbe8;border-radius:8px;background:#f6f8fc;font-weight:600;word-break:break-all}.wfu-buydlg .addr span{flex:1}.wfu-buydlg .opts{display:grid;gap:8px;margin-top:12px}.wfu-buydlg .opts .btn,.wfu-buydlg .opts button{width:100%;text-align:center;justify-content:center}.wfu-buydlg .close{position:absolute;top:10px;right:12px;border:0;background:none;font-size:1.4rem;cursor:pointer;color:#666}.wfu-buydlg .ok{color:#137333;font-size:.9rem;min-height:1.2em}</style>`);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  }
  const render = (k) => {
    const { plan, subject, body } = buyMessage(k, articleTitle, accountEmail);
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    dialog.innerHTML = `<button type="button" class="close" aria-label="Close" data-close>×</button>
      <h3>Buy a plan</h3>
      <p>Email us with the plan you want. We reply with the payment details, and add the plan to your account once you've paid. You can submit articles whenever you like after that.</p>
      <label for="buy-plan">Plan</label>
      <select id="buy-plan" data-buy-plan>${Object.entries(PLANS).map(([pk, p]) => `<option value="${pk}"${pk === k ? " selected" : ""}>${esc(p.label)} · ${inr(p.price)}</option>`).join("")}</select>
      <div class="addr"><span>${MAIL}</span><button type="button" class="btn btn--quiet" data-copy-addr>Copy</button></div>
      <div class="opts">
        <a class="btn" href="${esc(gmail)}" target="_blank" rel="noopener">Write the email in Gmail</a>
        <button type="button" class="btn btn--quiet" data-copy-msg>Copy the message</button>
        <a class="btn btn--quiet" href="${esc(buyLink(k, articleTitle, accountEmail))}">Open my mail app</a>
      </div>
      <p class="ok" role="status" aria-live="polite"></p>`;
    const ok = dialog.querySelector(".ok");
    const copy = (text, msg) => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { ok.textContent = msg; }, () => { ok.textContent = "Couldn't copy. Select the text and copy it instead."; });
    dialog.querySelector("[data-copy-addr]").onclick = () => copy(MAIL, "Email address copied.");
    dialog.querySelector("[data-copy-msg]").onclick = () => copy(`To: ${MAIL}\nSubject: ${subject}\n\n${body}`, `Message copied (${plan.label}). Paste it into any email to us.`);
    dialog.querySelector("[data-close]").onclick = () => dialog.close();
    dialog.querySelector("[data-buy-plan]").onchange = (e) => render(e.target.value);
  };
  render(PLANS[key] ? key : "single");
  if (dialog.showModal) { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute("open", "");
}
