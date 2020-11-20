<template>
  <div id="app" :class="`${getTheme}-theme`">
    <div class="alfa">альфа-версия</div>
    <component :is="layout"/>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    ...mapGetters(['getTheme']),
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`
    }
  }
}
</script>

<style lang="stylus">
@import './styles/reset.css';
@import './styles/main.styl';
</style>
