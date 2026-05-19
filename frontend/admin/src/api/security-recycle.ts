import request from '@/utils/request'

export function getSecurityRecycleListApi(params: any) {
  return request.get('/admin/security_data_recycle/index', { params })
}
export function restoreSecurityRecycleApi(id: number) {
  return request.post(`/admin/security_data_recycle/restore/${id}`)
}
export function deleteSecurityRecycleApi(id: number) {
  return request.delete(`/admin/security_data_recycle/delete/${id}`)
}
export function batchDeleteSecurityRecycleApi(ids: number[]) {
  return request.post('/admin/security_data_recycle/batchDelete', { ids })
}
export function batchRestoreSecurityRecycleApi(ids: number[]) {
  return request.post('/admin/security_data_recycle/batchRestore', { ids })
}
