import type { Exercise } from "./Exercise";
import type { User } from "./User";

export type Workout = {
  id: string;
  title: string;
  date: Date;
  exercises: Exercise[];
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
