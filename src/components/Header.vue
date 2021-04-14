<template>
  <div class="lang">
    <LangSelector />
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import LangSelector from '@/components/LangSelector.vue'

export default {
  components: {
    LangSelector
  },
  computed: {
    ...mapGetters({
      personal: 'persistedState/personal'
    })
  },
  setup() {
    //init
    const internalInstance: any = getCurrentInstance()
    const $bus = internalInstance.appContext.config.globalProperties.$bus
    const store = useStore()
    const router = useRouter()

    //function
    const changeSideMenu = (val: boolean) => {
      $bus.emit('change-sidemenu', val)
    }
    const logout = async () => {
      await store.dispatch('user/logout')
      await store.dispatch('persistedState/cleanPersistedState')
      router.push({ name: 'Login' })
    }

    return {
      changeSideMenu,
      logout
    }
  }
}
</script>
<style scoped lang="scss">
.lang {
  text-align: right;
}
</style>
