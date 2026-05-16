import request from '@/utils/request'

export function getMenuListApi() {
  return request.get('/admin/menu/index')
}
export function saveMenuApi(data: any) {
  return request.post('/admin/menu/save', data)
}
export function updateMenuApi(data: any) {
  return request.put('/admin/menu/update', data)
}
export function deleteMenuApi(id: number) {
  return request.delete(`/admin/menu/delete/${id}`)
}
