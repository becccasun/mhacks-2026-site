import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.CAPTURE_URL ?? "http://localhost:3000/";
const OUT = process.env.CAPTURE_OUT ?? "/tmp/mhacks-shots";
const WIDTH = Number(process.env.CAPTURE_W ?? 1440);
const HEIGHT = Number(process.env.CAPTURE_H ?? 900);

const shots = [
  { name: "01-hero", scroll: 0 },
  { name: "02-hero-scrolled", scroll: 400 },
  { name: "03-about-top", scroll: null, anchor: "#about" },
  { name: "04-about-stats", scroll: null, anchor: "#about", offset: 700 },
  { name: "05-sponsors-top", scroll: null, anchor: "#sponsors" },
  { name: "06-sponsors-cta", scroll: null, anchor: "#sponsors", offset: 900 },
  { name: "07-faq", scroll: null, anchor: "#faq" },
  { name: "08-faq-scrolled", scroll: null, anchor: "#faq", offset: 500 },
  { name: "09-footer", scroll: "end" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60_000 });
await sleep(1500);

for (const s of shots) {
  if (s.anchor) {
    await page.evaluate(
      ({ sel, off }) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY + (off ?? 0);
        window.scrollTo({ top: y, behavior: "instant" });
      },
      { sel: s.anchor, off: s.offset ?? 0 },
    );
  } else if (s.scroll === "end") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  } else {
    await page.evaluate((y) => window.scrollTo(0, y), s.scroll ?? 0);
  }
  await sleep(1200);
  const out = path.join(OUT, `${s.name}.png`);
  await page.screenshot({ path: out, fullPage: false });
  console.log(`? ${s.name} -> ${out}`);
}

await browser.close();
