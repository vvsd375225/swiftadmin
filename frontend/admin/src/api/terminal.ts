import request from '@/utils/request'

export function executeCommandApi(command: string) {
  return request.post('/admin/terminal/execute', { command })
}
