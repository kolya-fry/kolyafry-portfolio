<template>
  <div>
    <div v-if="view === 'login'">
      <form @submit.prevent="submitEnter">
        <div>
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div>
          <input type="text" placeholder="Пароль" v-model="password">
        </div>
        <button type="submit">
          Войти
        </button>
      </form>
    </div>
    <div v-if="view === 'registration'">
      <form @submit.prevent="submitRegister">
        <div>
          <input type="text" placeholder="Имя" v-model="name">
        </div>
        <div>
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div>
          <input type="text" placeholder="Пароль" v-model="password">
        </div>
        <button type="submit">
          Регистрация
        </button>
      </form>
    </div>
    <div class="login-options">
      <button @click="view = 'login'">Логин</button>
      <button @click="view = 'registration'">Регистрация</button>
      <router-link to="/">Пропустить</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: () => ({
    view: 'login',
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    async submitEnter() {
      try {
        const formData = {
          email: this.email,
          password: this.password,
        }
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {
      }
    },
    async submitRegister() {
      try {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-options
    display flex
    width 300px;
    justify-content space-between
    margin-top 50px
</style>