import puppeteer from "puppeteer-core";
const OUT = process.argv[2] ?? "/tmp";
const widths = [360, 390, 494, 640, 768, 870, 1024, 1180, 1440];
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
for (const w of widths) {
  await page.setViewport({ width: w, height: 820 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1800));
  // overlap audit: logo, badge, pill, buttons bounding boxes
  const audit = await page.evaluate(() => {
    const r = (sel) => document.querySelector(sel)?.getBoundingClientRect();
    const logo = r("header a[aria-label='MHacks home']") ?? r("header img[alt='MHacks']");
    const badge = r("#mlh-trust-badge");
    const pill = r("header nav[aria-label='Primary']");
    const btns = r("header a[href='#sponsors']");
    const overlap = (a, b) => a && b && a.right > b.left && b.right > a.left && a.bottom > b.top && b.bottom > a.top;
    const vis = (el) => el && el.width > 0;
    return {
      logoBadge: overlap(logo, badge),
      badgePill: vis(pill) && overlap(badge, pill),
      pillBtns: vis(pill) && overlap(pill, btns),
      badgeBtns: overlap(badge, btns),
      metaOverflow: [...document.querySelectorAll("#top span")].some((s) => {
        const b = s.getBoundingClientRect();
        return b.width > 0 && (b.left < -2 || b.right > innerWidth + 2);
      }),
    };
  });
  console.log(w, JSON.stringify(audit));
  await page.screenshot({ path: `${OUT}/w${w}.png` });
}
await browser.close();
