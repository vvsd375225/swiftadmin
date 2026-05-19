import request from '@/utils/request'

export function getNotificationListApi(params: any) { return request.get('/admin/notification/index', { params }) }
export function getUnreadApi() { return request.get('/admin/notification/unread') }
export function markReadApi(id: number) { return request.post(`/admin/notification/read/${id}`) }
export function markAllReadApi() { return request.post('/admin/notification/readall') }
export function deleteNotificationApi(id: number) { return request.delete(`/admin/notification/delete/${id}`) }
