<template>
  <div class="delivery">
    <div class="container">
      <h1>Выберите способ доставки</h1>
      <div class="tabs">
        <div
          :class="['tab', { active: currentTab.value === tab.value }]"
          v-for="tab in tabs"
          :key="tab.value"
          @click="currentTab = tab"
        >
          {{ tab.name }}
        </div>
      </div>
      <keep-alive>
        <component v-bind:is="currentTab.value"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>

import Pickup from '@/components/DeliveryService/Pickup'
import Delivery from '@/components/DeliveryService/Delivery'

export default {
  name: 'DeliveryService',
  data: () => ({
    tabs: [
      {
        name: 'Доставка',
        value: 'Delivery'
      },
      {
        name: 'Самовывоз',
        value: 'Pickup'
      },
    ],
    currentTab: {
      name: 'Доставка',
      value: 'Delivery'
    },
  }),
  components: {
    Pickup,
    Delivery,
  },
}
</script>
<style lang="stylus" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

  h1
    color #000
    font-size 32px

  .delivery
    margin-top: 20px
    padding-top 55px
    font-family 'Montserrat', sans-serif
    max-width 1200px
    margin-left auto
    margin-right auto
    background-color #f6f6f6
    color #000
    .container
      width 996px
      padding 0px
  .tabs
    margin-top 48px
    height 64px
    display flex
    .tab
      width 142px
      display flex
      justify-content center
      align-items center
      background #edeeef

  >>> button
    border-radius 28px
    background-color rgb(0, 150, 218)
    width 208px
    height 56px
    display flex
    align-items center
    justify-content center
    color #fff
    font-size 14px
    font-family inherit
  >>> .btn-wrapper
    display flex
    justify-content flex-end
    margin-top 38px
    margin-bottom 26px
</style>