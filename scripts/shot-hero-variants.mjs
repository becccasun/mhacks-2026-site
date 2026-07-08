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
for (const [label, name] of [["Meadow backdrop", "leaf"], ["Peony garden backdrop", "flower"], ["Sky backdrop", "cloud"]]) {
  await page.click(`button[aria-label="${label}"]`);
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${OUT}/hero-${name}.png` });
  console.log(`${OUT}/hero-${name}.png`);
}
await browser.close();
