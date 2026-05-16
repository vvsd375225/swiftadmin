import request from '@/utils/request'

export function getTenantListApi(params?: any) {
  return request.get('/admin/tenant/index', { params })
}
export function getTenantDetailApi(id: number) {
  return request.get('/admin/tenant/detail/' + id)
}
export function saveTenantApi(data: any) {
  return request.post('/admin/tenant/save', data)
}
export function updateTenantApi(data: any) {
  return request.put('/admin/tenant/update', data)
}
export function deleteTenantApi(id: number) {
  return request.delete('/admin/tenant/delete/' + id)
}
export function getPlansApi() {
  return request.get('/admin/tenant/plans')
}
