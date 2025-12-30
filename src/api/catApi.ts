import type { Breed } from "../types/Breed"
import type { CatImage } from "../types/CatImage"
import type { LoginRequest, RegisterRequest } from "../types/Auth"
import type { User } from "../types/User"

const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getBreeds(): Promise<Breed[]> {
  const res = await fetch(`${API_URL}/breeds`)
  if (!res.ok) throw new Error("Error fetching breeds")
  return res.json()
}

  export async function getImagesByBreedId(breedId: string, limit = 10): Promise<CatImage[]> {
  const res = await fetch(`${API_URL}/Images/bybreedid?breedId=${encodeURIComponent(breedId)}&limit=${limit}`)
  if (!res.ok) throw new Error("Error fetching images")
  return res.json()
}

async function ensureOk(res: Response) {
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || `HTTP ${res.status}`)
  }
}

export async function register(req: RegisterRequest): Promise<User> {
  const qs = new URLSearchParams({
    name: req.name,
    email: req.email,
    password: req.password,
  })

  const res = await fetch(`${API_URL}/Users/register?${qs.toString()}`, {
    method: "GET",
  })

  await ensureOk(res)
  return res.json()
}

export async function login(req: LoginRequest): Promise<User> {
  const qs = new URLSearchParams({
    email: req.email,
    password: req.password,
  })

  const res = await fetch(`${API_URL}/Users/login?${qs.toString()}`, {
    method: "GET",
  })

  await ensureOk(res)
  return res.json()
}