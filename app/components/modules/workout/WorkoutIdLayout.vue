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
      <div class="mb-3 flex items-center justify-between">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-left"
          @click="$router.back()"
        >
          Back
        </UButton>

        <UButton size="lg" icon="i-heroicons-plus" @click="handleModalOpen">
          Create exercise
        </UButton>
      </div>

      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ workout?.title }}</h1>
        <p class="text-gray-500">{{ formattedDate }}</p>
      </div>

      <div class="space-y-4">
        <ExerciseCard
          v-for="(exercise, index) in workout?.exercises"
          :key="exercise.id"
          :exercise="exercise"
          :index="index"
          @edit="handleEditExercise(exercise)"
          @delete="handleDeleteExercise(exercise)"
        />
      </div>
    </div>

    <ExerciseModal
      v-if="workout"
      v-model="isModalOpen"
      :workout-id="workout.id"
      :mode="modalMode"
      :exercise="selectedExercise"
      @created="handleExerciseCreated"
      @updated="handleExerciseUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { Exercise } from "@/shared/types/Exercise";
import ExerciseCard from "@/components/modules/exercise/ExerciseCard.vue";
import WrapperLoader from "@/components/ui/WrapperLoader.vue";
import ExerciseModal from "@/components/modules/exercise/ExerciseModal.vue";

const route = useRoute();
const toast = useToast();
const { getWorkoutById, createExercise, updateExercise, deleteExercise } =
  useWorkoutStorage();

const loading = ref(true);
const workoutId = computed(() => route.params.id as string);
const workout = computed(() => getWorkoutById(workoutId.value));

const isModalOpen = ref(false);
const modalMode = ref<"create" | "edit">("create");
const selectedExercise = ref<Exercise | null>(null);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
});

const handleModalOpen = () => {
  modalMode.value = "create";
  selectedExercise.value = null;
  isModalOpen.value = true;
};

const handleEditExercise = (exercise: Exercise) => {
  modalMode.value = "edit";
  selectedExercise.value = exercise;
  isModalOpen.value = true;
};

const handleDeleteExercise = (exercise: Exercise) => {
  if (!workout.value) return;

  const success = deleteExercise(workout.value.id, exercise.id);

  if (success) {
    toast.add({
      title: "Success",
      description: "Exercise deleted",
      color: "primary",
    });
  }
};

const handleExerciseCreated = (exercise: Exercise) => {
  if (!workout.value) return;

  createExercise(workout.value.id, exercise);

  toast.add({
    title: "Success",
    description: "Exercise created",
    color: "primary",
  });
};

const handleExerciseUpdated = (exercise: Exercise) => {
  if (!workout.value) return;

  updateExercise(workout.value.id, exercise.id, exercise);

  toast.add({
    title: "Success",
    description: "Exercise updated",
    color: "primary",
  });
};

const formattedDate = computed(() => {
  if (!workout.value) return "";
  const date = new Date(workout.value.date);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
});
</script>
