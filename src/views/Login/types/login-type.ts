// 定义手机验证码登录表单的数据类型
export type PhoneCodeFormType = {
  username: string
  smscode: string
  imgcode: string
  savePhone?: boolean
}

// 定义账号密码登录表单的数据类型
export type AccountFormType = Pick<PhoneCodeFormType, 'username' | 'imgcode'> & {
  saveUserPass?: boolean
  password: string
  saveUserName?: boolean
}
