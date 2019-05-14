<template>
  <div class="form-container">
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="form-group">
      <div class="title-container">
        <h3 class="title">
          Admin
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          type="text"
          placeholder="用户名"
          v-model="registerForm.username"
          autocomplete="on"
        >
          <template slot="prepend">
            <svg-icon icon-class="user" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input type="text" placeholder="邮箱" v-model="registerForm.email" autocomplete="on">
          <template slot="prepend">
            <svg-icon icon-class="email" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          placeholder="密码"
          v-model="registerForm.password"
          autocomplete="on"
        >
          <template slot="prepend">
            <svg-icon icon-class="password" />
          </template>
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="role">
        <el-select v-model="registerForm.role" placeholder="请选择角色" style="width: 100%;">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="register-submit"
          @click.native.prevent="handleRegister"
          style="width: 100%;"
          >注册</el-button
        >
      </el-form-item>

      <div class="links">
        <router-link to="/login">有账号？立即登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { validStr, validEmail } from '@/utils/validate'

import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

const namespace: string = 'user'

// 定义注册接口类型
interface RegisterForm {
  username: string
  email: string
  password: string
  role: string
}

// 定义角色接口类型
interface Roles {
  value: string
  label: string
}

// 定义当前表单验证
interface RegisterRules {
  [propName: string]: [
    {
      required: boolean
      trigger: string
      validator: (rule: any, value: string, callback: () => {}) => void
    }
  ]
}

@Component({
  name: 'Register'
})
export default class Register extends Vue {
  $refs!: {
    registerForm: HTMLFormElement
  }

  @Action('register', { namespace }) register: any

  private registerForm: RegisterForm = {
    username: '',
    email: '',
    password: '',
    role: ''
  }

  private roles: Roles[] = [
    {
      value: 'servicer',
      label: '客服'
    },
    {
      value: 'operator',
      label: '运营'
    },
    {
      value: 'advertiser',
      label: '投放'
    },
    {
      value: 'developer',
      label: '开发'
    },
    {
      value: 'admin',
      label: '管理员'
    }
  ]

  private passwordType: string = 'password'

  private loading: boolean = false

  private registerRules: RegisterRules = {
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
    email: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (value === '') {
            callback(new Error('请输入邮箱！'))
          } else if (!validEmail(value)) {
            callback(new Error('邮箱格式不正确！'))
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
            callback(new Error('只允许字母、数字和下划线！'))
          } else if (value.length < 6) {
            callback(new Error('密码长度至少六位！'))
          } else {
            callback()
          }
        }
      }
    ],
    role: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (value === '') {
            callback(new Error('请选择角色！'))
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

  // 注册
  private handleRegister() {
    this.$refs.registerForm.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        this.register(this.registerForm)
          .then(() => {
            this.loading = false
            this.$router.push({ path: '/login' })
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
