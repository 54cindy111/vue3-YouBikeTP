<template>
  <div v-if="show" @click="changeSideMenu(false)" class="mask"></div>
  <transition name="slide-fade">
    <div v-if="show" class="initSideMenu box">
      <el-row type="flex" justify="end">
        <i @click="changeSideMenu(false)" class="el-icon-close closeBtn"></i>
      </el-row>
      <el-row>
        <el-col class="user">
          <i class="el-icon-user avatar"></i>
          {{ $t('greet') }}
        </el-col>
        <el-col v-for="(m, i) in menuList" :key="i">
          <div
            v-if="m.name !== 'Login History'"
            style="cursor: pointer;"
            :class="{ 'active-link': m.name === $route.name }"
            @click="toPage(m.name)"
          >
            {{ $t(m.name) }}
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, getCurrentInstance, onMounted, provide } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'

export default {
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

    //state
    const show: any = ref(false)
    const menuList: any = ref([])
    const showSettingModal = ref(false)
    const pattern: any = ref('')

    //function
    const getMenuList = () => {
      const routes = router.options.routes
      const home: any = routes.find(x => x.path === '/')
      const homeChildren: any = home.children
      if (homeChildren) {
        const _menuList: any = homeChildren.filter((x: any) => !x.meta.hidden)
        menuList.value = _menuList.map((x: any) => {
          return {
            name: x.meta.title,
            path: x.path
          }
        })
      }
    }
    const changeSideMenu = (val: boolean) => {
      show.value = val
    }
    const toPage = (name: string) => {
      changeSideMenu(false)
      router.push({ name })
    }
    const signOut = async () => {
      changeSideMenu(false)
      await store.dispatch('user/logout')
      await store.dispatch('persistedState/cleanPersistedState')
      toPage('Login')
    }
    const showModal = (target: string) => {
      changeSideMenu(false)
      pattern.value = target
      showSettingModal.value = true
    }
    const closeModal = () => {
      showSettingModal.value = false
    }
    provide('closeModal', closeModal)
    provide('signOut', signOut)

    onMounted(() => {
      getMenuList()
    })

    $bus.on('change-sidemenu', (val: boolean) => {
      changeSideMenu(val)
    })

    return {
      show,
      menuList,
      signOut,
      changeSideMenu,
      toPage,
      showSettingModal,
      pattern,
      showModal,
      closeModal
    }
  }
}
</script>
<style scoped lang="scss">
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
}
.initSideMenu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
}
@media screen and (min-width: 900px) {
  .box {
    width: 20%;
  }
}
@media only screen and (min-width: 0px) and (max-width: 900px) {
  .box {
    width: 100%;
  }
}
.box {
  background: #fff;
  height: calc(100vh - 2rem);
  padding: 1rem;
  text-align: start;
  font-size: 18px;
  .el-col {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .avatar {
    padding: 5px;
    color: white;
    background: #878787;
    border-radius: 50%;
  }
  .user,
  .closeBtn {
    font-size: 22px;
  }
  .closeBtn:hover,
  .active-link {
    color: #409eff;
  }
  .setting-block {
    cursor: pointer;
    position: absolute;
    left: 1em;
    bottom: 1em;
  }
}
</style>
