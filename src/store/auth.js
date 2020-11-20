import firebase from 'firebase/app'

export default {
  actions: {
    async login ({dispatch, commit}, {email, password}) {
      try {
        console.log(dispatch)
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        console.log(dispatch)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    getUid() {
      return firebase.auth()?.currentUser?.uid ?? null
    },
    async logout() {
      await firebase.auth().signOut()
    }
  }
}