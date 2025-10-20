import { ref } from "vue";
import type { Workout } from "@/shared/types/workout";

export const useWorkout = () => {
  const { getWorkoutById } = useWorkoutStorage();
  const workout = ref<Workout | null>(null);
  const loading = ref(false);

  const fetchWorkoutById = async (id: string) => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      workout.value = getWorkoutById(id);
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
