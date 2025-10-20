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
            FT
          </div>
          <span class="text-lg font-semibold hidden md:block">FitTracker</span>
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

        <div class="flex gap-[3px] justify-between">
          <UColorModeButton class="cursor-pointer" />
          <!-- <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm cursor-pointer"
            @click="navigateTo('/profile')"
          >
            KE
          </div> -->
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      currentPath: "/workout",
      navItems: [
        { name: "Workouts", href: "/workout" },
        { name: "My Sets", href: "/sets" },
      ],
    };
  },
  methods: {
    isActive(href) {
      return this.currentPath === href;
    },
    navigateTo(href) {
      this.currentPath = href;
      this.$router.push(href);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
