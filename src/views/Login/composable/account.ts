import type { AccountFormType } from '../types/login-type'
import utils from '@/utils/utils'
export const useGetAccount = () => {
  const useSaveLocalUserAndPass = (accountForm: AccountFormType) => {
    if (accountForm.saveUserName) {
      utils.saveData('accountName', accountForm.username)
      utils.saveData('saveUserName', accountForm.saveUserName)
    } else {
      utils.removeData('accountName')
      utils.removeData('saveUserName')
    }
    if (accountForm.saveUserPass) {
      utils.saveData('password', accountForm.password)
      utils.saveData('saveUserPass', accountForm.saveUserPass)
    } else {
      utils.removeData('password')
      utils.removeData('saveUserPass')
    }
  }
  const useGetLocalUserAndOrPass = (accountForm: AccountFormType) => {
    const saveUserName = utils.getData('saveUserName')
    if (saveUserName) {
      accountForm.username = utils.getData('accountName')
    }
    const saveUserPass = utils.getData('saveUserPass')
    if (saveUserPass) {
      accountForm.password = utils.getData('password')
    }
  }
  return { useSaveLocalUserAndPass, useGetLocalUserAndOrPass }
}
