<template>
  <div class="header-panel">
    <Logo></Logo>
    <nav>
      <router-link
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        tag="li"
        active-class="active"
        exact
      >
        <a href="#">{{link.title}}</a>
      </router-link>
    </nav>
    <div class="theme-chosing">
      <div @click="changeTheme('light')" class="theme-btn ligth-theme"></div>
      <div @click="changeTheme('dark')" class="theme-btn dark-theme"></div>
    </div>
    <div class="account">
      <div>
        user
      </div>
      <div class="logout-btn" @click="logout">
        выйти
      </div>
    </div>
  </div>
</template>
<script>

import Logo from './Logo'

export default {
  data: () => ({
    links: [
      {title: 'Обо мне', url: '/'},
      // {title: 'Работы', url: '/'},
      // {title: 'Контакты', url: '/'},
      // {title: 'Эксперименты', url: '/'},
      {title: 'Frytter', url: '/frytter'},
      {title: 'Planner', url: '/planner'},
    ]
  }),
  components: {
    Logo
  },
  methods: {
    changeTheme(themeName) {
      this.$store.commit('changeTheme', themeName)
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>

  .theme-chosing
    display flex
    width 48px
    justify-content space-between
    height 40px
    align-items center
    margin-top 20px
    margin-bottom 20px
    margin-left 40px
    .theme-btn
      width 20px
      height 20px
      border-radius 4px
      border 2px solid
      cursor pointer
      &.ligth-theme
        background-color #e5f5e0
      &.dark-theme
        background-color #133518

  .header-panel
    height 60px
    display flex
    align-items center
    justify-content space-between
    border-bottom 1px solid green

  nav
    display flex

    li
      list-style none
      margin-left 20px

  .account
    width 100px
    display flex

  .logout-btn
    margin-left 20px

</style>