import { useAuth } from "../auth/AuthContext"

export default function MePage() {
  const { user, logout } = useAuth()

  return (
    <div className="p-4 max-w-lg mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Vista 5 - Perfil (Protegida)</h1>

      <div className="border rounded p-4 space-y-1">
        <div><b>ID:</b> {user?.id}</div>
        <div><b>Nombre:</b> {user?.name}</div>
        <div><b>Email:</b> {user?.email}</div>
      </div>

      <button className="border rounded px-4 py-2" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}
