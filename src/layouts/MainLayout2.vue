<template>
  <div>
    <div class="app-main-layout">
      <Navbar @dehaze-click="navIsOpen = !navIsOpen" />
      <Sidebar v-model="navIsOpen"/>

      <main class="app-content" :class="{full: !navIsOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'main-layout',
  data: () =>({
    navIsOpen: true,
  }),
  components: {
    Navbar,
    Sidebar
  },
  async mounted(){
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>
