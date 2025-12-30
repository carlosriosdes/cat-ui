import { Link, Route, Routes } from "react-router-dom"
import BreedDetailPage from "./pages/BreedDetailPage"
import BreedsTablePage from "./pages/BreedsTablePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import MePage from "./pages/MePage"
import RequireAuth from "./auth/RequireAuth"
import { useAuth } from "./auth/AuthContext"

export default function App() {
  const { user } = useAuth()

  return (
    <div>
      <div className="p-4 flex gap-2 border-b">
        <Link className="border rounded px-3 py-1" to="/">Vista 1</Link>
        <Link className="border rounded px-3 py-1" to="/table">Vista 2</Link>
        <Link className="border rounded px-3 py-1" to="/login">Vista 3</Link>
        <Link className="border rounded px-3 py-1" to="/register">Vista 4</Link>
        <Link className="border rounded px-3 py-1" to="/me">Vista 5</Link>
        <div className="ml-auto text-sm self-center">
          {user ? `Logueado: ${user.email}` : "No logueado"}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<BreedDetailPage />} />
        <Route path="/table" element={<BreedsTablePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/me"
          element={
            <RequireAuth>
              <MePage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  )
}
