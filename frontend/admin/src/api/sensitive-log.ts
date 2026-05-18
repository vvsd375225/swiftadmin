import request from '@/utils/request'

export function getSensitiveLogListApi(params: any) {
  return request.get('/admin/sensitive_data_log/index', { params })
}
export function getSensitiveLogDetailApi(id: number) {
  return request.get(`/admin/sensitive_data_log/detail/${id}`)
}
export function deleteSensitiveLogApi(id: number) {
  return request.delete(`/admin/sensitive_data_log/delete/${id}`)
}
export function rollbackSensitiveLogApi(id: number) {
  return request.post(`/admin/sensitive_data_log/rollback/${id}`)
}
export function batchRollbackSensitiveLogApi(ids: number[]) {
  return request.post('/admin/sensitive_data_log/batchRollback', { ids })
}
export function batchDeleteSensitiveLogApi(ids: number[]) {
  return request.post('/admin/sensitive_data_log/batchDelete', { ids })
}
