import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login({ email, password })
      nav("/me")
    } catch (err: any) {
      setError(err.message || "Error")
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Vista 3 - Login</h1>

      <form onSubmit={onSubmit} className="space-y-2">
        <input className="border rounded p-2 w-full" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input className="border rounded p-2 w-full" placeholder="Password" type="password"
          value={password} onChange={e => setPassword(e.target.value)} />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button className="border rounded px-4 py-2 w-full" type="submit">Entrar</button>
      </form>

      <div className="text-sm">
        ¿No tienes cuenta? <Link className="underline" to="/register">Regístrate</Link>
      </div>
    </div>
  )
}
