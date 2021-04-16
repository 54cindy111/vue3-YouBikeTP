<template>
  <div id="map"></div>
</template>

<script lang="ts">
import leaflet from 'leaflet'
import { ref, onMounted, toRefs, watch, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Map',
  props: {
    mapData: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any, { emit }: any) {
    //init
    const store = useStore()
    //state
    const lang: any = computed(() => store.state.app.lang)
    const Map = ref({})
    const { mapData } = toRefs(props)

    const addPopup = (data: any) => {
      if (mapData.value.length) {
        data = {
          lat: mapData.value[0].lat,
          lng: mapData.value[0].lng,
          sna:
            lang.value === 'ch' ? mapData.value[0].sna : mapData.value[0].snaen,
          sbi: mapData.value[0].sbi,
          tot: mapData.value[0].tot
        }
      }
      const map: any = Map.value
      map.flyTo(new leaflet.LatLng(data.lat, data.lng), 15)
      leaflet
        .marker([data.lat, data.lng])
        .addTo(Map.value)
        .bindPopup(
          `${data.sna}<br>
        <span style="color: #eb9549">
        ${lang.value === 'ch' ? '可借車輛' : 'Can be by vehicle'}:${data.sbi}
        </span><br>
        <span style="color: #f6da77">
        ${lang.value === 'ch' ? '可停空位' : 'Can be stopped'}:${data.tot}
        </span>
        `
        )
        .openPopup()
    }
    const getMap = () => {
      const fistVal = {
        lat: 25.041956,
        lng: 121.508791
      }
      //
      Map.value = leaflet.map('map', {
        center: [fistVal.lat, fistVal.lng],
        zoom: 18
      })
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '',
          maxZoom: 18
        })
        .addTo(Map.value)
    }

    watch(mapData, addPopup, { deep: true })

    onMounted(() => {
      getMap()
    })
    return { Map }
  }
}
</script>
<style scoped lang="scss"></style>
