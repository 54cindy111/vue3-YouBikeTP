import * as $api from '@/lib/api'

export default {
  namespaced: true,
  state: {
    bikeList: []
  },
  getters: {
    bikeList: (state: any) => state.bikeList
  },
  mutations: {
    setBikeList: (state: any, data: any) => {
      state.bikeList = data
    }
  },
  actions: {
    getBikeList: async ({ commit }: any) => {
      const res: any = await $api.ubike.getBike()
      commit('setBikeList', res.retVal)
    }
  }
}
