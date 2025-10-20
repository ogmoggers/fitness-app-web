<template>
  <header class="border-b border-gray-200 dark:border-gray-800">
    <UContainer class="mx-auto px-3 sm:px-4 lg:px-6">
      <div class="grid grid-cols-[1fr_auto_1fr] items-center h-16">
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="navigateTo('/')"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold"
          >
            MG
          </div>
          <span class="text-lg font-semibold hidden md:block">MoggersGym</span>
        </div>

        <nav class="flex justify-center items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :class="[
              'px-4 py-2 rounded-lg text-sm',
              isActive(item.href)
                ? 'bg-primary/10 text-primary'
                : '  hover:bg-gray-100 dark:hover:bg-gray-800',
            ]"
            @click.prevent="navigateTo(item.href)"
          >
            {{ item.name }}
          </a>
        </nav>

        <div class="flex gap-2 justify-end items-center">
          <UColorModeButton class="cursor-pointer" />
          <UButton
            v-if="isAuthenticated"
            variant="ghost"
            size="sm"
            @click="handleLogout"
          >
            Logout
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { isAuthenticated, logout } = useAuth();

const navItems = [
  { name: "Workouts", href: "/workout" },
  { name: "My Sets", href: "/sets" },
];

const isActive = (href: string) => {
  return route.path === href;
};

const navigateTo = (href: string) => {
  router.push(href);
};

const handleLogout = async () => {
  await logout();
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
