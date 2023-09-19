<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
const router = useRouter()
const route = useRoute()
import type { FormInstance } from 'element-plus'
import type { PhoneCodeFormType } from '../types/login-type'
import { phoneCodeFormRules } from '../rules'
import utils from '@/utils/utils'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<PhoneCodeFormType>({
  username: '',
  smscode: '',
  imgcode: '',
  savePhone: false
})

// 抽离---获取验证码
import { useGetPhoneCode, useHandleSaveUser } from '../composable/phone-code'
import { useGetImgCode } from '../composable'
const { disabled, getSmCode, smsCodeBtnText } = useGetPhoneCode(loginForm)
const { saveLocalUser, getLocalUser } = useHandleSaveUser(loginForm)
const { imgCodeSrc, getImgCode } = useGetImgCode()

// 点击登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 校验成功
      // 1.点击登录按钮，判断是否保存用户名，如果为true则将用户名和状态保存到本地
      saveLocalUser()
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 加载时获取用户名及是否记住用户名的状态
onMounted(() => {
  getLocalUser()
})
</script>

<template>
  <div class="phone-code-page">
    <el-form
      ref="ruleFormRef"
      :model="loginForm"
      :rules="phoneCodeFormRules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="loginForm.username"
          placeholder="请输入手机号"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="smscode">
        <div class="flex login-line">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="loginForm.smscode"
              placeholder="请输入短信验证码"
              prefix-icon="Picture"
            />
          </div>
          <div class="code-btn">
            <el-button :disabled="disabled" type="primary" size="large" @click="getSmCode">{{
              smsCodeBtnText
            }}</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="flex login-line">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="loginForm.imgcode"
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
        <el-checkbox v-model="loginForm.savePhone">记住用户名</el-checkbox>
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
.login-line {
  width: 100%;
  .flex-item {
    flex: 1;
  }
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
