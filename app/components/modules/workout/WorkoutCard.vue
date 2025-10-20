<template>
  <Card
    class="cursor-pointer hover:shadow-lg transition-shadow"
    @click="navigateToWorkout"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-bold mb-1">{{ workout.title }}</h3>
        <p class="text-sm text-gray-500 mb-3">{{ formattedDate }}</p>

        <div class="flex flex-wrap gap-3 text-sm">
          <div class="flex items-center gap-1">
            <span class="text-gray-500">Exercises:</span>
            <span class="font-medium">{{ workout.exercises.length }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">Approaches:</span>
            <span class="font-medium">{{ totalSets }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">Volume:</span>
            <span class="font-medium">{{ totalVolume }} kg</span>
          </div>
        </div>
      </div>

      <div class="flex-shrink-0 text-gray-400">
        <UIcon name="i-heroicons-chevron-right" class="text-2xl" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Workout } from "@/shared/types/workout";
import Card from "@/components/ui/Card.vue";

const router = useRouter();

const props = defineProps<{
  workout: Workout;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.workout.date);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
});

const totalSets = computed(() => {
  return props.workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
});

const totalVolume = computed(() => {
  return props.workout.exercises.reduce((sum, ex) => sum + ex.total_weight, 0);
});

const navigateToWorkout = () => {
  router.push(`/workout/${props.workout.id}`);
};
</script>
