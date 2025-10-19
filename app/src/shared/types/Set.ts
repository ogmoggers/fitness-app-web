import type { Exercise } from "./Exercise";

export type SetData = {
  id: string;
  weight: SetData[];
  reps: number;
  exercise: Exercise;
  createdAt: Date;
  updatedAt: Date;
};
