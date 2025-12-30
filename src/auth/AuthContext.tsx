import { createContext, useContext, useMemo, useState } from "react"
import type { User } from "../types/User"
import type { LoginRequest, RegisterRequest } from "../types/Auth"
import { login as apiLogin, register as apiRegister } from "../api/catApi"

type AuthContextType = {
  user: User | null
  login: (req: LoginRequest) => Promise<void>
  register: (req: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)
const LS_KEY = "cat-ui-user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  })

  const value = useMemo<AuthContextType>(() => ({
    user,
    login: async (req) => {
      const u = await apiLogin(req)
      setUser(u)
      localStorage.setItem(LS_KEY, JSON.stringify(u))
    },
    register: async (req) => {
      const u = await apiRegister(req)
      setUser(u)
      localStorage.setItem(LS_KEY, JSON.stringify(u))
    },
    logout: () => {
      setUser(null)
      localStorage.removeItem(LS_KEY)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
