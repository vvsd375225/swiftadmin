import request from '@/utils/request'

export function getLogListApi(params: any) {
  return request.get('/admin/auth_log/index', { params })
}
export function deleteLogApi(id: number) {
  return request.delete(`/admin/auth_log/delete/${id}`)
}
