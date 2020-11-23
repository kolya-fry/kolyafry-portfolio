<template>
    <div>
        <input class="input--main" type="text" v-model="query" placeholder="Search query" @input="$emit('input',query)">
    </div>
</template>
<script>
    export default {
        props: {
           
        },
        data() {
            return {
              query:'',
            }
        },
        methods:{
          
        }
    }
</script>
<style lang="stylus">
    .input--main
        border: none;
        background: none;
        font-size: 23px;
        color: #fff;
        border-bottom: 2px solid #ffbcb9;
        padding: 5px 15px;
</style>