import { useAuthStore } from "~/shared/stores/auth.store";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  if (import.meta.client) {
    await authStore.init();
  }
});
