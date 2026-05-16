import request from '@/utils/request'

export function getWorkflowListApi(params?: any) {
  return request.get('/admin/workflow/index', { params })
}
export function saveWorkflowApi(data: any) {
  return request.post('/admin/workflow/save', data)
}
export function updateWorkflowApi(data: any) {
  return request.put('/admin/workflow/update', data)
}
export function deleteWorkflowApi(id: number) {
  return request.delete(`/admin/workflow/delete/${id}`)
}
export function getWorkflowDetailApi(id: number) {
  return request.get(`/admin/workflow/detail/${id}`)
}

export function getTodoListApi(params?: any) {
  return request.get('/admin/workflow/instance/todo', { params })
}
export function getDoneListApi(params?: any) {
  return request.get('/admin/workflow/instance/done', { params })
}
export function getMineListApi(params?: any) {
  return request.get('/admin/workflow/instance/mine', { params })
}
export function startInstanceApi(data: any) {
  return request.post('/admin/workflow/instance/start', data)
}
export function getInstanceDetailApi(id: number) {
  return request.get(`/admin/workflow/instance/detail/${id}`)
}
export function agreeInstanceApi(data: any) {
  return request.post('/admin/workflow/instance/agree', data)
}
export function rejectInstanceApi(data: any) {
  return request.post('/admin/workflow/instance/reject', data)
}
export function transferInstanceApi(data: any) {
  return request.post('/admin/workflow/instance/transfer', data)
}
export function addsignerInstanceApi(data: any) {
  return request.post('/admin/workflow/instance/addsigner', data)
}
