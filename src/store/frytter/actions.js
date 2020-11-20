import API from '@/api'
export default {
  async generateComment({ commit }, payload) {
    console.log(payload)
    try {

      const { data: commentMessage } = await API.fetchFakeText.fetchFakeText({
        textParams: payload.wordsCount
      })
      commit('updateComments', {
        parentId: payload.parentId,
        newComment: {
          id: payload.id,
          userName: payload.userName,
          message: commentMessage,
          created: payload.created
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
}
