<template>
  <div class="chart">
    <div>{{ title }} {{ $t('chart') }}</div>
    <div>
      <canvas ref="myChartRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto'
import * as _chartType from '@/lib/common/chart'
import { ref, onMounted, toRefs, watch } from 'vue'

export default {
  name: 'Chart',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => []
    },
    datasetsData: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any, { emit }: any) {
    let _rChart = false
    const myChartRef = ref(null)
    const { labels, datasetsData, type } = toRefs(props)

    const hideChange = (val: any) => {
      _rChart = val
      emit('hideChange', _rChart)
    }

    const getConfig = () => {
      const chartType: any = Object.assign({}, _chartType)
      chartType[type.value].data.labels = labels.value
      chartType[type.value].data.datasets[0].data = datasetsData.value
      const config = chartType[type.value].config
      return config
    }
    const newChart = async () => {
      hideChange(true)
      window.setTimeout(() => hideChange(false), 1000)
      const vv: any = myChartRef.value
      myChartRef.value = await new Chart(vv, getConfig())
    }
    const destroyChart = async () => {
      const vv: any = myChartRef.value
      await vv.destroy()
    }
    const changeChart = async () => {
      await destroyChart()
      await newChart()
    }

    watch(labels, changeChart, { deep: true })

    onMounted(() => {
      newChart()
    })
    return {
      myChartRef
    }
  }
}
</script>
