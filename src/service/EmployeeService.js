import { postPublic } from "../httpHelper";

export function employeeSignIn(user) {
  return postPublic("employee/auth/signin", user);
}
