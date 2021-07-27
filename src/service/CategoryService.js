import { getPublic, post, put, del } from "../httpHelper";

export function getParentCategory() {
  return getPublic("public/category/parent");
}

export function getSubCategory(parentCategoryId) {
  return getPublic(`public/category/sub/${parentCategoryId}`);
}

export function saveCategory(category) {
  return post(`employee/category/parent`, category);
}

export function saveSubCategory(category) {
  return post(`employee/category/sub`, category);
}

export function updateCategory(category) {
  return put(`employee/category`, category);
}

export function deleteCategory(categoryId) {
  return del(`employee/category/${categoryId}`);
}
