import { reactive } from 'vue'
// import type { LoginFormType } from '../types/login-type'
import type { FormRules } from 'element-plus'

// 手机验证码登录的校验规则
export const phoneCodeFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  smscode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})

// 用户名密码登陆的校验规则
export const accountFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})
