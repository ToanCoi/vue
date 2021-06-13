import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './EventBus'
import FieldInputIcon from './components/common/FieldInputIcon.vue'
import Dropdown from './components/common/Dropdown.vue'

Vue.config.productionTip = false

Vue.use(Bus)

Vue.component('FieldInputIcon', FieldInputIcon)
Vue.component('Dropdown', Dropdown)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
