import { ref } from "vue";
import type { Workout } from "@/shared/types/workout";
import { mockUser } from "@/shared/mockData";

export const useWorkout = () => {
  const workout = ref<Workout | null>(null);
  const loading = ref(false);

  const fetchWorkoutById = async (id: string) => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      workout.value = mockUser.workouts.find((w) => w.id === id) || null;
    } catch (error) {
      console.error("Error fetching workout:", error);
      workout.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    workout,
    loading,
    fetchWorkoutById,
  };
};
