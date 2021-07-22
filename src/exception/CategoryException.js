export function getParentCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to get parent category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to get parent category";
}

export function getSubCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to get sub category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to get sub category";
}

export function saveParentCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to save parent category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to save parent category";
}

export function saveSubCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to save sub category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to save sub category";
}

export function updateCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to update category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to update category";
}

export function deleteCategoryFailException(error) {
  return error.response === undefined
    ? "Fail to delete category"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to delete category";
}

export function invalidCategoryNameException() {
  return "Invalid input";
}
