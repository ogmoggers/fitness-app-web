<template>
  <div
    class="grid grid-cols-3 items-center gap-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
  >
    <span class="text-gray-500">Set {{ index + 1 }}</span>
    <span class="font-medium text-center">{{ set.weight }} kg</span>
    <span class="font-medium text-right">{{ set.reps }} reps</span>
  </div>
</template>

<script setup lang="ts">
import type { Set } from "@/shared/types/Set";

interface Props {
  set: Set;
  index: number;
}

defineProps<Props>();
</script>
