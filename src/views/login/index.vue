<template>
  <div class="form-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form-group">
      <div class="title-container">
        <h3 class="title">Admin</h3>
      </div>

      <el-form-item prop="username">
        <el-input type="text" autocomplete="on" placeholder="用户名" v-model="loginForm.username">
          <template slot="prepend">
            <svg-icon icon-class="user" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          autocomplete="on"
          placeholder="密码"
          v-model="loginForm.password"
        >
          <template slot="prepend">
            <svg-icon icon-class="password" />
          </template>
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click.native.prevent="gotoRegister">
          注册
        </el-button>
      </el-form-item>

      <div class="links">
        <router-link to="/forgetPwd">忘记密码？</router-link>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { validStr } from '@/utils/validate'

import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

const namespace: string = 'user'

// 定义登录接口类型
interface LoginForm {
  username: string
  password: string
}

// 定义当前表单验证
interface LoginRules {
  [propName: string]: [
    {
      required: boolean
      trigger: string
      validator: (rule: any, value: string, callback: () => {}) => void
    }
  ]
}

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  $refs!: {
    loginForm: HTMLFormElement
  }

  @Action('login', { namespace }) login: any

  private loginForm: LoginForm = {
    username: 'admin',
    password: '123456'
  }

  private passwordType: string = 'password'
  private loading: boolean = false

  private loginRules: LoginRules = {
    username: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (value === '') {
            callback(new Error('请输入用户名！'))
          } else if (validStr(value)) {
            callback(new Error('只允许字母、数字和下划线！'))
          } else {
            callback()
          }
        }
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (value === '') {
            callback(new Error('请输入密码！'))
          } else if (validStr(value)) {
            callback(new Error('只允许字母数字和下划线！'))
          } else if (value.length < 6) {
            callback(new Error('密码长度至少六位！'))
          } else {
            callback()
          }
        }
      }
    ]
  }

  // 是否显示密码
  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
  }

  // 路由跳转
  private gotoRegister() {
    this.$router.push({ path: '/register' })
  }

  // 登录
  private handleLogin() {
    this.$refs.loginForm.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        console.log(this.loginForm)

        this.login(this.loginForm)
          .then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          })
          .catch((err: any) => {
            this.loading = false
            console.log(err)
          })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>