const data = {
  labels: ['pie1', 'pie2', 'pie3', 'pie4', 'pie5'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 14, 5, 2, 20],
      backgroundColor: ['#eb9549', '#f6da77', '#79BFB2', '#F9A88E', '#E9665D']
    }
  ]
}
const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
}
export const pie = {
  data,
  config
}
