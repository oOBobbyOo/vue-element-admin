<template>
  <div class="form-container">
    <el-form :model="forgetForm" :rules="forgetRules" ref="forgetForm" class="form-group">
      <div class="title-container">
        <h3 class="title">
          Admin
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input type="text" placeholder="用户名" v-model="forgetForm.username" autocomplete="on">
          <template slot="prepend">
            <svg-icon icon-class="user" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input type="email" placeholder="邮箱" v-model="forgetForm.email" autocomplete="on">
          <template slot="prepend">
            <svg-icon icon-class="email" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%;"
          @click.native.prevent="handleSubmit"
        >
          提交
        </el-button>
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

// 定义接口类型
interface ForgetForm {
  username: string
  email: string
}

// 定义当前表单验证
interface ForgetRules {
  [propName: string]: [
    {
      required: boolean
      trigger: string
      validator: (rule: any, value: string, callback: () => {}) => void
    }
  ]
}

@Component({
  name: 'ForgetPwd'
})
export default class ForgetPwd extends Vue {
  $refs!: {
    forgetForm: HTMLFormElement
  }

  @Action('forgetPwd', { namespace }) forgetPwd: any

  private forgetForm: ForgetForm = {
    username: '',
    email: ''
  }

  private loading: boolean = false

  private forgetRules: ForgetRules = {
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
    ]
  }

  // 忘记密码
  private handleSubmit() {
    this.$refs.forgetForm.validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          await this.forgetPwd(this.forgetForm)
          this.loading = false
          this.$notify({
            title: '成功',
            message: '密码已发送到填写的邮箱',
            type: 'success'
          })
        } catch (error) {
          this.loading = false
          this.$notify.error({
            title: '错误',
            message: error,
            type: 'error'
          })
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>

