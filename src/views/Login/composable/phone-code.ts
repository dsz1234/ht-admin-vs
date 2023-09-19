import { ref } from 'vue'
import utils from '@/utils/utils'
import type { PhoneCodeFormType } from '../types/login-type'

// 抽离获取短信验证码以及倒计时
export const useGetPhoneCode = (loginForm: PhoneCodeFormType) => {
  // 获取短信验证码
  let timer: number
  const currentTime = ref(0)
  const smsCodeBtnText = ref('获取验证码')
  const disabled = ref(false)
  // 点击获取验证码
  const getSmCode = () => {
    // TODO 调用获取获取短信验证码接口

    if (!loginForm.username) {
      utils.showError('请输入手机号')
      return
    }
    disabled.value = true
    clearInterval(timer)
    currentTime.value = 60
    smsCodeBtnText.value = currentTime.value + '秒后重新获取'
    timer = setInterval(() => {
      currentTime.value--
      smsCodeBtnText.value = currentTime.value + '秒后重新获取'
      if (currentTime.value <= 0) {
        smsCodeBtnText.value = '获取验证码'
        disabled.value = false
        clearInterval(timer)
        timer = 0
      }
    }, 1000)
  }
  return {
    disabled,
    getSmCode,
    smsCodeBtnText
  }
}

// 抽离保存用户名及勾选状态
export const useHandleSaveUser = (loginForm: PhoneCodeFormType) => {
  const saveLocalUser = () => {
    if (loginForm.savePhone) {
      // -将用户名保存到本地
      utils.saveData('phone', loginForm.username)
      // -将状态保存到本地
      utils.saveData('savePhone', loginForm.savePhone)
    } else {
      utils.removeData('phone')
      utils.removeData('savePhone')
    }
  }
  const getLocalUser = () => {
    loginForm.savePhone = utils.getData('saveUserName')
    if (loginForm.savePhone) {
      loginForm.username = utils.getData('phone')
    }
  }
  return { saveLocalUser, getLocalUser }
}
