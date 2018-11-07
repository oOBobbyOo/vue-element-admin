<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">

      <div class="title-container">
        <h3 class="title">admin</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input type="text" autocomplete="on" placeholder="用户名" v-model="loginForm.username">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" autocomplete="on" placeholder="密码" v-model="loginForm.password">
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
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

<style lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
  }
}
</style>

