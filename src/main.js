import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, {Validator} from 'vee-validate'
import cn from 'vee-validate/dist/locale/zh_CN'
import toastRegistry from './components/toast/index'

Vue.use(toastRegistry)

Validator.localize('cn', cn)
Vue.use(VeeValidate, {
    locale: 'cn',
    errorBagName: 'vee_errors'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
