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
  start: Date;
  end: Date;
  minutes?: undefined;
  distance: number;
  steps: number;
  calories: number;
  notes?: string | undefined;
  workoutTypeId: string;
};

export type WorkoutType = {
  id: string;
  name: string;
  sortOrder: number;
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
  workoutTypeId?: string;
};

export type WorkoutWithUserReact = Workout & {
  user: User;
  reactionId: string;
  reactions: Reaction[];
};

export type ReactionRequest = {
  emojiSymbol: string;
  workoutId: string;
};

export type Reaction = ReactionRequest & {
  id: string;
  createdAt: string;
  updatedAt: string;
  seed: boolean;
  userId: string;
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

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  state: State;
};

export type UserObj = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  emailConfirmed?: boolean;
  city?: string;
  state?: State; // this is an enum
};

export type UserInfo = Omit<UserObj, "token">;

export type Friend = Omit<UserInfo, "emailConfirmed">;

export type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};

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

enum State {
  AL,
  AK,
  AZ,
  AR,
  CA,
  CO,
  CT,
  DE,
  DC,
  FL,
  GA,
  HI,
  ID,
  IL,
  IN,
  IA,
  KS,
  KY,
  LA,
  ME,
  MD,
  MA,
  MI,
  MN,
  MS,
  MO,
  MT,
  NE,
  NV,
  NH,
  NJ,
  NM,
  NY,
  NC,
  ND,
  OH,
  OK,
  OR,
  PA,
  RI,
  SC,
  SD,
  TN,
  TX,
  UT,
  VT,
  VA,
  WA,
  WV,
  WI,
  WY,
}
