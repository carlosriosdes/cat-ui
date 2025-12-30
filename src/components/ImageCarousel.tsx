import { useEffect, useState } from "react"
import type { CatImage } from "../types/CatImage"

export default function ImageCarousel({ images }: { images: CatImage[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    setI(0)
  }, [images])

  if (!images.length) return <div className="text-sm">Sin imágenes</div>

  const safeIndex = i >= images.length ? 0 : i

  const prev = () => setI(v => (v - 1 + images.length) % images.length)
  const next = () => setI(v => (v + 1) % images.length)

  return (
    <div className="space-y-2">
      <div className="border rounded overflow-hidden">
        <img src={images[safeIndex].url} className="w-full h-72 object-cover" />
      </div>

      <div className="flex gap-2 items-center">
        <button className="border px-3 py-1 rounded" onClick={prev}>Prev</button>
        <button className="border px-3 py-1 rounded" onClick={next}>Next</button>
        <div className="text-sm">{safeIndex + 1}/{images.length}</div>
      </div>
    </div>
  )
}
