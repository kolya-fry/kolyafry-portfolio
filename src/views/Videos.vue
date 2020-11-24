<template>
  <div class="timers">
    <Search v-model="query"></Search>
    <div class="grid_wrap">
      <!-- <div class="loader" v-if="loading">
        <div class="loader_item_wrap">
          <div class="loader_item"></div>
        </div>
      </div> -->
      <div v-if="result && !loading" class="youtube_results">
        <div
          v-for="(videoItem, key) in result"
          :key="key"
          class="youtube_results__item"
        >
          <router-link
            tag="a"
            :to="{
              name: 'video',
              params: { id: videoItem.id.videoId, info: videoItem }
            }"
          >
            <img
              class="youtube_results__img"
              type="text/html"
              :src="
                'https://img.youtube.com/vi/' +
                  videoItem.id.videoId +
                  '/hqdefault.jpg'
              "
            />
          </router-link>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="prev" v-if="prevPageToken" @click="prevPage">prev</div>
      <div class="next" v-if="nextPageToken" @click="nextPage">next</div>
    </div>
  </div>
</template>

<script>
// import Video from "@/components/Video.vue";
import Search from "@/components/Search.vue";
import Axios from "axios";
import debounce from "lodash/debounce";

// AIzaSyDX0CXqUk0akqXk2Dv1W4U1ucO2DH3wus4
export default {
  name: "videos",
  data() {
    return {
      query: "",
      src: "",
      result: null,
      key: "AIzaSyDX0CXqUk0akqXk2Dv1W4U1ucO2DH3wus4",
      prevPageToken: null,
      nextPageToken: null,
      loading: false
    };
  },
  components: {
    Search
  },
  watch: {
    query: debounce(function() {
      this.search();
    }, 300)
  },
  methods: {
    search() {
      this.loading = true;
      Axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.query}&maxResults=50&key=${this.key}`
      )
        .then(resp => {
          this.result = resp.data.items;
          this.nextPageToken = resp.data.nextPageToken
            ? resp.data.nextPageToken
            : null;
          this.prevPageToken = resp.data.prevPageToken
            ? resp.data.prevPageToken
            : null;
        })
        .then(() => (this.loading = false));
    },
    nextPage() {
      this.loading = true;
      Axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.query}&pageToken=${this.nextPageToken}&maxResults=50&key=${this.key}`
      )
        .then(resp => {
          this.result = resp.data.items;
          this.nextPageToken = resp.data.nextPageToken
            ? resp.data.nextPageToken
            : null;
          this.prevPageToken = resp.data.prevPageToken
            ? resp.data.prevPageToken
            : null;
        })
        .then(() => (this.loading = false));
    },
    prevPage() {
      this.loading = true;
      Axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.query}&pageToken=${this.prevPageToken}&maxResults=50&key=${this.key}`
      )
        .then(resp => {
          this.result = resp.data.items;
          this.nextPageToken = resp.data.nextPageToken
            ? resp.data.nextPageToken
            : null;
          this.prevPageToken = resp.data.prevPageToken
            ? resp.data.prevPageToken
            : null;
        })
        .then(() => (this.loading = false));
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style lang="stylus">
.youtube_results
  display grid
  grid-template-columns repeat(auto-fit, minmax(250px, 1fr));
  grid-gap 20px
.youtube_results__img
  width 100%
.grid_wrap
  margin 36px auto 0px auto
.pagination
  display flex
  margin-top 24px
  & > div
    background #fff
    cursor pointer
    padding 10px
.loader
  width 300px
  height 300px
  position relative
  margin 0 auto
.loader_item_wrap
  transform translate(-50%, -50%)
  left 50%
  width 40px
  height 40px
  top 50%
  position absolute
.loader_item
  width 40px
  height 40px
  border-radius 40px
  border 4px solid #ffbcb9
  position absolute
  animation 4s linear 0s infinite loader_rotate
  &:after
    background #19354a
    width 10px
    left 50%
    top 50%
    transform translate(-50%, -50%)
    height 50px
    display block
    position absolute
    content ''
.next
  margin-left 12px
@keyframes loader_rotate
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
</style>
