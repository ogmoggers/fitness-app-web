import type { SetData } from "./Set";
import type { Workout } from "./Workout";

export type Exercise = {
  id: string;
  sets: SetData[];
  totalWeight: number;
  totalReps: number;
  workout: Workout;
  createdAt: Date;
  updatedAt: Date;
  libraryID: string;
};
