import puppeteer from "puppeteer-core";
const OUT = process.argv[2] ?? "/tmp";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
// hover empty hero area -> bounding box expected
await page.mouse.move(400, 700);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/cursor-box.png` });
// hover the flower icon button -> trailers should hide, native cursor (not in screenshot) shows
await page.mouse.move(719, 258);
await new Promise((r) => setTimeout(r, 800));
const cursorStyle = await page.evaluate(() => {
  const el = document.elementFromPoint(719, 258);
  return { tag: el.tagName, cursor: getComputedStyle(el).cursor };
});
console.log(JSON.stringify(cursorStyle));
await page.screenshot({ path: `${OUT}/cursor-button.png` });
await browser.close();
