import { workoutFormValues } from "./components/WorkoutForm";
import {
  SignUpRequest,
  LogInRequest,
  DeleteRequest,
  WorkoutRequest,
  NotificationRequest,
  UserInfo,
  UserUpdate,
  ReactionRequest,
} from "./types";

export const baseUrl = "https://workout-backend.fly.dev"; // "https://workout-backend.fly.dev" "http://localhost:8080" "http://localhost:5174"

type RequestBody =
  | SignUpRequest
  | LogInRequest
  | WorkoutRequest
  | DeleteRequest
  | NotificationRequest
  | ReactionRequest;

type Fetcher = {
  url: string;
  method: string;
  body?: RequestBody;
  json?: boolean;
};

export const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${window.localStorage.getItem(
        "loggedWorkoutAppToken"
      )}`,
    },
  });

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const loginRequest = (body: LogInRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: `${baseUrl}/api/user/login`,
    method: "POST",
    body,
  });
};

export const signUpRequest = (body: SignUpRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: `${baseUrl}/api/user/signup`,
    method: "POST",
    body,
  });
};

export const createNotification = (body: NotificationRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: `${baseUrl}/api/notification`,
    method: "POST",
    body,
  });
};

export const getAllWorkouts = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout`,
    method: "GET",
  });
  // console.log("getAllWorkouts() fetcher response:", result);
  return result;
};

export const getWorksTimeSeries = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/timeseries`,
    method: "GET",
  });
  return result;
};

export const getAvgsByWorkType = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/averages`,
    method: "GET",
  });
  // console.log("averages", result);
  return result;
};

export const createWorkout = (formValues: workoutFormValues) => {
  const body: WorkoutRequest = {
    ...formValues,
    start: new Date(
      Date.parse(formValues.end.toISOString()) - formValues.minutes * 60 * 1000
    ),
    minutes: undefined,
  };
  const result = fetcher({
    url: `${baseUrl}/api/workout`,
    method: "POST",
    body,
  });
  return result;
};

export const updateWorkout = (id: string, formValues: workoutFormValues) => {
  const body: WorkoutRequest = {
    ...formValues,
    start: new Date(
      Date.parse(formValues.end.toISOString()) - formValues.minutes * 60 * 1000
    ),
    minutes: undefined,
  };
  const result = fetcher({
    url: `${baseUrl}/api/workout`,
    method: "PUT",
    body: { ...body, id },
  });
  return result;
};

export const deleteWorkout = (id: string) => {
  return fetcher({
    url: `${baseUrl}/api/workout`,
    method: "DELETE",
    body: { id },
  });
};

export const deleteWorkoutSeedData = (id: string) => {
  return fetcher({
    url: `${baseUrl}/api/workout/seed`,
    method: "DELETE",
    body: { id },
  });
};

export const getAllBadges = () => {
  const result = fetcher({
    url: `${baseUrl}/api/badge`,
    method: "GET",
  });
  // console.log("getAllBadges() returned", result);
  return result;
};

export const getBadgeGallery = () => {
  const result = fetcher({
    url: `${baseUrl}/api/badge?gallery=true`,
    method: "GET",
  });
  return result;
};

export const getAllWorkoutTypes = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/type`,
    method: "GET",
  });
  return result;
};

export const getWorksGrpByLoc = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/?groupBy=location`,
    method: "GET",
  });
  return result;
};

export const getPotentialFriends = (limit = 0) => {
  const queryString = limit !== 0 ? `/?limit=${limit}` : "";
  const result = fetcher({
    url: `${baseUrl}/api/user${queryString}`,
    method: "GET",
  });
  return result;
};

export const getUser = (id: string) => {
  const result = fetcher({
    url: `${baseUrl}/api/user/${id}`,
    method: "GET",
  });
  return result;
};

export const getOpenNotifications = () => {
  const result = fetcher({
    url: `${baseUrl}/api/notification/open`,
    method: "GET",
  });
  return result;
};

export const dismissNotification = (id: string) => {
  const result = fetcher({
    url: `${baseUrl}/api/notification/open`,
    method: "PUT",
    body: { id },
  });
  return result;
};

export const sendEmailConfirm = (userInfo: UserInfo) => {
  const result = fetcher({
    url: `${baseUrl}/api/email/emailconfirm`,
    method: "POST",
    body: userInfo,
  });
  return result;
};

export const handleEmailConfirmToken = (emailConfirmToken: string) => {
  const result = fetcher({
    url: `${baseUrl}/api/email/emailconfirm/?emailConfirmToken=${emailConfirmToken}`,
    method: "GET",
  });
  return result;
};

export const updateUser = (id: string, body: UserUpdate) => {
  const result = fetcher({
    url: `${baseUrl}/api/user`,
    method: "PUT",
    body: { ...body, id },
  });
  return result;
};

export const getLeaderboard = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/leaderboard/`,
    method: "GET",
  });
  return result;
};

export const getWorkoutFeed = () => {
  const result = fetcher({
    url: `${baseUrl}/api/workout/feed`,
    method: "GET",
  });
  return result;
};

export const createReaction = async (symbol: string, workoutId: string) => {
  // console.log("symbol", symbol);
  // console.log("userId", userId);
  // console.log("workoutId", workoutId);
  const result = fetcher({
    url: `${baseUrl}/api/reaction`,
    method: "POST",
    body: {
      emojiSymbol: symbol,
      workoutId,
    },
  });
  return result;
};
