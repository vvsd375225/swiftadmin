import request from '@/utils/request'

export function getRecycleListApi(params: any) {
  return request.get('/admin/recycle/index', { params })
}
export function restoreRecycleApi(id: number) {
  return request.post(`/admin/recycle/restore/${id}`)
}
export function deleteRecycleApi(id: number) {
  return request.delete(`/admin/recycle/delete/${id}`)
}
