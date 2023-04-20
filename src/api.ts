import { workoutFormValues } from "./components/WorkoutForm";
import {
  SignUpRequest,
  LogInRequest,
  DeleteRequest,
  WorkoutRequest,
  NotificationRequest,
  UserObj,
  UserUpdate,
  ReactionRequest,
} from "./types";

const baseUrl = "http://localhost:5174/api";

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
    url: `${baseUrl}/user/login`,
    method: "POST",
    body,
  });
};

export const signUpRequest = (body: SignUpRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: `${baseUrl}/user/signup`,
    method: "POST",
    body,
  });
};

export const createNotification = (body: NotificationRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: `${baseUrl}/notification`,
    method: "POST",
    body,
  });
};

export const getAllWorkouts = () => {
  const result = fetcher({
    url: `${baseUrl}/workout`,
    method: "GET",
  });
  // console.log("getAllWorkouts() fetcher response:", result);
  return result;
};

export const getWorksTimeSeries = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/timeseries`,
    method: "GET",
  });
  return result;
};

export const getAvgsByWorkType = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/averages`,
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
    url: `${baseUrl}/workout`,
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
    url: `${baseUrl}/workout`,
    method: "PUT",
    body: { ...body, id },
  });
  return result;
};

export const deleteWorkout = (id: string) => {
  return fetcher({
    url: `${baseUrl}/workout`,
    method: "DELETE",
    body: { id },
  });
};

export const deleteWorkoutSeedData = (id: string) => {
  return fetcher({
    url: `${baseUrl}/workout/seed`,
    method: "DELETE",
    body: { id },
  });
};

export const getAllBadges = () => {
  const result = fetcher({
    url: `${baseUrl}/badge`,
    method: "GET",
  });
  // console.log("getAllBadges() returned", result);
  return result;
};

export const getBadgeGallery = () => {
  const result = fetcher({
    url: `${baseUrl}/badge?gallery=true`,
    method: "GET",
  });
  return result;
};

export const getAllWorkoutTypes = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/type`,
    method: "GET",
  });
  return result;
};

export const getWorksGrpByLoc = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/?groupBy=location`,
    method: "GET",
  });
  return result;
};

export const getPotentialFriends = (limit = 0) => {
  const queryString = limit !== 0 ? `/?limit=${limit}` : "";
  const result = fetcher({
    url: `${baseUrl}/user${queryString}`,
    method: "GET",
  });
  return result;
};

export const getUser = (id: string) => {
  const result = fetcher({
    url: `${baseUrl}/user/${id}`,
    method: "GET",
  });
  return result;
};

export const getOpenNotifications = () => {
  const result = fetcher({
    url: `${baseUrl}/notification/open`,
    method: "GET",
  });
  return result;
};

export const dismissNotification = (id: string) => {
  const result = fetcher({
    url: `${baseUrl}/notification/open`,
    method: "PUT",
    body: { id },
  });
  return result;
};

export const sendEmailConfirm = (userObj: UserObj) => {
  const result = fetcher({
    url: `${baseUrl}/email/emailConfirm`,
    method: "POST",
    body: userObj,
  });
  return result;
};

export const updateUser = (id: string, body: UserUpdate) => {
  const result = fetcher({
    url: `${baseUrl}/user`,
    method: "PUT",
    body: { ...body, id },
  });
  return result;
};

export const getLeaderboard = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/leaderboard/`,
    method: "GET",
  });
  return result;
};

export const getWorkoutFeed = () => {
  const result = fetcher({
    url: `${baseUrl}/workout/feed`,
    method: "GET",
  });
  return result;
};

export const createReaction = async (symbol: string, workoutId: string) => {
  // console.log("symbol", symbol);
  // console.log("userId", userId);
  // console.log("workoutId", workoutId);
  const result = fetcher({
    url: `${baseUrl}/reaction`,
    method: "POST",
    body: {
      emojiSymbol: symbol,
      workoutId,
    },
  });
  return result;
};
