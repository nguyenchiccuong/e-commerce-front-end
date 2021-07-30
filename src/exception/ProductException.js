export function getProductFailException(error) {
  if (error.response === undefined) {
    return "Fail to get product, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_PRODUCT_ID_NOT_FOUND") {
      return "Product id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_SEARCH_KEYWORD_NOT_FOUND") {
      return "Search keyword not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to get product, try again later";
}

export function getProductCountFailException(error) {
  if (error.response === undefined) {
    return "Fail to count product, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to count product, try again later";
}

export function saveProductFailException(error) {
  if (error.response === undefined) {
    return "Fail to save product, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_BRAND_ID_NOT_FOUND") {
      return "Brand id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_ORIGIN_ID_NOT_FOUND") {
      return "Origin id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_DETAIL_NOT_VALID") {
      return "Product detail table not valid, check again";
    }
    if (error.response.data.errorCode === "ERR_SAVE_PRODUCT") {
      return "Save product fail, try again later";
    }
    if (error.response.data.errorCode === "ERR_SAVE_PRODUCT_DETAIL") {
      return "Save product detail fail, try again later";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_ID_NOT_FOUND") {
      return "Product id not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to save product, try again later";
}

export function updateProductFailException(error) {
  if (error.response === undefined) {
    return "Fail to update product, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_BRAND_ID_NOT_FOUND") {
      return "Brand id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_ORIGIN_ID_NOT_FOUND") {
      return "Origin id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_DETAIL_NOT_VALID") {
      return "Product detail table not valid, check again";
    }
    if (error.response.data.errorCode === "ERR_UPDATE_PRODUCT") {
      return "Update product fail, try again later";
    }
    if (error.response.data.errorCode === "ERR_UPDATE_PRODUCT_DETAIL") {
      return "Update product detail fail, try again later";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_ID_NOT_FOUND") {
      return "Product id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_DETAIL_ID_EXIST_IN_ORDER_DETAIL") {
      return "Some of the produict detail you delete already exist in order detail, cannot remove";
    }
    if (error.response.data.errorCode === "ERR_UPDATE_PRODUCT_DELETE_PRODUCT_DETAIL") {
      return "Delete product detail fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to update product, try again later";
}

export function deleteProductFailException(error) {
  if (error.response === undefined) {
    return "Fail to delete product, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_DELETE_PRODUCT") {
      return "Delete product fail, try again later";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_ID_NOT_FOUND") {
      return "Product id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_PRODUCT_DETAIL_ID_EXIST_IN_ORDER_DETAIL") {
      return "Some of the produict detail you delete already exist in order detail, cannot remove";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to delete product, try again later";
}

export function saveImgFailException(error) {
  return error.response === undefined
    ? "Fail to save img of product, try again later"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to save img of product, try again later";
}
