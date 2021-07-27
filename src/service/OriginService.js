import { getPublic } from "../httpHelper";

export function getOrigin() {
  return  getPublic("public/origin");
}
