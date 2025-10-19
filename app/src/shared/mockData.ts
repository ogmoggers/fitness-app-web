import type { SetData } from "./types/Set";
import type { Exercise } from "./types/Exercise";
import type { Workout } from "./types/Workout";
import type { User } from "./types/User";

const USER_ID = "user-777-g";
const WORKOUT_ID = "wkt-555-e";
const EXERCISE_ID_BENCH = "ex-444-bench";
const EXERCISE_ID_SQUAT = "ex-666-squat";

export const mockSetBench1: Partial<SetData> = {
  id: "set-111-bench-1",
  weight: 45.5,
  reps: 10,
  createdAt: new Date("2025-10-19T10:00:00Z"),
  updatedAt: new Date("2025-10-19T10:00:00Z"),
} as SetData;

export const mockSetBench2: Partial<SetData> = {
  id: "set-222-bench-2",
  weight: 50,
  reps: 8,
  createdAt: new Date("2025-10-19T10:02:00Z"),
  updatedAt: new Date("2025-10-19T10:02:00Z"),
} as SetData;

export const mockSetSquat: Partial<SetData> = {
  id: "set-333-squat-1",
  weight: 100,
  reps: 5,
  createdAt: new Date("2025-10-19T11:00:00Z"),
  updatedAt: new Date("2025-10-19T11:00:00Z"),
} as SetData;

export const mockSets: SetData[] = [
  mockSetBench1 as SetData,
  mockSetBench2 as SetData,
  mockSetSquat as SetData,
];

export const mockExerciseBench: Partial<Exercise> = {
  id: EXERCISE_ID_BENCH,
  sets: [mockSetBench1, mockSetBench2] as SetData[], // Жим лежа
  totalWeight: 45.5 * 10 + 50 * 8, // 855
  totalReps: 18,
  libraryID: "LIB-BENCH-PRESS-1",
  createdAt: new Date("2025-10-19T09:55:00Z"),
  updatedAt: new Date("2025-10-19T10:03:00Z"),
} as Exercise;

export const mockExerciseSquat: Partial<Exercise> = {
  id: EXERCISE_ID_SQUAT,
  sets: [mockSetSquat] as SetData[], // Приседания
  totalWeight: 100 * 5, // 500
  totalReps: 5,
  libraryID: "LIB-SQUAT-2",
  createdAt: new Date("2025-10-19T10:55:00Z"),
  updatedAt: new Date("2025-10-19T11:01:00Z"),
} as Exercise;

export const mockExercises: Exercise[] = [
  mockExerciseBench as Exercise,
  mockExerciseSquat as Exercise,
];

export const mockWorkout: Partial<Workout> = {
  id: WORKOUT_ID,
  title: "Тренировка Грудь и Ноги (Вложенные данные)",
  date: new Date("2025-10-19T09:30:00Z"),
  exercises: mockExercises as Exercise[],
  createdAt: new Date("2025-10-19T09:30:00Z"),
  updatedAt: new Date("2025-10-19T11:30:00Z"),
} as Workout;

export const mockWorkouts: Workout[] = [mockWorkout as Workout];

export const mockUser: User = {
  id: USER_ID,
  name: "Alexander",
  password: "test_password_hash",
  workouts: mockWorkouts as Workout[], // Вложенность до тренировок
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2025-10-19T11:30:00Z"),
};

(mockWorkout as Workout).user = mockUser;

(mockExerciseBench as Exercise).workout = mockWorkout as Workout;
(mockExerciseSquat as Exercise).workout = mockWorkout as Workout;

(mockSetBench1 as SetData).exercise = mockExerciseBench as Exercise;
(mockSetBench2 as SetData).exercise = mockExerciseBench as Exercise;
(mockSetSquat as SetData).exercise = mockExerciseSquat as Exercise;
