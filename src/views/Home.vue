<template>
  <div class="home">
    <el-select v-model="select" placeholder="Select" @change="selectArea">
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
import { bike } from '@/lib/common/bike'
import { ref } from 'vue'

export default {
  name: 'Home',
  components: { BikeList },
  setup() {
    const originArea: any = ref([])
    const areaArray: any = ref([])
    const originBikeArr: any = ref([])
    const bikeArr: any = ref([])
    const bikeObj: any = bike.retVal
    const select: any = ref('全部')

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
    areaArray.value.splice(0, 0, '全部')

    const selectArea = (val: string) => {
      if (val !== '全部') {
        bikeArr.value = originBikeArr.value.filter((item: any) => {
          return item.sarea === val
        })
      } else {
        bikeArr.value = originBikeArr.value
      }
    }

    return {
      areaArray,
      bikeArr,
      select,
      selectArea
    }
  }
}
</script>
