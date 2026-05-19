import request from '@/utils/request'

export function getCronListApi(params?: any) {
  return request.get('/admin/cron/index', { params })
}
export function saveCronApi(data: any) {
  return request.post('/admin/cron/save', data)
}
export function updateCronApi(data: any) {
  return request.put('/admin/cron/update', data)
}
export function deleteCronApi(id: number) {
  return request.delete('/admin/cron/delete/' + id)
}
export function executeCronApi(id: number) {
  return request.post('/admin/cron/execute/' + id)
}
export function getCronLogsApi(params?: any) {
  return request.get('/admin/cron/logs', { params })
}
