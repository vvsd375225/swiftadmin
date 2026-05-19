import request from '@/utils/request'

export function getConfigListApi(params?: any) {
  return request.get('/admin/config/index', { params })
}
export function saveConfigApi(data: any) {
  return request.post('/admin/config/save', data)
}
export function updateConfigApi(data: any) {
  return request.put('/admin/config/update', data)
}
export function deleteConfigApi(id: number) {
  return request.delete(`/admin/config/delete/${id}`)
}
