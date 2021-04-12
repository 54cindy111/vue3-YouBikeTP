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
      const list: any = res.retVal
      for (const item in list) {
        list[item].tot = parseInt(list[item].tot)
        list[item].sbi = parseInt(list[item].sbi)
      }
      commit('setBikeList', list)
    }
  }
}
