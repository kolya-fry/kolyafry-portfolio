<template>
  <div class="background">
    <div class="test"></div>
    <div class="logo"></div>
    <div class="austin"></div>
    <div class="old_stair" v-if="oldStairShow"></div>
    <div class="new_stair" v-if="preSelected" :class="'newStair_' + preSelected"></div>
    <div class="hammer" :class="{hidden: !hammerShow}" @click="hammerHandler"></div>
    <div class="menu" :class="{hidden: !menuShow}">
      <div class="menu_round menu__new_stair menu__new_stair--1" @click="preSelect(1)" :class="{preselected: preSelected == 1}"></div>
      <div class="menu_round menu__new_stair menu__new_stair--2" @click="preSelect(2)" :class="{preselected: preSelected == 2}"></div>
      <div class="menu_round menu__new_stair menu__new_stair--3" @click="preSelect(3)" :class="{preselected: preSelected == 3}"></div>
    </div>
    <div class="ok_row" :class="{hidden: !preSelected}">
      <div class="ok_wrapper" :class="'choise_'+preSelected">
        <div class="ok" @click="confirm(preSelected)"></div>
      </div>
    </div>
    <div class="plant"></div>
    <div class="button"></div>
    <div class="finish" :class="{hidden: !finish}">
      <div class="finish_window">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      oldStairShow: true,
      hammerShow:false,
      menuShow: false,
      preSelected:null,
      selected: null,
      finish: false,
    }
  },
  methods:{
    confirm() {
      // this.selected = this.preSelected;
      this.finish = true;
    },
    preSelect(id) {
      this.oldStairShow = false;
      this.preSelected = id;
    },
    showHammer(){
      setTimeout(() => {
        this.hammerShow = true;
      }, 3000);
    },
    hammerHandler(){
      this.menuShow = true;
      this.hammerShow = false;
    }
  },
  mounted(){
    this.showHammer();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body {
  padding: 0;
  margin:0;
}
  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .finish {
    transition: opacity .4s;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-image: url('./../images/Layer3.png');
    background-repeat: no-repeat;
  }

  .finish_window {
    left: 50%;
    transform: translateX(-50%);
    width: 611px;
    top: 53px;
    position: absolute;
    height: 395px;
    background-image: url('./../images/Layer2.png');
    background-repeat: no-repeat;
  }

  .logo {
    background-image: url('./../images/logo.png');
    background-repeat: no-repeat;
    position: absolute;
    width: 304px;
    height: 105px;
    cursor: pointer;
    left: 30px;
    top: 3px;
  }

  .austin {
    background-image: url('./../images/austin.png');
    background-repeat: no-repeat;
    position: absolute;
    width: 187px;
    height: 306px;
    left: 696px;
    top: 113px;
    background-repeat: no-repeat;
    /* cursor: pointer; */
    -webkit-animation: man 2s infinite;
    animation: man 2s infinite;
  }

  .ok_row {
    width: 155px;
    position: absolute;
    right: 325px;
    top: 116px;

  }

  .ok {
    background-image: url('./../images/ok.png');
    background-repeat: no-repeat;
    position: relative;
    width: 157px;
    height: 99px;
    cursor: pointer;
    animation: pulse 2s infinite;
  }

  .ok_wrapper {
    transition: transform .5s ease-in-out;
    transform: translateX(0);
  }

  .ok_wrapper.choise_1 {
    transform: translateX(0);
  }
  .ok_wrapper.choise_2 {
    transform: translateX(130px);
  }
  .ok_wrapper.choise_3 {
    transform: translateX(260px);
  }

  .newStair_1 {
    position: absolute;
    background-image: url('./../images/new_stair_01.png');
    background-repeat: no-repeat;
    width: 483px;
    height: 634px;
    right: -3px;
    bottom: 62px;
  }

  .newStair_2 {
    position: absolute;
    background-image: url('./../images/new_stair_02.png');
    background-repeat: no-repeat;
    width: 493px;
    height: 634px;
    right: -3px;
    bottom: 52px;
  }

  .newStair_3 {
    position: absolute;
    background-image: url('./../images/new_stair_03.png');
    background-repeat: no-repeat;
    width: 480px;
    height: 634px;
    right: -1px;
    bottom: 80px;
  }

  .background {
    position: relative;
    background-image: url('./../images/back.png');
    background-repeat: no-repeat;
    max-width: 1390px;
    min-width: 1390px;
    width:100%;
    height: 640px;
    overflow: hidden;
  }

  .old_stair {
    position: absolute;
    background-image: url('./../images/old_stair.png');
    background-repeat: no-repeat;
    width: 557px;
    height: 595px;
    right: 0px;
    bottom: -10px;
  }

  .hammer {
    position: absolute;
    background-image: url("./../images/hammer.png");
    background-repeat: no-repeat;
    width: 104px;
    height: 125px;
    right: 199px;
    top: 251px;
    animation: float 3s infinite;
    transition: opacity .3s ease-in;
    cursor: pointer;
  }

  .button {
    z-index: 9;
    position: absolute;
    background-image: url("./../images/btn.png");
    background-repeat: no-repeat;
    width: 358px;
    height: 125px;
    left: 681px;
    transform: translateX(-50%);
    bottom: 17px;
    animation: pulse 2s infinite;
    cursor: pointer;
  }

  .plant {
    position: absolute;
    background-image: url("./../images/dec_1.png");
    background-repeat: no-repeat;
    width: 288px;
    height: 202px;
    right: -20px;
    bottom: 0px;
  }

  .menu {
    display: flex;
    position: absolute;
    right: 160px;
    top: 6px;
  }
  .menu_round {
    opacity: .8;
    background-image: url("./../images/round.png");
    background-repeat: no-repeat;
    width: 130px;
    height: 130px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    justify-content: center;
    transition: opacity .3s;
  }

  .menu_round:hover {
    opacity: 1;
  }

  .menu_round:before {
    content:'';
    display: block;
    background-image: url("./../images/choosed.png");
    background-repeat: no-repeat;
    width: 119px;
    height: 119px;
    position: absolute;
    opacity: 0;
    transition: opacity .4s;
    top: 5px;
    left: 10px;
  }

  .menu_round.preselected:before {
    opacity: 1;
  }

  .menu_round:after {
    content: '';
    display: block;
  }

  .menu__new_stair--1:after {
    background-image: url("./../images/01.png");
    background-repeat: no-repeat;
    width:146px;
    height: 111px;
    position: absolute;
    left: 30px;
    top: -6px;
  }
  .menu__new_stair--2:after {
    background-image: url("./../images/02.png");
    background-repeat: no-repeat;
    width:146px;
    height: 111px;
    position: absolute;
    left: 30px;
    top: -5px;
  }
  .menu__new_stair--3:after {
    background-image: url("./../images/03.png");
    background-repeat: no-repeat;
    width:146px;
    height: 111px;
    position: absolute;
    left: 24px;
    top: 4px;
  }

  @keyframes pulse {
    0% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(0.9);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }

  @keyframes man {
    0% {
      transform: rotate(-0.5deg);
      transform-origin: bottom;
    }
    50% {
      transform: rotate(0.5deg);
      transform-origin: bottom;

    }
    100% {
      transform: rotate(-0.5deg);
      transform-origin: bottom;

    }

  }
    @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);

    }
    100% {
      transform: translateY(0px);

    }
    }

    /* .test {
      background-image: url("./../images/test.png");
      width: 100%;
      height: 100%;
      opacity: .5;
      pointer-events: none;
      position: absolute;
    } */
</style>
