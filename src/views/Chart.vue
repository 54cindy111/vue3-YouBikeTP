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
import { ref, onMounted } from 'vue'

export default {
  name: 'Chart',
  setup() {
    const myChartRef = ref(null)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June']
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    }
    const config = {
      type: 'line',
      data,
      options: {}
    }
    onMounted(() => {
      myChartRef.value = new Chart(myChartRef.value, config)
    })
    return {
      myChartRef
    }
  }
}
</script>
