import { getPublic } from "../httpHelper";

export function getBrand() {
  return getPublic("public/brand");
}
