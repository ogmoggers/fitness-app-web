import type { Exercise } from "./Exercise";

export type Workout = {
  id: string;
  title: string;
  user_id: string;
  date: Date;
  exercises: Exercise[];
  created_at: Date;
  updated_at: Date;
};
