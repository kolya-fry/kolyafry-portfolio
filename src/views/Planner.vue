<template>
  <div>
    <div>
      Hello username
    </div>
    <button @click="$refs.myRef.open()">
      Add plan
    </button>
    <div
      class="plans-list"
      v-for="plan in getPlans"
      :key="plan.id"
    >
      <div class="plan" v-if="getPlans.length">
        <div>
          {{plan.text}}
        </div>
        <div>
          Осталось дней: {{plan.daysBeforeEnd}}
        </div>
        <div>
          Статус: {{plan.status}}
        </div>
        <button
          @click="toCompletePlan(plan.id)"
          v-if="plan.status === 'inProgress'"
        >
          Завершить
        </button>
        <button
          @click="toDeletePlan(plan.id)"
        >
          Удалить
        </button>
      </div>
    </div>
    <vue-modality
      ref="myRef"
      @ok="addPLan"
      @cancel="cancelAddPlan"
      title="Modal"
      centered
    >
      <textarea v-model="newPlan.text" cols="30" rows="10" placeholder="План"></textarea>
      <input type="number" v-model="newPlan.daysBeforeEnd" placeholder="дней до завершения">
    </vue-modality>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

import findFreeId from '@/utils/findFreeId'

function findTargetDate(days) {
  const today = new Date()
  return today.setDate(parseInt(today.getDate()) + parseInt(days))
}


// function findRestOfDays(date) {
//   const today = new Date
//   const rest = date * 24 * 60 * 60 * 1000 - today.unix()
//   console.log(rest / 1000 / 60 / 60 / 24)
// }

const INIT_PLAN = {
  text: null,
  daysBeforeEnd: null,
  id: null,
  status: 'inProgress',
  endDate: null,
  hasTimer: true,
}

export default {
  name: 'Planner',
  data: () => ({
    newPlan: { ...INIT_PLAN }
  }),
  computed: {
    ...mapGetters('planner', ['getPlans']),
    ...mapGetters(['user']),
  },
  methods: {

    addPLan() {
      this.newPlan.id = findFreeId(this.getPlans)

      if (!this.newPlan.daysBeforeEnd) {
        this.newPlan.hasTimer = false
      } else {
        this.newPlan.endDate = findTargetDate(this.newPlan.daysBeforeEnd)
      }

      this.$store.commit('planner/addPLan', this.newPlan)
      this.newPlan = { ...INIT_PLAN }
      this.hidePlanModal()
    },
    toCompletePlan(planId) {
      this.$store.commit('planner/toCompletePlan', planId)
    },
    toDeletePlan(planId) {
      this.$store.commit('planner/toDeletePlan', planId)
    },
    cancelAddPlan() {
      this.hidePlanModal()
    },
    hidePlanModal() {
      this.$refs.myRef.hide()
    }
  },
}

</script>

<style lang="stylus" scoped>
  .plan
    border 2px solid
    padding 20px
    margin-bottom 20px
</style>