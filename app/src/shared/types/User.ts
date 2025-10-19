import type { Workout } from "./Workout";

export type User = {
  id: string;
  name: string;
  password?: string;
  workouts: Workout[];
  createdAt: Date;
  updatedAt: Date;
};
