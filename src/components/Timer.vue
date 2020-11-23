<template>
    <div>
        <div class="timer_row" :class="{'gridFour': timerOn }">
            <div class="flex">
                <v-text-field
                    v-model.number="timerFrom"
                    label="Timer start seconds"
                    v-if="!timerOn && !pause"
                    class="timer--from_input"
                    :class="{'input_error': error}"
                    ></v-text-field>
  
                <div class="timer--count" v-else ><span>{{time}}</span><span>ms</span></div>
                <v-btn small @click="startTimer"  v-if="!timerOn" class="btn--start" color="primary"><span class="rot90">▲</span></v-btn>
            </div>
            <button @click="pauseTimer" v-if="timerOn" class="btn--pause"><span class="rot90">=</span></button>
            <button @click="clearTimer" v-if="time != 0 || endTime" class="btn--clear">Clear</button>
            <button @click="clearTimer; $emit('del', id)" v-if="time != 0 || endTime" class="btn--delete">Delete</button>
        </div>
        <div class="error" v-if="error">
            {{error}}
        </div>
        <div v-if="endTime" class="end_time">
            {{endTime}}
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                timerFrom: '',
                timerOn: false,
                time: '0',
                timer: null,
                endTime: null,
                error: null,
                pause: false,
            }
        },
        methods:{
            startTimer(){
                // if(this.pause)
                this.error = null;
                this.pause = false;
                if (!this.timerFrom) {
                    this.error = 'Required!';
                    return;
                }
                if (this.timerFrom && typeof this.timerFrom  !== 'number') {
                    this.error = 'Input seconds!';
                    return;
                }
                this.timerOn = true;
                this.endTime = null;
                let timeStart = +this.timerFrom * 1000;
                this.time = this.time ? this.time : timeStart;
                let _this = this;
                let startTime = new Date();
                let ticker = 0;

                this.timer = setTimeout(function tick() {
                    ticker = new Date().getTime() - startTime.getTime();
                    _this.time = (timeStart - ticker)/1000;
                    _this.timer = setTimeout(tick, 1);
                    if (_this.time < 0.001 ) {
                        _this.showEndTime();
                        _this.clearTimer();
                    }
                }, 1);

            },
            pauseTimer() {
                this.timerFrom = this.time;
                clearTimeout(this.timer);
                this.timerOn = false;
                this.showEndTime();
                this.pause = true;
            },
            clearTimer() {
                this.pause = false;
                clearTimeout(this.timer);
                this.timerOn = false;
                this.time = 0;
                this.timerFrom = '';
                this.endTime = null;
            },
            showEndTime(){
                this.endTime = `End at
                ${new Date().getFullYear()}/${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}/${new Date().getDay() < 10 ? '0' + new Date().getDay() : new Date().getDay()}
                ${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}
                `
            }
        }
    }
</script>
<style lang="stylus">

    .timer--from_input
        border none
        border-radius 4px 0 0 4px
        width 208px

    .btn--start
        background #0cc314
        font-size 16px
        width 80px
        margin-left 20px

    .mergeBtn 
        border-radius 0 4px 4px 0
        margin-left 0px

    .btn--start:hover
        background #0bad13

    .btn--pause
        background #20d929
        font-size 16px
        width 80px

    .btn--pause:hover
        background #1ba122

    .btn--clear
        background #4020d9
        font-size 16px

    .btn--clear:hover 
        background #3b269d

    .timer_row 
        display grid
        grid-template-columns 1fr 1fr 1fr
        grid-gap 20px
        width 544px
        margin 12px auto 0
        height 44px
        
    .gridFour
        grid-template-columns 1fr 1fr 1fr 1fr

    .timer--count
        width 100px
        font-size 32px
        text-align left
        padding-left 10px
        display flex
        justify-content space-between

    .timer--count > span 
        display inline-block

    .end_time
        font-size 24px
        margin-top 12px
        background #b277f96e
        color #5f5f5f
        width 320px
        padding 10px
        border-radius 4px
        margin 24px auto
        position relative

    .rot90
        display inline-block
        transform rotate(90deg)
    .flex
        display flex
    .error
        text-align: left;
        color: #fff;
        padding-left: 23px;
    .input_error
        box-shadow 0px 0px 4px #de1818 inset
    .v-text-field
        padding-top 0px           
</style>