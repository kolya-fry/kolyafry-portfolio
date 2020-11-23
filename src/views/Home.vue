<template>
  <div>
    <div class="section main-section">
      <div class="container">
        <h1>
          .FRONTEND-DEVELOPER
        </h1>
      </div>
    </div>
    <div class="section my-section">
      <img :src="myPhoto" alt="Nikolay Buzlov" class="my-photo">
    </div>

  </div>
</template>
<script>

import myPhoto from '@/assets/nikolay_photo.png'
export default {
  name: 'Home',
  data: () => ({
    myPhoto: myPhoto
  })
}
</script>
<style lang="stylus" scoped>
  .main-section
    border-bottom 1px solid
    display flex
    align-items center
    height 500px
    h1
      text-align center
      font-size 70px
      font-weight bold
  .my-photo
    width 300px
    height 300px
    margin-top 150px
    margin-left auto
    margin-right auto
    display block
</style>