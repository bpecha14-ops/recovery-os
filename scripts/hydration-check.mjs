// Reproduce the hydration error: load the page with prefers-reduced-motion: reduce
// and capture console errors (framer-motion useReducedMotion reads matchMedia
// synchronously during hydration -> structural branches flip on the client).
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";

const browser = await chromium.launch();
for (const reduced of [false, true]) {
  const context = await browser.newContext({ reducedMotion: reduced ? "reduce" : "no-preference" });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") logs.push(`[${m.type()}] ${m.text().slice(0, 300)}`);
  });
  page.on("pageerror", (e) => logs.push(`[pageerror] ${String(e).slice(0, 300)}`));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  console.log(`\n===== reducedMotion: ${reduced ? "REDUCE" : "normal"} =====`);
  console.log(logs.length ? logs.join("\n") : "(no errors/warnings)");
  await context.close();
}
await browser.close();
