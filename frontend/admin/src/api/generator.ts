import request from '@/utils/request'

export function getGeneratorTablesApi() {
  return request.get('/admin/generator/index')
}
export function getGeneratorFieldsApi(table: string) {
  return request.get('/admin/generator/fields', { params: { table } })
}
export function previewGeneratorApi(table: string) {
  return request.get('/admin/generator/preview', { params: { table } })
}
export function generateCodeApi(table: string) {
  return request.post('/admin/generator/generate', { table })
}
