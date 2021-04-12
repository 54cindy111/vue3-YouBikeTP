const labels = ['January', 'February', 'March', 'April', 'May', 'June']
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    },
    {
      label: 'My First dataset2',
      backgroundColor: 'rgb(255, 99, 6)',
      borderColor: 'rgb(255, 99, 6)',
      data: [0, 13, 7, 2, 25, 30, 49]
    }
  ]
}
const config = {
  type: 'line',
  data,
  options: {}
}
export const line = {
  data,
  config
}
