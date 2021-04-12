import mitt from 'mitt'
import _ from 'lodash'
import i18n from '@/plugins/i18nPlugin'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import '@/plugins/permission'
const install = (Vue: any) => {
  Vue.config.globalProperties.$baseUrl = process.env.VUE_APP_BASE_API
  Vue.config.globalProperties.$bus = mitt()
  Vue.config.globalProperties.$_ = _
  Vue.use(i18n)
  Vue.use(ElementPlus, {
    i18n: i18n.global.t
  })
  Vue.config.productionTip = false
}

export default {
  install
}
