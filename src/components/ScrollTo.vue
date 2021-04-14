<template>
  <div v-if="goUp" class="scroll-btn" @click="scrollTo">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>

<script lang="ts">
import { watch, ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Scroll To',
  setup() {
    const distance = ref(0)
    const goUp = ref(false)
    // const goDown = ref(true)

    const detectScroll = () => {
      distance.value = window.scrollY
    }

    const handowArrow = () => {
      if (distance.value > 300) {
        goUp.value = true
        // goDown.value = false
      } else {
        goUp.value = false
        // goDown.value = true
      }
    }

    const scrollTo = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (goUp.value) {
        const step = distance.value / 30
        const jump = () => {
          if (distance.value > 0) {
            distance.value -= step
            window.scrollTo(0, distance.value)
          } else {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            clearInterval(scrollID)
          }
        }
        const scrollID = setInterval(jump, 10)
      } else {
        const step = (scrollHeight - distance.value) / 30
        const jump = () => {
          if (scrollHeight > distance.value) {
            distance.value += step
            window.scrollTo(scrollHeight, distance.value)
          } else {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            clearInterval(scrollID)
          }
        }
        const scrollID = setInterval(jump, 10)
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', detectScroll)
      detectScroll()
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', detectScroll)
    })

    watch(distance, handowArrow)

    return {
      goUp,
      // goDown,
      scrollTo
    }
  }
}
</script>
<style scoped lang="scss">
.scroll-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
  background-color: $primary;
}
.el-icon-arrow-up {
  padding: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}
</style>
