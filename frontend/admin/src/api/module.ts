import request from '@/utils/request'

export function getModuleListApi() {
  return request.get('/admin/module/index')
}
export function installModuleApi(name: string) {
  return request.post('/admin/module/install', { name })
}
export function uninstallModuleApi(name: string) {
  return request.post('/admin/module/uninstall', { name })
}
export function enableModuleApi(name: string) {
  return request.post('/admin/module/enable', { name })
}
export function disableModuleApi(name: string) {
  return request.post('/admin/module/disable', { name })
}
export function scanAiscModulesApi() {
  return request.get('/admin/module/scanaisc')
}
export function installFromAiscApi(name: string) {
  return request.post('/admin/module/installfromaisc', { name })
}
