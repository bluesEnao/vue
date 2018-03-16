// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import { Message, Button, MessageBox,Loading} from 'element-ui';

//引入CSS
import './assets/css/public.css';
import './assets/aliIcon/demo.css';
import './assets/aliIcon/iconfont.css';
Vue.config.productionTip = false
Vue.prototype.config = {
  phone: localStorage.getItem("loginAccount"),
  token: localStorage.getItem("token"),
  mbaseURL: "https://www.easy-mock.com/mock/5a2e2a6689d2205cbfe7a608/vue_demo",
  setCookie: function(name, value) {
    localStorage.setItem(name, value);
  },
  getCookie: function(name) {
    return localStorage.getItem(name);
  },
  delCookie: function(name) {
    localStorage.removeItem(name);
  }
}

/*********************axios请求初始化********************* */
axios.defaults.baseURL = Vue.prototype.config.mbaseURL;
Vue.prototype.AXIOS = axios;
axios.interceptors.request.use(
  config => {
    if (Vue.prototype.config.token) config.headers['Authorization'] = Vue.prototype.config.token;
    return config
  },
  err => {
    return Promise.reject(err)
  });

Vue.prototype.axios = function(url,params,success, error){
 axios.post(url,params).then(res=>{
    var data = res.data;
    if(data.code===0) success && success.call(this,data.data||data);
    else{
      Vue.prototype.config.token = '';
      localStorage.removeItem("token");
      error && error.call(this, data);
      var errorTips = Object.prototype.toString.call(data)==="[object Object]"?data.message:data;
      this.$message({
        showClose: true,
        message: errorTips,
        type: 'error'
      });
    }
  }).catch(res=>{
  })
}

/*********************判断是否登录********************* */
router.beforeEach((to, from, next) => {

  next();
  if (to.path.indexOf("/login") === -1 && !Vue.prototype.config.token) {
    next("/");
  }
  else {
    next();
  }
  
})
//使用vue插件

Vue.use(Loading);
Vue.use(Button);
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
