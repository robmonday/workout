export type LogInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = LogInRequest & {
  firstName: string;
  lastName: string;
};

export enum WORKOUT_TYPE {
  WALK_OUTDOORS,
  WALK_INDOORS,
  RUN_OUTDOORS,
  RUN_INDOORS,
  BICYCLE,
  SWIM,
  WEIGHT_LIFT,
  YOGA,
  OTHER,
}

export type Workout = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: WORKOUT_TYPE;
  start: string;
  end: string;
  distance: string;
  steps: number;
  calories: number;
  notes: string | null;
  description?: string;
};
