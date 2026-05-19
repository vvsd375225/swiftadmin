import request from '@/utils/request'

export function getSensitiveFieldRuleListApi(params: any) {
  return request.get('/admin/sensitive_field_rule/index', { params })
}
export function saveSensitiveFieldRuleApi(data: any) {
  return request.post('/admin/sensitive_field_rule/save', data)
}
export function updateSensitiveFieldRuleApi(data: any) {
  return request.put('/admin/sensitive_field_rule/update', data)
}
export function deleteSensitiveFieldRuleApi(id: number) {
  return request.delete(`/admin/sensitive_field_rule/delete/${id}`)
}
export function toggleSensitiveFieldRuleStatusApi(id: number) {
  return request.post(`/admin/sensitive_field_rule/toggleStatus/${id}`)
}
