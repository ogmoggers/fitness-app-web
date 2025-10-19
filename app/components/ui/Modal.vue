<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-6 sm:p-6 bg-gray-900/75 dark:bg-gray-950/80 backdrop-blur-sm"
        @click.self="handleBackdropClick"
      >
        <Card
          v-if="isOpen"
          class="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl"
        >
          <template #header>
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button
                v-if="showClose"
                type="button"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                @click="close"
                aria-label="Close"
              >
                <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5" />
              </button>
            </div>
          </template>

          <div class="space-y-4">
            <slot :close="close" />
          </div>

          <template v-if="$slots.footer" #footer>
            <slot name="footer" :close="close" />
          </template>
        </Card>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  preventClose?: boolean;
  showClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  preventClose: false,
  showClose: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleBackdropClick = () => {
  if (!props.preventClose) {
    close();
  }
};

const close = () => {
  isOpen.value = false;
  emit("close");
};

// Блокировка скролла body при открытии модалки
watch(
  isOpen,
  (value) => {
    if (process.client) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = "";
  }
});
</script>
