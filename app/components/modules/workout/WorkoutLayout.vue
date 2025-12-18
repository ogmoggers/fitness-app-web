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
      <UButton size="lg" icon="i-heroicons-plus" @click="handleModalOpen">
        Create workout
      </UButton>
    </div>

    <div v-else class="space-y-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">My workouts</h1>
        <UButton icon="i-heroicons-plus" @click="handleModalOpen">
          Create
        </UButton>
      </div>

      <TransitionGroup name="workout-list" tag="div" class="space-y-4" appear>
        <WorkoutCard
          v-for="(workout, index) in workouts"
          :key="workout.id"
          :workout="workout"
          :style="{ '--delay': index * 0.1 + 's' }"
        />
      </TransitionGroup>
    </div>

    <WorkoutModal v-model="isModalOpen" @submit="handleWorkoutCreate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import WrapperLoader from "@/components/ui/WrapperLoader.vue";
import WorkoutCard from "@/components/modules/workout/WorkoutCard.vue";
import WorkoutModal from "@/components/modules/workout/WorkoutModal.vue";

const toast = useToast();
const { workouts, createWorkout } = useWorkoutStorage();
const loading = ref(true);
const isModalOpen = ref(false);

const fetchWorkouts = async () => {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
  } catch (error) {
    console.error("Error fetching workouts:", error);
    toast.add({
      title: "Error",
      description: "Couldn't upload workouts",
      color: "primary",
    });
  } finally {
    loading.value = false;
  }
};

const handleModalOpen = () => {
  isModalOpen.value = true;
};

const handleWorkoutCreate = (data: {
  title: string;
  date: string;
  description?: string;
}) => {
  createWorkout({
    title: data.title,
    user_id: "current_user",
    date: new Date(data.date),
  });

  toast.add({
    title: "Success",
    description: "Workout created",
    color: "primary",
  });
};

onMounted(() => {
  fetchWorkouts();
});
</script>


<style scoped>
.workout-list-enter-active {
  transition: all 0.7s ease;
  transition-delay: var(--delay);
}

.workout-list-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.workout-list-leave-active {
  transition: all 0.3s ease;
}

.workout-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.workout-list-move {
  transition: transform 0.4s ease;
}
</style>