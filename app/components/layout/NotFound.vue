<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] px-4">
    <div class="text-center space-y-6">
      <div class="">
        <h1 class="text-9xl font-bold text-primary-500 opacity-80">404</h1>
      </div>

      <div class="space-y-2">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Страница не найдена
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
      </div>

      <div class="flex gap-3 justify-center pt-4">
        <UButton to="/" size="lg" color="primary" icon="i-heroicons-home">
          На главную
        </UButton>
        <UButton
          @click="$router.back()"
          size="lg"
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrow-left"
        >
          Назад
        </UButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
