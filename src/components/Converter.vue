<template>
  <div class="hello">
    <div class="converter">
      <h1>Currency converter</h1>
      <div
        class="converter__row label__row"
        :class="[currencyAction == 'Sell' ? 'active-left' : 'active-right']"
      >
        <label :class="{'active': currencyAction == 'Sell'}">
          <input type="radio" id="one" value="Sell" v-model="currencyAction" />
          Sell
        </label>
        <label :class="{'active': currencyAction == 'Buy'}">
          <input type="radio" id="two" value="Buy" v-model="currencyAction" />
          Buy
        </label>
      </div>
      <div class="converter__row">
        <div class="converter__row__label">{{currencyAction}}</div>
        <input
          type="number"
          min="0"
          v-model="inputValueFrom"
          @input="direction = 'from'"
          class="converter__row__input"
        />
        <select name id v-model="fromCurrency" class="converter__row__select">
          <option
            v-for="(currency, key) in fromCurrencyArray.filter(x=>x!=toCurrency)"
            :key="key"
          >{{currency}}</option>
        </select>
      </div>
      <div class="converter__row">
        <div class="converter__row__label">for</div>
        <input
          type="number"
          min="0"
          v-model="inputValueTo"
          @input="direction = 'to'"
          class="converter__row__input"
        />
        <select name id v-model="toCurrency" class="converter__row__select">
          <option
            v-for="(currency, key) in toCurrencyArray.filter(x=>x!=fromCurrency)"
            :key="key"
          >{{currency}}</option>
        </select>
      </div>
      <div class="bottom_info">
        Every minute data update
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="error" v-if="error">{{error}}</div>
    </transition>
  </div>
</template>

<script>
// let auth = 'JYPd4Gijyo34gnLTQueiBPcJqrorP0X3P5dBEnH6ouE'
import Axios from "axios";

export default {
  data() {
    return {
      currencyWatcherTimer: null,
      rates: null,
      currencyAction: "Sell",
      fromCurrency: "BTC",
      toCurrency: "USD",
      inputValueFrom: null,
      inputValueTo: null,
      direction: "from",
      watchValue: true,
      error: null,
    };
  },
  watch: {
    rates(n,o){
      if(o){
        this.onOptionsChanged();
      }
    },
    fromCurrency() {
      this.onOptionsChanged();
    },
    toCurrency() {
      this.onOptionsChanged();
    },
    currencyAction() {
      this.onOptionsChanged();
    },
    inputValueFrom(n) {
      console.log(n);
      if (this.direction == "from" && this.watchValue) {
        this.inputValueTo = +this.rate(+n).toFixed(8);
      }
    },
    inputValueTo(n) {
      if (this.direction == "to" && this.watchValue) {
        this.inputValueFrom = +this.rate(+n).toFixed(8);
      }
    }
  },
  filters: {
    cuteZero(val) {
      return val == 0 ? 0 : val;
    }
  },
  computed: {
    fromCurrencyArray() {
      let currents = [];
      for (let key in this.rates) {
        //push unique values
        !currents.includes(key.substring(0, 3))
          ? currents.push(key.substring(0, 3))
          : false;
      }
      return currents;
    },
    toCurrencyArray() {
      let currents = [];
      for (let key in this.rates) {
        //push unique values
        !currents.includes(key.substring(3, 6))
          ? currents.push(key.substring(3, 6))
          : false;
      }
      return currents;
    },

    selectedRate() {
      return this.rates[this.fromCurrency + this.toCurrency][
        this.currencyAction.toLowerCase() + "_rate"
      ];
    }
  },
  methods: {
    onOptionsChanged() {
      if (!this.rates[this.fromCurrency + this.toCurrency]) {
        let tempCurrency = this.fromCurrency;
        this.fromCurrency = this.toCurrency;
        this.toCurrency = tempCurrency;

        let tempValue = this.inputValueFrom;
        this.inputValueFrom = this.inputValueTo;
        this.inputValueTo = tempValue;
      }
      if (this.inputValueFrom) {
        this.watchValue = false;
        this.direction = "from";
        this.inputValueTo = +this.rate(+this.inputValueFrom).toFixed(8);
        this.watchValue = true;
      }
    },
    getRates(){
      var proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = "https://business-sandbox.cryptopay.me/api/rates";

      Axios.get(proxyUrl + targetUrl)
        .then(resp => {
          this.rates = resp.data.data;
        })
        .catch(function(error) {
          this.error = error.response;
          setTimeout(() => {
            this.error = null;
          }, 5000);
        })
    },
    openCurrencyValueWatcher() {

        this.currencyWatcherTimer = setInterval(() => {
          this.getRates();
        }, 60000);
    
    },
    closeCurrencyValueWatcher() {
      clearInterval(this.currencyWatcherTimer);
    },
    rate(val) {
      console.log(val, this.direction);
      if (this.direction == "from") {
        return (val * (this.selectedRate * 10000)) / 10000;
      }
      if (this.direction == "to") {
        return ((val*10000) / this.selectedRate) / 10000;
      }
    },
  },
  beforeDestroy() {
    console.log('clearTimeout')
    this.closeCurrencyValueWatcher();
  },
  mounted() {
    this.getRates();
    this.openCurrencyValueWatcher();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .error
    color: white;
    background-color: #ff5757;
    position: fixed;
    padding: 20px;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    word-break: break-all;
  .converter
    border 3px solid #155ace
    padding 60px
    width 310px
    margin 40px auto 0
    color #155ace
    &__row
      display flex
      margin-bottom 14px
      &__label
        width 38px
        display flex
        align-items center
        font-size 18px
        
      &__input
        border 3px solid #155ace
        padding 6px 10px
      &__select
        color #155ace
        padding 4px 10px
        border 3px solid #155ace
        border-left none
        cursor pointer
        width 80px
  .label__row
    position relative
    border-radius 4px
    overflow hidden
    border
    &:after
      content ''
      display block
      width 50%
      height 100%
      position absolute
      background-color #155ace
      z-index -1
      transition transform .3s cubic-bezier(0.36, -0.54, 0.57, 1.29)
    &.active-right:after 
      transform translateX(100%)
    input
      display none
    label
      cursor pointer
      width 50%
      color #fff
      padding 6px 0px
      position relative
      overflow hidden
      color #155ace
      transition color .3s
      &.active
        color #fff
  .bottom_info
    font-size: 12px
</style>
