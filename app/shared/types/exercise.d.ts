import type { SetData } from "./Set";

export type Exercise = {
  id: string;
  workout_id: string;
  title: string;
  exercise_library_id: string;
  rest_seconds: number;
  order_index: number;
  created_at: Date;
  updated_at: Date;
  
  // TODO: добавить в бэке
  sets: SetData[];
  total_weight: number;
  total_reps: number;
};
