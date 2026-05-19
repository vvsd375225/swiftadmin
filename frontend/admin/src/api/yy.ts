import request from '@/utils/request'

export const getYyListApi = (params: any) => request.get('/admin/yy/index', { params })
export const saveYyApi = (data: any) => request.post('/admin/yy/save', data)
export const updateYyApi = (data: any) => request.put('/admin/yy/update', data)
export const deleteYyApi = (id: number) => request.delete(`/admin/yy/delete/${id}`)
