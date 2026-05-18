import request from '@/utils/request'

export function getRecycleRuleListApi(params: any) {
  return request.get('/admin/data_recycle_rule/index', { params })
}
export function saveRecycleRuleApi(data: any) {
  return request.post('/admin/data_recycle_rule/save', data)
}
export function updateRecycleRuleApi(data: any) {
  return request.put('/admin/data_recycle_rule/update', data)
}
export function deleteRecycleRuleApi(id: number) {
  return request.delete(`/admin/data_recycle_rule/delete/${id}`)
}
export function toggleRecycleRuleStatusApi(id: number) {
  return request.post(`/admin/data_recycle_rule/toggleStatus/${id}`)
}
