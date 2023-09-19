import { ref } from 'vue'

// 获取图形验证码
export const useGetImgCode = () => {
  // 图片验证码
  const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)
  // 点击切换图片验证码
  const getImgCode = () => {}
  return { imgCodeSrc, getImgCode }
}
