import { createI18n } from 'vue-i18n'
import store from '@/store'
import elementlangEn from 'element-plus/lib/locale/lang/en'
import elementlangZhTw from 'element-plus/lib/locale/lang/zh-tw'
import { tw } from '@/lib/i18n/tw'
import { en } from '@/lib/i18n/en'

const messages = {
  ch: {
    ...tw,
    el: elementlangZhTw.el
  },
  en: {
    ...en,
    el: elementlangEn.el
  }
}

const i18n = createI18n({
  locale: store.getters['app/lang'],
  messages
})

export default i18n
