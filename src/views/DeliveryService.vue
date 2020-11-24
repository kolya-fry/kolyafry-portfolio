<template>
  <div>
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

    <div class="delivery delivery-mobile">
      <div class="container">
        <h1>Выберите способ доставки</h1>
        <v-collapse-group :onlyOneActive="true">
          <v-collapse-wrapper
            v-for="tab in tabs"
            :key="tab.value"
          >
            <div class="header" v-collapse-toggle>
              {{ tab.name }}
            </div>
            <div class="my-content" v-collapse-content>
              <keep-alive>
                <component v-bind:is="tab.value"></component>
              </keep-alive>
            </div>
          </v-collapse-wrapper>
        </v-collapse-group>
      </div>
    </div>
  </div>
</template>
<script>

import Pickup from '@/components/DeliveryService/Pickup'
import Delivery from '@/components/DeliveryService/Delivery'
import VueCollapse from 'vue2-collapse'

import Vue from 'vue'
Vue.use(VueCollapse)
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
  .v-collapse-content
    display none
  .v-collapse-content-end
    display block
  h1
    color #000
    font-size 32px
    @media screen and (max-width: 768px)
      font-size 24px
      height 116px
      line-height 116px
    @media screen and (max-width: 410px)
      font-size 18px
  .delivery-mobile
    display none
    @media screen and (max-width: 768px)
      display block
  .delivery
    margin-top: 20px
    padding-top 55px
    font-family 'Montserrat', sans-serif
    max-width 1200px
    margin-left auto
    margin-right auto
    background-color #f6f6f6
    color #000
    @media screen and (max-width: 769px)
      padding-top 0
      &:not(.delivery-mobile)
        display none
    .container
      max-width 996px
      width 100%
      padding 0px
      padding-bottom 100px
      @media screen and (max-width: 1064px)
        padding-left 16px
        padding-right 16px
  .tabs
    margin-top 48px
    height 64px
    display flex
    width 333px
    justify-content space-between
    .tab
      width: 155px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #edeeef;
      cursor: pointer;
      position: relative;
      padding-left: 10px;
      transition background .3s
      border-radius: 7px 0 0 0;
      &:after
        content: '';
        display: block;
        width: 60px;
        height: 100%;
        transform: skewX(24deg);
        background: #edeeef;
        right: -34px;
        top: 0;
        z-index: 1;
        position: absolute;
        border-radius: 0 11px 0 0;
        box-shadow: 2px 0px 0px 0px #bdbdbd;
        transition background .3s
      &.active
        background #fff
        &:after
          background #fff
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
  .vc-collapse
    .v-collapse-toggler
      width: 100%;
      height: 51px;
      display: flex;
      align-items: center;
      background: #fff;
      padding-left: 14px;
      color: #0096da;
    .v-collapse-content
      border-top 1px solid #dadef0
</style>