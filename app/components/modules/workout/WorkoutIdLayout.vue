<template>
  <div>
    <WrapperLoader v-if="loading" />

    <div
      v-else-if="!workout && !loading"
      class="flex flex-col items-center justify-center py-12"
    >
      <h2 class="text-2xl font-bold mb-2">Workout not found</h2>
      <UButton @click="$router.push('/workout')">Back to list</UButton>
    </div>

    <div v-else>
      <div class="mb-6">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-left"
          @click="$router.back()"
        >
          Back
        </UButton>
      </div>

      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ workout.title }}</h1>
        <p class="text-gray-500">{{ formattedDate }}</p>
      </div>

      <div class="space-y-4">
        <ExerciseCard
          v-for="(exercise, index) in workout.exercises"
          :key="exercise.id"
          :exercise="exercise"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Workout } from "@/shared/types/workout";
import ExerciseCard from "@/components/modules/exercise/ExerciseCard.vue";
import WrapperLoader from "@/components/ui/WrapperLoader.vue";

interface Props {
  workout: Workout | null;
  loading: boolean;
}

const props = defineProps<Props>();

const formattedDate = computed(() => {
  if (!props.workout) return "";
  const date = new Date(props.workout.date);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
});
</script>
