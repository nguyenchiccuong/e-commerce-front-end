export function getOriginFailException(error) {
    return error.response === undefined
      ? "Fail to get origin"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to get origin";
  }