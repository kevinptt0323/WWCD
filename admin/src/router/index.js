import Vue from 'vue'
import Router from 'vue-router'
import Density from '@/components/Density'
import Payment from '@/components/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/density',
      name: 'Density',
      component: Density
    }
  ]
})
