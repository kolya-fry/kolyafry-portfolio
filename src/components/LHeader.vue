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
    <div class="mobile-btn-wrapper">
      <div class="mobile-btn" @click="showMenu = !showMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <ul class="mobile-nav" v-if="showMenu">
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
      </ul>
    </div>
  </div>
</template>
<script>

import Logo from './Logo'

export default {
  data: () => ({
    showMenu: false,
    links: [
      {title: 'Обо мне', url: '/'},
      // {title: 'Работы', url: '/'},
      // {title: 'Контакты', url: '/'},
      // {title: 'Эксперименты', url: '/'},
      {title: 'Frytter', url: '/frytter'},
      {title: 'Planner', url: '/planner'},
      {title: 'DeliveryService', url: '/delivery-service'},
      {title: 'Banner', url: '/banner'},
      {title: 'Chart', url: '/chart'},
      {title: 'Videos', url: '/videos'},
      // {title: 'Timers', url: '/timers'},
      // {title: 'Editor', url: '/editor'},
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
  .mobile-btn-wrapper
    display none
    position relative
    @media screen and (max-width 1024px)
      display block
  .mobile-btn
    width 30px
    height 30px
    border 1px solid
    padding: 9px 0 0 7px;
    & .line
      width 60%
      height 2px
      margin-bottom 2px
      background: #07581b;
  .mobile-nav
    z-index: 2;
    position: absolute;
    top: 30px;
    background: #1a1a1a
    padding: 20px;
    right: 0;
    box-shadow: -5px 3px 9px 2px #07581b82;
    & li:not(:last-child)
      margin-bottom 20px
  nav
    display flex
    @media screen and (max-width 1025px)
      display none
    li
      list-style none
      margin-left 20px

  .account
    width 100px
    display flex

  .logout-btn
    margin-left 20px

</style>