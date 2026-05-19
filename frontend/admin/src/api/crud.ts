import request from '@/utils/request'

export function getCrudTablesApi() {
  return request.get('/admin/crud/index')
}
export function getCrudFieldsApi(table: string) {
  return request.get('/admin/crud/fields/' + table)
}
export function getCrudTypesApi() {
  return request.get('/admin/crud/types')
}
export function generateCrudApi(data: any) {
  return request.post('/admin/crud/generate', data)
}
export function previewCrudApi(data: any) {
  return request.post('/admin/crud/preview', data)
}
