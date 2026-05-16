import request from '@/utils/request'

export function getUserListApi(params: any) {
  return request.get('/admin/user/index', { params })
}
export function saveUserApi(data: any) {
  return request.post('/admin/user/save', data)
}
export function updateUserApi(data: any) {
  return request.put('/admin/user/update', data)
}
export function deleteUserApi(id: number) {
  return request.delete(`/admin/user/delete/${id}`)
}
