import { useEffect, useMemo, useState } from "react"
import { getBreeds, getImagesByBreedId } from "../api/catApi"
import type { Breed } from "../types/Breed"
import type { CatImage } from "../types/CatImage"
import ImageCarousel from "../components/ImageCarousel"

export default function BreedDetailPage() {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [images, setImages] = useState<CatImage[]>([])
  const selected = useMemo(() => breeds.find(b => b.id === selectedId), [breeds, selectedId])

  useEffect(() => {
    getBreeds().then(setBreeds).catch(console.error)
  }, [])

    useEffect(() => {
    if (!selectedId) return
    getImagesByBreedId(selectedId, 10).then(setImages).catch(console.error)
    }, [selectedId])


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Vista 1</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Selecciona una raza</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          {breeds.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="grid md:grid-cols-2 gap-4">
          <ImageCarousel images={images} />

          <div className="border rounded p-4 space-y-2">
            <div className="text-xl font-semibold">{selected.name}</div>
            <div><b>Origen:</b> {selected.origin}</div>
            <div><b>Temperamento:</b> {selected.temperament}</div>
            <div className="text-sm"><b>Descripción:</b> {selected.description}</div>
          </div>
        </div>
      )}
    </div>
  )
}
