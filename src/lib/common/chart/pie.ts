const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 14, 5, 2, 20],
      backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
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
