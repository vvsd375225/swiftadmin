import request from '@/utils/request'

export function getDataScreenApi() {
  return request.get('/admin/datascreen/index')
}
