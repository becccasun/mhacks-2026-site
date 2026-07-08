/**
 * Quick single-section screenshot for visual verification during edits.
 * Usage: node scripts/shot.mjs "#timeline" /tmp/timeline.png [scrollOffsetPx]
 */
import puppeteer from "puppeteer-core";

const [, , anchor = "#top", out = "/tmp/shot.png", offset = "0"] = process.argv;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(process.env.CAPTURE_URL ?? "http://localhost:3000/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await page.evaluate(
  (sel, off) => {
    const el = document.querySelector(sel);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + off);
  },
  anchor,
  Number(offset),
);
// Let scroll-linked entrances and canvases settle before capturing.
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: out });
await browser.close();
console.log(out);
