import firebase from 'firebase/app'
export default {
  state:{
    doc:''
  },
  mutations:{
    setDoc(state,n) {
      console.log('storestateupdate',state)
      state.doc = n
    }
  },
  actions:{
    async fetchTree({commit,dispatch}){
      try {
        const uid  = await dispatch('getUid')
        const document = (await firebase.database().ref(`/users/${uid}/doc/document`).once('value')).val() || {}
        commit('setDoc', document)
      } catch (e) {}
    },
    async createTreeData({commit,dispatch}, {document}) {
      try {
        console.log(document)
        const uid = await dispatch('getUid')
        const doc = await firebase.database().ref(`/users/${uid}/doc`).set({document})
        return {doc, id: doc.key}
      } catch (e) {
        throw e
      }
    }
  }
}
