<template>
  <div>
    <div class="page-title">
      <h3>Документ</h3>
    </div>
    <section>
      <div class="row">
        <div class="col sm12 m4">
          <div class="page-subtitle">
            <h4>Оглавление</h4>
          </div>
          <DocNav :dom="tinymceDataTemp" @select="select"></DocNav>
        </div>
        <div class="col s12 m8">
          <div class="page-subtitle">
            <h4>Редактирование</h4>
          </div>
          <tinymce id="d1" v-model="tinymceDataTemp" ref="tm" @editorInit="editorInit" :key="tinyKey"></tinymce>
          <button class="btn waves-effect waves-light mt20" @click="saveText">
            Сохранить
            <i class="material-icons right">send</i>
          </button>
        </div>
        <!-- <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>
          </div>
        </div>-->
      </div>
    </section>
  </div>
</template>
<script>
import tinymce from "vue-tinymce-editor"
import DocNav from "@/components/DocNav.vue"
import { bus } from "@/main"

export default {
  data: () => ({
    tinymceDataTemp: "<h1>Заголовок</h1>",
    tinyKey: 0
  }),
  components: {
    tinymce,
    DocNav
  },
  watch:{
    tinymceData(n){
      this.tinymceDataTemp = n
      this.editorInit()
    },
  },
  computed:{
    tinymceData(){
      return this.$store.state.data.doc
    }
  },
  methods: {
    select(e) {
      let tag = e.slice(1, 3)

      let text = new DOMParser()
        .parseFromString(e, "text/html")
        .querySelector(tag).textContent
      console.log(text)
      let els = document
        .querySelector("#d1_ifr")
        .contentWindow.document.querySelector("#tinymce").childNodes
      console.log(els)
      let find = Array.prototype.find
      let el = find.call(els, x => x.innerText == text)
 
      el.scrollIntoView({ behavior: "smooth" })
    },
    async saveText() {
      // bus.$emit('saveText', this.tinymceData)
      try {
        const tree = await this.$store.dispatch("createTreeData", {
          document: this.tinymceDataTemp
        })
      } catch (e) {}
      // console.log(this.$refs.tm)
      // this.tinyKey += 1
      // this.tinymceData = ""
    },
    editorInit() {
      this.$refs.tm.editor.setContent(this.tinymceDataTemp)
    }
  },
  async mounted() {
    try {
      this.savedData = await this.$store.dispatch("fetchTree")
    } catch (e) {}
  }
}
</script>

<style lang="stylus">
.mce-branding {
  display: none
}
</style>
