export default {
  addPLan(state, newPlan) {
    state.plans.push(newPlan)
  },
  toCompletePlan(state, planId) {
    state.plans.find(plan => plan.id === planId).status = 'done'
  },
  toDeletePlan(state, planId) {
    state.plans = state.plans.filter(plan => plan.id !== planId)
  }
}
