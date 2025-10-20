import type { Set } from "./types/Set";
import type { Exercise } from "./types/Exercise";
import type { Workout } from "./types/workout";
import type { User } from "./types/user";

const USER_ID = "user-777-g";
const WORKOUT_ID = "wkt-555-e";
const EXERCISE_ID_BENCH = "ex-444-bench";
const EXERCISE_ID_SQUAT = "ex-666-squat";

export const mockSetBench1: Set = {
  id: "set-111-bench-1",
  weight: 45.5,
  reps: 10,
  order_index: 0,
  workout_exercise_id: EXERCISE_ID_BENCH,
  created_at: new Date("2025-10-19T10:00:00Z"),
  updated_at: new Date("2025-10-19T10:00:00Z"),
};

export const mockSetBench2: Set = {
  id: "set-222-bench-2",
  weight: 50,
  reps: 8,
  order_index: 1,
  workout_exercise_id: EXERCISE_ID_BENCH,
  created_at: new Date("2025-10-19T10:02:00Z"),
  updated_at: new Date("2025-10-19T10:02:00Z"),
};

export const mockSetSquat: Set = {
  id: "set-333-squat-1",
  weight: 100,
  reps: 5,
  order_index: 0,
  workout_exercise_id: EXERCISE_ID_SQUAT,
  created_at: new Date("2025-10-19T11:00:00Z"),
  updated_at: new Date("2025-10-19T11:00:00Z"),
};

export const mockSets: Set[] = [mockSetBench1, mockSetBench2, mockSetSquat];

export const mockExerciseBench: Exercise = {
  id: EXERCISE_ID_BENCH,
  workout_id: WORKOUT_ID,
  title: "LIB BENCHPRESS 1",
  exercise_library_id: "",
  rest_seconds: 90,
  order_index: 0,
  sets: [mockSetBench1, mockSetBench2], // Жим лежа
  total_weight: 45.5 * 10 + 50 * 8, // 855
  total_reps: 18,
  created_at: new Date("2025-10-19T09:55:00Z"),
  updated_at: new Date("2025-10-19T10:03:00Z"),
};

export const mockExerciseSquat: Exercise = {
  id: EXERCISE_ID_SQUAT,
  workout_id: WORKOUT_ID,
  title: "LIB SQUAT 2",
  exercise_library_id: "LIB-SQUAT-2",
  rest_seconds: 120,
  order_index: 1,
  sets: [mockSetSquat], // Приседания
  total_weight: 100 * 5, // 500
  total_reps: 5,
  created_at: new Date("2025-10-19T10:55:00Z"),
  updated_at: new Date("2025-10-19T11:01:00Z"),
};

export const mockExercises: Exercise[] = [mockExerciseBench, mockExerciseSquat];

export const mockWorkout: Workout = {
  id: WORKOUT_ID,
  user_id: USER_ID,
  title: "Тренировка Грудь и Ноги (Вложенные данные)",
  date: new Date("2025-10-19T09:30:00Z"),
  exercises: mockExercises,
  created_at: new Date("2025-10-19T09:30:00Z"),
  updated_at: new Date("2025-10-19T11:30:00Z"),
};

export const mockUser: User = {
  id: USER_ID,
  name: "Alexander",
  workouts: [mockWorkout], // Вложенность до тренировок
  created_at: new Date("2024-01-01T00:00:00Z"),
  updated_at: new Date("2025-10-19T11:30:00Z"),
};
