import { storeToRefs } from "pinia";
import { useAuthStore } from "~/shared/stores/auth.store";

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, loading, isAuthenticated, currentUser, userEmail, userId } =
    storeToRefs(authStore);

  const signIn = async (email: string, password: string) => {
    return await authStore.signIn(email, password);
  };

  const signUp = async (email: string, password: string) => {
    return await authStore.signUp(email, password);
  };

  const logout = async () => {
    const result = await authStore.logout();
    if (result.success) {
      await navigateTo("/auth/sign-in");
    }
    return result;
  };

  const getToken = async () => {
    return await authStore.getToken();
  };

  return {
    user,
    loading,
    isAuthenticated,
    currentUser,
    userEmail,
    userId,
    signIn,
    signUp,
    logout,
    getToken,
  };
};
