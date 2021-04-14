<template>
  <el-select v-model="lang" :placeholder="$t('selectLang')" @change="setLang">
    <el-option
      v-for="item in options"
      :key="item"
      :label="$t(item)"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import i18n from '@/plugins/i18nPlugin'

export default {
  setup() {
    //init
    const store = useStore()

    //state
    const storeGetters = store.getters
    const locale = storeGetters['app/lang']
    const lang = ref(locale)
    const options = ref(['en', 'ch'])

    //function
    const setLang = (val: any) => {
      lang.value = val
      store.commit('app/setLang', val)
      i18n.global.locale = val
    }

    return {
      i18n,
      options,
      lang,
      setLang
    }
  }
}
</script>
<style scoped lang="scss">
.el-select {
  width: 100px;
}
</style>
