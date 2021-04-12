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
import { ref, onMounted, toRefs } from 'vue'

export default {
  name: 'Chart',
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    datasetsData: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any) {
    const myChartRef = ref(null)
    const { labels, datasetsData } = toRefs(props)

    pie.data.labels = labels.value
    pie.data.datasets[0].data = datasetsData.value
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
