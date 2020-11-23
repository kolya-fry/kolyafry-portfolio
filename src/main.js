import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from '@/utils/message.plugin'
import VueModality from 'vue-modality'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(VueModality)
Vue.use(messagePlugin)

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyC7PzqqnmMGDLpRFtA0RTGdhwsD5Fy3nHU",
  authDomain: "kolya-fry.firebaseapp.com",
  databaseURL: "https://kolya-fry.firebaseio.com",
  projectId: "kolya-fry",
  storageBucket: "kolya-fry.appspot.com",
  messagingSenderId: "559430124339",
  appId: "1:559430124339:web:2511714c9f40e7976ab446"
};

firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(() => {
if (!app) {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
})

