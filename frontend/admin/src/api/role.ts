import request from '@/utils/request'

export function getRoleListApi() {
  return request.get('/admin/role/index')
}
export function saveRoleApi(data: any) {
  return request.post('/admin/role/save', data)
}
export function updateRoleApi(data: any) {
  return request.put('/admin/role/update', data)
}
export function deleteRoleApi(id: number) {
  return request.delete(`/admin/role/delete/${id}`)
}
