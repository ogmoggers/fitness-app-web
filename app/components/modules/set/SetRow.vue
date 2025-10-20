<template>
  <div
    class="grid grid-cols-3 items-center gap-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
  >
    <span class="text-gray-500">Set {{ index + 1 }}</span>
    <span class="font-medium text-left">{{ set.weight }} kg</span>
    <span class="font-medium text-right">{{ set.reps }} reps</span>
  </div>
</template>

<script setup lang="ts">
import type { SetData } from "@/shared/types/set";

interface Props {
  set: SetData;
  index: number;
}

defineProps<Props>();
</script>
