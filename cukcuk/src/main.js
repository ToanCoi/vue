import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
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
import vueDebounce from 'vue-debounce'
import FieldInputIcon from './components/common/FieldInputIcon.vue'
import FieldInputLabel from './components/common/FieldInputLabel.vue'
import Dropdown from './components/common/Dropdown.vue'
import ComboBox from './components/common/ComboBox.vue'
import 'devextreme/dist/css/dx.light.css';

// You can create the DateBox widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

// new DevExpress.ui.dxDateBox(container, {
//   "dateOutOfRangeMessage": "Ngày nhập không hợp lệ",
//   "displayFormat": "dd/MM/yyyy",
//   "height": "40px",
//   "hint": "",
//   "invalidDateMessage": "Ngày nhập không hợp lệ",
//   "opened": true,
//   "placeholder": "dd/mm/yyyy",
//   "useMaskBehavior": true
// });


Vue.config.productionTip = false

Vue.use(Bus);
Vue.use(ElementUI);
Vue.use(VTooltip);
Vue.use(VueAxios, axios)
Vue.use(money, {precision: 0})
Vue.use(VueTheMask)

Vue.use(vueDebounce)
Vue.use(vueDebounce, {
  lock: true
})
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup']
})
Vue.use(vueDebounce, {
  defaultTime: '700ms'
})

Vue.component('FieldInputIcon', FieldInputIcon);
Vue.component('Dropdown', Dropdown);
Vue.component('FieldInputLabel', FieldInputLabel);
Vue.component('ComboBox', ComboBox);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

