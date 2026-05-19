import request from '@/utils/request'

export function getPaymentListApi(params?: any) {
  return request.get('/admin/payment/index', { params })
}
export function getPaymentDetailApi(id: number) {
  return request.get('/admin/payment/detail/' + id)
}
export function savePaymentApi(data: any) {
  return request.post('/admin/payment/save', data)
}
export function updatePaymentApi(data: any) {
  return request.put('/admin/payment/update', data)
}
export function deletePaymentApi(id: number) {
  return request.delete('/admin/payment/delete/' + id)
}
export function refundPaymentApi(id: number) {
  return request.post('/admin/payment/refund/' + id)
}
export function getPaymentSummaryApi() {
  return request.get('/admin/payment/summary')
}
