export type LogInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = LogInRequest & {
  firstName: string;
  lastName: string;
};
