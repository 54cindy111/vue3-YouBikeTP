import * as $api from '@/lib/api'

export default {
  namespaced: true,
  state: {
    bikeList: [],
    areaList: []
  },
  getters: {
    bikeList: (state: any) => state.bikeList,
    areaList: (state: any) => state.areaList
  },
  mutations: {
    setBikeList: (state: any, data: any) => {
      state.bikeList = data
    },
    setAreaList: (state: any, data: any) => {
      state.areaList = data
    }
  },
  actions: {
    getBikeList: async ({ commit }: any) => {
      const res: any = await $api.ubike.getBike()
      const list: any = res.retVal
      const toBikeArray: any = []
      const toAreaArray: any = []
      for (const item in list) {
        list[item].tot = await parseInt(list[item].tot)
        list[item].sbi = await parseInt(list[item].sbi)
        toBikeArray.push(list[item])
        toAreaArray.push(list[item].sarea)
      }
      commit('setBikeList', toBikeArray)
      commit('setAreaList', toAreaArray)
    }
  }
}
