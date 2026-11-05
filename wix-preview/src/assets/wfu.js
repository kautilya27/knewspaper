// The Write for us page (write-for-us.html): guidelines and plans. A single
// guest post goes straight to the Submit your article page with that plan
// chosen; a membership opens the buy box, since a member may buy now and
// publish later. Articles are written on submit-article.html (assets/write.js).
import { showBuy } from "/assets/plans.js";

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-pick], [data-buy-mail]");
  if (!b) return;
  e.preventDefault();
  const key = b.dataset.pick || b.dataset.plan || "m5";
  if (key === "single" && b.dataset.pick) location.assign("/submit-article.html?plan=single#submit");
  else showBuy(key);
});
