export function getBrandFailException(error) {
  if (error.response === undefined) {
    return "Fail to get brand, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_BRAND_ID_NOT_FOUND") {
      return "Brand id not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to get brand, try again later";
}
