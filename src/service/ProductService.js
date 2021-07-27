import { post, put, del, getPublic, postUpload } from "../httpHelper";

export function countProduct() {
  return getPublic(`public/product/count`);
}

export function countProductByParentCategoryid(parentCategoryId) {
  return getPublic(`public/product/count/parent-category?category_id=${parentCategoryId}`);
}

export function countProductByCategoryid(categoryId) {
  return getPublic(`public/product/count/category?category_id=${categoryId}`);
}

export function getProduct(page, items) {
  return getPublic(`public/product?page=${page}&items=${items}`);
}

export function getProductByParentCategoryid(page, items, parentCategoryId) {
  return getPublic(`public/product/parent-category?page=${page}&items=${items}&category_id=${parentCategoryId}`);
}

export function getProductByCategoryid(page, items, categoryId) {
  return getPublic(`public/product/category?page=${page}&items=${items}&category_id=${categoryId}`);
}

export function searchProduct(page, items, searchKeyword) {
  return getPublic(`public/product/search?page=${page}&items=${items}&keyword=${searchKeyword}`);
}

export function getProductById(productId) {
  return getPublic(`public/product/${productId}`);
}

export function saveProduct(product) {
  return post(`employee/product`, product);
}

export function uploadProductImg(data) {
  return postUpload(`upload/img`, data);
}

export function updateProduct(product) {
  return put(`employee/product`, product);
}

export function deleteProduct(productId) {
  return del(`employee/product/${productId}`);
}
