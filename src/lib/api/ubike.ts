import request from '@/plugins/request'

function getBike() {
  return request({
    url: '/YouBikeTP.json',
    method: 'GET'
  })
}

export const ubike = {
  getBike
}
