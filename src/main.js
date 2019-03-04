import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { routes } from './routes';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { store } from './store/index'



Vue.use(VueAxios, axios);

axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)


Vue.use(iView);

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes, // 可以直接写成routes
    mode: 'hash' // mode设置成history，那么地址就可以请求http://localhost:8080/user
});
new Vue({
    el: '#app',
    router, //在vue实例中使用路由
    store, //在vue实例中使用仓库store
    render: h => h(App) // render
});