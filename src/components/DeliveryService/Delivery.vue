<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="form-couple-flex form-row">
          <div>
            <ValidationProvider rules="required|ruString" v-slot="{ errors }">
              <label for="fio">ФИО</label>
              <input v-model="fio" type="text" name="fio" id="fio" placeholder="Только кириллица"/>
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider rules="required|phone" v-slot="{ errors }">
              <label for="phone">Телефон</label>
              <input v-model="phone" type="text" id="phone" placeholder="+7 (___) ___-__-__">
              <span class="form-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-row">
          <ValidationProvider rules="required|ruString" v-slot="{ errors }">
            <label for="address">Адрес доставки</label>
            <input v-model="address" type="text" id="address" placeholder="Город, улица, дом">
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-row">
          <ValidationProvider rules="required|alpha" v-slot="{ errors }">
            <label for="comment">Комментарий</label>
            <textarea v-model="comment" name="" id="" cols="30" rows="10" placeholder="Комментарий" id="comment"></textarea>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="btn-wrapper">

          <button type="submit">Отправить</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';
import validationRules from '@/utils/validationRules'


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('ru', ru);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


extend("ruString", {
  validate: validationRules.ruString,
  message:
    "Допустимы только кириллица, пробелы, тире"
});

extend("phone", {
  validate: validationRules.phone,
  message:
    "Введите корректный номер телефона"
});



export default {
  data: () => ({
    fio: null,
    phone: null,
    address: null,
    comment: null,
  }),
  methods: {
    onSubmit () {
      alert('Form has been submitted!');
    }
  },
}
</script>

<style lang="stylus" scoped>
  form
    background #fff
    padding 35px 32px
  input
    height 56px
  input
  textarea
    display block
    min-width 458px
    width 100%
    border 1px solid #dadef0
    border-radius 4px
    padding-left 20px
    padding-right 20px
    margin-top 3px
    font-family: inherit;
    &::placeholder
      font-size 16px
      color #ccd0e3
    @media screen and (max-width: 1064px)
      min-width auto
  textarea
    padding-top 16px
  .form-couple-flex
    display flex
    justify-content space-between
    margin-bottom 20px
    flex-wrap wrap
    @media screen and (max-width: 1064px)
      & > div
        width 100%
        &:first-child
          margin-bottom 10px
  .form-error
    font-size 11px
    color red
  .form-row
    margin-bottom 20px

</style>

