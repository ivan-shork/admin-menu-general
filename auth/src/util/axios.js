import Qs from 'qs'
import axios from 'axios'

const instance = axios.create()
instance.defaults.withCredentials = true
instance.defaults.timeout = 8000
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.transformRequest = [function (data) {
  return Qs.stringify(data)
}]

// 添加响应拦截器
instance.interceptors.response.use((res) => {
  // 对响应数据做点什么
  const data = res.data
  if (data.ret === 0) {
    return data
  }
  return Promise.reject(res.data)
}, (error) => {
  // 对响应错误做点什么
  return error
})

export default instance
