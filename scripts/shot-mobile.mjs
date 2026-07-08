import puppeteer from "puppeteer-core";
const OUT = process.argv[2] ?? "/tmp";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(process.env.CAPTURE_URL ?? "http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
const H = await page.evaluate(() => document.body.scrollHeight);
let shot = 0;
for (let y = 0; y < H; y += 800) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/mobile-${String(shot).padStart(2, "0")}.png` });
  shot++;
  if (shot > 14) break;
}
console.log(`${shot} shots, page height ${H}`);
await browser.close();
