import { get, put, postPublic } from "../httpHelper";

export function countCustomer() {
  return get(`employee/customer/count`);
}

export function getCustomer(page, items) {
  return get(`employee/customer?page=${page}&items=${items}`);
}

export function lockCustomer(customerId) {
  return put(`employee/customer/lock/${customerId}`);
}

export function unlockCustomer(customerId) {
  return put(`employee/customer/unlock/${customerId}`);
}

export function searchCustomer(page, items, searchKeyword) {
  return get(`employee/customer/search?page=${page}&items=${items}&keyword=${searchKeyword}`);
}

export function customerSignUp(customer) {
  return postPublic("customer/auth/signup", customer);
}

export function customerSignIn(user) {
  return postPublic("customer/auth/signin", user);
}
