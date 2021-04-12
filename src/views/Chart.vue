<template>
  <div class="user">
    <div>Chart</div>
    <div>
      <canvas ref="myChartRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto'
import { pie } from '@/lib/common/chart'
import { ref, onMounted } from 'vue'

export default {
  name: 'Chart',
  setup() {
    const myChartRef = ref(null)
    const config = pie.config
    onMounted(() => {
      myChartRef.value = new Chart(myChartRef.value, config)
    })
    return {
      myChartRef
    }
  }
}
</script>
