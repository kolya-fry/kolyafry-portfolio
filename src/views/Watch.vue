<template>
  <div class="l-watch">
    <iframe
      id="ytplayer"
      type="text/html"
      width="640"
      autoplay="true"
      height="480"
      :src="'https://www.youtube.com/embed/' + videoId"
      allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen"
      frameborder="0"
    />
    <div v-if="info" class="video_about_wrapper">
      <div class="video_about_title">
        {{info.title}}
      </div>
      <div class="video_about_discription" v-html="info.description" v-linkified></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import linkify from 'vue-linkify'
Vue.directive('linkified', linkify)
// import Video from "@/components/Video.vue";
// import Search from "@/components/Search.vue";
import Axios from "axios";
// import debounce from "lodash/debounce";

// AIzaSyDX0CXqUk0akqXk2Dv1W4U1ucO2DH3wus4
export default {
  name:'watch',
  data() {
    return {
      query: "",
      src: "",
      result: null,
      key: "AIzaSyDX0CXqUk0akqXk2Dv1W4U1ucO2DH3wus4",
      info: null,
    };
  },
    // components: {
    //   Video,
    //   Search
    // },
  computed: {
    videoId() {
      return this.$route.params.id;
    },
    // info() {
    //   return this.$route.params.info;
    // }
  },
  methods: {
    getVideoInfo() {
      Axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.videoId}&key=${this.key}`
      ).then(resp => {
        this.info = resp.data.items[0].snippet;
      });
    }
  },
  mounted() {
    this.getVideoInfo();
  }
};


</script>

<style lang="stylus">
  .video_about_title
    font-size 20px
    font-weight bold
  .video_about_wrapper
    background #fff
    text-align left
    margin-top 24px
    max-width 640px
    margin-left auto
    margin-right auto
    padding 30px
    font-family roboto, 'Avenir', Helvetica, Arial, sans-serif
  .video_about_discription
    background #fff
    margin-top 16px
    line-height 27px
    white-space pre-wrap
    & > a
      word-break break-all

</style>