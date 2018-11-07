import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
