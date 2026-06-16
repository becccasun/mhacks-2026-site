import { useEffect, useRef } from 'react'

// dot positions within a cell, ordered so brighter cells fill more of the
// 3x4 matrix — recreates the dotted-square glyphs of the asciikit reference
const DOTS: Array<[number, number]> = [
  [1, 1],
  [2, 0],
  [0, 2],
  [1, 3],
  [2, 2],
  [0, 0],
  [2, 3],
  [0, 3],
  [1, 0],
  [2, 1],
  [0, 1],
  [1, 2],
]

// deterministic 2D hash → [0,1), used to carve the patchy clusters
// seen in the asciikit reference art
function hash(x: number, y: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

export default function AsciiOverlay({
  src,
  cell = 16,
  color = 'rgba(255, 253, 244, 0.8)',
  threshold = 0.48,
  className,
}: {
  src: string
  cell?: number
  color?: string
  threshold?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = src
    let raf = 0

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height || !img.naturalWidth) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(rect.width / cell)
      const rows = Math.ceil(rect.height / cell)

      // sample the source image at one pixel per cell, replicating object-cover
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d')
      if (!octx) return
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      octx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h)
      const data = octx.getImageData(0, 0, cols, rows).data

      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = color
      // faint dark halo keeps dots legible over bright areas of the photo
      ctx.shadowColor = 'rgba(15, 25, 8, 0.45)'
      ctx.shadowBlur = 2

      const dot = Math.max(2, Math.round(cell / 7))
      const pitch = (cell - dot) / 3

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const lum =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
          // coarse-grid noise gives cluster patches, fine noise breaks edges
          const patch = hash(x >> 2, y >> 2) * 0.72 + hash(x, y) * 0.28
          if (patch < threshold) continue
          if (lum < 0.2) continue
          const count = Math.min(
            DOTS.length,
            Math.max(2, Math.round(lum * DOTS.length)),
          )
          for (let d = 0; d < count; d++) {
            const [dx, dy] = DOTS[d]
            ctx.fillRect(
              x * cell + dx * pitch,
              y * cell + dy * (pitch * 0.75),
              dot,
              dot,
            )
          }
        }
      }
    }

    img.onload = render
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    })
    ro.observe(canvas)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [src, cell, color, threshold])

  return <canvas ref={ref} className={className} aria-hidden />
}
