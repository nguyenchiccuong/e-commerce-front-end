export function saveReviewFailException(error) {
  if (error.response === undefined) {
    return "Fail to save review, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_PRODUCT_DETAIL_ID_NOT_FOUND") {
      return "Product detail id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_ORDER_ID_NOT_FOUND") {
      return "Order id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_SAVE_REVIEW") {
      return "Save review fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to save review, try again later";
}

export function updateReviewFailException(error) {
  if (error.response === undefined) {
    return "Fail to update review, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_REVIEW_ID_NOT_FOUND") {
      return "Review id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_USERNAME_UNAMTCH_WITH_REVIEW") {
      return "Cannot update other review, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_UPDATE_REVIEW") {
      return "Update review fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to update review, try again later";
}

export function deleteReviewFailException(error) {
  if (error.response === undefined) {
    return "Fail to delete review, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_REVIEW_ID_NOT_FOUND") {
      return "Review id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_USERNAME_UNAMTCH_WITH_REVIEW") {
      return "Cannot delete other review, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_DELETE_REVIEW") {
      return "Update delete fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to delete review, try again later";
}

export function reviewContentNullException() {
  return "Review content null";
}
