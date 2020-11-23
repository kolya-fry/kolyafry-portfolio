<template>
  <div>
    <transition name="fade" mode="out-in">
      <apexchart type="candlestick" height="350" :options="chartOptions" :series="dataTable" v-if="dataTable[0].data"></apexchart>
      <div class="loading" v-else></div>
      <div class="error" v-if="error">{{error}}</div>
    </transition>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import Axios from "axios";
export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      dataTable: [{name: 'series-1', data: null}],
      error: null,
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350
        },
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
  },
  methods: {
    test() {
      let tempArr = [];

      Axios(
        "https://api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin"
      ).then(resp =>{
        resp.data.data.forEach(x=>{
          console.log(x)
          tempArr.push({
            x: new Date(x.period),
            y:[x.open,x.high,x.low,x.close]
          })
          //  {
          //     x: new Date(1538884800000),
          //     y: [6604.98, 6606, 6604.07, 6606]
          //   }
        })
      }).then(()=>{
        this.dataTable[0].data = tempArr
      }).catch(function(error) {
        this.error = error.response;
        setTimeout(() => {
          this.error = null;
        }, 5000);
      });
    }
  },
  mounted() {
    this.test();
  }
};
</script>
<style lang="stylus">
  .error
    color: white;
    background-color: #ff5757;
    position: fixed;
    padding: 20px;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    word-break: break-all;
  .loading
    position: absolute;
    width: 40px;
    height: 40px;
    border-left: 10px solid #033eff;
    border-right: 10px solid #ff0000;
    border-top: 4px solid #00b700;
    border-bottom: 4px solid #fff500;
    border-radius: 50%;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    animation: rotate 1s infinite cubic-bezier(0.68, -0.55, 0.42, 1.6);
  @keyframes rotate
    from
      transform: translateX(-50%) rotate(0deg)

    to
      transform: translateX(-50%) rotate(360deg)

</style>