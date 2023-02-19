import axios from 'axios'
import router from '~/router'

type Method = 'post' | 'get' | 'put' | 'delete' | 'patch' | 'head'
type Ajax = Record<Method, (url: string, data?: any, options?: any) => Promise<any>>

export const baseApi = 'http://127.0.0.1:8081/api/v1'
// export const baseApi = 'http://127.0.0.1:8081/api/v1'

export interface APIResponse {
  data: any
  message: string
  status: boolean
}
// create an axios instance
const service = axios.create({
  baseURL: `${baseApi}`, // url = base api url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 15000, // request timeout

})

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    // 不传递默认开启loading
    // if (!config.hideloading) {
    //   // loading
    //   Toast.loading({
    //     forbidClick: true,
    //   });
    // }
    // 设置请求头
    if (localStorage.getItem('TOKEN')) {
      // loading
      config.headers.Authorization = `bearer ${localStorage.getItem('TOKEN')}`
    }

    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  },
)
// respone拦截器
service.interceptors.response.use(
  async (response) => {
    if (response.config.responseType === 'blob') {
      const type = response.data.type
      if (type === 'application/json') {
        Message.error('下载失败')
        const data = JSON.parse(await response.data.text())
        return Promise.reject(data.msg)
      }
    }
    const res = response.data
    if (res.code !== 0) {
      // // 登录超时,重新登录
      return Promise.reject(res || 'error')
    }
    if (res.status === 401 || res.code === 401) {
      // // 登录超时,重新登录
      router.replace('/login')
      return Promise.resolve(res)
    }
    else {
      return Promise.resolve(res)
    }
  },
  (error) => {
    const res = error.response
    if (res.status === 401) {
      setTimeout(() => {
        localStorage.clear()
        location.href = '/'
      }, 1500)
    }
    else {
      return Promise.reject(error)
    }
  },
)

/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const Api: Ajax = {} as Ajax
['post', 'put', 'patch'].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  Api[method as Method] = (url = '', data = {}, options = {}) => {
    return service(Object.assign({ url, data, method }, options))
  }
  return request
}, {});

['get', 'delete', 'head'].forEach((method) => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  Api[method as Method] = (url = '', params = {}, options = {}) => {
    return service(Object.assign({ url, params, method }, options))
  }
})

export default Api
