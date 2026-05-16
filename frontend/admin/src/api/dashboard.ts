import request from '@/utils/request'

export function getDashboardApi() {
  return request.get('/admin/dashboard/index')
}
