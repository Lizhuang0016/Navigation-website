//在index.js中引入axios
import axios from 'axios'
//引入qs模块，用来序列化post类型的数据
import QS from 'qs'
//antd的message提示组件，大家可根据自己的ui组件更改。
import { message } from 'antd'

//保存环境变量
const isPrd = process.env.NODE_ENV == 'production'
//区分开发环境还是生产环境基础URL
// export const baseUrl = isPrd ? 'https://www.production.com' : 'http://www.development.com'
// export const baseUrl = isPrd ? 'http://tik128.com:3000/':'http://127.0.0.1:3000'
export const baseUrl = isPrd ? 'http://tik128.com:3000/':'http://tik128.com:3000/'

//设置axios基础路径
const service = axios.create({
  baseURL: baseUrl
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
    // //在每次的请求中添加token
    // config.data = Object.assign({}, config.data, {
    //   token: token,
    // })
    //设置请求头
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    // }
    // config.data = QS.stringify(config.data)
    // return config
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log('过期')
    }
    return response
  },
  (error) => {
    console.log('请求出错：', error)
  }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then((response) => {
        landing(url, params, response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

//统一接口处理，返回数据
export default function (fecth, url, param) {
  let _data = ''
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        //console.log('begin a get request,and url:', url)
        get(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            //console.log('get request GET failed.', error)
            reject(error)
          })
        break
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            //console.log('get request POST failed.', error)
            reject(error)
          })
        break
      default:
        break
    }
  })
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details)
        break
      case 401:
        alert('未授权，请登录')
        break

      case 403:
        alert('拒绝访问')
        break

      case 404:
        alert('请求地址出错')
        break

      case 408:
        alert('请求超时')
        break

      case 500:
        alert('服务器内部错误')
        break

      case 501:
        alert('服务未实现')
        break

      case 502:
        alert('网关错误')
        break

      case 503:
        alert('服务不可用')
        break

      case 504:
        alert('网关超时')
        break

      case 505:
        alert('HTTP版本不受支持')
        break
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}

//最后把封装好的axios导出
// export default service
