<template>
  <div class="page">
    <div class="container">
      <LHeader/>
      <router-view/>
      <!-- <LFooter /> -->
    </div>
  </div>
</template>
<script>

import LHeader from '@/components/LHeader'
// import LFooter from '@/components/LFooter'
// import mapGetters from 'vuex'

export default {
  name: 'MainLayout',
  components: {
    LHeader,
    // LFooter
  },
  // computed: {
  //   ...mapGetters(['user'])
  // },
  // async mounted() {
  //   if (!this.user) {
  //     await this.$store.dispatch('fetchUser')
  //   }
  // },
};
</script>
<style lang="stylus">

</style>
