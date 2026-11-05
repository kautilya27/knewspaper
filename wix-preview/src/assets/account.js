// My account (my-account.html): log in, the writer's article credits and plan,
// and every article they've submitted with its status. Articles are written on
// Submit your article (submit-article.html).
import { initAccount } from "/assets/account-core.js";

initAccount({ page: "/my-account.html", plansHref: "/submit-article.html#plans", defaultPlan: () => "m5" });
