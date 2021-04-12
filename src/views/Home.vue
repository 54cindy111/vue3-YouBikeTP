<template>
  <div class="home">{{ $t('greet') }}~!</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      personal: 'persistedState/personal'
    })
  }
}
</script>
