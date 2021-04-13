<template>
  <Chart
    v-if="chartData.type"
    class="chart"
    :title="chartTitle"
    :type="chartData.type"
    :labels="chartData.labels"
    :datasetsData="chartData.datasetsData"
    @hideChange="hideChange"
  />
  <div class="home">
    <i class="el-icon-search"></i>
    <span class="text">篩選地區</span>
    <el-select v-model="select" placeholder="Select" @change="selectArea">
      <el-option
        v-for="item in areaArr"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <BikeList v-if="!loading" :arr="bikeArr" @getSnoChart="getSnoData" />
  </div>
</template>

<script lang="ts">
import BikeList from '@/components/Table/bikeList.vue'
import Chart from '@/components/Chart.vue'
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: { BikeList, Chart },
  setup() {
    //init
    const store = useStore()
    const originBikeArr: any = computed(() => store.state.ubike.bikeList)
    const originArea: any = computed(() => store.state.ubike.areaList)

    //ref
    const chartTitle: any = ref('')
    const chartData: any = ref({
      type: '',
      labels: [],
      datasetsData: []
    })
    let getListID: any = 0
    const bikeArr: any = ref(Object.assign([], originBikeArr.value))
    const areaArr: any = ref([])
    const select: any = ref('全部')
    const loading = ref(false)

    const getBikeList = async () => {
      await store.dispatch('ubike/getBikeList')
      getListID = setInterval(async () => {
        await store.dispatch('ubike/getBikeList')
      }, 60000)
    }

    const getArea = async () => {
      areaArr.value = await originArea.value.filter(
        (item: any, index: any, arr: any) => {
          return arr.indexOf(item) === index
        }
      )
      areaArr.value.splice(0, 0, '全部')
    }
    const changeChartData = (data: any) => {
      chartData.value = data
    }
    const getAllAreaData = () => {
      const countList: any = []
      areaArr.value.forEach(async (x: any) => {
        const name = originArea.value.filter((y: any) => {
          return x === y
        })
        await countList.push(name.length)
      })
      chartTitle.value = ''
      chartData.value = {
        type: 'bar',
        datasetsData: countList,
        labels: areaArr
      }
    }
    const getAreaData = () => {
      let sbi = 0
      let tot = 0
      bikeArr.value.forEach(async (x: any) => {
        sbi = sbi + Number(x.sbi)
        tot = tot + Number(x.tot)
      })
      chartTitle.value = select.value
      chartData.value = {
        type: 'pie',
        labels: ['可借車輛', '可停空位'],
        datasetsData: [sbi, tot]
      }
    }
    const getSnoData = (d: any) => {
      chartTitle.value = d.sna
      chartData.value = {
        type: 'pie',
        labels: ['可借車輛', '可停空位'],
        datasetsData: [d.sbi, d.tot]
      }
    }

    const selectArea = (val: string) => {
      if (val !== '全部') {
        bikeArr.value = originBikeArr.value.filter((item: any) => {
          return item.sarea === val
        })
        getAreaData()
      } else {
        bikeArr.value = originBikeArr.value
        getAllAreaData()
      }
    }

    const hideChange = (val: any) => {
      loading.value = val
      console.log(loading)
    }

    onMounted(async () => {
      await getBikeList()
    })
    watch(
      originBikeArr,
      async () => {
        await getArea()
        selectArea(select.value)
      },
      { deep: true }
    )
    onUnmounted(() => {
      clearInterval(getListID)
    })

    return {
      loading,
      hideChange,
      getAllAreaData,
      chartTitle,
      chartData,
      areaArr,
      bikeArr,
      select,
      selectArea,
      getSnoData
    }
  }
}
</script>
<style scoped lang="scss">
.chart {
  width: 30%;
  margin: 0 auto 20px;
}
.el-icon-search,
.text {
  margin-right: 4px;
  font-size: 15px;
  color: #606266;
}
.el-select-dropdown__item.selected {
  color: $primary;
}
::v-deep {
  .el-select .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner {
    border-color: $primary;
  }
}
</style>
