<template>
  <div class="avatar-wrapper">
    <img :src="userAvatar" :alt="userName" :title="userName">
  </div>
</template>
<script>

export default {
  name: 'UserAvatar',
  computed: {
    userAvatar () {
      return `https://robohash.org/${this.userName}?size=200x200&bgset=bg2`
    }
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    userAvatarSrc: {
      type: String,
      required: false,
    }
  }
}
</script>
<style lang="stylus">
  .avatar-wrapper
    width 60px
    height 60px
    min-width 60px
    border 3px solid gold
    margin-right 20px
    border-radius 50%
    overflow hidden
    img
      width 100%
      height 100%
</style>