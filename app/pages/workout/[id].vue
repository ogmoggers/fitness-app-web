<template>
  <WorkoutIdLayout :workout="workout" :loading="loading" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useWorkout } from "@/composables/useWorkout";
import WorkoutIdLayout from "@/components/modules/workout/WorkoutIdLayout.vue";

const route = useRoute();
const { workout, loading, fetchWorkoutById } = useWorkout();

onMounted(() => {
  const id = route.params.id as string;
  fetchWorkoutById(id);
});
</script>
