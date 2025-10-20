<template>
  <div class="workout-layout p-4 max-w-7xl mx-auto">
    <WrapperLoader v-if="loading" />

    <div
      v-else-if="!workouts || workouts.length === 0"
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <UIcon
        name="i-heroicons-clipboard-document-list"
        class="text-6xl mb-4 text-gray-400"
      />
      <h2 class="text-2xl font-bold mb-2">
        You don't have any training sessions
      </h2>
      <p class="text-gray-500 mb-6">Let's create your first workout</p>
      <UButton size="lg" icon="i-heroicons-plus" @click="handleCreateWorkout">
        Create workout
      </UButton>
    </div>

    <div v-else class="space-y-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">My workouts</h1>
        <UButton icon="i-heroicons-plus" @click="handleCreateWorkout">
          Create
        </UButton>
      </div>

      <WorkoutCard
        v-for="workout in workouts"
        :key="workout.id"
        :workout="workout"
      />
    </div>

    <WorkoutModal v-model="isModalOpen" @submit="handleWorkoutCreate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Workout } from "@/shared/types/workout";
import WrapperLoader from "@/components/ui/WrapperLoader.vue";
import WorkoutCard from "@/components/modules/workout/WorkoutCard.vue";
import WorkoutModal from "@/components/modules/workout/WorkoutModal.vue";
import { mockUser } from "@/shared/mockData";

const toast = useToast();
const workouts = ref<Workout[]>([]);
const loading = ref(true);
const isModalOpen = ref(false);

const fetchWorkouts = async () => {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    workouts.value = mockUser.workouts || [];
  } catch (error) {
    console.error("Error fetching workouts:", error);
    toast.add({
      title: "Error",
      description: "Couldn't upload workouts",
      color: "red",
    });
    workouts.value = [];
  } finally {
    loading.value = false;
  }
};

const handleCreateWorkout = () => {
  isModalOpen.value = true;
};

const handleWorkoutCreate = (data: any) => {
  console.log("Creating a workout:", data);
  toast.add({
    title: "Success",
    description: "Workout created",
    color: "green",
  });
};

onMounted(() => {
  fetchWorkouts();
});
</script>
