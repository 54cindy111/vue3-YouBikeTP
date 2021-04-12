<template>
  <Chart class="chart" :labels="[]" :datasetsData="[]" />
</template>

<script lang="ts">
import Chart from '@/components/Chart.vue'

export default {
  name: 'Chart',
  components: { Chart }
}
</script>
