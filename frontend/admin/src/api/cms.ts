import request from '@/utils/request'

// Category
export function getCategoryListApi(params?: any) { return request.get('/admin/cms/category/index', { params }) }
export function getCategoryTreeApi(params?: any) { return request.get('/admin/cms/category/tree', { params }) }
export function saveCategoryApi(data: any) { return request.post('/admin/cms/category/save', data) }
export function updateCategoryApi(data: any) { return request.put('/admin/cms/category/update', data) }
export function deleteCategoryApi(id: number) { return request.delete(`/admin/cms/category/delete/${id}`) }

// Article
export function getArticleListApi(params: any) { return request.get('/admin/cms/article/index', { params }) }
export function saveArticleApi(data: any) { return request.post('/admin/cms/article/save', data) }
export function updateArticleApi(data: any) { return request.put('/admin/cms/article/update', data) }
export function deleteArticleApi(id: number) { return request.delete(`/admin/cms/article/delete/${id}`) }
export function getArticleDetailApi(id: number) { return request.get(`/admin/cms/article/detail/${id}`) }
