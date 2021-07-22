export function getBrandFailException(error) {
    return error.response === undefined
      ? "Fail to get brand"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to get brand";
  }