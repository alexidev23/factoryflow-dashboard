import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loadSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      loadSession: () => {
        try {
          const raw = localStorage.getItem("session");
          if (!raw) return;

          const user = JSON.parse(raw) as User;
          set({ user, isAuthenticated: true });
        } catch (err) {
          console.error("Error cargando sesión:", err);
        }
      },

      login: async (email, password) => {
        try {
          const raw = localStorage.getItem("admin");
          if (!raw) return false;

          const admin = JSON.parse(raw) as { email: string; password: string };

          if (admin.email === email && admin.password === password) {
            const user: User = { email };

            localStorage.setItem("session", JSON.stringify(user));

            set({ user, isAuthenticated: true });
            return true;
          }

          return false;
        } catch {
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("session");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "factoryflow-auth",
    }
  )
);
