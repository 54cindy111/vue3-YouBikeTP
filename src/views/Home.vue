<template>
  <Chart
    v-if="chartData.type"
    class="chart"
    :type="chartData.type"
    :labels="chartData.labels"
    :datasetsData="chartData.datasetsData"
  />
  <div class="home">
    <i class="el-icon-search"></i>
    <span class="text">篩選地區</span>
    <el-select v-model="select" placeholder="Select" @change="selectArea">
      <el-option
        v-for="item in areaArray"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <BikeList :arr="bikeArr" @getSnoChart="getSnoData" />
  </div>
</template>

<script lang="ts">
import BikeList from '@/components/Table/bikeList.vue'
import Chart from '@/components/Chart.vue'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: { BikeList, Chart },
  setup() {
    //init
    const store = useStore()
    const bikeObj: any = computed(() => store.state.ubike.bikeList)

    //ref
    const originArea: any = ref([])
    const areaArray: any = ref([])
    const originBikeArr: any = ref([])
    const chartData: any = ref({
      type: '',
      labels: [],
      datasetsData: []
    })
    const bikeArr: any = ref([])
    const select: any = ref('全部')

    const getArray = () => {
      for (const i in bikeObj.value) {
        originBikeArr.value.push(bikeObj.value[i])
        originArea.value.push(bikeObj.value[i].sarea)
      }
      bikeArr.value = originBikeArr.value
    }
    const getArea = async () => {
      areaArray.value = await originArea.value.filter(
        (item: any, index: any, arr: any) => {
          return arr.indexOf(item) === index
        }
      )
      areaArray.value.splice(0, 0, '全部')
    }
    const getAllAreaData = () => {
      const countList: any = []
      areaArray.value.forEach(async (x: any) => {
        const name = originArea.value.filter((y: any) => {
          return x === y
        })
        await countList.push(name.length)
      })
      chartData.value = {
        type: 'bar',
        datasetsData: countList,
        labels: areaArray
      }
    }
    const getAreaData = () => {
      let sbi = 0
      let tot = 0
      bikeArr.value.forEach(async (x: any) => {
        sbi = sbi + Number(x.sbi)
        tot = tot + Number(x.tot)
      })
      chartData.value = {
        type: 'pie',
        labels: ['可借車輛', '可停空位'],
        datasetsData: [sbi, tot]
      }
    }
    const getSnoData = (d: any) => {
      console.log([d.sbi, d.tot])
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

    onMounted(async () => {
      await store.dispatch('ubike/getBikeList')
      await getArray()
      await getArea()
      getAllAreaData()
    })

    return {
      getAllAreaData,
      chartData,
      areaArray,
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
  color: #f3780b;
}
::v-deep {
  .el-select .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #eb9549;
  }
}
</style>
