// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import MyBread from '@/components/cuscom/myBread.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'  //过滤时间日期

Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false


// 全局过滤器，处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
//注册全局自定义组件
Vue.component(MyBread.name,MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
