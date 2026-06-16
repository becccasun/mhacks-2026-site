import group from '../assets/photos/group.jpg'
import mlhBooth from '../assets/photos/mlh-booth.jpg'
import ceremony from '../assets/photos/ceremony.jpg'
import crowd1 from '../assets/photos/crowd-1.jpg'
import crowd2 from '../assets/photos/crowd-2.jpg'
import crowd3 from '../assets/photos/crowd-3.jpg'
import crowd4 from '../assets/photos/crowd-4.jpg'
import team from '../assets/photos/team.jpg'

// Event photos from MHacks 2025
const PHOTOS = [
  { src: group, pos: '50% 40%' },
  { src: crowd1, pos: '50% 45%' },
  { src: mlhBooth, pos: '50% 50%' },
  { src: crowd2, pos: '50% 45%' },
  { src: ceremony, pos: '50% 50%' },
  { src: crowd3, pos: '50% 45%' },
  { src: team, pos: '50% 50%' },
  { src: crowd4, pos: '50% 45%' },
]

/** full-bleed infinite marquee of event photos — scrolls left, loops seamlessly */
export default function PhotoCarousel() {
  return (
    <div className="group overflow-hidden">
      <div className="flex w-max gap-4 px-2 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...PHOTOS, ...PHOTOS].map((p, i) => (
          <div
            key={i}
            className="h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-ink/8 bg-haze md:h-72 md:w-[26rem]"
          >
            <img
              src={p.src}
              alt=""
              loading="lazy"
              style={{ objectPosition: p.pos }}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
