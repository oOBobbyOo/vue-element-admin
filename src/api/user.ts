import request from '@/utils/request'

// 登录
export function login(user: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { user }
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户信息
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
