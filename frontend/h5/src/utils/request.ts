import axios from 'axios'

const request = axios.create({ baseURL: 'http://127.0.0.1:8000', timeout: 10000 })
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = token
  return config
})
request.interceptors.response.use(r => r.data, err => Promise.reject(err))
export default request
