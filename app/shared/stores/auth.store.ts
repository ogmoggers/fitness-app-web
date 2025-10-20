import { defineStore } from "pinia";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "~/shared/config/firebase.config";

interface AuthState {
  user: User | null;
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
    currentUser: (state): User | null => state.user,
    userEmail: (state): string | null => state.user?.email ?? null,
    userId: (state): string | null => state.user?.uid ?? null,
  },

  actions: {
    async init() {
      if (this.initialized) return;

      const auth = getFirebaseAuth();

      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          this.initialized = true;

          if (user) {
            this.saveUserToStorage(user);
          } else {
            this.clearUserFromStorage();
          }

          resolve();
        });
      });
    },

    async signIn(email: string, password: string) {
      this.loading = true;
      try {
        const auth = getFirebaseAuth();
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = user;
        this.saveUserToStorage(user);
        return { success: true, user };
      } catch (error: any) {
        return { success: false, error: this.handleAuthError(error) };
      } finally {
        this.loading = false;
      }
    },

    async signUp(email: string, password: string) {
      this.loading = true;
      try {
        const auth = getFirebaseAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = user;
        this.saveUserToStorage(user);
        return { success: true, user };
      } catch (error: any) {
        return { success: false, error: this.handleAuthError(error) };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        const auth = getFirebaseAuth();
        await signOut(auth);
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
      if (!this.user) return null;
      try {
        return await this.user.getIdToken();
      } catch {
        return null;
      }
    },

    saveUserToStorage(user: User) {
      if (import.meta.client) {
        const userData = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
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
      const errorMessages: Record<string, string> = {
        "auth/invalid-email": "Неверный формат email",
        "auth/user-disabled": "Пользователь заблокирован",
        "auth/user-not-found": "Пользователь не найден",
        "auth/wrong-password": "Неверный пароль",
        "auth/email-already-in-use": "Email уже используется",
        "auth/weak-password": "Слишком слабый пароль",
        "auth/operation-not-allowed": "Операция не разрешена",
        "auth/invalid-credential": "Неверные учетные данные",
      };

      return errorMessages[error.code] || "Произошла ошибка при аутентификации";
    },
  },
});
