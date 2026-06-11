import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  email: string;
  name: string;
  avatar: string;
  points: number;
  level: string;
  nextLevelPoints: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({
      email,
      name: "Helado Lover",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW4pnjeihkOBsSadLa0WRJTH8ECeBFTbgq2Lvoe7MospQw7c6LlveGSnUTj90JhhQgq72L9AEWPx6FeMnZ-pBdtKZA98Gvi9mQ4lZC2E9J7ZSpIemFNgqyhc3QRy05TAOMh7xFnH_PFb1EFiJkwIj6vIyXdvLjSThVggYqN3ynZsgU-AmiJyranEh8AOhfwe6Z8l_qyy0KEJOKhHAKxOPECzcoyazv75kq5u72eh-xfrucGFBSYWn_Z9B4FKsgb81lSdNkv7T2eMc",
      points: 120,
      level: "Oro",
      nextLevelPoints: 150,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
