import { useAuthStore } from "~/shared/stores/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.init();
  }

  if (
    !authStore.isAuthenticated &&
    to.path !== "/auth/sign-in" &&
    to.path !== "/auth/sign-up"
  ) {
    return navigateTo("/auth/sign-in");
  }

  if (
    authStore.isAuthenticated &&
    (to.path === "/auth/sign-in" || to.path === "/auth/sign-up")
  ) {
    return navigateTo("/workout");
  }

  if (authStore.isAuthenticated && to.path === "/") {
    return navigateTo("/workout");
  }
});
