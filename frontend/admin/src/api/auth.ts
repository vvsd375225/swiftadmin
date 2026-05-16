import request from '@/utils/request'

export function loginApi(data: { username: string; password: string }) {
  return request.post('/admin/auth/login', data)
}
export function getInfoApi() {
  return request.get('/admin/auth/info')
}
export function getPermissionsApi() {
  return request.get('/admin/auth/permissions')
}
export function logoutApi() {
  return request.post('/admin/auth/logout')
}
