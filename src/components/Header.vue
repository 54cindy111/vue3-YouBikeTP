<template>
  <el-row class="header" type="flex" justify="space-between">
    <el-row class="header">
      <el-button
        class="menu"
        icon="el-icon-s-fold"
        @click="changeSideMenu(true)"
      >
        {{ $t('menu') }}
      </el-button>
    </el-row>
  </el-row>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { mapGetters } from 'vuex'

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

    //function
    const changeSideMenu = (val: boolean) => {
      $bus.emit('change-sidemenu', val)
    }

    return {
      changeSideMenu
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  align-items: center;
}
.menu {
  margin-right: 16px;
}
.el-select {
  width: 100px;
}
</style>
