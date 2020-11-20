<template>
  <div class="auth-wrapper">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
};
</script>

<style lang="stylus" scoped>
.auth-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #004d40, #00bfa5);
}
</style>

<script>
import messages from '@/utils/messages'
import mapGetters from 'vuex'

export default {
  name: 'EmptyLayout',
  computed: {
    // ...mapGetters(['error'])
  },
  watch: {
    error(fbError) {
      console.error(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style>

</style>