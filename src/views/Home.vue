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
    <div class="search">
      <i class="el-icon-search"></i>
      <span>{{ $t('search') }}</span>
    </div>
    <el-row type="flex" align="middle" style="margin-bottom: 10px;">
      <el-col class="text" :span="2">{{ $t('area') }}</el-col>
      <el-select
        value-key="ch"
        v-model="select"
        :placeholder="$t('select')"
        @change="search"
      >
        <el-option
          v-for="item in areaArr"
          :key="item.ch"
          :label="lang === 'ch' ? item.ch : item.en"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-row>
    <el-row type="flex" align="middle" style="margin-bottom: 10px;">
      <el-col class="text" :span="2">{{ $t('keyword') }}</el-col>
      <el-col :span="22">
        <el-input
          v-model="input"
          :placeholder="`${$t('input')} ${$t('keyword')}`"
          @change="search"
        ></el-input>
      </el-col>
    </el-row>
    <Map class="map" :mapData="mapData" />
    <BikeList v-if="!loading" :arr="bikeArr" @getSnoChart="getSnoData" />
  </div>
</template>

<script lang="ts">
import BikeList from '@/components/Table/bikeList.vue'
import Chart from '@/components/Chart.vue'
import Map from '@/components/Map.vue'
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: { BikeList, Chart, Map },
  setup() {
    //init
    const store = useStore()
    const originBikeArr: any = computed(() => store.state.ubike.bikeList)
    const originArea: any = computed(() => store.state.ubike.areaList)
    const lang: any = computed(() => store.state.app.lang)

    //ref
    const chartTitle: any = ref({
      ch: '',
      en: ''
    })
    const chartData: any = ref({
      type: '',
      labels: [],
      datasetsData: []
    })
    let getListID: any = 0
    const bikeArr: any = ref(Object.assign([], originBikeArr.value))
    const areaArr: any = ref([])
    const input: any = ref('')
    const select: any = ref({
      ch: '',
      en: ''
    })
    const loading = ref(false)
    const mapData: any = ref([])

    const getBikeList = async () => {
      await store.dispatch('ubike/getBikeList')
      getListID = setInterval(async () => {
        await store.dispatch('ubike/getBikeList')
      }, 60000)
    }

    const getArea = async () => {
      const set = new Set()
      areaArr.value = await originArea.value.filter((item: any) =>
        !set.has(item.ch) ? set.add(item.ch) : false
      )
      areaArr.value.splice(0, 0, { ch: '全部', en: 'All' })
    }
    const changeChartData = (data: any) => {
      chartData.value = data
    }
    const getAllAreaData = () => {
      const countList: any = []
      let labelList: any = []
      areaArr.value.forEach(async (x: any) => {
        const name = originArea.value.filter((y: any) => {
          return x.ch === y.ch
        })
        await countList.push(name.length)
      })
      chartTitle.value = {
        ch: '',
        en: ''
      }
      labelList = areaArr.value.map((i: any) => {
        return i[lang.value]
      })
      chartData.value = {
        type: 'bar',
        datasetsData: countList,
        labels: labelList
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
        labels:
          lang.value === 'ch'
            ? ['可借車輛', '可停空位']
            : ['Can be by vehicle', 'Can be stopped'],
        datasetsData: [sbi, tot]
      }
    }
    const getSnoData = (d: any) => {
      chartTitle.value = {
        ch: d.sna,
        en: d.snaen
      }
      chartData.value = {
        type: 'pie',
        labels:
          lang.value === 'ch'
            ? ['可借車輛', '可停空位']
            : ['Can be by vehicle', 'Can be stopped'],
        datasetsData: [d.sbi, d.tot]
      }
      mapData.value = [d]
    }

    const isHasText = (item: any) => {
      if (lang.value === 'ch') {
        return (
          item.sna.search(input.value) !== -1 ||
          item.ar.search(input.value) !== -1
        )
      } else {
        const site = item.snaen.toLowerCase()
        const area = item.aren.toLowerCase()
        return (
          site.search(input.value.toLowerCase()) !== -1 ||
          area.search(input.value.toLowerCase()) !== -1
        )
      }
    }

    const search = () => {
      if (select.value.ch !== '全部' && select.value.ch !== '') {
        bikeArr.value = originBikeArr.value.filter((item: any) => {
          return isHasText(item) && item.sarea === select.value.ch
        })
        getAreaData()
      } else if (input.value) {
        bikeArr.value = originBikeArr.value.filter((item: any) => {
          return isHasText(item)
        })
        getAreaData()
      } else {
        bikeArr.value = originBikeArr.value
        getAllAreaData()
      }
    }

    const hideChange = (val: any) => {
      loading.value = val
    }

    onMounted(async () => {
      await getBikeList()
    })

    watch(
      originBikeArr,
      async () => {
        await getArea()
        search()
      },
      { deep: true }
    )
    watch(lang, search)

    onUnmounted(() => {
      clearInterval(getListID)
    })

    return {
      loading,
      lang,
      hideChange,
      getAllAreaData,
      chartTitle,
      chartData,
      areaArr,
      bikeArr,
      select,
      input,
      search,
      getSnoData,
      mapData
    }
  }
}
</script>
<style scoped lang="scss">
.chart {
  width: 30%;
  margin: 0 auto 20px;
}
.map {
  position: relative;
  height: 30vh;
}
.home {
  text-align: left;
}
.el-icon-search {
  margin-right: 8px;
}
.search {
  margin-bottom: 10px;
  font-size: 16px;
  color: #606266;
}
.text {
  font-size: 14px;
  color: #606266;
}
</style>
