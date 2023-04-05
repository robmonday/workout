export type LogInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = LogInRequest & {
  firstName: string;
  lastName: string;
};

export type WorkoutRequest = {
  location: string;
  distance: number;
  steps: number;
  calories: number;
  notes?: string | undefined;
  workoutTypeId: string;
};

export type WorkoutType = {
  id: string;
  name: string;
  sortOrder: string;
  workouts: Workout[];
};

export type WorkoutTypeName = Pick<WorkoutType, "id" | "name">;

export type Workout = {
  id: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  start: string;
  end: string;
  distance: number;
  steps: number;
  calories: number;
  notes?: string | undefined;
  workoutType?: WorkoutTypeName;
};

export type Badge = {
  id: string;
  type: string;
  notes: string;
  userId: string;
};

export type DeleteRequest = {
  id: string;
};

export type UserObj = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
};
