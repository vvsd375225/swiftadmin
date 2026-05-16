import request from '@/utils/request'

export const getArticleList = (params: any) => request.get('/admin/cms/article/index', { params })
export const getArticleDetail = (id: number) => request.get(`/admin/cms/article/detail/${id}`)
export const loginApi = (data: any) => request.post('/admin/auth/login', data)
