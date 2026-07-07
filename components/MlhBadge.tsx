/**
 * MLH trust badge — rests at the top of the hero (absolute, not fixed), a
 * little to the right of the MHacks logo. It scrolls away with the page:
 * once the next sheet slides over the hero, the badge is gone.
 */
export function MlhBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=black"
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="absolute top-0 z-[20] block w-[10%] min-w-[60px] max-w-[100px]"
      style={{ left: "calc(clamp(100px, 8vw, 128px) + 50px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logos/mlh-trust-badge-2027-black.svg"
        alt="Major League Hacking 2026 Hackathon Season"
        className="w-full"
      />
    </a>
  );
}
