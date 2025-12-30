import { useEffect, useMemo, useState } from "react"
import { getBreeds } from "../api/catApi"
import type { Breed } from "../types/Breed"

export default function BreedsTablePage() {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [text, setText] = useState("")
  const [query, setQuery] = useState("")

  useEffect(() => {
    getBreeds().then(setBreeds).catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return breeds
    return breeds.filter(b =>
      `${b.name} ${b.origin} ${b.temperament} ${b.description}`.toLowerCase().includes(q)
    )
  }, [breeds, query])

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Vista 2</h1>

      <div className="flex gap-2">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Buscar..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="border rounded px-4" onClick={() => setQuery(text)}>
          Buscar
        </button>
      </div>

      <div className="border rounded overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Origen</th>
              <th className="text-left p-2">Temperamento</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-t">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.origin}</td>
                <td className="p-2">{b.temperament}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500">Mostrando {filtered.length} de {breeds.length}</div>
    </div>
  )
}
