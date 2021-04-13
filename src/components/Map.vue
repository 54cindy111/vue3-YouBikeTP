<template>
  <div id="map"></div>
</template>

<script lang="ts">
import leaflet from 'leaflet'
import { ref, onMounted, toRefs, watch } from 'vue'

export default {
  name: 'Map',
  props: {
    mapData: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any, { emit }: any) {
    const Map = ref({})
    const { mapData } = toRefs(props)

    const addPopup = (data: any) => {
      if (mapData.value.length) {
        data = {
          lat: mapData.value[0].lat,
          lng: mapData.value[0].lng,
          sna: mapData.value[0].sna
        }
      }
      leaflet
        .marker([data.lat, data.lng])
        .addTo(Map.value)
        .bindPopup(data.sna)
        .openPopup()
    }
    const getMap = () => {
      let fistVal = {
        lat: 25.041956,
        lng: 121.508791,
        sna: 'A pretty CSS3 popup.<br> Easily customizable.'
      }
      if (mapData.value.length) {
        fistVal = {
          lat: mapData.value[0].lat,
          lng: mapData.value[0].lng,
          sna: mapData.value[0].sna
        }
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
