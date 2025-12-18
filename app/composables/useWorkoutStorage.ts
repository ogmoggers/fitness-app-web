import type { Workout } from "@/shared/types/workout";
import type { Exercise } from "@/shared/types/Exercise";

export const useWorkoutStorage = () => {
  const STORAGE_KEY = "fitness_workouts";
  const { data: workouts } = useLocalStorage<Workout[]>(STORAGE_KEY, []);
  // TODO
  //   const todos = ref([])
  //
  //   async function getTodos() {
  //       const { data } = await supabase.from('todos').select()
  //       todos.value = data
  //   }
  //
  //   onMounted(() => {
  //       getTodos()
  //   })
  const getWorkoutById = (id: string) => {
    return workouts.value.find((w) => w.id === id) || null;
  };

  const createWorkout = (
    workout: Omit<Workout, "id" | "created_at" | "updated_at" | "exercises">
  ) => {
    const newWorkout: Workout = {
      ...workout,
      id: crypto.randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      exercises: [],
    };

    workouts.value.push(newWorkout);
    return newWorkout;
  };

  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    const index = workouts.value.findIndex((w) => w.id === id);
    if (index === -1) return null;

    const current = workouts.value[index];
    if (!current) return null;

    workouts.value[index] = {
      ...current,
      ...updates,
      id: current.id,
      updated_at: new Date(),
    } as Workout;

    return workouts.value[index];
  };

  const deleteWorkout = (id: string) => {
    const index = workouts.value.findIndex((w) => w.id === id);
    if (index === -1) return false;

    workouts.value.splice(index, 1);
    return true;
  };

  const createExercise = (workoutId: string, exercise: Exercise) => {
    const workout = getWorkoutById(workoutId);
    if (!workout) return null;

    workout.exercises.push({
      ...exercise,
      workout_id: workoutId,
      order_index: workout.exercises.length,
    });

    workouts.value = [...workouts.value];
    return exercise;
  };

  const updateExercise = (
    workoutId: string,
    exerciseId: string,
    updates: Partial<Exercise>
  ) => {
    const workout = getWorkoutById(workoutId);
    if (!workout) return null;

    const exerciseIndex = workout.exercises.findIndex(
      (e) => e.id === exerciseId
    );
    if (exerciseIndex === -1) return null;

    const current = workout.exercises[exerciseIndex];
    if (!current) return null;

    workout.exercises[exerciseIndex] = {
      ...current,
      ...updates,
      id: current.id,
      updated_at: new Date(),
    } as Exercise;

    workouts.value = [...workouts.value];
    return workout.exercises[exerciseIndex];
  };

  const deleteExercise = (workoutId: string, exerciseId: string) => {
    const workout = getWorkoutById(workoutId);
    if (!workout) return false;

    const index = workout.exercises.findIndex((e) => e.id === exerciseId);
    if (index === -1) return false;

    workout.exercises.splice(index, 1);
    workout.exercises.forEach((ex, idx) => {
      ex.order_index = idx;
    });

    workouts.value = [...workouts.value];
    return true;
  };

  return {
    workouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    createExercise,
    updateExercise,
    deleteExercise,
  };
};
