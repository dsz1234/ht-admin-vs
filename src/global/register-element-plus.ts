// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入element-plus主题
import 'element-plus/theme-chalk/dark/css-vars.css'

// 转化中文
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

import type { App } from 'vue'

export default function (app: App) {
  // 注册element-plus
  app.use(ElementPlus, {
    locale: zhCn
  })
}
