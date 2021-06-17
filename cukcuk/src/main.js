import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './EventBus'
import axios from 'axios'
import VueAxios from 'vue-axios'
import money from 'v-money'
import VueTheMask from 'vue-the-mask'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VTooltip from 'v-tooltip'
import FieldInputIcon from './components/common/FieldInputIcon.vue'
import FieldInputLabel from './components/common/FieldInputLabel.vue'
import Dropdown from './components/common/Dropdown.vue'


Vue.config.productionTip = false

Vue.use(Bus);
Vue.use(ElementUI);
Vue.use(VTooltip);
Vue.use(VueAxios, axios)
Vue.use(money, {precision: 0})
Vue.use(VueTheMask)

Vue.component('FieldInputIcon', FieldInputIcon);
Vue.component('Dropdown', Dropdown);
Vue.component('FieldInputLabel', FieldInputLabel);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

