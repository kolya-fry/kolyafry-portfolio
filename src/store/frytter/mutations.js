export default {
  addTwit(state, data) {
    state.twits.push(data)
  },
  updateComments(state, {parentId, newComment}) {
    const commentForUpdateId = state.twits
      .findIndex(twit=> twit.id === parentId)
    state.twits[commentForUpdateId].comments
      .push(newComment)
  }
}
