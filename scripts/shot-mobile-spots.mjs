import puppeteer from "puppeteer-core";
const OUT = process.argv[2];
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: `${OUT}/mob-hero.png` });
await page.evaluate(() => {
  const el = document.querySelector("#sponsors");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 500);
});
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: `${OUT}/mob-sponsors.png` });
// overflow audit across whole page
const overflow = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll("section *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > innerWidth + 3) && el.children.length === 0 && el.textContent.trim()) {
      bad.push(el.textContent.trim().slice(0, 40));
    }
  });
  return bad.slice(0, 8);
});
console.log("overflowing text elements:", JSON.stringify(overflow));
await browser.close();
