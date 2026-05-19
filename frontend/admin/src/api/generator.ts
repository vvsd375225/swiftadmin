import request from '@/utils/request'

export function getGeneratorTablesApi() {
  return request.get('/admin/generator/index')
}
export function getGeneratorFieldsApi(table: string) {
  return request.get('/admin/generator/fields', { params: { table } })
}
export function getGeneratorTypesApi() {
  return request.get('/admin/generator/types')
}
export function previewGeneratorApi(table: string, fields?: any[]) {
  return request.get('/admin/generator/preview', { params: { table, fields } })
}
export function generateCodeApi(table: string, fields?: any[]) {
  return request.post('/admin/generator/generate', { table, fields })
}
