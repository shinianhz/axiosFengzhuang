import Vue from 'vue';
import Vuex from 'vuex';
import gettoken from '../api/api'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        login    : false,
        token    : null,
        globalUrl: 'http://10.31.162.52:3000/'
    },
    getters: {
        login: state => {
            return state.login
        },
        token: state => {
            return state.token
        },
        globalUrl: state => {
            return state.globalUrl
        }

    },
    mutations: {
        checkLogin: (state, payload) => {
            state.login = payload;
        },
        setToken: (state, payload) => {
            state.token = payload;
        },
        gettoken({commit,state},userinfo){
            try{
              var token = await getToken(userinfo.name,userinfo.password)
                  commit('GETUSERINFO',token.data.token)
                  setCookie('TOKEN',token.data.token)
            }catch(err){
                console.log(err)
            }
        }
    },
    actions: {
        checkLogin: ({ commit }, payload) => {
            commit('checkLogin', payload)
        },
        setToken: ({ commit }, payload) => {
            commit('setToken', payload)
        },
        async gettoken({commit,state},userinfo){
            try{
              var token = await getToken(userinfo.name,userinfo.password)
                  commit('GETUSERINFO',token.data.token)
                  setCookie('TOKEN',token.data.token)
            }catch(err){
                console.log(err)
            }
        }
    }
})