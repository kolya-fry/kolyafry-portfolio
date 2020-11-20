export default {
  install(Vue) {
    Vue.prototype.$message = function(html) {
      Vue.$notify({html})
    }

    Vue.prototype.$error = function(html) {
      Vue.$notify({html: `[Ошибка]: ${html}`})
    }
  }
}
