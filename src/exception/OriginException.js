export function getOriginFailException(error) {
  if (error.response === undefined) {
    return "Fail to get origin, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_ORIGIN_ID_NOT_FOUND") {
      return "Origin id not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to get origin, try again later";
}
