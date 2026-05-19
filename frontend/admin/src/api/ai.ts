import request from '@/utils/request'

export function aiConfigApi() {
  return request.get('/admin/ai/config')
}
export function aiChatApi(messages: { role: string; content: string }[], mode: string = 'chat') {
  return request.post('/admin/ai/chat', { messages, mode })
}
export function aiActivateApi(license: string) {
  return request.post('/admin/ai/activate', { license })
}
export function aiSetupMasterKeyApi(config: { api_url: string; api_key: string }) {
  return request.post('/admin/ai/setupprovider', config)
}
export function aiSaveFileApi(path: string, content: string) {
  return request.post('/admin/ai/savefile', { path, content })
}
export function aiListFilesApi() {
  return request.get('/admin/ai/listfiles')
}
