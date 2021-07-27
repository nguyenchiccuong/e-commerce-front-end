import { postCus, putCus, delCus } from "../httpHelper";

export function saveReview(review) {
  return postCus(`customer/review`, review);
}

export function updateReview(review) {
  return putCus(`customer/review`, review);
}

export function deleteReview(reviewId) {
  return delCus(`customer/review/${reviewId}`);
}
