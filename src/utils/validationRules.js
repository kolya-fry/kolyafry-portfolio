export default {
  ruString: value => {
    return /[а-яё]/i.test(value)
  },
  phone: value => {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value)
  }
}