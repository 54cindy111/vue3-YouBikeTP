<template>
  <Loading />
  <!-- <SideMenu /> -->
  <div class="MainLayout">
    <Header />
    <div class="view">
      <router-view :key="fullPath"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
// import SideMenu from '@/components/SideMenu.vue'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    Header,
    // SideMenu,
    Loading
  },
  setup() {
    const route = useRoute()
    const fullPath = computed(() => route.fullPath)
    return { fullPath }
  }
}
</script>

<style lang="scss" scoped>
.MainLayout {
  padding: 0 16px;
  max-width: 1200px;
  margin: 0 auto;
}
.view {
  margin-top: 16px;
}
</style>
