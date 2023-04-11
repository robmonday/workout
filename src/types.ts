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
  createdAt: Date;
  updatedAt: Date;
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
  emailConfirmed: boolean;
};

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
};

export type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
}

export type PersonalDetails = {
  inches?: number;
  lbs?: number;
  DOB?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
};

export type UserUpdate = AccountDetails | PersonalDetails;

export type Notification = {
  id: string;
  message: string;
  read: boolean;
  dismissed: boolean;
  userId: string;
  createdAt: string;
  dismissable: boolean;
  buttonUrl: string;
};

export type NotificationRequest = {
  message: string;
  dismissable?: boolean;
  buttonUrl?: string;
};

export type EmailConfirm = {
  to: string;
  user?: UserInfo;
  token?: string;
};
