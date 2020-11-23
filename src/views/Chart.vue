<template>
  <div>
    <Converter msg="Welcome to Your Vue.js App"/>
    <LiveRates/>
  </div>
</template>

<script>
import LiveRates from '@/components/LiveRates.vue'
import Converter from '@/components/Converter.vue'

export default {
  name: 'Chart',
  components: {
    LiveRates,
    Converter
  }
}
</script>
