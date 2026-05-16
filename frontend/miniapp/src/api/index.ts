import { get, post } from '@/utils/request'

export function getArticleListApi(page: number = 1, limit: number = 10) {
  return get<{ list: any[]; total: number }>('/admin/cms.Article/index', { page, limit })
}
export function getArticleDetailApi(id: number) {
  return get<any>('/admin/cms.Article/detail/' + id)
}
export function getNotificationListApi(page: number = 1, limit: number = 10) {
  return get<{ list: any[]; total: number }>('/admin/notification/index', { page, limit })
}
export function getUnreadCountApi() {
  return get<{ count: number; list: any[] }>('/admin/notification/unread')
}
export function markReadApi(id: number) {
  return post<null>('/admin/notification/read/' + id)
}
export function markAllReadApi() {
  return post<null>('/admin/notification/readall')
}
export function deleteNotificationApi(id: number) {
  return post<null>('/admin/notification/delete/' + id)
}
export function loginApi(username: string, password: string) {
  return post<{ token: string; user: any }>('/admin/index/login', { username, password })
}
