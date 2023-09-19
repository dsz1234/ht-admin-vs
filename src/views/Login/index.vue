<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, shallowRef, type DefineComponent } from 'vue'
import { PhoneCodeForm, AccountsForm, QcodeForm } from '../Login/components'
const router = useRouter()
const route = useRoute()

const background = 'linear-gradient(0deg,#2196f3,#00bcd4,#00bcd4,#03a9f4)'
const loginInnerWidth = '800px'
const loginInnerheight = '400px'

const tabList = ref<
  {
    name: string
    componentName: any
  }[]
>([
  { name: '免密登录', componentName: shallowRef(PhoneCodeForm) },
  { name: '账号登录', componentName: shallowRef(AccountsForm) },
  { name: '扫码登录', componentName: shallowRef(QcodeForm) }
])

const currentTab = ref(0)

const changeTab = (index: number) => {
  currentTab.value = index
}
</script>

<template>
  <div class="login-page">
    <div class="inner">
      <div class="left">
        <img src="../../assets/logo.svg" alt="" />
      </div>
      <div class="right">
        <div class="tabs">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ selected: currentTab === index }"
            class="tab-item"
            @click="changeTab(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="tabs-content">
          <component :is="tabList[currentTab].componentName"></component>
          <!-- <PhoneCodeForm v-if="currentTab === 1"></PhoneCodeForm>
          <AccountsForm v-else-if="currentTab === 2"></AccountsForm>
          <QcodeForm v-else></QcodeForm> -->
        </div>
      </div>
    </div>
    <div class="foot">版权所有：通用管理系统</div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: v-bind(background);
  .inner {
    width: v-bind(loginInnerWidth);
    height: v-bind(loginInnerheight);
    background-color: #fff;
    margin: 0 auto;
    margin-top: calc((100vh - v-bind(loginInnerheight)) / 2);
    box-shadow: 0 0 15px #00000053;
    display: flex;
    .left {
      width: 40%;
      text-align: center;
      border-right: 2px solid #f8f8f8;
      img {
        width: 60%;
        margin-top: calc((v-bind(loginInnerheight) - 166px) / 2);
      }
    }
    .right {
      flex: 1;
      .tabs {
        height: 45px;
        line-height: 45px;
        text-align: center;
        display: flex;
        margin-top: 15px;
        .tab-item {
          flex: 1;
          cursor: pointer;
          &.selected {
            color: red;
          }
        }
      }
      .tabs-content {
        padding: 20px 25px 0;
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
}
</style>
