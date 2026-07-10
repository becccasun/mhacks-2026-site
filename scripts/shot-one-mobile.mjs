import puppeteer from "puppeteer-core";
const [, , out, offset = "250"] = process.argv;
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate((off) => {
  const el = document.querySelector("#timeline");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + off);
}, Number(offset));
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: out });
console.log(out);
await browser.close();
