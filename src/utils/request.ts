import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'https://www.easy-mock.com/mock/5b39af8a73a49f4fe3433d6f',
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
