export function getProductFailException(error) {
  return error.response === undefined
    ? "Fail to get product"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to get product";
}

export function getProductCountFailException(error) {
  return error.response === undefined
    ? "Fail to count product"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to count product";
}

export function saveProductFailException(error) {
    return error.response === undefined
      ? "Fail to save product"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to save product";
  }

  export function updateProductFailException(error) {
    return error.response === undefined
      ? "Fail to update product"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to update product";
  }

  export function deleteProductFailException(error) {
    return error.response === undefined
      ? "Fail to delete product"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to delete product";
  }

  export function saveImgFailException(error) {
    return error.response === undefined
      ? "Fail to save img"
      : error.response.data.errorCode !== undefined
      ? error.response.data.errorCode
      : error.response.data.message !== undefined
      ? error.response.data.message
      : "Fail to save img product";
  }
