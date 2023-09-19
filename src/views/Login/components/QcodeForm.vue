<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onUnmounted } from 'vue'
const router = useRouter()
const route = useRoute()
const qCodeSrc = ref('')
let endTime = ref(0)

let timer: number
// 加载二维码
const loadQcode = () => {
  qCodeSrc.value = new URL('../../../assets/qcode.png', import.meta.url).href

  endTime.value = 5
  timer = setInterval(() => {
    endTime.value--
    // 每隔一秒检测用户是否扫码
    checkLogin()

    if (endTime.value <= 0) {
      timer && clearInterval(timer)
      timer = 0
    }
  }, 1000)
}
loadQcode()

// 每隔一秒检测用户是否扫码
const checkLogin = () => {}

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <div class="q-code-page">
    <div class="qcode-box">
      <img :src="qCodeSrc" :class="{ 'end-img': endTime <= 0 }" alt="" />
      <div v-if="endTime <= 0" @click="loadQcode" class="end-box">
        当前二维码已失效,点击重新添加
      </div>
    </div>
    <div class="dec">使用微信或者移动端扫码登录</div>
  </div>
</template>

<style lang="scss" scoped>
.q-code-page {
  .qcode-box {
    width: 250px;
    height: 55%;
    text-align: center;
    margin: 0 auto;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .end-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      font-size: 14px;
    }
    .end-img {
      filter: brightness(10%);
    }
  }
  .dec {
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: gray;
  }
}
</style>
