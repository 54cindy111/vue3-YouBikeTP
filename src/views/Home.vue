<template>
  <Chart
    v-if="allAreaData.labels"
    class="chart"
    :type="'pie'"
    :labels="allAreaData.labels"
    :datasetsData="allAreaData.datasetsData"
  />
  <div class="home">
    <el-select
      clearable
      v-model="select"
      placeholder="Select"
      @change="selectArea"
    >
      <el-option
        v-for="item in areaArray"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <BikeList :arr="bikeArr" />
  </div>
</template>

<script lang="ts">
import BikeList from '@/components/Table/bikeList.vue'
import Chart from '@/components/Chart.vue'
import { bike } from '@/lib/common/bike'
import { ref } from 'vue'

export default {
  name: 'Home',
  components: { BikeList, Chart },
  setup() {
    const originArea: any = ref([])
    const areaArray: any = ref([])
    const originBikeArr: any = ref([])
    const allAreaData: any = ref({
      labels: [],
      datasetsData: []
    })
    const bikeArr: any = ref([])
    const bikeObj: any = bike.retVal
    const select: any = ref('')

    for (const i in bikeObj) {
      originBikeArr.value.push(bikeObj[i])
      bikeArr.value = originBikeArr.value
      originArea.value.push(bikeObj[i].sarea)
    }
    areaArray.value = originArea.value.filter(
      (item: any, index: any, arr: any) => {
        return arr.indexOf(item) === index
      }
    )
    //
    const getAllAreaData = () => {
      const countList: any = []
      areaArray.value.forEach(async (x: any) => {
        const name = originArea.value.filter((y: any) => {
          return x === y
        })
        await countList.push(name.length)
      })
      allAreaData.value = {
        datasetsData: countList,
        labels: areaArray
      }
    }
    // getAllAreaData()
    //
    const selectArea = (val: string) => {
      getAllAreaData()
      if (val) {
        bikeArr.value = originBikeArr.value.filter((item: any) => {
          return item.sarea === val
        })
      } else {
        bikeArr.value = originBikeArr.value
      }
    }

    return {
      getAllAreaData,
      allAreaData,
      areaArray,
      bikeArr,
      select,
      selectArea
    }
  }
}
</script>
<style scoped lang="scss">
.chart {
  width: 30%;
}
</style>
