import puppeteer from "puppeteer-core";
const OUT = process.argv[2] ?? "/tmp";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
// footer height + section order
const info = await page.evaluate(() => ({
  order: [...document.querySelectorAll("main > *")].map((el) => el.id || el.tagName.toLowerCase()),
  footerH: document.querySelector("footer")?.getBoundingClientRect().height,
}));
console.log(JSON.stringify(info));
await page.screenshot({ path: `${OUT}/batch-hero.png` });
// mid-crossfade shot: click flower then capture quickly
await page.click('button[aria-label="Peony garden backdrop"]');
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: `${OUT}/batch-fade.png` });
await new Promise((r) => setTimeout(r, 1500));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: `${OUT}/batch-footer.png` });
await browser.close();
