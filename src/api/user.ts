import request from '@/utils/request'

export function loginByUsername(username: string, password: string) {
  const data = {
    username,
    password
  }
  return request({ url: '/user/login', method: 'post', data })
}

export function logout() {
  return request({ url: '/user/logout', method: 'post' })
}

export function getUserInfo(token: string) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 注册
export function register(user: any) {
  return request({
    url: '/user/register',
    method: 'post',
    params: { user }
  })
}
