import request from '@/utils/request'

export function getAdminListApi(params: any) {
  return request.get('/admin/admin/index', { params })
}
export function saveAdminApi(data: any) {
  return request.post('/admin/admin/save', data)
}
export function updateAdminApi(data: any) {
  return request.put('/admin/admin/update', data)
}
export function deleteAdminApi(id: number) {
  return request.delete(`/admin/admin/delete/${id}`)
}
