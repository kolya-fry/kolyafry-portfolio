<template>
  <div class="columns-page">
    <div class="main">
      <div class='input-wrapper'>
        <input type="text" placeholder="О чем вы думаете" v-model="currentTwit">
        <button @click="addTwit">Поделиться</button>
      </div>
      <div class="twits" v-if="getTwits.length">
        <div v-for="twit in getTwits" :key="twit.id">
          <div class="twit">
            <UserAvatar
              :userName='twit.userName'
            />
            {{ twit.message }}
          </div>
          <div class="twit-date">
            {{twit.created}}
          </div>
          <div class="comments" v-if="twit.comments.length">
            <div class="comment" v-for="comment in twit.comments" :key="`${twit.id}-${comment.id}`" >
              <UserAvatar
                :userName='comment.userName'
              />
              <div v-html="comment.message"></div>
              <div class="comment-created twit-date">
                {{comment.created}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar" v-if="getMostPopularTwits.length">
        <div v-for="twit in getMostPopularTwits" :key="twit.id">
          <div class="twit">
            <div class="comments-count">
              {{twit.comments.length}}
            </div>
            {{ twit.message }}
          </div>
          <div class="comments" v-if="twit.comments.length">
            <div class="comment" v-for="comment in twit.comments" :key="`${twit.id}-${comment.id}`" >
              <div v-html="comment.message" class="short-text"></div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

import UserAvatar from '@/components/UserAvatar'

import randomUsersList from '@/utils/randomUsersList'
import findFreeId from '@/utils/findFreeId'

const imgRegExp = new RegExp('(https?://.*.(?:png|jpg))')
// function replaceLinkByImg(x) {
//   console.log('f')
//   return `<img src="${x}">`
// }

function getRandomInt(min = 3, max = 30) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export default {
  name: 'Frytter',
  components: {
    UserAvatar
  },
  data: () => ({
    userName: 'kolyafry',
    currentTwit: null,
  }),
  computed: {
    ...mapGetters('frytter', ['getTwits']),
    getMostPopularTwits() {
      const mostPopularTwits = [...this.getTwits].sort((a, b) => b.comments.length - a.comments.length)
      if (this.getTwits.length > 3) {
        mostPopularTwits.length = 3
      }
      return mostPopularTwits
    }
  },
  methods: {
    prepareTwit(id) {
      const now = new Date()
      return {
        id: id,
        userName: this.userName,
        message: this.currentTwit,
        comments: [],
        created: now.toLocaleString()
      }
    },
    addTwit() {
      const id = findFreeId(this.getTwits)
      this.$store.commit('frytter/addTwit', this.prepareTwit(id))
      this.currentTwit = null
      this.generateComments(id)
    },
    generateComments(id) {
      const commentsCount = getRandomInt(1, 10)
      console.log(randomUsersList(getRandomInt(0, 20)))
      for (let i = 0; i <= commentsCount; i++) {
        setTimeout(() => {
          const now = new Date()
          this.$store.dispatch('frytter/generateComment', {
            parentId: id,
            wordsCount: getRandomInt(1, 6),
            id: ++i,
            userName: randomUsersList(getRandomInt(0, 20)),
            created: now.toLocaleString()
          })
        }, getRandomInt(5, 30) * 1000);
      }
    },

  },
  filters: {
    findImgLik(text) {
      if (imgRegExp.test(text)) {
        const textWithImages = text.split(imgRegExp)

        const filteredImages = textWithImages.filter(textPart => {
          if (imgRegExp.test(textPart)) {
            return textPart.replace(textPart, (match) => `<img src="${match}">`)
          } else {
            return textPart
          }
        })

        return filteredImages.join()
      }

      return text
    }
  }
}
</script>
<style lang="stylus" scoped>
  .short-text
    max-height 70px
    overflow hidden
    position relative
    &:after
      content ''
      display block
      width 100%
      height 20px
      background: rgb(26,26,26);
      background: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.75) 40%, rgba(26,26,26,0.98) 73%, rgba(26,26,26,1) 100%);
      position absolute
      bottom 0
      left 0
      right 0
  .comments-count
    width 30px
    height 30px
    border 1px solid gold
    border-radius 50%
    display flex
    justify-content center
    align-items center
    margin-right 10px
  .columns-page
    display flex
    .sidebar
      flex-shrink: 10;
      margin-left: 30px;
      margin-top: 86px;

  .input-wrapper
    margin-top 20px
    input
      background none
      border 2px solid #00cb43
      padding 8px
      color: #fff;
    button
      height 35px
      border 2px solid #00cb43
      background #00cb43
      color #1a1a1a
      position relative
      font-size 16px
      top 1px

  .twit
    border 2px solid #707070
    padding 20px
    display flex
    align-items center

  .comments
    margin-top 30px
    .comment-created
      align-self start
    .comment
      margin-top 20px
      padding 20px
      display flex
      align-items center
      justify-content: space-between;

  .twits
    margin-top 30px
    .twit
      margin-top 20px
  .twit-date
    margin-left 10px
    font-size 12px
    .comment
      .twit-date
        margin-left 0
  .sidebar
    .comment
      margin-top 0
      padding 4px
</style>