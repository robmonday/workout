import {
  SignUpRequest,
  LogInRequest,
  DeleteRequest,
  WorkoutRequest,
  NotificationRequest,
} from "./types";

type RequestBody =
  | SignUpRequest
  | LogInRequest
  | WorkoutRequest
  | DeleteRequest
  | NotificationRequest;

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
      Authorization: `bearer ${window.localStorage.getItem("token")}`,
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
    url: "http://localhost:5174/api/user/login",
    method: "POST",
    body,
  });
};

export const signUpRequest = (body: SignUpRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: "http://localhost:5174/api/user/signup",
    method: "POST",
    body,
  });
};

export const createNotification = (body: NotificationRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: "http://localhost:5174/api/notification",
    method: "POST",
    body,
  });
};

export const getAllWorkouts = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout",
    method: "GET",
  });
  // console.log("getAllWorkouts() fetcher response:", result);
  return result;
};

export const getWorksTimeSeries = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout/timeseries",
    method: "GET",
  });
  return result;
};

export const getAvgsByWorkType = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout/averages",
    method: "GET",
  });
  // console.log("averages", result);
  return result;
};

export const createWorkout = (body: WorkoutRequest) => {
  return fetcher({
    url: "http://localhost:5174/api/workout",
    method: "POST",
    body,
  });
};

export const updateWorkout = (id: string, body: WorkoutRequest) => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout",
    method: "PUT",
    body: { ...body, id },
  });
  return result;
};

export const deleteWorkout = (id: string) => {
  return fetcher({
    url: "http://localhost:5174/api/workout",
    method: "DELETE",
    body: { id },
  });
};

export const getAllBadges = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/badge",
    method: "GET",
  });
  return result;
};

export const getAllWorkoutTypes = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout/type",
    method: "GET",
  });
  return result;
};

export const getWorksGrpByLoc = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/workout/?groupBy=location",
    method: "GET",
  });
  return result;
};

export const getUser = (id: string) => {
  const result = fetcher({
    url: `http://localhost:5174/api/user/${id}`,
    method: "GET",
  });
  return result;
};

export const getOpenNotifications = () => {
  const result = fetcher({
    url: "http://localhost:5174/api/notification/open",
    method: "GET",
  });
  return result;
};

export const dismissNotification = (id: string) => {
  const result = fetcher({
    url: "http://localhost:5174/api/notification/open",
    method: "PUT",
    body: { id },
  });
  return result;
};
