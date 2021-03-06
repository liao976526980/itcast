// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css';
import MyAxios from '@/plugins/MyAxios';
import moment from 'moment';

Vue.config.productionTip = false;

//  全局过滤器,格式化日期
Vue.filter('fmtDate', (value, fmString) => {
  return moment(value).format(fmString);
});
// 注册MyAxios插件
Vue.use(MyAxios);
// 注册elementUI插件
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
