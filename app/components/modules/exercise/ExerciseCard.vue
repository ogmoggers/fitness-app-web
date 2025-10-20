<template>
  <Card>
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold text-primary">#{{ index + 1 }}</span>
        <h3 class="text-lg font-semibold">
          {{ exercise.title }}
        </h3>
      </div>
      <div class="flex items-center gap-2">
        <UBadge variant="soft">{{ exercise.sets.length }} sets</UBadge>

        <div class="relative">
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            variant="ghost"
            size="sm"
            @click="isMenuOpen = !isMenuOpen"
          />

          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
            @click="isMenuOpen = false"
          >
            <button
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg"
              @click="emit('edit')"
            >
              <span class="i-heroicons-pencil w-4 h-4" />
              Edit
            </button>
            <button
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-b-lg text-red-600"
              @click="emit('delete')"
            >
              <span class="i-heroicons-trash w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <SetRow
        v-for="(set, setIndex) in exercise.sets"
        :key="set.id"
        :set="set"
        :index="setIndex"
      />
    </div>

    <div class="flex gap-4 mt-3 text-sm text-gray-500">
      <span>Rest: {{ exercise.rest_seconds }}s</span>
      <span>Total: {{ exercise.total_weight }} kg</span>
      <span>{{ exercise.total_reps }} reps</span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { Exercise } from "@/shared/types/Exercise";
import Card from "@/components/ui/Card.vue";
import SetRow from "@/components/modules/set/SetRow.vue";

interface Props {
  exercise: Exercise;
  index: number;
}

defineProps<Props>();

const emit = defineEmits<{
  edit: [];
  delete: [];
}>();

const isMenuOpen = ref(false);
</script>
