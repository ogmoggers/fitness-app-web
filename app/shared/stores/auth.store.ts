import { defineStore } from "pinia";

interface AuthState {
  user: any | null;
  loading: boolean;
  initialized: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    currentUser: (state): any | null => state.user,
    userEmail: (state): string | null => state.user?.email ?? null,
    userId: (state): string | null => state.user?.id ?? null,
  },

  actions: {
    async init() {
      if (this.initialized) return;
      // Firebase auth removed - будет заменено на Supabase
      this.initialized = true;
    },

    async signIn(email: string, password: string) {
      this.loading = true;
      try {
        // Firebase auth removed - будет заменено на Supabase
        throw new Error("Auth temporarily disabled - Firebase removed");
      } catch (error: any) {
        return { success: false, error: this.handleAuthError(error) };
      } finally {
        this.loading = false;
      }
    },

    async signUp(email: string, password: string) {
      this.loading = true;
      try {
        // Firebase auth removed - будет заменено на Supabase
        throw new Error("Auth temporarily disabled - Firebase removed");
      } catch (error: any) {
        return { success: false, error: this.handleAuthError(error) };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        // Firebase auth removed - будет заменено на Supabase
        this.user = null;
        this.clearUserFromStorage();
        return { success: true };
      } catch (error: any) {
        return { success: false, error: this.handleAuthError(error) };
      } finally {
        this.loading = false;
      }
    },

    async getToken(): Promise<string | null> {
      // Firebase auth removed - будет заменено на Supabase
      return null;
    },

    saveUserToStorage(user: any) {
      if (import.meta.client) {
        const userData = {
          id: user.id,
          email: user.email,
        };
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }
    },

    clearUserFromStorage() {
      if (import.meta.client) {
        localStorage.removeItem("auth_user");
      }
    },

    handleAuthError(error: any): string {
      return error.message || "Произошла ошибка при аутентификации";
    },
  },
});
