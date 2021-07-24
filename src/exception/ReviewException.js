export function saveReviewFailException(error) {
    return error.response === undefined
      ? "Fail to save review"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to save review";
  }
  
  export function updateReviewFailException(error) {
    return error.response === undefined
      ? "Fail to update review"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to update review";
  }
  
  export function deleteReviewFailException(error) {
    return error.response === undefined
      ? "Fail to delete review"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to delete review";
  }

  export function reviewContentNullException() {
    return "Review content null"
  }