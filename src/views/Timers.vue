<template>
    <div class="timers">
        <Timer :id="timerId" @del="del" v-for="timerId in timerIds" :key="timerId"/>
        <v-btn small @click="add" color="primary">+ Add</v-btn>
    </div>
</template>
<script>
import Timer from '@/components/Timer.vue' 
import '@/styles/btn.styl'
import '@/styles/notice.styl'
export default {
    name: 'timers',
    data() {
        return {
            timerIds: [0],
        }
    },
    components: {
        Timer
    },
    methods:{
        add(){
            if (this.timerIds.length === 0) {
                this.timerIds.push(0);
            } else {
                this.timerIds.push(this.timerIds[this.timerIds.length - 1] + 1);
            }
            
        },
        del(timerId) {
            this.timerIds = this.timerIds.filter((el) => el != timerId);
        }
    }
}
</script>

<style lang="stylus">
    
    .timers 
        margin-top 24px



</style>