import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  loginApi,
  registerApi,
  getPerfil,
  updatePerfil as updatePerfilApi,
  type AuthResponse,
  type UserProfile,
} from "../services/auth";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  telefono?: string | null;
  direccion?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    nombre: string;
    email: string;
    password: string;
    telefono?: string;
    direccion?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      getPerfil(savedToken)
        .then((profile: UserProfile) => {
          const freshUser = {
            id: profile.id,
            nombre: profile.nombre,
            email: profile.email,
            rol: profile.rol,
            telefono: profile.telefono,
            direccion: profile.direccion,
          };
          setUser(freshUser);
          localStorage.setItem("auth_user", JSON.stringify(freshUser));
        })
        .catch(() => {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const saveAuth = (res: AuthResponse) => {
    const userData: User = {
      id: res.id,
      nombre: res.nombre,
      email: res.email,
      rol: res.rol,
    };
    setToken(res.token);
    setUser(userData);
    localStorage.setItem("auth_token", res.token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    const res: AuthResponse = await loginApi({ email, password });
    saveAuth(res);
  };

  const register = async (data: {
    nombre: string;
    email: string;
    password: string;
    telefono?: string;
    direccion?: string;
  }) => {
    const res: AuthResponse = await registerApi(data);
    saveAuth(res);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!token) return;
    const updated = await updatePerfilApi(token, data);
    const newUser: User = {
      id: updated.id,
      nombre: updated.nombre,
      email: updated.email,
      rol: updated.rol,
      telefono: updated.telefono,
      direccion: updated.direccion,
    };
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
