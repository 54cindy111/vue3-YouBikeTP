<template>
  <div class="chart">
    <div class="title">
      {{ lang === 'ch' ? title.ch : title.en }} {{ $t('chart') }}
    </div>
    <div>
      <canvas ref="myChartRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto'
import * as _chartType from '@/lib/common/chart'
import i18n from '@/plugins/i18nPlugin'
import { ref, onMounted, toRefs, watch } from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Chart',
  computed: {
    ...mapGetters({
      lang: 'app/lang'
    })
  },
  props: {
    title: {
      type: Object
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
      if (type.value === 'bar') {
        chartType[type.value].data.datasets[0].label = i18n.global.t('site')
      }
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

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
</style>
