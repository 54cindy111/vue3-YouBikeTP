import axios from 'axios'
import store from '@/store'
import router from '@/router'
import i18n from '@/plugins/i18nPlugin'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  withCredentials: false,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    store.commit('app/setLoading', true)
    const storeGetters = store.getters
    const token = storeGetters['persistedState/token']
    if (token) {
      config.headers['authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    store.commit('app/setLoading', false)

    if (response.status === 200 && response.data) {
      const { data } = response
      if (data.code === 200001) {
        return data
      } else {
        return data
      }
    } else {
      return response
    }
  },
  error => {
    store.commit('app/setLoading', false)
    const response = error.response
    switch (response.status) {
      case 401:
        if (response.data.code === 401002) {
          ElMessage.error(i18n.global.t('validate_password'))
        } else if (response.data.code === 401001) {
          ElMessage.error(i18n.global.t('validate_login'))
        }
        store.dispatch('persistedState/cleanPersistedState')
        router.push({ name: 'Login' })
        break
      case 403:
        ElMessage.error(i18n.global.t('validate_block'))
        store.dispatch('persistedState/cleanPersistedState')
        router.push({ name: 'Login' })
        break
      case 404:
        if (response.data.code === 404001) {
          ElMessage.error(i18n.global.t('validate_noData'))
        } else if (response.data.code === 404101) {
          ElMessage.error(i18n.global.t('validate_noMember'))
        }
        break
      case 422:
        if (response.data.error.account[0] === '帳號 已經存在。') {
          ElMessage.error(i18n.global.t('validate_existed'))
        } else {
          ElMessage.error(i18n.global.t('validate_error'))
        }
        console.log(error.response)
        break
      default:
        break
    }

    return Promise.reject(error)
  }
)

export default service
