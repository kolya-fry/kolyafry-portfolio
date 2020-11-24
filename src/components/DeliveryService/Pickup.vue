<template>
  <div class="map-wrapper">
    <div class="mapPoints">
      <div class="mapPoint" v-for="mapPoint in mapPoints" :key="mapPoint.id">
        <label><input type="radio" :value="mapPoint.id" v-model="mapPointActive">{{mapPoint.value}}</label>
      </div>
    </div>
    <div class="map">
      <yandex-map :settings="mapSettings" :coords="[55.75399400, 37.62209300]" :zoom="10" :controls="['zoomControl']" ref="map">
        <div v-for="mapPoint in mapPoints" :key="mapPoint.id">
          <ymap-marker
            :markerId="mapPoint.id"
            v-if="mapPoint.id === mapPointActive"
            :coords="mapPoint.coords"
            :hint-content="mapPoint.value"/>
        </div>
      </yandex-map>
    </div>
    <div class="btn-wrapper">
      <button type="submit">Отправить</button>
    </div>
  </div>
</template>
<script>

const mapSettings = {
  apiKey: '1cf25807-9180-454d-89eb-c3ae8fbdff84',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  name: 'PickUp',
  data: () => ({
    mapPoints: [
      {
        id: 1,
        value: 'Пункт Выдачи заказов Песчаная улица, дом 13',
        coords: [55.79956388, 37.51514796]
      },
      {
        id: 2,
        value: 'Пункт Выдачи заказов Подсосенский переулок, 11',
        coords: [55.75767253, 37.65402202]
      }
    ],
    mapSettings: mapSettings,
    mapPointActive: null
  }),
  components: { yandexMap, ymapMarker },
}
</script>

<style lang="stylus" scoped>
  .map
    height 548px
    .ymap-container
      height 100%
      width 100%
  .mapPoints
    display flex
    justify-content space-between
    margin 35px 0
    flex-wrap wrap
    @media screen and (max-width: 973px)
      & > .mapPoint:first-child
        margin-bottom 10px
  .map-wrapper
    padding-left 33px
    padding-right 33px
    padding-bottom 33px
    background-color #fff
    padding-top 1px
</style>