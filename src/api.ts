import { SignUpRequest, LogInRequest } from "./types";

type RequestBody = SignUpRequest | LogInRequest;

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
      Authorization: `Bearer ${window.localStorage.getItem("userToken")}`,
    },
  });
  // console.log(window.localStorage.getItem("userToken"));

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const loginRequest = (body: LogInRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: "http://localhost:5174/user/login",
    method: "POST",
    body,
  });
};

export const signUpRequest = (body: SignUpRequest) => {
  // console.log("Request body passed to fetcher()", body);
  return fetcher({
    url: "http://localhost:5174/user/signup",
    method: "POST",
    body,
  });
};

export const getAllWorkouts = () => {
  const result = fetcher({
    url: "http://localhost:5174/workout",
    method: "GET",
  });
  // console.log("getAllWorkouts() fetcher response:", result);
  return result;
};
