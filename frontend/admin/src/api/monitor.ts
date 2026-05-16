import request from '@/utils/request'

export function getMonitorIndexApi() {
  return request.get('/admin/monitor/index')
}
export function getMonitorRequestsApi() {
  return request.get('/admin/monitor/requests')
}
export function getMonitorLogsApi() {
  return request.get('/admin/monitor/logs')
}
