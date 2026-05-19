import request from '@/utils/request'

export function getAttachmentListApi(params: any) {
  return request.get('/admin/attachment/index', { params })
}
export function deleteAttachmentApi(id: number) {
  return request.delete(`/admin/attachment/delete/${id}`)
}
