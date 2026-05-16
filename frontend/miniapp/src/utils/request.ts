const BASE_URL = 'http://127.0.0.1:8000'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
  header?: Record<string, string>
}

export function request<T = any>(options: RequestOptions): Promise<{ code: number; msg: string; data: T }> {
  const token = uni.getStorageSync('token') || ''
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : '',
        ...(options.header || {})
      },
      success: (res: any) => {
        const d = res.data as { code: number; msg: string; data: T }
        if (d.code === 0 || d.code === 200) { resolve(d) }
        else { uni.showToast({ title: d.msg || '请求失败', icon: 'none' }); reject(d) }
      },
      fail: (err: any) => {
        uni.showToast({ title: '网络错误', icon: 'none' })
        reject(err)
      }
    })
  })
}

export function get<T = any>(url: string, data?: Record<string, any>) {
  return request<T>({ url, method: 'GET', data })
}
export function post<T = any>(url: string, data?: Record<string, any>) {
  return request<T>({ url, method: 'POST', data })
}
export function put<T = any>(url: string, data?: Record<string, any>) {
  return request<T>({ url, method: 'PUT', data })
}
export function del<T = any>(url: string, data?: Record<string, any>) {
  return request<T>({ url, method: 'DELETE', data })
}
