import { LogInRequest, SignUpRequest } from "./types";

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
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const signUpRequest = (signUpObj: SignUpRequest) => {
  // console.log("Request body passed to fetcher()", signUpObj);
  return fetcher({
    url: "http://localhost:5174/user/signup",
    method: "POST",
    body: signUpObj,
  });
};

export const loginRequest = (loginObj: LogInRequest) => {
  // console.log("Request body passed to fetcher()", loginObj);
  return fetcher({
    url: "http://localhost:5174/user/login",
    method: "POST",
    body: loginObj,
  });
};
