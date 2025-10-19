import type { Workout } from "./Workout";

export type User = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;

  // TODO: добавить в бэке
  workouts: Workout[];
};
