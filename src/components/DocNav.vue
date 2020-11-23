<template>
<div class="headers-preview">
  <div v-for="(header, key) in headers" :key="key">
    <div class="headers-preview--item" v-html="header" @click="$emit('select', header)"></div>
  </div>
</div>

</template>
<script>
export default {
  props: {
    dom: {
      type: String,
      default: ""
    }
  },
  computed: {
    headers() {
      let res = this.dom.match(/<h(.)>.*?<\/h\1>/g)
      console.log(res)
      return res
    }
  }
}
</script>

<style lang="stylus">
.headers-preview 
  border 1px solid #ccc
  padding 20px
  box-sizing border-box
  &--item
    cursor pointer
    h1
      font-size 26px
      margin 20px 0px
      font-weight bold
    h2
      font-size 22px
      margin 20px 0px
      font-weight bold
    h3
      font-size 18px
      margin 20px 0px
    h4
      font-size 16px
      margin 20px 0px
    h5
      font-size 14px
      margin 20px 0px
    h6
      font-size 12px
      margin 20px 0px
</style>
