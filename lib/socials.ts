/**
 * Latest Instagram posts for the "Our Social Media" section.
 *
 * ENGINEERING HANDOFF NOTES
 * - Images are snapshots downloaded to /public/social (Instagram CDN URLs
 *   expire, so don't hotlink display_url values directly).
 * - To make this live, replace SOCIAL_POSTS with data from the Instagram
 *   Graph API (or a scheduled job that refreshes /public/social) keeping the
 *   same shape — the section component only depends on this array.
 * - `href` links to the post; `label` is a short caption snippet.
 */

export interface SocialPost {
  /** Local snapshot of the post image. */
  image: string;
  /** Permalink to the Instagram post. */
  href: string;
  /** Short caption shown under the frame. */
  label: string;
  /** Post date, shown in mono under the label. */
  date: string;
}

export const INSTAGRAM_URL = "https://www.instagram.com/mhacks_/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/mhacks/";
export const TIKTOK_URL = "https://www.tiktok.com/@mhacks_official";

export const SOCIAL_POSTS: SocialPost[] = [
  {
    image: "/social/ig-01.jpg",
    href: "https://www.instagram.com/p/DZ5rNtgvU3o/",
    label: "Applications are officially live",
    date: "06.22.2026",
  },
  {
    image: "/social/ig-02.jpg",
    href: "https://www.instagram.com/p/DZ3Hf8OyWP1/",
    label: "Full bloom incoming",
    date: "06.21.2026",
  },
  {
    image: "/social/ig-03.jpg",
    href: "https://www.instagram.com/p/DZ0evdlvFux/",
    label: "We can't stop checking on it either",
    date: "06.20.2026",
  },
  {
    image: "/social/ig-04.jpg",
    href: "https://www.instagram.com/p/DZyF4_DSEfA/",
    label: "Things grow differently in digital soil",
    date: "06.19.2026",
  },
  {
    image: "/social/ig-05.jpg",
    href: "https://www.instagram.com/p/DZveB1LyAss/",
    label: "Feeling a bit under the weather?",
    date: "06.18.2026",
  },
];
