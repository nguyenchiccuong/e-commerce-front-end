export function getParentCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to get parent category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to get parent category, try again later";
}

export function getSubCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to get sub category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to get sub category, try again later";
}

export function saveParentCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to save parent category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_NAME_EXIST") {
      return "Category name already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_SAVE_CATEGORY") {
      return "Save category fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to save parent category, try again later";
}

export function saveSubCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to save sub category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_NAME_EXIST") {
      return "Category name already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_SAVE_SUB_CATEGORY") {
      return "Save sub category fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to save sub category, try again later";
}

export function updateCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to update category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_NAME_EXIST") {
      return "Category name already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_UPDATE_CATEGORY") {
      return "Update category fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to update category, try again later";
}

export function deleteCategoryFailException(error) {
  if (error.response === undefined) {
    return "Fail to delete category, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_CATEGORY_EXIST_IN_PRODUCT") {
      return "Category already exist in some product, delete product first";
    }
    if (error.response.data.errorCode === "ERR_CATEGORY_ID_NOT_FOUND") {
      return "Category id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_DELETE_CATEGORY") {
      return "Delete category fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to delete category, try again later";
}

export function invalidCategoryNameException() {
  return "Invalid input";
}
