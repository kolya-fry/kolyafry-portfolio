<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('dehaze-click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <!-- <span class="black-text">12.12.12</span> -->
      </div>
      <div class="fakeapi">
        {{fakeApi}}
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{userName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>  

          <ul id="dropdown" class="dropdown-content">
            <!-- <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li> -->
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  data:()=>({
    fakeApi: null
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  },
  computed: {
    userName(){
      return this.$store.getters.info.name
    }
  },
  mounted() {
    window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
    axios.get(`https://cors-anywhere.herokuapp.com/loripsum.net/api/3/short`).then((response)=>{
      this.fakeApi = response.data
    })

  }
}
</script>
<style lang="stylus" scoped>
  .fakeapi
    line-height: 50px;
    width: 180px;
    color: #ccc;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 60px;
    white-space: nowrap;
</style>
