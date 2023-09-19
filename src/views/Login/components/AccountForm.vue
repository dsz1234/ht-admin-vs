<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
const router = useRouter()
const route = useRoute()
import type { FormInstance } from 'element-plus'
import { phoneCodeFormRules } from '../rules'
import type { AccountFormType } from '../types/login-type'
import utils from '@/utils/utils'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const accountForm = reactive<AccountFormType>({
  username: '',
  imgcode: '',
  password: '',
  saveUserPass: false,
  saveUserName: false
})

// 图片验证码
import { useGetImgCode } from '../composable'

const { imgCodeSrc, getImgCode } = useGetImgCode()

// 点击登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 校验成功
      // 1.点击登录按钮，判断是否保存用户名，如果为true则将用户名和状态保存到本地
      useSaveLocalUserAndPass(accountForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

import { useGetAccount } from '../composable/account'
const { useSaveLocalUserAndPass, useGetLocalUserAndOrPass } = useGetAccount()

// 加载时获取用户名及是否记住用户名的状态
onMounted(() => {
  useGetLocalUserAndOrPass(accountForm)
})
</script>

<template>
  <div class="account-page">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="phoneCodeFormRules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="accountForm.username"
          placeholder="请输入用户名"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="accountForm.password"
          placeholder="请输入密码"
          type="password"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="flex login-line">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="accountForm.imgcode"
              placeholder="请输入图片验证码"
              prefix-icon="PictureRounded"
            />
          </div>
          <div class="code-btn">
            <img @click="getImgCode" :src="imgCodeSrc" alt="" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="flex-item">
          <el-checkbox v-model="accountForm.saveUserName">记住用户名</el-checkbox>
        </div>
        <div class="flex-item">
          <el-checkbox v-model="accountForm.saveUserPass">记住密码</el-checkbox>
        </div>
        <div class="flex-item"><router-link to="/ResetPwd">忘记密码?</router-link></div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="logon-btn"
          type="danger"
          round
          size="large"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.flex-item {
  flex: 1;
}
.login-line {
  width: 100%;

  .code-btn {
    width: 100px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 40px;
    }
    .el-button {
      width: 100%;
      font-size: 12px;
    }
  }
}
.logon-btn {
  background-color: #f54620;
  width: 100%;
  color: #fff;
}
</style>
