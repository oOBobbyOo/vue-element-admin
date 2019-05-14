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
import { isvalidUsername } from '@/utils/validate'

import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

const namespace: string = 'user'

/**
 * 定义当前数据
 */
interface Validate {
  username: string
  password: string
}

/**
 * 定义当前表单验证
 */
interface LoginRulesFun {
  username: [
    {
      required: boolean
      trigger: string
      validator: (rule: any, value: string, callback: () => {}) => void
    }
  ]
  password: [
    {
      required: boolean
      trigger: string
      validator: (rule: any, value: string, callback: () => {}) => void
    }
  ]
}

@Component({
  name: 'login'
})
export default class Login extends Vue {
  $refs!: {
    loginForm: HTMLFormElement
  }

  @Provide()
  passwordType: string = 'password'

  @Action('LoginByUsername', { namespace })
  LoginByUsername: any

  private loginForm: Validate = {
    username: 'admin',
    password: '123456'
  }

  private loading: boolean = false

  private loginRules: LoginRulesFun = {
    username: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (!isvalidUsername(value)) {
            callback(new Error('请输入正确的用户名'))
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
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'))
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

  private handleLogin() {
    this.$refs.loginForm.validate((valid: any) => {
      if (valid) {
        this.loading = true
        this.LoginByUsername(this.loginForm)
          .then((res: any) => {
            this.loading = false
            this.$router.push({ path: '/' })
          })
          .catch((err: any) => {
            console.log(err)
            this.loading = false
          })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>