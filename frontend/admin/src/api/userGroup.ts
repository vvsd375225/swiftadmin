import request from '@/utils/request'

export function getUserGroupListApi(params: any) {
  return request.get('/admin/user_group/index', { params })
}
export function saveUserGroupApi(data: any) {
  return request.post('/admin/user_group/save', data)
}
export function updateUserGroupApi(data: any) {
  return request.put('/admin/user_group/update', data)
}
export function deleteUserGroupApi(id: number) {
  return request.delete(`/admin/user_group/delete/${id}`)
}
