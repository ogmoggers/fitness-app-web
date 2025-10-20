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
      <h2 class="text-2xl font-bold mb-2">У вас не имеется тренировок</h2>
      <p class="text-gray-500 mb-6">Давайте создадим вашу первую тренировку</p>
      <UButton size="lg" icon="i-heroicons-plus" @click="handleCreateWorkout">
        Создать тренировку
      </UButton>
    </div>

    <div v-else class="space-y-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Мои тренировки</h1>
        <UButton icon="i-heroicons-plus" @click="handleCreateWorkout">
          Создать
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
      title: "Ошибка",
      description: "Не удалось загрузить тренировки",
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
  console.log("Создание тренировки:", data);
  toast.add({
    title: "Успех",
    description: "Тренировка создана",
    color: "green",
  });
};

onMounted(() => {
  fetchWorkouts();
});
</script>
